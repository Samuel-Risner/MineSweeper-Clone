import { settings } from "./../settings.js";
export class SelectFieldSizeMenu {
    game;
    menuElement;
    selectSizeContainer;
    /**
     * width, height, amount mines
     */
    fieldSizes;
    goToSelectCustomSizeButton;
    selectCustomSizeElement;
    confirmCustomSizeButton;
    inputWidthElement;
    inputHeightElement;
    inputAmountMinesElement;
    constructor(game) {
        this.game = game;
        this.menuElement = document.getElementById("selectFieldSizeMenu");
        this.selectSizeContainer = document.getElementById("selectSizeContainer");
        this.fieldSizes = [
            [8, 8, 8],
            [16, 16, 32],
            [32, 16, 64]
        ];
        this._createSelectSizeButtons();
        this.goToSelectCustomSizeButton = document.getElementById("goToSelectCustomSize");
        this.goToSelectCustomSizeButton.onclick = () => {
            this.goToSelectCustomSizeButton.hidden = true;
            this.selectCustomSizeElement.hidden = false;
        };
        this.selectCustomSizeElement = document.getElementById("selectCustomSize");
        this.confirmCustomSizeButton = document.getElementById("selectCustomSizeConfirm");
        this.confirmCustomSizeButton.onclick = () => {
            const width = Number(this.inputWidthElement.value);
            const height = Number(this.inputHeightElement.value);
            const amountMines = Number(this.inputAmountMinesElement.value);
            if ((width < settings.field.minWidth) || (width > settings.field.maxWidth)) {
                return;
            }
            if ((height < settings.field.minHeight) || (height > settings.field.maxHeight)) {
                return;
            }
            if ((amountMines < settings.field.minAmountMines) || (amountMines > settings.field.maxAmountMines)) {
                return;
            }
            if (!(width && height && amountMines)) {
                return;
            }
            if (amountMines >= (width * height) - settings.field.minNoMineTiles) {
                console.error(`Not enough space for all the mines!`);
                return;
            }
            this.game.newGame(width, height, amountMines);
            this.hide();
            game.show();
        };
        this.inputWidthElement = document.getElementById("inputWidth");
        this.inputHeightElement = document.getElementById("inputHeight");
        this.inputAmountMinesElement = document.getElementById("inputAmountMines");
        this.inputWidthElement.min = String(settings.field.minWidth);
        this.inputHeightElement.min = String(settings.field.minHeight);
        this.inputAmountMinesElement.min = String(settings.field.minAmountMines);
        this.inputWidthElement.max = String(settings.field.maxWidth);
        this.inputHeightElement.max = String(settings.field.maxHeight);
        this.inputAmountMinesElement.max = String(settings.field.maxAmountMines);
    }
    _createSelectSizeButtons() {
        for (let i = 0; i < this.fieldSizes.length; i++) {
            const button = document.createElement("button");
            const div = document.createElement("div");
            button.className = "w-full aspect-square border-8";
            div.textContent = `${this.fieldSizes[i][0]}x${this.fieldSizes[i][1]}\nMines: ${this.fieldSizes[i][2]}`;
            div.className = "m-auto whitespace-pre-line";
            button.appendChild(div);
            this.selectSizeContainer.appendChild(button);
            button.onclick = () => {
                this.game.newGame(this.fieldSizes[i][0], this.fieldSizes[i][1], this.fieldSizes[i][2]);
                this.hide();
                this.game.show();
            };
        }
    }
    hide() {
        this.menuElement.hidden = true;
    }
    show() {
        this.menuElement.hidden = false;
    }
}
