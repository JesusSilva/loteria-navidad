import fastify from 'fastify'
import pino from 'pino'
import { app } from './app'

const server = fastify({
  logger: pino({
    name: 'of-scrapper',
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: true,
        ignore: 'time,pid,hostname,reqId',
        colorize: true
      }
    }
  }),
  disableRequestLogging: true
})

server.register(app)

server.listen(3000)
