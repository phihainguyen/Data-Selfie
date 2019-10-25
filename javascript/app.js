//  1) NODE is used here to install our node packaging such as express to help us create our web server for our web application.
// we used npm install, and by npm init to import and created a package.json file
//so far the server's job is to serve up any files in our "public" directory, which is index.html

console.log("working");
//next we will use NeDB as our database, we assign the imported nedb to Datastore where we will give the new variable the Datastore function which holds the path to a new file which we name as database.db
const Datastore = require("nedb");
const database = new Datastore("database.db");
// the loadDatabase() function will allow us to load/create the file we fed to the Datastore()
database.loadDatabase();
//this allows us to use/have access to the express package we need to use require and assign it to the express variable which allows us to use it
//Basically this is an import statement to import our node package
const express = require("express");

//the above expression will now allow this following function to create a web application by assigning the express function to the app variable
//the whole express library/node package will come in as a function which we can execute/use by putting into a variable
const app = express();

//the first thing we want to do as a web server is first listening because as a server all it is doing is listening for requests
app.listen(8080, () => console.log("listening at port 8080"));

//this allows us to use express to host static files letting our server to listen and display our file/directory here which we noted as "public"(directory name) to remind us that whatever we write to this file will be accessible publicly
//we must use the directory pathway inorder for our files to be loaded properly
// so now the serverside will serve the public directory to the client side and so far will host just the index.html
app.use(express.static("../public"));

//this next line will give the server the ability to parse any incoming data as JSON, and we are able to add option property to the json method which are listed in the MDN for express we are adding a limit that will limit only 1mb worth of data to be recieved
app.use(express.json({ limt: "1mb" }));
//========SERVER SIDE IMPORTANT ROLE===========//
//serving up static files to the client
//saving to database
//authentication

//========CLIENT SIDE IMPORTANT ROLE===========//
//GEOLOCATE since there are multiple clients from around the world meaning a computer that is used anywhere to access that one file hosted on the server
//Which is why we need to deploy our application to the cloud or to a server, so that client side can access it anywhere

// =======ROUTING=======//
//how we set up routes in express to send data back and forth from client side to serverside
//this is the end point for the API(Application Programming Interface)
//the address which we will send the data to and later make a request to recieve some data

//========JSON PARSING=========//
//JSON parsing needs to be added to express so we can get the data back in json format, so it is readable to us when we look at the code

//=======POSTING with FETCH========//
//by using the fetch function to specify a post request, which is a request to post data, or basically sending data to the server

//the post route will need the address, of where we want to recieve that post, as well as a callback function where we will look at the data coming in and send a response back
//=======NAMING ADDRESS======//
//to set up the address we can basically call it anything we want, in our case we will call it /api since it makes sense, because we are basically setting an application programming interface  which is just the api where clients can send data to me
//======REQ and RES=======//
//using the ES6 arrow syntax
//this function has 2 arguments
//request is the variable which holds all the dta/info coming from the client
//response is the variable which holds the info/data we want to send make to the client

//our client post will be set up in our index.html where our server will be handled in our app.js
// we need our client to now send data to this particular endpoint at the address "/api"
//so in index.html we can set up our post using fetch(), by fetching the post  to the endpoint /api
app.post("/api", (request, response) => {
  //since all of aour data is in the body of our request from the client side we want to console log that and to access that we will need to console.log(request.body) this will then give back just the necessary info we need rather than getting all the meta data
  console.log(request.body);

  //   with the server now recieving the data from the request it is appropriate for us on the server side to respond in a way, but we can just end it with response.end() which is minimal requirement
  //but for fun we will respond by sending back some json info
  //then in client side since we are responding on server side we need to set something in client side to recieve it
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);
  console.log(database);
  response.json({
    status: "successfully sent information",
    latitude: data.lat,
    longitude: data.lon,
    timestamp: data.timestamp
  });
});
