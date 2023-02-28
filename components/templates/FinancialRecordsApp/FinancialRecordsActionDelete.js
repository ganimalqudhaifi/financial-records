import { useContext } from 'react';
import { RootContext } from '../../../context';
import { showModal, hideModal, deleteRecord } from '../../../context/action/demoAction';
import { Modal } from '../../molecules';

export default function FinancialRecordsActionDelete({ id }) {
  const action = `deleteModal${id}`;
  const { state, dispatch } = useContext(RootContext);
  const { isDemo } = state;

  return (
    <>
      <button className="py-1 px-2 mx-1 border-slate-900 border-2 rounded" onClick={() => dispatch(showModal(action))}>Hapus</button>
      <Modal style="modal-content-delete" action={action}>
        <svg aria-hidden="true" className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <h3 className="px-3 mb-5 text-lg lg:text-xl text-gray-500 whitespace-normal">Apakah anda yakin ingin menghapus catatan?</h3>
        <button className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm lg:text-lg inline-flex items-center px-5 py-2.5 text-center mr-2 lg:mr-3" onClick={() => dispatch(deleteRecord(isDemo, id))}>Hapus</button>
        <button className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm lg:text-lg font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" onClick={() => dispatch(hideModal(action))}>Batal</button>
      </Modal>
    </>
  );
}
