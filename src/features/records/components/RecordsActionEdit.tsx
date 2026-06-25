import { ChangeEvent, SyntheticEvent, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { selectDemo } from "@/features/demo/demo.selector";
import { firebaseUpdateRecord } from "@/features/records/record.service";
import { updateRecord } from "@/features/records/records.slice";
import { Record } from "@/features/records/records.types";
import categories from "@/shared/data/categories.json";
import { successToast } from "@/shared/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Modal from "../../../shared/components/Modal";
import InputField from "./InputField";
import SelectField from "./SelectField";

interface RecordsActionEditProps {
  no: number;
  record: Record;
}

export default function RecordsActionEdit({
  no,
  record,
}: RecordsActionEditProps) {
  const { isDemo } = useAppSelector(selectDemo);
  const dispatch = useAppDispatch();

  const [inputs, setInputs] = useState(record);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = event.target;

    setInputs((prevState) => ({
      ...prevState,
      [name]: type === "number" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const newInputs = {
      ...inputs,
      updatedAt: new Date().toISOString(),
      value: inputs.categoryId < 200 ? inputs.amount : inputs.amount * -1,
    };
    !isDemo
      ? firebaseUpdateRecord(newInputs)
      : dispatch(updateRecord(newInputs));

    setIsModalOpen(false);
    successToast("Data berhasil diubah");
  };

  return (
    <>
      <button
        className="inline-flex items-center justify-center p-2 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
        aria-label={`Edit catatan ${no}`}
      >
        <BiEdit className="w-4 h-4" />
      </button>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h3 className="mb-6 text-xl font-semibold text-slate-900 dark:text-slate-100">
            Mengubah Catatan
          </h3>
          <form
            onSubmit={handleSubmit}
            spellCheck="false"
            className="space-y-5"
          >
            <InputField
              label="Jumlah"
              type="number"
              id={`amount`}
              name="amount"
              value={inputs.amount}
              onChange={handleChange}
              placeholder="Masukkan Jumlah"
              required
            />
            <InputField
              label="Keterangan"
              id={`description`}
              name="description"
              value={inputs.description}
              onChange={handleChange}
              placeholder="Masukkan Keterangan"
              required
            />
            <SelectField
              label="Kategori"
              id={`categoryId`}
              name="categoryId"
              value={inputs.categoryId}
              onChange={handleChange}
              options={categories}
            />
            <InputField
              label="Tanggal"
              type="date"
              id={`date`}
              name="date"
              value={inputs.date as string}
              onChange={handleChange}
              placeholder="Pilih Tanggal"
              required
            />
            <button
              className="w-full inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              type="submit"
            >
              Terapkan
            </button>
          </form>
        </Modal>
      )}
    </>
  );
}
