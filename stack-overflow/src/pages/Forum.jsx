






import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Textarea,
  Select,
  ModalFooter,
  VStack,
  Badge,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';





export const Forum = () => {
  const user = useSelector(store => store.user);
  const [questions, setQuestions] = useState([]);
const navigate=useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [question, setQuestion] = useState({
    username: user.username,
    title: '',
    description: '',
    language: '',
    upvotes: 0,
    answers: 0,
    postedDate: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
  });

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleQuestionSubmit = async () => {
    try {
      const response = await axios.post('https://mock4jsondatacrud.onrender.com/forum', question);
      setQuestions([...questions, response.data]);
      handleModalClose();
    } catch (error) {
      console.error('Error posting question:', error);
    }
  };

  useEffect(() => {
    // Fetch questions from JSON-Server and update state
    async function fetchQuestions() {
      try {
        const response = await axios.get('https://mock4jsondatacrud.onrender.com/forum');
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    }
    fetchQuestions();
  }, []);

  return (
    <Box p={4}>
      <Button colorScheme="blue" mb={4} onClick={handleModalOpen}>
        Ask Question
      </Button>
      {/* Render question cards */}
      <VStack spacing={4} align="stretch">
        {questions.map(question => (
          <Box key={question.id} borderWidth="1px" borderRadius="md" p={4}>
            <Text fontSize="xl" fontWeight="bold">
              {question.title}
            </Text>
            <Text>
              Posted by {question.username} on {question.postedDate}
            </Text>
            <Badge colorScheme="teal" mt={2}>
              {question.language}
            </Badge>
            <Text mt={2}>{question.description}</Text>
            <Box mt={2} display="flex" justifyContent="space-between">
              <Text>{question.upvotes} Upvotes</Text>
              <Text>{question.answers} Answers</Text>
            </Box>
          </Box>
        ))}
      </VStack>
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ask a Question</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={3}>
              <FormLabel>Username</FormLabel>
              <Textarea value={user.username} isReadOnly />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Question Title</FormLabel>
              <Textarea
                value={question.title}
                onChange={e => setQuestion({ ...question, title: e.target.value })}
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Question Description</FormLabel>
              <Textarea
                value={question.description}
                onChange={e => setQuestion({ ...question, description: e.target.value })}
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Language</FormLabel>
              <Select
                value={question.language}
                onChange={e => setQuestion({ ...question, language: e.target.value })}
              >
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
                <option value="Other">Other</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleQuestionSubmit}>
              Post Question
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};



