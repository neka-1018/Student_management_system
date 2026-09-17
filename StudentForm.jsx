import { useState } from "react";
import { createStudent, updateStudent } from "../api";

const emptyForm = {
  student_id: "",
  name: "",
  email: "",
  phone: "",
  department: "CSE",
  year: "1",
  date_of_birth: "",
  gender: "Male",
  address: "",
};

function StudentForm({ student, onClose, onSuccess }) {
  const [formData, setFormData] = useState(
    student
      ? {
          student_id: student.student_id,
          name: student.name,
          email: student.email,
          phone: student.phone,
          department: student.department,
          year: String(student.year),
          date_of_birth: student.date_of_birth,
          gender: student.gender,
          address: student.address,
        }
      : emptyForm
  );
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.student_id.trim()) {
      newErrors.student_id = "Student ID is required.";
    }
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[0-9+\-\s]{7,15}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid phone number.";
    }
    if (!formData.date_of_birth) {
      newErrors.date_of_birth = "Date of birth is required.";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Address is required.";
    }
    const yearNum = Number(formData.year);
    if (yearNum < 1 || yearNum > 4) {
      newErrors.year = "Year must be between 1 and 4.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);

    const payload = { ...formData, year: Number(formData.year) };

    try {
      if (student) {
        await updateStudent(student.id, payload);
        onSuccess("Student updated successfully.");
      } else {
        await createStudent(payload);
        onSuccess("Student added successfully.");
      }
    } catch (err) {
      if (err.data) {
        const serverErrors = {};
        Object.keys(err.data).forEach((key) => {
          serverErrors[key] = Array.isArray(err.data[key])
            ? err.data[key][0]
            : String(err.data[key]);
        });
        setErrors(serverErrors);
      } else {
        setErrors({
          general:
            "Unable to connect to the server. Please make sure the Django backend is running.",
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData(emptyForm);
    setErrors({});
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{student ? "Update Student" : "Add Student"}</h2>

        {errors.general && (
          <div className="alert alert-error">{errors.general}</div>
        )}

        <form onSubmit={handleSubmit} className="student-form">
          <div className="form-group">
            <label>Student ID</label>
            <input
              type="text"
              name="student_id"
              value={formData.student_id}
              onChange={handleChange}
            />
            {errors.student_id && (
              <span className="field-error">{errors.student_id}</span>
            )}
          </div>

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <span className="field-error">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && (
              <span className="field-error">{errors.phone}</span>
            )}
          </div>

          <div className="form-group">
            <label>Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
            >
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="IT">IT</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Civil">Civil</option>
            </select>
          </div>

          <div className="form-group">
            <label>Year</label>
            <select name="year" value={formData.year} onChange={handleChange}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
            {errors.year && <span className="field-error">{errors.year}</span>}
          </div>

          <div className="form-group">
            <label>Date of Birth</label>
            <input
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
            />
            {errors.date_of_birth && (
              <span className="field-error">{errors.date_of_birth}</span>
            )}
          </div>

          <div className="form-group">
            <label>Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group form-group-full">
            <label>Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
            />
            {errors.address && (
              <span className="field-error">{errors.address}</span>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? "Saving..." : student ? "Update Student" : "Add Student"}
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleReset}>
              Reset
            </button>
            <button type="button" className="btn btn-cancel" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentForm;
