import { useContext } from 'react'
import { RootContext } from '../../context';
import { showModal, hideModal, deleteRecord } from '../../context/action/demoAction';
import { Button, Text, Gap } from '../atoms';
import { Modal } from '../molecules';

export default function FinancialRecordsActionDelete({ id }) {
  const action = "deleteModal" + id
  const { dispatch } = useContext(RootContext)

  return (
    <>
      <Button title="Hapus" style="delete" onClick={() => dispatch(showModal(action))} />

      <Modal style="modal-content-delete" action={action}>
        <Text title="Hapus Catatan" style="modal-title" />
        <Text title="Apakah anda yakin ingin menghapus catatan?" style="modal-text" />
        <Button title="Batal" style="modal-cancle" onClick={() => dispatch(hideModal(action))} />
        <Button title="Hapus" style="modal-delete" onClick={() => dispatch(deleteRecord(id))} />
      </Modal>
    </>
  );
}