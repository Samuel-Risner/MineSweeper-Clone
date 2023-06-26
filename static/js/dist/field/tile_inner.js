import { TileParent } from "./tile_parent.js";
import { settings } from "./../settings.js";
import { Revealed, Contents } from "./enums.js";
export class TileInner extends TileParent {
    elementTop;
    elementLeft;
    elementBottom;
    elementRight;
    field;
    stats;
    contents;
    revealed;
    /**
     * Displays the tiles background color and receives the onclick event.
     */
    colorElement;
    /**
     * Displays the number the tile has, otherwise an empty string or the element is hidden.
     */
    numberElement;
    /**
     * Displays the mine or question mark image, otherwise the source is an empty string or the element is hidden.
     */
    imageElement;
    constructor(tableCellElement, elementTop, elementLeft, elementBottom, elementRight, field, stats) {
        super();
        this.elementTop = elementTop;
        this.elementLeft = elementLeft;
        this.elementBottom = elementBottom;
        this.elementRight = elementRight;
        this.field = field;
        this.stats = stats;
        this.contents = Contents.EMPTY;
        this.revealed = Revealed.NOT;
        this.colorElement = document.createElement("button");
        this.numberElement = document.createElement("div");
        this.imageElement = document.createElement("img");
        this.imageElement.className = settings.tile.styles.imageElement;
        this.setupElements(tableCellElement);
    }
    //
    // - Setup functions
    //
    /**
     * Appends the html elements together, adds the onclick events to them and stets their class names in TailwindCSS.
     * @param tableCellElement (Passed in the constructor.)
     */
    setupElements(tableCellElement) {
        tableCellElement.appendChild(this.colorElement);
        this.colorElement.appendChild(this.numberElement);
        this.colorElement.appendChild(this.imageElement);
        this.colorElement.className = settings.tile.styles.default;
        this.numberElement.className = settings.tile.numberElementStyles.default;
        this.numberElement.hidden = true;
        this.imageElement.hidden = true;
        this.colorElement.onclick = () => {
            this.onClick(true);
        };
        this.colorElement.oncontextmenu = (ev) => {
            ev.preventDefault();
            this.onClick(false);
        };
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
    mayNotBeMine() {
        const toReturn = [this];
        this.elementTop.addXAndSelfElements(toReturn);
        this.elementLeft.addSelf(toReturn);
        this.elementBottom.addXAndSelfElements(toReturn);
        this.elementRight.addSelf(toReturn);
        return toReturn;
    }
    //
    // - Setter functions
    //
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
    /**
     * Sets the tile to be a mine, unless it already is a mine.
     * @returns `true` if the tile was set to contain a mine, `false` if it already contained a mine.
     */
    placeMine() {
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
    isMine() {
        return this.contents === Contents.MINE ? 1 : 0;
    }
    /**
     * @returns How many mines there are on the neighboring left and right tile.
     */
    amountMinesX() {
        return (this.elementLeft.isMine() + this.elementRight.isMine());
    }
    /**
     * @returns `1`: tile contains a flag; `0`: tile contains no flag.
     */
    isFlag() {
        return this.revealed === Revealed.FLAG ? 1 : 0;
    }
    /**
     * @returns How many flags there are on the neighboring left and right tile.
     */
    amountFlagsX() {
        return (this.elementLeft.isFlag() + this.elementRight.isFlag());
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
    addSelf(els) {
        els.push(this);
    }
    /**
     * Adds this tile and its left and the right neighbor to the passed list.
     * @param els The list to which the elements should be added.
     */
    addXAndSelfElements(els) {
        els.push(this);
        this.elementLeft.addSelf(els);
        this.elementRight.addSelf(els);
    }
    //
    // - Functions connected to appearance
    //
    /**
     * Sets the tile to have a lighter background color, indicating that it is revealed.
     */
    lookRevealed() {
        this.colorElement.className = settings.tile.styles.revealed;
    }
    /**
     * Sets the color for the number/text for the tiles number.
     */
    setStyle() {
        this.numberElement.className = settings.tile.numberElementStyles[this.contents];
    }
    /**
     * Sets the tile to display a flag.
     */
    setFlag() {
        this.imageElement.src = settings.images.flag;
        this.imageElement.hidden = false;
        this.numberElement.hidden = true;
        this.revealed = Revealed.FLAG;
    }
    /**
     * Sets the tile to display a question mark.
     */
    setQuestionMark() {
        this.imageElement.src = settings.images.questionMark;
        this.imageElement.hidden = false;
        this.numberElement.hidden = true;
        this.revealed = Revealed.QUESTION_MARK;
    }
    /**
     * Sets the tile to be unrevealed.
     */
    setNotRevealed() {
        this.imageElement.src = "";
        this.imageElement.hidden = true;
        this.numberElement.hidden = true;
        this.revealed = Revealed.NOT;
    }
    /**
     * Sets the tile to display a mine.
     */
    setMine() {
        this.imageElement.src = settings.images.mine;
        this.imageElement.hidden = false;
        this.numberElement.hidden = true;
        this.revealed = Revealed.IS;
        this.colorElement.className = settings.tile.styles.mine;
    }
    /**
     * Sets the tile to display its number.
     */
    setNumber() {
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
    onClick(leftClick) {
        // If this is the first ever tile being clicked the game needs further setup (creating mines and numbers).
        this.field.onClick(this);
        switch (this.revealed) {
            case Revealed.NOT:
                // If the tile should be revealed (the mode is in "reveal tile" and the user clicked with the left mouse button):
                if ((this.field.getMode() === 0) && leftClick) {
                    // If the tile is empty it is revealed, including the adjacent tiles:
                    if (this.contents === 0) {
                        this.spread();
                        // If there is a mine on the tile the game is terminated:
                    }
                    else if (this.contents === Contents.MINE) {
                        this.setMine();
                        this.field.onDefeat();
                        // When a number is on the tile, the number is revealed:
                    }
                    else {
                        this.setNumber();
                    }
                    // If a flag should be set (the mode is in "set flag" or the user clicked with the right mouse button):
                }
                else {
                    this.setFlag();
                    this.stats.addFlag(this.contents === Contents.MINE);
                }
                break;
            case Revealed.QUESTION_MARK:
                // If a flag should be set (the mode is in "set flag" or the user clicked with the right mouse button), the tile is set to be not revealed:
                if ((this.field.getMode() === 1) || !leftClick) {
                    this.setNotRevealed();
                    this.stats.removeQuestionMark();
                }
                break;
            case Revealed.FLAG:
                // If a flag should be set (the mode is in "set flag" or the user clicked with the right mouse button), a question mark is set:
                if ((this.field.getMode() === 1) || !leftClick) {
                    this.setQuestionMark();
                    this.stats.removeFlag(this.contents === Contents.MINE);
                    this.stats.addQuestionMark();
                }
                break;
            case Revealed.IS:
                // If there is a number on the tile:
                if ((this.contents >= Contents.ONE) && (this.contents <= Contents.EIGHT)) {
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
        if (this.stats.isVictory()) {
            this.field.onVictory();
        }
    }
    forceReveal() {
        this.colorElement.onclick = null;
        this.colorElement.oncontextmenu = null;
        if (this.revealed === Revealed.IS) {
            return;
        }
        if (this.contents === Contents.MINE) {
            if (this.revealed !== Revealed.FLAG) {
                this.setMine();
            }
        }
        else if (this.contents === Contents.EMPTY) {
            this.lookRevealed();
        }
        else {
            this.setNumber();
        }
        this.colorElement.className = settings.tile.styles.wrongGuess;
    }
}
