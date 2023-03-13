const { registerUser, loginUser, getUser, loginUserInternal, getAllUsers} = require('../controllers/user.controller')


module.exports = (app) => {
    app.post('/api/registeruser', registerUser)

    app.post('/api/login', loginUser)

    app.post('/api/login/internal', loginUserInternal)

    app.get('/api/user', getUser )

    app.get('/api/allusers', getAllUsers)
}

