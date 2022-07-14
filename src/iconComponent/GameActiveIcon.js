import * as React from 'react';
import { useHistory } from 'react-router-dom'

function GameActiveIcon() {
    const history = useHistory()
    return (
        <svg width="63" height="63" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="63" height="63" rx="16" fill="#BCFFEF" />
            <rect x="6" y="6" width="51" height="51" rx="14" fill="#00E3B6" />
            <path fillRule="evenodd" clipRule="evenodd" d="M27.6254 15C27.2524 15 26.9505 15.3014 26.9505 15.6731V18.3654C26.9505 18.5675 27.0395 18.7489 27.1812 18.8722C27.2998 18.9757 27.4554 19.0385 27.6254 19.0385H28.3004V20.6288C26.4094 20.9752 24.6436 21.6788 23.0762 22.6671L22.2978 21.5362L22.4204 21.4521C22.7282 21.2417 22.806 20.8227 22.5951 20.5161L21.9597 19.5932C21.7488 19.2869 21.3289 19.209 21.0218 19.4194L18.0578 21.4481C17.7506 21.6585 17.6722 22.0775 17.8838 22.3838L18.5185 23.3067C18.7294 23.6133 19.1499 23.6912 19.4571 23.4808L19.5803 23.3964L20.4958 24.7264C17.8119 27.4056 16.1516 31.1059 16.1516 35.1923C16.1516 43.3705 22.7994 50 31.0001 50C39.2008 50 45.8486 43.3705 45.8486 35.1923C45.8486 31.0033 44.1046 27.2209 41.3007 24.5273L42.0791 23.3964L42.2024 23.4808C42.5095 23.6912 42.93 23.6133 43.1409 23.3067L43.7757 22.3838C43.9866 22.0775 43.9088 21.6585 43.6017 21.4481L40.6376 19.4194C40.3305 19.209 39.91 19.2869 39.6991 19.5932L39.0643 20.5161C38.9589 20.6699 38.9253 20.852 38.9576 21.0219C38.9892 21.1905 39.0854 21.3472 39.2383 21.4521L39.3616 21.5362L38.6847 22.5195C37.178 21.6088 35.4952 20.9578 33.6998 20.6288V19.0385H34.3748C34.4756 19.0385 34.5712 19.0164 34.6575 18.977C34.7366 18.9405 34.8071 18.8896 34.8658 18.8275C34.9798 18.7069 35.0497 18.5442 35.0497 18.3654V15.6731C35.0497 15.3014 34.7478 15 34.3748 15H27.6254ZM31.0001 47.3077C37.7099 47.3077 43.1489 41.8833 43.1489 35.1923C43.1489 28.5013 37.7099 23.0769 31.0001 23.0769C24.2903 23.0769 18.8513 28.5013 18.8513 35.1923C18.8513 41.8833 24.2903 47.3077 31.0001 47.3077Z" fill="#004277" />
            <path d="M29.9698 39.3939C29.6751 39.3939 29.3805 39.2829 29.1556 39.0596L26.0344 35.9603C25.5846 35.5136 25.5846 34.79 26.0344 34.3447C26.4842 33.898 27.2116 33.8967 27.6614 34.3434L29.9698 36.6355L35.3993 31.2441C35.8491 30.7974 36.5765 30.7974 37.0263 31.2441C37.4761 31.6907 37.4761 32.4143 37.0263 32.861L30.7839 39.0596C30.559 39.2829 30.2644 39.3939 29.9698 39.3939Z" fill="#004277" />
            <path d="M29.9698 39.3939C29.6751 39.3939 29.3805 39.2829 29.1556 39.0596L26.0344 35.9603C25.5846 35.5136 25.5846 34.79 26.0344 34.3447C26.4842 33.898 27.2116 33.8967 27.6614 34.3434L29.9698 36.6355L35.3993 31.2441C35.8491 30.7974 36.5765 30.7974 37.0263 31.2441C37.4761 31.6907 37.4761 32.4143 37.0263 32.861L30.7839 39.0596C30.559 39.2829 30.2644 39.3939 29.9698 39.3939" stroke="#004277" strokeWidth="0.5" strokeLinejoin="round" />
        </svg>


    );
}

export default GameActiveIcon;