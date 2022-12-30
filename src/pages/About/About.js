import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import AboutModal from './AboutModal';

const About = () => {
    const { user } = useContext(AuthContext);
    const userEmail = user?.email;
    const url = `https://my-village-server-hachinrayhan.vercel.app/users?email=${userEmail}`

    const { isLoading, error, refetch, data } = useQuery({
        queryKey: ['user'],
        queryFn: () =>
            fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('token')}`
                }
            }).then(res => res.json())
    })

    if (isLoading) return 'Loading...'
    if (error) return 'An error has occurred: ' + error.message

    const { name, email, institution, address } = data[0];

    return (
        <div className="w-full max-w-xl mx-auto border rounded-lg my-20">
            <div className='flex justify-between'>
                <h2 className='text-xl font-bold px-4'>About Me</h2>
                {/* <button className="btn btn-outline btn-primary btn-sm">Edit</button> */}
                <label htmlFor="about-modal" className="btn btn-outline btn-primary btn-sm">Edit</label>
            </div>
            <hr />
            <table className="table w-full">
                <tbody>

                    <tr>
                        <th>Name</th>
                        <td>{name}</td>
                    </tr>

                    <tr>
                        <th>Email</th>
                        <td>{email}</td>
                    </tr>

                    <tr>
                        <th>Institution</th>
                        <td>{institution}</td>
                    </tr>

                    <tr>
                        <th>Address</th>
                        <td>{address}</td>
                    </tr>
                </tbody>
            </table>
            <AboutModal user={data} refetch={refetch}></AboutModal>
        </div>
    );
};

export default About;