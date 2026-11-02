# Routes & Roots

Jinal Mandalia's Bharatanatyam site — https://dance.jinalmandalia.com

- `index.html` — the main page
- `taal/` — Carnatic taal practice tool
- `hasta-trainer/` — record your own hastas on camera
- `hasta-performer/` — live hasta recognition

To update a tool, replace its `index.html` (keep the file name) and push.
`CNAME` keeps the custom domain — don't delete it.

## Analytics
Same Google Analytics property as www.jinalmandalia.com (`analytics.js`, loaded on every page).
- `?me=1` once per device stops counting your own visits; `?r=name` links show up as traffic source `name`.
- Events: `dance_section_<id>`, `ghungroo_ring`, `taal_demo_play`, `dance_tool_open` (`tool`), `instagram_click` (`from`),
  `main_site_click`, `taal_select` (`tala`, `jaati`, `from`), `taal_gati`, `taal_speed`, `taal_play`,
  `trainer_camera_on` / `trainer_camera_error`, `trainer_first_sample`, `trainer_hasta_done` (`hasta`), `trainer_export`,
  `performer_model_loaded`, `performer_demo`, `performer_camera_on` / `performer_camera_error`, `performer_hasta` (`hasta`).
