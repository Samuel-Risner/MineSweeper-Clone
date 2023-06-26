export default class PlaceMode {
    /**
     * reveal tile, set flag
     */
    clickModeDisplay;
    changeClickModeButton;
    /**
     * `0` -> reveal tile; `1` -> set flag
     */
    clickMode;
    constructor() {
        this.clickModeDisplay = [
            document.getElementById("revealTile"),
            document.getElementById("setFlag")
        ];
        this.changeClickModeButton = document.getElementById("changeClickMode");
        this.changeClickModeButton.onclick = () => {
            this.onClick();
        };
        this.clickMode = 0;
    }
    /**
     * Changes "this.clickMode" to be the other one and switches the class names of the two elements in "this.clickModeDisplay".
     */
    onClick() {
        const tempClassName0 = this.clickModeDisplay[0].className;
        const tempClassName1 = this.clickModeDisplay[1].className;
        this.clickModeDisplay[1].className = tempClassName0;
        this.clickModeDisplay[0].className = tempClassName1;
        this.clickMode = this.clickMode === 0 ? 1 : 0;
    }
    getMode() {
        return this.clickMode;
    }
}
