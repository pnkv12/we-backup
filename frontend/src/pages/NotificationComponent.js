import { useEffect, useState } from "react";
import Notifications from "react-notifications-menu";
import EmailIcon from "@mui/icons-material/Email";
import SubmissionDetails from "../components/Submission/SubmissionDetail";
import axios from "axios";
import useAxios from "../services/useAxios";

const DEFAULT_NOTIFICATION = {
  image:
    "https://cutshort-data.s3.amazonaws.com/cloudfront/public/companies/5809d1d8af3059ed5b346ed1/logo-1615367026425-logo-v6.png",
  message: "Notification one.",
  detailPage: "/events",
  receivedTime: "12h ago",
};

const baseURL = "https://be-enterprise.herokuapp.com/v1.0";

const Notification = () => {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");

  const { response, loading, error } = useAxios({
    url: `${baseURL}/notify/624c2cc3df719afdc2f69581`,
    method: "get",
  });

  useEffect(() => {
    if (response != null) {
      response.forEach((notify) => {
        data.push(notify);
        console.log(notify);
      });

      setData([...data]);
    }
  }, [response]);

  const onClick = () => {
    if (message.length > 0) {
      setData([
        ...data,
        {
          ...DEFAULT_NOTIFICATION,
          message,
        },
      ]);
      setMessage("");
      alert("notification added");
    }
  };
  return (
    <Notifications
      data={data}
      header={{
        title: "Notifications",
        option: { text: "View All", onClick: () => console.log("Clicked") },
      }}
      markAsRead={(data) => {
        console.log(data);
      }}
    />
  );
};

export default Notification;
