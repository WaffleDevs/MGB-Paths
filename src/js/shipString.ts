export type ShipData = {
    chunks: {[key:string]: number},
    items: {[key:string]: {}},
}

export class ShipStringManager {
    decodeShipString(string: string): ShipData | Boolean | SyntaxError {
        const regex = /[a-z]/gmi
        console.log(string.search(regex))
        if(string.search(regex) != -1) return false; // If string is not a number

		if (string.length != 366 && string.length != 621) return new SyntaxError("Incorrect Size");
		

        let returnShip: ShipData = {
            chunks: {},
            items: {}
        };

        const isCustom = string.substring(0,1) == "1";
		if (isCustom)
		{
			let searchValue = 1; // Todo: Figure out good name
			for (let l = 0; l < 4; l++)
			{
				for (let m = 0; m < 4; m++)
				{
					let currentChunk = Number.parseInt(string.substring(searchValue,  searchValue+2)); // Todo: X

                    returnShip.chunks[`x${l}y${m}`] = currentChunk

					searchValue += 2;
				}
			}

            for (let n = 0; n < 14; n++)
			{
				for (let i = 0; i < 14; i++)
				{
					let currentItem = Number.parseInt(string.substring(searchValue, searchValue+2));
					if ((currentItem > 3 || currentItem == 0) /*&& (Give.user.GetCustomShipStorage(n, i) == 0 || Give.user.GetCustomShipStorage(n, i) > 3)*/)
					{
						//Give.user.SetCustomShipStorage(n, i, (int)((byte)currentItem));
                        returnShip.items[`x${n}y${i}`] = {
                            item: currentItem,
                            rotation: Number.parseInt(string.substring(searchValue,  searchValue+1))
                        }
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

    // decodeShipStringOld(string: string) {

	// 	if(string != Number.parseInt(string).toString()) return; // If string is not a number

	// 	if (string.length != 366 && string.length != 621) return;
		

    //     let returnShip: {} = {
    //         "chunks": {}
    //     }

    //     const isCustom = string.substring(0,1) == "1";
	// 	let isMissingItems = 0; // Todo: Remove
	// 	if (isCustom)
	// 	{
	// 		let itemCounts = new Array(100); // Todo: Remove
	// 		for (let j = 0; j < 100; j++)
	// 		{
	// 			itemCounts[j] = Give.user.GetItemsOwnedCount(j);
	// 		}

	// 		let isChunkOwned = new Array(21); // Todo: Remove
	// 		for (let k = 0; k < 21; k++)
	// 		{
	// 			isChunkOwned[k] = Give.user.GetBuildingBlockOwned(k);
	// 		}
	// 		let searchValue = 1; // Todo: Figure out good name
	// 		for (let l = 0; l < 4; l++)
	// 		{
	// 			for (let m = 0; m < 4; m++)
	// 			{
	// 				let currentChunk = Number.parseInt(string.substring(searchValue,  searchValue+2)); // Todo: X
	// 				isChunkOwned[currentChunk]--;
	// 				if (isChunkOwned[currentChunk] >= 0)
	// 				{
	// 					Give.user.SetCustomShipBuildBlock(l, m, currentChunk);
    //                     // returnShip[`x${l}y${m}`] = {};
    //                     // returnShip[`x${l}y${m}`].ship = currentChunk;
	// 				}
	// 				else
	// 				{
	// 					Give.user.SetCustomShipBuildBlock(l, m, 0);
    //                     // returnShip[`x${l}y${m}`] = {};
    //                     // returnShip[`x${l}y${m}`].ship = 0;
	// 					if (currentChunk != 0)
	// 					{
	// 						isMissingItems++;
	// 					}
	// 				}
	// 				searchValue += 2;
	// 			}
	// 		}

    //         for (let n = 0; n < 14; n++)
	// 		{
	// 			for (let i = 0; i < 14; i++)
	// 			{
	// 				let currentItem = Number.parseInt(string.substring(searchValue,  searchValue+2));
	// 				if ((currentItem > 3 || currentItem == 0) && (Give.user.GetCustomShipStorage(n, i) == 0 || Give.user.GetCustomShipStorage(n, i) > 3))
	// 				{
	// 					itemCounts[currentItem]--;
	// 					if (itemCounts[currentItem] >= 0)
	// 					{
	// 						Give.user.SetCustomShipStorage(n, i, (int)((byte)currentItem));
	// 					}
	// 					else
	// 					{
	// 						Give.user.SetCustomShipStorage(n, i, 0);
	// 						if (currentItem != 0)
	// 						{
	// 							isMissingItems++;
	// 						}
	// 					}
	// 				}
	// 				searchValue += 2;
	// 				Give.user.SetCustomShipOrientation(n, i, (int)((byte)Number.parseInt(string.substring(searchValue,  searchValue+1))));
	// 				searchValue++;
	// 			}
	// 		}
	// 	}
	// 	else
	// 	{
	// 		let shipId = Number.parseInt(string.substring(1, 2)); // Todo: X

	// 		let itemCounts = new Array(100); // Todo: Remove
	// 		for (let num7 = 0; num7 < 100; num7++)
	// 		{
	// 			itemCounts[num7] = Give.user.GetItemsOwnedCount(num7);
	// 		}
	// 		Give.user.SetCurrentShipId((int)((byte)shipId));
	// 		let searchValue = 3; // Todo: Figure out good name
	// 		for (let num9 = 0; num9 < 11; num9++)
	// 		{
	// 			for (let num10 = 0; num10 < 11; num10++)
	// 			{
	// 				let currentItem = Number.parseInt(string.substring(searchValue,  searchValue+2)); // Todo: X
	// 				if ((currentItem > 3 || currentItem == 0) && ContentStuff.ships[ContentStuff.shipIDinContent[shipId]].storage[num9, num10] == 0)
	// 				{
	// 					itemCounts[currentItem]--;
	// 					if (itemCounts[currentItem] >= 0)
	// 					{
	// 						Give.user.SetStorage((int)((byte)shipId), num9, num10, (byte)currentItem);
	// 					}
	// 					else
	// 					{
	// 						Give.user.SetStorage((int)((byte)shipId), num9, num10, 0);
	// 						if (currentItem != 0)
	// 						{
	// 							isMissingItems++;
	// 						}
	// 					}
	// 				}
	// 				searchValue += 2;
	// 				Give.user.SetStorageOrientation((int)((byte)shipId), num9, num10, (byte)Number.parseInt(string.substring(searchValue,  searchValue+1)));
	// 				searchValue++;
	// 			}
	// 		}
	// 	}
	// 	if (isMissingItems == 0)
	// 	{
	// 		this.pastedText.string = "Paste successfull. All items owned.";
	// 	}
	// 	else
	// 	{
	// 		this.pastedText.string = "Paste successfull but " + isMissingItems.ToString() + " items not owned.";
	// 	}
    // }
}