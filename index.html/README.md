This folder contains the static portfolio site for Diya Lonial.

Quick notes — how to add content

Projects
- Edit `assets/script.js` and update the `PROJECTS` array. Each project should be an object with:
  - `title`: string
  - `desc`: string
  - `tech`: string[] (tags shown as chips)
  - `image`: relative path to an image (e.g. `projects/my-screenshot.png` or `assets/project-placeholder.svg`)
  - `links`: array of `{ label, href }` objects (GitHub, Demo, Live, etc.)

Example project entry:
{
  title: "My Cool Project",
  desc: "A short description of the project and results (one line).",
  tech: ["Python", "TensorFlow", "Flask"],
  image: "projects/my-results.png",
  links: [
    { label: "GitHub", href: "https://github.com/you/your-repo" },
    { label: "Demo", href: "https://example.com" }
  ]
}

Images
- Put result images under the `projects/` folder (already present). Use relative paths from the `index.html` file, e.g. `projects/my-result.png`.
- If you don't have an image yet, use `assets/project-placeholder.svg` which is included.

Preview locally
- From the `index.html` folder, run a simple static server and open `http://localhost:8000` in your browser.

Examples (zsh):

python -m http.server 8000
# or, if you prefer:
# php -S localhost:8000

(or just open `index.html` in a browser directly)

Want me to:
- Convert this small site to a Jekyll-ready structure for GitHub Pages? (I can add a workflow)
- Add a small form/contact section or social links? (I can add icons/links)
- Populate the projects array with your real project info now? If so, paste titles/links/images and I'll add them.
