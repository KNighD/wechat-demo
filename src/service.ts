import axios from 'axios'
import { IUnioMessageData } from './data'
import './mock'

export const getMessages = async () => {
  const result = await axios.get<{ list: IUnioMessageData[]; total: number }>(
    '/messages'
  )
  return result.data
}
