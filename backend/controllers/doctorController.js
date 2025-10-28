import BookingSchema from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";

export const updateDoctor = async (req, res) => {
  const id = req.params.id;

  try {
    const doctor = await Doctor.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: doctor,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Failed in updating the user" });
  }
};

export const deleteDoctor = async (req, res) => {
  const id = req.params.id;

  try {
    await Doctor.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Faild to delete the doctor" });
  }
};

export const GetSingleDoctor = async (req, res) => {
  const id = req.params.id;

  try {
    const singledoctor = await Doctor.findById(id).populate({
      path: "reviews",
      populate: {
        path: "user",
        select: "name photo",
      },
    });
    console.log(singledoctor, "-----------------------------");

    return res.status(200).json({
      success: true,
      message: "Single Doctor is succesfully sent",
      data: singledoctor,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to get single doctor" });
  }
};

export const GetAllDoctor = async (req, res) => {
  try {
    console.log("Se");
    const { search } = req.query;
    console.log("seco");

    let doctors;
    // if (search && search.trim() !== "") {
    //   console.log("opened doctrs query");
    //   doctors = await Doctor.find({
    //     isApproved: "approved",
    //     $or: [
    //       { name: { $regex: query, $options: "i" } },
    //       { specialization: { $regex: query, $options: "i" } },
    //     ],
    //   }).select("-password");
    // } else {
    console.log("hi");
    doctors = await Doctor.find({}).select("-password");

    // }
    return res.status(200).json({
      success: true,
      message: "Doctors fetched successfully",
      data: doctors,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch all doctors" });
  }
};

export const getDoctorProfile = async (req, res) => {
  const doctorId = req.userId;
  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }
    const { password, ...rest } = doctor._doc;
    const appointments = await BookingSchema.findById({ doctor: doctorId });

    res.status(200).json({
      success: true,
      message: "Profile info is getting",
      data: { ...rest, appointments },
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Something wen wront, cannot get" });
  }
};
