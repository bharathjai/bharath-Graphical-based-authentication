import { Page } from "../util/config";
import { motion } from "framer-motion";

export default function Slider(props) {
  const additionalClasses = "text-[#A259FF]";

  // Close the slider
  function closeSlider() {
    props.setSlider(false);
  }

  // Set the page when navigation occurs
  function setPage(page) {
    props.setPage(page);
    closeSlider();
  }

  // Handle logout
  function logout() {
    props.setUserInfo({ username: "", email: "" });
    props.setLoggedIn(false);
    setPage(Page.HOME_PAGE);
  }

  return (
    <div
      className="md:hidden flex justify-center fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
    >
      {/* Background Overlay with a Blur Effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 0.2 }}
        onClick={closeSlider}
        className="absolute inset-0 bg-black backdrop-blur-sm"
        aria-label="Close slider"
      ></motion.div>

      {/* Slider Panel */}
      <motion.div
        initial={{ x: 200 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.4, type: "tween" }}
        className="bg-[#3b3b3b] h-full w-2/3 rounded-l-xl p-4"
        role="menu"
      >
        {/* Close Button */}
        <div className="flex justify-end">
          <img
            onClick={closeSlider}
            alt="Close"
            aria-label="Close slider"
            width="32px"
            className="cursor-pointer"
            src="https://img.icons8.com/fluency-systems-filled/48/A259FF/multiply.png"
          />
        </div>

        {/* Login/Sign-Up Section */}
        {!props.loggedIn && (
          <div className="flex justify-center flex-col items-center mt-12 text-white">
            <button
              onClick={() => setPage(Page.LOGIN_PAGE)}
              className="mb-6 transition-all duration-500 ease-in-out bg-[#A259FF] rounded-lg px-4 py-1 w-full border-[#A259FF] border-2 hover:bg-transparent hover:text-[#A259FF]"
            >
              Login
            </button>
            <button
              onClick={() => setPage(Page.SIGNUP_PAGE)}
              className="transition-all duration-500 ease-in-out bg-[#A259FF] rounded-lg px-4 py-1 w-full border-[#A259FF] border-2 hover:bg-transparent hover:text-[#A259FF]"
            >
              Sign Up
            </button>
          </div>
        )}

        {/* Logged-In User Section */}
        {props.loggedIn && (
          <div className="flex flex-col items-center text-white mt-12">
            <p className="text-2xl font-mono text-[#A259FF]">
              {props.userInfo.username}
            </p>
            <button
              onClick={logout}
              className="mt-4 w-full transition-all duration-500 ease-in-out bg-[#A259FF] rounded-lg px-4 py-1 border-[#A259FF] border-2 hover:bg-transparent hover:text-[#A259FF]"
            >
              Logout
            </button>
          </div>
        )}

        {/* Navigation Links */}
        <div className="text-xl mt-12 flex flex-col items-center text-white">
          <p
            onClick={() => setPage(Page.HOME_PAGE)}
            className={`mb-6 cursor-pointer ${props.currentPage === Page.HOME_PAGE ? additionalClasses : ""}`}
          >
            Home
          </p>
          <p
            onClick={() => setPage(Page.CONTACT)}
            className={`cursor-pointer ${props.currentPage === Page.CONTACT ? additionalClasses : ""}`}
          >
            Contact
          </p>
        </div>
      </motion.div>
    </div>
  );
}
