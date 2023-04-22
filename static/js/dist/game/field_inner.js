import { FieldElement } from "./field_element.js";
export class FieldInner extends FieldElement {
    elementTop;
    elementLeft;
    elementBottom;
    elementRight;
    fieldElement;
    constructor(elementTop, elementLeft, elementBottom, elementRight, fieldElement) {
        super();
        this.elementTop = elementTop;
        this.elementLeft = elementLeft;
        this.elementBottom = elementBottom;
        this.elementRight = elementRight;
        this.fieldElement = fieldElement;
        this._createElements();
    }
    _createElements() {
        const div = document.createElement("div");
        this.fieldElement.appendChild(div);
        const textDiv = document.createElement("div");
        div.appendChild(textDiv);
        textDiv.textContent = `q`;
        div.className = "bg-red-500 w-10 aspect-square flex";
        textDiv.className = "m-auto";
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
