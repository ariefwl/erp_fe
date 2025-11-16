<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <CCard class="p-4" style="width: 350px">
      <CImage :src="logo" />
      <h7 class="text-center fw-bold mb-3">IT. Inventory Management System</h7>
      <CForm @submit.prevent="submitLogin">
        <CFormInput
          class="mb-3"
          label="Username"
          placeholder="Masukkan username"
          v-model="username"
        />

        <CFormInput
          class="mb-3"
          label="Password"
          type="password"
          placeholder="Masukkan password"
          v-model="password"
        />

        <CButton class="w-100" color="primary" type="submit">
          Login
        </CButton>

        <div class="text-danger mt-2" v-if="errorMsg">{{ errorMsg }}</div>
      </CForm>
    </CCard>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { CImage } from "@coreui/vue";
import logo from "@/assets/logo/Logo1.png";

const username = ref("");
const password = ref("");
const errorMsg = ref("");

async function submitLogin() {
  errorMsg.value = "";

  try {
    const res = await axios.post("http://127.0.0.1:3001/api/auth/login", {
      username: username.value,
      password: password.value,
    });

    if (res.data.success) {
      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.location.href = "/"; // redirect ke dashboard
    }
  } catch (err) {
    errorMsg.value = err.response?.data?.message || "Login gagal";
  }
}
</script>
