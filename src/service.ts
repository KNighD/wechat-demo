import axios from 'axios'
import { ICommonMessageData } from './data'
import './mock'

export const getMessages = async () => {
  const result = await axios.get<{ list: ICommonMessageData[]; total: number }>(
    '/messages'
  )
  return result.data
}
