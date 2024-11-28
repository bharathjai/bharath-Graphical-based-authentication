import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import { Page } from "./util/config";
import Home from "./components/Landing";
import Signup from "./components/Signup";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Loader from "./components/Items/Loader";
import Contact from "./components/Contact";
import Slider from "./components/Slider";
import { CSSTransition } from 'react-transition-group'; // For section fade in/out animation

function App() {
  const [page, setPage] = useState(Page.HOME_PAGE);
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [slider, setSlider] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
  });

  // Scroll position state to control parallax effect
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY); // Update scrollY state as you scroll
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function getCurrentPage() {
    switch (page) {
      case Page.CONTACT:
        return <Contact setLoading={setLoading} />;
      case Page.LOGIN_PAGE:
        return (
          <Login
            setLoading={setLoading}
            setPage={setPage}
            setLoggedIn={setLoggedIn}
            setUserInfo={setUserInfo}
          />
        );
      case Page.SIGNUP_PAGE:
        return (
          <Signup
            setLoading={setLoading}
            setPage={setPage}
            setLoggedIn={setLoggedIn}
            setUserInfo={setUserInfo}
          />
        );
      case Page.HOME_PAGE:
      default:
        return <Home />;
    }
  }

  return (
    <div className="relative">
      {/* Loader is visible during loading state */}
      {loading && <Loader />}

      {/* Slider component for mobile view */}
      {slider && (
        <Slider
          currentPage={page}
          setLoggedIn={setLoggedIn}
          setUserInfo={setUserInfo}
          setPage={setPage}
          loggedIn={loggedIn}
          userInfo={userInfo}
          slider={slider}
          setSlider={setSlider}
        />
      )}

      {/* Navbar */}
      <Navbar
        setSlider={setSlider}
        setUserInfo={setUserInfo}
        setPage={setPage}
        currentPage={page}
        setLoggedIn={setLoggedIn}
        loggedIn={loggedIn}
        userInfo={userInfo}
      />

      {/* Parallax Background */}
      <div className="relative">
        <div
          className="absolute top-0 left-0 w-full h-full bg-fixed bg-center bg-cover transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
            backgroundImage: `url('https://source.unsplash.com/1920x1080/?nature,landscape')`,
          }}
        />
        {/* Main content with fade-in effect */}
        <CSSTransition in={true} timeout={1000} classNames="fade" appear>
          <div className="relative z-10">
            {getCurrentPage()}
          </div>
        </CSSTransition>
      </div>

      {/* Footer */}
      <Footer setPage={setPage} />
    </div>
  );
}

export default App;
