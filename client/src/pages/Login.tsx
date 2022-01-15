import React from 'react'
import { toast } from 'react-toastify'
import { selectIsAuthenticated } from '../features/auth/authSlice'
import { useSelector } from 'react-redux'
import { useLoginMutation, useProtectedMutation } from '../features/auth/auth'
import { useForm, SubmitHandler } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
type Inputs = {
    username: string,
    password: string,
};

function Login() {
    let navigate = useNavigate();
    const isAuthenticated = useSelector(selectIsAuthenticated)
    const [login] = useLoginMutation()
    const [attemptAccess] = useProtectedMutation()


    const makeAuthRequest = () => {
        attemptAccess()
            .unwrap()
            .then((e) => toast(e.message))
            .catch((e) => toast(e.data.message))
    }


    //new 
    const { register, handleSubmit, formState: { errors } } = useForm();
  
    const onSubmit: SubmitHandler<Inputs> = async data => {
        try {
            const payload = await login({
                username: data.username,
                password: data.password,
            }).unwrap();
            console.log('fulfilled', payload)

            if (isAuthenticated) {
                navigate('/', { replace: true })
            }

        } catch (err) {
            console.log('err on submit', err)
        }

    }

    return (


        <div className="content">
            {isAuthenticated ? (
                <>
                    <p>You're logged-in.</p>
                </>
            ) : (
                <>
                    <p>You're in the Home page. Login to visit protected pages.</p>

                </>
            )}
            <button className="button" onClick={makeAuthRequest}>
                Authenticated request
            </button>

            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
            >

                <TextField id="outlined-basic" label="Felhasznalonev" variant="outlined" {...register("username", { required: true })} />
                {/* errors will return when field validation fails  */}
                {errors.username && <span>Kotelezo felhasznalonev</span>}

                <TextField id="outlined-basic" label="Jelszo" variant="outlined" {...register("password", { required: true })} />
                {/* errors will return when field validation fails  */}
                {errors.username && <span>Kotelezo felhasznalonev</span>}

                <Button variant="contained" type="submit">Bejelentkezes</Button>

            </Box>

        </div>
    )
}

export default Login
