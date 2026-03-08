export const preferredLfiOrder = [
  'uae-fabretail',
  'uae-enbdx',
  'uae-adcbrt',
  'uae-adibrt',
  'uae-mashrt',
  'uae-cbdrt',
  'uae-dibrt',
  'uae-hsbcrt',
  'uae-wioretail'
]

export const formatLfiLabel = (lfi) => lfi?.replace(/^uae-/i, '') || lfi

export const sortLfis = (arr = []) =>
  arr.slice().sort((a, b) => {
    const ai = preferredLfiOrder.indexOf(a)
    const bi = preferredLfiOrder.indexOf(b)
    if (ai !== -1 || bi !== -1) {
      if (ai === -1) return 1
      if (bi === -1) return -1
      return ai - bi
    }
    return (a || '').localeCompare(b || '')
  })

export const getStatusBucket = (status) => {
  const normalized = String(status || '').toLowerCase()
  if (normalized.includes('pending') || normalized.includes('received')) return 'pending'
  if (normalized.includes('rejected')) return 'rejected'
  return 'successful'
}
