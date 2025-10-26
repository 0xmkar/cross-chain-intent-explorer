import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

const CHAIN_NAMES: Record<string, string> = {
  "1": "Ethereum",
  "42161": "Arbitrum",
  "137": "Polygon",
  "10": "Optimism",
  "56": "BSC",
  "43114": "Avalanche",
  "84532" : "Base Sepolia",
  "11155111": "Ethereum Sepolia"
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatAmount = (raw: string | number | undefined) => {
  if (!raw) return undefined
  // Assuming raw is a Base64 or number string, first convert to BigInt
  const value = BigInt(raw) // or parseInt(raw) if it's decimal
  return Number(value) / 1e18
}

export const getChainName = (chainId: string | number) => {
  const id = String(chainId)
  return CHAIN_NAMES[id] || `Chain ${id}`
}
