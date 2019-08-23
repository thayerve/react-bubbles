import React, { useState, useEffect } from "react";
import axiosWithAuth from '../utils/axiosWithAuth';

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

// GET response data format (array of objects like this):
// {color: "aliceblue",
//   code: {hex: "#f0f8ff"},
//   id: 1}

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(() => {
    axiosWithAuth()
    .get('http://localhost:5000/api/colors')
    .then(res => {
        // console.log('colors get response: ', res.data);
        setColorList(res.data);
    })
    .catch(err => console.log("Uh oh! Error fetching colors: ", err.response.status, err.response.data.error));

}, [colorList]);

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
