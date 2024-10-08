const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken"); // Correct JWT import
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const { User, Course } = require("./database/database"); // Use CommonJS for imports
const {authorization}=require("./middleware/auth")
const {admin}=require("./middleware/admin");
const { VaildUser, VaildCourse } = require("./type"); // Use CommonJS for imports

const SECRET_KEY = "mahesh"; // Replace with a more secure key for production

mongoose.connect(
  "mongodb+srv://savantmahesh16:iFw0Xy4wG4yLPXqO@cluster0.4nk5i.mongodb.net/coures",
);

const app = express();
app.use(cors());
app.use(express.json());

// Signup page
app.post("/signup", async (req, res) => {
  // Validate user input using Zod schema
  const { success, data, error } = VaildUser.safeParse(req.body);

  // If validation fails, return a 400 error with detailed errors
  if (!success) {
    return res.status(400).json({ message: "Invalid input", errors: error.errors });
  }

  // Destructure validated username and password from the data
  const { username, password } = data;

  try {
    // Check if the user already exists
    const user = await User.findOne({ username });
    if (user) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user and save to the database
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ username, role: "user" }, SECRET_KEY, { expiresIn: "1h" });

    // Respond with success message and token
    res.status(201).json({ message: "User created successfully", token });
  } catch (error) {
    // Handle any errors that occur
    res.status(500).json({ message: "Internal server error" });
  }
});




// Signin page
app.post("/signin", async (req, res) => {
  const { success, data, error } = VaildUser.safeParse(req.body);
  if (!success) {
    return res
      .status(400)
      .json({ message: "Invalid user data", errors: error.errors });
  }

  const { username, password } = data;
  try {
    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found. Please sign up." });
    }

    // Compare the entered password with the hashed password stored in the database
    const isPasswordValid = bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Generate JWT token
    const token = jwt.sign({ username, role: user.role }, SECRET_KEY, { expiresIn: "1h" });

    // Respond with the token
    res.status(200).json({ message: "Signin successful", token });
  } catch (error) {
    // Handle any errors that occur
    res.status(500).json({ message: "Internal server error" });
  }
});

//add couresn  


app.post('/addCourse', authorization, admin, async (req, res) => {
  // Validate the course input using the Zod schema
  const { success, data, error } = VaildCourse.safeParse(req.body);
  if (!success) {
    return res.status(400).json({ message: "Invalid input", errors: error.errors });
  }

  // Destructure validated course data from the parsed data
  const { id, title, description, price, imageLink, published } = data;

  try {
    // Find the user (admin) by username from the decoded token
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      return res.status(404).json({ message: "Admin is not present" });
    } else {
      // Create a new course and save it to the database
      const newCourse = new Course({
        id: id,
        title: title,
        description: description,
        price: price,
        imageLink: imageLink,
        published: published
      });

      await newCourse.save();

      // Add the new course to the user's purchasedCourses array
      user.purchasedCourses.push(newCourse._id);
      await user.save();

      // Respond with success message
      console.log("Course added to user's purchased courses.");
      res.json({ message: "Course added successfully", courseId: newCourse._id });
    }
  } catch (error) {
    // Handle any errors that occur
    return res.status(500).json({ message: "Server problem", error: error.message });
  }
});



app.listen(3000, () => {
  console.log("Listening on port 3000");
});
