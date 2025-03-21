# CS 260 Notes

[My startup](https://startup.picsaw.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## AWS Notes

- Public IP Address: 54.166.56.221
- Command to ssh: 
➜  ssh -i [key pair file] ubuntu@[ip address]

### Technology Stack
Startup stack- React (frontend), Caddy 2(backend), node JS(hosting code), mongoDB (database). Frontend application runs on the browser. Backend applications are running on the server. 

### How the Internet Works
Each device has its own IP address (numbers) that is public. Our devices are connected to an ISP (internet service provider). 

Communication layers

| Layer | Example | Purpose |
| --- | --- | --- |
| Application | HTTPS | Functionality like web browsing |
| Transport | TCP/UDP | Packet delivery |
| Internet | IP | Establishing connectioins, routing |
| Link | Fiber, hardware | Physical connections |

### Domain Name System
It maps human readable names to their IP addresses. Localhost is the DNS for your device. 



## HTML Notes

How to deploy files:
./deployFiles.sh -k <yourpemkey> -h <yourdomain> -s startup

HTML is the structural language of the web
- <!DOCTYPE html> tells the browser that it is a html file
- Open tag <>, close tag </>
- Attribute: ex. lang
- Attribute value: = "en"
- Element is everything within the tags

DOM- Document Object Model (tree structure of HTML)

Different elements:
- p: paragraph 
- img: image
- head: Header information
- title: title of the page
- body: The entire content body of the page
- header: Header content
- main: Main content of the page
- footer: footer of the main content
- section: a section of the main content
- div: a block division of content
- span: an inline span of content
- h[1-9]: Text heading from 1-9
- table: table
- ol, ul: ordered or unordered list
- a: anchor the text to a hyperlink

## CSS Notes

CSS is used to style websites. Order is important! It will apply whatever was declared last.

You can include CSS inline, using the style element or by referencing a stylesheet
Inline ex: style = "color:red; font-size: 50vh"
Ref ex: link rel="stylesheet" href="styles.css"

Use MDN to learn CSS.
Use dev tools in the browser to debug CSS.

### Types of Selectors
- element
- ID: has to start with #
- class: has to start with .
- element class: element.class
- list: body, section
- Descendant: body section
- child: section > p
- Pseudo: p:hover

### Declarations
- background-color
- border
- color
- display
- font
- margin
- padding

### Animations
Define the animation then call it using @keyframes 

### Responsive design
- meta name = "viewport" content="width=device-width, initial-scale=1"
```
aside {
    float: right; 
    padding: 3em;
    margin: 0.5em;
    borders: black solid thin
}
```
``` 
.container{
    display: flex;
}

.item{
    flex: 0 0 50px;
}
```
In flex, first value is grow, second shrink, third basis. Grow and shrink are in fractional units

## JavaScript
Our web browser has a built in JavaScript interpreter.

- `let variable = x` set variable
- `const variable = x` set variable that cannot change

### JavaScript built in functions
- `alert(msg)` will popup message
- `console.log(msg)` will print something out in the console

```
function join(a, b) {
    return a + ' ' + b
}
console.log(join('Hello', 'world'))
```

Array
```
const words = ['hello', world'];
words.forEach((word) => console.log(word));
```

Lambda functions
```
const f = (x) => {x++; return x};
```

### JavaScript Promises
Promise states
- pending- Currently running asynchronously
- fulfilled - completed successfully
- rejected - Failed to complete 


Example Promise function
```
function callback(resolve){
    resolve('done')
}

const p = new Promise(callback)

p.then((result) => console.log(result))
```
