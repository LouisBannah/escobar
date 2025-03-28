import React, { useState, useEffect, useRef } from 'react';
import { Copy, Check, ChevronDown, ChevronUp, FileCode } from 'lucide-react';
import { CodeExample } from '../types';

// Declare Prism as a global variable since it's loaded from CDN
declare global {
  interface Window {
    Prism: any;
  }
}

interface CodeExampleViewerProps {
  example: CodeExample;
  themeColors: {
    light: string;
    lighter: string;
    medium: string;
    text: string;
    border: string;
    button: string;
    success: string;
    banner: string;
  };
}

const CodeExampleViewer: React.FC<CodeExampleViewerProps> = ({ example, themeColors }) => {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Highlight code when expanded
    if (expanded && codeRef.current && window.Prism) {
      window.Prism.highlightElement(codeRef.current);
    }
  }, [expanded]);

  const handleCopy = () => {
    navigator.clipboard.writeText(example.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  // Function to get the appropriate syntax highlighting class based on language
  const getLanguageClass = (language: string): string => {
    switch (language.toLowerCase()) {
      case 'javascript':
      case 'js':
        return 'language-javascript';
      case 'typescript':
      case 'ts':
        return 'language-typescript';
      case 'html':
        return 'language-html';
      case 'css':
        return 'language-css';
      case 'json':
        return 'language-json';
      case 'yaml':
      case 'yml':
        return 'language-yaml';
      case 'java':
        return 'language-java';
      case 'python':
      case 'py':
        return 'language-python';
      case 'jsx':
        return 'language-jsx';
      case 'tsx':
        return 'language-tsx';
      case 'bash':
      case 'sh':
        return 'language-bash';
      default:
        return 'language-plaintext';
    }
  };

  return (
    <div className="bg-white/80 rounded-lg border border-gray-100 transition-all duration-200 shadow-sm hover:shadow-md mb-4">
      {/* Header with title and expand/collapse toggle */}
      <div 
        className="flex items-center gap-3 p-3 cursor-pointer hover:bg-white/95 transition-colors"
        onClick={toggleExpanded}
      >
        <FileCode className="w-5 h-5 text-blue-500" />
        <div className="flex-grow">
          <h4 className="text-sm text-gray-900 font-medium">{example.title}</h4>
          <p className="text-xs text-gray-600 mt-1">{example.filePath}</p>
        </div>
        <span className="text-xs px-2 py-1 rounded-md bg-gray-100 text-gray-600 capitalize">
          {example.language}
        </span>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            toggleExpanded();
          }}
          className="text-gray-500 hover:text-blue-500 transition-colors"
        >
          {expanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
      </div>
      
      {/* Expanded content with description and code */}
      {expanded && (
        <div className="border-t border-gray-100">
          {/* Description */}
          <div className="px-4 py-3 bg-gray-50/50">
            <p className="text-sm text-gray-700">{example.description}</p>
          </div>
          
          {/* Code snippet with copy button */}
          <div className="relative">
            <button
              onClick={handleCopy}
              className={`absolute top-2 right-2 p-1.5 rounded ${copied ? 'bg-green-100' : 'bg-gray-100'} transition-colors z-10`}
              title="Copy code"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4 text-gray-500" />
              )}
            </button>
            
            <div className="overflow-auto max-h-[500px] p-4 bg-gray-900 rounded-b-lg">
              <pre style={{ fontSize: '0.7rem', lineHeight: '1.2' }} className="text-xs">
                <code ref={codeRef} className={getLanguageClass(example.language)}>
                  {example.code}
                </code>
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeExampleViewer; 