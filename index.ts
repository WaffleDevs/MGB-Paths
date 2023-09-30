import { ShipRenderer } from "./src/js/ShipRenderer";
import { initializeFilters } from "./src/js/filters";
import { PathCardManager } from "./src/js/pathCards";
import { octoRequest } from "./src/js/util";
import { detailViewer } from "./src/js/detailViewer";
import { PathFinder } from "./src/js/pathfinder";
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

// const blocksFromChunk: {
// 	[key: number]: number[];
// } = {
// 	0: [0, 0, 0, 0, 0, 0, 0, 0, 0],
// 	1: [0, 0, 0, 0, 2, 0, 0, 1, 1],
// 	2: [0, 1, 1, 0, 0, 1, 0, 1, 1],
// 	3: [0, 1, 1, 0, 1, 0, 1, 1, 0],
// 	4: [0, 1, 0, 1, 1, 1, 0, 1, 0],
// 	5: [1, 1, 1, 1, 1, 1, 1, 1, 1],
// 	6: [1, 1, 0, 1, 1, 0, 1, 1, 0],
// 	7: [1, 1, 1, 1, 1, 1, 0, 0, 0],
// 	8: [1, 0, 0, 1, 1, 1, 0, 0, 1],
// 	9: [0, 0, 1, 0, 1, 1, 1, 1, 1],
// 	10: [0, 1, 1, 1, 0, 1, 1, 1, 0],
// 	11: [0, 0, 0, 1, 2, 1, 0, 0, 0],
// 	12: [0, 1, 0, 0, 1, 0, 1, 1, 1],
// };

// function getValueFromCoord(arr: string[], x: number, y: number) {
// 	return arr[x + y * 12];
// }

// function getShipDataFromChunks(chunks: { [key: number]: number }) {
// 	let ship: string[] = [
// 		//   [],
// 		//   [],
// 		//   [],
// 		//   [],
// 		//   [],
// 		//   [],
// 		//   [],
// 		//   [],
// 		//   [],
// 		//   [],
// 		//   [],
// 		//   []
// 		"",
// 		"",
// 		"",
// 		"",
// 		"",
// 		"",
// 		"",
// 		"",
// 		"",
// 		"",
// 		"",
// 		"",
// 		"",
// 	];
// 	let num = 0;
// 	for (let y = 0; y < 4; y++) {
// 		for (let x = 0; x < 4; x++) {
// 			const chunkArr = blocksFromChunk[chunks[num]].slice();
// 			num++;
// 			ship[0 + y * 3] += chunkArr.splice(0, 3).join("");
// 			ship[1 + y * 3] += chunkArr.splice(0, 3).join("");
// 			ship[2 + y * 3] += chunkArr.splice(0, 3).join("");
// 		}
// 	}
// 	return ship.join("").split("");
// }

// const ship = getShipDataFromChunks([5, 7, 7, 6, 6, 7, 6, 6, 6, 1, 6, 6, 7, 7, 7, 6]);
// console.log(ship);
// console.log(getValueFromCoord(ship, 4, 7));

// const BestPathFinder = new PathFinder();

// BestPathFinder.pathfind(ship);
