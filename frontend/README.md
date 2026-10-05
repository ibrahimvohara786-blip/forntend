# Be Accurate

A static, demo-ready frontend for an AI face recognition attendance dashboard. Built with plain HTML, CSS, and vanilla JavaScript; all records and interactions use local dummy data. No backend is included.

## Run

Open `index.html` in a browser, or serve the `frontend/` directory with VS Code Live Server. Camera preview access requires `localhost` or HTTPS and browser permission. Chart.js and Roboto are loaded from CDNs, so charts and the selected typeface need an internet connection.

## Demo login

- Email: `admin@beaccurate.ai`
- Password: `admin123`

The login flag and any locally saved demo values use browser `localStorage`. Log out to clear the authentication flag.

## Structure

- `pages/`: Login plus dashboard, student, attendance, reports, and profile screens.
- `css/variables.css`: Theme tokens; `css/components/` contains shared UI styles; `css/pages/` contains screen-level styles.
- `js/main.js`: Authentication gate and shared app-shell bootstrap.
- `js/components/`: Sidebar, navbar, dropdown, modal, mobile drawer, and toast behavior.
- `js/pages/`: Per-screen demo data and interactions.
- `assets/images/`: Local SVG logo and favicon.

AI Attendance only displays an optional camera preview. Recognition is simulated and does not analyze, match, or store faces.
