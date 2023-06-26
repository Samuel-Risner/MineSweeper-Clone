import initCustom from "./initCustom.js";
import initDefault from "./initDefault.js";
export class Menu {
    game;
    menuElement;
    constructor(game) {
        this.game = game;
        this.menuElement = document.getElementById("menu");
        initCustom(this);
        initDefault(this);
    }
    hide() {
        this.menuElement.hidden = true;
    }
    show() {
        this.menuElement.hidden = false;
    }
    newGame(width, height, amountMines) {
        this.game.newGame(width, height, amountMines);
        this.hide();
        this.game.show();
    }
}
