import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { testRoutes } from '../routes/tests';
import { attemptRoutes } from '../routes/attempts';
import { authRoutes } from '../routes/auth';
import { paymentRoutes } from '../routes/payments';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-User-Email']
}));

// Other middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health checks
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// ✅ USE REAL DATABASE ROUTES (Remove all mock endpoints)
app.use('/api/tests', testRoutes);
app.use('/api/attempts', attemptRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/payments', paymentRoutes);

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, {
    userEmail: req.headers['x-user-email'] || 'none',
    hasAuth: !!req.headers['x-user-email']
  });
  next();
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('❌ Server Error:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`📍 API Health: http://localhost:${PORT}/api/health`);
});
