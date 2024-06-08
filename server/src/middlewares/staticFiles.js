const express = require("express");
const path = require("path");

module.exports = [
  express.static("/assets/module-files"),
  express.static("/assets/classwork"),
  express.static("assets"),
  express.static(path.join(__dirname, "..", "reactjs", "build")),
];
