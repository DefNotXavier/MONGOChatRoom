# FREE Online Chat Room

The online chat room is a web-based application that allows multiple users to connect, send messages, and view a shared chat history in real time. Each message is stored as JSON with keys for the user's name and their message. The frontend is built with HTML/CSS/JavaScript and hosted for free on GitHub Pages, and Firebase Realtime Database stores the messages and pushes new ones to everyone instantly. The application displays the number of active users and the most recent messages.

Messages are **automatically deleted every 24 hours** by a GitHub Action that clears the chat at midnight UTC.

**Live site:** https://defnotxavier.github.io/MONGOChatRoom/

![Tool: Firebase](https://img.shields.io/badge/Tool-Firebase-orange)

![Hosting: GitHub Pages](https://img.shields.io/badge/Hosting-GitHub_Pages-blue)

![Language: JavaScript](https://img.shields.io/badge/Language-Javascript-yellow)

## How It Works

- `public/` is the website. GitHub Pages serves it, and there is no server to run.
- `public/firebase-config.js` tells the page which Firebase database to use.
- `database.rules.json` is the security rules for the database. Anyone can read and send messages, but nobody can edit or delete them from the browser, and names/messages are limited to 32/500 characters.
- `.github/workflows/clear-chat.yml` runs every day and deletes all messages.
- `.github/workflows/pages.yml` publishes `public/` to GitHub Pages whenever it changes.

## Step 1: Set Up Firebase (free)

1. **Create a project**: Go to [console.firebase.google.com](https://console.firebase.google.com), click **Create a project**, give it a name, and you can turn off Google Analytics.
2. **Create the database**: In the left menu go to **Build > Realtime Database > Create Database**. Pick a location and choose **Start in locked mode**.
3. **Add the security rules**: In the Realtime Database page, open the **Rules** tab, replace everything with the contents of `database.rules.json`, and click **Publish**.
4. **Get the web config**: Go to **Project settings** (gear icon) > **General** > **Your apps**, click the web icon `</>`, register an app (no hosting needed), and copy the `firebaseConfig` values into `public/firebase-config.js`.
   - Make sure `databaseURL` is filled in. If it's missing, copy the URL shown at the top of the Realtime Database **Data** tab.
   - These values are meant to be public, so it's fine to commit them.

## Step 2: Set Up the Daily Clear

1. **Make a key for GitHub**: In Firebase go to **Project settings > Service accounts** and click **Generate new private key**. A `.json` file downloads.
2. **Add GitHub secrets**: In this repo on GitHub go to **Settings > Secrets and variables > Actions > New repository secret** and add:
   - `FIREBASE_SERVICE_ACCOUNT`: paste the **entire contents** of the downloaded `.json` file.
   - `FIREBASE_DATABASE_URL`: the same `databaseURL` from Step 1.
3. **Delete the downloaded `.json` file** afterwards. It's a password to your database, so never commit it.
4. **Test it**: Go to the **Actions** tab > **Clear chat** > **Run workflow**. It should go green and the chat should empty.

## Step 3: Turn On GitHub Pages

1. In this repo on GitHub go to **Settings > Pages**, and under **Source** pick **GitHub Actions**.
2. Push your changes to `main`. The **Deploy to GitHub Pages** action publishes the site.
3. Open https://defnotxavier.github.io/MONGOChatRoom/ and share the link with anyone.

## Testing Locally

The page uses JavaScript modules, so it has to be served rather than opened as a file. From the repo folder run:

```bash
npx serve public
```

Then open the URL it prints. It uses the same Firebase database as the live site.

## Troubleshooting

- **Messages don't send / "Message failed to send"**:

  - Check that `public/firebase-config.js` has your real values, including `databaseURL`.
  - Check that the rules from `database.rules.json` are published in the Firebase console.
  - Open the browser console (F12) for the exact error.

- **Clear chat action fails**:

  - Make sure both secrets are set and `FIREBASE_SERVICE_ACCOUNT` contains the whole JSON file.

- **Clear chat stopped running**:
  - GitHub pauses scheduled actions in repos with no activity for 60 days and emails you. Re-enable it from the **Actions** tab. Even while it's paused, the page only shows messages from the last 24 hours.

## Authors ✍️

- **Xavier Guinness Stout**

## Acknowledgments 🙌

This project was inspired by the following resources:

- **Tutorial Video**: [YouTube tutorial](https://www.youtube.com/watch?v=8Y6mWhcdSUM) for a visual guide on setting up a similar chat application.
