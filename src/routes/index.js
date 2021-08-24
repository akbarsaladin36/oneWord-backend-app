const express = require('express')
const Route = express.Router()
const authRoutes = require('../modules/auth/auth_routes')
const userRoutes = require('../modules/users/users_routes')
const postsRoutes = require('../modules/posts/posts_routes')

Route.use('/auth', authRoutes)
Route.use('/users', userRoutes)
Route.use('/posts', postsRoutes)

module.exports = Route
