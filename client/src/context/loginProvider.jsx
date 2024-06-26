import { createContext, useEffect, useState } from "react"
import Cookies from "js-cookie"
import Axios from "axios";

const api_url = import.meta.env.VITE_API_URL;
export const LoginContext = createContext();

export default function LoginProvider({children}){

    const [loggedIn , setloggedIn] = useState(false);

    const theme = localStorage?.getItem('theme');
    const [darkmode , setDarkmode] = useState(0);

    const [profile , setProfile] = useState({}); 

    useEffect(() =>{
        const jwt_token = Cookies.get("jwt");
        console.log(localStorage?.getItem('theme'));
        if(theme){
            setDarkmode(theme);
        }
        //getting decoded data from server
        const getDecodedJWT = async() =>{

            await Axios.post(api_url + "/decodeJWT" , {
                jwt_token : jwt_token
            }).then((res) =>{
                if(res.data.error){
                    Cookies.remove("jwt");
                }else{
                    setloggedIn(true);
                    setProfile({name : res.data.name , email : res.data.email , picture : res.data.picture})
                }
            })
        }

        if(jwt_token){
            getDecodedJWT();
        }

    }, [])

    return(
        <LoginContext.Provider value={{loggedIn , profile , darkmode,setDarkmode}}>
            {children}
        </LoginContext.Provider>
    )
}