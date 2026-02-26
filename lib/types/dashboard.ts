// ===========================================
// Dashboard Data Types
// ===========================================
// These types define the shape of data flowing through the dashboard.
// When connecting to a backend, implement API endpoints that return these types.

import type { Timeframe } from "@/components/dashboard/header"

// -----------------------------------------
// Common Types
// -----------------------------------------

export type AlertSeverity = "critical" | "warning" | "info"
export type InsightSeverity = "green" | "blue" | "yellow" | "red"
export type InsightStatus = "Acknowledged" | "Under Review" | "Action Required" | "Escalated"

// -----------------------------------------
// Executive Tile Data
// -----------------------------------------

export interface FedReserveDataPoint {
  time: string
  actual: number
  forecast: number
}

export interface FedReserveData {
  currentBalance: number
  changeFromOpen: number
  trend: FedReserveDataPoint[]
}

export interface CashBreakdown {
  label: string
  value: number
}

export interface ConsolidatedCashData {
  total: number
  changePercent: number
  breakdown: CashBreakdown[]
}

export interface RegulatoryMetric {
  label: string
  value: string
  ok: boolean
}

export interface RegulatoryData {
  metrics: RegulatoryMetric[]
  lcrSurplus: number
  totalHQLA: number
}

export interface DepositDataPoint {
  week: string
  value: number
}

export interface CoreDepositsData {
  total: number
  changePercent: number
  trend: DepositDataPoint[]
}

export interface AlertItem {
  label: string
  severity: AlertSeverity
  detail: string
  value: string
}

export interface AlertsData {
  alerts: AlertItem[]
  criticalCount: number
  warningCount: number
  infoCount: number
}

// -----------------------------------------
// Insights Data
// -----------------------------------------

export interface InsightItem {
  id: string
  badge: string
  severity: InsightSeverity
  text: string
  portfolio: string
  assignees: string[]
  status: InsightStatus
}

export interface InsightsData {
  items: InsightItem[]
  countByStatus: {
    escalated: number
    actionRequired: number
    underReview: number
    acknowledged: number
  }
}

// -----------------------------------------
// Dashboard Overview (combined)
// -----------------------------------------

export interface DashboardData {
  fedReserve: FedReserveData
  consolidatedCash: ConsolidatedCashData
  regulatory: RegulatoryData
  coreDeposits: CoreDepositsData
  alerts: AlertsData
  insights: InsightsData
  lastUpdated: Date
}

// -----------------------------------------
// Balance Sheet Tab Data
// -----------------------------------------

export interface AssetLiabilityItem {
  label: string
  value: number
  change: number
}

export interface DepositTrendPoint {
  month: string
  retail: number
  commercial: number
  government: number
}

export interface FlowDataPoint {
  name: string
  value: number
}

export interface UninsuredTrendPoint {
  date: string
  value: number
}

export interface BalanceSheetData {
  assets: AssetLiabilityItem[]
  liabilities: AssetLiabilityItem[]
  depositTrend: DepositTrendPoint[]
  channelFlow: FlowDataPoint[]
  segmentFlow: FlowDataPoint[]
  uninsuredTrend: UninsuredTrendPoint[]
  uninsuredCurrent: number
  policyLimit: number
}

// -----------------------------------------
// Loans & Securities Tab Data
// -----------------------------------------

export interface PortfolioItem {
  label: string
  value: number
  yield: number
}

export interface RepricingBucket {
  bucket: string
  loans: number
  securities: number
}

export interface LoansSecuritiesData {
  loanPortfolio: PortfolioItem[]
  securitiesPortfolio: PortfolioItem[]
  totalLoans: number
  totalSecurities: number
  avgLoanYield: number
  avgSecuritiesYield: number
  repricing: RepricingBucket[]
}

// -----------------------------------------
// Funding & Capacity Tab Data
// -----------------------------------------

export interface FundingSource {
  source: string
  available: number
  used: number
  total: number
}

export interface HQLAItem {
  level: string
  label: string
  value: number
  color: string
}

export interface ILSTDataPoint {
  day: string
  baseline: number
  stressed: number
}

export interface FundingCapacityData {
  fundingSources: FundingSource[]
  hqlaComposition: HQLAItem[]
  totalHQLA: number
  ilstProjection: ILSTDataPoint[]
}

// -----------------------------------------
// API Request/Response Types
// -----------------------------------------

export interface DashboardRequest {
  timeframe: Timeframe
}

export interface ApiResponse<T> {
  data: T
  success: boolean
  error?: string
  timestamp: Date
}
