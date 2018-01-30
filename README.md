# lib-adloader

Helper library for [GPT (Google Publisher Tags)](https://developers.google.com/doubleclick-gpt/reference) used to configure and load ads from [DFP (Doubleclick For Publishers)](https://support.google.com/dfp_premium).

It can be used to configure ad with a single command, but is also designed to be modular. Components and functions can be imported individually to help with various aspects of ad configuration and loading.

## Table of Contents

## Installation

```bash
npm install @startsiden/lib-adloader
```

or

```bash
yarn add @startsiden/lib-adloader
```

## Usage

```javascript
import init from 'adloader';

const config = {
  adUnit: '/36021320/abcnyheter.no',
  lazyload: true,
  lazyloadOffset: 100,
  targeting: {
    page: 'front',
    test: true
  },
  ads: [
    {
      id: 'ad_banner_top',
      sizes: [
        [1000, 300],
        [980, 300],
        [980, 200],
        [980, 150],
        [980, 120],
        [970, 250],
        [970, 90],
        [2, 3]
      ],
      targeting: {
        position: 'banner_top'
      }
    }
  ]
};

init(config);
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
<dt><a href="#module_ads">ads</a></dt>
<dd></dd>
<dt><a href="#module_events">events</a></dt>
<dd></dd>
<dt><a href="#module_gpt">gpt</a></dt>
<dd></dd>
<dt><a href="#module_adloader">adloader</a></dt>
<dd></dd>
<dt><a href="#module_log">log</a></dt>
<dd></dd>
<dt><a href="#module_options">options</a></dt>
<dd></dd>
<dt><a href="#module_ready">ready</a></dt>
<dd></dd>
<dt><a href="#module_script">script</a></dt>
<dd></dd>
<dt><a href="#module_validators">validators</a></dt>
<dd></dd>
</dl>

## Classes

<dl>
<dt><a href="#Ad">Ad</a></dt>
<dd></dd>
</dl>

<a name="module_ads"></a>

## ads

* [ads](#module_ads)
    * [.getAdById(id)](#module_ads.getAdById) ⇒ [<code>Ad</code>](#Ad)
    * [.createAds(ads)](#module_ads.createAds)

<a name="module_ads.getAdById"></a>

### ads.getAdById(id) ⇒ [<code>Ad</code>](#Ad)
Find an ad by its ID

**Kind**: static method of [<code>ads</code>](#module_ads)  

| Param | Type |
| --- | --- |
| id | <code>string</code> | 

<a name="module_ads.createAds"></a>

### ads.createAds(ads)
Configure many ads at once

**Kind**: static method of [<code>ads</code>](#module_ads)  

| Param | Type | Description |
| --- | --- | --- |
| ads | <code>array</code> | Array of ads to configure |

<a name="module_events"></a>

## events

* [events](#module_events)
    * [.subscribe(eventName, callback)](#module_events.subscribe) ⇒ <code>function</code>
    * [.dispatch(eventName, data)](#module_events.dispatch)

<a name="module_events.subscribe"></a>

### events.subscribe(eventName, callback) ⇒ <code>function</code>
Subscribe to event

**Kind**: static method of [<code>events</code>](#module_events)  
**Returns**: <code>function</code> - Function to remove the event subscriber  

| Param | Type |
| --- | --- |
| eventName | <code>string</code> | 
| callback | <code>any</code> | 

<a name="module_events.dispatch"></a>

### events.dispatch(eventName, data)
Dispatch event

**Kind**: static method of [<code>events</code>](#module_events)  

| Param | Type |
| --- | --- |
| eventName | <code>string</code> | 
| data | <code>object</code> | 

<a name="module_gpt"></a>

## gpt

* [gpt](#module_gpt)
    * [.display(id)](#module_gpt.display)
    * [.refresh(slots)](#module_gpt.refresh)
    * [.configure(loadGptScript)](#module_gpt.configure)
    * [.loadGptScript()](#module_gpt.loadGptScript)
    * [.defineSlot(ad)](#module_gpt.defineSlot) ⇒ <code>promise</code>
    * [.enable()](#module_gpt.enable) ⇒ <code>promise</code>
    * [.addEventListeners()](#module_gpt.addEventListeners) ⇒ <code>promise</code>
    * [.setTargeting(targeting)](#module_gpt.setTargeting) ⇒ <code>promise</code>

<a name="module_gpt.display"></a>

### gpt.display(id)
Display ad by ID

**Kind**: static method of [<code>gpt</code>](#module_gpt)  

| Param | Type |
| --- | --- |
| id | <code>any</code> | 

<a name="module_gpt.refresh"></a>

### gpt.refresh(slots)
Refresh slot

**Kind**: static method of [<code>gpt</code>](#module_gpt)  

| Param | Type |
| --- | --- |
| slots | <code>any</code> | 

<a name="module_gpt.configure"></a>

### gpt.configure(loadGptScript)
Initial GPT configuration

**Kind**: static method of [<code>gpt</code>](#module_gpt)  

| Param | Type | Description |
| --- | --- | --- |
| loadGptScript | <code>boolean</code> | If true it will load the gpt.js script asynchronously |

<a name="module_gpt.loadGptScript"></a>

### gpt.loadGptScript()
Load GPT script tag

**Kind**: static method of [<code>gpt</code>](#module_gpt)  
<a name="module_gpt.defineSlot"></a>

### gpt.defineSlot(ad) ⇒ <code>promise</code>
Define slot

**Kind**: static method of [<code>gpt</code>](#module_gpt)  
**Returns**: <code>promise</code> - Promise that resolves when the gpt command is executed  

| Param | Type |
| --- | --- |
| ad | <code>any</code> | 

<a name="module_gpt.enable"></a>

### gpt.enable() ⇒ <code>promise</code>
enabled

**Kind**: static method of [<code>gpt</code>](#module_gpt)  
**Returns**: <code>promise</code> - Promise that resolves when the gpt command is executed  
<a name="module_gpt.addEventListeners"></a>

### gpt.addEventListeners() ⇒ <code>promise</code>
Connects the adloader event listeners to the standard gpt event listeners

**Kind**: static method of [<code>gpt</code>](#module_gpt)  
**Returns**: <code>promise</code> - Promise that resolves when the gpt command is executed  
<a name="module_gpt.setTargeting"></a>

### gpt.setTargeting(targeting) ⇒ <code>promise</code>
Set adloader targeting

**Kind**: static method of [<code>gpt</code>](#module_gpt)  
**Returns**: <code>promise</code> - Promise that resolves when the gpt command is executed  

| Param | Type |
| --- | --- |
| targeting | <code>any</code> | 

<a name="module_adloader"></a>

## adloader
<a name="module_adloader.init"></a>

### adloader.init(config, ads)
Initialize adloader

**Kind**: static method of [<code>adloader</code>](#module_adloader)  

| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | Configuration object |
| config.global | <code>string</code> | Expose adloader as a global on window |
| config.loadGptScript | <code>boolean</code> | Load the gpt library. Disable if you want to load gpt on your own |
| config.labelHeight | <code>number</code> | Font size of ad labels |
| ads | <code>array</code> | Array of ads to register |

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
<a name="module_options"></a>

## options
<a name="module_options.validateOptions"></a>

### options.validateOptions(config) ⇒ <code>array</code>
Validate adloader options object

**Kind**: static method of [<code>options</code>](#module_options)  
**Returns**: <code>array</code> - Returns false, or array of errors if validation failed  

| Param | Type | Description |
| --- | --- | --- |
| config | <code>any</code> | Config object to validate |

<a name="module_ready"></a>

## ready

* [ready](#module_ready)
    * [.addReadyConditions(...args)](#module_ready.addReadyConditions)
    * [.getReadyCondition(name)](#module_ready.getReadyCondition) ⇒ <code>boolean</code> \| <code>undefined</code>
    * [.removeReadyCondition(name)](#module_ready.removeReadyCondition)
    * [.isReady()](#module_ready.isReady) ⇒ <code>boolean</code>
    * [.setReadyCondition(name, value)](#module_ready.setReadyCondition) ⇒ <code>boolean</code>

<a name="module_ready.addReadyConditions"></a>

### ready.addReadyConditions(...args)
Add one or more ready conditions

**Kind**: static method of [<code>ready</code>](#module_ready)  

| Param | Type | Description |
| --- | --- | --- |
| ...args | <code>string</code> | Name of conditions to remove |

<a name="module_ready.getReadyCondition"></a>

### ready.getReadyCondition(name) ⇒ <code>boolean</code> \| <code>undefined</code>
Get value of ready condition by name

**Kind**: static method of [<code>ready</code>](#module_ready)  
**Returns**: <code>boolean</code> \| <code>undefined</code> - True or false if condition exists, undefined if not  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 

<a name="module_ready.removeReadyCondition"></a>

### ready.removeReadyCondition(name)
Remove ready condition and update readystate

**Kind**: static method of [<code>ready</code>](#module_ready)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of condition to remove |

<a name="module_ready.isReady"></a>

### ready.isReady() ⇒ <code>boolean</code>
Check if all ready conditions are true and update the ready state.
Dispatches ready event whenever the ready state changes from false to true

**Kind**: static method of [<code>ready</code>](#module_ready)  
**Returns**: <code>boolean</code> - True if ready  
<a name="module_ready.setReadyCondition"></a>

### ready.setReadyCondition(name, value) ⇒ <code>boolean</code>
Set named ready condition to true or false
Return ready state

**Kind**: static method of [<code>ready</code>](#module_ready)  
**Returns**: <code>boolean</code> - Ready state  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>any</code> | Name of condition to set |
| value | <code>boolean</code> | True or false |

<a name="module_script"></a>

## script
<a name="module_script.loadScriptAsync"></a>

### script.loadScriptAsync(src) ⇒ <code>promise</code>
Promisified script loader

**Kind**: static method of [<code>script</code>](#module_script)  
**Returns**: <code>promise</code> - Promise that resolves when the script has loaded  

| Param | Type | Description |
| --- | --- | --- |
| src | <code>string</code> | URL of the script to load |

**Example**  
```js
// Load Audience Reports and log to the console when done
loadScriptAsync('//sak.userreport.com/startsiden/launcher.js')
.then(() => {
  console.log('Audience Reports script loaded');
})
.catch((error) => {
  console.error(error.message);
});
```
<a name="module_validators"></a>

## validators

* [validators](#module_validators)
    * [.isString(value)](#module_validators.isString) ⇒ <code>boolean</code>
    * [.isNotEmptyString(value)](#module_validators.isNotEmptyString) ⇒ <code>boolean</code>
    * [.isArray(value)](#module_validators.isArray) ⇒ <code>boolean</code>
    * [.isObject(value)](#module_validators.isObject) ⇒ <code>boolean</code>
    * [.hasLength([min])](#module_validators.hasLength) ⇒ <code>boolean</code>
    * [.getLength(value)](#module_validators.getLength) ⇒ <code>boolean</code>
    * [.isNumeric(value)](#module_validators.isNumeric) ⇒ <code>boolean</code>
    * [.isNotNumeric(value)](#module_validators.isNotNumeric) ⇒ <code>boolean</code>
    * [.isBetween(value, min, max)](#module_validators.isBetween) ⇒ <code>boolean</code>
    * [.isPositive(value)](#module_validators.isPositive) ⇒ <code>boolean</code>
    * [.isNegative(value)](#module_validators.isNegative) ⇒ <code>boolean</code>
    * [.isArrayOfNumbers(value)](#module_validators.isArrayOfNumbers) ⇒ <code>boolean</code>
    * [.isNotEmptyArray(value)](#module_validators.isNotEmptyArray) ⇒ <code>boolean</code>
    * [.isValidTargetingOptions(value)](#module_validators.isValidTargetingOptions) ⇒ <code>boolean</code>

<a name="module_validators.isString"></a>

### validators.isString(value) ⇒ <code>boolean</code>
Tests if value is a string.

Empty strings are allowed.

**Kind**: static method of [<code>validators</code>](#module_validators)  
**Returns**: <code>boolean</code> - True if valid  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> | Value to test |

<a name="module_validators.isNotEmptyString"></a>

### validators.isNotEmptyString(value) ⇒ <code>boolean</code>
Value is a string and at least on character long

**Kind**: static method of [<code>validators</code>](#module_validators)  
**Returns**: <code>boolean</code> - True if valid  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> | Value to test |

<a name="module_validators.isArray"></a>

### validators.isArray(value) ⇒ <code>boolean</code>
Test if value is an array

**Kind**: static method of [<code>validators</code>](#module_validators)  
**Returns**: <code>boolean</code> - True if valid  

| Param | Type |
| --- | --- |
| value | <code>any</code> | 

<a name="module_validators.isObject"></a>

### validators.isObject(value) ⇒ <code>boolean</code>
Test of value is an object

**Kind**: static method of [<code>validators</code>](#module_validators)  
**Returns**: <code>boolean</code> - True if valid  

| Param | Type |
| --- | --- |
| value | <code>any</code> | 

<a name="module_validators.hasLength"></a>

### validators.hasLength([min]) ⇒ <code>boolean</code>
Check that value has a minimum length

**Kind**: static method of [<code>validators</code>](#module_validators)  
**Returns**: <code>boolean</code> - True if valid  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [min] | <code>number</code> | <code>1</code> | Minimum length |

<a name="module_validators.getLength"></a>

### validators.getLength(value) ⇒ <code>boolean</code>
Get length of value
Amount of characters for strings
Amount of numbers for numbers (converts number to string to check length)
Amount of keys for objects
Amount of items for arrays

**Kind**: static method of [<code>validators</code>](#module_validators)  
**Returns**: <code>boolean</code> - True if valid  

| Param | Type |
| --- | --- |
| value | <code>any</code> | 

<a name="module_validators.isNumeric"></a>

### validators.isNumeric(value) ⇒ <code>boolean</code>
Test if value is a number

**Kind**: static method of [<code>validators</code>](#module_validators)  
**Returns**: <code>boolean</code> - True if valid  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> | Value to test |

<a name="module_validators.isNotNumeric"></a>

### validators.isNotNumeric(value) ⇒ <code>boolean</code>
Test if value is not a number

**Kind**: static method of [<code>validators</code>](#module_validators)  
**Returns**: <code>boolean</code> - True if valid  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> | Value to test |

<a name="module_validators.isBetween"></a>

### validators.isBetween(value, min, max) ⇒ <code>boolean</code>
Test if value is a number between min and max

**Kind**: static method of [<code>validators</code>](#module_validators)  
**Returns**: <code>boolean</code> - True if valid  

| Param | Type |
| --- | --- |
| value | <code>any</code> | 
| min | <code>number</code> | 
| max | <code>number</code> | 

<a name="module_validators.isPositive"></a>

### validators.isPositive(value) ⇒ <code>boolean</code>
Test if value is a number greater than 0

**Kind**: static method of [<code>validators</code>](#module_validators)  
**Returns**: <code>boolean</code> - True if valid  

| Param | Type |
| --- | --- |
| value | <code>any</code> | 

<a name="module_validators.isNegative"></a>

### validators.isNegative(value) ⇒ <code>boolean</code>
Test if value is a number less than zero

**Kind**: static method of [<code>validators</code>](#module_validators)  
**Returns**: <code>boolean</code> - True if valid  

| Param | Type |
| --- | --- |
| value | <code>any</code> | 

<a name="module_validators.isArrayOfNumbers"></a>

### validators.isArrayOfNumbers(value) ⇒ <code>boolean</code>
Test if value is an array of numbers

**Kind**: static method of [<code>validators</code>](#module_validators)  
**Returns**: <code>boolean</code> - True if valid  

| Param | Type |
| --- | --- |
| value | <code>any</code> | 

<a name="module_validators.isNotEmptyArray"></a>

### validators.isNotEmptyArray(value) ⇒ <code>boolean</code>
Test if value is an array with at least one value

**Kind**: static method of [<code>validators</code>](#module_validators)  
**Returns**: <code>boolean</code> - True if valid  

| Param | Type |
| --- | --- |
| value | <code>any</code> | 

<a name="module_validators.isValidTargetingOptions"></a>

### validators.isValidTargetingOptions(value) ⇒ <code>boolean</code>
Check if value is a valid targeting array for setTargeting

**Kind**: static method of [<code>validators</code>](#module_validators)  
**Returns**: <code>boolean</code> - True if valid  

| Param | Type |
| --- | --- |
| value | <code>any</code> | 

<a name="Ad"></a>

## Ad
**Kind**: global class  

* [Ad](#Ad)
    * [new Ad(options)](#new_Ad_new)
    * [.display()](#Ad+display)
    * [.waitForElementReady()](#Ad+waitForElementReady)
    * [.setReadyCondition(name, value)](#Ad+setReadyCondition)
    * [.registerPlugins(plugins)](#Ad+registerPlugins)
    * [.registerPlugin(plugin)](#Ad+registerPlugin)

<a name="new_Ad_new"></a>

### new Ad(options)
Ads are created as instances of this class


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Configuration options for the Ad |
| options.id | <code>string</code> | ID of the DOM element that will contain the ad |
| options.plugins | <code>array</code> | Array of plugins to use for the ad |
| options.size | <code>array</code> | Size to use for the ad |
| options.targeting | <code>targeting</code> | Targeting for the ad |

<a name="Ad+display"></a>

### ad.display()
Try to display the ad

The ad will display if it hasn't already been displayed and all ready conditions are true

**Kind**: instance method of [<code>Ad</code>](#Ad)  
<a name="Ad+waitForElementReady"></a>

### ad.waitForElementReady()
Waits for the DOM element to exist, then sets the ready condition elementReady to true

**Kind**: instance method of [<code>Ad</code>](#Ad)  
<a name="Ad+setReadyCondition"></a>

### ad.setReadyCondition(name, value)
Update a ready condition and trigger ready if all conditions are true after update

**Kind**: instance method of [<code>Ad</code>](#Ad)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of condition to update |
| value | <code>boolean</code> | The condition is either true or false |

<a name="Ad+registerPlugins"></a>

### ad.registerPlugins(plugins)
Register an array of plugins

**Kind**: instance method of [<code>Ad</code>](#Ad)  

| Param | Type | Description |
| --- | --- | --- |
| plugins | <code>array</code> | Array of plugins to register |

<a name="Ad+registerPlugin"></a>

### ad.registerPlugin(plugin)
Register a plugin

**Kind**: instance method of [<code>Ad</code>](#Ad)  

| Param | Type | Description |
| --- | --- | --- |
| plugin | <code>plugin</code> | Plugin to register |

