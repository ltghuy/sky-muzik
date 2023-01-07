import axios from '../utils/axios'

const getCharts = async () => {
  try {
    const data = await axios.get<any, any>("/charthome")
    return data
  } catch (err) {
    console.log(err)
  }
}

export { getCharts }
