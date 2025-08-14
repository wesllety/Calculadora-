export function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function parseCurrency(value: string): number {
  // Remove currency formatting and convert to number
  const cleanValue = value.replace(/[^\d,.-]/g, "").replace(",", ".");
  return parseFloat(cleanValue) || 0;
}