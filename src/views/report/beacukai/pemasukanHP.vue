<template>
    <CCard>
        <CCardHeader>
            <strong>Pemasukan Hasil Produksi</strong>
        </CCardHeader>
        <CCardBody>
            <!-- Filter Periode -->
            <div class="d-flex align-items-center mb-3">
                <label class="me-2 fw-semibold ms-3">Periode:</label>

                <CFormSelect :value="selectedPeriod" @change="onChangePeriod" class="w-auto">
                    <option value="">-- Pilih Periode --</option>

                    <!-- Group per tahun -->
                    <optgroup v-for="(months, year) in groupedPeriods" :key="year" :label="year">
                        <option v-for="p in months" :key="p.value" :value="p.value">
                        {{ p.label }}
                        </option>
                    </optgroup>
                </CFormSelect>

                <CButton color="success" class="ms-3" @click="exportPDF" :disabled="!selectedPeriod">
                <CIcon icon="cil-cloud-download" /> Download
                </CButton>
            </div>

            <!-- Table -->
            <div class="table-responsive text-nowrap">
                <CTable hover bordered small>
                    <CTableHead color="light" align="center">
                        <CTableRow>
                            <CTableHeaderCell>No</CTableHeaderCell>
                            <CTableHeaderCell>No. Bukti Terima</CTableHeaderCell>
                            <CTableHeaderCell>Tanggal</CTableHeaderCell>
                            <CTableHeaderCell>Kode Barang</CTableHeaderCell>
                            <CTableHeaderCell>Nama Barang</CTableHeaderCell>
                            <CTableHeaderCell>Satuan</CTableHeaderCell>
                            <CTableHeaderCell>Dari Produksi</CTableHeaderCell>
                            <CTableHeaderCell>Sub Kontrak</CTableHeaderCell>
                            <CTableHeaderCell>Dari Sub Kontrak</CTableHeaderCell>
                            <CTableHeaderCell>Gudang</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        <CTableRow v-if="loading">
                            <CTableDataCell colspan="11" class="text-center">
                                <CSpinner size="sm" color="primary" /> Loading data...
                            </CTableDataCell>
                        </CTableRow>

                        <CTableRow v-else-if="finGoods.length === 0">
                            <CTableDataCell colspan="10" class="text-center">
                                Tidak ada data
                            </CTableDataCell>
                        </CTableRow>

                        <CTableRow v-else v-for="(item, index) in finGoods" :key="index">
                            <CTableDataCell>{{ index + 1 }}</CTableDataCell>
                            <CTableDataCell>{{ item.FGNo }}</CTableDataCell>
                            <CTableDataCell>{{ formatDate(item.FGDate) }}</CTableDataCell>
                            <CTableDataCell>{{ item.ItemCode }}</CTableDataCell>
                            <CTableDataCell>{{ item.InvName }}</CTableDataCell>
                            <CTableDataCell>{{ item.Unit }}</CTableDataCell>
                            <CTableDataCell class="text-end">{{ formatNumber(item.Qty) }}</CTableDataCell>
                            <CTableDataCell>{{ item.SubContract }}</CTableDataCell>
                            <CTableDataCell>{{ item.SubConQty }}</CTableDataCell>
                            <CTableDataCell>{{ item.WarehouseName }}</CTableDataCell>
                        </CTableRow>
                    </CTableBody>
                </CTable>
            </div>
        </CCardBody>
    </CCard>    
</template>

<script setup>
import { computed, nextTick, ref } from 'vue'
import axios from 'axios'
import { CSpinner, CTableDataCell, CTableHead, CTableRow } from '@coreui/vue'
import { formatDate, formatNumber } from '../../../helpers/format'

const currentYear = new Date().getFullYear()
const currentMonth = new Date().getMonth() + 1 // bulan berjalan (1–12)
const startYear = 2024 // tahun mulai seperti di PHP kamu


const selectedPeriod = ref('') // format: YYYYMM
const finGoods = ref([])
const loading = ref(false)
const printing = ref(false) // untuk menampilkan halaman cetak

const monthNames = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
]


// set default periode ke bulan berjalan
selectedPeriod.value = `${currentYear}${String(currentMonth).padStart(2, '0')}`
fetchFGData()

function onChangePeriod(e) {
  selectedPeriod.value = e.target.value
  fetchFGData()
}

const groupedPeriods = computed(() => {
    const groups = {}
    for (let y = startYear; y <= currentYear; y++) {
    const lastMonth = y === currentYear ? currentMonth : 12
    groups[y] = []
    for (let m = 1; m <= lastMonth; m++) {
      const mm = String(m).padStart(2, '0')
      const value = `${y}${mm}`
      const label = `${monthNames[m - 1]} ${y}`
      groups[y].push({ value, label })
    }
  }
  return groups
})

async function fetchFGData() {
    loading.value = true
    try {
        const url = selectedPeriod.value
            ? `http://127.0.0.1:3001/api/finished-goods?period=${selectedPeriod.value}`
            : `http://127.0.0.1:3001/api/finished-goods`
            // const url = selectedPeriod.value
            //   ? `http://103.255.240.205:3000/api/purchase?period=${selectedPeriod.value}`
            //   : `http://103.255.240.205:3000/api/purchase`
        const res = await axios.get(url)
        finGoods.value = res.data
    } catch (error) {
        console.error('fetch error', error)
        finGoods.value = []
    } finally {
        loading.value = false
    }
}

async function exportPDF() {
    alert('Under development')
//   if (!selectedPeriod.value) {
//     alert('Silakan pilih periode terlebih dahulu!');
//     return;
//   }
//     printing.value = true
//     await nextTick()
//     printing.value = false
}
</script>