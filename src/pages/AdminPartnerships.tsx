import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Handshake, Plus, Edit, Trash2, Globe, Calendar, DollarSign, Target, Save } from 'lucide-react';
import { useData, Partnership } from '@/contexts/DataContext';

const AdminPartnerships = () => {
  const { partnerships, addPartnership, updatePartnership, deletePartnership } = useData();

  const [isAdding, setIsAdding] = useState(false);
  const [editing, setEditing] = useState<Partnership | null>(null);

  const [form, setForm] = useState({
    name: '',
    category: '',
    type: '',
    partnership: '',
    focus: '',
    contribution: '',
    impact: '',
    logo: '',
    website: '',
    status: 'active'
  });

  const resetForm = () => {
    setForm({
      name: '',
      category: '',
      type: '',
      partnership: '',
      focus: '',
      contribution: '',
      impact: '',
      logo: '',
      website: '',
      status: 'active'
    });
  };

  const openCreate = () => {
    resetForm();
    setIsAdding(true);
  };

  const openEdit = (item: Partnership) => {
    setEditing(item);
    setForm({
      name: item.name,
      category: item.category,
      type: item.type,
      partnership: item.partnership,
      focus: item.focus,
      contribution: item.contribution,
      impact: item.impact,
      logo: item.logo,
      website: item.website,
      status: item.status
    });
  };

  const handleSaveCreate = () => {
    addPartnership(form);
    setIsAdding(false);
    resetForm();
  };

  const handleSaveEdit = () => {
    if (!editing) return;
    updatePartnership(editing.id, form);
    setEditing(null);
    resetForm();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Partnerships</h1>
          <p className="text-gray-600">Manage organizations partnering with Tujitume</p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Add Partnership
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Handshake className="h-5 w-5" />
            Active Partnerships
          </CardTitle>
          <CardDescription>
            These partners are displayed on the public Partnerships section of the website.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {partnerships.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No partnerships saved yet. Click "Add Partnership" to create your first record.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {partnerships.map((partner) => (
                <Card key={partner.id} className="group hover:shadow-md transition-all duration-200">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-primary mb-1">{partner.name}</h3>
                        <p className="text-xs text-muted-foreground">{partner.type}</p>
                      </div>
                      <Badge variant={partner.status === 'active' ? 'default' : 'secondary'} className="text-xs capitalize">
                        {partner.status}
                      </Badge>
                    </div>

                    <p className="text-xs text-muted-foreground line-clamp-3">{partner.focus}</p>

                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{partner.partnership}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        <span>{partner.contribution}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Target className="h-3 w-3" />
                        <span>{partner.impact}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <Badge variant="outline" className="text-xs capitalize">
                        {partner.category}
                      </Badge>
                      <div className="flex items-center gap-1">
                        {partner.website && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => window.open(partner.website, '_blank')}
                          >
                            <Globe className="h-3 w-3" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => openEdit(partner)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-red-600 hover:text-red-800"
                          onClick={() => deletePartnership(partner.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create dialog */}
      <Dialog open={isAdding} onOpenChange={(open) => !open && setIsAdding(false)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Partnership</DialogTitle>
            <DialogDescription>These details will appear on the public Partnerships section.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Partner name</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. UN Women Kenya"
                />
              </div>
              <div>
                <Label htmlFor="type">Partner type</Label>
                <Input
                  id="type"
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  placeholder="e.g. International NGO"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={form.category}
                  onValueChange={(value) => setForm({ ...form, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="funding">Funding</SelectItem>
                    <SelectItem value="implementing">Implementation</SelectItem>
                    <SelectItem value="government">Government</SelectItem>
                    <SelectItem value="community">Community</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={form.status}
                  onValueChange={(value) => setForm({ ...form, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="partnership">Partnership period</Label>
                <Input
                  id="partnership"
                  value={form.partnership}
                  onChange={(e) => setForm({ ...form, partnership: e.target.value })}
                  placeholder="e.g. 2025 - Present"
                />
              </div>
              <div>
                <Label htmlFor="website">Website (optional)</Label>
                <Input
                  id="website"
                  value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                  placeholder="https://"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="focus">Focus area</Label>
              <Textarea
                id="focus"
                rows={2}
                value={form.focus}
                onChange={(e) => setForm({ ...form, focus: e.target.value })}
                placeholder="What this partnership focuses on"
              />
            </div>

            <div>
              <Label htmlFor="contribution">Contribution</Label>
              <Textarea
                id="contribution"
                rows={2}
                value={form.contribution}
                onChange={(e) => setForm({ ...form, contribution: e.target.value })}
                placeholder="Funding, technical support, venues, etc."
              />
            </div>

            <div>
              <Label htmlFor="impact">Impact</Label>
              <Textarea
                id="impact"
                rows={2}
                value={form.impact}
                onChange={(e) => setForm({ ...form, impact: e.target.value })}
                placeholder="Key impact e.g. number of beneficiaries reached"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAdding(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveCreate}
              disabled={!form.name || !form.type || !form.category}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Partnership
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit dialog */}
      <Dialog open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Partnership</DialogTitle>
            <DialogDescription>Update how this partner appears on the site.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-name">Partner name</Label>
                <Input
                  id="edit-name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-type">Partner type</Label>
                <Input
                  id="edit-type"
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-category">Category</Label>
                <Select
                  value={form.category}
                  onValueChange={(value) => setForm({ ...form, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="funding">Funding</SelectItem>
                    <SelectItem value="implementing">Implementation</SelectItem>
                    <SelectItem value="government">Government</SelectItem>
                    <SelectItem value="community">Community</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-status">Status</Label>
                <Select
                  value={form.status}
                  onValueChange={(value) => setForm({ ...form, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-partnership">Partnership period</Label>
                <Input
                  id="edit-partnership"
                  value={form.partnership}
                  onChange={(e) => setForm({ ...form, partnership: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-website">Website</Label>
                <Input
                  id="edit-website"
                  value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="edit-focus">Focus area</Label>
              <Textarea
                id="edit-focus"
                rows={2}
                value={form.focus}
                onChange={(e) => setForm({ ...form, focus: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="edit-contribution">Contribution</Label>
              <Textarea
                id="edit-contribution"
                rows={2}
                value={form.contribution}
                onChange={(e) => setForm({ ...form, contribution: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="edit-impact">Impact</Label>
              <Textarea
                id="edit-impact"
                rows={2}
                value={form.impact}
                onChange={(e) => setForm({ ...form, impact: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit} disabled={!form.name || !form.type || !form.category}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPartnerships;
