'use client'

import React from 'react'
import { Menu, RefreshCw } from 'lucide-react'

interface LCRHeaderProps {
  title: string
  subtitle: string
  lastUpdated?: string
  isRefreshing?: boolean
  onRefresh?: () => void
  onMenuClick?: () => void
}

export function LCRHeader({ 
  title, 
  subtitle, 
  lastUpdated, 
  isRefreshing, 
  onRefresh, 
  onMenuClick 
}: LCRHeaderProps) {
  return (
    <header className="bg-card border-b border-border">
      <div className="px-4 md:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5 text-muted-foreground" />
          </button>
          
          <div>
            <h1 className="text-lg font-semibold text-foreground">{title}</h1>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {lastUpdated && (
            <span className="text-xs text-muted-foreground hidden md:block">
              Last updated: {lastUpdated}
            </span>
          )}
          <button 
            onClick={onRefresh}
            disabled={isRefreshing}
            className="p-2 hover:bg-secondary rounded-lg transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 text-muted-foreground ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>
    </header>
  )
}
