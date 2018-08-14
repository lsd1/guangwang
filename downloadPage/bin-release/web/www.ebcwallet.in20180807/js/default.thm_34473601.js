
function __extends(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }
    __.prototype = b.prototype;
    d.prototype = new __();
};
window.generateEUI = {};
generateEUI.paths = {};
generateEUI.styles = undefined;
generateEUI.skins = {"index":"resource/my_skins/Index.exml"}
generateEUI.paths['resource/my_skins/Index.exml'] = window.index = (function (_super) {
	__extends(index, _super);
	function index() {
		_super.call(this);
		this.skinParts = ["bg_img","download_btn"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this._Rect1_i(),this._Group1_i()];
	}
	var _proto = index.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.bottom = 0;
		t.fillColor = 0xffffff;
		t.left = 0;
		t.right = 0;
		t.strokeColor = 0xffffff;
		t.top = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.elementsContent = [this.bg_img_i(),this.download_btn_i()];
		return t;
	};
	_proto.bg_img_i = function () {
		var t = new eui.Image();
		this.bg_img = t;
		t.height = 753;
		t.left = 0;
		t.right = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "download_bg_png";
		t.verticalCenter = -149.5;
		t.x = 0;
		t.y = 141;
		return t;
	};
	_proto.download_btn_i = function () {
		var t = new eui.Image();
		this.download_btn = t;
		t.height = 124;
		t.horizontalCenter = 0.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "download_btn_png";
		t.width = 567;
		t.x = 92.00000000000001;
		t.y = 973.63;
		return t;
	};
	return index;
})(eui.Skin);