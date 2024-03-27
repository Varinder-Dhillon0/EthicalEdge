import { useContext, useEffect, useState } from "react";
import Axios from "axios";
import toast from "react-hot-toast";
import SimpleLoader from "./loaders/simpleloader";

const api_url = import.meta.env.VITE_API_URL;

export default function SignIn({ setLogin }) {

  const [signup, setSignup] = useState(false);
  const [name , setName] = useState("");
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");

  const [loading , setLoading] = useState(false);

  const body = document.querySelector("body");

  async function handleCredentialResponse(response) {
    setLoading(true);
    var encodedToken = encodeURIComponent(response.credential);
    await Axios.post(api_url + "/googlelogin" , {
      token : encodedToken
    }, {withCredentials : true}).then((res) =>{
      if(res.data.error){
        console.log(res.data.error);
        toast.error(res.data.error || "an error occured while logging in");
      }else{
        toast.success("logged in.");
        location.reload();
      }
    })
    setLoading(false)
  }

  const handleLogin = async() =>{

    if(!email || !password){
      toast.error("Fill out all the fields.")
      return;
    }

    setLoading(true);

    await Axios.post(api_url + "/login", {
      email : email,
      password : password
    },{withCredentials : true }).then((res) =>{
      console.log(res.data);
      if(res.data.success){
        toast.success("registered successfully.")
        location.reload();
      }else{
        toast.error(res.data.error || "an error occured while logging in");
      }
    }).catch((err) => {console.log(err); toast.error("Internal Server error.")})

    setLoading(false);

  }

  const handleSignup = async() =>{
     if(!name || !email || !password){
      toast.error("Fill out all the fields.")
      return;
     }

     setLoading(true);

     await Axios.post(api_url + "/register" , {
      name : name,
      email : email,
      password : password
     },{withCredentials : true }).then((res) =>{
      console.log(res.data);
      if(res.data.success){
        toast.success("logged in successfully.")
        location.reload();
      }else{
        toast.error(res.data.error || "an error occured while registering");
      }
    }).catch((err) => {console.log(err); toast.error("Internal Server error.")})

    setLoading(false);

  }

  useEffect(() =>{
    google.accounts.id.initialize({
      client_id: "799527140319-c3qcq6ccadmfogl8sl04omoomr7d4gr7.apps.googleusercontent.com",
      callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
      document.querySelector("#buttonDiv"),
      { theme: "outline", size: "large" }
    );
  },[])


  return (
    <>
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center sm:px-6 px-1 py-8 mx-auto h-screen lg:py-0 absolute top-0 left-0 z-50 bg-opacity-60 bg-black  w-[100%]">
          <div
            className="bg-transparent backdrop-blur-sm w-[100vw] h-[100vh] absolute"
            onClick={() => {
              setLogin(false);
              body.style.overflow = "";
            }}
          ></div>
          <div className="w-full bg-white rounded-2xl shadow dark:border md:mt-0 xs:max-w-md xl:p-0 z-50">
            <div className="p-5 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900">
                Sign {signup ? "up" : "in"}
              </h1>
              <div className="space-y-4 md:space-y-6">
                {signup && (
                  <div>
                    <label
                      htmlFor="text"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      onChange={(e) => setName(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="Rahul"
                      required=""
                    />
                  </div>
                )}
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required=""
                  />
                </div>
                <p className="font-semibold text-center">or</p>
                <div className="flex justify-center"><div id="buttonDiv"></div></div>
                {!signup && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="remember"
                          aria-describedby="remember"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="remember" className="text-black">
                          Remember me
                        </label>
                      </div>
                    </div>
                    <a
                      href="#"
                      className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                )}

                {loading ? <div className="w-full bg-blue-600 rounded-lg px-5 py-[8px]"><SimpleLoader/></div> :<button
                  onClick={signup ? handleSignup : handleLogin}
                  className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  Sign {signup ? "up" : "in"}
                </button>}
                <p className="text-sm font-light text-center text-black">
                  {" "}
                  {signup
                    ? "Already have an account?"
                    : "Do not have an account yet?"}{" "}
                  <a
                    href="#"
                    onClick={() => {
                      setSignup(!signup);
                    }}
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    <span>Sign{signup ? "in" : "up"}</span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
