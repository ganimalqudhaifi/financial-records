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
        <p className="mt-4 text-3xl md:text-4xl lg:text-5xl text-center">Hapus Catatan</p>
        <p className="px-3 my-7 md:my-10 lg:my-14 text-base md:text-lg lg:text-xl whitespace-normal">Apakah anda yakin ingin menghapus catatan?</p>
        <button className="py-2 md:py-3 lg:py-4 w-1/2 text-lg md:text-xl lg:text-2xl text-slate-900 bg-slate-300/80 hover:bg-slate-400/80" onClick={() => dispatch(hideModal(action))}>Batal</button>
        <button className="py-2 md:py-3 lg:py-4 w-1/2 text-lg md:text-xl lg:text-2xl text-slate-50 bg-red-500/80 hover:bg-red-500 " onClick={() => (!isDemo ? deleteRecord(isDemo, id) : dispatch(deleteRecord(isDemo, id)))}>Hapus</button>
      </Modal>
    </>
  );
}
