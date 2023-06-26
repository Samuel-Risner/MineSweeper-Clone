import initCustom from "./initCustom.js";
import initDefault from "./initDefault.js";
export class Menu {
    menuElement;
    constructor(newGame) {
        this.menuElement = document.getElementById("menu");
        initCustom(newGame);
        initDefault(newGame);
    }
    hide() {
        this.menuElement.hidden = true;
    }
    show() {
        this.menuElement.hidden = false;
    }
}
