# HTML, CSS, and Vanilla JavaScript Demo

This demo consists of a single `index.html` file combining semantic HTML5 markup, responsive CSS styling (Flexbox, Grid, animations, and media queries), and vanilla JavaScript DOM manipulation.

## Running the Demo

Open `index.html` directly in any web browser, or serve it locally using any static web server (e.g. `npx serve .` or VS Code Live Server extension).

---

## Key Concepts Emphasized

- **HTML Structure & Semantics**: Elements, parent-child-sibling DOM relationships, semantic tags, and attributes.
- **CSS Styling & Layouts**:
  - CSS Classes vs. inline styles.
  - Cascade, specificity, and selector hierarchy.
  - **Flexbox** for one-dimensional layouts (`.flex-container`).
  - **CSS Grid** for two-dimensional responsive grids (`.grid-container`).
  - CSS keyframe animations (`@keyframes slideIn`).
  - Responsive design with CSS media queries (`@media (min-width: ...)`).
- **Vanilla JavaScript & DOM Manipulation**:
  - Querying the DOM (`document.getElementById`, `document.querySelector`).
  - Event handling (`addEventListener` and inline event handlers).
  - Mutating element content and attributes dynamically (`innerText`, `value`, `classList`).
  - Basic in-memory client state.

---

## 🛠️ Suggested Student Exercises

1. **Interactive To-Do Card Creator (Workshop 2 Frontend Prep)**
   - Add a `<form>` containing text inputs for `title` and `content`, plus a `<select>` dropdown for `category` (`Personal`, `Work`, `School`).
   - On submission (`submit` event with `e.preventDefault()`), dynamically construct a card element with semantic tags and append it to the grid container without page refresh.
   - Include a "Complete" button that toggles a `.completed` CSS class (strikethrough text + faded opacity) and a "Delete" button that removes the element from the DOM (`element.remove()`).

2. **Dark / Light Theme Toggle**
   - Add a theme toggle switch in the header.
   - Define CSS custom properties (variables) on `:root` and `body.dark-mode` for `--bg-color`, `--card-bg`, and `--text-color`.
   - Use JS to toggle `.dark-mode` on `document.body` and store the preference in `localStorage`.

3. **Live Search & Character Counter**
   - Add a search `<input>` above the cards container.
   - Listen to the `input` event in JS to filter visible cards in real time (e.g., toggling a `.hidden` class based on matching `textContent`).
   - Add a character counter below the input displaying current vs. maximum allowed length (`e.target.value.length / 50`).

4. **Modal Dialog with Backdrop & Animation**
   - Create a popup modal overlay (`<dialog>` or a styled backdrop `<div>`) that opens when clicking a card or button.
   - Add closing behavior on close button click, backdrop click, and pressing the `Escape` key (`keydown` event).
   - Animate the modal appearance using CSS `@keyframes` or `opacity`/`transform` transitions.

---

## 🔗 Workshop 2 Note: Full-Stack Integration

In the second workshop when the backend API is built, students will use this `html_css_js` demo as the frontend client for the Express + SQLite + Drizzle server (`guides/demos/servers/`). Students will replace in-memory arrays with asynchronous `fetch()` API calls hitting backend endpoints (`GET /todos`, `POST /todos`, `PUT /todos/:id`, `DELETE /todos/:id`).
