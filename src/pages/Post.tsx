import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import PostHandler from '../components/UI/PostHandler';

const Post = () => {
    let { postId } = useParams();
    const [post, setPost] = useState<{ id: number, title: string, body: string }>()
    const [isLoading, setIsLoading] = useState(true)
    const [message, setMessage] = useState('')
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const fetchPost = useCallback(async () => {
        setIsLoading(true)
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        if (res.ok) {
            const data = await res.json()
            setPost(data)
            setIsLoading(false)
        } else {
            setIsLoading(false)
        }
    },
        [postId],
    )
    useEffect(() => {
        if (postId) {

            fetchPost()
        }
    }, [postId, fetchPost])

    const deleteHandler = async () => {
        if (postId) {
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
                method: 'DELETE',
            })
            if (res.ok) {
                setMessage('DELETED')
            } else {
                setMessage('Something Wrong')
            }
        }
    }
    return (
        <div>
            {!isLoading ? <>
                <Typography variant="h2" align="center" component="div" gutterBottom>
                    {post?.title}
                </Typography>
                <Typography variant="h6" align="center" component="div" gutterBottom>
                    {post?.body}
                </Typography>
                <Stack spacing={4} direction="row" justifyContent="center"
                    alignItems="center" mt={5}>
                    <Button variant="contained" onClick={handleOpen}>Edit Post</Button>
                    <Button variant="contained" color="error" onClick={deleteHandler}>Delete</Button>
                </Stack>
            </> : <LoadingSpinner />}
            {message && <h3>{message}</h3>}
            <PostHandler type='Edit' open={open} handleClose={handleClose} postId={post?.id} />
        </div>
    )
}

export default Post