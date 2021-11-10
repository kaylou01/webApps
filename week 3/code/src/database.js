const sqlite3 = require('sqlite3')
const sqlite = require('sqlite')

// enable debugmode
sqlite3.verbose()

const dbFilename = './userDatabase.db'

module.exports = {
    connect(){
        return sqlite.open({
            filename: dbFilename,
            driver: sqlite3.Database
          }).catch(err => {
              console.log('database unable to connect:' + err)
          })
    }

    
}
