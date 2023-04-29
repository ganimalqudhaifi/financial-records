import { useState } from 'react';
import { useGlobalContext } from '../../../context';
import {
  changeSaldoAwal, hideModal, showModal,
} from '../../../context/action/demoAction';
import { Modal } from '../../molecules';

export default function FinancialRecordsTableHead() {
  const { state, dispatch } = useGlobalContext();
  const { isDemo, saldoAwal } = state;

  const action = 'changeSaldoAwalModal';
  const [inputs, setInputs] = useState(saldoAwal);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(changeSaldoAwal(isDemo, inputs));
    dispatch(hideModal(action));
  };

  return (
    <>
      <tr>
        <th>No</th>
        <th>Keterangan</th>
        <th>Tanggal</th>
        <th>Jenis</th>
        <th>Jumlah</th>
        <th>Saldo</th>
        <th>Action</th>
      </tr>
      <tr>
        <th colSpan="4">Saldo Awal</th>
        <th />
        <th>
          {'Rp '}
          {saldoAwal.toLocaleString('id-ID')}
        </th>
        <td>
          <button className="py-1.5 px-3 text-slate-900 font-bold hover:underline underline-offset-2 decoration-2 rounded" onClick={() => dispatch(showModal(action))}>Edit</button>

          <Modal style="modal-content-saldo-awal" action={action}>
            <h3 className="mb-4 text-xl text-left font-medium text-gray-900 dark:text-white">Saldo Awal</h3>
            <form onSubmit={handleSubmit}>
              <input
                className="block p-2.5 mb-6 w-full text-sm text-slate-900 bg-slate-50 border border-slate-400 rounded-lg focus:outline-slate-500"
                type="number"
                id="saldoAwal"
                name="saldoAwal"
                value={inputs}
                placeholder="Masukkan saldo awal"
                onChange={(e) => setInputs(parseFloat(e.target.value))}
              />

              <div className="mt-1.5 md:mt-3 lg:mt-4">
                <button type="submit" className="py-2.5 w-full font-medium text-lg text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 rounded-lg">Ubah</button>
              </div>
            </form>
          </Modal>

        </td>
      </tr>
    </>
  );
}
