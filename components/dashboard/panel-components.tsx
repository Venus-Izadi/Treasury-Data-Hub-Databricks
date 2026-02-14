import { cn } from "@/lib/utils"

/* -------------------------------------------------- */
/*  Shared panel sub-components                       */
/* -------------------------------------------------- */

export function PanelCard({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "bg-black/25 rounded-lg p-5 border-l-4 border-l-accent",
        className
      )}
    >
      {children}
    </div>
  )
}

const iconStyles = {
  green: "bg-status-green/15 text-status-green",
  blue: "bg-status-blue/15 text-status-blue",
  purple: "bg-[rgba(139,92,246,0.15)] text-[#8b5cf6]",
  gold: "bg-accent/15 text-accent",
  red: "bg-status-red/15 text-status-red",
}

export function PanelCardTitle({
  icon,
  iconColor,
  children,
}: {
  icon: string
  iconColor: keyof typeof iconStyles
  children: React.ReactNode
}) {
  return (
    <h3 className="text-[15px] font-semibold text-primary-foreground mb-4 uppercase tracking-wide flex items-center gap-2.5">
      <span
        className={`w-8 h-8 rounded-md flex items-center justify-center text-[13px] font-bold ${iconStyles[iconColor]}`}
      >
        {icon}
      </span>
      {children}
    </h3>
  )
}

export function DataRow({
  label,
  value,
  valueClass,
  children,
}: {
  label: string
  value?: string
  valueClass?: string
  children?: React.ReactNode
}) {
  return (
    <div className="flex justify-between items-center py-2.5 border-b border-foreground/[0.05] last:border-b-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      {children || (
        <span className={cn("text-sm font-medium text-foreground", valueClass)}>
          {value}
        </span>
      )}
    </div>
  )
}

export function SubsectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[13px] text-muted-foreground uppercase tracking-wide font-semibold mt-4 mb-2 pt-3 border-t border-foreground/[0.05] first:mt-0 first:pt-0 first:border-t-0">
      {children}
    </div>
  )
}

export function TotalRow({
  label,
  value,
  valueClass,
}: {
  label: string
  value: string
  valueClass?: string
}) {
  return (
    <div className="flex justify-between items-center pt-3.5 mt-3.5 border-t border-foreground/10">
      <span className="text-sm text-muted-foreground font-semibold uppercase">{label}</span>
      <span className={cn("text-[22px] font-bold text-status-green", valueClass)}>
        {value}
      </span>
    </div>
  )
}

export function HqlaTag({ level }: { level: "l1" | "l2a" | "l2b" }) {
  const styles = {
    l1: "bg-[#166534] text-[#86efac]",
    l2a: "bg-[#1e40af] text-[#93c5fd]",
    l2b: "bg-[#854d0e] text-[#fde047]",
  }
  const labels = { l1: "L1", l2a: "L2A", l2b: "L2B" }
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold uppercase ml-2 ${styles[level]}`}>
      {labels[level]}
    </span>
  )
}

export function MaturityTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-[rgba(139,92,246,0.15)] text-[#a78bfa] ml-2">
      {children}
    </span>
  )
}

export function FundingBar({
  label,
  value,
  width,
  gradient,
}: {
  label: string
  value: string
  width: string
  gradient: string
}) {
  return (
    <div className="flex items-center mb-3 last:mb-0">
      <span className="w-[90px] text-[13px] text-muted-foreground">{label}</span>
      <div className="flex-1 h-2.5 bg-foreground/10 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{ width, background: gradient }}
        />
      </div>
      <span className="w-[70px] text-sm text-foreground text-right font-medium">{value}</span>
    </div>
  )
}
