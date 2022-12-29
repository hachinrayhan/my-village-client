import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthProvider';

const CreatePostModal = () => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, formState: { isDirty, isValid } } = useForm({ mode: "onChange" });
    const imgHostKey = process.env.REACT_APP_imgbb_key;

    const createPost = data => {
        console.log(data.text, data.photo[0]);

        //photo hosting system to imgbb
        const photo = data.photo[0];
        const formData = new FormData();
        formData.append('image', photo);
        const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    console.log(imgData.data.url);
                    const post = {
                        email: user.email,
                        userPhoto: user.photoURL,
                        name: user.displayName,
                        text: data.text,
                        photo: imgData.data.url
                    }

                    //save post to the database
                    fetch('http://localhost:5000/posts', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('token')}`
                        },
                        body: JSON.stringify(post)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            toast.success('Your post added successfully');
                            // navigate('/my-post');
                        })
                }
            })
    }
    return (
        <div>
            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="my-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Create Post</h3>
                    <form onSubmit={handleSubmit(createPost)}>
                        <textarea {...register("text", { required: true })} className="textarea textarea-bordered w-full h-52 my-4" placeholder="What's on your mind?"></textarea>
                        <label className="label">
                            <span className="label-text">Add Photo</span>
                        </label>
                        <input {...register("photo")} type="file" className="file-input file-input-bordered w-full" required />
                        <button disabled={!isDirty || !isValid} type="submit" className='my-4 btn btn-primary w-full'>Post</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreatePostModal;