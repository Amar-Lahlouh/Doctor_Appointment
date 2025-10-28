import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "15d",
    }
  );
};
export const register = async (req, res) => {
  const { email, password, name, photo, role, gender, cpassword } = req.body;
  try {
    if (!email || !password || !name || !gender) {
      return res.status(400).json({ message: "All Fields are Required!" });
    }
    if (password != cpassword) {
      return res.status(400).json({ message: "Passwords Doesn't Match!" });
    }
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User ALready Exists" });
    }
    // hash password
    const hashpassword = await bcrypt.hash(password, 10);

    if (role === "patient") {
      user = new User({
        name,
        email,
        password: hashpassword,
        ...(photo && { photo }),
        gender,
        role,
      });
    }
    if (role === "doctor") {
      user = new Doctor({
        name,
        email,
        password: hashpassword,
        photo,
        gender,
        role,
      });
    }

    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "User successfully created" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = null;
    const patient = await User.findOne({ email });
    const doctor = await Doctor.findOne({ email });

    if (patient) user = patient;
    if (doctor) user = doctor;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    console.log("ispass", isPasswordMatch);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ status: false, message: "Password or Email Are Incorrect" });
    }

    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      "jwt-access-token-secret-key",
      {
        expiresIn: "1d",
      }
    );

    const refreshToken = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      "jwt-refresh-token-secret-key",
      {
        expiresIn: "7d",
      }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true, // recommended for security
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      sameSite: "lax",
      secure: false, // must be false for HTTP localhost
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return res.status(200).json({
      status: true,
      message: "Successfully login",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({ status: false, message: "Failed to Login" });
  }
};

export const profile = async (req, res) => {
  try {
    const userid = req.user?.id;
    try {
      const user = await User.findById(userid).lean();
      delete user.password;
      console.log(user);
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const Logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    })
    .clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    })
    .clearCookie("authToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    })
    .status(200)
    .json("User has been logged out.");
};
export const refreshToken = (req, res) => {
  const refreshToken = req.cookies?.refreshToken;
  // console.log("req.cookies", req.cookies);

  if (!refreshToken) return res.json({ valid: false, message: "No Token" });

  jwt.verify(refreshToken, "jwt-refresh-token-secret-key", (err, decoded) => {
    if (err) return res.json({ valid: false, message: "INVALID" });
    delete decoded.iat;
    delete decoded.exp;
    const newAccessToken = jwt.sign(decoded, "jwt-access-token-secret-key", {
      expiresIn: "1d",
    });
    const refreshToken = jwt.sign(decoded, "jwt-refresh-token-secret-key", {
      expiresIn: "7d",
    });
    res.cookie("accessToken", newAccessToken, { maxAge: 1000 * 60 * 60 * 24 });
    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    res.json({ valid: true, role: decoded.role, userId: decoded.id });
  });
};
