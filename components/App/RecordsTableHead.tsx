import { SyntheticEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAccounts,
  updateAccount,
} from "@/lib/redux/features/accounts/accountsSlice";
import Modal from "../Modal";

export default function RecordsTableHead() {
  const { selectedAccount } = useSelector(selectAccounts);
  const dispatch = useDispatch();

  const [initialBalance, setInitialBalance] = useState(0);

  const [inputs, setInputs] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (Object.keys(selectedAccount).length) {
      setInputs(selectedAccount.initialBalance);
      setInitialBalance(selectedAccount.initialBalance);
    }
  }, [selectedAccount]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setInitialBalance(inputs);
    dispatch(updateAccount({ ...selectedAccount, initialBalance: inputs }));
    setIsModalOpen(false);
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
        <th colSpan={4}>Saldo Awal</th>
        <th />
        <th>{`Rp ${initialBalance.toLocaleString("id-ID")}`}</th>
        <td>
          <button
            className="py-1.5 px-3 text-slate-900 font-bold hover:underline underline-offset-2 decoration-2 rounded"
            onClick={() => setIsModalOpen(true)}
          >
            Edit
          </button>

          {isModalOpen && (
            <Modal onClose={() => setIsModalOpen(false)}>
              <div className="w-screen max-w-sm">
                <h3 className="mb-4 text-xl text-left font-medium text-gray-900 dark:text-white">
                  Saldo Awal
                </h3>
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
                    <button
                      type="submit"
                      className="py-2.5 w-full font-medium text-lg text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 rounded-lg"
                    >
                      Ubah
                    </button>
                  </div>
                </form>
              </div>
            </Modal>
          )}
        </td>
      </tr>
    </>
  );
}
