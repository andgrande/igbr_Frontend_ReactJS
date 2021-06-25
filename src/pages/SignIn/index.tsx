import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/authContext';

import Button from '../../components/Button';
import { Header } from '../../components/Header';
import { Container, Login, LoginArea } from './styles';

const SignIn: React.FC = () => {
    const { signIn } = useAuth();
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit() {
        try {
            await signIn({ email, password });

            history.push('/classes');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Container>
            <Header omitMenu />
            <Login>
                <LoginArea>
                    <h4>Sign In</h4>

                    <input
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Button type="submit" onClick={() => handleSubmit()}>
                        Click
                    </Button>
                </LoginArea>
            </Login>
        </Container>
    );
};

export { SignIn };
