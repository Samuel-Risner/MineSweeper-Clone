import { TileInner } from "./tile_inner.js";
import { TileParent } from "./tile_parent.js";

export class TileOuter extends TileParent {

    isFlag(): 0 {
        return 0
    }

    amountFlagsX(): 0 {
        return 0;
    }

    isMine(): 0 {
        return 0;
    }

    amountMinesX(): 0 {
        return 0;
    }

    spread() {}
    spreadX() {}
    placeNumber() {}

    addSelf(els: TileInner[]) {}
    addXAndSelfElements(els: TileInner[]) {}

}
