// const db = firebase.firestore();
// var displayBalls = []

// document.addEventListener("DOMContentLoaded", event => {
//     const jarRef = db.collection("expectations-jar");
//     console.log(jarRef)
//     jarRef.get().then(expectationsJar => {
//         expectationsJar.forEach(doc => {
//             var data = doc.data().color
//             console.log(data)
//             displayBalls.slice().push(`<p>${data}</p>`)
//             // switch (data) {
//             //     case "red":
//             //         displayBalls.slice().push(
//             //             "<div className='jar-ball' style={{ backgroundColor: 'red', backgroundImage: 'url(../assets/img/family.png)' }} />"
//             //         )
//             //         // this.setState({
//             //         //     red: this.state.red + 1
//             //         // })
//             //         break;
//             //     case "blue":
//             //         displayBalls.slice().push(
//             //             `<div className='jar-ball' style={{ backgroundColor: "blue", backgroundImage: 'url(../assets/img/friend.png)' }} />`
//             //         )
//             //         // this.setState({
//             //         //     blue: this.state.blue + 1
//             //         // })
//             //         break;
//             //     case "purple":
//             //         displayBalls.slice().push(
//             //             `<div className='jar-ball' style={{ backgroundColor: "purple", backgroundImage: 'url(../assets/img/society.png)' }} />`
//             //         )
//             //         // this.setState({
//             //         //     purple: this.state.purple + 1
//             //         // })
//             //         break;
//             //     case "green":
//             //         displayBalls.slice().push(
//             //             `<div className='jar-ball' style={{ backgroundColor: "darkslategray", backgroundImage: 'url(../assets/img/yourself.png)' }} />`
//             //         )
//             //         // this.setState({
//             //         //     green: this.state.green + 1
//             //         // })
//             //         break;
//             // }
//             // marbles.push(doc.data())
//             // appendHTML = ''
//             // switch (data) {
//             //     case "red":
//             //         appendHTML = "<div id={'marble' + i} className='jar-ball' style={{ backgroundColor: 'red', backgroundImage: 'url(../assets/img/family.png)'}} />"
//             //         break;
//             //     case "blue":
//             //         appendHTML = "<div className='jar-ball' style={{ backgroundColor: 'blue', backgroundImage: 'url(../assets/img/friend.png)' }} />"
//             //         break;
//             //     case "purple":
//             //         appendHTML = "<div className='jar-ball' style={{ backgroundColor: 'purple', backgroundImage: 'url(../assets/img/society.png)' }} />"
//             //         break;
//             //     case "green":
//             //         appendHTML = "<div id={'marble' + i} className='jar-ball' style={{ backgroundColor: 'red', backgroundImage: 'url(../assets/img/family.png)'}} />"
//             //         break;
//             // }
//             // // document.getElementsByClassName('marbles').innerHTML += `<div className='jar-ball' style={{ backgroundColor: ${data} }} >${data}</div>`
//             // document.getElementById("jar-marbles").innerHTML += `<div className='jar-ball' style={{ backgroundColor: ${data} }} >${data}</div>`
//         })
//     })
// })

// let getMarbles = () => {return displayBalls}

// export default getMarbles 