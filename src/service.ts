import axios from 'axios'
import './mock'

export const getMessages = async () => {
  const result = await axios.get('/messages', {
    params: {},
  })
  return result.data
}