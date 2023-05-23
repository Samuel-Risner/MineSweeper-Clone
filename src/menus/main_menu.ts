import { Leaderboard } from "../leaderboard.js";
import { SelectFieldMenu } from "./select_field_menu.js";

export class MainMenu {
    
    private menuElement: HTMLDivElement;

    private goToSelectFieldSizeMenuButton: HTMLButtonElement;
    private goToLeaderboardButton: HTMLButtonElement;

    private closeSelectFieldSizeMenuButton: HTMLButtonElement;

    constructor(
        private selectFieldSizeMenu: SelectFieldMenu,
        private leaderboard: Leaderboard
    ) {
        this.menuElement = document.getElementById("mainMenu") as HTMLDivElement;

        this.goToSelectFieldSizeMenuButton = document.getElementById("goToSelectFieldSizeMenu") as HTMLButtonElement;
        this.goToLeaderboardButton = document.getElementById("goToLeaderboard") as HTMLButtonElement;

        this.goToSelectFieldSizeMenuButton.onclick = () => {
            this.hide();
            this.selectFieldSizeMenu.show();
        }
        this.goToLeaderboardButton.onclick = () => {
            this.hide();
            this.leaderboard.show();
        }

        this.closeSelectFieldSizeMenuButton = document.getElementById("closeSelectFieldSizeMenu") as HTMLButtonElement;
        this.closeSelectFieldSizeMenuButton.onclick = () => {
            this.selectFieldSizeMenu.hide()
            this.show();
        }
    }

    hide() {
        this.menuElement.hidden = true;
    }

    show() {
        this.menuElement.hidden = false;
    }

}
