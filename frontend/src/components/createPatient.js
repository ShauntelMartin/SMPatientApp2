import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3001';


function CreatePatient() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/patients/createPatient', data);
      navigate('/viewPatient');
      console.log(response);
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)} className="px-4 py-3">
        <h2 className="mb-4 bold-text">Add Patient Information</h2>
        <div className="row">
          <div className="col">
            <div className="mb-3">
              <label htmlFor="fullname" className="form-label bold-text">Full Name</label>
              <input type="text" className="form-control" id="fullname" name="fullname" placeholder="Enter full name" required {...register('fullname')} />
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <label htmlFor="emailaddress" className="form-label bold-text">Email address</label>
              <input type="email" className="form-control" id="emailaddress" name="emailaddress" placeholder="Enter email address" {...register('emailaddress')} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="mb-3">
              <label htmlFor="birthdate" className="form-label bold-text">Date of birth</label>
              <input type="date" className="form-control" id="birthdate" name="birthdate" placeholder="Enter date of birth" {...register('birthdate', { required: 'Date of birth is required' })} />
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <label htmlFor="contact" className="form-label bold-text">Contact number</label>
              <input type="tel" className="form-control" id="contact" name="contact" placeholder="Enter contact number" {...register('contact')} />
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="lastDoctorVisit" className="form-label bold-text">Last Doctor visit</label>
          <input type="date" className="form-control" id="lastDoctorVisit" name="lastDoctorVisit" placeholder="Select last Doctor visit" {...register('lastDoctorVisit')} />
        </div>
        <div className="mb-3">
          <label htmlFor="illness" className="form-label bold-text">Illness description</label>
          <input type="text" className="form-control" id="illness" name="illness" placeholder="Enter description" {...register('illness')} />
        </div>
        <div className="mb-3">
          <label htmlFor="doctorname" className="form-label bold-text">Doctor's Name/Office</label>
          <input type="text" className="form-control" id="doctorname" name="doctorname" placeholder="Enter name/office" {...register('doctorname')} />
        </div>

        <div className="mb-3">
          <button onSubmit={handleSubmit(onSubmit)} type="submit" className="btn btn-primary">Add Patient</button>
        </div>
      </form>
    </div>
  );
}

export default CreatePatient;
