import { FieldElement } from "./field_element";

export class FieldInner extends FieldElement {

    constructor(
        private elementTop: FieldElement,
        private elementLeft: FieldElement,
        private elementBottom: FieldElement,
        private elementRight: FieldElement
    ) {
        super();
    }

    setTop(el: FieldElement) {
        this.elementTop = el;
    }

    setLeft(el: FieldElement) {
        this.elementLeft = el;
    }

    setBottom(el: FieldElement) {
        this.elementBottom = el;
    }

    setRight(el: FieldElement) {
        this.elementRight = el;
    }
}
