@extends('layouts.index')

@section('title')
    大写模块名管理
@endsection

@section('content')
    <div class="span10" id="content">
        <div class="row-fluid">
            <!-- block -->
            <div class="block">
                <div class="navbar navbar-inner block-header">
                    <div class="muted pull-left">大写模块名管理 -> 大写表名</div>
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
                    "sAjaxSource": "{{asset('/小写模块名/小写表名ListAjax')}}",//指定要从哪个URL获取数据
                    "aLengthMenu": [10, 50, 100],//更改显示记录数选项
                    "iDisplayLength": 10,//用于指定一屏显示的条数，需开启分页器
                    'sAjaxDataProp': 'data',
                    "sPaginationType": "bootstrap",//用于指定分页器风格
                    "fnServerData": function (sSource, aoData, fnCallback, oSettings) {
                        aoData.push({"name": "_token", "value": _token});
                        aoData.push({"name": "fSearch_主键名", "value": $('#fSearch_主键名').val()});
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
                    "aoColumns": [
                        {"sTitle": "店铺ID", "mDataProp": "sid", "sWidth": "8%"},
                        {"sTitle": "标题", "mDataProp": "title", "sWidth": "8%"},
                        {"sTitle": "具体内容", "mDataProp": "details", "sWidth": "9%"},
                        {"sTitle": "活动费用", "mDataProp": "amount", "sWidth": "9%"},
                        {"sTitle": "商户金额", "mDataProp": "merchant", "sWidth": "8%"},
                        {"sTitle": "返还PV", "mDataProp": "backPV", "sWidth": "8%"},
                        {"sTitle": "状态", "mDataProp": "curStatus", "sWidth": "9%"},
                        {"sTitle": "创建时间", "mDataProp": "createTime", "sWidth": "11%"}
                    ],
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
                    "主键名：<input type='text' id='fSearch_主键名' aria-controls='mglist' style='display:inline-block;width:9%;'>　" +
                    "<button class=\"btn\">搜索</button>" +
                    "</label></div></div>";
                $(html).insertBefore($("#mglist_wrapper #mglist_processing")).find("button").bind("click", function () {
                    table.fnFilter();
                });
            }
        });
    </script>
@endsection