import { useState, useEffect } from 'react';
// @mui
import {
    Grid,
    Button,
    Stack,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    InputAdornment,
    FormControl,
    Divider,
    Typography,
    IconButton,
} from '@mui/material';
// Icons
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
// Utils
import { ShowError } from '../../../utils/showMessage';
// Services
import { AddNewUser, RemoveUser } from '../../../services/user-service';
import { AddNewAccount } from '../../../services/account-service';
import { GetStates } from '../../../services/state-service';
// component
import Iconify from '../../../components/iconify';

export default function UserGridNew() {

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
    const [type, setType] = useState('');

    // Account elements
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    // State elements
    const [stateList, setStateList] = useState([]);
    const [delegationsList, setDelegationsList] = useState([]);

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
    }

    useEffect(() => {
        const resultStates = async () => {
            const states = await GetStates();
            setStateList(states);
        }
        resultStates();
    }, [setStateList]);

    const validPasswords = () => {
        if (!password.match(verifyPassword)) {
            ShowError('Passwords do not match')
        }

        addUser();
    };

    const newUser = async (user) => {
        try {
            const res = await Promise.resolve(AddNewUser(user));
            return res._id;
        } catch (err) {
            console.log("🚀 ~ file: UserGridNew.js:102 ~ removeUser ~ err:", err.message)
            throw err;
        }
    };

    const removeUser = async (idUser) => {
        try {
            const res = await Promise.resolve(RemoveUser(idUser));
            console.log("🚀 ~ file: RegisterForm.js:119 ~ ).then ~ res:", res);
        } catch (err) {
            console.log("🚀 ~ file: UserGridNew.js:102 ~ removeUser ~ err:", err.message)
        }
    };

    const newAccount = async (account) => {
        try {
            const res = await Promise.resolve(AddNewAccount(account));
            console.log("🚀 ~ file: RegisterForm.js:134 ~ ).then ~ res:", res);
            window.location.reload(true);
            resetInfo();
        } catch (err) {
            deleteUser(account.idUser);
            console.log("🚀 ~ file: UserGridNew.js:102 ~ removeUser ~ err:", err.message)
        }
    };

    const addUser = async () => {
        const user = { names, lastName, birthday, cellphone, street, number, cp, delegation, state };
        const idUser = await newUser(user);
        if (idUser) {
            addAccount(idUser);
        }
    };

    const deleteUser = (idUser) => {
        removeUser(idUser);
    };

    const addAccount = async (idUser) => {
        const account = { email, password, idUser };
        await newAccount(account);
    };

    return (
        <>
            <Grid container>
                <Grid item xs={3.5}>
                    <Stack spacing={3}>
                        <Divider>
                            <Typography>User Account</Typography>
                        </Divider>

                        <Stack spacing={3}>
                            <TextField
                                required
                                name="names"
                                label="Name/s"
                                value={names}
                                onChange={(event) => {
                                    setNames(event.target.value);
                                }}
                            />

                            <TextField
                                required
                                name="lastName"
                                label="Last name"
                                value={lastName}
                                onChange={(event) => {
                                    setLastName(event.target.value);
                                }}
                            />

                            <TextField
                                required
                                name="email"
                                label="Email address"
                                value={email}
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                }}
                            />

                            <TextField
                                required
                                name="password"
                                label="New password"
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
                            />

                            <TextField
                                required
                                name="repeat password"
                                label="Repeat password"
                                value={verifyPassword}
                                onChange={(event) => {
                                    setVerifyPassword(event.target.value);
                                }}
                                type={showPassword2 ? 'text' : 'password'}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword2(!showPassword2)} edge="end">
                                                <Iconify icon={showPassword2 ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Stack>
                    </Stack>
                </Grid>

                <Divider orientation="vertical" variant="middle" flexItem sx={{ marginLeft: 4, marginRight: 4 }} />

                <Grid item xs={7.5}>
                    <Stack spacing={3}>
                        <Divider>
                            <Typography>More information</Typography>
                        </Divider>

                        <Grid container>
                            <Grid item xs={6.4}>
                                <Stack spacing={3}>
                                    <FormControl required sx={{ width: '100%' }}>
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
                                    </FormControl>

                                    <FormControl required sx={{ width: '100%' }}>
                                        <InputLabel id="delegation-label">Delegation</InputLabel>
                                        <Select
                                            displayEmpty
                                            labelid="delegation-label"
                                            label="Delegation"
                                            name="delegation"
                                            value={delegation}
                                        >
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
                                    </FormControl>

                                    <TextField
                                        name="cp"
                                        label="Postal Code"
                                        value={cp}
                                        onChange={(event) => {
                                            setCp(event.target.value);
                                        }}
                                    />

                                    <TextField
                                        name="street"
                                        label="Street Name"
                                        value={street}
                                        onChange={(event) => {
                                            setStreet(event.target.value);
                                        }}
                                    />

                                    <TextField
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                        name="number"
                                        label="Number"
                                        value={number}
                                        onChange={(event) => {
                                            setNumber(event.target.value);
                                        }}
                                    />
                                </Stack>
                            </Grid>

                            <Divider orientation="vertical" variant="middle" flexItem sx={{ marginLeft: 4, marginRight: 4 }} />

                            <Grid item xs={4}>
                                <Stack spacing={4.5}>
                                    <TextField
                                        helperText="ej. 1996-03-15"
                                        name="birthday"
                                        label="Birthday"
                                        value={birthday}
                                        onChange={(event) => {
                                            setBirthday(event.target.value);
                                        }}
                                    />

                                    <TextField
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                        name="cellphone"
                                        label="cellphone"
                                        value={cellphone}
                                        onChange={(event) => {
                                            setCellphone(event.target.value);
                                        }}
                                    />

                                    <FormControl required sx={{ width: '100%' }}>
                                        <InputLabel id="type-label">User Rol</InputLabel>
                                        <Select
                                            labelid="type-label"
                                            label="User rol"
                                            name="type"
                                            value={type}
                                            onChange={(event) => {
                                                setType(event.target.value);
                                            }}
                                        >
                                            <MenuItem value={'ADMIN'}>ADMIN</MenuItem>
                                            <MenuItem value={'CLIENT'}>CLIENT</MenuItem>
                                        </Select>
                                    </FormControl>

                                    <Divider />

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="secondary"
                                        endIcon={<AddCircleOutlineRoundedIcon />}
                                        onClick={validPasswords}
                                        sx={{ width: 'auto' }}
                                    >
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
