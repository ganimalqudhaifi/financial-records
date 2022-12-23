import { useContext, useState } from 'react';
import { RootContext } from '../../../context';
import { changeSaldoAwal, hideModal, showModal } from '../../../context/action/demoAction';
import {
  Button, Input, Text, Wrapper,
} from '../../atoms';
import { Modal } from '../../molecules';

export default function FinancialRecordsTableHead() {
  const action = 'changeSaldoAwalModal';
  const { state, dispatch } = useContext(RootContext);
  const { saldoAwal } = state;
  const [inputs, setInputs] = useState(saldoAwal);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(changeSaldoAwal(inputs));
    dispatch(hideModal(action));
  };

  return (
    <>
      <tr>
        <th>No</th>
        <th>Keterangan</th>
        <th>Tanggal</th>
        <th>Jenis</th>
        <th>Jumlah</th>
        <th>Saldo</th>
        <th>Action</th>
      </tr>
      <tr>
        <th colSpan="4">Saldo Awal</th>
        <th />
        <th>
          Rp
          {' '}
          {saldoAwal.toLocaleString('id-ID')}
        </th>
        <td>
          <Button style="modal-saldo-awal" title="Ubah" onClick={() => dispatch(showModal(action))} />

          <Modal style="modal-content-saldo-awal" action={action}>
            <Text style="modal-title-saldo-awal" title="Saldo Awal" />
            <form onSubmit={handleSubmit}>
              <Input
                style="record"
                type="number"
                id="saldoAwal"
                name="saldoAwal"
                value={inputs === 0 ? '' : inputs}
                placeholder="Masukkan saldo awal"
                onChange={(e) => setInputs(e.target.value)}
              />

              <Wrapper style="modal-button-saldo-awal">
                <Button style="modal-cancle" title="Batal" type="button" onClick={() => dispatch(hideModal(action))} />
                <Button style="modal-edit" title="Ubah" type="submit" />
              </Wrapper>
            </form>
          </Modal>

        </td>
      </tr>
    </>
  );
}
