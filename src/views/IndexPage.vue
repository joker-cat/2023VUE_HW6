<script>
import { docCookies } from '../cookie.js'
import { mapActions } from 'pinia'
import cart from '../stores/cart.js'
import NavbarLink from '../components/NavbarLink.vue'
export default {
  components: {
    NavbarLink
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
      <RouterLink class="fw-bolder fs-2 btn btn-danger" :to="hasCookie ? '/admin' : '/login'">{{
        hasCookie ? '前往後台' : '登入後台'
      }}</RouterLink>
    </div>
  </div>
</template>
<style scoped></style>
