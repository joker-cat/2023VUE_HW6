<template>
  <header>
    <div class="wrapper mb-3">
      <nav>
        <ul class="nav justify-content-center">
          <li class="nav-item">
            <RouterLink class="btn btn-secondary me-3" to="/products">商品頁</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="btn btn-secondary" to="/cart"
              >購物車<span class="text-ligth" v-if="getMyCart.length > 0"
                >({{ getMyCart.length }})</span
              ></RouterLink
            >
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import cart from '../stores/cart.js'
import { mapState, mapActions } from 'pinia'

export default {
  computed: {
    ...mapState(cart, ['getMyCart'])
  }
}
</script>

<style></style>
