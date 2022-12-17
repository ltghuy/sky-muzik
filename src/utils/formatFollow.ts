export const formatFollowing = (num: number) => {
  if (num < 1000 ) return num
  if (num > 1000 && num < 1000000) return `${Math.floor(num / 1000)}K`
  else return `${(num / 1000000).toFixed(1)}M`
}