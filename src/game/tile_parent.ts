import { TileInner } from "./tile_inner.js";

export abstract class TileParent {
    
    abstract isMine(): number;
    abstract spread(): void;
    abstract setNumber(): void;
    abstract amountMinesLeftRight(): number;
    abstract spreadLeft(): void;
    abstract spreadRight(): void;



    abstract addXAndSelfElements(els: TileInner[]): void;
    abstract addSelf(els: TileInner[]): void;

}
