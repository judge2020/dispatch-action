import * as io from '@actions/io'
import * as os from 'os'
import * as path from 'path'
import {promises as fs} from 'fs'
export async function writeAuth(appid: string, botToken: string): Promise<boolean> {
    const outJson = {"BotCredentials": {"application_id": appid, "token": botToken}}
    const homedir = os.homedir()
    await io.mkdirP(path.join(homedir, '.dispatch'))
    await fs.writeFile(path.join(homedir, '.dispatch', 'credentials.json'), JSON.stringify(outJson))
    return true
}
