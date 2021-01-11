import React, { Component } from 'react';
import '../assets/css/interactive.css';

class App extends Component {
    render() {
        return (
            <div className='interactive'>
                <div>
                    <h1>Jar of Expectations</h1>
                    <p>The different colored balls symbolize common expectations faced by Taiwanese and Taiwanese American students. Attendees are encouraged to choose a ball that represents the expectation that they feel has most affected them, resulting in a multi-colored jar of colors showcasing the frequency of these expectations.</p>

                    <div className='options-box'>
                        <h2>Expectations</h2>
                        <div className='options'>
                            <h3>Family</h3>
                            <img src='../assets/img/Marball.jpg'/>
                        </div>
                            <div className='options'>
                                <h3>Friends</h3>
                                <img src='../assets/img/Marball.jpg' />
                            </div>
                            <div className='options'>
                                <h3>Society</h3>
                                <img src='../assets/img/Marball.jpg' />
                            </div>
                            <div className='options'>
                                <h3>Yourself</h3>
                                <img src='../assets/img/Marball.jpg' />
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}


export default App;