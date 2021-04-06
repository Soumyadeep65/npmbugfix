var Hapi = require('hapi')
const fs = require('fs');
 

const init = async () => {

  var tls = {
    key: fs.readFileSync('/home/pradeep_ck/src/temp/src/server/ssl/key.pem'),
    cert: fs.readFileSync('/home/pradeep_ck/src/temp/src/server/ssl/cert.pem'),
    passphrase: "vata",
    rejectUnauthorized: false,
    requestCert: false,
};

// create a server with a host and port
var server = new Hapi.Server({  
  host: '0.0.0.0',
  //host: '34.89.118.144',
  port: 5005,
  tls:tls,
  routes: {
    cors: {
        origin: ['*'], // an array of origins or 'ignore'    
        credentials: true, // boolean - 'Access-Control-Allow-Credentials'
    }
}
})



await server.register({
  plugin: require('hapi-mongodb'),
  options: {
    url: 'mongodb://localhost:27017/Enumeracy',
    settings: {
        useUnifiedTopology: true
    },
    decorate: true
  }
});

server.route({  
    method: 'POST',
    path: '/inference_collect',
    options: {
      cors: {
          credentials: true
      }},
    handler: async (request, h) => {
        let data = request.payload;
        console.log("dsdsd",data);
        // data = JSON.parse(data);
        // console.log("json_parse_data",data);
        const status = await request.mongo.db.collection('bug_fix').insertOne(data);
        return(status);
    }
  
})
async function start () {  
  // start your server
  try {
    await server.start()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }

  console.log('Server running at: ', server.info.uri)
}

start()  
}
init()