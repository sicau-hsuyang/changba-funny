import execa from 'execa'
import { createSpinner } from 'nanospinner'
import { resolve } from 'path'

const CWD = process.cwd()
const PKG_SHARE = resolve(CWD, './packages/share')
const PKG_TRACK = resolve(CWD, './packages/track')
const PKG_REQUEST = resolve(CWD, './packages/request')

export const buildShare = () => execa('pnpm', ['build'], { cwd: PKG_SHARE })

export const buildTrack = () => execa('pnpm', ['build'], { cwd: PKG_TRACK })

export const buildRequest = () => execa('pnpm', ['build'], { cwd: PKG_REQUEST })

export async function runTask(taskName, task) {
  const s = createSpinner(`Building ${taskName}`).start()
  try {
    await task()
    s.success({ text: `Build ${taskName} completed!` })
  } catch (e) {
    s.error({ text: `Build ${taskName} failed!` })
    console.error(e.toString())
  }
}

export async function runTaskQueue() {
  await runTask('share', buildShare)
  await runTask('track', buildTrack)
  await runTask('track', buildRequest)
}
