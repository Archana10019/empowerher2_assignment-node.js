import express from 'express';
import bcrypt from 'bcrypt';

import supabase from './supabase.config.js';

const app = express();
app.use(express.json());


//sigup api
app.post('/signup', async (req, res) => {
     try{
        const{name,email ,age,location,password}=req.body;
        //validation
        if(!name || !email || !age || !location || !password){
            return res.status(400).json({message:'all fields are required'});
        }

        //check if user already exists
         const {data:existingUser}=await supabase
         .from('users2')
         .select('id')
            .eq('email',email)
            .single();

            if(existingUser){
                return res.status(409).json({message:'user already exists'});
            }
            //hash password
            const hashedPassword=await bcrypt.hash(password,10);

            const{error}=await supabase.from('users2').insert([
                {name,email,age,location,password:hashedPassword},
            ]);

            if(error) throw error;

            res.status(201).json({message:'user registered successfully'});

     } catch(error){
        console.error('Error during signup:',error);
        res.status(500).json({message:'internal server error'});
     }

});


//profile api

app.get('/myprofile', async(req,res)=>{
    try{
        const{name}=req.query;
        if(!name){
            return res.status(400).json({error:'name is required'});
        }
        const{data,error}=await supabase
        .from('users2')
        .select('id,name,email,age,location')
        .eq('name',name)
        .single();

        if(error){
            return res.status(404).json({error:'user not found'});
        }

        res.status(200).json({data});

    } catch(error){
        console.error('Error fetching profile:',error);
        res.status(500).json({message:'internal server error'});
    }
});




//start the server

const PORT = process.env.PORT || 3300;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});