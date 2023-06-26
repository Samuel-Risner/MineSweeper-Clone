import { Field } from "./index.js";
import { TileParent } from "./tile_parent.js";
import { settings } from "./../settings.js";
import { Revealed, Contents } from "./enums.js";

export class TileInner extends TileParent {

    /**
     * `-1` -> mine;
     * `0` -> empty;
     * `1` to `8` -> corresponding numbers
     */
    private contents: Contents;
    private revealed: Revealed;

    /**
     * Displays the tiles background color and receives the onclick event.
     */
    private colorElement: HTMLButtonElement;
    /**
     * Displays the number the tile has, otherwise an empty string or the element is hidden.
     */
    private numberElement: HTMLDivElement;
    /**
     * Displays the mine or question mark image, otherwise the source is an empty string or the element is hidden.
     */
    private imageElement: HTMLImageElement;

    constructor(
        tableCellElement: HTMLTableCellElement,
        private elementTop: TileParent,
        private elementLeft: TileParent,
        private elementBottom: TileParent,
        private elementRight: TileParent,
        private field: Field
    ) {
        super();

        this.colorElement = document.createElement("button");
        this.numberElement = document.createElement("div");
        this.imageElement = document.createElement("img");
        this.setupElements(tableCellElement);

        this.contents = Contents.EMPTY;
        this.revealed = Revealed.NOT;
    }

    //
    // - Setup functions
    //

    /**
     * Appends the html elements together, adds the onclick events to them and stets their class names in TailwindCSS.
     * @param tableCellElement (Passed in the constructor.)
     */
    private setupElements(tableCellElement: HTMLTableCellElement) {
        tableCellElement.appendChild(this.colorElement);
        this.colorElement.appendChild(this.numberElement);
        this.colorElement.appendChild(this.imageElement);

        this.colorElement.className = settings.tile.styles.default;
        this.numberElement.className = settings.tile.numberElementStyles.default;
        this.numberElement.hidden = true;
        this.imageElement.hidden = true;

        this.colorElement.onclick = () => {
            this.onClick(true);
        }

        this.colorElement.oncontextmenu = (ev: MouseEvent) => {
            ev.preventDefault();
            this.onClick(false);
        }
    }

    /**
     * Sets the tiles number to correspond to the amount of mines in the eight surrounding tiles.
     */
    placeNumber() {
        if (this.contents === Contents.MINE) {
            return;
        }

        this.contents = this.elementBottom.isMine() + this.elementLeft.isMine() + this.elementTop.isMine() + this.elementRight.isMine() + this.elementTop.amountMinesX() + this.elementBottom.amountMinesX();

        if ((this.contents >= Contents.ONE) && (this.contents <= Contents.EIGHT)) {
            this.numberElement.textContent = String(this.contents);
        }
    }

    /**
     * Returns the tiles that may not be set to be mines.
     * @returns A list with up to 9 tiles.
     */
    mayNotBeMine(): TileInner[] {
        const toReturn: TileInner[] = [this];

        this.elementTop.addXAndSelfElements(toReturn);
        this.elementLeft.addSelf(toReturn);
        this.elementBottom.addXAndSelfElements(toReturn);
        this.elementRight.addSelf(toReturn);

        return toReturn;
    }

    //
    // - Setter functions
    //

    setTop(el: TileParent) {
        this.elementTop = el;
    }

    setLeft(el: TileParent) {
        this.elementLeft = el;
    }

    setBottom(el: TileParent) {
        this.elementBottom = el;
    }

    setRight(el: TileParent) {
        this.elementRight = el;
    }
    
    /**
     * Sets the tile to be a mine, unless it already is a mine.
     * @returns `true` if the tile was set to contain a mine, `false` if it already contained a mine.
     */
    placeMine(): boolean {
        if (this.contents === Contents.MINE) {
            return false;
        }

        this.contents = Contents.MINE;
        return true;
    }

    //
    // - Getter functions
    //

    /**
     * @returns `1`: tile contains a mine; `0`: tile contains no mine.
     */
    isMine(): 0 | 1 {
        return this.contents === Contents.MINE? 1 : 0;
    }

    /**
     * @returns How many mines there are on the neighboring left and right tile.
     */
    amountMinesX(): 0 | 1 | 2 {
        return (this.elementLeft.isMine() + this.elementRight.isMine()) as 0 | 1 | 2;
    }

    /**
     * @returns `1`: tile contains a flag; `0`: tile contains no flag.
     */
    isFlag(): 0 | 1 {
        return this.revealed === Revealed.FLAG? 1 : 0;
    }

    /**
     * @returns How many flags there are on the neighboring left and right tile.
     */
    amountFlagsX(): 0 | 1 | 2 {
        return (this.elementLeft.isFlag() + this.elementRight.isFlag()) as 0 | 1 | 2;
    }

    //
    // - Functions for spreading
    //

    /**
     * Calls the spread-function on the tiles left and right neighbor.
     */
    spreadX() {
        this.elementLeft.spread();
        this.elementRight.spread();
    }

    /**
     * When an empty tile is clicked all adjacent tiles are revealed until a tile containing a number is reached.
     */
    spread() {
        if (this.revealed !== Revealed.NOT) {
            return;
        }

        if (this.contents === Contents.MINE) {
            this.setMine();
            this.onMine();
            return;
        }

        this.revealed = Revealed.IS;
        this.numberElement.hidden = false;
        this.lookRevealed();

        // If the tile contains a number its style is set and the spreading stops.
        if (this.contents >= Contents.ONE) {
            this.setStyle();
            return;
        }

        this.elementTop.spread();
        this.elementLeft.spread();
        this.elementBottom.spread();
        this.elementRight.spread();
        this.elementBottom.spreadX();
        this.elementTop.spreadX();
    }

    //
    // - Functions for getting elements into lists
    //

    /**
     * Adds this tile to the passed list.
     * @param els The list to which the element should be added.
     */
    addSelf(els: TileInner[]) {
        els.push(this);
    }

    /**
     * Adds this tile and its left and the right neighbor to the passed list.
     * @param els The list to which the elements should be added.
     */
    addXAndSelfElements(els: TileInner[]) {
        els.push(this);
        this.elementLeft.addSelf(els);
        this.elementRight.addSelf(els);
    }

    //
    // - Functions connected to TailwindCSS
    //

    /**
     * Sets the tile to have a lighter background color, indicating that it is revealed.
     */
    private lookRevealed() {
        this.colorElement.className = settings.tile.styles.revealed;
    }

    /**
     * Sets the color for the number/text for the tiles number.
     */
    private setStyle() {
        this.numberElement.className = settings.tile.numberElementStyles[this.contents] as string;
    }

    /**
     * Sets the tile to display a flag.
     */
    private setFlag() {
        this.imageElement.src = settings.images.flag;
        this.imageElement.hidden = false;
        this.numberElement.hidden = true;
        this.revealed = Revealed.FLAG;
    }

    /**
     * Sets the tile to display a question mark.
     */
    private setQuestionMark() {
        this.imageElement.src = settings.images.questionMark;
        this.imageElement.hidden = false;
        this.numberElement.hidden = true;
        this.revealed = Revealed.QUESTION_MARK;
    }

    /**
     * Sets the tile to be unrevealed.
     */
    private setNotRevealed() {
        this.imageElement.src = "";
        this.imageElement.hidden = true;
        this.numberElement.hidden = true;
        this.revealed = Revealed.NOT;
    }

    /**
     * Sets the tile to display a mine.
     */
    private setMine() {
        this.imageElement.src = settings.images.mine;
        this.imageElement.hidden = false;
        this.numberElement.hidden = true;
        this.revealed = Revealed.IS;

        this.colorElement.className = settings.tile.styles.mine;
    }

    /**
     * Sets the tile to display its number.
     */
    private setNumber() {
        this.imageElement.src = "";
        this.imageElement.hidden = true;
        this.numberElement.hidden = false;
        this.revealed = Revealed.IS;

        this.lookRevealed();
        this.setStyle();
    }

    /**
     * When the tile is clicked.
     */
    private onClick(leftClick: boolean) {
        // If this is the first ever tile being clicked the game needs further setup (creating mines and numbers).
        this.field.onClick(this);

        switch (this.revealed) {
            case Revealed.NOT: // If the tile is not revealed yet and no question mark or flag is on it:

                // If the tile should be revealed (the mode is in "reveal tile" and the user clicked with the left mouse button):
                if ((this.field.getMode() === 0) && leftClick) {

                    // If the tile is empty it is revealed, including the adjacent tiles:
                    if (this.contents === 0) {
                        this.spread();
                    
                    // If there is a mine on the tile the game is terminated:
                    } else if (this.contents === -1) {
                        this.setMine();
                        this.onMine();
                    
                    // When a number is on the tile, the number is revealed:
                    } else {
                        this.setNumber();
                    }

                // If a flag should be set (the mode is in "set flag" or the user clicked with the right mouse button):
                } else {
                    this.setFlag();
                    this.stats.addFlag(this.contents === -1);
                }

                break;

            case Revealed.QUESTION_MARK: // If there is a question mark on the tile:

                // If a flag should be set (the mode is in "set flag" or the user clicked with the right mouse button), the tile is set to be not revealed:
                if ((this.field.getMode() === 1) || !leftClick) {
                    this.setNotRevealed();
                    this.stats.removeQuestionMark();
                }

                break;

            case Revealed.FLAG: // If there is a flag on the tile:

                // If a flag should be set (the mode is in "set flag" or the user clicked with the right mouse button), a question mark is set:
                if ((this.field.getMode() === 1) || !leftClick) {
                    this.setQuestionMark();
                    this.stats.removeFlag(this.contents === -1);
                    this.stats.addQuestionMark();
                }

                break;
            
            case Revealed.IS: // The tile is revealed:

                // If there is a number on the tile:
                if (this.contents > 0) {
                    const amountFlags = this.elementBottom.isFlag() + this.elementLeft.isFlag() + this.elementRight.isFlag() + this.elementTop.isFlag() + this.elementBottom.amountFlagsX() + this.elementTop.amountFlagsX();

                    // When the number on the tile matches the amount of flags in the surrounding eight tiles, the eight tiles are revealed:
                    if (this.contents === amountFlags) {
                        this.elementBottom.spread();
                        this.elementLeft.spread();
                        this.elementRight.spread();
                        this.elementTop.spread();
                        this.elementBottom.spreadX();
                        this.elementTop.spreadX();
                    }
                }

                break;
        }

        const time = this.stats.isVictory();

        if (time !== -1) {
            this.field.onVictory();
        }
    }

    private onMine() {
        this.field.onDefeat();
    }

    forceReveal() {
        this.colorElement.onclick = null;
        this.colorElement.oncontextmenu = null;
        
        if (this.revealed === Revealed.IS) {
            return;
        }

        if (this.contents === -1) {
            if (this.revealed !== Revealed.FLAG) {
                this.setMine();
            }
        } else if (this.contents === 0) {
            this.lookRevealed()
        } else {
            this.setNumber();
        }
        
        this.colorElement.className = settings.tile.styles.wrongGuess;
    }

}
