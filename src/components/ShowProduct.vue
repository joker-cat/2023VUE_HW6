<script>
import 'bootstrap/dist/css/bootstrap.min.css'
export default {
  data() {
    return {
      productId: '',
      productInfo: {},
      count: 1
    }
  },
  methods: {
    // showModal() {
    //   this.ctlModal.show();
    // },
    // closeModal() {
    //   this.ctlModal.hide();
    // },
    // joinCart() {
    //   const apiOption = (this.productInCart.length !== 0) ? 'put' : 'post';
    //   const apiRoute = (apiOption === 'put') ? `/${this.productInCart[0]["product_id"]}` : '';
    //   const data = (apiOption === 'put') ?
    //     {//put
    //       "data": {
    //         "product_id": this.productInCart[0]["product_id"],
    //         "qty": this.count + this.productInCart[0]["qty"]
    //       }
    //     } :
    //     {//post
    //       "data": {
    //         "product_id": this.productInfo["id"],
    //         "qty": this.count
    //       }
    //     };
    //   this.$axios[apiOption]('/cart' + apiRoute, data)
    //     .then((res) => {
    //       this.$emit('emitToast', ((apiOption === 'put') ? '數量成功累加' : '成功加入購物車'));
    //       this.$emit('renderView');
    //       this.closeModal();
    //     })
    //     .catch(err => console.log(err))
    // },
  },
  computed: {
    // productInCart() { //是否已存在購物車
    //   return this.cart.filter((icart) => (icart.id === this.productInfo.id));
    // }
  },
  mounted() {
    this.productId = this.$route.params.id
    const a = 1
    this.$axios.get(`/product/${this.productId}`).then((res) => {
      this.productInfo = res.data.product
    })
    // this.ctlModal = new bootstrap.Modal(this.$refs.modal);
  }
}
</script>
<template>
  <div class="card w-50 m-auto">
    <div>
      <img :src="productInfo.imageUrl" class="card-img-top" alt="Image loading error" />
    </div>
    <div class="card-body">
      <h5 class="card-title fs-2 fw-bolder">{{ productInfo.title }}</h5>
      <p class="d-inline-block mb-2 text-danger fw-bolder">{{ productInfo.category }}</p>
      <p class="card-text fs-4">{{ productInfo.description }}</p>
      <div>
        <p>原價{{ productInfo.origin_price }}</p>
        <p>特價{{ productInfo.price }}</p>
      </div>
      <RouterLink class="d-block btn btn-success" to="/products">返回</RouterLink>
    </div>
  </div>
</template>

<style scoped></style>
