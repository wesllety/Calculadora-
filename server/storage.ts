import { type CalculatorPreset, type InsertCalculatorPreset } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getPreset(id: string): Promise<CalculatorPreset | undefined>;
  getPresets(): Promise<CalculatorPreset[]>;
  createPreset(preset: InsertCalculatorPreset): Promise<CalculatorPreset>;
  updatePreset(id: string, preset: Partial<InsertCalculatorPreset>): Promise<CalculatorPreset | undefined>;
  deletePreset(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private presets: Map<string, CalculatorPreset>;

  constructor() {
    this.presets = new Map();
  }

  async getPreset(id: string): Promise<CalculatorPreset | undefined> {
    return this.presets.get(id);
  }

  async getPresets(): Promise<CalculatorPreset[]> {
    return Array.from(this.presets.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async createPreset(insertPreset: InsertCalculatorPreset): Promise<CalculatorPreset> {
    const id = randomUUID();
    const preset: CalculatorPreset = {
      id,
      nome: insertPreset.nome,
      tamanho: insertPreset.tamanho || "custom",
      matFios: insertPreset.matFios || 25,
      matAcess: insertPreset.matAcess || 6,
      matEnch: insertPreset.matEnch || 4,
      matEmb: insertPreset.matEmb || 3,
      horas: insertPreset.horas || 6,
      horaValor: insertPreset.horaValor || 20,
      dificuldade: insertPreset.dificuldade || 10,
      overhead: insertPreset.overhead || 2.5,
      taxaPlataforma: insertPreset.taxaPlataforma || 8,
      impostos: insertPreset.impostos || 6,
      frete: insertPreset.frete || 0,
      margem: insertPreset.margem || 40,
      desconto: insertPreset.desconto || 5,
      psico: insertPreset.psico !== undefined ? insertPreset.psico : true,
      createdAt: new Date(),
    };
    this.presets.set(id, preset);
    return preset;
  }

  async updatePreset(id: string, updateData: Partial<InsertCalculatorPreset>): Promise<CalculatorPreset | undefined> {
    const existing = this.presets.get(id);
    if (!existing) return undefined;

    const updated: CalculatorPreset = {
      ...existing,
      ...updateData,
    };
    this.presets.set(id, updated);
    return updated;
  }

  async deletePreset(id: string): Promise<boolean> {
    return this.presets.delete(id);
  }
}

export const storage = new MemStorage();
