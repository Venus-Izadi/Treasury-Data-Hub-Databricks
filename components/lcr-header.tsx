'use client'

import React from 'react'
import { Menu, RefreshCw, Bell } from 'lucide-react'

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
    <header className="bg-card border-b border-border sticky top-0 z-30">
      <div className="px-4 md:px-8 py-4 flex items-center justify-between">
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
            <h1 className="text-xl font-bold text-foreground tracking-tight">{title}</h1>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {lastUpdated && (
            <span className="text-xs text-muted-foreground hidden md:flex items-center gap-1.5 bg-secondary px-3 py-1.5 rounded-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-status-green animate-pulse" />
              Last updated: {lastUpdated}
            </span>
          )}
          <button className="p-2.5 hover:bg-secondary rounded-lg transition-colors relative">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-status-red" />
          </button>
          <button 
            onClick={onRefresh}
            disabled={isRefreshing}
            className="p-2.5 hover:bg-secondary rounded-lg transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 text-muted-foreground ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>
    </header>
  )
}
