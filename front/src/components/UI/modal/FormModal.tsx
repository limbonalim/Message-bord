import React, {PropsWithChildren} from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {Box} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../../app/hooks.ts';
import {closeModal, openModal, selectIsShowModal} from '../../../store/messageSlice.ts';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const FormModal: React.FC<PropsWithChildren> = ({children}) => {
  const isOpen = useAppSelector(selectIsShowModal);
  const dispatch = useAppDispatch();
  const handleOpen = () => {
    dispatch(openModal());
  };
  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <div>
      <Button onClick={handleOpen}>New message</Button>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {children}
        </Box>
      </Modal>
    </div>
  );
}

export default FormModal;