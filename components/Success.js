import React, { Component, setState, useEffect } from 'react';
import '../assets/css/interactive.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

export default function Success(props) {
    const message = props.message;
    const likes = props.likes;
    var time = new Date(props.time);
    time = time.toLocaleDateString();
    const username = props.username;

    return(
        <div style={{zIndex: 1,}}>
            <Paper style={{margin: "0.5em", padding: "1em", height: 'auto', zIndex: 1,}}>
                <Typography variant="body1" 
                    style={{fontWeight: "bold"}}>
                    {username} | {time}
                </Typography>
                <Typography variant="body1">
                    {message}
                </Typography>
                <Typography variant="body2">
                    {likes}
                </Typography>
            </Paper>
        </div>
    )
}