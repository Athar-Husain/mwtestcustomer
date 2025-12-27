import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  InputAdornment,
  Divider,
  Paper
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';

const faqsData = [
  {
    question: "How do I reset my router?",
    answer: "To reset your router, find the reset button at the back of the router. Hold it down for 10 seconds until the router restarts.",
  },
  {
    question: "What should I do if I have no internet connectivity?",
    answer: "Please check the physical connections first. If the issue persists, try restarting your router. If it still doesn’t work, please raise a complaint.",
  },
  {
    question: "How do I change my plan?",
    answer: "You can change your plan by going to 'My Account' and selecting 'Change Plan'. Choose from available plans and confirm your selection.",
  },
  {
    question: "How do I update my billing address?",
    answer: "Go to 'Payments & Billing' section in the menu and select 'Billing Address'. Edit your address and save the changes.",
  },
  {
    question: "How can I track my complaint status?",
    answer: "Go to the 'Complaints & Support' section and select 'Track Complaint Status' to view the updates on your complaints.",
  },
  {
    question: "How do I contact customer support?",
    answer: "You can contact our customer support team via the 'Contact Us' page, which provides a phone number, live chat option, and an email form.",
  },
  {
    question: "Is there a mobile app available?",
    answer: "Yes, our mobile app is available for download on both the Apple App Store and Google Play Store. You can manage your account and services directly from the app.",
  },
];

const FaqsHelpCenter = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFaqs = faqsData.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: { xs: 2, md: 6 }, maxWidth: '900px', mx: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 600 }}>
        FAQs & Help Center
      </Typography>
      <Typography variant="subtitle1" gutterBottom align="center" sx={{ mb: 4, color: 'text.secondary' }}>
        Can't find what you're looking for? Search our extensive library of frequently asked questions.
      </Typography>

      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search for a question..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            sx: {
              borderRadius: 2,
              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'divider' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main', borderWidth: '2px' }
            }
          }}
        />
      </Box>

      <Divider sx={{ mb: 4 }} />

      <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, index) => (
            <Accordion key={index} disableGutters sx={{ '&:not(:last-of-type)': { borderBottom: '1px solid', margin:'10px 2px', borderColor: 'divider'  } }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" sx={{ color: 'text.secondary', pl: 2 }}>
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">
              No results found for "{searchTerm}".
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
              Try a different keyword or phrase.
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default FaqsHelpCenter;