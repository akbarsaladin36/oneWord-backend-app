const express = require('express')
const router = express.Router()
const usersController = require('./users_controller')
const authMiddleware = require('../../middleware/auth')
const redisMiddleware = require('../../middleware/redis')
const uploadFile = require('../../middleware/upload')

router.get(
  '/search',
  authMiddleware.userAuthentication,
  usersController.allUsers
)
router.get(
  '/:id',
  authMiddleware.userAuthentication,
  usersController.userProfile
)

router.get(
  '/all-posts/:id',
  authMiddleware.userAuthentication,
  usersController.allPostsByUserId
)

router.patch(
  '/:id',
  authMiddleware.userAuthentication,
  redisMiddleware.clearDataRedis,
  uploadFile,
  usersController.updateUserProfile
)

router.delete(
  '/:id',
  authMiddleware.userAuthentication,
  redisMiddleware.clearDataRedis,
  uploadFile,
  usersController.deleteUserProfile
)

module.exports = router
