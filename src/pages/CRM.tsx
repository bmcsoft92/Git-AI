import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Search, Phone, Mail, Calendar, User, Building2, TrendingUp, Filter, ArrowLeft, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Lead {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  company: string | null;
  team_size: string | null;
  business_type: string | null;
  status: string;
  roi_potential: number | null;
  annual_savings: number | null;
  last_contact_date: string | null;
  next_followup_date: string | null;
  notes: string | null;
  source: string | null;
  created_at: string;
  updated_at: string;
}

const statusConfig = {
  nouveau_lead: { label: 'Nouveau Lead', color: 'bg-blue-500', textColor: 'text-white' },
  diagnostic_envoye: { label: 'Diagnostic Envoyé', color: 'bg-green-500', textColor: 'text-white' },
  rdv_demande: { label: 'RDV Demandé', color: 'bg-orange-500', textColor: 'text-white' },
  rdv_confirme: { label: 'RDV Confirmé', color: 'bg-purple-500', textColor: 'text-white' },
  proposition_envoyee: { label: 'Proposition Envoyée', color: 'bg-yellow-500', textColor: 'text-black' },
  client_signe: { label: 'Client Signé', color: 'bg-emerald-600', textColor: 'text-white' },
  perdu: { label: 'Perdu', color: 'bg-red-500', textColor: 'text-white' }
};

export default function CRM() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [notes, setNotes] = useState('');
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    filterLeads();
  }, [leads, searchTerm, statusFilter]);

  const fetchLeads = async () => {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (error: any) {
      toast.error('Erreur lors du chargement des leads: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const filterLeads = () => {
    let filtered = leads;

    // Filtrer par terme de recherche
    if (searchTerm) {
      filtered = filtered.filter(lead => 
        lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.company?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrer par statut
    if (statusFilter !== 'all') {
      filtered = filtered.filter(lead => lead.status === statusFilter);
    }

    setFilteredLeads(filtered);
  };

  const updateLeadStatus = async (leadId: string, status: string, notes?: string) => {
    try {
      const updates: any = { status, updated_at: new Date().toISOString() };
      if (notes) updates.notes = notes;

      const { error } = await supabase
        .from('leads')
        .update(updates)
        .eq('id', leadId);

      if (error) throw error;
      
      await fetchLeads();
      toast.success('Lead mis à jour avec succès');
      setSelectedLead(null);
      setNotes('');
      setNewStatus('');
    } catch (error: any) {
      toast.error('Erreur lors de la mise à jour: ' + error.message);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Chargement du CRM...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Bouton de retour */}
        <div className="mb-6">
          <Button 
            onClick={() => navigate("/")}
            variant="outline" 
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour à l'accueil
          </Button>
        </div>
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">CRM Dashboard</h1>
          <p className="text-muted-foreground">Gérez vos leads et suivez votre pipeline de ventes</p>
        </div>

        {/* Stats rapides */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Leads</p>
                  <p className="text-2xl font-bold">{leads.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Clients Signés</p>
                  <p className="text-2xl font-bold">
                    {leads.filter(lead => lead.status === 'client_signe').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-sm text-muted-foreground">RDV en Attente</p>
                  <p className="text-2xl font-bold">
                    {leads.filter(lead => ['rdv_demande', 'rdv_confirme'].includes(lead.status)).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Building2 className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-muted-foreground">ROI Moyen</p>
                  <p className="text-2xl font-bold">
                    {leads.filter(l => l.roi_potential).length > 0 
                      ? Math.round(leads.filter(l => l.roi_potential).reduce((acc, l) => acc + (l.roi_potential || 0), 0) / leads.filter(l => l.roi_potential).length)
                      : 0}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtres */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Filtres</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher par nom, email ou entreprise..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[250px]">
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  {Object.entries(statusConfig).map(([key, config]) => (
                    <SelectItem key={key} value={key}>{config.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Liste des leads */}
        <div className="grid gap-4">
          {filteredLeads.map((lead) => (
            <Card key={lead.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {lead.name || 'Lead sans nom'}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                          <div className="flex items-center space-x-1">
                            <Mail className="h-4 w-4" />
                            <span>{lead.email}</span>
                          </div>
                          {lead.phone && (
                            <div className="flex items-center space-x-1">
                              <Phone className="h-4 w-4" />
                              <span>{lead.phone}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <Badge className={`${statusConfig[lead.status as keyof typeof statusConfig]?.color} ${statusConfig[lead.status as keyof typeof statusConfig]?.textColor}`}>
                        {statusConfig[lead.status as keyof typeof statusConfig]?.label}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Entreprise</p>
                        <p className="font-medium">{lead.company || 'Non renseigné'}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Taille équipe</p>
                        <p className="font-medium">{lead.team_size || 'Non renseigné'}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">ROI Potentiel</p>
                        <p className="font-medium text-green-600">
                          {lead.roi_potential ? `${lead.roi_potential}%` : 'Non calculé'}
                        </p>
                      </div>
                      {lead.annual_savings && (
                        <div>
                          <p className="text-muted-foreground">Économies Annuelles</p>
                          <p className="font-medium text-green-600">
                            {formatCurrency(lead.annual_savings)}
                          </p>
                        </div>
                      )}
                      <div>
                        <p className="text-muted-foreground">Créé le</p>
                        <p className="font-medium">{formatDate(lead.created_at)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Dernière activité</p>
                        <p className="font-medium">{formatDate(lead.updated_at)}</p>
                      </div>
                    </div>
                    
                    {lead.notes && (
                      <div className="mt-3 p-3 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Notes:</p>
                        <p className="text-sm">{lead.notes}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col space-y-2 lg:w-48">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedLead(lead);
                        setNewStatus(lead.status);
                        setNotes(lead.notes || '');
                      }}
                    >
                      Modifier
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredLeads.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">Aucun lead trouvé avec ces filtres.</p>
            </CardContent>
          </Card>
        )}

        {/* Modal de modification */}
        {selectedLead && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-lg">
              <CardHeader>
                <CardTitle>Modifier le lead</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Nom</label>
                  <p className="text-sm text-muted-foreground">{selectedLead.name || 'Non renseigné'}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <p className="text-sm text-muted-foreground">{selectedLead.email}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Statut</label>
                  <Select value={newStatus} onValueChange={setNewStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(statusConfig).map(([key, config]) => (
                        <SelectItem key={key} value={key}>{config.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Notes</label>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ajouter des notes sur ce lead..."
                    rows={4}
                  />
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    onClick={() => updateLeadStatus(selectedLead.id, newStatus, notes)}
                    className="flex-1"
                  >
                    Sauvegarder
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedLead(null)}
                    className="flex-1"
                  >
                    Annuler
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}