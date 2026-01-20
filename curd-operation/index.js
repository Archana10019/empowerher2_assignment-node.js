import express from'express';
import fs from 'fs';
 const app= express()
 const PORT=3000;

//midlware
app.use(express.json())

const readData=()=>{
    const data=fs.readFileSync("db.json","utf-8")
    return JSON.parse(data);
}

const writeData=(data)=>{
    fs.writeFileSync("db.json",JSON.stringify(data,null,2))
};
//get
app.get("/students",(req,res)=>{
    const data =readData();
    res.status(200).json(data.students)
});

//post

app.post("/students", (req, res) => {
  // const student = req.body;   

//  if (!student.id || !student.name) {
//     res.status(400).json({ message: "Send proper data" });
//      return;
//    }

  const data = readData();   

  data.students.push(req.body); 
    res.send({ message: "Student added" });

  writeData(data);            

  res.json({ message: "Student added" });
});

//put
app.put("/students", (req, res) => {
  const id = req.body.id;
  const data = readData();

  for (let i = 0; i < data.students.length; i++) {
    if (data.students[i].id === id) {
      data.students[i] = req.body; 
      writeData(data);
      res.json({ message: "Student updated" });
      return;
    }
  }

  res.status(404).json({ message: "Student not found" });
});

//delete

app.delete("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const data = readData();

  const newStudents = [];

  for (let i = 0; i < data.students.length; i++) {
    if (data.students[i].id !== id) {
      newStudents.push(data.students[i]);
    }
  }

  data.students = newStudents;
  writeData(data);

  res.json({ message: "Student deleted" });
});


app.listen(PORT,()=>{
    console.log(`server running on //http:${PORT}`)
});



 