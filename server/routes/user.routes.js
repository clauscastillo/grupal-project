const { registerUser, loginUser, getUser, loginUserInternal} = require('../controllers/user.controller')


module.exports = (app) => {
    app.post('/api/registeruser', registerUser)

    app.post('/api/login', loginUser)

    app.post('/api/login/internal', loginUserInternal)

    app.get('/api/user', getUser )
}

