# Placeholder Content — Replace Before Launch

This build ships with realistic **placeholder** content wherever real assets weren't provided
(no real company logos, student photos, mentor bio, or live statistics were supplied). Every
spot below is functional and styled to look finished, but the specific data is invented and
must be swapped for the real thing before this site goes live. Each source file also carries a
`PLACEHOLDER CONTENT` comment at the top.

## Images
All photos in this build live in `public/images/` and are **free-to-use stock photos under the
[Unsplash License](https://unsplash.com/license)** (free for commercial use, no attribution
required) — not photos of real Genix Academy students, staff, or a real webinar/course session.
They were chosen for having reachable, working URLs at build time, not verified against
Unsplash's terms beyond the license grant, so do a final check before high-stakes/paid use. They
are **not** scraped from arbitrary Google Image results — random web images usually carry no
reuse license and would be a copyright risk on a commercial site.

| Folder | Used for | Replace with |
|---|---|---|
| `public/images/scenes/` | Home hero video poster, course/webinar hero backgrounds, course/webinar intro-video posters | Your real success-story video, course footage, and webinar recordings/thumbnails |
| `public/images/portraits/` | Mentor photo, named student testimonial photos | Real (consented) photos of your instructor and alumni |
| `public/images/gallery/` | "Student Results" / "Student Success Gallery" grids | Real (consented) student photos |

To swap any of these, replace the file at the same path (keeping the filename) or update the
path in the relevant data file:
- `app/data/courses.ts` — `heroImage`, `introImage` per course
- `app/data/webinars.ts` — `heroImage`, `introImage` per webinar
- `app/data/testimonials.ts` — `photo` per testimonial
- `app/data/mentor.ts` — `photo`
- `app/data/gallery.ts` — `courseGalleryPhotos`, `webinarGalleryPhotos`

## Company logos / hiring partners
- `app/data/companies.ts` — `hiringCompanies` and `industryPartners` arrays. Rendered as
  generated wordmark chips (`LogoGrid` / `LogoMarquee` draw a small gradient dot + the company
  name — no logo image files involved, deliberately, since real corporate logos shouldn't be
  used without permission). Replace the names with your real hiring partners, and if you have
  permission to use their actual logo marks, swap the rendering in
  `app/components/LogoGrid.tsx` and `app/components/LogoMarquee.tsx` for `<Image>` logo files.

## Student testimonials
- `app/data/testimonials.ts` — `testimonials` (course/home) and `webinarTestimonials` arrays.
  Names, quotes, ratings, and outcomes are invented; photos are stock (see **Images** above).

## Learning statistics
- `app/data/stats.ts` — `learningStats` and `placementStats`. Update with your verified numbers
  (students trained, placement rate, salary uplift, etc.) once you have real figures.

## Mentor profile
- `app/data/mentor.ts` — name, title, bio, certifications, stats, and photo are invented/stock.
  Replace with your real instructor's details.

## Webinar details
- `app/data/webinars.ts` — the sample "AWS DevOps Career Webinar" entry has a placeholder date,
  time, and registered-attendee count. Update these before promoting the page, and add more
  entries to the array as you schedule future webinars (the route is dynamic — new slugs work
  automatically at `/webinar/[slug]`).

## Contact details
- `app/components/Footer.tsx` — email, phone number, and address are placeholders.
- `app/api/course-registration/route.ts` and `app/api/webinar-registration/route.ts` — both
  currently validate submissions and `console.log` them, returning success. Wire up a real
  integration (email via Resend/SendGrid, a database write, a Google Sheet, or a CRM webhook)
  where the `// TODO` comment is, before relying on these forms in production.

## Video content
- `app/components/VideoCard.tsx` renders a photo poster with a play button; no real video is
  attached yet. Pass a `src` (hosted `.mp4` or embed URL) to any `<VideoCard>` usage — hero
  success-story video, course intro video, webinar intro video — once you have real footage.

## Pricing
- `app/data/courses.ts` — `pricing` objects (original/discounted price, early-bird deadline,
  promo code, payment options) are illustrative. Confirm real pricing before launch.
