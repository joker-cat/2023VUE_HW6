// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

//Pinia 是獨立於 Vue 核心的狀態管理函式庫，它並不依賴 Vue 的全域配置
//所以全域宣告的$axios不起作用

export default defineStore('cart', {
  state: () => ({
    baseUrl: import.meta.env.VITE_PATH,
    products: [],
    pagination: [],
    myCart: []
  }),
  getters: {
    getProducts: ({ products }) => {
      return products
    },
    getPagination: ({ pagination }) => {
      return pagination
    },
    getMyCart: ({ myCart }) => {
      return myCart
    }
  },
  actions: {
    axiosGetProducts(page = 1) {
      axios
        .get(`${this.baseUrl}/products/?page=${page}`)
        .then((res) => {
          const addAttribute = res.data.products.map((i) => (i = { ...i, ispressed: 0 }))
          this.products = addAttribute
          this.pagination = res.data.pagination
        })
        .catch((err) => console.log(err))
    },
    addToCart(productId, count = 1) {
      const hasInCart = this.myCart.filter((iproduct) => iproduct.id === productId).length
      if (hasInCart) {
        const findIdx = this.myCart.findIndex((iMycart) => iMycart.id === productId)
        this.myCart[findIdx]['count'] = count
      } else {
        const findIdx = this.products.findIndex((iproduct) => iproduct.id === productId)
        this.myCart.push({ ...this.products[findIdx], count })
      }
    },
    removeToProduct(productId) {
      const findIdx = this.myCart.findIndex((icart) => icart.id === productId)
      const findProductsId = this.products.findIndex((iproduct) => iproduct.id === productId)
      this.myCart.splice(findIdx, 1)
      this.products[findProductsId].ispressed = false
    },
    removeAllProduct() {
      this.myCart = []
      this.products.map((i) => (i.ispressed = false))
    }
  }
})
