import {useContext} from 'react'
import { Context } from './FinancialRecords'

export default function FinancialRecordsActionDelete({id}) {
  const action = "deleteModal"+id
  const {showModal,hideModal,closeModal,onDeleteHandler} = useContext(Context)
  
  return(
    <>
    <button className="py-1 px-2 mx-1 border-slate-900 border-2 rounded" onClick={() => showModal(action)}>Hapus</button>
    
    <div id={action} className="modal" onClick={(e) => closeModal(e,action)}>
      <div className="modal-content p-2.5 md:p-4 lg:p-5 mt-[23%] md:mt-[15%] lg:mt-[4%] w-1/2 md:w-3/5 lg:w-1/2">
        <div className="">
          <span className="close" onClick={() => hideModal(action)}>&times;</span>
          
          <h3 className="mt-4">Hapus Catatan</h3>

          <p className="px-3 my-7 md:my-10 lg:my-14 text-base md:text-lg lg:text-xl whitespace-normal">Apakah anda yakin ingin menghapus catatan?</p>
          
          <div className="buttons">
            <button className="text-slate-900 bg-slate-300/80 hover:bg-slate-400/80" onClick={() => hideModal(action)}>Batal</button>
            <button className="text-slate-50 bg-red-500/80 hover:bg-red-500" onClick={() => onDeleteHandler(id)}>Hapus</button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}