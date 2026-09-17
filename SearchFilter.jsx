function SearchFilter({
  search,
  setSearch,
  department,
  setDepartment,
  year,
  setYear,
  onAddClick,
}) {
  return (
    <div className="toolbar">
      <input
        type="text"
        placeholder="Search by ID, name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <select
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      >
        <option value="">All Departments</option>
        <option value="CSE">CSE</option>
        <option value="ECE">ECE</option>
        <option value="EEE">EEE</option>
        <option value="IT">IT</option>
        <option value="Mechanical">Mechanical</option>
        <option value="Civil">Civil</option>
      </select>

      <select value={year} onChange={(e) => setYear(e.target.value)}>
        <option value="">All Years</option>
        <option value="1">Year 1</option>
        <option value="2">Year 2</option>
        <option value="3">Year 3</option>
        <option value="4">Year 4</option>
      </select>

      <button className="btn btn-primary" onClick={onAddClick}>
        + Add Student
      </button>
    </div>
  );
}

export default SearchFilter;
