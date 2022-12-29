import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';

const About = () => {
    const { user } = useContext(AuthContext);
    const email = user.email;
    const url = `http://localhost:5000/users?email=${email}`

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

    const { name, userEmail } = data[0];
    return (
        <div>
            {name}
        </div>
    );
};

export default About;