import 'dotenv/config'
import { Octokit, App } from "octokit";

export default async function(){
    // Octokit.js
// https://github.com/octokit/core.js#readme
const octokit = new Octokit({
    auth: process.env.GIT_KEY
  })
  
  const userData = await octokit.request('GET /user', {
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })

  return userData
}