import {useState,useContext} from 'react'
import { Context } from './FinancialRecords'
import Swal from 'sweetalert2';

export default function FinancialRecordsActionAdd() {
  const action = "addModal"
  const [inputs, setInputs] = useState({
    tanggal: '',
    keterangan: '',
    jenis: 'Penerimaan',
    jumlah: '',
  })
  const {showModal,hideModal,closeModal,addRecord} = useContext(Context)

  const handleChange = (event) => {
    const name = event.target.name
    let value = event.target.value

    if (name === "jumlah") {
      value = parseInt(value)
    }

    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    addRecord(inputs)
    hideModal(action)
    setInputs(() => {
      return {
        tanggal: '',
        keterangan: '',
        jenis: 'Penerimaan',
        jumlah: '',
      }
    })
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
      title: 'Data berhasil ditambahkan'
    })
  }

  return(
    <>
      <button className=" py-1.5 md:py-2 px-3 md:px-4 bg-slate-800 text-slate-50 rounded-[3px]" onClick={() => showModal(action)}>Tambah</button>

      <div id={action} className="modal" onClick={(e) => closeModal(e,action)}>
        <div className="modal-content p-3 md:p-4 lg:p-5 mt-[23%] md:mt-[15%] lg:mt-[4%] w-7/12 lg:w-1/2">
          <span className="close" onClick={() => hideModal(action)}>&times;</span>

          <h3 className="mb-2">Menambah Catatan</h3>

          <form onSubmit={handleSubmit}>
            <label htmlFor="jumlah">Jumlah</label>
            <input
            type="number"
            id="jumlah"
            name="jumlah"
            value={inputs.jumlah || ""}
            placeholder="jumlah"
            step="10"
            onChange={handleChange} 
            required/>

            <label htmlFor="keterangan">Keterangan</label>
            <input 
            type="text" 
            id="keterangan"
            name="keterangan"
            value={inputs.keterangan || ""}
            placeholder="keterangan" 
            onChange={handleChange} 
            required/>

            <label htmlFor="jenis">Jenis</label>
            <select 
            id="jenis"
            name="jenis"
            value={inputs.jenis || "Penerimaan"}
            onChange={handleChange}>
              <option>Penerimaan</option>
              <option>Pengeluaran</option>
            </select>

            <label htmlFor="date">Tanggal</label>
            <input 
            type="date"
            id="date"
            name="tanggal"
            value={inputs.tanggal || ""}
            palceholder="Select date" 
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
  )
}