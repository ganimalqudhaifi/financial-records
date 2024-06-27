import { IoAlertCircleOutline, IoTrashOutline } from "react-icons/io5";
import { useRecords } from "../../hooks";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { modal } from "../../utils";
import Modal from "../Modal";

type RecordsActionDeleteProps = {
  id: string;
};

export default function RecordsActionDelete({ id }: RecordsActionDeleteProps) {
  const { state, changePaginationIndexState } = useGlobalContext();
  const { paginationIndex, sliceShow } = state;
  const { records, deleteRecord } = useRecords();
  const uniqueId = `deleteModal${id}`;

  const handleDelete = () => {
    deleteRecord(id);
    if (records.length - 1 + 10 <= paginationIndex * sliceShow) {
      paginationIndex > 1 && changePaginationIndexState(paginationIndex - 1);
    }
  };

  return (
    <>
      <button
        className="p-1.5 bg-slate-800 rounded"
        onClick={() => modal.show(uniqueId)}
      >
        <IoTrashOutline className="w-6 h-6 text-white" />
      </button>

      <Modal id={uniqueId}>
        <div className="w-screen max-w-md">
          <IoAlertCircleOutline className="mx-auto mb-4 text-gray-400 w-14 h-14" />
          <h3 className="px-3 mb-5 text-lg lg:text-xl text-gray-500 whitespace-normal">
            Apakah anda yakin ingin menghapus catatan?
          </h3>
          <button
            className="inline-flex items-center px-5 py-2.5 mr-2 lg:mr-3 text-gray-100 text-center text-sm lg:text-lg font-medium bg-red-600 border border-red-800 rounded-lg hover:grayscale-[20%] focus:ring-4 focus:outline-none focus:ring-red-400/50"
            onClick={handleDelete}
          >
            Hapus
          </button>
          <button
            className="px-5 py-2.5 text-gray-600 text-sm lg:text-lg font-medium hover:text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200/50"
            onClick={() => modal.hide(uniqueId)}
          >
            Batal
          </button>
        </div>
      </Modal>
    </>
  );
}
