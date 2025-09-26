'use client'

import { useState } from 'react';
import LogoutButton from './LogoutButton';
import AgentView from './AgentView';
import WorkflowView from './WorkflowView'; // Import the new component

// Noms des agents spécialisés
const agents = [
  'Frontend Pro',
  'Backend Pro',
  'Debugger',
  'Automatiser',
  'Architecte',
];

export default function Dashboard({ userEmail }: { userEmail: string }) {
  const [activeAgent, setActiveAgent] = useState('Frontend Pro');

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-60 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-start gap-4 px-4 py-5">
          <a href="#" className="flex items-center gap-2 font-semibold text-lg mb-4">
            MyAI Dev Studio
          </a>
          {agents.map((agent) => (
            <button
              key={agent}
              onClick={() => setActiveAgent(agent)}
              className={`text-left w-full transition-colors hover:text-foreground ${
                activeAgent === agent ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              {agent}
            </button>
          ))}
        </nav>
        <div className="mt-auto p-4">
          <div className="text-sm text-muted-foreground mb-2">{userEmail}</div>
          <LogoutButton />
        </div>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-64">
        <main className="flex-1 items-start">
          {activeAgent === 'Automatiser' ? (
            <WorkflowView />
          ) : (
            <AgentView agentName={activeAgent} />
          )}
        </main>
      </div>
    </div>
  );
}
