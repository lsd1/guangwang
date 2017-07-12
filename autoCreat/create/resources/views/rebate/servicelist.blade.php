@extends('layouts.index')

@section('title')
    Rebate管理
@endsection

@section('content')
    <div class="span10" id="content">
        <div class="row-fluid">
            <!-- block -->
            <div class="block">
                <div class="navbar navbar-inner block-header">
                    <div class="muted pull-left">Rebate管理 -> Service</div>
                </div>
                <div class="block-content collapse in">
                    <div class="span12">
                        @if (count($errors) > 0)
                            @foreach ($errors->all() as $errors)
                                <div class="alert alert-error">
                                    <button class="close" data-dismiss="alert">&times;</button>
                                    <strong>{{ $errors }}</strong>
                                </div>
                            @endforeach
                        @endif

                        @if(isset($myinfo))
                            <div class="alert alert-success">
                                <button class="close" data-dismiss="alert">&times;</button>
                                <strong>{{ $myinfo }}</strong>
                            </div>
                        @endif

                        <table cellpadding="0" cellspacing="0" border="0" class="table table-striped table-bordered"
                               id="mglist"></table>
                    </div>
                </div>
            </div>
            <!-- /block -->
        </div>
    </div>
@endsection

@section('script')
    <script src="{{asset('static/assets/div-modal-public.js')}}"></script>
    <script>
        $(document).ready(function () {
            var obj = $("#mglist");
            newsDatatable(obj);
            function newsDatatable(nodeObj) {
                var table = nodeObj.dataTable({
                    "sDom": "<'row'<'span3'l>r>t<'row'<'span6'i><'span6'p>>",
                    "bProcessing": true,//显示正在处理
                    "bServerSide": true,//延迟加载
                    "bPaginate": true,//显示（使用）分页器
                    //"bFilter": false,//是否启用客户端过滤功能
                    "bAutoWidth": true,//自动计算表格各列宽度
                    "bLengthChange": true,//显示一个每页长度的选择条（需要分页器支持）
                    "aaSorting": [[9, "desc"]],//指定按多列数据排序的依据
                    "sAjaxSource": "{{asset('/rebate/serviceListAjax')}}",//指定要从哪个URL获取数据
                    "aLengthMenu": [10, 50, 100],//更改显示记录数选项
                    "iDisplayLength": 10,//用于指定一屏显示的条数，需开启分页器
                    'sAjaxDataProp': 'data',
                    "sPaginationType": "bootstrap",//用于指定分页器风格
                    "fnServerData": function (sSource, aoData, fnCallback, oSettings) {
                        aoData.push({"name": "_token", "value": _token});
                        aoData.push({"name": "fSearch_id", "value": $('#fSearch_id').val()});
                        oSettings.jqXHR = $.ajax({
                            "dataType": 'json',
                            "type": "POST",
                            "url": sSource,
                            "data": aoData,
                            "success": function (json) {
                                if (json.sError) {
                                    oSettings.oApi._fnLog(oSettings, 0, json.sError);
                                }

                                if (json.total == 0) {
                                    json.iTotalRecords = 1;
                                    json.iTotalDisplayRecords = 1;
                                } else {
                                    json.iTotalRecords = json.total;
                                    json.iTotalDisplayRecords = json.total;
                                }

                                $(oSettings.oInstance).trigger('xhr', [oSettings, json]);
                                fnCallback(json);
                            }
                        });
                    },
                    "aoColumns": [{"sTitle": "服务id", "mDataProp": "id", "sWidth": "8%"},{"sTitle": "店铺id,0则没有店铺", "mDataProp": "sid", "sWidth": "8%"},{"sTitle": "发布者uid", "mDataProp": "uid", "sWidth": "8%"},{"sTitle": "标题", "mDataProp": "title", "sWidth": "8%"},{"sTitle": "联系手机", "mDataProp": "telephone", "sWidth": "8%"},{"sTitle": "联系人", "mDataProp": "name", "sWidth": "8%"},{"sTitle": "地址", "mDataProp": "address", "sWidth": "8%"},{"sTitle": "详情", "mDataProp": "details", "sWidth": "8%"},{"sTitle": "金额", "mDataProp": "amount", "sWidth": "8%"},{"sTitle": "商家金额", "mDataProp": "merchant", "sWidth": "8%"},{"sTitle": "返PV", "mDataProp": "backPV", "sWidth": "8%"},{"sTitle": "图片地址", "mDataProp": "url", "sWidth": "8%"},{"sTitle": "类型.1免费服务 2收费服务", "mDataProp": "type", "sWidth": "8%"},{"sTitle": "状态：0正常 1下架", "mDataProp": "curStatus", "sWidth": "8%"},{"sTitle": "信息", "mDataProp": "content", "sWidth": "8%"},{"sTitle": "创建时间", "mDataProp": "createTime", "sWidth": "8%"},{"sTitle": "更新时间", "mDataProp": "updateTime", "sWidth": "8%"},{"sTitle": "服务id", "mDataProp": "id", "sWidth": "8%"},{"sTitle": "店铺id,0则没有店铺", "mDataProp": "sid", "sWidth": "8%"},{"sTitle": "发布者uid", "mDataProp": "uid", "sWidth": "8%"},{"sTitle": "标题", "mDataProp": "title", "sWidth": "8%"},{"sTitle": "联系手机", "mDataProp": "telephone", "sWidth": "8%"},{"sTitle": "联系人", "mDataProp": "name", "sWidth": "8%"},{"sTitle": "地址", "mDataProp": "address", "sWidth": "8%"},{"sTitle": "详情", "mDataProp": "details", "sWidth": "8%"},{"sTitle": "金额", "mDataProp": "amount", "sWidth": "8%"},{"sTitle": "商家金额", "mDataProp": "merchant", "sWidth": "8%"},{"sTitle": "返PV", "mDataProp": "backPV", "sWidth": "8%"},{"sTitle": "图片地址", "mDataProp": "url", "sWidth": "8%"},{"sTitle": "类型.1免费服务 2收费服务", "mDataProp": "type", "sWidth": "8%"},{"sTitle": "状态：0正常 1下架", "mDataProp": "curStatus", "sWidth": "8%"},{"sTitle": "信息", "mDataProp": "content", "sWidth": "8%"},{"sTitle": "创建时间", "mDataProp": "createTime", "sWidth": "8%"},{"sTitle": "更新时间", "mDataProp": "updateTime", "sWidth": "8%"}],
                    "aoColumnDefs": [
//                        {
//                            "aTargets": [2],
//                            "mRender": function (data, type, full) {
//                                return data;
//                            },
//                            "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
//                                $(nTd).css('text-align', 'center')
//                            }
//                        }
                    ],

                    "oLanguage": {//语言设置
                        "sLengthMenu": "每页显示 _MENU_ 条记录",
                        "sZeroRecords": "没有检索到数据",
                        "sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",
                        "sInfoEmtpy": "没有数据",
                        "sProcessing": '<i class="fa fa-coffee"></i> 正在加载数据...',
                        "sSearch": "搜索",
                        "oPaginate": {
                            "sFirst": "首页",
                            "sPrevious": "前一页",
                            "sNext": "后一页",
                            "sLast": "尾页"
                        }
                    }
                });

                var html = "<div id='mglist_filter' class='row' style='text-align:right;'><div class='span9'><label>" +
                    "id：<input type='text' id='fSearch_id' aria-controls='mglist' style='display:inline-block;width:9%;'>　" +
                    "<button class=\"btn\">搜索</button>" +
                    "</label></div></div>";
                $(html).insertBefore($("#mglist_wrapper #mglist_processing")).find("button").bind("click", function () {
                    table.fnFilter();
                });
            }
        });
    </script>
@endsection