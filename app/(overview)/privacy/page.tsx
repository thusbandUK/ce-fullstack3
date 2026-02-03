import HeaderDivs from "@/app/ui/dashboard/header"
import Section from "@/app/ui/dashboard/section"
import SectionBorderless from "@/app/ui/dashboard/sectionBorderless";
import DOMPurify from "isomorphic-dompurify";

const privacyContent = {
  pageTitle: `Chemistry Elephant – Privacy Notice`,
  intro: `
    <p>
      We want you to feel confident using Chemistry Elephant. This page explains what personal information we collect about you,
      why we collect it, how long we keep it, and what your rights are.
    </p>
    <p>
      We’ve written it in clear language so you can understand exactly what’s going on with your data.
    </p>
  `,
  sections: [
    `
    <h2>1. Who we are</h2>
    <br/>
    <p>
      Chemistry Elephant is an educational website. When you use our site or create an account, we collect some information about
      you so the service can work properly.
    </p>
    <br/>
    <p>If you ever want to contact us about your data, you can email:</p>
    <p><strong>Email:</strong> <a href="mailto:hello@chemistryelephant.co.uk">hello@chemistryelephant.co.uk</a></p>
  `,
  `
  <h2>2. What information we collect and why</h2>

  <h3 class="text-md">When you create or use an account</h3>
  <br/>
  <p>We collect things like:</p>
  <br/>
  <ul class="list-disc list-inside">
    <li class="ms-3">Your name</li>
    <li class="ms-3">Your email address</li>
    <li class="ms-3">Your username</li>
    <li class="ms-3">Your profile picture link (if you sign in with Google)</li>
    <li class="ms-3">Login information (for example, when you sign in)</li>
    <li class="ms-3">Your account settings</li>
  </ul>
  <br/>
  <p><strong>Why we collect this:</strong> So you can have an account, log in securely, and use the website. We also use this information to keep the site safe and prevent misuse.</p>
  <br/>
  <h3>When you contact us</h3>
  <br/>
  <p>If you email us with a question or problem, we collect:</p>
  <br/>
  <ul class="list-disc list-inside">
    <li class="ms-3">Your name</li>
    <li class="ms-3">Your contact details</li>
    <li class="ms-3">Anything you write in your message</li>
  </ul>
  <br/>
  <p><strong>Why we collect this:</strong> So we can reply to you and help you with your query.</p>
  <br/>
  <h3>For updates or marketing (only if you choose this)</h3>
  <br/>
  <p>We may collect:</p>
  <br/>
  <ul class="list-disc list-inside">
    <li class="ms-3">Your name</li>
    <li class="ms-3">Your email address</li>
    <li class="ms-3">Your marketing preferences</li>
    <li class="ms-3">Your IP address</li>
  </ul>
  <br/>
  <p><strong>Why we collect this:</strong> So we can send you updates you’ve asked for. You can change your mind at any time.</p>
`,
`
  <h2>3. Signing in with Google</h2>
  <br/>
  <p>If you choose to sign in using Google:</p>
  <br/>
  <ul class="list-disc list-inside">
    <li class="ms-3">Google checks your identity and shares only the basic information needed to create your account (like your name and email).</li>
    <li class="ms-3">Google uses your information under its own privacy policy.</li>
    <li class="ms-3">We only use the information Google sends us to run your Chemistry Elephant account.</li>
  </ul>
  <br/>
  <p>Google and Chemistry Elephant are not joint controllers. We each control our own part of the process.</p>
  <br/>
`,
`
  <h2>4. Our lawful bases (the legal reasons we can use your data)</h2>
  <br/>
  <p>We only use your information when we have a valid reason under UK data protection law. These reasons include:</p>
  <br/>
  <h3>Consent</h3>
  <br/>
  <p>You’ve given us permission. You can withdraw your consent at any time.</p>
  <br/>
  <h3>Contract</h3>
  <br/>
  <p>We need your information to create or run your account.</p>
  <br/>
  <h3>Legitimate interests</h3>
  <br/>
  <p>We use your data to keep the website secure and working properly.</p>
  <br/>
`,
`
  <h2>5. Your data rights</h2>
  <br/>
  <p>You have rights over your personal information. These include:</p>
  <br/>
  <ul class="list-disc list-inside">
    <li class="ms-3"><strong>Access</strong> – You can ask for a copy of your personal data.</li>
    <li class="ms-3"><strong>Correction</strong> – You can ask us to fix anything that’s wrong.</li>
    <li class="ms-3"><strong>Deletion</strong> – You can ask us to delete your data.</li>
    <li class="ms-3"><strong>Restriction</strong> – You can ask us to limit how we use your data.</li>
    <li class="ms-3"><strong>Objection</strong> – You can object to how we use your data (in some cases).</li>
    <li class="ms-3"><strong>Data portability</strong> – You can ask us to send your data to you or another organisation.</li>
    <li class="ms-3"><strong>Withdraw consent</strong> – If you gave consent, you can change your mind.</li>
  </ul>
  <br/>
  <p>If you want to use any of these rights, email us at <a href="mailto:hello@chemistryelephant.co.uk">hello@chemistryelephant.co.uk</a>.</p>
  <br/>
  <p>We’ll reply within one month.</p>
  <br/>
`,
`
  <h2>6. Where we get your information from</h2>
  <br/>
  <ul class="list-disc list-inside">
    <li class="ms-3">Directly from you</li>
    <li class="ms-3">From Google, if you choose to sign in using your Google account</li>
  </ul>
  <br/>
`,
`
  <h2>7. Who we share your information with</h2>
  <br/>
  <p>We only share your data with trusted companies that help us run the website, such as:</p>
  <br/>
  <ul class="list-disc list-inside">
    <li class="ms-3"><strong>Neon</strong> (our storage provider, based in Germany)</li>
  </ul>
  <br/>
  <p>When we send data outside the UK, we make sure it’s protected using legal safeguards.</p>
  <br/>
`,
`
  <h2 id="retention-schedule">8. How long we keep your information (Retention)</h2>
  <br/>
  <h3>Account information</h3>
  <br/>
  <p>We keep your account information for as long as your account is open.</p>
  <p>If you close your account:</p>
  <br/>
  <ul class="list-disc list-inside">
    <li class="ms-3">We delete your data straight away from our main systems.</li>
    <li class="ms-3">Backups automatically delete your data within six hours.</li>
  </ul>
  <br/>
  <h3>System logs</h3>
  <br/>
  <p>These are technical records that help us keep the site secure.</p>
  <p>We keep them for 30 days, then delete or anonymise them.</p>
  <br/>
  <h3>Backups</h3>
  <br/>
  <p>Backups are automatically overwritten every six hours.</p>
`,
`
  <h2>9. How to complain</h2>
  <br/>
  <p>If you’re unhappy with how we use your data, you can:</p>
  <br/>
  <ol class="list-decimal list-inside">
    <li class="ms-3">Email us at <a href="mailto:hello@chemistryelephant.co.uk">hello@chemistryelephant.co.uk</a></li>
    <li class="ms-3">If you’re still not satisfied, you can contact the ICO (the UK’s data protection regulator):</li>
  </ol>
  <br/>
  <address>
    <strong>Information Commissioner’s Office</strong><br/>
    Wycliffe House<br/>
    Water Lane<br/>
    Wilmslow<br/>
    Cheshire<br/>
    SK9 5AF
  </address>
  <br/>
  <p><strong>Helpline:</strong> 0303 123 1113</p>
  <p><strong>Website:</strong> <a href="https://www.ico.org.uk/make-a-complaint" target="_blank" rel="noopener noreferrer">https://www.ico.org.uk/make-a-complaint</a></p>
`,
`
  <h2>Last updated</h2>
  <p>3 February 2026</p>
`
]  
}

export default function Privacy(){

    return (
        <div>
          <HeaderDivs h1Content={privacyContent.pageTitle}></HeaderDivs>
          <Section
            keyNumber={1}
            topMargin={false}
          >
            <div 
              dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(privacyContent.intro)}}
            ></div>          
          </Section>
          {
            privacyContent.sections.map((x) => (
              <div key={privacyContent.sections.indexOf(x)}>
                <SectionBorderless>
                  <div 
                    dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(x)}}
                  >
                  </div>
                </SectionBorderless>
              </div>
            ))
          }
        </div>
    )
}