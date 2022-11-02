import {useState,useContext} from 'react'
import { Context } from './FinancialRecords'
import Swal from 'sweetalert2';

export default function FinancialRecordsActionEdit({no,record}) {
  const action = "editModal"+no
  const {id,tanggal,keterangan,jenis,jumlah} = record
  const [inputs, setInputs] = useState({
    id:id,
    tanggal: tanggal,
    keterangan: keterangan,
    jenis: jenis,
    jumlah: jumlah
  })
  const {showModal,hideModal,closeModal,addRecord,onDeleteHandler} = useContext(Context)

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (e) => {
    console.log({inputs})
    e.preventDefault()
    onDeleteHandler(id)
    addRecord(inputs)
    hideModal(action)
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: false,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: 'Data berhasil diubah'
    })
  }

  return(
    <>
      <button className="py-1.5 px-3 mx-1 bg-slate-900 text-slate-50 rounded" onClick={() => showModal(action)}>Ubah</button>
      
      <div id={action} className="modal" onClick={(e) => closeModal(e,action)}>
        <div className="modal-content p-3 md:p-4 lg:p-5 mt-[23%] md:mt-[15%] lg:mt-[4%] w-7/12 lg:w-1/2">
          <span className="close" onClick={() => hideModal(action)}>&times;</span>

          <h3 className="mb-2.5 my-2">Mengubah Catatan</h3>
          
          <form onSubmit={handleSubmit}>
            <label htmlFor={"jumlah"+action}>Jumlah</label>
            <input 
            type="number" 
            id={"jumlah"+action}
            name={"jumlah"}
            value={inputs.jumlah} 
            placeholder="jumlah" 
            onChange={handleChange} 
            required/>

            <label htmlFor={"keterangan"+action}>keterangan</label>
            <input 
            type="text" 
            id={"keterangan"+action} 
            name={"keterangan"} 
            value={inputs.keterangan} 
            placeholder="keterangan" 
            onChange={handleChange} 
            required/>

            <label htmlFor={"jenis"+action}>Jenis</label>
            <select 
            id={"jenis"+action} 
            name={"jenis"} 
            value={inputs.jenis} 
            onChange={handleChange}>
              <option>Penerimaan</option>
              <option>Pengeluaran</option>
            </select>

            <label htmlFor={"date"+action}>Tanggal</label>
            <input 
            type="date" 
            id={"date"+action} 
            name={"date"} 
            value={inputs.tanggal} 
            onChange={handleChange} 
            required/>

            <div className="buttons mt-2">
              <button className="text-slate-900 bg-slate-300/80 hover:bg-slate-400/80" type="button" onClick={() => hideModal(action)}>Batal</button>
              <button className="text-slate-50 bg-slate-800/80 hover:bg-slate-800" type="submit">Kirim</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}