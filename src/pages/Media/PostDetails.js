import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaUser } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

const PostDetails = () => {
    const { id } = useParams();
    const url = `http://localhost:5000/posts/${id}`;

    const { isLoading, error, refetch, data: post } = useQuery({
        queryKey: ['post'],
        queryFn: () =>
            fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('token')}`
                }
            }).then(res => res.json())
    })

    if (isLoading) return 'Loading...'
    if (error) return 'An error has occurred: ' + error.message

    const { _id, text, photo, name, userPhoto } = post;
    return (
        <div className="card w-full max-w-lg mx-auto bg-base-100 shadow-2xl my-12">
            <div className="card-body">
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            {
                                userPhoto ? <img src={userPhoto} alt='' /> : <FaUser className='w-full h-full text-blue-500' />
                            }

                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{name}</div>
                        {/* <div className="text-sm opacity-50">United States</div> */}
                    </div>
                </div>
                <p>{text}</p>
            </div>
            <figure><img src={photo} alt="" /></figure>
        </div>
    );
};

export default PostDetails;