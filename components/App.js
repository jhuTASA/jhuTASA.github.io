import React, { Component } from 'react';
import '../assets/css/interactive.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jar: {},
            displayBalls: [],
        }
    }

    renderBalls(jar) {
        var temp = this.state.displayBalls.slice();
        for (var i = 0; i < jar.length(); i++) {
            switch(jar[i]) {
                case "red":
                    temp.push(
                        <div className='ball' style={{backgroundColor: "red"}} />
                    ) 
                    break;
            }
            this.setState(displayBalls, temp);
        }
    }
    
    addBall(color) {
        this.setState({
            jar: [
                ...this.state.jar, color
            ]
        })
        var temp = this.state.displayBalls.slice();
        switch(color) {
            case "red":
                temp.push(
                    <div className='jar-ball' style={{backgroundColor: "red"}} />
                ) 
                break;
            case "blue":
                temp.push(
                    <div className='jar-ball' style={{backgroundColor: "blue"}} />
                ) 
                break;
            case "purple":
                temp.push(
                    <div className='jar-ball' style={{backgroundColor: "purple"}} />
                ) 
                break;
            case "green":
                temp.push(
                    <div className='jar-ball' style={{backgroundColor: "green"}} />
                ) 
                break;
        }
        console.log("Temp", temp);
        this.setState({
            displayBalls: temp
        });
    }

    render() {
        return (
            <div className='interactive'>
                <div>
                    <h1 style={{marginLeft: "1em"}}>Jar of Expectations</h1>
                    <p style={{margin: "3em", marginTop: 0}}>The different colored balls symbolize common expectations faced by Taiwanese and Taiwanese American students. Attendees are encouraged to choose a ball that represents the expectation that they feel has most affected them, resulting in a multi-colored jar of colors showcasing the frequency of these expectations.</p>
                    <div className='options-box'>
                        <h2 style={{marginLeft: "1em", marginBottom: "0px"}}>Expectations</h2>
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
                    </div>
                </div>
                <div >
                    <h2 style={{marginLeft: "1em", marginBottom: 5}}>
                        Your Jar
                    </h2>
                    <div 
                        style={{
                            border: "3px solid black", 
                            borderRadius: "15px",
                            borderTop: "none",
                            borderTopLeftRadius: "0px",
                            borderTopRightRadius: "0px",
                            height: "400px", 
                            width: "290px",
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
                </div>
            </div>
        );
    }
}


export default App;