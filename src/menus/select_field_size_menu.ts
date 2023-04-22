export class SelectFieldSizeMenu {
    
    private menuElement: HTMLDivElement;

    private selectSizeContainer: HTMLDivElement;
    private fieldSizes: [number, number][];

    private goToSelectCustomSizeButton: HTMLButtonElement;
    private selectCustomSizeElement: HTMLDivElement;
    private confirmCustomSizeButton: HTMLButtonElement;

    private inputWidthElement: HTMLInputElement;
    private inputHeightElement: HTMLInputElement;
    private inputAmountMinesElement: HTMLInputElement;

    constructor() {
        this.menuElement = document.getElementById("selectFieldSizeMenu") as HTMLDivElement;

        this.selectSizeContainer = document.getElementById("selectSizeContainer") as HTMLDivElement;
        this.fieldSizes = [
            [8, 8],
            [16, 16],
            [32, 16]
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
                return;
            }
            if (amountMines >= (width * height)) {
                return;
            }
        }

        this.inputWidthElement = document.getElementById("inputWidth") as HTMLInputElement;
        this.inputHeightElement = document.getElementById("inputHeight") as HTMLInputElement;
        this.inputAmountMinesElement = document.getElementById("inputAmountMines") as HTMLInputElement;
        this.inputWidthElement.min = String(3);
        this.inputHeightElement.min = String(3);
        this.inputAmountMinesElement.min = String(1);
        this.inputWidthElement.max = String(5000);
        this.inputHeightElement.max = String(5000);
        this.inputAmountMinesElement.max = String(5000 * 5000 - 1);
    }

    private _createSelectSizeButtons() {
        for (let i = 0; i < this.fieldSizes.length; i++) {
            const button = document.createElement("button");
            const div = document.createElement("div");

            button.className = "w-full aspect-square border-8";

            div.textContent = `${this.fieldSizes[i][0]}x${this.fieldSizes[i][1]}`;
            div.className = "m-auto";

            button.appendChild(div);
            this.selectSizeContainer.appendChild(button);
        }
    }

    hide() {
        this.menuElement.hidden = true;
    }

    show() {
        this.menuElement.hidden = false;
    }

}
