import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import {
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Divider,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  Grid,
  FormControl,
  FormHelperText,
  Button,
} from '@mui/material';
// Utils
import { NewRegister, ShowMsg } from '../../../utils/showMessage';
// Services
import { AddNewUser, RemoveUser } from '../../../services/user-service';
import { AddNewAccount } from '../../../services/account-service';
import { GetStates } from '../../../services/state-service';
import { CreateCart } from '../../../services/cart-service';
import { SaveLocalData } from '../../../utils/localData';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();

  const [invalid, setInvalid] = useState(false);

  // User elements
  const [names, setNames] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [cellphone, setCellphone] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [cp, setCp] = useState('');
  const [delegation, setDelegation] = useState('');
  const [state, setState] = useState('');

  // Account elements
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [showPassword1, setShowPassword1] = useState(false);

  // State elements
  const [stateList, setStateList] = useState([]);
  const [delegationsList, setDelegationsList] = useState([]);

  // ------------------------------------------------------------------

  function resetInfo() {
    setNames('');
    setLastName('');
    setBirthday('');
    setCellphone('');
    setStreet('');
    setNumber('');
    setCp('');
    setDelegation('');
    setState('');
    setEmail('');
    setPassword('');
    setVerifyPassword('');
    setStateList([]);
    setDelegationsList([]);
    setInvalid(false);
  }

  // ------------------------------------------------------------------

  useEffect(() => {
    const resultStates = async () => {
      const states = await GetStates();
      setStateList(states);
    };
    resultStates();
  }, [setStateList]);

  // ------------------------------------------------------------------

  const insertData = () => {
    setInvalid(true);

    let invalidFields = false;

    const tmpUser = { names, lastName, birthday, cellphone, street, number, cp, delegation, state };

    Object.values(tmpUser).forEach((item) => {
      if (item === '') {
        invalidFields = true;
      }
    });

    if (!invalidFields) {
      createUser(tmpUser);
    }
  };

  const createUser = (user) => {
    Promise.resolve(AddNewUser(user))
      .then((res) => {
        createAccount(res._id);
      })
      .catch((err) => {
        const { data } = err.response;
        ShowMsg(data.status);
      });
  };

  const createAccount = (user) => {
    const account = { email, password, user };

    Promise.resolve(AddNewAccount(account))
      .then((res) => {
        createNewCart(res.user);
      })
      .catch((err) => {
        RemoveUser(user);
        const { data } = err.response;
        ShowMsg(data.status);
      });
  };

  const createNewCart = (userTmp) => {
    const userObj = {
      id: userTmp,
    };

    Promise.resolve(CreateCart(userObj))
      .then((res) => {
        const { data } = res;

        const info = {
          user: data.user,
          role: 'CLIENT',
          products: data.products,
        };

        SaveLocalData(info);

        navigate('/dashboard/products', { replace: true });

        NewRegister('Register success');
        resetInfo();
      })
      .catch((err) => {
        let error = null;
        if (err.response) {
          const { data } = err.response;
          error = data;
        } else {
          error = err;
        }

        ShowMsg(error);
      });
  };

  // ------------------------------------------------------------------

  const helperPassword = () => {
    const regNumber = /\d/;
    const regCapital = /[A-Z]/;
    const regLowercase = /[a-z]/;
    const regEspecial = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;

    if (password.length < 8) {
      return 'Min. lenngth is 8';
    }

    if (!regNumber.test(password)) {
      return 'Need a number';
    }

    if (!regCapital.test(password)) {
      return 'Need a capital letter';
    }

    if (!regLowercase.test(password)) {
      return 'Need a lowercase letter';
    }

    if (!regEspecial.test(password)) {
      return 'Need a character special';
    }

    return '';
  };

  const helperDate = () => {
    const regDate = /^\d{4}-\d{2}-\d{2}$/;

    if (!regDate.test(birthday)) {
      return 'ej: 1996-03-15';
    }

    return '';
  };

  const helperPhone = () => {
    const regPhone = /^[0-9]+$/;

    if (cellphone.length < 10) {
      return 'Invalid cellphone';
    }

    if (!regPhone.test(cellphone)) {
      return 'Only numbers';
    }

    return '';
  };

  const helperEmail = () => {
    const regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regEmail.test(email.toLowerCase())) {
      return 'Invalid email address';
    }

    return '';
  };

  return (
    <>
      <Grid container>
        <Grid item xs={3}>
          <Stack spacing={4}>
            <Divider>
              <Typography>Create an account</Typography>
            </Divider>

            <Stack spacing={5} component="form" autoComplete="off">
              <TextField
                required
                name="names"
                label="Name/s"
                value={names}
                onChange={(event) => {
                  setNames(event.target.value);
                }}
                error={!names && invalid}
                helperText={!names && invalid ? 'Invalid field' : ''}
              />

              <TextField
                required
                name="lastName"
                label="Last name"
                value={lastName}
                onChange={(event) => {
                  setLastName(event.target.value);
                }}
                error={!lastName && invalid}
                helperText={!lastName && invalid ? 'Invalid field' : ''}
              />

              <TextField
                required
                name="email"
                label="Email address"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                error={!email && invalid}
                helperText={!email && invalid ? 'Invalid field' : '' || (email && helperEmail())}
              />

              <TextField
                required
                name="password"
                label="Password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                type={showPassword1 ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword1(!showPassword1)} edge="end">
                        <Iconify icon={showPassword1 ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={!password && invalid}
                helperText={!password && invalid ? 'Invalid field' : '' || (password && helperPassword())}
              />

              <TextField
                required
                name="repeat password"
                label="Repeat password"
                value={verifyPassword}
                onChange={(event) => {
                  setVerifyPassword(event.target.value);
                }}
                type="password"
                error={(!verifyPassword && invalid) || !password.match(verifyPassword)}
                helperText={
                  !verifyPassword && invalid
                    ? 'Invalid field'
                    : '' || (verifyPassword && !password.match(verifyPassword))
                      ? "Passwords don't match"
                      : ''
                }
              />
            </Stack>
          </Stack>
        </Grid>

        <Divider orientation="vertical" variant="middle" flexItem sx={{ marginLeft: 4, marginRight: 4 }} />

        <Grid item xs={7.5}>
          <Stack spacing={4}>
            <Divider>
              <Typography>More information</Typography>
            </Divider>

            <Grid container>
              <Grid item xs={6.4}>
                <Stack spacing={5} component="form" autoComplete="off">
                  <FormControl required sx={{ width: '100%' }} error={!state && invalid}>
                    <InputLabel id="state-label">State</InputLabel>
                    <Select
                      labelid="state-label"
                      label="State"
                      name="state"
                      value={state}
                      onChange={(event) => {
                        setState(event.target.value);
                      }}
                    >
                      {stateList.map((state) => {
                        const { name, delegations } = state;

                        return (
                          <MenuItem
                            key={name}
                            value={name}
                            onClick={() => {
                              setDelegationsList(delegations);
                            }}
                          >
                            {name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    {!state && invalid ? <FormHelperText>Invalid field</FormHelperText> : null}
                  </FormControl>

                  <FormControl required sx={{ width: '100%' }} disabled={state === ''}>
                    <InputLabel id="delegation-label">
                      {state === '' ? 'Please select an state' : 'Delegation'}
                    </InputLabel>
                    <Select labelid="delegation-label" label="Delegation" name="delegation" value={delegation}>
                      {delegationsList.map((dele) => (
                        <MenuItem
                          key={delegationsList.indexOf(dele)}
                          value={dele}
                          onClick={(event) => {
                            setDelegation(event.target.textContent);
                          }}
                        >
                          {dele}
                        </MenuItem>
                      ))}
                    </Select>
                    {!delegation && invalid ? <FormHelperText>Invalid field</FormHelperText> : null}
                  </FormControl>

                  <TextField
                    inputProps={{
                      maxLength: 5,
                    }}
                    name="cp"
                    label="Zip Code"
                    value={cp}
                    onChange={(event) => {
                      setCp(event.target.value);
                    }}
                    error={!cp && invalid}
                    helperText={!cp && invalid ? 'Invalid field' : ''}
                  />

                  <TextField
                    name="street"
                    label="Street Name"
                    value={street}
                    onChange={(event) => {
                      setStreet(event.target.value);
                    }}
                    error={!street && invalid}
                    helperText={!street && invalid ? 'Invalid field' : ''}
                  />

                  <TextField
                    inputProps={{
                      maxLength: 4,
                    }}
                    name="number"
                    label="Number"
                    value={number}
                    onChange={(event) => {
                      setNumber(event.target.value);
                    }}
                    error={!number && invalid}
                    helperText={!number && invalid ? 'Invalid field' : ''}
                  />
                </Stack>
              </Grid>

              <Divider orientation="vertical" variant="middle" flexItem sx={{ marginLeft: 4, marginRight: 4 }} />

              <Grid item xs={4}>
                <Stack spacing={5} component="form" autoComplete="off">
                  <TextField
                    name="birthday"
                    label="Birthday"
                    value={birthday}
                    onChange={(event) => {
                      setBirthday(event.target.value);
                    }}
                    error={!birthday && invalid}
                    helperText={!birthday && invalid ? 'Invalid field' : '' || (birthday && helperDate())}
                  />

                  <TextField
                    inputProps={{ maxLength: 10 }}
                    name="cellphone"
                    label="Cell phone"
                    value={cellphone}
                    onChange={(event) => {
                      setCellphone(event.target.value);
                    }}
                    error={!cellphone && invalid}
                    helperText={!cellphone && invalid ? 'Invalid field' : '' || (cellphone && helperPhone())}
                  />

                  <TextField sx={{ visibility: 'hidden' }} />
                  <TextField sx={{ visibility: 'hidden' }} />

                  <Button size="large" variant="contained" onClick={insertData}>
                    Register
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
