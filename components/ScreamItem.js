import React from 'react';


const ScreamItem = ({ styles, userName, body, image }) => {
  return (
    <a href={image} className={styles.card}>
      <h3>{userName} &rarr;</h3>
      <img alt="avatar" src={image} />
      <p>{body}</p>
    </a>
  )
};

export default ScreamItem;