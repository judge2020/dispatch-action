import * as core from '@actions/core'
import * as io from '@actions/io'
import * as tc from '@actions/tool-cache'
import * as exec from '@actions/exec'
import * as path from 'path'
import { chmod } from '@actions/io/lib/io-util'
import { constants as fsconstants } from 'fs'

export async function download(): Promise<boolean> {
    let tcpath: string
    let toName: string
    switch (process.platform) {
        case 'win32':
            tcpath = await tc.downloadTool('https://dl-dispatch.discordapp.net/download/win64')
            toName = 'dispatch.exe'
            break
        case 'darwin':
            tcpath = await tc.downloadTool('https://dl-dispatch.discordapp.net/download/macos')
            toName = 'dispatch'
            break
        case 'linux':
            tcpath = await tc.downloadTool('https://dl-dispatch.discordapp.net/download/linux')
            toName = 'dispatch'
            break
        default:
            throw new Error(`Error: process.platform was ${process.platform}, not one of win32, darwin, linux`)
    }
    core.info(tcpath)
    const upPath = path.basename(tcpath)
    core.info(upPath)
    const newpath = path.join(upPath, toName)
    core.info(newpath)
    await io.mv(tcpath, newpath)
    if (process.platform !== "win32") {
        await chmod(newpath, fsconstants.S_IRWXU)
        await chmod(newpath, fsconstants.S_IRWXO)
    }
    exec.exec(`ls -laR ${upPath}`)
    exec.exec(`ls -laR /home/runner/work/_temp/`)
    core.addPath(upPath)
    return Promise.resolve(true)
}
