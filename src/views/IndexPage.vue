<script>
import { docCookies } from '../cookie.js'
import NavbarLink from '../components/NavbarLink.vue'
export default {
  components: {
    NavbarLink
  },
  methods: {
    checkLogin() {
      this.$axios
        .post('https://ec-course-api.hexschool.io/v2/api/user/check')
        .then((res) => {
          alert('已登入')
        })
        .catch((error) => {
          alert('驗證失敗')
          console.log(error)
        })
    }
  },
  computed: {
    localRoute() {
      return this.$route.path === '/' ? true : false
    },
    hasCookie() {
      return docCookies.hasItem('token')
    },
    titleName() {
      return { '/': '首頁', '/products': '商品頁', '/cart': '購物車' }[this.$route.path]
    }
  },
  mounted() {
    if (docCookies.hasItem('token')) {
      this.$axios.defaults.headers.common['Authorization'] = docCookies.getItem('token')
    }
  }
}
</script>

<template>
  <div class="py-3">
    <h2 class="fw-bolder text-center mb-3">{{ titleName }}</h2>
    <NavbarLink />
    <RouterView />
    <p class="fw-bolder"></p>
    <div class="text-center" v-if="localRoute">
      <RouterLink
        class="fw-bolder fs-4 btn btn-danger me-2"
        :to="hasCookie ? '/admin' : '/login'"
        >{{ hasCookie ? '前往後台' : '登入後台' }}</RouterLink
      >
      <button class="fw-bolder fs-4 btn btn-primary" type="submit" @click.prevent="checkLogin">
        驗證登入
      </button>
    </div>
  </div>
</template>
<style scoped></style>
