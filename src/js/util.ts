import { Octokit } from "@octokit/core";

const octokit = new Octokit({
	auth: atob("Z2l0aHViX3BhdF8xMUFTTkRPTVkwSFA0SHRTeTI0bnJLX3BPWEtONVVZWE1kWFc4dW52VWdHS0QxTTJ5dzhQTlhKcmV2bE1JVExiTU9CNUcyVUxWSnJCRVFqM2Za"),
});

export function octoRequest(path: string) {
	return octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
		owner: "WaffleDevs",
		repo: "MGB-Paths",
		path: path,
		headers: {
			"X-GitHub-Api-Version": "2022-11-28",
		},
	});
}

export function getSprite(folder: string, sprite: string) {
	console.log(`res/${folder}/${sprite}.png`);
	return octoRequest(`res/${folder}/${sprite}.png`);
}

export type ShipData = {
	//chunks: {[key:string]: number} | number[],
	chunks: number[];
	items: { [key: string]: {} };
};

export function decodeShipString(string: string): ShipData | Boolean | SyntaxError {
	const regex = /[a-z]/gim;
	console.log(string);
	if (string.search(regex) != -1) return false; // If string is not a number

	if (string.length != 366 && string.length != 621) return new SyntaxError("Incorrect Size");

	let returnShip: ShipData = {
		chunks: [],
		items: {},
	};

	const isCustom = string.substring(0, 1) == "1";
	if (isCustom) {
		let searchValue = 1; // Todo: Figure out good name
		for (let l = 0; l < 4; l++) {
			for (let m = 0; m < 4; m++) {
				let currentChunk = Number.parseInt(string.substring(searchValue, searchValue + 2)); // Todo: X

				//returnShip.chunks[`x${l}y${m}`] = currentChunk
				returnShip.chunks.push(currentChunk);
				searchValue += 2;
			}
		}

		for (let n = 0; n < 14; n++) {
			for (let i = 0; i < 14; i++) {
				let currentItem = Number.parseInt(string.substring(searchValue, searchValue + 2));
				if (currentItem > 3 || currentItem == 0 /*&& (Give.user.GetCustomShipStorage(n, i) == 0 || Give.user.GetCustomShipStorage(n, i) > 3)*/) {
					//Give.user.SetCustomShipStorage(n, i, (int)((byte)currentItem));
					returnShip.items[`x${n}y${i}`] = {
						item: currentItem,
						rotation: Number.parseInt(string.substring(searchValue, searchValue + 1)),
					};
					// add item currentItem to location n, i
				}
				searchValue += 2;
				//Give.user.SetCustomShipOrientation(n, i, (int)((byte)Number.parseInt(string.substring(searchValue,  searchValue+1))));
				searchValue++;
			}
		}
	}
	// ! Following code is for normal ships. Not fully transfered to JS

	// else
	// {
	// 	let shipId = Number.parseInt(string.substring(1, 2)); // Todo: X

	// 	Give.user.SetCurrentShipId((int)((byte)shipId));
	// 	let searchValue = 3; // Todo: Figure out good name
	// 	for (let num9 = 0; num9 < 11; num9++)
	// 	{
	// 		for (let num10 = 0; num10 < 11; num10++)
	// 		{
	// 			let currentItem = Number.parseInt(string.substring(searchValue,  searchValue+2)); // Todo: X
	// 			if ((currentItem > 3 || currentItem == 0) && ContentStuff.ships[ContentStuff.shipIDinContent[shipId]].storage[num9, num10] == 0)
	// 			{

	// 				Give.user.SetStorage((int)((byte)shipId), num9, num10, (byte)currentItem);
	// 				// add item currentItem to chunk n, i

	// 			}
	// 			searchValue += 2;
	// 			Give.user.SetStorageOrientation((int)((byte)shipId), num9, num10, (byte)Number.parseInt(string.substring(searchValue,  searchValue+1)));
	// 			searchValue++;
	// 		}
	// 	}
	// }
	return returnShip;
}

export function onload(img: HTMLImageElement, func: Function) {
	return new Promise<void>((resolve, reject) => {
		img.onload = (e) => {
			func(e);
			resolve();
		};
		img.onerror = (e, s, l, c, er) => {
			reject(`${e}, ${s}, ${l}, ${c}, ${er}`);
		};
	});
}
