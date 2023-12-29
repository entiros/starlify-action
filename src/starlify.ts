import * as httpm from '@actions/http-client'
import core from '@actions/core'
import * as path from 'path'
import * as fs from 'fs'

interface Service {
  name: string
  uri: string
}

interface System {
  uuid: string
  services: Service
}

interface StarlifyConfig {
  system: System
}

export async function getSystem(
  workspaceId: string,
  systemId: string
): Promise<string> {
  try {
    const http = new httpm.HttpClient()
    http.requestOptions = {
      headers: {
        'X-API-KEY': `${core.getInput('starlify-api-key')}`,
        'Content-Type': 'application/json'
      }
    }
    const response = await http.getJson<any>(
      `https://api.starlify.com/hypermedia/domains/${workspaceId}/systems/${systemId}`
    )
    return response.result
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
  return ''
}

export async function readStarlifyConfig(): Promise<StarlifyConfig> {
  try {
    // Get the path to the starlify.json file
    const filePath = path.join(
      process.env.GITHUB_WORKSPACE || '',
      './starlify.json'
    )

    // Read the file
    const data: string = fs.readFileSync(filePath, 'utf8')

    // If the file is empty or doesnt exist, stop the workflow with a message
    if (!data) {
      core.setFailed('starlify.json is empty or does not exist')
    }

    // Parse the file
    return JSON.parse(data) as StarlifyConfig
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message)
      return {} as StarlifyConfig
    }
  }
  return {} as StarlifyConfig
}

export async function getSystemId(): Promise<string> {
  try {
    const system = await readStarlifyConfig()
    return system.system.uuid
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message)
      return ''
    }
  }
  return ''
}
