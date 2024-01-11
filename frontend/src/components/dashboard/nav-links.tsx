import {
    UserGroupIcon,
    HomeIcon,
    DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Link, useLocation } from 'react-router-dom';
import AuthContext from "../../service/auth/AuthContextProvider";
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';


export default function NavLinks() {

    const { authState } = useContext(AuthContext);
    const pathname = useLocation();
    const { t } = useTranslation();

    return (
        <>
            <Link
                key={'Products'}
                to={'/dashboard/products'}
                className={clsx(
                    "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
                    {
                        'bg-sky-100 text-blue-600': pathname.pathname === '/dashboard/products',
                    },
                )}
            >
                <DocumentDuplicateIcon className="w-6" />
                <p className="hidden md:block">{t('sidenav.products')}</p>
            </Link>
            {authState.role == "ROLE_ADMIN" && (
                <Link
                    key={'Users'}
                    to={'/dashboard/users'}
                    className={clsx(
                        "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
                        {
                            'bg-sky-100 text-blue-600': pathname.pathname === '/dashboard/users',
                        },
                    )}
                >
                    <UserGroupIcon className="w-6" />
                    <p className="hidden md:block">{t('sidenav.users')}</p>
                </Link>
            )}
        </>
    );
}
