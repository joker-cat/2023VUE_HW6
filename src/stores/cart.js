// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

//Pinia 是獨立於 Vue 核心的狀態管理函式庫，它並不依賴 Vue 的全域配置
//所以全域宣告的$axios不起作用

export default defineStore('cart', {
  state: () => ({
    baseUrl: 'https://ec-course-api.hexschool.io/v2/api/joooker',
    products: [],
    myCart: []
  }),
  getters: {
    getProducts: ({ products }) => {
      return products
    },
    getMyCart: ({ myCart }) => {
      return myCart
    }
  },
  actions: {
    axiosGetProducts() {
      axios.get(`${this.baseUrl}/products/all`).then((res) => {
        this.products = res.data.products;
      })

    },
    addToCart(productId, count = 1) {
      console.log(productId, count);
      // return
      const hasInCart = this.myCart.filter(iproduct => iproduct.id === productId).length
      if (hasInCart) {
        const findIdx = this.myCart.findIndex(iMycart => iMycart.id === productId);
        this.myCart[findIdx]["count"] = count;
      } else {
        const findIdx = this.products.findIndex(iproduct => iproduct.id === productId);
        this.myCart.push({ ...this.products[findIdx], count });
      }
    }
  }
})
