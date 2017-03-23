var express = require('express');
var app = express();
var fs = require('fs');
var async = require('async');
var data;
var tok = "";
var state = 0;
var string = "";

async.waterfall([
  (callback)=>{
    fs.readFile(process.argv[2], 'utf8',(err, Rdata)=>{
      if(err){
        console.log("cannot open"+process.argv[2]);
        callback("err", "a");
      }
      callback(null, Rdata);
    });
  },

  (data, callback)=>{
    for(var i in data){
      tok+=data[i];
      if(tok == " "){
        if(!state)
          tok = "";
        else
          tok = " ";
      }else if(tok === "log"){
        tok = "";
      }else if(tok === "\n"){
        tok = "";
      }else if(tok === "\""){
        if(!state){
          state = 1;
        }else{
          console.log(string);
          state = 0;
          string = "";
          tok = "";
        }
      }else if(state){
        if(data[i] !== "\""){
          string += data[i];
          tok = "";
        }else{
          console.log(string);
          string = "";
          tok == "";
          state = 0;
        }
      }else if(tok === "if"){
         tok == "";
      }
    }
  }
], (err, result)=>{
   if(err) return 0;
   else data = result;
});


