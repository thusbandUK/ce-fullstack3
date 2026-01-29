import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: {
    template: '%s | Chemistry Elephant',
    default: 'Flashcards | Chemistry Elephant'
  }
}
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div >
      <div >{children}</div>
    </div>
  );
}