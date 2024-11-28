import { useState } from "react";
import { checkUsername } from "../util/validation";
import { successToast, Toast } from "../util/toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import PasswordIcon from "./Items/PasswordIcon";
import axios from "axios";
import { Page } from "../util/config";
import { api } from "../static/config";
import { getNameByNumber } from "../util/util";
import { nanoid } from "nanoid";
import BlockedBox from "./Items/BlockedBox";

export default function Login(props) {
    const [next, setNext] = useState(false);
    const [blocked, setBlocked] = useState(false);
    const [iteration, setIteration] = useState(0);
    const [imageData, setImageData] = useState([]);
    const [loginInfo, setLoginInfo] = useState({
        username: "",
        password: "",
        pattern: ["", "", "", ""]
    });

    const handleChange = (event) => {
        setLoginInfo(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    };

    const validateData = () => {
        if (!loginInfo.username) {
            Toast("Invalid Username!");
            return false;
        }
        if (loginInfo.password.length < 8) {
            Toast("Password Length Must Be Greater Than 8");
            return false;
        }
        return true;
    };

    const validateUsernameAndEmail = async () => {
        const isUsernameExists = await checkUsername(loginInfo.username, props.setLoading);
        if (!isUsernameExists) Toast("Username does not exist!");
        return isUsernameExists;
    };

    const handleNextClick = async () => {
        if (validateData() && await validateUsernameAndEmail()) {
            try {
                const res = await axios.get(`${api.url}/api/image?username=${loginInfo.username}`);
                setImageData(res.data);
                setNext(true);
            } catch (err) {
                Toast("Internal server error");
            }
        }
    };

    const getIcons = () => imageData[iteration]?.map(prev => (
        <PasswordIcon 
            key={nanoid()} 
            iteration={iteration} 
            id={prev.id} 
            src={prev.url} 
            selected={prev.id === loginInfo.pattern[iteration]} 
            onClick={handleImageClick} 
        />
    ));

    const handleImageClick = (id, iteration) => {
        const newPattern = [...loginInfo.pattern];
        newPattern[iteration] = id;
        setLoginInfo(prev => ({
            ...prev,
            pattern: newPattern
        }));
    };

    const login = async () => {
        if (loginInfo.pattern[iteration] === "") {
            Toast("Select an image first!");
            return;
        }

        if (iteration < 3) {
            setIteration(iteration + 1);
            return;
        }

        if (loginInfo.pattern.length < 4) {
            Toast("Choose minimum 4 images!");
            return;
        }

        props.setLoading(true);
        try {
            const res = await axios.post(`${api.url}/api/user/login`, loginInfo);
            props.setLoading(false);
            props.setUserInfo({ email: res.data.email, username: res.data.username });
            props.setLoggedIn(true);
            successToast("Logged In!");
            props.setPage(Page.HOME_PAGE);
        } catch (err) {
            props.setLoading(false);
            setIteration(0);
            setLoginInfo(prev => ({
                ...prev,
                pattern: ["", "", "", ""]
            }));
            setNext(false);
            if (err?.response?.data?.status === 'blocked') {
                setBlocked(true);
            } else {
                Toast(err?.response?.data?.message || "Login failed");
            }
        }
    };

    const getButtonTitle = () => (iteration < 3 ? "Next" : "Login");

    const handleBackClick = () => {
        if (iteration === 0) {
            setNext(false);
        } else {
            setIteration(iteration - 1);
        }
    };

    return (
        <div className="sm:h-[38rem] sm:mt-12">
            {blocked && <BlockedBox onClick={setBlocked} />}

            {!next ? (
                <div className="flex justify-center h-full">
                    {/* Login Form */}
                    <div className="font-['Work_Sans'] mt-16">
                        <p className="text-3xl sm:text-5xl sm:font-bold px-4 sm:px-0">Login</p><br />
                        <p className="text-lg sm:text-2xl px-4 sm:px-0">Welcome Back! Enter Your Details Below</p>
                        <div className="flex flex-col w-[80%] sm:w-2/3 px-4 sm:px-0">
                            <input
                                value={loginInfo.username}
                                onChange={handleChange}
                                name="username"
                                className="rounded-full h-8 sm:h-12 px-6 mt-[25px]"
                                type="text"
                                placeholder="Username"
                            />
                            <input
                                value={loginInfo.password}
                                onChange={handleChange}
                                name="password"
                                className="rounded-full h-8 sm:h-12 px-6 mt-[25px]"
                                type="password"
                                placeholder="Password"
                            />
                        </div>
                        <button
                            onClick={handleNextClick}
                            className="ml-4 sm:ml-0 transition duration-500 ease-in-out h-8 sm:h-12 bg-[#A259FF] rounded-full px-6 sm:w-2/3 mt-[25px] text-white border-2 hover:bg-transparent border-[#A259FF] font-bold">
                            Next
                        </button>
                    </div>
                </div>
            ) : (
                <div className="sm:flex justify-center h-full">
                    <div className="hidden sm:grid grid-cols-4 bg-[#3B3B3B] h-full rounded-lg w-[75%] justify-items-center py-4 px-2 gap-2 ml-12">
                        {getIcons()}
                    </div>

                    {/* Desktop View */}
                    <div className="sm:block hidden font-['Work_Sans'] mt-4 ml-16">
                        <p className="text-5xl font-bold">Set Graphical Password</p><br />
                        <p className="text-2xl">Select Images For Your Graphical Password.</p>
                        <p className="text-2xl">Select <span className="text-green-400">{getNameByNumber(iteration + 1)}</span> Image.</p><br />
                        <button
                            onClick={login}
                            className="transition duration-500 ease-in-out h-12 bg-[#A259FF] rounded-full px-6 w-2/3 mt-6 text-white border-2 hover:bg-transparent border-[#A259FF] font-bold"
                        >
                            {getButtonTitle()}
                        </button>
                        <button
                            onClick={handleBackClick}
                            className="transition duration-500 ease-in-out border-2 border-[#A259FF] rounded-full px-4 h-12 ml-4 hover:bg-[#A259FF]"
                        >
                            <FontAwesomeIcon className="text-white" icon={faArrowLeft} />
                        </button>
                    </div>

                    {/* Mobile View */}
                    <div className="sm:hidden font-['Work_Sans'] mt-4 ml-4">
                        <p className="text-2xl font-bold">Set Graphical Password</p><br />
                        <p className="text-lg">Select Images For Your Graphical Password.</p>
                        <p className="text-lg">Select <span className="text-green-400">{getNameByNumber(iteration + 1)}</span> Image.</p><br />

                        <div className="-ml-4 grid grid-cols-2 bg-[#3B3B3B] gap-x-0 h-full rounded-md justify-items-center py-4 gap-1">
                            {getIcons()}
                        </div>

                        <button
                            onClick={login}
                            className="transition duration-500 ease-in-out h-8 sm:h-12 bg-[#A259FF] rounded-full px-6 w-2/3 mt-6 text-white border-2 hover:bg-transparent border-[#A259FF]"
                        >
                            {getButtonTitle()}
                        </button>
                        <button
                            onClick={handleBackClick}
                            className="transition duration-500 ease-in-out border-2 border-[#A259FF] rounded-full px-4 h-8 sm:h-12 ml-4 hover:bg-[#A259FF]"
                        >
                            <FontAwesomeIcon className="text-white" icon={faArrowLeft} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
