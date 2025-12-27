// src/views/Complaints/LiveChat.jsx

import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  Avatar
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { useForm, Controller } from 'react-hook-form';

const LiveChat = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'agent', text: 'Hi! How can I help you today?' }
  ]);
  const messagesEndRef = useRef(null);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      message: ''
    }
  });

  // Auto scroll to the last message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const onSubmit = (data) => {
    const trimmed = data.message.trim();
    if (!trimmed) return;

    const userMsg = {
      id: messages.length + 1,
      sender: 'user',
      text: trimmed
    };

    setMessages(prev => [...prev, userMsg]);

    reset();

    setTimeout(() => {
      const agentReply = {
        id: messages.length + 2,
        sender: 'agent',
        text: 'Thank you! We’ll get back to you shortly.'
      };
      setMessages(prev => [...prev, agentReply]);
    }, 1000);
  };

  return (
    <Box p={3} maxWidth={800} mx="auto">
      <Typography variant="h4" gutterBottom>
        Live Chat / Support
      </Typography>

      <Paper elevation={3} sx={{ height: 500, display: 'flex', flexDirection: 'column' }}>
        {/* Chat Messages */}
        <List sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
          {messages.map((msg) => (
            <ListItem
              key={msg.id}
              sx={{
                justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'
              }}
            >
              {msg.sender === 'agent' && (
                <Avatar sx={{ bgcolor: 'primary.main', mr: 1 }}>
                  <SupportAgentIcon />
                </Avatar>
              )}
              <Paper
                sx={{
                  p: 1.5,
                  maxWidth: '75%',
                  bgcolor: msg.sender === 'user' ? 'primary.light' : 'grey.200',
                  color: msg.sender === 'user' ? 'common.white' : 'text.primary'
                }}
              >
                <ListItemText primary={msg.text} />
              </Paper>
            </ListItem>
          ))}
          <div ref={messagesEndRef} />
        </List>

        <Divider />

        {/* Input using react-hook-form */}
        <Box component="form" onSubmit={handleSubmit(onSubmit)} display="flex" p={2} alignItems="center">
          <Controller
            name="message"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                size="small"
                placeholder="Type your message..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(onSubmit)();
                  }
                }}
              />
            )}
          />
          <IconButton color="primary" type="submit" sx={{ ml: 1 }}>
            <SendIcon />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
};

export default LiveChat;
