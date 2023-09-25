import { Octokit } from "@octokit/core";

export class PathCardManager {
    element: HTMLElement;
    paths: [];
    constructor(){
    }

    inititialize(parent: HTMLElement) {
        this.element = document.createElement("div");
        this.element.classList.add("pathCard");

        parent.append(this.element)

        const octokit = new Octokit({
        	auth: process.env.TOKEN,
        });

        octokit
        	.request("GET /repos/{owner}/{repo}/contents/{path}", {
        		owner: "WaffleDevs",
        		repo: "mgb-paths",
        		path: "/res",
        		headers: {
        			"X-GitHub-Api-Version": "2022-11-28",
        		},
        	})
        	.then((res:any) => {
        		console.log(res);
        	});
    }

    renderPaths(filter: []) {
        
    }
}