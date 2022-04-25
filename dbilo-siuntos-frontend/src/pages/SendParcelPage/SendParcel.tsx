import React, { Dispatch, SetStateAction, useState } from 'react';
import styled from '@emotion/styled';
import { Typography, Button } from '@mui/material';

import { SendParcelForm } from './SendParcelForm';

export type SendFormProps = {
  setName: Dispatch<SetStateAction<string>>;
  setSurname: Dispatch<SetStateAction<string>>;
  setPhoneNum: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string>>;
  setAddress: Dispatch<SetStateAction<string>>;
  setPostalCode: Dispatch<SetStateAction<string>>;
  formType: string;
  formTitle: string;
};

export const SendParcel = () => {
  const [rName, setRname] = useState('');
  const [rSurname, setRsurname] = useState('');
  const [rPhoneNum, setRphoneNum] = useState('');
  const [rEmail, setRemail] = useState('');
  const [rAddress, setRaddress] = useState('');
  const [rPostalCode, setRpostalCode] = useState('');

  const [sName, setSname] = useState('');
  const [sSurname, setSsurname] = useState('');
  const [sPhoneNum, setSphoneNum] = useState('');
  const [sEmail, setSemail] = useState('');
  const [sAddress, setSaddress] = useState('');
  const [sPostalCode, setSpostalCode] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({
      rName,
      rSurname,
      rPhoneNum,
      rAddress,
      rEmail,
      rPostalCode,
      sName,
      sSurname,
      sPhoneNum,
      sAddress,
      sEmail,
      sPostalCode,
    });
  };

  return (
    <Wrapper>
      <Typography fontFamily="orbitron, sans-serif" fontSize="24px" color="primary">
        Register Parcel
      </Typography>
      <FormWrapper id="parcelForm" onSubmit={handleSubmit}>
        <SendParcelForm
          setName={setRname}
          setSurname={setRsurname}
          setPhoneNum={setRphoneNum}
          setEmail={setRemail}
          setAddress={setRaddress}
          setPostalCode={setRpostalCode}
          formType="receiver"
          formTitle="Receiver"
        />
        <SendParcelForm
          setName={setSname}
          setSurname={setSsurname}
          setPhoneNum={setSphoneNum}
          setEmail={setSemail}
          setAddress={setSaddress}
          setPostalCode={setSpostalCode}
          formType="sender"
          formTitle="Sender"
        />
      </FormWrapper>
      <Button variant="contained" type="submit" form="parcelForm">
        Send
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 48px 0 48px;
  text-align: center;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 50px;
  margin: 20px 0;
`;
