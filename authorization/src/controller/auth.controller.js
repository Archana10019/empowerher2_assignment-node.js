import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { supabase } from '../config/supabase.js';


// SIGNUP
export const signup = async (req, res) => {
try {
const { name, email, password } = req.body;


if (!name || !email || !password) {
return res.status(400).json({ message: 'All fields are required' });
}


const hashedPassword = await bcrypt.hash(password, 10);


const { error } = await supabase
.from('profiles')
.insert([{ name, email, password: hashedPassword }]);


if (error) throw error;


res.status(201).json({ message: 'User registered successfully' });
} catch (err) {
res.status(500).json({ message: err.message });
}
};


// LOGIN
export const login = async (req, res) => {
try {
const { email, password } = req.body;


const { data: user, error } = await supabase
.from('profiles')
.select('*')
.eq('email', email)
.single();


if (!user || error) {
return res.status(401).json({ message: 'Invalid credentials' });
}


const isMatch = await bcrypt.compare(password, user.password);


if (!isMatch) {
return res.status(401).json({ message: 'Invalid credentials' });
}


const token = jwt.sign(
{ userId: user.id, email: user.email },
process.env.JWT_SECRET,
{ expiresIn: '1h' }
);


res.status(200).json({ token });
} catch (err) {
res.status(500).json({ message: err.message });
}
};