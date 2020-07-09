new Vue({
    el:'#app',
    data:{
        products:[
            {
                id:20200709180510,
                title:'巧克力蛋糕',
                category:'蛋糕',
                content:'',
                desctiption:'',
                imageUrl:'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1960&q=80',
                enabled:true,
                origin_price:1500,
                price:1200,
                unit:'顆'
            },
            {
                id:20200709180822,
                title:'草莓慕斯蛋糕',
                category:'蛋糕',
                content:'',
                desctiption:'',
                imageUrl:'https://images.unsplash.com/photo-1562022791-1ee0dc5f8b1a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=651&q=80',
                enabled:false,
                origin_price:1050,
                price:820,
                unit:'顆'
            },
            {
                id:20200709181025,
                title:'蘋果派',
                category:'點心',
                content:'',
                desctiption:'',
                imageUrl:'https://images.unsplash.com/photo-1584541305671-af4f46b4be2f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=874&q=80',
                enabled:false,
                origin_price:890,
                price:600,
                unit:'個'
            },
        ],
        tempProducts:{}
    },
    methods:{
        openModel(type, item){
            switch(type){
                case 'new':
                    this.tempProducts={};
                    $('#productModel').modal('show');
                    break;
                case 'edit':
                    this.tempProducts = Object.assign({}, item);
                    $('#productModel').modal('show');
                    break;
                case 'delete':
                    this.tempProducts = Object.assign({}, item);
                    $('#deleteModel').modal('show');
                    break;
            }
        },
        modifyProduct(){
            if(this.tempProducts.id){
                //修改
                const id= this.tempProducts.id;
                this.products.forEach((item,i)=>{
                    if(item.id===id){
                        this.products[i] = this.tempProducts;
                    }
                })
            }else{
                //刪除
                const id = new Date().getTime();
                this.tempProducts.id=id;
                this.products.push(this.tempProducts);
            }
            this.tempProducts={};
            $('#productModel').modal('hide');
        },
        deleteProduct(){
            if(this.tempProducts.id){
                const id=this.tempProducts.id;
                this.products.forEach((item,i)=>{
                    if(item.id === id){
                        this.products.splice(i,1);
                        this.tempProducts={};
                    }
                })
            }
            $('#deleteModel').modal('hide');
        }
    }
});
