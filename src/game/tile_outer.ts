import { TileInner } from "./tile_inner.js";
import { TileParent } from "./tile_parent.js";

export class TileOuter extends TileParent {

    isFlag(): number {
        return 0
    }

    amountFlagsLeftRight(): number {
        return 0;
    }

    isMine(): number {
        return 0;
    }

    amountMinesLeftRight(): number {
        return 0;
    }

    spread() {}
    spreadX() {}
    setNumber() {}

    addSelf(els: TileInner[]) {}
    addXAndSelfElements(els: TileInner[]) {}

}
