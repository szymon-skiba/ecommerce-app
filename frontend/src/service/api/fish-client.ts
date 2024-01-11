import axios from 'axios';
import { CreateFishDto, Fish, UpdateFishDto } from '../../model/fish';
import { number, z } from 'zod';
import { FishResponse } from '../../model/fishResponse';
import useApi from "./auth-client";
import AuthContext from "../auth/AuthContextProvider";
import { useContext } from 'react';

const API_URL = 'http://localhost:8080/api/v1/fish';


function FishClient() {
  const { authState, globalLogOutDispatch } = useContext(AuthContext);

  const getAllFish = async (params: { page?: number, size?: number }) => {

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

      const fishResponse: FishResponse = {
        isFirst: data.isFirst || false,
        isLast: data.isLast || false,
        hasNext: data.hasNext || false,
        hasPrevious: data.hasPrevious || false,
        data: data.data || [],
        totalElements: data.totalElements || 0,
        pageNumber: data.pageNumber || 1,
        totalPages: data.totalPages || 1,
      };


      return fishResponse;
    } else {
      throw new Error(`Unauthorized`);
    }
  }


  const getFishById = async (id: number) => {

    if (authState.isLoggedIn) {
      try {

        const res = await fetch(`${API_URL}/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authState.token
          },
        });


        if (!res?.ok) {
          res.status === 403 && globalLogOutDispatch();
        }
        const data = await res?.json();

        const fish: Fish = {
          id: data.id as number,
          name: data.name,
          price: data.price,
          weightRangeFrom: data.weightRangeFrom,
          weightRangeTo: data.weightRangeTo,
          amount: data.amount,
          location: data.location,
          description: data.description,
        };

        return fish;
      } catch (error: any) {
        throw new Error(`Error: ${error.message}`);
      }
    } else {
      throw new Error(`Unauthorized`);
    }
  }

  const createFish = async (formData: FormData) => {

    const params = CreateFishDto.parse({
      name: formData.get('name'),
      price: formData.get('price'),
      weightRangeFrom: formData.get('weightRangeFrom'),
      weightRangeTo: formData.get('weightRangeTo'),
      amount: formData.get('amount'),
      location: formData.get('location'),
      description: formData.get('description'),
    });

    if (authState.isLoggedIn) {
      try {
        const res = await fetch(`${API_URL}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authState.token
          },
          body: JSON.stringify(params),
        });


        if (!res?.ok) {
          res.status === 403 && globalLogOutDispatch();
        }
        const data = await res?.json();

        const fish: Fish = {
          id: data.id,
          name: data.name,
          price: data.price,
          weightRangeFrom: data.weightRangeFrom,
          weightRangeTo: data.weightRangeTo,
          amount: data.amount,
          location: data.location,
          description: data.description,
        };

        return fish;
      } catch (error: any) {
        throw new Error(`Error: ${error.message}`);
      }
    } else {
      throw new Error(`Unauthorized`);
    }
  }

  const updateFish = async (id: number, formData: FormData) => {

    const updaetFishDto = UpdateFishDto.parse({
      id: id,
      name: formData.get('name'),
      price: formData.get('price'),
      weightRangeFrom: formData.get('weightRangeFrom'),
      weightRangeTo: formData.get('weightRangeTo'),
      amount: formData.get('amount'),
      location: formData.get('location'),
      description: formData.get('description'),
    });

    if (authState.isLoggedIn) {
      try {
        const res = await fetch(`${API_URL}/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authState.token
          },
          body: JSON.stringify(updaetFishDto),
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

  const deleteFish = async (id: number) => {

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
    getAllFish: getAllFish,
    getFishById: getFishById,
    createFish: createFish,
    updateFish: updateFish,
    deleteFish: deleteFish,
  };


};


export default FishClient;