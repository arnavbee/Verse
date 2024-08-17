import { signupInput } from "@arnavbsingh/verse-common";
import { ChangeEvent , useState} from "react";
import {Link} from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Auth = ({type}: {type: "signup" | "signin"}) => {
    const [postInputs, setPostInputs] = useState<signupInput>({
        name: "",
        username: "",
        password:""
    });
    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
            <div className="px-10">
            <div className="text-3xl font-extrabold">
           Create an Account
           </div>
        
        <div className="text-slate-400">
            Already have an account? <Link className="pl-2 underline" to={"/signin"}> Login</Link> 
        </div>
        </div>
    

        <div className="pt-8">
            <LabelledInput label="Username" placeholder="arnavbsingh..." onChange={(e) => {
                setPostInputs({
                    ...postInputs,
                   
                    username: e.target.value,
                   


                })
            }} />

     <LabelledInput label="Name" placeholder="Arnav B Singh..." onChange={(e) => {
                setPostInputs({
                    ...postInputs,
                    name: e.target.value,
                    username: e.target.value,
                    password: e.target.value


                })
            }} />


<LabelledInput label="Password" placeholder="Password" type={"password"} onChange={(e) => {
                setPostInputs({
                    ...postInputs,
                    password: e.target.value


                })
            }} />

<button type="button" className="text-white w-full bg-gray-800 hover:bg-gray-900 focus:outline-none 
focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800
 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type == "signup" ? "Sign Up" : "Sign In"}</button>

   </div>

</div>
</div>
</div>
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