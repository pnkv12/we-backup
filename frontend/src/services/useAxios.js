import { useState, useRef, useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL = "https://be-enterprise.herokuapp.com/v1.0";

// useFetch with headers, url, method and body.
// url is the part after the baseURL
const useAxios = ({ url, method, body = null, headers = null }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      let res = await axios[method](url, JSON.parse(headers), JSON.parse(body));
      const data = res.data;
      setResponse(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [method, url, body, headers]);

  return { response, error, loading };
};

export default useAxios;
