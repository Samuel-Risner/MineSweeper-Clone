import { Field } from "./game/field.js";
export class Game {
    field;
    constructor() {
        this.field = new Field(0, 0, 0);
    }
}
