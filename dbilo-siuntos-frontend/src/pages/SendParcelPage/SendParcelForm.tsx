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

  const handlePostalCode = (e: ChangeEvent<HTMLInputElement>) => {
    setPostalCode(e.currentTarget.value);
  };

  return (
    <div>
      <Typography fontFamily="orbitron, sans-serif" fontSize="16px" color="primary-light">
        {formTitle}
      </Typography>
      <StyledTextField title={`${formType}Name`} onChange={handleName} label="Name" />
      <StyledTextField title={`${formType}Surname`} onChange={handleSurname} label="Surname" />
      <StyledTextField
        type="tel"
        title={`${formType}PhoneNumber`}
        onChange={handlePhoneNum}
        label="Phone Number"
      />
      <StyledTextField
        type="email"
        title={`${formType}Email`}
        onChange={handleEmail}
        label="Email"
      />
      <StyledTextField title={`${formType}Address`} onChange={handleAddress} label="Address" />
      <StyledTextField
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
