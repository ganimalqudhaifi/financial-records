import { useEffect } from "react";
import { setAccounts } from "@/features/account/account.slice";
import { demoAccounts } from "@/features/demo/data/demoAccount";
import { setHasDemoLoadRecords, setIsDemo } from "@/features/demo/demo.slice";
import { setRecords } from "@/features/records/records.slice";
import { getData } from "@/shared/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectDemo } from "../demo.selector";

export default function useDemo() {
  const { hasDemoLoadRecords } = useAppSelector(selectDemo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setIsDemo(true));

    const records = getData();

    if (!hasDemoLoadRecords) {
      dispatch(setRecords(records));
      dispatch(setHasDemoLoadRecords(true));
    }

    dispatch(setAccounts(demoAccounts));

    return () => {
      dispatch(setIsDemo(false));
    };
  }, [dispatch, hasDemoLoadRecords]);
}
