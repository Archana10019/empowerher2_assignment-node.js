import express from'express';
import os, { platform, totalmem } from "os";
import { readFileData } from './read.js';
import dns from'dns';




const app= express();
const PORT =3000;
//test route
app.get("/test",(req,res)=>{
    res.send("test route is working!!")
});
//READFILE
app.get("/readfile", async (req, res) => {
  try {
    const data = await readFileData();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});
//SYSTEM
app.get("/systemdetails",(req,res)=>{
const systemdetails={
    platform:os.platform(),
    totalmemory:(os.totalmem()),
    freememory:(os.freemem()),
    cpumodel:os.cpus()[0].model

};
res.json(systemdetails);
})



//get ip route

app.get("/getip",(req,res)=>{
 dns.lookup("massischoll.com",(err,ip)=>{
    if(err)return res.send("error!!!!!!!!!")
        res.send(ip);
 })
})

//listen
app.listen(PORT,()=>{
    console.log(`server running on http://${PORT}`)
})