/* var process = require('child_process');
 process.exec('nodemon index',function (err,stdout,stderr) {
     if (err) {
         console.log("\n"+stderr);
     } else {
         console.log(stdout);
     }
 });*/

function case_insensitive_search(str, search_str)
  {
    var result= str.search(new RegExp(search_str, "i"));
  
    if (result>0)
    return console.log('Matched');
    else
    return console.log('Not Matched');  
   }

   const boii = case_insensitive_search(`what a good boii.`, `boii`);
   console.log(boii)
