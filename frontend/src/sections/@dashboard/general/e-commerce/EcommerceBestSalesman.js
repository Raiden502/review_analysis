import PropTypes from 'prop-types';
// @mui
import {
  Box,
  Card,
  Table,
  Stack,
  Avatar,
  TableRow,
  TableBody,
  TableCell,
  CardHeader,
  Typography,
  TableContainer,
} from '@mui/material';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
// components
import Label from '../../../../components/label';
import Image from '../../../../components/image';
import Scrollbar from '../../../../components/scrollbar';
import { TableEmptyRows, TableHeadCustom } from '../../../../components/table';

// ----------------------------------------------------------------------

EcommerceBestSalesman.propTypes = {
  title: PropTypes.string,
  tableData: PropTypes.array,
  subheader: PropTypes.string,
  tableLabels: PropTypes.array,
};

export default function EcommerceBestSalesman({
  title,
  subheader,
  tableData,
  tableLabels,
  ...other
}) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />

      <TableContainer sx={{ overflow: 'unset' }}>
        <Scrollbar>
          <Table sx={{ minWidth: 720 }}>
            <TableHeadCustom headLabel={tableLabels} />

            <TableBody>
              {tableData ? (
                <>
                  {tableData.map((row, index) => (
                  <EcommerceBestSalesmanRow key={index} row={row} />
                  ))}
                </>
              ) : (
                <TableEmptyRows />
              )}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>
    </Card>
  );
}

// ----------------------------------------------------------------------

EcommerceBestSalesmanRow.propTypes = {
  row: PropTypes.shape({
    c_name: PropTypes.string,
    p_name: PropTypes.string,
    review: PropTypes.string,
    rating: PropTypes.number,
    rev_date: PropTypes.string,
  }),
};

function EcommerceBestSalesmanRow({ row }) {
  return (
    <TableRow>
      <TableCell>
        <Stack direction="row" alignItems="center">
          <Avatar alt={row.c_name} src='https://img.freepik.com/premium-psd/3d-cartoon-man-smiling-portrait-isolated-transparent-background-png-psd_888962-1570.jpg?size=626&ext=jpg&ga=GA1.1.386372595.1698192000&semt=ais' />

          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle2"> {row.c_name} </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {row.review}
            </Typography>
          </Box>
        </Stack>
      </TableCell>

      <TableCell>{row.p_name}</TableCell>

      <TableCell>
        <Label
          variant="soft"
          color={
            (row.rating === 5 && 'primary')||
            'error'
          }
        >
          {row.rating}
        </Label>
        </TableCell>
      <TableCell align='center'>
        {row.rev_date}
      </TableCell>
    </TableRow>
  );
}
