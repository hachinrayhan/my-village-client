import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Post from '../Media/Post';

const Top3 = () => {
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
            <h2 className='text-2xl font-semibold'>Top 3 posts</h2>
            {
                posts.slice(0, 3).map(post => <Post key={post._id} post={post}></Post>)
            }
        </div>
    );
};

export default Top3;