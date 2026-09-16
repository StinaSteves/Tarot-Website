import { useEffect, useRef } from 'react'
import colorUrl from '../assets/img/contact-moon-color.jpg'
import heightUrl from '../assets/img/contact-moon-height.jpg'
import { createMoonCanvas } from './moonCanvas'

export default function ContactMoon() {
  const hostRef = useRef(null)
  useEffect(() => {
    const host = hostRef.current
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    let renderer, scene, camera, sphere, geometry, material
    let fallback, fallbackPending = false, angle = 2.4, lastPaint = 0
    let textures = []
    let disposed = false, visible = false, started = false, ready = false
    let frame = 0, previous = 0
    const draw = (time = 0) => {
      frame = 0
      if (disposed || !ready || !visible || document.hidden) return
      if (previous && !reduced.matches) angle += Math.min((time - previous) / 1000, .1) * Math.PI * 2 / 100
      previous = time
      if (fallback) {
        if (!time || time - lastPaint >= 1000 / 24) {
          fallback.render(angle)
          lastPaint = time
        }
      } else {
        sphere.rotation.y = angle
        renderer.render(scene, camera)
      }
      if (!reduced.matches) frame = requestAnimationFrame(draw)
    }
    const sync = () => {
      cancelAnimationFrame(frame)
      previous = 0
      draw()
    }
    const resize = () => {
      if (!renderer && !fallback) return
      const size = Math.max(1, host.clientWidth)
      if (fallback) fallback.setSize(size)
      else renderer.setSize(size, size)
      sync()
    }
    const startFallback = async () => {
      if (disposed || fallback || fallbackPending) return
      fallbackPending = true
      try {
        const software = await createMoonCanvas(colorUrl)
        if (disposed) return
        fallback = software
        renderer?.domElement.remove()
        host.appendChild(fallback.domElement)
        ready = true
        host.dataset.ready = 'true'
        host.dataset.renderer = 'canvas'
        resize()
      } catch {
        // Keep the original illustration if the texture cannot be loaded.
        host.dataset.ready = 'false'
      } finally {
        fallbackPending = false
      }
    }
    const lost = event => { event.preventDefault(); ready = false; cancelAnimationFrame(frame); startFallback() }
    const start = async () => {
      if (started || disposed) return
      started = true
      try {
        const THREE = await import('three')
        if (disposed) return
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('webgl2', { alpha: true, antialias: true, powerPreference: 'low-power' })
        if (!context) { await startFallback(); return }
        renderer = new THREE.WebGLRenderer({ canvas, context, alpha: true, antialias: true })
        renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
        renderer.setClearColor(0, 0)
        renderer.outputColorSpace = THREE.SRGBColorSpace
        renderer.domElement.addEventListener('webglcontextlost', lost)
        host.appendChild(renderer.domElement)
        const loader = new THREE.TextureLoader()
        const loaded = await Promise.all([colorUrl, heightUrl].map(async url => {
          const texture = await loader.loadAsync(url)
          if (disposed) texture.dispose()
          else textures.push(texture)
          return texture
        }))
        if (disposed) return
        textures = loaded
        textures[0].colorSpace = THREE.SRGBColorSpace
        scene = new THREE.Scene()
        camera = new THREE.OrthographicCamera(-1.01, 1.01, 1.01, -1.01, .1, 20)
        camera.position.z = 4
        geometry = new THREE.SphereGeometry(1, 64, 48)
        material = new THREE.MeshStandardMaterial({ map: textures[0], bumpMap: textures[1], bumpScale: .035, color: 0xb4b4b4, roughness: 1, metalness: 0 })
        sphere = new THREE.Mesh(geometry, material)
        sphere.rotation.set(.08, 2.4, -.08)
        scene.add(sphere)
        scene.add(new THREE.AmbientLight(0xffffff, .17))
        const sun = new THREE.DirectionalLight(0xffffff, 2.2)
        sun.position.set(3, 1, 3)
        scene.add(sun)
        ready = true
        host.dataset.ready = 'true'
        host.dataset.renderer = 'webgl'
        resize()
      } catch {
        await startFallback()
      }
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      sync()
    })
    observer.observe(host)
    const resizer = new ResizeObserver(resize)
    resizer.observe(host)
    document.addEventListener('visibilitychange', sync)
    reduced.addEventListener('change', sync)
    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      observer.disconnect()
      resizer.disconnect()
      document.removeEventListener('visibilitychange', sync)
      reduced.removeEventListener('change', sync)
      if (renderer) {
        renderer.domElement.removeEventListener('webglcontextlost', lost)
        renderer.dispose()
        renderer.domElement.remove()
      }
      geometry?.dispose()
      material?.dispose()
      textures.forEach(texture => texture.dispose())
      fallback?.domElement.remove()
    }
  }, [])
  return <div ref={hostRef} className="contact-moon-3d" data-ready="false" aria-hidden="true"/>
}
