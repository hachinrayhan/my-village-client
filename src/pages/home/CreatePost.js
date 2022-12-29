import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import { FaUser } from 'react-icons/fa';
import CreatePostModal from './CreatePostModal';
import { Link } from 'react-router-dom';

const CreatePost = () => {
    const { user } = useContext(AuthContext);
    return (
        <div className='flex items-center justify-center'>
            <div className="avatar">
                <div className="w-12 rounded-full ring mr-3">
                    {
                        user?.uid ? <img src={user.photoURL} alt='user' /> : <FaUser className='w-full h-full text-blue-500' />
                    }
                </div>
            </div>
            {
                user?.uid ? <label htmlFor="my-modal" className="input input-bordered rounded-full w-full max-w-sm">{`What's on your mind, ${user?.displayName}?`}</label>
                    : <label className="input input-bordered rounded-full w-full max-w-sm"><Link to={'/login'} className='text-primary font-bold'>Login</Link> to share your thoughts with friends. </label>
            }
            <CreatePostModal></CreatePostModal>
        </div>
    );
};

export default CreatePost;