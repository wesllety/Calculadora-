import { type CalculationResult } from "@shared/schema";

export interface CalculatorData {
  nome: string;
  tamanho: string;
  matFios: number;
  matAcess: number;
  matEnch: number;
  matEmb: number;
  horas: number;
  horaValor: number;
  dificuldade: number;
  overhead: number;
  taxaPlataforma: number;
  impostos: number;
  frete: number;
  margem: number;
  desconto: number;
  psico: boolean;
}

export function arredondarPsicologico(value: number): number {
  const inteiro = Math.floor(value);
  const alvo = inteiro + 0.9;
  if (alvo < value) {
    return inteiro + 1 + 0.9;
  }
  return alvo;
}

export function calculatePricing(data: CalculatorData): CalculationResult {
  // Convert percentages to decimals
  const dificuldadeDecimal = data.dificuldade / 100;
  const taxaPlataformaDecimal = data.taxaPlataforma / 100;
  const impostosDecimal = data.impostos / 100;
  const margemDecimal = data.margem / 100;

  // Calculate costs
  const custoMateriais = data.matFios + data.matAcess + data.matEnch + data.matEmb;
  const maoDeObra = data.horas * data.horaValor;
  const custoBase = custoMateriais + maoDeObra + data.overhead + data.frete;
  const custoComDificuldade = custoBase * (1 + dificuldadeDecimal);

  // Gross-up calculation to cover taxes and fees
  const taxaTotal = taxaPlataformaDecimal + impostosDecimal;
  const antesMargem = taxaTotal >= 1 ? Infinity : custoComDificuldade / (1 - taxaTotal);

  // Calculate prices
  const precoRecomendadoRaw = antesMargem * (1 + margemDecimal);
  const precoRecomendado = data.psico ? arredondarPsicologico(precoRecomendadoRaw) : precoRecomendadoRaw;

  const precoMinimoRaw = antesMargem; // Covers cost + taxes, no profit
  const precoMinimo = data.psico ? arredondarPsicologico(precoMinimoRaw) : precoMinimoRaw;

  const precoPremiumRaw = precoRecomendado * 1.15; // +15%
  const precoPremium = data.psico ? arredondarPsicologico(precoPremiumRaw) : precoPremiumRaw;

  // Calculate effective margin
  const margemEfetiva = (precoRecomendado - antesMargem) / precoRecomendado;

  const custoProducao = maoDeObra + data.overhead + data.frete;

  return {
    custoMateriais,
    maoDeObra,
    custoProducao,
    precoMinimo,
    precoRecomendado,
    precoPremium,
    margemEfetiva,
  };
}