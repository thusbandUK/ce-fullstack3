'use client';

//import formAction from './formAction';
import { useState } from 'react';
import { State, updateUser } from '../../app/lib/actions';
import { useFormState } from 'react-dom';
import ArrowCommand from '../../app/ui/dashboard/arrowCommand';

export default function MockUpdateUsername({
  username,
  email,
  formAction 
}: {
  username: string;
  email: string;  
  formAction: (oldUsername: string, email: string, newUsername: string) => void 
}) {

    //const [state, dispatch] = useFormState(formAction, null);
    const [inputValue, setInputValue] = useState("");

    const state = {
      errors: {
        username: ["no errors!"]
      }
    }
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      formAction(username, email, inputValue);
    };
  

  return (
    <form onSubmit={handleSubmit} role="form">
      <div className="w-full flex flex-col pb-4 mx-auto grid grid-cols-6">
      <div className="col-start-1 col-span-6 md:col-span-4 w-full border-2 border-black rounded-lg p-5">{/*COL 1 */}
      
        {/* Username */}
        <div className="mb-4">
          <label htmlFor="username">
            Enter a new username and click update
          </label>
          <div className="spacer"></div>
          <div className="relative">
            <input
              id="username"
              name="username"              
              defaultValue={username}
              className="border border-black rounded-sm global-input-width"
              minLength={5}
              maxLength={20}
              onChange={(e) => { setInputValue(e.target.value)}}
              required
              

            >              
            </input>            
          </div>
          {/***/}
          <div id="username-error" aria-live="polite" aria-atomic="true">
              {state?.errors?.username &&
              state.errors.username.map((error: any) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
            </div> 
        </div>

        {/* Email */}
        {/** 
        <div className="mb-4">
          <label>
            Email
          </label>
          <div className="relative">
            <p>{email}</p>           
          </div>
          
        </div>
        */}
        
      </div>{/*COL 1 ENDS */}
      
      {/*<div className="mt-6 flex justify-end gap-4">*/}
      <div className="col-start-1 md:col-start-5 col-span-6 md:col-span-2 border-2 border-black rounded-lg flex flex-col justify-end">{/*COL 2*/}
      <div className="m-5">
        <button type="submit">
          <ArrowCommand
            borderGray={false}
            command={"UPDATE"}
            disabled={false}
          />
        </button>
        </div>
        {/**
        <Button type="submit">Update username</Button> */}
      </div>{/*COL 2 ENDS*/}
      </div>
      
    </form>
  );
}




/*
<div className="col-start-1 col-span-6 md:col-span-4 w-full">

                    <textarea 
                      id="response"
                      onChange={handleResponseChange}
                      name="response"
                      rows={5} cols={33}
                      className="border-2 border-black rounded-lg p-5 md:p-5 w-full h-full"
                      placeholder="Write your answer here..."
                    >
                
                    </textarea>
                    </div>
                    <div className="col-start-1 md:col-start-5 col-span-6 md:col-span-2 border-2 border-black rounded-lg flex flex-col justify-end">
                      <button  onClick={submitResponse}>
                    <label htmlFor="response" className="cursor-pointer">
                      <div className="m-5">
                      <ArrowCommand 
                        borderGray={false}
                        command="SUBMIT"
                      />   
                      </div>                   
                    </label>
                    </button>
                    </div>
*/