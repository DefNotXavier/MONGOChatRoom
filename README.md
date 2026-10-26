# Paper Chat

A real-time chat room that looks like a sheet of lined notebook paper. Open the page, pick a name, and start talking. Everyone on the site sees new messages instantly, along with a live count of who's online.

There's no backend server to run or pay for. The site is static files on GitHub Pages, and Firebase Realtime Database stores the messages and pushes them to every open browser. A GitHub Action clears the chat every night at midnight UTC, so it starts fresh each day.

**Live site:** https://defnotxavier.github.io/paper-chat/

![Tool: Firebase](https://img.shields.io/badge/Tool-Firebase-orange)
![Hosting: GitHub Pages](https://img.shields.io/badge/Hosting-GitHub_Pages-blue)
![Language: JavaScript](https://img.shields.io/badge/Language-Javascript-yellow)

## Features

- **Real-time messages**: new messages appear for everyone the moment they're sent, with no refresh.
- **Live active-user count**: each open tab registers itself, and Firebase removes it automatically when the tab closes.
- **Daily wipe**: a scheduled GitHub Action deletes all messages at midnight UTC. As a backup, the page only shows messages from the last 24 hours.
- **Locked-down database**: security rules allow anyone to read and post, but nobody can edit or delete messages from the browser, and names/messages are capped at 32/500 characters.
- **$0 to run**: GitHub Pages and Firebase's free tier cover everything.

## Architecture

```
Browser (GitHub Pages)  <── live updates ──>  Firebase Realtime Database
   index.html                                    /messages   (chat history)
   firebase-config.js                            /presence   (who's online)
                                                      ▲
GitHub Action (daily, midnight UTC) ── deletes ───────┘ /messages
```

## Project Structure

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
3. Open https://defnotxavier.github.io/paper-chat/ and share the link with anyone.

## Testing Locally

The page uses JavaScript modules, so it has to be served rather than opened as a file. From the repo folder run:

```bash
npx serve public
```

Then open the URL it prints. It uses the same Firebase database as the live site.

## Authors

- **Xavier Guinness Stout**

## License

MIT, see [LICENSE](LICENSE). If you fork this, swap in your own Firebase project in `public/firebase-config.js` so your copy doesn't share this chat's database.
