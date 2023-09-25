import { useEffect, useState } from 'react';
import { useGlobalContext } from '../../../context';
import { useAccounts } from '../../../hooks';
import { modal } from '../../../utils';
import { Modal } from '../../molecules';

export default function FinancialRecordsTableHead() {
  const { editAccount } = useAccounts();
  const { state, changeInitialBalanceState } = useGlobalContext();
  const { selectedAccount } = state;

  const uniqueId = 'changeInitialBalanceModal';
  const [inputs, setInputs] = useState(0);

  useEffect(() => {
    Object.keys(selectedAccount).length && setInputs(selectedAccount.initialBalance);
  }, [selectedAccount]);

  const handleSubmit = (e) => {
    e.preventDefault();
    changeInitialBalanceState(inputs);
    const { id, ...rest } = selectedAccount;
    editAccount(id, { ...rest, initialBalance: inputs });
    modal.hide(uniqueId);
  };

  return (
    <>
      <tr>
        <th>No</th>
        <th>Keterangan</th>
        <th>Tanggal</th>
        <th>Kategori</th>
        <th>Jumlah</th>
        <th>Saldo</th>
        <th>Action</th>
      </tr>
      <tr>
        <th colSpan="4">Saldo Awal</th>
        <th />
        <th>{`Rp ${inputs.toLocaleString('id-ID')}`}</th>
        <td>
          <button className="py-1.5 px-3 text-slate-900 font-bold hover:underline underline-offset-2 decoration-2 rounded" onClick={() => modal.show(uniqueId)}>Edit</button>

          <Modal id={uniqueId}>
            <div className="w-screen max-w-sm">
              <h3 className="mb-4 text-xl text-left font-medium text-gray-900 dark:text-white">Saldo Awal</h3>
              <form onSubmit={handleSubmit}>
                <input
                  className="block p-2.5 mb-6 w-full text-sm text-slate-900 bg-slate-50 border border-slate-400 rounded-lg focus:outline-slate-500"
                  type="number"
                  id="initialBalance"
                  name="initialBalance"
                  value={inputs}
                  placeholder="Masukkan saldo awal"
                  onChange={(e) => setInputs(parseFloat(e.target.value))}
                />

                <div className="mt-1.5 md:mt-3 lg:mt-4">
                  <button type="submit" className="py-2.5 w-full font-medium text-lg text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 rounded-lg">Ubah</button>
                </div>
              </form>
            </div>
          </Modal>

        </td>
      </tr>
    </>
  );
}
