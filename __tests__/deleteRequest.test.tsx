import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, describe, it } from 'vitest'
import MCQZoom from '../app/ui/dashboard/mcqZoom';
import DeleteRequest from '../app/ui/deleteRequest';
import {Inconsolata} from "next/font/google";
import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { State2, initiateDelete } from '../app/lib/deleteAccount';
import { useFormState } from 'react-dom';
import { page } from 'vitest/browser'
//(data: any) => console.log(data)
/*
https://vitest.dev/guide/browser/component-testing.html#advanced-testing-patterns
*/
vi.mock('react-dom', () => ({
    useFormState: vi.fn(() => 'mocked value'),
  }));

  const testEmail = "test@email.com"
describe('deleteRequest', async () => {
    it('renders MCQZoom', async () => {
      //const handleQuestionClick = vi.fn();
      const useFormState = vi.fn();
      //const formAction = vi.fn((data: any) => {console.log(data)});
      const formAction = vi.fn(() => {
      //console.log(typeof data)
        return testEmail;
      });
      
      //const formSpy = vi.spyOn(formAction)

      const { getByLabelText, getByText } = render(
        <DeleteRequest email={testEmail} >          
          </DeleteRequest>
      )

      screen.getByRole("form").onsubmit =
          formAction;     
      
       screen.getByRole('button', { name: /delete/i }).click()
       
      expect(formAction).toHaveReturnedWith(testEmail)

    })
})