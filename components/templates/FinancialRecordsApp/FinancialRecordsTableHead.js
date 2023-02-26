import { useContext, useEffect, useState } from 'react';
import { database, onValue, ref } from '../../../config/firebase';
import { RootContext } from '../../../context';
import {
  changeSaldoAwal, hideModal, showModal,
} from '../../../context/action/demoAction';
import checkUID from '../../../utils/checkUID';
import { Modal } from '../../molecules';

export default function FinancialRecordsTableHead() {
  const action = 'changeSaldoAwalModal';
  const { state, dispatch } = useContext(RootContext);
  const { isDemo, saldoAwal } = state;
  const [inputs, setInputs] = useState(saldoAwal);

  useEffect(() => {
    const uid = JSON.parse(checkUID());
    const recordsRef = ref(database, `users/${uid}/saldoAwal`);
    if (!isDemo) {
      onValue(recordsRef, (snapshot) => {
        const payload = snapshot.val();
        dispatch(changeSaldoAwal(isDemo, payload));
        setInputs(snapshot.val());
      });
    }
  }, [dispatch, isDemo]);

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
          <button className="py-1.5 px-3 my-1 bg-slate-900 text-slate-50 rounded" onClick={() => dispatch(showModal(action))}>Ubah</button>
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
