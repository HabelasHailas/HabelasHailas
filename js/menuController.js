var options = function(){	
	var vue_instance = new Vue({
		el: "#options_id",
		created: function(){
		},
		watch: {
		},
		methods: { 
			start: function(){
                loadpage("./html/game.html");
			},
            load: function(){
                loadpage("../index.html");
			},
            options: function(){
                loadpage("../index.html");
			},
			save: function(){
				//save();
				loadpage("../index.html");
			}
		}
	});
}();

