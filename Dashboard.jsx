function Dashboard({ students }) {
  const total = students.length;
  const cse = students.filter((s) => s.department === "CSE").length;
  const ece = students.filter((s) => s.department === "ECE").length;
  const it = students.filter((s) => s.department === "IT").length;

  return (
    <div className="dashboard">
      <div className="card">
        <h3>Total Students</h3>
        <p>{total}</p>
      </div>
      <div className="card">
        <h3>CSE Students</h3>
        <p>{cse}</p>
      </div>
      <div className="card">
        <h3>ECE Students</h3>
        <p>{ece}</p>
      </div>
      <div className="card">
        <h3>IT Students</h3>
        <p>{it}</p>
      </div>
    </div>
  );
}

export default Dashboard;
