<template>
    <CCard>
        <CCardHeader>
            <strong>Pengeluaran Hasil Produksi</strong>
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
                    <CTableHead align="center" color="light">
                        <CTableRow>
                            <CTableHeaderCell>No</CTableHeaderCell>
                            <CTableHeaderCell>No. PEB</CTableHeaderCell>
                            <CTableHeaderCell>Tgl. PEB</CTableHeaderCell>
                            <CTableHeaderCell>No. BPB</CTableHeaderCell>
                            <CTableHeaderCell>Tgl. BPB</CTableHeaderCell>
                            <CTableHeaderCell>Pembeli / Penerima</CTableHeaderCell>
                            <CTableHeaderCell>Negara Tujuan</CTableHeaderCell>
                            <CTableHeaderCell>Kode Barang</CTableHeaderCell>
                            <CTableHeaderCell>Nama Barang</CTableHeaderCell>
                            <CTableHeaderCell>Satuan</CTableHeaderCell>
                            <CTableHeaderCell>Jumlah</CTableHeaderCell>
                            <CTableHeaderCell>Mata Uang</CTableHeaderCell>
                            <CTableHeaderCell>Harga Satuan</CTableHeaderCell>
                            <CTableHeaderCell>Nilai Barang</CTableHeaderCell>
                            <CTableHeaderCell>Invoice No.</CTableHeaderCell>
                        </CTableRow>                    
                    </CTableHead>

                    <CTableBody>
                        <CTableRow v-if="loading">
                            <CTableDataCell colspan="15" class="text-center">
                                <CSpinner size="sm" color="primary" /> Loading data...
                            </CTableDataCell>
                        </CTableRow>

                        <CTableRow v-else-if="sales.length === 0">
                            <CTableDataCell colspan="15" class="text-center">
                                Tidak ada data
                            </CTableDataCell>
                        </CTableRow>

                        <CTableRow v-else v-for="(item, index) in sales" :key="index"> 
                            <CTableDataCell>{{ index + 1 }}</CTableDataCell>
                            <CTableDataCell>{{ item.PEBNo }}</CTableDataCell>
                            <CTableDataCell>{{ formatDate(item.PEBDate) }}</CTableDataCell>
                            <CTableDataCell>{{ item.DONo }}</CTableDataCell>
                            <CTableDataCell>{{ formatDate(item.DODate) }}</CTableDataCell>
                            <CTableDataCell>{{ item.CustomerName }}</CTableDataCell>
                            <CTableDataCell>{{ item.Origin }}</CTableDataCell>
                            <CTableDataCell>{{ item.ItemCode }}</CTableDataCell>
                            <CTableDataCell>{{ item.InvName }}</CTableDataCell>
                            <CTableDataCell>{{ item.Unit }}</CTableDataCell>
                            <CTableDataCell class="text-end">{{ formatNumber(item.Qty) }}</CTableDataCell>
                            <CTableDataCell>{{ item.Currency }}</CTableDataCell>
                            <CTableDataCell class="text-end">{{ formatNumber(item.Up) }}</CTableDataCell>
                            <CTableDataCell class="text-end">{{ formatNumber(item.Amount) }}</CTableDataCell>
                            <CTableDataCell class="text-end"></CTableDataCell>
                        </CTableRow>
                    </CTableBody>
                </CTable>
            </div>
        </CCardBody>
    </CCard>
</template>

<script setup>
import { CCardBody, CCardHeader, CTableDataCell, CTableHead, CTableRow } from '@coreui/vue';
import axios from 'axios';
import { computed, ref } from 'vue';
import { formatDate, formatNumber } from '../../../helpers/format';


const currentYear = new Date().getFullYear()
const currentMonth = new Date().getMonth() + 1 // bulan berjalan (1–12)
const startYear = 2024 // tahun mulai seperti di PHP kamu


const selectedPeriod = ref('') // format: YYYYMM
const sales = ref([])
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

function onChangePeriod(e) {
  selectedPeriod.value = e.target.value
  fetchSalesData()
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
async function fetchSalesData() {
    loading.value = true
    try {
        // const url = selectedPeriod.value
        //     ? `http://127.0.0.1:3001/api/sales?period=${selectedPeriod.value}`
        //     : `http://127.0.0.1:3001/api/sales`
        const url = selectedPeriod.value
            ? `https://api.jansenindonesia.com/api/sales?period=${selectedPeriod.value}`
            : `https://api.jansenindonesia.com/api/sales`
        const res = await axios.get(url)
        sales.value = res.data
    } catch (error) {
        console.error('fetch error', error)
        sales.value = []
    } finally {
        loading.value = false
    }
}

// set default periode ke bulan berjalan
selectedPeriod.value = `${currentYear}${String(currentMonth).padStart(2, '0')}`
fetchSalesData()
</script>