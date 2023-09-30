import { chunks } from "./content";
import { ShipData, decodeShipString, getSprite, onload } from "./util";

const canvasSize = 600;

export class ShipRenderer {
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;

	imageCache: {
		[key: number | string]: string;
	} = {};
	chunkImages: {
		[key: number | string]: HTMLImageElement;
	} = {};
	initializeRenderer() {
		this.canvas = document.createElement("canvas");
		this.canvas.width = canvasSize;
		this.canvas.height = canvasSize;
		this.canvas.style.left = "-50%";
		this.canvas.style.position = "absolute";
		this.ctx = this.canvas.getContext("2d");

		Object.keys(chunks).forEach(async (chunk) => {
			const img = new Image(canvasSize, canvasSize);
			img.src = chunks[chunk];
			await onload(img, () => {
				this.ctx.drawImage(img, 0, 0, canvasSize, canvasSize);

				this.chunkImages[chunk] = img;
			});
			console.log(this.chunkImages[chunk]);
		});

		document.body.append(this.canvas);
	}

	render(string: string): any {
		try {
			const decode = decodeShipString(string) as ShipData;
			if (typeof decode != "object") throw new SyntaxError("Invalid String.");
			if (this.imageCache[decode.chunks.join("")]) return this.imageCache[decode.chunks.join("")];

			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			const step = this.canvas.width / 4;

			for (let x = 0; x < 4; x++) {
				for (let y = 0; y < 4; y++) {
					const img = this.chunkImages[decode.chunks[x + y * 4]];
					this.ctx.drawImage(img, x * step, y * step, step, step);
				}
			}
			this.imageCache[decode.chunks.join("")] = this.canvas.toDataURL();
			return this.imageCache[decode.chunks.join("")];
		} catch (e) {
			//window.location.reload();
		}
	}
}
