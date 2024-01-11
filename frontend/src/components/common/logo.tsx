import { GlobeAltIcon } from '@heroicons/react/24/outline';

export default function Logo() {
  return (
    <div
      className={`flex flex-row items-center leading-none text-white bg-blue-500`}
    >
      <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[20px]">Ecommerce</p>
    </div>
  );
}
