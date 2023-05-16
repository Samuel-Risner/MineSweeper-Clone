import { Field } from "./game/field.js";
import { GameSettings } from "./game/game_settings.js";
export class Game {
    /**
     * The html element which contains the game field.
     */
    gameContainer;
    /**
     * The game field element or null, when there is no game yet.
     */
    field;
    gameSettings;
    constructor() {
        this.gameContainer = document.getElementById("game");
        this.field = null;
        this.gameSettings = new GameSettings();
    }
    /**
     * Creates a new field with the passed parameters.
     * @param width The width of the field.
     * @param height The height of the field.
     * @param amountMines The amount of mines in the field.
     */
    newGame(width, height, amountMines) {
        this.field = new Field(this, width, height, amountMines, this.gameSettings);
    }
    hide() {
        this.gameContainer.hidden = true;
    }
    show() {
        this.gameContainer.hidden = false;
    }
}
