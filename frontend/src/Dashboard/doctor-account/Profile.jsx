import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import uploadFile from "../../utils/uploadImageKit";
import { toast, ToastContainer } from "react-toastify";
import { BASE_URL } from "../../config";
import axios from "axios";
function Profile({ doctorData }) {
  console.log("Datttt", doctorData);
  // let doctorData = doctorDat.doctorDat;
  // console.log(doctorDat.doctorData, "doctordata");
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
    phone: "",
    bio: "",
    gender: "",
    specialization: "",
    ticketPrice: 0,
    photo: null,
    qualifications: [],
    experiences: [],
    timeSlots: [],
    WorkTime: [],
    about: "",
  });
  useEffect(() => {
    setFormData({
      name: doctorData?.name,
      email: doctorData?.email,
      phone: doctorData?.phone,
      bio: doctorData?.bio,
      gender: doctorData?.gender,
      specialization: doctorData?.specialization,
      ticketPrice: doctorData?.ticketPrice,
      photo: doctorData?.photo,
      qualifications: doctorData?.qualifications,
      experiences: doctorData?.experiences,
      timeSlots: doctorData?.timeSlots,
      about: doctorData?.about,
      WorkTime: doctorData?.WorkTime,
    });
  }, [doctorData]);
  console.log(doctorData, "formdata");
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFileInputChange = async (event) => {
    console.log("hello");
    const file = event.target.files[0];
    console.log(file);
    const data = await uploadFile(file, file.name);
    setFormData({ ...formData, photo: data?.url });
  };

  const addItem = (key, item) => {
    setFormData((previewData) => ({
      ...previewData,
      [key]: [...previewData[key], item],
    }));
  };
  console.log(formData, "formData");
  const addQualification = (e) => {
    e.preventDefault();
    addItem("qualifications", {
      startingDate: "",
      endingDate: "",
      degree: "PHD",
      university: "Dhaka Medical College",
    });
  };
  const updateProfileHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `${BASE_URL}/doctors/${doctorData._id}`,
        formData,
        { withCredentials: true }
      );
      // console.log(res.data);
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.message);
    }
  };
  //reusable input change function
  const handleReusableInputChangeFunc = (key, index, event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      const updateItems = [...prevFormData[key]];
      updateItems[index][name] = value;
      return {
        ...prevFormData,
        [key]: updateItems,
      };
    });
  };

  //reusable function for deleting item
  const deleteItem = (key, index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: prevFormData[key].filter((_, i) => i !== index),
    }));
  };
  const handleQualificationChange = (event, index) => {
    handleReusableInputChangeFunc("qualifications", index, event);
  };
  const deleteQualification = (e, index) => {
    e.preventDefault();
    deleteItem("qualifications", index);
  };
  const addExperience = (e) => {
    e.preventDefault();
    addItem("experiences", {
      startingDate: "",
      endingDate: "",
      position: "Senior Surgeon",
      hospital: "Public College",
    });
  };
  const deleteExperience = (e, index) => {
    e.preventDefault();
    deleteItem("experiences", index);
  };
  const handleExperienceChange = (event, index) => {
    handleReusableInputChangeFunc("experiences", index, event);
  };

  const addTimeSlots = (e) => {
    e.preventDefault();
    addItem("WorkTime", {
      day: "",
      Starttime: "",
      EndTime: "",
      expired: false,
      booked: false,
    });
  };

  const deleteTimeSlot = (e, index) => {
    e.preventDefault();
    deleteItem("WorkTime", index);
  };
  const handleTimeSlotChange = (event, index) => {
    handleReusableInputChangeFunc("WorkTime", index, event);
  };
  console.log(formData, "worktime");
  const [FilteredDates, setFilteredDates] = useState([]);

  useEffect(() => {
    // Keep FilteredDates in sync with formData.WorkTime
    setFilteredDates(formData.WorkTime || []);
  }, [formData.WorkTime]);

  const FilterBookedSlotsFunction = (t) => {
    let bookedSlots;
    if (t == 1) {
      bookedSlots = formData.WorkTime.filter(
        (slot) => slot.booked === true && slot.expired == false
      );
    } else if (t == 2) {
      bookedSlots = formData.WorkTime.filter((slot) => slot.expired == true);
    } else if (t == 3) {
      bookedSlots = formData.WorkTime.filter(
        (slot) => slot.expired == false && slot.booked == false
      );
    } else {
      bookedSlots = formData.WorkTime;
    }

    setFilteredDates(bookedSlots);
  };

  // console.log(FilteredDates);
  return (
    <div>
      <h2 className="text-heading font-bold text-[24px] leading-9 mb-10">
        Profile Information
      </h2>
      <form action="">
        <div className="mb-5">
          <p className="form__label">Name</p>
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Full Name"
            className="form__input"
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-5">
          <p className="form__label">Email</p>
          <input
            type="text"
            name="email"
            value={formData.email}
            placeholder="Email Name"
            className="form__input bg-gray-50"
            readOnly
            aria-readonly
            disabled="true"
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-5">
          <p className="form__label">Phone</p>
          <input
            type="number"
            name="phone"
            value={formData.phone}
            placeholder="Phone Number"
            className="form__input "
            readOnly
            aria-readonly
            disabled="true"
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-5">
          <p className="form__label">Bio</p>
          <input
            type="text"
            name="bio"
            value={formData.bio}
            placeholder="Bio"
            className="form__input "
            readOnly
            aria-readonly
            disabled="true"
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-5">
          <div className="grid grid-cols-3 gap-5 mb-[30px]">
            <div>
              <p className="form__label">Gender</p>
              <select
                name="gender"
                id=""
                className="form__input py-3.5"
                value={formData.gender}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <p className="form__label">Specialization</p>
              <select
                name="specialization"
                id=""
                className="form__input py-3.5"
                value={formData.specialization}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                <option value="surgeon">Surgeon</option>
                <option value="neurologist">Neurologist</option>
                <option value="dermatologist">Dermatologist</option>
              </select>
            </div>
            <div>
              <p className="form__label">Ticket Price*</p>
              <input
                type="number"
                placeholder="100"
                name="ticketPrice"
                value={formData.ticketPrice}
                className="form__input"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="mb-5">
            <p className="form__label">Qualifications*</p>
            {formData.qualifications?.map((item, index) => (
              <div key={index}>
                <div>
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <p className="form__label">Starting Date*</p>
                      <input
                        type="date"
                        name="startingDate"
                        value={item.startingDate}
                        className="form__input w-full"
                        onChange={(e) => handleQualificationChange(e, index)}
                      />
                    </div>
                    <div>
                      <p className="form__label">Ending Date*</p>
                      <input
                        type="date"
                        name="endingDate"
                        value={item.endingDate}
                        className="form__input"
                        onChange={(e) => handleQualificationChange(e, index)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <p className="form__label">Degree</p>
                      <input
                        type="text"
                        name="degree"
                        value={item.degree}
                        className="form__input w-full"
                        onChange={(e) => handleQualificationChange(e, index)}
                      />
                    </div>
                    <div>
                      <p className="form__label">University</p>
                      <input
                        type="text"
                        name="university"
                        value={item.university}
                        className="form__input"
                        onChange={(e) => handleQualificationChange(e, index)}
                      />
                    </div>
                  </div>
                  <button
                    onClick={(e) => deleteQualification(e, index)}
                    className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px]"
                  >
                    <AiOutlineDelete />
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={(e) => addQualification(e)}
              className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer"
            >
              Add Qualification
            </button>
          </div>
          <div className="mb-5">
            <p className="form__label">Experience*</p>
            {formData.experiences?.map((item, index) => (
              <div key={index}>
                <div>
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <p className="form__label">Starting Date*</p>
                      <input
                        type="date"
                        name="startingDate"
                        value={item.startingDate}
                        className="form__input w-full"
                        onChange={(e) => handleExperienceChange(e, index)}
                      />
                    </div>
                    <div>
                      <p className="form__label">Ending Date*</p>
                      <input
                        type="date"
                        name="endingDate"
                        value={item.endingDate}
                        className="form__input"
                        onChange={(e) => handleExperienceChange(e, index)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <p className="form__label">Position</p>
                      <input
                        type="text"
                        name="position"
                        value={item.position}
                        className="form__input w-full"
                        onChange={(e) => handleExperienceChange(e, index)}
                      />
                    </div>
                    <div>
                      <p className="form__label">Hospital</p>
                      <input
                        type="text"
                        name="hospital"
                        value={item.hospital}
                        className="form__input"
                        onChange={(e) => handleExperienceChange(e, index)}
                      />
                    </div>
                  </div>
                  <button
                    onClick={(e) => deleteExperience(e, index)}
                    className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px]"
                  >
                    <AiOutlineDelete />
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={addExperience}
              className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer"
            >
              Add Experiences
            </button>
          </div>
          <div className="mb-5">
            <p className="form__label mb-3">Time Slots*</p>
            <div className="flex justify-between mb-3">
              <p></p>{" "}
              <el-dropdown class="inline-block ">
                <button class="inline-flex ml-auto w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring-1 inset-ring-gray-300 hover:bg-gray-50">
                  Options
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    data-slot="icon"
                    aria-hidden="true"
                    class="-mr-1 size-5 text-gray-400"
                  >
                    <path
                      d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                      clip-rule="evenodd"
                      fill-rule="evenodd"
                    />
                  </svg>
                </button>

                <el-menu
                  anchor="bottom end"
                  popover
                  class="w-56  origin-top-right rounded-md bg-white shadow-lg outline-1 outline-black/5 transition transition-discrete [--anchor-gap:--spacing(2)] data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <div class="py-1">
                    <a
                      href="#"
                      onClick={() => FilterBookedSlotsFunction(4)}
                      class="block px-4 py-2 text-sm text-gray-700 focus:bg-gray-100 focus:text-gray-900 focus:outline-hidden"
                    >
                      All
                    </a>
                    <a
                      onClick={() => FilterBookedSlotsFunction(3)}
                      href="#"
                      class="block px-4 py-2 text-sm text-gray-700 focus:bg-gray-100 focus:text-gray-900 focus:outline-hidden"
                    >
                      Active
                    </a>
                    <a
                      onClick={() => FilterBookedSlotsFunction(1)}
                      href="#"
                      class="block px-4 py-2 text-sm text-gray-700 focus:bg-gray-100 focus:text-gray-900 focus:outline-hidden"
                    >
                      Booked
                    </a>

                    <button
                      onClick={() => FilterBookedSlotsFunction(2)}
                      class="block w-full px-4 py-2 text-left text-sm text-gray-700 focus:bg-gray-100 focus:text-gray-900 focus:outline-hidden"
                    >
                      Expired
                    </button>
                  </div>
                </el-menu>
              </el-dropdown>
            </div>

            <div className="overflow-x-auto overflow-scroll max-h-[300px]">
              <table className="min-w-full border border-gray-300 rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-3 text-left border-b">Day</th>
                    <th className="py-2 px-3 text-left border-b">
                      Starting Time
                    </th>
                    <th className="py-2 px-3 text-left border-b">
                      Ending Time
                    </th>
                    <th className="py-2 px-3 text-center border-b">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {FilteredDates?.map((item, index) => {
                    return (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="py-2   px-3 aborder-b">
                          <input
                            type="date"
                            name="day"
                            value={item.day}
                            disabled={
                              item.expired === true || item.booked === true
                            }
                            className="disabled:bg-gray-200 disabled:text-gray-400 form__input w-full"
                            onChange={(e) => handleTimeSlotChange(e, index)}
                          />
                        </td>

                        <td className="py-2 px-3 border-b">
                          <input
                            type="text"
                            name="Starttime"
                            value={item.Starttime}
                            placeholder="Ex: 9am"
                            disabled={
                              item.expired === true || item.booked === true
                            }
                            className="disabled:bg-gray-200 disabled:text-gray-400 form__input w-full"
                            onChange={(e) => handleTimeSlotChange(e, index)}
                          />
                        </td>

                        <td className="py-2 px-3 border-b">
                          <input
                            type="text"
                            name="EndTime"
                            value={item.EndTime}
                            placeholder="Ex: 5pm"
                            disabled={
                              item.expired === true || item.booked === true
                            }
                            className="disabled:bg-gray-200 disabled:text-gray-400 form__input w-full"
                            onChange={(e) => handleTimeSlotChange(e, index)}
                          />
                        </td>

                        <td className="py-2 px-3 border-b text-center">
                          {item.expired !== true && item.booked == false ? (
                            <button
                              onClick={(e) => deleteTimeSlot(e, index)}
                              className="bg-red-600 hover:bg-red-700 p-2 rounded-full text-white text-[18px]"
                            >
                              <AiOutlineDelete />
                            </button>
                          ) : item.expired === true ? (
                            <span>Expired</span>
                          ) : (
                            <span className="text-gray-500 font-medium">
                              Booked
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <button
              onClick={addTimeSlots}
              className="bg-black mt-4 py-2 px-5 rounded text-white h-fit cursor-pointer"
            >
              Add Time Slots
            </button>
          </div>

          <div className="mb-5">
            <p className="form__label">About</p>
            <textarea
              name="about"
              id=""
              rows={5}
              placeholder="Write about you"
              value={formData.about}
              onChange={handleInputChange}
              className="form__input"
            ></textarea>
          </div>
          <div className="mb-5 flex items-center gap-3">
            {formData.photo && (
              <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primarycolor">
                <img
                  loading="lazy"
                  src={formData.photo}
                  alt=""
                  className="w-[100%] rounded-full"
                />
              </figure>
            )}
            <div className="relative w-[130px] h-[50px]">
              <input
                type="file"
                name="photo"
                id="customFile"
                onChange={handleFileInputChange}
                accept=".jpg , .png"
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              />
              <label
                htmlFor="customFile"
                className="absolute  top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-heading font-semibold rounded-lg truncate cursor-pointer"
              >
                Upload Photo
              </label>
            </div>
          </div>
        </div>
        <div className="mt-7">
          <button
            type="submit"
            onClick={updateProfileHandler}
            className="bg-primarycolor text-white text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg"
          >
            Update Profile
          </button>
        </div>
      </form>
      <ToastContainer
        theme="dark"
        position="top-right"
        autoClose={3000}
        closeOnClick
        pauseOnHover={false}
      />
    </div>
  );
}

export default Profile;
