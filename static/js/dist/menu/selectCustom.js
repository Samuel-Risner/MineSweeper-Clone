import { settings } from "./../settings.js";
export class SelectCustom {
    menu;
    showInputsButton;
    inputContainerElement;
    confirmCustomSizeButton;
    inputCustomWidthElement;
    inputCustomHeightElement;
    inputCustomAmountMinesElement;
    constructor(menu) {
        this.menu = menu;
        this.showInputsButton = document.getElementById("showSelectCustomSizeInputs");
        this.showInputsButton.onclick = () => {
            this.showInputsButton.hidden = true;
            this.inputContainerElement.hidden = false;
        };
        this.inputContainerElement = document.getElementById("customInputContainerElement");
        this.confirmCustomSizeButton = document.getElementById("confirmCustomSize");
        this.addOnclick();
        this.inputCustomWidthElement = document.getElementById("inputCustomWidth");
        this.inputCustomWidthElement.min = String(settings.field.minWidth);
        this.inputCustomWidthElement.max = String(settings.field.maxWidth);
        this.inputCustomWidthElement.value = String(settings.field.minWidth);
        this.inputCustomHeightElement = document.getElementById("inputCustomHeight");
        this.inputCustomHeightElement.min = String(settings.field.minHeight);
        this.inputCustomHeightElement.max = String(settings.field.maxHeight);
        this.inputCustomHeightElement.value = String(settings.field.minHeight);
        this.inputCustomAmountMinesElement = document.getElementById("inputCustomAmountMines");
        this.inputCustomAmountMinesElement.min = String(settings.field.minAmountMines);
        this.inputCustomAmountMinesElement.value = String(1);
    }
    addOnclick() {
        this.confirmCustomSizeButton.onclick = () => {
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
                alert(`The height of the field is to small. The minimum is ${settings.field.minHeight}.`);
                console.error(`The height of the field is to small. The minimum is ${settings.field.minHeight}.`);
                return;
            }
            if (width > settings.field.maxWidth) {
                alert(`The width of the field is to big. The maximum is ${settings.field.maxWidth}.`);
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
            this.menu.newGame(width, height, amountMines);
        };
    }
}
