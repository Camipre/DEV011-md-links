#!/usr/bin/env node
const { mdLinks } = require("..");
const { getTotalLinks, getUniqueLinks, getBrokenLinks } = require("./funtion");

 const arg = process.argv.slice(2);

 if (arg.length === 1) {
   const path = arg[0];
   console.log(path);
 
   mdLinks(path)
     .then(res => console.log(res))
     .catch(error => {
       console.error("Este es el error:", error);
       process.exit(1); // Salir con un código de error
     });
 }
 
 if (arg.length === 2) {
   const [path, option] = arg;
 
   if (option === '--validate') {
     mdLinks(path, { validate: true })
       .then(res => console.log(res))
       .catch(error => {
         console.error("Este es el error:", error);
         process.exit(1);
       });
   } else if (option === '--stats') {
     mdLinks(path, { validate: true })
       .then((res) => {
         console.log(getTotalLinks(res));
         console.log(getUniqueLinks(res));
       })
       .catch(error => {
         console.error("Este es el error:", error);
         process.exit(1);
       });
   }
 }
 
 if (arg.length === 3) {
   const [path, option] = arg;
 
   mdLinks(path, { validate: true })
     .then((res) => {
       console.log(getTotalLinks(res));
       console.log(getUniqueLinks(res));
       console.log(getBrokenLinks(res));
     })
     .catch(error => {
       console.error("Este es el error:", error);
       process.exit(1);
     });
 }
 