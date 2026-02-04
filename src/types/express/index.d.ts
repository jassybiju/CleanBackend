export {};

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      // Add other custom properties as needed
    }
  }
}   