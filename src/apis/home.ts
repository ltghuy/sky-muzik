import axios from '@utils/axios'
import { API_ROUTES } from '@constants/apiRoutes'
interface dataType {
  items: [],
  sectionType: string
}

const getHomePlaylist = async () => {
  try {
    const data:dataType = await axios.get(API_ROUTES.HOME)
    return data.items.filter((e: dataType) => e.sectionType === 'playlist' )
  } catch (err) {
    console.log(err)
  }
}

const getHomeBanner = async () => {
  try {
    const data:dataType = await axios.get(API_ROUTES.HOME)
    const res: any = data.items.find((e: dataType) => e.sectionType === 'banner')
    return Array.from(res.items)
  } catch (err) {
    console.log(err)
  }
}

export { getHomePlaylist, getHomeBanner }
