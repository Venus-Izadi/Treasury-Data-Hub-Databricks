"use client"

import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Landmark,
  Briefcase,
  Wallet,
  MessageSquare,
  Settings,
  LogOut,
  Activity,
} from "lucide-react"

export type SidebarPage =
  | "dashboard"
  | "balance"
  | "loans"
  | "funding"
  | "conversation"

const navSections = [
  {
    items: [
      { id: "dashboard" as const, label: "Dashboard", icon: LayoutDashboard },
    ],
  },
  {
    heading: "Treasury Data Hub",
    items: [
      { id: "balance" as const, label: "Balance Sheet", icon: Landmark },
      { id: "loans" as const, label: "Loans & Securities", icon: Briefcase },
      { id: "funding" as const, label: "Funding & Capacity", icon: Wallet },
    ],
  },
  {
    heading: "Smart Assist",
    items: [
      { id: "conversation" as const, label: "Conversation", icon: MessageSquare },
    ],
  },
]

interface SidebarProps {
  activePage: SidebarPage
  onNavigate: (page: SidebarPage) => void
}

export function Sidebar({ activePage, onNavigate }: SidebarProps) {
  return (
    <aside className="w-[220px] shrink-0 bg-card border-r border-border flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="px-5 py-5 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
          <Activity className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <div className="text-[15px] font-bold text-foreground leading-tight">The Pulse</div>
          <div className="text-xs text-muted-foreground leading-tight">Aura Bank</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 mt-2">
        {navSections.map((section, sIdx) => (
          <div key={sIdx} className={sIdx > 0 ? "mt-5" : ""}>
            {section.heading && (
              <div className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {section.heading}
              </div>
            )}
            {section.items.map((item) => {
              const Icon = item.icon
              const isActive = activePage === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors mb-0.5",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="w-[18px] h-[18px]" />
                  {item.label}
                </button>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="px-3 pb-4 border-t border-border pt-3 mt-auto">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
          <Settings className="w-[18px] h-[18px]" />
          Settings
        </button>

        <div className="flex items-center gap-3 px-3 py-3 mt-1">
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
            <span className="text-xs font-semibold text-muted-foreground">SC</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-foreground truncate">Sarah Chen</div>
            <div className="text-xs text-muted-foreground">CFO</div>
          </div>
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  )
}
