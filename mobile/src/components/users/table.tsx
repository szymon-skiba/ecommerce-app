import { useEffect, useState } from 'react';
import FishClient from '../../service/api/fish-client';
import Pagination from '../common/pagination';
import { UsersResponse } from '../../model/userResponse';
import UserClient from '../../service/api/user-client';
import { DeleteUser } from './actions';


export default function ProductsTable({
  size,
  page,
}: {
  size: number;
  page: number;
}) {

  const [users, setUsers] = useState<UsersResponse>({} as UsersResponse);
  const [totalPages, setTotalPages] = useState(0);
  const { getAllUsers } = UserClient();

  useEffect(() => {
    const fetchUsers = async () => {
      const result = await getAllUsers({page, size});
      setUsers(result);
      setTotalPages(result.totalPages);
    };

    fetchUsers();
  }, [page, size]);

  if (!users) {
    return null; 
  }

  return (
    <>
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {users.data?.map((user) => (
              <div
                key={user.id.toString()}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{user.email}</p>
                    </div>
                    <p className="text-sm text-gray-500">ID: {user.id.toString()}</p>
                    <p className="text-sm text-gray-500">Role: {user.roles}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div className="flex justify-end gap-2">
                    <DeleteUser id={user.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  ID
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Role
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Delete</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {users.data?.map((user) => (
                <tr
                  key={user.id.toString()}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {user.id.toString()}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {user.email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {user.roles}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <DeleteUser id={user.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
    </div> 
    </>
  );
}
