import "dotenv/config";

export const MONGODB_URL = process.env.MONGODB_URL;

export const appConfig = {
  // appOrigin: ["http://localhost:3000"],
  appOrigin: ["https://ecommerce-app-206z.onrender.com"],
  cookieExpiryTime: new Date(Date.now() + 12 * 60 * 60 * 1000), // 24 hours
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
};
