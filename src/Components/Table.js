import React, { useState } from "react";
import "../Components/Table.css";

const Data = () => {
  const [originalEmployees, setOriginalEmployees] = useState([
    { id: 1, name: "Tom Cruise", department: "Backend", salary: 50000 },
    { id: 2, name: "James Bond", department: "Frontend", salary: 75000 },
    { id: 3, name: "Shawn Mendes", department: "Frontend", salary: 37000 },
    { id: 4, name: "Justin Bieber", department: "Backend", salary: 71000 },
    { id: 5, name: "Arijit Singh", department: "Frontend", salary: 45000 },
  ]);

  const [employees, setEmployees] = useState([...originalEmployees]);
  const [filteredEmployees, setFilteredEmployees] = useState([
    ...originalEmployees,
  ]);

  const [newEmployee, setNewEmployee] = useState({
    name: "",
    department: "",
    salary: 0,
  });

  const [editingEmployeeId, setEditingEmployeeId] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleAddEmployee = () => {
    if (newEmployee.name && newEmployee.department && newEmployee.salary) {
      const newId =
        Math.max(...originalEmployees.map((employee) => employee.id)) + 1;
      const newEmployeeData = {
        id: newId,
        name: newEmployee.name,
        department: newEmployee.department,
        salary: parseInt(newEmployee.salary),
      };

      setOriginalEmployees((prevEmployees) => [
        ...prevEmployees,
        newEmployeeData,
      ]);
      setEmployees((prevEmployees) => [...prevEmployees, newEmployeeData]);
      setFilteredEmployees((prevEmployees) => [
        ...prevEmployees,
        newEmployeeData,
      ]);

      setNewEmployee({
        name: "",
        department: "",
        salary: 0,
      });
    }
  };

  const handleEditEmployee = (id) => {
    setEditingEmployeeId(id);
    const employeeToEdit = employees.find((employee) => employee.id === id);
    if (employeeToEdit) {
      setNewEmployee({
        name: employeeToEdit.name,
        department: employeeToEdit.department,
        salary: employeeToEdit.salary,
      });
    }
  };

  const handleUpdateEmployee = () => {
    if (newEmployee.name && newEmployee.department && newEmployee.salary) {
      setOriginalEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          employee.id === editingEmployeeId
            ? {
                ...employee,
                name: newEmployee.name,
                department: newEmployee.department,
                salary: parseInt(newEmployee.salary),
              }
            : employee
        )
      );
      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          employee.id === editingEmployeeId
            ? {
                ...employee,
                name: newEmployee.name,
                department: newEmployee.department,
                salary: parseInt(newEmployee.salary),
              }
            : employee
        )
      );
      setFilteredEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          employee.id === editingEmployeeId
            ? {
                ...employee,
                name: newEmployee.name,
                department: newEmployee.department,
                salary: parseInt(newEmployee.salary),
              }
            : employee
        )
      );

      setEditingEmployeeId(null);
      setNewEmployee({
        name: "",
        department: "",
        salary: 0,
      });
    }
  };

  const handleDeleteEmployee = (id) => {
    setOriginalEmployees((prevEmployees) =>
      prevEmployees.filter((employee) => employee.id !== id)
    );
    setEmployees((prevEmployees) =>
      prevEmployees.filter((employee) => employee.id !== id)
    );
    setFilteredEmployees((prevEmployees) =>
      prevEmployees.filter((employee) => employee.id !== id)
    );
    setEditingEmployeeId(null);
  };

  const handleLowestSalary = () => {
    const sortedEmployees = [...originalEmployees].sort(
      (a, b) => a.salary - b.salary
    );
    setFilteredEmployees(sortedEmployees);
  };

  const handleHighestSalary = () => {
    const sortedEmployees = [...originalEmployees].sort(
      (a, b) => b.salary - a.salary
    );
    setFilteredEmployees(sortedEmployees);
  };

  const handleDepartmentFilter = (department) => {
    if (department === "All") {
      setFilteredEmployees([...originalEmployees]);
    } else {
      const filtered = originalEmployees.filter(
        (employee) =>
          employee.department.toLowerCase() === department.toLowerCase()
      );
      setFilteredEmployees(filtered);
    }
  };

  const handleClearFilters = () => {
    setFilteredEmployees([...originalEmployees]);
    setNewEmployee({
      name: "",
      department: "",
      salary: 0,
    });
    setEditingEmployeeId(null);
  };

  return (
    <div className="data-container">
      <h2>Data Table</h2>
      <div className="filter-buttons">
        <button onClick={handleLowestSalary}>Lowest Salary</button>
        <button onClick={handleHighestSalary}>Highest Salary</button>
        <select onChange={(e) => handleDepartmentFilter(e.target.value)}>
          <option value="All">All Departments</option>
          <option value="Backend">Backend</option>
          <option value="Frontend">Frontend</option>
        </select>
        <button className="clear-button" onClick={handleClearFilters}>
          Clear Filters
        </button>
      </div>
      <table className="data-table">
        <thead> 
            {filteredEmployees.length === 0 ? (
          <p className="no-data-message">No data to display</p>
        ) :(
          <tr className="fixed-header">
            <th className="fixed-cell">Employee Name</th>
            <th className="fixed-cell">Departments</th>
            <th className="fixed-cell">Salary</th>
            <th className="fixed-cell">Actions</th>
          </tr>)}
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>
                {employee.id === editingEmployeeId ? (
                  <input
                    type="text"
                    name="name"
                    value={newEmployee.name}
                    onChange={handleInputChange}
                  />
                ) : (
                  employee.name
                )}
              </td>
              <td>
                {employee.id === editingEmployeeId ? (
                  <textarea
                    name="department"
                    value={newEmployee.department}
                    onChange={handleInputChange}
                  />
                ) : (
                  employee.department
                )}
              </td>
              <td>
                {employee.id === editingEmployeeId ? (
                  <input
                    type="number"
                    name="salary"
                    value={newEmployee.salary}
                    onChange={handleInputChange}
                  />
                ) : (
                  `${employee.salary}`
                )}
              </td>
              <td>
                {employee.id === editingEmployeeId ? (
                  <div>
                    <button
                      className="add-button"
                      onClick={handleUpdateEmployee}
                    >
                      Save
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => setEditingEmployeeId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      className="edit-button"
                      onClick={() => handleEditEmployee(employee.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteEmployee(employee.id)}
                      disabled={editingEmployeeId !== null}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingEmployeeId === null && (
        <div className="add-employee">
          <h3>Add Employee</h3>
          <div className="input-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={newEmployee.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label>Department:</label>
            <textarea
              name="department"
              value={newEmployee.department}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label>Salary(per month):</label>
            <input
              type="number"
              name="salary"
              value={newEmployee.salary}
              onChange={handleInputChange}
            />
          </div>
          <button className="add-button" onClick={handleAddEmployee}>
            Add Employee
          </button>
        </div>
      )}
    </div>
  );
};

export default Data;
