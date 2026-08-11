# Migration Plan: Admin Panel & Database

Porting the admin panel from Next.js to TanStack Start and migrating static JSON data to a live database (Lovable Cloud).

## User Review Required

> [!IMPORTANT]
> - **Authentication**: We will use Lovable Cloud (Supabase) for the admin panel. I will set up a login page at `/admin/login`. You'll need to create a user in the backend to access it.
> - **Data Integrity**: JSON files will be imported as the initial state. Once imported, the admin panel will edit the database instead of the JSON files.
> - **Content Management**: The "Main Page" and "Rating" configuration (currently in `home.json` and `rating.json`) will be managed via a new `site_settings` table.

## Proposed Changes

### Database Schema (Supabase)
- Create tables:
  - `cards`: Main card data, including `detail` as JSONB.
  - `blog_posts`: Blog articles with content sections.
  - `countries`: Country pages and metadata.
  - `site_settings`: Global site configuration (home page sections, FAQ, trust links).
- Set up RLS: Admin-only write access, public read-only access.

### Admin Panel (TanStack Start)
- **Auth**: Add `_authenticated.tsx` route group to protect admin routes.
- **Pages**:
  - `/admin/login`: Login page using Supabase Auth.
  - `/admin/cards`: CRUD for virtual cards.
  - `/admin/blog`: Editor for blog posts.
  - `/admin/countries`: Editor for country pages.
  - `/admin/home` & `/admin/rating`: Config editors for site sections.
- **Logic**: Use `createServerFn` for database operations to ensure security and performance.

### Data Migration
- Implement a one-time migration script (or server function) that reads the existing `.json` files and populates the Supabase tables.

## Technical Details

### Security
- RLS policies will be applied to all tables:
  - `SELECT`: `true` (publicly readable).
  - `ALL`: `auth.uid() is not null` (requires authenticated session).
- Sensitive environment variables (`SUPABASE_SERVICE_ROLE_KEY`) will be used only in `client.server.ts`.

### Compatibility
- Porting ported `AdminShell`, `DataTable`, and other admin components to work with TanStack Router.
- Updating site loaders to fetch data from Supabase instead of importing JSON files.
