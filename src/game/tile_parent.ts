import { TileInner } from "./tile_inner.js";

export abstract class TileParent {
    
    abstract isFlag(): 0 | 1;
    abstract amountFlagsX(): 0 | 1 | 2;
    abstract isMine(): 0 | 1;
    abstract amountMinesX(): 0 | 1 | 2;

    abstract spread(): void;
    abstract spreadX(): void;
    abstract placeNumber(): void;
    abstract addXAndSelfElements(els: TileInner[]): void;
    abstract addSelf(els: TileInner[]): void;

}
