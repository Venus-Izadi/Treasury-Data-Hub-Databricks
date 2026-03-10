'use client'

import React from 'react'
import Image from 'next/image'
import { MessageCircle, Settings } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-card border-b border-border">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 relative">
            <Image
              src="/images/databank-logo.png"
              alt="Treasury Data Hub Logo"
              width={40}
              height={40}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">Treasury Data Hub</h1>
            <p className="text-sm text-muted-foreground">Intraday Liquidity Coverage Metrics and Analysis</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Chat with Liquidity Assistant</span>
          </button>
          <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
            <Settings className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>
    </header>
  )
}
