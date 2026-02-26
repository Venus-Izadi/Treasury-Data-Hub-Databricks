// ===========================================
// Dashboard Data Hook
// ===========================================
// Custom hook for fetching and managing dashboard data with loading states.
// Uses SWR pattern for caching and revalidation.

"use client"

import useSWR from "swr"
import type { Timeframe } from "@/components/dashboard/header"
import type {
  DashboardData,
  BalanceSheetData,
  LoansSecuritiesData,
  FundingCapacityData,
} from "@/lib/types/dashboard"
import {
  fetchDashboardData,
  fetchBalanceSheetData,
  fetchLoansSecuritiesData,
  fetchFundingCapacityData,
} from "@/lib/services/dashboard-service"

// -----------------------------------------
// Dashboard Overview Data
// -----------------------------------------

export interface UseDashboardDataReturn {
  data: DashboardData | undefined
  isLoading: boolean
  isValidating: boolean
  error: Error | undefined
  refresh: () => Promise<DashboardData | undefined>
}

export function useDashboardData(timeframe: Timeframe): UseDashboardDataReturn {
  const { data, error, isLoading, isValidating, mutate } = useSWR<DashboardData>(
    ["dashboard", timeframe],
    () => fetchDashboardData(timeframe),
    {
      revalidateOnFocus: false,
      dedupingInterval: 30000, // 30 seconds
    }
  )

  return {
    data,
    isLoading,
    isValidating,
    error,
    refresh: () => mutate(),
  }
}

// -----------------------------------------
// Balance Sheet Data
// -----------------------------------------

export interface UseBalanceSheetDataReturn {
  data: BalanceSheetData | undefined
  isLoading: boolean
  error: Error | undefined
  refresh: () => Promise<BalanceSheetData | undefined>
}

export function useBalanceSheetData(timeframe: Timeframe): UseBalanceSheetDataReturn {
  const { data, error, isLoading, mutate } = useSWR<BalanceSheetData>(
    ["balance-sheet", timeframe],
    () => fetchBalanceSheetData(timeframe),
    {
      revalidateOnFocus: false,
      dedupingInterval: 30000,
    }
  )

  return {
    data,
    isLoading,
    error,
    refresh: () => mutate(),
  }
}

// -----------------------------------------
// Loans & Securities Data
// -----------------------------------------

export interface UseLoansSecuritiesDataReturn {
  data: LoansSecuritiesData | undefined
  isLoading: boolean
  error: Error | undefined
  refresh: () => Promise<LoansSecuritiesData | undefined>
}

export function useLoansSecuritiesData(timeframe: Timeframe): UseLoansSecuritiesDataReturn {
  const { data, error, isLoading, mutate } = useSWR<LoansSecuritiesData>(
    ["loans-securities", timeframe],
    () => fetchLoansSecuritiesData(timeframe),
    {
      revalidateOnFocus: false,
      dedupingInterval: 30000,
    }
  )

  return {
    data,
    isLoading,
    error,
    refresh: () => mutate(),
  }
}

// -----------------------------------------
// Funding & Capacity Data
// -----------------------------------------

export interface UseFundingCapacityDataReturn {
  data: FundingCapacityData | undefined
  isLoading: boolean
  error: Error | undefined
  refresh: () => Promise<FundingCapacityData | undefined>
}

export function useFundingCapacityData(timeframe: Timeframe): UseFundingCapacityDataReturn {
  const { data, error, isLoading, mutate } = useSWR<FundingCapacityData>(
    ["funding-capacity", timeframe],
    () => fetchFundingCapacityData(timeframe),
    {
      revalidateOnFocus: false,
      dedupingInterval: 30000,
    }
  )

  return {
    data,
    isLoading,
    error,
    refresh: () => mutate(),
  }
}
