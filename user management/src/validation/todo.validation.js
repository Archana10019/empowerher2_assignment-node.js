

export const validationTodo=({title,userId})=>{
    if(!title || !userId){
        return "All fields are required.";
    }
    return null;
};