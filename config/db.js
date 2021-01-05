const moongose = require('mongoose')
const config = require('config')
const db = config.get('mongoURI')

const connectDB = async () => {
    try {
        await moongose.connect(db, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('Mongo Db connected')
    } catch (error) {
        console.log("Error:-" + error.message)
        //Exit process with failure
        process.exit(1)
    }

}

module.exports = connectDB;