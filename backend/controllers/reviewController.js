import Review from "../models/ReviewSchema.js";

import Doctor from "../models/DoctorSchema.js";

//get all reviews

export const GetAllReviews = async (req, res) => {
  try {
    const doctorId = req.params.doctorId; // doctor ID from URL
    const doctor = await Doctor.findById(doctorId).populate("reviews");

    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Reviews fetched successfully",
      data: doctor.reviews,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ccreate review

export const createReview = async (req, res) => {
  if (!req.body.doctor) req.body.doctor = req.params.doctorId;
  if (!req.body.user) req.body.user = req.userId;
  console.log(req.user.role, "role");
  if (req.user.role == "patient") {
    const newReview = new Review(req.body);
    try {
      const savedReview = await newReview.save();
      await Doctor.findByIdAndUpdate(req.body.doctor, {
        $push: { reviews: savedReview._id },
      });

      res.status(200).json({
        success: true,
        message: "Review submitted",
        data: savedReview,
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  } else {
    return res
      .status(404)
      .json({ message: "You are not Authorized", success: false });
  }
};
