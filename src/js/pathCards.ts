import { ShipRenderMgr, pathData } from "../..";
import { filterStates, filters, shouldFilter } from "./filters";

export class PathCardManager {
	element: HTMLElement;
	pathCards: HTMLDivElement[] = [];

	constructor() {}

	inititialize() {
		this.element = document.getElementById("pathViewer");
	}

	createPathCard(data: pathData) {
		const element = document.createElement("div");
		element.classList.add("pathCard");
		element.id = data.name;

		const img = document.createElement("img");
		img.src = data.paths[Object.keys(data.paths)[0]].src;

		const para = document.createElement("p");
		para.textContent = data.name;

		element.append(para);
		element.append(img);
		this.pathCards.push(element);
	}

	renderPaths() {
		console.log("redinger");
		this.element.innerHTML = "";
		const filteredCards: string[] = [];
		console.log();

		for (const card in this.pathCards) {
			if (shouldFilter()) {
				console.log("filter");
				for (const filter in filters) {
					if (!filterStates[filter]) return;
					if (filteredCards.includes(this.pathCards[card].id)) return;

					const { text, btnId, helpText, func } = filters[filter];
					if (!func(this.pathCards[card])) return;

					this.element.append(this.pathCards[card]);
					filteredCards.push(this.pathCards[card].id);
				}
			} else {
				console.log("No Fliter");
				this.element.append(this.pathCards[card]);
				console.log(this.pathCards[card]);
			}
		}
	}
}
