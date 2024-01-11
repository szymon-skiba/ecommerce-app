import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import FishClient from "../../service/api/fish-client";

export function UpdateProduct({ id }: { id: number }) {
    return (
        <Link
            to={`/dashboard/products/${id}/edit`}
            className="rounded-md border p-2 hover:bg-gray-100"
        >
            <PencilIcon className="w-5" />
        </Link>
    );
}


export function DeleteProduct({ id }: { id: number }) {
    const { deleteFish } = FishClient();

    const deleteProductWithId = deleteFish.bind(null, id);
    return (
        <>
            <form onSubmit={deleteProductWithId}>
                <button className="rounded-md border p-2 hover:bg-gray-100">
                    <span className="sr-only">Delete</span>
                    <TrashIcon className="w-5" />
                </button>
            </form>
        </>
    );
}

export function CreateProduct() {
    return (
      <Link
        to="/dashboard/products/create"
        className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        <span className="hidden md:block">Create Product</span>{' '}
        <PlusIcon className="h-5 md:ml-4" />
      </Link>
    );
  }
