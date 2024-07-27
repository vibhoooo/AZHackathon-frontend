import { useNavigate } from 'react-router-dom';
import {Button} from "@mui/material";

function LogOut() {
    const navigate = useNavigate();

    const handleLogOut = async () => {
        const email = Object.keys(localStorage).find(key => localStorage.getItem(key)); // Find the email key in local storage
        if (!email) {
            alert('No user is currently logged in.');
            return;
        }

        try {
			const response = await fetch('https://azhackathon-backend-1.onrender.com/users/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem(email)}` // Send the token in Authorization header
                }
            });

            if (response.ok) {
                localStorage.removeItem(email); // Remove the access token from local storage
                navigate('/login'); // Redirect to login page
                alert('Logged out successfully');
            } else {
                throw new Error('Logout failed');
            }
        } catch (error) {
            console.error('Log Out error:', error.message);
            alert(error.message);
        }
    };

    return (
        <Button
            type='button'
            color='secondary'
            variant='contained'
            onClick={handleLogOut}
        >
            Log Out
        </Button>
    );
}

export default LogOut;