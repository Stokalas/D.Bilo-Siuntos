import React, { useEffect, useState } from 'react';
import { Typography, Container, Grid, Button, Modal, Autocomplete, TextField } from '@mui/material';
import { useParams, useLocation } from 'react-router-dom';
import { orderBy } from 'lodash';
import { useDispatch } from 'react-redux';

import { api } from 'src/api';
import { Parcel, Terminal } from 'src/types';
import { ParcelTable } from '../components/parcel';
import { GoogleMap } from 'src/components/map/';
import { getAddressString, getTerminalString } from 'src/utility/addressUtils';
import { SetNotificationAction } from 'src/store/actions/notificationsActions';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '5px',
};

const createMarker = (parcel: Parcel) => {
  const newestStatus = orderBy(parcel.status, 'date', 'asc')[0]!;
  const currentAddress = newestStatus.address ?? newestStatus.terminal!.address;
  //if there is no status error
  //for now assume there is always
  const position = { lat: currentAddress.latitude!, lng: currentAddress.longitude! };
  const label = newestStatus.terminal?.name ?? '';
  const address = getAddressString(currentAddress);
  return { label, position, address };
};

export const ParcelPage: React.FC = () => {
  const dispatch = useDispatch();

  const [parcel, setParcel] = useState<Parcel>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [updateErrorMessage, setUpdateErrorMessage] = useState('');

  const [allowEdit, setAllowEdit] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setOverwrite(false);
  };

  const [overwrite, setOverwrite] = React.useState(false);
  const [terminalId, setTerminalId] = useState<number | null>(null);
  const [terminals, setTerminals] = useState<Terminal[]>([]);
  useEffect(() => {
    //TODO handle error
    api.get<Array<Terminal>>('terminal/all', {}, true).then((response) => {
      setTerminals(response);
    });
  }, []);

  const { trackingNumber } = useParams();
  const { state }: { state: any } = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      if (state?.parcel) {
        setParcel(state.parcel as Parcel);
        setAllowEdit(Boolean(state.parcel as Parcel));
      } else {
        setLoading(true);
        try {
          const response = await api.get<Parcel>(`parcel/${trackingNumber}`);
          if (response) {
            setError(false);
            setParcel(response);
            setAllowEdit(Boolean(response.deliveryTerminal));
          } else {
            setError(true);
          }
        } catch (e) {
          setError(true);
          console.log(e);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [state?.parcel, trackingNumber]);

  const handleUpdate = async () => {
    try {
      const response = await api.put<Parcel>(`parcel/${trackingNumber}`, {
        deliveryTerminalId: terminalId,
        overwrite,
        rowVersion: parcel!.rowVersion,
      });
      dispatch(
        SetNotificationAction({
          isOpen: true,
          message: 'Delivery Location Successfully Changed',
          type: 'success',
        })
      );
      setParcel(response);
      handleClose();
      setTerminalId(null);
    } catch (error) {
      if (error?.response?.status === 409) {
        setOverwrite(true);
        setUpdateErrorMessage(
          'Some data has changed! Would you like to overwrite potential changes?'
        );
      } else {
        setUpdateErrorMessage('Something went wrong!');
      }
      dispatch(
        SetNotificationAction({
          isOpen: true,
          message: 'Update Failed',
          type: 'error',
        })
      );
    }
  };

  return (
    <>
      <Container maxWidth="lg">
        <Grid rowSpacing={3} columnSpacing={1} container marginBottom="300px">
          <Grid
            item
            xs={12}
            marginTop="40px"
            borderTop="1px solid lightgrey"
            borderBottom="1px solid lightgrey"
            paddingTop="0px !important"
            display="flex"
            justifyContent="space-between"
          >
            <Typography fontSize="32px">Parcel Tracking</Typography>
            {allowEdit && (
              <Button onClick={handleOpen} variant="contained">
                <Typography>Edit</Typography>
              </Button>
            )}
          </Grid>
          {parcel && (
            <>
              <Grid item xs={12} md={6}>
                <ParcelTable parcel={parcel} />
              </Grid>
              <Grid item xs={12} md={6}>
                <GoogleMap
                  zoom={13}
                  center={createMarker(parcel).position}
                  markers={[createMarker(parcel)]}
                />
              </Grid>
            </>
          )}
          <Grid item xs={12}>
            <Typography fontSize="20px">
              {error &&
                !loading &&
                `Failed to load parcel with tracking number ${trackingNumber} or no such parcel exists`}
              {loading && 'Loading'}
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container maxWidth="sm" sx={modalStyle}>
          <Grid container>
            <Grid item xs={12} marginBottom="25px">
              <Typography fontFamily="orbitron, sans-serif" fontSize="20px" id="modal-modal-title">
                Want to change the delivery terminal? You can!
              </Typography>
            </Grid>
            <Grid item xs={12} marginBottom="25px">
              <Autocomplete
                disablePortal
                options={terminals}
                getOptionLabel={getTerminalString}
                onChange={(_event: any, newValue: Terminal | null) => {
                  setTerminalId(newValue?.id ?? null);
                }}
                renderInput={(params) => <TextField {...params} label="Parcel Terminal" />}
              />
            </Grid>
            <Grid item xs={6}>
              {updateErrorMessage && <Typography>{updateErrorMessage}</Typography>}
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="flex-end">
              <Button onClick={handleUpdate} disabled={!Boolean(terminalId)} variant="contained">
                <Typography>Update</Typography>
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Modal>
    </>
  );
};
