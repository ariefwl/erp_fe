<template>
    <CCard>
        <CCardHeader>
            <strong>Penyelesain Waste / Scrape</strong>
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
                            <CTableHeaderCell scope="col">No</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Fasilitas</CTableHeaderCell>
                            <CTableHeaderCell scope="col">No. BC</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Tanggal</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Kode Barang</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Nama Barang</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Satuan</CTableHeaderCell>  
                            <CTableHeaderCell scope="col">Jumlah</CTableHeaderCell>  
                            <CTableHeaderCell scope="col">Harga Satuan</CTableHeaderCell>  
                            <CTableHeaderCell scope="col">Nilai Barang</CTableHeaderCell>  
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        <CTableRow v-if="loading">
                            <CTableDataCell colspan="10" class="text-center">
                                <CSpinner size="sm" color="primary" /> Loading data...
                            </CTableDataCell>
                        </CTableRow>

                        <CTableRow v-else-if="waste.length === 0">
                            <CTableDataCell colspan="10" class="text-center">
                                Tidak ada data
                            </CTableDataCell>
                        </CTableRow>

                        <CTableRow v-else v-for="(item, index) in waste" :key="index">
                            <CTableDataCell>{{ index + 1 }}</CTableDataCell>
                            <CTableDataCell>{{ item.FacilitiesName }}</CTableDataCell>
                            <CTableDataCell>{{ item.NoTr }}</CTableDataCell>
                            <CTableDataCell>{{ item.DateTr }}</CTableDataCell>
                            <CTableDataCell>{{ item.ItemCode }}</CTableDataCell>
                            <CTableDataCell>{{ item.InvName }}</CTableDataCell>
                            <CTableDataCell>{{ item.Unit }}</CTableDataCell>
                            <CTableDataCell class="text-end">{{ formatNumber(item.Qty) }}</CTableDataCell>
                            <CTableDataCell>{{ item.Up }}</CTableDataCell>
                            <CTableDataCell>{{ item.Amount }}</CTableDataCell>
                        </CTableRow>
                    </CTableBody>
                </CTable>
             </div>
        </CCardBody>
    </CCard>
</template>

<script setup lang="ts">
import { CCard, CCardBody, CCardHeader, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/vue';
import axios from 'axios';
import { computed, ref } from 'vue';
import { formatNumber } from '../../../helpers/format';

const currentYear = new Date().getFullYear()
const currentMonth = new Date().getMonth() + 1 // bulan berjalan (1–12)
const startYear = 2024 // tahun mulai seperti di PHP kamu


const selectedPeriod = ref('') // format: YYYYMM
const waste = ref([])
const loading = ref(false)
const printing = ref(false) 


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

// set default periode ke bulan berjalan
selectedPeriod.value = `${currentYear}${String(currentMonth).padStart(2, '0')}`
fetchWasteData()

function onChangePeriod(e) {
    selectedPeriod.value = e.target.value
    fetchWasteData()
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

async function fetchWasteData() {
    loading.value = true
    try {
        // const url = selectedPeriod.value
        //     ? `http://127.0.0.1:3001/api/waste?period=${selectedPeriod.value}`
        //     : `http://127.0.0.1:3001/api/waste`
        const url = selectedPeriod.value
            ? `https://api.jansenindonesia.com/api/waste?period=${selectedPeriod.value}`
            : `https://api.jansenindonesia.com/api/waste`
        const res = await axios.get(url)
        waste.value = res.data
    } catch (error) {
        console.error(error)
    } finally {
        loading.value = false
    }
}

</script>
