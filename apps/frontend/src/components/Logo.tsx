"use client";

import Image from 'next/image';
import { useState } from 'react';

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
  showText?: boolean;
}

export function Logo({ 
  width = 40, 
  height = 40, 
  className = '',
  showText = false 
}: LogoProps) {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    // Fallback if logo image fails to load
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <div 
          className="rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-lg shadow-lg"
          style={{ width, height }}
        >
          B
        </div>
        {showText && (
          <span className="font-bold text-lg">ByteMedics</span>
        )}
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Image
        src="/logo.png"
        alt="ByteMedics Logo"
        width={width}
        height={height}
        onError={() => setImageError(true)}
        className="object-contain"
      />
      {showText && (
        <span className="font-bold text-lg">ByteMedics</span>
      )}
    </div>
  );
}