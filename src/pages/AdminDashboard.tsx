import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  FileText,
  Handshake,
  Quote,
  TrendingUp,
  Calendar,
  Eye,
  Plus,
  ArrowUpRight,
  Activity,
  Award,
  Clock
} from 'lucide-react';

const AdminDashboard = () => {
  // Demo data - in real app, this would come from your API
  const stats = [
    {
      title: 'Total Team Members',
      value: '15',
      change: '+2 this month',
      changeType: 'positive' as const,
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Published Articles',
      value: '48',
      change: '+6 this month',
      changeType: 'positive' as const,
      icon: FileText,
      color: 'bg-green-500'
    },
    {
      title: 'Active Partnerships',
      value: '12',
      change: '+1 this month',
      changeType: 'positive' as const,
      icon: Handshake,
      color: 'bg-purple-500'
    },
    {
      title: 'Success Stories',
      value: '32',
      change: '+4 this month',
      changeType: 'positive' as const,
      icon: Quote,
      color: 'bg-orange-500'
    }
  ];

  const recentActivities = [
    {
      id: '1',
      action: 'Added new team member',
      target: 'Grace Chepkemoi',
      time: '2 hours ago',
      type: 'team'
    },
    {
      id: '2',
      action: 'Published news article',
      target: '500 Youth Graduated from Digital Skills Program',
      time: '1 day ago',
      type: 'news'
    },
    {
      id: '3',
      action: 'Updated partnership',
      target: 'UN Women Kenya',
      time: '2 days ago',
      type: 'partnership'
    },
    {
      id: '4',
      action: 'Added testimonial',
      target: 'Mary Chebet Success Story',
      time: '3 days ago',
      type: 'testimonial'
    }
  ];

  const upcomingEvents = [
    {
      id: '1',
      title: 'Women\'s Economic Empowerment Workshop',
      date: '2025-09-15',
      type: 'Workshop',
      participants: 50
    },
    {
      id: '2',
      title: 'Digital Skills Bootcamp Registration Opens',
      date: '2025-09-20',
      type: 'Registration',
      participants: 100
    },
    {
      id: '3',
      title: 'Community Health Fair',
      date: '2025-09-25',
      type: 'Health Fair',
      participants: 300
    }
  ];

  const quickActions = [
    {
      title: 'Add Team Member',
      description: 'Create a new team profile',
      href: '/admin/team/new',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Create News Article',
      description: 'Publish a new article',
      href: '/admin/news/new',
      icon: FileText,
      color: 'bg-green-500'
    },
    {
      title: 'Add Partnership',
      description: 'Register new partner',
      href: '/admin/partnerships/new',
      icon: Handshake,
      color: 'bg-purple-500'
    },
    {
      title: 'New Testimonial',
      description: 'Add success story',
      href: '/admin/testimonials/new',
      icon: Quote,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2">Welcome to Admin Dashboard</h1>
        <p className="text-white/90">
          Manage your website content, team members, and organizational information from this central hub.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <h3 className="text-2xl font-bold">{stat.value}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {stat.change}
                      </Badge>
                    </div>
                  </div>
                  <div className={`p-3 rounded-full ${stat.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Activities
                </CardTitle>
                <CardDescription>Latest changes to your website content</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {activity.action}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">
                      {activity.target}
                    </p>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Events
                </CardTitle>
                <CardDescription>Events scheduled in your calendar</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Add Event
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="text-sm font-medium">{event.title}</p>
                    <div className="flex items-center space-x-4 mt-1 text-xs text-muted-foreground">
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                      <Badge variant="outline" className="text-xs">{event.type}</Badge>
                      <span>{event.participants} participants</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Quick Actions
          </CardTitle>
          <CardDescription>
            Common tasks to manage your website content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-start space-y-2 hover:shadow-md transition-all"
                  asChild
                >
                  <a href={action.href}>
                    <div className={`p-2 rounded-lg ${action.color}`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-sm">{action.title}</div>
                      <div className="text-xs text-muted-foreground">{action.description}</div>
                    </div>
                  </a>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Website Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Website Traffic
            </CardTitle>
            <CardDescription>Visitor statistics for this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Page Views</span>
                <span className="font-semibold">12,543</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Unique Visitors</span>
                <span className="font-semibold">8,721</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Bounce Rate</span>
                <span className="font-semibold">32%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Avg. Session Duration</span>
                <span className="font-semibold">4:32</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Content Status
            </CardTitle>
            <CardDescription>Overview of your content library</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Published Articles</span>
                <Badge variant="default">48</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Draft Articles</span>
                <Badge variant="secondary">6</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Scheduled Events</span>
                <Badge variant="outline">12</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Active Testimonials</span>
                <Badge variant="default">32</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
