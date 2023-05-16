import { Stats } from "./stats.js";
import { TileInner } from "./tile_inner.js";
import { TileOuter } from "./tile_outer.js";
export class Field {
    width;
    height;
    amountMines;
    gameSettings;
    /**
     * The html element in which "this.fieldTable" is displayed.
     */
    fieldContainer;
    /**
     * The html element which contains all the tiles the user can interact with.
     */
    fieldTable;
    /**
     * If the user already made their first click or not.
     */
    firstClick;
    /**
     * All the inner tiles.
     */
    tiles;
    /**
     * All the tiles (inner and outer).
     */
    allTiles;
    stats;
    constructor(game, 
    /**
     * The width of the field.
     */
    width, 
    /**
     * The height of the field.
     */
    height, 
    /**
     * The amount of mines in the field. (Value has to be disinfected before use.)
     */
    amountMines, gameSettings) {
        this.width = width;
        this.height = height;
        this.amountMines = amountMines;
        this.gameSettings = gameSettings;
        this.fieldContainer = document.getElementById("fieldContainer");
        this.fieldTable = document.createElement("table");
        this.fieldContainer.appendChild(this.fieldTable);
        this.firstClick = false;
        this.stats = new Stats(this.amountMines);
        this.tiles = [];
        this.allTiles = [];
        this._createField(game);
    }
    /**
     * Creates all the tiles, fills "this.tiles" and "this.allTiles" and links the individual tiles together.
     */
    _createField(game) {
        const outer = new TileOuter();
        // Top row with outer elements:
        let row = [];
        this.allTiles.push(row);
        for (let i = 0; i < this.width + 2; i++) {
            row.push(outer);
        }
        // The middle rows, starting and ending with outer tiles and in the middle with inner tiles:
        for (let i = 0; i < this.height; i++) {
            row = [];
            this.allTiles.push(row);
            row.push(outer);
            const row2 = [];
            this.tiles.push(row2);
            const rowElement = document.createElement("tr");
            this.fieldTable.appendChild(rowElement);
            for (let j = 0; j < this.width; j++) {
                const cellElement = document.createElement("td");
                rowElement.appendChild(cellElement);
                const t = new TileInner(cellElement, outer, outer, outer, outer, this, this.stats);
                row.push(t);
                row2.push(t);
            }
            row.push(outer);
        }
        // Bottom row with outer elements:
        row = [];
        this.allTiles.push(row);
        for (let i = 0; i < this.width + 2; i++) {
            row.push(outer);
        }
        // Link the inner elements together:
        for (let r = 1; r < this.allTiles.length - 1; r++) {
            for (let c = 1; c < this.allTiles[r].length - 1; c++) {
                const el = this.allTiles[r][c];
                el.setTop(this.allTiles[r - 1][c]);
                el.setLeft(this.allTiles[r][c - 1]);
                el.setBottom(this.allTiles[r + 1][c]);
                el.setRight(this.allTiles[r][c + 1]);
            }
        }
    }
    /**
     * Sets the mines in the field and the numbers for the other tiles.
     * @param doNotSetToMines A list with tiles that may not be set to mines.
     */
    _setMines(doNotSetToMines) {
        for (let i = 0; i < this.amountMines; i++) {
            const randomRow = this.tiles[Math.floor(Math.random() * this.tiles.length)];
            const randomTile = randomRow[Math.floor(Math.random() * randomRow.length)];
            // Tile may not be a mine:
            if (doNotSetToMines.includes(randomTile)) {
                i--;
                continue;
            }
            // If the tile is already a mine:
            if (!randomTile.placeMine()) {
                i--;
            }
        }
        // Set the numbers for the remaining tiles:
        for (let i = 0; i < this.tiles.length; i++) {
            for (let j = 0; j < this.tiles[i].length; j++) {
                this.tiles[i][j].placeNumber();
            }
        }
    }
    /**
     * This function is always called when the user clicks on a tile.
     * But only when the first ever click on a tile is made something relevant happens: The field is initialized.
     * @param el
     * @returns
     */
    onClick(el) {
        if (this.firstClick) {
            return;
        }
        this.firstClick = true;
        this._setMines(el.mayNotBeMine());
        this.stats.startTimer();
    }
    getMode() {
        return this.gameSettings.getMode();
    }
    gameOver() {
        for (const tileList of this.tiles) {
            for (const tile of tileList) {
                tile.forceReveal();
            }
        }
    }
}
