import PropTypes from 'prop-types';
import { useState, useMemo } from 'react';
import sumBy from 'lodash/sumBy';
// @mui
import { Divider, Typography, Rating, Button, LinearProgress, Stack, Box } from '@mui/material';
// utils
import { fShortenNumber } from '../../../../utils/formatNumber';
// components
import Iconify from '../../../../components/iconify';
//
import ProductDetailsReviewList from './ProductDetailsReviewList';
import ProductDetailsReviewNewDialog from './ProductDetailsNewReviewForm';

// ----------------------------------------------------------------------

ProductDetailsReview.propTypes = {
  productDetailed: PropTypes.object,
  setReload: PropTypes.any,
  reload:PropTypes.bool
};

export default function ProductDetailsReview({ productDetailed, setReload, reload}) {

  const product = productDetailed?.reviews

  const [openReview, setOpenReview] = useState(false);

  const handleOpenReview = () => {
    setOpenReview(true);
  };

  const handleCloseReview = () => {
    setOpenReview(false);
  };

  const calculateAverageRating = (data) => {
    if (!data || data.length === 0) {
      return 0; // Return 0 if there is no data
    }
    const totalPoints = data.reduce((sum, item) => sum + item.rating, 0);
    const averageRating = totalPoints / data.length;
    // Assuming ratings are in the range of 1 to 5, we scale the average to be out of 5
    const scaledRating = ((averageRating / 5) * 5).toFixed(1);;
    return parseFloat(scaledRating);
  };

  const averageRating = useMemo(() => calculateAverageRating(product), [product]);

  console.log("prod", product)

  // const total = sumBy(ratings, (star) => star.starCount);

  return (
    <>
      <Box
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
      >
        <Stack
          alignItems="center"
          justifyContent="center"
          spacing={1}
          sx={{
            pt: { xs: 5, md: 0 },
            pb: { xs: 3, md: 0 },
          }}
        >
          <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
            Average rating
          </Typography>

          <Typography variant="h2">{averageRating}/5</Typography>

          <Rating readOnly value={averageRating*1.0} precision={0.1} />

          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            ({fShortenNumber(product.length?product.length:0)} reviews)
          </Typography>
        </Stack>

        {/* <Stack
          spacing={1.5}
          sx={{
            p: 3,
            py: { md: 5 },
            borderLeft: (theme) => ({ md: `dashed 1px ${theme.palette.divider}` }),
            borderRight: (theme) => ({ md: `dashed 1px ${theme.palette.divider}` }),
          }}
        >
          {ratings
            .slice(0)
            .reverse()
            .map((rat) => (
              <ProgressItem key={rat.name} star={rat} total={total} />
            ))}
        </Stack> */}

        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{
            pt: { xs: 3, md: 0 },
            pb: { xs: 5, md: 0 },
          }}
        >
          <Button
            color="inherit"
            size="large"
            onClick={handleOpenReview}
            variant="outlined"
            startIcon={<Iconify icon="eva:edit-fill" />}
          >
            Write your review
          </Button>
        </Stack>
      </Box>

      <Divider />

      <ProductDetailsReviewList reviews={product} />

      <ProductDetailsReviewNewDialog reload={reload} setReload={setReload} open={openReview} prod={productDetailed?.data[0]} onClose={handleCloseReview} />
    </>
  );
}

// ----------------------------------------------------------------------

ProgressItem.propTypes = {
  star: PropTypes.object,
  total: PropTypes.number,
};

function ProgressItem({ star, total }) {
  const { name, starCount, reviewCount } = star;

  return (
    <Stack direction="row" alignItems="center">
      <Typography variant="subtitle2" sx={{ width: 42 }}>
        {name}
      </Typography>

      <LinearProgress
        color="inherit"
        variant="determinate"
        value={(starCount / total) * 100}
        sx={{
          mx: 2,
          flexGrow: 1,
        }}
      />

      <Typography
        variant="body2"
        sx={{
          minWidth: 48,
          color: 'text.secondary',
        }}
      >
        {fShortenNumber(reviewCount)}
      </Typography>
    </Stack>
  );
}
