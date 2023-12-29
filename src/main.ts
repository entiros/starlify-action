import core from '@actions/core'
import github from '@actions/github'
import { readStarlifyConfig } from './starlify'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    //const apiToken = core.getInput('api_key')
    //const workspaceId = core.getInput('workspace_id')
    //const ghToken = core.getInput('github_token')

    // Get the context of the current workflow run

    const config = await readStarlifyConfig()

    core.debug(`config: ${config.system.uuid}`)

    //core.debug(`workspaceId: ${workspaceId}`)
    //core.debug(`apiToken: ${apiToken}`)

    // Add a comment to the pull request
    // const octokit = github.getOctokit(ghToken)
    // await octokit.rest.issues.createComment({
    //   ...context.repo,
    //   issue_number: pullRequestNumber!,
    //   body: 'Hello from Starlify!'
    // })
  } catch (error) {
    // Fail the workflow run if an error occurs
    core.setFailed('failed')
  }
}
