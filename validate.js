(function(window,factory,plug){
	factory(jQuery,plug);
})(typeof window!='undefined' ? window : this,function(jQuery,plug){
	//插件内部默认配置项
	var DEFALT = {
		initEvent:'input',
		plug:'dr'
	}
	//插件内部编写校验规则
	var _RULE = {
		'regexp':function(data){
			return new RegExp(data).test(this.val())
		},
		'required':function(){
			return this.val()
		},
		'confirm':function(){
			var passElement = $(':password')[0].value;
			if(passElement!=this.val() || passElement===''){
				return false;
			}
			else{
				return true;
			}
		}
	}
	$.fn[plug]=function(options){
		if(!this.is('form')){
			return;
		}
		this.$file = this.find('input');
		$.extend(this,DEFALT,options);
		this.$file.on(this.initEvent,function(){
			var _this = $(this);
			_this.siblings('p').remove();
			$.each(_RULE,function(key,fn){
				var $filename = _this.data(DEFALT.plug+'-'+key)
				var $filemessage = _this.data(DEFALT.plug+'-'+key+'-message')
				if($filename){
					var result = fn.call(_this,$filename)
					if(!result){
						_this.after('<p style="color:red">'+$filemessage+'</p>')
					}
					
				}
			})
		})

		//表单提交
		var $this = this;
		$this.on('submit',function(){
			$this.$file.trigger($this.initEvent)
			return false;
		})
	}
	 //  jquery.prototype.dataResult   //函数对象
       $.fn[plug].extendResult=function(options){
       	console.log(options)
            $.extend(_RULE,options);
               //console.log(_RULAS_)
            
       } 
},'dataValidate')