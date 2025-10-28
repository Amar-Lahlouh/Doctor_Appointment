import React, { useContext, useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { useParams } from "react-router-dom";
import Loading1 from "../../components/Loading/Loading";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../../config";
import { authContext } from "../../context/authContext";
function FeedbackForm({ onSubmitReview }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  console.log(id);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!rating || !reviewText.trim()) {
        setLoading(false);
        toast.error("Rating and Review fields are required");
        return;
      }

      await onSubmitReview({
        rating,
        reviewText,
      });

      setRating(0);
      setReviewText("");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmitReview}>
      <div>
        <h3 className="text-heading text-[16px] leading-6 font-semibold mb-4">
          How would you rate the overall experience?
        </h3>

        <div className="flex" onMouseLeave={() => setHover(0)}>
          {[...Array(5)].map((_, index) => {
            const i = index + 1;
            const isActive = i <= (hover || rating);

            return (
              <button
                key={i}
                type="button"
                className={`${
                  isActive ? "text-yellow-400" : "text-gray-400"
                } bg-transparent border-none outline-none text-[22px] cursor-pointer`}
                onClick={() => setRating(i)}
                onMouseEnter={() => setHover(i)}
                onDoubleClick={() => {
                  setHover(0);
                  setRating(0);
                }}
                aria-label={`Rate ${i} star${i > 1 ? "s" : ""}`}
              >
                <AiFillStar />
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-[30px]">
        <h3 className="text-heading text-[16px] leading-6 font-semibold mb-4">
          Share your feedback or suggestions*
        </h3>
        <textarea
          className="border border-solid border-[#0066ff34] focus:outline-primarycolor w-full px-4 py-3 rounded-md"
          rows="5"
          placeholder="Write your message"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        ></textarea>
      </div>

      <button type="submit" className="btn mt-4">
        {loading ? "Adding..." : "Submit feedback"}
      </button>

      <ToastContainer
        theme="dark"
        position="top-right"
        autoClose={3000}
        closeOnClick
        pauseOnHover={false}
      />
    </form>
  );
}

export default FeedbackForm;
