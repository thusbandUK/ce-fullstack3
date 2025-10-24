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

vi.mock('react-dom', () => ({
    useFormState: vi.fn(() => 'mocked value'),
  }));

describe('deleteRequest', async () => {
    it('renders MCQZoom', async () => {
      //const handleQuestionClick = vi.fn();
      //const useFormState = vi.fn();
      const formAction = vi.fn();

      render(<DeleteRequest
        email={"test@email.com"}        
      />);
      //screen.debug();
      
      //fireEvent.click(screen.getByRole('button'))
      //expect(formAction).toHaveBeenCalledTimes(1)

    })
})