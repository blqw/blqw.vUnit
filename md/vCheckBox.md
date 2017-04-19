# vCheckBox 多选框控件
## [Demo](../demo/vCheckBox.html)  
## [源码](../js/vCheckBox.js)

## 功能简介
用于提供多选框的一般功能

## 属性

|属性名|类型|操作|默认值|说明|其他|
|:---:|:---:|:---|:---:|:---|:---|
|text          |string |get;set;|   ""  | 用于显示文字  | 作为子组件通过props传递时,属性为只读状态 |
|disabled      |boolean|get;set;| false | 是否禁用     | 作为子组件通过props传递时,属性为只读状态 |
|checked       |boolean|get;set;| false | 是否选中     | 作为子组件通过props传递时,属性为只读状态 |

## 静态属性
> vCheckBox.template1  

默认模版样式  
 
## 方法

### toggle
> toggle()  
```js
checkbox.toggle();
```

切换`checked`的选中状态  
以下2种情况下方法不产生任何效果:   
1. 当`disabled`为`true`时
1. 作为子组件,且props中存在`checked`时  



### vCheckBox.checkAll (静态方法)
> vCheckBox.checkAll (value, objects, field)  
```js
vCheckBox.checkAll(true, [{checked:true}, {checked:false}],"isChecked")
```

- **value:** boolean类型的值
- **objects:** 数组或对象
- **field:** string类型的值, 表示需要设置的属性的名称
将`objects`中所有对象的`field`属性设置为`value` 



### vCheckBox.isCheckAll (静态方法)
> vCheckBox.isCheckAll(objects, field)  
```js
vCheckBox.isCheckAll([{checked:true}, {checked:false}],"isChecked")
```

- **objects:** 数组或对象
- **field:** string类型的值, 表示需要设置的属性的名称
判断`objects`中的所有对象的`field`属性值是否都为true  
全部为true返回true,反之返回false  


## 事件
> 事件绑定 `vue实例.$on('事件名',function(回调参数){ ... })`  

|事件名|事件说明|回调参数|参数说明|
|:---:|:---:|:---|:---|
|changed      |`checked`属性发生变更时触发      |{vm, checked}|**vm:** Vue实例<br />**checked:** checked属性的状态, 只读情况下 `checked != vm.checked`  |
|checked      |`checked`属性变为`true`时触发   |{vm}|**vm:** Vue实例  |
|unchecked    |`checked`属性变为`false`时触发  |{vm}|**vm:** Vue实例  |
|statechanged |`disabled`属性发生变更时触发    |{vm}|**vm:** Vue实例  |
|disabled     |`disabled`属性变为`true`时触发  |{vm}|**vm:** Vue实例  |
|enabled      |`enabled`属性变为`false`时触发  |{vm}|**vm:** Vue实例  |

## 示例代码

### html
```html
<input type="checkbox" id="test1"/>
```

### javascript
```js
var test1 = new vCheckBox({
    el: "#test1",
    data: {
        text: "测试多选框"
    }
});
```

## 更新日志
### [v1.1.0.1] 2017.04.19
- 调整样式
  
### [v1.1.0] 2017.04.10
- 调试源码结构,方便后期维护和升级
- 将样式调整为内联形式,不需要额外声明css
- 将默认模版独立为静态属性`vCheckBox.template1`,方便后期拓展新的样式
- 增加**半选**功能支持

### [v1.0.0] 2017.04.07
- 初始版本