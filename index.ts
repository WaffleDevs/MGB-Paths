import { ShipRenderer } from "./src/js/ShipRenderer";
import { initializeOptions } from "./src/js/filters";
import { PathCardManager } from "./src/js/pathCards";
import { octoRequest } from "./src/js/util";

export const PathCardMgr = new PathCardManager();
export const ShipRenderMgr = new ShipRenderer();
export type pathData = {
	name: string;
	paths: {
		[key: string]: {
			path: string;
			description: string;
		};
	};
};
initializeOptions();

ShipRenderMgr.initializeRenderer();

const paths = [];
octoRequest("Paths").then((res: any) => {
	res.data.forEach((file: any) => {
		octoRequest(file.path).then((res: any) => {
			const data: pathData = JSON.parse(atob(res.data.content));
			console.log(data);
			PathCardMgr.createPathCard(data);
		});
	});
});
