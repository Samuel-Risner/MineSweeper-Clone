import { TileInner } from "./tile_inner.js";
import { TileParent } from "./tile_parent.js";

export class TileOuter extends TileParent {

    isMine(): number {
        return 0;
    }
    onClick() {}
    spread() {}
    setNumber() {}
    amountMinesLeftRight() {
        return 0;
    }
    spreadLeft() {}
    spreadRight() {}

    addSelf(els: TileInner[]) {}
    addXAndSelfElements(els: TileInner[]) {}

}
