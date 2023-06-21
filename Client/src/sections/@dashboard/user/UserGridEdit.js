import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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
// Icon
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
// Services
import { UpdateDataUser } from '../../../services/user-service';
import { GetAccountByUser, UpdateDataAccount } from '../../../services/account-service';
import { GetStates } from '../../../services/state-service';
// component
import Iconify from '../../../components/iconify';

UserGridEdit.propTypes = {
    user: PropTypes.object,
};

export default function UserGridEdit({ user }) {
    const newDate = () => {
        const dateTmp = new Date(user.birthday);
        const dateFormat = dateTmp.toISOString().slice(0, 10);
        return dateFormat;
    };

    // User elements
    const [id] = useState(user.id);
    const [names, setNames] = useState(user.names);
    const [lastName, setLastName] = useState(user.lastName);
    const [birthday, setBirthday] = useState(newDate);
    const [cellphone, setCellphone] = useState(user.cellphone);
    const [street, setStreet] = useState(user.street);
    const [number, setNumber] = useState(user.number);
    const [cp, setCp] = useState(user.cp);
    const [delegation, setDelegation] = useState(user.delegation);
    const [state, setState] = useState(user.state);
    const [type, setType] = useState(user.type);

    // Account elements
    const [accountId, setAccountId] = useState('');
    const [email, setEmail] = useState('');
    const [emailTmp, setEmailTmp] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    // State elements
    const [stateList, setStateList] = useState([]);
    const [delegationsList, setDelegationsList] = useState([]);

    // General elements
    const [changeList, setChangeList] = useState([]);
    const [changes, setChanges] = useState([]);
    const [saveAccount, setSaveAccount] = useState(false);

    useEffect(() => {

        const resultAccount = async () => {
            const account = await GetAccountByUser(id)
            setAccountId(account._id);
            setEmail(account.email);
            setEmailTmp(account.email);
        }

        const resultStates = async () => {
            const states = await GetStates();
            setStateList(states);
        }

        resultStates();
        resultAccount();
    }, [setAccountId, setEmail, setEmailTmp, setStateList, id]);

    function getChanges() {
        if (names !== user.names) {
            changeList.push('names');
        }

        if (lastName !== user.lastName) {
            changeList.push('lastName');
        }

        if (cellphone !== user.cellphone) {
            changeList.push('cellphone');
        }

        if (street !== user.street) {
            changeList.push('street');
        }

        if (number !== user.number) {
            changeList.push('number');
        }

        if (state !== user.state) {
            changeList.push('state');
        }

        if (delegation !== user.delegation) {
            changeList.push('delegation');
        }

        if (cp !== user.cp) {
            changeList.push('postal code');
        }

        if (type !== user.type) {
            changeList.push('type');
        }

        if (email !== emailTmp) {
            changeList.push('email');
        }

        if (changeList.length > 0) {
            changes.push({ mod: changeList });
        } else {
            changes.push({ mod: '' });
        }
    }

    const prepareUser = () => {
        getChanges();

        if (changes[0].mod.length > 0) {
            const userTmp = { id, names, lastName, birthday, cellphone, street, number, cp, delegation, state, type };
            const idUser = id
            updateUser(idUser, userTmp);

            if (changes[0].mod.includes('email') && password.match(verifyPassword)) {
                const id = accountId;
                const email = emailTmp;
                const accountTmp = { id, email, password, idUser }
                updateAccount(id, accountTmp);
            }
        }

        setChangeList([]);
        setChanges([]);
    };

    const updateUser = (id, user) => {
        try {
            Promise.resolve(
                UpdateDataUser(id, user)
            ).then((res) => {
                console.log("🚀 ~ file: UserGridEdit.js:162 ~ ).then ~ res:", res.data)
                window.location.reload(true);
            })
        } catch (err) {
            console.log("🚀 ~ file: UserEditGrid.js:168 ~ updateUser ~ err:", err.message);
        }
    };

    const updateAccount = (id, account) => {
        try {
            Promise.resolve(
                UpdateDataAccount(id, account)
            ).then((res) => {
                console.log("🚀 ~ file: UserGridEdit.js:162 ~ ).then ~ res:", res.data)
                window.location.reload(true);
            })
        } catch (err) {
            console.log("🚀 ~ file: UserEditGrid.js:168 ~ updateUser ~ err:", err.message);
        }
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
                                value={emailTmp}
                                onChange={(event) => {
                                    setEmailTmp(event.target.value);
                                    setSaveAccount(true);
                                }}
                            />

                            {saveAccount && (
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
                            )}

                            {saveAccount && (
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
                            )}
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
                                        onClick={prepareUser}
                                        sx={{ width: 'auto' }}
                                    >
                                        Actualizar
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
