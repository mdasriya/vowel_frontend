import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { productEndpoints, userEndpoints } from '../services/apis';
import { apiConnector } from '../services/apiconnector';

const UserProfile = () => {
    const { Token } = useSelector((state) => state.auth);
    const [userDetail, setUserDetails] = useState(null);

    const getUserData = async () => {
        try {
            const res = await apiConnector("GET", userEndpoints.SHOW_USER_DETAILS_API, null, {
                Authorization: `Bearer ${Token}`,
            });
            setUserDetails(res.data.user);
        } catch (error) {
            console.log("Could not get UserData ", error.message);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await getUserData();
        };
        fetchData();
    }, [Token]); // Include Token in dependency array to re-fetch data when Token changes

    // console.log("UserDatals : ", userDetail);

    const productsDetails = userDetail?.Products ?? [];
    // console.log("productsDetails : ", productsDetails);

    return (
        <div className='w-screen'>
            <div className=' w-9/12 mx-auto'>
                <span className=' text-3xl font-bold border-b-4 border-green-600 '>My Order Summary</span>
                <div className=' flex gap-5 mt-6'>
                    {productsDetails.map((product) => (
                        <div key={product._id} className=' shadow-lg rounded p-3'>
                            {/* Render your product details here */}
                            <div className=' flex flex-col items-center'>
                                <img src={product?.product?.ImageSrc} width={250} alt={product?.product?.Name} />
                                <div className=' flex justify-between w-full'>
                                    <p> {product?.product?.Name}</p>
                                    <p>₹ {product?.product?.Price}</p>
                                </div>
                                <div className=' flex justify-between w-full'>
                                    <p>{product?.product?.Color}</p>
                                    <p>Qty : {product?.quantity}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

};

export default UserProfile;
