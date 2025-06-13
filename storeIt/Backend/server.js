import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { clerkClient } from "@clerk/clerk-sdk-node";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.post("/api/v1/clerk-verification", async (req, res) => {
  const { userId } = req.body;
  // console.log(userId);

  try {
    const user = await clerkClient.users.getUser(userId);
    // console.log(user);
    const emailAddress = user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId); 
    // console.log(emailAddress);
    
    if (emailAddress && emailAddress.verification?.status === "verified") {
      return res.status(200).json({ success: true });
    } else {
      return res.status(403).json({ success: false, message: "Email not verified" });
    }
  } catch (err) {
    console.error("Verification check failed:", err);
    return res.status(500).json({ success: false });
  }
});

app.get("/api/v1/check-session", async (req, res) => {
  const sessionId = req.headers.authorization;

  try {
    const session = await clerkClient.sessions.getSession(sessionId);
    if (session && session.status === "active") {
      return res.json({ success: true });
    } else {
      return res.status(403).json({ success: false, message: "Inactive session" });
    }
  } catch (err) {
    console.error("Session check failed:", err);
    return res.status(401).json({ success: false, message: "Invalid session" });
  }
});

app.listen(PORT, () => {
    console.log("Server started at http://localhost:"+PORT);
})