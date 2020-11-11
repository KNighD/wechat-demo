import { Random } from 'mockjs'
import { MessageFrom, MessageTypes } from '../constants'

class RandomMessage {
  id: string = Random.guid()
  createTime: string = Random.datetime()
  type: MessageTypes = 0
  content: string = ''
  from: MessageFrom
  userName?: string
  avatar?: string

  userMessageProducer = () => {
    this.type = Random.pick([
      MessageTypes.TEXT,
      MessageTypes.IMAGE,
      MessageTypes.UNKNOWN,
    ])
    const contentProducer: { [key: string]: string } = {
      [MessageTypes.TEXT]: Random.cparagraph(1, 3),
      [MessageTypes.IMAGE]: Random.image(
        Random.pick(['300x250', '250x250', '240x400'])
      ),
      [MessageTypes.UNKNOWN]: '未知消息类型',
    }
    this.content = contentProducer[this.type] || ''
  }

  producer = {
    [MessageFrom.ME]: () => {
      this.userName = '我'
      this.avatar = Random.image('40x40', undefined, '我')
      this.userMessageProducer()
    },
    [MessageFrom.OTHER]: () => {
      this.userName = Random.cname()
      this.avatar = Random.image('40x40', Random.color(), this.userName[0])
      this.userMessageProducer()
    },
    [MessageFrom.SYSTEM]: () => {
      this.type = Random.pick([MessageTypes.TIME, MessageTypes.INVITATION])
      const contentProducer: { [key: string]: string } = {
        [MessageTypes.TIME]: Random.datetime(),
        [MessageTypes.INVITATION]: `${Random.cname()} 邀请 ${Random.cname()} 进群`,
      }
      this.content = contentProducer[this.type]
    },
  }

  constructor() {
    this.from = Random.pick([
      MessageFrom.ME,
      MessageFrom.OTHER,
      MessageFrom.SYSTEM,
    ])
    this.producer[this.from]()
  }
}
export default RandomMessage
