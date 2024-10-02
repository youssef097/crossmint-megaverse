import {
    PolyanetService,
    SoloonService,
    ComethService,
} from "src/services/AstralObject";
import { MapService } from "src/services/MapService";
import { ComethDirection, IPosition, SoloonColor } from "src/types";

export class MetaverseService {
    private polyanetService: PolyanetService;
    private soloonService: SoloonService;
    private comethService: ComethService;
    private mapService: MapService;

    constructor(candidateId: string) {
        this.polyanetService = new PolyanetService(candidateId);
        this.soloonService = new SoloonService(candidateId);
        this.comethService = new ComethService(candidateId);
        this.mapService = new MapService(candidateId);
    }

    async createMetaverseFromGoal(): Promise<void> {
        const goalMap = await this.getGoalMap();

        for (let row = 0; row < goalMap.length; row++) {
            for (let column = 0; column < goalMap[row].length; column++) {
                const objectType = goalMap[row][column];
                const position: IPosition = { row, column };

                switch (objectType) {
                    case "POLYANET":
                        await this.createPolyanet(position);
                        break;
                    case "BLUE_SOLOON":
                        await this.createSoloon(position, SoloonColor.BLUE);
                        break;
                    case "RED_SOLOON":
                        await this.createSoloon(position, SoloonColor.RED);
                        break;
                    case "PURPLE_SOLOON":
                        await this.createSoloon(position, SoloonColor.PURPLE);
                        break;
                    case "WHITE_SOLOON":
                        await this.createSoloon(position, SoloonColor.WHITE);
                        break;
                    case "UP_COMETH":
                        await this.createCometh(position, ComethDirection.UP);
                        break;
                    case "DOWN_COMETH":
                        await this.createCometh(position, ComethDirection.DOWN);
                        break;
                    case "LEFT_COMETH":
                        await this.createCometh(position, ComethDirection.LEFT);
                        break;
                    case "RIGHT_COMETH":
                        await this.createCometh(
                            position,
                            ComethDirection.RIGHT,
                        );
                        break;
                    default:
                        // console.log(
                        //     objectType,
                        //     `No object to place at row ${row}, column ${column}`,
                        // );
                        break;
                }
            }
        }
    }

    async clearCurrentMap() {
        console.log("[Info] Clearing Metaverse...");

        const currentAstralObjects = await this.getCurrentAstralObjects();

        if (!currentAstralObjects.length) {
            console.log(
                `[Info] Found ${currentAstralObjects.length} elements in current metaverse, skipping...`,
            );
            return;
        }
        console.log(
            `[Info] Found ${currentAstralObjects.length} elements in current metaverse, clearing...`,
        );
        await Promise.all(
            currentAstralObjects.map(
                async (aO: { type: number; column: number; row: number }) => {
                    const { row, column } = aO;
                    switch (aO.type) {
                        case 0:
                            return await this.deletePolyanet({ column, row });

                        case 1:
                            return await this.deleteSoloon({ column, row });

                        case 2:
                            return await this.deleteCometh({ column, row });

                        default:
                            // console.log(` Type ${aO.type} not found`);
                            return;
                    }
                },
            ),
        );
    }

    async getCurrentAstralObjects() {
        console.log("[info] getting current astral object...");

        const currentMap: [][] = await this.mapService.getCurrentMap();

        const result = [];

        for (let row = 0; row < currentMap.length; row++) {
            for (let column = 0; column < currentMap[row].length; column++) {
                if (currentMap[row][column] !== null) {
                    result.push({
                        type: 0,
                        column: column,
                        row: row,
                    });
                }
            }
        }

        return result;
    }

    async createPolyanet(position: IPosition): Promise<void> {
        await this.polyanetService.createPolyanet(position);
    }

    async createSoloon(position: IPosition, color: SoloonColor): Promise<void> {
        const result = await this.soloonService.createSoloon(position, color);
        console.log("result", result);

        return result;
    }

    async createCometh(
        position: IPosition,
        direction: ComethDirection,
    ): Promise<void> {
        await this.comethService.createCometh(position, direction);
    }

    async deletePolyanet(position: IPosition): Promise<void> {
        await this.polyanetService.deletePolyanet(position);
    }

    async deleteSoloon(position: IPosition): Promise<void> {
        await this.soloonService.deleteSoloon(position);
    }

    async deleteCometh(position: IPosition): Promise<void> {
        await this.comethService.deleteCometh(position);
    }

    async getGoalMap(): Promise<any> {
        const goal = await this.mapService.getGoalMap();
        return goal.goal;
    }
    async getCurrentMap(): Promise<any> {
        const current = await this.mapService.getCurrentMap();
        return current;
    }
}

export const metaverse = new MetaverseService(process.env.CANDIDATE_ID!);
