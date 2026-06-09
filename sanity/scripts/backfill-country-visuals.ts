import { getCliClient } from "sanity/cli";
import { newsletter2026Countries } from "../presets/newsletter2026";

const client = getCliClient({ apiVersion: "2026-06-08" });

async function backfillCountryVisuals() {
  const transaction = client.transaction();

  for (const country of newsletter2026Countries) {
    transaction.patch(country._id, {
      set: {
        visualKey: country.visualKey,
      },
    });
  }

  await transaction.commit();
  console.log("Added map and flag artwork selections to the 2026 countries.");
}

backfillCountryVisuals().catch((error) => {
  console.error(error);
  process.exit(1);
});
