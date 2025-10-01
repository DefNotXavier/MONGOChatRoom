# FREE Local Host Online Chat Room

The online chat room is a web-based application that allows multiple users to connect, send messages, and view a shared chat history in real time. It functions as a key-value pair chat room, where each message is stored in JSON format with keys for the user’s name and their message. The frontend is built with HTML/CSS, while JavaScript with Socket.IO handles real-time communication. The backend uses Node.js with MongoDB to store the chat data. The application displays the number of active users and supports features like sending messages, clearing the chat log, and viewing recent messages.

![Tool: Socket.io](https://img.shields.io/badge/Tool-Socket.IO-green)

![Language: Python](https://img.shields.io/badge/Language-Python-green)

![Language: JavaScript](https://img.shields.io/badge/Language-Javascript-yellow)

## Prerequisites

- **Node.js and npm**: Ensure Node.js is installed. Download from [nodejs.org](https://nodejs.org) if needed.
- **MongoDB Atlas Account**: Sign up and create a `FREE` cluster at :

  - [mongodb.com](https://www.mongodb.com)

- **VS Code**: Install Visual Studio Code and extenstion:
  - [MongoDB for VS Code](https://marketplace.visualstudio.com/items?itemName=mongodb.mongodb-vscode)

## Step 1: Set Up MongoDB Cluster

1. **Create a MongoDB Atlas Cluster**:

   - Log in to your MongoDB Atlas account at [mongodb.com](https://www.mongodb.com).
   - Create a new cluster (In code its called `Cluster0`, if you do something different modifiy that value).
   - Configure the cluster settings (use the `FREE` tier for testing).
   - Add your IP address to the cluster's IP whitelist (Network Access > Add IP Address > Allow access from anywhere for testing).
   - Create a database user (Database Access > Add New Database User) with a username and `password`, remeber password, will be used with Connection String .

2. **Get the MongoDB Connection String**:

   - In MongoDB Atlas, go to your cluster and click **Connect**.
   - Choose MongoDB for VS Code
   - Copy the connection string.
   - Store this string in a `.env` file in your project directory.
   - replace `<db_password>` with database user password from above.

3. **Connect to the Cluster INSIDE VS CODE**:

   - Open VS Code and ensure the MongoDB for VS Code extension is installed and Enabled.
   - click `Control + SHIFT + P` to open up Command Palette
   - Search for `MongoDB: Connect with Connection String`

   - If connection failed, pop up will show alerting you.

## Step 2: Set Up the Chat Application

1. **Clone or Set Up the Project**:

   - Ensure you have the following files in your project directory:
     - `index.html`: The frontend for the chat room.
     - `index.css`: Styles for the chat interface.
     - `server.js`: The backend server code using Express and Socket.IO.
     - `.env`: Contains your MongoDB connection string.

2. **Install Dependencies**:

   - Open a terminal in your project directory.
   - Run the following command to install required Node.js packages:

     ```python
     npm install express mongoose socket.io dotenv
     ```

3. **Start the Application**:

   - In the terminal, run:

     ```bash
     npm start
     ```

   - or under `NPM SCRIPTS` in bottom left, click `start`

   - You should see `Server listening on port 5000` and `MongoDB connected...` in the terminal, indicating the server is running.

4. **Test the Application**:

   - Open a web browser and navigate to `http://localhost:5000`.
   - The chat room interface should load, showing "Active Users: 1" (yourself) and an empty chat log.

5. **Stop the Application**:
   - To stop the server, press `Ctrl + C` twice in the terminal.

## Step 3: Share the (Local) Application with Friends

To allow friends on the same network to access the chat room:

1. **Find Your Local IP Address**:

   - On Windows:
     - Press `Win + R`, type `cmd`, and press Enter.
     - In the command prompt, type `ipconfig` and press Enter.
     - Look for the `IPv4 Address` under your active network adapter (e.g., `192.163.1.400`).

2. **Share the URL**:

   - Provide your friends with the URL in the format: `http://<Your-IPv4-Address>:5000/` .
   - Note: All users must be on the same network/Wi-fi.

3. **Test the Connection**:
   - Have your friend open the URL in their browser.
   - They should see the chat room interface, and Active User Count increase and be able to send messages, which will appear for all connected users.

## Troubleshooting

- **MongoDB Connection Issues**:

  - Ensure your `.env` file contains the correct `MONGO_URI`.
  - Ensure database user `password` is correct.
  - Verify your IP is whitelisted in MongoDB Atlas or add `0.0,0.0/0` to allow access anywhere

- **Server Not Running**:

  - Confirm all dependencies are installed (`npm install`).
  - Check for errors in the terminal when running `npm start`.

- **Friends Can't Connect**:
  - Ensure everyone is on the same network.
  - Verify your IPv4 address is correct.

## Authors ✍️

- **Xavier Guinness Stout**

## Acknowledgments 🙌

This project was inspired by the following resources:

- **Tutorial Video**: [YouTube tutorial](https://www.youtube.com/watch?v=8Y6mWhcdSUM) for a visual guide on setting up a similar chat application.
