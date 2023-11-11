import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Stack, Button, Rating, Avatar, Pagination, Typography } from '@mui/material';
// utils
import { fDate } from '../../../../utils/formatTime';
import { fShortenNumber } from '../../../../utils/formatNumber';
// components
import Iconify from '../../../../components/iconify';

// ----------------------------------------------------------------------

ProductDetailsReviewList.propTypes = {
  reviews: PropTypes.array,
};

export default function ProductDetailsReviewList({ reviews }) {
  return (
    <>
      <Stack
        spacing={5}
        sx={{
          pt: 5,
          pl: {
            xs: 2.5,
            md: 0,
          },
          pr: {
            xs: 2.5,
            md: 5,
          },
        }}
      >
        {reviews.map((review, index) => (
          <ReviewItem key={index} reviews={review} />
        ))}
      </Stack>

      <Stack
        alignItems={{
          xs: 'center',
          md: 'flex-end',
        }}
        sx={{
          my: 5,
          mr: { md: 5 },
        }}
      >
        <Pagination count={10} />
      </Stack>
    </>
  );
}

// ----------------------------------------------------------------------

ReviewItem.propTypes = {
  reviews: PropTypes.object,
};

function ReviewItem({ reviews }) {
  const { cons, rating, review, helpful, rev_date,} = reviews;

  const isPurchased = true
  const [isHelpful, setIsHelpful] = useState(false);

  const avatarUrl = "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=740&t=st=1699703287~exp=1699703887~hmac=0372087636b0cc1a934db26fdb32424b39236605ddbd6ecc5966defc3962ddb2"

  return (
    <Stack
      spacing={2}
      direction={{
        xs: 'column',
        md: 'row',
      }}
    >
      <Stack
        spacing={2}
        alignItems="center"
        direction={{
          xs: 'row',
          md: 'column',
        }}
        sx={{
          width: { md: 240 },
          textAlign: { md: 'center' },
        }}
      >
        <Avatar
          src={avatarUrl}
          sx={{
            width: { md: 64 },
            height: { md: 64 },
          }}
        />

        <Stack spacing={{ md: 0.5 }}>
          <Typography variant="subtitle2" noWrap>
            {cons}
          </Typography>

          <Typography variant="caption" sx={{ color: 'text.secondary' }} noWrap>
            {fDate(rev_date)}
          </Typography>
        </Stack>
      </Stack>

      <Stack spacing={1} flexGrow={1}>
        <Rating size="small" value={rating} precision={0.1} readOnly />

        {isPurchased && (
          <Typography
            variant="caption"
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: 'success.main',
            }}
          >
            <Iconify icon="ic:round-verified" width={16} sx={{ mr: 0.5 }} />
            Verified purchase
          </Typography>
        )}

        <Typography variant="body2">{review}</Typography>

        <Stack
          spacing={1}
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          direction={{ xs: 'column', sm: 'row' }}
        >
          {!isHelpful && (
            <Typography variant="subtitle2">Was this review helpful to you?</Typography>
          )}

          <Button
            size="small"
            color="inherit"
            startIcon={<Iconify icon={!isHelpful ? 'ic:round-thumb-up' : 'eva:checkmark-fill'} />}
            onClick={() => setIsHelpful(!isHelpful)}
          >
            {isHelpful ? 'Helpful' : 'Thank'}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
