# Central Asia Economics Prize website

Official static website for the Central Asia Economics Prize (CAEP). The site has no build step and can be deployed directly from the repository root with GitHub Pages.

## Preview locally

Open `index.html` directly in a browser, or run a simple local server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Edit competition content

Most editable information is near the top of `app.js`.

1. **Questions:** edit the `questions` array. The four official 2026 questions are stored together in this array.
2. **Dates:** edit the `timeline` array. Set `competition.deadline` only after a date is confirmed; it is currently `null`.
3. **Judges:** add objects to the `judges` array after participation is confirmed. Supported fields can include `name`, `position`, `institution`, `field`, `photo`, `bio`, `link`, and `confirmed`.
4. **Reviewers:** add confirmed people to the `reviewers` array and set `confirmed: true`. Unconfirmed reviewers are not rendered.
5. **Submission form:** update `competition.submissionUrl` in `app.js` whenever the official form changes. Set `competition.submissionsOpen` to `true` for active “Submit Essay” buttons or `false` to display inactive “Submissions Opening Soon” buttons. `SUBMISSION_FORM_URL` remains searchable in `index.html` as a fallback placeholder.
6. **Logo:** replace `assets/logo.svg` for the horizontal logo and `assets/logo-mark.svg` for the square/certificate mark. Keep the same filenames to avoid editing templates.

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
