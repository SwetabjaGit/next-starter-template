import React from 'react';
import ReactGA from 'react-ga';


const ScreamItem = ({ styles, userName, body, image }) => {

  const handleClick = () => {
    console.log('Scream Clicked');
    ReactGA.event({
      category: 'Item',
      action: 'Item Click',
      transport: 'beacon'
    });
  };

  return (
    <a 
      href={image} 
      className={styles.card} 
      onClick={handleClick} 
    >
      <h3>{userName} &rarr;</h3>
      <img alt="avatar" src={image} />
      <p>{body}</p>
    </a>
  )
};

export default ScreamItem;