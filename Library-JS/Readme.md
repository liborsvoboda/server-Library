# Handlebar.js Code Generator   
   
**handlebar.js**    
html code generator       
you can easy generate static html code    

Example:   

````   
let source = "<p>Hello, my name is {{name}}. I am from {{hometown}}. I have " +   
             "{{kids.length}} kids:</p>" +   
             "<ul>{{#kids}}<li>{{name}} is {{age}}</li>{{/kids}}</ul>";   
let template = Handlebars.compile(source);   

let data = { "name": "Alan", "hometown": "Somewhere, TX",   
             "kids": [{"name": "Jimmy", "age": "12"}, {"name": "Sally", "age": "4"}]};   
let result = template(data);   

````    
**Output**   

````   
<p>Hello, my name is Alan. I am from Somewhere, TX. I have 2 kids:</p>   
  <ul>   
   <li>Jimmy is 12</li>   
   <li>Sally is 4</li>   
 </ul>   
 
````   

OR

````      
<script id="entry-template" type="text/x-handlebars-template">    
  <div class="entry">    
    <h1>{{title}}</h1>   
    <div class="body">    
      {{body}}   
    </div>   
  </div>   
</script>   

var source = document.getElementById("entry-template").innerHTML;   
var template = Handlebars.compile(source);   

var context = { title: "My New Post", body: "This is my first post!" };    
var html = template(context);    

// result     
<div class="entry">     
  <h1>My New Post</h1>     
  <div class="body">    
    This is my first post!    
  </div>    
</div>    

````   



# Cookie Use for ApiToken    

save data to cookie, is accesible after rel  oad page  


**js.cookie.min.js**   

Example:    
````    
  Cookies.set('ApiToken', data.Token);   
  Cookies.remove('ApiToken');    
  
````    


# Async Function   

**async.js**   

Example: if you need async Function  
````      
async function FileReaderToImageData(n){   
	const t = new FileReader;   
	return await new Promise((t,i)=>{   
		const r=new FileReader;r.onloadend=()=>t(r.result);r.onerror=i;   
		console.log("files",JSON.parse(JSON.stringify(files)));  
		r.readAsDataURL(n[0]);   
	})  
}   
````      




