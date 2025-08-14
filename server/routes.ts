import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCalculatorPresetSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all presets
  app.get("/api/presets", async (req, res) => {
    try {
      const presets = await storage.getPresets();
      res.json(presets);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch presets" });
    }
  });

  // Get single preset
  app.get("/api/presets/:id", async (req, res) => {
    try {
      const preset = await storage.getPreset(req.params.id);
      if (!preset) {
        return res.status(404).json({ error: "Preset not found" });
      }
      res.json(preset);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch preset" });
    }
  });

  // Create preset
  app.post("/api/presets", async (req, res) => {
    try {
      const validatedData = insertCalculatorPresetSchema.parse(req.body);
      const preset = await storage.createPreset(validatedData);
      res.status(201).json(preset);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create preset" });
    }
  });

  // Update preset
  app.patch("/api/presets/:id", async (req, res) => {
    try {
      const validatedData = insertCalculatorPresetSchema.partial().parse(req.body);
      const preset = await storage.updatePreset(req.params.id, validatedData);
      if (!preset) {
        return res.status(404).json({ error: "Preset not found" });
      }
      res.json(preset);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update preset" });
    }
  });

  // Delete preset
  app.delete("/api/presets/:id", async (req, res) => {
    try {
      const success = await storage.deletePreset(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Preset not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete preset" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
