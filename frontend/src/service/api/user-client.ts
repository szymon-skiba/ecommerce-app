import axios from 'axios';
import { CreateFishDto, Fish, UpdateFishDto } from '../../model/fish';
import { number, z } from 'zod';
import { FishResponse } from '../../model/fishResponse';
import useApi from "./auth-client";
import AuthContext from "../auth/AuthContextProvider";
import { useContext } from 'react';
import { UsersResponse } from '../../model/userResponse';

const API_URL = 'http://localhost:8080/api/v1/user';


function UserClient() {
    const { authState, globalLogOutDispatch } = useContext(AuthContext);

    const getAllUsers = async (params: { page?: number, size?: number }) => {

        let res: Response | undefined;

        if (authState.isLoggedIn) {

            try {
                const url = new URL(API_URL);
                if (params.page) url.searchParams.append('page', params.page.toString());
                if (params.size) url.searchParams.append('size', params.size.toString());

                res = await fetch(url.toString(), {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + authState.token
                    },
                });
            } catch (error) {
                throw new Error(`Error: ${error}`);
            }

            if (!res?.ok) {
                res.status === 403 && globalLogOutDispatch();
            }
            const data = await res?.json();

            const users: UsersResponse = {
                isFirst: data.isFirst || false,
                isLast: data.isLast || false,
                hasNext: data.hasNext || false,
                hasPrevious: data.hasPrevious || false,
                data: data.data || [],
                totalElements: data.totalElements || 0,
                pageNumber: data.pageNumber || 1,
                totalPages: data.totalPages || 1,
            };


            return users;
        } else {
            throw new Error(`Unauthorized`);
        }
    }

    const deleteUser = async (id: number) => {

        if (authState.isLoggedIn) {
            try {
                const res = await fetch(`${API_URL}/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + authState.token
                    },
                });


                if (!res?.ok) {
                    res.status === 403 && globalLogOutDispatch();
                }

            } catch (error: any) {
                throw new Error(`Error: ${error.message}`);
            }
        } else {
            throw new Error(`Unauthorized`);
        }
    }
    return {
        getAllUsers,
        deleteUser
    };


};


export default UserClient;