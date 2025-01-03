import { sql } from '@vercel/postgres';
import { z } from 'zod';
import { FlashcardData, ExamboardData, TopicData, QuestionsData, UserData } from './definitions';
import { queryMaker, questionSetSimplifiedArray, randomSelectionOfFifteen } from './functions';

const ExamboardSchema = z.object({
  examboard_id: z.string()
});

const TopicSchema = z.object({
  topic_id: z.string()
});

export const UserEmailSchema = z.object({
  validatedEmail: z.string().email("This is not a valid email.")
})

export async function fetchUser(email: string | undefined | null) {
  if ((email === undefined) || email === null){
    throw new Error('Problems finding user.'); 
  }

  //sanitises the argument passed to examboardId parameter 
  const validatedData = UserEmailSchema.safeParse({
    validatedEmail: email,
  });

  const query ='SELECT * FROM users WHERE email = $1'

  const argument = [validatedData.data?.validatedEmail];
  
  try {    

    const data = await sql.query<UserData>(query, argument);    
  
    console.log('User data fetch completed.');

    return data.rows;

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch flashcard data.');
  }
}

export async function fetchFlashcards() {
  try {    

    const data = await sql<FlashcardData>`SELECT * FROM flashcards`;

    console.log('Flashcards data fetch completed.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch flashcard data.');
  }
}

export async function fetchExamboards() {
  try {    

    const data = await sql<ExamboardData>`SELECT * FROM examboards`;    

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch flashcard data.');
  }
}

export async function fetchTopics(examboardId: string) {
  
  //sanitises the argument passed to examboardId parameter 
  const validatedExamboardId = ExamboardSchema.safeParse({
    examboard_id: examboardId,
  });

  const query ='SELECT * FROM topics WHERE examboards_id = $1'

  const argument = [validatedExamboardId.data?.examboard_id];
  
  try {    

    const data = await sql.query<TopicData>(query, argument);    

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch flashcard data.');
  }
}

export async function fetchComplementaryTopic(examboardId: string) {
  
  //sanitises the argument passed to examboardId parameter 
  const validatedExamboardId = ExamboardSchema.safeParse({
    examboard_id: examboardId,
  });

  const query ='SELECT flashcards.id, flashcards.definition, flashcards.question, flashcards.name, flashcards.multiple_choice_responses, flashcards.correct_answer, flashcards.checklist FROM topics LEFT JOIN questions ON topics.id = topics_id LEFT JOIN flashcards ON flashcards.id = questions.question WHERE topics.complementary = true AND topics.examboards_id = $1;'

  const argument = [validatedExamboardId.data?.examboard_id];
  
  try {    

    const data = await sql.query<FlashcardData>(query, argument);    

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch flashcard data.');
  }
}

export async function fetchFlashcardsByTopic(topicId: string) {
  //sanitises the argument passed to topicId parameter 
  const validatedExamboardId = TopicSchema.safeParse({
    topic_id: topicId,
  });

  const initialQuery = 'SELECT flashcards.id, flashcards.definition, flashcards.question, flashcards.name, flashcards.multiple_choice_responses, flashcards.correct_answer, flashcards.checklist FROM questions LEFT JOIN flashcards ON flashcards.id = questions.question WHERE topics_id = $1'
  const initialArgument = [validatedExamboardId.data?.topic_id]
  
  try {
    
    const allFlashcardsData = await sql.query<FlashcardData>(initialQuery, initialArgument);    

    return allFlashcardsData.rows;
   
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch flashcard data.');
  }
}

export async function fetchRandomSetOfFlashcards(examboardId: string) {
  
  //sanitises the argument passed to examboardId parameter 
  const validatedExamboardId = ExamboardSchema.safeParse({
    examboard_id: examboardId,
  });  
  
  const initialQuery ='SELECT * FROM topics LEFT JOIN questions ON topics.id = questions.topics_id LEFT JOIN flashcards ON flashcards.id = questions.question WHERE topics.examboards_id = ($1) ORDER BY random() LIMIT 15'

  const initialArgument = [validatedExamboardId.data?.examboard_id];
  
  try {    

    //this fetches the question numbers listed for the queried topic
    const allFlashcardsData = await sql.query<FlashcardData>(initialQuery, initialArgument);    

    return allFlashcardsData.rows;
   
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch flashcard data.');
  }
}

/*
export async function fetchRevenue() {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    //console.log('Fetching revenue data...');
    //await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue>`SELECT * FROM revenue`;

    console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  try {
    const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));
    console.log(invoice); // Invoice is an empty array []
    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}
*/