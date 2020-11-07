import React, { useState } from "react";
import axios from "axios";

const ApiTest = () => {
  const [data, setData] = useState([]);
  const [finalData, setFinalData] = useState([]);

  const refreshList = () => {
    // e.preventDefault();
    let initData = [];
    axios
      .get("http://localhost:8000/api/nodes/")
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  return <button onClick={refreshList}>{console.log(finalData)}</button>;
};

export default ApiTest;
