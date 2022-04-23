import React, { ChangeEvent } from 'react';
import styled from '@emotion/styled';

import { SendFormProps } from './SendParcel';

export const SendReceiverForm: React.FC<SendFormProps> = ({
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
      <h3>Gavėjas</h3>
      <StyledLabel htmlFor="receiverName">Vardas</StyledLabel>
      <input title="receiverName" placeholder="Jonas" onChange={handleName} />
      <StyledLabel htmlFor="receiverSurname">Pavardė</StyledLabel>
      <input title="receiverSurname" placeholder="Jonaitis" onChange={handleSurname} />
      <StyledLabel htmlFor="receiverPhoneNumber">Tel. numeris</StyledLabel>
      <input type="tel" title="receiverPhoneNumber" onChange={handlePhoneNum} />
      <StyledLabel htmlFor="receiverEmail">El. paštas</StyledLabel>
      <input type="email" title="receiverEmail" onChange={handleEmail} />
      <StyledLabel htmlFor="receiverAddress">Adresas</StyledLabel>
      <input type="text" title="receiverAddress" onChange={handleAddress} />
      <StyledLabel htmlFor="receiverPostalCode">Pašto kodas</StyledLabel>
      <input type="text" title="receiverPostalCode" onChange={handlePostalCode} />
    </div>
  );
};

const StyledLabel = styled.label`
  display: block;
`;
