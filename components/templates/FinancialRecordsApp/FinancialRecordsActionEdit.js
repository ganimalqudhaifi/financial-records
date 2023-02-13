import { useState, useContext } from 'react';
import Swal from 'sweetalert2';
import { RootContext } from '../../../context';
import { hideModal, showModal, updateRecords } from '../../../context/action/demoAction';
import { Modal } from '../../molecules';

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
      updateRecords(isDemo, { ...inputs, value: (inputs.jenis === 'Penerimaan' ? inputs.jumlah : inputs.jumlah * -1) });
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
      <button className="py-1.5 px-3 mx-1 bg-slate-900 text-slate-50 rounded" onClick={() => dispatch(showModal(action))}>Ubah</button>
      <Modal style="modal-content-edit" action={action}>
        <p className="mt-4 text-3xl md:text-4xl lg:text-5xl text-center mb-2.5 my-2">Mengubah Catatan</p>
        <form onSubmit={handleSubmit}>
          <label className="font-normal pl-0.5 capitalize text-left text-base mb-0.5 block" htmlFor={`jumlah${action}`}>Jumlah</label>
          <input
            className="w-full p-2 border-[1px] border-slate-900/40 rounded mb-4 text-sm"
            type="number"
            id={`jumlah${action}`}
            name="jumlah"
            value={inputs.jumlah}
            placeholder="jumlah"
            onChange={handleChange}
            required
          />

          <label className="font-normal pl-0.5 capitalize text-left text-base mb-0.5 block" htmlFor={`keterangan${action}`}>Keterangan</label>
          <input
            className="w-full p-2 border-[1px] border-slate-900/40 rounded mb-4 text-sm"
            type="text"
            id={`keterangan${action}`}
            name="keterangan"
            value={inputs.keterangan}
            placeholder="keterangan"
            onChange={handleChange}
            required
          />

          <label className="font-normal pl-0.5 capitalize text-left text-base mb-0.5 block" htmlFor={`jenis${action}`}>Jenis</label>
          <select
            className="w-full p-2 border-[1px] border-slate-900/40 rounded mb-4 text-sm"
            id={`jenis${action}`}
            name="jenis"
            value={inputs.jenis}
            onChange={handleChange}
          >
            <option>Penerimaan</option>
            <option>Pengeluaran</option>
          </select>

          <label className="font-normal pl-0.5 capitalize text-left text-base mb-0.5 block" htmlFor={`date${action}`}>Tanggal</label>
          <input
            className="w-full p-2 border-[1px] border-slate-900/40 rounded mb-4 text-sm"
            type="date"
            id={`date${action}`}
            name="date"
            value={inputs.tanggal}
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
