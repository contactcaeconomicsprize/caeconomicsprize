# Central Asia Economics Prize website

Official static website for the Central Asia Economics Prize (CAEP). GitHub Pages serves the checked-in HTML, CSS, JavaScript, and assets directly. No framework, package installation, or server routing is required. The results page is generated locally from structured data before review; production does not run a build.

## Preview locally

Run a local server from the repository root (required for the submissions map’s data requests):

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000` and `http://localhost:8000/2026/results/`. The `/2026/results/` directory route is compatible with GitHub Pages; `/2026/results` redirects to its trailing-slash form.

## Edit competition content

Most editable information is near the top of `app.js`.

1. **Questions:** edit the `questions` array. The four official 2026 questions are stored together in this array.
2. **Impact statistics:** the completed edition records 183 submissions, 34 countries and territories, 12 finalists, and four economics categories. The country totals are checked against `assets/submissions-2026.json` when generating results.
3. **Dates and stages:** edit the `timeline` and `stages` arrays. Each item uses a `completed`, `current`, or `upcoming` status for its visual state.
4. **Organizing team:** edit the team cards and matching JSON-LD person data in `index.html`. Portrait files use a shared 4:5 display frame; inline `object-position` controls CSS-only framing without changing the source image.
5. **Final judging panel:** edit `finalJudges`. Add names, titles, or affiliations only after confirmation.
6. **Edition archive:** the homepage `#archive`, questions, rules, review process, timeline, and `#submit` sections preserve the historical 2026 competition record. Submission links and disabled submission buttons have been retired. The ceremony is recorded as completed on October 24, 2026.
7. **Results:** edit `data/caep-2026.json`, then run `node tools/build-results.mjs`. This generates `2026/results/index.html` as semantic static content, including metadata. Do not hand-edit the generated page. `site.js` contains the shared navigation, accordions, and scroll behavior used by the homepage and results page. `results.css` scopes edition styling to avoid changing unrelated sections.
8. **Logo:** replace `assets/logo.svg` for the horizontal logo and `assets/logo-mark.svg` for the square/certificate mark. Keep the same filenames to avoid editing templates.
9. **Partners:** add only confirmed organizations to the `partners` array and set `confirmed: true`. Partner logos are displayed without cropping or recoloring.

## Deploy with GitHub Pages

1. Push the files to the repository's `main` branch.
2. Open **Settings → Pages** in GitHub.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Select the `main` branch and `/ (root)` folder, then save.
5. GitHub Pages will publish the static files directly.

## Configure the custom domain

The included `CNAME` file contains `caeconomicsprize.org`.

1. In the domain provider's DNS settings, add the GitHub Pages records recommended by GitHub.
2. In **Settings → Pages**, enter `caeconomicsprize.org` under **Custom domain**.
3. Wait for DNS verification, then enable **Enforce HTTPS**.

Do not add judges, reviewers, supporters, partners, affiliations, dates, or publication relationships until they are confirmed.

## Name consent and finalist recognition

The awards in the October 24 update are organizer-confirmed for public announcement. Finalist category counts are verified against the competition records (3 Development, 2 Behavioral, 4 Labor & Public, 3 Political). The public roster currently contains ten names with confirmed name-publication permission; two remain excluded pending confirmation. Never add unconfirmed names, emails, anonymous essay IDs, consent correspondence, internal scores, or private record links to public data or source files. Name-publication consent does not authorize publishing the complete essay.

Only add a person to the public data after verifying permission and preferred spelling. Set `namePublicationPermission` to `Permission granted` and add the approved public identifier to the category’s `finalistIds`. Keep `finalistCount` at the verified historical total. The generator rejects public person records without confirmed permission.

## Essay publication workflow

Every winning essay has a `publicationStatus`: `Permission pending`, `Permission granted`, or `Published`. All full essays are currently unpublished. Only one essay title is included; other titles are omitted until verified.

1. Obtain explicit written permission for publication of the complete work, separately from permission to publish the author’s name. Keep that evidence in the private consent system, never this repository.
2. After confirmation, set `fullWorkPermission: true` and `publicationStatus: "Permission granted"`. Leave `pdf: null`; the site shows the status without a download link.
3. To publish later, verify the PDF is accessible (tagged selectable text, correct reading order and language, accessible tables/images, and descriptive metadata). Set `accessiblePdfVerified: true`, place only that approved PDF at `assets/essays/<public-slug>.pdf`, and set `pdf` to `/assets/essays/<public-slug>.pdf` and `publicationStatus` to `Published`.
4. Regenerate and validate the page before a separate release approval. Approved links have descriptive labels and the download attribute. No PDFs or full essay text are included in this change.

GitHub Pages is static: hiding a link does not protect an uploaded file. The generator therefore rejects unapproved files in `assets/essays/`, unpublished PDF paths, invalid publication states, and full-text payloads. Do not copy private or unapproved PDFs into any public repository path, even if they are not linked.

## Validate before review

```bash
node tools/build-results.mjs
node tools/build-results.mjs --check
node --check app.js
node --check site.js
node --check global-map.js
node --check tools/build-results.mjs
python3 tools/check-site.py
git diff --check
```

There are no existing npm build, lint, or TypeScript commands in this static repository. The generator validates data, consent flags, finalist counts, geographic totals, and publication safety. The local checker verifies the homepage/results routes, internal links, anchors, assets, and HTML structure. Also inspect desktop/mobile layouts, menus, accordions, and the map in the local preview.

Preparing or generating results does not publish them. Commit and push only after the organizer reviews and authorizes production deployment.
