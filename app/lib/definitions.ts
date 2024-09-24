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

export type topic = {  
  OCRA: string
}

//these all said string before
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

export type ExamboardData = {
  id: number;
  examboard: string;
};

export type TopicData = {
  id: number;
  examboards_id: number;
  topic: string;
}

export type QuestionsData = {
  id: number;
  topics_id: number;
  question: number;

}


/*
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};
*/