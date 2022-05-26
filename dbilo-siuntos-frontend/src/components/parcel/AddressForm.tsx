import React, { Dispatch, SetStateAction, ChangeEvent, useState } from 'react';
import styled from '@emotion/styled';
import { Autocomplete, Button, TextField, Typography } from '@mui/material';

import { Terminal } from 'src/types';
import { getTerminalString } from 'src/utility/addressUtils';

export type AddressFormProps = {
  setName: Dispatch<SetStateAction<string>>;
  setSurname: Dispatch<SetStateAction<string>>;
  setPhoneNum: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string>>;
  setAddress: Dispatch<SetStateAction<string>>;
  setAddress2: Dispatch<SetStateAction<string>>;
  setCity: Dispatch<SetStateAction<string>>;
  setPostalCode: Dispatch<SetStateAction<string>>;
  setTerminalId: Dispatch<SetStateAction<number | null>>;
  formType: string;
  formTitle: string;
  terminals: Terminal[];
};

export const AddressForm: React.FC<AddressFormProps> = ({
  setName,
  setSurname,
  setPhoneNum,
  setEmail,
  setAddress,
  setAddress2,
  setCity,
  setPostalCode,
  setTerminalId,
  formType,
  formTitle,
  terminals,
}) => {
  const [isTerminal, setIsTerminal] = useState(false);
  const [isAddress, setIsAddress] = useState(false);

  const onTerminalClick = () => {
    setIsTerminal(true);
    setIsAddress(false);
    setAddress('');
    setAddress2('');
    setCity('');
    setPostalCode('');
  };

  const onAddressClick = () => {
    setIsTerminal(false);
    setIsAddress(true);
    setTerminalId(null);
  };

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
      <Button disabled={isTerminal} onClick={onTerminalClick} variant="contained">
        <Typography>Terminal</Typography>
      </Button>
      <Button disabled={isAddress} onClick={onAddressClick} variant="contained">
        <Typography>Address</Typography>
      </Button>
      {isTerminal && (
        <>
          <Autocomplete
            disablePortal
            options={terminals}
            getOptionLabel={getTerminalString}
            onChange={(_event: any, newValue: Terminal | null) => {
              setTerminalId(newValue?.id ?? null);
            }}
            renderInput={(params) => <TextField {...params} label="Parcel Terminal" />}
          />
        </>
      )}
      {isAddress && (
        <>
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
        </>
      )}
    </div>
  );
};

const StyledTextField = styled(TextField)`
  display: block;
  margin: 8px 0 8px;
`;
