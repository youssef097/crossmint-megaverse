import { normalizeMap, typeMap } from "@utils/index";
import {
    PolyanetService,
    SoloonService,
    ComethService,
} from "src/services/AstralObject";
import { MapService } from "src/services/MapService";
import { AstralObject, AstralObjectType, IPosition } from "src/types";

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
        const goalMap: AstralObject[] = await this.getGoalMap();
        for (let i = 0; i < goalMap.length; i++) {
            const astralObject = goalMap[i];
            console.log(astralObject);

            switch (astralObject.type) {
                case AstralObjectType.COMETH:
                    await this.createCometh(astralObject);
                    break;
                case AstralObjectType.SOLOON:
                    await this.createSoloon(astralObject);
                    break;
                case AstralObjectType.POLYANET:
                    await this.createPolyanet(astralObject);
                    break;
                default:
                    break;
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
                async ({ position, type }: AstralObject) => {
                    const { row, column } = position;
                    switch (type) {
                        case AstralObjectType.POLYANET:
                            return await this.deletePolyanet({ column, row });
                        case AstralObjectType.SOLOON:
                            return await this.deleteSoloon({ column, row });
                        case AstralObjectType.COMETH:
                            return await this.deleteCometh({ column, row });

                        default:
                            // console.log(` Type ${aO.type} not found`);
                            return;
                    }
                },
            ),
        );
    }

    async getCurrentAstralObjects(): Promise<AstralObject[]> {
        console.log("[info] getting current astral object...");

        const currentMap: (AstralObject | null)[][] =
            await this.getCurrentMap(); // Define the map as holding AstralObject or null

        const result: AstralObject[] = [];

        for (let row = 0; row < currentMap.length; row++) {
            for (let column = 0; column < currentMap[row].length; column++) {
                if (currentMap[row][column] !== null) {
                    let current: any = currentMap[row][column];
                    result.push({
                        type: current.type,
                        position: {
                            column,
                            row,
                        },
                        extraParams: {
                            color: current.color,
                            direction: current.direction,
                        },
                    });
                }
            }
        }

        return result;
    }

    async createPolyanet({ position }: AstralObject): Promise<void> {
        await this.polyanetService.createPolyanet(position);
    }

    async createSoloon({ position, extraParams }: AstralObject): Promise<void> {
        const result = await this.soloonService.createSoloon(
            position,
            extraParams!.color,
        );

        return result;
    }

    async createCometh({ position, extraParams }: AstralObject): Promise<void> {
        await this.comethService.createCometh(position, extraParams!.direction);
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

    async getGoalMap(): Promise<AstralObject[]> {
        const goal = await this.mapService.getGoalMap();
        return normalizeMap(goal, typeMap);
    }
    async getCurrentMap(): Promise<any> {
        const current = await this.mapService.getCurrentMap();
        return current;
    }
}

export const metaverse = new MetaverseService(process.env.CANDIDATE_ID!);
