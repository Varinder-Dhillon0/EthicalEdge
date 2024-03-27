import ChatLoader from "../loaders/chatLoader";

export default function ChatBubble({ user, message, profilepic }) {
    const brokeMsg = message.replace(/\n/g, '<br>');

    return (
        <div >
            <div className={`flex items-start gap-2.5  mt-[15px] ${user == "user" && "mt-[40px]"}`}>
                <img className="w-8 h-8 rounded-full" src={profilepic} alt={user} />
                <div className={`flex flex-col w-auto max-w-[693px] leading-1.5 p-2 pl-5 pr-5 border-gray-200  bg-violet-600 rounded-xl rounded-tl-none rounded-tr-none  text-white ${user == "bot" && "!bg-[#100d25]"}`}>
                <p className="text-sm font-normal py-2.5 ">
                {brokeMsg ? (
                    <span dangerouslySetInnerHTML={{ __html: brokeMsg }} />
                ) : (
                    <ChatLoader />
                )}
                </p>
                </div>
            </div>
        </div>
    )
}