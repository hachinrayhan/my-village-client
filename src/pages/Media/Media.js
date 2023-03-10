import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Post from './Post';

const Media = () => {
    const url = `https://my-village-server-hachinrayhan.vercel.app/posts`;

    const { isLoading, error, data: posts } = useQuery({
        queryKey: ['posts'],
        queryFn: () =>
            fetch(url).then(res => res.json())
    })

    if (isLoading) return 'Loading...'
    if (error) return 'An error has occurred: ' + error.message

    return (
        <div>
            {
                posts.map(post => <Post key={post._id} post={post}></Post>)
            }
        </div>
    );
};

export default Media;