/* 
 * date:    2017.04.18
 * version: v1.0.0.0
 * author:  blqw
 */
(function (window) {
    var version = "1.0.0.0";
    var template = '<ul style="padding-left: 0; margin-bottom: 0; list-style: none; border-bottom: 1px solid #ddd;" @mouseout="$data._hover=-1">\
            <li v-for="(tab,index) in tabs" style= "position: relative; display: block; display: inline-block; margin-bottom: -1px;" >\
            <a href="javascript:void(0)"\
        style="text-decoration: none; position: relative; display: block; color: #353535;padding: 8px 15px; margin-right: 2px; line-height: 1.5em; border-radius: 4px 4px 0 0;border: 1px solid transparent;"\
        :style="(tab===selectedTab ? \'color: grey; cursor: default; background-color: #fff; border: 1px solid transparent; border-color:#ddd #ddd transparent;\': $data._hover===index?\'color: #0d3d88; background-color: #f1f1f1; border-color: #eee #eee #ddd #eee;\':\'border-color:transparent;\')+(tabValue(tab,\'disabled\',false) ? \'color: #ddd;cursor: not-allowed;background-color: transparent;\' : \'\')"\
        @click="!tabValue(tab,\'disabled\',false)  && (selectedTab=tab)"\
        @mouseover="$data._hover=index" >{{tab.text}}</a>\
    </li>\
    </ul>';

    var vue = window.Vue;
    if (vue == null) {
        return;
    }
    var vTabs = vue.extend({
        data: function () {
            return {
                tabFields: {
                    id: "id",
                    el: "el",
                    text: "text",
                    disabled: "disabled"
                },
                class: [],
                tabs: [],
                selectedIndex: -1
            }
        },
        computed: {
            selectedTab: {
                get: function () { return this.tabs[this.selectedIndex]; },
                set: function (tab) {
                    var index = this.tabs.indexOf(tab);
                    if (index >= 0) {
                        this.selectedIndex = index;
                    }
                }
            },
            selectedId: {
                get: function () { this.tabValue(selectedTab, "id", null); },
                set: function (id) { this.selectedIndex = this.getById(id); }
            }
        },
        methods: {
            getById: function (id) {
                var get = this.tabValue;
                var tabs = this.tabs;
                if (key != null && id != null) {
                    for (var i = 0; i < tabs.length; i++) {
                        if (get(tabs[i], "id", !id) === id) {
                            return tabs[i];
                        }
                    }
                }
                return null;
            },
            formatter: function (tab) { return this.tabValue(tab, "text", ""); },
            tabValue: function (tab, field, defaultValue) {
                if (tab && field) {
                    var key = this.tabFields[field];
                    if (key) {
                        return tab[key] || defaultValue;
                    }
                }
                return defaultValue;
            },
            onChanged: function (oldSelectedIndex) { this.$emit("changed", { vm: this, oldSelectedIndex }); },
            onStateChanged: function () { },
            onTabAdded: function () { },
            onTabRemoved: function () { }
        },
        watch: {
            tabs: function (value) {
                if (value == null) {
                    this.tabs = [];
                    return;
                }
                if (value.constructor !== Array) {
                    this.tabs = [value];
                    return;
                }
                var id = this.tabFields.id,
                    el = this.tabFields.el,
                    text = this.tabFields.text,
                    disabled = this.tabFields.disabled;

                function set(obj, name, value) {
                    if (typeof name === "string")
                        Vue.set(obj, name, value);
                    return obj;
                }

                for (var i = 0; i < value.length; i++) {
                    var val = value[i];
                    if (typeof val !== "object") {
                        val = set({}, text, val);
                    }
                    if (!val.hasOwnProperty(id)) {
                        set(val, id, Math.random().toString());
                    }
                    if (!val.hasOwnProperty(disabled)) {
                        set(val, disabled, false);
                    }
                    if (val.hasOwnProperty(el) && typeof val[el] === "string") {
                        set(val, el, document.querySelector(val[el]));
                    }
                    value[i] = val;
                }
                if (value.length === 0) {
                    if (this.selectedIndex !== -1) {
                        this.selectedIndex = -1;
                    }
                } else if (this.selectedIndex < 0 || this.selectedIndex >= value.length) {
                    this.selectedIndex = 0;
                }
            },
            selectedIndex: function (value, oldValue) {

                function display(val, key, show) {
                    if (!key || !val) return;
                    var el = val[key];
                    if (!el) return;

                    if (window.jQuery) {
                        window.jQuery(el).toggle(show);
                    } else if (show) {
                        if (el.hasOwnProperty("__originalDisplay")) {
                            el.style.display = el.__originalDisplay;
                            delete el.__originalDisplay;
                        } else {
                            el.style.display = "initial";
                        }
                    } else {
                        if (el.__originalDisplay == null && el.style.display !== "none") {
                            el.__originalDisplay = el.style.display;
                        }
                        el.style.display = "none";
                    }

                }
                
                if (parseInt(value) !== value || value < 0 || value >= this.tabs.length) {
                    this.selectedIndex = oldValue;
                    return;
                }
                if (parseInt(oldValue) !== oldValue) {
                    return;
                }
                for (var i = 0; i < this.tabs.length; i++) {
                    display(this.tabs[i], this.tabFields.el, value === i);
                }
                if (oldValue < 0 || oldValue >= this.tabs.length) {
                    return;
                }
                if (value !== oldValue) {
                    this.onChanged(oldValue);
                }
            }
        },
        created: function () {
            this.tabs = [].concat(this.tabs);
        },
        template: template
    });

    vTabs.template1 = template;
    vTabs.version = version;
    window.vTabs = vTabs;
})(window);