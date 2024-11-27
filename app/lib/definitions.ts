// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.

// create a new type HTMLElementEvent that has a target of type you pass
// type T must be a HTMLElement (e.g. HTMLTextAreaElement extends HTMLElement)

export type assessedResponse = {
  id: number;
  flashcardDataIndex: number;  
  response: string;
  checkedPoints: {
    W: boolean;
    X: boolean;
    Y: boolean;
    Z: boolean;
  }
}

//MouseEventHandler - not sure if this is needed now, delete?
export type customMouseEventHandler<T extends React.MouseEventHandler> = Event & {
  target: T;
  currentTarget: T;
}

export type ExamboardData = {
  id: number;
  examboard: string;
  logged_interest: number;
  description: string;
  has_flashcards: boolean;
};

export type FlashcardData = {
  id: string;
  definition: string;
  question: string;
  name: string;
  multiple_choice_responses: MCQData;
  correct_answer: string;
  checklist: string[];
  examboards: string[];
  topic: topic;
};

export type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T; 
  // probably you might want to add the currentTarget as well
  currentTarget: T;
}

export type MCQData = {
  A: string,
  B: string,
  C: string,
  D: string
}

export type ModalContent = {
  heading: string;
  content: string;
  link: null | {
    url: string;
    text: string;
  };
}

export type QuestionsData = {
  id: number;
  topics_id: number;
  question: number;

}


//this is referenced by FlashcardData definition above
export type topic = {  
  OCRA: string
}

export type TopicData = {
  id: number;
  examboards_id: number;
  topic_code: string;
  topic_description: string;
  complementary: boolean;
}

//consider revising - this links to the session data, produced by eg: google login
export type userData = {
  user: {
    name: string,
    email: string,
    image: string,
  },
  expires: string,
}

//this is the userData as in the data stored in the ChemistryElephant database
export type UserData = {
  id: string;
  name: string;
  email: string;
  receive_email: boolean;
};

export type UserDetails = {
  name: string;
  email: string;
}