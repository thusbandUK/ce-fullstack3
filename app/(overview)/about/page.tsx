import HeaderDivs from "@/app/ui/dashboard/header";
import LeftHandColumn from "@/app/ui/dashboard/leftHandColumn";
import RightHandColumn from "@/app/ui/dashboard/rightHandColumn";
import BottomRow from "@/app/ui/dashboard/bottomRow";
import Section from "@/app/ui/dashboard/section";
import IndividualElephantContainer from "@/app/animation/individualElephantContainer";
import SectionBorderless from "@/app/ui/dashboard/sectionBorderless";
import DOMPurify from "isomorphic-dompurify";

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

// className="m-auto"
     return (
      <>
        <HeaderDivs h1Content={aboutContent.h1Title}></HeaderDivs>
        <Section
          keyNumber={1}
          topMargin={false}
        >
          <div 
            dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(aboutContent.section1)}}
          ></div>          
        </Section>
        <Section 
          keyNumber={2}
          title="Who are we for?"
        >          
          <div 
            dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(aboutContent.section2)}}
          ></div>
        </Section>
        <SectionBorderless>
          <div 
            dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(aboutContent.section3)}}
          >
          </div>
        </SectionBorderless>
        <Section
          keyNumber={3}
          title="Flashcards"
        >
          <div 
            dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(aboutContent.section4)}}
          >
          </div>
        </Section>
        <Section
          keyNumber={4}
          title="Future"
        >
          <div 
            dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(aboutContent.section5)}}
          >
          </div>
        </Section>
          
            
        </>
)
}

/*
<BottomRow>
            <LeftHandColumn>
              <div>
                <p>Watch this space folks, content coming soon!</p>
              </div>
            </LeftHandColumn>
            <RightHandColumn>
              <IndividualElephantContainer />
            </RightHandColumn>
          </BottomRow>

<IndividualElephantContainer />

<div  className="md:grid md:grid-cols-6 gap-0 w-full items-center justify-center rounded-lg">
              <div className="col-start-1 col-span-6 md:col-span-4 w-full flex flex-col border border-black rounded-lg p-5">
          <p>{message}</p>

 <div className="col-start-1 col-span-6 md:col-span-4 w-full">

                    <textarea 
                      id="response"
                      onChange={handleResponseChange}
                      name="response"
                      rows={5} cols={33}
                      className="border-2 border-black rounded-lg p-5 md:p-5 w-full h-full"
                      placeholder="Write your answer here..."
                    >
                
                    </textarea>
                    </div>
                    <div className="col-start-1 md:col-start-5 col-span-6 md:col-span-2 border-2 border-black rounded-lg flex flex-col justify-end">
                      <button  onClick={submitResponse}>
                    <label htmlFor="response" className="cursor-pointer">
                      <div className="m-5">
                      <ArrowCommand 
                        borderGray={false}
                        command="SUBMIT"
                      />   
                      </div>                   
                    </label>
                    </button>
                    </div>


<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras posuere, tortor et molestie consectetur, mi turpis maximus urna, vel ullamcorper purus metus et massa. In lacinia tellus eget metus egestas elementum vitae eget ante. Mauris vitae purus enim. Aenean suscipit sit amet ante nec feugiat. Morbi at nulla vel sem finibus vestibulum. Maecenas vitae aliquet felis, eu feugiat orci. Aliquam erat volutpat. Aenean convallis consequat risus a pretium. Donec pellentesque pharetra magna, eu blandit tellus. Quisque at lacinia purus.

Quisque ornare, ex id dictum tempus, dui mauris consequat enim, ut molestie augue nisi eget orci. Cras rhoncus quam sed felis euismod hendrerit. Sed rhoncus pellentesque velit ac bibendum. Cras laoreet varius sollicitudin. Morbi sagittis lorem at congue semper. Cras sagittis pulvinar posuere. Duis non nibh nulla. Suspendisse ut sem eros. Ut lorem ligula, mattis sed lectus non, pulvinar porttitor velit. Proin fringilla nec erat vitae consequat. Nullam elementum, felis a dignissim egestas, lectus ex sodales nibh, non consectetur leo sem eu sem. Proin quis lacus at tortor maximus tincidunt ut sit amet quam. Suspendisse cursus tortor nec enim mollis fermentum eget sit amet tortor.

Sed rutrum lobortis tortor, vel ullamcorper dui vulputate vel. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque pellentesque vestibulum faucibus. Vestibulum ornare porttitor nunc id mattis. Vivamus ut eleifend nunc. Ut mattis faucibus nisl a faucibus. Curabitur nunc sapien, interdum non diam et, aliquam luctus mauris. Duis et vehicula dolor. Cras id orci vitae nulla ultricies pharetra.

Etiam ut vehicula diam, et rhoncus lorem. Integer in dignissim urna. Sed non ipsum aliquam libero aliquam cursus in scelerisque lectus. Morbi sit amet pretium nunc. Nam placerat erat a interdum dignissim. Duis pharetra lorem sapien, at pulvinar eros mollis nec. Quisque interdum lorem augue, et porttitor neque euismod ut. Maecenas leo leo, scelerisque vitae ultrices eget, semper sit amet dolor. Donec hendrerit aliquet lorem. Vivamus sollicitudin nisi sit amet ligula aliquet gravida. Sed eu quam lacus. Aenean ornare odio ac ligula aliquam gravida. Mauris sed libero sit amet lacus varius congue. Fusce pharetra tempor mi quis rutrum. Donec tortor velit, ornare a enim quis, cursus semper velit.</p>


<CombinedAnimation2></CombinedAnimation2>

<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras posuere, tortor et molestie consectetur, mi turpis maximus urna, vel ullamcorper purus metus et massa. In lacinia tellus eget metus egestas elementum vitae eget ante. Mauris vitae purus enim. Aenean suscipit sit amet ante nec feugiat. Morbi at nulla vel sem finibus vestibulum. Maecenas vitae aliquet felis, eu feugiat orci. Aliquam erat volutpat. Aenean convallis consequat risus a pretium. Donec pellentesque pharetra magna, eu blandit tellus. Quisque at lacinia purus.

Quisque ornare, ex id dictum tempus, dui mauris consequat enim, ut molestie augue nisi eget orci. Cras rhoncus quam sed felis euismod hendrerit. Sed rhoncus pellentesque velit ac bibendum. Cras laoreet varius sollicitudin. Morbi sagittis lorem at congue semper. Cras sagittis pulvinar posuere. Duis non nibh nulla. Suspendisse ut sem eros. Ut lorem ligula, mattis sed lectus non, pulvinar porttitor velit. Proin fringilla nec erat vitae consequat. Nullam elementum, felis a dignissim egestas, lectus ex sodales nibh, non consectetur leo sem eu sem. Proin quis lacus at tortor maximus tincidunt ut sit amet quam. Suspendisse cursus tortor nec enim mollis fermentum eget sit amet tortor.

Sed rutrum lobortis tortor, vel ullamcorper dui vulputate vel. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque pellentesque vestibulum faucibus. Vestibulum ornare porttitor nunc id mattis. Vivamus ut eleifend nunc. Ut mattis faucibus nisl a faucibus. Curabitur nunc sapien, interdum non diam et, aliquam luctus mauris. Duis et vehicula dolor. Cras id orci vitae nulla ultricies pharetra.

Etiam ut vehicula diam, et rhoncus lorem. Integer in dignissim urna. Sed non ipsum aliquam libero aliquam cursus in scelerisque lectus. Morbi sit amet pretium nunc. Nam placerat erat a interdum dignissim. Duis pharetra lorem sapien, at pulvinar eros mollis nec. Quisque interdum lorem augue, et porttitor neque euismod ut. Maecenas leo leo, scelerisque vitae ultrices eget, semper sit amet dolor. Donec hendrerit aliquet lorem. Vivamus sollicitudin nisi sit amet ligula aliquet gravida. Sed eu quam lacus. Aenean ornare odio ac ligula aliquam gravida. Mauris sed libero sit amet lacus varius congue. Fusce pharetra tempor mi quis rutrum. Donec tortor velit, ornare a enim quis, cursus semper velit.</p>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras posuere, tortor et molestie consectetur, mi turpis maximus urna, vel ullamcorper purus metus et massa. In lacinia tellus eget metus egestas elementum vitae eget ante. Mauris vitae purus enim. Aenean suscipit sit amet ante nec feugiat. Morbi at nulla vel sem finibus vestibulum. Maecenas vitae aliquet felis, eu feugiat orci. Aliquam erat volutpat. Aenean convallis consequat risus a pretium. Donec pellentesque pharetra magna, eu blandit tellus. Quisque at lacinia purus.

Quisque ornare, ex id dictum tempus, dui mauris consequat enim, ut molestie augue nisi eget orci. Cras rhoncus quam sed felis euismod hendrerit. Sed rhoncus pellentesque velit ac bibendum. Cras laoreet varius sollicitudin. Morbi sagittis lorem at congue semper. Cras sagittis pulvinar posuere. Duis non nibh nulla. Suspendisse ut sem eros. Ut lorem ligula, mattis sed lectus non, pulvinar porttitor velit. Proin fringilla nec erat vitae consequat. Nullam elementum, felis a dignissim egestas, lectus ex sodales nibh, non consectetur leo sem eu sem. Proin quis lacus at tortor maximus tincidunt ut sit amet quam. Suspendisse cursus tortor nec enim mollis fermentum eget sit amet tortor.

Sed rutrum lobortis tortor, vel ullamcorper dui vulputate vel. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque pellentesque vestibulum faucibus. Vestibulum ornare porttitor nunc id mattis. Vivamus ut eleifend nunc. Ut mattis faucibus nisl a faucibus. Curabitur nunc sapien, interdum non diam et, aliquam luctus mauris. Duis et vehicula dolor. Cras id orci vitae nulla ultricies pharetra.

Etiam ut vehicula diam, et rhoncus lorem. Integer in dignissim urna. Sed non ipsum aliquam libero aliquam cursus in scelerisque lectus. Morbi sit amet pretium nunc. Nam placerat erat a interdum dignissim. Duis pharetra lorem sapien, at pulvinar eros mollis nec. Quisque interdum lorem augue, et porttitor neque euismod ut. Maecenas leo leo, scelerisque vitae ultrices eget, semper sit amet dolor. Donec hendrerit aliquet lorem. Vivamus sollicitudin nisi sit amet ligula aliquet gravida. Sed eu quam lacus. Aenean ornare odio ac ligula aliquam gravida. Mauris sed libero sit amet lacus varius congue. Fusce pharetra tempor mi quis rutrum. Donec tortor velit, ornare a enim quis, cursus semper velit.</p>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras posuere, tortor et molestie consectetur, mi turpis maximus urna, vel ullamcorper purus metus et massa. In lacinia tellus eget metus egestas elementum vitae eget ante. Mauris vitae purus enim. Aenean suscipit sit amet ante nec feugiat. Morbi at nulla vel sem finibus vestibulum. Maecenas vitae aliquet felis, eu feugiat orci. Aliquam erat volutpat. Aenean convallis consequat risus a pretium. Donec pellentesque pharetra magna, eu blandit tellus. Quisque at lacinia purus.

Quisque ornare, ex id dictum tempus, dui mauris consequat enim, ut molestie augue nisi eget orci. Cras rhoncus quam sed felis euismod hendrerit. Sed rhoncus pellentesque velit ac bibendum. Cras laoreet varius sollicitudin. Morbi sagittis lorem at congue semper. Cras sagittis pulvinar posuere. Duis non nibh nulla. Suspendisse ut sem eros. Ut lorem ligula, mattis sed lectus non, pulvinar porttitor velit. Proin fringilla nec erat vitae consequat. Nullam elementum, felis a dignissim egestas, lectus ex sodales nibh, non consectetur leo sem eu sem. Proin quis lacus at tortor maximus tincidunt ut sit amet quam. Suspendisse cursus tortor nec enim mollis fermentum eget sit amet tortor.

Sed rutrum lobortis tortor, vel ullamcorper dui vulputate vel. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque pellentesque vestibulum faucibus. Vestibulum ornare porttitor nunc id mattis. Vivamus ut eleifend nunc. Ut mattis faucibus nisl a faucibus. Curabitur nunc sapien, interdum non diam et, aliquam luctus mauris. Duis et vehicula dolor. Cras id orci vitae nulla ultricies pharetra.

Etiam ut vehicula diam, et rhoncus lorem. Integer in dignissim urna. Sed non ipsum aliquam libero aliquam cursus in scelerisque lectus. Morbi sit amet pretium nunc. Nam placerat erat a interdum dignissim. Duis pharetra lorem sapien, at pulvinar eros mollis nec. Quisque interdum lorem augue, et porttitor neque euismod ut. Maecenas leo leo, scelerisque vitae ultrices eget, semper sit amet dolor. Donec hendrerit aliquet lorem. Vivamus sollicitudin nisi sit amet ligula aliquet gravida. Sed eu quam lacus. Aenean ornare odio ac ligula aliquam gravida. Mauris sed libero sit amet lacus varius congue. Fusce pharetra tempor mi quis rutrum. Donec tortor velit, ornare a enim quis, cursus semper velit.</p>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras posuere, tortor et molestie consectetur, mi turpis maximus urna, vel ullamcorper purus metus et massa. In lacinia tellus eget metus egestas elementum vitae eget ante. Mauris vitae purus enim. Aenean suscipit sit amet ante nec feugiat. Morbi at nulla vel sem finibus vestibulum. Maecenas vitae aliquet felis, eu feugiat orci. Aliquam erat volutpat. Aenean convallis consequat risus a pretium. Donec pellentesque pharetra magna, eu blandit tellus. Quisque at lacinia purus.

Quisque ornare, ex id dictum tempus, dui mauris consequat enim, ut molestie augue nisi eget orci. Cras rhoncus quam sed felis euismod hendrerit. Sed rhoncus pellentesque velit ac bibendum. Cras laoreet varius sollicitudin. Morbi sagittis lorem at congue semper. Cras sagittis pulvinar posuere. Duis non nibh nulla. Suspendisse ut sem eros. Ut lorem ligula, mattis sed lectus non, pulvinar porttitor velit. Proin fringilla nec erat vitae consequat. Nullam elementum, felis a dignissim egestas, lectus ex sodales nibh, non consectetur leo sem eu sem. Proin quis lacus at tortor maximus tincidunt ut sit amet quam. Suspendisse cursus tortor nec enim mollis fermentum eget sit amet tortor.

Sed rutrum lobortis tortor, vel ullamcorper dui vulputate vel. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque pellentesque vestibulum faucibus. Vestibulum ornare porttitor nunc id mattis. Vivamus ut eleifend nunc. Ut mattis faucibus nisl a faucibus. Curabitur nunc sapien, interdum non diam et, aliquam luctus mauris. Duis et vehicula dolor. Cras id orci vitae nulla ultricies pharetra.

Etiam ut vehicula diam, et rhoncus lorem. Integer in dignissim urna. Sed non ipsum aliquam libero aliquam cursus in scelerisque lectus. Morbi sit amet pretium nunc. Nam placerat erat a interdum dignissim. Duis pharetra lorem sapien, at pulvinar eros mollis nec. Quisque interdum lorem augue, et porttitor neque euismod ut. Maecenas leo leo, scelerisque vitae ultrices eget, semper sit amet dolor. Donec hendrerit aliquet lorem. Vivamus sollicitudin nisi sit amet ligula aliquet gravida. Sed eu quam lacus. Aenean ornare odio ac ligula aliquam gravida. Mauris sed libero sit amet lacus varius congue. Fusce pharetra tempor mi quis rutrum. Donec tortor velit, ornare a enim quis, cursus semper velit.</p>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras posuere, tortor et molestie consectetur, mi turpis maximus urna, vel ullamcorper purus metus et massa. In lacinia tellus eget metus egestas elementum vitae eget ante. Mauris vitae purus enim. Aenean suscipit sit amet ante nec feugiat. Morbi at nulla vel sem finibus vestibulum. Maecenas vitae aliquet felis, eu feugiat orci. Aliquam erat volutpat. Aenean convallis consequat risus a pretium. Donec pellentesque pharetra magna, eu blandit tellus. Quisque at lacinia purus.

Quisque ornare, ex id dictum tempus, dui mauris consequat enim, ut molestie augue nisi eget orci. Cras rhoncus quam sed felis euismod hendrerit. Sed rhoncus pellentesque velit ac bibendum. Cras laoreet varius sollicitudin. Morbi sagittis lorem at congue semper. Cras sagittis pulvinar posuere. Duis non nibh nulla. Suspendisse ut sem eros. Ut lorem ligula, mattis sed lectus non, pulvinar porttitor velit. Proin fringilla nec erat vitae consequat. Nullam elementum, felis a dignissim egestas, lectus ex sodales nibh, non consectetur leo sem eu sem. Proin quis lacus at tortor maximus tincidunt ut sit amet quam. Suspendisse cursus tortor nec enim mollis fermentum eget sit amet tortor.

Sed rutrum lobortis tortor, vel ullamcorper dui vulputate vel. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque pellentesque vestibulum faucibus. Vestibulum ornare porttitor nunc id mattis. Vivamus ut eleifend nunc. Ut mattis faucibus nisl a faucibus. Curabitur nunc sapien, interdum non diam et, aliquam luctus mauris. Duis et vehicula dolor. Cras id orci vitae nulla ultricies pharetra.

Etiam ut vehicula diam, et rhoncus lorem. Integer in dignissim urna. Sed non ipsum aliquam libero aliquam cursus in scelerisque lectus. Morbi sit amet pretium nunc. Nam placerat erat a interdum dignissim. Duis pharetra lorem sapien, at pulvinar eros mollis nec. Quisque interdum lorem augue, et porttitor neque euismod ut. Maecenas leo leo, scelerisque vitae ultrices eget, semper sit amet dolor. Donec hendrerit aliquet lorem. Vivamus sollicitudin nisi sit amet ligula aliquet gravida. Sed eu quam lacus. Aenean ornare odio ac ligula aliquam gravida. Mauris sed libero sit amet lacus varius congue. Fusce pharetra tempor mi quis rutrum. Donec tortor velit, ornare a enim quis, cursus semper velit.</p>

*/