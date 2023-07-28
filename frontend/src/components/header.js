import React, { useState } from 'react'
import { Button, Avatar} from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {

    const [auth, setAuth] = useState(true)

    return (
        <div className='header'>
            <Link to={'/'} style={{ textDecoration: "none", color: '#000'}}>
                DNOMOODLE.COM
            </Link>

            <div>
                {
                    auth 
                    ?
                    <div className='header_user'>
                        <span>Студент</span>
                        <Avatar color="primary" variant="outlined" sx={{ marginLeft: '8px' }}>AN</Avatar>
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
