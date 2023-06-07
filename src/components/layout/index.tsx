import Head from 'next/head';
import { Inter } from 'next/font/google';
import Header from './Header';

const inter = Inter({ subsets: ['latin'] });

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Employees Health Benefit App</title>
        <meta name="description" content="Employees health benefit app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={inter.className} style={{ marginBottom: '5rem' }}>
        {children}
      </main>
    </>
  );
};

export default Layout;
