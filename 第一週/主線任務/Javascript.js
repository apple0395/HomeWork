var tasks = [];

window.onload=function(){
    render();
}

//新增任務
function appendTask(){
    var task  = document.querySelector("#Task");
    tasks.push({ text:`${task.value}`, over:"N"});
    task.value="";
    console.log(tasks);
    render();
}

//刪除單筆任務
function removeItem(index){
    tasks.splice(index,1);
    render();
}

//清除所有任務
function removeAll(){
    tasks.length=0;
    render();
}

//checkbox選取事件
function checkItem(checked, index){
    if(checked){
        tasks[index].over="Y";
    }else{
        tasks[index].over="N";
    }
    render();
}

function render(){
    var info = document.querySelector("#info");
    var tasklist = document.querySelector("#tasklist");
    var html="";
    var count=0;    
    tasks.forEach(function(task, i){        
        var css = (task.over=='N'?'':'text-decoration:line-through;');
        var checked = (task.over=='N'?'':'checked="checked"');
        html+=`<li class="list-group-item" data-id="${i}">
            <label style="width:100%;${css}">
                <input type="checkbox" value="${i}" onclick="checkItem(this.checked, ${i});" ${checked} />    
                ${task.text}
                <button type="button" class="btn btn-outline-primary float-right" onclick="removeItem(${i});">✘</button>
            </label>            
        </li>`;
        count = (task.over=='N'?count+1:count);
    });
    tasklist.innerHTML = html;
    tasklist.dataset.count = count;
    info.innerHTML = `還有${tasklist.dataset.count}筆任務`;
}

