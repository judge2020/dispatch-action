import * as core from '@actions/core'
import {download} from './download'
import * as os from 'os'

async function run(): Promise<void> {
    try {
        switch (os.platform()) {
            case 'win32':
        }
        const appid: string = core.getInput('application-id')
        core.debug(`Application ID ${appid}`)
        const token: string = core.getInput('bot-token')
        core.debug(`Bot token length ${token.length}`)
        await download()
    } catch (error) {
        core.setFailed(error.message)
    }
}

run()
