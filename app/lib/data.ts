"use server"

import { sql } from '@vercel/postgres';
import { z } from 'zod';
import { FlashcardData, ExamboardData, TopicData, QuestionsData, UserData } from './definitions';
import { UserEmailSchema } from './schema';
import { redirect } from 'next/navigation';
import { pool } from './poolInstantiation';
import { verifySolution } from 'altcha-lib';

const illegal = {message: "illegal characters"}

const IndividualCardSchema = z.object({
  flashcard_code: z.string({invalid_type_error: "Code must be three letters",}).regex(/^[A-Za-z]+$/, illegal).max(3).min(3).toUpperCase(),
  hmac: z.coerce.string(),
})

const ExamboardSchema = z.object({
  examboard_id: z.string().regex(/^[0-9]+$/, illegal)
});

const TopicSchema = z.object({
  topic_id: z.string().regex(/^[0-9]+$/, illegal)
});

//checks that TopicTitle string contains no special characters other than periods
const TopicTitleSchema = z.object({
  topic_title: z.string({invalid_type_error: "Topic title should not contain any special characters other than period",}).regex(/^[a-zA-Z0-9. ]+$/).toLowerCase(),
  logged_in: z.boolean()
})

//checks that TopicTitle string contains no special characters other than periods
const ExamboardTitleSchema = z.object({
  examboard_title: z.string({invalid_type_error: "Topic title should not contain any special characters other than period",}).regex(/^[a-zA-Z0-9. ]+$/)
})

export type CodeState = {
  message?: string | null;
  errors?: {
    code?: string[];
    altcha?: string[];
  };
};

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

    const client = await pool.connect();

    const data = await client.query<UserData>(query, argument);    

    client.release();

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

    const client = await pool.connect()

    const data = await client.query<ExamboardData>(`SELECT * FROM examboards`);

    client.release()

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch flashcard data.');
  }
}

import { headers } from "next/headers";

export async function getClientIpAddress(){
  //see https://github.com/vercel/next.js/pull/59719/commits/3cc1a3798246c4f952a2d23e69bba4bb5ae617a7
  const returnedHeaders = await headers();

  return returnedHeaders.get("x-forwarded-for") ? returnedHeaders.get("x-forwarded-for") : 'no ip address available' 
}

import { logSuspiciousActivity } from './logging';

export async function fetchTopics(examboardId: string) {
  
  //sanitises the argument passed to examboardId parameter 
  const validatedExamboardId = ExamboardSchema.safeParse({
    examboard_id: examboardId,
  });
  
  try {    

    if (!validatedExamboardId.success){
      const errorMessage = validatedExamboardId.error.flatten().fieldErrors.examboard_id
      if (errorMessage?.includes("illegal characters")){
        await logSuspiciousActivity(examboardId, "fetchTopics")
      }
      return
    }
    const query ='SELECT * FROM topics WHERE examboards_id = $1'

    const argument = [validatedExamboardId.data?.examboard_id];

    const client = await pool.connect();

    const data = await client.query<TopicData>(query, argument);    

    client.release()

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    return
  }
}

/*
Similarly named to the function directly below. This fetches a single flashcard from a link in which
the params contain a three-letter code that links to a specific flashcard
*/

export async function fetchIndividualFlashcardByCode(flashcardCode: string) {

  //sanitises the arguments passed  
  const validatedData = IndividualCardSchema.safeParse({    
    flashcard_code: flashcardCode,
  })
  
  const query ='SELECT * FROM flashcards WHERE name = $1;'

  const argument = [validatedData.data?.flashcard_code];
  
  try {

    if (!validatedData.success){
      const errorMessage = validatedData.error.flatten().fieldErrors.flashcard_code
      if (errorMessage?.includes("illegal characters")){
        await logSuspiciousActivity(flashcardCode, "fetchIndividualFlashcardByCode")
      }
      return
    }

    const client = await pool.connect();

    const data = await client.query<FlashcardData>(query, argument);

    client.release();

    return data.rows;

  } catch (error) {    
    console.error('Database Error:', error);
    throw new Error('Failed to fetch flashcard data.');
  }
}



/*
This is the function where users can enter a three letter code from an insta post to check their answer, 
rather than landing directly on the flashcard page from a complete link. The function validates the
code to make sure nothing nefarious is entered. It will return an error if anything other than three
letters is entered (not caps sensitive, it just coerces to upper case via the relevant zod object).
It will also return an error if the three-letter code is not recognised. 
If the code is recognised, it is spliced into the url to which the function redirects, so that they go
to the flashcard
it uses IndividualCardSchema and CodeState (both defined at top of this module)
It now also has the altcha connected
*/

export async function fetchIndividualFlashcardByCodeInternal(prevState: CodeState, formData: FormData) {

  const hmacKey = process.env.ALTCHA_HMAC_SECRET;

  // Get the 'altcha' field containing the verification payload from the form data
  const altcha = formData.get('altcha')

  // If the 'altcha' field is missing, return an error
  
  if (!altcha) {
    return {
      ...prevState,
      message: "Oh dear, there is a problem!",
      errors: {
        altcha: ["Did you tick the Captcha box?"]
      }
    }
  }

  //extracts formData
  const flashcardCode = formData.get("flashcard-code")
  //sanitises the arguments passed
  const validatedData = IndividualCardSchema.safeParse({
    flashcard_code: flashcardCode,
    hmac: hmacKey,
  })

  //returns error if entered code is anything other than three letters
  if (!validatedData.success) {
    const errorMessage = validatedData.error.flatten().fieldErrors.flashcard_code
      if (errorMessage?.includes("illegal characters")){
        const stringToPass = flashcardCode ? flashcardCode.toString() : 'no code passed'
        await logSuspiciousActivity(stringToPass, "fetchIndividualFlashcardByCodeInternal")
      }
    return {
      message: 'Code rejected.',
      errors: {
        code: ['It must be three letters. Please try again.']
        //validatedData.error.flatten().fieldErrors.flashcard_code,
      },
    };
  }

  //extracts string coerced hmacKey and validated email
  const {hmac: validatedHmacKey} = validatedData.data;

  //Verify the solution using the secret HMAC key
  const verified = await verifySolution(String(altcha), validatedHmacKey)

  //if the captcha doesn't verify, this returns an error message saying so
  
  if (!verified){
    return {
      message: 'Oh dear, there is a problem.',
        errors: {
          code: [],
          altcha: ['Unfortunately your captcha attempt failed. Are you a robot?']
      },
    }
  }

  //database query for three letter code
  const query ='SELECT name FROM flashcards WHERE name = $1;'
  const argument = [validatedData.data?.flashcard_code];

  try {
    const client = await pool.connect();

    //calls database to check for a flashcard with the entered three letter code
    const data = await client.query(query, argument);
    
    client.release();

    //returns error if code not recognised
    if (data.rows.length === 0){
      return {
        message: 'No data for that code. Double check the code and try again.',
        errors: {
          code: [],
          altcha: []
        }
      }
    }

  } catch (error){
    console.log(error)
    return {
      message: 'Database Error: Failed to collect flashcard.'
    };
  }

  //redirects user to the individual flashcard page, specifying the validated three-letter code
  redirect(`/flashcards/individual/${validatedData.data?.flashcard_code}/set`)

}


export async function fetchComplementaryTopic(examboardId: string) {
    
  //sanitises the argument passed to examboardId parameter 
  const validatedExamboardId = ExamboardSchema.safeParse({
    examboard_id: examboardId,
  });  
  
  try {
    
    if (!validatedExamboardId.success){
      const errorMessage = validatedExamboardId.error.flatten().fieldErrors.examboard_id
      if (errorMessage?.includes("illegal characters")){
        await logSuspiciousActivity(examboardId, "fetchComplementaryTopic")
      }
      return
    }

    const query ='SELECT flashcards.id, flashcards.definition, flashcards.question, flashcards.name, flashcards.multiple_choice_responses, flashcards.correct_answer, flashcards.checklist FROM topics LEFT JOIN questions ON topics.id = topics_id LEFT JOIN flashcards ON flashcards.id = questions.question WHERE topics.complementary = true AND topics.examboards_id = $1;'

    const argument = [validatedExamboardId.data?.examboard_id];

    const client = await pool.connect();

    const data = await client.query<FlashcardData>(query, argument);    

    client.release();

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    return;
  }
}

export async function fetchFlashcardsByTopic(topicId: string) {
  //sanitises the argument passed to topicId parameter 
  const validatedTopicId = TopicSchema.safeParse({
    topic_id: topicId,
  });  
  
  try {

    if (!validatedTopicId.success){
      const errorMessage = validatedTopicId.error.flatten().fieldErrors.topic_id
      if (errorMessage?.includes("illegal characters")){
        await logSuspiciousActivity(topicId, "fetchFlashcardsByTopic")
      }
      return
    }

    const initialQuery = 'SELECT flashcards.id, flashcards.definition, flashcards.question, flashcards.name, flashcards.multiple_choice_responses, flashcards.correct_answer, flashcards.checklist FROM questions LEFT JOIN flashcards ON flashcards.id = questions.question WHERE topics_id = $1'
    const initialArgument = [validatedTopicId.data?.topic_id]
    
    const client = await pool.connect();

    const allFlashcardsData = await client.query<FlashcardData>(initialQuery, initialArgument);    

    client.release()

    return allFlashcardsData.rows;
   
  } catch (error) {
    console.error('Database Error:', error);
    return;
  }
}

export async function fetchRandomSetOfFlashcards(examboardId: string) {
  
  //sanitises the argument passed to examboardId parameter 
  const validatedExamboardId = ExamboardSchema.safeParse({
    examboard_id: examboardId,
  });
  
  try {

    if (!validatedExamboardId.success){
      const errorMessage = validatedExamboardId.error.flatten().fieldErrors.examboard_id
      if (errorMessage?.includes("illegal characters")){
        await logSuspiciousActivity(examboardId, "fetchRandomSetOfFlashcards")
      }
      return
    }

    const initialQuery ='SELECT * FROM topics LEFT JOIN questions ON topics.id = questions.topics_id LEFT JOIN flashcards ON flashcards.id = questions.question WHERE topics.examboards_id = ($1) ORDER BY random() LIMIT 15'

    const initialArgument = [validatedExamboardId.data?.examboard_id];

    const client = await pool.connect();
    //this fetches the question numbers listed for the queried topic
    const allFlashcardsData = await client.query<FlashcardData>(initialQuery, initialArgument);    

    client.release();

    return allFlashcardsData.rows;
   
  } catch (error) {
    console.error('Database Error:', error);
    return
  }
}

/*
This function takes the title of a topic, eg: "2.1.4 Acids", validates the argument to ensure it contains
no special characters, eg: ;<> etc, then searches the database to return the topic_id and examboards_id
for that topic. Those details are then used to redirect the user to the page which will render the
flashcards for that topic.
*/
export async function fetchFlashcardsByTopicDescriptor(topicTitle: string, loggedIn: boolean) {

  //validates topicTitle string (see TopicTitleSchema defined above)
  const validatedData = TopicTitleSchema.safeParse({
    topic_title: topicTitle,
    logged_in: loggedIn
  })

  //returns error if validation fails, esp if it fails regex because of containing special characters other than periods
  if (!validatedData.success) {
    //logs error to server console
    console.error('BAD ACTOR ALERT! Topic-title validation failure with error', validatedData.error.flatten().fieldErrors.topic_title, 'suggests someone has passed a topic-title containing special characters other than periods.')
    //returns vague message to user
    return {
      message: 'Oh dear, something went wrong.',
    };
  }

  //extracts validated topicTitle
  //const validatedTopicTitle = validatedData.data?.topic_title;
  //const validatedLoggedIn = validatedData.data?.logged_in;

  const { topic_title: validatedTopicTitle, logged_in: validatedLoggedIn } = validatedData.data
  
  //defines database query and argument
  const initialQuery = "SELECT id, examboards_id, complementary FROM topics WHERE $1 LIKE '%' || LOWER(topic_code) || '%' AND $1 LIKE '%' || LOWER(topic_description) || '%';"
  const initialArgument = [validatedTopicTitle];

  //defines an empty object, to which database values can be added, so that the values can be used
  //below the try / catch statement
  let idAndExamboard = {id: "", examboard: ""}

  try {
    const client = await pool.connect();
    //calls database
    const idAndExamboardData = await client.query(initialQuery, initialArgument);

    client.release()
    //returns error message if no data found
    if (idAndExamboardData.rows.length === 0){
      //logs message to server console, to record any broken topic titles
      console.error(`Topic-title '${validatedTopicTitle}' did not return any values from the database`)
      //returns message to user
      return {
        message: "Oh dear, there does not seem to be any data available for that request.",
      };
    }
    
    //passes database values to object defined above try/ catch statement
    idAndExamboard = {id: idAndExamboardData.rows[0].id, examboard: idAndExamboardData.rows[0].examboards_id}

    //if the topic is not complementary and the user is logged in, a link is returned, which will
    //bring up a dialogue modal, informing the user they will need to sign in to access the content
    if ((idAndExamboardData.rows[0].complementary) === false && (validatedLoggedIn === false)){
      return {
        callback: `/account/login?location=/flashcards/${idAndExamboard.examboard}/topic/${idAndExamboard.id}/set`
      }
    }
    
  } catch (error: unknown) {
    //this is a TypeScript thing, since error is unknown, it has to be checked that the error is
    //an error object, in which case the message value can be accessed
    if (error instanceof Error){
      console.error('Database Error:', error.message);
      throw new Error("Something went wrong.");
    } else {
      console.error('Database Error', error);
      throw new Error("Something went wrong.")
    }
    
  }

  //redirects user to the requested set of flashcards
  redirect(`/flashcards/${idAndExamboard.examboard}/topic/${idAndExamboard.id}/set`);

}

export async function fetchTopicsByExamboardTitle(examboardTitle: string) {

  //validates topicTitle string (see TopicTitleSchema defined above)
  const validatedData = ExamboardTitleSchema.safeParse({
    examboard_title: examboardTitle
  })

  //returns error if validation fails, esp if it fails regex because of containing special characters other than periods
  if (!validatedData.success) {
    //logs error to server console
    console.error('BAD ACTOR ALERT! Examboard-title validation failure with error', validatedData.error.flatten().fieldErrors.examboard_title, 'suggests someone has passed a topic-title containing special characters other than periods.')
    console.error('string passed:', examboardTitle)
    //returns vague message to user
    return {
      message: 'Oh dear, something went wrong.',
    };
  }

  //extracts validated topicTitle
  const validatedExamboardTitle = validatedData.data?.examboard_title;
  
  //defines database query and argument
  const initialQuery = "SELECT id FROM examboards WHERE examboard = $1;"
  const initialArgument = [validatedExamboardTitle];

  //defines an empty object, to which database values can be added, so that the values can be used
  //below the try / catch statement
  let examboardIdForRedirect = ""

  try {
    const client = await pool.connect();
    //calls database
    const examboardData = await client.query(initialQuery, initialArgument);

    client.release();

    //returns error message if no data found
    if (examboardData.rows.length === 0){
      //logs message to server console, to record any broken topic titles
      console.error(`Topic-title '${validatedExamboardTitle}' did not return any values from the database`)
      //returns message to user
      return {
        message: "Oh dear, there does not seem to be any data available for that request.",
      };
    }
    
    //passes database values to object defined above try/ catch statement
    examboardIdForRedirect = examboardData.rows[0].id;

  } catch (error: unknown) {
    //this is a TypeScript thing, since error is unknown, it has to be checked that the error is
    //an error object, in which case the message value can be accessed
    if (error instanceof Error){
      console.error('Database Error:', error.message);
      throw new Error("Something went wrong.");
    } else {
      console.error('Database Error', error);
      throw new Error("Something went wrong.")
    }
    
  }

  //redirects user to the requested set of flashcards
  redirect(`/flashcards/${examboardIdForRedirect}/topic`);

}