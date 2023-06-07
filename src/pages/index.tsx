import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { PAGE_ROUTES } from '@/constants/routes';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push(PAGE_ROUTES.employees());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
}
