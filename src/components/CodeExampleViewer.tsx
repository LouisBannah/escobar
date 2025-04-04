import React, { useState, useEffect, useRef } from 'react';
import { Copy, Check, ChevronDown, ChevronUp, FileCode } from 'lucide-react';
import { CodeExample } from '../types';
import { useTheme } from '../contexts/ThemeContext';

// Declare Prism as a global variable since it's loaded from CDN
declare global {
  interface Window {
    Prism: any;
  }
}

interface CodeExampleViewerProps {
  example: CodeExample;
  themeColors?: {
    medium: string;
    text: string;
    border: string;
    button: string;
    success: string;
    banner: string;
  } | null;
}

const CodeExampleViewer: React.FC<CodeExampleViewerProps> = ({ example, themeColors }) => {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const codeRef = useRef<HTMLElement>(null);
  const { getThemeValue, isDarkMode } = useTheme();
  
  // Helper to get either theme value from the new system or fallback to old themeColors if provided
  const getThemeStyle = (legacyKey: string, newPath: string) => {
    if (themeColors) {
      return themeColors[legacyKey as keyof typeof themeColors];
    }
    return getThemeValue(newPath);
  };

  useEffect(() => {
    // Highlight code when expanded
    if (expanded && codeRef.current && window.Prism) {
      window.Prism.highlightElement(codeRef.current);
    }
  }, [expanded]);

  // Add a second effect to retry highlighting if it didn't work the first time
  useEffect(() => {
    if (expanded && codeRef.current && window.Prism) {
      // Small delay to ensure DOM is fully rendered
      const timer = setTimeout(() => {
        window.Prism.highlightElement(codeRef.current);
      }, 100);
      
      return () => clearTimeout(timer);
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
    <div style={{
      backgroundColor: getThemeValue('colors.background'),
      borderRadius: '0.75rem',
      borderWidth: '1px',
      borderColor: getThemeValue('colors.border'),
      transition: 'all 0.2s ease',
      boxShadow: expanded 
        ? getThemeValue('shared.boxShadow.md') 
        : getThemeValue('shared.boxShadow.sm'),
      marginBottom: '1rem',
      overflow: 'hidden'
    }}>
      {/* Header with title and expand/collapse toggle */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.75rem 1rem',
          cursor: 'pointer',
          backgroundColor: getThemeValue('colors.surface'),
          transition: 'background-color 0.2s ease',
          borderRadius: expanded ? '0.75rem 0.75rem 0 0' : '0.75rem',
          overflow: 'visible'
        }}
        onClick={toggleExpanded}
      >
        <FileCode style={{ 
          width: '1.25rem', 
          height: '1.25rem', 
          color: getThemeValue('colors.primary.main') 
        }} />
        <div style={{ flexGrow: 1 }}>
          <h4 style={{ 
            fontSize: '0.875rem', 
            color: getThemeValue('colors.text.primary'), 
            fontWeight: 500 
          }}>{example.title}</h4>
          <p style={{ 
            fontSize: '0.75rem', 
            color: getThemeValue('colors.text.tertiary'), 
            marginTop: '0.25rem' 
          }}>{example.filePath}</p>
        </div>
        <span style={{ 
          fontSize: '0.75rem', 
          padding: '0.25rem 0.5rem', 
          borderRadius: '0.375rem', 
          backgroundColor: getThemeValue('colors.surfaceAlt'), 
          color: getThemeValue('colors.text.secondary'), 
          textTransform: 'capitalize',
          display: 'inline-block',
          lineHeight: 1.5,
          overflow: 'visible',
          margin: '0 0.125rem',
          boxShadow: 'none'
        }}>
          {example.language}
        </span>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            toggleExpanded();
          }}
          style={{ 
            color: getThemeValue('colors.text.tertiary'), 
            transition: 'color 0.2s ease' 
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.color = getThemeValue('colors.primary.main');
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.color = getThemeValue('colors.text.tertiary');
          }}
        >
          {expanded ? (
            <ChevronUp style={{ width: '1rem', height: '1rem' }} />
          ) : (
            <ChevronDown style={{ width: '1rem', height: '1rem' }} />
          )}
        </button>
      </div>
      
      {/* Expanded content with description and code */}
      {expanded && (
        <div style={{ borderTop: `1px solid ${getThemeValue('colors.border')}` }}>
          {/* Description */}
          <div style={{ 
            padding: '0.75rem 1rem', 
            backgroundColor: getThemeValue('colors.surfaceAlt')
          }}>
            <p style={{ 
              fontSize: '0.875rem', 
              color: getThemeValue('colors.text.secondary')
            }}>{example.description}</p>
          </div>
          
          {/* Code snippet with copy button */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCopy();
              }}
              style={{ 
                position: 'absolute', 
                top: '0.5rem', 
                right: '0.5rem', 
                padding: '0.375rem', 
                borderRadius: '0.25rem', 
                backgroundColor: copied 
                  ? 'rgba(39, 174, 96, 0.5)'  // More visible success color
                  : 'rgba(255, 255, 255, 0.2)', // More visible button
                transition: 'background-color 0.2s ease',
                zIndex: 10,
                cursor: 'pointer',
                border: 'none',
                boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title="Copy code"
              aria-label="Copy code to clipboard"
            >
              {copied ? (
                <Check style={{ 
                  width: '1rem', 
                  height: '1rem', 
                  color: '#ffffff' // Brighter check icon
                }} />
              ) : (
                <Copy style={{ 
                  width: '1rem', 
                  height: '1rem', 
                  color: '#ffffff' // Brighter copy icon
                }} />
              )}
            </button>
            
            <div style={{ 
              overflow: 'auto', 
              maxHeight: '500px', 
              padding: '1.25rem 1rem 1rem', 
              backgroundColor: getThemeValue('components.expandedCard.codeTab.bg'),
              borderRadius: '0 0 0.5rem 0.5rem',
              position: 'relative' // Ensure positioning context for absolute elements
            }}>
              <pre style={{ 
                fontSize: '0.85rem', 
                lineHeight: '1.5',
                margin: 0,
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                padding: '0',
                overflow: 'visible',
                backgroundColor: 'transparent',
                borderRadius: 0,
                border: 'none'
              }}>
                <code 
                  ref={codeRef} 
                  className={getLanguageClass(example.language)}
                  style={{ 
                    color: getThemeValue('components.expandedCard.codeTab.text'),
                    padding: 0,
                    backgroundColor: 'transparent',
                    whiteSpace: 'pre',
                    wordBreak: 'normal',
                    wordWrap: 'normal',
                    tabSize: 2
                  }}
                >
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