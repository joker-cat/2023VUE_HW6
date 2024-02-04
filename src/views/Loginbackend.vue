<template>
  <div class="row justify-content-center text-center align-items-center" style="height: 100vh">
    <div class="col-5">
      <h2 class="mb-3 fs-bolder">請先登入</h2>
      <form id="form" class="form-signin">
        <div class="form-floating mb-3">
          <input
            type="email"
            class="form-control"
            id="username"
            placeholder="name@example.com"
            required
            autofocus
            v-model="userInfo.username"
          />
          <label for="username">Email address</label>
        </div>
        <div class="form-floating">
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="Password"
            required
            v-model="userInfo.password"
          />
          <label for="password">Password</label>
        </div>
        <button class="btn btn-lg btn-primary w-100 mt-3" type="submit" @click.prevent="login">
          登入
        </button>
        <button class="btn btn-lg btn-primary w-100 mt-3" type="button" @click="checkLogin">
          驗證登入
        </button>
        <p style="padding: 5px">未持有驗證</p>
      </form>
      <p class="mt-5 mb-3 text-muted">&copy; 2021~∞ - 六角學院</p>
    </div>
  </div>
</template>

<script>
import { docCookies } from '../cookie.js'
export default {
  data() {
    return {
      // pathname: window.location.pathname, //當前路徑
      // hasCookie: document.cookie.includes('mycookieTest'), //是否有cookie
      token: '',
      userInfo: {
        username: '',
        password: ''
      }
      // userChoose: {}, //品項選擇
      // products: [], //全部品項
      // price: ''
    }
  },
  created() {
    // if (this.pathname === '/2023VUE_HW2/admin.html' && this.hasCookie === false) {
    //     location.href = 'index.html';
    // }
    // if (this.hasCookie === true) {
    //     this.render();
    // }
  },
  methods: {
    login() {
      this.$axios
        .post('https://ec-course-api.hexschool.io/v2/admin/signin', this.userInfo)
        .then((res) => {
          console.log(res)
          if (res.data.message === '登入成功') {
            this.token = res.data.token
            docCookies.setItem('token', this.token)
            this.$axios.defaults.headers.common['Authorization'] = this.token //只在此組件
            this.$router.push('/admin')
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
    // checkLogin() {
    //   // #3 取得 Token（Token 僅需要設定一次）
    //   if (document.cookie.includes('mycookieTest') === false) {
    //     alert('未驗證')
    //   }
    //   const token = document.cookie.replace(
    //     /(?:(?:^|.*;\s*)mycookieTest\s*\=\s*([^;]*).*$)|^.*$/,
    //     '$1'
    //   )
    //   axios.defaults.headers.common['Authorization'] = token //意思是下次發axios請求時，會把token以headers一起發送。

    //   axios
    //     .post('https://ec-course-api.hexschool.io/v2/api/user/check')
    //     .then((res) => {
    //       if (res.data.success) {
    //         this.hasCookie = res.data.success
    //         alert('已驗證')
    //       }
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //     })
    // }
  }
}
</script>

<style></style>
