import { createReadStream } from "node:fs";
import { resolve } from "node:path";
import { getCliClient } from "sanity/cli";
import {
  newsletter2026Countries,
  newsletter2026Value,
} from "../presets/newsletter2026";

const client = getCliClient({ apiVersion: "2026-06-08" });

async function seed() {
  const transaction = client.transaction();
  const heroAsset = await client.assets.upload(
    "image",
    createReadStream(resolve("public/images/newsletter-2026.avif")),
    {
      filename: "newsletter-2026.avif",
    },
  );

  for (const country of newsletter2026Countries) {
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
    _id: "newsletter-2026-global-impact",
    _type: "newsletter",
    ...newsletter2026Value,
    heroImage: {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: heroAsset._id,
      },
      alt: "People gathered during a Global Missions outreach",
    },
  });

  await transaction.commit();
  console.log("Seeded the editable 2026 Global Impact newsletter.");
  console.log(`Hero image asset: ${heroAsset._id}`);
  console.log("Studio: /studio/structure/newsletters");
  console.log("Preview: /newsletters/2026");
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
