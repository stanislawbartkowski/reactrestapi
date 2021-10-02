import { GridLocaleText } from '@mui/x-data-grid';

const gridstrings: GridLocaleText = {
    // Root
    //    rootGridLabel: 'grid',
    noRowsLabel: 'Nie ma nic do wyświetlenia',
    errorOverlayDefaultLabel: 'Coś jest źle.',

    // Density selector toolbar button text
    toolbarDensity: 'Wielkość',
    toolbarDensityLabel: 'Wielkość',
    toolbarDensityCompact: 'Ściśnięty',
    toolbarDensityStandard: 'Standardowy',
    toolbarDensityComfortable: 'Poszerzony',

    // Columns selector toolbar button text
    toolbarColumns: 'Kolumny',
    toolbarColumnsLabel: 'Pokaż wskaźnik kolumny',

    // Filters toolbar button text
    toolbarFilters: 'FIltry',
    toolbarFiltersLabel: 'Pokaż filtry',
    toolbarFiltersTooltipHide: 'Schowaj filtry',
    toolbarFiltersTooltipShow: 'Pokaż filtry',
    toolbarFiltersTooltipActive: (count) => `Liczba użytych filtrów: ${count}`,


    // Columns panel text
    columnsPanelTextFieldLabel: 'Znajdź kolumnę',
    columnsPanelTextFieldPlaceholder: 'Nazwa kolumny',
    columnsPanelDragIconLabel: 'Zmień porządek kolumn',
    columnsPanelShowAllButton: 'Pokaż wszystkie',
    columnsPanelHideAllButton: 'Schowaj wszystkie',

    // Filter panel text
    filterPanelAddFilter: 'Dodaj filtr',
    filterPanelDeleteIconLabel: 'Usuń filtr',
    filterPanelOperators: 'Działania',
    filterPanelOperatorAnd: 'oraz',
    filterPanelOperatorOr: 'lub',
    filterPanelColumns: 'Kolumny',
    filterPanelInputLabel: 'Wartość',
    filterPanelInputPlaceholder: 'Filtruj według wartości',

    // Filter operators text
    filterOperatorContains: 'zawiera',
    filterOperatorEquals: 'jest równe',
    filterOperatorStartsWith: 'zaczyna się od',
    filterOperatorEndsWith: 'kończy się na',
    filterOperatorIs: 'jest',
    filterOperatorNot: 'nie jest',
    //                filterOperatorOnOrAfter: 'is on or after',
    filterOperatorOnOrAfter: 'jest równe lub za',
    filterOperatorBefore: 'jest przed',
    filterOperatorOnOrBefore: 'jest równe lub przed',

    // Column menu text
    columnMenuLabel: 'Menu',
    columnMenuShowColumns: 'Pokaż kolumny',
    columnMenuFilter: 'Filtr',
    columnMenuHideColumn: 'Schowaj kolumny',
    columnMenuUnsort: 'Usuń uporządkowanie',
    columnMenuSortAsc: 'Sortuj rosnąco',
    columnMenuSortDesc: 'Sortuj malejąco',

    // Column header text
    columnHeaderFiltersTooltipActive: (count) => `liczba aktywnyhch filtrów : ${count} `,
    columnHeaderFiltersLabel: 'Pokaż filtry',
    columnHeaderSortIconLabel: 'Sortuj',

    // Rows selected footer text
    footerRowSelected: (count) =>
        count !== 1
            ? `${count.toLocaleString()} rows selected`
            : `${count.toLocaleString()} row selected`,

    // Total rows footer text
    footerTotalRows: 'Total Rows:',

    toolbarExport: "Eksport",
    toolbarExportLabel: "dddd",
    toolbarExportCSV: "Eksport CSV",
    filterOperatorAfter: "cccc",
    filterValueAny: "xxxx",
    filterValueTrue: "yyyyy",
    filterValueFalse: "zzzz",
    checkboxSelectionHeaderName: "aaaaaa",
    booleanCellTrueLabel: "bbbbbb",
    booleanCellFalseLabel: "eeeee",

    noResultsOverlayLabel: "Wyszukiwanie puste",
    filterOperatorIsEmpty: "Pole puste",
    filterOperatorIsNotEmpty: "Pole z wartością",
    footerTotalVisibleRows: (visibleCount: number, totalCount: number) => <div>XXX</div>,
    MuiTablePagination: {},

    actionsCellMore : 'vvvvvvvvv'

    // Pagination footer text
    //footerPaginationRowsPerPage: 'Rows per page:',
}

export default gridstrings;