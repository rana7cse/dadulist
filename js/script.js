$(function() {
    var statusChecck = statusChecck || true;

    $('#tsk_about').val('');
    $('#tsk_date').datepicker();
    $('#tsk_status').bootstrapToggle({
        on: 'High',
        off: 'Low'
    }).change(function() {
        statusChecck = $(this).prop('checked');
    });

    //||/////_______////||
    //||////________/////||
    var todoListS = localStorage.getItem('todoList') || '[]';
        todoListS = JSON.parse(todoListS);

    $('#submit_add').click(function(){
        var inputData = {
            "date":$('#tsk_date').val(),
            "title":$('#tsk_name').val(),
            "info":$('#tsk_about').val(),
            "status":statusChecck,
            "id":todoListS.length+1,
            "is_close":false
        };
        if((inputData.date != '') && (inputData.title != '') && (inputData.info != '')){
            todoListS.push(inputData);
            storeString = JSON.stringify(todoListS);
            localStorage.setItem('todoList',storeString);
            alert('successfully Save Data');
            $('#task_form').find('input').val('');
        } else {
            alert('Please fill all fields');
        }
    });

    $('#open_task').click(function(){
        $('.open_tasks > ul').html('');
        if(todoListS != null){
            todoListS.forEach(function(e,b){
                if(e != null){
                    var status = !e.status ? 'low' : 'high';
                    if(e.is_close == false){
                        $('.open_tasks > ul').prepend(
                            "<li>" +
                                "<h4 class='task_title'>"+ e.title +"</h4>" +
                                "<p class='task_desc'>"+ e.info +"</p>" +
                                "<div class='task_footer'>" +
                                    "<span class='task_date pull-left'>"+ e.date +"</span>" +
                                    "<span class='task_status pull-left'>"+ status +"</span>" +
                                    "<div class='control pull-right'>" +
                                        "<i class='glyphicon glyphicon-ok is_close_btn' data-id='"+ e.id +"'></i>" +
                                        "<i class='glyphicon glyphicon-trash is_del_btn' data-id='"+ e.id +"'></i>" +
                                    "</div>" +
                                    "<div class='clearfix'></div>" +
                                "</div>" +
                            "</li>"
                        );
                    }
                }
            });
            $('.is_close_btn').each(function(){
               $(this).click(function(){
                   listClose($(this));
               })
            });

            $('.is_del_btn').each(function(){
                $(this).click(function(){
                    listDelete($(this));
                })
            });
        } else {
            alert('Hello Moga you didn\'t put');
        }
    });

    $('#closeX_task').click(function(){
        $('.close_tasksM > ul').html('');
        if(todoListS != null){
            todoListS.forEach(function(e,b){
                if(e != null){
                    var status = !e.status ? 'low' : 'high';
                    if(e.is_close == true){
                        $('.close_tasksM > ul').prepend(
                            "<li>" +
                            "<h4 class='task_title'>"+ e.title +"</h4>" +
                            "<p class='task_desc'>"+ e.info +"</p>" +
                            "<div class='task_footer'>" +
                            "<span class='task_date pull-left'>"+ e.date +"</span>" +
                            "<span class='task_status pull-left'>"+ status +"</span>" +
                            "<div class='control pull-right'>" +
                            "</div>" +
                            "<div class='clearfix'></div>" +
                            "</div>" +
                            "</li>"
                        );
                    }
                }
            });
        } else {
            alert('Hello Moga you didn\'t put');
        }
    });

    function listClose(ele){
        var idX = $(ele).attr('data-id');
        todoListS.forEach(function(e){
            if(e.id==idX){
                e.is_close = true;
                $(ele).parent().parent().parent().remove();
                localStorage.setItem('todoList',JSON.stringify(todoListS));
            }
        });
    }

    function listDelete(ele){
        var idX = $(ele).attr('data-id');
        todoListS.forEach(function(e,d){
            if(e.id==idX){
                if(typeof e == "object"){
                    delete todoListS[d];
                    console.log(todoListS);
                }
              localStorage.setItem('todoList',JSON.stringify(todoListS));
            }
        });
    }

    $('#AllClear').click(function(){
        localStorage.clear();
       alert('All memory is cleared');
    });
});