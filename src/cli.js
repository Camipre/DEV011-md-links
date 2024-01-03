
const { mdLinks } = require("..")
 const validateLinks = process.argv.includes('--validate')
 const ruta = process.argv[2]

 if (!ruta) {
    console.error('Debes proporcionar una ruta de archivo como argumento.');
    process.exit(1);
  }
  
  mdLinks(ruta, { validate: validateLinks })
    .then((links) => {
      console.log(links);
    })
    .catch((error) => {
      console.error(error);
    });

//  //console.log(validateLinks,ruta);

//  if(validateLinks){
// // ejecuto la funcion de los links
//  }else{
// // entrago el array de los links sin validar
//  }
// mdLinks(ruta)
//     .then(res => console.log(" Esta es la respuesta:", res))
//     .catch(error => console.log("Este es el error", error))


    
    
    

// mdLinks('/noexiste').then(()=>{})
// .catch((error)=>{
//     console.log(error)
// });