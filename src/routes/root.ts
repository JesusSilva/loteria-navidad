import { FastifyPluginAsync, RequestGenericInterface } from 'fastify'
import axios, { AxiosResponse } from 'axios'

const homeGet = async (request: any, reply: any) => {
  const data: {
    title: string
    decimos: string[]
    results: {
      numero: number
      premio: number
      timestamp: number
      status: number
      error: number
    }[]
  } = {
    title: 'Loteria de navidad',
    decimos: [],
    results: []
  }

  // API ElPais https://api.elpais.com/ws/LoteriaNavidadPremiados
  const url = 'https://api.elpais.com/ws/LoteriaNavidadPremiados'
  const responseArr: Promise<AxiosResponse<any, any>>[] =
    await data.decimos.map(async (decimo: string) => {
      const urlFormat = url + '?n=' + decimo

      return await axios.get(urlFormat)
    })

  Promise.all(responseArr)
    .then((arr) => {
      arr.forEach((result) => {
        data.results.push(JSON.parse(result.data.split('=')[1]))
      })
      console.log('result: ', data.results)

      return reply.view('/views/index', data)
    })
    .catch((err) => {
      throw new Error(err.message)
    })
}

export const main_router: FastifyPluginAsync = async (server) => {
  server.get<RequestGenericInterface>('/', homeGet)
}
