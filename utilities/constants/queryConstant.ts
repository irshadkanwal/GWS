const threeMinutesInMilliSeconds = 3 * 60 * 1000
const twentyMinutesInMilliSeconds = 20 * 60 * 1000

export const NULL_CACHE_AND_STALE_TIME = {
  staleTime: 0,
  cacheTime: 0,
  refetchOnWindowFocus: false,
} as const

//use this for data that is unlikely to get mutated
export const INFINITE_CACHE_AND_STALE_TIME = {
  staleTime: Infinity,
  cacheTime: Infinity,
  refetchOnWindowFocus: false,
} as const

export const CACHE_AND_STALE_TIME = {
  staleTime: threeMinutesInMilliSeconds,
  cacheTime: twentyMinutesInMilliSeconds,
  refetchOnWindowFocus: false,
} as const
