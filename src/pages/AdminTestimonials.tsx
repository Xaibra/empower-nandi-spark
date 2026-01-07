import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Quote, Plus, Edit, Trash2, MapPin, Calendar, Award, Star, Save } from 'lucide-react';
import { useData, Testimonial } from '@/contexts/DataContext';

const AdminTestimonials = () => {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useData();

  const [isAdding, setIsAdding] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);

  const [form, setForm] = useState({
    name: '',
    age: '',
    location: '',
    program: '',
    role: '',
    quote: '',
    story: '',
    impact: '',
    image: '',
    video: '',
    featured: true
  });

  const resetForm = () => {
    setForm({
      name: '',
      age: '',
      location: '',
      program: '',
      role: '',
      quote: '',
      story: '',
      impact: '',
      image: '',
      video: '',
      featured: true
    });
  };

  const openCreate = () => {
    resetForm();
    setIsAdding(true);
  };

  const openEdit = (item: Testimonial) => {
    setEditing(item);
    setForm({
      name: item.name,
      age: String(item.age),
      location: item.location,
      program: item.program,
      role: item.role,
      quote: item.quote,
      story: item.story,
      impact: item.impact,
      image: item.image,
      video: item.video,
      featured: item.featured
    });
  };

  const handleSaveCreate = () => {
    addTestimonial({
      name: form.name,
      age: Number(form.age) || 0,
      location: form.location,
      program: form.program,
      role: form.role,
      quote: form.quote,
      story: form.story,
      impact: form.impact,
      image: form.image || '/testimonials/default.jpg',
      video: form.video || '',
      featured: form.featured
    });
    setIsAdding(false);
    resetForm();
  };

  const handleSaveEdit = () => {
    if (!editing) return;
    updateTestimonial(editing.id, {
      name: form.name,
      age: Number(form.age) || 0,
      location: form.location,
      program: form.program,
      role: form.role,
      quote: form.quote,
      story: form.story,
      impact: form.impact,
      image: form.image,
      video: form.video,
      featured: form.featured
    });
    setEditing(null);
    resetForm();
  };

  const toggleFeatured = (item: Testimonial) => {
    updateTestimonial(item.id, { featured: !item.featured });
  };

  const featured = testimonials.filter((t) => t.featured);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Testimonials</h1>
          <p className="text-gray-600">Manage impact stories displayed on the public site</p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Add Testimonial
        </Button>
      </div>

      {featured.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Featured Testimonials
            </CardTitle>
            <CardDescription>These stories rotate in the homepage "Voices of Transformation" section.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featured.map((t) => (
                <Card key={t.id} className="border-yellow-200 bg-yellow-50/60">
                  <CardContent className="p-4 space-y-3">
                    <Quote className="h-5 w-5 text-yellow-500" />
                    <p className="text-sm text-gray-800 line-clamp-4">"{t.quote}"</p>
                    <div className="text-xs text-gray-600 space-y-1">
                      <div className="font-semibold">{t.name}</div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{t.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="h-3 w-3" />
                        <span>{t.program}</span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full"
                      onClick={() => toggleFeatured(t)}
                    >
                      Remove from featured
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>All Testimonials</CardTitle>
          <CardDescription>Every story here can be shown on the public testimonials section.</CardDescription>
        </CardHeader>
        <CardContent>
          {testimonials.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No testimonials saved yet. Add your first success story to showcase impact.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {testimonials.map((t) => (
                <Card key={t.id} className="group hover:shadow-md transition-all duration-200">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-primary mb-1">{t.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {t.age} years • {t.role}
                        </p>
                      </div>
                      {t.featured && <Badge variant="secondary" className="text-xs">Featured</Badge>}
                    </div>

                    <p className="text-xs text-muted-foreground line-clamp-3">"{t.quote}"</p>

                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{t.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{t.program}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="h-3 w-3" />
                        <span>{t.impact}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs"
                        onClick={() => toggleFeatured(t)}
                      >
                        {t.featured ? 'Unfeature' : 'Mark as featured'}
                      </Button>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => openEdit(t)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-red-600 hover:text-red-800"
                          onClick={() => deleteTestimonial(t.id)}
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
            <DialogTitle>Add Testimonial</DialogTitle>
            <DialogDescription>Short, specific stories work best on the public site.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Beneficiary name"
                />
              </div>
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={form.age}
                  onChange={(e) => setForm({ ...form, age: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  placeholder="e.g. Kapsabet, Nandi County"
                />
              </div>
              <div>
                <Label htmlFor="program">Program</Label>
                <Input
                  id="program"
                  value={form.program}
                  onChange={(e) => setForm({ ...form, program: e.target.value })}
                  placeholder="Program name"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                placeholder="e.g. Small Business Owner"
              />
            </div>

            <div>
              <Label htmlFor="quote">Short quote</Label>
              <Textarea
                id="quote"
                rows={2}
                value={form.quote}
                onChange={(e) => setForm({ ...form, quote: e.target.value })}
                placeholder="One or two sentences that capture the transformation"
              />
            </div>

            <div>
              <Label htmlFor="story">Full story (optional)</Label>
              <Textarea
                id="story"
                rows={4}
                value={form.story}
                onChange={(e) => setForm({ ...form, story: e.target.value })}
                placeholder="Optional longer description of their journey"
              />
            </div>

            <div>
              <Label htmlFor="impact">Impact summary</Label>
              <Textarea
                id="impact"
                rows={2}
                value={form.impact}
                onChange={(e) => setForm({ ...form, impact: e.target.value })}
                placeholder="Key change e.g. income increase, education, safety"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="image">Image URL (optional)</Label>
                <Input
                  id="image"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="video">Video URL (optional)</Label>
                <Input
                  id="video"
                  value={form.video}
                  onChange={(e) => setForm({ ...form, video: e.target.value })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAdding(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveCreate}
              disabled={!form.name || !form.age || !form.quote}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Testimonial
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit dialog */}
      <Dialog open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Testimonial</DialogTitle>
            <DialogDescription>Update how this story appears on the website.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-age">Age</Label>
                <Input
                  id="edit-age"
                  type="number"
                  value={form.age}
                  onChange={(e) => setForm({ ...form, age: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-location">Location</Label>
                <Input
                  id="edit-location"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-program">Program</Label>
                <Input
                  id="edit-program"
                  value={form.program}
                  onChange={(e) => setForm({ ...form, program: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="edit-role">Role</Label>
              <Input
                id="edit-role"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="edit-quote">Short quote</Label>
              <Textarea
                id="edit-quote"
                rows={2}
                value={form.quote}
                onChange={(e) => setForm({ ...form, quote: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="edit-story">Full story</Label>
              <Textarea
                id="edit-story"
                rows={4}
                value={form.story}
                onChange={(e) => setForm({ ...form, story: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="edit-impact">Impact summary</Label>
              <Textarea
                id="edit-impact"
                rows={2}
                value={form.impact}
                onChange={(e) => setForm({ ...form, impact: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-image">Image URL</Label>
                <Input
                  id="edit-image"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-video">Video URL</Label>
                <Input
                  id="edit-video"
                  value={form.video}
                  onChange={(e) => setForm({ ...form, video: e.target.value })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit} disabled={!form.name || !form.age || !form.quote}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminTestimonials;
