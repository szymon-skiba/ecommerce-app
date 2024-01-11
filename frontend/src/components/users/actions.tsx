import { TrashIcon } from "@heroicons/react/24/outline";
import UserClient from "../../service/api/user-client";

export function DeleteUser({ id }: { id: number }) {
    const { deleteUser } = UserClient();

    const deleteUserWithId = deleteUser.bind(null, id);
    return (
        <>
            <form onSubmit={deleteUserWithId}>
                <button className="rounded-md border p-2 hover:bg-gray-100">
                    <span className="sr-only">Delete</span>
                    <TrashIcon className="w-5" />
                </button>
            </form>
        </>
    );
}