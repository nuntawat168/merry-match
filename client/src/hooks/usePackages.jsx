import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const usePackages = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState([]);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const addDetails = async (data) => {
    try {
      setIsError(false);
      setIsLoading(true);
      await axios.post(`http://localhost:4000/packages`, data);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };
  return addDetails;
};
