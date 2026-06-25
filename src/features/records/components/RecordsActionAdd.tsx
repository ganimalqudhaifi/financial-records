import { ChangeEvent, SyntheticEvent, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { selectAccounts } from "@/features/account/account.selector";
import { selectDemo } from "@/features/demo/demo.selector";
import { firebaseAddRecord } from "@/features/records/record.service";
import { addRecord } from "@/features/records/records.slice";
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
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        onClick={() => setIsModalOpen(true)}
        aria-label="Tambah catatan baru"
      >
        <BiPlus className="w-5 h-5" />
        <span>Tambah</span>
      </button>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h3 className="mb-6 text-xl font-semibold text-slate-900 dark:text-slate-100">
            Membuat Catatan Baru
          </h3>
          <form
            onSubmit={handleSubmit}
            spellCheck="false"
            className="space-y-5"
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
              className="w-full inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              type="submit"
            >
              Kirim
            </button>
          </form>
        </Modal>
      )}
    </>
  );
}
