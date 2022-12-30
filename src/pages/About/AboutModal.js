import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AboutModal = ({ user, refetch }) => {
    const { _id, name, email, institution, address } = user[0];
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const updateInfo = data => {
        console.log(data);
        fetch(`http://localhost:5000/users/${_id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    toast.success('Your information updated successfully');
                    refetch();
                    navigate('/about');
                }
            })
    }

    return (
        <div>
            <input type="checkbox" id="about-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="about-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Edit your information</h3>
                    <form onSubmit={handleSubmit(updateInfo)}>
                        {/* name */}
                        <div className="form-control w-full max-w-sm">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" {...register('name')} required placeholder="Your Name" defaultValue={name} className="input input-bordered w-full max-w-lg" />
                        </div>

                        {/* Email */}
                        <div className="form-control w-full max-w-sm">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" {...register('email')} defaultValue={email} readOnly className="input input-bordered w-full max-w-lg" />
                        </div>

                        {/* Institution */}
                        <div className="form-control w-full max-w-sm">
                            <label className="label">
                                <span className="label-text">University</span>
                            </label>
                            <input type="text" {...register('institution')} required placeholder="Your Educational Institution" defaultValue={institution} className="input input-bordered w-full max-w-lg" />
                        </div>
                        {/* Address */}
                        <div className="form-control w-full max-w-sm">
                            <label className="label">
                                <span className="label-text">Address</span>
                            </label>
                            <input type="text" {...register('address')} required placeholder="Your Address" defaultValue={address} className="input input-bordered w-full max-w-lg" />
                        </div>
                        <button type='submit' className="btn btn-info btn-sm my-4">Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AboutModal;