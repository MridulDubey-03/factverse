import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Filter, 
  Shield, 
  FileText, 
  CheckCircle, 
  HelpCircle, 
  Users,
  ArrowRight,
  Zap
} from 'lucide-react';

export function EcosystemDiagram({ onNodeClick }) {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);

  const nodes = [
    {
      id: 'filter',
      title: 'Filter News',
      description: 'Smart source filtering',
      icon: Filter,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20',
      position: { x: 50, y: 15 }, // Top
      connections: ['detect', 'summarize']
    },
    {
      id: 'detect',
      title: 'Detect Fake News',
      description: 'AI-powered detection',
      icon: Shield,
      color: 'text-red-500',
      bgColor: 'bg-red-50 dark:bg-red-950/20',
      position: { x: 85, y: 35 }, // Top Right
      connections: ['validate', 'feedback']
    },
    {
      id: 'summarize',
      title: 'Summarize Articles',
      description: 'Intelligent summaries',
      icon: FileText,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-950/20',
      position: { x: 85, y: 65 }, // Bottom Right
      connections: ['questions', 'validate']
    },
    {
      id: 'validate',
      title: 'Validate Facts',
      description: 'Cross-reference verification',
      icon: CheckCircle,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-950/20',
      position: { x: 50, y: 85 }, // Bottom
      connections: ['feedback', 'filter']
    },
    {
      id: 'questions',
      title: 'User Questions',
      description: 'Community Q&A',
      icon: HelpCircle,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-950/20',
      position: { x: 15, y: 65 }, // Bottom Left
      connections: ['feedback', 'filter']
    },
    {
      id: 'feedback',
      title: 'Crowd Feedback',
      description: 'Collaborative verification',
      icon: Users,
      color: 'text-teal-500',
      bgColor: 'bg-teal-50 dark:bg-teal-950/20',
      position: { x: 15, y: 35 }, // Top Left
      connections: ['questions', 'detect']
    }
  ];

  const handleNodeClick = (nodeId) => {
    setSelectedNode(nodeId);
    if (onNodeClick) onNodeClick(nodeId);
  };

  const getConnectionPath = (from, to) => {
    const fromX = from.position.x;
    const fromY = from.position.y;
    const toX = to.position.x;
    const toY = to.position.y;

    // Create a curved path between nodes
    const midX = (fromX + toX) / 2;
    const midY = (fromY + toY) / 2;
    const curve = 10; // Curve intensity

    return `M ${fromX} ${fromY} Q ${midX + curve} ${midY + curve} ${toX} ${toY}`;
  };

  const isNodeConnected = (nodeId) => {
    if (!hoveredNode) return false;
    const hoveredNodeData = nodes.find(n => n.id === hoveredNode);
    return hoveredNodeData?.connections.includes(nodeId) || nodeId === hoveredNode;
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-medium mb-2">FactVerse Ecosystem</h2>
        <p className="text-muted-foreground">
          Interconnected tools for comprehensive news verification
        </p>
      </div>

      <div className="relative w-full h-96 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_theme(colors.blue.500)_1px,_transparent_1px)] bg-[length:20px_20px]"></div>
        </div>

        {/* SVG for connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon
                points="0 0, 10 3.5, 0 7"
                fill="#94a3b8"
                className="opacity-40"
              />
            </marker>
          </defs>
          
          {/* Draw connections */}
          {nodes.map(node => 
            node.connections.map(connectionId => {
              const connectedNode = nodes.find(n => n.id === connectionId);
              if (!connectedNode) return null;
              
              const isHighlighted = isNodeConnected(node.id) || isNodeConnected(connectionId);
              
              return (
                <path
                  key={`${node.id}-${connectionId}`}
                  d={getConnectionPath(node, connectedNode)}
                  stroke={isHighlighted ? '#3b82f6' : '#94a3b8'}
                  strokeWidth={isHighlighted ? 2 : 1}
                  fill="none"
                  className={`transition-all duration-300 ${isHighlighted ? 'opacity-80' : 'opacity-20'}`}
                  markerEnd="url(#arrowhead)"
                />
              );
            })
          )}
        </svg>

        {/* Central hub */}
        <div 
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg"
        >
          <Zap className="w-8 h-8 text-white" />
        </div>

        {/* Nodes */}
        {nodes.map(node => {
          const Icon = node.icon;
          const isHovered = hoveredNode === node.id;
          const isSelected = selectedNode === node.id;
          const isConnected = isNodeConnected(node.id);
          
          return (
            <div
              key={node.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
                isHovered || isSelected ? 'scale-110 z-10' : isConnected ? 'scale-105 z-5' : 'z-0'
              }`}
              style={{
                left: `${node.position.x}%`,
                top: `${node.position.y}%`,
              }}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => handleNodeClick(node.id)}
            >
              <Card className={`
                w-32 h-24 shadow-lg border-2 transition-all duration-300 
                ${node.bgColor}
                ${isHovered || isSelected ? 'border-blue-400 shadow-xl' : 'border-transparent'}
                ${isConnected && !isHovered ? 'border-blue-200' : ''}
              `}>
                <CardContent className="p-3 h-full flex flex-col items-center justify-center text-center">
                  <Icon className={`w-5 h-5 mb-1 ${node.color} transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`} />
                  <h4 className="text-xs font-medium leading-tight mb-1">
                    {node.title}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-tight">
                    {node.description}
                  </p>
                </CardContent>
              </Card>

              {/* Pulse effect for selected node */}
              {isSelected && (
                <div className="absolute inset-0 rounded-lg border-2 border-blue-400 animate-ping opacity-75"></div>
              )}
            </div>
          );
        })}

        {/* Information overlay */}
        {hoveredNode && (
          <div className="absolute bottom-4 left-4 right-4">
            <Card className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border">
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-1">
                  {React.createElement(nodes.find(n => n.id === hoveredNode).icon, {
                    className: `w-4 h-4 ${nodes.find(n => n.id === hoveredNode).color}`
                  })}
                  <span className="font-medium text-sm">
                    {nodes.find(n => n.id === hoveredNode).title}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {nodes.find(n => n.id === hoveredNode).connections.length} connections
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {nodes.find(n => n.id === hoveredNode).description}
                </p>
                <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                  <ArrowRight className="w-3 h-3" />
                  <span>Click to explore this tool</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span>Active connections</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-gray-300"></div>
          <span>Available pathways</span>
        </div>
        <div className="flex items-center gap-1">
          <Zap className="w-3 h-3 text-blue-500" />
          <span>Central processing hub</span>
        </div>
      </div>
    </div>
  );
}