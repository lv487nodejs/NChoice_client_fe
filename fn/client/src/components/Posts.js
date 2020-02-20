import React from 'react'

export const Posts = ({posts}) => {
    
    return (
        <ul>
            {posts.map(post =>( 
                 <li key={post.id}>{post.title}</li>
            ))}
        </ul>
    )
}
