import React, { useContext, useState } from 'react'
import { Button, Avatar} from '@mui/material';
import { Link } from 'react-router-dom';
import { Context } from '..';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import Cookies from 'universal-cookie';

const Header = () => {

    const {user} = useContext(Context)
    const cookies = new Cookies();

    const logout = () => {
        cookies.remove('token')
        window.location.reload()
    }

    return (
        <div className='header'>
            <Link to={'/'} style={{ textDecoration: "none", color: '#000'}}>
                HAKATON.COM
            </Link>

            <div>
                {
                    user.auth 
                    ?
                    <div className='header_user'>
                        <span style={{ fontWeight: 700 }}>{user.name}</span>
                        <Avatar color="primary" variant="outlined" sx={{ marginLeft: '8px' }}>
                            {user.data.name[0] + user.data.surname[0]}
                        </Avatar>

                        <MeetingRoomIcon color="info" onClick={logout} sx={{ cursor: 'pointer', marginLeft: '5px' }}/>
                    </div>
                    :
                    <Link to={'/login'}>
                        <Button
                            variant="outlined" 
                        >
                            Войти
                        </Button>
                    </Link>
                }
            </div>
        </div>
    );
}

export default Header;
