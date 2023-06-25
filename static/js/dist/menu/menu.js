import { SelectCustom } from "./selectCustom.js";
import { settings } from "./../settings.js";
export class Menu {
    game;
    menuElement;
    selectFieldSizeContainer;
    selectCustomFieldSize;
    constructor(game) {
        this.game = game;
        this.menuElement = document.getElementById("menu");
        this.selectFieldSizeContainer = document.getElementById("selectFieldSizeContainer");
        this.createDefaultSelectFieldSizeButtons();
        this.selectCustomFieldSize = new SelectCustom(this);
    }
    createDefaultSelectFieldSizeButtons() {
        for (const size of settings.defaultFieldSizes) {
            const button = document.createElement("button");
            const div = document.createElement("div");
            button.className = "w-full aspect-square border-8";
            div.textContent = `${size.width}x${size.height}\nMines: ${size.amountMines}`;
            div.className = "m-auto whitespace-pre-line";
            button.appendChild(div);
            this.selectFieldSizeContainer.appendChild(button);
            button.onclick = () => {
                this.newGame(size.width, size.height, size.amountMines);
            };
        }
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
