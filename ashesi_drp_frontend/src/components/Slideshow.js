"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import CustomButton from "@/components/CustomButton";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const images = [
  "/images/welcome/campus1.png",
  "/images/welcome/campus.jpg",
  "/images/welcome/glass.jpg",
  "/images/welcome/library.webp",
];

export default function Slideshow() {
  return (
    <div className="relative w-full h-[60vh] md:h-[60vh] lg:h-[70vh]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        navigation
        // pagination={{ clickable: true }}
        autoplay={{ delay: 8000, disableOnInteraction: false }}
        loop={true}
        className="w-full h-full"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[40vh] md:h-[50vh] lg:h-[60vh] overflow-hidden">
              <Image
                src={src}
                alt={`Slide ${index + 1}`}
                fill
                className="object-cover"
                priority
              />
              
              {/* Text Overlay */}
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-4">
                <h1 className="text-white mt-16 text-2xl md:text-4xl lg:text-5xl font-bold mb-4">
                  Explore Our Data Repository
                </h1>
                <p className="text-white text-md md:text-lg max-w-2xl mb-6">
                  Discover datasets, contribute your own, and unlock insights from a community-powered platform.
                </p>
                <div className="flex gap-4 flex-wrap justify-center">
                  <div className="flex justify-center mb-8">
            				<CustomButton
            					text="Explore Data"
            					bgColor="bg-transparent"
            					width="w-64"
            					href="/collections"
            					className="border border-white text-white font-semibold px-6 py-2 rounded hover:bg-white hover:text-black transition"
            				/>
            			</div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}        
      </Swiper>
    </div>
  );
}
