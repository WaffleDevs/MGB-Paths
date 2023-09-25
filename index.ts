import { PathCardManager } from "./src/js/pathCards";
import { ShipStringManager } from "./src/js/shipString";


export const ShipStringMgr = new ShipStringManager();
export const PathCardMgr = new PathCardManager();
console.log(ShipStringMgr.decodeShipString("105070706060706060601060607070706010010010010010010010010010010010010010010010043183153153153153153153153153040010010010402043203203203203203203203040470010010010482202000010010010010010010200240010010010162202010043563563563040010200240010010010162202010042561561051570010200240010010010162202010010010010512570010200240010010010242202010010010010412570010200240010010010242202010010030010432550010200240010010010242202010010053363052550010200240010010010212042201201571551551041000200240010010010042211211211211211211201201041240010010010010010010010010010010010010000240010010010010010010010010010010010010010020010010"))

PathCardMgr.inititialize(document.body);