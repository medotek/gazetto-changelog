export interface Version {
  id: number
  number: string
}

export interface Log {
  id: number
  title: string
  description: string
  version: Version
  type: LogType
  url: string
  isAnUpdate: boolean
  kind: string
  createdAt: string
}

export interface LogsByType {
  type: LogType
  logs: Log[]
}

export enum LogType {
  Website = 'website',
  Hoyolab = 'hoyolab',
  YouTube = 'youtube',
  // Discord = "discord",
  Twitter = 'twitter'
}
