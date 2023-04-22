import { Field } from "./game/field.js";

export class Game {

    private gameContainer: HTMLDivElement;
    
    private field: Field | null;

    constructor() {
        this.gameContainer = document.getElementById("game") as HTMLDivElement;

        this.field = null;
    }

    newGame(width: number, height: number, amountMines: number) {
        this.field = new Field(width, height, amountMines);
    }

    hide() {
        this.gameContainer.hidden = true;
    }

    show() {
        this.gameContainer.hidden = false;
    }

}
