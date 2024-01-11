
import { Suspense, useContext } from "react";
import { Route, Routes, useSearchParams } from "react-router-dom";
import { ProductsTableSkeleton } from "../common/skeletons";
import Table from "./table";
import { ReactNode } from "react";
import { CreateProduct } from "./actions";
import AuthContext from "../../service/auth/AuthContextProvider";

const Products = () => {

  const [searchParams] = useSearchParams();
  const size = searchParams?.get('pageNo') || 10;
  const currentPage = searchParams?.get('page') || 0;
  const { authState } = useContext(AuthContext);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Products</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        {authState.role == "ROLE_ADMIN" && (
          <CreateProduct />
        )}
      </div>
      <Suspense key={Number(size) + Number(currentPage)} fallback={<ProductsTableSkeleton />}>
        <Table size={Number(size)} page={Number(currentPage)} />
      </Suspense>
    </div>
  );
};

export default Products;
