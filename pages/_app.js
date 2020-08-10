import { Router } from 'next/router';
import { useEffect } from 'react';
import ReactGA from 'react-ga';
import ttiPolyfill from 'tti-polyfill';
import '../styles/globals.css';


const MyApp = ({ Component, pageProps }) => {
  ReactGA.initialize('UA-174530101-6');

  useEffect(() => {
    console.log('%c AppComponent Called', 'color: blue');

    // Track Page Views
    Router.events.on('routeChangeStart', (pathname) => {
      ReactGA.set({ page: pathname });
      ReactGA.pageview(pathname);
      console.log(`%c ${pathname}`, 'color: green');
    });

    // Time to Interactive
    ttiPolyfill.getFirstConsistentlyInteractive().then((tti) => {
      ReactGA.timing({
        category: "Load Performance",
        variable: "Time to Interactive",
        value: tti
      })
    });

    // Navigation Delay
    const navigationCallback = (list) => {
      list.getEntries().forEach(entry => {
        ReactGA.timing({
          category: "Load Performance",
          variable: "Some Metric",
          value: "Value of Metric"
        })
      })
    };

    // Tracking Load Performance
    const serverLatency = (list) => {
      list.getEntries().forEach(entry => {
        ReactGA.timing({
          category: "Load Performance",
          variable: "Server Latency",
          value: entry.responseStart - entry.requestStart
        })
      })
    };

    // Tracking Rendering Performance
    const renderPerformance = (list) => {
      list.getEntries().forEach(entry => {
        if(entry.name.includes('MyApp')) {
          ReactGA.timing({
            category: "App Render Performance",
            variable: entry.name,
            value: entry.duration
          })
        }
      })
    };

    // Tracking Paint Performance
    const paintPerformance = (list) => {
      list.getEntries().forEach(entry => {
        ReactGA.timing({
          category: "Paint",
          variable: entry.name,
          value: entry.startTime
        })
      })
    };

    const navigationObserver = new PerformanceObserver(navigationCallback);
    const serverLatencyObserver = new PerformanceObserver(serverLatency);
    const renderPerformanceObserver = new PerformanceObserver(renderPerformance);
    const paintPerformanceObserver = new PerformanceObserver(paintPerformance);
    navigationObserver.observe({ entryTypes: ['navigation'] });
    navigationObserver.observe({ entryTypes: ['mark', 'measure'] });
    serverLatencyObserver.observe({ entryTypes: ['navigation'] });
    renderPerformanceObserver.observe({ entryTypes: ['navigation'] });
    paintPerformanceObserver.observe({ entryTypes: ['paint'] });

  }, []);

  return (
    <Component {...pageProps} />
  );
};

export default MyApp
