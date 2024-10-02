import prompts from "prompts";
import { megaverse } from "src/services/Megaverse";

export async function showMenu(progress: number) {
    const choices = [
        {
            title: `${
                progress > 0 ? "Clear and " : ""
            }Create Megaverse from Goal Map`,
            value: "create",
        },
    ];

    if (progress > 0 && progress < 100) {
        choices.splice(1, 0, {
            title: `Continue Megaverse Creation [${progress.toFixed(2)}%] `,
            value: "continue",
        });
    }

    if (progress === 100) {
        choices.splice(1, 0, {
            title: `Validate [${progress.toFixed(2)}%] `,
            value: "validate",
        });
    }

    if (progress > 0) {
        choices.push({
            title: `Clear Current Map ${(100 - progress).toFixed(2)} %`,
            value: "clear",
        });
    }

    if (megaverse.getIntrusiveAstralObjects.length) {
        choices.push({
            title: `Delete Intrusive astral objects (${megaverse.getIntrusiveAstralObjects.length})`,
            value: "delete_intrusive",
        });
    }

    choices.push({ title: "Exit", value: "exit" });

    const response = await prompts({
        type: "select",
        name: "action",
        message: "Welcome to the megaverse!",
        choices,
    });

    return response.action;
}
