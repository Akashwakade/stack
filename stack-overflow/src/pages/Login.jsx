import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  Box,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Forum } from './Forum';

 export const Login = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });


  const [loginError, setLoginError] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('https://mock4jsondatacrud.onrender.com/users', {
        params: credentials,
      });

      if (response.data.length > 0) {
        // Dispatch action to set user in Redux
        dispatch({ type: 'SET_USER', payload: response.data[0] });
        // Redirect to forum page
        alert('login succssfull')
       navigate("/forum")
      } else {
        setLoginError(true);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <Box p={4} maxWidth="400px" mx="auto">
      <Heading as="h2" size="lg" mb={4}>
        Sign In
      </Heading>
      <form onSubmit={handleLogin}>
        <FormControl mb={3}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Email"
            value={credentials.email}
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
          />
        </FormControl>
        <FormControl mb={3}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
        </FormControl>
        <Button type="submit" colorScheme="blue">
          Log In
        </Button>
        {loginError && (
          <Alert status="error" mt={3}>
            <AlertIcon />
            Login failed. Please check your credentials.
          </Alert>
        )}
      </form>
    </Box>
  );
};



