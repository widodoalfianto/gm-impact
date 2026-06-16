import { getCliClient } from "sanity/cli";

/**
 * One-off cleanup: remove card highlights from existing newsletters, and the
 * stray country reference on the 2025 Q2 video update (whose Countries field is
 * now hidden in the editor, so it can't be cleared by hand).
 *
 * Staging only unless MIGRATE_ALLOW_NON_STAGING=1.
 */
const client = getCliClient({ apiVersion: "2026-06-08" });
const allowNonStaging = process.env.MIGRATE_ALLOW_NON_STAGING === "1";

const targets: Record<string, string[]> = {
  // 2025 Q2 Project Update (video) — drop the leftover Indonesia flag too.
  "a2b87579-5125-4ed8-a673-4e8dbf12f15a": ["landingHighlights", "countries"],
  // 2026 Global Impact Report — keep its countries, just drop highlights.
  "newsletter-2026-global-impact": ["landingHighlights"],
};

async function run() {
  const dataset = client.config().dataset;
  console.log(`\nDataset: ${dataset}\n`);

  if (dataset !== "staging" && !allowNonStaging) {
    console.error(
      "Refusing to run outside staging. Set MIGRATE_ALLOW_NON_STAGING=1 to override.\n",
    );
    process.exitCode = 1;
    return;
  }

  // Patch both the published and draft version of each target, where present.
  const candidateIds = Object.keys(targets).flatMap((id) => [
    id,
    `drafts.${id}`,
  ]);
  const existing: string[] = await client.fetch(`*[_id in $ids]._id`, {
    ids: candidateIds,
  });

  const tx = client.transaction();
  for (const docId of existing) {
    const fields = targets[docId.replace(/^drafts\./, "")];
    if (!fields) continue;
    tx.patch(docId, (p) => p.unset(fields));
    console.log(`  ${docId}: unset ${fields.join(", ")}`);
  }

  await tx.commit();
  console.log("\nDone clearing card highlights and the stray country.\n");
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
