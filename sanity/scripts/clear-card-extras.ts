import { getCliClient } from "sanity/cli";

/**
 * One-off cleanup for fields removed from the newsletter schema:
 *  - landingHighlights and listName are no longer used (cleared everywhere)
 *  - the stray country on the 2025 Q2 video update (Countries field is now
 *    hidden in the editor, so it can't be cleared by hand)
 *
 * Unsetting fields that are no longer in the schema keeps the editor from
 * flagging them as unknown fields. Staging only unless MIGRATE_ALLOW_NON_STAGING=1.
 */
const client = getCliClient({ apiVersion: "2026-06-08" });
const allowNonStaging = process.env.MIGRATE_ALLOW_NON_STAGING === "1";

// Cleared from every newsletter.
const GLOBAL_UNSET = ["landingHighlights", "listName"];
// Cleared from this doc only (the 2025 Q2 video update's leftover country).
const COUNTRY_DOC = "a2b87579-5125-4ed8-a673-4e8dbf12f15a";

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

  const ids: string[] = await client.fetch(`*[_type == "newsletter"]._id`);
  // Include drafts as well as published versions.
  const candidateIds = Array.from(
    new Set(
      ids.flatMap((id) => {
        const base = id.replace(/^drafts\./, "");
        return [base, `drafts.${base}`];
      }),
    ),
  );
  const existing: string[] = await client.fetch(`*[_id in $ids]._id`, {
    ids: candidateIds,
  });

  const tx = client.transaction();
  for (const docId of existing) {
    const fields =
      docId.replace(/^drafts\./, "") === COUNTRY_DOC
        ? [...GLOBAL_UNSET, "countries"]
        : GLOBAL_UNSET;
    tx.patch(docId, (p) => p.unset(fields));
    console.log(`  ${docId}: unset ${fields.join(", ")}`);
  }

  await tx.commit();
  console.log("\nDone clearing removed fields.\n");
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
