import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { AiFillLike } from 'react-icons/ai';
import { GrLike } from 'react-icons/gr';
import { GoComment } from 'react-icons/go';
import { useParams } from 'react-router-dom';

const PostDetails = () => {
    const { id } = useParams();
    const url = `http://localhost:5000/posts/${id}`;
    const [isLiked, setIsLiked] = useState(false);

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

    const { _id, text, photo, name, userPhoto, likers, comments } = post;

    const handleLike = () => {
        setIsLiked(!isLiked);
        if (isLiked) {
            // fetch(url, {
            //     method: 'PUT',
            //     headers: {
            //         'content-type': 'application/json',
            //         authorization: `bearer ${localStorage.getItem('token')}`
            //     }
            // })
            console.log('liked');
        }
        else {
            console.log('disliked');
        }
    }

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
                        <h3 className="font-bold">{name}</h3>
                        {/* <div className="text-sm opacity-50">United States</div> */}
                    </div>
                </div>
                <p>{text}</p>
            </div>
            <figure><img src={photo} alt="" /></figure>
            <div className='flex justify-between p-4'>
                <p><AiFillLike className='bg-blue-600 text-white w-6 h-6 p-1 border rounded-full inline-block mr-1' />{likers.length}</p>
                <p>{comments} comments</p>
            </div>
            <hr />
            <div className='flex justify-evenly py-4'>
                <button onClick={handleLike} className="btn btn-xs btn-ghost gap-2">
                    <GrLike className='text-lg' />
                    Like
                </button>
                <button className="btn btn-xs btn-ghost gap-2">
                    <GoComment className='text-lg mt-1' />
                    Comment
                </button>
            </div>
            <hr />
            <div>

            </div>
        </div>
    );
};

export default PostDetails;