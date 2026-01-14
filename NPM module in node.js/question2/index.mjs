
  import boxen from "boxen";
// // const boxen = required("boxen");

 const message= "i am using the first external module";
const title = "Hurray!!!!!";

 console.log(boxen(message,{title:title,padding:1,margin:1}));


 console.log(boxen(message,{title:title,padding:1,margin:1,
     borderStyle:"double"}));


     console.log(boxen(message,{title:title,padding:1,margin:1,
        borderStyle:"round"
         }));

