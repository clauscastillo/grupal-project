const { registerUser, loginUser, userLogged, register, login, isLogged, logOutUser, getUser, loginUserInternal } = require('../controllers/user.controller')
const { authenticate } = require("../config/jwt.config")
module.exports = (app) => {
    // app.post('/api/registeruser', registerUser)
    // app.post('/api/login', loginUser)
    app.post('/api/login/internal', loginUserInternal)
    app.get('/api/user', getUser)
    app.post('/api/registeruser', register)
    app.get('/api/login', login)
    app.get('/api/logout', logOutUser)
    app.get('/api/islogged', isLogged)
    app.get("/api/userLogged", authenticate, userLogged)


    // app.get('/api/allusers', getAllUsers)
}

