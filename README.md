**Deploying**

1. Make sure you have Node@14.15.0 & Yarn@1.16.0 installed
2. `$ yarn install` — install the dependencies
3. `$ yarn run configure` — set up environment variables, which are the follows:
   - _NEXT_STATIC_API_BASE_URL_ — base API URL
   - _NEXT_STATIC_ASSETS_VERSION_ - version of public assets
   - _NEXT_STATIC_SLACK_API_TOKEN_, _NEXT_STATIC_SLACK_API_CHANNEL_ — Slack API token & channel to log errors to
4. `$ yarn run format-all` — fix code style of all _.js, .jsx, .ts, .tsx, .json, .css & scss_ files
5. `$ yarn run lint-styles-all` — check if all your stylesheets satisfies the requirements
6. `$ yarn run lint-js-all` — check if all your JS, TS satisfies the requirements.
  
Now you are ready to develop & publish the app.

**Developing**

1. `$ yarn run dev`
2. Open `http://localhost:3000`
3. Before commit your codebase will be checked and reformatted by Stylelint, Eslint & Prettier if necessary.

**Publishing**

1. `yarn run build` — make the production build
2. `yarn run start` — start Node.js server
  If you want to specify the port use `-p` flag:
  `yarn run start -p 1234`
3. If do not want to use Node.js server, you can export 
static files (if possible) running `yarn run export`.
Now output files are living in `./out` directory.
