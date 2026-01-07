
/*IMported this as the easiest way to switch off Again test (commented out below) to which
I will return another day */

import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, describe, it } from 'vitest'
import { vi } from 'vitest'

import Slider from '../app/ui/dashboard/slider';
import ArrowCommand from '../app/ui/dashboard/arrowCommand';

const modifyFontSize = (number: number) => console.log(number.toString());

describe('Slider', () => {
  it('renders Slider component', () => {
    render(<Slider modifyFontSize={modifyFontSize} />);    
    const slider = screen.getByRole('slider');
    expect(slider).not.toHaveValue("48")
    fireEvent.change(slider, {
      target: { value: 48 },
    });
    expect(slider).toHaveValue("48")
  });  
});

describe('ArrowCommand', () => {
  it('renders ArrowCommand component', () => {
    render(<ArrowCommand command="test-command" borderGray={true} disabled={false}/>);    
    expect(screen.getByRole('paragraph')).toHaveTextContent('test-command');   
  });  
});

/*End of unnecessary import */

/*
import Again from '../app/(overview)/account/delete/[again]/page'
import { vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, describe, it } from 'vitest'

  vi.mock(import("../app/ui/deleteRequestRenew"), async (importOriginal) => {
    const actual = await vi.importActual("../app/ui/deleteRequestRenew")
    const mockFunction = ({email, message}: {email: string, message: string}) => {    
        return (
            <div>
                <p role="mock-function-intro-par">Mock function</p>
                <p role="mock-email-par">email: {email}</p>
                <p role="mock-message-par">message: {message}</p>
            </div>
        )
     }
    return {
      ...actual,
      default: mockFunction
    }
})
    
//mock session object

  const session = {
    user: { email: "mock@email.com"},    
  }  

//mocks auth function, returning the above session object
  /*vi.mock('../auth.ts', () => ({
    auth: vi.fn(() =>{
      console.log('called')
       return session}),
  })); *//*

  vi.mock(import ('../auth.ts'), async (importOriginal) => {
    const actual = await importOriginal()
    return {
      ...actual
    }
    getSession: vi.fn(() =>{
      console.log('called')
       return session}),
  }); 

  //mock message
  const message = "mock message for: "  

  //code to mock renewDeleteMessage
  vi.mock('../app/lib/functions', () => ({    
    renewDeleteMessage: vi.fn((param) => {
        return message + param.again
    })
  }))

  describe('updateusername', async () => {
    it('renders updateUserName', async () => {
      const mockAgainParam = "again"

      render(await Again({params: {again: mockAgainParam}}))

      screen.debug();

      const header = screen.getByRole("heading");
      expect(header).toHaveTextContent('New link')

      const mockEmailPar = screen.getByRole("mock-email-par");
      const mockMessagePar = screen.getByRole("mock-message-par");
 
      expect(mockEmailPar).toHaveTextContent(session.user.email)
      expect(mockMessagePar).toHaveTextContent(message + mockAgainParam) 

      })
    });
    */