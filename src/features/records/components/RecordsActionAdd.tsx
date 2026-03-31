import { ChangeEvent, SyntheticEvent, useState } from "react";
import { selectAccounts } from "@/features/account/account.slice";
import { selectDemo } from "@/features/demo/demo.slice";
import { firebaseAddRecord } from "@/features/record/record.service";
import { addRecord } from "@/features/record/record.slice";
import categories from "@/shared/data/categories.json";
import { successToast } from "@/shared/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Modal from "../../../shared/components/Modal";
import InputField from "./InputField";
import SelectField from "./SelectField";

const INITIAL_INPUTS = {
  date: "",
  description: "",
  categoryId: categories[0].id,
  amount: 0,
};

export default function RecordsActionAdd() {
  const { selectedAccount } = useAppSelector(selectAccounts);
  const { isDemo } = useAppSelector(selectDemo);
  const dispatch = useAppDispatch();

  const [inputs, setInputs] = useState(INITIAL_INPUTS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = event.target;

    setInputs((prevState) => ({
      ...prevState,
      [name]:
        type === "number" || name === "categoryId"
          ? parseInt(value, 10)
          : value,
    }));
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const newInputs = {
      ...inputs,
      value: inputs.categoryId < 200 ? inputs.amount : inputs.amount * -1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      accountId: selectedAccount.id,
    };
    !isDemo ? firebaseAddRecord(newInputs) : dispatch(addRecord(newInputs));
    setInputs(INITIAL_INPUTS);

    setIsModalOpen(false);
    successToast("Data berhasil ditambahkan");
  };

  return (
    <>
      <button
        className="py-1.5 md:py-2 px-3 md:px-4 bg-slate-800 text-slate-50 rounded-[3px]"
        onClick={() => setIsModalOpen(true)}
      >
        Tambah
      </button>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="w-screen max-w-md">
            <h3 className="mb-4 text-xl text-left font-medium text-gray-900">
              Membuat Catatan Baru
            </h3>
            <form
              onSubmit={handleSubmit}
              spellCheck="false"
              className="space-y-6"
            >
              <InputField
                label="Jumlah"
                type="number"
                id="amount"
                name="amount"
                value={inputs.amount}
                placeholder="Masukkan Jumlah"
                onChange={handleChange}
                required
              />
              <InputField
                label="Keterangan"
                id="description"
                name="description"
                value={inputs.description}
                placeholder="Masukkan Keterangan"
                onChange={handleChange}
                required
              />
              <SelectField
                label="Kategori"
                id="categoryId"
                name="categoryId"
                value={inputs.categoryId}
                onChange={handleChange}
                options={categories}
              />
              <InputField
                label="Tanggal"
                type="date"
                id="date"
                name="date"
                value={inputs.date}
                onChange={handleChange}
                placeholder="Pilih Tanggal"
                required
              />
              <button
                className="py-2.5 w-full font-medium text-lg text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 rounded-lg"
                type="submit"
              >
                Kirim
              </button>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
}
