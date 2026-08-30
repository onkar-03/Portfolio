import './globals.css';
import Header from '@/components/Header';
import MotionProvider from '@/common/MotionProvider';

export const metadata = {
  title: 'Onkar Patel — Web Developer',
  description: 'Personal portfolio of Onkar Patel, Web Developer & Designer',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      {/* Browser extensions (ColorZilla, Grammarly, etc.) inject attributes onto
          <body> before React hydrates, which reports as a hydration mismatch.
          This suppresses the warning for this element's own attributes only —
          real mismatches inside the tree are still reported. */}
      <body
        suppressHydrationWarning
        className='font-sans antialiased bg-background text-foreground'
      >
        <MotionProvider>
          <Header />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}

