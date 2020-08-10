import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styles from '../styles/Home.module.css';


const Destination = () => {
  const router = useRouter();

  useEffect(() => {
    console.log(`%c ${router.pathname}`, 'color: orange');
  }, []);

  return (
    <div className="container">
      <Head>
        <title>Destination</title>
      </Head>
      <h1>This is the Final Destination</h1>
      <p className={styles.link}>
        <Link href="/posts/post2" passHref ><a>Back</a></Link>
      </p>
      <p className={styles.link}>
        <Link href="/"><a>Back to Home</a></Link>
      </p>
    </div>
  );
};

export default Destination;