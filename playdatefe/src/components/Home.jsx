import React, { Component } from "react";
import Slider from "react-slick";
import Header from './Header';
import Footer from "./Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../styles/Home.css'

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <div className="home">

      <Header />
      <div className='content'>
        <div className="container">
          <Slider {...settings}>
            <div className="slide">
              <h2>What is PLAYDATE?</h2>
              <p>PLAYDATE is a service where parents Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe tempora quisquam sit maxime excepturi id perferendis magni natus sapiente temporibus.</p>
            </div>
            <div className="slide">
              <h2>What is PLAYDATE?</h2>
              <p>PLAYDATE is a service where parents Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe tempora quisquam sit maxime excepturi id perferendis magni natus sapiente temporibus.</p>
            </div>
          </Slider>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Home