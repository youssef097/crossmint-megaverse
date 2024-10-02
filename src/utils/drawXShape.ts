import { MapService } from "src/services/MapService";
import { metaverse } from "src/services/Metaverse";
import { delay } from ".";

// Phase 1
export const drawXShape = async (margin: number = 2) => {
    const mapService = new MapService(process.env.CANDIDATE_ID!);

    const goalMap = await mapService.getGoalMap();
    const SIZE = goalMap.goal.length;

    for (let i = margin; i < SIZE - margin; i++) {
        await metaverse.createPolyanet({ row: i, column: i });
        await delay(500);
        await metaverse.createPolyanet({ row: i, column: SIZE - 1 - i });
        await delay(500);
    }
};
