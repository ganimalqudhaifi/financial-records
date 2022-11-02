import { useState, createContext } from 'react';
import { getData } from '../../utils/data';
import FinancialRecordsActionAdd from './FinancialRecordsActionAdd';
import FinancialRecordsSlice from './FinancialRecordsSlice';
import FinancialRecordsFilterPeriod from './FinancialRecordsFilterPeriod';
import FinancialRecordsSearch from './FinancialRecordsSearch';
import FinancialRecordsTable from './FinancialRecordsTable';
import FinancialRecordsPaginantion from './FinancialRecordsPagination';
import FinancialRecordsInformation from './FinancialRecordsInformation';
import FinancialRecordsChart from './FinancialRecordsChart';
import Headers from '../Headers';
import Footers from '../Footers';

export const Context = createContext()

export default function FinancialRecords() {
  const [state, setState] = useState({
    records: getData(),
    saldoAwal: 0,
    searchKeyword: '',
    sliceShow: 10,
    paginationIndex: 1,
    filterPeriod: '',
  })

  const onSearchHandler = (searchKeyword) => {
    setState((prevState) => {
      return {
        ...prevState,
        searchKeyword: searchKeyword.toLowerCase()
      }
    })
  }

  const showModal = (action) => {
    document.getElementById(action).style.display="block"
  }

  const hideModal = (action) => {
    document.getElementById(action).style.display="none"
  }

  const closeModal = (e,action) => {
    if (e.target === document.getElementById(action)) {
      hideModal(action)
    }
  }

  const addRecord = ({jumlah, keterangan, jenis, tanggal, id}) => {
    setState((prevState) => {
      return {
        ...prevState,
        records: [
          ...prevState.records,
          {
            id: id ? id : +new Date(),
            jumlah: parseInt(jumlah),
            keterangan,
            jenis,
            tanggal,
          }
        ]
      }
    })
  }

  const onSlice = (sliceShow) => {
    setState((prevState) => {
      return {
        ...prevState,
        sliceShow: parseInt(sliceShow)
      }
    })
  }

  const onFilterPeriod = (period) => {
    setState((prevState) => {
      return {
        ...prevState,
        filterPeriod: period,
      }
    })
  }

  const onDeleteHandler = (id) => {
    const records = state.records.filter(record => record.id !== id)
    setState((prevState) => {
      return {
        ...prevState,
        records,
      }
    })
  }

  const onSaldoAwal = (saldoAwal) => {
    setState((prevState) => {
      return {
        ...prevState,
        saldoAwal: parseInt(saldoAwal),
      }
    })
  }

  const onPagination = (index) => {
    setState((prevState) => {
      return {
        ...prevState,
        paginationIndex: index,
      }
    })
  }

  const store = { state, onSearchHandler, showModal, hideModal, closeModal, addRecord, onSlice, onFilterPeriod, onDeleteHandler, onSaldoAwal, onPagination }


  return(
    <Context.Provider value={store}>
      <div className="px-1 md:px-3 lg:px-20 w-fit h-full flex flex-col">
        <Headers/>
        <div className="flex-1">
        <div className="lg:flex lg:justify-between">
          <div className="lg:w-full lg:mr-6">
            <div className="flex justify-between flex-wrap px-0.5 mb-1 md:mb-0.5">
              <div>
                <FinancialRecordsActionAdd/>
                <FinancialRecordsSlice/>
              </div>
              <div className="flex items-stretch">
                <FinancialRecordsFilterPeriod/>
                <FinancialRecordsSearch/>
              </div>
            </div>
            <FinancialRecordsTable/>
            <FinancialRecordsPaginantion/>
          </div>
          <hr className="my-6"/>
          <div className="flex justify-evenly mt-4 lg:mt-0 lg:block">
            <FinancialRecordsInformation/>
            <FinancialRecordsChart/>
          </div>
        </div>
        </div>
        <Footers/>
      </div>
    </Context.Provider>
  )
}