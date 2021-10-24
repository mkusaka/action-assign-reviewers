"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
async function run() {
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
    }
    catch (error) {
        const e = error;
        core.error(e);
        core.setFailed(e.message);
    }
}
run();
