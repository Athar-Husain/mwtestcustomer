import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Divider, Avatar, TextField, IconButton, Stack, Paper, alpha, useTheme, Zoom, Chip } from '@mui/material';
import {
  Send as SendIcon,
  SupportAgent as AgentIcon,
  AccountCircle as CustomerIcon,
  DoneAll as ReadIcon,
  FlashOnRounded as FlashIcon
} from '@mui/icons-material';
import dayjs from 'dayjs';

const QUICK_REPLIES = [
  'When will my internet be back?',
  'I have restarted my router already.',
  'Please call me on my mobile.',
  'Thank you for the update!'
];

const PublicBubble = ({ msg, isOwn, theme }) => {
  const name = msg?.commentBy?.firstName ? `${msg.commentBy.firstName} ${msg.commentBy.lastName || ''}` : 'Customer';
  const time = msg?.createdAt ? dayjs(msg.createdAt).format('hh:mm A') : '';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: isOwn ? 'flex-end' : 'flex-start', mb: 2.5, width: '100%' }}>
      <Stack direction={isOwn ? 'row-reverse' : 'row'} spacing={1.5} sx={{ maxWidth: '80%' }}>
        <Avatar
          sx={{
            width: 32,
            height: 32,
            bgcolor: isOwn ? theme.palette.primary.main : '#64748B',
            boxShadow: isOwn ? `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}` : 'none'
          }}
        >
          {isOwn ? <AgentIcon sx={{ fontSize: 18 }} /> : name.charAt(0)}
        </Avatar>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: isOwn ? 'flex-end' : 'flex-start' }}>
          <Paper
            elevation={0}
            sx={{
              p: 1.5,
              borderRadius: isOwn ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
              bgcolor: isOwn ? theme.palette.primary.main : '#F1F5F9',
              color: isOwn ? 'white' : '#1E293B',
              border: isOwn ? 'none' : '1px solid #E2E8F0'
            }}
          >
            <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
              {msg.content}
            </Typography>
            <Stack direction="row" spacing={0.5} alignItems="center" justifyContent="flex-end" sx={{ mt: 0.5, opacity: 0.7 }}>
              <Typography sx={{ fontSize: '0.65rem' }}>{time}</Typography>
              {isOwn && <ReadIcon sx={{ fontSize: 14 }} />}
            </Stack>
          </Paper>
        </Box>
      </Stack>
    </Box>
  );
};

const PublicCommentSection = ({ messages = [], onSend, currentUser, disabled }) => {
  const theme = useTheme();
  const [text, setText] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText('');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: '#FFFFFF' }}>
      <Box sx={{ p: 2, borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ bgcolor: alpha(theme.palette.success.main, 0.1), color: theme.palette.success.main }}>
          <CustomerIcon />
        </Avatar>
        <Box>
          <Typography variant="subtitle2" fontWeight={800}>
            Live Support Chat
          </Typography>
          <Typography variant="caption" color="success.main" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box sx={{ width: 6, height: 6, bgcolor: 'success.main', borderRadius: '50%' }} /> Active Channel
          </Typography>
        </Box>
      </Box>

      <Box
        ref={scrollRef}
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: 3,
          backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")',
          backgroundSize: '400px',
          backgroundRepeat: 'repeat',
          backgroundColor: '#F8FAFC'
        }}
      >
        {messages.map((m, i) => (
          <PublicBubble key={m._id || i} msg={m} isOwn={m.commentBy?._id === currentUser?._id} theme={theme} />
        ))}
      </Box>

      <Box sx={{ p: 2, borderTop: '1px solid #E2E8F0', bgcolor: '#FFF' }}>
        {!disabled && (
          <Stack direction="row" spacing={1} sx={{ mb: 2, overflowX: 'auto', pb: 1 }}>
            <FlashIcon sx={{ color: theme.palette.warning.main, fontSize: 20, mt: 0.5 }} />
            {QUICK_REPLIES.map((reply, idx) => (
              <Chip
                key={idx}
                label={reply}
                onClick={() => setText(reply)}
                size="small"
                variant="outlined"
                sx={{ borderRadius: '8px', cursor: 'pointer', '&:hover': { bgcolor: '#F1F5F9' } }}
              />
            ))}
          </Stack>
        )}

        <Stack direction="row" spacing={1} alignItems="flex-end">
          <Paper elevation={0} sx={{ flex: 1, bgcolor: '#F1F5F9', borderRadius: 3, p: '4px 12px' }}>
            <TextField
              fullWidth
              multiline
              maxRows={4}
              placeholder={disabled ? 'Ticket is closed' : 'Write a message...'}
              variant="standard"
              value={text}
              onChange={(e) => setText(e.target.value)}
              disabled={disabled}
              InputProps={{ disableUnderline: true, sx: { fontSize: '0.9rem', py: 1 } }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
          </Paper>
          <Zoom in={text.trim().length > 0}>
            <IconButton
              onClick={handleSend}
              sx={{ bgcolor: theme.palette.primary.main, color: '#FFF', '&:hover': { bgcolor: theme.palette.primary.dark } }}
            >
              <SendIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Zoom>
        </Stack>
      </Box>
    </Box>
  );
};

export default PublicCommentSection;
