import { getCliClient } from "sanity/cli";
import { ARCHIVE_NEWSLETTERS, GIVE_URL } from "../../app/gm/data";

/**
 * Builds CMS newsletter documents for the 2024 and 2025 archives from the
 * existing hand-coded archive data, so they use the same block template as
 * 2026 and become editable in the Studio.
 *
 * Staging only unless MIGRATE_ALLOW_NON_STAGING=1.
 */
const client = getCliClient({ apiVersion: "2026-06-08" });
const allowNonStaging = process.env.MIGRATE_ALLOW_NON_STAGING === "1";

function block(key: string, text: string) {
  return {
    _type: "block",
    _key: key,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: `${key}-0`, text, marks: [] }],
  };
}

function pt(key: string, text: string) {
  return [block(key, text)];
}

function bodyToPt(paragraphs: readonly string[], prefix: string) {
  return paragraphs.map((text, index) => block(`${prefix}-${index}`, text));
}

function archiveDoc(year: "2024" | "2025") {
  const archive = ARCHIVE_NEWSLETTERS[year];

  const stories = archive.stories.map((story, index) => {
    const body = [...story.body];
    if (story.source) {
      body.push(`Source: ${story.source.label}`);
    }

    return {
      _type: "storySection",
      _key: `story-${index}`,
      eyebrow: story.eyebrow,
      heading: pt(`story-${index}-h`, story.title),
      body: bodyToPt(body, `story-${index}-b`),
      metrics: story.stats.slice(0, 4).map((stat, statIndex) => ({
        _key: `story-${index}-m${statIndex}`,
        _type: "metric",
        value: stat.value,
        label: stat.label,
      })),
    };
  });

  return {
    _id: `newsletter-${year}`,
    _type: "newsletter",
    newsletterType: "globalImpact",
    title: `${year} Newsletter`,
    slug: { _type: "slug", current: `${year}` },
    publishDate: `${year}-12-31`,
    eyebrow: archive.overline,
    heroHeading: pt("hero", archive.title),
    heroAccent: archive.accent,
    summary: archive.intro,
    landingTitle: archive.stories[0]?.title ?? `${year} Newsletter`,
    landingSummary: archive.intro.slice(0, 260),
    featured: false,
    hideFromIndex: false,
    sections: [
      {
        _type: "impactGrid",
        _key: "impact",
        heading: "Impact",
        metrics: archive.stats.map((stat, index) => ({
          _key: `impact-m${index}`,
          _type: "metric",
          value: stat.value,
          label: stat.label,
          ...(stat.art ? { art: stat.art } : {}),
        })),
      },
      ...stories,
      {
        _type: "callToActionSection",
        _key: "giving",
        heading: pt("giving-h", "Partner with Global Missions"),
        description:
          "Help sustain prayer, sending, discipleship, care, and church planting among unreached communities.",
        buttonLabel: "Give to Global Missions",
        buttonUrl: GIVE_URL,
      },
    ],
  };
}

// A clean "standard template" newsletter (placeholders) used for 2025: hero,
// IMPACT, WHERE WE WORK, and the PARTNER WITH US section copied from 2026.
function templateDoc() {
  const placeholderCard = (key: string, countryRef: string) => ({
    _type: "countryImpact",
    _key: key,
    country: { _type: "reference", _ref: countryRef },
    subtitle: "Ministry focus",
    metrics: [
      { _key: `${key}-m1`, _type: "metric", value: "TBD", label: "Stat label" },
      { _key: `${key}-m2`, _type: "metric", value: "TBD", label: "Stat label" },
    ],
    highlights: ["Add a highlight here", "Add another highlight"],
  });

  return {
    _id: "newsletter-2025",
    _type: "newsletter",
    newsletterType: "globalImpact",
    title: "2025 Newsletter",
    slug: { _type: "slug", current: "2025" },
    publishDate: "2025-12-31",
    eyebrow: "2025 Newsletter",
    heroHeading: pt("hero", "Placeholder stories for"),
    heroAccent: "future mission updates",
    summary: "Give a short summary here that details this mission's impacts",
    landingTitle: "2025 mission updates.",
    landingSummary: "Give a short summary here that details this mission's impacts",
    featured: false,
    hideFromIndex: false,
    sections: [
      {
        _type: "impactGrid",
        _key: "impact",
        heading: "Global Impact",
        metrics: [
          { _key: "i1", _type: "metric", value: "TBD", label: "Nations Reached", art: "nations" },
          { _key: "i2", _type: "metric", value: "TBD", label: "New Believers", art: "believers" },
          { _key: "i3", _type: "metric", value: "TBD", label: "Leaders Trained", art: "leaders" },
          { _key: "i4", _type: "metric", value: "TBD", label: "Bibles Given", art: "bibles" },
        ],
      },
      {
        _type: "countryGridSection",
        _key: "where-we-work",
        eyebrow: "Where We Work",
        heading: pt("where-h", "Nations Reached."),
        accentHeading: "One Mission.",
        regions: [
          placeholderCard("c1", "country-nepal"),
          placeholderCard("c2", "country-algeria"),
          placeholderCard("c3", "country-indonesia"),
        ],
      },
      {
        _type: "partnerGridSection",
        _key: "partner",
        eyebrow: "Partner With Us",
        heading: pt("partner-h", "Join the mission beyond the newsletter."),
        intro:
          "Help sustain prayer, sending, discipleship, care, and church planting among unreached communities.",
        cards: [
          {
            _key: "planters",
            _type: "callToActionCard",
            heading: "Planters Program",
            description:
              "Join a community of partners helping plant churches, care for pastors, and support long-term discipleship in unreached places.",
            buttonLabel: "Join the Planter Program",
            buttonUrl: GIVE_URL,
          },
          {
            _key: "giving",
            _type: "callToActionCard",
            heading: "Giving",
            description:
              "Your generosity reaches the unreached by funding Bibles, medical care, discipleship, and church planting across five nations.",
            buttonLabel: "Give to Global Missions",
            buttonUrl: GIVE_URL,
          },
        ],
      },
    ],
  };
}

async function seed() {
  const dataset = client.config().dataset;
  console.log(`\nDataset: ${dataset}\n`);

  if (dataset !== "staging" && !allowNonStaging) {
    console.error("Refusing to run outside staging. Set MIGRATE_ALLOW_NON_STAGING=1 to override.\n");
    process.exitCode = 1;
    return;
  }

  const transaction = client.transaction();
  const docs: Array<{ _id: string; _type: string } & Record<string, unknown>> =
    [archiveDoc("2024"), templateDoc()];
  for (const doc of docs) {
    transaction.createOrReplace(doc);
    console.log(`  ${doc._id}`);
  }

  await transaction.commit();
  console.log("\nSeeded the 2024 archive and the 2025 template newsletter.\n");
}

seed().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
