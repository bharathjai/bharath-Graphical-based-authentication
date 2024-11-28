import { Page } from "../util/config";

export default function Navbar(props) {
    const additionalClasses = "text-[#A259FF]";

    function setPage(property) {
        props.setPage(property);
    }

    function logout() {
        props.setUserInfo({ username: "", email: "" });
        props.setLoggedIn(false);
        setPage(Page.HOME_PAGE);
    }

    return (
        <div className="md:p-6 py-2 px-4 flex justify-between items-center">

            {/* Logo and text */}
            <div className="flex items-center cursor-pointer" onClick={() => window.location.reload()}>
                <img className="" width="30px" src="https://img.icons8.com/material-rounded/48/A259FF/cyber-security.png" alt="Logo" />
                <p className="md:text-2xl sm:text-4xl ml-2 font-['Work_Sans']">Graphical Password Auth</p>
            </div>

            {/* Navigation links */}
            <div className="font-['Work_Sans'] text-black hidden md:flex items-center">
                <p className={`hover:text-gray-600 text-xl cursor-pointer ${props.currentPage === Page.HOME_PAGE ? additionalClasses : ""}`} onClick={() => setPage(Page.HOME_PAGE)}>Home</p>
                <p className={`hover:text-gray-600 text-xl cursor-pointer ml-12 mr-20 ${props.currentPage === Page.CONTACT ? additionalClasses : ""}`} onClick={() => setPage(Page.CONTACT)}>Contact</p>

                {/* Conditional buttons for logged-in state */}
                {!props.loggedIn ? (
                    <div className="flex">
                        <button onClick={() => setPage(Page.LOGIN_PAGE)} className="transition duration-500 ease-in-out bg-[#A259FF] rounded-lg px-4 py-1 ml-12 border-[#A259FF] border-2 hover:bg-transparent">Login</button>
                        <button onClick={() => setPage(Page.SIGNUP_PAGE)} className="transition duration-500 ease-in-out bg-[#A259FF] rounded-lg px-4 py-1 ml-6 border-[#A259FF] border-2 hover:bg-transparent">Sign Up</button>
                    </div>
                ) : (
                    <div className="flex items-center">
                        <p className="text-2xl font-mono text-[#A259FF]">{props.userInfo.username}</p>
                        <button onClick={() => logout()} className="transition duration-500 ease-in-out bg-[#A259FF] rounded-lg px-4 py-1 ml-4 border-[#A259FF] border-2 hover:bg-transparent">Logout</button>
                    </div>
                )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
                <img onClick={() => props.setSlider(true)} className="ml-2" width="32px" src="https://img.icons8.com/fluency-systems-regular/48/A259FF/menu--v1.png" alt="Menu" />
            </div>
        </div>
    );
}