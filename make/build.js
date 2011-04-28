require('smoosh').config({
  "JAVASCRIPT": {
    "DIST_DIR": "./",
    "bonzo": [
      "./src/copyright.js",
      "./src/bonzo.js"
    ]
  },
  "JSHINT_OPTS": {
    "boss": true,
    "forin": false,
    "curly": true,
    "debug": false,
    "devel": false,
    "evil": false,
    "regexp": false,
    "undef": false,
    "sub": true,
    "white": true,
    "indent": 2,
    "whitespace": true,
    "asi": false
  }
}).run().build().analyze();