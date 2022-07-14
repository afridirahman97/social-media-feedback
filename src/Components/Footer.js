import React from 'react';
import { Link } from "react-router-dom";

function Footer() {

    const emoji = require("emoji-dictionary");

    return (

        <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: '30px',
            paddingRight: '30px'

        }}>
            <div>
                <p style={{
                    color: '#B6B6B6',
                    fontFamily: 'Poppins'
                }}>© 2022, Made with {emoji.getUnicode(':heart:')} By <b style={{ color: 'black' }}>Cleinsight</b> for a better web</p>



            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                fontFamily: 'Poppins',
                color: '#B6B6B6',
                padding: '10px'
            }}>
                <p style={{ paddingLeft: '10px' }}>Contact</p>
                <p style={{ paddingRight: '10px', paddingLeft: '10px' }}>Game Rule</p>
                <Link to={'/terms'} style={{ textDecoration: 'none' }} >
                    <p style={{ paddingRight: '10px',  color: '#B6B6B6', }}>Term</p>
                </Link>

            </div>

        </div>
    );
}

export default Footer;