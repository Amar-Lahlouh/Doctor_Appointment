import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import Booking from "../models/BookingSchema.js";
import Stripe from "stripe";
import ReviewSchema from "../models/ReviewSchema.js";

export const getCheckoutSession = async (req, res) => {
  try {
    let { id } = req.body;

    console.log(id, "iddddddddddddddddddddddddddddddddddddddd");
    console.log("Entered checkout session");

    const doctor = await Doctor.findById(req.params.doctorId);
    console.log(doctor);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    const user = await User.findById(req.id); // use req.id set by middleware
    if (!user) return res.status(404).json({ message: "User not found" });

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const ticketPrice = Number(doctor.ticketPrice);
    if (isNaN(ticketPrice)) {
      return res.status(400).json({ message: "Invalid doctor ticket price" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.CLIENT_SITE_URL}/checkout-success`,
      cancel_url: `${req.protocol}://${req.get("host")}/doctors/${doctor.id}`,
      customer_email: user.email,
      client_reference_id: req.params.doctorId,
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: ticketPrice * 100, // must be integer
            product_data: {
              name: doctor.name,
              description: doctor.bio,
              // images: [doctor.photo] || null,
            },
          },
          quantity: 1,
        },
      ],
    });

    const booking = new Booking({
      doctor: doctor._id,
      user: user._id,
      WorkTime: id,
      ticketPrice: doctor.ticketPrice,
      session: session.id,
    });
    await booking.save();

    let updatedoctor = await Doctor.findOneAndUpdate(
      { _id: req.params.doctorId, "WorkTime._id": id }, // find the doctor and array element
      { $set: { "WorkTime.$.booked": true } }, // update the booked field
      { new: true } // return the updated document
    );
    if (!updatedoctor) {
      return res
        .status(404)
        .json({ message: "Error occured in updating the worktime" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Checkout session created", session });
  } catch (err) {
    console.error("Error in checkout session:", err);
    return res
      .status(500)
      .json({ success: false, message: "Error creating checkout session" });
  }
};

export const CheckExpirey = async (req, res) => {
  const { id } = req.body; // id of the worktime slot

  try {
    const updatedDoctor = await Doctor.findOneAndUpdate(
      { "WorkTime._id": id }, // find doctor with this worktime id
      { $set: { "WorkTime.$.expired": true } }, // update that specific slot
      { new: true }
    );

    if (!updatedDoctor) {
      return res
        .status(404)
        .json({ success: false, message: "Slot not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Slot marked as expired",
      updatedDoctor,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Error updating expired slot" });
  }
};

export const FetchBooking = async (req, res) => {
  try {
    const { id } = req.params;

    // Get all bookings for this doctor
    const appointments = await Booking.find({ doctor: id }).populate("user");

    if (appointments.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Appointments Yet!",
      });
    }

    // Get doctor with WorkTime
    const doctorTime = await Doctor.findById(id);

    // Merge each booking with its matching worktime details
    const mergedAppointments = appointments.map((booking) => {
      const matchedWorkTime = doctorTime?.WorkTime?.find(
        (t) => String(t._id) === String(booking.WorkTime)
      );

      return {
        ...booking.toObject(),
        workTimeDetails: matchedWorkTime || null,
      };
    });

    return res.status(200).json({
      success: true,
      message: "Appointments Fetched Successfully",
      data: mergedAppointments,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error in Loading bookings",
    });
  }
};

export const FetchReviews = async (req, res) => {
  try {
    const reviews = await ReviewSchema.find({}).populate("user");
    return res.status(200).json({
      success: true,
      message: "Reviews are fetched Successfully",
      data: reviews,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Error in Loading Reviews" });
  }
};
