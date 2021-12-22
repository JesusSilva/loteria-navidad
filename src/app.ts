import { FastifyPluginAsync } from 'fastify'
import { main_router } from './routes/root'
import fastifyStatic from 'fastify-static'
import pointOfView from 'point-of-view'
import path from 'path'

export const app: FastifyPluginAsync = async (app) => {
  app.register(fastifyStatic, {
    root: path.join(__dirname, '../public'),
    prefix: '/public/'
  })

  app.register(pointOfView, {
    engine: {
      handlebars: require('handlebars')
    },
    layout: '/views/layout/main.hbs',
    options: {}
  })

  app.register(require('fastify-formbody'))

  app.register(main_router)
}
