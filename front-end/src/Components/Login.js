import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        const res = await fetch('https://back-end-barl.onrender.com/api/login', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const data = await res.json();
        if (res.ok) {
            if (data.role === 'admin') navigate('/admindashboard');
            else if (data.role === 'owner') navigate('/ownerdashboard');
        } else {
            setError(data.message);
        }
    };

    return (
        <div className='login'>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input placeholder="Username" value={username}
                    onChange={e => setUsername(e.target.value)} required /><br /> <br />

                <input type="password" placeholder="Password" value={password}
                    onChange={e => setPassword(e.target.value)} required /><br /><br />

                <button type="submit">Login</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Login;
