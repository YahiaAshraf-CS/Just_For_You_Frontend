import React from 'react'
import ButtonPink from '../components/buttons/ButtonPink'
import Navbarhome from '../layout/Navbarhome'
import Footer from '../layout/Footer'
import "../style/HomePage.css";
import logo from '../assets/images/logoimg.jpeg'
import img1 from '../assets/images/circle3-yellow.svg'
import img2 from '../assets/images/dots3-blue.svg'
import storeOut1 from '../assets/images/storeOut1.jpeg' ;
import storeOut2 from '../assets/images/storeOut2.jpeg' ;
import storeIn1 from '../assets/images/storeIn1.jpeg';
import storeIn2 from '../assets/images/storeIn2.jpeg';
import storeIn3 from '../assets/images/storeIn3.jpeg';
import storeIn4 from '../assets/images/storeIn4.jpeg';
import acss from '../assets/images/acss.jpeg';
import perfumes from "../assets/images/perfumes.jpeg";
import gifts from "../assets/images/gifts.jpeg";
import ButtonLight from '../components/buttons/ButtonLight';
import { useEffect, useState } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
import NavbarUser from '../layout/NavbarUser';
function HomePage() {

  
 
    const [currentUser, setCurrentUser] = useState(null);
    

    
    useEffect(() => {
            let user = JSON.parse(localStorage.getItem("currentUser"));
            // const user = JSON.parse(localStorage.getItem("currentUser"));
            setCurrentUser(user);
             
            
        }, []);
       
    
      
    return (
        <>
            {/* navbar */}
            {currentUser != null ? <NavbarUser className=" fixed" /> : <Navbarhome className=" fixed" />}
            {/* section intro */}
            <section id="intro" className=" w-full    h-fit flex flex-col items-center justify-between">
                <main className=" w-full h-fit flex flex-col-reverse md:flex-row flex-wrap- items-center justify-center gap-4 md:gap-6 lg:gap-8 xl:gap-12 mt-18 mb-18 px-3 ">
                    <div id="text" className=" flex flex-col items-center  justify-start w-[100%]  md:w-[45%] gap-4">
                        <span className="text-sm mt-3 mr-[75%] mb-3 w-fit h-fit flex justify-items-start  px-2 py-1 bg-[var(--color-prinky)] text-white rounded-2xl font-semibold">SPECIAL GIFTS</span>
                        <h1 className="text-5xl w-[90%] mb-6 justify-self-start font-bold">Perfect Gifts & Accessories Just For You</h1>
                        <p className="text-md w-[90%] font-normal text-gray-600 justify-self-start">
                            Discover our beautiful collection of unique gifts and stylish accessories.And our amazing perfumes. Each piece is carefully selected to make your special moments even more
                            memorable.{" "}
                        </p>
                        <div id="btns" className=" w-full h-fit flex items-center justify-start gap-6 mt-6 ml-15">
                            {currentUser != null ? <ButtonPink to="/product">Shop Now</ButtonPink> : <ButtonPink to="/sign">Shop Now</ButtonPink>}
                        </div>
                    </div>
                    <div id="images" className="flex flex-col items-center justify-center w-[80%] md:w-[45%] ">
                        <img src={img1} className=" relative right-[35%]   bottom-[-70px]" alt="" />
                        <img
                            style={{ animationDelay: "1s", animationTimeline: "ease-in-out", animationDuration: "1s", animationFillMode: "forwards" }}
                            className=" rounded-bl-[75px] cursor-pointer rounded-tr-[75px] hover:rounded-br-[75px] hover:rounded-tl-[75px] transform duration-500 ease-in-out"
                            src={logo}
                            alt=""
                        />
                        <img src={img2} className=" relative left-[35%]  top-[-70px]" alt="" />
                    </div>
                </main>
            </section>
            {/* section swiper */}
            <section id="swiper" className=" w-full h-fit flex flex-col items-center justify-center mt-10 mb-10 px-3 ">
                <main className="slider-main-container ">
                    <swiper-container
                        navigation-next-el=".custom-next-button"
                        navigation-prev-el=".custom-prev-button"
                        pagination-clickable="true"
                        pagination-dynamic-bullets="true"
                        pagination-type="bullets"
                        autoplay-delay="1000"
                        slides-per-view="1"
                        effect="slide"
                        speed="1000"
                        loop="true"
                        autoplay-disable-on-interaction="false"
                        center-slides="true"
                        style={{
                            "--swiper-pagination-color": "#fff",
                            "--swiper-pagination-bullet-size": "15px",
                        }}>
                        <swiper-slide>
                            <img id="imgs" className=" w-full h-full" src={storeOut1} alt="" />
                        </swiper-slide>

                        <swiper-slide>
                            <img id="imgs" src={storeOut2} alt="" />
                        </swiper-slide>

                        <swiper-slide>
                            <img id="imgs" src={storeIn1} alt="" />
                        </swiper-slide>

                        <swiper-slide>
                            <img id="imgs" src={storeIn2} alt="" />
                        </swiper-slide>

                        <swiper-slide>
                            <img id="imgs" src={storeIn3} alt="" />
                        </swiper-slide>
                        <swiper-slide>
                            <img id="imgs" src={storeIn4} alt="" />
                        </swiper-slide>

                        {/* Navigations */}
                    </swiper-container>

                    <div className="nav-btn custom-prev-button">
                        {/* <!-- https://feathericons.dev/?search=arrow-left&iconset=feather --> */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            className="main-grid-item-icon"
                            fill="none"
                            stroke="#fff"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2">
                            <line x1="19" x2="5" y1="12" y2="12" />
                            <polyline points="12 19 5 12 12 5" />
                        </svg>
                    </div>

                    <div className="nav-btn custom-next-button">
                        {/* <!-- https://feathericons.dev/?search=arrow-right&iconset=feather --> */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            className="main-grid-item-icon"
                            fill="none"
                            stroke="#fff"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2">
                            <line x1="5" x2="19" y1="12" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                        </svg>
                    </div>
                </main>
            </section>
            {/* section types */}
            <section id="types" className="w-full h-fit flex flex-col items-center justify-center mt-16 mb-16 px-4">
                <main className="container mx-auto">
                    <div id="text2" className="flex justify-center items-center text-center gap-3 flex-col mb-10">
                        <span className="text-md rounded-full font-bold px-4 py-2 text-white bg-pink-600">Featured Collections</span>
                        <h1 className="text-3xl md:text-5xl font-bold text-pink-600">Curated Just For You</h1>
                    </div>

                    <div id="cards" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
                        {/* Card 1 */}
                        <div className="flex flex-col shadow-md hover:shadow-2xl transition-all duration-300 ease-in-out shadow-pink-600 rounded-2xl justify-between items-center w-full max-w-[380px] h-auto min-h-[500px] p-4 bg-white">
                            <img src={gifts} className="w-full h-[260px] object-cover rounded-2xl" alt="Gifts" />
                            <h3 className="text-2xl md:text-4xl text-center font-bold text-pink-600 mt-4">Amazing Gifts</h3>
                            <p className="text-base md:text-lg text-center text-gray-600 px-2">Thoughtfully curated gift boxes for birthdays, holidays, and special occasions</p>
                            <div className="mb-4 mt-2">{currentUser != null ? <ButtonPink to="/product">Shop Now</ButtonPink> : <ButtonLight to="/sign">Shop Now</ButtonLight>}</div>
                        </div>

                        {/* Card 2 */}
                        <div className="flex flex-col shadow-md hover:shadow-2xl transition-all duration-300 ease-in-out shadow-pink-600 rounded-2xl justify-between items-center w-full max-w-[380px] h-auto min-h-[500px] p-4 bg-white">
                            <img src={acss} className="w-full h-[260px] object-cover rounded-2xl" alt="Accessories" />
                            <h3 className="text-2xl md:text-4xl text-center font-bold text-pink-600 mt-4">Fashion Accessories</h3>
                            <p className="text-base md:text-lg text-center text-gray-600 px-2">Stylish Betels and accessories to complete your perfect look</p>
                            <div className="mb-4 mt-2">{currentUser != null ? <ButtonPink to="/product">Shop Now</ButtonPink> : <ButtonLight to="/sign">Shop Now</ButtonLight>}</div>
                        </div>

                        {/* Card 3 */}
                        <div className="flex flex-col shadow-md hover:shadow-2xl transition-all duration-300 ease-in-out shadow-pink-600 rounded-2xl justify-between items-center w-full max-w-[380px] h-auto min-h-[500px] p-4 bg-white">
                            <img src={perfumes} className="w-full h-[260px] object-cover rounded-2xl" alt="Perfumes" />
                            <h3 className="text-2xl md:text-4xl text-center font-bold text-pink-600 mt-4">Wonderful Perfumes</h3>
                            <p className="text-base md:text-lg text-center text-gray-600 px-2">Unleash your inner goddess with our exquisite perfumes</p>
                            <div className="mb-4 mt-2">{currentUser != null ? <ButtonPink to="/product">Shop Now</ButtonPink> : <ButtonLight to="/sign">Shop Now</ButtonLight>}</div>
                        </div>
                    </div>
                </main>
            </section>
            {/* footer */}
            <Footer />
        </>
    );
}

export default HomePage
