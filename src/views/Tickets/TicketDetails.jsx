import React, { useEffect, useState, useCallback } from 'react';
import { Box, Grid, CircularProgress, Paper, useTheme, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import TicketInfoPanel from './TicketInfoPanel';
import CloseTicketModal from './CloseTicketModal';
import PublicCommentSection from './PublicCommentSection';
import TicketHeader from './TicketHeader';
import { getTicketById, getPublicComments, addPublicComment, resolveTicket } from '../../redux/features/Tickets/TicketSlice';

dayjs.extend(relativeTime);

const PageContainer = ({ children }) => (
  <Box sx={{ maxWidth: 1600, mx: 'auto', px: { xs: 2, md: 3 }, py: 3, bgcolor: '#F8FAFC', minHeight: '100vh' }}>{children}</Box>
);

const TicketDetails = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { ticketId } = useParams();

  const { ticket, isTicketLoading, publicComments } = useSelector((s) => s.ticket);
  const currentUser = useSelector((s) => s.admin.Admin);

  const [closeModalOpen, setCloseModalOpen] = useState(false);
  const isClosedOrResolved = ['closed', 'resolved'].includes(ticket?.status?.toLowerCase());

  const refreshData = useCallback(async () => {
    if (ticketId) {
      await Promise.all([dispatch(getTicketById(ticketId)), dispatch(getPublicComments(ticketId))]);
    }
  }, [dispatch, ticketId]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const handleSendPublic = useCallback(
    async (content) => {
      if (!content?.trim() || isClosedOrResolved) return;
      const result = await dispatch(addPublicComment({ ticketId, content }));
      if (result) {
        dispatch(getPublicComments(ticketId)); // Refresh messages immediately
      }
    },
    [dispatch, ticketId, isClosedOrResolved]
  );

  const handleConfirmCloseTicket = async (resolutionNote) => {
    await dispatch(resolveTicket({ id: ticketId, data: { resolutionMessage: resolutionNote } }));
    setCloseModalOpen(false);
    refreshData();
  };

  if (isTicketLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress thickness={5} size={50} sx={{ color: theme.palette.primary.main }} />
      </Box>
    );
  }

  return (
    <PageContainer>
      <TicketHeader ticket={ticket} onCloseTicket={() => setCloseModalOpen(true)} isClosedOrResolved={isClosedOrResolved} />

      <Grid container spacing={3}>
        {/* LEFT: MAIN CHAT AREA (65-70%) */}

        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ position: 'sticky', top: 100 }}>
            <Paper sx={{ borderRadius: 4, border: '1px solid #E2E8F0', overflow: 'hidden' }} elevation={0}>
              <TicketInfoPanel ticket={ticket} onCloseClick={() => setCloseModalOpen(true)} isClosedOrResolved={isClosedOrResolved} />
            </Paper>
          </Box>
        </Grid>

        {/* RIGHT: METADATA SIDEBAR (30-35%) */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={3}>
            {/* RESOLUTION HERO PANEL */}
            <AnimatePresence shadow>
              {isClosedOrResolved && (
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                  <Paper
                    sx={{
                      p: 3,
                      borderRadius: 4,
                      border: '1px solid #E2E8F0',
                      background: 'linear-gradient(135deg, #F0FDF4 0%, #FFFFFF 100%)',
                      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box>
                        <Typography variant="overline" color="success.main" sx={{ fontWeight: 900, letterSpacing: 1 }}>
                          Ticket Resolved
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 800, mt: 1, color: '#1E293B' }}>
                          {ticket?.resolutionMessage || 'Resolved'}
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="caption" color="text.secondary" display="block">
                          DURATON
                        </Typography>
                        <Typography variant="body2" fontWeight={700}>
                          {dayjs(ticket?.resolvedAt).from(dayjs(ticket?.createdAt), true)}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </motion.div>
              )}
            </AnimatePresence>

            <Paper sx={{ height: '100vh', borderRadius: 4, overflow: 'hidden', border: '1px solid #E2E8F0', elevation: 0 }}>
              <PublicCommentSection
                messages={publicComments || []}
                onSend={handleSendPublic}
                currentUser={currentUser}
                disabled={isClosedOrResolved}
              />
            </Paper>
          </Stack>
        </Grid>
      </Grid>

      <CloseTicketModal open={closeModalOpen} onClose={() => setCloseModalOpen(false)} onConfirm={handleConfirmCloseTicket} />
    </PageContainer>
  );
};

export default TicketDetails;
