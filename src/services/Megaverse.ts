import { normalizeMap } from "@utils/index";
import {
    PolyanetService,
    SoloonService,
    ComethService,
    AstralObjectService,
} from "src/services/AstralObject";
import { MapService } from "src/services/MapService";
import { AstralObject, AstralObjectType, IPosition, typeMap } from "src/types";

export class MegaverseService {
    private polyanetService: PolyanetService;
    private soloonService: SoloonService;
    private comethService: ComethService;
    private mapService: MapService;

    private totalObjects: number = 0;
    private createdObjects: number = 0;
    private intrusiveObjects: AstralObject[] = [];

    constructor(candidateId: string) {
        console.log("💥 MEGAVERSE INITIATED 💥");

        this.polyanetService = new PolyanetService(candidateId);
        this.soloonService = new SoloonService(candidateId);
        this.comethService = new ComethService(candidateId);
        this.mapService = new MapService(candidateId);
    }

    private getServiceByType(type: AstralObjectType): AstralObjectService {
        switch (type) {
            case AstralObjectType.POLYANET:
                return this.polyanetService;
            case AstralObjectType.SOLOON:
                return this.soloonService;
            case AstralObjectType.COMETH:
                return this.comethService;
            default:
                throw new Error(`Unsupported type: ${type}`);
        }
    }

    private async createObject(astralObject: AstralObject): Promise<void> {
        const { type, position, extraParams } = astralObject;

        switch (type) {
            case AstralObjectType.POLYANET:
                await this.polyanetService.createPolyanet(position);
                break;
            case AstralObjectType.SOLOON:
                await this.soloonService.createSoloon(
                    position,
                    extraParams!.color,
                );
                break;
            case AstralObjectType.COMETH:
                await this.comethService.createCometh(
                    position,
                    extraParams!.direction,
                );
                break;
        }
    }

    public async deleteObject(
        position: IPosition,
        type: AstralObjectType,
    ): Promise<void> {
        switch (type) {
            case AstralObjectType.POLYANET:
                await this.polyanetService.deletePolyanet(position);
                break;
            case AstralObjectType.SOLOON:
                await this.soloonService.deleteSoloon(position);
                break;
            case AstralObjectType.COMETH:
                await this.comethService.deleteCometh(position);
                break;
        }
    }

    async createMegaverseFromGoal(): Promise<void> {
        const currentMap: AstralObject[] = await this.getCurrentAstralObjects();
        const goalMap: AstralObject[] = await this.getGoalMap();

        this.totalObjects = goalMap.length;
        this.createdObjects = currentMap.length;

        for (const intrusiveObject of this.intrusiveObjects) {
            await this.deleteObject(
                intrusiveObject.position,
                intrusiveObject.type,
            );
            this.createdObjects--;
            this.getPercentageProgress();
        }

        const objectsToCreate = goalMap.filter((goalObject) => {
            const service = this.getServiceByType(goalObject.type);
            const existingObject = currentMap.find((currentObject) =>
                service.isEqual(currentObject, goalObject),
            );
            return !existingObject;
        });

        console.log(`[ℹ️ ] Creating ${objectsToCreate.length} new objects...`);
        for (const astralObject of objectsToCreate) {
            await this.createObject(astralObject);
            this.createdObjects++;
            this.getPercentageProgress();
        }
    }

    public async loadProgress(): Promise<void> {
        const currentMap: AstralObject[] = await this.getCurrentAstralObjects();
        const goalMap: AstralObject[] = await this.getGoalMap();

        this.intrusiveObjects = currentMap.filter((currentObject) => {
            const service = this.getServiceByType(currentObject.type);
            const isInGoalMap = goalMap.find((goalObject) =>
                service.isEqual(goalObject, currentObject),
            );
            return !isInGoalMap;
        });

        console.log(
            `[⛔️] Found ${this.intrusiveObjects.length} intrusive astral objects`,
        );

        this.totalObjects = goalMap.length;
        this.createdObjects = currentMap.length - this.intrusiveObjects.length;
    }

    public getPercentageProgress(isDeletionProgress = false) {
        const adjustedCreatedObjects = isDeletionProgress
            ? this.createdObjects + this.intrusiveObjects.length
            : this.createdObjects;

        const progressPercentage =
            (adjustedCreatedObjects / this.totalObjects) * 100;

        if (isDeletionProgress) {
            console.log(
                `[🗑️] ${this.totalObjects - adjustedCreatedObjects}/${
                    this.totalObjects
                } planets deleted (${(100 - progressPercentage).toFixed(2)}%)`,
            );
            return 100 - progressPercentage;
        } else {
            console.log(
                `[✨] ${adjustedCreatedObjects}/${
                    this.totalObjects
                } planets created (${progressPercentage.toFixed(2)}%)`,
            );
            return progressPercentage;
        }
    }

    public async clearCurrentMap(): Promise<void> {
        console.log("[ℹ️ ] Clearing Megaverse...");

        const currentAstralObjects = await this.getCurrentAstralObjects();

        if (!currentAstralObjects.length) {
            console.log(
                `[ℹ️ ] No elements found in the current megaverse, skipping...`,
            );
            return;
        }

        console.log(
            `[ℹ️ ] Clearing ${currentAstralObjects.length} elements from the current megaverse...`,
        );
        for (const { position, type } of currentAstralObjects) {
            await this.deleteObject(position, type);
            this.createdObjects--;
            this.getPercentageProgress(true);
        }
    }

    public async deleteIntrusiveObjects(): Promise<void> {
        console.log("[ℹ️ ] Deletign intrusive objects...");

        const currentAstralObjects = await this.getCurrentAstralObjects();

        if (!currentAstralObjects.length) {
            console.log(
                `[ℹ️ ] No elements found in the current megaverse, skipping...`,
            );
            return;
        }

        console.log(
            `[ℹ️ ] Clearing ${this.intrusiveObjects.length} elements from the current megaverse...`,
        );
        for (const { position, type } of this.intrusiveObjects) {
            await this.deleteObject(position, type);
            this.getPercentageProgress();
        }
    }

    public async getCurrentAstralObjects(): Promise<AstralObject[]> {
        console.log("[ℹ️ ] getting current astral object...");

        const currentMap: (AstralObject | null)[][] =
            await this.getCurrentMap();

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

    public async getGoalMap(): Promise<AstralObject[]> {
        const goal = await this.mapService.getGoalMap();
        return normalizeMap(goal, typeMap);
    }

    public async getCurrentMap(): Promise<any> {
        return await this.mapService.getCurrentMap();
    }

    public async validate(): Promise<boolean> {
        console.log("[⏳] Validating your megaverse");
        const result = await this.mapService.validate();
        return result;
    }

    get getIntrusiveAstralObjects(): AstralObject[] {
        return this.intrusiveObjects;
    }
}

export const megaverse = new MegaverseService(process.env.CANDIDATE_ID!);
