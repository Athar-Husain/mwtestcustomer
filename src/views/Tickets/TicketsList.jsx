import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  Chip,
  Avatar,
  CircularProgress,
  InputAdornment,
  Tooltip,
  Divider,
  Stack,
  useTheme
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  AccessTime,
  History,
  CheckCircle,
  RadioButtonUnchecked,
  Autorenew,
  ListAlt,
  ErrorOutline,
  ArrowForwardIos,
  ArrowBackIos
} from '@mui/icons-material';
import { format, formatDistance, intervalToDuration } from 'date-fns';

// Redux Actions
import { getMyTickets } from '../../redux/features/Tickets/TicketSlice';
import NewTicket from './NewTicket';
// import { useTheme } from '@emotion/react';

// --- UI Sub-Components ---

const StatCard = ({ title, count, icon, color, active, onClick }) => (
  <Paper
    elevation={0}
    onClick={onClick}
    sx={{
      flex: 1,
      minWidth: { xs: '100%', sm: '200px' },
      p: 3,
      borderRadius: 4,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      cursor: 'pointer',
      border: '2px solid',
      borderColor: active ? color : 'transparent',
      bgcolor: active ? `${color}10` : 'background.paper',
      boxShadow: active ? `0 10px 20px -10px ${color}60` : '0 2px 12px rgba(0,0,0,0.04)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: `0 12px 24px -10px ${color}40`,
        borderColor: color
      }
    }}
  >
    <Box>
      <Typography variant="overline" sx={{ fontWeight: 700, color: 'text.secondary', display: 'block', mb: 0.5 }}>
        {title}
      </Typography>
      <Typography variant="h4" sx={{ fontWeight: 800, color: active ? color : 'text.primary' }}>
        {count}
      </Typography>
    </Box>
    <Avatar sx={{ bgcolor: `${color}15`, color: color, width: 54, height: 54 }}>{icon}</Avatar>
  </Paper>
);

const TicketItem = ({ item, onClick }) => {
  const isResolved = item?.status?.toLowerCase() === 'resolved';

  // Calculate Resolution Time
  const resTime = useMemo(() => {
    if (!item?.createdAt || !item?.resolvedAt) return null;
    const duration = intervalToDuration({
      start: new Date(item.createdAt),
      end: new Date(item.resolvedAt)
    });
    if (duration.days > 0) return `${duration.days}d ${duration.hours}h`;
    return `${duration.hours || 0}h ${duration.minutes || 0}m`;
  }, [item]);

  const priorityStyles = {
    high: { color: '#E53E3E', bg: '#FFF5F5' },
    medium: { color: '#D69E2E', bg: '#FFFAF0' },
    low: { color: '#38A169', bg: '#F0FFF4' }
  }[item?.priority?.toLowerCase()] || { color: '#718096', bg: '#EDF2F7' };

  return (
    <Paper
      elevation={0}
      onClick={onClick}
      sx={{
        p: 2.5,
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        transition: '0.2s',
        cursor: 'pointer',
        '&:hover': {
          borderColor: 'primary.main',
          boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
          transform: 'translateY(-2px)'
        }
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Chip label={item?.issueType?.toUpperCase() || 'GENERAL'} size="small" sx={{ fontWeight: 700, fontSize: '0.65rem' }} />
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          {item?.escalated && <ErrorOutline color="error" sx={{ fontSize: 18 }} />}
          <Typography variant="caption" sx={{ color: priorityStyles.color, fontWeight: 800 }}>
            {item?.priority?.toUpperCase()}
          </Typography>
        </Box>
      </Box>

      <Typography variant="h6" sx={{ fontSize: '1.05rem', fontWeight: 600, mb: 1 }} noWrap>
        {item?.description}
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AccessTime sx={{ fontSize: 14, color: 'text.secondary' }} />
          <Typography variant="caption" color="text.secondary">
            Raised: {item?.createdAt ? format(new Date(item.createdAt), 'MMM dd, hh:mm a') : 'N/A'}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <History sx={{ fontSize: 14, color: 'text.secondary' }} />
          <Typography variant="caption" color="text.secondary">
            Last Activity: {item?.updatedAt ? formatDistance(new Date(item.updatedAt), new Date(), { addSuffix: true }) : 'N/A'}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 2, borderStyle: 'dashed' }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>
          ID: #{item?._id?.slice(-6).toUpperCase()}
        </Typography>

        {isResolved ? (
          <Chip
            icon={<CheckCircle sx={{ fontSize: '1rem !important' }} />}
            label={`Resolved (${resTime || 'Quickly'})`}
            color="success"
            size="small"
            sx={{ fontWeight: 600 }}
          />
        ) : (
          <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 700, display: 'flex', alignItems: 'center' }}>
            VIEW DETAILS <ArrowForwardIos sx={{ fontSize: 10, ml: 0.5 }} />
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

// --- Main Component ---

const TicketsList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const { customerTickets = [], isTicketLoading } = useSelector((state) => state.ticket);

  useEffect(() => {
    dispatch(getMyTickets());
  }, [dispatch]);

  // Derived Analytics
  const stats = useMemo(
    () => ({
      total: customerTickets.length,
      open: customerTickets.filter((t) => t.status?.toLowerCase() === 'open').length,
      inProgress: customerTickets.filter((t) => t.status?.toLowerCase() === 'in progress').length,
      resolved: customerTickets.filter((t) => t.status?.toLowerCase() === 'resolved').length
    }),
    [customerTickets]
  );

  const filteredTickets = useMemo(() => {
    return customerTickets
      .filter((t) => {
        const status = (t.status || '').toLowerCase();
        const matchesFilter = activeFilter === 'all' || status === activeFilter;

        const q = search.toLowerCase();
        const matchesSearch =
          !search || t.description?.toLowerCase().includes(q) || t._id?.toLowerCase().includes(q) || t.issueType?.toLowerCase().includes(q);

        return matchesFilter && matchesSearch;
      })
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  }, [customerTickets, search, activeFilter]);

  const handleAfterSubmit = () => {
    dispatch(getMyTickets());
    setShowForm(false);
  };

  if (showForm) {
    return (
      <Box sx={{ p: 4, maxWidth: 800, margin: 'auto' }}>
        {/* <Button
          startIcon={<ArrowBackIos sx={{ fontSize: 14 }} />}
          onClick={() => setShowForm(false)}
          sx={{ mb: 3, textTransform: 'none', fontWeight: 600 }}
        >
          Back
        </Button> */}
        <Paper sx={{ p: 4, borderRadius: 4 }}>
          <NewTicket onSuccess={handleAfterSubmit} onCancel={() => setShowForm(false)} />
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1400, margin: 'auto', minHeight: '100vh', bgcolor: '#fcfcfd' }}>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a1d23' }}>
            Support Dashboard
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Track and manage your service requests in real-time
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setShowForm(true)}
          sx={{
            borderRadius: 2.5,
            px: 3,
            py: 1.2,
            textTransform: 'none',
            fontWeight: 700,
            boxShadow: '0 4px 12px rgba(25, 118, 210, 0.2)'
          }}
        >
          New Complaint
        </Button>
      </Box>

      {/* Metrics Section */}
      <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
        <StatCard
          title="Total Tickets"
          count={stats.total}
          icon={<ListAlt />}
          color="#6366f1"
          active={activeFilter === 'all'}
          onClick={() => setActiveFilter('all')}
        />
        <StatCard
          title="Open"
          count={stats.open}
          icon={<RadioButtonUnchecked />}
          color="#f59e0b"
          active={activeFilter === 'open'}
          onClick={() => setActiveFilter('open')}
        />
        <StatCard
          title="In Progress"
          count={stats.inProgress}
          icon={<Autorenew />}
          color="#3b82f6"
          active={activeFilter === 'in progress'}
          onClick={() => setActiveFilter('in progress')}
        />
        <StatCard
          title="Resolved"
          count={stats.resolved}
          icon={<CheckCircle />}
          color="#10b981"
          active={activeFilter === 'resolved'}
          onClick={() => setActiveFilter('resolved')}
        />
      </Box>

      {/* Search Bar */}
      <Paper sx={{ p: 1, mb: 4, borderRadius: 3, display: 'flex', alignItems: 'center', bgcolor: 'white', border: '1px solid #eee' }}>
        <TextField
          fullWidth
          placeholder="Search by Ticket ID, Issue Type or Description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          variant="standard"
          InputProps={{
            disableUnderline: true,
            startAdornment: (
              <InputAdornment position="start" sx={{ pl: 2 }}>
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            sx: { height: 45, fontSize: '0.95rem' }
          }}
        />
      </Paper>

      {/* Main Content Area */}
      {isTicketLoading && !customerTickets.length ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 10, gap: 2 }}>
          <CircularProgress size={40} thickness={4} />
          <Typography color="textSecondary" variant="body2">
            Loading your tickets...
          </Typography>
        </Box>
      ) : filteredTickets.length > 0 ? (
        <Grid container spacing={3}>
          {filteredTickets.map((ticket) => (
            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={ticket._id}>
              <TicketItem item={ticket} onClick={() => navigate(`/ticket/${ticket._id}`)} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Paper sx={{ py: 10, textAlign: 'center', borderRadius: 4, border: '2px dashed #e0e0e0', bgcolor: 'transparent' }}>
          <Typography variant="h6" color="textSecondary">
            No tickets found
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Try adjusting your filters or search terms
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default TicketsList;
