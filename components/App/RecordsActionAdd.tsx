import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { modal, successToast } from '../../utils';
import { useAccounts, useRecords } from '../../hooks';

import Modal from '../Modal';

const categories = [
  { id: 101, name: 'Pendapatan' },
  { id: 201, name: 'Pengeluaran' },
  { id: 202, name: 'Tagihan Utilitas' },
  { id: 203, name: 'Makanan' },
  { id: 204, name: 'Transportasi' },
  { id: 205, name: 'Tempat Tinggal' },
  { id: 206, name: 'Hiburan' },
];

const initialInputs = {
  date: '',
  description: '',
  categoryId: categories[0].id,
  amount: 0,
};

export default function RecordsActionAdd() {
  const { selectedAccount } = useAccounts();
  const { addRecord } = useRecords();
  const uniqueId = 'addModal';

  const [inputs, setInputs] = useState(initialInputs);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    let { value } = event.target;

    if (name === 'amount') {
      value = parseInt(value, 10);
    }

    if (name === 'categoryId') {
      value = parseInt(value, 10);
    }

    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const newInputs = {
      ...inputs,
      value: (inputs.categoryId < 200 ? inputs.amount : inputs.amount * -1),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      accountId: selectedAccount.id!,
    };
    addRecord(newInputs);
    modal.hide(uniqueId);
    setInputs(initialInputs);

    successToast('Data berhasil ditambahkan');
  };

  return (
    <>
      <button className="py-1.5 md:py-2 px-3 md:px-4 bg-slate-800 text-slate-50 rounded-[3px]" onClick={() => modal.show(uniqueId)}>Tambah</button>

      <Modal id={uniqueId}>
        <div className="w-screen max-w-md">
          <h3 className="mb-4 text-xl text-left font-medium text-gray-900">Membuat Catatan Baru</h3>
          <form onSubmit={handleSubmit} spellCheck="false" className="space-y-6">
            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-900" htmlFor="amount">Jumlah</label>
              <input
                className="block p-2.5 w-full text-sm text-slate-900 bg-slate-50 border border-slate-400 rounded-lg focus:outline-slate-500 placeholder:italic"
                type="number"
                id="amount"
                name="amount"
                value={inputs.amount || ''}
                placeholder="Masukkan Jumlah"
                step="1000"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white" htmlFor="description">Keterangan</label>
              <input
                className="block p-2.5 w-full text-sm text-slate-900 bg-slate-50 border border-slate-400 rounded-lg focus:outline-slate-500 placeholder:italic"
                type="text"
                id="description"
                name="description"
                value={inputs.description || ''}
                placeholder="Masukkan Keterangan"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white" htmlFor="categoryId">Kategori</label>
              <select
                className="block p-2.5 w-full text-sm text-slate-900 bg-slate-50 border border-slate-400 rounded-lg focus:outline-slate-500"
                id="categoryId"
                name="categoryId"
                value={inputs.categoryId}
                onChange={handleChange}
              >
                {
                  categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))
                }
              </select>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white" htmlFor="date">Tanggal</label>
              <input
                className="block p-2.5 w-full text-sm text-slate-900 bg-slate-50 border border-slate-400 rounded-lg focus:outline-slate-500"
                type="date"
                id="date"
                name="date"
                value={inputs.date || ''}
                onChange={handleChange}
                required
              />
            </div>
            <button className="py-2.5 w-full font-medium text-lg text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 rounded-lg" type="submit">Kirim</button>
          </form>
        </div>
      </Modal>
    </>
  );
}
