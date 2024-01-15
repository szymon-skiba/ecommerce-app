import { useParams } from "react-router-dom";
import FishClient from "../../service/api/fish-client";
import Breadcrumbs from "./breadcrumbs";
import Form from "./edit-form";
import { useCallback, useEffect, useState } from "react";
import { Fish } from "../../model/fish";


const UpdateProduct = () => {
    const { getFishById } = FishClient();
    const { id } = useParams();

    const [fish, setFish] = useState<Fish>();

    const getFish = useCallback(async (id: number) => {
        return getFishById(id)
    }, []);


    useEffect(() => {
        const fetchFishes = async () => {
            const result = await getFish(Number(id));
            setFish(result);
        };

        fetchFishes();
    }, [id, getFish]);

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Invoices', href: '/dashboard/products' },
                    {
                        label: 'Edit Invoice',
                        href: `/dashboard/products/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            {fish && <Form product={fish} />}
        </main>
    );
}


export default UpdateProduct;