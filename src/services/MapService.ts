import { throttledClient } from "@client/ThrottledApiCient";
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

    async validate(): Promise<boolean> {
        const response = await throttledClient.post(
            `${process.env.API_URL}/map/${this.candidateId}/validate`,
        );

        return response.data.solved;
    }
}
