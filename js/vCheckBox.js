/* 
 * date:    2017.04.18
 * version: v1.1.0.0
 * author:  blqw
 */
(function (window) {
    if (window == null || window.Vue == null) {
        return;
    }
    var version = "1.1.0.0";
    var template = '<div style="display: inline-block;*display: inline;*zoom: 1;width: 100%;line-height: 22px;" name="sex" value="boy" @click="toggle" @mouseover="$data._hover=1" @mouseout="$data._hover=0">\
            <ins :style="{backgroundPositionX:( (!disabled&&checked===false&&$data._hover)?-138:((disabled?-69:0)+(checked?-23:checked==null?-46:0)) ).toString() + \'px\'}" \
            style="background-position:0 0;display: inline-block;*display: inline;*zoom: 1;width: 22px;height: 22px;vertical-align: middle;background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAAAWCAYAAABHXJdFAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAALASURBVGhD7Zo/aBNRHMe/l///m6QxxFilRDqoregQKw7+GQSHLoKC1kkpUqggKKibi5M4Ozp0EHFQEQfRRVBCnRQb1DZgK6hUmz/X0DaXXC713suFpHGrd7nk7n2G4/dekt+F3334vRfyuNkPMxvQgOEDoxi6m1JG6pK5cUTT3H+WfigjdYnGBno2t1b1pgISWdQk/fF9zwtIiq4mjZxaC6jV92YCttAqIInVoDUfE7BJu4Bq19tCrwyGThimA271Xu2fN1IH3Oq92nOQcXu9/5dGPtYBGbrCBGToSlcKOHl4ADNXkti/3afMMDxePyLROGx2hzJjDLpOwEvJOK4f3YV+jx3HEiFl1twQ+Xz+PlgsFjidbmXWGHRcQLuVw8ShOBL9/xbywsEYbp0YpPHLuRzup7TZsHcfHJXMarMr4yZuj4/KRxCEEtZWizQ2Ch0X8PLoDtw8PohH48MYiTWX2DMjUdw+mZAfBfA6k8e1F/OQNjT5k6br8PrqHS4U3rZpiXW5vfAHgjQuCwKKfF6OjFWTjgv4aj6P5TURIbcd0+f2IbkzgLE9Edw5tZvK9+ZbAVefz0GUzCEfoSx3tlpNoktsKByB3eGEy+VBoK++BamUBazwOTkyXk06LmAmu47xh7P4WSzD57Diwdm9uDc2BCvH4e0Cj6mn5pKPUK2KKOSykKQqOM6CYCiCQDBMXyPy8QaVj6DLj5DFgiBLmMZCvgSXzULlS31fwdSzr6hINeVd5kKSZAnzy1RGTq4HoVIp1zufgbciughI+CV3wPOyhOmlVbxb5DH55AtKojnla1CTJPD5LERRrC+7hazsnrFXA90EJOTWRZye/oSLjz+bXr4GZC9YyP0GbwL5CLoKyGAwARm6ws4DKhjxNIwasNMwDEPDjuS3wTrgZto7oNpQAZVYVXpdQC3ohIBaoJ2AwF+hVI1MelBLSgAAAABJRU5ErkJggg==);background-repeat:no-repeat;vertical-align: middle;"></ins>\
        <span style="display: inline-block;*display: inline;*zoom: 1;vertical-align: middle;">{{text}}</span>\
        <slot></slot>\
</div>';
    var vue = window.Vue;

    var vCheckBox = vue.extend({
        data: function () {
            var props = this.$options.propsData;
            var data = {
                _hover: 0,
                _readonly: {
                    text: props && props.hasOwnProperty("text"),
                    disabled: props && props.hasOwnProperty("disabled"),
                    checked: props && props.hasOwnProperty("checked")
                }
            };
            if (!data._readonly.text) {
                data.text = "";
            }
            if (!data._readonly.disabled) {
                data.disabled = false;
            }
            if (!data._readonly.checked) {
                data.checked = false;
            }
            return data;
        },
        props: ["checked", "text", "disabled"],
        template: template,
        methods: {
            toggle: function () {
                if (this.disabled) {
                    return;
                }
                var value = this.checked == null ? false : !this.checked;
                if (this.$data._readonly.checked) {
                    this.onChanged(value);
                    return;
                }
                this.checked = value;
            },
            onChanged: function (value) {
                if (value === undefined) {
                    value = this.checked;
                }
                this.$emit("changed", { vm: this, checked: value });
                if (value) {
                    this.onChecked();
                } else {
                    this.onUnchecked();
                }
            },
            onChecked: function () {
                this.$emit("checked", { vm: this });
            },
            onUnchecked: function () {
                this.$emit("unchecked", { vm: this });
            },
            onStateChanged: function () {
                this.$emit("statechanged", { vm: this });
                if (this.disabled) {
                    this.onDisabled();
                } else {
                    this.onEnabled();
                }
            },
            onDisabled: function () {
                this.$emit("disabled", { vm: this });
            },
            onEnabled: function () {
                this.$emit("enabled", { vm: this });
            }
        },
        watch: {
            checked: function (a, b) {
                if (this.$data._readonly.checked) {
                    return;
                }
                if (a !== null && typeof a !== "boolean") {
                    this.checked = b;
                    return;
                }
                if (a !== b) {
                    this.onChanged();
                }
            },
            disabled: function (a, b) {
                if (this.$data._readonly.disabled) {
                    return;
                }
                if (typeof a !== "boolean") {
                    this.disabled = b;
                    return;
                }
                if (a !== b) {
                    this.onStateChanged();
                }
            }
        }
    });
    vCheckBox.checkAll = function (value, objects, field) {
        if (typeof value !== "boolean" || objects == null) {
            return;
        }
        if (typeof field !== "string") {
            field = "checked";
        }
        for (var key in objects) {
            if (objects.hasOwnProperty(key)) {
                var obj = objects[key];
                if (obj && obj.hasOwnProperty(field) && obj[field] !== value) {
                    obj[field] = value;
                }
            }
        }
    };
    vCheckBox.isCheckAll = function (objects, field) {
        if (objects == null) {
            return false;
        }
        if (typeof field !== "string") {
            field = "checked";
        }
        var value = null;
        for (var key in objects) {
            if (objects.hasOwnProperty(key)) {
                var obj = objects[key];
                if (obj && obj.hasOwnProperty(field)) {
                    if (value == null) {
                        value = obj[field];
                    } else if (value !== obj[field]) {
                        return null;
                    }
                }
            }
        }
        return value;
    };
    vCheckBox.template1 = template;
    vCheckBox.version = version;
    window.vCheckBox = vCheckBox;
})(window);