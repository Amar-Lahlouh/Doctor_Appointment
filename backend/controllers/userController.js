import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";
export const updateUser = async (req, res) => {
  const id = req.params.id;
  console.log("iddd of update", id);
  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    // $set replace the old values with the new values
    return res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updateUser,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to Update",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: true, message: "Failed to delete User" });
  }
};

export const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id).select("-password");
    return res
      .status(200)
      .json({ success: true, message: "User is Sent!", data: user });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to get Single User, No user found",
    });
  }
};

export const GetAllUser = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    return res
      .status(200)
      .json({ success: true, message: "All users are fetched", data: users });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Error in fetching all Users" });
  }
};

export const GetMe = async (req, res) => {
  const userid = req.user?.id;
  try {
    const user = await User.findById(userid).lean();
    delete user.password;

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getMyAppointments = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user?.id })
      .populate({
        path: "doctor",
        select: "name specialization WorkTime", // must include WorkTime
      })
      .lean();

    const data = bookings.map((booking) => {
      const doctor = booking.doctor;

      if (!doctor || !doctor.WorkTime) {
        return { ...booking, worktime: null };
      }

      // Find specific worktime from doctor's array
      const matchedWorktime = doctor.WorkTime.find(
        (w) => w._id.toString() === booking.WorkTime.toString()
      );

      return {
        ...booking,
        worktime: matchedWorktime || null,
      };
    });

    return res.status(200).json({
      success: true,
      message: "Appointments fetched successfully",
      data,
    });
  } catch (err) {
    console.error("Error fetching appointments:", err);
    res.status(500).json({
      success: false,
      message: "Something went wrong, cannot get Appointments",
    });
  }
};

export const GetProfileUser = async (req, res) => {
  const userid = req.user?.id;
  try {
    const user = await User.findById(userid).lean();
    delete user.password;

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};
