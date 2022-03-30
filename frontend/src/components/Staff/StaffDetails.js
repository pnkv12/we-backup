import { useParams } from "react-router-dom";
import useFetch from "../Idea/useFetch";

const StaffDetails = () => {
  const { id } = useParams();
  const { data: staff, error, isPending } = useFetch('http://localhost:8080/staff/' + id);

  return (
    <div className="user-details">
      { isPending && <div>Loading...</div> }
      { error && <div>{ error }</div> }
      { staff && (
        <article>
          Username: <h2>{ staff.username }</h2>
          email: <h2>{ staff.email }</h2>
          role: <div>{ staff.role }</div>
        </article>
      )}
    </div>
  );
}
 
export default StaffDetails;