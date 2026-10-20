# Build a Minimal LocalVault JSON Viewer Website

Create a clean, lightweight website that displays the JSON response from my existing LocalVault backend, matching the reference screenshots as closely as possible.

## 1. Design

Reproduce the simple browser-style JSON viewer shown in the screenshots.

- Full-screen dark background: `#111111`
- Thin top toolbar with a dark gray background: `#3b3b3b`
- A small checkbox labeled **Pretty print** at the top-left corner.
- A thin horizontal border beneath the toolbar.
- White monospace text using a font such as Consolas or monospace.
- Small text size, approximately 14px.
- Minimal padding and spacing.
- JSON begins near the left edge, directly below the toolbar.
- Use the full available browser width and height.
- No centered container, cards, sidebar, navigation menu, footer, gradients, shadows, or decorative elements.
- No unnecessary branding or headings.
- Match the proportions and simplicity of the reference images.

## 2. Backend connection

Connect to my existing LocalVault FastAPI backend.

Read the backend root URL from an environment variable:

`NEXT_PUBLIC_BACKEND_URL`

Example `.env.local`:

`NEXT_PUBLIC_BACKEND_URL=https://your-backend-url.com`

Fetch the root endpoint `/` to retrieve the actual JSON response.

Example response:

{
  "app": "LocalVault",
  "version": "0.1.0",
  "tagline": "Your files. Your storage. Your control.",
  "api_docs": "/api/docs",
  "health": "/api/v1/health"
}

Do not hardcode this sample as the actual backend response. Display the live response returned by the server.

Do not append `/api/v1` when requesting the root JSON endpoint.

## 3. Pretty print checkbox

Implement a fully functional checkbox labeled `Pretty print`.

When checked:
- Display formatted JSON with two-space indentation.
- Put each property on a separate line.
- Indent nested objects and arrays correctly.

When unchecked:
- Display the JSON as a compact single-line string.

Implementation logic:

`JSON.stringify(responseData, null, 2)` when enabled.

`JSON.stringify(responseData)` when disabled.

Toggle the formatting immediately without refetching the backend or reloading the page.

Default state: unchecked, matching the first reference screenshot.

## 4. Error handling

If the backend request fails:
- Display a short, readable error message in the same dark interface.
- Do not display fake JSON or pretend the backend is connected.
- Handle network errors, invalid JSON, and HTTP errors.

If the backend requires CORS configuration, explain how to allow the deployed website's origin in FastAPI.

## 5. Technology

Use:
- Next.js
- TypeScript
- Tailwind CSS, or minimal CSS if easier
- React state for the checkbox

Keep the code small and simple. Avoid unnecessary packages and dependencies.

## 6. Deployment

Prepare the project for Vercel deployment.

Include:
- `package.json`
- `.env.example`
- A README with local setup and Vercel deployment instructions.

Set the Vercel environment variable `NEXT_PUBLIC_BACKEND_URL` to my actual backend root URL.

Do not include `/api/v1` in this variable because this website fetches `/`.

## 7. Final requirements

- Match the screenshots as closely as possible.
- Ensure the checkbox works.
- Ensure the backend response is fetched dynamically.
- Test the production build.
- Do not modify my existing LocalVault backend or file storage.
- Do not add any features that are not explicitly requested.

Build the finished website, run the production build, and tell me how to deploy it to Vercel.