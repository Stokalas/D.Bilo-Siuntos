import React, { ChangeEvent } from 'react';
import styled from '@emotion/styled';

import { SendFormProps } from './SendParcel';

export const SendSenderForm: React.FC<SendFormProps> = ({
  setName,
  setSurname,
  setPhoneNum,
  setEmail,
  setAddress,
  setPostalCode,
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
      <h3>Siuntėjas</h3>
      <StyledLabel>Vardas</StyledLabel>
      <input title="senderName" placeholder="Jonas" onChange={handleName} />
      <StyledLabel>Pavardė</StyledLabel>
      <input title="senderSurname" placeholder="Jonaitis" onChange={handleSurname} />
      <StyledLabel>Tel. numeris</StyledLabel>
      <input type="tel" title="senderPhoneNumber" onChange={handlePhoneNum} />
      <StyledLabel>El. paštas</StyledLabel>
      <input type="email" title="senderEmail" onChange={handleEmail} />
      <StyledLabel>Adresas</StyledLabel>
      <input title="senderAddress" onChange={handleAddress} />
      <StyledLabel>Pašto kodas</StyledLabel>
      <input title="senderPostalCode" onChange={handlePostalCode} />
    </div>
  );
};

const StyledLabel = styled.label`
  display: block;
`;
