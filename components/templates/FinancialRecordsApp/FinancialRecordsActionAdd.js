import { useState } from 'react';
import { Modal } from '../../molecules';
import { useGlobalContext } from '../../../context';
import { modal, pushRecord, successToast } from '../../../utils';

export default function FinancialRecordsActionAdd() {
  const { state, pushRecordState } = useGlobalContext();
  const { isDemo } = state;

  const [inputs, setInputs] = useState({
    tanggal: '',
    keterangan: '',
    jenis: 'Penerimaan',
    jumlah: null,
  });

  const uniqueId = 'addModal';

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
    const newInputs = {
      ...inputs,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      value: (inputs.jenis === 'Penerimaan' ? inputs.jumlah : inputs.jumlah * -1),
    };

    if (!isDemo) {
      pushRecordState(newInputs, pushRecord());
    } else {
      pushRecordState({ ...newInputs, id: new Date().toISOString() });
    }
    modal.hide(uniqueId);
    setInputs({
      tanggal: '',
      keterangan: '',
      jenis: 'Penerimaan',
      jumlah: null,
    });

    successToast('Data berhasil ditambahkan');
  };

  return (
    <>
      <button className="py-1.5 md:py-2 px-3 md:px-4 bg-slate-800 text-slate-50 rounded-[3px]" onClick={() => modal.show(uniqueId)}>Tambah</button>

      <Modal style="modal-content-edit" id={uniqueId}>
        <h3 className="mb-4 text-xl text-left font-medium text-gray-900 dark:text-white">Membuat Catatan Baru</h3>
        <form onSubmit={handleSubmit} spellCheck="false" className="space-y-6">
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
