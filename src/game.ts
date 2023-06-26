import { Field } from "./field/index.js";
import Stats from "./stats.js";

export class Game {

    /**
     * The html element which contains the game field.
     */
    private gameContainer: HTMLDivElement;
    
    /**
     * The game field element or null, when there is no game yet.
     */
    private field: Field | null;

    constructor(
        private stats: Stats
    ) {
        this.gameContainer = document.getElementById("game") as HTMLDivElement;
        this.field = null;
    }

    /**
     * Creates a new field with the passed parameters and deletes the old one.
     * @param width The width of the field.
     * @param height The height of the field.
     * @param amountMines The amount of mines in the field.
     */
    newGame(width: number, height: number, amountMines: number, onDefeat: () => void, onVictory: () => void, startGame: () => void, getMode: () => 0 | 1) {
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
