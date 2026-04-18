import { spawnSync } from 'node:child_process'

const steps = [
  ['npm', ['run', 'lint']],
  ['npm', ['run', 'typecheck']],
  ['npm', ['run', 'test']],
  ['npm', ['run', 'build']],
]

for (const [cmd, args] of steps) {
  const label = `${cmd} ${args.join(' ')}`
  console.log(`\n> ${label}`)

  const result = spawnSync(cmd, args, {
    stdio: 'inherit',
    shell: process.platform === 'win32',
  })

  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}

console.log('\nValidation passed.')
