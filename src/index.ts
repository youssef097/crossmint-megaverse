import { showMenu } from "@utils/menu";
import dotenv from "dotenv";
dotenv.config();

import { megaverse } from "src/services/Megaverse";

(async () => {
    try {
        let action = null;

        while (action !== "exit") {
            await megaverse.loadProgress();

            const progress = megaverse.getPercentageProgress();

            action = await showMenu(progress);
            switch (action) {
                case "create":
                    console.log("[🌌] Creating Megaverse from Goal Map...");
                    await megaverse.clearCurrentMap();
                    await megaverse.createMetaverseFromGoal();
                    console.log("[✅] Metaverse creation complete!");
                    break;

                case "continue":
                    console.log(
                        "[🌌] Continuing Megaverse creation from the current map...",
                    );
                    await megaverse.createMetaverseFromGoal();
                    console.log("[✅] Metaverse creation continued!");
                    break;

                case "clear":
                    console.log("[🧹] Clearing Current Map...");
                    await megaverse.clearCurrentMap();
                    console.log("[✅] Map cleared!");
                    break;

                case "delete_intrusive":
                    console.log("[☣️] Deleting intrusive Objects...");
                    await megaverse.deleteIntrusiveObjects();
                    console.log("[✅] Intrusive objects cleared!");
                    break;

                case "validate":
                    const result = await megaverse.validate();

                    if (result) {
                        console.log("[🎉] Your Megaverse is perfect!! ");
                        console.log("[🌘] PARKOUR TO THE MOON! [🌒]");
                    } else {
                        console.log("[🎉] Your megaverse is still lacking 😔 ");
                        console.log("[🌘] Keep Trying! [🌒]");
                    }
                    break;

                case "exit":
                    console.log("[👋] Exiting...");
                    process.exit(0);
            }
        }
    } catch (error) {
        console.error("[‼️] Error:", error);
    }
})();
