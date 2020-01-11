import * as core from '@actions/core'
import * as tc from '@actions/tool-cache'
import * as exec from '@actions/exec'
import * as path from 'path'
import { chmod } from '@actions/io/lib/io-util'
import { constants as fsconstants } from 'fs'

export async function download(): Promise<boolean> {
    let tcpath: string
    switch (process.platform) {
        case 'win32':
            tcpath = await tc.downloadTool('https://dl-dispatch.discordapp.net/download/win64', 'dispatch.exe')
            break
        case 'darwin':
            tcpath = await tc.downloadTool('https://dl-dispatch.discordapp.net/download/macos', 'dispatch')
            break
        case 'linux':
            tcpath = await tc.downloadTool('https://dl-dispatch.discordapp.net/download/linux', 'dispatch')
            break
        default:
            throw new Error(`Error: process.platform was ${process.platform}, not one of win32, darwin, linux`)
    }
    core.info(tcpath)
    const upPath = path.basename(tcpath)
    core.info(upPath)
    if (process.platform !== "win32") {
        await chmod(tcpath, fsconstants.S_IRWXU)
        await chmod(tcpath, fsconstants.S_IRWXO)
    }
    exec.exec(`ls -laR ${upPath}`)
    exec.exec(`ls -laR /home/runner/work/_temp/`)
    core.addPath(upPath)
    return Promise.resolve(true)
}
