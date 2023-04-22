import { FieldInner } from "./field_inner.js";
import { FieldOuter } from "./field_outer.js";
export class Field {
    width;
    height;
    amountMines;
    fieldContainer;
    field;
    fieldTable;
    constructor(width, height, amountMines) {
        this.width = width;
        this.height = height;
        this.amountMines = amountMines;
        this.fieldContainer = document.getElementById("fieldContainer");
        this.fieldTable = document.createElement("table");
        this.fieldContainer.appendChild(this.fieldTable);
        console.log(width);
        console.log(height);
        console.log(amountMines);
        this.field = [];
        this._createField();
    }
    _createField() {
        const outer = new FieldOuter();
        // Top row with outer elements:
        let row = [];
        this.field.push(row);
        for (let i = 0; i < this.width + 2; i++) {
            row.push(outer);
        }
        // The middle rows, starting and ending with outer elements and in the middle with inner elements:
        for (let i = 0; i < this.height; i++) {
            row = [];
            this.field.push(row);
            row.push(outer);
            const rowElement = document.createElement("tr");
            this.fieldTable.appendChild(rowElement);
            for (let j = 0; j < this.width; j++) {
                const cellElement = document.createElement("td");
                rowElement.appendChild(cellElement);
                row.push(new FieldInner(outer, outer, outer, outer, cellElement));
            }
            row.push(outer);
        }
        // Bottom row with outer elements:
        row = [];
        this.field.push(row);
        for (let i = 0; i < this.width + 2; i++) {
            row.push(outer);
        }
        // Link the inner elements together:
        for (let r = 1; r < this.field.length - 1; r++) {
            for (let c = 1; c < this.field[r].length; c++) {
                const el = this.field[r][c];
                el.setTop(this.field[r - 1][c]);
                el.setLeft(this.field[r][c - 1]);
                el.setBottom(this.field[r + 1][c]);
                el.setRight(this.field[r][c + 1]);
            }
        }
    }
}
