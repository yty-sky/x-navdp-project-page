# X-NavDP Project Page

Static academic project page for:

**X-NavDP: Generalizing Navigation Diffusion Policy to Novel Behavior and Embodiments with Group Q-score Reweighted Matching**

This site is designed to deploy directly with GitHub Pages from the repository root. It intentionally omits image and video assets.

## Files

- `index.html` - main project page
- `static/css/index.css` - page styling
- `.nojekyll` - disables Jekyll processing on GitHub Pages

## Preview Locally

```bash
python3 -m http.server 8765
```

Then open:

```text
http://127.0.0.1:8765/index.html
```

## Deploy With GitHub Pages

1. Create a GitHub repository, for example `x-navdp-project-page`.
2. Push this folder to the repository:

```bash
git init
git add index.html static/css/index.css README.md .nojekyll .gitignore
git commit -m "Add X-NavDP project page"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/x-navdp-project-page.git
git push -u origin main
```

3. In GitHub, open `Settings` -> `Pages`.
4. Set:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
5. Save and wait for GitHub Pages to publish the URL.

The final page will usually be:

```text
https://YOUR_USERNAME.github.io/x-navdp-project-page/
```
