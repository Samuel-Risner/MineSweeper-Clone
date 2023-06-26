import { settings } from "./../settings.js";

export default function initCustom(newGame: (width: number, height: number, amountMines: number) => void) {
    const inputContainerElement = document.getElementById("customInputContainerElement") as HTMLDivElement;
    const showInputsButton = document.getElementById("showSelectCustomSizeInputs") as HTMLButtonElement;
    const inputCustomWidthElement = document.getElementById("inputCustomWidth") as HTMLInputElement;
    const inputCustomHeightElement = document.getElementById("inputCustomHeight") as HTMLInputElement;
    const inputCustomAmountMinesElement = document.getElementById("inputCustomAmountMines") as HTMLInputElement;
    const confirmCustomSizeButton = document.getElementById("confirmCustomSize") as HTMLButtonElement;

    showInputsButton.onclick = () => {
        showInputsButton.hidden = true;
        inputContainerElement.hidden = false;
    }

    inputCustomWidthElement.min = String(settings.field.minWidth);
    inputCustomWidthElement.value = String(settings.field.minWidth);

    inputCustomHeightElement.min = String(settings.field.minHeight);
    inputCustomHeightElement.value = String(settings.field.minHeight);

    inputCustomAmountMinesElement.min = String(settings.field.minAmountMines);
    inputCustomAmountMinesElement.value = String(settings.field.minAmountMines);

    confirmCustomSizeButton.onclick = () => {
        const width = Number(inputCustomWidthElement.value);
        const height = Number(inputCustomHeightElement.value);
        const amountMines = Number(inputCustomAmountMinesElement.value);

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

        newGame(width, height, amountMines);
    }
}
