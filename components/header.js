import React, { Component } from 'react';
class Header extends Component {
    render() {
        return (
            <div>
                <head>
                    <meta charset="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <script src="https://code.jquery.com/jquery-3.2.1.min.js"
                        integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous">
                    </script>
                    <script src="./assets/js/main.js" defer></script>
                    <script src="./assets/js/appear.js" defer></script>
                    <script src='./assets/js/footprints-main.js' defer></script>

                    <title>ITASA ECC 2021</title>

                    {/* <!-- Google Fonts --> */}
                    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet" />
                    {/* <!-- Main CSS File --> */}
                    <link href="./assets/css/main.css" rel="stylesheet" />
                </head>
            </div>
        );
    }
}
export default Header;