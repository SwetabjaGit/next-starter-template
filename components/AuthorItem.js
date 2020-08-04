import React from 'react';


const AuthorItem = ({ styles, firstName, lastName }) => {
  return (
    <a href="#" className={styles.card}>
      <h3>{firstName} &rarr;</h3>
      <p>{lastName}</p>
    </a>
  );
}
 
export default AuthorItem;