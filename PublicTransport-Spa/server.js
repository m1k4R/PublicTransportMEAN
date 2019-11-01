const app = require("./backend/app");
const debug = require("debug")("node-angular");
const http = require("http");

const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);

// websockets

let indx = -1;
let reverse = false;

const SocketIO = require('socket.io');
const io = SocketIO.listen(server);

io.on('connection', (socket) => {
  console.log('new connection', socket.id);

  socket.on('line', (lineId) => {
    //io.sockets.emit('busLocation', data);
    console.log(lineId);
    getLocationsForStations(lineId, function(locations) {
      console.log('Vracene lokacije');
      console.log(locations);
      console.log(locations.length);
      // console.log(locations.Count); NE RADI COUNT
      if (locations.length > 0) {
        let index = getIndex(locations, indx, reverse);
        console.log(index);
        let location = returnLocation(locations, lineId, index);
        console.log(location);
        io.sockets.emit('busLocation', location);
      }
      socket.on('nextBusLocation', () => {
        if (locations.length > 0) {
          let index = getIndex(locations, indx, reverse);
          console.log(index);
          let location = returnLocation(locations, lineId, index);
          console.log(location);
          io.sockets.emit('busLocation', location);
        }
      })
    });

  })
});

const Line = require('./backend/models/line');
const LineModel = Line.model;

getLocationsForStations = async (lineId, locations) => {
  let allLocations = [];
  console.log(allLocations);
  const line = await LineModel.findById(lineId).populate('stations');
  console.log(line);
  console.log(line._id);
  line.stations.forEach(station => {
    allLocations.push(station.location);
  });
  console.log('Ispis prije return');
  console.log(allLocations);
  return locations(allLocations);
}

getIndex = (allLocations, ind, rvrs) => {
  console.log('Racuna index');
  if ((ind >= 0 && ind + 1 < allLocations.length && !rvrs) || ind == -1) {
      reverse = false;
      indx += 1;
      console.log(indx);
      return indx;
  } else if (ind + 1 == allLocations.length) {
      reverse = true;
      indx -= 1;
      return indx;
  } else if (rvrs) {
      if (indx == 0) {
        reverse = false;
        indx += 1;
      } else {
        indx -= 1;
      }
      return indx;
  } else {
      return 0;
  }
}

returnLocation = (allLocations, lineId, ind) => {
  console.log('Racuna lokaciju');
  if (ind >= 0 && ind < allLocations.length) {
      let busLocation = {
          x: allLocations[ind].x,
          y: allLocations[ind].y,
          lineId: lineId
      };
      return busLocation;
  } else {
      let busLocation = {
          x: allLocations[0].x,
          y: allLocations[0].y,
          lineId: lineId
      };
      return busLocation;
  }
}
