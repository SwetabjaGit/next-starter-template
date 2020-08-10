import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import ReactGA from 'react-ga';
import { useEffect, useRef } from 'react';
import styles from '../styles/Home.module.css';
import ScreamItem from '../components/ScreamItem';
import { useRouter } from 'next/router';


const Home = (props) => {
  const { screams, error } = props;
  const router = useRouter();
  const intersectTarget = useRef(null);

  useEffect(() => {
    console.log(`%c ${router.pathname}`, 'color: orange');
    const opts = {
      root: null,
      rootMargin: '0px',
      threshold: 0
    }
    const scrollTracking = (list) => {
      list.forEach(entry => {
        if(entry.isIntersecting) {
          ReactGA.event({
            category: 'Scroll',
            action: 'Scrolled to heading 2',
            value: entry.intersectionRatio,
            transport: "beacon"
          })
        }
      })
    };
    const observerScroll = new IntersectionObserver(scrollTracking, opts);
    observerScroll.observe(intersectTarget.current);
  }, []);

  useEffect(() => {
    if(props.screams) {
      ReactGA.event({
        category: 'Form',
        action: 'Screams Loading',
        transport: 'beacon'
      });
    }
  }, [props]);


  
  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
        <script src="https://use.fontawesome.com/releases/v5.13.0/js/all.js" crossOrigin="anonymous"></script>
        <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css" />
        <link href="https://fonts.googleapis.com/css?family=Droid+Serif:400,700,400italic,700italic" rel="stylesheet" type="text/css" />
        <link href="https://fonts.googleapis.com/css?family=Roboto+Slab:400,100,300,700" rel="stylesheet" type="text/css" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Read <Link href="/posts/post1"><a>this page!</a></Link>
        </h1>
        <div className="pagelinks">
          <p className={styles.description}>
            Get started by editing{' '}
            <code className={styles.code}>pages/index.js</code>
          </p>
          <p className={styles.link}>Jump to <Link href="/posts/post1">
            <a><code className={styles.code}>First Page</code></a></Link>
          </p>
          <p className={styles.link}>Jump to <Link href="/posts/post2">
            <a><code className={styles.code}>Second Page</code></a></Link>
          </p>
          <p className={styles.link}>Jump to <Link href="/posts/post3">
            <a><code className={styles.code}>Third Page</code></a></Link>
          </p>
        </div>
        <div className={styles.grid} ref={intersectTarget} >
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
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.bundle.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.4.1/jquery.easing.min.js"></script>
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
  ReactGA.event({
    category: 'Form',
    action: 'Form Submit',
    transport: 'beacon'
  });
  return response;
};


export default Home;