import { Game } from "./../game.js";
import { settings } from "./../settings.js";

export class SelectFieldMenu {
    
    /**
     * The html element which contains all the things connected to this menu.
     */
    private menuElement: HTMLDivElement;

    /**
     * The html element which will be filled with default field options (from this.fieldOptions).
     */
    private selectOptionContainer: HTMLDivElement;
    /**
     * The default options for creating a field.
     * 
     * width, height, amount mines
     */
    private fieldOptions: [number, number, number][];

    /**
     * The button which has to be clicked to show the input for the custom options.
     */
    private goToSelectCustomSizeButton: HTMLButtonElement;
    /**
     * The html element which contains the custom options.
     */
    private selectCustomOptionElement: HTMLDivElement;
    /**
     * The button which has to be clicked to use the custom options.
     */
    private confirmCustomOptionButton: HTMLButtonElement;

    private inputCustomWidthElement: HTMLInputElement;
    private inputCustomHeightElement: HTMLInputElement;
    private inputCustomAmountMinesElement: HTMLInputElement;

    /**
     * When the game is active this button can be pressed to return to this menu.
     */
    private closeGameButton: HTMLButtonElement;

    constructor(
        private game: Game
    ) {
        this.menuElement = document.getElementById("selectFieldMenu") as HTMLDivElement;

        this.selectOptionContainer = document.getElementById("selectFieldOptionContainer") as HTMLDivElement;
        this.fieldOptions = [
            [8, 8, 8],
            [16, 16, 32],
            [32, 16, 64]
        ];
        this._createSelectSizeButtons();

        this.goToSelectCustomSizeButton = document.getElementById("goToSelectCustomSize") as HTMLButtonElement;
        this.goToSelectCustomSizeButton.onclick = () => {
            this.goToSelectCustomSizeButton.hidden = true;
            this.selectCustomOptionElement.hidden = false;
        }
        this.selectCustomOptionElement = document.getElementById("selectCustomOption") as HTMLDivElement;
        this.confirmCustomOptionButton = document.getElementById("selectCustomOptionConfirm") as HTMLButtonElement;
        this._addOnclickSelectCustomSize();

        this.inputCustomWidthElement = document.getElementById("inputCustomWidth") as HTMLInputElement;
        this.inputCustomWidthElement.min = String(settings.field.minWidth);
        this.inputCustomWidthElement.max = String(settings.field.maxWidth);
        this.inputCustomWidthElement.value = String(settings.field.minWidth);

        this.inputCustomHeightElement = document.getElementById("inputCustomHeight") as HTMLInputElement;
        this.inputCustomHeightElement.min = String(settings.field.minHeight);
        this.inputCustomHeightElement.max = String(settings.field.maxHeight);
        this.inputCustomHeightElement.value = String(settings.field.minHeight);

        this.inputCustomAmountMinesElement = document.getElementById("inputCustomAmountMines") as HTMLInputElement;
        this.inputCustomAmountMinesElement.min = String(settings.field.minAmountMines);
        this.inputCustomAmountMinesElement.value = String(1);

        this.closeGameButton = document.getElementById("closeGame") as HTMLButtonElement;
        this.closeGameButton.onclick = () => {
            this.game.onCloseButton();
            this.show();
            this.game.hide();
        }
    }

    /**
     * Creates the buttons for selecting the default field options.
     */
    private _createSelectSizeButtons() {
        for (let i = 0; i < this.fieldOptions.length; i++) {
            const button = document.createElement("button");
            const div = document.createElement("div");

            button.className = "w-full aspect-square border-8";

            div.textContent = `${this.fieldOptions[i][0]}x${this.fieldOptions[i][1]}\nMines: ${this.fieldOptions[i][2]}`;
            div.className = "m-auto whitespace-pre-line";

            button.appendChild(div);
            this.selectOptionContainer.appendChild(button);

            button.onclick = () => {
                this.game.newGame(this.fieldOptions[i][0], this.fieldOptions[i][1], this.fieldOptions[i][2]);
                this.hide();
                this.game.show();
            }
        }
    }

    /**
     * Adds the onclick event for this.confirmCustomOptionButton.
     */
    private _addOnclickSelectCustomSize() {
        this.confirmCustomOptionButton.onclick = () => {
            const width = Number(this.inputCustomWidthElement.value);
            const height = Number(this.inputCustomHeightElement.value);
            const amountMines = Number(this.inputCustomAmountMinesElement.value);

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
            this.game.show();
        }
    }

    hide() {
        this.menuElement.hidden = true;
    }

    show() {
        this.menuElement.hidden = false;
    }

}
