import React, { Component } from 'react';
import '../assets/css/interactive.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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
            familyDialog: false,
            friendsDialog: false,
            societyDialog: false,
            yourselfDialog: false,
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
        this.countBalls = this.countBalls.bind(this)
        this.renderBalls = this.renderBalls.bind(this)
        this.expectationsDialog = false;
        this.updateSuccessMsg = this.updateSuccessMsg.bind(this)
        this.updateSuccessUsername = this.updateSuccessUsername.bind(this)
        this.updateWallMsg = this.updateWallMsg.bind(this)
    }


    // RESTful add call to firebase
    add_ball(color) {
        console.log("ADDING HERE", color);
        this.resetCounts();
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
        var totalCount = this.redCount + this.blueCount + this.greenCount + this.purpleCount;
        switch (color) {
            case "red":
                if(totalCount < 240)
                    return <div className='jar-ball animated fadeInDown' style={{ backgroundColor: "red", backgroundImage: 'url(../assets/img/family.png)' }} />
                return;
            case "blue":
                if(totalCount < 240)
                    return <div className='jar-ball animated fadeInDown' style={{ backgroundColor: "blue", backgroundImage: 'url(../assets/img/friend.png)' }} />
                return;
            case "purple":
                if(totalCount < 240)
                    return <div className='jar-ball animated fadeInDown' style={{ backgroundColor: "purple", backgroundImage: 'url(../assets/img/society.png)' }} />
                return;
            case "green":
                if(totalCount < 240)
                    return <div className='jar-ball animated fadeInDown' style={{ backgroundColor: "darkslategray", backgroundImage: 'url(../assets/img/yourself.png)' }} />
                return;
        }
    }

    renderBalls(jar) {
        if (jar.length !== 0) this.countBalls(jar);
        return(
            <div style={{backgroundColor: "red"}}>
                {jar.map((value) => (this.addBall(value.color)))}
            </div>
        )
    }

    countBalls(jar) {
        let currentComponent = this;
        var red=0; 
        var blue = 0; 
        var purple = 0;
        var green = 0;
        for (var i = 0; i < jar.length; i++) {
            switch(jar[i].color) {
                case 'red':
                    red++;
                    break;
                case 'blue':
                    blue++;
                    break;
                case 'purple':
                    purple++;
                    break;
                case 'green':
                    green++;
                    break;
                default:
                    break;
            }
        }
        this.greenCount = green;
        this.redCount = red;
        this.blueCount = blue;
        this.purpleCount = purple;
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

        db.collection("expectations-jar").orderBy("time", "asc").get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    balls.push(doc.data());
                });
                //handle jar overflow: randomize array (will eventually only take the first 240 elements)
                if (balls.length > 240) {
                    balls.sort(function() { return 0.5 - Math.random() });
                }
                console.log("Balls gotten", balls);
                currentComponent.setState({
                    jar: balls
                })
            }).catch(function (error) {
                console.log("Error getting documents: ", error);
            });
        window.setInterval(function() {
            db.collection("expectations-jar").orderBy("time", "asc").get()
            .then(function (querySnapshot) {
                var newBalls = []
                querySnapshot.forEach(function (doc) {
                    newBalls.push(doc.data());
                });
                if (newBalls !== balls) {
                    balls = newBalls;
                    currentComponent.setState({
                        jar: newBalls
                    })
                }
                //handle jar overflow: randomize array (will eventually only take the first 240 elements)
                if (newBalls.length > 240) {
                    newBalls.sort(function() { return 0.5 - Math.random() });
                }
            }).catch(function (error) {
                console.log("Error getting documents: ", error);
            });
        }, 10000);
    }

    getSuccesses() {
        let currentComponent = this;
        var successes = []
        db.collection("successes").get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    var data = doc.data();
                    data['uid'] = doc.id;
                    successes.push(data);
                });
                console.log(successes);
                // sort successes from most recent to oldest
                successes.sort(function(a,b){
                    return b.time - a.time;
                });
                currentComponent.setState({
                    successes: successes
                })
            }).catch(function (error) {
                console.log("Error getting documents: ", error);
        });
        window.setInterval(function() {
            db.collection("successes").get()
            .then(function (querySnapshot) {
                var newSuccesses = []
                querySnapshot.forEach(function (doc) {
                    var data = doc.data();
                    data['uid'] = doc.id;
                    newSuccesses.push(data);
                });
                // sort successes from most recent to oldest
                newSuccesses.sort(function(a,b){
                    return b.time - a.time;
                });
                if (newSuccesses !== successes) {
                    currentComponent.setState({
                        successes: newSuccesses
                    })
                }
            }).catch(function (error) {
                console.log("Error getting documents: ", error);
        });
        }, [5000])
    }

    getEncouragements() {
        let currentComponent = this;
        var encouragements = []
        db.collection("wall-of-encouragement").get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    var data = doc.data();
                    data['uid'] = doc.id;
                    encouragements.push(data);
                    console.log(encouragements);
                });
                // sort encouragements from most recent to oldest
                encouragements.sort(function(a,b){
                    return b.time - a.time;
                });
                console.log(encouragements);
                currentComponent.setState({
                    encouragements: encouragements
                })
            }).catch(function (error) {
                console.log("Error getting documents: ", error);
            });

        window.setInterval(function() {
            db.collection("wall-of-encouragement").get()
            .then(function (querySnapshot) {
                var newEncouragements = []
                querySnapshot.forEach(function (doc) {
                    var data = doc.data();
                    data['uid'] = doc.id;
                    newEncouragements.push(data);
                });
                // sort successes from most recent to oldest
                newEncouragements.sort(function(a,b){
                    return b.time - a.time;
                });
                if (newEncouragements !== encouragements) {
                    currentComponent.setState({
                        encouragements: newEncouragements
                    })
                }
            }).catch(function (error) {
                console.log("Error getting documents: ", error);
        });
        }, [5000])
    }

    addSuccess() {
        if (this.state.successMsg) {
            if (!this.state.successUsername) { 
                this.setState({
                    successUsername: "Anonymous"
                })
            } 
            db.collection("successes").add({
                username: this.state.successUsername,
                message: this.state.successMsg,
                likes: 0,
                time: (new Date()).getTime(),
            })
            .then(function (docRef) {
                console.log("Success written with ID: ", docRef.id);
            })
            .catch(function (error) {
                console.error("Error adding Success: ", error);
            });
            this.getSuccesses();
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
                    time: (new Date()).getTime(),
                })
                .then(function (docRef) {
                    console.log("Encouragement written with ID: ", docRef.id);
                })
                .catch(function (error) {
                    console.error("Error adding Encouragement: ", error);
                });
                this.getEncouragements();
                console.log(this.state.encouragements);
            } else {
                db.collection("successes").add({
                    username: "Anonymous",
                    message: this.state.wallMsg,
                    likes: 0,
                    time: (new Date()).getTime(),
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

                <div style={{ position: "relative", paddingTop: "calc(1vh + 60px)", marginBottom: "50px", zIndex: 3}}>

                    {/* EXPECTATIONS JAR */}
                    <Dialog open={this.state.familyDialog} fullWidth maxWidth='sm'
                        onClose={()=>this.setState({familyDialog: false})}>
                        <DialogTitle>
                            <div style={{display: "flex", flexDirection: "row"}}>
                                <img src="../assets/img/family.png" style={{height: "3em", width: 'auto', borderRadius: "50%"}}/>
                                <Typography style={{fontSize: "2em"}}>
                                    Family
                                </Typography>
                            </div>
                        </DialogTitle>

                        <DialogContent>
                            <Grid container xs={12}>
                                <Grid item xs={5}>
                                    <img src="../assets/img/family_bg.png"  className="dialog_img"/>                                
                                </Grid>
                                <Grid item xs={7}>
                                    <Typography float="right" variant="body1">
                                        Family is important!
                                    </Typography>
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="outlined" onClick={()=>this.setState({familyDialog: false})}>
                                Look at others
                            </Button>
                            <Button variant="outlined"
                                onClick={()=>{
                                    this.setState({familyDialog: false}); 
                                    this.add_ball("red");
                                }}>
                                Choose marble
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog open={this.state.friendsDialog} fullWidth maxWidth='sm'
                        onClose={()=>this.setState({friendsDialog: false})}>
                        <DialogTitle>
                            <div style={{display: "flex", flexDirection: "row"}}>
                                <img src="../assets/img/friend.png" style={{height: "3em", width: 'auto', borderRadius: "50%"}}/>
                                <Typography style={{fontSize: "2em"}}>
                                    Friends
                                </Typography>
                            </div>
                        </DialogTitle>
                        <DialogContent>
                            <Grid container xs={12}>
                                <Grid item xs={5}>
                                    <img src="../assets/img/friends_bg.png"  className="dialog_img"/>                                
                                </Grid>
                                <Grid item xs={7}>
                                    <Typography float="right" variant="body1">
                                        Friends are important!
                                    </Typography>
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="outlined" onClick={()=>this.setState({friendsDialog: false})}>
                                Look at others
                            </Button>
                            <Button variant="outlined"
                                onClick={()=>{
                                    this.setState({friendsDialog: false}); 
                                    this.add_ball("blue");
                                }}>
                                Choose marble
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog open={this.state.societyDialog} fullWidth maxWidth='sm'
                        onClose={()=>this.setState({societyDialog: false})}>
                        <DialogTitle>
                            <div style={{display: "flex", flexDirection: "row"}}>
                                <img src="../assets/img/society.png" style={{height: "3em", width: 'auto', borderRadius: "50%"}}/>
                                <Typography style={{fontSize: "2em"}}>
                                    Society
                                </Typography>
                            </div>
                        </DialogTitle>
                        <DialogContent>
                        <Grid container xs={12}>
                            <Grid item xs={5}>
                                <img src="../assets/img/society_bg.png"  className="dialog_img"/>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography float="right" variant="body1">
                                    Society is important!
                                </Typography>
                            </Grid>
                        </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="outlined" onClick={()=>this.setState({societyDialog: false})}>
                                Look at others
                            </Button>
                            <Button variant="outlined"
                                onClick={()=>{
                                    this.setState({societyDialog: false}); 
                                    this.add_ball("purple");
                                }}>
                                Choose marble
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog open={this.state.yourselfDialog} fullWidth maxWidth='sm'
                        onClose={()=>this.setState({yourselfDialog: false})}>
                        <DialogTitle>
                            <div style={{display: "flex", flexDirection: "row"}}>
                                <img src="../assets/img/yourself.png" style={{height: "3em", width: 'auto', borderRadius: "50%"}}/>
                                <Typography style={{fontSize: "2em"}}>
                                    Yourself
                                </Typography>
                            </div>
                        </DialogTitle>
                        <DialogContent>
                            <Grid container xs={12}>
                                <Grid item xs={5}>
                                    <img src="../assets/img/yourself_bg.png"  className="dialog_img"/>
                                </Grid>
                                <Grid item xs={7}>
                                    <Typography float="right" variant="body1">
                                        [some blurb here]
                                    </Typography>
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="outlined" onClick={()=>this.setState({yourselfDialog: false})}>
                                Look at others
                            </Button>
                            <Button variant="outlined"
                                onClick={()=>{
                                    this.setState({yourselfDialog: false}); 
                                    this.add_ball("green");
                                }}>
                                Choose marble
                            </Button>
                        </DialogActions>
                    </Dialog>
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
                                        <div className='ball' style={{ zIndex: 1, backgroundColor: "red", backgroundImage: 'url(../assets/img/family.png)' }}
                                            onClick={()=>this.setState({familyDialog: true})}
                                        />
                                    </div>
                                    <div className='options'>
                                        <h3>Friends</h3>
                                        <div className='ball' style={{ zIndex: 1, backgroundColor: "blue", backgroundImage: 'url(../assets/img/friend.png)' }}
                                            onClick={()=>this.setState({friendsDialog: true})}
                                        />
                                    </div>
                                    <div className='options'>
                                        <h3>Society</h3>
                                        <div className='ball' style={{ zIndex: 1, backgroundColor: "purple", backgroundImage: 'url(../assets/img/society.png)' }}
                                            onClick={()=>this.setState({societyDialog: true})}
                                        />
                                    </div>
                                    <div className='options'>
                                        <h3>Yourself</h3>
                                        <div className='ball' style={{ zIndex: 1, backgroundColor: "darkslategray", backgroundImage: 'url(../assets/img/yourself.png)' }}
                                            onClick={()=>this.setState({yourselfDialog: true})}
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
                                    height: "50vh",
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
                    <div style={{zIndex: 1}}>
                        <Container maxWidth={'lg'} style={{zIndex: 1,}}>
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
                            <div style={{overflowY: "scroll", height: "80%", zIndex: 1,}}>
                                {this.state.successes.map(success =>
                                    <Success 
                                        message={success.message}
                                        likes={success.likes}
                                        time={success.time}
                                        username={success.username}
                                        uid={success.uid} 
                                        type="success"/>
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
                                        username={encouragement.username} 
                                        uid={encouragement.uid}
                                        type="encouragement"
                                        />
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