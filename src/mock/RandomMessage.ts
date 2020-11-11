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
  height?: number
  width?: number

  userMessageProducer = () => {
    this.type = Random.pick([
      MessageTypes.TEXT,
      MessageTypes.IMAGE,
      MessageTypes.UNKNOWN,
    ])
    const contentProducer: { [key: string]: () => void } = {
      [MessageTypes.TEXT]: () => {
        this.content = Random.cparagraph(1, 3)
      },
      [MessageTypes.IMAGE]: () => {
        this.content = Random.image(
          Random.pick(['300x250', '250x250', '240x400'])
        )
        const [width, height] = this.content.split(/\/+/)[2].split('x')
        this.width = Number(width)
        this.height = Number(height)
      },
      [MessageTypes.UNKNOWN]: () => {
        this.content = '【未知消息类型】'
      },
    }
    contentProducer[this.type]()
  }

  producer = {
    [MessageFrom.ME]: () => {
      this.userName = '我'
      this.avatar = Random.image('40x40', undefined, '我')
      this.userMessageProducer()
    },
    [MessageFrom.OTHER]: () => {
      this.userName = Random.pick(['甲', '乙', '丙'])
      this.avatar = Random.image('40x40', undefined, this.userName)
      this.userMessageProducer()
    },
    [MessageFrom.SYSTEM]: () => {
      this.type = Random.pick([MessageTypes.TIME, MessageTypes.WITHDRAW])
      const contentProducer: { [key: string]: string } = {
        [MessageTypes.TIME]: Random.datetime(),
        [MessageTypes.WITHDRAW]: `${Random.pick(['甲', '乙', '丙'])}撤回一条消息`,
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
