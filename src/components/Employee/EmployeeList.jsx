import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API_ENDPOINTS from "../../configs/apiConfig"
import useCrudApi from "../../hooks/useCrudApi"

const EmployeeList = () => {
  const apiEndpoint = API_ENDPOINTS.EMPLOYEES
  const {  fetchData } = useCrudApi(apiEndpoint)
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmpData();
  }, []);

  const fetchEmpData = async () => {

    try {
      const response = await fetchData('')
      if (response && !response.error) {
        setEmployees(response.employees)
      } else if (response && response.error) {
        console.log("API Error:", response.error)
      } else {
        console.log("Unexpected response:", response)
      }
    } catch (error) {
      console.log("Error adding task:", error)
    }
  };

  const handleSort = async (field) => {
    await fetchData(`?sort=${field}`);
  };

  const handleFilter = async (value) => {
    await fetchData(`?filter=${value}`);
  };


  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card">
            <div className="card-body">
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Filter by Name or Designation"
                  onChange={(e) => handleFilter(e.target.value)}
                />
              </div>

              <table className="table">
                <thead>
                  <tr>
                    <th onClick={() => handleSort('name')}>Name</th>
                    <th onClick={() => handleSort('email')}>Email</th>
                    <th onClick={() => handleSort('dob')}>Date of Birth</th>
                    <th onClick={() => handleSort('designation')}>Designation</th>
                    <th onClick={() => handleSort('education')}>Education</th>
                    <th onClick={() => handleSort('address')}>Address</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.emp_id}>
                      <td>{employee.name}</td>
                      <td>{employee.email}</td>
                      <td>{employee.dob}</td>
                      <td>{employee.designation}</td>
                      <td>{employee.education}</td>
                      <td>{employee.address}</td>
                      <td>
                        <Link  className="btn btn-primary me-1" to={`/edit-employee/${employee._id}`}>Edit</Link>
                        <button  className="btn btn-danger" >Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;