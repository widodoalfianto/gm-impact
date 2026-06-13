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
- Global Impact, Mission Trip, Project Update, and Country Update templates
- Reusable metrics, story, quote, gallery, video, prayer, and call-to-action sections

Studio is organized into five tools:

- `Start Here` is the default office-staff dashboard. It offers guided
  newsletter templates, recent drafts, incomplete-content reminders, and a
  ready-for-review queue.
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
3. Set the project ID, dataset, and site URL (the GM Impact project ID is
   `ipt53rbp`):

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=ipt53rbp
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

Choose a format from `Start Here` to create a pre-structured newsletter:

- `Global Impact Report` for metrics-led mid-year or annual reporting.
- `Mission Trip Highlight` for a visual report centered on one trip.
- `Project Update` for ministry, building, care, or relief progress.
- `Country or Field Update` for a focused update from one ministry field.

Sanity Studio also includes a complete Global Impact starting point:

- `2026 Global Impact Report` recreates the current 2026 newsletter, including
  its hero, impact metrics, country cards, and partner calls to action.

After creating a newsletter, complete its title, URL slug, hero heading, short
summary, listing title, listing summary, and content sections. `Start Here`
keeps incomplete drafts in `Needs Attention` and moves complete drafts to
`Ready for Review`.

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

### Branches and Environments

| Git branch | Vercel environment | Sanity dataset | Purpose |
| --- | --- | --- | --- |
| `master` | Production | `production` | Stable client-facing newsletter |
| `cms/foundation` | Preview | `staging` | CMS development, training, and review |
| `feat/*` | Preview | `staging` | Short-lived feature review |

The stable CMS Preview URL is
`https://gm-impact-git-cms-foundation-alfi-ifgf.vercel.app`. Vercel
Authentication protects this environment.

Configure these variables separately in Vercel:

| Variable | Preview value | Production value |
| --- | --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | `staging` | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Current configured API date | Current configured API date |
| `NEXT_PUBLIC_SITE_URL` | CMS Preview URL | Production site URL |
| `SANITY_API_READ_TOKEN` | Viewer token | Viewer token |

CMS work should reach `master` through a pull request after CI, Vercel Preview,
editor workflow testing, and client approval. Protect `master` from direct
feature pushes once the team confirms this workflow.

### Access control

The Studio ships inside this Next app at `/studio`. That URL is publicly
reachable, but it is **not** open editing: opening it requires logging into a
Sanity account that is a **member of this project**. A visitor who is not a
member only ever sees a login screen. Project membership — not the URL — is the
lock.

There are three independent layers:

1. **Membership (who can get in).** Manage members in
   [sanity.io/manage](https://sanity.io/manage) → this project → **Members**.
   Invite people by email; remove someone here and they lose access
   immediately. This is the primary control.
2. **Roles (what a member can do).** Assign each member a role:
   - **Administrator** — full control, including inviting others.
   - **Editor** — create, edit, and publish content; no project settings.
   - **Viewer** — read-only; can see drafts but cannot change them.

   Give real content admins **Editor** and everyone else **Viewer** or no
   membership. Per-dataset roles (e.g. Editor on `staging`, Viewer on
   `production`) and custom roles require a paid Sanity plan.
3. **Dataset read vs. write.** Writing always requires login plus membership —
   there is no anonymous write. Reading is separate: a **public** dataset lets
   anyone read *published* content through the API without a token (this is how
   the live site fetches content), while a **private** dataset requires a token
   even to read. Making `production` public only lets the public **view** the
   site; it never lets them edit.

Production guidance:

- Keep `/studio` as-is — it is safe to be reachable because Sanity auth gates
  it.
- In `sanity.io/manage`, invite only real admins as **Editors**; everyone else
  **Viewer**.
- Let the public site read the `production` dataset (public dataset or a
  server-side read token). The page is read-only to visitors by nature.
- Never expose a **write** token to the browser. The draft-mode preview uses
  its read token server-side only.

Because the live site and the Studio are the same Next app, deploying the site
also deploys the Studio. That is fine: the page is read-only to visitors and
the only door to editing (`/studio`) is locked by Sanity login. For
defense-in-depth you can additionally keep `/studio` behind Vercel
Authentication, but it is not required.

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
