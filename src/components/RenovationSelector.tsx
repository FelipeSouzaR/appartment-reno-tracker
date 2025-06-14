
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Calendar, Settings } from 'lucide-react';
import { useRenovations } from '@/hooks/useRenovations';
import { Renovation, RenovationCreateData } from '@/types/renovation';

interface RenovationSelectorProps {
  onSelectRenovation: (renovation: Renovation) => void;
  selectedRenovation?: Renovation;
}

const RenovationSelector: React.FC<RenovationSelectorProps> = ({ 
  onSelectRenovation, 
  selectedRenovation 
}) => {
  const { renovations, loading, createRenovation } = useRenovations();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState<RenovationCreateData>({
    name: '',
    description: '',
    start_date: '',
    target_completion_date: '',
    status: 'Planejamento',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newRenovation = await createRenovation(formData);
      onSelectRenovation(newRenovation);
      setShowCreateForm(false);
      setFormData({
        name: '',
        description: '',
        start_date: '',
        target_completion_date: '',
        status: 'Planejamento',
      });
    } catch (error) {
      // Error handled in hook
    }
  };

  if (loading) {
    return <div className="text-center py-8">Carregando reformas...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Suas Reformas</h2>
        <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
          <DialogTrigger asChild>
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Nova Reforma</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Criar Nova Reforma</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome da Reforma</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="ex: Reforma do Apartamento"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Descrição da reforma"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start_date">Data de Início</Label>
                  <Input
                    id="start_date"
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="target_completion_date">Previsão de Término</Label>
                  <Input
                    id="target_completion_date"
                    type="date"
                    value={formData.target_completion_date}
                    onChange={(e) => setFormData(prev => ({ ...prev, target_completion_date: e.target.value }))}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                  Cancelar
                </Button>
                <Button type="submit">Criar Reforma</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {renovations.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground mb-4">Você ainda não tem reformas cadastradas.</p>
            <Button onClick={() => setShowCreateForm(true)} className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Criar Primeira Reforma</span>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {renovations.map((renovation) => (
            <Card 
              key={renovation.id} 
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedRenovation?.id === renovation.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => onSelectRenovation(renovation)}
            >
              <CardHeader>
                <CardTitle className="text-lg">{renovation.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">{renovation.description}</p>
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="h-4 w-4" />
                  <span>Status: {renovation.status}</span>
                </div>
                {renovation.start_date && (
                  <div className="text-sm text-muted-foreground mt-1">
                    Início: {new Date(renovation.start_date).toLocaleDateString('pt-BR')}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default RenovationSelector;
