import { sql } from "drizzle-orm";
import { pgTable, text, varchar, real, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const calculatorPresets = pgTable("calculator_presets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  nome: text("nome").notNull(),
  tamanho: text("tamanho").notNull().default("custom"),
  matFios: real("mat_fios").notNull().default(25),
  matAcess: real("mat_acess").notNull().default(6),
  matEnch: real("mat_ench").notNull().default(4),
  matEmb: real("mat_emb").notNull().default(3),
  horas: real("horas").notNull().default(6),
  horaValor: real("hora_valor").notNull().default(20),
  dificuldade: real("dificuldade").notNull().default(10),
  overhead: real("overhead").notNull().default(2.5),
  taxaPlataforma: real("taxa_plataforma").notNull().default(8),
  impostos: real("impostos").notNull().default(6),
  frete: real("frete").notNull().default(0),
  margem: real("margem").notNull().default(40),
  desconto: real("desconto").notNull().default(5),
  psico: boolean("psico").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertCalculatorPresetSchema = createInsertSchema(calculatorPresets).omit({
  id: true,
  createdAt: true,
});

export type InsertCalculatorPreset = z.infer<typeof insertCalculatorPresetSchema>;
export type CalculatorPreset = typeof calculatorPresets.$inferSelect;

export interface CalculationResult {
  custoMateriais: number;
  maoDeObra: number;
  custoProducao: number;
  precoMinimo: number;
  precoRecomendado: number;
  precoPremium: number;
  margemEfetiva: number;
}

export interface PricingTier {
  nivel: string;
  preco: number;
  precoVista: number;
}
