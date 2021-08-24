const express = require('express')
const router = express.Router()
const usersController = require('./users_controller')
const authMiddleware = require('../../middleware/auth')
const redisMiddleware = require('../../middleware/redis')

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
router.patch(
  '/:id',
  authMiddleware.userAuthentication,
  redisMiddleware.clearDataRedis,
  usersController.updateUserProfile
)

module.exports = router
