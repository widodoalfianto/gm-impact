import { GIVE_URL } from "../../app/gm/data";

const givingUrl = GIVE_URL;

// Portable-text value for accentTitle heading fields.
function pt(text: string) {
  return [
    {
      _type: "block",
      _key: "heading",
      style: "normal",
      markDefs: [],
      children: [{ _type: "span", _key: "heading-text", text, marks: [] }],
    },
  ];
}

export const newsletter2026Countries = [
  {
    _id: "country-nepal",
    name: "Nepal",
    isoCode: "NP",
    visualKey: "nepal",
    summary: "Leadership development, medical outreach, and Bible distribution.",
  },
  {
    _id: "country-algeria",
    name: "Algeria",
    isoCode: "DZ",
    visualKey: "algeria",
    summary: "Leadership training and support for underground house churches.",
  },
  {
    _id: "country-indonesia",
    name: "Indonesia",
    isoCode: "ID",
    visualKey: "indonesia",
    summary: "Discipleship and community outreach among unreached people groups.",
  },
  {
    _id: "country-afghanistan",
    name: "Afghanistan",
    isoCode: "AF",
    visualKey: "afghanistan",
    summary: "Household-based discipleship and baptism ministry.",
  },
  {
    _id: "country-somalia",
    name: "Somalia",
    isoCode: "SO",
    visualKey: "somalia",
    summary: "House church support and development of local ministry leaders.",
  },
];

function metric(
  key: string,
  value: string,
  label: string,
  art?: string,
) {
  return {
    _key: key,
    _type: "metric",
    value,
    label,
    ...(art ? { art } : {}),
  };
}

function countryReference(
  key: string,
  countryId: string,
  subtitle: string,
  metrics: ReturnType<typeof metric>[],
  highlights: string[],
) {
  return {
    _key: key,
    _type: "countryImpact",
    country: {
      _type: "reference",
      _ref: countryId,
    },
    subtitle,
    metrics,
    highlights,
    mediaLabel: "Placeholder for videos",
    mediaUrl: "#socials",
  };
}

export const newsletter2026Value = {
  newsletterType: "globalImpact",
  title: "2026 Global Impact Report",
  slug: {
    _type: "slug",
    current: "2026",
  },
  publishDate: "2026-06-08",
  eyebrow: "Global Impact - First Half of 2026",
  heroHeading: pt("Reaching the Unreached,"),
  heroAccent: "Across Five Nations",
  summary:
    "God is moving in Nepal, Algeria, Indonesia, Afghanistan, and Somalia. Here is what your partnership made possible in the first half of 2026.",
  heroImage: {
    _type: "image",
    asset: {
      _type: "reference",
      _ref: "image-bd9824e9d2a16eecd61c986cca218314688120db-980x651-avif",
    },
    alt: "People gathered during a Global Missions outreach",
  },
  countries: newsletter2026Countries.map((country) => ({
    _key: country.isoCode.toLowerCase(),
    _type: "reference",
    _ref: country._id,
  })),
  heroActions: [
    {
      _key: "impact",
      _type: "actionLink",
      label: "See Our Impact",
      url: "#impact",
      style: "primary",
    },
    {
      _key: "partner",
      _type: "actionLink",
      label: "Partner With Us",
      url: "#planters-giving",
      style: "secondary",
    },
  ],
  landingTitle: "Five nations reached in the first half of 2026.",
  landingSummary:
    "New believers baptized, Bibles placed in hands, pastors equipped, and medical care extended across Nepal, Algeria, Indonesia, Afghanistan, and Somalia.",
  landingHighlights: [
    "5 Nations",
    "193+ New Believers",
    "1,000 Bibles Given",
  ],
  featured: true,
  hideFromIndex: false,
  seoTitle: "2026 Global Missions Impact Report",
  seoDescription:
    "See the first-half 2026 impact of Global Missions across Nepal, Algeria, Indonesia, Afghanistan, and Somalia.",
  sections: [
    {
      _key: "global-impact",
      _type: "impactGrid",
      heading: "Global Impact - First Half of 2026",
      metrics: [
        metric("nations", "5", "Nations Reached", "nations"),
        metric("believers", "193+", "New Believers", "believers"),
        metric("baptisms", "44", "Baptisms", "baptisms"),
        metric("bibles", "1,000", "Bibles Given", "bibles"),
        metric("medical", "675", "Medically Served", "medical"),
        metric("leaders", "163+", "Leaders Trained", "leaders"),
      ],
    },
    {
      _key: "countries",
      _type: "countryGridSection",
      eyebrow: "Where We Work",
      heading: pt("Five Nations."),
      accentHeading: "One Mission.",
      regions: [
        countryReference(
          "nepal",
          "country-nepal",
          "Leadership & Medical Outreach",
          [
            metric("nepal-pastors", "46", "Pastors Equipped"),
            metric("nepal-medical", "675", "Medically Served"),
            metric("nepal-salvations", "42", "Salvations"),
          ],
          [
            "46 pastors equipped",
            "675 people medically served",
            "42 salvations",
            "1,000 Bibles distributed",
            "16 baptisms conducted",
            "200 backpacks for children",
            "4 motorcycles for remote pastors",
          ],
        ),
        countryReference(
          "algeria",
          "country-algeria",
          "Underground Church Strengthening",
          [
            metric("algeria-leaders", "107", "Leaders Trained"),
            metric("algeria-churches", "5", "House Churches"),
          ],
          [
            "107 leaders trained",
            "5 house churches strengthened",
            "Three regions served: Kabylia, Bejaia, and Oran",
            "Ministry continues under sensitive conditions",
          ],
        ),
        countryReference(
          "indonesia",
          "country-indonesia",
          "Aceh & Malay Unreached Peoples",
          [
            metric("indonesia-faith", "24", "Professions of Faith"),
            metric("indonesia-baptisms", "11", "Baptisms"),
          ],
          [
            "24 professions of faith",
            "11 baptisms",
            "Active in multiple unreached villages",
            "Households of Peace established",
            "Medical outreach, solar panels, and children's programs supported",
          ],
        ),
        countryReference(
          "afghanistan",
          "country-afghanistan",
          "Household-Based Discipleship",
          [
            metric("afghanistan-believers", "127", "Believers Discipled"),
            metric("afghanistan-households", "27", "Households"),
            metric("afghanistan-baptisms", "6", "Baptisms"),
          ],
          [
            "127 believers discipled",
            "27 households reached through discipleship",
            "6 baptisms conducted in Kabul",
          ],
        ),
        countryReference(
          "somalia",
          "country-somalia",
          "House Church Network Growth",
          [
            metric("somalia-churches", "116", "House Churches"),
            metric("somalia-baptisms", "11", "Baptisms"),
            metric("somalia-pastors", "10", "Pastors Training"),
          ],
          [
            "116 house churches supported",
            "11 baptisms",
            "10 pastors in training",
            "Decentralized discipleship network",
            "Growing leadership pipeline",
          ],
        ),
      ],
    },
    {
      _key: "partner",
      _type: "partnerGridSection",
      eyebrow: "Partner With Us",
      heading: pt("Join the mission beyond the newsletter."),
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
          buttonUrl: givingUrl,
        },
        {
          _key: "giving",
          _type: "callToActionCard",
          heading: "Giving",
          description:
            "Your generosity reaches the unreached by funding Bibles, medical care, discipleship, and church planting across five nations.",
          buttonLabel: "Give to Global Missions",
          buttonUrl: givingUrl,
        },
      ],
    },
  ],
};
