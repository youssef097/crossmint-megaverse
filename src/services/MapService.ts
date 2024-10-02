import { throttledClient } from "@client/ThrottledApiCient";
import dotenv from "dotenv";

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
        return response.data;
    }
    async getCurrentMap(): Promise<any> {
        const response = await throttledClient.get(
            `${process.env.API_URL}/map/${this.candidateId}`,
        );

        return response.data.map.content;
    }
}
