import { Game } from "../game.js";
import initCustom from "./initCustom.js";
import initDefault from "./initDefault.js";

export class Menu {
    
    private menuElement: HTMLDivElement;

    constructor(
        private game: Game
    ) {
        this.menuElement = document.getElementById("menu") as HTMLDivElement;

        initCustom(this);
        initDefault(this);
    }

    hide() {
        this.menuElement.hidden = true;
    }

    show() {
        this.menuElement.hidden = false;
    }

    newGame(width: number, height: number, amountMines: number) {
        this.game.newGame(width, height, amountMines);
        this.hide();
        this.game.show();
    }

}
