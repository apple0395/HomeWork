var obj={
    data:{
        UUID:'c331e119-d507-4879-80f3-47cee7342adb',
        products:[]
    },
    getData(){
        var vm=this;
        var url=`https://course-ec-api.hexschool.io/api/${vm.data.UUID}/admin/ec/products`;
        axios(
            {
                method:'get',
                url:url,
                headers:{
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Bearer gwx9bAecG4RgQQkOkBr8cKws6kCU6ibvbDmi8scZ8kA9uA540AamI9ITwfxz",
                }
            }
        )
        .then(function(res){
            vm.data.products = res.data.data;
            vm.render();
        })
        .catch(function(err){
            
        })
            
    },
    render(){
        const productinfo = document.querySelector("#Infos");           
        const products = this.data.products;
        var strHtml='';
        console.log(products);
        products.forEach((item,i)=>{
            strHtml+=`<div class='col mb-2'>
                        <div class='card'>
                            <img src='${item.imageUrl[0]}' class='card-img-top' alt='${item.title}'>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${item.title}</h5>
                            <p class="card-text">售價：$${item.price}&nbsp;&nbsp;&nbsp;&nbsp;原價：<span style='text-decoration:line-through'>$${item.origin_price}</span></p>
                        </div>
                      </div>`;
        });
        productinfo.innerHTML=strHtml;
    }
};

obj.getData();