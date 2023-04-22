import { FieldElement } from "./field_element.js";
import { FieldInner } from "./field_inner.js";
import { FieldOuter } from "./field_outer.js";

export class Field {

    private fieldContainer: HTMLDivElement;
    private field: FieldElement[][];
    private fieldTable: HTMLTableElement;

    private firstClick: boolean;
    
    constructor(
        private width: number,
        private height: number,
        private amountMines: number
    ) {
        this.fieldContainer = document.getElementById("fieldContainer") as HTMLDivElement;
        this.fieldTable = document.createElement("table");
        this.fieldContainer.appendChild(this.fieldTable);

        console.log(width);
        console.log(height);
        console.log(amountMines);

        this.field = [];
        this._createField();

        this.firstClick = false;
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

            const rowElement = document.createElement("tr");
            this.fieldTable.appendChild(rowElement);

            for (let j = 0; j < this.width; j++)  {
                const cellElement = document.createElement("td");
                rowElement.appendChild(cellElement);

                row.push(new FieldInner(outer, outer, outer, outer, cellElement, this));
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

    private _setMines(doNotSetToMines: FieldElement[]) {
        for (let i = 0; i < this.amountMines; i++) {
            const randomRow = this.field[Math.floor(1 + Math.random()*this.field.length - 1)];
            const randomTile = randomRow[Math.floor(1 + Math.random()*randomRow.length - 1)];

            if (doNotSetToMines.includes(randomTile)) {
                i--;
                continue;
            }

            if (!randomTile.setMine()) {
                i--;
            }
        }

        for (let i = 1; i < this.field.length - 1; i++) {
            for (let j = 1; j < this.field[i].length - 1; j++) {
                this.field[i][j].setNumber();
            }
        }
    }

    onClick(el: FieldInner) {
        if (this.firstClick) {
            return;
        }

        this.firstClick = true;
        const randomSurroundings: FieldElement[] = el.getRandomSurroundings();
        this._setMines(randomSurroundings);
    }

}
