import NavLinks from './nav-links';
import Logo from '../common/logo';
import { PowerIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import authCtx from "../../service/auth/AuthContextProvider";
import AuthContext from "../../service/auth/AuthContextProvider";
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

export default function SideNav() {
    const { authState } = useContext(AuthContext);
    const { globalLogOutDispatch } = useContext(authCtx);
    const { t } = useTranslation('common');

    return (
        <div className="flex h-full flex-col px-3 py-4 md:px-2">
            <Link
                className="mb-2 flex h-20 items-end justify-start rounded-md  bg-blue-500 p-4 md:h-40"
                to="/dashboard"
            >
                <div className="w-32 text-white md:w-40">
                    <Logo />
                </div>
            </Link>
            <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                <div className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 font-medium md:flex-none md:justify-start md:p-2 md:px-3 text-xs text-gray-500 mb-1">Logged in as:
                    <label >
                        <div className="md:block">{authState.email}</div>
                    </label>
                </div>
                <NavLinks />
                <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
                <form>
                    <button onClick={globalLogOutDispatch} className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                        <PowerIcon className="w-6" />
                        <div className="hidden md:block">{t('sidnav.signout')}</div>
                    </button>
                </form>
            </div>
        </div>
    );
}
