import HeaderDivs from "@/app/ui/dashboard/header";
import Section from "@/app/ui/dashboard/section";
import SectionBorderless from "@/app/ui/dashboard/sectionBorderless";
import ClientDivPurify from "@/app/ui/dashboard/clientDivPurify";

const aboutContent = {
  h1Title: "Why Chemistry Elephant?",
  section1: `
              <p>Honestly, the name had to be a googlewhack and one of the two words had to be chemistry. 
              Chemistry Tardigrade was in the mix for a while, but luckily we saw sense. Chemistry 
              Elephant had a nice ring and the more we thought about it, the more we realised maybe 
              we're all chemistry elephants.</p>
            `,
  section2: `
              <p>Are you currently studying to sit a UK A-level in chemistry? Let us guess something you've said since you started the course…</p>
              <br/>
              <p><em>“You have to do all this for one mark?”</em></p>
              <br/>
              <p>Yep, it's a difficult course. So difficult. I mean, not to put anyone off, but it's really, really hard. But that's why we're here. We can't make A-level chemistry less difficult, but we can show you the habits that boost grades and, we hope, possible the impossible when you get an assignment that floors you.</p>
            `,
  section3: `
              <h2 class="mb-5">So what's with the elephants?</h2>
              <p>Elephants are majestic, they stride with purpose and dignity. None of us on the Chemistry Elephant team could outperform an elephant in a test of physical strength, but we'd run rings around them in the chemistry lab. So they've got strengths and they've got weaknesses. Completely normal.</p>
              <br/>
              <p>Maybe the confidence you have in other parts of your life falls to pieces when you do chemistry. We're here to foster that stride when the challenges of chemistry rear up.</p>
              <br/>
              <p>Maybe you already stride like an elephant in the chemistry lab, but you want to maintain that swagger when you level up to university or your first professional role.</p>
              <br/>
              <p>Whatever your situation, Chemistry Elephant aims to provide resources and support to help you learn to walk with an elephant's majesty through the challenging grasslands of chemistry.</p>
  
            `,
  section4: `
              <p>Right now you can check out our 
              <a
                href='/flashcards'
                class="font-bold hover:underline active:text-red"
              >flashcards<a>. 
              No need to create your own flashcards, 
              we’ve got ready made ones here. Our on board OCR A examiner has written prompts and 
              model answers to cover those parts of the specification that you just need to be able 
              to recall from memory. You can go straight to writing your own answers from memory, or 
              if you’re still building up your knowledge, you can select the multiple choice format.</p>
            `,
  section5: `
              <p>What’s next for Chemistry Elephant? Get in on the ground floor by signing up for our 
              <a
                href='/account/receive-email?location=/about'
                class="font-bold hover:underline active:text-red"
              > newsletter</a>!
               But the plan is to start blogging advice for Chemistry A-level users, publishing 
              videos and ultimately creating an interactive online course covering the whole of A-level chemistry.</p>
            `
}


export default async function About(){

     return (
      <>
        <HeaderDivs h1Content={aboutContent.h1Title}></HeaderDivs>
        <Section
          keyNumber={1}
          topMargin={false}
        >
          <ClientDivPurify
            content={aboutContent.section1}
          >
          </ClientDivPurify>
        </Section>
        <Section 
          keyNumber={2}
          title="Who are we for?"
        >
          <ClientDivPurify
            content={aboutContent.section2}
          >
          </ClientDivPurify>
        </Section>
        <SectionBorderless>
        <ClientDivPurify
            content={aboutContent.section3}
          >
          </ClientDivPurify>
        </SectionBorderless>
        <Section
          keyNumber={3}
          title="Flashcards"
        >
          <ClientDivPurify
            content={aboutContent.section4}
          >
          </ClientDivPurify>
        </Section>
        <Section
          keyNumber={4}
          title="Future"
        >
          <ClientDivPurify
            content={aboutContent.section5}
          >
          </ClientDivPurify>
        </Section>
        </>
)
}