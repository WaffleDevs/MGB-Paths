import { ShipStringMgr } from "../..";
import { ShipData } from "./shipString"
import contentStuff from "./contentStuff.json";

export class ShipRenderer {
    element: HTMLElement;
    string: string;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    shipData: ShipData;

    constructor(element: HTMLElement, string: string) {
        this.element = element;
        this.string = string;
    }

    initializeRenderer(parent: HTMLElement) {
        this.canvas = document.createElement("canvas")
        this.canvas.classList.add("shipRenderer")
        
        
        this.ctx = this.canvas.getContext("2d")

        parent.append(this.canvas)

        setInterval(() => {
			this.resizeCanvas();
		}, 1000);
        this.resizeCanvas()
    }

    resizeCanvas() {
		///$(this.canvas.parentElement).css("width", "100%");
		//$(this.canvas.parentElement).css("height", "100%");

		$(this.canvas).css("width", "100%");
		$(this.canvas).css("height", "100%");
		const min = Math.round(Math.min($(this.canvas).width(), $(this.canvas).height()));
		//const min = Math.round($(this.canvas).height());
		$(this.canvas).width(min);
		$(this.canvas).height(min);
		$(this.canvas.parentElement).width(min);
		$(this.canvas.parentElement).height(min);
		this.ctx.canvas.width = min;
		this.ctx.canvas.height = min;
	}

    render() {
        const step = this.canvas.width/4;
        if(!this.shipData) 
        {
            const decode = ShipStringMgr.decodeShipString(this.string) as ShipData;
            if(typeof decode != "object") throw new SyntaxError("Invalid String.")
            this.shipData = decode;
        }

        for(let x = 0; x < 4; x++){
            for(let y = 0; y < 4; y++){
                const img = new Image(x*step,y*step);
                img.src = `../../res/Chunks/${this.shipData.chunks[`x${x}y${y}`]}.png`
                this.ctx.drawImage(img,x*step,y*step) 
            }
        }

    }
}