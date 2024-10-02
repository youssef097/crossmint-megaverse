import { AstralObject } from "src/types";

export const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

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
