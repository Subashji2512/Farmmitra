import { useEffect, useState } from "react";
import "./App.css";

import PreferredLanguage from "./PreferredLanguage";
import BasicSignup from "./BasicSignup";
import BasicOTP from "./BasicOTP";
import translations from "./translations";


function App() {

  // =========================================================
  // PAGE STATE
  // =========================================================

  const [page, setPage] = useState("login");

  const [selectedLanguage, setSelectedLanguage] =
    useState("en");

  const [signupData, setSignupData] =
    useState(null);


  // =========================================================
  // HERO TRANSLATIONS
  // =========================================================

  const heroText =
    translations[selectedLanguage] || translations.en;


  // =========================================================
  // HERO IMAGES
  // =========================================================

  const images = [
    "/farm_1.jpg",
    "/farm_2.jpg",
    "/farm_3.jpg",
  ];

  const [currentImage, setCurrentImage] =
    useState(0);


  // =========================================================
  // AUTOMATIC IMAGE SLIDER
  // =========================================================

  useEffect(() => {

    const interval = setInterval(() => {

      setCurrentImage((prev) =>
        (prev + 1) % images.length
      );

    }, 5000);

    return () => clearInterval(interval);

  }, []);


  // =========================================================
  // PREVIOUS IMAGE
  // =========================================================

  const previousImage = () => {

    setCurrentImage((prev) =>
      prev === 0
        ? images.length - 1
        : prev - 1
    );

  };


  // =========================================================
  // NEXT IMAGE
  // =========================================================

  const nextImage = () => {

    setCurrentImage((prev) =>
      (prev + 1) % images.length
    );

  };


  // =========================================================
  // HERO SECTION
  // =========================================================

  const HeroSection = ({ pageType = "default" }) => {

    return (
      <section className={`hero hero-${pageType}`}>

        {/* BACKGROUND IMAGE */}
        <div
          className="hero-background"
          style={{
            backgroundImage:
              `url(${images[currentImage]})`,
          }}
        />

        {/* DARK OVERLAY */}
        <div className="hero-overlay" />


        {/* HERO CONTENT */}
        <div className="hero-content-layer">

          {/* LOGO */}
          <div className="logo">
            {heroText.brand}
          </div>


          {/* HERO TEXT */}
          <div
            className={`hero-text ${
              selectedLanguage === "ta"
                ? "tamil-hero-text"
                : ""
            }`}
          >

            <h2>

              {heroText.title.map(
                (line, index) => (

                  <span key={index}>

                    {line}

                    {index <
                      heroText.title.length - 1 && (
                      <br />
                    )}

                  </span>

                )
              )}

            </h2>


            <p>
              {heroText.description}
            </p>


            <p>
              {heroText.tagline}
            </p>

          </div>

        </div>


        {/* =================================================
            IMAGE SLIDER CONTROLS
           ================================================= */}

        <div className="slider-controls">

          {/* PREVIOUS */}
          <button
            type="button"
            className="slider-button"
            onClick={previousImage}
            aria-label="Previous image"
          >
            ←
          </button>


          {/* DOTS */}
          <div className="slider-dots">

            {images.map((_, index) => (

              <button
                key={index}
                type="button"
                className={`slider-dot ${
                  currentImage === index
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setCurrentImage(index)
                }
                aria-label={`Go to image ${index + 1}`}
              />

            ))}

          </div>


          {/* NEXT */}
          <button
            type="button"
            className="slider-button"
            onClick={nextImage}
            aria-label="Next image"
          >
            →
          </button>

        </div>

      </section>
    );
  };


  // =========================================================
  // LOGIN PAGE
  // =========================================================

  if (page === "login") {

    return (
      <div className="app-container">

        <HeroSection pageType="login" />


        <section className="auth-panel">

          <div className="auth-content">

            <h1>
              Welcome back
            </h1>

            <p className="auth-subtitle">
              Sign in to continue to Farm Mitra
            </p>


            {/* EMAIL */}
            <div className="input-group">

              <label>
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
              />

            </div>


            {/* PASSWORD */}
            <div className="input-group">

              <label>
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
              />

            </div>


            {/* LOGIN */}
            <button
              type="button"
              className="primary-button"
            >
              Login
            </button>


            {/* CREATE ACCOUNT */}
            <p className="auth-footer">

              Don't have an account?{" "}

              <button
                type="button"
                className="text-button"
                onClick={() =>
                  setPage("language")
                }
              >
                Create account
              </button>

            </p>

          </div>

        </section>

      </div>
    );
  }


  // =========================================================
  // PREFERRED LANGUAGE
  // =========================================================

  if (page === "language") {

    return (
      <div className="app-container">

        <HeroSection pageType="language" />


        <section className="auth-panel">

          <PreferredLanguage

            onNext={(language) => {

              setSelectedLanguage(language);

              setPage("signup");

            }}


            onBack={() => {

              setPage("login");

            }}

          />

        </section>

      </div>
    );
  }


  // =========================================================
  // SIGNUP PAGE
  // =========================================================

  if (page === "signup") {

    return (
      <div className="app-container">

        <HeroSection pageType="signup" />


        <section className="auth-panel">

          <BasicSignup

            language={selectedLanguage}


            onNext={(data) => {

              console.log(
                "Signup data:",
                data
              );

              setSignupData(data);

              setPage("otp");

            }}


            onBack={() => {

              /*
               * When the user goes back from Signup
               * to Preferred Language, reset language
               * to English.
               */

              setSelectedLanguage("en");

              setPage("language");

            }}

          />

        </section>

      </div>
    );
  }


  // =========================================================
  // OTP PAGE
  // =========================================================

  if (page === "otp") {

    return (
      <div className="app-container">

        <HeroSection pageType="otp" />


        <section className="auth-panel">

          <BasicOTP

            email={signupData?.email}

            language={selectedLanguage}


            onVerify={(otp) => {

              console.log(
                "OTP entered:",
                otp
              );

              console.log(
                "Signup data:",
                signupData
              );


              /*
               * REAL OTP VERIFICATION
               * WILL BE CONNECTED HERE.
               *
               * Later this will call:
               *
               * POST /auth/verify-otp
               *
               * {
               *   email: signupData.email,
               *   otp: otp
               * }
               */


              console.log(
                "OTP verification requested"
              );

            }}


            onBack={() => {

              setPage("signup");

            }}

          />

        </section>

      </div>
    );
  }


  // =========================================================
  // FALLBACK
  // =========================================================

  return null;
}


export default App;