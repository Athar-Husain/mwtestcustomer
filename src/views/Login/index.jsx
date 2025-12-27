import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, Typography, Grid } from '@mui/material';

// project import
import AuthLogin from './AuthLogin';

// assets
import Logo from '../../assets/images/logo-dark.png';

// ==============================|| LOGIN ||============================== //

const Login = () => {
  const theme = useTheme();

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ backgroundColor: theme.palette.common.black, height: '100%', minHeight: '100vh' }}
    >
      {/* FIX: Must use 'item' and standard responsive props (xs, sm, etc.) */}
      <Grid item xs={11} sm={7} md={6} lg={4}>
        <Card
          sx={{
            overflow: 'visible',
            display: 'flex',
            position: 'relative',
            '& .MuiCardContent-root': {
              flexGrow: 1,
              flexBasis: 'auto', // Adjusted to auto, width: '50%' seemed overly restrictive
              width: 'auto'
            },
            maxWidth: '475px',
            margin: '24px auto'
          }}
        >
          <CardContent sx={{ p: theme.spacing(5, 4, 3, 4) }}>
            <Grid container direction="column" spacing={4} justifyContent="center">
              {/* FIX: Must use 'item' */}
              <Grid item xs={12}> 
                <Grid container justifyContent="space-between">
                  {/* FIX: Must use 'item' */}
                  <Grid item> 
                    <Typography color="textPrimary" gutterBottom variant="h2">
                      Sign in
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      To keep connected with us.
                    </Typography>
                  </Grid>
                  {/* FIX: Must use 'item' */}
                  <Grid item> 
                    <RouterLink to="/">
                      <img alt="Auth method" src={Logo} />
                    </RouterLink>
                  </Grid>
                </Grid>
              </Grid>
              {/* FIX: Must use 'item' */}
              <Grid item xs={12}> 
                <AuthLogin />
              </Grid>
              <Grid container justifyContent="flex-start" sx={{ mt: theme.spacing(2), mb: theme.spacing(1) }}>
                {/* FIX: Must use 'item' */}
                <Grid item> 
                  <Typography
                    variant="subtitle2"
                    color="secondary"
                    component={RouterLink}
                    to="/register"
                    sx={{ textDecoration: 'none', pl: 2 }}
                  >
                    Create new account
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;
