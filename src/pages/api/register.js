import mongoose from 'mongoose';


const { MONGODB_URI } = process.env;
if (!MONGODB_URI) {
  throw new Error(
    'MONGODB_URI is not defined'
  );
}

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);

export default async function handler(req, res) {

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  const { email, password } = req.body;
 
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    const user = new UserModel({
      email,
      password
    });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
}
