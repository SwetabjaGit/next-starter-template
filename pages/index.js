import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import { useEffect } from 'react';
import styles from '../styles/Home.module.css';
import ScreamItem from '../components/ScreamItem';


const Home = (props) => {
  const { screams, error } = props;

  useEffect(() => {
    console.log({ screams, error });
  }, [props]);

  useEffect(() => {
    const initializeAnalyticsjs = () => {
      window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};
      ga.l=+new Date;
      console.log('%c Google Analytics Working', 'color: green');
      ga('create', 'UA-174530101-6', 'auto');
      ga('send', 'pageview');
    };
    
    initializeAnalyticsjs();
  }, []);

  
  return (
    <div className={styles.container}>
      <Head>
        <script async src='https://www.google-analytics.com/analytics.js'></script>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Read <Link  href="/posts/first-post"><a>this page!</a></Link>
        </h1>
        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>
        <div className={styles.grid}>
          {screams && screams.map((scream, i) => (
            <ScreamItem
              key={i}
              styles={styles}
              userName={scream.userName}
              body={scream.body}
              image={scream.contentImage}
            />
          ))}
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
};


export const getServerSideProps = async () => {
  const screamsUrl = 'https://asia-east2-socialape-d8699.cloudfunctions.net/api/scream/allScreams';
  const authorsUrl = 'http://fakerestapi.azurewebsites.net/api/Authors';
  let response = {
    props: {}
  };
  let res;
  try {
    res = await axios.get(screamsUrl);
    console.log({ status: res.status });
    response.props.screams = res.data;
  } catch(err) {
    console.log({ err });
    response.props.error = err;
  }
  return response;
};


export default Home;