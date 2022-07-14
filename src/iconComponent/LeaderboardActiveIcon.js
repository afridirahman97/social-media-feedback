import * as React from 'react';
import { useHistory } from 'react-router-dom'

function LeaderboardActiveIcon() {
    const history = useHistory()
    return (
        <svg width="28" height="30" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M14 6.37488C11.3076 6.37488 9.12501 8.55749 9.12501 11.2499C9.12501 13.9423 11.3076 16.1249 14 16.1249C16.6924 16.1249 18.875 13.9423 18.875 11.2499C18.875 8.55749 16.6924 6.37488 14 6.37488ZM11.375 11.2499C11.375 9.80013 12.5503 8.62488 14 8.62488C15.4498 8.62488 16.625 9.80013 16.625 11.2499C16.625 12.6996 15.4498 13.8749 14 13.8749C12.5503 13.8749 11.375 12.6996 11.375 11.2499Z" fill="#00E3B6" />
            <path fillRule="evenodd" clipRule="evenodd" d="M14 0.374878C7.99391 0.374878 3.12501 5.24378 3.12501 11.2499C3.12501 13.4521 3.77958 15.5014 4.90477 17.2139L1.02572 23.9326C0.805126 24.3147 0.828232 24.7904 1.08482 25.1493C1.3414 25.5082 1.7841 25.684 2.217 25.5989L6.13781 24.8282L7.43071 28.6091C7.57346 29.0265 7.94706 29.322 8.38618 29.3648C8.8253 29.4075 9.24887 29.1897 9.46947 28.8076L13.3391 22.1051C13.5577 22.1182 13.7781 22.1249 14 22.1249C14.2219 22.1249 14.4423 22.1182 14.6609 22.1051L18.5306 28.8076C18.7514 29.19 19.1755 29.4079 19.6151 29.3647C20.0546 29.3214 20.4281 29.025 20.5701 28.6068L21.8564 24.8182L25.7806 25.5985C26.2138 25.6846 26.6573 25.5093 26.9145 25.1503C27.1717 24.7913 27.1951 24.315 26.9743 23.9326L23.0952 17.2139C24.2204 15.5014 24.875 13.4521 24.875 11.2499C24.875 5.24378 20.0061 0.374878 14 0.374878ZM5.37501 11.2499C5.37501 6.48642 9.23655 2.62488 14 2.62488C18.7635 2.62488 22.625 6.48642 22.625 11.2499C22.625 16.0133 18.7635 19.8749 14 19.8749C9.23655 19.8749 5.37501 16.0133 5.37501 11.2499ZM10.9756 21.6988C9.24617 21.1991 7.69395 20.2817 6.43536 19.0628L4.21205 22.9137L6.6675 22.431C7.21958 22.3225 7.76694 22.6385 7.94899 23.1709L8.75868 25.5387L10.9756 21.6988ZM19.2378 25.5325L17.0244 21.6988C18.7538 21.1991 20.3061 20.2817 21.5647 19.0628L23.7844 22.9075L21.3277 22.419C20.7741 22.3089 20.2245 22.6262 20.0431 23.1607L19.2378 25.5325Z" fill="#00E3B6" />
        </svg>



    );
}

export default LeaderboardActiveIcon;