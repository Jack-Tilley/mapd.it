import React, { useState } from "react";
import axios from "axios";

const ApiTest = () => {
  const [data, setData] = useState();

  const refreshList = () => {
    axios
      .get("http://localhost:8000/api/nodes/")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  return <button onClick={refreshList}>{console.log(data)}</button>;
};

export default ApiTest;
