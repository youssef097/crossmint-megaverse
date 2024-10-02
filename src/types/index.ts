export interface IPosition {
    row: number;
    column: number;
}

export enum AstralObjectType {
    POLYANET = "polyanets",
    SOLOON = "soloons",
    COMETH = "comeths",
}

export enum ComethDirection {
    UP = "up",
    DOWN = "down",
    LEFT = "left",
    RIGHT = "right",
}

export enum SoloonColor {
    RED = "red",
    PURPLE = "purple",
    BLUE = "blue",
    WHITE = "white",
}
