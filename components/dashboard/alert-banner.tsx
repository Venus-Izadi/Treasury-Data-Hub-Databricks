const alerts = [
  { type: "critical" as const, label: "CRITICAL", text: "Fed account projected below $50M at 3PM if Wire #4521 settles" },
  { type: "critical" as const, label: "CRITICAL", text: "Uninsured deposits +$500M this week - exceeds policy threshold" },
  { type: "warning" as const, label: "WARNING", text: "ACH return rate 2x normal in Region Y - monitor closely" },
  { type: "warning" as const, label: "WARNING", text: "CD maturities $200M next 7 days - plan renewal strategy" },
  { type: "info" as const, label: "INFO", text: "Branch cash order delayed - East Region" },
  { type: "action" as const, label: "ACTION", text: "Sweep balance $450M available for reallocation" },
]

const dotStyles = {
  critical: "bg-status-red shadow-[0_0_8px_hsl(var(--status-red))]",
  warning: "bg-status-yellow shadow-[0_0_8px_hsl(var(--status-yellow))]",
  info: "bg-status-blue shadow-[0_0_8px_hsl(var(--status-blue))]",
  action: "bg-status-green shadow-[0_0_8px_hsl(var(--status-green))]",
}

function TickerItem({ alert }: { alert: (typeof alerts)[number] }) {
  return (
    <div className="flex items-center gap-2.5 px-7 whitespace-nowrap text-sm">
      <span className={`w-2 h-2 rounded-full shrink-0 ${dotStyles[alert.type]}`} />
      <strong className="text-primary-foreground">{alert.label}:</strong>
      <span className="text-muted-foreground">{alert.text}</span>
    </div>
  )
}

export function AlertBanner() {
  return (
    <div
      className="bg-[linear-gradient(90deg,#1a1a2e_0%,#16213e_50%,#1a1a2e_100%)] border-b border-accent/30 py-3 overflow-hidden relative"
      role="alert"
      aria-label="Active alerts ticker"
    >
      {/* Fade edges */}
      <div className="absolute top-0 bottom-0 left-0 w-[60px] bg-gradient-to-r from-[#1a1a2e] to-transparent z-[2]" />
      <div className="absolute top-0 bottom-0 right-0 w-[60px] bg-gradient-to-l from-[#1a1a2e] to-transparent z-[2]" />

      {/* Label */}
      <div className="absolute left-0 top-0 bottom-0 bg-accent text-accent-foreground px-4 text-[13px] font-bold uppercase tracking-wide z-[3] flex items-center gap-2">
        <span className="w-2 h-2 bg-status-red rounded-full animate-pulse-dot" />
        ALERTS
      </div>

      {/* Ticker */}
      <div className="ml-[140px] overflow-hidden">
        <div className="flex animate-ticker">
          {/* Original items */}
          {alerts.map((alert, i) => (
            <div key={`a-${i}`} className="flex items-center">
              <TickerItem alert={alert} />
              {i < alerts.length - 1 && (
                <span className="text-accent/40 px-3">|</span>
              )}
            </div>
          ))}
          <span className="text-accent/40 px-3">|</span>
          {/* Duplicate for seamless loop */}
          {alerts.map((alert, i) => (
            <div key={`b-${i}`} className="flex items-center">
              <TickerItem alert={alert} />
              {i < alerts.length - 1 && (
                <span className="text-accent/40 px-3">|</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
