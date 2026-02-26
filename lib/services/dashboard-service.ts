// ===========================================
// Dashboard Data Service
// ===========================================
// This service provides mock data for the dashboard.
// Replace the implementations with actual API calls when connecting to a backend.
//
// Example backend integration:
//   export async function fetchDashboardData(timeframe: Timeframe): Promise<DashboardData> {
//     const res = await fetch(`/api/dashboard?timeframe=${timeframe}`)
//     if (!res.ok) throw new Error('Failed to fetch dashboard data')
//     return res.json()
//   }

import type { Timeframe } from "@/components/dashboard/header"
import type {
  DashboardData,
  FedReserveData,
  ConsolidatedCashData,
  RegulatoryData,
  CoreDepositsData,
  AlertsData,
  InsightsData,
  BalanceSheetData,
  LoansSecuritiesData,
  FundingCapacityData,
} from "@/lib/types/dashboard"

// -----------------------------------------
// Simulate network delay (remove in production)
// -----------------------------------------

const SIMULATED_DELAY_MS = 800

async function simulateDelay(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY_MS))
}

// -----------------------------------------
// Timeframe multipliers for mock data variation
// -----------------------------------------

function getTimeframeMultiplier(timeframe: Timeframe): number {
  const multipliers: Record<Timeframe, number> = {
    today: 1.0,
    "2d": 0.98,
    "7d": 0.95,
    "30d": 0.92,
    "90d": 0.88,
  }
  return multipliers[timeframe]
}

// -----------------------------------------
// Mock Data Generators
// -----------------------------------------

function generateFedReserveData(timeframe: Timeframe): FedReserveData {
  const mult = getTimeframeMultiplier(timeframe)
  return {
    currentBalance: 2.45 * mult,
    changeFromOpen: 250 * mult,
    trend: [
      { time: "8AM", actual: 2.2 * mult, forecast: 2.2 * mult },
      { time: "10AM", actual: 2.35 * mult, forecast: 2.3 * mult },
      { time: "12PM", actual: 2.45 * mult, forecast: 2.38 * mult },
      { time: "2PM", actual: 2.4 * mult, forecast: 2.42 * mult },
      { time: "4PM", actual: 2.48 * mult, forecast: 2.5 * mult },
      { time: "EOD", actual: 2.52 * mult, forecast: 2.52 * mult },
    ],
  }
}

function generateConsolidatedCashData(timeframe: Timeframe): ConsolidatedCashData {
  const mult = getTimeframeMultiplier(timeframe)
  return {
    total: 8.72 * mult,
    changePercent: 1.2 * mult,
    breakdown: [
      { label: "Fed Account", value: 2.45 * mult },
      { label: "Operating", value: 1.85 * mult },
      { label: "Correspondent", value: 2.12 * mult },
    ],
  }
}

function generateRegulatoryData(timeframe: Timeframe): RegulatoryData {
  const mult = getTimeframeMultiplier(timeframe)
  return {
    metrics: [
      { label: "LCR", value: `${Math.round(127 * mult)}%`, ok: mult > 0.9 },
      { label: "NSFR", value: `${Math.round(115 * mult)}%`, ok: mult > 0.9 },
      { label: "ILST", value: "30d", ok: true },
    ],
    lcrSurplus: 1.2 * mult,
    totalHQLA: 4.8 * mult,
  }
}

function generateCoreDepositsData(timeframe: Timeframe): CoreDepositsData {
  const mult = getTimeframeMultiplier(timeframe)
  return {
    total: 42.5 * mult,
    changePercent: -0.8,
    trend: [
      { week: "W-4", value: 43.2 * mult },
      { week: "W-3", value: 43.0 * mult },
      { week: "W-2", value: 42.8 * mult },
      { week: "W-1", value: 42.6 * mult },
      { week: "Now", value: 42.5 * mult },
    ],
  }
}

function generateAlertsData(): AlertsData {
  const alerts = [
    { label: "Fed Position Review", severity: "critical" as const, detail: "Balance approaching minimum threshold at 3PM cutoff", value: "Review 3PM" },
    { label: "Uninsured Deposit Spike", severity: "critical" as const, detail: "Uninsured deposits increased $500M, nearing 35% policy limit", value: "+$500M" },
    { label: "CD Maturities Cluster", severity: "warning" as const, detail: "$200M in CDs maturing within next 7 days", value: "$200M 7d" },
    { label: "Brokered Deposit Concentration", severity: "warning" as const, detail: "Brokered deposits now 9.9% of total, policy limit 10%", value: "9.9%" },
    { label: "FHLB Advance Maturing", severity: "info" as const, detail: "$150M FHLB advance maturing in 5 business days", value: "$150M 5d" },
  ]
  return {
    alerts,
    criticalCount: alerts.filter((a) => a.severity === "critical").length,
    warningCount: alerts.filter((a) => a.severity === "warning").length,
    infoCount: alerts.filter((a) => a.severity === "info").length,
  }
}

function generateInsightsData(): InsightsData {
  const items = [
    { id: "1", badge: "LCR 127%", severity: "green" as const, text: "Well above the 100% regulatory minimum. Strong liquidity cushion.", portfolio: "Liquidity Coverage", assignees: ["Treasury Ops", "Risk Management"], status: "Acknowledged" as const },
    { id: "2", badge: "NSFR 115%", severity: "blue" as const, text: "Conservative lending relative to deposits. Low funding risk.", portfolio: "Net Stable Funding", assignees: ["ALM Team"], status: "Under Review" as const },
    { id: "3", badge: "ILST 30d", severity: "yellow" as const, text: "Meets requirements but limited buffer. Monitor closely.", portfolio: "Stress Testing", assignees: ["Risk Management", "CFO Office"], status: "Action Required" as const },
    { id: "4", badge: "CD Maturity", severity: "yellow" as const, text: "$200M in CDs maturing within 7 days. Renewal strategy needed.", portfolio: "Deposit Management", assignees: ["Treasury Ops", "Funding Desk"], status: "Action Required" as const },
    { id: "5", badge: "Uninsured 34.8%", severity: "red" as const, text: "Uninsured deposits nearing 35% policy limit. Concentration risk elevated.", portfolio: "Deposit Concentration", assignees: ["Risk Management", "CFO Office", "Board Risk Committee"], status: "Escalated" as const },
    { id: "6", badge: "FHLB $150M", severity: "blue" as const, text: "FHLB advance of $150M maturing in 5 business days.", portfolio: "Wholesale Funding", assignees: ["Funding Desk"], status: "Acknowledged" as const },
    { id: "7", badge: "Fed Position", severity: "red" as const, text: "Federal Reserve balance approaching minimum threshold before 3PM cutoff.", portfolio: "Federal Reserve", assignees: ["Treasury Ops", "Payments Team"], status: "Action Required" as const },
    { id: "8", badge: "Brokered 9.9%", severity: "yellow" as const, text: "Brokered deposits at 9.9%, approaching 10% policy limit.", portfolio: "Deposit Management", assignees: ["Treasury Ops", "Risk Management"], status: "Under Review" as const },
    { id: "9", badge: "Rate Risk", severity: "blue" as const, text: "Interest rate sensitivity gap widened by $120M. Model update recommended.", portfolio: "Interest Rate Risk", assignees: ["ALM Team", "Risk Management"], status: "Under Review" as const },
    { id: "10", badge: "Collateral", severity: "green" as const, text: "Pledged collateral coverage at 112%. Adequate margin maintained.", portfolio: "Collateral Management", assignees: ["Treasury Ops"], status: "Acknowledged" as const },
  ]

  return {
    items,
    countByStatus: {
      escalated: items.filter((i) => i.status === "Escalated").length,
      actionRequired: items.filter((i) => i.status === "Action Required").length,
      underReview: items.filter((i) => i.status === "Under Review").length,
      acknowledged: items.filter((i) => i.status === "Acknowledged").length,
    },
  }
}

// -----------------------------------------
// Public API Functions
// -----------------------------------------

/**
 * Fetch all dashboard data for the given timeframe.
 * Replace with actual API call in production.
 */
export async function fetchDashboardData(timeframe: Timeframe): Promise<DashboardData> {
  await simulateDelay()

  return {
    fedReserve: generateFedReserveData(timeframe),
    consolidatedCash: generateConsolidatedCashData(timeframe),
    regulatory: generateRegulatoryData(timeframe),
    coreDeposits: generateCoreDepositsData(timeframe),
    alerts: generateAlertsData(),
    insights: generateInsightsData(),
    lastUpdated: new Date(),
  }
}

/**
 * Fetch balance sheet tab data.
 * Replace with actual API call in production.
 */
export async function fetchBalanceSheetData(timeframe: Timeframe): Promise<BalanceSheetData> {
  await simulateDelay()
  const mult = getTimeframeMultiplier(timeframe)

  return {
    assets: [
      { label: "Cash & Due From", value: 8.2 * mult, change: 1.2 },
      { label: "Investment Securities", value: 12.5 * mult, change: -0.8 },
      { label: "Loans & Leases", value: 32.1 * mult, change: 0.5 },
      { label: "Other Assets", value: 2.4 * mult, change: 0.1 },
    ],
    liabilities: [
      { label: "Core Deposits", value: 42.5 * mult, change: -0.8 },
      { label: "Brokered Deposits", value: 4.2 * mult, change: 2.1 },
      { label: "Borrowings", value: 3.8 * mult, change: -1.2 },
      { label: "Other Liabilities", value: 1.2 * mult, change: 0.0 },
    ],
    depositTrend: [
      { month: "Oct", retail: 28 * mult, commercial: 11 * mult, government: 3.5 * mult },
      { month: "Nov", retail: 29 * mult, commercial: 11.5 * mult, government: 3.8 * mult },
      { month: "Dec", retail: 30 * mult, commercial: 12 * mult, government: 4.0 * mult },
      { month: "Jan", retail: 29.5 * mult, commercial: 11.8 * mult, government: 3.9 * mult },
      { month: "Feb", retail: 29 * mult, commercial: 10.5 * mult, government: 3.0 * mult },
    ],
    channelFlow: [
      { name: "Branch", value: 45 },
      { name: "Digital", value: 120 },
      { name: "Wire", value: -80 },
      { name: "ACH", value: 65 },
    ],
    segmentFlow: [
      { name: "Retail", value: 85 },
      { name: "Commercial", value: -35 },
      { name: "Govt", value: 20 },
      { name: "Institutional", value: -15 },
    ],
    uninsuredTrend: [
      { date: "Jan 20", value: 32.5 },
      { date: "Jan 27", value: 33.1 },
      { date: "Feb 3", value: 33.8 },
      { date: "Feb 10", value: 34.2 },
      { date: "Feb 17", value: 34.8 },
    ],
    uninsuredCurrent: 34.8,
    policyLimit: 35,
  }
}

/**
 * Fetch loans & securities tab data.
 * Replace with actual API call in production.
 */
export async function fetchLoansSecuritiesData(timeframe: Timeframe): Promise<LoansSecuritiesData> {
  await simulateDelay()
  const mult = getTimeframeMultiplier(timeframe)

  return {
    loanPortfolio: [
      { label: "Commercial RE", value: 12.5 * mult, yield: 6.25 },
      { label: "C&I", value: 8.2 * mult, yield: 7.1 },
      { label: "Residential", value: 7.8 * mult, yield: 5.8 },
      { label: "Consumer", value: 3.6 * mult, yield: 8.5 },
    ],
    securitiesPortfolio: [
      { label: "Treasuries", value: 5.2 * mult, yield: 4.2 },
      { label: "Agency MBS", value: 4.8 * mult, yield: 4.8 },
      { label: "Munis", value: 1.8 * mult, yield: 3.9 },
      { label: "Corp Bonds", value: 0.7 * mult, yield: 5.5 },
    ],
    totalLoans: 32.1 * mult,
    totalSecurities: 12.5 * mult,
    avgLoanYield: 6.58,
    avgSecuritiesYield: 4.48,
    repricing: [
      { bucket: "0-30d", loans: 4.2 * mult, securities: 1.1 * mult },
      { bucket: "31-90d", loans: 6.8 * mult, securities: 2.3 * mult },
      { bucket: "91-180d", loans: 8.5 * mult, securities: 3.2 * mult },
      { bucket: "181-365d", loans: 7.2 * mult, securities: 2.8 * mult },
      { bucket: ">1yr", loans: 5.4 * mult, securities: 3.1 * mult },
    ],
  }
}

/**
 * Fetch funding & capacity tab data.
 * Replace with actual API call in production.
 */
export async function fetchFundingCapacityData(timeframe: Timeframe): Promise<FundingCapacityData> {
  await simulateDelay()
  const mult = getTimeframeMultiplier(timeframe)

  return {
    fundingSources: [
      { source: "FHLB", available: 2.5 * mult, used: 1.2 * mult, total: 3.7 * mult },
      { source: "Fed Discount", available: 1.8 * mult, used: 0, total: 1.8 * mult },
      { source: "Repo", available: 0.8 * mult, used: 0.5 * mult, total: 1.3 * mult },
      { source: "Brokered CD", available: 0.5 * mult, used: 4.2 * mult, total: 4.7 * mult },
    ],
    hqlaComposition: [
      { level: "L1", label: "Cash", value: 2.5 * mult, color: "hsl(152,55%,41%)" },
      { level: "L1", label: "Treasuries", value: 3.2 * mult, color: "hsl(217,91%,60%)" },
      { level: "L2A", label: "Agency MBS", value: 1.1 * mult, color: "hsl(25,95%,53%)" },
      { level: "L2B", label: "Corp Bonds", value: 0.5 * mult, color: "hsl(280,65%,60%)" },
    ],
    totalHQLA: 7.3 * mult,
    ilstProjection: [
      { day: "Day 1", baseline: 8.2 * mult, stressed: 6.5 * mult },
      { day: "Day 7", baseline: 7.8 * mult, stressed: 5.2 * mult },
      { day: "Day 14", baseline: 7.2 * mult, stressed: 4.1 * mult },
      { day: "Day 30", baseline: 6.5 * mult, stressed: 3.2 * mult },
    ],
  }
}
