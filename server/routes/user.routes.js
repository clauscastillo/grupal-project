const { registerUser, loginUser, register, login, isLogged, logOutUser, getUser, loginUserInternal } = require('../controllers/user.controller')

module.exports = (app) => {
    // app.post('/api/registeruser', registerUser)

    // app.post('/api/login', loginUser)

    app.post('/api/login/internal', loginUserInternal)

    app.get('/api/user', getUser)

    app.post('/api/registeruser', register)

    app.get('/api/login', login)

    app.get('/api/logout', logOutUser)

    app.get('/api/islogged', isLogged)


    app.get('/api/allusers', getAllUsers)
}

