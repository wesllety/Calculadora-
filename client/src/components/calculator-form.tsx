import { ShoppingCart, Clock, Receipt, TrendingUp, Package } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { type CalculatorData } from "@/lib/calculator";

interface CalculatorFormProps {
  data: CalculatorData;
  onChange: (data: CalculatorData) => void;
}

const SIZE_PRESETS = {
  P: { horas: 4.5, matFios: 18, matAcess: 5, matEnch: 3, matEmb: 3 },
  M: { horas: 6.5, matFios: 25, matAcess: 6, matEnch: 4, matEmb: 3.5 },
  G: { horas: 9, matFios: 35, matAcess: 7, matEnch: 5, matEmb: 4 },
};

export default function CalculatorForm({ data, onChange }: CalculatorFormProps) {
  const handleInputChange = (field: keyof CalculatorData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const handleSizeChange = (size: string) => {
    const newData = { ...data, tamanho: size };
    
    if (size in SIZE_PRESETS) {
      const preset = SIZE_PRESETS[size as keyof typeof SIZE_PRESETS];
      Object.assign(newData, preset);
    }
    
    onChange(newData);
  };

  return (
    <div className="space-y-6">
      {/* Dados do Produto */}
      <div className="gradient-card border border-dark-border rounded-2xl p-6 shadow-xl">
        <h3 className="text-text-accent font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
          <Package className="w-4 h-4" />
          Dados do Produto
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm text-text-muted">Nome do produto</Label>
            <Input
              value={data.nome}
              onChange={(e) => handleInputChange("nome", e.target.value)}
              placeholder="Ex.: Coelhinho com jardineira"
              className="bg-dark-input border-dark-border-light text-text-primary"
              data-testid="input-product-name"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-text-muted">Tamanho</Label>
            <Select value={data.tamanho} onValueChange={handleSizeChange}>
              <SelectTrigger 
                className="bg-dark-input border-dark-border-light text-text-primary"
                data-testid="select-size"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="custom">Personalizado</SelectItem>
                <SelectItem value="P">P — 10–14 cm</SelectItem>
                <SelectItem value="M">M — 15–20 cm</SelectItem>
                <SelectItem value="G">G — 21–30 cm</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-text-muted">
              Os tamanhos pré-preenchem horas e materiais (você pode ajustar)
            </p>
          </div>
        </div>
      </div>

      {/* Custos de Materiais */}
      <div className="gradient-card border border-dark-border rounded-2xl p-6 shadow-xl">
        <h3 className="text-text-accent font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
          <ShoppingCart className="w-4 h-4" />
          Custos de Materiais
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm text-text-muted">Fios / Lãs (R$)</Label>
            <Input
              type="number"
              step="0.01"
              value={data.matFios}
              onChange={(e) => handleInputChange("matFios", parseFloat(e.target.value) || 0)}
              className="bg-dark-input border-dark-border-light text-text-primary"
              data-testid="input-yarn-cost"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-text-muted">Acessórios (olhos, botões etc.) (R$)</Label>
            <Input
              type="number"
              step="0.01"
              value={data.matAcess}
              onChange={(e) => handleInputChange("matAcess", parseFloat(e.target.value) || 0)}
              className="bg-dark-input border-dark-border-light text-text-primary"
              data-testid="input-accessories-cost"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-text-muted">Enchimento e cola (R$)</Label>
            <Input
              type="number"
              step="0.01"
              value={data.matEnch}
              onChange={(e) => handleInputChange("matEnch", parseFloat(e.target.value) || 0)}
              className="bg-dark-input border-dark-border-light text-text-primary"
              data-testid="input-stuffing-cost"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-text-muted">Embalagem (R$)</Label>
            <Input
              type="number"
              step="0.01"
              value={data.matEmb}
              onChange={(e) => handleInputChange("matEmb", parseFloat(e.target.value) || 0)}
              className="bg-dark-input border-dark-border-light text-text-primary"
              data-testid="input-packaging-cost"
            />
          </div>
        </div>
      </div>

      {/* Tempo e Mão de Obra */}
      <div className="gradient-card border border-dark-border rounded-2xl p-6 shadow-xl">
        <h3 className="text-text-accent font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Tempo e Mão de Obra
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label className="text-sm text-text-muted">Horas de produção</Label>
            <Input
              type="number"
              step="0.1"
              value={data.horas}
              onChange={(e) => handleInputChange("horas", parseFloat(e.target.value) || 0)}
              className="bg-dark-input border-dark-border-light text-text-primary"
              data-testid="input-production-hours"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-text-muted">Valor da sua hora (R$)</Label>
            <Input
              type="number"
              step="0.5"
              value={data.horaValor}
              onChange={(e) => handleInputChange("horaValor", parseFloat(e.target.value) || 0)}
              className="bg-dark-input border-dark-border-light text-text-primary"
              data-testid="input-hourly-rate"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-text-muted">Dificuldade extra (%)</Label>
            <Input
              type="number"
              step="1"
              value={data.dificuldade}
              onChange={(e) => handleInputChange("dificuldade", parseFloat(e.target.value) || 0)}
              className="bg-dark-input border-dark-border-light text-text-primary"
              data-testid="input-difficulty"
            />
            <p className="text-xs text-text-muted">
              Complexidade do ponto, muitas trocas de cor, bordados etc.
            </p>
          </div>
        </div>
      </div>

      {/* Custos Fixos / Taxas */}
      <div className="gradient-card border border-dark-border rounded-2xl p-6 shadow-xl">
        <h3 className="text-text-accent font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
          <Receipt className="w-4 h-4" />
          Custos Fixos / Taxas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm text-text-muted">Overhead (energia, desgaste) (R$)</Label>
            <Input
              type="number"
              step="0.5"
              value={data.overhead}
              onChange={(e) => handleInputChange("overhead", parseFloat(e.target.value) || 0)}
              className="bg-dark-input border-dark-border-light text-text-primary"
              data-testid="input-overhead"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-text-muted">Taxa da plataforma/checkout (%)</Label>
            <Input
              type="number"
              step="0.5"
              value={data.taxaPlataforma}
              onChange={(e) => handleInputChange("taxaPlataforma", parseFloat(e.target.value) || 0)}
              className="bg-dark-input border-dark-border-light text-text-primary"
              data-testid="input-platform-fee"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-text-muted">Impostos (%)</Label>
            <Input
              type="number"
              step="0.5"
              value={data.impostos}
              onChange={(e) => handleInputChange("impostos", parseFloat(e.target.value) || 0)}
              className="bg-dark-input border-dark-border-light text-text-primary"
              data-testid="input-taxes"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-text-muted">Frete incluso (R$)</Label>
            <Input
              type="number"
              step="0.5"
              value={data.frete}
              onChange={(e) => handleInputChange("frete", parseFloat(e.target.value) || 0)}
              className="bg-dark-input border-dark-border-light text-text-primary"
              data-testid="input-shipping"
            />
          </div>
        </div>
      </div>

      {/* Lucro e Estratégia */}
      <div className="gradient-card border border-dark-border rounded-2xl p-6 shadow-xl">
        <h3 className="text-text-accent font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          Lucro e Estratégia
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm text-text-muted">Margem de lucro desejada (%)</Label>
            <Input
              type="number"
              step="1"
              value={data.margem}
              onChange={(e) => handleInputChange("margem", parseFloat(e.target.value) || 0)}
              className="bg-dark-input border-dark-border-light text-text-primary"
              data-testid="input-profit-margin"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-text-muted">Desconto à vista (%)</Label>
            <Input
              type="number"
              step="1"
              value={data.desconto}
              onChange={(e) => handleInputChange("desconto", parseFloat(e.target.value) || 0)}
              className="bg-dark-input border-dark-border-light text-text-primary"
              data-testid="input-cash-discount"
            />
          </div>
          <div className="md:col-span-2 flex items-center gap-3">
            <Checkbox
              id="psico"
              checked={data.psico}
              onCheckedChange={(checked) => handleInputChange("psico", checked)}
              className="border-dark-border-light"
              data-testid="checkbox-psychological-pricing"
            />
            <Label htmlFor="psico" className="text-sm text-text-muted cursor-pointer">
              Arredondar psicológico (R$ _.90)
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
}