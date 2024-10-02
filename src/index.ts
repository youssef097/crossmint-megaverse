import { metaverse } from "src/services/Metaverse";

import dotenv from "dotenv";

dotenv.config();

(async () => {
    console.log("[MAIN] Metaverse started");

    await metaverse.clearCurrentMap();

    await metaverse.createMetaverseFromGoal();

    console.log("[MAIN] Metaverse generated succesfully!");
})();
