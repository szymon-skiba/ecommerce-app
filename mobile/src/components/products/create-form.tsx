import {
    CurrencyDollarIcon,
    PencilIcon,
    ScaleIcon,
    SwatchIcon,
    NewspaperIcon,
    HomeModernIcon
} from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../common/button';
import FishClient from '../../service/api/fish-client';

export default function Form() {
    const { createFish } = FishClient();
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        await createFish(formData);
        navigate('/dashboard/products');
    };


    return (
        <form onSubmit={handleSubmit}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                <div className="mb-4">
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                        Name
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Enter name"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                required
                            />
                            <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="mb-2 block text-sm font-medium">
                        Price
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="price"
                                name="price"
                                type="number"
                                step="0.01"
                                placeholder="Enter PLN price"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                required
                            />
                            <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="weightRangeFrom" className="mb-2 block text-sm font-medium">
                        Weight Range
                    </label>
                    <div className="relative mt-2 rounded-md inline-flex items-center w-fit">
                        <div className="relative">
                            <input
                                id="weightRangeFrom"
                                name="weightRangeFrom"
                                type="number"
                                step="0.01"
                                placeholder="Enter weight from"
                                className="peer w-20 block  rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 max-w-full"
                                required
                            />
                            <ScaleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                        <div className="mx-2">:</div>
                        <div className="relative w-fit">
                            <input
                                id="weightRangeTo"
                                name="weightRangeTo"
                                type="number"
                                step="0.01"
                                placeholder="Enter weight to"
                                className="peer w-20 block rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 max-w-full"
                                required
                            />
                            <ScaleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="mb-2 block text-sm font-medium">
                        In stock amount
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="amount"
                                name="amount"
                                type="number"
                                step="0.01"
                                placeholder="Enter in stock amount"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                required
                            />
                            <SwatchIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="location" className="mb-2 block text-sm font-medium">
                        Location
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="location"
                                name="location"
                                placeholder="Enter location"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                required
                            />
                            <HomeModernIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="mb-2 block text-sm font-medium">
                        Description
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <textarea
                                id="description"
                                name="description"
                                placeholder="Enter description"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                required
                                rows={4}
                                style={{ overflowY: 'auto' }}
                            />
                            <NewspaperIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    to="/dashboard/products"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <Button type="submit">Create product</Button>
            </div>
        </form>
    );
}
