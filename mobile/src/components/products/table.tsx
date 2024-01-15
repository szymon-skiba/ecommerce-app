import { useEffect, useState } from 'react';
import { DeleteProduct, UpdateProduct } from './actions';
import Pagination from '../common/pagination';
import { FishResponse } from '../../model/fishResponse';
import FishClient from '../../service/api/fish-client';


export default function ProductsTable({
  size,
  page,
}: {
  size: number;
  page: number;
}) {

  const [fishes, setFishes] = useState<FishResponse>({} as FishResponse);
  const [totalPages, setTotalPages] = useState(0);
  const { getAllFish } = FishClient();

  useEffect(() => {
    const fetchFishes = async () => {
      const result = await getAllFish({page, size});
      setFishes(result);
      setTotalPages(result.totalPages);
    };

    fetchFishes();
  }, [page, size]);

  if (!fishes) {
    return null; 
  }

  return (
    <>
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {fishes.data?.map((fish) => (
              <div
                key={fish.id.toString()}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{fish.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">ID: {fish.id.toString()}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {fish.price} zł
                    </p>
                    <p>Weight Range: {fish.weightRangeFrom}-{fish.weightRangeTo} g</p>
                    <p>In stock: {fish.amount} kg</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateProduct id={fish.id} />
                    <DeleteProduct id={fish.id} />
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
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Price
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Weight Range
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Location
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Description
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {fishes.data?.map((fish) => (
                <tr
                  key={fish.id.toString()}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {fish.id.toString()}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {fish.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {fish.price} zł
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {fish.weightRangeFrom} - {fish.weightRangeTo} g
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {fish.amount} kg
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {fish.location}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {fish.description}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateProduct id={fish.id} />
                      <DeleteProduct id={fish.id} />
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
