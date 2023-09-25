import { Octokit } from "@octokit/core";
const octokit = new Octokit({
	auth: process.env.TOKEN,
});

octokit
	.request("GET /repos/{owner}/{repo}/contents/{path}", {
		owner: "WaffleDevs",
		repo: "mgb-paths",
		path: "/PathImages",
		headers: {
			"X-GitHub-Api-Version": "2022-11-28",
		},
	})
	.then((res) => {
		console.log(res);
	});
