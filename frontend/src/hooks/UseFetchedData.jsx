import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function UseFetchedData(url, id) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.post(url, id);
        if (!res) {
          return console.log(res.message);
        }
        setData(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError(err.message);
      }
    };
    fetchData();
  }, [url]);
  return { data, loading, error };
}

export default UseFetchedData;
