import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import ProfileIcon from '../iconComponent/ProfileIcon';
import GameIcon from '../iconComponent/GameIcon';
import GameActiveIcon from '../iconComponent/GameActiveIcon';
import ProfileActiveIcon from '../iconComponent/ProfileActiveIcon';
import LeaderboardIcon from '../iconComponent/LeaderboardIcon';
import LeaderboardActiveIcon from '../iconComponent/LeaderboardActiveIcon';
import './BottomNavBar.css'


const BottomNavBar = props => {
    const history = useHistory()
    const [activeTabs, setActiveTabs] = useState(props.name)
    useEffect(() => {
        switch (activeTabs) {
            case 'profile':
                history.push('/user')
                break;
            case 'survey':
                history.push('/')
                break;
            case 'leaderboard':
                history.push('/leaderboard')
                break;
            default:
                history.push('/')
                break;
        }
    }, [activeTabs, history])

    return (
        <div className='bottom-nav'>
            <div className='bn-tab'>
                {activeTabs === 'profile' ?
                    <ProfileActiveIcon

                        onClick={() => setActiveTabs('profile')}
                    /> :
                    <ProfileIcon

                        onClick={() => setActiveTabs('profile')}
                    />}
            </div>
            <div className='bn-tab' style={{ marginBottom: '30px' }}>
                {activeTabs === 'survey' ?
                    <GameActiveIcon

                        onClick={() => setActiveTabs('survey')}
                    /> :
                    <GameIcon

                        onClick={() => setActiveTabs('survey')}
                    />}
            </div>

            <div className='bn-tab' >
                {activeTabs === 'leaderboard' ?
                    <LeaderboardActiveIcon

                        onClick={() => setActiveTabs('leaderboard')}
                    /> :
                    <LeaderboardIcon

                        onClick={() => setActiveTabs('leaderboard')}
                    />}
            </div>
        </div>
    )
}

export default BottomNavBar