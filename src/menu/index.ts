import initCustom from "./initCustom.js";
import initDefault from "./initDefault.js";

export class Menu {
    
    private menuElement: HTMLDivElement;

    constructor(newGame: (width: number, height: number, amountMines: number) => void) {
        this.menuElement = document.getElementById("menu") as HTMLDivElement;

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
