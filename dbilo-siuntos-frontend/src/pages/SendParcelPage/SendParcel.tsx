import React, { Dispatch, SetStateAction, useState } from 'react';
import styled from '@emotion/styled';
import {
  Typography,
  Button,
  Select,
  SelectChangeEvent,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';

import { api } from 'src/api';
import { SendParcelForm } from './SendParcelForm';
import { geocode } from 'src/utility';

// import { useSelector } from 'react-redux';
// import { getLoginState } from 'src/store/selectors/loginSelectors';

export type SendFormProps = {
  setName: Dispatch<SetStateAction<string>>;
  setSurname: Dispatch<SetStateAction<string>>;
  setPhoneNum: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string>>;
  setAddress: Dispatch<SetStateAction<string>>;
  setAddress2: Dispatch<SetStateAction<string>>;
  setCity: Dispatch<SetStateAction<string>>;
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
  const [rAddress2, setRaddress2] = useState('');
  const [rCity, setRcity] = useState('');
  const [rPostalCode, setRpostalCode] = useState('');

  const [sName, setSname] = useState('');
  const [sSurname, setSsurname] = useState('');
  const [sPhoneNum, setSphoneNum] = useState('');
  const [sEmail, setSemail] = useState('');
  const [sAddress, setSaddress] = useState('');
  const [sAddress2, setSaddress2] = useState('');
  const [sCity, setScity] = useState('');
  const [sPostalCode, setSpostalCode] = useState('');

  const [size, setSize] = useState('0');

  const handleSizeChange = (event: SelectChangeEvent) => {
    setSize(event.target.value as string);
  };

  // const isLogged = useSelector(getLoginState)?.user;

  //Send works, but now need to handle response

  // Login to view all your siuntos?

  //Future todos
  //Track current location?
  //For now manually set in db for show purposes?
  //What kind of statuses could there be?
  //Booked, Collected From Shipper / Travelling, Ready TO be collected, Collected

  //I suppose we should select - do you want courier to come and collect or do you want to send from terminal post
  // We should give some sort of mock confirmation that a user could "print"

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let lat = null;
    let lng = null;
    await geocode(rAddress + ', ' + rCity + ' ' + rPostalCode).then((res) => {
      try {
        lat = res[0].geometry.location.lat();
        lng = res[0].geometry.location.lng();
      } catch (e) {
        console.log(e);
      }
    });

    const parcel = {
      size: Number(size),
      shippingAddress: {
        name: sName,
        lastName: sSurname,
        email: sEmail,
        phoneNumber: sPhoneNum,
        city: sCity,
        addressLine1: sAddress,
        addressLine2: sAddress2,
        postalCode: sPostalCode,
        country: 'Lithuania',
      },
      deliveryAddress: {
        name: rName,
        lastName: rSurname,
        email: rEmail,
        phoneNumber: rPhoneNum,
        city: rCity,
        addressLine1: rAddress,
        addressLine2: rAddress2,
        postalCode: rPostalCode,
        country: 'Lithuania',
        latitude: lat,
        longitude: lng,
      },
      status: [],
    };

    api.post('parcel', parcel).then((response) => {
      console.log(response);
    });
    console.log(parcel);
  };

  return (
    <Wrapper>
      <Typography fontFamily="orbitron, sans-serif" fontSize="24px" color="primary">
        Register Parcel
      </Typography>
      <FormWrapper id="parcelForm" onSubmit={handleSubmit}>
        <FormFlex>
          <SendParcelForm
            setName={setRname}
            setSurname={setRsurname}
            setPhoneNum={setRphoneNum}
            setEmail={setRemail}
            setAddress={setRaddress}
            setAddress2={setRaddress2}
            setCity={setRcity}
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
            setAddress2={setSaddress2}
            setCity={setScity}
            setPostalCode={setSpostalCode}
            formType="sender"
            formTitle="Sender"
          />
        </FormFlex>
        <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 300 }} size="small">
          <InputLabel id="size-select">Size</InputLabel>
          <Select id="size-select" value={size} label="Size" onChange={handleSizeChange}>
            <MenuItem value={0}>S (up to 8cm x 8cm x 8cm)</MenuItem>
            <MenuItem value={1}>M (up to 18cm x 18cm x 18cm)</MenuItem>
            <MenuItem value={2}>L (up to 40cm x 40cm x 40cm)</MenuItem>
            <MenuItem value={3}>XL</MenuItem>
          </Select>
        </FormControl>
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
  margin: 20px 0;
`;

const FormFlex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 50px;
`;
