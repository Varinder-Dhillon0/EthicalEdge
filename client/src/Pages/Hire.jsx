import React from 'react'

export default function Hire() {

    return (
        <div className={`h-screendark dark:bg-slate-800 dark:text-white w-full`}>
            <div className='p-8 mt-0 mb-0 mr-auto ml-auto w-[70%]'>
                <div className="grid grid-cols-[1fr_1fr_1fr] grid-rows-[auto] gap-[21px] mt-16">
                <div>
                        <label htmlFor="first_name" className=" mb-2 block text-sm font-medium ">Full Name</label>
                        <input type="text" id="first_name" className="w-full focus:outline-none  text-gray-900 text-sm focus:ring-0 focus  p-2.5 dark:bg-[#0f151e] dark:placeholder-gray-400 dark:text-white animated-border" placeholder="Ramesh Kumar" required />
                    </div>
                    <div>
                        <label htmlFor="first_name" className=" mb-2 block text-sm font-medium ">Contact Information</label>
                        <input type="text" id="first_name" className="w-full focus:outline-none  text-gray-900 text-sm focus:ring-0 focus  p-2.5 dark:bg-[#0f151e] dark:placeholder-gray-400 dark:text-white animated-border" placeholder="9876059183" required />
                    </div>
                    <div>
                        <label htmlFor="first_name" className=" mb-2 block text-sm font-medium ">Address</label>
                        <input type="text" id="first_name" className="w-full focus:outline-none  text-gray-900 text-sm focus:ring-0 focus  p-2.5 dark:bg-[#0f151e] dark:placeholder-gray-400 dark:text-white animated-border" placeholder="123 Main, Anytown, Ind 12345" required />
                    </div>
                    <div  className='col-span-3'>
                        <label htmlFor="last_name" className=" mb-2 block text-sm font-medium ">Case Title</label>
                        <input type="text" id="last_name" className="w-full focus:outline-none  text-gray-900 text-sm focus:ring-0 focus  p-2.5 dark:bg-[#0f151e] dark:placeholder-gray-400 dark:text-white animated-border" placeholder="State of Punjab vs. Ramesh (2024)" required />
                    </div>
                    <div className='col-span-3'>
                        <label htmlFor="company" className=" mb-2 block text-sm font-medium ">Description About Case</label>
                        <textarea rows={15} id="company" className="resize-none w-full focus:outline-none  text-gray-900 text-sm focus:ring-0 focus  p-2.5 dark:bg-[#0f151e] dark:placeholder-gray-400 dark:text-white animated-border" placeholder="" />
                    </div>
                </div>

                <button type="submit" className="text-black bg-white rounded-lg  mr-auto ml-auto font-semibold focus:outline-none mt-6 text-sm relative left-[50%] right-[50%] translate-x-[-50%] sm:w-auto px-10 py-2.5 ">Submit</button>
            </div>

        </div>
    )
}
