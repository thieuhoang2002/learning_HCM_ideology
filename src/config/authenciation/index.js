module.exports = {
    JWT_SECRET: process.env.JWT_SECRET,
    auth: {
        google:{
            CLIENT_ID:process.env.GOOGLE_CLIENT_ID,
            CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET
        }
    }
}