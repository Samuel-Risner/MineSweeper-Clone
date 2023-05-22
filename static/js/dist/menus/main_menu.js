export class MainMenu {
    selectFieldSizeMenu;
    leaderboard;
    menuElement;
    goToSelectFieldSizeMenuButton;
    goToLeaderboardButton;
    closeSelectFieldSizeMenuButton;
    constructor(selectFieldSizeMenu, leaderboard) {
        this.selectFieldSizeMenu = selectFieldSizeMenu;
        this.leaderboard = leaderboard;
        this.menuElement = document.getElementById("mainMenu");
        this.goToSelectFieldSizeMenuButton = document.getElementById("goToSelectFieldSizeMenu");
        this.goToLeaderboardButton = document.getElementById("goToLeaderboard");
        this.goToSelectFieldSizeMenuButton.onclick = () => {
            this.hide();
            this.selectFieldSizeMenu.show();
        };
        this.goToLeaderboardButton.onclick = () => {
            this.hide();
            this.leaderboard.show();
        };
        this.closeSelectFieldSizeMenuButton = document.getElementById("closeSelectFieldSizeMenu");
        this.closeSelectFieldSizeMenuButton.onclick = () => {
            this.selectFieldSizeMenu.hide();
            this.show();
        };
    }
    hide() {
        this.menuElement.hidden = true;
    }
    show() {
        this.menuElement.hidden = false;
    }
}
