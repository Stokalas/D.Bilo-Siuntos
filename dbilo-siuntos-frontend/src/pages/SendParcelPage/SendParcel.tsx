import React, { Dispatch, SetStateAction, useState } from 'react';
import styled from '@emotion/styled';
import { Typography, Button } from '@mui/material';

import { SendReceiverForm } from './SendReceiverForm';
import { SendSenderForm } from './SendSenderForm';

export type SendFormProps = {
  setName: Dispatch<SetStateAction<string>>;
  setSurname: Dispatch<SetStateAction<string>>;
  setPhoneNum: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string>>;
  setAddress: Dispatch<SetStateAction<string>>;
  setPostalCode: Dispatch<SetStateAction<string>>;
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
      {/* <Typography fontFamily="orbitron, sans-serif" fontSize="12px" color="navy"> */}
      <FormWrapper onSubmit={handleSubmit}>
        <InputsWrapper>
        <SendReceiverForm
          setName={setRname}
          setSurname={setRsurname}
          setPhoneNum={setRphoneNum}
          setEmail={setRemail}
          setAddress={setRaddress}
          setPostalCode={setRpostalCode}
        />
        <SendSenderForm
          setName={setSname}
          setSurname={setSsurname}
          setPhoneNum={setSphoneNum}
          setEmail={setSemail}
          setAddress={setSaddress}
          setPostalCode={setSpostalCode}
        />
        <Button type="submit">Send</Button>
        </InputsWrapper>
      </FormWrapper>
      
      {/* </Typography> */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 24px;
  text-align: center;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
`;

const InputsWrapper = styled.div`
  display:flex;
  flex-direction: row;
  justify-content: center;
  gap: 50px;
`;
