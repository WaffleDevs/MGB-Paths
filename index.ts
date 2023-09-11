import { Octokit } from "@octokit/core";
const octokit = new Octokit({
	auth: process.env.TOKEN,
});

octokit
	.request("GET /repos/{owner}/{repo}/contents/{path}", {
		owner: "dengr1065",
		repo: "shapez-mods",
		path: "src",
		headers: {
			"X-GitHub-Api-Version": "2022-11-28",
		},
	})
	.then((res) => {
		console.log(res);
	});
