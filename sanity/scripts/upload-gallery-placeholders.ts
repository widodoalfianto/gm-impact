import { readFileSync } from "node:fs";
import { join } from "node:path";
import { getCliClient } from "sanity/cli";

/**
 * Uploads the local placeholder photos in /assets as Sanity image assets so
 * the "Project update - images" template can reference them by asset id.
 *
 * Sanity assets are content-addressed, so re-running this is idempotent: the
 * same file bytes always resolve to the same `image-<sha1>-<dims>-<format>` id.
 *
 * Staging only unless MIGRATE_ALLOW_NON_STAGING=1.
 */
const client = getCliClient({ apiVersion: "2026-06-08" });
const allowNonStaging = process.env.MIGRATE_ALLOW_NON_STAGING === "1";

const files = ["ifgf1.avif", "ifgf2.avif", "ifgf3.avif"];

async function upload() {
  const dataset = client.config().dataset;
  console.log(`\nDataset: ${dataset}\n`);

  if (dataset !== "staging" && !allowNonStaging) {
    console.error(
      "Refusing to run outside staging. Set MIGRATE_ALLOW_NON_STAGING=1 to override.\n",
    );
    process.exitCode = 1;
    return;
  }

  for (const file of files) {
    const buffer = readFileSync(join(process.cwd(), "assets", file));
    const asset = await client.assets.upload("image", buffer, {
      filename: file,
    });
    console.log(`  ${file} -> ${asset._id}`);
  }

  console.log("\nDone uploading gallery placeholders.\n");
}

upload().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
