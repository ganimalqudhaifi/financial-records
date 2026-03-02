import { getDatabase } from "firebase/database";
import { app } from "./client";

export const database = getDatabase(app);