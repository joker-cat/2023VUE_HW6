<template>
  <div class="text-center">
    <table class="table align-middle my-4">
      <thead>
        <tr>
          <th style="width: 5%">#</th>
          <th style="width: 15%">圖式</th>
          <th style="width: 15%">名稱</th>
          <th style="width: 15%">敘述</th>
          <th style="width: 10%">原價</th>
          <th style="width: 10%">特價</th>
          <th style="width: 30%"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(iproduct, idx) in getProducts" :key="iproduct.id">
          <th>{{ idx + 1 }}</th>
          <th style="height: 100px">
            <img class="h-100" :src="iproduct.imageUrl" alt="error loading" />
          </th>
          <td>{{ iproduct.title }}</td>
          <td>{{ iproduct.description }}</td>
          <td>{{ iproduct.origin_price }}</td>
          <td>{{ iproduct.price }}</td>
          <td>
            <div>
              <RouterLink class="btn btn-success me-2" :to="`/products/${iproduct.id}`"
                >查看</RouterLink
              >
              <button class="btn btn-primary" @click="addToCart(iproduct.id)">加入購物車</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <RouterLink class="btn btn-danger mx-auto" to="/">返回前台</RouterLink>
  </div>
</template>

<script>
import cart from '../stores/cart.js'
import { mapState, mapActions } from 'pinia'
export default {
  data() {
    return {}
  },
  methods: {
    ...mapActions(cart, ['addToCart'])
  },
  computed: {
    ...mapState(cart, ['getProducts'])
  },
  mounted() {}
}
</script>

<style></style>
