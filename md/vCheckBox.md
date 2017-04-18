# vCheckBox ��ѡ��ؼ�
## [Demo](../demo/vCheckBox.html)  
## [Դ��](../js/vCheckBox.js)

## ���ܼ��
�����ṩ��ѡ���һ�㹦��

## ����

|������|����|����|Ĭ��ֵ|˵��|����|
|:---:|:---:|:---|:---:|:---|:---|
|text          |string |get;set;|   ""  | ������ʾ����  | ��Ϊ�����ͨ��props����ʱ,����Ϊֻ��״̬ |
|disabled      |boolean|get;set;| false | �Ƿ����     | ��Ϊ�����ͨ��props����ʱ,����Ϊֻ��״̬ |
|checked       |boolean|get;set;| false | �Ƿ�ѡ��     | ��Ϊ�����ͨ��props����ʱ,����Ϊֻ��״̬ |

## ��̬����
> vCheckBox.template1  

Ĭ��ģ����ʽ  
 
## ����

### toggle
> toggle()  
```js
checkbox.toggle();
```

�л�`checked`��ѡ��״̬  
����2������·����������κ�Ч��:   
1. ��`disabled`Ϊ`true`ʱ
1. ��Ϊ�����,��props�д���`checked`ʱ  



### vCheckBox.checkAll (��̬����)
> vCheckBox.checkAll (value, objects, field)  
```js
vCheckBox.checkAll(true, [{checked:true}, {checked:false}],"isChecked")
```

- **value:** boolean���͵�ֵ
- **objects:** ��������
- **field:** string���͵�ֵ, ��ʾ��Ҫ���õ����Ե�����
��`objects`�����ж����`field`��������Ϊ`value` 



### vCheckBox.isCheckAll (��̬����)
> vCheckBox.isCheckAll(objects, field)  
```js
vCheckBox.isCheckAll([{checked:true}, {checked:false}],"isChecked")
```

- **objects:** ��������
- **field:** string���͵�ֵ, ��ʾ��Ҫ���õ����Ե�����
�ж�`objects`�е����ж����`field`����ֵ�Ƿ�Ϊtrue  
ȫ��Ϊtrue����true,��֮����false  


## �¼�
> �¼��� `vueʵ��.$on('�¼���',function(�ص�����){ ... })`  

|�¼���|�¼�˵��|�ص�����|����˵��|
|:---:|:---:|:---|:---|
|changed      |`checked`���Է������ʱ����      |{vm, checked}|**vm:** Vueʵ��<br />**checked:** checked���Ե�״̬, ֻ������� `checked != vm.checked`  |
|checked      |`checked`���Ա�Ϊ`true`ʱ����   |{vm}|**vm:** Vueʵ��  |
|unchecked    |`checked`���Ա�Ϊ`false`ʱ����  |{vm}|**vm:** Vueʵ��  |
|statechanged |`disabled`���Է������ʱ����    |{vm}|**vm:** Vueʵ��  |
|disabled     |`disabled`���Ա�Ϊ`true`ʱ����  |{vm}|**vm:** Vueʵ��  |
|enabled      |`enabled`���Ա�Ϊ`false`ʱ����  |{vm}|**vm:** Vueʵ��  |

## ʾ������

### html
```html
<input type="checkbox" id="test1"/>
```

### javascript
```js
var test1 = new vCheckBox({
    el: "#test1",
    data: {
        text: "���Զ�ѡ��"
    }
});
```

## ������־
### [v1.1.0] 2017.04.10
- ����Դ��ṹ,�������ά��������
- ����ʽ����Ϊ������ʽ,����Ҫ��������css
- ��Ĭ��ģ�����Ϊ��̬����`vCheckBox.template1`,���������չ�µ���ʽ
- ����**��ѡ**����֧��

### [v1.0.0] 2017.04.07
- ��ʼ�汾