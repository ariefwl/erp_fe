<!-- <script setup>
    import ColorTheme from './ColorTheme.vue'
</script> -->


<template>
    <CRow>
        <CCol :xs="12">
            <CCard>
                <CCardHeader>
                    <strong>Laporan Pemasukan Bahan Baku</strong>
                </CCardHeader>
                <CCardBody>
                    <CTable>
                        <CTableHead>
                            <CTableRow>
                            <CTableHeaderCell scope="col">Class</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            <CTableRow>
                            <CTableHeaderCell scope="row">Default</CTableHeaderCell>
                            <CTableDataCell>Cell</CTableDataCell>
                            <CTableDataCell>Cell</CTableDataCell>
                            </CTableRow>
                            <CTableRow color="primary">
                            <CTableHeaderCell scope="row">Primary</CTableHeaderCell>
                            <CTableDataCell>Cell</CTableDataCell>
                            <CTableDataCell>Cell</CTableDataCell>
                            </CTableRow>
                            <CTableRow color="secondary">
                            <CTableHeaderCell scope="row">Secondary</CTableHeaderCell>
                            <CTableDataCell>Cell</CTableDataCell>
                            <CTableDataCell>Cell</CTableDataCell>
                            </CTableRow>
                            <CTableRow color="success">
                            <CTableHeaderCell scope="row">Success</CTableHeaderCell>
                            <CTableDataCell>Cell</CTableDataCell>
                            <CTableDataCell>Cell</CTableDataCell>
                            </CTableRow>
                            <CTableRow color="danger">
                            <CTableHeaderCell scope="row">Danger</CTableHeaderCell>
                            <CTableDataCell>Cell</CTableDataCell>
                            <CTableDataCell>Cell</CTableDataCell>
                            </CTableRow>
                            <CTableRow color="warning">
                            <CTableHeaderCell scope="row">Warning</CTableHeaderCell>
                            <CTableDataCell>Cell</CTableDataCell>
                            <CTableDataCell>Cell</CTableDataCell>
                            </CTableRow>
                            <CTableRow color="info">
                            <CTableHeaderCell scope="row">Info</CTableHeaderCell>
                            <CTableDataCell>Cell</CTableDataCell>
                            <CTableDataCell>Cell</CTableDataCell>
                            </CTableRow>
                            <CTableRow color="light">
                            <CTableHeaderCell scope="row">Light</CTableHeaderCell>
                            <CTableDataCell>Cell</CTableDataCell>
                            <CTableDataCell>Cell</CTableDataCell>
                            </CTableRow>
                            <CTableRow color="dark">
                            <CTableHeaderCell scope="row">Dark</CTableHeaderCell>
                            <CTableDataCell>Cell</CTableDataCell>
                            <CTableDataCell>Cell</CTableDataCell>
                            </CTableRow>
                        </CTableBody>
                        </CTable>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
</template>