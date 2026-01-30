export const validateSignup=({name,email,password})=>{
    if(!name || !email || !password){
        return "All fields are required.";
    }
    return null;
};