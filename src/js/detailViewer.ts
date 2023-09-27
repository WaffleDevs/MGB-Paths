import { DetailViewer, pathData, pathJsons } from "../..";

export class detailViewer {
	detailViewer: HTMLDivElement;
	selectedPath: pathData;

	selectedImage: HTMLImageElement;
	otherPaths: HTMLDivElement;
	selectedName: HTMLParagraphElement;
	selectedTags: HTMLParagraphElement;
	selectedDescription: HTMLParagraphElement;
	copySelectedString: HTMLButtonElement;
	selectedCostForChunks: HTMLParagraphElement;

	initialize(paths: HTMLDivElement[]) {
		this.detailViewer = document.getElementById("detailViewer") as HTMLDivElement;
		this.selectedImage = document.getElementById("selectedImage") as HTMLImageElement;
		this.otherPaths = document.getElementById("otherPaths") as HTMLDivElement;
		this.selectedName = document.getElementById("selectedName") as HTMLParagraphElement;
		this.selectedTags = document.getElementById("selectedTags") as HTMLParagraphElement;
		this.selectedDescription = document.getElementById("selectedDescription") as HTMLParagraphElement;
		this.copySelectedString = document.getElementById("copySelectedString") as HTMLButtonElement;
		this.selectedCostForChunks = document.getElementById("selectedCostForChunks") as HTMLParagraphElement;

		for (const key in paths) {
			const path = paths[key];
			//@ts-ignore
		}

		$(document.body).on("click", ".pathCard, .otherImg", (e) => {
			console.log(e.target.nodeName);
			if (e.target.nodeName == "IMG") {
				this.showViewer((e.target as HTMLImageElement).src);
			} else {
				this.selectedPath = pathJsons.filter((path: pathData) => path.name == (e.target as HTMLDivElement).id)[0];
				this.showViewer(((e.target as HTMLDivElement).lastChild as HTMLImageElement).src);
			}
		});

		$(document).on("keyup", (e) => {
			if ((e.key = "Escape")) this.detailViewer.style.display = "none";
		});

		$("#exitDetail").on("click", (e) => {
			console.log(e);
			this.detailViewer.style.display = "none";
		});
	}

	showViewer(path: string) {
		const currentPath = this.selectedPath.paths[Object.keys(this.selectedPath.paths).filter((ship) => this.selectedPath.paths[ship].src == path)[0]];
		console.log(currentPath);
		console.log(Object.keys(this.selectedPath.paths).filter((ship) => this.selectedPath.paths[ship].src == path));
		console.log(path);
		this.otherPaths.innerHTML = "";
		this.selectedImage.src = path;

		this.selectedDescription.textContent = currentPath.description;
		//this.selectedTags.textContent = currentPath.tags.join(", ");
		this.selectedName.textContent = this.selectedPath.name;

		this.detailViewer.style.display = "grid";

		for (const key in this.selectedPath.paths) {
			const path = this.selectedPath.paths[key];
			const img = document.createElement("img");
			img.src = path.src;
			img.classList.add("otherImg");
			img.id = `otherImg${key}`;
			console.log(path);
			img.onload = () => {
				this.otherPaths.append(img);
			};
		}
	}
}
