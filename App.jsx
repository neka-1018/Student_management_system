import { useState, useEffect, useCallback } from "react";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import SearchFilter from "./components/SearchFilter";
import StudentTable from "./components/StudentTable";
import StudentForm from "./components/StudentForm";
import { getStudents, deleteStudent } from "./api";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = {};
      if (search) params.search = search;
      if (department) params.department = department;
      if (year) params.year = year;
      const data = await getStudents(params);
      setStudents(data);
    } catch (err) {
      setError(
        "Unable to connect to the server. Please make sure the Django backend is running."
      );
    } finally {
      setLoading(false);
    }
  }, [search, department, year]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleAddClick = () => {
    setEditingStudent(null);
    setShowForm(true);
  };

  const handleEditClick = (student) => {
    setEditingStudent(student);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingStudent(null);
  };

  const handleFormSuccess = (message) => {
    setShowForm(false);
    setEditingStudent(null);
    setSuccessMessage(message);
    fetchStudents();
  };

  const handleDelete = async (student) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete this student?`
    );
    if (!confirmed) return;
    try {
      await deleteStudent(student.id);
      setSuccessMessage("Student deleted successfully.");
      fetchStudents();
    } catch (err) {
      setError("Unable to delete student. Please try again.");
    }
  };

  return (
    <div className="app">
      <Header />
      <main className="container">
        {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}
        {error && <div className="alert alert-error">{error}</div>}

        <Dashboard students={students} />

        <SearchFilter
          search={search}
          setSearch={setSearch}
          department={department}
          setDepartment={setDepartment}
          year={year}
          setYear={setYear}
          onAddClick={handleAddClick}
        />

        {loading ? (
          <p className="status-text">Loading students...</p>
        ) : (
          <StudentTable
            students={students}
            onEdit={handleEditClick}
            onDelete={handleDelete}
          />
        )}

        {showForm && (
          <StudentForm
            student={editingStudent}
            onClose={handleFormClose}
            onSuccess={handleFormSuccess}
          />
        )}
      </main>
    </div>
  );
}

export default App;
