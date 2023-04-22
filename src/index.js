import { Game } from "./game.js";
import { Leaderboard } from "./leaderboard.js";
import { MainMenu } from "./menus/main_menu.js";
import { SelectFieldSizeMenu } from "./menus/select_field_size_menu.js";
const game = new Game();
const selectFieldSizeMenu = new SelectFieldSizeMenu(game);
const leaderboard = new Leaderboard();
const mainMenu = new MainMenu(selectFieldSizeMenu, leaderboard);
