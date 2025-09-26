'use client'

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

// Define types for our data
interface Project {
  id: string;
  name: string;
}

interface Workflow {
  id: string;
  name: string;
}

export default function WorkflowView() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [newProjectName, setNewProjectName] = useState('');
  const [newWorkflowName, setNewWorkflowName] = useState('');

  // Fetch projects on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch('/api/projects');
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    };
    fetchProjects();
  }, []);

  // Fetch workflows when a project is selected
  useEffect(() => {
    if (selectedProject) {
      const fetchWorkflows = async () => {
        const response = await fetch(`/api/workflows?project_id=${selectedProject.id}`);
        if (response.ok) {
          const data = await response.json();
          setWorkflows(data);
        } else {
          setWorkflows([]);
        }
      };
      fetchWorkflows();
    }
  }, [selectedProject]);

  const handleCreateProject = async () => {
    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newProjectName }),
    });
    if (response.ok) {
      const newProject = await response.json();
      setProjects([...projects, newProject]);
      setNewProjectName('');
    }
  };

  const handleCreateWorkflow = async () => {
    if (!selectedProject) return;
    const response = await fetch('/api/workflows', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newWorkflowName, project_id: selectedProject.id }),
    });
    if (response.ok) {
      const newWorkflow = await response.json();
      setWorkflows([...workflows, newWorkflow]);
      setNewWorkflowName('');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {/* Projects Column */}
      <Card>
        <CardHeader>
          <CardTitle>Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 mb-4">
            <Input
              placeholder="New project name..."
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
            />
            <Button onClick={handleCreateProject}>Create</Button>
          </div>
          <ul className="space-y-2">
            {projects.map((project) => (
              <li key={project.id}>
                <Button
                  variant={selectedProject?.id === project.id ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setSelectedProject(project)}
                >
                  {project.name}
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Workflows Column */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Workflows {selectedProject ? `in ${selectedProject.name}` : ''}</CardTitle>
        </CardHeader>
        <CardContent>
          {selectedProject && (
            <div className="flex space-x-2 mb-4">
              <Input
                placeholder="New workflow name..."
                value={newWorkflowName}
                onChange={(e) => setNewWorkflowName(e.target.value)}
              />
              <Button onClick={handleCreateWorkflow}>Create</Button>
            </div>
          )}
          {selectedProject ? (
            <ul className="space-y-2">
              {workflows.map((workflow) => (
                <li key={workflow.id} className="p-2 border rounded">
                  {workflow.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">Select a project to see its workflows.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
