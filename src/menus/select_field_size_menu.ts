import { Game } from "./../game.js";
import { settings } from "./../settings.js";

export class SelectFieldSizeMenu {
    
    private menuElement: HTMLDivElement;

    private selectSizeContainer: HTMLDivElement;
    /**
     * width, height, amount mines
     */
    private fieldSizes: [number, number, number][];

    private goToSelectCustomSizeButton: HTMLButtonElement;
    private selectCustomSizeElement: HTMLDivElement;
    private confirmCustomSizeButton: HTMLButtonElement;

    private inputWidthElement: HTMLInputElement;
    private inputHeightElement: HTMLInputElement;
    private inputAmountMinesElement: HTMLInputElement;

    constructor(
        private game: Game
    ) {
        this.menuElement = document.getElementById("selectFieldSizeMenu") as HTMLDivElement;

        this.selectSizeContainer = document.getElementById("selectSizeContainer") as HTMLDivElement;
        this.fieldSizes = [
            [8, 8, 8],
            [16, 16, 32],
            [32, 16, 64]
        ];
        this._createSelectSizeButtons();

        this.goToSelectCustomSizeButton = document.getElementById("goToSelectCustomSize") as HTMLButtonElement;
        this.goToSelectCustomSizeButton.onclick = () => {
            this.goToSelectCustomSizeButton.hidden = true;
            this.selectCustomSizeElement.hidden = false;
        }
        this.selectCustomSizeElement = document.getElementById("selectCustomSize") as HTMLDivElement;
        this.confirmCustomSizeButton = document.getElementById("selectCustomSizeConfirm") as HTMLButtonElement;
        this.confirmCustomSizeButton.onclick = () => {
            const width = Number(this.inputWidthElement.value);
            const height = Number(this.inputHeightElement.value);
            const amountMines = Number(this.inputAmountMinesElement.value);

            if (!(width && height && amountMines)) {
                alert("Please only enter numbers.");
                console.error("Please only enter numbers.");
                return;
            }

            if (width < settings.field.minWidth) {
                alert(`The width of the field is to small. The minimum is ${settings.field.minWidth}.`);
                console.error(`The width of the field is to small. The minimum is ${settings.field.minWidth}.`);
                return;
            }

            if (height < settings.field.minHeight) {
                alert(`The height of the field is to small. The minimum is ${settings.field.minHeight}.`)
                console.error(`The height of the field is to small. The minimum is ${settings.field.minHeight}.`);
                return;
            }

            if (width > settings.field.maxWidth) {
                alert(`The width of the field is to big. The maximum is ${settings.field.maxWidth}.`)
                console.error(`The width of the field is to big. The maximum is ${settings.field.maxWidth}.`);
                return;
            }

            if (height > settings.field.maxHeight) {
                alert(`The height of the field is to big. The maximum is ${settings.field.maxHeight}.`);
                console.error(`The height of the field is to big. The maximum is ${settings.field.maxHeight}.`);
                return;
            }

            if (amountMines < settings.field.minAmountMines) {
                alert(`The amount of mines is too small. The minimum is ${settings.field.minAmountMines}.`);
                console.error(`The amount of mines is too small. The minimum is ${settings.field.minAmountMines}.`);
                return;
            }
            
            if (amountMines >= (width * height) - settings.field.minNoMineTiles) {
                alert(`Not enough space for all the mines!`);
                console.error(`Not enough space for all the mines!`);
                return;
            }

            this.game.newGame(width, height, amountMines);
            this.hide();
            game.show();
        }

        this.inputWidthElement = document.getElementById("inputWidth") as HTMLInputElement;
        this.inputWidthElement.min = String(settings.field.minWidth);
        this.inputWidthElement.max = String(settings.field.maxWidth);
        this.inputWidthElement.value = String(settings.field.minWidth);

        this.inputHeightElement = document.getElementById("inputHeight") as HTMLInputElement;
        this.inputHeightElement.min = String(settings.field.minHeight);
        this.inputHeightElement.max = String(settings.field.maxHeight);
        this.inputHeightElement.value = String(settings.field.minHeight);

        this.inputAmountMinesElement = document.getElementById("inputAmountMines") as HTMLInputElement;
        this.inputAmountMinesElement.min = String(settings.field.minAmountMines);
        this.inputAmountMinesElement.value = String(1);
    }

    private _createSelectSizeButtons() {
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
            }
        }
    }

    hide() {
        this.menuElement.hidden = true;
    }

    show() {
        this.menuElement.hidden = false;
    }

}