import { Game } from "./game.js";
import { Leaderboard } from "./leaderboard.js";
import { MainMenu } from "./menus/main_menu.js";
import { SelectFieldMenu } from "./menus/select_field_menu.js";

const game = new Game();
const selectFieldSizeMenu = new SelectFieldMenu(game);
const leaderboard = new Leaderboard();
const mainMenu = new MainMenu(selectFieldSizeMenu, leaderboard);
