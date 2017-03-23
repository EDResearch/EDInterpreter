var express = require('express');
var app = express();
var fs = require('fs');

var data = fs.readFileSync(process.argv[2], 'utf8');
var tok = "";

for(var i in data){
  tok+=data[i];
  if(tok == " "){
    tok = ""
  }else if(tok === "log"){
    console.log("found a log");
  }
}
