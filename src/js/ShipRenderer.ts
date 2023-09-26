import { chunks } from "./content";
import { ShipData, decodeShipString, getSprite } from "./util";

export class ShipRenderer {
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;

	imageCache: {
		[key: number | string]: string;
	} = {};

	initializeRenderer() {
		this.canvas = document.createElement("canvas");
		this.canvas.width = 300;
		this.canvas.height = 300;
		this.canvas.style.left = "50%";
		this.canvas.style.position = "absolute";
		this.ctx = this.canvas.getContext("2d");

		Object.keys(chunks).forEach((chunk) => {
			const img = new Image(300, 300);
			img.src = chunks[chunk];
			img.onload = () => {
				this.ctx.drawImage(img, 0, 0, 300, 300);
			};
		});

		document.body.append(this.canvas);
	}

	render(string: string): any {
		const decode = decodeShipString(string) as ShipData;
		if (typeof decode != "object") throw new SyntaxError("Invalid String.");
		if (this.imageCache[decode.chunks.join("")]) return this.imageCache[decode.chunks.join("")];

		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		const step = this.canvas.width / 4;

		for (let x = 0; x < 4; x++) {
			for (let y = 0; y < 4; y++) {
				const img = new Image(step, step);
				img.src = chunks[decode.chunks[x + y * 4] - 1];
				this.ctx.drawImage(img, x * step, y * step, step, step);
			}
		}
		this.imageCache[decode.chunks.join("")] = this.canvas.toDataURL();
		return this.imageCache[decode.chunks.join("")];
	}
}
