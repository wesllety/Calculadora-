import { useState, useEffect } from "react";
import { Calculator as CalculatorIcon, Save, Upload, Copy } from "lucide-react";
import CalculatorForm from "@/components/calculator-form";
import ResultsPanel from "@/components/results-panel";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { calculatePricing, type CalculatorData } from "@/lib/calculator";
import { formatCurrency } from "@/lib/currency";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { type InsertCalculatorPreset, type CalculationResult } from "@shared/schema";

const DEFAULT_DATA: CalculatorData = {
  nome: "",
  tamanho: "custom",
  matFios: 25,
  matAcess: 6,
  matEnch: 4,
  matEmb: 3,
  horas: 6,
  horaValor: 20,
  dificuldade: 10,
  overhead: 2.5,
  taxaPlataforma: 8,
  impostos: 6,
  frete: 0,
  margem: 40,
  desconto: 5,
  psico: true,
};

export default function Calculator() {
  const [data, setData] = useState<CalculatorData>(DEFAULT_DATA);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const savePresetMutation = useMutation({
    mutationFn: async (preset: InsertCalculatorPreset) => {
      const response = await apiRequest("POST", "/api/presets", preset);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/presets"] });
      toast({
        title: "Preset salvo!",
        description: "Suas configurações foram salvas com sucesso.",
      });
    },
    onError: () => {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar o preset.",
        variant: "destructive",
      });
    },
  });

  const handleDataChange = (newData: CalculatorData) => {
    setData(newData);
  };

  const handleCalculate = () => {
    const newResult = calculatePricing(data);
    setResult(newResult);
  };

  const handleSavePreset = () => {
    if (!data.nome.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Por favor, digite um nome para o produto.",
        variant: "destructive",
      });
      return;
    }

    const preset: InsertCalculatorPreset = {
      nome: data.nome,
      tamanho: data.tamanho,
      matFios: data.matFios,
      matAcess: data.matAcess,
      matEnch: data.matEnch,
      matEmb: data.matEmb,
      horas: data.horas,
      horaValor: data.horaValor,
      dificuldade: data.dificuldade,
      overhead: data.overhead,
      taxaPlataforma: data.taxaPlataforma,
      impostos: data.impostos,
      frete: data.frete,
      margem: data.margem,
      desconto: data.desconto,
      psico: data.psico,
    };

    savePresetMutation.mutate(preset);
  };

  const handleLoadPreset = () => {
    const saved = localStorage.getItem('amigurumiPreset');
    if (saved) {
      try {
        const parsedData = JSON.parse(saved);
        setData({ ...DEFAULT_DATA, ...parsedData });
        toast({
          title: "Preset carregado!",
          description: "Configurações restauradas com sucesso.",
        });
      } catch {
        toast({
          title: "Erro ao carregar",
          description: "Não foi possível carregar o preset salvo.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Nenhum preset encontrado",
        description: "Não há configurações salvas localmente.",
        variant: "destructive",
      });
    }
  };

  const handleCopyResult = () => {
    if (!result) return;

    const summary = `🧶 ${data.nome || 'Amigurumi'}
💰 Preço recomendado: ${formatCurrency(result.precoRecomendado)}
📊 Custo de materiais: ${formatCurrency(result.custoMateriais)}
⚡ Custo de produção: ${formatCurrency(result.custoProducao)}
🎯 Margem efetiva: ${(result.margemEfetiva * 100).toFixed(1)}%

Calculado com Calculadora Inteligente de Preço — Amigurumi`;

    navigator.clipboard.writeText(summary).then(() => {
      toast({
        title: "Resumo copiado!",
        description: "O resumo foi copiado para a área de transferência.",
      });
    });
  };

  // Auto-calculate when data changes
  useEffect(() => {
    handleCalculate();
  }, [data]);

  // Save to localStorage when data changes
  useEffect(() => {
    localStorage.setItem('amigurumiPreset', JSON.stringify(data));
  }, [data]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🧶</div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">
                Calculadora Inteligente de Preço
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="bg-slate-800 text-blue-300 px-3 py-1 rounded-full text-sm font-semibold border border-slate-700">
                  Amigurumi
                </span>
                <span className="text-text-muted text-sm">Para artesãs empreendedoras</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              variant="secondary"
              onClick={handleLoadPreset}
              className="flex-1 sm:flex-none"
              data-testid="button-load-preset"
            >
              <Upload className="w-4 h-4 mr-2" />
              Carregar
            </Button>
            <Button
              variant="secondary"
              onClick={handleSavePreset}
              disabled={savePresetMutation.isPending}
              className="flex-1 sm:flex-none"
              data-testid="button-save-preset"
            >
              <Save className="w-4 h-4 mr-2" />
              {savePresetMutation.isPending ? "Salvando..." : "Salvar"}
            </Button>
            <Button
              onClick={handleCalculate}
              className="flex-1 sm:flex-none bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-cyan-400 hover:to-sky-400 text-slate-900 font-bold"
              data-testid="button-calculate"
            >
              <CalculatorIcon className="w-4 h-4 mr-2" />
              Calcular
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Input Panel */}
          <div className="lg:col-span-7">
            <CalculatorForm data={data} onChange={handleDataChange} />
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-5">
            <ResultsPanel result={result} data={data} />
            {result && (
              <div className="mt-6">
                <Button
                  onClick={handleCopyResult}
                  className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-cyan-400 hover:to-sky-400 text-slate-900 font-bold"
                  data-testid="button-copy-summary"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copiar Resumo
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12">
          <div className="gradient-card border border-dark-border rounded-xl p-6 text-center text-text-muted text-sm">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-red-400">❤️</span>
              <span>Feito para você otimizar lucro sem adivinhar preço.</span>
            </div>
            <div className="text-xs text-text-muted">
              Ajuste os campos, salve o preset e replique por modelo. Uma ferramenta para artesãs empreendedoras prosperarem 🧶
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
