<template>
  <CCard>
    <CCardHeader>
      <strong>Pemasukkan Bahan Baku</strong>
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

        <CButton color="primary" class="ms-3" @click="exportPDF" :disabled="!selectedPeriod">
          <CIcon icon="cil-cloud-download" /> Download
        </CButton>
      </div>

      <!-- Table -->
      <div class="table-responsive text-nowrap">
        <CTable hover bordered small>
          <CTableHead align="center" color="light">
            <CTableRow>
              <CTableHeaderCell>No</CTableHeaderCell>
              <CTableHeaderCell>Tgl. Rekam</CTableHeaderCell>
              <CTableHeaderCell>Jns. Dokumen</CTableHeaderCell>
              <CTableHeaderCell>No. PIB</CTableHeaderCell>
              <CTableHeaderCell>tgl. PIB</CTableHeaderCell>
              <CTableHeaderCell>No. Seri Brg.</CTableHeaderCell>
              <CTableHeaderCell>No. BTB</CTableHeaderCell>
              <CTableHeaderCell>Tgl. BTB</CTableHeaderCell>
              <CTableHeaderCell class="text-end">Kode Barang</CTableHeaderCell>
              <CTableHeaderCell>HS. Code</CTableHeaderCell>
              <CTableHeaderCell>Nama Barang</CTableHeaderCell>
              <CTableHeaderCell>Satuan</CTableHeaderCell>
              <CTableHeaderCell>Qty</CTableHeaderCell>
              <CTableHeaderCell>Mata Uang</CTableHeaderCell>
              <CTableHeaderCell>Nilai Barang</CTableHeaderCell>
              <CTableHeaderCell>Sub Kontrak</CTableHeaderCell>
              <CTableHeaderCell>Negara Asal</CTableHeaderCell>
              <CTableHeaderCell>Harga Satuan</CTableHeaderCell>
              <CTableHeaderCell>Rate</CTableHeaderCell>
              <CTableHeaderCell>Harga Satuan Konversi</CTableHeaderCell>
              <CTableHeaderCell>Nilai Barang Konversi</CTableHeaderCell>
              <CTableHeaderCell>No. PO</CTableHeaderCell>
              <CTableHeaderCell>Fasilitas</CTableHeaderCell>
              <CTableHeaderCell>No. Invoice</CTableHeaderCell>
            </CTableRow>
          </CTableHead>

          <CTableBody>
            <CTableRow v-if="loading">
              <CTableDataCell colspan="13" class="text-center">
                <CSpinner size="sm" color="primary" /> Loading data...
              </CTableDataCell>
            </CTableRow>

            <CTableRow v-else-if="purchases.length === 0">
              <CTableDataCell colspan="13" class="text-center">
                Tidak ada data
              </CTableDataCell>
            </CTableRow>

            <CTableRow v-else v-for="(item, index) in purchases" :key="index">
              <CTableDataCell>{{ index + 1 }}</CTableDataCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell>{{ item.DocType }}</CTableDataCell>
              <CTableDataCell>{{ item.PIBNo }}</CTableDataCell>
              <CTableDataCell>{{ formatDate(item.PIBDate) }}</CTableDataCell>
              <CTableDataCell>{{ item.SerialNo }}</CTableDataCell>
              <CTableDataCell>{{ item.GRNo }}</CTableDataCell>
              <CTableDataCell>{{ formatDate(item.GRDate) }}</CTableDataCell>
              <CTableDataCell>{{ item.ItemCode }}</CTableDataCell>
              <CTableDataCell>{{ item.HSCode }}</CTableDataCell>
              <CTableDataCell>{{ item.InvName }}</CTableDataCell>
              <CTableDataCell>{{ item.Unit }}</CTableDataCell>
              <CTableDataCell class="text-end">{{ formatNumber(item.Qty) }}</CTableDataCell>
              <CTableDataCell>{{ item.Currency }}</CTableDataCell>
              <CTableDataCell class="text-end">{{ formatNumber(item.Amount) }}</CTableDataCell>
              <CTableDataCell>{{ item.SubContract }}</CTableDataCell>
              <CTableDataCell>{{ item.Origin }}</CTableDataCell>
              <CTableDataCell class="text-end">{{ formatNumber(item.Up) }}</CTableDataCell>
              <CTableDataCell class="text-end">{{ formatNumber(item.Rate) }}</CTableDataCell>
              <CTableDataCell class="text-end">{{ formatNumber(item.ConUp) }}</CTableDataCell>
              <CTableDataCell class="text-end">{{ formatNumber(item.ConAmount) }}</CTableDataCell>
              <CTableDataCell>{{ item.OrderNo }}</CTableDataCell>
              <CTableDataCell>{{ item.FacilitiesName }}</CTableDataCell>
              <CTableDataCell>{{ item.InvNo }}</CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
      </div>
    </CCardBody>
  </CCard>

  <div id="pdfContent" :style="printing ? 'opacity:1;' : 'opacity:0; height:0; overflow:hidden;'">

    <h2 style="text-align:center; font-size: 14px; font-weight:bold; margin-bottom:5px;">Laporan Pemasukkan Bahan Baku</h2>
    <p style="text-align:center; font-size: 12px; margin-top:0;">Periode : {{ periodLabel }}</p>

    <table border="1" cellspacing="0" cellpadding="6" style="width:100%; border-collapse:collapse; font-size:12px;">
      <thead>
        <tr style="background:#f0f0f0; text-align:center;">
          <th>No</th>
          <th>Tgl Rekam</th>
          <th>Dokumen</th>
          <th>No PIB</th>
          <th>Tgl PIB</th>
          <th>No BTB</th>
          <th>Tgl BTB</th>
          <th>Kode</th>
          <th>Nama Barang</th>
          <th>Qty</th>
          <th>Valuta</th>
          <th>Nilai Barang</th>
          <th>Asal</th>
          <th>No PO</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in purchases" :key="idx">
          <td>{{ idx + 1 }}</td>
          <td>{{ formatDate(item.RecordDate) }}</td>
          <td>{{ item.DocType }}</td>
          <td>{{ item.PIBNo }}</td>
          <td>{{ formatDate(item.PIBDate) }}</td>
          <td>{{ item.GRNo }}</td>
          <td>{{ formatDate(item.GRDate) }}</td>
          <td>{{ item.ItemCode }}</td>
          <td style="word-wrap: break-word; white-space: normal; max-width: 200px;">
            {{ item.InvName }}
          </td>
          <td style="text-align:right;">{{ formatNumber(item.Qty) }}</td>
          <td>{{ item.Currency }}</td>
          <td style="text-align:right;">{{ formatNumber(item.Amount) }}</td>
          <td>{{ item.Origin }}</td>
          <td>{{ item.OrderNo }}</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import axios from 'axios'

const currentYear = new Date().getFullYear()
const currentMonth = new Date().getMonth() + 1 // bulan berjalan (1–12)
const startYear = 2024 // tahun mulai seperti di PHP kamu

const selectedPeriod = ref('') // format: YYYYMM
const purchases = ref([])
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

// generate semua periode dari 2024 sampai tahun berjalan
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


// event handler select
function onChangePeriod(e) {
  selectedPeriod.value = e.target.value
  fetchPurchaseData()
}

// fetch data dari API
async function fetchPurchaseData() {
  loading.value = true
  try {
    const url = selectedPeriod.value
      ? `http://127.0.0.1:3001/api/purchase?period=${selectedPeriod.value}`
      : `http://127.0.0.1:3001/api/purchase`
    // const url = selectedPeriod.value
    //   ? `http://103.255.240.205:3000/api/purchase?period=${selectedPeriod.value}`
    //   : `http://103.255.240.205:3000/api/purchase`
    const res = await axios.get(url)
    purchases.value = res.data
  } catch (err) {
    console.error('fetch error', err)
    purchases.value = []
  } finally {
    loading.value = false
  }
}

// Cetak PDF
async function exportPDF() {
  if (!selectedPeriod.value) {
    alert('Silakan pilih periode terlebih dahulu!');
    return;
  }

  printing.value = true;

  await nextTick();

  const element = document.getElementById('pdfContent');

  const opt = {
    margin: 5,
    filename: `pemasukanBB_${selectedPeriod.value}.pdf`,
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
  };
  
  await window.html2pdf().set(opt).from(element).save();
  
  printing.value = false;
}

// --- format tanggal (DD-MM-YYYY)
function formatDate(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}-${month}-${year}`
}

// --- format angka (desimal format Indonesia)
function formatNumber(num) {
  if (num == null || num === '') return ''
  return Number(num).toLocaleString('id-ID', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

// set default periode ke bulan berjalan
selectedPeriod.value = `${currentYear}${String(currentMonth).padStart(2, '0')}`
fetchPurchaseData()
</script>
