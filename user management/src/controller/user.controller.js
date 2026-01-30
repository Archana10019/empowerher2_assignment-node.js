import supabase from '../config/supabase.js';


/* =========================
   CREATE USER
========================= */
export const createUser = async (req, res) => {
  try {
    const { name, email, password, age, role } = req.body;

    const { data, error } = await supabase
      .from('users2')
      .insert([
        {
          name,
          email,
          password,
          age,
          role
        }
      ]);

    if (error) {
      // duplicate email error
      if (error.code === '23505') {
        return res.status(409).json({ message: 'Email already exists' });
      }
      return res.status(400).json({ message: error.message });
    }

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

/* =========================
   GET ALL USERS
========================= */
export const getUsers = async (req, res) => {
  const { data, error } = await supabase
    .from('users2')
    .select('*');

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  res.json(data);
};

/* =========================
   GET USER BY ID
========================= */
export const getUserById = async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('users2')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(data);
};

/* =========================
   UPDATE USER
========================= */
export const updateUser = async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from('users2')
    .update(req.body)
    .eq('id', id);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  res.json({ message: 'User updated successfully' });
};

/* =========================
   DELETE USER
========================= */
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from('users2')
    .delete()
    .eq('id', id);

  if (error) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({ message: 'User deleted successfully' });
};


