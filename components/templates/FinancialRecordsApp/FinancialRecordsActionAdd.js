import { useState, useContext } from 'react';
import Swal from 'sweetalert2';
import { RootContext } from '../../../context';
import { hideModal, showModal, createRecord } from '../../../context/action/demoAction';
import {
  Text,
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
      createRecord(isDemo, { ...inputs, value: (inputs.jenis === 'Penerimaan' ? inputs.jumlah : inputs.jumlah * -1) });
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
      <button className="py-1.5 md:py-2 px-3 md:px-4 bg-slate-800 text-slate-50 rounded-[3px]" onClick={() => dispatch(showModal(action))}>Tambah</button>

      <Modal style="modal-content-edit" action={action}>
        <Text style="modal-title-edit-record" title="Menambah Catatan" />
        <form onSubmit={handleSubmit}>
          <label className="font-normal pl-0.5 capitalize text-left text-base mb-0.5 block" htmlFor="jumlah">Jumlah</label>
          <input
            className="w-full p-2 border-[1px] border-slate-900/40 rounded mb-4 text-sm"
            type="number"
            id="jumlah"
            name="jumlah"
            value={inputs.jumlah || ''}
            placeholder="jumlah"
            step="10"
            onChange={handleChange}
            required
          />

          <label className="font-normal pl-0.5 capitalize text-left text-base mb-0.5 block" htmlFor="keterangan">Keterangan</label>
          <input
            className="w-full p-2 border-[1px] border-slate-900/40 rounded mb-4 text-sm"
            type="text"
            id="keterangan"
            name="keterangan"
            value={inputs.keterangan || ''}
            placeholder="keterangan"
            onChange={handleChange}
            required
          />

          <label className="font-normal pl-0.5 capitalize text-left text-base mb-0.5 block" htmlFor="jenis">Jenis</label>
          <select
            className="w-full p-2 border-[1px] border-slate-900/40 rounded mb-4 text-sm"
            id="jenis"
            name="jenis"
            value={inputs.jenis || 'Penerimaan'}
            onChange={handleChange}
          >
            <option>Penerimaan</option>
            <option>Pengeluaran</option>
          </select>

          <label className="font-normal pl-0.5 capitalize text-left text-base mb-0.5 block" htmlFor="date">Tanggal</label>
          <input
            className="w-full p-2 border-[1px] border-slate-900/40 rounded mb-4 text-sm"
            type="date"
            id="date"
            name="tanggal"
            value={inputs.tanggal || ''}
            placeholder="Select date"
            onChange={handleChange}
            required
          />

          <div className="mt-2">
            <button type="button" className="py-2 md:py-3 lg:py-4 w-1/2 text-lg md:text-xl lg:text-2xl text-slate-900 bg-slate-300/80 hover:bg-slate-400/80" onClick={() => dispatch(hideModal(action))}>Batal</button>
            <button className="py-2 md:py-3 lg:py-4 w-1/2 text-lg md:text-xl lg:text-2xl text-slate-50 bg-slate-800/80 hover:bg-slate-800" type="submit">Kirim</button>
          </div>

        </form>
      </Modal>
    </>
  );
}
