import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';

axios.defaults.baseURL = 'http://localhost:3001';

function ViewPatient() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('/viewPatients');
        console.log(response.data)
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    fetchPatients();
  }, []);


  const handleDeletePatient = async (patientId) => {
    try {
      await axios.delete(`/deletePatient/${patientId}`);
      setPatients((prevPatients) => prevPatients.filter((patient) => patient._id !== patientId));
    } catch (error) {
      console.error(`Error deleting patient with ID ${patientId}:`, error);
      // Optionally, you can show a user-friendly error message or perform other error handling.
    }
  };
  
  return (
    <div className="container">
      {patients.length === 0 ? (
        <p>No patients found.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Phone Number</th>
              <th>Email Address</th>
              <th>Date of Birth</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient._id}>
                <td>{patient.fullname}</td>
                <td>{patient.contactNumber}</td>
                <td>{patient.emailaddress}</td>
                <td>{patient.dateOfBirth}</td>
                <td>
                  <button className="btn btn-primary" onClick={()=> navigate(`/updatePatient/${patient._id}`)} >
                    View
                  </button>
                  <button onClick={() => handleDeletePatient(patient._id)} className="btn btn-danger">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Link to="/createPatient" className="btn btn-primary">
        Add Patient
      </Link>
    </div>
  );
}

export default ViewPatient;
