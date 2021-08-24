const connection = require('../../config/mysql')

module.exports = {
  getAllPostsData: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM posts WHERE user_id = ? ORDER BY posts_id',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  getOnePostData: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM posts WHERE posts_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  getUserDetailData: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT user_username, user_email, user_image, user_phone_number FROM users WHERE user_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  createPostData: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO posts SET ?', setData, (error, result) => {
        if (!error) {
          const newResult = {
            id: result.insertId,
            ...setData
          }
          resolve(newResult)
        } else {
          reject(new Error(error))
        }
      })
    })
  },

  updateOnePostData: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE posts SET ? WHERE posts_id = ?',
        [setData, id],
        (error, result) => {
          if (!error) {
            const newResult = {
              id: id,
              ...setData
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },

  deleteOnePostData: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM posts WHERE posts_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  // Comment

  getCommentDetailData: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM comment WHERE posts_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  createCommentData: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO comment SET ?',
        setData,
        (error, result) => {
          if (!error) {
            const newResult = {
              id: result.insertId,
              ...setData
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  }
}
