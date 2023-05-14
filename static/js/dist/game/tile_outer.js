import { TileParent } from "./tile_parent.js";
export class TileOuter extends TileParent {
    isFlag() {
        return 0;
    }
    amountFlagsLeftRight() {
        return 0;
    }
    isMine() {
        return 0;
    }
    amountMinesLeftRight() {
        return 0;
    }
    spread() { }
    spreadX() { }
    setNumber() { }
    addSelf(els) { }
    addXAndSelfElements(els) { }
}
