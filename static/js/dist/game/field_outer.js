import { FieldElement } from "./field_element.js";
export class FieldOuter extends FieldElement {
    setTop(el) { }
    setLeft(el) { }
    setBottom(el) { }
    setRight(el) { }
    setMine() {
        return false;
    }
    isMine() {
        return 0;
    }
    onClick() { }
    spread() { }
    setNumber() { }
    amountMinesLeftRight() {
        return 0;
    }
    spreadLeft() { }
    spreadRight() { }
    addSelf(els) { }
    addXAndSelfElements(els) { }
}
