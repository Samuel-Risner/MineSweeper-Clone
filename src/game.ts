import { Field } from "./field/index.js";
import { GameSettings } from "./game/game_settings.js";
import { ResultPopup } from "./game/result_popup.js";

export class Game {

    /**
     * The html element which contains the game field.
     */
    private gameContainer: HTMLDivElement;
    
    /**
     * The game field element or null, when there is no game yet.
     */
    private field: Field | null;

    private gameSettings: GameSettings;
    private resultPopup: ResultPopup;

    constructor() {
        this.gameContainer = document.getElementById("game") as HTMLDivElement;
        this.field = null;
        this.gameSettings = new GameSettings();
        this.resultPopup = new ResultPopup();
    }

    /**
     * Creates a new field with the passed parameters and deletes the old one.
     * @param width The width of the field.
     * @param height The height of the field.
     * @param amountMines The amount of mines in the field.
     */
    newGame(width: number, height: number, amountMines: number) {
        this.field?.remove();
        this.field = new Field(width, height, amountMines, this.gameSettings, this.resultPopup);
    }

    onCloseButton() {
        this.field?.onCloseButton();
    }

    hide() {
        this.gameContainer.hidden = true;
    }

    show() {
        this.gameContainer.hidden = false;
    }

}
