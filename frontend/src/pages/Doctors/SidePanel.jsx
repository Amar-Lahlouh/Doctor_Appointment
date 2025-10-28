import React from "react";
import convertTime from "../../utils/convertTime";
import { BASE_URL } from "../../config";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { MdClear } from "react-icons/md";
import Loading1 from "../../components/Loading/Loading";

function SidePanel({ doctorId, ticketPrice, WorkTime, loading }) {
  console.log(loading);
  const [FilteredWorkTime, setFilteredWorkTime] = useState([]);
  const [FilterDate, setFilterDate] = useState(null);
  const [CLearDate, setClearDate] = useState(false);
  const bookingHandler = async (id) => {
    console.log(id, "id");
    try {
      const res = await axios.post(
        `${BASE_URL}/bookings/checkout-session/${doctorId}`,
        { id },
        {
          withCredentials: true,
        }
      );
      const data = res.data;
      console.log(data, "data");
      if (data.session.url) {
        window.location.href = data.session.url;
      }
      console.log(res.data);
    } catch (err) {
      toast.error(err.message);
    }
  };
  useEffect(() => {
    const CheckWork = async () => {
      if (WorkTime && WorkTime.length > 0) {
        const now = new Date();

        const validSlots = [];

        for (const slot of WorkTime) {
          const slotDate = new Date(slot.day);

          if (slotDate < now && !slot.booked) {
            try {
              await axios.put(
                `${BASE_URL}/bookings/checkexpirey`,
                { id: slot._id },
                { withCredentials: true }
              );
            } catch (error) {
              console.error("Error updating expiry:", error);
            }
          } else if (slotDate >= now && !slot.booked) {
            validSlots.push(slot);
          }
        }

        setFilteredWorkTime(validSlots);
      }
    };

    CheckWork();
  }, [WorkTime]);
  console.log(WorkTime, "filterdate");
  return (
    <>
      {WorkTime.length > 0 ? (
        <>
          <div className="flex justify-end gap-3 align-middle  w-fit ml-auto mb-3 ">
            <label htmlFor="date" className="font-bold text-xl my-auto">
              Filter By Date:{" "}
            </label>
            <input
              id="date"
              type="date"
              value={FilterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="border p-3 rounded border-gray-400 "
            />
            {FilterDate && (
              <button
                onClick={() => {
                  setFilterDate(""), setClearDate(true);
                }}
                className="bg-gray-400 w-fit  h-fit my-auto p-3 cursor-pointer rounded-[50%]"
              >
                <MdClear />
              </button>
            )}
          </div>

          <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-gray-700 font-semibold">
                  Date
                </th>
                <th className="px-4 py-2 text-left text-gray-700 font-semibold">
                  Time
                </th>
                <th className="px-4 py-2 text-left text-gray-700 font-semibold">
                  Book
                </th>
              </tr>
            </thead>
            {loading && <Loading1 />}
            <tbody className="bg-white divide-y divide-gray-200">
              {!FilterDate ? (
                FilteredWorkTime?.map(
                  (t, index) =>
                    t.booked == false && (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-2">{t.day}</td>
                        <td className="px-4 py-2">
                          {t.Starttime} to {t.EndTime}
                        </td>

                        <td className="px-4 py-2">
                          <button
                            onClick={() => bookingHandler(t?._id)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                          >
                            Book Appointment
                          </button>
                        </td>
                      </tr>
                    )
                )
              ) : (
                <>
                  {FilteredWorkTime.filter((t) => t.day == FilterDate).map(
                    (t, index) =>
                      t.booked == false && (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-2">{t.day}</td>
                          <td className="px-4 py-2">{t.time}</td>
                          <td className="px-4 py-2">
                            <button
                              onClick={() => bookingHandler(t?._id)}
                              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                            >
                              Book Appointment
                            </button>
                          </td>
                        </tr>
                      )
                  )}
                </>
              )}
            </tbody>
          </table>
          {/* {checktime.length == 0 && (
            <p className="text-center mt-8 text-red-600 border">
              No Available Appointments! Come Later
            </p>
          )} */}
        </>
      ) : (
        <>
          <h2 className="text-center text-xl font-bold">
            No Appointments Yet!
          </h2>
        </>
      )}
    </>
  );
}

export default SidePanel;
