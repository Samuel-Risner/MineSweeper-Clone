import { FieldElement } from "./field_element.js";
import { FieldInner } from "./field_inner.js";

export class FieldOuter extends FieldElement {
    
    setTop(el: FieldElement) {}
    setLeft(el: FieldElement) {}
    setBottom(el: FieldElement) {}
    setRight(el: FieldElement) {}
    setMine(): boolean {
        return false;
    }
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

    addSelf(els: FieldInner[]) {}
    addXAndSelfElements(els: FieldInner[]) {}

}
