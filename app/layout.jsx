import './globals.css';
import Header from '@/components/Header/page';

export const metadata = {
  title: 'Onkar Patel — Web Developer',
  description: 'Personal portfolio of Onkar Patel, Web Developer & Designer',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className='font-sans antialiased bg-background text-foreground'>
        <Header />
        {children}
      </body>
    </html>
  );
}

