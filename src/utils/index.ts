import {
    AstralObject,
    AstralObjectType,
    ComethDirection,
    SoloonColor,
} from "src/types";

export const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

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

export function normalizeMap(
    map: any[][],
    typeMap: Record<
        string,
        { type: AstralObject["type"]; extraParams?: Record<string, any> }
    >,
): AstralObject[] {
    const normalizedMap: AstralObject[] = [];

    for (let row = 0; row < map.length; row++) {
        for (let column = 0; column < map[row].length; column++) {
            const objectType = map[row][column];

            // Space is null
            if (objectType === "SPACE") continue;

            if (objectType) {
                const { type, extraParams } = typeMap[objectType] || {
                    type: objectType,
                };

                normalizedMap.push({
                    type,
                    position: { row, column },
                    extraParams,
                });
            }
        }
    }

    return normalizedMap;
}
