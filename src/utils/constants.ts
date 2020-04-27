import moment from 'moment'

export const API_URL = {
  HTTP: ['https://mixin-api.zeromesh.net/', 'https://api.mixin.one/'],
  WS: ['wss://mixin-blaze.zeromesh.net', 'wss://blaze.mixin.one']
}

export const PerPageMessageCount = 20

export const ConversationStatus = {
  START: 0,
  FAILURE: 1,
  SUCCESS: 2,
  QUIT: 3
}

export const CircleConfig = {
  CIRCLE_CONVERSATION_LIMIT: 5,
  CIRCLE_COLORS: [
    '#8E7BFF',
    '#657CFB',
    '#A739C2',
    '#BD6DDA',
    '#FD89F1',
    '#FA7B95',
    '#E94156',
    '#FA9652',
    '#F1D22B',
    '#BAE361',
    '#5EDD5E',
    '#4BE6FF',
    '#45B7FE',
    '#00ECD0',
    '#FFCCC0',
    '#CEA06B'
  ]
}

export const AvatarColors = [
  '#FFD659',
  '#FFC168',
  '#F58268',
  '#F4979C',
  '#EC7F87',
  '#FF78CB',
  '#C377E0',
  '#8BAAFF',
  '#78DCFA',
  '#88E5B9',
  '#BFF199',
  '#C5E1A5',
  '#CD907D',
  '#BE938E',
  '#B68F91',
  '#BC987B',
  '#A69E8E',
  '#D4C99E',
  '#93C2E6',
  '#92C3D9',
  '#8FBFC5',
  '#80CBC4',
  '#A4DBDB',
  '#B2C8BD',
  '#F7C8C9',
  '#DCC6E4',
  '#BABAE8',
  '#BABCD5',
  '#AD98DA',
  '#C097D9'
]

export const NameColors = [
  '#8C8DFF',
  '#7983C2',
  '#6D8DDE',
  '#5979F0',
  '#6695DF',
  '#8F7AC5',
  '#9D77A5',
  '#8A64D0',
  '#AA66C3',
  '#A75C96',
  '#C8697D',
  '#B74D62',
  '#BD637C',
  '#B3798E',
  '#9B6D77',
  '#B87F7F',
  '#C5595A',
  '#AA4848',
  '#B0665E',
  '#B76753',
  '#BB5334',
  '#C97B46',
  '#BE6C2C',
  '#CB7F40',
  '#A47758',
  '#B69370',
  '#A49373',
  '#AA8A46',
  '#AA8220',
  '#76A048',
  '#9CAD23',
  '#A19431',
  '#AA9100',
  '#A09555',
  '#C49B4B',
  '#5FB05F',
  '#6AB48F',
  '#71B15C',
  '#B3B357',
  '#A3B561',
  '#909F45',
  '#93B289',
  '#3D98D0',
  '#429AB6',
  '#4EABAA',
  '#6BC0CE',
  '#64B5D9',
  '#3E9CCB',
  '#2887C4',
  '#52A98B'
]

export const ConversationCategory = {
  CONTACT: 'CONTACT',
  GROUP: 'GROUP'
}

export const ParticipantRole = {
  OWNER: 'OWNER',
  ADMIN: 'ADMIN'
}

export const MessageStatus = {
  SENDING: 'SENDING',
  SENT: 'SENT',
  DELIVERED: 'DELIVERED',
  READ: 'READ',
  FAILED: 'FAILED'
}

const BaseMessage = {
  message_id: null,
  conversation_id: null,
  user_id: null,
  category: null,
  content: null,
  media_url: null,
  media_mime_type: null,
  media_size: null,
  media_duration: null,
  media_width: null,
  media_height: null,
  media_hash: null,
  thumb_image: null,
  media_key: null,
  media_digest: null,
  media_status: null,
  status: null,
  created_at: null,
  action: null,
  participant_id: null,
  snapshot_id: null,
  hyperlink: null,
  name: null,
  album_id: null,
  sticker_id: null,
  shared_user_id: null,
  media_waveform: null,
  quote_message_id: null,
  quote_content: null,
  thumb_url: null
}

export function getCompleteMessage(message: any) {
  const initMessage = JSON.parse(JSON.stringify(BaseMessage))
  Object.assign(initMessage, message)
  return initMessage
}

export function messageType(type: string) {
  if (type.endsWith('_STICKER')) {
    return 'sticker'
  } else if (type.endsWith('_IMAGE')) {
    return 'image'
  } else if (type.endsWith('_TEXT')) {
    return 'text'
  } else if (type.endsWith('_VIDEO')) {
    return 'video'
  } else if (type.endsWith('_LIVE')) {
    return 'live'
  } else if (type.endsWith('_AUDIO')) {
    return 'audio'
  } else if (type.endsWith('_DATA')) {
    return 'file'
  } else if (type.endsWith('_CONTACT')) {
    return 'contact'
  } else if (type.endsWith('_LOCATION')) {
    return 'location'
  } else if (type.endsWith('_POST')) {
    return 'post'
  } else if (type.startsWith('APP_')) {
    if (type === 'APP_CARD') {
      return 'app_card'
    } else {
      return 'app_button'
    }
  } else if (type === 'SYSTEM_ACCOUNT_SNAPSHOT') {
    return 'transfer'
  } else {
    return 'unknown'
  }
}

function mediaCheck(type: string, status: string) {
  let mediaStatusCheck: boolean = true
  if (status !== MediaStatus.DONE) {
    if (
      type === MessageCategories.SIGNAL_IMAGE ||
      type === MessageCategories.SIGNAL_VIDEO ||
      type === MessageCategories.SIGNAL_AUDIO ||
      type === MessageCategories.PLAIN_IMAGE ||
      type === MessageCategories.PLAIN_VIDEO ||
      type === MessageCategories.PLAIN_AUDIO ||
      type === MessageCategories.PLAIN_DATA
    ) {
      mediaStatusCheck = false
    }
  }
  return mediaStatusCheck
}

export function canReply(message: any) {
  const { type } = message
  return (
    type === MessageCategories.SIGNAL_TEXT ||
    type === MessageCategories.SIGNAL_IMAGE ||
    type === MessageCategories.SIGNAL_VIDEO ||
    type === MessageCategories.SIGNAL_AUDIO ||
    type === MessageCategories.SIGNAL_DATA ||
    type === MessageCategories.SIGNAL_STICKER ||
    type === MessageCategories.SIGNAL_CONTACT ||
    type === MessageCategories.SIGNAL_LIVE ||
    type === MessageCategories.SIGNAL_LOCATION ||
    type === MessageCategories.SIGNAL_POST ||
    type === MessageCategories.APP_CARD ||
    type === MessageCategories.PLAIN_TEXT ||
    type === MessageCategories.PLAIN_IMAGE ||
    type === MessageCategories.PLAIN_VIDEO ||
    type === MessageCategories.PLAIN_AUDIO ||
    type === MessageCategories.PLAIN_DATA ||
    type === MessageCategories.PLAIN_STICKER ||
    type === MessageCategories.PLAIN_CONTACT ||
    type === MessageCategories.PLAIN_LIVE ||
    type === MessageCategories.PLAIN_LOCATION ||
    type === MessageCategories.PLAIN_POST
  )
}

export function canForward(message: any) {
  const { type, mediaStatus } = message
  const status = mediaCheck(type, mediaStatus)
  return (
    (type === MessageCategories.SIGNAL_TEXT ||
      type === MessageCategories.SIGNAL_IMAGE ||
      type === MessageCategories.SIGNAL_VIDEO ||
      type === MessageCategories.SIGNAL_AUDIO ||
      type === MessageCategories.SIGNAL_DATA ||
      type === MessageCategories.SIGNAL_STICKER ||
      type === MessageCategories.SIGNAL_CONTACT ||
      type === MessageCategories.SIGNAL_LIVE ||
      type === MessageCategories.SIGNAL_LOCATION ||
      type === MessageCategories.SIGNAL_POST ||
      type === MessageCategories.APP_CARD ||
      type === MessageCategories.PLAIN_TEXT ||
      type === MessageCategories.PLAIN_IMAGE ||
      type === MessageCategories.PLAIN_VIDEO ||
      type === MessageCategories.PLAIN_AUDIO ||
      type === MessageCategories.PLAIN_DATA ||
      type === MessageCategories.PLAIN_STICKER ||
      type === MessageCategories.PLAIN_CONTACT ||
      type === MessageCategories.PLAIN_LIVE ||
      type === MessageCategories.PLAIN_LOCATION ||
      type === MessageCategories.PLAIN_POST) &&
    status
  )
}

export function isMuteCheck(conversation: any) {
  if (conversation.category === ConversationCategory.CONTACT && conversation.ownerMuteUntil) {
    if (moment().isBefore(conversation.ownerMuteUntil)) {
      return true
    }
  }
  if (conversation.category === ConversationCategory.GROUP && conversation.muteUntil) {
    if (moment().isBefore(conversation.muteUntil)) {
      return true
    }
  }
  return false
}

export function canRecall(
  message: { createdAt: string | number | Date; userId: any; type: any; status: string },
  userId: any
) {
  let offset = new Date().valueOf() - new Date(message.createdAt).valueOf()
  if (offset > 3600000) {
    return false
  }
  return message.userId === userId && canReply(message) && message.status !== MessageStatus.SENDING
}

export const MessageCategories = {
  SIGNAL_KEY: 'SIGNAL_KEY',
  SIGNAL_TEXT: 'SIGNAL_TEXT',
  SIGNAL_IMAGE: 'SIGNAL_IMAGE',
  SIGNAL_VIDEO: 'SIGNAL_VIDEO',
  SIGNAL_AUDIO: 'SIGNAL_AUDIO',
  SIGNAL_DATA: 'SIGNAL_DATA',
  SIGNAL_STICKER: 'SIGNAL_STICKER',
  SIGNAL_CONTACT: 'SIGNAL_CONTACT',
  SIGNAL_LIVE: 'SIGNAL_LIVE',
  SIGNAL_LOCATION: 'SIGNAL_LOCATION',
  SIGNAL_POST: 'SIGNAL_POST',
  PLAIN_TEXT: 'PLAIN_TEXT',
  PLAIN_IMAGE: 'PLAIN_IMAGE',
  PLAIN_VIDEO: 'PLAIN_VIDEO',
  PLAIN_AUDIO: 'PLAIN_AUDIO',
  PLAIN_DATA: 'PLAIN_DATA',
  PLAIN_STICKER: 'PLAIN_STICKER',
  PLAIN_CONTACT: 'PLAIN_CONTACT',
  PLAIN_LIVE: 'PLAIN_LIVE',
  PLAIN_LOCATION: 'PLAIN_LOCATION',
  PLAIN_POST: 'PLAIN_POST',
  PLAIN_JSON: 'PLAIN_JSON',
  MESSAGE_RECALL: 'MESSAGE_RECALL',
  STRANGER: 'STRANGER',
  SECRET: 'SECRET',
  SYSTEM_CONVERSATION: 'SYSTEM_CONVERSATION',
  SYSTEM_USER: 'SYSTEM_USER',
  SYSTEM_CIRCLE: 'SYSTEM_CIRCLE',
  SYSTEM_SESSION: 'SYSTEM_SESSION',
  SYSTEM_ACCOUNT_SNAPSHOT: 'SYSTEM_ACCOUNT_SNAPSHOT',
  APP_BUTTON_GROUP: 'APP_BUTTON_GROUP',
  APP_CARD: 'APP_CARD',
  WEBRTC_AUDIO_OFFER: 'WEBRTC_AUDIO_OFFER',
  WEBRTC_ICE_CANDIDATE: 'WEBRTC_ICE_CANDIDATE',
  WEBRTC_AUDIO_ANSWER: 'WEBRTC_AUDIO_ANSWER',
  WEBRTC_AUDIO_CANCEL: 'WEBRTC_AUDIO_CANCEL',
  WEBRTC_AUDIO_DECLINE: 'WEBRTC_AUDIO_DECLINE',
  WEBRTC_AUDIO_BUSY: 'WEBRTC_AUDIO_BUSY',
  WEBRTC_AUDIO_END: 'WEBRTC_AUDIO_END',
  WEBRTC_AUDIO_FAILED: 'WEBRTC_AUDIO_FAILED'
}

export const MediaStatus = {
  PENDING: 'PENDING',
  DONE: 'DONE',
  CANCELED: 'CANCELED',
  EXPIRED: 'EXPIRED'
}

export const SystemUser = '00000000-0000-0000-0000-000000000000'

export const SystemConversationAction = {
  JOIN: 'JOIN',
  EXIT: 'EXIT',
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  ROLE: 'ROLE'
}

export const SystemUserMessageAction = {
  UPDATE: 'UPDATE'
}

export const SystemSessionMessageAction = {
  PROVISION: 'PROVISION',
  DESTROY: 'DESTROY'
}

export const SystemCircleMessageAction = {
  CREATE: 'CREATE',
  DELETE: 'DELETE',
  UPDATE: 'UPDATE',
  ADD: 'ADD',
  REMOVE: 'REMOVE'
}

export const MimeType = {
  // ============== images ==============
  JPEG: { name: 'image/jpeg', extension: 'jpeg' },
  PNG: { name: 'image/png', extension: 'png' },
  GIF: { name: 'image/gif', extension: 'gif' },
  BMP: { name: 'image/x-ms-bmp', extension: 'bmp' },
  WEBP: { name: 'image/webp', extension: 'webp' },
  // ============== videos ==============
  MPEG: { name: 'video/mpeg', extension: 'mpeg' },
  MP4: { name: 'video/mp4', extension: 'mp4' },
  QUICKTIME: { name: 'video/quicktime', extension: 'mov' },
  THREEGPP: { name: 'video/3gpp', extension: '3gp' },
  THREEGPP2: { name: 'video/3gpp2', extension: '3g2' },
  MKV: { name: 'video/x-matroska', extension: 'mkv' },
  WEBM: { name: 'video/webm', extension: 'webm' },
  TS: { name: 'video/mp2ts', extension: 'ts' },
  AVI: { name: 'video/avi', extension: 'avi' }
}

export const LinkStatus = {
  NOT_CONNECTED: 0,
  CONNECTED: 1,
  CONNECTING: 2,
  ERROR: 3
}

export const MuteDuration = {
  HOURS: 8 * 60 * 60,
  WEEK: 7 * 24 * 60 * 60,
  YEAR: 365 * 24 * 60 * 60
}
