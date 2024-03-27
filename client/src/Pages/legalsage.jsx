import ChatBubble from "../components/Dashboard/chatbubble"
import { send } from "../assets"
import React, { useEffect, useRef, useState } from "react"
import { LoginContext } from "../context/loginProvider"
import { useContext } from "react"
import { legalfirm } from "../assets"
import Axios from "axios";
import ScrollToBottom from "../components/Dashboard/scrolltobottom"
import AiLoader from "../components/loaders/aiLoader"
import ChatLoader from "../components/loaders/chatLoader"
import toast from "react-hot-toast"

const api_url = import.meta.env.VITE_API_URL;

export default function Legalsage() {

    const credentials = useContext(LoginContext);

    const chatsRef = useRef(null);
    const chatInput = useRef(null);
    const [chats, setChats] = useState([]);
    const [message, setMessage] = useState("");
    const [sendDisabled, setsendDisabled] = useState(false);

    const [isScrolled, setIsScrolled] = useState(false);

    //checking for scroll of messages
    const observer = new IntersectionObserver(
        ([entry]) => {
            setIsScrolled(!entry.isIntersecting);
        },
        { root: null, rootMargin: "100px", threshold: 0.9 }
    );

    if (chatsRef.current) {
        observer.observe(chatsRef.current);
    }

    const scrollToLatestMessage = () => {
        // Scroll to the latest message
        chatsRef.current.scrollIntoView();
    };

    //update chats on server side
    const updateChats = async (updatedChats) => {
        var newestchat = updatedChats[updatedChats.length - 1];;

        await Axios.post(api_url + "/updateChat", {
            email: credentials.profile.email,
            thread: {
                user: newestchat.user,
                ai: newestchat.ai
            }
        }).then((res) => {
            if (res.success) {
                console.log("successfully updated chats")
            } else if (res.error) {
                console.log(res.error);
            }
        }).catch(err => console.log(err))
    }

    const requestAi = async () => {

        setsendDisabled(true);

        if(chats.length > 2){
            setsendDisabled(false);
            return toast.error("Limit has been reached")
        }

        chatInput.current.value = "";

        if (chats.length == 0) {
            setChats([{ user: message, ai: "" }])
        } else {
            setChats(prechats => [...prechats, { user: message, ai: "" }]);
        }

        await Axios.post(api_url + "/chatCompletion", {
            message
        }).then(res => {
            if (res.data.ai) {
                setChats(prechats => {
                    const updatedChats = [
                        ...prechats.slice(0, prechats.length - 1),
                        { user: message, ai: res.data.ai }
                    ];
                    updateChats(updatedChats);
                    return updatedChats;
                });
                setMessage("");
            } else {
                console.error(res.data.error);
            }
        })
        setsendDisabled(false);
    }

    //whenever chats update scroll to latest message
    useEffect(() => {
        scrollToLatestMessage();
    }, [chats])

    useEffect(() => {

        chatInput.current?.focus();

        const getChats = async () => {
            await Axios.post(api_url + "/getChats", {
                email: credentials.profile.email
            }).then((res) => {
                if (res.error) {
                    console.log(res.error);
                } else {
                    if (res.data.chats) {
                        setChats(res.data.chats);
                    }
                }
            }).catch(err => console.log(err));
        }

        getChats();
    }, [])

    const handleEnterKey = (e) => {
        if (e.key === "Enter") {
            console.log(chats);
            if (!sendDisabled) {
                requestAi();
            }
        }
    }

    return (

        <>
            {/* // Chat View on LegalSage tab */}
            <div className={`border-gray-300 dark:bg-slate-800 dark:text-white h-[93.074vh] flex flex-col relative`}>
                <div className="h-[88%] pr-10 pl-10 pt-5 pb-2 w-[70%] mr-auto ml-auto overflow-x-hidden overflow-scroll no-scrollbar">
                    <div className="flex justify-center flex-col items-center mt-[20%]">
                        <img src={legalfirm} alt="legalfirm logo" className="w-20 h-20" />
                        <h1 className="font-semibold">I can help you with Legal Queries!</h1>
                        <div>
                            <div>

                            </div>
                        </div>
                    </div>
                    <div className="relative grid auto-rows-max-content">
                        {chats?.length > 0 ?
                            chats.map((msg, i) => {
                                return (
                                    <div key={msg._id || i} className="grid auto-rows-max-content">
                                        <ChatBubble user={"user"} message={msg.user} profilepic={credentials.profile.picture}></ChatBubble>
                                        <ChatBubble user={"bot"} message={msg.ai} profilepic={legalfirm}></ChatBubble>
                                    </div>
                                )
                            })
                            : ""}
                    </div>
                    <div ref={chatsRef} id="bottom"></div>
                </div>

                <div className={`${isScrolled ? "block absolute bottom-[14%] right-[50%] translate-x-[50%] z-[43]" : "hidden"}`}>
                    <ScrollToBottom scrolltolatest={scrollToLatestMessage} />
                </div>

                <div className="h-[12%] grid items-center bg-transparent ">
                    <div className="relative flex justify-center items-center">
                        <input type="text" ref={chatInput} onChange={(e) => { setMessage(e.target.value) }} placeholder="Ask LegalSage to get your Legal Queries Answered........" onKeyDown={handleEnterKey} className={`w-[70%] ml-auto mr-auto p-5 pr-14 h-[50px] leading-3 bg-[#1e1f20]  border-0 rounded-full focus:outline-none focus:bg-[#333537] caret-white text-white`} />
                        <button disabled={sendDisabled} className={`bg-white p-2 rounded-full absolute top-[7px] right-[13vw] ${sendDisabled && "opacity-70"}`} onClick={requestAi} >
                            {sendDisabled ? <AiLoader/> : <img src={send} alt="send" />}  
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}