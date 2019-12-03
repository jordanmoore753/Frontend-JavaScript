# The Document Object Model

The DOM(Document Object Model) is an often-mentioned concept, but most people do not know the meaning of it.

Is it the HTML? No, but the HTML we write is parsed by the browser and turned into the DOM.

Is 'View Source' the DOM? No, that's just a page showing the HTML that makes up that specific page.

Is the code in DevTools the DOM? Yes sorta! This is when we're editing the elements in the browser inspector. This is the visual representation of the DOM.

Here's one common example: your HTML has mistakes in it. The browser automatically fixes some for you, like leaving out the `<tbody>` element in a `<table>` element. The DOM has the **corrected version** of the HTML, and you can find the `<tbody>` element there.

Another good example of the DOM is when a `<script>` executes some code that inserts content into an element. Here's an example:

```html
<script>
  let container = document.getElementById('container');
  container.innerHTML = 'New content'!;
</script>
```
Now, the DOM reflects the change:

```html
<div id='container'>New content!</div>
```
This is different from the original HTML and what would be seeen in **View Source**.

It appears that DOM is the interpretation of one's HTML on the browser, and that's why it's considered to be not HTML.

JavaScript is also no the DOM. JavaScript can watch for a certain event on an element, but the element is really a DOM node. When the event happens, the DOM, not JS, emits that event. JS is the syntax for things that go down in the browser, while the DOM is the culprit for everything that goes down.

## The DOM, According to MDN

The DOM is the data representation of the objects that comprise the structure and content of a document on the web. Additionally, it is a **programming interface** for HTML and XML documents. It represents the page so that programs can change the document structure, style, and content. 

The DOM represents the document as **nodes** and **objects**; this way, programming languages can connect to the page.

A web page is a document. This document can be displayed in the browser window or as the HTML source. In either case, it's the same document. The DOM represents that **same** document so it can be **manipulated**. The DOM is an **object-oriented** representation of a webpage which can be modified with a scripting language like JavaScript.

All of the properties, methods, and events available for manipulating and creating web pages are organized into objects. For example, the `document` object is an object which represents the document itself; the `table` object is used for accessing HTML tables.

The DOM is no programming language, but without it **no** programming language (even JS) would have any model or clue about webpages, HTML, or XML, or elements in HTML. Every element in a document is a part of the document object model for that document, and these elements are accessed and manipulated by using the DOM and programming languages. 

## The DOM as Tree of Nodes

The DOM is a hierarchical tree structure of nodes. **Node** is an interface through which various types of DOM API objects inherit. Some types of objects that are DOM API are:

1. Document (The webpage)
2. Element  (element in html)  
3. Text     (text inside an element)
4. Comment  (HTML comments)

The list goes on and on.

For the given code:

```html
<html>
  <h1></h1>
  <p><em></em></p>
</html>
```
The hierarchy of nodes may look like this:

```yaml
HTML
  - HEAD
  - BODY
    - h1
    - p
      - em
```
Really, more information is conveyed in this hierarchy:

```yaml
HTML
  - HEAD
  - BODY
    - #text (whitespace "\n")
    - h1
      - #text (actual text)
    - p
      - #text (actual text)
      - em
        - #text (actual text)
```
Since whitespace can be a node that is empty, empty nodes can appear anywhere in the DOM. This can lead to bugs.

There is **not** a direct 1-1 mapping of all tags in the HTML file and the nodes in the DOM. The DOM will insert nodes that don't appear in the HTML due to invalid markup or the omission of optional tags. This occurs with whitespace, `<li>` tags, and so on.

Text nodes can contain nothing but whitespace as we've seen above.

## What are nodes?

**Node** is an interface from which types of DOM API objects inherit. `Document` inherits from `Node`. Let's see an example.

In the browser, if we run the following command in the console:

```js
let firstParagraph = document.querySelector('p');
```
The first `<p>` tag in the HTML will be stored in `firstParagraph`. Since `Document` represents the entire HTML document, it contains all of the `Element` nodes. The first `Element` node that is a `p` element is then stored in `firstParagraph`.

One can determine an object's type by invoking `toString()` on it.

```js
let firstParagraph = document.querySelector('p');
firstParagraph.toString(); // "[object HTMLParagraphElement]"
document.toString();       // "[object HTMLDocument]"
let allHeadings = document.querySelectorAll('h1');
allHeadings.toString();    // "[object NodeList]"
```
### Node Properties

All DOM Nodes have certain properties in common. 

#### nodeName

`nodeName` property contains a String which represents the node type. For `Elements` this is the name of the corresponding tag in **uppercase**. 

```js
let p = document.querySelector('p');
p.nodeName; // "P"
```
For text nodes, even empty nodes, the `nodeName` is `#text`. For comments it is `#comment`.

#### nodeType

`nodeType` represents the node's type: which, is the node type constant. There is a table which has all of the values representing certain constants. These are common constants:

1. Node.ELEMENT_NODE  = 1 (HTML tag node)
2. Node.TEXT_NODE     = 3 (Text node)
3. Node.COMMENT_NODE  = 8 (Comment node)
4. Node.DOCUMENT_NODE = 9 (A Document node)

```js
document.querySelector('p').nodeType; // 1
document.nodeType;                    // 9  
```
Based on which type of constant that particular node is a member of, the value will be returned from the invocation of `nodeType`.

#### nodeValue

`nodevalue` represents the value of a node. Element nodes do **not** have values.

```js
let p = document.querySelector('p');
p.nodeValue; // null
```
However, text nodes do have value.

```js
let t = p.childNodes[0]; // first text node of `p`
t.nodeName;  // #text
t.nodeType;  // 3
t.nodeValue; // "In the previous assignment, we learned that the DOM is a hierarchy of nodes. But..." // from LS assignment page
t.toString();// "[object Text]"
```
The `child nodes` of an element represent its content.

#### textContent

`textContent` can be used to access the textual content of an `Element` node.

```js
p.textContent; // "In the previous assignment, we learned that the DOM is a hierarchy of nodes..."
```
This is the `nodeValues` for **all** child nodes concatenated into a single String. This will also capture the text content of all child `Element` nodes, not just the `Text` nodes.

Note: This also concatenates the empty nodes (of whitespace). This can be dealt with `trim` and any other string method.

## Determining a Node's Type

DOM objects come in different types: nodes, elements, text, and more. The Element type is broken down into dozens of subtypes.

Trying to figure out the **exact** object type can be exhausting. 

1. All DOM objects are Nodes.
2. All DOM objects have a type that inherits from Node, which means they all have properties and methods they inherit from Node.
3. The most common DOM object types you will use are Element and Text.

Some things to remember about the different types of Nodes:

1. `EventTarget` provides the event-handling behavior that supports interactive web apps.
2. `Node` provides common behavior to **all** nodes.
3. `Text` and `Element` are the chief subtypes of `Node`.
4. Most HTML tags map to specific element subtypes that inherit from `HTMLElement`. 
5. Other element types exist, such as `SVGElement` and its subtypes.

`toString` is a very useful method for figuring out the type of a node within the console.

```js
document.querySelector('p').toString(); // "[object HTMLParagraphElement]"
```
For inside of a program, use `instanceof` or `tagName` property to figure out the node type.

```js
let p = document.querySelector('p');
p instanceof HTMLParagraphElement; // true
```
If you don't need to know the type name, you can use `tagName` to (obviously) check its HTML Tag in uppercase.

```js
p.tagName; // "P", this is not a function
```
## Traversing Nodes

DOM nodes connect with other DOM nodes via a set of properties that point from one node to another with defined relationships. 

One example is the `childNodes` property which returns a collection of the nodes directly beneath a given node. Each element in the returned collection has a `parentNode` property which points back to the original node (the calling node).

Important properties to know for `parentNodes`:

1. `firstChild`: its value is: `childNodes[0]` or `null`
2. `lastChild`: its value is `childNodes[childNodes.length - 1]` or `null`
3. `childNodes`: the value is the collection of all child nodes from that calling node. The `childNodes` have their `parentNode` property equal to the calling node.

The `childNodes` returns a **live collection** which means it automatically updates to reflect changes in the DOM. 

For child nodes, these properties are worth memorizing:

1. `nextSibling`: its value is: `parentNode.childNodes[n + 1]` or `null`
2. `previousSibling`: its value is: `parentNode.childNodes[n - 1]` or `null`
3. `parentNode`: its value is the immediate parent of the calling node

**ALL** DOM nodes that represent elements have parent **and** child nodes. Even `p` has child nodes; some of them are `#text`, and some of them are `code` (inline).

## Walking the Tree

**Walking the tree** is the phrase given to the process of visiting every node that has a child, grandchild, etc. Next, we do something with each of the nodes in the list of nodes that we walked. Often, we use a **recursive function** to do this.

Remember, recursion means that the function invokes itself.

```js
function traverseChildren(childNodes) {
  if (childNodes.length > 0) {
    console.log(childNodes[0]);
    let arr = [];

    for (let i = 1; i < childNodes.length; i += 1) {
      arr.push(childNodes[i]);
    }

    return traverseChildren(arr);
  }

  return undefined;
}
```
The function above allows one to traverse all child nodes of a parent. The argument passed in must be the `NodeList` of all `childNodes`. On each recursive call, the `arr` returned gets 1 element smaller (from the front).

## Element Attributes

Elements have attributes, like class, id, etc. You can access these with `hasAttribute`, which returns a boolean; `getAttribute('attr')`, which returns the value of the passed attribute name; `setAttribute('nameOfAttribute', 'newValue')`, which sets a new value for the given attribute.

> Note: MDN prefers that people use properties to access and reassign values. One example of why that's so is that `value` in XUL works inconsistently with `setAttribute`, and the attribute only specifies the default value, doesn't re-assign. 

Properties can be used to access attributes, also. `id` and `title` are accessible by most elements.

```js
p.id;        // 'simple'
p.className; // 'complex'
p.title;     // ''
```
`name` and `value` are both properties that are not available for use by most Element types. They are invalid for the majority of Element types.

What if an Element has more than one class? This is fairly common. What do we do?

We can use `classList` to return a special array-like `DOMTokenList` object that has properties and methods. The methods are: add, remove, toggle (removes if present, adds if non-present), contains, and length (thank God).

We can also use `style` to return an object containing the key-value pairs for all possible CSS declarations. From there, we can alter any CSS property.

```js
p.style.color = 'red';        // changes to red
p.style.textAlign = 'center'; // centers the text
```
`style` is not used often. It's just a lot easier to use classes to alter the characteristics of elements.

## Practice Problems

1. Starting from `document` node, use the `lastChild` and `childNodes` properties to change the text color to red on the `On the River` heading and set its font size to 48px.

```js
let nodesOfDoc = document.lastChild; // gets the HTML
nodesOfDoc.childNodes[2].childNodes[1].style.color = 'red';
nodesOfDoc.childNodes[2].childNodes[1].style.fontSize = '48px';
```

2. Count the number of paragraphs and then log it to the screen.

```js
function walk(node, callback) {
  callback(node);

  for (let i = 0; i < node.childNodes.length; i += 1) {
    walk(node.childNodes[i], callback);
  }
}

function isParagraph(node) {
  if (node.nodeName === 'P') {
    paragraphCount += 1;
  }
}

let html = document.childNodes[1];
let body = html.lastChild;
let paragraphCount = 0;
walk(body, isParagraph);
console.log(paragraphCount); // 5
```

3. Retrieve the first word from each paragraph on the page and log the entire list.

```js
function walk(node, callback) {
  callback(node);

  for (let i = 0; i < node.childNodes.length; i += 1) {
    walk(node.childNodes[i], callback);
  }
}

function isParagraph(node) {
  if (node.nodeName === 'P') {
    paragraphs.push(node);
  }
}

let html = document.childNodes[1];
let body = html.lastChild;
let paragraphs = [];
walk(body, isParagraph);
paragraphs.forEach(function (element, index) {
  if (index > 0) {
    element.className = 'stanza';
  }
});
console.log(paragraphs);
```

5. Count the images on the page. Count the PNG images. Log both results.

```js
function walk(node, callback) {
  callback(node);

  for (let i = 0; i < node.childNodes.length; i += 1) {
    walk(node.childNodes[i], callback);
  }
}

function typeOfImage(node) {
  if (node.nodeName === 'IMG' && node.src.endsWith('png')) {
    pngCount += 1;
    nonPngCount += 1;
  } else if (node.nodeName === 'IMG') {
    nonPngCount += 1;
  }
}

let pngCount = 0;
let nonPngCount = 0;
let html = document.childNodes[1];
let body = html.lastChild;
walk(body, typeOfImage);
console.log(pngCount);
console.log(nonPngCount);
```

6. Change the link color to red for every link on the page.

```js
function walk(node, callback) {
  callback(node);

  for (let i = 0; i < node.childNodes.length; i += 1) {
    walk(node.childNodes[i], callback);
  }
}

function changeLinkRed(node) {
  if (node.nodeName === 'A') {
    node.style.color = 'red';
  }
}

let html = document.childNodes[1];
let body = html.lastChild;
walk(body, changeLinkRed);
```
## Finding DOM Nodes

Often, we want to find an element based on its `id`. There is a built-in method `getElementById` on `document`. It returns the element with the passed `id`.

The downside to this is that we can only find a single element with this method. We often want to find a **list** of elements that match some criteria.

### Problems Group 1

1. Write a function that returns the `p` elements in the DOM represented by this HTML.

```js
function findParagraphElements() {
  let matches = [];
  let nodes = document.body.childNodes;

  for (let i = 0; i < nodes.length; i += 1) {
    if (nodes[i] instanceof HTMLParagraphElement) {
      matches.push(nodes[i]);
    }
  }

  return matches;
}

console.log(findParagraphElements());
```

2. Write a function that adds the class `article-text` to every `p` tag in the HTML.

```js
function walk(node, callback) {
  callback(node);

  for (let i = 0; i < node.childNodes.length; i += 1) {
    walk(node.childNodes[i], callback);
  }
}

function addClassToNodes(matchNodeName, newClassName, node) {
  if (node.nodeName === matchNodeName) {
    node.classList.add(newClassName);
  }
}

let body = document.childNodes[1].lastChild;
let addClassToParagraphs = addClassToNodes.bind(null, 'P', 'article-text');
walk(body, addClassToParagraphs);
```

3. Rewrite the previous solution for maximum reusability and clarity.

```js
function walk(node, callback) {
  callback(node);

  for (let i = 0; i < node.childNodes.length; i += 1) {
    walk(node.childNodes[i], callback);
  }
}

function getElementsByTagName(tagName) {
  var matches = [];

  walk(document.body, function(node) {
    if (node.nodeName.toLowerCase() === tagName) {
      matches.push(node);
    }
  });

  return matches;
}

getElementsByTagName('p').forEach(function(paragraph) {
  paragraph.classList.add('article-text');
});
```
The `getElementsByTagName` is actually a built-in method for JavaScript. So is `getElementsByClassName`. Both of these return either an `HTMLCollection` or `NodeList` of all matching elements. 

`HTMLCollection` and `NodeList` both return Array-like objects. These must be converted into Arrays to use `forEach` and other popular methods for Arrays. One can convert them by calling:

```js
let paragraphs = document.getElementsByTagName('p');
let paragraphsArray = Array.prototype.slice.call(paragraphs);
```
`getElementsByClassName` and `getElementsByTagName` both return **live collections**, which means that they automatically will update to reflect changes in the DOM. Practically, this means that if you alter the existing collection in any way, the DOM will update and so will the collection.

```html
<ul id="list">
  <li class="list-item">Item 1</li>
  <li class="list-item">Item 1</li>
  <li class="list-item">Item 1</li>
</ul>
```

```js
let list = document.querySelector('#list');
let newItem = document.createElement('li');
newItem.classList.add('list-item');
newItem.innerText = 'Item 4';
list.appendChild(newItem);
document.getElementsByClassName('list-item').length; // 4
```
Now, the list looks like this:

```html
<ul id="list">
  <li class="list-item">Item 1</li>
  <li class="list-item">Item 1</li>
  <li class="list-item">Item 1</li>
  <li class="list-item">Item 4</li>
</ul>
```
Pretty cool!

## Question Redos

1. Return all `p` elements from the DOM.

```js
function findElementsByTagName(tagName) {
  let hits = [];

  let body = document.body;
  walk(body, function(node) {
    if (node.nodeName.toLowerCase() === tagName) {
      hits.push(node);
    }
  });

  return hits;
}

function walk(node, callback) {
  callback(node);

  for (let i = 0; i < node.childNodes.length; i += 1) {
    walk(node.childNodes[i], callback);
  }
}

let c = findElementsByTagName('p');
```

2. Add `article-text` class to all `p` tags.

```js
function findElementsByTagName(tagName) {
  let hits = [];

  let body = document.body;
  walk(body, function(node) {
    if (node.nodeName.toLowerCase() === tagName) {
      hits.push(node);
    }
  });

  return hits;
}

function walk(node, callback) {
  callback(node);

  for (let i = 0; i < node.childNodes.length; i += 1) {
    walk(node.childNodes[i], callback);
  }
}

function addClassToNodes(nodesArray, newClassName) {
  nodesArray.forEach(function(node) {
    node.classList.add(newClassName);
  });

  return 1;
}

let c = findElementsByTagName('p');
addClassToNodes(c, 'article-text');
```

3. Add a new `p` tag in the `div` with `id` of `page3`. It must have text and this text must be colored, underlined.

```js
let myDiv = document.getElementById('page3');
let newParagraph = document.createElement('p');
newParagraph.innerText = 'I cannot rhyme with Bill.';
newParagraph.classList.add('article-text');
newParagraph.style.color = 'blue';
newParagraph.style.textDecoration = 'underline';
myDiv.appendChild(newParagraph);
```

4. Using `walk`, add a new `p` tag to the `intro` class `div` inside of the `page3` `div`.

```js
function findElementsByTagName(tagName, callback) { // this is general
  let hits = [];

  let body = document.body;
  walkAndMatch(body, hits, callback);

  return hits;
}

function elementMatchId(node, matches) { // this is specific
  if (node.parentNode.id === 'page3' && node.className === 'intro') {
    matches.push(node);
  } else {
    return false;
  }
}

function walkAndMatch(node, matches, callback) { // this is general
  callback(node, matches);

  for (let i = 0; i < node.childNodes.length; i += 1) {
    walkAndMatch(node.childNodes[i], matches, callback);
  }
}

let c = findElementsByTagName('div', elementMatchId)[0];
let newParagraph = document.createElement('p');
newParagraph.innerText = 'Alas, I am not Bill.';
newParagraph.style.color = 'blue';
c.appendChild(newParagraph);
```
> To create an Array from `HTMLCollection` or `NodeList`, all you need to do is the following: `Array.prototype.slice.call(nodeList)`. That invokes `slice` with the context `nodeList`; since it is Array-like, `slice` figures out what to do. Or you can manually loop, but that takes up more lines of code.

A **live collection** is a collection that updates the DOM automatically and reflects changes immediately. That's why they're called **live**. `HTMLCollection` is live. A `NodeList` is live when returned from the `getElementsByName()` method invocation.

### Problem Groups 2

1. Refactor the `getElementsByTagName` question to use the real method. Then, only add the class to the elements inside of `intro` `div`.

```js
let c = document.getElementsByTagName('p');
let paragraphArray = Array.prototype.slice.call(c);
paragraphArray.forEach(function(node) {
  if (node.parentNode.nodeName === 'DIV' && node.parentNode.className === 'intro') {
    node.classList.add('article-text');
  }
});
```
### Using CSS Selectors

Using CSS Selectors to find the desired Element(s) is extremely useful. 

One can use `querySelector` or `querySelectorAll` to find the desired elements.

In the HTML for the previous problems, we can access the `intro` div in the `#page3` div with the following code:

```js
document.querySelector('div#page3 div.intro');
```
1. Refactor the previous problem to use `querySelectorAll`.

```js
let c = document.querySelectorAll('.intro p');
let paragraphs = Array.prototype.slice.call(c);
paragraphs.forEach((node) => node.classList.add('article-text'));
```
## Traversing Nodes

At this point, I'm sick of seeing `#text` nodes and others when I'm really only looking for Elements. There are built-in methods for only returning Element nodes.

One of them is `children`, which returns a live collection of all child elements.

Another is `firstElementChild`, which is equivalent to `children[0]`. Next is `lastElementChild`, which is `children[children.length - 1]`. Either of these can also be `null` if `children` is empty.

Last, `childElementCount` returns `children.length`. 

For traversing the list of `childElement`s, you can use `nextElementSibling` or `previousElementSibling`. These point at the next sibling and the previous sibling respectively.

### textContent

Since `children` purposefully leaves out non-Element nodes, how can we access the `Text` nodes when using `children` DOM properties?

We can use the `textContent` property to retrieve and assign the text value of a given Element.

```js
document.querySelector('a').textContent; // 'go back'
document.querySelector('a').textContent = 'Changed!';
document.querySelector('a').textContent; // 'Changed!';
```
However, this is an unsafe practice, since all child nodes of the element whose `textContent` property is re-assigned are replaced with a single text node which contains the new value.

To get around this, determine which text may need to be transformed on the page, and then wrap it in a `span` or `div` tag. Then, select the `span` tag and update its `textContent` property.

```js
document.querySelector('div span.time').textContent = '10:30 am';
```
## Practice Problems: Finding Nodes

1. Retrieve a word count for each `h2` heading.

```js
let headings = document.querySelectorAll('h2');
headings = Array.prototype.slice.call(headings);
let wordCounts = headings.map(function(element) {
  return element.innerText.split(' ').length;
});
wordCounts;
```

2. Use three different DOM retrieval strategies to retrieve a reference to the `div` element that contains the table of contents.

```js
document.querySelector('#toc');
document.querySelector('div.toc');
document.getElementById('toc');
```

3. Change every other link in table of contents to green color.

```js
let links = document.querySelectorAll('div.toc ul li a');
links = Array.prototype.slice.call(links);
links.forEach(function(node, index) { 
  if (index % 2 !== 0) {
    node.style.color = 'green'; 
  }
});
```

4. Retrieve the text of every thumbnail caption.

```js
let allCaptions = document.querySelectorAll('div.thumbcaption div.magnify');
allCaptions = Array.prototype.slice.call(allCaptions);
allCaptions.map((node) => node.nextSibling.textContent.trim());

```

5. Populate a list (object) of key-value pairs for scientific classification:

```js
let sci = document.querySelectorAll('table.infobox.biota tr');
sci = Array.prototype.slice.call(sci);
let idx;

for (let i = 0; i < sci.length; i += 1) {
  if (sci[i].innerText === 'Scientific classification') {
    idx = i;
    break;
  }
}

sci = sci.slice(idx + 1, 12);
let obj = {};

sci.forEach(function(element) {
  let childs = element.children;
  let left = childs[0].innerText;
  let right = childs[1].innerText;
  left = left.replace(':', '');
  obj[left] = right;
});

obj;
```
## Creating and Moving DOM Nodes

We can add, remove, and create nodes. `createElement` is a method that can be invoked on `document`. There are many other `create` methods available to `Document`. See here: [MDN Methods](https://developer.mozilla.org/en-US/docs/Web/API/Document)

```js
let newParagraph = document.createElement('p');
newParagraph.textContent = 'New paragraph, punk.';
newParagraph.style.color = 'green';
document.body.appendChild(newParagraph);
```
You can create nodes (as seen above) by creating new empty nodes, and you can also create nodes by cloning an existing node. If `deepClone` (the argument passed to `cloneNode`) is `true`, the calling node and **all** its children are copied. If `false`, only the calling node is cloned.

```js
let list = document.body.querySelector('ul');
let copiedAll = list.cloneNode(true);   // ul + children (li)
let copiedNode = list.cloneNode(false); // only ul
```
`createTextNode` creates a new text node. A text node is useful for appending more strings onto an existing element. For instance, we can append more text onto an existing `p` element by creating a new text node and appending that node as a child onto the `p` element.

```js
let paragraph = document.body.querySelector('p');
let yes = document.createTextNode('Yeah man!');
paragraph.appendChild(yes);
```
### Adding Nodes to the DOM

You can append, insert, and replace nodes with methods on a node's parent.

```js
let p = document.createElement('p');
let f = document.createElement('p');
let firstP = document.body.querySelector('p');
let secondP = document.body.children[1];

p.textContent = 'Inserted before!';
f.textContent = 'Replaced!';
document.body.insertBefore(p, firstP); 
document.body.replaceChild(f, secondP);
```
> No Node can be repeated in the DOM. Deep copies do not count, they can be duplicated because they are not the same. Here's an example:

```js
let firstParagraph = document.body.querySelector('p');
document.body.appendChild(firstParagraph);
// this removes the first paragraph and appends the first paragraph
```
Since the node cannot appear twice, it is removed from its original location before being appended. This is one useful way to remove and insert a node at a desired location in the code.

It's easy to remove a node. 

```js
let firstParagraph = document.body.querySelector('p');
firstParagraph.remove(); // done
```
You can also insert elements within an Element. There are four positions that a new element can be inserted at:

1. `beforebegin`, before the `targetElement`
2. `afterbegin`, just inside the `targetElement` before first child
3. `beforeend`, just inside `targetElement` after last child
4. `afterbegin`, after `targetElement`

`insertAdjacentText(position, text)` is useful for inserting more text into a textual element like `p` or inside of a `li` element.

`insertAdjacentElement(position, newElement)` is useful for inserting an element like an `li` inside of a `ul` element.

```js
firstP; // This is the first one.
firstP.insertAdjacentText('afterbegin', 'Start: ');
// Start: This is the first one.
let firstListItem = document.body.querySelector('li');
let newListItem = document.createElement('li');
newListItem.textContent = 'New item!';
firstListItem.insertAdjacentElement('beforebegin', newListItem);
// Now the first element is newListItem, not firstListItem.
firstListItem.insertAdjacentElement('beforeend', newListItem);
// note that this works and adds a new element AFTER the firstListItem, not adding more list items inside of the firstListItem
firstListItem.insertAdjacentElement('afterbegin', newListItem);
// this does NOT work, though. The firstListItem becomes the only list item with firstListItem as a child of it (no longer a part of ul)
```
In general, use `beforeend` and `afterbegin` for `text`. Use `beforebegin` and `afterend` for `Element`.

## Problems

1. Assign class `heading` to first `h1` in the document.

```js
let heading = document.getElementById('primary_heading');
heading.classList.add('heading');
```

2. Set the class of `ul` to `bulleted`.

```js
let ul = document.getElementById('list');
ul.classList.add('bulleted');
```

3. Set the `onclick` property of link with id `toggle` to a function which makes the `div` with id `hidden` either visible or hidden. When visible, assign the class `hidden`, when hidden assign class `visible`. Function takes one argument, `e`. The first line of function is `e.preventDefault`. 

```js
let link = document.getElementById('toggle');
link.onclick = function(e) {
  e.preventDefault;
  let d = document.getElementById('notice');
  if (d.className === 'hidden') {
    d.setAttribute('class', 'visible');
  } else {
    d.setAttribute('class', 'hidden');
  }
};
```

4. Add an `onclick` event to the `notice` element. The function should set the class of the element to `hidden`. 

```js
document.getElementById('notice').onclick = function(e) {
  e.preventDefault;
  this.setAttribute('class', 'hidden');
}
```

5. Change multiplcation to actual product.

```js
document.getElementById('multiplcation').textContent = String(13 * 10);
```

6. Set the ID of the `body` element to `styled`. 

```js
document.body.setAttribute('id', 'styled');
```

```js
let a = 0;

function walk(node, callback) {
  callback(node);
  a += 1;
  for (let i = 0; i < node.childNodes.length; i += 1) {
    walk(node.childNodes[i], callback);
  }

  return;
}

walk(document.body, function() {
  return 'yes';
});
```