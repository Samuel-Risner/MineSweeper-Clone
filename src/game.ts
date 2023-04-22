import { Field } from "./game/field.js";

export class Game {

    /**
     * The html element which contains the game field.
     */
    private gameContainer: HTMLDivElement;
    
    /**
     * The game field element or null, when there is no game yet.
     */
    private field: Field | null;

    constructor() {
        this.gameContainer = document.getElementById("game") as HTMLDivElement;
        this.field = null;
    }

    /**
     * Creates a new field with the passed parameters.
     * @param width The width of the field.
     * @param height The height of the field.
     * @param amountMines The amount of mines in the field.
     */
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
