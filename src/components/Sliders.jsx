import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";

const Sliders = () => {
  return (
    <div className="mb-5">
<h1 className="lg:text-3xl text-center pt-8 font- font-bold">
    Your abundance can become anothers joy
</h1>
      <p className="w-[90%] mx-auto mt-3 ">
        Experience the joy of sharing food and spreading happiness with our
        community-driven platform.
        Indulge in the satisfaction of not only satisfying your taste buds but also making a positive impact in someone elses life. Join us in creating moments of delight as
        we connect enthusiasts and a culture of sharing. Discover
        the power of sharing a meal and making someones day brighter on our
        food-sharing platform.
      </p>

      <Swiper
        modules={[Navigation, Pagination, Scrollbar, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{ delay: 4000 }}
        loop={true}
        loopAdditionalSlides={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        <SwiperSlide>
          <img
            src="https://i.postimg.cc/KjHY38mm/pexels-rdne-6646917.jpg"
            alt=""
            style={{
              width: "100%",
              height: "80vh",
              marginTop: "20px",
              borderRadius: "5px"
            }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://i.postimg.cc/QCttMTG6/pexels-julia-m-cameron-6995247.jpg"
            alt=""
            style={{
              width: "100%",
              height: "80vh",
              marginTop: "20px",
              borderRadius: "5px"
            }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://i.postimg.cc/Dfj0MBLR/pexels-rdne-6646768.jpg"
            alt=""
            style={{
              width: "100%",
              height: "80vh",
              marginTop: "20px",
              borderRadius: "5px"
            }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://i.postimg.cc/Y92g1jBF/pexels-julia-m-cameron-8841222.jpg"
            alt=""
            style={{
              width: "100%",
              height: "80vh",
              marginTop: "20px",
              borderRadius: "2px"
            }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://i.postimg.cc/wvFMHkPy/pexels-julia-m-cameron-6994982.jpg"
            alt=""
            style={{
              width: "100%",
              height: "80vh",
              marginTop: "20px",
              borderRadius: "2px"
            }}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Sliders;
