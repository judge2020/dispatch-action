import * as core from '@actions/core'
import {download} from './download'
import * as os from 'os'
import { writeAuth } from './auth'

async function run(): Promise<void> {
    try {
        switch (os.platform()) {
            case 'win32':
        }
        const appid: string = core.getInput('application-id')
        core.info(`Application ID ${appid}`)
        const token: string = core.getInput('bot-token')
        core.info(`Bot token length ${token.length}`)
        await download()
        await writeAuth(appid, token)
    } catch (error) {
        core.setFailed(error.message)
    }
}

run()
