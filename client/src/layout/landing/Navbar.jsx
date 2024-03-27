import React, { useState } from "react";
import { navLinks } from "../../constants/index.js";
import { Link } from "react-router-dom";
import { styles } from "../../styles.js";
import { legalfirmlogo } from "../../assets/index.js";
import SignIn from "../../components/signIn.jsx";
import { useContext } from "react";
import { LoginContext } from "../../context/loginProvider.jsx";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [login, setLogin] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const body = document.querySelector("body");

  const [hamburger , setHamburger] = useState(false);

  const navigate = useNavigate();

  //if user is logged in
  const credentials = useContext(LoginContext);

  const handleScroll = () => {
    scrollY > 0 ? setScrolled(true) : setScrolled(false);
  };

  window.addEventListener("scroll", handleScroll);

  return (

    <nav className={`md:px-8 px-6 prevent-select w-full flex items-center py-5 fixed top-0 z-20 transition ease-in-out delay-100 ${scrolled && "bg-[#ffffffc4] backdrop-blur-lg"}`}>
      {login && <SignIn setLogin={setLogin} />}
      <div className={`w-full flex justify-between items-center max-w-7xl mx-auto `}>

        {/* logo */}
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={legalfirmlogo}
            alt="logo"
            className="w-9 h-9 object-contain rounded-full"
          />
          <p className={`text-white text-[18px] font-bold cursor-pointer flex transition ease-in-out delay-100 ${scrolled && "!text-black"}`}>
            EthicalEdge
          </p>
        </Link>

        {/* full menu with about services lawyers and login  */}
        <div>
          <div className="hidden max-[600px]:flex flex-col justify-between h-[19px] z-50 relative" onClick={() => {setHamburger(!hamburger); document.querySelector("html").classList.toggle("hide")}}>
            <div className={`h-[2.5px]  bg-white w-7 transform transition ${hamburger && " translate-y-[8px] rotate-45"}  ${scrolled && !hamburger ?  "!bg-black" : ""}`}></div>
            <div className={`h-[2.5px] bg-white w-7 transform transition ${hamburger && " opacity-0"} ${scrolled && !hamburger ?  "!bg-black" : ""}`}></div>
            <div className={`h-[2.5px] bg-white w-7 transform transition ${hamburger && " translate-y-[-8px] -rotate-45"} ${scrolled && !hamburger ?  "!bg-black" : ""}`}></div>
          </div>
          
          <div className={`${hamburger && "w-[100vw] h-[100vh]  absolute top-0 left-0 bg-gradient-to-r from-blue-600 to-violet-600 grid place-items-center"}`}>
          <ul className={`list-none items-center justify-between flex-row flex z-40 gap-5 lg:gap-20 md:gap-10 max-[600px]:hidden ${hamburger && "!flex  flex-col"}`}>
            {navLinks.map((link) => (
              <li
                key={link.id}
                className={`${active === link.title ? "!text-violet-600" : "text-white"
                  } hover:text-violet-500 text-[18px] font-medium cursor-pointer transition ease-in-out delay-100 ${scrolled && !hamburger ? "!text-black"
                   : ""}`}
                onClick={() => {setActive(link.title); setHamburger(false)}}
              >
                <a href={`#${link.id}`}>{link.title}</a>
              </li>
            ))}
            {credentials.loggedIn ?
              <div className="cursor-pointer flex items-center" onClick={() => navigate("/dashboard")}>
                {credentials.profile.picture ?
                  <img className="rounded-full w-7 h-7 mr-1" src={credentials.profile.picture} alt="profile" />
                  :
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>}
                <p className={` text-white ${scrolled && "!text-black"}`}>{credentials.profile.name}</p>
              </div>
              :
              <li className="text-[18px] font-medium cursor-pointer">
                <button
                  className={`list-none text-white text-center text-[18px] shadow-lg border-violet-600 border bg-transparent self-center justify-center px-8 py-1 rounded-[40px] max-md:px-5 transition ease-in-out delay-100 ${scrolled && !hamburger ? "!text-violet-600 border-violet-600"
                    : ""}`}
                  onClick={() => {
                    setLogin(!login);
                    setHamburger(false)
                    body.style.overflow = "hidden";
                  }}
                >
                  Login
                </button>
              </li>}
          </ul>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
