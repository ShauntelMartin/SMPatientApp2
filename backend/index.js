import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import cors from "cors";

const saltRounds = 10;
const uri = "mongodb+srv://shauntelbrady:Password1@cluster0.qylcvtx.mongodb.net/";
const app = express();
const port = 3001;

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());


async function connectToMongoDB() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB Atlas!");
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
  }
}
connectToMongoDB();

const userSchema = new mongoose.Schema ({
  email: String,
  password: String
});

const patientSchema = new mongoose.Schema({
  fullname: String,
  emailaddress: String,
  dateOfBirth: Date,
  contactNumber: String,
  lastDoctorVisit: Date,
  illnessDescription: String,
  doctorName: String
});

const User = new mongoose.model("User", userSchema);
const patient = new mongoose.model("Patient", patientSchema);


// Post login page
app.post("/login", (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const user = User.findOne({ email: username });
        if (user || !bcrypt.compare(password, user.password)) {
            res.json({success: 1, message: "Login successful"});
        } else {
            res.json({success: 0, message: "User not found"});
        }
    } catch (error) {
        console.log(err);
        res.status(500).json({message: "User not found"});
    }
});

// Post registration info
app.post("/register", async function (req, res) {
    try {
        const hashedPassword = await new Promise((resolve, reject) => {
            bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                if (err) {
                    reject(err);
                } else {
                    resolve(hash);
                }
            });
        });
        const newUser = new User({
            email: req.body.email,
            password: hashedPassword
        });
        await newUser.save();
        res.json({ message: "Registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Registration failed" });
    }
});


// Get all patients data
app.get('/viewPatients', async (req, res) => {
    try {
        const patients = await patient.find({});
        res.json(patients);
    } catch (error) {
        console.error("Error fetching patient data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


// Post patient record
app.post('/patients/createPatient', async (req, res) => {
  try {
    const newPatient = new patient({
      fullname: req.body.fullname,
      emailaddress: req.body.emailaddress,
      dateOfBirth: req.body.birthdate,
      contactNumber: req.body.contact,
      lastDoctorVisit: req.body.lastDoctorVisit,
      illnessDescription: req.body.illness,
      doctorName: req.body.doctorname,
    });
    await newPatient.save();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});  

// Get update patient view when view button is clicked
app.get('/updatePatient/:_id', async (req, res) => {
  try {
    const id = req.params._id;
    const patientData = await patient.findOne({ _id: id }).exec();

    if (patientData) {
      res.json({ patient: patientData });
    } else {
      res.redirect('/viewPatients');
    }
  } catch (error) {
    console.error('Error rendering updatePatient:', error);
    res.redirect('/viewPatients');
  }
});

// To delete patient
app.delete('/deletePatient/:_id', async (req, res) => {
  try {
    const id = req.params._id;
    const deletedPatient = await patient.findByIdAndDelete(id);

    if (!deletedPatient) {
      return res.status(404).json({ success: false, error: 'Patient not found' });
    }

    res.json({ success: true });
  } catch (error) {
    console.error(`Error deleting patient with ID ${req.params._id}:`, error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});


// To listen to port
app.listen(port, function(){
console.log("Server is running on port 3001");
});
