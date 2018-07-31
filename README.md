# vanilla-selectbox

Helper library for [GPT (Google Publisher Tags)](https://developers.google.com/doubleclick-gpt/reference) used to configure and load ads from [DFP (Doubleclick For Publishers)](https://support.google.com/dfp_premium).

It can be used to configure ad with a single command, but is also designed to be modular. Components and functions can be imported individually to help with various aspects of ad configuration and loading.

## Installation

```bash
npm install vanilla-selectbox
```

or

```bash
yarn add vanilla-selectbox
```

## Usage

```javascript
import vselect from 'vanilla-selectbox';
```

## Development

Clone the repository and install the packages.

To start the dev server in watch mode on port 3000 run

```bash
npm run watch
```

You can now access the dev server on http://localhost:3000 with live reloading and automatic updates.

The docs are available on http://localhost:3000/docs and are also automatically updated
# API

## Modules

<dl>
<dt><a href="#module_log">log</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#createVselectEl">createVselectEl(object, string, array)</a> ⇒</dt>
<dd></dd>
<dt><a href="#optionTpl">optionTpl(object)</a> ⇒ <code>string</code></dt>
<dd><p>Template for the individual option values</p>
</dd>
<dt><a href="#handleSelect">handleSelect(e)</a></dt>
<dd><p>Handle select
Should trigger on click, keyboard enter, and keyboard space</p>
</dd>
<dt><a href="#highlightOption">highlightOption(optionEl)</a></dt>
<dd><p>Highlights an option Element, and removes highlight from all siblings</p>
</dd>
<dt><a href="#selectOption">selectOption(optionEl)</a></dt>
<dd><p>Updates the selected value from the given option</p>
</dd>
<dt><a href="#handleBlur">handleBlur(e)</a></dt>
<dd><p>Closes open options on blur</p>
</dd>
<dt><a href="#closeOptions">closeOptions(el)</a></dt>
<dd><p>Sets data-open to &#39;false&#39; for the given element</p>
</dd>
<dt><a href="#toggleOpenState">toggleOpenState(el)</a></dt>
<dd><p>Toggles open state for given element</p>
</dd>
</dl>

<a name="module_log"></a>

## log

* [log](#module_log)
    * _static_
        * [.createLogger(prefix)](#module_log.createLogger) ⇒ <code>function</code>
    * _inner_
        * [~selectColor(prefix)](#module_log..selectColor) ⇒ <code>array</code>
        * [~hslStr(hslArray)](#module_log..hslStr) ⇒ <code>string</code>
        * [~backgroundColor(hslArray)](#module_log..backgroundColor) ⇒ <code>array</code>
        * [~useColors()](#module_log..useColors) ⇒ <code>boolean</code>

<a name="module_log.createLogger"></a>

### log.createLogger(prefix) ⇒ <code>function</code>
Basic logger that preserves line numbers in browsers, supports prefixes and has pretty colors in supported browsers

**Kind**: static method of [<code>log</code>](#module_log)  
**Returns**: <code>function</code> - Colorized log function that prefixes all statements  

| Param | Type | Description |
| --- | --- | --- |
| prefix | <code>string</code> | Prefix for log messages |

<a name="module_log..selectColor"></a>

### log~selectColor(prefix) ⇒ <code>array</code>
Select a color.

**Kind**: inner method of [<code>log</code>](#module_log)  
**Returns**: <code>array</code> - [H, S, L] color array  

| Param | Type | Description |
| --- | --- | --- |
| prefix | <code>string</code> | Prefix to create color for |

<a name="module_log..hslStr"></a>

### log~hslStr(hslArray) ⇒ <code>string</code>
Convert HSL array to hsl() string usable as a CSS color value

**Kind**: inner method of [<code>log</code>](#module_log)  
**Returns**: <code>string</code> - hsl() string  

| Param | Type | Description |
| --- | --- | --- |
| hslArray | <code>array</code> | [H, S, L] Color array |

<a name="module_log..backgroundColor"></a>

### log~backgroundColor(hslArray) ⇒ <code>array</code>
Create a light background color from a color made by selectColor()

**Kind**: inner method of [<code>log</code>](#module_log)  
**Returns**: <code>array</code> - [H, S, L] Color array  

| Param | Type | Description |
| --- | --- | --- |
| hslArray | <code>array</code> | HSL color to create beckground for |

<a name="module_log..useColors"></a>

### log~useColors() ⇒ <code>boolean</code>
Check if current browser supports console color styling

**Kind**: inner method of [<code>log</code>](#module_log)  
**Returns**: <code>boolean</code> - True if colors are supported  
<a name="createVselectEl"></a>

## createVselectEl(object, string, array) ⇒
**Kind**: global function  
**Returns**: HTML Element  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>params</code> | Parameters |
| string | <code>params.cssClass</code> | Namespace all CSS classnames with this value |
| array | <code>params.options</code> | Array of option values |

<a name="optionTpl"></a>

## optionTpl(object) ⇒ <code>string</code>
Template for the individual option values

**Kind**: global function  
**Returns**: <code>string</code> - HTML for the option  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>params</code> | export Function parameter object |
| object.cssClass | <code>string</code> | CSS class name to use for the option |
| object.selected | <code>boolean</code> | This is the selected option |
| object.value | <code>string</code> | Option value |
| object.text | <code>string</code> | Option Text |

<a name="handleSelect"></a>

## handleSelect(e)
Handle select
Should trigger on click, keyboard enter, and keyboard space

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>Event</code> | Event that triggered the function |

<a name="highlightOption"></a>

## highlightOption(optionEl)
Highlights an option Element, and removes highlight from all siblings

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| optionEl | <code>HTMLElement</code> | Option to highlight |

<a name="selectOption"></a>

## selectOption(optionEl)
Updates the selected value from the given option

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| optionEl | <code>HTMLElement</code> | Option element to select |

<a name="handleBlur"></a>

## handleBlur(e)
Closes open options on blur

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>Event</code> | Blur event |

<a name="closeOptions"></a>

## closeOptions(el)
Sets data-open to 'false' for the given element

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| el | <code>HTMLElement</code> | Element to close |

<a name="toggleOpenState"></a>

## toggleOpenState(el)
Toggles open state for given element

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| el | <code>HTMLElement</code> | Element to toggle |

