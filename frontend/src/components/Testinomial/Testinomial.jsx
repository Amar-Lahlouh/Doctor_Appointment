import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import patientAvatar from "../../assets/images/patient-avatar.png";
// patien-avatar.png";
import { FaStar } from "react-icons/fa";
import { testimonials } from "./TestinomialData";
import axios from "axios";
import { BASE_URL } from "../../config";
import Loading1 from "../Loading/Loading";
function Testinomial() {
  const [Reviews, setReviews] = useState(null);
  useEffect(() => {
    const FetchReviews = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/bookings/fetchreviews`);
        setReviews(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    FetchReviews();
  }, []);
  return (
    <div className="container">
      <div className="xl:w-[470px] mx-auto">
        <h2 className="heading mt-5 text-center">What our patients say</h2>
        <p className="text__para text-center">
          World-class care of everyone. Our health System offers unmatched,
          expert health care.
        </p>
      </div>
      <div className="mt-[30px] lg:mt-[55px]">
        <Swiper
          modules={[Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >
          {Reviews &&
            Reviews?.map((t, index) => (
              <SwiperSlide>
                <div className="py-[30px] px-5 rounded-md">
                  <div className="flex items-center gap-[13px]">
                    <img
                      loading="lazy"
                      src={t.user?.photo}
                      alt=""
                      className="w-[45px] rounded-[50%]"
                    />
                    <div>
                      <h4 className="text-[18px] leading-[30px] font-semibold text-heading">
                        {t.user?.name}
                      </h4>
                      <div className="flex items-center gap-[2px]">
                        {[...Array(t.rating)].map((_, i) => (
                          <FaStar key={i} className="text-orange-600" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-[16px] leading-7 mt-4 text-textcolor font-[400]">
                    "{t.reviewText}"
                  </p>
                </div>
              </SwiperSlide>
            ))}
          :(
          <>{!Reviews && <Loading1 />}</>)
        </Swiper>
      </div>
    </div>
  );
}

export default Testinomial;
