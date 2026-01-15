import express from "express";
const app =express()
app.get("/",(req,res)=>{
    res.send("This is page home")
});

app.get("/contactus",(_req,res)=>{
    res.send("Contact us at contact@contact.com"
)
});


app.get("/aboutus",(_req,res)=>{
    res.send("this is about the page")
});



 
const PORT=3000;
app.listen(PORT,()=>{
 console.log(`sever is running on http:// ${PORT}  `)
})
