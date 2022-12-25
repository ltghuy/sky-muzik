import axios from '../utils/axios'

const getMVList = async (id: string, page: number, count: number) => {
  try {
    const data = await axios.get<any, any>("/listmv", {
      params: {
        id: id,
        page: page,
        count: count
      }
    })
    return data
  } catch (err) {
    console.log(err)
  }
}

export { getMVList}
