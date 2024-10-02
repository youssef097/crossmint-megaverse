export interface IPosition {
    row: number;
    column: number;
}

export interface AstralObject {
    type: AstralObjectType;
    position: IPosition;
    extraParams?: Record<"color" | "direction", SoloonColor | ComethDirection>;
}

export enum AstralObjectType {
    POLYANET = 0,
    SOLOON = 1,
    COMETH = 2,
}

export const AstralObjectEndoints = {
    0: "polyanets",
    1: "soloons",
    2: "comeths",
};

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
