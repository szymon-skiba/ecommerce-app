
import { Suspense, useContext } from "react";
import { Route, Routes, useSearchParams } from "react-router-dom";
import { UsersTableSkeleton } from "../common/skeletons";
import Table from "./table";
import { ReactNode } from "react";
import AuthContext from "../../service/auth/AuthContextProvider";

const Users = () => {

  const [searchParams] = useSearchParams();
  const size = searchParams?.get('pageNo') || 1;
  const currentPage = searchParams?.get('page') || 1;

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Users</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
      </div>
      <Suspense key={Number(size) + Number(currentPage)} fallback={<UsersTableSkeleton />}>
        <Table size={Number(size)} page={Number(currentPage)} />
      </Suspense>
    </div>
  );
};

export default Users;
