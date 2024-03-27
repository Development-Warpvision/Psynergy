import React from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { visuallyHidden } from '@mui/utils'
// import { useFormik } from "formik";
// import * as yup from "yup";
import { labeltoList } from '../features/userTaskSlice'
import { useDispatch } from 'react-redux/es/hooks/useDispatch'

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

type Order = 'asc' | 'desc'

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number,
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

const headCells = [
  {
    id: 'Role',
    numeric: false,
    disablePadding: true,
    label: 'Role',
  },
]

const DEFAULT_ORDER = 'asc'
const DEFAULT_ORDER_BY = 'Id'

interface EnhancedTableProps {
  numSelected: number
  onRequestSort: (event: React.MouseEvent<unknown>, property: Date) => void
  //   onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order
  orderBy: string
  rowCount: number
}
function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    // onSelectAllClick,
    order,
    orderBy,
    // numSelected,
    // rowCount,
    onRequestSort,
  } = props
  const createSortHandler = (newOrderBy: any) => (
    event: React.MouseEvent<unknown>,
  ) => {
    onRequestSort(event, newOrderBy)
  }

  return (
    <>
      <TableHead sx={{padding : "10px 0px"}}>
        <TableRow  >
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              //   align={"right"}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    </>
  )
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  //   onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
}

const LabelList = ({ rowsData, inprows }: any) => {
  const [order, setOrder] = React.useState<Order>(DEFAULT_ORDER)
  const [orderBy, setOrderBy] = React.useState(DEFAULT_ORDER_BY)
  const [selected, setSelected] = React.useState<readonly string[]>([])
  const [visibleRows, setVisibleRows] = React.useState<any>([])
  // const [paddingHeight, setPaddingHeight] = React.useState(0);
  const [rows, setRows] = React.useState<any>(rowsData)
  const dispatch = useDispatch<any>()
  const paddingHeight = 0

  React.useEffect(() => {
    setRows([...rowsData, inprows])
    if (inprows !== undefined) {
      setVisibleRows(inprows)
    }
  }, [inprows])

  React.useEffect(() => {
    setRows(rowsData)
    // let rowsOnMount = stableSort(
    //   rows,
    //   getComparator(DEFAULT_ORDER, DEFAULT_ORDER_BY)
    // );
    // // console.log(rows);
  }, [])

  const handleRequestSort = React.useCallback(
    (event: React.MouseEvent<unknown>, newOrderBy: any) => {
      const isAsc = orderBy === newOrderBy && order === 'asc'
      const toggledOrder = isAsc ? 'desc' : 'asc'
      setOrder(toggledOrder)
      setOrderBy(newOrderBy)

      const sortedRows = stableSort(
        rows,
        getComparator(toggledOrder, newOrderBy),
      )

      setVisibleRows(sortedRows)
    },
    [order, orderBy],
  )

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected: readonly string[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      )
    }

    setSelected(newSelected)
  }

  const isSelected = (name: string) => selected.indexOf(name) !== -1

  return (
    <>
      {/* use paer fpr eevtion default i that */}
      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size={'medium'}
        >
          <Box sx={{backgroundColor : "#F9FAFC", width : "100%"}}>
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          </Box>
        
          <TableBody sx={{backgroundColor : "white"}}>
            {visibleRows
              ? visibleRows.map((row: any, index: number) => {
                  const isItemSelected = isSelected(row)
                  const labelId = `enhanced-table-checkbox-${index}`

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row}
                      selected={isItemSelected}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="checkbox"
                        size="medium"
                        sx={{
                          fontSize: '1.5rem',
                          fontFamily: 'monospace',
                          px: 8,
                          py: 1.5,
                        }}
                      >
                        {row}
                      </TableCell>
                      <TableCell
                        padding="checkbox"
                        align="right"
                        sx={{ px: 8 }}
                      >
                        <IconButton
                          onClick={() => {
                            dispatch(
                              labeltoList({
                                label: row,
                                method: 'DELETE',
                              }),
                            ).then(
                              (onResolved: any) => {
                                setVisibleRows(onResolved.payload.label)
                              },
                              (onRejected: any) => {
                                // console.log("reje");
                              },
                            )
                          }}
                        >
                          <Box
                            sx={{
                              width: '30px',
                              height: '30px',
                              backgroundColor: '#1976d2',
                              borderRadius: '100px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <DeleteIcon
                              sx={{
                                color: 'white',
                              }}
                            />
                          </Box>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )
                })
              : null}
            {paddingHeight > 0 && (
              <TableRow
                style={{
                  height: paddingHeight,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default LabelList
