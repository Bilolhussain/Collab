exports.PORT = process.env.PORT || 5000

exports.CLIENT_ORIGIN = process.env.NODE_ENV === 'production' 
  ? process.env.CLIENT_ORIGIN
  : 'http://localhost:3000'

exports.DB_URL = process.env.NODE_ENV === 'production' 
  ? process.env.DB_URL 
  : 'mongodb+srv://bilal:vibgyorv1@cluster0-fsk08.mongodb.net/test?retryWrites=true&w=majority'