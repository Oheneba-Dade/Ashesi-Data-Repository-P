"use client";
import "../globals.css";
import { useState } from "react";
import { useRouter } from 'next/navigation'
import CustomButton from "@/components/CustomButton";
import CountdownTimer from "@/components/Countdown";
import Image from "next/image";
import AxiosInstance from "@/auth_lib/axios";


export default function Page() {
    const router = useRouter()
    const [timerActive, setTimerActive] = useState(true);

    const [email, setEmail] = useState("");
    const [emailMsg, setEmailMsg] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const requestCode = () => {
        setTimerActive(true);
        GETOtp();
    }

    const emailValidation = () => {
        const regEx = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/g;
        if(!regEx.test(email) && email !== "email"){
            setEmailMsg("Invalid Email Address!");
            return false;
        }
        else{
            setEmailMsg("");
            return true;
        }
    }


    const [otp, setOtp] = useState(new Array(6).fill(""));
    const handleOtpAdd = (e, index) => {
        const val = e.target.value.toUpperCase();

        if(/^[A-Z0-9]?$/.test(val)){
            setOtp([...otp.map((data, indx)=>(indx === index? e.target.value.toUpperCase():data))])

            if(e.target.value && e.target.nextSibling){
                e.target.nextSibling.focus()
            }
        }    
    }

    const handleOtpBackspace = (e, index) => {
        if (e.key === "Backspace") {
            if (otp[index] !== "") {
                const newOtp = [...otp];
                newOtp[index] = "";
                setOtp(newOtp);
            } else if (index > 0) {
                document.getElementById(`otp-${index - 1}`).focus();
            }
        }
    };

    const GETOtp = async () => {
        try {
            localStorage.removeItem("jwt"); // this is here because we have to logout/clear jwt first, so we have to deal w that
            // console.log(email);
            const response = await AxiosInstance.get("get_otp", {
                params: {email}
            });
            // setOtpResponse(response.data);
            console.log("Otp Response: ", response.data)
        } catch (error){
            console.log("Error sending Otp: ", error)
        }
    }


    const [step, setStep] = useState(1);
    const handleNext = () => { 
        const state = emailValidation();
        if(state){
            GETOtp();
            setStep(2);
            setTimerActive(true);
        } 
    }

    const handleBack = () => {
        // 1 is the username step and 2 is the password step
        // if (step === 1){
        //     setStep(2);
        // }else 
        if (step === 2){
            setStep(1);
            setOtp(new Array(6).fill(""));
            setOtpMessage("");

        }
    }

    const [loading, setLoading] = useState(false);
    const [otpMessage, setOtpMessage] = useState("");

    const handleLogin = async () => {
        const isOtpValid = otp.every(char => /^[A-Z0-9]$/.test(char));

        if(!isOtpValid){
            setOtpMessage("Your OTP is incorrect, try again.")
            return;
        }

        setLoading(true);
        try {
            const otpStr = otp.join("")
            const response = await AxiosInstance.post("login", {
                "email": email,
                "otp": otpStr
            });
            console.log("Otp Response: ", response.data.access);
            // tokens are here
            localStorage.setItem("jwt", response.data.access); 
            
            //admin setup
            const payload = JSON.parse(atob(response.data.access.split(".")[1]));
            localStorage.setItem("user", payload.role);
            
            //email setup
            localStorage.setItem("email", email); 
            
            // router.push("/collections");
            window.location.href = "/collections";
        } catch (error){
            setOtpMessage("Your OTP is incorrect, try again.")
            console.log("Error sending Otp: ", error.response.data)
        } finally {
            setLoading(false);
        }
    }

	return (
        <div className="container max-w-lg mx-auto mt-40 mb-40">
            <div className="flex flex-row p-5">
                <Image
                    src="/images/logo.webp"
                    alt="Ashesi Logo"
                    width={50}
                    height={55}
                    className="object-contain"
                />
                <div className="font-medium pt-2 pl-10">
                    Data Repository
                </div>
            </div>

            <div className="shadow-sm shadow-red-200 bg-white p-8 rounded-md">
                { loading? (
                    <div className="flex justify-center items-center h-40">
                        <div className="w-10 h-10 border-4 border-ashesi-red border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : step === 1 ? (
                    <div>
                        <div className="flex flex-col p-4 mr-8">
                            <label className="text-black font-medium mb-4">
                                Username/Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                value = {email}
                                onChange = {handleEmailChange}
                                className="p-2 shadow-md shadow-red-200 rounded-md w-96 focus:outline-ashesi-red"
                                required 
                            />
                            <div className="flex flex-row mt-4 text-black justify-between">
                                {emailMsg}
                            </div>
                        </div>

                        <div className="flex flex-row justify-end p-4 mr-8 "> 
                            {/* */}
                            <div className="mr-4">
                                {/*  */}
                                <CustomButton
                                    text="Back"
                                    bgColor="bg-white"
                                    textColor="text-black"
                                    width="w-50"
                                    height="h-10"
                                    onClick={() => router.back()}
                                />
                            </div>
                            <div className="">
                                <CustomButton
                                    text="Next"
                                    bgColor="bg-transparent"
                                    textColor="text-black"
                                    width="w-50"
                                    height="h-10"
                                    className="underline decoration-ashesi-red"
                                    onClick={handleNext}
                                />
                            </div>
                        </div>

                    </div>   
                ) : (
                <div>
                    <div className="flex flex-row">
                        {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg> */}
                        <div>
                            <div className="mr-4">
                                <CustomButton
                                    text="Back"
                                    bgColor="bg-white"
                                    textColor="text-black"
                                    width="w-50"
                                    height="h-5"
                                    onClick={handleBack}
                                    className="underline decoration-black"
                                />
                            </div>
                        </div>
                        
                    </div>
                    <div className="flex flex-col p-4 items-center h-50">
                        
                        { otpMessage ? (
                                <label className="text-ashesi-red font-semibold mb-4">
                                    Wrong OTP. Try again
                                </label>
                            ) : (
                                <label className="text-black font-medium mb-4">
                                    Check your email for OTP
                                </label>
                            )
                        }

                        <div className="text-white mb-1">
                            {otpMessage}
                        </div>
                        
                        <div className="flex flex-row gap-2 ">   
                            {
                                otp.map((data, i)=>{
                                    return <input
                                    value = {data}
                                    id={`otp-${i}`}
                                    name="otp"
                                    maxLength={1}
                                    key = {i}
                                    className = "w-12 h-16 text-center text-xl font-semibold rounded-md shadow-sm shadow-red-200 focus:outline-2 caret-transparent uppercase"
                                    onChange={(e)=>handleOtpAdd(e, i)}
                                    onKeyDown={(e) => {
                                        if(e.key === "Backspace"){
                                            handleOtpBackspace(e, i)
                                        }
                                        if(e.key === "Enter"){
                                            console.log(otp.join())
                                        }
                                    }}      
                                />
                                })
                            }
                        </div>
                    </div> 
                    <div className="flex flex-row mr-10 mt-1 text-black bold-sm ml-14 gap-1">
                        <button disabled={timerActive} onClick = {requestCode} className="underline">Resend OTP</button>
                        <div>
                            {timerActive && (
                            <div className="flex flex-row text-ashesi-gray gap-1">
                                <span>in</span>
                                <CountdownTimer setTimerActive={setTimerActive}/>
                                <span>seconds</span>
                            </div>
                             )}
                        </div>
                    </div>
                    <div className="flex flex-row justify-center p-4 mt-6 mr-4">
                        {/* <div className="mr-4">
                            <CustomButton
                                text="Back"
                                bgColor="bg-white"
                                textColor="text-black"
                                width="w-50"
                                height="h-10"
                                onClick={handleBack}
                            />
                        </div> */}
                        <div className="">
                            <CustomButton
                                text="Login"
                                // bgColor="bg-white"
                                textColor="text-white"
                                width="w-60"
                                height="h-10"
                                className="underline decoration-ashesi-red"
                                disabled = {loading}
                                onClick={handleLogin}
                            />
                        </div>
                    </div> 
                </div>
                )}
            </div>
        </div>
    )
}