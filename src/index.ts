import { metaverse } from "src/services/Metaverse";

import dotenv from "dotenv";

dotenv.config();

(async () => {
    console.log("[MAIN] Metaverse started");

    await metaverse.clearCurrentMap();
    console.log("[MAIN] Metaverse cleared succesfully!");

    // const result = await metaverse.getGoalMap();

    // const result = await metaverse.getCurrentAstralObjects();

    // console.log(result);

    await metaverse.createMetaverseFromGoal();
})();
