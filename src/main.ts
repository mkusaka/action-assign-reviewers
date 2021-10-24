import * as core from "@actions/core";
import * as github from "@actions/github";

async function run(): Promise<void> {
  try {
    const githubToken = core.getInput("github_token");
    const reviewers = core
      .getInput("reviewers")
      .split("\n")
      .filter((l) => l !== "");

    const client = github.getOctokit(githubToken);
    const { owner, repo, number: pull_number } = github.context.issue;
    await client.rest.pulls.requestReviewers({
      owner,
      repo,
      pull_number,
      reviewers,
    });
  } catch (error) {
    const e = error as Error;
    core.error(e);
    core.setFailed(e.message);
  }
}

run();
