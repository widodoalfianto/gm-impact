# Global Missions Impact

Next.js newsletter site for IFGF Global Missions.

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Sanity CMS

Sanity now powers the newsletter publishing workflow:

- An embedded editor at [http://localhost:3000/studio](http://localhost:3000/studio)
- Public newsletter routes at `/newsletters/[slug]`
- Global Impact, Mission Trip, and Country Update creation templates
- Reusable metrics, story, quote, gallery, video, prayer, and call-to-action sections

Studio is organized into four tools:

- `Site Map` shows the website's fixed routes and every CMS newsletter's draft
  status, public URL, edit link, and preview link.
- `Content` is the primary office-staff workspace. Create and edit newsletters
  under Newsletters, and manage shared country map/flag artwork under Countries
  and Artwork.
- `Preview and Edit` shows the site with draft content and supports visual
  editing.
- `Query Lab (Developers)` is Sanity Vision. It is for testing GROQ queries and
  is not needed for normal newsletter editing.

### Connect a Sanity Project

1. Create a Sanity organization and a project with `staging` and `production`
   datasets.
2. Copy `.env.example` to `.env.local`.
3. Add the project ID:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=staging
NEXT_PUBLIC_SANITY_API_VERSION=2026-06-08
NEXT_PUBLIC_SITE_URL=http://localhost:3000
SANITY_API_READ_TOKEN=your-viewer-token
```

4. Restart `npm run dev`.
5. Open `/studio` and sign in.
6. Seed the demonstration newsletter:

```bash
npm run sanity:seed
```

7. Preview it at `/newsletters/mission-trip-demo`.

To add the complete, editable 2026 Global Impact newsletter:

```bash
npm run sanity:seed:2026
```

Open `/newsletters/2026` to review it in Presentation. The script is
repeatable, but rerunning it replaces the seeded 2026 document with the
repository version.

### Newsletter Templates

Sanity Studio includes two Global Impact starting points:

- `2026 Global Impact Report` recreates the current 2026 newsletter, including
  its hero, impact metrics, country cards, and partner calls to action.
- `Global Impact Report` provides the same reusable section structure with
  starter content for a new year.

After publishing a newsletter with a unique slug, it is available at
`/newsletters/<slug>` and is added automatically to the newsletter landing page
and navigation dropdown. Use `Hide from newsletter index` for drafts or
internal examples that should remain accessible by URL but should not appear
publicly.

Impact metrics and country documents use a curated SVG artwork library. Editors
choose illustrations from visual thumbnail pickers in Studio; Sanity stores the
selection while the website renders the approved responsive SVG. This keeps the
artwork editable without allowing arbitrary SVG markup to break the newsletter
layout or visual system.

The read token is server-only except when Sanity Live opens the authenticated
draft preview connection. Use a Viewer token with the minimum permissions
needed for previewing content.

Use `staging` for local development, training, and Vercel Preview deployments.
Use `production` only for the production deployment. Before deploying to
Vercel, add the same public environment variables to the appropriate Vercel
environment and set `NEXT_PUBLIC_SITE_URL` to that environment's deployment
URL.

### Validation

```bash
npm run lint
npm run sanity:validate
npm run build
```

## References

- [Next.js documentation](https://nextjs.org/docs)
- [Sanity and Next.js](https://www.sanity.io/docs/nextjs)
- [Embedded Sanity Studio](https://www.sanity.io/docs/nextjs/embedding-sanity-studio-in-nextjs)
