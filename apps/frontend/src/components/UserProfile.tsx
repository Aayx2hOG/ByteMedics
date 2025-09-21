"use client";

import React, { useState } from 'react';
import { useUser, useClerk } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useTheme } from '@/contexts/ThemeContext';
import { User, LogOut, Settings, ChevronDown, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';

export const UserProfile: React.FC = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const { colors } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  const handleSignOut = () => {
    signOut();
  };

  const userInitials = user.firstName && user.lastName 
    ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
    : user.emailAddresses[0]?.emailAddress[0]?.toUpperCase() || 'U';

  const userName = user.firstName && user.lastName
    ? `${user.firstName} ${user.lastName}`
    : user.emailAddresses[0]?.emailAddress || 'User';

  return (
    <div className="relative">
      {/* Profile Button */}
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 p-3 h-auto transition-all duration-200 hover:scale-105"
        style={{
          backgroundColor: colors.background.card,
          borderColor: colors.secondary[100],
          color: colors.text.primary
        }}
        aria-label="User profile menu"
      >
        {/* Avatar */}
        <div 
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold"
          style={{
            background: colors.gradients.primary,
            color: 'white'
          }}
        >
          {user.imageUrl ? (
            <img 
              src={user.imageUrl} 
              alt={userName}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            userInitials
          )}
        </div>

        {/* User Info */}
        <div className="hidden sm:block text-left">
          <p 
            className="text-sm font-medium truncate max-w-32"
            style={{ color: colors.text.primary }}
          >
            {user.firstName || 'User'}
          </p>
          <p 
            className="text-xs truncate max-w-32"
            style={{ color: colors.text.muted }}
          >
            {user.emailAddresses[0]?.emailAddress}
          </p>
        </div>

        {/* Dropdown Icon */}
        <ChevronDown 
          className={cn(
            "w-4 h-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
          style={{ color: colors.text.muted }}
        />
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <Card 
            className="absolute right-0 top-full mt-2 w-64 p-2 z-50 shadow-xl border"
            style={{ 
              backgroundColor: colors.background.card,
              borderColor: colors.secondary[100]
            }}
          >
            {/* User Info Header */}
            <div className="p-3 border-b" style={{ borderColor: colors.secondary[100] }}>
              <div className="flex items-center space-x-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold"
                  style={{
                    background: colors.gradients.primary,
                    color: 'white'
                  }}
                >
                  {user.imageUrl ? (
                    <img 
                      src={user.imageUrl} 
                      alt={userName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    userInitials
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p 
                    className="text-sm font-medium truncate"
                    style={{ color: colors.text.primary }}
                  >
                    {userName}
                  </p>
                  <p 
                    className="text-xs truncate"
                    style={{ color: colors.text.muted }}
                  >
                    {user.emailAddresses[0]?.emailAddress}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {/* Profile Settings */}
              <Button
                variant="ghost"
                className="w-full justify-start p-3 h-auto text-left transition-colors"
                style={{
                  color: colors.text.secondary
                }}
                onClick={() => {
                  setIsOpen(false);
                  // Add profile settings logic here
                }}
              >
                <User className="w-4 h-4 mr-3" />
                <div>
                  <p className="text-sm font-medium">Profile Settings</p>
                  <p className="text-xs opacity-75">Manage your account</p>
                </div>
              </Button>

              {/* Preferences */}
              <Button
                variant="ghost"
                className="w-full justify-start p-3 h-auto text-left transition-colors"
                style={{
                  color: colors.text.secondary
                }}
                onClick={() => {
                  setIsOpen(false);
                  // Add preferences logic here
                }}
              >
                <Settings className="w-4 h-4 mr-3" />
                <div>
                  <p className="text-sm font-medium">Preferences</p>
                  <p className="text-xs opacity-75">App settings & privacy</p>
                </div>
              </Button>

              {/* Divider */}
              <div 
                className="my-2 h-px"
                style={{ backgroundColor: colors.secondary[100] }}
              />

              {/* Sign Out */}
              <Button
                variant="ghost"
                className="w-full justify-start p-3 h-auto text-left transition-colors hover:bg-red-50"
                style={{
                  color: colors.text.secondary
                }}
                onClick={handleSignOut}
              >
                <LogOut className="w-4 h-4 mr-3" />
                <div>
                  <p className="text-sm font-medium">Sign Out</p>
                  <p className="text-xs opacity-75">End your session</p>
                </div>
              </Button>
            </div>
          </Card>
        </>
      )}
    </div>
  );
};