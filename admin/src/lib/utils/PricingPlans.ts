import fs from "fs/promises";
import path from "path";

const dataFilePath = path.join(
	process.cwd(),
	"src",
	"constants",
	"data",
	"pricing.json"
);

export async function getPlanById(id: string) {
	try {
		const data = await fs.readFile(dataFilePath, "utf-8");
		const plans = JSON.parse(data);
		return plans.find((plan: any) => plan.id === id) || null;
	} catch (error) {
		console.error("Error reading plan data:", error);
		return null;
	}
}
