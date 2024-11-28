import { useState } from "react";
import validator from "validator/es";
import { successToast, Toast } from "../util/toast";
import axios from "axios";
import { api } from "../static/config";

export default function Contact(props) {
    const [data, setData] = useState({
        name: "",
        email: "",
        message: ""
    });

    // Handle form input change
    function handleChange(event) {
        setData(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    }

    // Handle form submission
    function handleSubmit() {
        if (!validateData()) return;
        props.setLoading(true);
        axios.post(`${api.url}/api/contact`, data)
            .then(res => {
                props.setLoading(false);
                successToast("Message Sent");
                clearData();
                scrollToThankYou();
            })
            .catch(err => {
                Toast(err.response?.data?.message || "Something went wrong.");
                props.setLoading(false);
            });
    }

    // Clear the form data
    function clearData() {
        setData({
            name: "",
            email: "",
            message: ""
        });
    }

    // Validate form data
    function validateData() {
        if (data.name.length < 3) {
            Toast("Invalid Name");
            return false;
        }
        if (!validator.isEmail(data.email)) {
            Toast("Invalid Email");
            return false;
        }
        if (data.message.length < 3) {
            Toast("Enter a valid message");
            return false;
        }
        return true;
    }

    // Scroll to the thank you section after submission
    function scrollToThankYou() {
        const element = document.getElementById("thank-you-section");
        if (element) element.scrollIntoView({ behavior: "smooth" });
    }

    return (
        <div className="h-full flex sm:flex-row flex-col justify-center font-['Work_Sans'] mt-12">
            {/* Contact Form Section */}
            <div className="sm:w-2/5 flex flex-col items-center sm:items-start">
                <p className="text-2xl sm:text-5xl text-black px-6">Connect With Us</p>
                <p className="text-xl sm:text-2xl text-black-300 px-6">We would love to respond to your queries.</p>
                <p className="text-xl sm:text-2xl text-black-300 px-6">Feel free to get in touch with us.</p>

                {/* Form Fields */}
                <div className="flex flex-col items-center sm:items-start px-6 py- mt-4 w-[90%] sm:w-3/4">
                    <div className="mb-4 w-full">
                        <label htmlFor="name" className="sm:text-xl text-black mb-1">Full Name</label>
                        <input
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            className="bg-gray-300 rounded-full h-8 sm:h-12 px-6 w-full"
                            type="text"
                            placeholder="Enter your name"
                        />
                    </div>
                    <div className="mb-4 w-full">
                        <label htmlFor="email" className="sm:text-xl text-black mb-1">Email</label>
                        <input
                            id="email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            className="bg-gray-300 rounded-full h-8 sm:h-12 px-6 w-full"
                            type="email"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="message" className="sm:text-xl text-black mb-1">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={data.message}
                            onChange={handleChange}
                            rows="4"
                            className="bg-gray-300 rounded-xl px-2 sm:px-6 font-3xl py-2 w-full"
                            placeholder="Enter your message"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit}
                        className="transition duration-500 ease-in-out mt-6 h-12 bg-[#A259FF] rounded-full w-full sm:w-1/3 text-white border-2 hover:bg-transparent border-[#A259FF] sm:font-bold"
                    >
                        Submit
                    </button>
                </div>
            </div>

            {/* Image Section */}
            <div className="hidden sm:flex items-center w-2/5">
                <img
                    className="transition duration-500 ease-in-out hover:scale-95 rounded-xl"
                    alt="Contact"
                    src="https://i.ibb.co/P1zYDgh/image.jpg"
                />
            </div>
        </div>
    );
}
