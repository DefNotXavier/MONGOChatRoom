// Deletes every chat message, run once a day by the clear-chat workflow
import admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

await admin.database().ref("messages").remove();
console.log("Chat messages cleared");
process.exit(0);
