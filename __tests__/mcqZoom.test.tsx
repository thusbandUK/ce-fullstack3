import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, describe, it } from 'vitest'
import MCQZoom from '../app/ui/dashboard/mcqZoom';
import {Inconsolata} from "next/font/google";
import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'

const oneFlashcardData = {
    id: 1,
    definition: "The weighted average mass of an atom relative to one twelfth of the mass of an atom of carbon-12",
    question: "Define relative atomic mass",
    name: "RAM",
    multiple_choice_responses: {
       A: "The mass of an atom relative to one twelfth of the mass of an atom of carbon",
       B: "The mass of a compound relative to one twelfth of the mass of an atom of carbon-12",
       C: "The average mass of an atom relative to one twelfth of the mass of an atom of carbon-12",
       D: "The average mass of an element relative to one twelfth of the mass of an atom of carbon-12."
    },
    correct_answer: "C",
    checklist: [
       "average OR mean mass of an atom",
       "relative to one twelfth of the mass",
       "of an atom of carbon-12",
       ""
    ],
    examboards: [
       "OCRA"
    ],
    topic: {
       OCRA: "2.1.1 Atomic structure and isotopes"
    }
 }

const handleQuestionClick = () => console.log('button clicked');
const multipleChoiceResponse = "C"
const referredViaIndividual = false
/*
const person = {
    greet: (name: string) => `Hello ${name}`,
  }
  const spy = vi.spyOn(person, 'greet').mockImplementation(() => 'mocked')
  expect(person.greet('Alice')).toBe('mocked')
  expect(spy.mock.calls).toEqual([['Alice']])
*/
// Mock the module
vi.mock('next/font/google', () => ({
    Inconsolata: vi.fn(() => 'mocked value'),
  }));
  

describe('MCQZoom', async () => {
    it('renders MCQZoom', async () => {
      const handleQuestionClick = vi.fn();
      //const onClick = vi.fn();

      render(<MCQZoom 
        oneFlashcardData={oneFlashcardData}
        handleQuestionClick={handleQuestionClick}
        multipleChoiceResponse={multipleChoiceResponse}
        referredViaIndividual={referredViaIndividual} 
      />);
      screen.debug();
      
      expect(screen.getByText(oneFlashcardData.multiple_choice_responses.A)).toBeInTheDocument();
      expect(screen.getByText(oneFlashcardData.multiple_choice_responses.B)).toBeInTheDocument();
      expect(screen.getByText(oneFlashcardData.multiple_choice_responses.C)).toBeInTheDocument();
      expect(screen.getByText(oneFlashcardData.multiple_choice_responses.D)).toBeInTheDocument();
      
//screen.getByRole('')

//screen.getByRole('button', { id: 'A' }).fill('admin')
//expect(screen.getByRole('paragraph', { name: 'possible answer 1' })).toHaveTextContent(oneFlashcardData.multiple_choice_responses.A)
//expect(screen.getByRole('paragraph', { name: 'possible answer 2' })).toHaveTextContent(oneFlashcardData.multiple_choice_responses.B)
//expect(screen.getByRole('paragraph', { name: 'possible answer 3' })).toHaveTextContent(oneFlashcardData.multiple_choice_responses.C)
//expect(screen.getByRole('paragraph', { name: 'possible answer 4' })).toHaveTextContent(oneFlashcardData.multiple_choice_responses.D)

      //expect(screen.getAllByRole('button')[0]).toHaveTextContent('SELECT');

      screen.getAllByRole('button').forEach((x) => {
        expect(x).toHaveTextContent('SELECT');
      })

    await userEvent.click(screen.getAllByRole('button')[0]);
    await userEvent.click(screen.getAllByRole('button')[1]);
    await userEvent.click(screen.getAllByRole('button')[2]);
    await userEvent.click(screen.getAllByRole('button')[3]);

    expect(handleQuestionClick).toHaveBeenCalledTimes(4);
    });
    
  })