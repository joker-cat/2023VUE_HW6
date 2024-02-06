<template>
  <div v-if="getMyCartLength">
    <div class="text-end">
      <button class="btn btn-outline-danger" type="button" @click="userRemoveAllProduct">清空購物車</button>
    </div>
    <table class="table align-middle">
      <thead>
        <tr>
          <th class="col"></th>
          <th class="col">圖式</th>
          <th class="col">品名</th>
          <th class="col">數量/單位</th>
          <th class="col">單價</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="getMyCartLength">
          <tr v-for="iproduct in getMyCart">
            <td>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="userRemoveCartProduct(iproduct.id)"
              >
                <i class="fas fa-spinner fa-pulse"></i>
                x
              </button>
            </td>
            <td style="height: 100px">
              <img class="h-100" :src="iproduct.imageUrl" alt="" />
            </td>
            <td>
              {{ iproduct.title }}
              <div class="text-success">已套用優惠券</div>
            </td>
            <td>
              <div class="input-group input-group-sm">
                <div class="input-group">
                  <input
                    min="1"
                    type="number"
                    class="form-control"
                    :value="iproduct.count"
                    @input="userAddToCart($event, iproduct.id)"
                  />
                  <span class="input-group-text" id="basic-addon2">{{ iproduct.unit }}</span>
                </div>
              </div>
            </td>
            <td>
              <div class="input-group d-flex">
                <span class="text-decoration-line-through flex-grow-1">{{
                  iproduct.origin_price
                }}</span>
                <span>
                  <small class="text-success">折扣價：</small>
                  <span>{{ iproduct.price }}</span>
                </span>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="2" class="text-end"></td>
          <td colspan="2" class="text-end">原價總計</td>
          <td class="text-end">{{ originPriceTotal.originPrice }}</td>
        </tr>
        <tr>
          <td colspan="2" class="text-end"></td>
          <td colspan="2" class="text-end">折扣</td>
          <td class="text-end text-danger">-{{ originPriceTotal.differencePrice }}</td>
        </tr>
        <tr>
          <td colspan="2" class="text-end"></td>
          <td colspan="2" class="text-end text-success">總折扣價</td>
          <td class="text-end">{{ originPriceTotal.price }}</td>
        </tr>
      </tfoot>
    </table>
  </div>
  <div class="text-danger fs-1 fw-bolder py-5 text-center" v-else>購物車為空</div>
</template>

<script>
import cart from '../stores/cart.js'
import { mapState, mapActions } from 'pinia'
export default {
  methods: {
    ...mapActions(cart, ['addToCart', 'removeToProduct', 'removeAllProduct']),
    userAddToCart(ievent, productId) {
      this.addToCart(productId, Number(ievent.target.value))
    },
    userRemoveCartProduct(productId) {
      this.removeToProduct(productId)
    },
    userRemoveAllProduct() {
      this.removeAllProduct()
    }
  },
  computed: {
    ...mapState(cart, ['getMyCart']),
    getMyCartLength() {
      return this.getMyCart.length > 0 ? true : false
    },
    originPriceTotal() {
      let totalObj = { originPrice: 0, price: 0, differencePrice: 0 }
      this.getMyCart.reduce((acc, ipt) => {
        totalObj.originPrice += ipt.origin_price * ipt.count
        totalObj.price += ipt.price * ipt.count
        totalObj.differencePrice += (ipt.origin_price - ipt.price) * ipt.count
      }, totalObj)

      return totalObj
    }
  }
}
</script>

<style></style>
