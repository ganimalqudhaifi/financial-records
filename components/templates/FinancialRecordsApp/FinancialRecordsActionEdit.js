import { useState, useContext } from 'react';
import Swal from 'sweetalert2';
import { RootContext } from '../../../context';
import { hideModal, showModal, updateRecords } from '../../../context/action/demoAction';
import { Modal } from '../../molecules';

export default function FinancialRecordsActionEdit({ no, record }) {
  const action = `editModal${no}`;
  const {
    id,
    tanggal,
    keterangan,
    jenis,
    jumlah,
    createdAt,
  } = record;

  const [inputs, setInputs] = useState({
    id,
    tanggal,
    keterangan,
    jenis,
    jumlah,
    createdAt,
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
    const newInputs = {
      ...inputs,
      updatedAt: new Date().toISOString(),
      value: (inputs.jenis === 'Penerimaan' ? inputs.jumlah : inputs.jumlah * -1),
    };
    if (!isDemo) {
      updateRecords(isDemo, newInputs);
    } else {
      dispatch(updateRecords(isDemo, newInputs));
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
        <h3 className="mb-4 text-xl text-left font-medium text-gray-900 dark:text-white">Mengubah Catatan</h3>
        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white" htmlFor={`jumlah${action}`}>Jumlah</label>
            <input
              className="block p-2.5 w-full text-sm text-slate-900 bg-slate-50 border border-slate-400 rounded-lg focus:outline-slate-500"
              type="number"
              id={`jumlah${action}`}
              name="jumlah"
              value={inputs.jumlah}
              placeholder="jumlah"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white" htmlFor={`keterangan${action}`}>Keterangan</label>
            <input
              className="block p-2.5 w-full text-sm text-slate-900 bg-slate-50 border border-slate-400 rounded-lg focus:outline-slate-500"
              type="text"
              id={`keterangan${action}`}
              name="keterangan"
              value={inputs.keterangan}
              placeholder="keterangan"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white" htmlFor={`jenis${action}`}>Jenis</label>
            <select
              className="block p-2.5 w-full text-sm text-slate-900 bg-slate-50 border border-slate-400 rounded-lg focus:outline-slate-500"
              id={`jenis${action}`}
              name="jenis"
              value={inputs.jenis}
              onChange={handleChange}
            >
              <option>Penerimaan</option>
              <option>Pengeluaran</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white" htmlFor={`date${action}`}>Tanggal</label>
            <input
              className="block p-2.5 w-full text-sm text-slate-900 bg-slate-50 border border-slate-400 rounded-lg focus:outline-slate-500"
              type="date"
              id={`date${action}`}
              name="tanggal"
              value={inputs.tanggal}
              onChange={handleChange}
              required
            />
          </div>
          <button className="py-2.5 w-full font-medium text-lg text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 rounded-lg" type="submit">Kirim</button>
        </form>
      </Modal>
    </>
  );
}
