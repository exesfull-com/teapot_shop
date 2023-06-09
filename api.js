function select_teapots(cat){
    $.ajax({
        url: 'https://other.exesfull.com/projects/teapot_shop/api.php',
        method: 'post',
        dataType: 'json',
        data: {api: 'select_teapots', cat: cat},
        success: function(data){
            var block = '';
            data.forEach((num) => {
                if(num["title"].length > 10){ 
                    num["title"] = num["title"].substring(0,20)+'...';
                }
                block = block+'<div class="col-xl-4 col-lg-4 col-md-6"> <div class="single-product mb-60"> <div class="product-img"> <img src="'+num['img']+'" alt=""> </div> <div class="product-caption"> <h4><a href="#">'+num["title"]+'</a></h4> <div class="price"> <ul> <li>'+num['price']+' руб.</li> </ul> </div> </div> </div> </div>';
            });
            document.getElementById("prods").innerHTML = block;
        }
    });
}

function admin_select_teapots(){
    document.getElementById('cont').innerHTML = '<div class="cart_inner"> <div class="table-responsive"><a onclick="admin_add_teapot();" class="btn header-btn">Добавить</a> <table class="table"> <thead> <tr> <th scope="col">Название</th> <th scope="col">Цена</th> <th scope="col">Дата добавления</th> </tr> </thead> <tbody id="prods"></tbody> </table> </div> </div>';
    $.ajax({
        url: 'https://other.exesfull.com/projects/teapot_shop/api.php',
        method: 'post',
        dataType: 'json',
        data: {api: 'admin_select_teapots'},
        success: function(data){
            var block = '';
            data.forEach((num) => {
                if(num["title"].length > 10){ 
                    num["title"] = num["title"].substring(0,20)+'...';
                }
                block = block+'<tr onclick="admin_edit_teapot('+num['id']+')"> <td> <div class="media"> <div class="d-flex"> <img src="'+num['img']+'" alt=""> </div> <div class="media-body"> <p>'+num['title']+'</p> </div> </div> </td> <td> <h5>'+num['price']+' Рублей </h5> </td> <td> <h5>'+num['date']+'</h5> </td> </tr>';
            });
            document.getElementById("prods").innerHTML = block;
        }
    });
}

function admin_edit_teapot(id){
    window.item_id = id;
    document.getElementById('cont').innerHTML = '<div class="row"> <div class="col-12"> <h2 class="contact-title">Редактирование товара</h2> </div> <div class="col-lg-8"> <div class="row"> <div class="col-12"> <div class="form-group"> <input class="form-control" id="p_title" type="text" placeholder="Название"> </div> </div> <div class="col-12"> <div class="form-group"> <textarea class="form-control w-100" id="p_desc" cols="30" rows="4" placeholder="Описание"></textarea> </div> </div> <div class="col-sm-6"> <div class="form-group"> <input class="form-control valid" id="p_price" type="text" placeholder="Цена"> </div> </div> <div class="col-sm-6"> <div class="form-group"> <input class="form-control valid" id="p_img" type="email" placeholder="URL изображения"> </div> </div> </div> <div class="form-group mt-3"> <button onclick="admin_api_data_save();" class="btn">Сохранить</button><button onclick="admin_api_delete();" style="margin-left:15px;" class="btn header-btn">Удалить</button></div> </div> <div class="col-lg-3 offset-lg-1"> <div class="media contact-info"> <span class="contact-info__icon"><i class="ti-home"></i></span> <div class="media-body"> <h2 onclick="admin_select_teapots();">Все товары</h2> </div> </div> </div> </div>';
    $.ajax({
        url: 'https://other.exesfull.com/projects/teapot_shop/api.php',
        method: 'post',
        dataType: 'json',
        data: {api: 'admin_get_teapot_data', item_id: window.item_id},
        success: function(data){
            document.getElementById("p_title").value = data['title'];
            document.getElementById("p_desc").value = data['desc'];
            document.getElementById("p_price").value = data['price'];
            document.getElementById("p_img").value = data['img'];
        }
    });
}

function admin_api_data_save(){
    $.ajax({
        url: 'https://other.exesfull.com/projects/teapot_shop/api.php',
        method: 'post',
        dataType: 'json',
        data: {
            api: 'admin_api_data_save',
            item_id: window.item_id,
            title: document.getElementById('p_title').value,
            desc: document.getElementById('p_desc').value,
            price: document.getElementById('p_price').value,
            img: document.getElementById('p_img').value,
        },
        success: function(){
            admin_edit_teapot(window.item_id);
        }
    });
}


function admin_add_teapot(){
    document.getElementById('cont').innerHTML = '<div class="row"> <div class="col-12"> <h2 class="contact-title">Добавление товара</h2> </div> <div class="col-lg-8"> <div class="row"> <div class="col-12"> <div class="form-group"> <input class="form-control" id="p_title" type="text" placeholder="Название"> </div> </div> <div class="col-12"> <div class="form-group"> <textarea class="form-control w-100" id="p_desc" cols="30" rows="4" placeholder="Описание"></textarea> </div> </div> <div class="col-sm-6"> <div class="form-group"> <input class="form-control valid" id="p_price" type="text" placeholder="Цена"> </div> </div> <div class="col-sm-6"> <div class="form-group"> <input class="form-control valid" id="p_img" type="email" placeholder="URL изображения"> </div> </div> </div> <div class="form-group mt-3"> <button onclick="admin_api_data_create();" class="btn header-btn">Добавить</button> </div> </div> <div class="col-lg-3 offset-lg-1"> <div class="media contact-info"> <span class="contact-info__icon"><i class="ti-home"></i></span> <div class="media-body"> <h2 onclick="admin_select_teapots();">Все товары</h2> </div> </div> </div> </div>';
}

function admin_api_data_create(){
    $.ajax({
        url: 'https://other.exesfull.com/projects/teapot_shop/api.php',
        method: 'post',
        dataType: 'json',
        data: {
            api: 'admin_api_data_create',
            title: document.getElementById('p_title').value,
            desc: document.getElementById('p_desc').value,
            price: document.getElementById('p_price').value,
            img: document.getElementById('p_img').value,
        }
    });
    admin_select_teapots();
}

function admin_api_delete(){
    $.ajax({
        url: 'https://other.exesfull.com/projects/teapot_shop/api.php',
        method: 'post',
        dataType: 'json',
        data: {
            api: 'admin_api_delete',
            item_id: window.item_id,
        }
    });
    admin_select_teapots();
}