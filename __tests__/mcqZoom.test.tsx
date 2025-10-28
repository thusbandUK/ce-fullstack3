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

const multipleChoiceResponse = "right"
const referredViaIndividual = false

// Mock the module
/*
This is a common requirement in component tests because rendering the component will call
various functions, many of which will crash the test render, esp server calls
*/
vi.mock('next/font/google', () => ({
    Inconsolata: vi.fn(() => 'mocked value'),
  }));
  

describe('MCQZoom', async () => {
    it('renders MCQZoom', async () => {
      //mocks handleQuestionClick
      const handleQuestionClick = vi.fn((event) => {        
        return event.target.id;
      });

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
      
      screen.getAllByRole('button').forEach((x) => {
        expect(x).toHaveTextContent('SELECT');
      })

    await userEvent.click(screen.getAllByRole('button')[0]);    
    await userEvent.click(screen.getAllByRole('button')[1]);
    await userEvent.click(screen.getAllByRole('button')[2]);
    await userEvent.click(screen.getAllByRole('button')[3]);

    expect(handleQuestionClick).toHaveReturnedWith("A");
    expect(handleQuestionClick).toHaveReturnedWith("B");
    expect(handleQuestionClick).toHaveReturnedWith("C");
    expect(handleQuestionClick).toHaveReturnedWith("D");
    expect(handleQuestionClick).not.toHaveReturnedWith("E");    

    expect(handleQuestionClick).toHaveBeenCalledTimes(4);
    });
    
  })

  describe('MCQZoom', async () => {
    it('renders MCQZoom in sequence A to D if referredViaIndividual is true', async () => {
      //mocks handleQuestionClick
      const handleQuestionClick = vi.fn((event) => {        
        return event.target.id;
      });

      render(<MCQZoom 
        oneFlashcardData={oneFlashcardData}
        handleQuestionClick={handleQuestionClick}
        multipleChoiceResponse={multipleChoiceResponse}
        referredViaIndividual={true} 
      />);
      
      expect(screen.getByText(`A: ${oneFlashcardData.multiple_choice_responses.A}`)).toBeInTheDocument();
      expect(screen.getByText(`B: ${oneFlashcardData.multiple_choice_responses.B}`)).toBeInTheDocument();
      expect(screen.getByText(`C: ${oneFlashcardData.multiple_choice_responses.C}`)).toBeInTheDocument();
      expect(screen.getByText(`D: ${oneFlashcardData.multiple_choice_responses.D}`)).toBeInTheDocument();
      
      screen.getAllByRole('button').forEach((x) => {
        expect(x).toHaveTextContent('SELECT');
      })

    expect(handleQuestionClick).not.toHaveReturnedWith("A");  
    await userEvent.click(screen.getAllByRole('button')[0]);
    expect(handleQuestionClick).toHaveReturnedWith("A");

    expect(handleQuestionClick).not.toHaveReturnedWith("B");
    await userEvent.click(screen.getAllByRole('button')[1]);
    expect(handleQuestionClick).toHaveReturnedWith("B");

    expect(handleQuestionClick).not.toHaveReturnedWith("C");
    await userEvent.click(screen.getAllByRole('button')[2]);
    expect(handleQuestionClick).toHaveReturnedWith("C");
    
    expect(handleQuestionClick).not.toHaveReturnedWith("D");
    await userEvent.click(screen.getAllByRole('button')[3]);
    expect(handleQuestionClick).toHaveReturnedWith("D");
    
    expect(handleQuestionClick).not.toHaveReturnedWith("E");    

    expect(handleQuestionClick).toHaveBeenCalledTimes(4);
    });
    
  })