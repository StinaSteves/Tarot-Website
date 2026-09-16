// Software sphere projection for browsers without WebGL. The texture rotates
// around the sphere; the silhouette and lighting stay fixed in space.
export async function createMoonCanvas(url) {
  const image = new Image()
  image.src = url
  await image.decode()
  const texture = document.createElement('canvas')
  texture.width = 1024
  texture.height = 512
  const source = texture.getContext('2d', { willReadFrequently: true })
  source.drawImage(image, 0, 0, texture.width, texture.height)
  const pixels = source.getImageData(0, 0, texture.width, texture.height).data
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  let output, samples = []
  return {
    domElement: canvas,
    setSize(size) {
      const resolution = Math.min(384, Math.max(128, Math.round(size * Math.min(devicePixelRatio, 2))))
      if (canvas.width === resolution && output) return
      canvas.width = canvas.height = resolution
      output = context.createImageData(resolution, resolution)
      samples = []
      for (let y = 0; y < resolution; y++) {
        for (let x = 0; x < resolution; x++) {
          const nx = (2 * (x + .5) / resolution - 1) * 1.01
          const ny = (1 - 2 * (y + .5) / resolution) * 1.01
          const radius = Math.hypot(nx, ny)
          if (radius >= 1) continue
          const nz = Math.sqrt(1 - radius * radius)
          const longitude = Math.atan2(nz, nx) / (2 * Math.PI)
          const row = Math.min(511, Math.floor((.5 - Math.asin(ny) / Math.PI) * 512))
          const light = .16 + .78 * Math.sqrt(Math.max(0, (3 * nx + ny + 3 * nz) / Math.sqrt(19)))
          const index = (y * resolution + x) * 4
          output.data[index + 3] = Math.min(1, (1 - radius) * resolution / 2) * 255
          samples.push({ index, longitude, row, light })
        }
      }
    },
    render(angle) {
      const turn = angle / (2 * Math.PI)
      for (const { index, longitude, row, light } of samples) {
        const u = ((longitude + turn) % 1 + 1) % 1 * 1024
        const x = Math.floor(u)
        const a = (row * 1024 + x) * 4
        const b = (row * 1024 + (x + 1) % 1024) * 4
        const fraction = u - x
        for (let channel = 0; channel < 3; channel++) {
          output.data[index + channel] = (pixels[a + channel] * (1 - fraction) + pixels[b + channel] * fraction) * light
        }
      }
      context.putImageData(output, 0, 0)
    },
  }
}
