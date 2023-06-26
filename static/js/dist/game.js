import { Field } from "./field/index.js";
export class Game {
    stats;
    /**
     * The html element which contains the game field.
     */
    gameContainer;
    /**
     * The game field element or null, when there is no game yet.
     */
    field;
    constructor(stats) {
        this.stats = stats;
        this.gameContainer = document.getElementById("game");
        this.field = null;
    }
    /**
     * Creates a new field with the passed parameters and deletes the old one.
     * @param width The width of the field.
     * @param height The height of the field.
     * @param amountMines The amount of mines in the field.
     */
    newGame(width, height, amountMines, onDefeat, onVictory, startGame, getMode) {
        this.field?.remove();
        this.field = new Field(this.stats, width, height, amountMines, onDefeat, onVictory, startGame, getMode);
    }
    hide() {
        this.gameContainer.hidden = true;
    }
    show() {
        this.gameContainer.hidden = false;
    }
}
