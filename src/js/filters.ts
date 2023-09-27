import { PathCardMgr, pathData, pathJsons } from "../..";

export const filters: {
	[key: string]: any;
} = {
	hidePortals: {
		text: "No Portals.",
		btnId: "hidePortals",
		helpText: "Hides any custom ships that don't have a non-portal variant.",
		func: function (card: HTMLDivElement) {
			const path = pathJsons.filter((path: pathData) => path.name == card.id)[0];
			console.log(Object.keys(path.paths).filter((ppath) => path.paths[ppath].tags.includes("noportal")));
			return Object.keys(path.paths).filter((ppath) => path.paths[ppath].tags.includes("noportal"));
		},
	},
	dynamicYsSize: {
		text: "Dynamic yS Size",
		btnId: "dynamicYsSize",
		helpText: "Changes the YS Square size depending on amount. Full = 10% of tier. Small Square = 1;",
		func: function () {},
	},
	disableTierNumbers: {
		text: "Disable Tier Numbers",
		btnId: "disableTierNumbers",
		helpText: "No Tier Numbers",
		func: function () {},
	},
};

export const filterStates: {
	[key: string]: any;
} = {};

export function initializeFilters() {
	console.log("a");
	let maxSize = 0;
	for (const filter in filters) {
		const { text, btnId, helpText } = filters[filter];
		const globalSize = $(window).width() * 0.0085 + 1;
		console.log(globalSize, text.length, text);
		maxSize = text.length * globalSize > maxSize ? text.length * globalSize : maxSize;
		filterStates[filter] = false;
		const element = $(`
        <div class="rounded-full bg-gray-600 p-4 flex items-center relative w-full cursor-pointer select-none min-w-full">
            <span class="hasHelp text-[1vw] font-bold">${text}</span>
            <div class="hide">${helpText}</div>
            <div class="flex items-center w-max cursor-pointer select-none absolute right-4">
                <input
                    id="${btnId}Input"
                    type="checkbox"
                    class=" transition-colors cursor-pointer w-14 h-7 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-blue-500 bg-red-500"
                />
                
            </div>
        </div>
    `);
		$("#filters").append(element);
		$(`#${btnId}Input`).on("click", () => {
			filterStates[filter] = $(`#${btnId}Input`).prop("checked");
			PathCardMgr.renderPaths();
		});
	}
	$(`#filters`).css(`min-width`, `${maxSize}px`);
	$(`#filters`).css(`max-width`, `${maxSize}px`);
}

export function shouldFilter() {
	let shouldFilter = false;
	for (const filter in filters) {
		const { text, btnId, helpText, func } = filters[filter];
		if ($(`#${btnId}Input`).prop("checked")) {
			shouldFilter = true;
		}
	}
	return shouldFilter;
}
