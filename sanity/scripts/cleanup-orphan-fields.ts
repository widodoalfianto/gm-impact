import { getCliClient } from "sanity/cli";

/**
 * Removes fields left over from schema changes during development:
 *   - `dividerColor` on any section (replaced by the section background model)
 *   - `accent` on heroBlock sections (replaced by the inline accent title)
 *
 * Safe: only unsets fields that no longer exist in the schema. Staging only
 * unless MIGRATE_ALLOW_NON_STAGING=1.
 */
const client = getCliClient({ apiVersion: "2026-06-08" });
const allowNonStaging = process.env.MIGRATE_ALLOW_NON_STAGING === "1";

type Section = { _key: string; _type: string; [key: string]: unknown };
type Doc = { _id: string; sections?: Section[] };

async function cleanup() {
  const dataset = client.config().dataset;
  console.log(`\nDataset: ${dataset}\n`);

  if (dataset !== "staging" && !allowNonStaging) {
    console.error("Refusing to run outside staging. Set MIGRATE_ALLOW_NON_STAGING=1 to override.\n");
    process.exitCode = 1;
    return;
  }

  // Raw perspective so drafts are included too.
  const docs = await client
    .withConfig({ perspective: "raw" })
    .fetch<Doc[]>(`*[defined(sections)]{ _id, sections }`);

  const transaction = client.transaction();
  let count = 0;

  for (const doc of docs) {
    const paths: string[] = [];

    for (const section of doc.sections ?? []) {
      if ("dividerColor" in section) {
        paths.push(`sections[_key=="${section._key}"].dividerColor`);
      }
      if (section._type === "heroBlock" && "accent" in section) {
        paths.push(`sections[_key=="${section._key}"].accent`);
      }
    }

    if (paths.length > 0) {
      console.log(`  ${doc._id}: unset ${paths.length} field(s)`);
      transaction.patch(doc._id, (patch) => patch.unset(paths));
      count += paths.length;
    }
  }

  if (count === 0) {
    console.log("No orphaned fields found.\n");
    return;
  }

  await transaction.commit();
  console.log(`\nRemoved ${count} orphaned field(s).\n`);
}

cleanup().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
