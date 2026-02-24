Quick responsive screenshot guide

1. Start the local server from the project root:

   ```bash
   python -m http.server 8000 --bind 127.0.0.1
   ```

2. Install dependencies (Node.js required):

   ```bash
   npm install
   npx playwright install
   ```

3. Run the screenshot script:

   ```bash
   npm run screenshot
   ```

Screenshots will be generated in the `screenshots/` folder.
