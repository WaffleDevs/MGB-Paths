import { ShipRenderer } from "./src/js/ShipRenderer";
import { initializeFilters } from "./src/js/filters";
import { PathCardManager } from "./src/js/pathCards";
import { octoRequest } from "./src/js/util";
import { detailViewer } from "./src/js/detailViewer";
export type pathData = {
	name: string;
	paths: {
		[key: string]: {
			path: string;
			description: string;
			src?: string;
			tags: string[];
		};
	};
};

export const PathCardMgr = new PathCardManager();
export const ShipRenderMgr = new ShipRenderer();
export const DetailViewer = new detailViewer();

initializeFilters();
export const pathJsons: pathData[] = [];

ShipRenderMgr.initializeRenderer();
PathCardMgr.inititialize();

new Promise<void>((resolve, reject) => {
	octoRequest("Paths").then((files: any) => {
		let num = 0;
		files.data.forEach((file: any) => {
			octoRequest(file.path)
				.then((res: any) => {
					const data: pathData = JSON.parse(atob(res.data.content));
					Object.keys(data.paths).forEach((paths) => {
						data.paths[paths].src = ShipRenderMgr.render(data.paths[paths].path);
					});
					PathCardMgr.createPathCard(data);
					pathJsons.push(data);
					num++;
				})
				.then(() => {
					if (files.data.length == num) {
						resolve();
					}
				});
		});
	});
}).then(() => {
	PathCardMgr.renderPaths();
	DetailViewer.initialize(PathCardMgr.pathCards);
});
