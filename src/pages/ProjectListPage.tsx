// @ts-nocheck
import { useState } from 'react';
import { Plus, Search, Calendar, DollarSign, Users, TrendingUp, Eye, MoreVertical } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { StatusBadge } from '../widgets/StatusBadge';
import { mockProjects } from '../data/mockProjects';
import { cn } from '../components/ui/utils';

interface ProjectListPageProps {
  onViewProject?: (projectId: string) => void;
}

export function ProjectListPage({ onViewProject }: ProjectListPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = 
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: mockProjects.length,
    active: mockProjects.filter(p => p.status === 'active').length,
    completed: mockProjects.filter(p => p.status === 'completed').length,
    onHold: mockProjects.filter(p => p.status === 'on-hold').length,
    totalBudget: mockProjects.reduce((sum, p) => sum + p.budget, 0),
    totalSpent: mockProjects.reduce((sum, p) => sum + p.spent, 0),
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      'critical': 'bg-red-100 text-red-700 border-red-200',
      'high': 'bg-orange-100 text-orange-700 border-orange-200',
      'medium': 'bg-yellow-100 text-yellow-700 border-yellow-200',
      'low': 'bg-green-100 text-green-700 border-green-200',
    };
    return colors[priority] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Projects</h1>
          <p className="text-gray-500">Track and manage company projects</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Projects</p>
              <p className="text-2xl">{stats.active}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl">{stats.completed}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Budget</p>
              <p className="text-2xl">${(stats.totalBudget / 1000).toFixed(0)}K</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Spent</p>
              <p className="text-2xl">${(stats.totalSpent / 1000).toFixed(0)}K</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={statusFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('all')}
            >
              All ({stats.total})
            </Button>
            <Button
              variant={statusFilter === 'active' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('active')}
            >
              Active ({stats.active})
            </Button>
            <Button
              variant={statusFilter === 'completed' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('completed')}
            >
              Completed ({stats.completed})
            </Button>
            <Button
              variant={statusFilter === 'planning' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('planning')}
            >
              Planning
            </Button>
          </div>
        </div>
      </Card>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.length === 0 ? (
          <Card className="p-12 text-center col-span-2">
            <p className="text-gray-500">No projects found</p>
          </Card>
        ) : (
          filteredProjects.map((project) => (
            <Card key={project.id} className="p-6 hover:shadow-lg transition-shadow">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3>{project.name}</h3>
                    <StatusBadge status={project.status} />
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{project.code}</p>
                  <p className="text-sm text-gray-700 line-clamp-2">{project.description}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onViewProject?.(project.id)}>
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Badges */}
              <div className="flex gap-2 mb-4">
                <Badge variant="outline" className={getPriorityColor(project.priority)}>
                  {project.priority}
                </Badge>
                <Badge variant="outline">{project.category}</Badge>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Progress</span>
                  <span className="text-sm">{project.progress}%</span>
                </div>
                <Progress value={project.progress} />
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Budget</p>
                  <p>${project.budget.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Spent</p>
                  <p className={project.spent > project.budget ? 'text-red-600' : 'text-green-600'}>
                    ${project.spent.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Start Date</p>
                  <p className="text-sm">{project.startDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">End Date</p>
                  <p className="text-sm">{project.endDate}</p>
                </div>
              </div>

              {/* Team & Manager */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {project.team.length} team members
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs text-blue-600">
                    {project.manager.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className="text-sm text-gray-600">{project.manager}</span>
                </div>
              </div>

              {/* View Details Button */}
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => onViewProject?.(project.id)}
              >
                View Project Details
              </Button>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
