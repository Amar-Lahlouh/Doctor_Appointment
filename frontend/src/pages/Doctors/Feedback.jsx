import React, { useState } from "react";
import { formateDate } from "../../utils/formateDate";
import { AiFillStar } from "react-icons/ai";
import FeedbackForm from "./FeedbackForm";

function Feedback({ reviews, totalRating, onSubmitReview }) {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  console.log(reviews);
  return (
    <div>
      <div className="mb-[50px]">
        <h4 className="text-[20px] leading-[30px] font-bold text-heading mb-[30px]">
          All reivews({totalRating})
        </h4>
        <div
          className={`${
            reviews?.length > 5 ? "max-h-[300px] overflow-y-auto" : ""
          }`}
        >
          {reviews?.map((review, index) => (
            <div key={index} className="flex justify-between gap-10 mb-[30px]">
              <div className="flex gap-3">
                <figure className="w-10 h-10 rounded-full">
                  <img
                    loading="lazy"
                    src={review?.user?.photo}
                    alt=""
                    className="w-full rounded-full"
                  />
                </figure>
                <div>
                  <h5 className="text-[16px] leading-6 text-primarycolor font-bold">
                    {review?.user?.name}
                  </h5>
                  <p className="text-[14px] leading-6 text-textcolor">
                    {formateDate(review?.createdAt)}
                  </p>
                  <p className="text__para mt-3 font-medium text-[15px]">
                    {review.reviewText}
                  </p>
                </div>
              </div>

              <div className="flex gap-1">
                {[...Array(review?.rating).keys()].map((_, index) => (
                  <AiFillStar key={index} color="#0067FF" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {!showFeedbackForm && (
        <div className="text-center">
          <button className="btn" onClick={() => setShowFeedbackForm(true)}>
            Give Feedback
          </button>
        </div>
      )}

      {showFeedbackForm && <FeedbackForm onSubmitReview={onSubmitReview} />}
    </div>
  );
}

export default Feedback;
