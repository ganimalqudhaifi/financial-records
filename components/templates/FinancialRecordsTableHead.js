import {useContext, useState} from 'react'
import { Context } from './FinancialRecords'

export default function FinancialRecordsTableHead() {
  const action = "changeSaldoAwalModal"
  const {state,showModal,hideModal,closeModal,onSaldoAwal} = useContext(Context)
  const {saldoAwal} = state
  const [inputs, setInputs] = useState(saldoAwal)
  
  const handleSubmit = (e) => {
    e.preventDefault()
    onSaldoAwal(inputs)
    hideModal(action)
  }

  return(
    <thead>
      <tr>
        <th className=" py-2.5  ">No</th>
        <th >Keterangan</th>
        <th >Tanggal</th>
        <th className="  hidden lg:table-cell">Jenis</th>
        <th >Jumlah</th>
        <th >Saldo</th>
        <th >Action</th>
      </tr>
      <tr>
        <th className="py-2 px-3" colSpan="4">Saldo Awal</th>
        <th className="py-2 px-3 hidden lg:table-cell"></th>
        <th className="text-right px-3">Rp {saldoAwal.toLocaleString('id-ID')}</th>
        <td className="">
          <button className="py-1.5 px-3 my-1 bg-slate-900 text-slate-50 rounded" onClick={() => showModal(action)}>Ubah</button>
          
          <div id={action} className="modal" onClick={(e) => closeModal(e,action)}>
            <div className="modal-content p-2.5 md:p-4 lg:p-5 mt-[23%] md:mt-[15%] lg:mt-[4%] w-1/2 md:w-3/5 lg:w-1/2">
              <span className="close" onClick={() => hideModal(action)}>&times;</span>
              
              <h3 className="mb-3 md:mb-4 lg:mb-8 mt-0 lg:mt-3">Saldo Awal</h3>

              <form onSubmit={handleSubmit}>
                <input 
                type="number" 
                id="saldoAwal" 
                name="saldoAwal"
                value={inputs === 0 ? '' : inputs} 
                placeholder="Masukkan saldo awal" 
                onChange={(e) => setInputs(e.target.value)}/>

                <div className="buttons mt-1.5 md:mt-3 lg:mt-4">
                  <button className="text-slate-900 bg-slate-300/80 hover:bg-slate-400/80" type="button" onClick={() => hideModal(action)}>Batal</button>
                  <button className="text-slate-50 bg-slate-800/80 hover:bg-slate-800" type="submit">Ubah</button>
                </div>
              </form>
            </div>
          </div>
        </td>
      </tr>
    </thead>
  )
}
