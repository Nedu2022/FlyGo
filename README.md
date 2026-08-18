# FLYGO

FLYGO is a modern travel booking experience for discovering flights, finding stays, and planning a trip from one place. It also includes a host dashboard for managing properties, availability, bookings, earnings, reviews, and support.

> This repository currently contains a front-end prototype. Search results, hotel listings, dashboard metrics, and booking content are local demo data; there is no live inventory, authentication service, payment processor, or database integration yet.

## What is included

- **Travel discovery**: destination-led homepage, curated adventures, travel stories, an AI planner surface, and mobile app promotion.
- **Flight search**: search summary, result cards, filter and sort controls, fare summaries, and provider comparison modal.
- **Hotel discovery**: hero search, hotel and resort collections, testimonials, journals, FAQ, and destination content.
- **Booking flow**: traveler details, add-on services, payment form, and confirmation screens organized into a four-step shell.
- **Account flows**: sign in, sign up, address and profile details, verification, password reset, and success states.
- **Host workspace**: responsive dashboard navigation with overview, bookings, properties, availability, earnings, insights, messages, reviews, settings, and support views.
- **Responsive UI**: shared site, authentication, booking, and dashboard components with reusable data and image assets.

## Routes

| Area | Routes |
| --- | --- |
| Public travel | `/`, `/flights`, `/hotels`, `/about`, `/contact` |
| Authentication | `/signin`, `/signup`, `/signup/address`, `/signup/details`, `/signup/verification`, `/signup/success`, `/verify`, `/verified`, `/forgot-password`, `/reset-password`, `/password-reset-success` |
| Booking | `/booking/details`, `/booking/services`, `/booking/payment`, `/booking/confirmed` |
| Host dashboard | `/dashboard`, `/dashboard/bookings`, `/dashboard/properties`, `/dashboard/availability`, `/dashboard/earnings`, `/dashboard/insights`, `/dashboard/messages`, `/dashboard/reviews`, `/dashboard/settings`, `/dashboard/support` |

## Quick start

### Requirements

- Node.js 20 or newer
- npm 10 or newer

### Install and run

```bash
git clone <repository-url>
cd flygo
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Next.js development server with hot reload |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build locally |
| `npm run lint` | Run ESLint across the project |

Run the production checks before opening a pull request:

```bash
npm run lint
npm run build
```

## Project structure

```text
app/                 Next.js App Router pages and route layouts
components/          Reusable UI grouped by product area
lib/                 Local demo content for flights, sites, and dashboard views
public/images/       Travel, brand, airline, provider, and interface assets
scripts/              Local utilities, including screenshot tooling
```

The `@/*` path alias maps to the repository root. Styling is defined in `app/globals.css` and uses Tailwind CSS v4 through the PostCSS plugin. Shared shells keep the main experiences consistent:

- `components/site/` owns public navigation, search, content rails, and footer sections.
- `components/auth/` owns sign-in and account creation primitives.
- `components/booking/` owns the stepper and booking-specific layouts.
- `components/flights/` owns search results and fare comparison UI.
- `components/dashboard/` owns the host workspace shell, panels, charts, and navigation.

## Working with demo data

Most visible content is intentionally easy to replace. Update the relevant module in `lib/` and keep the component API stable:

- `lib/flight-data.ts` for flight results, providers, fares, and sort modes.
- `lib/site-data.ts` for destinations, hotels, resort countries, stories, and other public content.
- `lib/dashboard-data.ts` for host details, metrics, bookings, properties, and todos.

Images are stored under `public/images/` and referenced with paths such as `/images/hero/...`. Add new assets there and use Next.js `Image` for rendered imagery where possible.

## Production roadmap

To turn the prototype into a live booking product, the next integration boundaries are:

1. Add authentication and session handling around the account and dashboard routes.
2. Replace local collections with flight, hotel, and property APIs.
3. Persist travelers, bookings, saved properties, messages, and dashboard actions.
4. Connect payment collection to a PCI-compliant provider and verify bookings server-side.
5. Add loading, empty, error, and authorization states for remote data.
6. Add automated tests for search filters, booking progression, form validation, and protected routes.

## Deployment

The app can be deployed to any platform that supports Next.js. Build it with `npm run build` and start it with `npm run start`. For a managed deployment, [Vercel's Next.js guide](https://nextjs.org/docs/app/building-your-application/deploying) is a useful reference.

## License

No license has been specified for this project yet.
