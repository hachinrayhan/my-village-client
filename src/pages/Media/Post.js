import React from 'react';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Post = ({ post }) => {
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
                <p>{text.length > 100 ? text.slice(0, 99) + '...' : text}</p>
            </div>
            <figure><img src={photo} alt="" /></figure>
            <Link to={`/posts/${_id}`} className="btn-primary">Details</Link>
        </div>
    );
};

export default Post;