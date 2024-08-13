import { ChangeEvent, SyntheticEvent, useState } from "react";
import { useDispatch } from "react-redux";
import categories from "@/data/categories.json";
import { updateRecord } from "@/lib/redux/features/records/recordsSlice";
import { Record } from "../../types";
import { modal, successToast } from "../../utils";
import Modal from "../Modal";
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
  const dispatch = useDispatch();

  const uniqueId = `editModal${no}`;

  const [inputs, setInputs] = useState(record);

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
    dispatch(updateRecord(newInputs));
    modal.hide(uniqueId);

    successToast("Data berhasil diubah");
  };

  return (
    <>
      <button
        className="py-1.5 px-3 text-slate-900 font-bold hover:underline underline-offset-2 decoration-2 rounded"
        onClick={() => modal.show(uniqueId)}
      >
        Edit
      </button>

      <Modal id={uniqueId}>
        <div className="w-screen max-w-md">
          <h3 className="mb-4 text-xl text-left font-medium text-gray-900 dark:text-white">
            Mengubah Catatan
          </h3>
          <form
            onSubmit={handleSubmit}
            spellCheck="false"
            className="space-y-6 text-left"
          >
            <InputField
              label="Jumlah"
              type="number"
              id={`amount${uniqueId}`}
              name="amount"
              value={inputs.amount}
              onChange={handleChange}
              placeholder="Masukkan Jumlah"
              required
            />
            <InputField
              label="Keterangan"
              id={`description${uniqueId}`}
              name="description"
              value={inputs.description}
              onChange={handleChange}
              placeholder="Masukkan Keterangan"
              required
            />
            <SelectField
              label="Kategori"
              id={`categoryId${uniqueId}`}
              name="categoryId"
              value={inputs.categoryId}
              onChange={handleChange}
              options={categories}
            />
            <InputField
              label="Tanggal"
              type="date"
              id={`date${uniqueId}`}
              name="date"
              value={inputs.date as string}
              onChange={handleChange}
              placeholder="Pilih Tanggal"
              required
            />
            <button
              className="py-2.5 w-full font-medium text-lg text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 rounded-lg"
              type="submit"
            >
              Terapkan
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
}
