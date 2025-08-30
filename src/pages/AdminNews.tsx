import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  FileText,
  Calendar,
  Plus,
  Edit,
  Trash2,
  Eye,
  Save,
  Search,
  Filter,
  Clock,
  Users,
  MapPin,
  Tag,
  Image as ImageIcon,
  Video,
  Award,
  Heart,
  BookOpen
} from 'lucide-react';

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  type: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  featured: boolean;
  views: number;
  shares: number;
  image: string;
  status: 'draft' | 'published' | 'scheduled';
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: string;
  participants: number;
  status: 'upcoming' | 'ongoing' | 'completed';
  registrationOpen: boolean;
}

const AdminNews = () => {
  const [activeTab, setActiveTab] = useState('articles');
  const [isAddingArticle, setIsAddingArticle] = useState(false);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const [articles, setArticles] = useState<NewsArticle[]>([
    {
      id: '1',
      title: '500 Youth Graduated from Digital Skills Program',
      excerpt: 'Our largest cohort yet completes comprehensive digital literacy training, with 90% securing employment or starting digital businesses within 6 months.',
      content: 'Full article content would go here...',
      category: 'achievements',
      type: 'article',
      author: 'Sarah Kimutai',
      date: '2024-08-15',
      readTime: '4 min',
      tags: ['Digital Skills', 'Youth Employment', 'Success Story'],
      featured: true,
      views: 1250,
      shares: 45,
      image: '/news/digital-skills-graduation.jpg',
      status: 'published'
    },
    {
      id: '2',
      title: 'New Partnership with Mastercard Foundation Launched',
      excerpt: 'USD 25,000 funding secured to expand youth entrepreneurship programs across 3 additional sub-counties in Nandi County.',
      content: 'Full article content would go here...',
      category: 'programs',
      type: 'announcement',
      author: 'James Kosgei',
      date: '2024-08-10',
      readTime: '3 min',
      tags: ['Partnership', 'Funding', 'Youth Entrepreneurship'],
      featured: false,
      views: 890,
      shares: 32,
      image: '/news/mastercard-partnership.jpg',
      status: 'published'
    }
  ]);

  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Women\'s Economic Empowerment Workshop',
      description: 'Join us for a comprehensive workshop on economic empowerment strategies for women in Nandi County.',
      date: '2024-09-15',
      time: '9:00 AM',
      location: 'Kapsabet Community Center',
      type: 'Workshop',
      participants: 50,
      status: 'upcoming',
      registrationOpen: true
    },
    {
      id: '2',
      title: 'Digital Skills Bootcamp Registration Opens',
      description: 'Registration opens for our intensive 6-week digital skills training program.',
      date: '2024-09-20',
      time: '8:00 AM',
      location: 'Online Registration',
      type: 'Registration',
      participants: 100,
      status: 'upcoming',
      registrationOpen: true
    }
  ]);

  const [articleForm, setArticleForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    type: '',
    author: '',
    readTime: '',
    tags: '',
    featured: false
  });

  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    type: '',
    participants: '',
    registrationOpen: true
  });

  const categories = [
    { id: 'all', label: 'All Categories', icon: BookOpen },
    { id: 'programs', label: 'Program Updates', icon: Users },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'community', label: 'Community Stories', icon: Heart }
  ];

  const articleTypes = ['article', 'announcement', 'story', 'award', 'video'];
  const eventTypes = ['Workshop', 'Registration', 'Health Fair', 'Training', 'Meeting', 'Conference'];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || article.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleAddArticle = () => {
    const newArticle: NewsArticle = {
      id: Date.now().toString(),
      title: articleForm.title,
      excerpt: articleForm.excerpt,
      content: articleForm.content,
      category: articleForm.category,
      type: articleForm.type,
      author: articleForm.author,
      date: new Date().toISOString().split('T')[0],
      readTime: articleForm.readTime,
      tags: articleForm.tags.split(',').map(t => t.trim()),
      featured: articleForm.featured,
      views: 0,
      shares: 0,
      image: '/news/default-article.jpg',
      status: 'draft'
    };

    setArticles([...articles, newArticle]);
    setIsAddingArticle(false);
    resetArticleForm();
  };

  const handleAddEvent = () => {
    const newEvent: Event = {
      id: Date.now().toString(),
      title: eventForm.title,
      description: eventForm.description,
      date: eventForm.date,
      time: eventForm.time,
      location: eventForm.location,
      type: eventForm.type,
      participants: parseInt(eventForm.participants),
      status: 'upcoming',
      registrationOpen: eventForm.registrationOpen
    };

    setEvents([...events, newEvent]);
    setIsAddingEvent(false);
    resetEventForm();
  };

  const resetArticleForm = () => {
    setArticleForm({
      title: '',
      excerpt: '',
      content: '',
      category: '',
      type: '',
      author: '',
      readTime: '',
      tags: '',
      featured: false
    });
  };

  const resetEventForm = () => {
    setEventForm({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      type: '',
      participants: '',
      registrationOpen: true
    });
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'video': return Video;
      case 'event': return Calendar;
      case 'story': return Heart;
      case 'award': return Award;
      default: return FileText;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">News & Events Management</h1>
          <p className="text-gray-600">Manage articles, announcements, and upcoming events</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="articles" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Articles & News
          </TabsTrigger>
          <TabsTrigger value="events" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Events
          </TabsTrigger>
        </TabsList>

        <TabsContent value="articles" className="space-y-6">
          {/* Articles Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Total: {articles.length}</span>
                <span>•</span>
                <span>Published: {articles.filter(a => a.status === 'published').length}</span>
                <span>•</span>
                <span>Drafts: {articles.filter(a => a.status === 'draft').length}</span>
              </div>
            </div>
            <Button onClick={() => setIsAddingArticle(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Article
            </Button>
          </div>

          {/* Search and Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search articles..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => {
              const TypeIcon = getTypeIcon(article.type);
              return (
                <Card key={article.id} className="group hover:shadow-lg transition-all duration-200">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-brand rounded-full flex items-center justify-center">
                          <TypeIcon className="h-4 w-4 text-white" />
                        </div>
                        {article.featured && (
                          <Badge variant="secondary" className="text-xs">Featured</Badge>
                        )}
                        <Badge variant={article.status === 'published' ? 'default' : 'outline'} className="text-xs">
                          {article.status}
                        </Badge>
                      </div>
                      <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
                    <CardDescription className="text-sm line-clamp-2">{article.excerpt}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-1">
                      {article.tags.slice(0, 2).map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                      {article.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{article.tags.length - 2} more
                        </Badge>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {article.readTime}
                      </div>
                      <div className="flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        {article.views}
                      </div>
                    </div>

                    <div className="text-xs text-gray-500">
                      By {article.author} • {new Date(article.date).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          {/* Events Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Total: {events.length}</span>
                <span>•</span>
                <span>Upcoming: {events.filter(e => e.status === 'upcoming').length}</span>
                <span>•</span>
                <span>Registration Open: {events.filter(e => e.registrationOpen).length}</span>
              </div>
            </div>
            <Button onClick={() => setIsAddingEvent(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </Button>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Card key={event.id} className="group hover:shadow-lg transition-all duration-200">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-community rounded-full flex items-center justify-center">
                        <Calendar className="h-4 w-4 text-white" />
                      </div>
                      <Badge variant={event.status === 'upcoming' ? 'default' : 'secondary'} className="text-xs">
                        {event.status}
                      </Badge>
                      {event.registrationOpen && (
                        <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                          Registration Open
                        </Badge>
                      )}
                    </div>
                    <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{event.title}</CardTitle>
                  <CardDescription className="text-sm line-clamp-2">{event.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2 text-secondary" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2 text-secondary" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-secondary" />
                      <span className="truncate">{event.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="h-4 w-4 mr-2 text-secondary" />
                      <span>{event.participants} participants expected</span>
                    </div>
                  </div>

                  <Badge variant="outline" className="text-xs">
                    {event.type}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Article Dialog */}
      <Dialog open={isAddingArticle} onOpenChange={setIsAddingArticle}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Article</DialogTitle>
            <DialogDescription>
              Create a new article or news announcement for your website.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="article-title">Article Title</Label>
              <Input
                id="article-title"
                value={articleForm.title}
                onChange={(e) => setArticleForm({...articleForm, title: e.target.value})}
                placeholder="Enter article title"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="article-category">Category</Label>
                <Select value={articleForm.category} onValueChange={(value) => setArticleForm({...articleForm, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.slice(1).map((category) => (
                      <SelectItem key={category.id} value={category.id}>{category.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="article-type">Type</Label>
                <Select value={articleForm.type} onValueChange={(value) => setArticleForm({...articleForm, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {articleTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="article-excerpt">Excerpt</Label>
              <Textarea
                id="article-excerpt"
                value={articleForm.excerpt}
                onChange={(e) => setArticleForm({...articleForm, excerpt: e.target.value})}
                placeholder="Brief summary of the article"
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="article-content">Content</Label>
              <Textarea
                id="article-content"
                value={articleForm.content}
                onChange={(e) => setArticleForm({...articleForm, content: e.target.value})}
                placeholder="Full article content"
                rows={6}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="article-author">Author</Label>
                <Input
                  id="article-author"
                  value={articleForm.author}
                  onChange={(e) => setArticleForm({...articleForm, author: e.target.value})}
                  placeholder="Author name"
                />
              </div>
              <div>
                <Label htmlFor="article-readtime">Read Time</Label>
                <Input
                  id="article-readtime"
                  value={articleForm.readTime}
                  onChange={(e) => setArticleForm({...articleForm, readTime: e.target.value})}
                  placeholder="e.g., 5 min"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="article-tags">Tags</Label>
              <Input
                id="article-tags"
                value={articleForm.tags}
                onChange={(e) => setArticleForm({...articleForm, tags: e.target.value})}
                placeholder="Separate tags with commas"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="article-featured"
                checked={articleForm.featured}
                onChange={(e) => setArticleForm({...articleForm, featured: e.target.checked})}
                className="rounded"
              />
              <Label htmlFor="article-featured">Featured article</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingArticle(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddArticle} disabled={!articleForm.title || !articleForm.excerpt}>
              <Save className="h-4 w-4 mr-2" />
              Add Article
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Event Dialog */}
      <Dialog open={isAddingEvent} onOpenChange={setIsAddingEvent}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
            <DialogDescription>
              Create a new event for your community calendar.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="event-title">Event Title</Label>
              <Input
                id="event-title"
                value={eventForm.title}
                onChange={(e) => setEventForm({...eventForm, title: e.target.value})}
                placeholder="Enter event title"
              />
            </div>

            <div>
              <Label htmlFor="event-description">Description</Label>
              <Textarea
                id="event-description"
                value={eventForm.description}
                onChange={(e) => setEventForm({...eventForm, description: e.target.value})}
                placeholder="Event description"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="event-date">Date</Label>
                <Input
                  id="event-date"
                  type="date"
                  value={eventForm.date}
                  onChange={(e) => setEventForm({...eventForm, date: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="event-time">Time</Label>
                <Input
                  id="event-time"
                  value={eventForm.time}
                  onChange={(e) => setEventForm({...eventForm, time: e.target.value})}
                  placeholder="e.g., 9:00 AM"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="event-location">Location</Label>
              <Input
                id="event-location"
                value={eventForm.location}
                onChange={(e) => setEventForm({...eventForm, location: e.target.value})}
                placeholder="Event location"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="event-type">Event Type</Label>
                <Select value={eventForm.type} onValueChange={(value) => setEventForm({...eventForm, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="event-participants">Expected Participants</Label>
                <Input
                  id="event-participants"
                  type="number"
                  value={eventForm.participants}
                  onChange={(e) => setEventForm({...eventForm, participants: e.target.value})}
                  placeholder="Number of participants"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="event-registration"
                checked={eventForm.registrationOpen}
                onChange={(e) => setEventForm({...eventForm, registrationOpen: e.target.checked})}
                className="rounded"
              />
              <Label htmlFor="event-registration">Registration open</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingEvent(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddEvent} disabled={!eventForm.title || !eventForm.date}>
              <Save className="h-4 w-4 mr-2" />
              Add Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminNews;
