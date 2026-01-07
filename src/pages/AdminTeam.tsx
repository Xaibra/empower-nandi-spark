import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Users,
  Plus,
  Edit,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  Save,
  X,
  Search,
  Filter,
  CheckCircle
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  bio: string;
  achievements: string[];
  expertise: string[];
  contact: string;
  phone: string;
  image: string;
  color: string;
  isActive: boolean;
  joinDate: string;
}

const AdminTeam = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Sarah Kimutai',
      role: 'Executive Director & Co-Founder',
      department: 'Leadership',
      bio: 'A passionate community development professional with over 8 years of experience in youth and women empowerment.',
      achievements: [
        'Led organization from startup to serving 500+ beneficiaries',
        'Secured partnerships with 15+ local and international organizations',
        'Recognized as Young Leader of the Year by Nandi County Government (2022)'
      ],
      expertise: ['Community Development', 'Strategic Planning', 'Partnership Development'],
      contact: 's.kimutai@tujitume.org',
      phone: '+254725165153',
      image: '/team/sarah-kimutai.jpg',
      color: 'secondary',
      isActive: true,
      joinDate: '2018-01-15'
    },
    {
      id: '2',
      name: 'James Kosgei',
      role: 'Programs Manager',
      department: 'Operations',
      bio: 'With a background in project management and community organizing, James oversees the implementation of all Tujitume programs.',
      achievements: [
        'Successfully managed 8 concurrent programs across multiple locations',
        'Developed comprehensive M&E framework adopted by partner organizations',
        'Masters in Development Studies from University of Nairobi'
      ],
      expertise: ['Project Management', 'Monitoring & Evaluation', 'Community Mobilization'],
      contact: 'j.kosgei@tujitume.org',
      phone: '+254 720 987 654',
      image: '/team/james-kosgei.jpg',
      color: 'primary',
      isActive: true,
      joinDate: '2019-03-10'
    }
  ]);

  const [isAddingMember, setIsAddingMember] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    department: '',
    bio: '',
    contact: '',
    phone: '',
    expertise: '',
    achievements: ''
  });

  const departments = ['Leadership', 'Operations', 'Programs', 'Finance', 'Communications'];
  const colors = ['primary', 'secondary', 'accent', 'community'];

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || member.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  const handleAddMember = () => {
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: formData.name,
      role: formData.role,
      department: formData.department,
      bio: formData.bio,
      contact: formData.contact,
      phone: formData.phone,
      expertise: formData.expertise.split(',').map(s => s.trim()),
      achievements: formData.achievements.split('\n').filter(a => a.trim()),
      image: '/team/default-avatar.jpg',
      color: colors[Math.floor(Math.random() * colors.length)],
      isActive: true,
      joinDate: new Date().toISOString().split('T')[0]
    };

    setTeamMembers([...teamMembers, newMember]);
    setIsAddingMember(false);
    resetForm();
  };

  const handleEditMember = (member: TeamMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      role: member.role,
      department: member.department,
      bio: member.bio,
      contact: member.contact,
      phone: member.phone,
      expertise: member.expertise.join(', '),
      achievements: member.achievements.join('\n')
    });
  };

  const handleUpdateMember = () => {
    if (!editingMember) return;

    const updatedMember: TeamMember = {
      ...editingMember,
      name: formData.name,
      role: formData.role,
      department: formData.department,
      bio: formData.bio,
      contact: formData.contact,
      phone: formData.phone,
      expertise: formData.expertise.split(',').map(s => s.trim()),
      achievements: formData.achievements.split('\n').filter(a => a.trim())
    };

    setTeamMembers(teamMembers.map(member => 
      member.id === editingMember.id ? updatedMember : member
    ));
    setEditingMember(null);
    resetForm();
  };

  const handleDeleteMember = (id: string) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      role: '',
      department: '',
      bio: '',
      contact: '',
      phone: '',
      expertise: '',
      achievements: ''
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team Management</h1>
          <p className="text-gray-600">Manage your team members and their profiles</p>
        </div>
        <Button onClick={() => setIsAddingMember(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Team Member
        </Button>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search team members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <Card key={member.id} className="group hover:shadow-lg transition-all duration-200">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-brand rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <CardDescription className="text-sm">{member.role}</CardDescription>
                  </div>
                </div>
                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditMember(member)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteMember(member.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="secondary">{member.department}</Badge>
                {member.isActive && (
                  <Badge variant="default" className="bg-green-500">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Active
                  </Badge>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 line-clamp-3">{member.bio}</p>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="truncate">{member.contact}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>{member.phone}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>Joined {new Date(member.joinDate).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-700">Expertise:</div>
                <div className="flex flex-wrap gap-1">
                  {member.expertise.slice(0, 3).map((skill, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {member.expertise.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{member.expertise.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No team members found</h3>
            <p className="text-muted-foreground">
              {searchQuery || departmentFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Get started by adding your first team member.'}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Add Member Dialog */}
      <Dialog open={isAddingMember} onOpenChange={setIsAddingMember}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Team Member</DialogTitle>
            <DialogDescription>
              Fill in the details to add a new team member to your organization.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <Label htmlFor="role">Role/Position</Label>
                <Input
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  placeholder="Enter role or position"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="department">Department</Label>
              <Select value={formData.department} onValueChange={(value) => setFormData({...formData, department: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contact">Email Address</Label>
                <Input
                  id="contact"
                  type="email"
                  value={formData.contact}
                  onChange={(e) => setFormData({...formData, contact: e.target.value})}
                  placeholder="email@tujitume.org"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="+254 xxx xxx xxx"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="bio">Biography</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                placeholder="Brief biography and background..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="expertise">Areas of Expertise</Label>
              <Input
                id="expertise"
                value={formData.expertise}
                onChange={(e) => setFormData({...formData, expertise: e.target.value})}
                placeholder="Separate with commas: Leadership, Management, etc."
              />
            </div>

            <div>
              <Label htmlFor="achievements">Key Achievements</Label>
              <Textarea
                id="achievements"
                value={formData.achievements}
                onChange={(e) => setFormData({...formData, achievements: e.target.value})}
                placeholder="Enter each achievement on a new line..."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingMember(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddMember} disabled={!formData.name || !formData.role}>
              <Save className="h-4 w-4 mr-2" />
              Add Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Member Dialog */}
      <Dialog open={!!editingMember} onOpenChange={(open) => !open && setEditingMember(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Team Member</DialogTitle>
            <DialogDescription>
              Update the team member information.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-name">Full Name</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <Label htmlFor="edit-role">Role/Position</Label>
                <Input
                  id="edit-role"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  placeholder="Enter role or position"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="edit-department">Department</Label>
              <Select value={formData.department} onValueChange={(value) => setFormData({...formData, department: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-contact">Email Address</Label>
                <Input
                  id="edit-contact"
                  type="email"
                  value={formData.contact}
                  onChange={(e) => setFormData({...formData, contact: e.target.value})}
                  placeholder="email@tujitume.org"
                />
              </div>
              <div>
                <Label htmlFor="edit-phone">Phone Number</Label>
                <Input
                  id="edit-phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="+254 xxx xxx xxx"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="edit-bio">Biography</Label>
              <Textarea
                id="edit-bio"
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                placeholder="Brief biography and background..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="edit-expertise">Areas of Expertise</Label>
              <Input
                id="edit-expertise"
                value={formData.expertise}
                onChange={(e) => setFormData({...formData, expertise: e.target.value})}
                placeholder="Separate with commas: Leadership, Management, etc."
              />
            </div>

            <div>
              <Label htmlFor="edit-achievements">Key Achievements</Label>
              <Textarea
                id="edit-achievements"
                value={formData.achievements}
                onChange={(e) => setFormData({...formData, achievements: e.target.value})}
                placeholder="Enter each achievement on a new line..."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingMember(null)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateMember}>
              <Save className="h-4 w-4 mr-2" />
              Update Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminTeam;
