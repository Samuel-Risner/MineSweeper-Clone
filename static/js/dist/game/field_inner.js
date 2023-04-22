import { FieldElement } from "./field_element.js";
export class FieldInner extends FieldElement {
    elementTop;
    elementLeft;
    elementBottom;
    elementRight;
    constructor(elementTop, elementLeft, elementBottom, elementRight) {
        super();
        this.elementTop = elementTop;
        this.elementLeft = elementLeft;
        this.elementBottom = elementBottom;
        this.elementRight = elementRight;
    }
    setTop(el) {
        this.elementTop = el;
    }
    setLeft(el) {
        this.elementLeft = el;
    }
    setBottom(el) {
        this.elementBottom = el;
    }
    setRight(el) {
        this.elementRight = el;
    }
}
