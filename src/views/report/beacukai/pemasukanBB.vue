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
                            <CTableHeaderCell scope="col">Tgl. Rekam</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Jenis Dokumen</CTableHeaderCell>
                            <CTableHeaderCell scope="col">No. PIB</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Tgl. PIB</CTableHeaderCell>
                            <CTableHeaderCell scope="col">No. Seri Barang</CTableHeaderCell>
                            <CTableHeaderCell scope="col">No. BTB</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Kode Barang</CTableHeaderCell>
                            <CTableHeaderCell scope="col">HS. Code</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Nama Barang</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Satuan</CTableHeaderCell>
                            <CTableHeaderCell scope="col">QTY</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Mata Uang</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Nilai Barang</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Sub Kontrak</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Negara Asal</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Harga Satuan</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Rate</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Harga Satuan Konversi</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Nilai Barang Konversi</CTableHeaderCell>
                            <CTableHeaderCell scope="col">No. PO</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Fasilitas</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Inv. No</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            <CTableRow v-for="(item, index) in purchase" :key="index">
                                <CTableDataCell>{{ item.GRDate }}</CTableDataCell>
                                <CTableDataCell>{{ item.DocType }}</CTableDataCell>
                                <CTableDataCell>{{ item.PIBNo }}</CTableDataCell>
                                <CTableDataCell>{{ item.PIBDate }}</CTableDataCell>
                                <CTableDataCell>{{ item.IDNo }}</CTableDataCell>
                                <CTableDataCell>{{ item.GRNo }}</CTableDataCell>
                                <CTableDataCell>{{ item.ItemCode }}</CTableDataCell>
                                <CTableDataCell>{{ item.ItemName }}</CTableDataCell>
                                <CTableDataCell>{{ item.Qty }}</CTableDataCell>
                                <CTableDataCell>{{ item.Period }}</CTableDataCell>
                            </CTableRow>
                        </CTableBody>
                        </CTable>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import axios from 'axios'

    const purchase = ref([])
    const loading = ref(true)
    const error = ref(null)
    
    onMounted(async () => {
        try {
            const response = await axios.get(`http://103.255.240.205:3000/api/purchase?period=202401`)
            purchase.value = response.data
        } catch (err) {
            console.error(err)
            error.value = 'Gagal memuat data dari server !'
        } finally {
            loading.value = false
        }
    })
</script>