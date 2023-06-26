import express from "express";

declare global {
  namespace Express {
    interface Request {
      author?: Record<string, any> | null | undefined
      
    }
  }
}

// Type 'Record<string, any> | null | undefined' is not assignable to type 'Record<string, any> | undefined'.
//   Type 'null' is not assignable to type 'Record<string, any> | undefined'.