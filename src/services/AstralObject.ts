import { throttledClient } from "@client/ThrottledApiCient";
import {
    AstralObject,
    AstralObjectEndoints,
    AstralObjectType,
    IPosition,
} from "src/types";

export abstract class AstralObjectService {
    protected candidateId: string;

    constructor(candidateId: string) {
        this.candidateId = candidateId;
    }

    protected abstract getObjectType(): AstralObjectType;

    protected async createObject(
        position: IPosition,
        extraParams?: Record<string, any>,
    ): Promise<void> {
        const url = `/${AstralObjectEndoints[this.getObjectType()]}`;
        const params = {
            ...position,
            candidateId: this.candidateId,
            ...extraParams,
        };
        await throttledClient.post(url, params);
    }

    protected async deleteObject(position: IPosition): Promise<void> {
        const url = `/${AstralObjectEndoints[this.getObjectType()]}`;
        const params = { ...position, candidateId: this.candidateId };
        await throttledClient.delete(url, { data: params });
    }

    public isEqual(
        currentObject: AstralObject,
        goalObject: AstralObject,
    ): boolean {
        if (
            currentObject.position.row !== goalObject.position.row ||
            currentObject.position.column !== goalObject.position.column ||
            currentObject.type !== goalObject.type
        ) {
            return false;
        }

        switch (goalObject.type) {
            case AstralObjectType.COMETH:
                return (
                    currentObject.extraParams?.direction ===
                    goalObject.extraParams?.direction
                );
            case AstralObjectType.SOLOON:
                return (
                    currentObject.extraParams?.color ===
                    goalObject.extraParams?.color
                );
            default:
                return true;
        }
    }
}

export class PolyanetService extends AstralObjectService {
    protected getObjectType(): AstralObjectType {
        return AstralObjectType.POLYANET;
    }

    async createPolyanet(position: IPosition): Promise<void> {
        console.log("[🪐] Creating polyanet in position", position);
        await this.createObject(position);
    }

    async deletePolyanet(position: IPosition): Promise<void> {
        console.log("[🪐] Deleting polyanet in position", position);

        await this.deleteObject(position);
    }
}

export class SoloonService extends AstralObjectService {
    protected getObjectType(): AstralObjectType {
        return AstralObjectType.SOLOON;
    }

    async createSoloon(position: IPosition, color: string): Promise<void> {
        console.log("[🌕] Creating polyanet in position", position);

        return await this.createObject(position, { color });
    }

    async deleteSoloon(position: IPosition): Promise<void> {
        console.log("[🌕] Deleting Soloon in position", position);

        await this.deleteObject(position);
    }
}

export class ComethService extends AstralObjectService {
    protected getObjectType(): AstralObjectType {
        return AstralObjectType.COMETH;
    }

    async createCometh(position: IPosition, direction: string): Promise<void> {
        console.log("[☄️ ] Creating Cometh in position", position);

        await this.createObject(position, { direction });
    }

    async deleteCometh(position: IPosition): Promise<void> {
        console.log("[☄️ ] Deleting Cometh in position", position);

        await this.deleteObject(position);
    }
}
