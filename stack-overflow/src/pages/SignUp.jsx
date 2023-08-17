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
} from '@chakra-ui/react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Login } from './Login';
import store from '../Redux/store';

export const SignUp = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const user = useSelector(store => store.user);
  console.log(user)


  const [formData, setFormData] = useState({
    username: '',
    avatar: 'dummy-avatar.jpg',
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post('https://mock4jsondatacrud.onrender.com/users', formData);
        console.log(formData)
      // Dispatch action to set user in Redux
        
      dispatch({ type: 'SET_USER', payload: formData });
      // Redirect to sign-in page or forum page
      alert('signUp Successfull')
     navigate("/login")
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <Box p={4} maxWidth="400px" mx="auto">
      <Heading as="h2" size="lg" mb={4}>
        Sign Up
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb={3}>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
        </FormControl>
        <FormControl mb={3}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </FormControl>
        <FormControl mb={3}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </FormControl>
        <Button type="submit" colorScheme="blue">
          Sign Up
        </Button>
      </form>
    </Box>
  );
};


