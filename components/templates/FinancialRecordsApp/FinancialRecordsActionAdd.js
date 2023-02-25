import { useState, useContext } from 'react';
import Swal from 'sweetalert2';
import { RootContext } from '../../../context';
import { hideModal, showModal, createRecord } from '../../../context/action/demoAction';
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
        <h3 className="mb-4 text-xl text-left font-medium text-gray-900 dark:text-white">Membuat Catatan Baru</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1.5 text-sm font-medium text-gray-900 dark:text-white" htmlFor="jumlah">Jumlah</label>
            <input
              className="block p-2.5 w-full text-sm text-slate-900 bg-slate-50 border border-slate-400 rounded-lg focus:outline-slate-500"
              type="number"
              id="jumlah"
              name="jumlah"
              value={inputs.jumlah || ''}
              placeholder="jumlah"
              step="10"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white" htmlFor="keterangan">Keterangan</label>
            <input
              className="block p-2.5 w-full text-sm text-slate-900 bg-slate-50 border border-slate-400 rounded-lg focus:outline-slate-500"
              type="text"
              id="keterangan"
              name="keterangan"
              value={inputs.keterangan || ''}
              placeholder="keterangan"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white" htmlFor="jenis">Jenis</label>
            <select
              className="block p-2.5 w-full text-sm text-slate-900 bg-slate-50 border border-slate-400 rounded-lg focus:outline-slate-500"
              id="jenis"
              name="jenis"
              value={inputs.jenis || 'Penerimaan'}
              onChange={handleChange}
            >
              <option>Penerimaan</option>
              <option>Pengeluaran</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white" htmlFor="date">Tanggal</label>
            <input
              className="block p-2.5 w-full text-sm text-slate-900 bg-slate-50 border border-slate-400 rounded-lg focus:outline-slate-500"
              type="date"
              id="date"
              name="tanggal"
              value={inputs.tanggal || ''}
              placeholder="Select date"
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
