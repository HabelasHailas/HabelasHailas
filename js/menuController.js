// var options = function(){	
// 	var vue_instance = new Vue({
// 		el: "#options_id",
// 		created: function(){
// 		},
// 		watch: {
// 		},
// 		methods: { 
// 			start: function(){
//                 loadpage("../html/game.html");
// 			},
//             load: function(){
//                 loadpage("../index.html");
// 			},
//             options: function(){
//                 loadpage("../index.html");
// 			},
// 			save: function(){
// 				//save();
// 				loadpage("../index.html");
// 			},
// 			back: function(){
// 				loadpage("../index.html");
// 			}
// 		}
// 	});
// }();

function start(){
	localStorage.clear();
	saveBool = false;
	loadpage("../html/game.html");

}
function load(){
	loadpage("../html/game.html");
}
function options(){
	loadpage("../index.html");
}
function save(){
	saveBool = true;
}
function back(){
	loadpage("../index.html");
}

