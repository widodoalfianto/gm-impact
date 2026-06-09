import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2026-06-08" });

const countries = [
  { _id: "country-nepal", name: "Nepal", isoCode: "NP" },
  { _id: "country-indonesia", name: "Indonesia", isoCode: "ID" },
];

async function seed() {
  const transaction = client.transaction();

  for (const country of countries) {
    transaction.createOrReplace({
      ...country,
      _type: "country",
      slug: {
        _type: "slug",
        current: country.name.toLowerCase(),
      },
    });
  }

  transaction.createOrReplace({
    _id: "newsletter-mission-trip-demo",
    _type: "newsletter",
    newsletterType: "missionTrip",
    title: "Mission Trip Highlight Demo",
    slug: {
      _type: "slug",
      current: "mission-trip-demo",
    },
    publishDate: "2026-06-08",
    eyebrow: "Mission Trip Highlight",
    heroHeading: "Hope carried",
    heroAccent: "across every mile",
    summary:
      "A demonstration newsletter showing how office staff can turn field notes, impact numbers, photos, and prayer needs into a polished update.",
    countries: countries.map((country) => ({
      _key: country.isoCode.toLowerCase(),
      _type: "reference",
      _ref: country._id,
    })),
    landingTitle: "A mission trip shaped by presence, prayer, and partnership.",
    landingSummary:
      "This demo shows the proposed editing workflow before real mission data is migrated.",
    landingHighlights: ["2 Countries", "1 Field Team", "Demo Content"],
    featured: false,
    hideFromIndex: true,
    sections: [
      {
        _key: "impact",
        _type: "impactGrid",
        heading: "Impact at a glance",
        intro:
          "Placeholder metrics demonstrate how staff can enter clear outcomes without editing code.",
        metrics: [
          {
            _key: "people",
            _type: "metric",
            value: "240",
            label: "People Served",
          },
          {
            _key: "leaders",
            _type: "metric",
            value: "32",
            label: "Leaders Equipped",
          },
          {
            _key: "locations",
            _type: "metric",
            value: "6",
            label: "Ministry Locations",
          },
        ],
      },
      {
        _key: "story",
        _type: "storySection",
        eyebrow: "From the field",
        heading: "A short story can carry the meaning behind the numbers.",
        body: [
          {
            _key: "paragraph-one",
            _type: "block",
            children: [
              {
                _key: "span-one",
                _type: "span",
                marks: [],
                text: "Office staff can replace this demo with a concise field report, add photographs, and rearrange the approved sections while the website preserves its visual quality.",
              },
            ],
            markDefs: [],
            style: "normal",
          },
        ],
      },
      {
        _key: "prayer",
        _type: "prayerSection",
        heading: "How to pray",
        items: [
          "Pray for lasting discipleship after every outreach.",
          "Pray for local leaders serving their communities faithfully.",
          "Pray for wisdom as accurate stories and impact data are gathered.",
        ],
      },
      {
        _key: "cta",
        _type: "callToActionSection",
        heading: "Partner with Global Missions",
        description:
          "Help sustain prayer, sending, care, and church planting among unreached communities.",
        buttonLabel: "Give to Global Missions",
        buttonUrl:
          "https://worldharvest.givecloud.co/IFGF%20Global%20Mission",
      },
    ],
  });

  await transaction.commit();
  console.log("Seeded the GM Impact demo newsletter.");
  console.log("Preview: /newsletters/mission-trip-demo");
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
