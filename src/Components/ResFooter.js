import React from 'react';
import { Link } from "react-router-dom";

const emoji = require("emoji-dictionary");
const ResFooter = () => {
    return (
        <div>
                <div>
                    <div style={{
                        position: 'absolute',
                        bottom: '0px',
                        display: 'flex',
                        justifyContent:'center',
                        alignItems:'center',
                        left:'50%',
                        right:'0',
                        transform:'translateX(-50%)'
                    }}>
                        <p style={{
                            color: '#B6B6B6',
                            fontFamily: 'Poppins'
                        }}>© 2022, Made with {emoji.getUnicode(':heart:')} By <a style={{ textDecoration: 'none' }} href="https://www.cleinsight.com/"><b style={{ color: 'black', textDecoration: 'none' }}>Cleinsight</b></a> for a better web</p>
                    </div>
                </div>
        </div>
    );
};

export default ResFooter;