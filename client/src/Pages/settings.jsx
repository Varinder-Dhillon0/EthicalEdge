import { useContext, useEffect, useState } from "react"
import {themeContext} from "../context/themeProvider";

export default function Settings() {

    const {darkMode,changeMode} = useContext(themeContext);

    useEffect(() =>{
        console.log("changed mode",darkMode)
    }, [darkMode])
    return (
        <div style={{ height: '100vh', paddingLeft: '50px', paddingTop: '150px' }} className={"dark:bg-slate-800 dark:text-white dark:text-slate-400"}>
            <div className="mr-auto ml-auto w-[30%]">
               
                <div className="flex items-center justify-center border-slate-400 border-2 p-4 rounded-2xl hover:ease-in-out hover:scale-[1.01] hover:transition-all">
                    <p className="mr-32">Change Theme </p>
                    
                    <input
                      className="changetheme cursor-pointer relative w-10 h-5 transition-all duration-200 ease-in-out bg-gray-400 rounded-full shadow-inner outline-none appearance-none"
                      type="checkbox"
                      onChange={() => changeMode()}
                      checked={darkMode}
                    />

                </div>      
            </div>
        </div>
    )
}
