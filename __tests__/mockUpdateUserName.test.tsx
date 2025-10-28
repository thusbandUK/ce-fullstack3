import { describe, it, expect } from 'vitest';
import MockUpdateUsername from './mockedComponents/mockUpdateUserName';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest'

/*

This runs a mock version of updateUsername. It's slightly misleading to say "mock", perhaps, 
because it doesn't use a testing suit mock method, but instead tests a modified copy of updateUsername,
since it's the easiest way to test the functionality of the form



*/

vi.mock('react-dom', () => ({
    useFormState: vi.fn(() => 'mocked value'),
  }));

  const testEmail = "test@email.com"
  const testInitialUsername = "first-name"

describe('formAction', () => {
  it('extracts message from FormData', () => {

    const mockFormAction = vi.fn((oldUsername, email, newUsername) => {
      expect(oldUsername).toBe(testInitialUsername);
      expect(email).toBe(testEmail);
    });
    const { getByLabelText, getByText } = render(<MockUpdateUsername formAction={mockFormAction} username={testInitialUsername} email={testEmail} />);

  //screen.debug()

  const input = screen.getByRole('textbox')
  const submitButton = screen.getByRole('button', { name: /UPDATE/i })

  fireEvent.click(submitButton);
  expect(mockFormAction).toHaveBeenCalledWith(testInitialUsername, testEmail, "");

  fireEvent.change(input, { target: { value: 'Hello World' } });
  fireEvent.click(submitButton);

  expect(mockFormAction).toHaveBeenCalledWith(testInitialUsername, testEmail, 'Hello World');
  expect(mockFormAction).toHaveBeenCalledTimes(2);

  });
});