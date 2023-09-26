import { ShipRenderMgr, pathData } from "../..";

export class PathCardManager {
	element: HTMLElement;
	pathCards: HTMLDivElement[];

	constructor() {}

	inititialize() {
		this.element = document.getElementById("pathViewer");
	}

	createPathCard(data: pathData) {
		const element = document.createElement("div");
		element.classList.add("pathCard");
		const img = document.createElement("img");
		img.src = ShipRenderMgr.render(data.paths[Object.keys(data.paths)[0]].path);

		this.pathCards.push(element);
	}

	renderPaths(filters: { [key: string]: any }) {
		this.element.innerHTML = "";
		const filteredCards: string[] = [];
		for (const card in this.pathCards) {
			for (const filter in filters) {
				const { text, btnId, helpText, func } = filters[filter];
				if (!$(`#${btnId}Submit`).prop("checked")) return;
				if (filteredCards.includes(this.pathCards[card].id)) return;
				if (!func(this.pathCards[card])) return;

				this.element.append(this.pathCards[card]);
				filteredCards.push(this.pathCards[card].id);
			}
		}
	}
}
