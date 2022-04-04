import React, { useState } from "react";

// This function get the Department list and show under dropdown
function DeptDD({ list }) {
  const [department, setDepartment] = useState("Select");

  const departmentList = ["Math", "Science", "Biology", "IT", "Business"];

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(department);
  };
  const handleChange = (e) => {
    setDepartment(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Viewed by:
        <select value={department} onChange={handleChange}>
          <option key={department} value="Select" hidden>
            Select
          </option>
          {departmentList.map((department) => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </select>
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

// This function get the CategoryCreate list and show under dropdown
function CateDD({ list }) {
  const [category, setCategory] = useState("Select");

  const categoryList = ["A", "B", "C"];

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(category);
  };
  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Viewed by:
        <select value={category} onChange={handleChange}>
          <option key={category} value="Select" hidden>
            Select
          </option>
          {categoryList.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default DeptDD;
export { CateDD };
