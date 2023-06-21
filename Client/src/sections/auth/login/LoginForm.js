import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Stack, IconButton, InputAdornment, TextField, Button } from '@mui/material';
// Msg
import { ShowError, Success } from '../../../utils/showMessage';
// Services
import { GetInfoUser } from '../../../services/user-service'
import { CheckData } from '../../../services/account-service'
import { GetCartUser } from '../../../services/cart-service';
import { SaveLocalData } from '../../../utils/localData';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  // Account elements
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  function resetData() {
    setEmail('')
    setPassword('')
  }

  const helperEmail = () => {
    const regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regEmail.test(email.toLowerCase())) {
      return 'Example: example@example.com'
    }

    return ''
  }

  // CheckAccount
  const checkAccount = () => {
    const acc = { email, password };

    Promise.resolve(
      CheckData(acc)
    ).then((res) => {
      getDataUser(res.account)
    }).catch(error => {
      ShowError(error)
    })
  }

  const getDataUser = (account) => {
    const { user } = account

    Promise.resolve(
      GetInfoUser(user)
    ).then((res) => {
      const info = {
        'user': res._id,
        'role': res.userType
      }
      getDataCart(info)
    })
  }

  const getDataCart = (data) => {
    const { user } = data
    Promise.resolve(
      GetCartUser(user)
    ).then((res) => {
      const info = {
        'user': data.user,
        'role': data.role,
        'products': res.products
      }

      SaveLocalData(info)

      if (data.role === 'ADMIN') {
        navigate('/dashboard', { replace: true });
      } else {
        navigate('/dashboard/products', { replace: true });
      }

      Success('Welcome back!');
      resetData();
    })
  }

  return (
    <>
      <Stack spacing={5} component='form' autoComplete='off'>
        <TextField
          name="email"
          label="Email address"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          helperText={email && helperEmail()}
        />

        <TextField
          name="password"
          label="Password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button fullWidth size="large" variant="contained" onClick={checkAccount} disabled={email.length === 0 || password.length === 0 || password.length < 8}>
          Login
        </Button>
      </Stack>
    </>
  );
}
