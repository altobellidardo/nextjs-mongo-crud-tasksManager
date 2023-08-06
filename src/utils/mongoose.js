import { connect, connection } from 'mongoose'

// const mongoPass = 'mongodb://localhost/nextmongocrud'
const mongosrc = 'mongodb+srv://altobellidardo:altobellidardo@pruebacluster.zayt2yw.mongodb.net/'

const conn = {
  isConnection: false
}

export async function connectDB () {
  if (conn.isConnection) return

  const db = await connect(mongosrc)
  console.log(db.connection.db.databaseName)
  conn.isConection = db.connections[0].readyState
}

connection.on('connected', () => {
  console.log('Mongoose is connected')
})

connection.on('error', (error) => {
  console.error('Mongoose failed', error)
})
