import { TileParent } from "./tile_parent.js";
export class TileInner extends TileParent {
    elementTop;
    elementLeft;
    elementBottom;
    elementRight;
    fieldElement;
    field;
    /**
     * `-1` -> mine;
     * `0` -> empty;
     * `1 to 8` -> corresponding numbers
     */
    mode;
    /**
     * `0` -> tile is not revealed; `1` -> there is a question mark on the tile; `2` -> there is a flag on the tile; `3` -> tile is revealed
     */
    revealed;
    displayElement;
    tileContentsElement;
    tileImageElement;
    constructor(elementTop, elementLeft, elementBottom, elementRight, fieldElement, field) {
        super();
        this.elementTop = elementTop;
        this.elementLeft = elementLeft;
        this.elementBottom = elementBottom;
        this.elementRight = elementRight;
        this.fieldElement = fieldElement;
        this.field = field;
        this.displayElement = document.createElement("button");
        this.tileContentsElement = document.createElement("div");
        this.tileImageElement = document.createElement("img");
        this.setupElements();
        this.mode = 0;
        this.revealed = 0;
    }
    setupElements() {
        this.fieldElement.appendChild(this.displayElement);
        this.displayElement.appendChild(this.tileContentsElement);
        this.displayElement.appendChild(this.tileImageElement);
        this.displayElement.className = "bg-neutral-500 w-10 aspect-square flex border-2 border-gray-400";
        this.tileContentsElement.className = "m-auto";
        this.tileContentsElement.hidden = true;
        this.displayElement.onclick = () => {
            this.onClick(true);
        };
        this.displayElement.oncontextmenu = (ev) => {
            ev.preventDefault();
            this.onClick(false);
        };
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
    setMine() {
        if (this.mode === -1) {
            return false;
        }
        this.mode = -1;
        return true;
    }
    //
    // - Getter functions
    //
    /**
     * @returns `1`: tile contains a mine; `0`: tile contains no mine.
     */
    isMine() {
        return this.mode === -1 ? 1 : 0;
    }
    /**
     * @returns How many mines there are on the left and on the right tiles (0, 1 or 2).
     */
    amountMinesLeftRight() {
        return this.elementLeft.isMine() + this.elementRight.isMine();
    }
    /**
     * @returns `1`: tile contains a flag; `0`: tile contains no flag.
     */
    isFlag() {
        return this.revealed === 2 ? 1 : 0;
    }
    /**
     * @returns How many flags there are on the left and on the right tiles (0, 1 or 2).
     */
    amountFlagsLeftRight() {
        return this.elementLeft.isFlag() + this.elementRight.isFlag();
    }
    //
    // - Functions for spreading
    //
    spreadX() {
        this.elementLeft.spread();
        this.elementRight.spread();
    }
    /**
     * When an empty tile is clicked all adjacent tiles are revealed until a tile containing a number is reached.
     */
    spread() {
        // If the tile is already revealed nothing happens.
        if (this.revealed !== 0) {
            return;
        }
        this.revealed = 3;
        this.tileContentsElement.hidden = false;
        this.lookRevealed();
        // If the tile contains a number its style is set and the spreading stops.
        if (this.mode > 0) {
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
     * Adds this to the passed list.
     * @param els The list to which the element should be added.
     */
    addSelf(els) {
        els.push(this);
    }
    /**
     * Adds this and the left and the right elements to the passed list.
     * @param els The list to which the elements should be added.
     */
    addXAndSelfElements(els) {
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
    lookRevealed() {
        this.displayElement.className = "bg-neutral-300 w-10 aspect-square flex border-2 border-gray-400";
    }
    /**
     * Sets the color for the number/text.
     */
    setStyle() {
        this.lookRevealed();
        switch (this.mode) {
            case 1:
                this.tileContentsElement.className = "text-blue-500 m-auto text-xl";
                break;
            case 2:
                this.tileContentsElement.className = "text-green-500 m-auto text-xl";
                break;
            case 3:
                this.tileContentsElement.className = "text-red-500 m-auto text-xl";
                break;
            case 4:
                this.tileContentsElement.className = "text-purple-500 m-auto text-xl";
                break;
            case 5:
                this.tileContentsElement.className = "text-maroon-500 m-auto text-xl";
                break;
            case 6:
                this.tileContentsElement.className = "text-turquoise-500 m-auto text-xl";
                break;
            case 7:
                this.tileContentsElement.className = "text-black m-auto text-xl";
                break;
            case 8:
                this.tileContentsElement.className = "text-gray-500 m-auto text-xl";
                break;
        }
    }
    setFlag() {
        this.tileImageElement.src = "static/assets/1600x1600/flag.png";
        this.tileImageElement.hidden = false;
        this.tileContentsElement.hidden = true;
        this.revealed = 2;
    }
    setQuestionMark() {
        this.tileImageElement.src = "static/assets/1600x1600/questionmark.png";
        this.tileImageElement.hidden = false;
        this.tileContentsElement.hidden = true;
        this.revealed = 1;
    }
    setNotRevealed() {
        this.tileImageElement.src = "";
        this.tileImageElement.hidden = true;
        this.tileContentsElement.hidden = true;
        this.revealed = 0;
    }
    onMine() {
        this.tileImageElement.src = "static/assets/1600x1600/mine.png";
        this.tileImageElement.hidden = false;
        this.tileContentsElement.hidden = false;
        this.revealed = 3;
        this.displayElement.className = "bg-red-600 w-10 aspect-square flex border-2 border-gray-400";
    }
    /**
     * When the tile is clicked.
     */
    onClick(leftClick) {
        // If this is the first ever tile being clicked the game needs further setup (creating mines and numbers).
        this.field.onClick(this);
        switch (this.revealed) {
            case 0: // If the tile is not revealed yet and no question mark or flag is on it:
                // If the tile should be revealed (the mode is in "reveal tile" and the user clicked with the left mouse button):
                if ((this.field.getMode() === 0) && leftClick) {
                    // If the tile is empty it is revealed with the adjacent tiles:
                    if (this.mode === 0) {
                        this.spread();
                        // If there is a mine on the tile the game is terminated:
                    }
                    else if (this.mode === -1) {
                        this.onMine();
                        // When a number is on the tile, the number is revealed:
                    }
                    else {
                        this.revealed = 3;
                        this.tileContentsElement.hidden = false;
                        this.lookRevealed();
                        this.setStyle();
                    }
                    // If a flag should be set (the mode is in "set flag" or the user clicked with the right mouse button):
                }
                else {
                    this.setFlag();
                }
                break;
            case 1: // If there is a question mark on the tile:
                // If a flag should be set (the mode is in "set flag" or the user clicked with the right mouse button), the tile is set to be not revealed:
                if ((this.field.getMode() === 1) || !leftClick) {
                    this.setNotRevealed();
                }
                break;
            case 2: // If there is a flag on the tile:
                // If a flag should be set (the mode is in "set flag" or the user clicked with the right mouse button), a question mark is set:
                if ((this.field.getMode() === 1) || !leftClick) {
                    this.setQuestionMark();
                }
                break;
            case 3: // The tile is revealed:
                // If there is a number on the tile:
                if (this.mode > 0) {
                    const amountFlags = this.elementBottom.isFlag() + this.elementLeft.isFlag() + this.elementRight.isFlag() + this.elementTop.isFlag() + this.elementBottom.amountFlagsLeftRight() + this.elementTop.amountFlagsLeftRight();
                    // When the number on the tile matches the amount of flags in the surrounding eight tiles, the eight tiles are revealed:
                    if (this.mode === amountFlags) {
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
    }
    setNumber() {
        if (this.mode === -1) {
            return;
        }
        this.mode = this.elementBottom.isMine() + this.elementLeft.isMine() + this.elementTop.isMine() + this.elementRight.isMine() + this.elementTop.amountMinesLeftRight() + this.elementBottom.amountMinesLeftRight();
        if (this.mode > 0) {
            this.tileContentsElement.textContent = String(this.mode);
        }
    }
    /**
     * Returns the tiles that may not set to be mines.
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
}
