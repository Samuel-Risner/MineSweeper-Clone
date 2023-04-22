import { FieldInner } from "./field_inner";

export abstract class FieldElement {

    abstract setTop(el: FieldElement): void;
    abstract setLeft(el: FieldElement): void;
    abstract setBottom(el: FieldElement): void;
    abstract setRight(el: FieldElement): void;
    abstract setMine(): boolean;
    abstract isMine(): number;
    abstract onClick(): void;
    abstract spread(): void;
    abstract setNumber(): void;
    abstract amountMinesLeftRight(): number;
    abstract spreadLeft(): void;
    abstract spreadRight(): void;
    abstract addXAndSelfElements(els: FieldInner[]): void;
    abstract addSelf(els: FieldInner[]): void;

}
