export default class PlaceMode {
    
    /**
     * reveal tile, set flag
     */
    private clickModeDisplay: [HTMLDivElement, HTMLDivElement];
    private changeClickModeButton: HTMLButtonElement;
    /**
     * `0` -> reveal tile; `1` -> set flag
     */
    private clickMode: 0 | 1;

    constructor() {
        this.clickModeDisplay = [
            document.getElementById("revealTile") as HTMLDivElement,
            document.getElementById("setFlag") as HTMLDivElement
        ];

        this.changeClickModeButton = document.getElementById("changeClickMode") as HTMLButtonElement;
        this.changeClickModeButton.onclick = () => {
            this.onClick();
        }
        
        this.clickMode = 0;
    }

    /**
     * Changes "this.clickMode" to be the other one and switches the class names of the two elements in "this.clickModeDisplay".
     */
    private onClick() {
        const tempClassName0 = this.clickModeDisplay[0].className;
        const tempClassName1 = this.clickModeDisplay[1].className;
        this.clickModeDisplay[1].className = tempClassName0;
        this.clickModeDisplay[0].className = tempClassName1;

        this.clickMode = this.clickMode === 0? 1 : 0;
    }

    getMode(): 0 | 1 {
        return this.clickMode;
    }
}
