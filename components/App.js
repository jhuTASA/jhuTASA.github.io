import React, { Component } from 'react';
import '../assets/css/interactive.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Success from './Success'
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
            ballsRendered: false,
            successes: [],
            successMsg: "",
            successUsername: "",
            encouragements: [],
            wallMsg: "",
            wallUsername: "",
        }
        this.redCount = 0;
        this.blueCount = 0;
        this.greenCount = 0;
        this.purpleCount = 0;
        this.addBall = this.addBall.bind(this)
        this.renderBalls = this.renderBalls.bind(this)
        this.expectationsDialog = false;
        this.updateSuccessMsg = this.updateSuccessMsg.bind(this)
        this.updateSuccessUsername = this.updateSuccessUsername.bind(this)
        this.updateWallMsg = this.updateWallMsg.bind(this)
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
        console.log("Add Ball Call")
        var totalCount = this.redCount + this.blueCount + this.greenCount + this.purpleCount;
        switch (color) {
            case "red":
                this.redCount++;
                if(totalCount > 240)
                    return <div className='jar-ball' style={{ backgroundColor: "red", backgroundImage: 'url(../assets/img/family.png)' }} />
                return;
            case "blue":

                this.blueCount++;
                if(totalCount > 240)
                    return <div className='jar-ball' style={{ backgroundColor: "blue", backgroundImage: 'url(../assets/img/friend.png)' }} />
                return;
            case "purple":

                this.purpleCount++;
                if(totalCount > 240)
                    return <div className='jar-ball' style={{ backgroundColor: "purple", backgroundImage: 'url(../assets/img/society.png)' }} />
                return;
            case "green":

                this.greenCount++;
                if(totalCount > 240)
                    return <div className='jar-ball' style={{ backgroundColor: "darkslategray", backgroundImage: 'url(../assets/img/yourself.png)' }} />
                return;
        }
    }

    renderBalls(jar) {
        if (!this.state.ballsRendered) {
            console.log("Balls RENDERED", this.state.ballsRendered);
            return(
                <div>
                    {jar.map((value) => (this.addBall(value)))}
                </div>
            )
        }
        this.setState({ballsRendered: true})
        return;
        
    }

    componentDidMount() {
        this.renderBalls(this.state.jar);
        this.setState({
            ballsRendered: true,
        })
    }

    ballDialog(ball) {
        var description = "";
        var title = "";
        var img = "";
        switch(ball) {
            case 'Family':
                description = "Family is important!"
                title = "Family"
                break;
            case 'Friends':
                description = "Love your friends!"
                title = "Friends"
                break;
            case 'Society':
                description = "We live in a society!"
                title = "friends"
                break;
            case 'Yourself':
                description = "Love yourself girl"
                title = "Yourself"
                break;
            default:
                break;
        }

        return(
            <Grid container xs={12}>
                <Typography variant="h2" style={{marginBottom: "5%"}}>
                    {title}
                </Typography>
                <Typography variant="h3">
                    {description}
                </Typography>
            </Grid>
        )
    }

    resetCounts() {
        this.redCount = 0;
        this.blueCount = 0;
        this.purpleCount = 0;
        this.greenCount = 0;
    }

    componentDidMount() {
        this.getSuccesses()
        this.getEncouragements()
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

                //handle jar overflow: randomize array (will eventually only take the first 240 elements)
                if (balls.length > 240) {
                    balls.sort(function() { return 0.5 - Math.random() });
                }

                currentComponent.setState({
                    jar: balls
                })
            }).catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    }

    getSuccesses() {
        let currentComponent = this;
        var successes = []
        db.collection("successes").get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    successes.push(doc.data());
                });
                console.log(successes);
                currentComponent.setState({
                    successes: successes
                })
            }).catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    }

    getEncouragements() {
        let currentComponent = this;
        var encouragements = []
        db.collection("wall-of-encouragement").get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    encouragements.push(doc.data());
                });
                currentComponent.setState({
                    encouragements: encouragements
                })
            }).catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    }

    addSuccess() {
        if (this.state.successMsg) {
            if (this.state.successUsername) { 
                db.collection("successes").add({
                    username: this.state.successUsername,
                    message: this.state.successMsg,
                    likes: 0,
                    time: new Date(),
                })
                .then(function (docRef) {
                    console.log("Success written with ID: ", docRef.id);
                })
                .catch(function (error) {
                    console.error("Error adding Success: ", error);
                });
                this.getSuccesses();
            } else {
                db.collection("successes").add({
                    username: "Anonymous",
                    message: this.state.successMsg,
                    likes: 0,
                    time: new Date(),
                })
                .then(function (docRef) {
                    console.log("Success written with ID: ", docRef.id);
                })
                .catch(function (error) {
                    console.error("Error adding Success: ", error);
                });
                this.getSuccesses();
            }
            this.setState({
                successMsg: ""
            })
        } else {
            // handle blank message
        }
    }

    addToWall() {
        if (this.state.wallMsg) {
            if (this.state.successUsername) { 
                db.collection("wall-of-encouragement").add({
                    username: this.state.successUsername,
                    message: this.state.wallMsg,
                    likes: 0,
                    time: new Date(),
                })
                .then(function (docRef) {
                    console.log("Encouragement written with ID: ", docRef.id);
                })
                .catch(function (error) {
                    console.error("Error adding Encouragement: ", error);
                });
                this.getEncouragements();
            } else {
                db.collection("successes").add({
                    username: "Anonymous",
                    message: this.state.wallMsg,
                    likes: 0,
                    time: new Date(),
                })
                .then(function (docRef) {
                    console.log("Encouragement written with ID: ", docRef.id);
                })
                .catch(function (error) {
                    console.error("Error adding Encouragement: ", error);
                });
                this.getEncouragements();
            }
            this.setState({
                wallMsg: ""
            })
        } else {
            // handle blank message
        }
    }

    updateSuccessUsername(event) {
        this.setState({
            successUsername: event.target.value
        })
    }
    updateSuccessMsg(event) {
        this.setState({
            successMsg: event.target.value,
        });
    }
    updateWallMsg(event) {
        this.setState({
            wallMsg: event.target.value,
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
                        <h2 style={{ marginLeft: "3vw", marginBottom: "0px", fontSize: "calc(18px + 0.6em)" }}>
                            Our Jar
                        </h2>
                        <Grid container spacing={3} style={{ marginBottom: "25vh" }}>
                            <Grid item md={2} xs={0}>
                            </Grid>
                            <Grid item xs={8}>
                                <div style={{
                                    zIndex: 1,
                                    float: "left",
                                    border: "3px solid black",
                                    borderRadius: "15px",
                                    borderTop: "none",
                                    borderTopLeftRadius: "0px",
                                    borderTopRightRadius: "0px",
                                    marginTop: "10vh",
                                    position: "relative",
                                    height: "130%",
                                    width: "100%",
                                }}>
                                    <div style={{
                                        zIndex: 1,
                                        transform: 'scaleY(-1)',
                                        position: "absolute",
                                        width: "100%",
                                        height: "100%",
                                        paddingLeft: "0.5%",
                                        marginBottom: "1%",
                                    }}>
                                        {this.renderBalls(this.state.jar)}
                                    </div>
                                </div>
                            </Grid>
                            <Grid item md={2} xs={4}>
                                <div style={{ float: "left", marginLeft: "1%", marginTop: '10vh'}}>
                                    <h3>Family: {this.redCount}</h3>
                                    <h3>Friends: {this.blueCount}</h3>
                                    <h3>Society: {this.purpleCount}</h3>
                                    <h3>Yourself: {this.greenCount}</h3>
                                </div>
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
                                zIndex: 1,
                            }}>
                                <div style={{
                                    backgroundColor: "rgb(112,168,97, 0.4)",
                                    width: "100%",
                                    borderTopLeftRadius: "15px",
                                    borderTopRightRadius: "15px",
                                    borderBottom: "1px solid #c4c4c4",
                                }}>
                                    <Grid container>
                                        <Grid item xs={3}>
                                            <TextField placeholder="Your name (optional)"
                                                style={{
                                                    zIndex: 1,
                                                    width: "80%",
                                                    backgroundColor: "white",
                                                    padding: "8px",
                                                    fontSize: "calc(16px + 0.2em)",
                                                    borderRadius: "5px",
                                                    border: "1px solid gray",
                                                    marginTop: "10px",
                                                    marginLeft: "1em",
                                                }}
                                                onChange={this.updateSuccessUsername}
                                                value={this.state.successUsername}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField placeholder="Share a success!"
                                                variant="standard"
                                                multiline rows={3}
                                                style={{
                                                    zIndex: "1",
                                                    backgroundColor: "white",
                                                    margin: "10px",
                                                    marginLeft: "1em",
                                                    width: "80%",
                                                    padding: "8px",
                                                    fontSize: "calc(14px + 0.2em)",
                                                    borderRadius: "5px",
                                                    border: "1px solid gray",
                                                }}
                                                onChange={this.updateSuccessMsg}
                                                value={this.state.successMsg}
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
                                                    width: '100%',
                                                    zIndex: 1,
                                                }}
                                                onClick={()=>this.addSuccess()}>
                                                <Typography variant="body1" style={{ color: "white" }}>
                                                    Share
                                                </Typography>
                                            </Button>
                                        </Grid>
                                        <Grid item xs={'auto'}>
                                        </Grid>
                                    </Grid>
                                </div>
                            <div style={{overflowY: "scroll", height: "80%",}}>
                                {this.state.successes.map(success =>
                                    <Success 
                                        message={success.message}
                                        likes={success.likes}
                                        time={success.time}
                                        username={success.username} />
                                )}
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
                                    <Grid container>
                                        <Grid item xs={3}>
                                            <TextField placeholder="Your name (optional)"
                                                style={{
                                                    zIndex: 1,
                                                    width: "80%",
                                                    backgroundColor: "white",
                                                    padding: "8px",
                                                    fontSize: "calc(16px + 0.2em)",
                                                    borderRadius: "5px",
                                                    border: "1px solid gray",
                                                    marginTop: "10px",
                                                    marginLeft: "1em",
                                                }}
                                                onChange={this.updateSuccessUsername}
                                                value={this.state.successUsername}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField placeholder="Share some encouragement!"
                                                variant="standard"
                                                multiline rows={3}
                                                style={{
                                                    zIndex: 1,
                                                    backgroundColor: "white",
                                                    margin: "10px",
                                                    marginLeft: "1em",
                                                    width: "80%",
                                                    padding: "8px",
                                                    fontSize: "calc(14px + 0.2em)",
                                                    borderRadius: "5px",
                                                    border: "1px solid gray",
                                                }}
                                                onChange={this.updateWallMsg}
                                                value={this.state.wallMsg}
                                            />
                                        </Grid>
                                        <Grid item xs={'auto'} />
                                        <Grid item xs={2}>
                                            <Button variant="contained"
                                                style={{
                                                    zIndex: 1,
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
                                                <Typography variant="body1" style={{ color: "white" }}
                                                    onClick={()=>this.addToWall()}>
                                                    Share
                                        </Typography>
                                            </Button>
                                        </Grid>
                                        <Grid item xs={'auto'} />
                                    </Grid>
                                </div>
                                <div style={{overflowY: "scroll", height: "80%",}}>
                                {this.state.encouragements.map(encouragement =>
                                    <Success 
                                        message={encouragement.message}
                                        likes={encouragement.likes}
                                        time={encouragement.time}
                                        username={encouragement.username} />
                                    )}
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