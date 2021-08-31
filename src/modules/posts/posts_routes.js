const express = require('express')
const router = express.Router()
const authMiddleware = require('../../middleware/auth')
const redisMiddleware = require('../../middleware/redis')
const uploadFile = require('../../middleware/upload')
const postsController = require('./posts_controller')

// Posts

router.get('/', authMiddleware.userAuthentication, postsController.allPosts)
router.get('/:id', authMiddleware.userAuthentication, postsController.onePosts)
router.post(
  '/',
  authMiddleware.userAuthentication,
  redisMiddleware.clearDataRedis,
  uploadFile,
  postsController.createPost
)
router.patch(
  '/:id',
  authMiddleware.userAuthentication,
  redisMiddleware.clearDataRedis,
  uploadFile,
  postsController.updatePost
)
router.delete(
  '/:id',
  authMiddleware.userAuthentication,
  redisMiddleware.clearDataRedis,
  uploadFile,
  postsController.deletePost
)

// Comment
router.get(
  '/comment/:id',
  authMiddleware.userAuthentication,
  postsController.getComment
)

router.post(
  '/:id',
  authMiddleware.userAuthentication,
  redisMiddleware.clearDataRedis,
  postsController.createComment
)

module.exports = router
