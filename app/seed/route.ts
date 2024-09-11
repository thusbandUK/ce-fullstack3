//import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import data from '../lib/flashcard-seed-data.json';
//import { invoices, customers, revenue, users } from '../lib/placeholder-data';

const client = await db.connect();

//the json data is imported as 'data' in the imports list above. At that point, the data is not technically an array
//however, by declaring a const variable, below, to be equal to the data, the const variable becomes an array
const flashcardSeedArray = data;

//postgresql stores arrays in curly braces {} rather than square brackets []
//this function lops off the square brackets and returns the string in curly braces
const jsonToPostgresArray = (array: any) => {
  const string = JSON.stringify(array);
    const slicedString = string.slice(1, string.length-1);        
    return `{${slicedString}}`;  
}

async function seedFlashcards() {
  await client.sql`
  CREATE TABLE IF NOT EXISTS flashcards (
    id INTEGER PRIMARY KEY,
    definition TEXT,
    question TEXT,
    name TEXT,
    multiple_choice_responses JSON,
    correct_answer TEXT,
    checklist text[],
    examboards text[],
    topic JSON
    );    `

  const insertedFlashcards = await Promise.all(

    flashcardSeedArray.map(async (flashcard) => {

      return client.sql`
        INSERT INTO flashcards (id, definition, question, multiple_choice_responses, correct_answer, checklist, examboards, topic)
        VALUES (
          ${flashcard.id}, 
          ${flashcard.definition}, 
          ${flashcard.question}, 
          ${JSON.stringify(flashcard.multiple_choice_responses)},
          ${flashcard.correct_answer},
          ${jsonToPostgresArray(flashcard.checklist)},          
          ${jsonToPostgresArray(flashcard.examboards)},
          ${JSON.stringify(flashcard.topic)}         
        )
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedFlashcards;
}

/*
async function seedUsers2() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS users2 (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}

async function seedInvoices() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS invoices (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      customer_id UUID NOT NULL,
      amount INT NOT NULL,
      status VARCHAR(255) NOT NULL,
      date DATE NOT NULL
    );
  `;

  const insertedInvoices = await Promise.all(
    invoices.map(
      (invoice) => client.sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedInvoices;
}

async function seedCustomers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS customers (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      image_url VARCHAR(255) NOT NULL
    );
  `;

  const insertedCustomers = await Promise.all(
    customers.map(
      (customer) => client.sql`
        INSERT INTO customers (id, name, email, image_url)
        VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedCustomers;
}

async function seedRevenue() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS revenue (
      month VARCHAR(4) NOT NULL UNIQUE,
      revenue INT NOT NULL
    );
  `;

  const insertedRevenue = await Promise.all(
    revenue.map(
      (rev) => client.sql`
        INSERT INTO revenue (month, revenue)
        VALUES (${rev.month}, ${rev.revenue})
        ON CONFLICT (month) DO NOTHING;
      `,
    ),
  );

  return insertedRevenue;
}

*/

export async function GET() {  
  //return Response.json({
    //message:
      //'Uncomment this file and remove this line. You can delete this file when you are finished.',
  //});
  try {
    await client.sql`BEGIN`;
    await seedFlashcards();
    //await seedUsers2();
    //await seedCustomers();
    //await seedInvoices();
    //await seedRevenue();
    await client.sql`COMMIT`;

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
