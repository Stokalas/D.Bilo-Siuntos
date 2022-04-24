import React, { ChangeEvent } from 'react';
import styled from '@emotion/styled';
import { TextField } from '@mui/material';

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
      <h3>{formTitle}</h3>
      <StyledLabel htmlFor={`${formType}Name`}>Vardas</StyledLabel>
      <TextField title={`${formType}Name`} placeholder="Jonas" onChange={handleName} />
      <StyledLabel htmlFor={`${formType}Surname`}>Pavardė</StyledLabel>
      <TextField title={`${formType}Surname`} placeholder="Jonaitis" onChange={handleSurname} />
      <StyledLabel htmlFor={`${formType}PhoneNumber`}>Tel. numeris</StyledLabel>
      <TextField type="tel" title={`${formType}PhoneNumber`} onChange={handlePhoneNum} />
      <StyledLabel htmlFor={`${formType}Email`}>El. paštas</StyledLabel>
      <TextField type="email" title={`${formType}Email`} onChange={handleEmail} />
      <StyledLabel htmlFor={`${formType}Address`}>Adresas</StyledLabel>
      <TextField title={`${formType}Address`} onChange={handleAddress} />
      <StyledLabel htmlFor={`${formType}PostalCode`}>Pašto kodas</StyledLabel>
      <TextField title={`${formType}PostalCode`} onChange={handlePostalCode} />
    </div>
  );
};

const StyledLabel = styled.label`
  display: block;
  text-align: left;
`;
