import { ChangeEvent, SyntheticEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAccounts } from "@/lib/redux/features/accounts/accountsSlice";
import { addRecord } from "@/lib/redux/features/records/recordsSlice";
import { modal, successToast } from "../../utils";
import Modal from "../Modal";
import InputField from "./InputField";
import SelectField from "./SelectField";

const CATEGORIES = [
  { id: 101, name: "Pendapatan" },
  { id: 201, name: "Pengeluaran" },
  { id: 202, name: "Tagihan Utilitas" },
  { id: 203, name: "Makanan" },
  { id: 204, name: "Transportasi" },
  { id: 205, name: "Tempat Tinggal" },
  { id: 206, name: "Hiburan" },
];

const INITIAL_INPUTS = {
  date: "",
  description: "",
  categoryId: CATEGORIES[0].id,
  amount: 0,
};

export default function RecordsActionAdd() {
  const { selectedAccount } = useSelector(selectAccounts);
  const dispatch = useDispatch();

  const uniqueId = "addModal";

  const [inputs, setInputs] = useState(INITIAL_INPUTS);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = event.target;

    setInputs((prevState) => ({
      ...prevState,
      [name]: type === "number" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const newInputs = {
      ...inputs,
      value: inputs.categoryId < 200 ? inputs.amount : inputs.amount * -1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      accountId: selectedAccount.id,
    };
    dispatch(addRecord(newInputs));
    modal.hide(uniqueId);
    setInputs(INITIAL_INPUTS);

    successToast("Data berhasil ditambahkan");
  };

  return (
    <>
      <button
        className="py-1.5 md:py-2 px-3 md:px-4 bg-slate-800 text-slate-50 rounded-[3px]"
        onClick={() => modal.show(uniqueId)}
      >
        Tambah
      </button>

      <Modal id={uniqueId}>
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
              onChange={handleChange}
              options={CATEGORIES}
              value={inputs.categoryId}
            />
            <InputField
              label="Tanggal"
              id="date"
              name="date"
              placeholder="Pilih Tanggal"
              value={inputs.date}
              onChange={handleChange}
              type="date"
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
    </>
  );
}
