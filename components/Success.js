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
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

export default function Success(props) {
    const message = props.message;
    const [likes, setLikes] = useState(props.likes);
    const [liked, setLiked] = useState(false);
    const uid = props.uid;
    var timedate = new Date(props.time);
    var date = timedate.toLocaleDateString();
    var time = "";
    var hours = timedate.getHours();
    if (hours > 12) {
        hours -= 12;
    }
    if (hours == 0) {
        hours = 12;
    }
    time += hours;
    time += ":";
    if(timedate.getMinutes() < 10) {
        time += "0";
    }
    time += timedate.getMinutes();
    if(timedate.getHours() >= 12) {
        time += "PM"
    } else {
        time += "AM"
    }
    const username = (props.username !== "") ? props.username : "Anonymous";
    var docRef = (props.type === "success") ? 
        db.collection("successes").doc(uid) : 
        db.collection("wall-of-encouragement").doc(uid);
    
    function like() {
        if(liked) { return; }
        setLikes(likes + 1);
        db.runTransaction(function(transaction) {
            return transaction.get(docRef).then(function(doc) {
                if(!doc.exists) {
                    throw "Does not exist!"
                }
                var newLikes = doc.data().likes + 1;
                transaction.update(docRef, { likes: newLikes });
            });
        }).then(function() {
            // console.log("Like successful");
            setLiked(true);
        }).catch(function(error) {
            console.log("Like failed");
        });
    }

    function unlike() {
        if(!liked) { return; }
        setLikes(likes - 1);
        db.runTransaction(function(transaction) {
            return transaction.get(docRef).then(function(doc) {
                if(!doc.exists) {
                    throw "Does not exist!"
                }
                var newLikes = doc.data().likes - 1;
                transaction.update(docRef, { likes: newLikes });
            });
        }).then(function() {
            setLiked(false);
        }).catch(function(error) {
            console.log("Unlike failed");
        });
    }

    return(
        <div style={{zIndex: 1,}}>
            <Paper style={{margin: "0.5em", padding: "1em", height: 'auto', zIndex: 1, position: "relative"}}>
                <Grid item container>
                    <Typography variant="body1" >
                        <b>{username}</b> | {date}, {time}
                    </Typography>
                    <br />
                    <Grid item container direction="row" alignItems="center" justify="flex-start">
                        <Typography variant="body1">
                            {message}
                        </Typography>
                        <div style={{display: "flex", flexDirection: "row", position: "absolute", right: "20px", top: "35%"}}>

                            {(liked) ? 
                                <FavoriteIcon onClick={()=>unlike()}
                                    style={{color: "red", cursor: "pointer"}}
                                /> :
                                <FavoriteBorderIcon onClick={()=>like()}
                                    style={{cursor: "pointer"}}
                            />}
                            <Typography variant="body2" style={{paddingLeft: "2px", alignItems: "center", marginTop: "2px"}}>
                                {likes}
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}