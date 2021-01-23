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
        this.setState({ jar: balls });
        this.renderBalls(balls);
    }

    // RESTful add call to firebase
    add_ball(color) {
        console.log(color);
        event.preventDefault();
        db.collection("expectations-jar").add({
            color: color,
            time: firebase.firestore.FieldValue.serverTimestamp()
        })
            .then(function (docRef) {
                console.log("Ball written with ID: ", docRef.id);
                // localStorage.setItem("ballSelected", color);
            })
            .catch(function (error) {
                console.error("Error adding ball: ", error);
            });
    }

    addBall(color) {
        console.log("COLOR", color);
        this.add_ball(color);
        var temp = this.state.displayBalls.slice();
        switch (color) {
            case "red":
                temp.push(
                    <div className='jar-ball' style={{ backgroundColor: "red", backgroundImage: 'url(../assets/img/family.png)' }} />
                )
                this.setState({
                    red: this.state.red + 1
                })
                break;
            case "blue":
                temp.push(
                    <div className='jar-ball' style={{ backgroundColor: "blue", backgroundImage: 'url(../assets/img/friend.png)' }} />
                )
                this.setState({
                    blue: this.state.blue + 1
                })
                break;
            case "purple":
                temp.push(
                    <div className='jar-ball' style={{ backgroundColor: "purple", backgroundImage: 'url(../assets/img/society.png)' }} />
                )
                this.setState({
                    purple: this.state.purple + 1
                })
                break;
            case "green":
                temp.push(
                    <div className='jar-ball' style={{ backgroundColor: "darkslategray", backgroundImage: 'url(../assets/img/yourself.png)' }} />
                )
                this.setState({
                    green: this.state.green + 1
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
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    // console.log(doc.id, " => ", doc.data());
                    // console.log(JSON.stringify(doc.data().color));
                    balls.push(JSON.stringify(doc.data().color));
                });
                console.log(balls);
                return balls;
            }).catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    }

    renderBalls(balls) {
        if (balls === undefined) {
            return;
        }
        balls.forEach(function (ball) {
            switch (ball) {
                case "red":
                    temp.push(
                        <div className='jar-ball' style={{ backgroundColor: "red" }} />
                    )
                    this.setState({
                        red: this.state.red + 1
                    })
                    break;
                case "blue":
                    temp.push(
                        <div className='jar-ball' style={{ backgroundColor: "blue" }} />
                    )
                    this.setState({
                        blue: this.state.blue + 1
                    })
                    break;
                case "purple":
                    temp.push(
                        <div className='jar-ball' style={{ backgroundColor: "purple" }} />
                    )
                    this.setState({
                        purple: this.state.purple + 1
                    })
                    break;
                case "green":
                    temp.push(
                        <div className='jar-ball' style={{ backgroundColor: "green" }} />
                    )
                    this.setState({
                        green: this.state.green + 1
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
                                            onClick={() => this.addBall("red")}
                                        />
                                    </div>
                                    <div className='options'>
                                        <h3>Friends</h3>
                                        <div className='ball' style={{ backgroundColor: "blue", backgroundImage: 'url(../assets/img/friend.png)' }}
                                            onClick={() => this.addBall("blue")}
                                        />
                                    </div>
                                    <div className='options'>
                                        <h3>Society</h3>
                                        <div className='ball' style={{ backgroundColor: "purple", backgroundImage: 'url(../assets/img/society.png)' }}
                                            onClick={() => this.addBall("purple")}
                                        />
                                    </div>
                                    <div className='options'>
                                        <h3>Yourself</h3>
                                        <div className='ball' style={{ backgroundColor: "darkslategray", backgroundImage: 'url(../assets/img/yourself.png)' }}
                                            onClick={() => this.addBall("green")}
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
                                        {this.state.displayBalls}
                                    </div>
                                </div>
                                <div style={{ float: "left", marginLeft: "2em" }}>
                                    <h3>Family: {this.state.red}</h3>
                                    <h3>Friends: {this.state.blue}</h3>
                                    <h3>Society: {this.state.purple}</h3>
                                    <h3>Yourself: {this.state.green}</h3>
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
