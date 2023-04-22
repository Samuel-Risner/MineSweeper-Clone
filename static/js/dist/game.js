import { Field } from "./game/field.js";
export class Game {
    /**
     * The html element which contains the game field.
     */
    gameContainer;
    /**
     * The game field element or null, when there is no game yet.
     */
    field;
    constructor() {
        this.gameContainer = document.getElementById("game");
        this.field = null;
    }
    /**
     * Creates a new field with the passed parameters.
     * @param width The width of the field.
     * @param height The height of the field.
     * @param amountMines The amount of mines in the field.
     */
    newGame(width, height, amountMines) {
        this.field = new Field(width, height, amountMines);
    }
    hide() {
        this.gameContainer.hidden = true;
    }
    show() {
        this.gameContainer.hidden = false;
    }
}
