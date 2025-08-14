import { PieChart, Tags, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/currency";
import { type CalculationResult } from "@shared/schema";
import { type CalculatorData } from "@/lib/calculator";

interface ResultsPanelProps {
  result: CalculationResult | null;
  data: CalculatorData;
}

export default function ResultsPanel({ result, data }: ResultsPanelProps) {
  if (!result) {
    return (
      <div className="gradient-card border border-dark-border rounded-2xl p-6 shadow-xl">
        <h3 className="text-text-accent font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
          <PieChart className="w-4 h-4" />
          Resultado
        </h3>
        <div className="text-center py-8 text-text-muted">
          <PieChart className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Preencha os dados para ver os resultados</p>
        </div>
      </div>
    );
  }

  const getMarginBadge = () => {
    const margin = result.margemEfetiva;
    if (margin >= 0.3) {
      return {
        text: "Margem Excelente",
        className: "bg-green-700 text-green-200 border-green-600",
      };
    } else if (margin >= 0.2) {
      return {
        text: "Margem Boa",
        className: "bg-blue-700 text-blue-200 border-blue-600",
      };
    } else if (margin >= 0.1) {
      return {
        text: "Margem Baixa",
        className: "bg-yellow-700 text-yellow-200 border-yellow-600",
      };
    } else {
      return {
        text: "Margem Crítica",
        className: "bg-red-700 text-red-200 border-red-600",
      };
    }
  };

  const marginBadge = getMarginBadge();

  const pricingTiers = [
    {
      nivel: "Mínimo",
      preco: result.precoMinimo,
      precoVista: result.precoMinimo * (1 - data.desconto / 100),
      highlight: false,
    },
    {
      nivel: "Recomendado",
      preco: result.precoRecomendado,
      precoVista: result.precoRecomendado * (1 - data.desconto / 100),
      highlight: true,
    },
    {
      nivel: "Premium",
      preco: result.precoPremium,
      precoVista: result.precoPremium * (1 - data.desconto / 100),
      highlight: false,
    },
  ];

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="gradient-card border border-dark-border rounded-2xl p-6 shadow-xl">
        <h3 className="text-text-accent font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
          <PieChart className="w-4 h-4" />
          Resultado
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-dark-card border border-dark-border-light rounded-xl p-4" data-testid="kpi-material-cost">
            <div className="text-xs text-text-muted mb-1">Custo de Materiais</div>
            <div className="text-2xl font-bold text-text-primary">
              {formatCurrency(result.custoMateriais)}
            </div>
            <div className="text-xs text-text-muted mt-1">
              Fios + acessórios + enchimento + embalagem
            </div>
          </div>
          <div className="bg-dark-card border border-dark-border-light rounded-xl p-4" data-testid="kpi-production-cost">
            <div className="text-xs text-text-muted mb-1">Custo de Produção</div>
            <div className="text-2xl font-bold text-text-primary">
              {formatCurrency(result.custoProducao)}
            </div>
            <div className="text-xs text-text-muted mt-1">
              Horas × valor da hora (+ dificuldade + overhead)
            </div>
          </div>
          <div className="bg-dark-card border border-dark-border-light rounded-xl p-4" data-testid="kpi-recommended-price">
            <div className="text-xs text-text-muted mb-1">Preço Recomendado</div>
            <div className="text-2xl font-bold text-brand-primary">
              {formatCurrency(result.precoRecomendado)}
            </div>
            <div className="mt-2">
              <Badge className={`${marginBadge.className} text-xs`}>
                {marginBadge.text}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Tiers */}
      <div className="gradient-card border border-dark-border rounded-2xl p-6 shadow-xl">
        <h3 className="text-text-accent font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
          <Tags className="w-4 h-4" />
          Faixas de Preço
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left">
                <th className="text-blue-300 font-semibold text-sm pb-3">Nível</th>
                <th className="text-blue-300 font-semibold text-sm pb-3 text-right">Preço</th>
                <th className="text-blue-300 font-semibold text-sm pb-3 text-right">À vista</th>
              </tr>
            </thead>
            <tbody className="space-y-2" data-testid="pricing-tiers-table">
              {pricingTiers.map((tier, index) => (
                <tr
                  key={tier.nivel}
                  className={`bg-dark-card border border-dark-border-light ${
                    tier.highlight ? "text-brand-primary" : ""
                  }`}
                  data-testid={`pricing-tier-${index}`}
                >
                  <td
                    className={`py-3 px-4 rounded-l-xl text-sm ${
                      tier.highlight ? "font-semibold" : ""
                    }`}
                  >
                    {tier.nivel}
                  </td>
                  <td
                    className={`py-3 px-4 text-right text-sm ${
                      tier.highlight ? "font-semibold" : ""
                    }`}
                  >
                    {formatCurrency(tier.preco)}
                  </td>
                  <td
                    className={`py-3 px-4 text-right text-sm rounded-r-xl ${
                      tier.highlight ? "font-semibold" : ""
                    }`}
                  >
                    {formatCurrency(tier.precoVista)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-xs text-text-muted mt-4 p-3 bg-dark-input rounded-lg flex items-start gap-2">
          <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <div>
            O "Recomendado" já cobre taxas + impostos + sua margem. "Premium" adiciona 15% para
            modelos com alta demanda/complexidade.
          </div>
        </div>
      </div>
    </div>
  );
}