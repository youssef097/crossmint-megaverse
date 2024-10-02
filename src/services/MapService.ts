import { throttledClient } from "@client/ThrottledApiCient";
import { typeMap } from "@utils/index";
import dotenv from "dotenv";
import { AstralObject } from "src/types";

dotenv.config();

export class MapService {
    private candidateId: string;

    constructor(candidateId: string) {
        this.candidateId = candidateId;
    }

    async getGoalMap(): Promise<any> {
        const response = await throttledClient.get(
            `${process.env.API_URL}/map/${this.candidateId}/goal`,
        );

        return response.data.goal;
    }
    async getCurrentMap(): Promise<any> {
        const response = await throttledClient.get(
            `${process.env.API_URL}/map/${this.candidateId}`,
        );

        return response.data.map.content;
    }
}
