import React, { useEffect, useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { api } from 'src/api';
import { AddressForm } from './AddressForm';
import { geocode } from 'src/utility';
import { Parcel, Terminal } from 'src/types';
import { SetNotificationAction } from 'src/store/actions/notificationsActions';

// import { useSelector } from 'react-redux';
// import { getLoginState } from 'src/store/selectors/loginSelectors';

// make parcel as a single state
// if user is logged in, set sender id

// maybe can skip this
// confirmation page after successful post
// alert on error

// redirect to parcel page on confirmation

// Login to view all your siuntos?

//Confirmation page after parcel sending

export const SendParcelForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [rName, setRname] = useState('');
  const [rSurname, setRsurname] = useState('');
  const [rPhoneNum, setRphoneNum] = useState('');
  const [rEmail, setRemail] = useState('');
  const [rAddress, setRaddress] = useState('');
  const [rAddress2, setRaddress2] = useState('');
  const [rCity, setRcity] = useState('');
  const [rPostalCode, setRpostalCode] = useState('');
  const [rTerminalId, setRTerminalId] = useState<number | null>(null);

  const [sName, setSname] = useState('');
  const [sSurname, setSsurname] = useState('');
  const [sPhoneNum, setSphoneNum] = useState('');
  const [sEmail, setSemail] = useState('');
  const [sAddress, setSaddress] = useState('');
  const [sAddress2, setSaddress2] = useState('');
  const [sCity, setScity] = useState('');
  const [sPostalCode, setSpostalCode] = useState('');
  const [sTerminalId, setSTerminalId] = useState<number | null>(null);

  const [size, setSize] = useState('0');

  const handleSizeChange = (event: SelectChangeEvent) => {
    setSize(event.target.value as string);
  };

  const [terminals, setTerminals] = useState<Terminal[]>([]);
  useEffect(() => {
    //TODO handle error
    api.get<Array<Terminal>>('terminal/all', {}, true).then((response) => {
      setTerminals(response);
    });
  }, []);

  // const isLogged = useSelector(getLoginState)?.user;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //TODO to handle errors
    //TODO add sender user if logged in

    const receiverDetails = {
      firstName: rName,
      lastName: rSurname,
      email: rEmail,
      phoneNumber: rPhoneNum,
    };
    const shipperDetails = {
      firstName: sName,
      lastName: sSurname,
      email: sEmail,
      phoneNumber: sPhoneNum,
    };

    let parcel: any = {
      size: Number(size),
      receiverDetails,
      shipperDetails,
    };

    if (rTerminalId) {
      parcel = { ...parcel, deliveryTerminalId: rTerminalId };
    } else {
      let latitude = null;
      let longitude = null;
      await geocode(rAddress + ', ' + rCity + ' ' + rPostalCode).then((res) => {
        try {
          latitude = res[0].geometry.location.lat();
          longitude = res[0].geometry.location.lng();
        } catch (e) {
          console.log(e);
        }
      });

      const deliveryAddress = {
        addressLine1: rAddress,
        addressLine2: rAddress2,
        postalCode: rPostalCode,
        city: rCity,
        country: 'Lithuania',
        latitude,
        longitude,
      };
      parcel = { ...parcel, deliveryAddress };
    }

    if (sTerminalId) {
      parcel = { ...parcel, pickupTerminalId: sTerminalId };
    } else {
      let latitude = null;
      let longitude = null;
      await geocode(sAddress + ', ' + sCity + ' ' + sPostalCode).then((res) => {
        try {
          latitude = res[0].geometry.location.lat();
          longitude = res[0].geometry.location.lng();
        } catch (e) {
          console.log(e);
        }
      });

      const pickupAddress = {
        addressLine1: sAddress,
        addressLine2: sAddress2,
        postalCode: sPostalCode,
        city: sCity,
        country: 'Lithuania',
        latitude,
        longitude,
      };
      parcel = { ...parcel, pickupAddress };
    }

    api.post<Parcel>('parcel', parcel, true).then((response) => {
      dispatch(
        SetNotificationAction({
          isOpen: true,
          message: 'Parcel Successfully Registered',
          type: 'success',
        })
      );
      navigate(`/parcel/${response.trackingNumber}`, { state: { parcel: response } });
    });
  };

  return (
    <Wrapper>
      <Typography fontFamily="orbitron, sans-serif" fontSize="24px" color="primary">
        Register Parcel
      </Typography>
      <FormWrapper id="parcelForm" onSubmit={handleSubmit}>
        <FormFlex>
          <AddressForm
            setName={setRname}
            setSurname={setRsurname}
            setPhoneNum={setRphoneNum}
            setEmail={setRemail}
            setAddress={setRaddress}
            setAddress2={setRaddress2}
            setCity={setRcity}
            setPostalCode={setRpostalCode}
            setTerminalId={setRTerminalId}
            formType="receiver"
            formTitle="Receiver"
            terminals={terminals}
          />
          <AddressForm
            setName={setSname}
            setSurname={setSsurname}
            setPhoneNum={setSphoneNum}
            setEmail={setSemail}
            setAddress={setSaddress}
            setAddress2={setSaddress2}
            setCity={setScity}
            setPostalCode={setSpostalCode}
            setTerminalId={setSTerminalId}
            formType="sender"
            formTitle="Sender"
            terminals={terminals}
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
