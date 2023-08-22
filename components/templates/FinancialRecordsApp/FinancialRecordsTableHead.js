import { useState } from 'react';
import { globalActionType, useGlobalContext } from '../../../context';
import { modal } from '../../../utils';
import checkUID from '../../../utils/checkUID';
import { Modal } from '../../molecules';
import {
  database, ref, set,
} from '../../../config/firebase';

export default function FinancialRecordsTableHead() {
  const { state, dispatch } = useGlobalContext();
  const { isDemo, saldoAwal } = state;

  const uniqueId = 'changeSaldoAwalModal';
  const [inputs, setInputs] = useState(saldoAwal);

  const changeSaldoAwal = (isDemo, payload) => {
    if (!isDemo) {
      const uid = JSON.parse(checkUID());
      set(ref(database, `users/${uid}/saldoAwal`), payload);
    }
    dispatch({ type: globalActionType.CHANGE_SALDO_AWAL, payload });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    changeSaldoAwal(isDemo, inputs);
    modal.hide(uniqueId);
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
          <button className="py-1.5 px-3 text-slate-900 font-bold hover:underline underline-offset-2 decoration-2 rounded" onClick={() => modal.show(uniqueId)}>Edit</button>

          <Modal style="modal-content-saldo-awal" id={uniqueId}>
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
