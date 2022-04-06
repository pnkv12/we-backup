import React, { useEffect, useState } from "react";
import useAxios from "../../services/useAxios";
import axios from "axios";

// This function get the Department list and show under dropdown
const baseURL = "https://1d65-14-226-238-211.ap.ngrok.io/v1.0";

/////////Lọc ra tổng ideas của mỗi department (theo department_id của user)//////////

function DeptDropDown({ departmentList }) {
  const [department, setDepartment] = useState();

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
          {departmentList.map((department) => (
            <option key={department._id} value={department.name}>
              {department.name}
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
  const [category, setCategory] = useState();
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    (async function () {
      const response = await axios({
        url: `${baseURL}/categories`,
        method: "get",
      });
      setCategoryList(response.data);
    })();
  }, []);

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
          {categoryList.map((category) => (
            <option key={category._id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default DeptDropDown;
export { CateDD };
