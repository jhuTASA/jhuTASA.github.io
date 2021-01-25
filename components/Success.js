import React, { Component, setState, useState, useEffect } from 'react';
import '../assets/css/interactive.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import firebase from 'firebase';
import db from '../firebase'

export default function Success(props) {
    const message = props.message;
    const [likes, setLikes] = useState(props.likes);
    const [liked, setLiked] = useState(false);
    const uid = props.uid;
    var timedate = new Date(props.time);
    var date = timedate.toLocaleDateString();
    var time = "";
    var hours = (timedate.getHours() % 12).toString();
    time += hours;
    time += ":";
    if(timedate.getMinutes() < 10) {
        time += "0";
    }
    time += timedate.getMinutes();
    if(timedate.getHours() > 12) {
        time += "PM"
    } else {
        time += "AM"
    }
    const username = props.username;

    function like() {
        if(!liked) {
            setLikes(likes + 1);
        }
        setLiked(true);
        var docRef = db.collection("successes").doc(uid);
        db.runTransaction(function(transaction) {
            return transaction.get(docRef).then(function(doc) {
                if(!doc.exists) {
                    throw "Does not exist!"
                }

                var newLikes = doc.data().likes + 1;
                transaction.update(docRef, { likes: newLikes });
            });
        }).then(function() {
            console.log("Like successful");
        }).catch(function(error) {
            console.log("Like failed");
        });
    }

    return(
        <div style={{zIndex: 1,}}>
            <Paper style={{margin: "0.5em", padding: "1em", height: 'auto', zIndex: 1,}}>
                <Typography variant="body1" 
                    style={{fontWeight: "bold"}}>
                    {username} | {date}, {time}
                </Typography>
                <Typography variant="body1">
                    {message}
                </Typography>
                <Typography variant="body2">
                    Likes: {likes}
                </Typography>
                <Button onClick={()=>like()}>Like</Button>
            </Paper>
        </div>
    )
}