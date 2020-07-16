new Vue({
    el: '#app',
    data: {
      products: [],
      pagination: {},
      tempProduct: {
        imageUrl: [],
      },
      isNew: false,
      status: {
        fileUploading: false,
      },
      user: {
        token: '',
        uuid: 'c331e119-d507-4879-80f3-47cee7342adb',
      },
    },
    created() {
      // 取得 token 的 cookies
      this.user.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      // 若無法取得 token 則返回 Login 頁面
      if (this.user.token === '') {
        window.location = 'Login.html';
      }
      //透過api取產品資訊
      this.getProducts();
    },
    methods: {
      // 取得產品資料
      getProducts(page = 1) {
        const api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/products?page=${page}`;
        //預設帶入 token
        axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;
  
        axios.get(api).then((response) => {
          this.products = response.data.data;
          this.pagination = response.data.meta.pagination;
        });
      },
      // 開啟 Modal 視窗
      openModal(isNew, item) {
        switch (isNew) {
          case 'new':
            this.$refs.productModel.tempProduct = {
              imageUrl: [],
            };
            this.isNew = true;
            $('#productModal').modal('show');
            break;
          case 'edit':
            this.tempProduct = Object.assign({}, item);
            // 使用 refs 觸發子元件方法
            this.$refs.productModel.getProduct(this.tempProduct.id);
            this.isNew = false;
            break;
          case 'delete':
            this.tempProduct = Object.assign({}, item);
            $('#delProductModal').modal('show');
            break;
          default:
            break;
        }
      },

      logout(){        
        window.location = 'Login.html';       
      }
    },
  })