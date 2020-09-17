const express = require("express");
const app = express();

const fs = require("fs");
const path = require("path");

const bodyParser = require("body-parser");
const { time } = require("console");

app.use(express.json());

app.get("/", function (req, res) {
  res.send("hi welcome");
});

let rooms = [];
let customers = [];

app.post("/createRoom", function (req, res) {
  let seats = req.body.seats;
  let amenities = req.body.amenities;
  let price = req.body.price;

  rooms.push({
    id: rooms.length + 1,
    name: "Room" + Number(rooms.length + 1),
    seats: seats,
    amenities: amenities,
    price: price,
    // availablity: false,
    customerName: "",
    bookingDate: "",
    bookingTime: {
      start: "",
      end: "",
    },
  });
  res.end("created room!");
});

app.post("/bookRoom", function (req, res) {
  let customerName = req.body.customerName;
  let date = req.body.date;
  let startTime = req.body.startTime;
  let endTime = req.body.endTime;
  let roomId = req.body.roomId;

  //   if (
  //     rooms.find((booking) => booking.id == roomId).availablity == true &&
  //     rooms.find((booking) => booking.id == roomId).bookingDate == date &&
  //     rooms.find((booking) => booking.id == roomId).bookingTime.startTime <
  //       endTime
  //   ) {
  //     res.send("Room is not avaiable!");
  //   } else {
  customers.push({
    id: customers.length + 1,
    customerName: customerName,
    bookingId: roomId,
    bookingDate: date,
    bookingTime: {
      start: startTime,
      end: endTime,
    },
  });

  //   rooms.find((booking) => booking.id == roomId).customerName = customerName;
  //   rooms.find((booking) => booking.id == roomId).bookingDate = date;
  //   rooms.find(
  //     (booking) => booking.id == roomId
  //   ).bookingTime.startTime = startTime;
  //   rooms.find((booking) => booking.id == roomId).bookingTime.endTime = endTime;
  res.send("Room Booked!");
  //   }
});

app.get("/listAllRooms", function (req, res) {
  res.send({
    rooms: rooms,
  });
});

app.get("/listAllCustomers", function (req, res) {
  res.send({
    customers: customers,
  });
});

app.listen(3000, function () {
  console.log("listen at http://localhost:3000/");
});
