import { useRecords } from "../../hooks";
import { Record } from "../../types";
import { modal, successToast } from "../../utils";
import Modal from "../Modal";
import { ChangeEvent, SyntheticEvent, useState } from "react";

type RecordsActionEditProps = {
  no: number;
  record: Record;
};

export default function RecordsActionEdit({
  no,
  record,
}: RecordsActionEditProps) {
  const { editRecord } = useRecords();
  const uniqueId = `editModal${no}`;

  const categories = [
    { id: 101, name: "Pendapatan" },
    { id: 201, name: "Pengeluaran" },
    { id: 202, name: "Tagihan Utilitas" },
    { id: 203, name: "Makanan" },
    { id: 204, name: "Transportasi" },
    { id: 205, name: "Tempat Tinggal" },
    { id: 206, name: "Hiburan" },
  ];

  const [inputs, setInputs] = useState(record);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    let { value } = event.target;

    if (name === "amount") {
      value = parseInt(value, 10);
    }

    if (name === "categoryId") {
      value = parseInt(value, 10);
    }

    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const newInputs = {
      ...inputs,
      updatedAt: new Date().toISOString(),
      value: inputs.categoryId < 200 ? inputs.amount : inputs.amount * -1,
    };
    editRecord(newInputs);
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
            <div>
              <label
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor={`amount${uniqueId}`}
              >
                Jumlah
              </label>
              <input
                className="block p-2.5 w-full text-sm text-slate-900 bg-slate-50 border border-slate-400 rounded-lg focus:outline-slate-500 placeholder:italic"
                type="number"
                id={`amount${uniqueId}`}
                name="amount"
                value={inputs.amount}
                placeholder="Masukkan Jumlah"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor={`description${uniqueId}`}
              >
                Keterangan
              </label>
              <input
                className="block p-2.5 w-full text-sm text-slate-900 bg-slate-50 border border-slate-400 rounded-lg focus:outline-slate-500 placeholder:italic"
                type="text"
                id={`description${uniqueId}`}
                name="description"
                value={inputs.description}
                placeholder="Masukkan Keterangan"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor={`categoryId${uniqueId}`}
              >
                categoryId
              </label>
              <select
                className="block p-2.5 w-full text-sm text-slate-900 bg-slate-50 border border-slate-400 rounded-lg focus:outline-slate-500"
                id={`categoryId${uniqueId}`}
                name="categoryId"
                value={inputs.categoryId}
                onChange={handleChange}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor={`date${uniqueId}`}
              >
                Tanggal
              </label>
              <input
                className="block p-2.5 w-full text-sm text-slate-900 bg-slate-50 border border-slate-400 rounded-lg focus:outline-slate-500"
                type="date"
                id={`date${uniqueId}`}
                name="date"
                value={inputs.date}
                onChange={handleChange}
                required
              />
            </div>
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
