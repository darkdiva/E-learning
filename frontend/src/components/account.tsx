import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

type AccountFormData = {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  oldPassword: string;
  newPassword: string;
};

type ApiError = {
  message: string;
};

type AccountResponse = {
  message: string;
};

const Account: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<AccountFormData>();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (data: AccountFormData) => {
    try {
      setSuccessMessage('');
      setErrorMessage('');

      const response = await axios.put<AccountResponse>(`/api/account/update/general/${userId}`, {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        birthDate: data.birthDate
      });

      setSuccessMessage(response.data.message);
    } catch (error) {
      const apiError = error.response.data as ApiError;
      setErrorMessage(apiError.message);
    }

    try {
      const response = await axios.put<AccountResponse>(`/api/account/update/password/${userId}`, {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword
      });

      setSuccessMessage(response.data.message);
    } catch (error;
    ) {
      const apiError = error.response.data as ApiError;
      setErrorMessage(apiError.message);
    }
  };

  return (
    <div>
      <h2>Account Settings</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
       
      <label htmlFor="firstName">First Name</label>
        <input type="text" id="firstName" {...register('firstName', { required: true })} />
        {errors.firstName && <span>This field is required</span>}

        <label htmlFor="lastName">Last Name</label>
        <input type="text" id="lastName" {...register('lastName', { required: true })} />
        {errors.lastName && <span>This field is required</span>}

        <label htmlFor="email">Email</label>
        <input type="email" id="email" {...register('email', { required: true })} />
        {errors.email && <span>This field is required</span>}

        <label htmlFor="birthDate">Birth Date</label>
        <input type="date" id="birthDate" {...register('birthDate', { required: true })} />
        {errors.birthDate && <span>This field is required</span>}

        <label htmlFor="oldPassword">Old Password</label>
        <input type="password" id="oldPassword" {...register('oldPassword', { required: true })} />
        {errors.oldPassword && <span>This field is required</span>}

        <label htmlFor="newPassword">New Password</label>
        <input type="password" id="newPassword" {...register('newPassword', { required: true })} />
        {errors.newPassword && <span>This field is required</span>}

        {successMessage && <div>{successMessage}</div>}
        {errorMessage && <div>{errorMessage}</div>}
        
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Account;
