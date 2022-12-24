import { useState, useContext } from 'react';
import Swal from 'sweetalert2';
import { RootContext } from '../../../context';
import { hideModal, showModal, createRecord } from '../../../context/action/demoAction';
import {
  Button, Input, Label, Select, Text,
} from '../../atoms';
import { Modal } from '../../molecules';

export default function FinancialRecordsActionAdd() {
  const action = 'addModal';
  const [inputs, setInputs] = useState({
    tanggal: '',
    keterangan: '',
    jenis: 'Penerimaan',
    jumlah: null,
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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isDemo) {
      createRecord(isDemo, inputs);
    } else {
      dispatch(createRecord(isDemo, inputs));
    }
    dispatch(hideModal(action));
    setInputs(() => ({
      tanggal: '',
      keterangan: '',
      jenis: 'Penerimaan',
      jumlah: '',
    }));
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
      title: 'Data berhasil ditambahkan',
    });
  };

  return (
    <>
      <Button style="add" title="Tambah" onClick={() => dispatch(showModal(action))} />

      <Modal style="modal-content-edit" action={action}>
        <Text style="modal-title-edit-record" title="Menambah Catatan" />
        <form onSubmit={handleSubmit}>
          <Label style="record" title="Jumlah" htmlFor="jumlah" />
          <Input
            style="record"
            type="number"
            id="jumlah"
            name="jumlah"
            value={inputs.jumlah || ''}
            placeholder="jumlah"
            step="10"
            onChange={handleChange}
            required
          />

          <Label style="record" title="Keterangan" htmlFor="keterangan" />
          <Input
            style="record"
            type="text"
            id="keterangan"
            name="keterangan"
            value={inputs.keterangan || ''}
            placeholder="keterangan"
            onChange={handleChange}
            required
          />

          <Label style="record" title="Jenis" htmlFor="jenis" />
          <Select
            style="record"
            id="jenis"
            name="jenis"
            value={inputs.jenis || 'Penerimaan'}
            onChange={handleChange}
          >
            <option>Penerimaan</option>
            <option>Pengeluaran</option>
          </Select>

          <Label style="record" title="Tanggal" htmlFor="date" />
          <Input
            style="record"
            type="date"
            id="date"
            name="tanggal"
            value={inputs.tanggal || ''}
            palceholder="Select date"
            onChange={handleChange}
            required
          />

          <div className="mt-2">
            <Button title="Batal" style="modal-cancle" type="button" onClick={() => dispatch(hideModal(action))} />
            <Button title="Kirim" style="modal-edit" type="submit" />
          </div>

        </form>
      </Modal>
    </>
  );
}
