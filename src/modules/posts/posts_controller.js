const redis = require('redis')
const client = redis.createClient()
const fs = require('fs')
const helper = require('../../helpers/helper')
const postsModel = require('./posts_model')

module.exports = {
  allPosts: async (req, res) => {
    try {
      const result = await postsModel.getAllPostsData()
      if (result.length > 0) {
        for (const e of result) {
          e.userDetail = await postsModel.getUserDetailData(e.user_id)
        }
        client.set('getdata:all', JSON.stringify(result))
        return helper.response(res, 200, 'Successfully get all posts!', result)
      } else {
        return helper.response(
          res,
          200,
          'No posts in dashboard. Please create a new post!',
          null
        )
      }
    } catch (error) {
      console.log(error)
      return helper.response(res, 404, 'Bad Request', null)
    }
  },

  onePosts: async (req, res) => {
    try {
      const { id } = req.params
      const result = await postsModel.getOnePostData(id)
      if (result.length > 0) {
        for (const e of result) {
          e.userDetail = await postsModel.getUserDetailData(e.user_id)
          e.commentDetail = await postsModel.getCommentDetailData(e.posts_id)
        }
        client.set('getdata:all', JSON.stringify(result))
        return helper.response(
          res,
          200,
          `Successfully get a posts with id ${id}!`,
          result
        )
      } else {
        return helper.response(
          res,
          400,
          `the data for posts with id ${id} is not found! Please try again!`,
          null
        )
      }
    } catch (error) {
      console.log(error)
      return helper.response(res, 404, 'Bad Request', null)
    }
  },

  createPost: async (req, res) => {
    try {
      const { postTitle, postMessage, postKeywords } = req.body
      const setData = {
        user_id: req.decodeToken.user_id,
        posts_title: postTitle,
        posts_image: req.file ? req.file.filename : '',
        posts_message: postMessage,
        posts_keywords: postKeywords
      }
      const result = await postsModel.createPostData(setData)
      return helper.response(res, 200, 'Success creating a post', result)
    } catch (error) {
      console.log(error)
      return helper.response(res, 404, 'Bad Request', null)
    }
  },

  updatePost: async (req, res) => {
    try {
      const { id } = req.params
      const { postTitle, postMessage, postKeywords } = req.body
      const setData = {
        posts_title: postTitle,
        posts_image: req.file ? req.file.filename : '',
        posts_message: postMessage,
        posts_keywords: postKeywords,
        posts_updated_at: new Date(Date.now())
      }
      const result = await postsModel.getOnePostData(id)
      if (result.length > 0) {
        if (result.length > 0) {
          const imageToDelete = result[0].posts_image
          const isImageExist = fs.existsSync(`src/uploads/${imageToDelete}`)

          if (isImageExist && imageToDelete) {
            fs.unlink(`src/uploads/${imageToDelete}`, (err) => {
              if (err) throw err
            })
          }
        }
        const newResult = await postsModel.updateOnePostData(setData, id)
        return helper.response(
          res,
          200,
          `Successfully updated the posts with id ${id}!`,
          newResult
        )
      } else {
        return helper.response(
          res,
          400,
          `the post with id ${id} is not found. Please try again!`,
          null
        )
      }
    } catch (error) {
      console.log(error)
      return helper.response(res, 404, 'Bad Request', null)
    }
  },

  deletePost: async (req, res) => {
    try {
      const { id } = req.params
      const result = await postsModel.getOnePostData(id)
      if (result.length > 0) {
        if (result.length > 0) {
          const imageToDelete = result[0].posts_image
          const isImageExist = fs.existsSync(`src/uploads/${imageToDelete}`)

          if (isImageExist && imageToDelete) {
            fs.unlink(`src/uploads/${imageToDelete}`, (err) => {
              if (err) throw err
            })
          }
        }
        const newResult = await postsModel.deleteOnePostData(id)
        return helper.response(
          res,
          200,
          `the post with id ${id} is successfully deleted!`,
          newResult
        )
      } else {
        return helper.response(
          res,
          400,
          'Something wrong when you deleted the post. Please try again!',
          null
        )
      }
    } catch (error) {
      console.log(error)
      return helper.response(res, 404, 'Bad Request', null)
    }
  },

  // Comment

  getComment: async (req, res) => {
    try {
      const { id } = req.params
      const result = await postsModel.getCommentData(id)
      if (result.length > 0) {
        client.set(`getdata:${id}`, JSON.stringify(result))
        return helper.response(
          res,
          200,
          'Succesfully get a comment data!',
          result
        )
      } else if (result.length === 0) {
        return helper.response(
          res,
          200,
          'No comment in this post. Please become a first person to comment!',
          null
        )
      } else {
        return helper.response(
          res,
          400,
          'Something wrong when loading a comment, please try again!',
          null
        )
      }
    } catch (error) {
      console.log(error)
      return helper.response(res, 404, 'Bad Request', null)
    }
  },

  createComment: async (req, res) => {
    try {
      const { id } = req.params
      const { postId, commentMessage } = req.body
      const result = await postsModel.getOnePostData(id)
      if (result.length > 0) {
        const setData = {
          posts_id: postId,
          user_id: req.decodeToken.user_id,
          comment_message: commentMessage
        }
        const newResult = await postsModel.createCommentData(setData)
        return helper.response(
          res,
          200,
          `Successfully commented a post id ${id}!`,
          newResult
        )
      } else {
        return helper.response(
          res,
          400,
          'Something wrong when you commented a post. Please try again!',
          null
        )
      }
    } catch (error) {
      console.log(error)
      return helper.response(res, 404, 'Bad Request', null)
    }
  }
}
