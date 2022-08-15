import React, { useState, useEffect, useCallback } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import LoadingSpinner from '../LoadingSpinner';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type Props = {
    type: 'Add' | 'Edit';
    open: boolean;
    handleClose: () => void;
    postId?: number;
}

const PostHandler = ({ type, open, handleClose, postId }: Props) => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (type === 'Add') {
            addPost()
        }
        if (type === 'Edit') {
            editPost()
        }
    }
    const addPost = async () => {
        setMessage('Loading..........')
        if (!title || !body) {
            setMessage(`Post ${!title ? 'Title' : ''} - ${!body ? 'Body' : ''} Required`)
            return
        }
        const Data = {
            title: title,
            body: body,
        }
        const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(Data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })

        if (res.ok) {
            setMessage('Submitted Successfully')
            setBody('')
            setTitle('')
        } else {
            setMessage('Something Went Wrong')
        }
    }

    const editPost = async () => {
        setMessage('Loading..........')
        if (!title || !body) {
            setMessage(`Post ${!title ? 'Title' : ''} - ${!body ? 'Body' : ''} Required`)
            return
        }
        const Data = {
            title: title,
            body: body,
        }
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
            method: 'PATCH',
            body: JSON.stringify(Data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })

        if (res.ok) {
            setMessage('Submitted Successfully')
        } else {
            setMessage('Something Went Wrong')
        }
    }

    const closeHandler = () => {
        handleClose()
        setMessage('')
        setTitle('')
        setBody('')
    }

    const fetchPost = useCallback(async () => {
        setIsLoading(true)
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        if (res.ok) {
            const data = await res.json()
            setTitle(data.title)
            setBody(data.body)
            setIsLoading(false)
        } else {
            setIsLoading(false)
        }
    },
        [postId],
    )
    useEffect(() => {
        if (postId && open) {
            fetchPost()
        }
    }, [postId, fetchPost, open])

    return (
        <Modal
            open={open}
            onClose={closeHandler}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {!isLoading ? <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '100%' },
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={submitHandler}
                >
                    {type === 'Add' && <Typography variant="h4" my={2} align="center" component="div" gutterBottom>
                        ADD A NEW POST
                    </Typography>}
                    {type === 'Edit' && <Typography variant="h4" my={2} align="center" component="div" gutterBottom>
                        UPDATE THE CURRENT POST
                    </Typography>}
                    <div>
                        <TextField
                            required
                            id="post-title"
                            label="Post Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <TextField
                            required
                            id="post-body"
                            multiline
                            rows={6}
                            label="Post Body"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                        />
                    </div>
                    <Stack spacing='auto' direction="row" justifyContent="center"
                        alignItems="center" my={5}>
                        <Button type='submit' variant="contained" color="success" size="large">SUBMIT</Button>
                    </Stack>

                    {!!message && <Typography variant="caption" my={2} align="center" component="div" gutterBottom>
                        {message}
                    </Typography>}
                </Box> : <LoadingSpinner />}
            </Box>
        </Modal>
    );
}

export default PostHandler