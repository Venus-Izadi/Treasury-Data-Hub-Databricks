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
        "bg-card rounded-lg p-5 border border-border",
        className
      )}
    >
      {children}
    </div>
  )
}

const iconStyles = {
  green: "bg-status-green/10 text-status-green",
  blue: "bg-status-blue/10 text-status-blue",
  purple: "bg-[hsl(263,70%,50%)]/10 text-[hsl(263,70%,50%)]",
  gold: "bg-status-yellow/10 text-status-yellow",
  red: "bg-status-red/10 text-status-red",
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
    <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2.5">
      <span
        className={`w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold ${iconStyles[iconColor]}`}
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
    <div className="flex justify-between items-center py-2 border-b border-border/60 last:border-b-0">
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
    <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mt-4 mb-1 pt-3 border-t border-border/60 first:mt-0 first:pt-0 first:border-t-0">
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
    <div className="flex justify-between items-center pt-3 mt-3 border-t border-border">
      <span className="text-sm text-muted-foreground font-semibold">{label}</span>
      <span className={cn("text-xl font-bold text-foreground", valueClass)}>
        {value}
      </span>
    </div>
  )
}

export function HqlaTag({ level }: { level: "l1" | "l2a" | "l2b" }) {
  const styles = {
    l1: "bg-status-green/10 text-status-green border border-status-green/20",
    l2a: "bg-status-blue/10 text-status-blue border border-status-blue/20",
    l2b: "bg-status-yellow/10 text-status-yellow border border-status-yellow/20",
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
    <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-status-yellow/10 text-status-yellow border border-status-yellow/20 ml-2">
      {children}
    </span>
  )
}

export function FundingBar({
  label,
  value,
  width,
  color,
}: {
  label: string
  value: string
  width: string
  color: string
}) {
  return (
    <div className="flex items-center mb-3 last:mb-0">
      <span className="w-[90px] text-sm text-muted-foreground">{label}</span>
      <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{ width, backgroundColor: color }}
        />
      </div>
      <span className="w-[70px] text-sm text-foreground text-right font-medium">{value}</span>
    </div>
  )
}
