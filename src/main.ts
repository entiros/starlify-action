import core from '@actions/core'
import github from '@actions/github'
import { wait } from './wait'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const apiToken = core.getInput('api_key')
    const workspaceId = core.getInput('workspace_id')
    const ghToken = core.getInput('github_token')

    // Get the context of the current workflow run
    const context = github.context

    // Get the pull request number from the context
    const pullRequestNumber = context.payload.pull_request?.number

    // Add a comment to the pull request
    const octokit = github.getOctokit(ghToken)
    await octokit.rest.issues.createComment({
      ...context.repo,
      issue_number: pullRequestNumber!,
      body: 'Hello from Starlify!'
    })
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
