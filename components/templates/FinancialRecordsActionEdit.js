import { useState, useContext } from 'react';
import Swal from 'sweetalert2';
import { RootContext } from '../../context';
import { hideModal, showModal, updateRecords } from '../../context/action/demoAction';
import {
  Button, Input, Label, Select, Text, Wrapper,
} from '../atoms';
import { Modal } from '../molecules';

export default function FinancialRecordsActionEdit({ no, record }) {
  const action = `editModal${no}`;
  const {
    id, tanggal, keterangan, jenis, jumlah,
  } = record;
  const [inputs, setInputs] = useState({
    id,
    tanggal,
    keterangan,
    jenis,
    jumlah,
  });
  const { state, dispatch } = useContext(RootContext);
  const { isDemo } = state;

  const handleChange = (event) => {
    const { name } = event.target;
    let { value } = event.target;

    if (name === 'jumlah') {
      value = parseInt(value, 10);
    }

    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isDemo) {
      updateRecords(isDemo, inputs);
    } else {
      dispatch(updateRecords(isDemo, inputs));
    }
    dispatch(hideModal(action));
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: false,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: 'success',
      title: 'Data berhasil diubah',
    });
  };

  return (
    <>
      <Button style="edit" title="Ubah" onClick={() => dispatch(showModal(action))} />

      <Modal style="modal-content-edit" action={action}>
        <Text style="modal-title-edit-record" title="Mengubah Catatan" />
        <form onSubmit={handleSubmit}>
          <Label style="record" title="Jumlah" htmlFor={`jumlah${action}`} />
          <Input
            style="record"
            type="number"
            id={`jumlah${action}`}
            name="jumlah"
            value={inputs.jumlah}
            placeholder="jumlah"
            onChange={handleChange}
            required
          />

          <Label style="record" title="Keterangan" htmlFor={`keterangan${action}`} />
          <Input
            style="record"
            type="text"
            id={`keterangan${action}`}
            name="keterangan"
            value={inputs.keterangan}
            placeholder="keterangan"
            onChange={handleChange}
            required
          />

          <Label style="record" title="Jenis" htmlFor={`jenis${action}`} />
          <Select
            style="record"
            id={`jenis${action}`}
            name="jenis"
            value={inputs.jenis}
            onChange={handleChange}
          >
            <option>Penerimaan</option>
            <option>Pengeluaran</option>
          </Select>

          <Label style="record" title="Tanggal" htmlFor={`date${action}`} />
          <Input
            style="record"
            type="date"
            id={`date${action}`}
            name="date"
            value={inputs.tanggal}
            onChange={handleChange}
            required
          />

          <Wrapper styles="modal-button-edit">
            <Button title="Batal" style="modal-cancle" type="button" onClick={() => dispatch(hideModal(action))} />
            <Button title="Kirim" style="modal-edit" type="submit" />
          </Wrapper>
        </form>
      </Modal>
    </>
  );
}
