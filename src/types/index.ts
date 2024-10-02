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

export const typeMap: Record<
    string,
    { type: number; extraParams?: Record<string, any> }
> = {
    POLYANET: { type: AstralObjectType.POLYANET },
    BLUE_SOLOON: {
        type: AstralObjectType.SOLOON,
        extraParams: { color: SoloonColor.BLUE },
    },
    RED_SOLOON: {
        type: AstralObjectType.SOLOON,
        extraParams: { color: SoloonColor.RED },
    },
    PURPLE_SOLOON: {
        type: AstralObjectType.SOLOON,
        extraParams: { color: SoloonColor.PURPLE },
    },
    WHITE_SOLOON: {
        type: AstralObjectType.SOLOON,
        extraParams: { color: SoloonColor.WHITE },
    },
    UP_COMETH: {
        type: AstralObjectType.COMETH,
        extraParams: { direction: ComethDirection.UP },
    },
    DOWN_COMETH: {
        type: AstralObjectType.COMETH,
        extraParams: { direction: ComethDirection.DOWN },
    },
    LEFT_COMETH: {
        type: AstralObjectType.COMETH,
        extraParams: { direction: ComethDirection.LEFT },
    },
    RIGHT_COMETH: {
        type: AstralObjectType.COMETH,
        extraParams: { direction: ComethDirection.RIGHT },
    },
};
