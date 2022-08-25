function descendingComparator(a: Array<any>, b: Array<any>, orderBy: any) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array: Array<any>, comparator: any) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function getComparator(order: string, orderBy: any) {
  return order === "desc"
    ? (a: Array<any>, b: Array<any>) => descendingComparator(a, b, orderBy)
    : (a: Array<any>, b: Array<any>) => -descendingComparator(a, b, orderBy);
}

export { getComparator, stableSort };
