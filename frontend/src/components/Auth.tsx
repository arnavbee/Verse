import { signupInput } from "@arnavbsingh/verse-common";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<signupInput>({
        name: "",
        username: "",
        password: ""
    });
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function sendRequest() {
        setError("");
        setIsLoading(true);
        try {
            const url = `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`;
            console.log("Sending request to:", url);
            console.log("Request payload:", postInputs);

            const response = await axios.post(url, postInputs, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log("Response:", response.data);

            const jwt = response.data.token; // Adjust this based on your API response structure
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        } catch (e) {
            console.error("Full error object:", e);
            
            if (axios.isAxiosError(e)) {
                console.error("Axios error details:", e.response?.data, e.response?.status, e.response?.headers);
                setError(e.response?.data?.message || e.message || "An error occurred during the request. Please try again.");
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div>
                    <div className="px-10">
                        <div className="text-3xl font-extrabold">
                            {type === "signup" ? "Create an Account" : "Sign In"}
                        </div>
                        <div className="text-slate-400">
                            {type === "signin" ? "Don't have an account?" : "Already have an account?"}
                            <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>
                                {type === "signin" ? "Sign Up" : "Sign In"}
                            </Link>
                        </div>
                    </div>

                    <div className="pt-8">
                        {error && <div className="text-red-500 mb-4">{error}</div>}
                        
                        <LabelledInput 
                            label="Username" 
                            placeholder="arnavbsingh..." 
                            onChange={(e) => setPostInputs({ ...postInputs, username: e.target.value })}
                        />

                        {type === "signup" && (
                            <LabelledInput 
                                label="Name" 
                                placeholder="Arnav B Singh..." 
                                onChange={(e) => setPostInputs({ ...postInputs, name: e.target.value })}
                            />
                        )}

                        <LabelledInput 
                            label="Password" 
                            placeholder="Password" 
                            type="password"
                            onChange={(e) => setPostInputs({ ...postInputs, password: e.target.value })}
                        />

                        <button 
                            onClick={sendRequest} 
                            type="button" 
                            className="mt-8 text-white w-full bg-gray-800 hover:bg-gray-900 focus:outline-none 
                                focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 
                                dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                            disabled={isLoading}
                        >
                            {isLoading ? "Processing..." : (type === "signup" ? "Sign Up" : "Sign In")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string
  }
  
  function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return (
      <div>
        <label className="block mb-2 text-sm text-gray-900 font-semibold pt-4">{label}</label>
        <input
          onChange={onChange}
          type={type || "text"}
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder={placeholder}
          required
        />
      </div>
    );
  };

export default LabelledInput;