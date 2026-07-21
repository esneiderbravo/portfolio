/**
 * Generates the printable QR assets for the digital business card.
 *
 * One-shot script (`npm run generate:qr`): outputs are committed under
 * `public/qr/` so deploys and print runs never depend on running this.
 * Error-correction level H leaves headroom for a center brand mark overlay.
 */
import { mkdir, writeFile } from 'node:fs/promises'

import QRCode from 'qrcode'

const CARD_URL = 'https://esneiderbravo.dev/card'
const OUT_DIR = new URL('../public/qr/', import.meta.url)

await mkdir(OUT_DIR, { recursive: true })

const svg = await QRCode.toString(CARD_URL, {
  type: 'svg',
  errorCorrectionLevel: 'H',
  margin: 2,
  color: { dark: '#0b0b0b', light: '#ffffff' },
})
await writeFile(new URL('card-qr.svg', OUT_DIR), svg)

const png = await QRCode.toBuffer(CARD_URL, {
  type: 'png',
  errorCorrectionLevel: 'H',
  width: 1200,
  margin: 2,
  color: { dark: '#0b0b0b', light: '#ffffff' },
})
await writeFile(new URL('card-qr-print.png', OUT_DIR), png)

// Manifest lets tests assert what the committed assets encode without a decoder.
const manifest = {
  url: CARD_URL,
  errorCorrectionLevel: 'H',
  files: ['card-qr.svg', 'card-qr-print.png'],
}
await writeFile(new URL('card-qr.json', OUT_DIR), `${JSON.stringify(manifest, null, 2)}\n`)

console.log(`QR assets generated in public/qr/ for ${CARD_URL}`)
