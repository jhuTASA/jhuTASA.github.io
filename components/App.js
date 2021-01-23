import React, { Component } from 'react';
import '../assets/css/interactive.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import firebase from 'firebase';
import db from '../firebase'

// import "../assets/css/main.css";
import Header from './header'
import { render } from 'react-dom';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jar: [],
        }
        this.redCount = 0;
        this.blueCount = 0;
        this.greenCount = 0;
        this.purpleCount = 0;

        this.addBall = this.addBall.bind(this)
    }


    // RESTful add call to firebase
    add_ball(color) {
        this.resetCounts();
        console.log(color);
        event.preventDefault();
        db.collection("expectations-jar").add({
            color: color,
            time: firebase.firestore.FieldValue.serverTimestamp()
        })
            .then(function (docRef) {
                console.log("Ball written with ID: ", docRef.id);
            })
            .catch(function (error) {
                console.error("Error adding ball: ", error);
            });
            this.getBalls()
    }

    addBall(color) {
        console.log("COLOR", color);
        switch (color) {
            case "red":

                this.redCount++;
                return <div className='jar-ball' style={{ backgroundColor: "red", backgroundImage: 'url(../assets/img/family.png)' }} />

            case "blue":

                this.blueCount++;
                return <div className='jar-ball' style={{ backgroundColor: "blue", backgroundImage: 'url(../assets/img/friend.png)' }} />

            case "purple":

                this.purpleCount++;
                return <div className='jar-ball' style={{ backgroundColor: "purple", backgroundImage: 'url(../assets/img/society.png)' }} />

            case "green":

                this.greenCount++;
                return <div className='jar-ball' style={{ backgroundColor: "darkslategray", backgroundImage: 'url(../assets/img/yourself.png)' }} />

        }
    }

    resetCounts() {
        this.redCount = 0;
        this.blueCount = 0;
        this.purpleCount = 0;
        this.greenCount = 0;
    }

    componentDidMount() {
        this.getBalls()
    }

    getBalls() {
        let currentComponent = this;
        var balls = [];
        this.resetCounts();

        db.collection("expectations-jar").get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    balls.push(doc.data().color);
                });
                console.log(balls);

                //handle jar overflow: randomize array then take the first 240 elements
                if (balls.length > 240) {
                    balls.sort(function() { return 0.5 - Math.random() });
                    balls = balls.slice(0, 240)
                }

                currentComponent.setState({
                    jar: balls
                })
            }).catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    }

    render() {
        return (
            <div className='interactive'>
                {/* <Header /> */}
                <header id="header">
                    <div className="container">
                        <div class="container">
                            <nav id="nav-menu-container">
                                <ul class="nav-menu">
                                    <li class="homeAnchor"><a href="../index.html">Home</a></li>
                                    <li class="programAnchor"><a href="about.html">About</a></li>
                                    <li class="programAnchor"><a href="program.html">Program</a></li>
                                    <li class="speakersAnchor"><a href="speakers.html">Speakers</a></li>
                                    <li class="menu-active"><strong>Interactive</strong></li>
                                    <a class="register-button" href='https://forms.gle/5fPkhJ115cBfL5eo6'>Register Now!</a>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </header>

                <div style={{ position: "relative", paddingTop: "calc(1vh + 60px)", marginBottom: "50px" }}>

                    {/* EXPECTATIONS JAR */}
                    <Container maxWidth={'lg'}>
                        <h1 style={{ marginLeft: "2vw", color: "#265A26", }}>
                            Jar of Expectations
                    </h1>
                        <p style={{ marginLeft: "3vw", fontSize: "calc(16px + 0.1em)" }}>
                            The different colored balls symbolize common expectations faced by Taiwanese and Taiwanese American students.
                    </p>
                        <p style={{ marginLeft: "3vw", fontSize: "calc(16px + 0.1em)" }}>
                            We encourage you to choose a ball that represents the expectation that you feel has most affected you, resulting in a multi-colored jar of colors showcasing the frequency of these expectations.
                    </p>
                        <Grid container spacing={3}>
                            <h2 style={{ marginLeft: "4vw", marginBottom: "0px", fontSize: "calc(16px + 0.6em)" }}>Expectations</h2>
                            <Grid item xs={12}>
                                <div className='ball-options'>
                                    <div className='options'>
                                        <h3>Family</h3>
                                        <div className='ball' style={{ backgroundColor: "red", backgroundImage: 'url(../assets/img/family.png)' }}
                                            onClick={() => this.add_ball("red")}
                                        />
                                    </div>
                                    <div className='options'>
                                        <h3>Friends</h3>
                                        <div className='ball' style={{ backgroundColor: "blue", backgroundImage: 'url(../assets/img/friend.png)' }}
                                            onClick={() => this.add_ball("blue")}
                                        />
                                    </div>
                                    <div className='options'>
                                        <h3>Society</h3>
                                        <div className='ball' style={{ backgroundColor: "purple", backgroundImage: 'url(../assets/img/society.png)' }}
                                            onClick={() => this.add_ball("purple")}
                                        />
                                    </div>
                                    <div className='options'>
                                        <h3>Yourself</h3>
                                        <div className='ball' style={{ backgroundColor: "darkslategray", backgroundImage: 'url(../assets/img/yourself.png)' }}
                                            onClick={() => this.add_ball("green")}
                                        />
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                        <h2 style={{ marginLeft: "4vw", marginBottom: "0px", fontSize: "calc(16px + 0.6em)" }}>
                            Our Jar
                        </h2>
                        <Grid container spacing={3} style={{ marginBottom: "30px" }}>
                            <Grid item xs={4}>
                            </Grid>
                            <Grid item xs={7}>
                                <div style={{
                                    float: "left",
                                    border: "3px solid black",
                                    borderRadius: "15px",
                                    borderTop: "none",
                                    borderTopLeftRadius: "0px",
                                    borderTopRightRadius: "0px",
                                    height: "400px",
                                    width: "375px",
                                }}>
                                    <div style={{
                                        backgroundColor: "yellow",
                                        transform: 'scaleY(-1)',
                                        position: 'relative',
                                        top: '400px',
                                    }}>
                                        {this.state.jar.map((value) => (this.addBall(value)))}
                                    </div>
                                </div>
                                <div style={{ float: "left", marginLeft: "2em" }}>
                                    <h3>Family: {this.redCount}</h3>
                                    <h3>Friends: {this.blueCount}</h3>
                                    <h3>Society: {this.purpleCount}</h3>
                                    <h3>Yourself: {this.greenCount}</h3>
                                </div>

                            </Grid>
                            <Grid item xs={1}>
                            </Grid>
                        </Grid>
                    </Container>

                    <hr />

                    {/* SHARING OUR SUCCESSES */}
                    <div>
                        <Container maxWidth={'lg'}>
                            <h1 style={{ marginLeft: "2vw", color: "#265A26", }}>Sharing our Successes</h1>
                            <p style={{ marginLeft: "3vw", fontSize: "calc(16px + 0.1em)" }}>
                                Share stories of success, traditional or nontraditional, of yourself or of others - let's celebrate each other’s successes!
                            </p>
                            <div style={{
                                border: "1px solid black",
                                width: "95%",
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
                                    <Grid container spacing={3}>
                                        <Grid item xs={3}>
                                            <TextField placeholder="Your name (optional)"
                                                style={{
                                                    width: "100%",
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
                                        <Grid item xs={6}>
                                            <TextField placeholder="Share a success!"
                                                variant="standard"
                                                multiline rows={3}
                                                style={{
                                                    backgroundColor: "white",
                                                    margin: "10px",
                                                    marginLeft: "1em",
                                                    width: "100%",
                                                    padding: "8px",
                                                    fontSize: "calc(14px + 0.2em)",
                                                    borderRadius: "5px",
                                                    border: "1px solid gray",
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={'auto'} />
                                        <Grid item xs={2}>
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
                                                    width: '100%'
                                                }}>
                                                <Typography variant="body1" style={{ color: "white" }}>
                                                    Share
                                        </Typography>
                                            </Button>
                                        </Grid>
                                        <Grid item xs={'auto'} />
                                    </Grid>
                                </div>
                            </div>
                        </Container>
                    </div>
                    <hr />

                    {/* WALL OF ENCOURAGEMENT */}
                    <Container maxWidth={'lg'}>
                        <div>
                            <h1 style={{ marginLeft: "2vw", color: "#265A26" }}>Wall of Encouragement</h1>
                            <p style={{ marginLeft: "3vw", fontSize: "calc(16px + 0.1em)" }}>
                                Write a word of encouragement or a piece of advice that has stuck with you - let's learn from each other!
                    </p>
                            <div style={{
                                border: "1px solid black",
                                width: "95%",
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
                                    <Grid container spacing={3}>
                                        <Grid item xs={3}>
                                            <TextField placeholder="Your name (optional)"
                                                style={{
                                                    width: "100%",
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
                                        <Grid item xs={6}>
                                            <TextField placeholder="Share some encouragement!"
                                                variant="standard"
                                                multiline rows={3}
                                                style={{
                                                    backgroundColor: "white",
                                                    margin: "10px",
                                                    marginLeft: "1em",
                                                    width: "100%",
                                                    padding: "8px",
                                                    fontSize: "calc(14px + 0.2em)",
                                                    borderRadius: "5px",
                                                    border: "1px solid gray",
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={'auto'} />
                                        <Grid item xs={2}>
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
                                                    width: '100%'
                                                }}>
                                                <Typography variant="body1" style={{ color: "white" }}>
                                                    Share
                                                </Typography>
                                            </Button>
                                        </Grid>
                                        <Grid item xs={'auto'} />
                                    </Grid>
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>

            </div>
        );
    }
}


export default App;