import React, { ChangeEvent } from 'react';
import styled from '@emotion/styled';
import { TextField, Typography } from '@mui/material';

import { SendFormProps } from './SendParcel';

export const SendParcelForm: React.FC<SendFormProps> = ({
  setName,
  setSurname,
  setPhoneNum,
  setEmail,
  setAddress,
  setAddress2,
  setCity,
  setPostalCode,
  formType,
  formTitle,
}) => {
  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const handleSurname = (e: ChangeEvent<HTMLInputElement>) => {
    setSurname(e.currentTarget.value);
  };

  const handlePhoneNum = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneNum(e.currentTarget.value);
  };

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const handleAddress = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.currentTarget.value);
  };

  const handleAddress2 = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress2(e.currentTarget.value);
  };

  const handleCity = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.currentTarget.value);
  };

  const handlePostalCode = (e: ChangeEvent<HTMLInputElement>) => {
    setPostalCode(e.currentTarget.value);
  };

  return (
    <div>
      <Typography fontFamily="orbitron, sans-serif" fontSize="16px" color="primary-light">
        {formTitle}
      </Typography>
      <StyledTextField required title={`${formType}Name`} onChange={handleName} label="Name" />
      <StyledTextField
        required
        title={`${formType}Surname`}
        onChange={handleSurname}
        label="Surname"
      />
      <StyledTextField
        required
        type="tel"
        title={`${formType}PhoneNumber`}
        onChange={handlePhoneNum}
        label="Phone Number"
      />
      <StyledTextField
        required
        type="email"
        title={`${formType}Email`}
        onChange={handleEmail}
        label="Email"
      />
      <StyledTextField
        required
        title={`${formType}Address`}
        onChange={handleAddress}
        label="Address"
      />
      <StyledTextField
        title={`${formType}Address2`}
        onChange={handleAddress2}
        label="Address Line 2 (optional)"
      />
      <StyledTextField required title={`${formType}City`} onChange={handleCity} label="City" />
      <StyledTextField
        required
        title={`${formType}PostalCode`}
        onChange={handlePostalCode}
        label="Postal Code"
      />
    </div>
  );
};

const StyledTextField = styled(TextField)`
  display: block;
  margin: 8px 0 8px;
`;
