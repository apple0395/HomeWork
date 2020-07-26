Vue.component('Product',{
    template:`<div id="productModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 id="exampleModalLabel" class="modal-title">
            {{ tempProduct.title }}
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <img :src="tempProduct.image" class="img-fluid" alt>
          <blockquote class="blockquote mt-3">
            <p class="mb-0" v-html="tempProduct.content"></p>
            <footer class="blockquote-footer text-right">
              {{ tempProduct.description }}
            </footer>
          </blockquote>
          <div class="d-flex justify-content-between align-items-baseline">
            <div v-if="!tempProduct.price" class="h4">
              {{ tempProduct.origin_price }} 元
            </div>
            <del v-if="tempProduct.price" class="h6">原價 {{ tempProduct.origin_price }} 元</del>
            <div v-if="tempProduct.price" class="h4">
              現在只要 {{ tempProduct.price }} 元
            </div>
          </div>
          <select v-model="tempProduct.num" name class="form-control mt-3">
            <option value="0" disabled selected>
              請選擇數量
            </option>
            <option v-for="num in 10" :key="num" :value="num">
              選購 {{ num }} {{ tempProduct.unit }}
            </option>
          </select>
        </div>
        <div class="modal-footer">
          <div v-if="tempProduct.num" class="text-muted text-nowrap mr-3">
            小計
            <strong>{{ tempProduct.num * tempProduct.price }}</strong> 元
          </div>
          <button type="button" class="btn btn-primary" @click="addToCart(tempProduct, tempProduct.num)">
            <i v-if="tempProduct.id === status.loadingItem" class="fas fa-spinner fa-spin"></i>
            加到購物車
          </button>
        </div>
      </div>
    </div>
  </div>`,
  data(){
      return{
        tempProduct: {
            num: 0,
          },
      };
  },
  props:{
    apiinfo: {},
  },
  methods: {
    getDetailed(id) {
        this.status.loadingItem = id;
  
        const url = `${this.apiinfo.APIPATH}/api/${this.apiinfo.UUID}/ec/product/${id}`;
  
        axios.get(url).then((response) => {
          this.tempProduct  = response.data.data;
          // 由於 tempProduct 的 num 沒有預設數字
          // 因此 options 無法選擇預設欄位，故要增加這一行解決該問題
          // 另外如果直接使用物件新增屬性進去是會雙向綁定失效，因此需要使用 $set
          this.$set(this.tempProduct , 'num', 0);
          $('#productModal').modal('show');
        });
      },
  },
})