import { Modal } from '../../molecules';
import { useGlobalContext } from '../../../context';
import { modal, removeRecord } from '../../../utils';

export default function FinancialRecordsActionDelete({ id }) {
  const { state, removeRecordState, changePaginationIndexState } = useGlobalContext();
  const { isDemo, records, paginationIndex, sliceShow } = state;
  const uniqueId = `deleteModal${id}`;

  const deleteRecord = () => {
    if (!isDemo) {
      removeRecordState(id, removeRecord());
    } else {
      removeRecordState(id);
    }
    if (records.length - 1 + 10 <= paginationIndex * sliceShow) {
      paginationIndex > 1 && changePaginationIndexState(paginationIndex - 1);
    }
  };

  return (
    <>
      <button className="p-1.5 bg-slate-800 rounded" onClick={() => modal.show(uniqueId)}>
        <svg xmlns="http://www.w3.org/2000/svg" className="ionicon w-6 h-6 text-white" viewBox="0 0 512 512">
          <title>Trash</title>
          <path d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" />
          <path stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M80 112h352" />
          <path d="M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40M256 176v224M184 176l8 224M328 176l-8 224" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" />
        </svg>
      </button>

      <Modal id={uniqueId}>
        <div className="w-screen max-w-md">
          <svg aria-hidden="true" className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <h3 className="px-3 mb-5 text-lg lg:text-xl text-gray-500 whitespace-normal">Apakah anda yakin ingin menghapus catatan?</h3>
          <button className="inline-flex items-center px-5 py-2.5 mr-2 lg:mr-3 text-gray-100 text-center text-sm lg:text-lg font-medium bg-red-600 border border-red-800 rounded-lg hover:grayscale-[20%] focus:ring-4 focus:outline-none focus:ring-red-400/50" onClick={deleteRecord}>Hapus</button>
          <button className="px-5 py-2.5 text-gray-600 text-sm lg:text-lg font-medium hover:text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200/50" onClick={() => modal.hide(uniqueId)}>Batal</button>
        </div>
      </Modal>
    </>
  );
}
