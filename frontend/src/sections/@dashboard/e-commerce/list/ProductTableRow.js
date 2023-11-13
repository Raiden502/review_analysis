import PropTypes from 'prop-types';
import { useState } from 'react';
import { sentenceCase } from 'change-case';
// @mui
import {
  Stack,
  Button,
  TableRow,
  Checkbox,
  MenuItem,
  TableCell,
  IconButton,
  Typography,
  Link,
} from '@mui/material';
// utils
import { fDate } from '../../../../utils/formatTime';
import { fCurrency } from '../../../../utils/formatNumber';
// components
import Label from '../../../../components/label';
import Image from '../../../../components/image';
import Iconify from '../../../../components/iconify';
import MenuPopover from '../../../../components/menu-popover';
import ConfirmDialog from '../../../../components/confirm-dialog';

// ----------------------------------------------------------------------

ProductTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onViewRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onDelConfirm:PropTypes.any,
  confirmState:PropTypes.bool,
};

export default function ProductTableRow({
  row,
  selected,
  onSelectRow,
  onDeleteRow,
  onEditRow,
  onViewRow,
  onDelConfirm,
  confirmState,
}) {

  const { p_name, p_date, p_category, p_price, cover } = row;

  const [openPopover, setOpenPopover] = useState(null);

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  console.log("open", confirmState)
  return (
    <>
      <TableRow hover selected={selected}>
        {/* <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell> */}

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Image
              disabledEffect
              visibleByDefault
              alt={p_name}
              src={cover}
              sx={{ borderRadius: 1.5, width: 48, height: 48 }}
            />

            {/* <Link
              noWrap
              color="inherit"
              variant="subtitle2"
              onClick={onViewRow}
              sx={{ cursor: 'pointer' }}
            >
              {p_name}
            </Link> */}
            <Typography>{p_name}</Typography>
          </Stack>
        </TableCell>

        <TableCell>{fDate(p_date)}</TableCell>

        <TableCell align="center">
          <Label
            variant="soft"
            color={
              (p_category === 'out_of_stock' && 'error') ||
              (p_category === 'low_stock' && 'warning') ||
              'success'
            }
            sx={{ textTransform: 'capitalize' }}
          >
            {p_category ? sentenceCase(p_category) : ''}
          </Label>
        </TableCell>

        <TableCell align="right">{fCurrency(p_price)}</TableCell>

        <TableCell align="right">
          <IconButton color={openPopover ? 'primary' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            onDelConfirm();
            handleClosePopover();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" />
          Delete
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          Edit
        </MenuItem>
      </MenuPopover>

      <ConfirmDialog
        open={confirmState}
        onClose={onDelConfirm}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}
