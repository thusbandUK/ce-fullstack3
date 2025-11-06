import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, describe, it } from 'vitest'
import MCQZoom from '../app/ui/dashboard/mcqZoom';
import DeleteRequest from '../app/ui/deleteRequest';
import UpdateUsername from '../app/ui/updateUsername';
import {Inconsolata} from "next/font/google";
import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { State2, initiateDelete } from '../app/lib/deleteAccount';
import { useFormState } from 'react-dom';

/*
https://vitest.dev/guide/browser/component-testing.html#advanced-testing-patterns
*/
vi.mock('react-dom', () => ({
    useFormState: vi.fn(() => 'mocked value'),
  }));  

 /*
 Well that was annoying. Was hoping to show that a form might submit the form contents, but unfortunately
 and completely inexplicably, the UpdateUsername form throws an error where the deleteRequest one doesn't 

 Problems:
1) Below link shows exemplar which seems to show that you can set up lots of test inputs and then when
you click submit, all your test values are shown to have been submitted BUT it relies on page and the 
*vitest* version of userEvent, where I've also installed the react testing library version
 https://vitest.dev/guide/browser/component-testing.html#testing-complex-forms-with-validation

 2) The "Type" section of the below link is the React Testing Library code, so obviously, can't use a 
 mix of both, but the RTL version seems pretty pointless. You can say: "Ooh, I'd like to insert
 this value into input", then run another function confirming that input now says exactly what you 
 just told it to say. Although * shakes fists * even that is not as straight forward as you might think,
 because it doesn't overwrite the initial value, but seems to somehow spread the new input data in between
 the initial value

 This just feels like an absolutely colossal waste of time

 https://testing-library.com/docs/user-event/utility

 below has some explanation about how to sort out Types so you don't get the Type warnings
 https://github.com/testing-library/jest-dom?tab=readme-ov-file#tocontainelement
 */

  const testEmail = "test@email.com"
  const testUsername = "test username";
describe('updateusername', async () => {
    it('renders updateUserName', async () => {
     const user = userEvent.setup()
     const formAction = vi.fn();

      //const updateUserWithNewName = vi.fn();

      const { getByLabelText, getByText } = render(
        <UpdateUsername username={"initial username"} email={testEmail} >          
          </UpdateUsername>)
                
         // screen.debug();
         

          //const inputBox = screen.getByRole("textbox");
          const inputBox = screen.getByLabelText('Enter a new username and click update')
          expect(inputBox).toBeInTheDocument//toHaveTextContent('Enter a new username and click update')
          expect(inputBox).toBeVisible//toHaveTextContent('Enter a new username and click update')
          expect(inputBox).toHaveClass("border border-black rounded-sm global-input-width")
          expect(inputBox).toHaveValue("initial username")
          
          const defaultUsername = "initial username"
          await user.type(inputBox, testUsername, {initialSelectionStart: 0, initialSelectionEnd: defaultUsername.length})

          expect(inputBox).toHaveValue(testUsername)
          screen.getByRole("textbox");//"Enter a new username and click update" - name of textbox called left
          
            screen.getByRole("form").onsubmit = formAction;
                        
            const input = screen.getByRole('textbox')
          
            await user.type(input, testUsername, {initialSelectionStart: 0, initialSelectionEnd: defaultUsername.length})
                            
            expect(input).toHaveValue(testUsername)
            
            const submitButton = screen.getByRole('button', { name: /UPDATE/i })//.click()
      
            expect(submitButton).toHaveTextContent("UPDATE");
            expect(submitButton).toHaveAttribute('type', 'submit')             
            fireEvent.click(submitButton);           
            
            expect(formAction).toHaveBeenCalledTimes(1)

    })
})