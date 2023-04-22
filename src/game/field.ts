import { FieldElement } from "./field_element";
import { FieldInner } from "./field_inner";
import { FieldOuter } from "./field_outer";

export class Field {

    private field: FieldElement[][];
    
    constructor(
        private width: number,
        private height: number,
        private amountMines: number
    ) {
        this.field = [];
        this._createField();
    }

    private _createField() {
        const outer = new FieldOuter();

        // Top row with outer elements:
        let row: FieldElement[] = [];
        this.field.push(row);

        for (let i = 0; i < this.width + 2; i++) {
            row.push(outer);
        }

        // The middle rows, starting and ending with outer elements and in the middle with inner elements:
        for (let i = 0; i < this.height; i++) {
            row = [];
            this.field.push(row);

            row.push(outer);

            for (let j = 0; j < this.width; j++)  {
                row.push(new FieldInner(outer, outer, outer, outer));
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
