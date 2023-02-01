# request

- fetch
- axios

method get post file

request({
url,
method = "get",
data = {},
headers = { "Content-Type": "application/json" }
})

const formData = new FormData();

```
var data = {
    name:"jay",
    age:18,
    sex:'boy'
}
Object.entries(data).reduce((acc,item)=>acc.concat(item.join('=')),[]).join('&')
```
