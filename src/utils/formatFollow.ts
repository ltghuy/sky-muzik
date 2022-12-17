export const formatFollowing = (num: number) => {
  if (num < 1000 ) return num
  else return `${Math.floor(num / 1000)}K`
}