import { runTaskQueue } from './build.mjs'
import { release } from 'changba-cli'

await release({ task: runTaskQueue })
