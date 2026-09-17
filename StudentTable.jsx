function StudentTable({ students, onEdit, onDelete }) {
  if (students.length === 0) {
    return <p className="status-text">No students found.</p>;
  }

  return (
    <div className="table-wrapper">
      <table className="student-table">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Year</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.student_id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.phone}</td>
              <td>{student.department}</td>
              <td>{student.year}</td>
              <td>{student.gender}</td>
              <td className="actions">
                <button className="btn btn-edit" onClick={() => onEdit(student)}>
                  Edit
                </button>
                <button
                  className="btn btn-delete"
                  onClick={() => onDelete(student)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;
