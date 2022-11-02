import FinancialRecordsActionEdit from "./FinancialRecordsActionEdit";
import FinancialRecordsActionDelete from "./FinancialRecordsActionDelete";

function FinancialRecordsTableBody({no,record,saldoAkhir}) {
  const {id,tanggal,keterangan,jenis,jumlah} = record

  const remake = (date) => {
    const d = new Date(date);
      const year = d.getFullYear();
      const month = d.getMonth();
      const day = d.getDate();
      
      const arrMonth = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"];
      return day + ' ' + arrMonth[month] + ' ' + year;
  }

  return (
    <tr >
      <td >{no}</td>
      <td className="text-left whitespace-normal">{keterangan}</td>
      <td className="text-right">{remake(tanggal)}</td>
      <td className="hidden lg:table-cell">{jenis}</td>
      {
        jenis === "Penerimaan"
      ? <td className="text-right text-green-600">Rp {jumlah.toLocaleString('id-ID')}</td>
      : <td className="text-right text-red-600">Rp {jumlah.toLocaleString('id-ID')}</td>
      }
      <td className="text-right">Rp {saldoAkhir.toLocaleString('id-ID')}</td>
      <td >
      <FinancialRecordsActionEdit
        no={no}
        record={record}
      />
      <FinancialRecordsActionDelete 
      id={id}/>
      </td>
    </tr>
  );
}

export default FinancialRecordsTableBody;