let tempDirectory = process.env['RUNNER_TEMPDIRECTORY'] || '';
import * as tc from '@actions/tool-cache';
import * as io from '@actions/io';
import * as path from 'path';

if (!tempDirectory) {
    let baseLocation;
    if (process.platform === 'win32') {
        // On windows use the USERPROFILE env variable
        baseLocation = process.env['USERPROFILE'] || 'C:\\';
    } else {
        if (process.platform === 'darwin') {
            baseLocation = '/Users';
        } else {
            baseLocation = '/home';
        }
    }
    tempDirectory = path.join(baseLocation, 'actions', 'temp');
}

export async function download(): Promise<boolean> {
    let path: string;
    path = tc.find('dispatch', '1')
    if(!path) {
        switch (process.platform) {
            case 'win32':
                path = await tc.downloadTool("https://dl-dispatch.discordapp.net/download/win64");
                break;
            case 'darwin':
                path = await tc.downloadTool("https://dl-dispatch.discordapp.net/download/macos");
                break;
            case 'linux':
                path = await tc.downloadTool("https://dl-dispatch.discordapp.net/download/linux");
                break;
            default:
                throw `Error: process.platform was ${process.platform}, not one of win32, darwin, linux`;
        }
    }
    console.log(path)
    return Promise.resolve(true);
}
