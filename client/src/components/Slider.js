import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./Slider.css";
import {Pagination} from "swiper";
import d1 from "../static/дача1.jpg"
import d2 from "../static/дача2.jpg"
import d3 from "../static/дача3.jpg"
import d4 from "../static/дача4.jpg"

export default function Slider() {
    return (
        <>
            <Swiper pagination={true} modules={[Pagination]}  className="mySwiper">
                <SwiperSlide>
                    <img src={d1} alt="dacha"/>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={d2} alt="dacha"/>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={d3} alt="dacha"/>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={d4} alt="dacha"/>
                </SwiperSlide>
            </Swiper>
        </>
    );
}
