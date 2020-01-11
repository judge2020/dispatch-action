import * as core from '@actions/core'
import * as tc from '@actions/tool-cache'
import {chmod} from '@actions/io/lib/io-util'
import {constants as fsconstants} from 'fs'

export async function download(): Promise<boolean> {
    let path: string
    path = tc.find('dispatch', '1')
    if (!path) {
        switch (process.platform) {
            case 'win32':
                path = await tc.downloadTool('https://dl-dispatch.discordapp.net/download/win64')
                break
            case 'darwin':
                path = await tc.downloadTool('https://dl-dispatch.discordapp.net/download/macos')
                break
            case 'linux':
                path = await tc.downloadTool('https://dl-dispatch.discordapp.net/download/linux')
                break
            default:
                throw new Error(`Error: process.platform was ${process.platform}, not one of win32, darwin, linux`)
        }
    }
    const cachedPath = await tc.cacheFile(path,'dispatch.exe','dispatch.exe','1')
    if (process.platform !== "win32") {
        await chmod(cachedPath, fsconstants.S_IXUSR)
    }
    core.addPath(cachedPath)
    return Promise.resolve(true)
}
