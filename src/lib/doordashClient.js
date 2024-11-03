// src/lib/doordashClient.js
import { DoorDashClient } from "@doordash/sdk";

const doordashClient = new DoorDashClient({
  developer_id: process.env.NEXT_DOORDASH_DEVELOPER_ID,
  key_id: process.env.NEXT_DOORDASH_KEY_ID,
  signing_secret: process.env.NEXT_DOORDASH_SIGNING_SECRET,
});

export default doordashClient;
