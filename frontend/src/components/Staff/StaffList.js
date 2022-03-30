import { Link } from "react-router-dom";

const StaffList = ({ staff }) => {
  return (
    <div className="staff-list">
      <div className="staff-preview" key={staff.id}>
        <Link to={`/employee/${staff.id}`}>
          <h2>
            {staff.firstname} {staff.lastname}
          </h2>
        </Link>
      </div>
    </div>
  );
};
//npx json-server --watch data/db.json --port 8080

export default StaffList;
