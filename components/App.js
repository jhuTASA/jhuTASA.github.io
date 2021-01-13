import React, { Component } from 'react';
import '../assets/css/interactive.css';

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
        localStorage.setItem("submitted", "false");
    }

    addBall(color) {
        // if(localStorage.getItem("submitted") == "true") {
        //     return;
        // }
        this.setState({
            jar: [
                ...this.state.jar, color
            ]
        })
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
        localStorage.setItem("submitted", true);
    }

    render() {
        return (
            <div className='interactive'>
                <div>
                    <h1 style={{ marginLeft: "1em" }}>Jar of Expectations</h1>
                    <p style={{ margin: "3em", marginTop: 0 }}>The different colored balls symbolize common expectations faced by Taiwanese and Taiwanese American students. Attendees are encouraged to choose a ball that represents the expectation that they feel has most affected them, resulting in a multi-colored jar of colors showcasing the frequency of these expectations.</p>
                    <div className='options-box'>
                        <h2 style={{ marginLeft: "1em", marginBottom: "0px" }}>Expectations</h2>
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
                    </div>
                </div>
                <div style={{ height: "500px" }}>
                    <h2 style={{ marginLeft: "1em", marginBottom: 5 }}>
                        Our Jar
                    </h2>
                    <div className='jar-container'>

                        <div
                            style={{
                                float: "left",
                                border: "3px solid black",
                                borderRadius: "15px",
                                borderTop: "none",
                                borderTopLeftRadius: "0px",
                                borderTopRightRadius: "0px",
                                height: "400px",
                                width: "270px",
                                // display: 'flex',
                                // justifyContent: 'center',
                                // alignItems: 'center',
                                // width: '100%',
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
                    </div>
                </div>
            </div >
        );
    }
}


export default App;