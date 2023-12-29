import * as httpm from '@actions/http-client'
import core from '@actions/core'
import { wait } from './wait'

export async function getSystem(
  workspaceId: string,
  systemId: string
): Promise<void> {
  try {
    const http = new httpm.HttpClient('starlify-action')
    http.requestOptions = {
      headers: {
        'X-API-KEY': `${core.getInput('starlify-api-key')}`
      }
    }
    const response = await http.getJson<any>(
      `https://api.starlify.com/hypermedia/domains/${workspaceId}/systems/${systemId}`
    )
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
