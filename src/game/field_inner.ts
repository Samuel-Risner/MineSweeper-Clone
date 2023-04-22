import { FieldElement } from "./field_element.js";

export class FieldInner extends FieldElement {

    constructor(
        private elementTop: FieldElement,
        private elementLeft: FieldElement,
        private elementBottom: FieldElement,
        private elementRight: FieldElement,
        private fieldElement: HTMLTableCellElement
    ) {
        super();
        this._createElements();
    }

    private _createElements() {
        const div = document.createElement("div");
        this.fieldElement.appendChild(div);
        div.textContent = `q`;
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
