import axios from '@utils/axios'
import { API_ROUTES } from '@constants/apiRoutes'

const getCharts = async () => {
  try {
    const data = await axios.get<any, any>(API_ROUTES.CHART_HOME)
    return data
  } catch (err) {
    console.log(err)
  }
}

export { getCharts }
