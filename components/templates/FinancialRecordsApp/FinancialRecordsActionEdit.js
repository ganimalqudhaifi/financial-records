import { useState } from 'react';
import Swal from 'sweetalert2';
import { globalActionType, useGlobalContext } from '../../../context';
import { modal } from '../../../utils';
import { Modal } from '../../molecules';
import { database, ref, set } from '../../../config/firebase';
import checkUID from '../../../utils/checkUID';

export default function FinancialRecordsActionEdit({ no, record }) {
  const uniqueId = `editModal${no}`;
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
  const { state, dispatch } = useGlobalContext();
  const { isDemo } = state;

  const handleChange = (event) => {
    const { name } = event.target;
    let { value } = event.target;

    if (name === 'jumlah') {
      value = parseInt(value, 10);
    }

    setInputs((values) => ({ ...values, [name]: value }));
  };

  const updateRecords = (isDemo, payload) => {
    if (!isDemo) {
      const uid = JSON.parse(checkUID());
      set(ref(database, `users/${uid}/records/${payload.id}`), payload);
    } else {
      dispatch({ type: globalActionType.UPDATE_RECORD, payload });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newInputs = {
      ...inputs,
      updatedAt: new Date().toISOString(),
      value: (inputs.jenis === 'Penerimaan' ? inputs.jumlah : inputs.jumlah * -1),
    };
    updateRecords(isDemo, newInputs);
    modal.hide(uniqueId);
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
      <button className="py-1.5 px-3 text-slate-900 font-bold hover:underline underline-offset-2 decoration-2 rounded" onClick={() => modal.show(uniqueId)}>Edit</button>

      <Modal style="modal-content-edit" id={uniqueId}>
        <h3 className="mb-4 text-xl text-left font-medium text-gray-900 dark:text-white">Mengubah Catatan</h3>
        <form onSubmit={handleSubmit} spellCheck="false" className="space-y-6 text-left">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white" htmlFor={`jumlah${uniqueId}`}>Jumlah</label>
            <input
              className="block p-2.5 w-full text-sm text-slate-900 bg-slate-50 border border-slate-400 rounded-lg focus:outline-slate-500"
              type="number"
              id={`jumlah${uniqueId}`}
              name="jumlah"
              value={inputs.jumlah}
              placeholder="jumlah"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white" htmlFor={`keterangan${uniqueId}`}>Keterangan</label>
            <input
              className="block p-2.5 w-full text-sm text-slate-900 bg-slate-50 border border-slate-400 rounded-lg focus:outline-slate-500"
              type="text"
              id={`keterangan${uniqueId}`}
              name="keterangan"
              value={inputs.keterangan}
              placeholder="keterangan"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white" htmlFor={`jenis${uniqueId}`}>Jenis</label>
            <select
              className="block p-2.5 w-full text-sm text-slate-900 bg-slate-50 border border-slate-400 rounded-lg focus:outline-slate-500"
              id={`jenis${uniqueId}`}
              name="jenis"
              value={inputs.jenis}
              onChange={handleChange}
            >
              <option>Penerimaan</option>
              <option>Pengeluaran</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white" htmlFor={`date${uniqueId}`}>Tanggal</label>
            <input
              className="block p-2.5 w-full text-sm text-slate-900 bg-slate-50 border border-slate-400 rounded-lg focus:outline-slate-500"
              type="date"
              id={`date${uniqueId}`}
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
