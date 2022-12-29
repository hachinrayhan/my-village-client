import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';

const About = () => {
    const { user } = useContext(AuthContext);
    const userEmail = user?.email;
    const url = `http://localhost:5000/users?email=${userEmail}`

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

    const { name, email, university, address } = data[0];

    return (
        <div className="w-full max-w-xl mx-auto border rounded-lg">
            <div className='flex justify-end'>
                <button className="btn btn-ghost btn-sm">Edit</button>
            </div>
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
                        <th>University</th>
                        <td>{university}</td>
                    </tr>

                    <tr>
                        <th>Address</th>
                        <td>{address}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default About;