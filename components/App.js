import React, { Component } from 'react';
import '../assets/css/interactive.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import firebase from 'firebase';
import db from '../firebase'

// import "../assets/css/main.css";
import Header from './header'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jar: {},
            displayBalls: [],
            red: 0,
            blue: 0,
            green: 0,
            purple: 0,
        }

        this.addBall = this.addBall.bind(this)
    }

    componentDidMount() {
        var balls = this.getBalls();
        this.setState({jar: balls});
        this.renderBalls(balls);
    }

    // RESTful add call to firebase
    add_ball(color){
        console.log(color);
        event.preventDefault();
        db.collection("expectations-jar").add({
            color: color,
            time: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(function(docRef) {    
            console.log("Ball written with ID: ", docRef.id);
            // localStorage.setItem("ballSelected", color);
        })
        .catch(function(error) {
            console.error("Error adding ball: ", error);
        });
    }

    addBall(color) {
        console.log("COLOR", color);
        this.add_ball(color);
        var temp = this.state.displayBalls.slice();
        switch(color) {
            case "red":
                temp.push(
                    <div className='jar-ball' style={{backgroundColor: "red"}} />
                ) 
                this.setState({
                    red: this.state.red+1
                })
                break;
            case "blue":
                temp.push(
                    <div className='jar-ball' style={{backgroundColor: "blue"}} />
                ) 
                this.setState({
                    blue: this.state.blue+1
                })
                break;
            case "purple":
                temp.push(
                    <div className='jar-ball' style={{backgroundColor: "purple"}} />
                ) 
                this.setState({
                    purple: this.state.purple+1
                })
                break;
            case "green":
                temp.push(
                    <div className='jar-ball' style={{backgroundColor: "green"}} />
                ) 
                this.setState({
                    green: this.state.green+1
                })
                break;
        }
        this.setState({
            displayBalls: temp
        });
    }

    getBalls() {
        var balls = [];
        db.collection("expectations-jar").get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());
                // console.log(JSON.stringify(doc.data().color));
                balls.push(JSON.stringify(doc.data().color));
            });
            console.log(balls);
            return balls;
        }).catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    }

    renderBalls(balls) {
        if (balls === undefined) {
            return;
        }
        balls.forEach(function (ball) {
            switch(ball) {
                case "red":
                    temp.push(
                        <div className='jar-ball' style={{backgroundColor: "red"}} />
                    ) 
                    this.setState({
                        red: this.state.red+1
                    })
                    break;
                case "blue":
                    temp.push(
                        <div className='jar-ball' style={{backgroundColor: "blue"}} />
                    ) 
                    this.setState({
                        blue: this.state.blue+1
                    })
                    break;
                case "purple":
                    temp.push(
                        <div className='jar-ball' style={{backgroundColor: "purple"}} />
                    ) 
                    this.setState({
                        purple: this.state.purple+1
                    })
                    break;
                case "green":
                    temp.push(
                        <div className='jar-ball' style={{backgroundColor: "green"}} />
                    ) 
                    this.setState({
                        green: this.state.green+1
                    })
                    break;
            }
            this.setState({
                displayBalls: temp
            });
        });
    }

    

    render() {
        return (
            <div className='interactive'>
                {/* <Header /> */}
                <header id="header">
                    <div className="container">
                        <nav id="nav-menu-container">
                            <ul className="nav-menu">
                                <li className="menu-active">
                                    {/* <strong> */}
                                    <a className="menu-active home" href="/index.html">Home</a>
                                    {/* </strong> */}
                                </li>
                                <li className="aboutAnchor">
                                    <a className='home' href="./about.html">About</a>
                                </li>
                                <li className="programAnchor">
                                    <a className='home' href="./program.html">Program</a>
                                </li>
                                <li className="speakersAnchor">
                                    <a className='home' href="./speakers.html">Speakers</a>
                                </li>
                                <a className="register-button" href='https://forms.gle/5fPkhJ115cBfL5eo6'>
                                    Register Now!
                                </a>
                            </ul>
                        </nav>
                    </div>
                </header>
                {/* EXPECTATIONS JAR */}
                <div style={{position: "relative", paddingTop: "calc(1vh + 60px)"}}>
                    <h1 style={{marginLeft: "2vw", color: "#265A26", fontSize: "2.5em", marginTop: "4%"}}>
                        Jar of Expectations
                    </h1>
                    <p style={{margin: "3vw", marginTop: 0, marginBottom: 2}}>
                        The different colored balls symbolize common expectations faced by Taiwanese and Taiwanese American students. 
                    </p>
                    <p style={{margin: "3vw", marginTop: 0}}>
                        We encourage you to choose a ball that represents the expectation that you feel has most affected you, resulting in a multi-colored jar of colors showcasing the frequency of these expectations.
                    </p>
                    <Grid>
                        <h2 style={{marginLeft: "2vw", marginBottom: "0px"}}>Expectations</h2>
                        <Grid item container xs={12}>
                            <div className='ball-options'>
                                <div className='options'>
                                    <h3>Family</h3>
                                    <div className='ball' style={{backgroundColor: "red"}} 
                                        onClick={()=>this.addBall("red")}
                                    />
                                </div>
                                <div className='options'>
                                    <h3>Friends</h3>
                                    <div className='ball' style={{backgroundColor: "blue"}} 
                                        onClick={()=>this.addBall("blue")}
                                    />
                                </div>
                                <div className='options'>
                                    <h3>Society</h3>
                                    <div className='ball' style={{backgroundColor: "purple"}} 
                                        onClick={()=>this.addBall("purple")}
                                    />
                                </div>
                                <div className='options'>
                                    <h3>Yourself</h3>
                                    <div className='ball' style={{backgroundColor: "green"}} 
                                        onClick={()=>this.addBall("green")}
                                    />
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                    <h2 style={{marginLeft: "2vw", marginBottom: 5}}>
                        Our Jar
                    </h2>
                <Grid item container xs={12} style={{marginBottom: "30px"}}>
                    <Grid item container xs={6}>
                        <div style={{
                            border: "3px solid black", 
                            borderRadius: "15px",
                            borderTop: "none",
                            borderTopLeftRadius: "0px",
                            borderTopRightRadius: "0px",
                            height: "400px", 
                            width: "270px",
                            marginLeft: "30px",
                            }}>
                            <div style={{
                                backgroundColor: "yellow",
                                transform: 'scaleY(-1)',
                                position: 'relative',
                                top: '400px',
                            }}>
                                {this.state.displayBalls}
                            </div>
                        </div>
                        <div style={{marginLeft: "2em"}}>
                            <h3>Family: {this.state.red}</h3>
                            <h3>Friends: {this.state.blue}</h3>
                            <h3>Society: {this.state.purple}</h3>
                            <h3>Yourself: {this.state.green}</h3>
                        </div>
                    </Grid>
                    
                </Grid>
                    
                <hr />
                {/* SHARING OUR SUCCESSES */}
                <div>
                    <h1 style={{marginLeft: "2vw", color: "#265A26",}}>Sharing our Successes</h1>
                    <p style={{marginLeft: "3vw", fontSize: "calc(16px + 0.2em)"}}>
                    Share stories of success, traditional or nontraditional, of yourself or of others - let's celebrate each other’s successes!
                    </p>
                    <div style={{
                            border: "1px solid black",
                            width: "90%",
                            marginLeft: "1em",
                            marginRight: "5%",
                            borderRadius: "15px",
                            height: "80vh",
                            marginBottom: "3em",
                        }}>
                        <div style={{
                            backgroundColor: "rgb(112,168,97, 0.4)", 
                            width: "100%", 
                            height: "auto",
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                            borderBottom: "1px solid #c4c4c4",
                        }}>
                            <Grid container xs={12}>
                                <Grid item xs={0} md={1}/>
                                <Grid item md={3} s={4} xs={6}>
                                    <TextField placeholder="Your name (optional)"
                                        style={{
                                            width: "90%",
                                            backgroundColor: "white",
                                            padding: "8px",
                                            fontSize: "calc(16px + 0.2em)",
                                            borderRadius: "5px",
                                            border: "1px solid gray",
                                            marginTop: "10px",
                                            marginLeft: "1em",
                                        }}
                                    />
                                </Grid>
                                <Grid item md={5} s={7} xs={12}>
                                    <TextField placeholder="Share a success!"
                                        variant="standard"
                                        multiline rows={3}
                                        style={{
                                            backgroundColor: "white",
                                            margin: "10px",
                                            marginLeft: "1em",
                                            width: "60%",
                                            padding: "8px",
                                            fontSize: "calc(14px + 0.2em)",
                                            borderRadius: "5px",
                                            border: "1px solid gray",
                                        }}
                                    />
                                    <Button variant="contained"
                                        style={{
                                            border: "1px solid #70A861",
                                            borderRadius: "15px",
                                            backgroundColor: "#70A861",
                                            color: "white",
                                            marginTop: "calc(1em + 5px)",
                                            marginBottom: "1em",
                                            padding: "8px",
                                            fontSize: "16px",
                                        }}>
                                        <Typography variant="body1" style={{color: "white"}}>
                                            Share
                                        </Typography>
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
                <hr />
                {/* WALL OF ENCOURAGEMENT */}
                <div>
                    <h1 style={{marginLeft: "2vw", color: "#265A26"}}>Wall of Encouragement</h1>
                    <p style={{marginLeft: "3vw", fontSize: "calc(16px + 0.2em)"}}>
                        Write a word of encouragement or a piece of advice that has stuck with you - let's learn from each other!
                    </p>
                    <div style={{
                        border: "1px solid black",
                        width: "90%",
                        marginLeft: "1em",
                        marginRight: "5%",
                        borderRadius: "15px",
                        height: "80vh",
                    }}>
                        <div style={{
                            backgroundColor: "rgb(112,168,97, 0.4)", 
                            width: "100%", 
                            height: "auto",
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                            borderBottom: "1px solid #c4c4c4",
                        }}>
                            <TextField placeholder="Your name (optional)"
                                style={{
                                    backgroundColor: "white",
                                    padding: "8px",
                                    fontSize: "calc(16px + 0.2em)",
                                    borderRadius: "5px",
                                    border: "1px solid gray",
                                    margin: "10px",
                                    marginTop: "1em",
                                    marginLeft: "3em",
                                }}
                            />
                            <TextField placeholder="Share some encouragement!"
                                variant="standard"
                                multiline rows={3}
                                style={{
                                    backgroundColor: "white",
                                    margin: "10px",
                                    marginTop: "1em",
                                    marginLeft: "1em",
                                    width: "20em",
                                    padding: "8px",
                                    fontSize: "calc(14px + 0.2em)",
                                    borderRadius: "5px",
                                    border: "1px solid gray",
                                }}
                            />
                            <Button variant="contained"
                                style={{
                                    border: "1px solid #70A861",
                                    borderRadius: "15px",
                                    backgroundColor: "#70A861",
                                    color: "white",
                                    margin: "10px",
                                    marginTop: "calc(1em + 5px)",
                                    marginLeft: "calc(1em + 10px)",
                                    padding: "8px",
                                    fontSize: "16px",
                                }}>
                                <Typography variant="body1" style={{color: "white"}}>
                                    Share
                                </Typography>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    }
}


export default App;