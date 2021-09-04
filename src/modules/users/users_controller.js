const redis = require('redis')
const client = redis.createClient()
const fs = require('fs')
const helper = require('../../helpers/helper')
const usersModel = require('./users_model')

module.exports = {
  allUsers: async (req, res) => {
    try {
      let { page, limit, sort, keywords } = req.query

      page = page ? parseInt(page) : 1
      limit = limit ? parseInt(limit) : 10
      sort = sort ? sort : 'user_username ASC'
      keywords = keywords ? keywords : ''

      const totalData = await usersModel.getDataCount(keywords)
      const totalPage = Math.ceil(totalData / limit)
      const offset = page * limit - limit
      const pageInfo = { page, totalPage, limit, totalData }

      const result = await usersModel.getAllUsers(limit, offset, sort, keywords)
      if (result.length > 0) {
        client.set('getdata:all', JSON.stringify(result))
        return helper.response(
          res,
          200,
          `Success get a result for ${keywords}`,
          result,
          pageInfo
        )
      } else if (result.length === 0) {
        return helper.response(
          res,
          400,
          `Your result for ${keywords} is not found.`,
          null
        )
      } else {
        return helper.response(
          res,
          403,
          'Something wrong when you searching a result, Please try again!',
          null
        )
      }
    } catch (error) {
      console.log(error)
      return helper.response(res, 404, 'Bad Request', null)
    }
  },

  userProfile: async (req, res) => {
    try {
      const { id } = req.params
      const result = await usersModel.getOneUser(id)
      if (result.length > 0) {
        delete result[0].user_password
        for (const e of result) {
          e.TotalPost = await usersModel.getPostCountByUserId(e.user_id)
          e.TotalComment = await usersModel.getCommentCountByUserId(e.user_id)
        }
        client.set(`getdata:${id}`, JSON.stringify(result))
        return helper.response(
          res,
          200,
          `Success get user profile with id ${id}!`,
          result
        )
      } else {
        return helper.response(
          res,
          400,
          `The user profile with id ${id} is not found. Please try again!`
        )
      }
    } catch (error) {
      console.log(error)
      return helper.response(res, 404, 'Bad Request', null)
    }
  },

  allPostsByUserId: async (req, res) => {
    try {
      const { id } = req.params
      const result = await usersModel.getPostsByUserId(id)
      if (result.length > 0) {
        return helper.response(
          res,
          200,
          `Successfully get all posts by user with ${id}!`,
          result
        )
      } else {
        return helper.response(
          res,
          400,
          `All posts with user id ${id} is not found. Please try again!`
        )
      }
    } catch (error) {
      console.log(error)
      return helper.response(res, 404, 'Bad Request', null)
    }
  },

  updateUserProfile: async (req, res) => {
    try {
      const { id } = req.params
      const { userName, userFirstName, userLastName, userPhoneNumber } =
        req.body
      const setData = {
        user_username: userName,
        user_first_name: userFirstName,
        user_last_name: userLastName,
        user_image: req.file ? req.file.filename : '',
        user_phone_number: userPhoneNumber,
        user_updated_at: new Date(Date.now())
      }
      const result = await usersModel.getOneUser(id)
      if (result.length > 0) {
        if (result.length > 0) {
          const imageToDelete = result[0].user_image
          const imageToExist = fs.existsSync(`src/uploads/${imageToDelete}`)

          if (imageToExist && imageToDelete) {
            fs.unlink(`src/uploads/${imageToDelete}`, (err) => {
              if (err) throw err
            })
          }
        }
        const newResult = await usersModel.updateOneUser(setData, id)
        return helper.response(
          res,
          200,
          `Profile for id ${id} has been successfully updated!`,
          newResult
        )
      } else {
        return helper.response(
          res,
          400,
          `the profile for id ${id} are not found. Please try again!`
        )
      }
    } catch (error) {
      console.log(error)
      return helper.response(res, 404, 'Bad Request', null)
    }
  },

  deleteUserProfile: async (req, res) => {
    try {
      const { id } = req.params
      const result = await usersModel.getOneUser(id)
      if (result.length > 0) {
        if (result.length > 0) {
          const imageToDelete = result[0].user_image
          const imageToExist = fs.existsSync(`src/uploads/${imageToDelete}`)

          if (imageToExist && imageToDelete) {
            fs.unlink(`src/uploads/${imageToDelete}`, (err) => {
              if (err) throw err
            })
          }
        }
        const newResult = await usersModel.deleteOneUser(id)
        return helper.response(
          res,
          200,
          `Successfully delete the profile user with id ${id}!`,
          newResult
        )
      }
    } catch (error) {
      console.log(error)
      return helper.response(res, 404, 'Bad Request', null)
    }
  }
}
