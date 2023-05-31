require('dotenv').config()

module.exports = {
    url: `mongodb+srv://ndibo69:${process.env.MONGO_PASSWORD}@backend-up-user.pw24jbg.mongodb.net/?retryWrites=true&w=majority`,
    saltRounds: 10,
    secret: process.env.SECRET
}