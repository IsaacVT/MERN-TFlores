import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Badge, } from '@mui/material';
// Utils
import { GetAmountProds } from '../../../utils/localData';
// component
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  zIndex: 999,
  right: 0,
  display: 'flex',
  cursor: 'pointer',
  position: 'fixed',
  alignItems: 'center',
  top: theme.spacing(16),
  height: theme.spacing(6),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1.25),
  boxShadow: theme.customShadows.z20,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  borderTopLeftRadius: Number(theme.shape.borderRadius) * 2,
  borderBottomLeftRadius: Number(theme.shape.borderRadius) * 2,
  transition: theme.transitions.create('opacity'),
  '&:hover': { opacity: 0.72 },
}));

// ----------------------------------------------------------------------

export default function ProductCartWidget() {

  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setCount(GetAmountProds())
  }, [])

  const handleRedirect = () => {
    navigate('/dashboard/cart', { replace: true });
  };

  return (
    <>
      <StyledRoot>
        <Badge overlap="circular" badgeContent={count} color='error' anchorOrigin={{ vertical: 'top', horizontal: 'left' }} sx={{ padding: '20px', pr: '5px' }} onClick={handleRedirect}>
          <Iconify icon="eva:shopping-cart-fill" width={35} height={35} />
        </Badge>
      </StyledRoot>
    </>
  );
}