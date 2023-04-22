import { Leaderboard } from "../leaderboard.js";
import { SelectFieldSizeMenu } from "./select_field_size_menu.js";

export class MainMenu {
    
    private menuElement: HTMLDivElement;

    private goToSelectFieldSizeMenuButton: HTMLButtonElement;
    private goToLeaderboardButton: HTMLButtonElement;

    constructor(
        private selectFieldSizeMenu: SelectFieldSizeMenu,
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
    }

    hide() {
        this.menuElement.hidden = true;
    }

    show() {
        this.menuElement.hidden = false;
    }

}