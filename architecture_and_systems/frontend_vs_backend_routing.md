# Frontend vs Backend Routing

API routes and routes in frontend frameworks like Vue and React serve different purposes. Both of them will show up in your browser history and URL bar, but only the API routes actually exist from the perspective of the server if you are building an SPA (unless you are using SSR or statically served content).

API routes refer to the endpoints on the server that allow clients to access and interact with data or services. They define the server-side logic that handles requests and returns responses in a structured format, usually JSON or XML. API routes are responsible for managing the backend functionality, such as retrieving, creating, updating, or deleting data. They may or may not be involved in user navigation, depending on system architecture.

On the other hand, routes in frontend frameworks like Vue and React define the client-side navigation and component rendering within a single-page application (SPA). They determine how the application's UI is structured and how different components are rendered based on the URL or user interactions. These routes are responsible for managing the frontend user experience, navigation, and rendering of components. These usually directly affect the users's browser history.

This can cause some interesting side effects in an SPA. Because frontend routing updates the users history in the browser and the URL in the browser bar, users often end up trying to directly load a frontend route in an SPA which results in a 404 because the backend does not have that corresponding route. In an SSR application, this is not an issue because the backend handles rendering the corresponding application page anyways.

When handling redirects, some cases are achievable through frontend alone, while other require a request to be sent to the server so the server can handle the redirect. The former can be achieved by directly setting the location of a window:

```js
window.location.href = "/about"; // goes to current_domain/about
window.location.href = "https://google.com"; // goes to the google.com domain
```

For server redirects, you must direct the user to the API route that is responsible for handling the redirect. A common example of this is handling logouts, where you may redirect a user to `/api/logout`, and the backend route at that location handles cleanup such as clearing cookies or generating authentication tokens before forwarding the user on to a new domain.
