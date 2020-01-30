import React from 'react';
import axios from 'axios';
const Test = () => {
  const axiosTest = () => {
    axios
      .get(
        'http://70.12.247.75:8080/postmap/selectAll?latitude=37.5&longitude=127.03',
      )
      .then(res => {
        console.log(res.data.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  return <div onClick={axiosTest}> 뭐지.. ? </div>;
};
export default Test;
