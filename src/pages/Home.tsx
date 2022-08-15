import React, { useState, useEffect, useCallback } from 'react'
import { NavLink } from 'react-router-dom'
// import classes from '../Home.module.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import PostHandler from '../components/UI/PostHandler'

const Home = () => {
    const [posts, setPosts] = useState<{ id: number, title: string, body: string }[]>()
    const [isLoading, setIsLoading] = useState(true)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const fetchPosts = useCallback(async () => {
        setIsLoading(true)
        const res = await fetch('https://jsonplaceholder.typicode.com/posts')
        if (res.ok) {
            const data = await res.json()
            setPosts(data)
            setIsLoading(false)
        } else {
            setIsLoading(false)
        }
    }, [])


    useEffect(() => {
        fetchPosts()
    }, [fetchPosts])
    return (
        <>
            <Stack spacing='auto' direction="row" justifyContent="center"
                alignItems="center" my={5}>
                <Typography variant="h4" my="auto" align="center" component="div" gutterBottom>
                    All The Posts Listed Below
                </Typography>
                <Button variant="outlined" size="large" onClick={handleOpen}>ADD A New POST</Button>
            </Stack>
            {
                !isLoading ?
                    <Grid spacing={3} container justifyContent="center" alignItems="center">
                        {posts?.map(post => {
                            return (
                                <Grid key={post.id} item mx="auto">
                                    <Card sx={{ maxWidth: 345 }}>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image="https://media.sproutsocial.com/uploads/2022/04/Best-times-to-post-2022_BTTP-Social-Media.jpg"
                                            alt="green iguana"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {post.title.substring(0, 20)}...
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {post.body.substring(0, 150)}...
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <NavLink to={`/post/${post.id}`}>
                                                <Button size="small">Learn More</Button>
                                            </NavLink>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>
                    : <LoadingSpinner />
            }
            <PostHandler type='Add' open={open} handleClose={handleClose} />
        </>
    )
}

export default Home