// import { drawXShape } from "@utils/drawXShape";
import dotenv from "dotenv";
dotenv.config();

import { megaverse } from "src/services/Megaverse";

(async () => {
    try {
        await megaverse.clearCurrentMap();
        await megaverse.createMetaverseFromGoal();
    } catch (error) {
        console.error("[‼️]Error creating megaverse:", error);
    }
})();
