import { Field } from "./game/field.js";
export class Game {
    gameContainer;
    field;
    constructor() {
        this.gameContainer = document.getElementById("game");
        this.field = null;
    }
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
