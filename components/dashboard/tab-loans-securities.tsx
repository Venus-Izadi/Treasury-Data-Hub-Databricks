"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"
import {
  PanelCard,
  PanelCardTitle,
  DataRow,
  SubsectionHeader,
  TotalRow,
  HqlaTag,
  FundingBar,
} from "./panel-components"

/* -------------------------------------------------- */
/*  Chart data                                        */
/* -------------------------------------------------- */

const repricingData = [
  { bucket: "<3mo", amount: 4.2, color: "#22c55e" },
  { bucket: "3-6mo", amount: 3.8, color: "#22c55e" },
  { bucket: "6-12mo", amount: 4.8, color: "#3b82f6" },
  { bucket: "1-2yr", amount: 4.1, color: "#8b5cf6" },
  { bucket: "2-3yr", amount: 3.1, color: "#8b5cf6" },
  { bucket: ">3yr", amount: 4.4, color: "#c9a227" },
]

/* -------------------------------------------------- */
/*  Component                                         */
/* -------------------------------------------------- */

export function LoansSecuritiesTab() {
  return (
    <div className="space-y-5">
      {/* Row 1: Loan Portfolio & Rate Repricing */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <PanelCard>
          <PanelCardTitle icon="L" iconColor="blue">
            Loan Portfolio Summary
          </PanelCardTitle>
          <SubsectionHeader>Residential Mortgages</SubsectionHeader>
          <DataRow label="Held for Investment" value="$8.2B" />
          <DataRow label="Held for Sale" value="$1.1B" />
          <DataRow label="Fixed Rate" value="72%" />
          <DataRow label="ARM" value="28%" />
          <DataRow label="Wtd Avg Rate" value="5.85%" />
          <SubsectionHeader>Consumer Loans</SubsectionHeader>
          <DataRow label="Auto Loans" value="$2.8B @ 7.2%" />
          <DataRow label="Personal Loans" value="$1.4B @ 9.5%" />
          <DataRow label="Credit Card" value="$0.9B @ 18.9%" />
          <SubsectionHeader>Commercial</SubsectionHeader>
          <DataRow label="C&I Loans" value="$6.2B @ 6.8%" />
          <DataRow label="Small CRE" value="$3.8B @ 7.1%" />
          <TotalRow label="Total Loan Portfolio" value="$24.4B" valueClass="text-primary-foreground" />
        </PanelCard>

        <PanelCard>
          <PanelCardTitle icon="R" iconColor="purple">
            Rate Repricing Timeline
          </PanelCardTitle>
          <div className="h-[180px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={repricingData}>
                <XAxis dataKey="bucket" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <Bar
                  dataKey="amount"
                  radius={[4, 4, 0, 0]}
                  shape={(props: Record<string, unknown>) => {
                    const { x, y, width, height, payload } = props as {
                      x: number
                      y: number
                      width: number
                      height: number
                      payload: { color: string }
                    }
                    return <rect x={x} y={y} width={width} height={height} fill={payload.color} rx={4} />
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <SubsectionHeader>NII Sensitivity</SubsectionHeader>
          <DataRow label="+100bp Parallel Shift" value="+$42M NII" valueClass="text-status-green" />
          <DataRow label="-100bp Parallel Shift" value="-$38M NII" valueClass="text-status-red" />
          <DataRow label="Repricing <1yr" value="$12.8B" />
          <DataRow label="Repricing 1-3yr" value="$7.2B" />
          <DataRow label="Repricing >3yr" value="$4.4B" />
        </PanelCard>
      </div>

      {/* Row 2: Securities Portfolio */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <PanelCard>
          <PanelCardTitle icon="S" iconColor="gold">
            Securities Portfolio (HQLA)
          </PanelCardTitle>
          <DataRow label="US Treasuries">
            <span className="text-sm font-medium text-foreground">
              $2.8B <HqlaTag level="l1" />
            </span>
          </DataRow>
          <DataRow label="Agency (Fannie/Freddie)">
            <span className="text-sm font-medium text-foreground">
              $1.2B <HqlaTag level="l2a" />
            </span>
          </DataRow>
          <DataRow label="Agency MBS">
            <span className="text-sm font-medium text-foreground">
              $0.9B <HqlaTag level="l2a" />
            </span>
          </DataRow>
          <DataRow label="Corporate IG Bonds">
            <span className="text-sm font-medium text-foreground">
              $0.8B <HqlaTag level="l2b" />
            </span>
          </DataRow>
          <SubsectionHeader>AFS vs HTM Split</SubsectionHeader>
          <DataRow label="Available for Sale (AFS)" value="$4.2B" />
          <DataRow label="Held to Maturity (HTM)" value="$2.5B" />
          <TotalRow label="Total Securities" value="$6.7B" valueClass="text-primary-foreground" />
        </PanelCard>

        <PanelCard>
          <PanelCardTitle icon="V" iconColor="green">
            Valuation & Unrealized G/L
          </PanelCardTitle>
          <SubsectionHeader>AFS Portfolio</SubsectionHeader>
          <DataRow label="Book Value" value="$4.39B" />
          <DataRow label="Market Value" value="$4.20B" />
          <DataRow label="Unrealized G/L" value="-$185M" valueClass="text-status-red" />
          <DataRow label="LCR Haircut Value" value="$3.78B" />
          <SubsectionHeader>HTM Portfolio (Not Marked)</SubsectionHeader>
          <DataRow label="Book Value" value="$2.50B" />
          <DataRow label="Fair Value Est." value="$2.08B" />
          <DataRow label="Unrealized (If Marked)" value="-$420M" valueClass="text-status-red" />
        </PanelCard>
      </div>

      {/* Row 3: Encumbrance & HQLA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <PanelCard>
          <PanelCardTitle icon="E" iconColor="red">
            Encumbrance Status
          </PanelCardTitle>
          <DataRow label="Pledged to FHLB" value="$2.1B" />
          <DataRow label="Fed Discount Window" value="$1.8B" />
          <DataRow label="Repo Collateral" value="$0.6B" />
          <DataRow label="Other Pledged" value="$0.4B" />
          <TotalRow label="Unencumbered" value="$2.8B" />
        </PanelCard>

        <PanelCard>
          <PanelCardTitle icon="H" iconColor="purple">
            HQLA Composition (After Haircuts)
          </PanelCardTitle>
          <div className="mt-3">
            <FundingBar
              label="Level 1"
              value="$3.1B"
              width="65%"
              gradient="linear-gradient(90deg,#22c55e,#16a34a)"
            />
            <FundingBar
              label="Level 2A"
              value="$1.3B"
              width="27%"
              gradient="linear-gradient(90deg,#3b82f6,#2563eb)"
            />
            <FundingBar
              label="Level 2B"
              value="$0.4B"
              width="8%"
              gradient="linear-gradient(90deg,#f59e0b,#d97706)"
            />
          </div>
          <TotalRow label="Total HQLA" value="$4.8B" />
        </PanelCard>
      </div>
    </div>
  )
}
