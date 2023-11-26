import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';

function UpdatePatient({ patient }) {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  React.useEffect(() => {
    setValue('fullname', patient.fullname);
    setValue('emailaddress', patient.emailaddress);
    setValue('birthdate', patient.dateOfBirth);
    setValue('contact', patient.contactNumber);
    setValue('lastDoctorVisit', patient.lastDoctorVisit);
    setValue('illness', patient.illnessDescription);
    setValue('doctorname', patient.doctorName);
  }, [setValue, patient]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/patients/updatePatient', data);
      navigate('/viewPatient');
      console.log(response);
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)} className="px-4 py-3">
        <h2 className="mb-4 bold-text">Patient Information</h2>
        <div className="row">
          <div className="col">
            <div className="mb-3">
              <label htmlFor="fullname" className="form-label bold-text">Full Name</label>
              <input type="text" className="form-control" {...register('fullname')} placeholder="Enter full name" />
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <label htmlFor="emailaddress" className="form-label bold-text">Email address</label>
              <input type="email" className="form-control" {...register('emailaddress')} placeholder="Enter email address" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="mb-3">
              <label htmlFor="birthdate" className="form-label bold-text">Date of birth</label>
              <input type="datetime" className="form-control" {...register('birthdate')} placeholder="Enter date of birth" />
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <label htmlFor="contact" className="form-label bold-text">Contact number</label>
              <input type="tel" className="form-control" {...register('contact')} placeholder="Enter contact number" />
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="lastDoctorVisit" className="form-label bold-text">Last Doctor visit</label>
          <input type="datetime" className="form-control" {...register('lastDoctorVisit')} placeholder="Select last Doctor visit" />
        </div>
        <div className="mb-3">
          <label htmlFor="illness" className="form-label bold-text">Illness description</label>
          <input type="text" className="form-control" {...register('illness')} placeholder="Enter description" />
        </div>
        <div className="mb-3">
          <label htmlFor="doctorname" className="form-label bold-text">Doctor's Name/ Office</label>
          <input type="text" className="form-control" {...register('doctorname')} placeholder="Enter name/office" />
        </div>

        <button type="submit" className="btn btn-primary">Update Patient</button>
      </form>
    </div>
  );
}

export default UpdatePatient;
