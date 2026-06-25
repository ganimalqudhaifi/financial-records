import { useState } from "react";
import { BiTrash } from "react-icons/bi";
import { IoAlertCircleOutline } from "react-icons/io5";
import { selectDemo } from "@/features/demo/demo.selector";
import { firebaseDeleteRecord } from "@/features/records/record.service";
import { deleteRecord } from "@/features/records/records.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Modal from "../../../shared/components/Modal";

type RecordsActionDeleteProps = {
  id: string;
};

export default function RecordsActionDelete({ id }: RecordsActionDeleteProps) {
  const { isDemo } = useAppSelector(selectDemo);
  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    !isDemo ? firebaseDeleteRecord(id) : dispatch(deleteRecord(id));
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        className="inline-flex items-center justify-center p-2 text-xs font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
        aria-label={`Hapus catatan`}
      >
        <BiTrash className="w-4 h-4" />
      </button>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="text-center">
            <IoAlertCircleOutline className="mx-auto mb-4 w-14 h-14 text-amber-500" />
            <h3 className="mb-6 text-lg font-semibold text-slate-700 dark:text-slate-300">
              Apakah anda yakin ingin menghapus catatan?
            </h3>
            <div className="flex items-center justify-center gap-3">
              <button
                className="inline-flex items-center justify-center rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 cursor-pointer"
                onClick={handleDelete}
              >
                Hapus
              </button>
              <button
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 dark:border-slate-700 px-6 py-3 font-semibold text-slate-900 dark:text-slate-100 transition-colors duration-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
                onClick={() => setIsModalOpen(false)}
              >
                Batal
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
