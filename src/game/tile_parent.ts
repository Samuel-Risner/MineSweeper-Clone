import { TileInner } from "./tile_inner.js";

export abstract class TileParent {
    
    abstract isFlag(): number;
    abstract amountFlagsLeftRight(): number;
    abstract isMine(): number;
    abstract amountMinesLeftRight(): number;

    abstract spread(): void;
    abstract spreadX(): void;
    abstract setNumber(): void;
    abstract addXAndSelfElements(els: TileInner[]): void;
    abstract addSelf(els: TileInner[]): void;

}
