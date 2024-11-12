import { config } from "dotenv";
import express from "express";
import mongoose from "mongoose";

config();

const PORT = process.env.PORT || 3000;
const DB = process.env.DB;
const app = express();


