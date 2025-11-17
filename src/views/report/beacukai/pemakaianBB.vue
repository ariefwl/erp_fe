<template>
  <CCard>
      <CCardHeader>
          <strong>Pemakaian Bahan Baku</strong>
      </CCardHeader>  

      <CCardBody>
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

              <CButton color="primary" class="ms-3" @click="exportPDF" :disabled="!selectedPeriod">
              <CIcon icon="cil-cloud-download" /> Cetak
              </CButton>
          </div>

          <div class="table-responsive text-nowrap">
              <CTable hover bordered small>
                  <CTableHead align="center" color="light">
                      <CTableRow>
                          <CTableHeaderCell>No</CTableHeaderCell>
                          <CTableHeaderCell>No. Transaksi</CTableHeaderCell>
                          <CTableHeaderCell>Tanggal</CTableHeaderCell>
                          <CTableHeaderCell>Kode Barang</CTableHeaderCell>
                          <CTableHeaderCell>Nama Barang</CTableHeaderCell>
                          <CTableHeaderCell>Satuan</CTableHeaderCell>
                          <CTableHeaderCell>Jumlah Digunakan</CTableHeaderCell>
                          <CTableHeaderCell>Jumlah di SubKontrakan</CTableHeaderCell>
                          <CTableHeaderCell>Nama SubKontrak</CTableHeaderCell>
                          <CTableHeaderCell>Fasilitas</CTableHeaderCell>
                          <CTableHeaderCell>Waste Qty</CTableHeaderCell>
                      </CTableRow>
                  </CTableHead>

                  <CTableBody>
                      <CTableRow v-if="loading">
                          <CTableDataCell colspan="11" class="text-center">
                              <CSpinner size="sm" color="primary" /> Loading data...
                          </CTableDataCell>
                      </CTableRow>

                      <CTableRow v-else-if="matUses.length === 0">
                          <CTableDataCell colspan="11" class="text-center">
                              Tidak ada data  
                          </CTableDataCell>
                      </CTableRow>

                      <CTableRow v-else v-for="(item, index) in matUses" :key="index">
                          <CTableDataCell>{{ index + 1 }}</CTableDataCell>
                          <CTableDataCell>{{ item.MUNo }}</CTableDataCell>
                          <CTableDataCell>{{ formatDate(item.MUDate) }}</CTableDataCell>
                          <CTableDataCell>{{ item.ItemCode }}</CTableDataCell>
                          <CTableDataCell>{{ item.InvName }}</CTableDataCell>
                          <CTableDataCell>{{ item.Unit }}</CTableDataCell>
                          <CTableDataCell class="text-end">{{ formatNumber(item.Qty) }}</CTableDataCell>
                          <CTableDataCell class="text-end">{{ formatNumber(item.SubConQty) }}</CTableDataCell>
                          <CTableDataCell>{{ item.SubContract }}</CTableDataCell>
                          <CTableDataCell>{{ item.FacilitiesName }}</CTableDataCell>
                          <CTableDataCell class="text-end">{{ formatNumber(item.WasteQty) }}</CTableDataCell>
                      </CTableRow>
                  </CTableBody>
              </CTable>
          </div>
      </CCardBody>
  </CCard>
</template>

<script setup>
import { ref, computed } from 'vue';
import axios from 'axios';
import { formatPeriod, formatDate, formatNumber } from '../../../helpers/format';
import { CTable } from '@coreui/vue';

const currentYear = new Date().getFullYear()
const currentMonth = new Date().getMonth() + 1 // bulan berjalan (1–12)
const startYear = 2024 // tahun mulai seperti di PHP kamu

const selectedPeriod = ref('') 
const matUses = ref([])
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

const periodLabel = computed(() => {
  if (!selectedPeriod.value) return ''
  const y = selectedPeriod.value.substring(0, 4)
  const m = parseInt(selectedPeriod.value.substring(4, 6))
  return `${monthNames[m - 1]} ${y}`
})

function onChangePeriod(e) {
  selectedPeriod.value = e.target.value
  fetchMatUseData()
}

async function fetchMatUseData(){
  loading.value = true
  try {
    // const url = selectedPeriod.value
    //   ? `http://127.0.0.1:3001/api/material-use?period=${selectedPeriod.value}`
    //   : `http://127.0.0.1:3001/api/material-use`
    const url = selectedPeriod.value
      ? `https://api.jansenindonesia.com/api/material-use?period=${selectedPeriod.value}`
      : `https://api.jansenindonesia.com/api/material-use`
    const res = await axios.get(url)
    matUses.value = res.data
  } catch (err) {
    console.error('fetch error', err)
    matUses.value = []
  } finally {
    loading.value = false
  }
}

// set default periode ke bulan berjalan
selectedPeriod.value = `${currentYear}${String(currentMonth).padStart(2, '0')}`
fetchMatUseData()
</script>