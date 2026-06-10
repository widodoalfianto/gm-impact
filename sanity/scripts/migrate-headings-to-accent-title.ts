import { getCliClient } from "sanity/cli";

/**
 * Wraps existing string `heading` values into portable text for the blocks
 * whose heading became an accentTitle field, so existing content stays valid
 * and gains inline accent highlighting.
 *
 * Dry run by default; MIGRATE_APPLY=1 to apply. Staging only unless
 * MIGRATE_ALLOW_NON_STAGING=1.
 */
const CONVERTED_TYPES = new Set([
  "storySection",
  "gallerySection",
  "videoSection",
  "prayerSection",
  "callToActionSection",
  "richTextBlock",
  "imageTextBlock",
  "faqBlock",
  "logoStripBlock",
  "embedBlock",
  "countryGridSection",
  "partnerGridSection",
]);

const client = getCliClient({ apiVersion: "2026-06-08" });
const apply = process.env.MIGRATE_APPLY === "1";
const allowNonStaging = process.env.MIGRATE_ALLOW_NON_STAGING === "1";

type Section = { _key: string; _type: string; heading?: unknown };
type Doc = { _id: string; sections?: Section[]; heroHeading?: unknown };

function toPortableText(key: string, text: string) {
  return [
    {
      _type: "block",
      _key: `${key}-heading`,
      style: "normal",
      markDefs: [],
      children: [{ _type: "span", _key: `${key}-heading-0`, text, marks: [] }],
    },
  ];
}

async function migrate() {
  const dataset = client.config().dataset;
  console.log(`\nDataset: ${dataset}`);
  console.log(`Mode:    ${apply ? "APPLY" : "DRY RUN (no changes)"}\n`);

  if (apply && dataset !== "staging" && !allowNonStaging) {
    console.error("Refusing to apply outside staging. Set MIGRATE_ALLOW_NON_STAGING=1 to override.\n");
    process.exitCode = 1;
    return;
  }

  const docs = await client
    .withConfig({ perspective: "raw" })
    .fetch<Doc[]>(`*[defined(sections)]{ _id, sections, heroHeading }`);

  const transaction = client.transaction();
  let count = 0;

  for (const doc of docs) {
    const patch: Record<string, unknown> = {};

    if (typeof doc.heroHeading === "string" && doc.heroHeading.length > 0) {
      patch.heroHeading = toPortableText("hero", doc.heroHeading);
      console.log(`  ${doc._id} · heroHeading: "${doc.heroHeading}"`);
      count += 1;
    }

    for (const section of doc.sections ?? []) {
      if (
        CONVERTED_TYPES.has(section._type) &&
        typeof section.heading === "string" &&
        section.heading.length > 0
      ) {
        patch[`sections[_key=="${section._key}"].heading`] = toPortableText(
          section._key,
          section.heading,
        );
        console.log(`  ${doc._id} · ${section._type}: "${section.heading}"`);
        count += 1;
      }
    }

    if (Object.keys(patch).length > 0) {
      transaction.patch(doc._id, (p) => p.set(patch));
    }
  }

  if (count === 0) {
    console.log("No string headings to convert.\n");
    return;
  }

  if (!apply) {
    console.log(`\nDry run complete (${count} heading(s)). Re-run with MIGRATE_APPLY=1 to apply.\n`);
    return;
  }

  await transaction.commit();
  console.log(`\nConverted ${count} heading(s) to portable text.\n`);
}

migrate().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
