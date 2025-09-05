import cors from "cors";

export const corsMiddleware = cors({
  origin: ["http://localhost:3000"],
  credentials: true,
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization","X-Auth-Token"],
  optionsSuccessStatus: 200
});
