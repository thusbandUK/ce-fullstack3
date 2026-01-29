import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: {
    template: '%s | Chemistry Elephant',
    default: 'Flashcards'
  },
  description: "Ready made flashcards to familiarise you with all the content you need to commit to memory."
}
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div >
      <div>{children}</div>
    </div>
  );
}