// Fixed seed keeps the printed flecks stable across renders.
const flecks = Array.from({ length: 220 }, (_, i) => {
  const angle = i * 2.399963
  const spread = 0.72 + ((i * 37) % 101) / 270
  return {
    x: 315 + Math.cos(angle) * 239 * spread,
    y: 326 + Math.sin(angle) * 292 * spread,
    radius: i % 17 === 0 ? 1.9 : 0.35 + ((i * 13) % 9) / 12,
    opacity: 0.2 + ((i * 7) % 10) / 18,
  }
})

function TarotCollage() {
  return (
    <svg className="tarot-collage" viewBox="0 0 600 660" fill="none" aria-hidden="true" focusable="false">
      <rect x="435" y="174" width="147" height="305" fill="#aa96b2" opacity="0.8" />
      <circle cx="227" cy="277" r="157" fill="#1c1c20" />
      <circle cx="227" cy="277" r="143" stroke="#c7bcaa" strokeWidth="0.6" opacity="0.5" />
      <circle cx="227" cy="277" r="129" stroke="#c7bcaa" strokeWidth="0.5" opacity="0.25" />
      <g fill="#242327">
        {flecks.map((fleck, i) => (
          <circle key={i} cx={fleck.x} cy={fleck.y} r={fleck.radius} opacity={fleck.opacity} />
        ))}
      </g>
      <g className="tarot-botanical" stroke="#29272d" strokeWidth="1.5" fill="#29272d">
        <path d="M501 445C473 351 489 235 543 95" fill="none" />
        <path d="M520 158Q513 116 550 80Q546 123 520 158Z" />
        <path d="M512 182Q477 156 492 110Q512 143 512 182Z" />
        <path d="M505 207Q523 170 562 156Q543 190 505 207Z" />
        <path d="M495 241Q468 204 478 170Q501 202 495 241Z" />
        <path d="M489 265Q520 222 564 219Q531 257 489 265Z" />
        <path d="M485 298Q462 272 461 228Q487 259 485 298Z" />
        <path d="M486 321Q516 287 554 289Q529 317 486 321Z" />
        <path d="M489 350Q459 329 458 292Q482 314 489 350Z" />
        <path d="M493 379Q523 346 564 359Q530 382 493 379Z" />
        <path d="M498 411Q531 402 565 432Q525 434 498 411Z" />
        <path d="M499 405Q469 381 464 351Q489 368 499 405Z" />
      </g>
      <g fill="#19191c">
        <path d="M22 178A12 12 0 0 0 46 178Q34 190 22 178Z" />
        <path d="M21 222A13 13 0 1 0 47 222Q34 234 21 222Z" />
        <circle cx="34" cy="279" r="13" />
        <path d="M21 330A13 13 0 1 1 47 330Q34 318 21 330Z" />
        <path d="M22 378A12 12 0 0 1 46 378Q34 366 22 378Z" />
        <circle cx="34" cy="411" r="1.5" />
      </g>
      <path d="M34 435V603" stroke="#363438" strokeWidth="0.8" />
    </svg>
  )
}

export default TarotCollage
