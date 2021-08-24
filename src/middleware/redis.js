const redis = require('redis')
const client = redis.createClient()
const helper = require('../helpers/helper')

module.exports = {
  getAllDataRedis: (req, res, next) => {
    client.get('getdata:all', (error, result) => {
      if (!error && result != null) {
        console.log('data ada di dalam redis')
        const newResult = JSON.parse(result)
        console.log(newResult)
        return helper.response(res, 200, 'Success get all of data.', newResult)
      } else {
        console.log('Data tidak ada di dalam redis.')
        next()
      }
    })
  },
  getOneDataRedis: (req, res, next) => {
    const { id } = req.params
    client.get(`getdata:${id}`, (error, result) => {
      if (!error && result != null) {
        console.log('Data ada di dalam redis')
        return helper.response(
          res,
          200,
          `Success get data by id ${id}.`,
          JSON.parse(result)
        )
      } else {
        console.log('Data tidak ada dalam redis')
        next()
      }
    })
  },
  clearDataRedis: (req, res, next) => {
    client.keys('getdata*', (_error, result) => {
      if (result.length > 0) {
        result.forEach((item) => {
          client.del(item)
        })
      }
      next()
    })
  }
}
