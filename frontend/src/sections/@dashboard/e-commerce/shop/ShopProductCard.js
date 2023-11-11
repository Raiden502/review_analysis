import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Card, Link, Stack, Fab } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
// redux
import { useDispatch } from '../../../../redux/store';
import { addToCart } from '../../../../redux/slices/product';
// components
import Iconify from '../../../../components/iconify';
import Label from '../../../../components/label';
import Image from '../../../../components/image';
import { ColorPreview } from '../../../../components/color-utils';

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  // const { id, name, cover, price, colors, status, available, sizes, priceSale } = product;

  const status = true
  const {p_category, p_code,  p_date,  p_desc,  p_name,  p_price,  p_status,  p_tag,  prod_id, cover} = product;

  const dispatch = useDispatch();

  const linkTo = PATH_DASHBOARD.eCommerce.view(prod_id);

  const handleAddCart = async () => {
    const newProduct = {
      id:prod_id,
      name:p_name,
      "cover":cover,
      // available,
      price:p_price,
      // colors: [colors[0]],
      // size: sizes[0],
      quantity: 1,
    };
    try {
      dispatch(addToCart(newProduct));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card
      sx={{
        '&:hover .add-cart-btn': {
          opacity: 1,
        },
      }}
    >
      <Box sx={{ position: 'relative', p: 1 }}>
        {status && (
          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              top: 16,
              right: 16,
              zIndex: 9,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {status}
          </Label>
        )}

        <Fab
          color="warning"
          size="medium"
          className="add-cart-btn"
          onClick={handleAddCart}
          sx={{
            right: 16,
            bottom: 16,
            zIndex: 9,
            opacity: 0,
            position: 'absolute',
            transition: (theme) =>
              theme.transitions.create('all', {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.shorter,
              }),
          }}
        >
          <Iconify icon="ic:round-add-shopping-cart" />
        </Fab>

        <Image alt={p_name} src={cover} ratio="1/1" sx={{ borderRadius: 1.5 }} />
      </Box>

      <Stack spacing={2.5} sx={{ p: 3 }}>
        <Link component={RouterLink} to={linkTo} color="inherit" variant="subtitle2" noWrap>
          {p_name}
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">

          <Stack direction="row" spacing={0.5} sx={{ typography: 'subtitle1' }}>
            {p_price && (
              <Box component="span" sx={{ color: 'text.disabled', textDecoration: 'line-through' }}>
                {fCurrency(p_price)}
              </Box>
            )}

            <Box component="span">{fCurrency(p_price)}</Box>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
