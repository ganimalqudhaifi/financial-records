import Head from "next/head";
import { useEffect } from "react";
import { AppLayout, RecordsOrganism } from "../../components";
import { useAccounts, useRecords } from "../../hooks";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { getData } from "../../utils/data";

const user = {
  uid: "demouser",
  displayName: "Demo",
  email: "name@company.com",
  photoURL: "/avatar/boy_01.svg",
  phoneNumber: "",
};

const demoAccount = [
  {
    id: "301",
    name: "Personal",
    initialBalance: 0,
  },
];

export default function Demo() {
  const { setIsDemo } = useGlobalContext();
  const { setAccounts } = useAccounts();
  const { setRecords, hasDemoLoadRecords, setHasDemoLoadRecords } =
    useRecords();

  useEffect(() => {
    setIsDemo(true);
    if (!hasDemoLoadRecords) {
      setRecords(getData());
      setHasDemoLoadRecords(true);
    }

    setAccounts(demoAccount);

    return () => {
      setIsDemo(false);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Financial Records - Demo</title>
      </Head>

      <AppLayout user={user}>
        <div className="w-full p-4 lg:ml-64">
          <h2 className="font-medium text-3xl mb-4">Table</h2>
          <RecordsOrganism />
        </div>
      </AppLayout>
    </>
  );
}
