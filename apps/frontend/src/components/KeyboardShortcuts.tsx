"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useTheme } from '@/contexts/ThemeContext';
import { Keyboard, X, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ShortcutItem {
  keys: string;
  description: string;
  category: string;
}

const shortcuts: ShortcutItem[] = [
  { keys: 'Ctrl+M', description: 'Toggle voice input', category: 'Voice' },
  { keys: 'Escape', description: 'Stop voice input', category: 'Voice' },
  { keys: 'Enter', description: 'Send message', category: 'Chat' },
  { keys: 'Ctrl+Enter', description: 'Send message (alternative)', category: 'Chat' },
  { keys: 'Ctrl+Shift+T', description: 'Switch base theme', category: 'Theme' },
  { keys: 'Ctrl+Shift+D', description: 'Toggle dark/light mode', category: 'Theme' },
  { keys: 'Ctrl+/', description: 'Show keyboard shortcuts', category: 'Help' },
  { keys: 'Tab', description: 'Navigate between elements', category: 'Navigation' },
  { keys: 'Space', description: 'Activate focused button', category: 'Navigation' },
];

export const KeyboardShortcuts: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { colors } = useTheme();

  // Keyboard shortcut to show/hide help
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const groupedShortcuts = shortcuts.reduce((acc, shortcut) => {
    if (!acc[shortcut.category]) {
      acc[shortcut.category] = [];
    }
    acc[shortcut.category].push(shortcut);
    return acc;
  }, {} as Record<string, ShortcutItem[]>);

  return (
    <>
      {/* Help Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="transition-all duration-300 hover:scale-105 border-2"
        style={{
          backgroundColor: colors.background.card,
          borderColor: colors.secondary[100],
          color: colors.text.primary
        }}
        title="Show keyboard shortcuts (Ctrl+/)"
        aria-label="Show keyboard shortcuts help"
        tabIndex={0}
      >
        <HelpCircle className="w-4 h-4 mr-2" style={{ color: colors.text.muted }} />
        <Keyboard className="w-4 h-4" style={{ color: colors.primary[600] }} />
        <span className="hidden lg:inline ml-2 font-medium">
          Shortcuts
        </span>
      </Button>

      {/* Modal Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="shortcuts-title"
        >
          <Card 
            className="w-full max-w-2xl max-h-[80vh] overflow-y-auto"
            style={{ backgroundColor: colors.background.card }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Keyboard className="w-6 h-6" style={{ color: colors.primary[600] }} />
                  <h2 
                    id="shortcuts-title"
                    className="text-2xl font-bold"
                    style={{ color: colors.text.primary }}
                  >
                    Keyboard Shortcuts
                  </h2>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full transition-all duration-200 hover:scale-105"
                  style={{
                    backgroundColor: `${colors.secondary[50]}80`,
                    color: colors.text.muted
                  }}
                  aria-label="Close shortcuts help"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Shortcuts List */}
              <div className="space-y-6">
                {Object.entries(groupedShortcuts).map(([category, items]) => (
                  <div key={category}>
                    <h3 
                      className="text-lg font-semibold mb-3 flex items-center"
                      style={{ color: colors.text.primary }}
                    >
                      <span 
                        className="w-2 h-2 rounded-full mr-3"
                        style={{ backgroundColor: colors.primary[500] }}
                      ></span>
                      {category}
                    </h3>
                    <div className="space-y-2">
                      {items.map((shortcut, index) => (
                        <div 
                          key={index}
                          className="flex items-center justify-between p-3 rounded-lg border"
                          style={{
                            backgroundColor: colors.background.secondary,
                            borderColor: colors.secondary[100]
                          }}
                        >
                          <span 
                            className="text-sm"
                            style={{ color: colors.text.secondary }}
                          >
                            {shortcut.description}
                          </span>
                          <kbd 
                            className="px-3 py-1 text-xs font-mono rounded border"
                            style={{
                              backgroundColor: colors.secondary[50],
                              color: colors.text.primary,
                              borderColor: colors.secondary[100]
                            }}
                          >
                            {shortcut.keys.replace('Ctrl', navigator.platform.includes('Mac') ? '⌘' : 'Ctrl')}
                          </kbd>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div 
                className="mt-6 pt-4 border-t text-center text-sm"
                style={{ 
                  borderColor: colors.secondary[100],
                  color: colors.text.muted 
                }}
              >
                <p>Press <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Ctrl+/</kbd> to toggle this help, or <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Escape</kbd> to close</p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};