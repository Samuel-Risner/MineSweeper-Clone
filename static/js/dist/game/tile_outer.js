import { TileParent } from "./tile_parent.js";
export class TileOuter extends TileParent {
    isMine() {
        return 0;
    }
    onClick() { }
    spread() { }
    setNumber() { }
    amountMinesLeftRight() {
        return 0;
    }
    spreadLeft() { }
    spreadRight() { }
    addSelf(els) { }
    addXAndSelfElements(els) { }
}
