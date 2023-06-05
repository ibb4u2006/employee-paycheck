import Head from 'next/head';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { PAGE_ROUTES } from '@/constants/routes';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push(PAGE_ROUTES.employees);
  }, []);
  return <></>;
}
