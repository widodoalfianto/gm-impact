import { getCliClient } from "sanity/cli";

/**
 * Converts lightweight newsletters (mission trip, project update, country/field
 * update) into the leaner `post` (Field Update) type. Heavy "Global Impact
 * Report" newsletters stay as `newsletter`.
 *
 * Safe by default:
 *   - Dry run unless you pass `--apply`.
 *   - Refuses to apply against any dataset other than `staging` unless you
 *     also pass `--allow-non-staging` (production must stay untouched).
 *
 * Usage (flags go through env vars because `sanity exec` does not forward
 * unknown CLI flags to the script):
 *   npm run sanity:migrate:posts                      # dry run (lists what it would do)
 *   MIGRATE_APPLY=1 npm run sanity:migrate:posts      # apply on staging
 */

const TYPES_TO_CONVERT = ["missionTrip", "projectUpdate", "countryUpdate"];

const client = getCliClient({ apiVersion: "2026-06-08" });

const apply = process.env.MIGRATE_APPLY === "1";
const allowNonStaging = process.env.MIGRATE_ALLOW_NON_STAGING === "1";

type SourceNewsletter = {
  _id: string;
  _type: "newsletter";
  newsletterType?: string;
  title?: string;
  slug?: { _type: "slug"; current?: string };
  publishDate?: string;
  eyebrow?: string;
  heroHeading?: string;
  heroAccent?: string;
  summary?: string;
  heroImage?: unknown;
  countries?: Array<{ _ref: string; _key?: string }>;
  sections?: unknown[];
  landingTitle?: string;
  landingSummary?: string;
  landingHighlights?: string[];
  featured?: boolean;
  hideFromIndex?: boolean;
  seoTitle?: string;
  seoDescription?: string;
};

// `_type` is immutable in Sanity, so we cannot convert in place. We mint a new
// `post` document with a derived id and delete the original newsletter.
function newPostId(oldId: string) {
  return `post-${oldId.replace(/^newsletter-/, "")}`;
}

function toPost(source: SourceNewsletter) {
  const firstCountry = source.countries?.[0]?._ref;

  return {
    _id: newPostId(source._id),
    _type: "post" as const,
    title: source.title,
    slug: source.slug,
    publishDate: source.publishDate,
    ...(firstCountry
      ? { country: { _type: "reference" as const, _ref: firstCountry } }
      : {}),
    eyebrow: source.eyebrow,
    heroHeading: source.heroHeading,
    heroAccent: source.heroAccent,
    summary: source.summary,
    heroImage: source.heroImage,
    sections: source.sections,
    landingTitle: source.landingTitle,
    landingSummary: source.landingSummary,
    landingHighlights: source.landingHighlights,
    featured: source.featured ?? false,
    hideFromIndex: source.hideFromIndex ?? false,
    seoTitle: source.seoTitle,
    seoDescription: source.seoDescription,
  };
}

async function migrate() {
  const dataset = client.config().dataset;
  console.log(`\nProject: ${client.config().projectId}`);
  console.log(`Dataset: ${dataset}`);
  console.log(`Mode:    ${apply ? "APPLY" : "DRY RUN (no changes)"}\n`);

  if (apply && dataset !== "staging" && !allowNonStaging) {
    console.error(
      `Refusing to apply against "${dataset}". This migration is intended for ` +
        `staging only. Set MIGRATE_ALLOW_NON_STAGING=1 if you really mean it.\n`,
    );
    process.exitCode = 1;
    return;
  }

  const sources = await client.fetch<SourceNewsletter[]>(
    `*[_type == "newsletter" && newsletterType in $types]`,
    { types: TYPES_TO_CONVERT },
  );

  if (sources.length === 0) {
    console.log("No newsletters match the conversion criteria. Nothing to do.\n");
    return;
  }

  console.log(`Found ${sources.length} newsletter(s) to convert into posts:`);
  for (const source of sources) {
    const draftId = `drafts.${source._id}`;
    const hasDraft = Boolean(
      await client.getDocument(draftId).catch(() => null),
    );
    console.log(
      `  - ${source._id} -> ${newPostId(source._id)}  [${source.newsletterType}]  "${source.title ?? "Untitled"}"` +
        (hasDraft ? "  (also has an unpublished draft — will be removed)" : ""),
    );
  }

  if (!apply) {
    console.log(
      `\nDry run complete. Re-run with MIGRATE_APPLY=1 to perform the conversion.\n`,
    );
    return;
  }

  const transaction = client.transaction();
  for (const source of sources) {
    transaction.createOrReplace(toPost(source));
    transaction.delete(source._id);
    transaction.delete(`drafts.${source._id}`);
  }

  await transaction.commit();
  console.log(`\nConverted ${sources.length} newsletter(s) into posts.\n`);
}

migrate().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
