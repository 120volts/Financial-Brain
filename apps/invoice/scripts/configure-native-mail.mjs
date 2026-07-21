import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const configPath = path.resolve(
  scriptDirectory,
  "../ios/App/App/capacitor.config.json",
);

const config = JSON.parse(await readFile(configPath, "utf8"));
const pluginClasses = new Set(config.packageClassList ?? []);
pluginClasses.add("NativeMailPlugin");
pluginClasses.add("PaymentReminderPlugin");
config.packageClassList = [...pluginClasses];

await writeFile(configPath, `${JSON.stringify(config, null, "\t")}\n`);
console.log("Registered native mail and payment reminder plugins in the generated iOS configuration.");
