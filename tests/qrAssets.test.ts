import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

const QR_DIR = join(process.cwd(), 'public', 'qr')
const CARD_URL = 'https://esneiderbravo.dev/card'

describe('committed QR card assets', () => {
  it('includes the SVG and print PNG', () => {
    expect(existsSync(join(QR_DIR, 'card-qr.svg'))).toBe(true)
    expect(existsSync(join(QR_DIR, 'card-qr-print.png'))).toBe(true)
  })

  it('was generated for the card URL with EC level H', () => {
    const manifest = JSON.parse(readFileSync(join(QR_DIR, 'card-qr.json'), 'utf8')) as {
      url: string
      errorCorrectionLevel: string
      files: string[]
    }
    expect(manifest.url).toBe(CARD_URL)
    expect(manifest.errorCorrectionLevel).toBe('H')
    expect(manifest.files).toContain('card-qr.svg')
  })
})
