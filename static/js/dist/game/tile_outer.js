import { TileParent } from "./tile_parent.js";
export class TileOuter extends TileParent {
    isFlag() {
        return 0;
    }
    amountFlagsX() {
        return 0;
    }
    isMine() {
        return 0;
    }
    amountMinesX() {
        return 0;
    }
    spread() { }
    spreadX() { }
    placeNumber() { }
    addSelf(els) { }
    addXAndSelfElements(els) { }
}
