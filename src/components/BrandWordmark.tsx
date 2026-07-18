/**
 * The `{esneiderbravo}` brand wordmark (logo option 1b): cyan code braces
 * in regular weight around the name in bold, all Space Grotesk. Colors and
 * spacing live in `.brand-mark` styles in `globals.css`.
 */
export function BrandWordmark() {
  return (
    <span className="brand-mark">
      <span className="brand-mark__brace" aria-hidden="true">
        {'{'}
      </span>
      <span className="brand-mark__name">esneiderbravo</span>
      <span className="brand-mark__brace" aria-hidden="true">
        {'}'}
      </span>
    </span>
  )
}
