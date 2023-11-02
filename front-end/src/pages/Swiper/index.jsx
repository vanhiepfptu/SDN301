// import React from "react";
// import { Pagination, A11y, Autoplay } from "swiper";
// import { Swiper, SwiperSlide } from "swiper/react";

// // Import Swiper styles
// import "swiper/css";
// import "Swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/scrollbar";
// import SwiperCard from "../card/SwiperCard";
// export default ({ swiperMovie }) => {
//   return (
//     <Swiper
//       modules={[Autoplay]}
//       spaceBetween={30}
//       slidesPerView={3.5}
//       pagination
//       autoplay={{
//         delay: 2000,
//         disableOnInteraction: false,
//       }}
//       breakpoints={{
//         300: {
//           slidesPerView: 1,
//           spaceBetween: 0,
//         },
//         800: {
//           slidesPerView: 2,
//           spaceBetween: 30,
//         },
//         1000: {
//           spaceBetween: 30,
//           slidesPerView: 3.5,
//         },
//       }}
//     >
//       {swiperMovie?.map((item, index) => {
//         return (
//           <SwiperSlide key={index + "swiperHome"}>
//             <SwiperCard item={item} />
//           </SwiperSlide>
//         );
//       })}
//     </Swiper>
//   );
// };
