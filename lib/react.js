import { _ as networkOf, a as serializeNetwork, b as Network, c as SwitchDevice, d as iptablesListing, f as iptablesSave, g as ipToString, h as cidrToString, i as restoreNetwork, l as IpDevice, m as natRuleText, n as LABS, o as createDevice, p as listRuleset, r as runChecks, s as ApDevice, t as EXAMPLES, u as filterRuleText, v as parseCidr, y as parseIp } from "./examples-CS1y_5T4.js";
import ReactExports, { Fragment, createContext, forwardRef, memo, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import "react-dom";
// \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod, mod.exports), cb = null), mod.exports);
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule || !__hasOwnProp.call(mod, "default") ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, { get: (a, b) => (typeof require !== "undefined" ? require : a)[b] }) : x)(function(x) {
	if (typeof require !== "undefined") return require.apply(this, arguments);
	throw Error("Calling `require` for \"" + x + "\" in an environment that doesn't expose the `require` function. See https://rolldown.rs/in-depth/bundling-cjs#require-external-modules for more details.");
});
// node_modules/classcat/index.js
function cc(names) {
	if (typeof names === "string" || typeof names === "number") return "" + names;
	let out = "";
	if (Array.isArray(names)) {
		for (let i = 0, tmp; i < names.length; i++) if ((tmp = cc(names[i])) !== "") out += (out && " ") + tmp;
	} else for (let k in names) if (names[k]) out += (out && " ") + k;
	return out;
}
// node_modules/d3-dispatch/dist/d3-dispatch.mjs
var noop = { value: () => {} };
function dispatch() {
	for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
		if (!(t = arguments[i] + "") || t in _ || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
		_[t] = [];
	}
	return new Dispatch(_);
}
function Dispatch(_) {
	this._ = _;
}
function parseTypenames$1(typenames, types) {
	return typenames.trim().split(/^|\s+/).map(function(t) {
		var name = "", i = t.indexOf(".");
		if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
		if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
		return {
			type: t,
			name
		};
	});
}
Dispatch.prototype = dispatch.prototype = {
	constructor: Dispatch,
	on: function(typename, callback) {
		var _ = this._, T = parseTypenames$1(typename + "", _), t, i = -1, n = T.length;
		if (arguments.length < 2) {
			while (++i < n) if ((t = (typename = T[i]).type) && (t = get$1(_[t], typename.name))) return t;
			return;
		}
		if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
		while (++i < n) if (t = (typename = T[i]).type) _[t] = set$1(_[t], typename.name, callback);
		else if (callback == null) for (t in _) _[t] = set$1(_[t], typename.name, null);
		return this;
	},
	copy: function() {
		var copy = {}, _ = this._;
		for (var t in _) copy[t] = _[t].slice();
		return new Dispatch(copy);
	},
	call: function(type, that) {
		if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
		if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
		for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
	},
	apply: function(type, that, args) {
		if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
		for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
	}
};
function get$1(type, name) {
	for (var i = 0, n = type.length, c; i < n; ++i) if ((c = type[i]).name === name) return c.value;
}
function set$1(type, name, callback) {
	for (var i = 0, n = type.length; i < n; ++i) if (type[i].name === name) {
		type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
		break;
	}
	if (callback != null) type.push({
		name,
		value: callback
	});
	return type;
}
// node_modules/d3-selection/dist/d3-selection.mjs
var xhtml = "http://www.w3.org/1999/xhtml";
var namespaces = {
	svg: "http://www.w3.org/2000/svg",
	xhtml,
	xlink: "http://www.w3.org/1999/xlink",
	xml: "http://www.w3.org/XML/1998/namespace",
	xmlns: "http://www.w3.org/2000/xmlns/"
};
function namespace(name) {
	var prefix = name += "", i = prefix.indexOf(":");
	if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
	return namespaces.hasOwnProperty(prefix) ? {
		space: namespaces[prefix],
		local: name
	} : name;
}
function creatorInherit(name) {
	return function() {
		var document = this.ownerDocument, uri = this.namespaceURI;
		return uri === xhtml && document.documentElement.namespaceURI === xhtml ? document.createElement(name) : document.createElementNS(uri, name);
	};
}
function creatorFixed(fullname) {
	return function() {
		return this.ownerDocument.createElementNS(fullname.space, fullname.local);
	};
}
function creator(name) {
	var fullname = namespace(name);
	return (fullname.local ? creatorFixed : creatorInherit)(fullname);
}
function none() {}
function selector(selector) {
	return selector == null ? none : function() {
		return this.querySelector(selector);
	};
}
function selection_select(select) {
	if (typeof select !== "function") select = selector(select);
	for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
		if ("__data__" in node) subnode.__data__ = node.__data__;
		subgroup[i] = subnode;
	}
	return new Selection$1(subgroups, this._parents);
}
function array(x) {
	return x == null ? [] : Array.isArray(x) ? x : Array.from(x);
}
function empty() {
	return [];
}
function selectorAll(selector) {
	return selector == null ? empty : function() {
		return this.querySelectorAll(selector);
	};
}
function arrayAll(select) {
	return function() {
		return array(select.apply(this, arguments));
	};
}
function selection_selectAll(select) {
	if (typeof select === "function") select = arrayAll(select);
	else select = selectorAll(select);
	for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) if (node = group[i]) {
		subgroups.push(select.call(node, node.__data__, i, group));
		parents.push(node);
	}
	return new Selection$1(subgroups, parents);
}
function matcher(selector) {
	return function() {
		return this.matches(selector);
	};
}
function childMatcher(selector) {
	return function(node) {
		return node.matches(selector);
	};
}
var find = Array.prototype.find;
function childFind(match) {
	return function() {
		return find.call(this.children, match);
	};
}
function childFirst() {
	return this.firstElementChild;
}
function selection_selectChild(match) {
	return this.select(match == null ? childFirst : childFind(typeof match === "function" ? match : childMatcher(match)));
}
var filter = Array.prototype.filter;
function children() {
	return Array.from(this.children);
}
function childrenFilter(match) {
	return function() {
		return filter.call(this.children, match);
	};
}
function selection_selectChildren(match) {
	return this.selectAll(match == null ? children : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
}
function selection_filter(match) {
	if (typeof match !== "function") match = matcher(match);
	for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) if ((node = group[i]) && match.call(node, node.__data__, i, group)) subgroup.push(node);
	return new Selection$1(subgroups, this._parents);
}
function sparse(update) {
	return new Array(update.length);
}
function selection_enter() {
	return new Selection$1(this._enter || this._groups.map(sparse), this._parents);
}
function EnterNode(parent, datum) {
	this.ownerDocument = parent.ownerDocument;
	this.namespaceURI = parent.namespaceURI;
	this._next = null;
	this._parent = parent;
	this.__data__ = datum;
}
EnterNode.prototype = {
	constructor: EnterNode,
	appendChild: function(child) {
		return this._parent.insertBefore(child, this._next);
	},
	insertBefore: function(child, next) {
		return this._parent.insertBefore(child, next);
	},
	querySelector: function(selector) {
		return this._parent.querySelector(selector);
	},
	querySelectorAll: function(selector) {
		return this._parent.querySelectorAll(selector);
	}
};
function constant$3(x) {
	return function() {
		return x;
	};
}
function bindIndex(parent, group, enter, update, exit, data) {
	var i = 0, node, groupLength = group.length, dataLength = data.length;
	for (; i < dataLength; ++i) if (node = group[i]) {
		node.__data__ = data[i];
		update[i] = node;
	} else enter[i] = new EnterNode(parent, data[i]);
	for (; i < groupLength; ++i) if (node = group[i]) exit[i] = node;
}
function bindKey(parent, group, enter, update, exit, data, key) {
	var i, node, nodeByKeyValue = /* @__PURE__ */ new Map(), groupLength = group.length, dataLength = data.length, keyValues = new Array(groupLength), keyValue;
	for (i = 0; i < groupLength; ++i) if (node = group[i]) {
		keyValues[i] = keyValue = key.call(node, node.__data__, i, group) + "";
		if (nodeByKeyValue.has(keyValue)) exit[i] = node;
		else nodeByKeyValue.set(keyValue, node);
	}
	for (i = 0; i < dataLength; ++i) {
		keyValue = key.call(parent, data[i], i, data) + "";
		if (node = nodeByKeyValue.get(keyValue)) {
			update[i] = node;
			node.__data__ = data[i];
			nodeByKeyValue.delete(keyValue);
		} else enter[i] = new EnterNode(parent, data[i]);
	}
	for (i = 0; i < groupLength; ++i) if ((node = group[i]) && nodeByKeyValue.get(keyValues[i]) === node) exit[i] = node;
}
function datum(node) {
	return node.__data__;
}
function selection_data(value, key) {
	if (!arguments.length) return Array.from(this, datum);
	var bind = key ? bindKey : bindIndex, parents = this._parents, groups = this._groups;
	if (typeof value !== "function") value = constant$3(value);
	for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
		var parent = parents[j], group = groups[j], groupLength = group.length, data = arraylike(value.call(parent, parent && parent.__data__, j, parents)), dataLength = data.length, enterGroup = enter[j] = new Array(dataLength), updateGroup = update[j] = new Array(dataLength);
		bind(parent, group, enterGroup, updateGroup, exit[j] = new Array(groupLength), data, key);
		for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) if (previous = enterGroup[i0]) {
			if (i0 >= i1) i1 = i0 + 1;
			while (!(next = updateGroup[i1]) && ++i1 < dataLength);
			previous._next = next || null;
		}
	}
	update = new Selection$1(update, parents);
	update._enter = enter;
	update._exit = exit;
	return update;
}
function arraylike(data) {
	return typeof data === "object" && "length" in data ? data : Array.from(data);
}
function selection_exit() {
	return new Selection$1(this._exit || this._groups.map(sparse), this._parents);
}
function selection_join(onenter, onupdate, onexit) {
	var enter = this.enter(), update = this, exit = this.exit();
	if (typeof onenter === "function") {
		enter = onenter(enter);
		if (enter) enter = enter.selection();
	} else enter = enter.append(onenter + "");
	if (onupdate != null) {
		update = onupdate(update);
		if (update) update = update.selection();
	}
	if (onexit == null) exit.remove();
	else onexit(exit);
	return enter && update ? enter.merge(update).order() : update;
}
function selection_merge(context) {
	var selection = context.selection ? context.selection() : context;
	for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) if (node = group0[i] || group1[i]) merge[i] = node;
	for (; j < m0; ++j) merges[j] = groups0[j];
	return new Selection$1(merges, this._parents);
}
function selection_order() {
	for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) if (node = group[i]) {
		if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
		next = node;
	}
	return this;
}
function selection_sort(compare) {
	if (!compare) compare = ascending;
	function compareNode(a, b) {
		return a && b ? compare(a.__data__, b.__data__) : !a - !b;
	}
	for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
		for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) if (node = group[i]) sortgroup[i] = node;
		sortgroup.sort(compareNode);
	}
	return new Selection$1(sortgroups, this._parents).order();
}
function ascending(a, b) {
	return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}
function selection_call() {
	var callback = arguments[0];
	arguments[0] = this;
	callback.apply(null, arguments);
	return this;
}
function selection_nodes() {
	return Array.from(this);
}
function selection_node() {
	for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
		var node = group[i];
		if (node) return node;
	}
	return null;
}
function selection_size() {
	let size = 0;
	for (const node of this) ++size;
	return size;
}
function selection_empty() {
	return !this.node();
}
function selection_each(callback) {
	for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) if (node = group[i]) callback.call(node, node.__data__, i, group);
	return this;
}
function attrRemove$1(name) {
	return function() {
		this.removeAttribute(name);
	};
}
function attrRemoveNS$1(fullname) {
	return function() {
		this.removeAttributeNS(fullname.space, fullname.local);
	};
}
function attrConstant$1(name, value) {
	return function() {
		this.setAttribute(name, value);
	};
}
function attrConstantNS$1(fullname, value) {
	return function() {
		this.setAttributeNS(fullname.space, fullname.local, value);
	};
}
function attrFunction$1(name, value) {
	return function() {
		var v = value.apply(this, arguments);
		if (v == null) this.removeAttribute(name);
		else this.setAttribute(name, v);
	};
}
function attrFunctionNS$1(fullname, value) {
	return function() {
		var v = value.apply(this, arguments);
		if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
		else this.setAttributeNS(fullname.space, fullname.local, v);
	};
}
function selection_attr(name, value) {
	var fullname = namespace(name);
	if (arguments.length < 2) {
		var node = this.node();
		return fullname.local ? node.getAttributeNS(fullname.space, fullname.local) : node.getAttribute(fullname);
	}
	return this.each((value == null ? fullname.local ? attrRemoveNS$1 : attrRemove$1 : typeof value === "function" ? fullname.local ? attrFunctionNS$1 : attrFunction$1 : fullname.local ? attrConstantNS$1 : attrConstant$1)(fullname, value));
}
function defaultView(node) {
	return node.ownerDocument && node.ownerDocument.defaultView || node.document && node || node.defaultView;
}
function styleRemove$1(name) {
	return function() {
		this.style.removeProperty(name);
	};
}
function styleConstant$1(name, value, priority) {
	return function() {
		this.style.setProperty(name, value, priority);
	};
}
function styleFunction$1(name, value, priority) {
	return function() {
		var v = value.apply(this, arguments);
		if (v == null) this.style.removeProperty(name);
		else this.style.setProperty(name, v, priority);
	};
}
function selection_style(name, value, priority) {
	return arguments.length > 1 ? this.each((value == null ? styleRemove$1 : typeof value === "function" ? styleFunction$1 : styleConstant$1)(name, value, priority == null ? "" : priority)) : styleValue(this.node(), name);
}
function styleValue(node, name) {
	return node.style.getPropertyValue(name) || defaultView(node).getComputedStyle(node, null).getPropertyValue(name);
}
function propertyRemove(name) {
	return function() {
		delete this[name];
	};
}
function propertyConstant(name, value) {
	return function() {
		this[name] = value;
	};
}
function propertyFunction(name, value) {
	return function() {
		var v = value.apply(this, arguments);
		if (v == null) delete this[name];
		else this[name] = v;
	};
}
function selection_property(name, value) {
	return arguments.length > 1 ? this.each((value == null ? propertyRemove : typeof value === "function" ? propertyFunction : propertyConstant)(name, value)) : this.node()[name];
}
function classArray(string) {
	return string.trim().split(/^|\s+/);
}
function classList(node) {
	return node.classList || new ClassList(node);
}
function ClassList(node) {
	this._node = node;
	this._names = classArray(node.getAttribute("class") || "");
}
ClassList.prototype = {
	add: function(name) {
		if (this._names.indexOf(name) < 0) {
			this._names.push(name);
			this._node.setAttribute("class", this._names.join(" "));
		}
	},
	remove: function(name) {
		var i = this._names.indexOf(name);
		if (i >= 0) {
			this._names.splice(i, 1);
			this._node.setAttribute("class", this._names.join(" "));
		}
	},
	contains: function(name) {
		return this._names.indexOf(name) >= 0;
	}
};
function classedAdd(node, names) {
	var list = classList(node), i = -1, n = names.length;
	while (++i < n) list.add(names[i]);
}
function classedRemove(node, names) {
	var list = classList(node), i = -1, n = names.length;
	while (++i < n) list.remove(names[i]);
}
function classedTrue(names) {
	return function() {
		classedAdd(this, names);
	};
}
function classedFalse(names) {
	return function() {
		classedRemove(this, names);
	};
}
function classedFunction(names, value) {
	return function() {
		(value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
	};
}
function selection_classed(name, value) {
	var names = classArray(name + "");
	if (arguments.length < 2) {
		var list = classList(this.node()), i = -1, n = names.length;
		while (++i < n) if (!list.contains(names[i])) return false;
		return true;
	}
	return this.each((typeof value === "function" ? classedFunction : value ? classedTrue : classedFalse)(names, value));
}
function textRemove() {
	this.textContent = "";
}
function textConstant$1(value) {
	return function() {
		this.textContent = value;
	};
}
function textFunction$1(value) {
	return function() {
		var v = value.apply(this, arguments);
		this.textContent = v == null ? "" : v;
	};
}
function selection_text(value) {
	return arguments.length ? this.each(value == null ? textRemove : (typeof value === "function" ? textFunction$1 : textConstant$1)(value)) : this.node().textContent;
}
function htmlRemove() {
	this.innerHTML = "";
}
function htmlConstant(value) {
	return function() {
		this.innerHTML = value;
	};
}
function htmlFunction(value) {
	return function() {
		var v = value.apply(this, arguments);
		this.innerHTML = v == null ? "" : v;
	};
}
function selection_html(value) {
	return arguments.length ? this.each(value == null ? htmlRemove : (typeof value === "function" ? htmlFunction : htmlConstant)(value)) : this.node().innerHTML;
}
function raise() {
	if (this.nextSibling) this.parentNode.appendChild(this);
}
function selection_raise() {
	return this.each(raise);
}
function lower() {
	if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function selection_lower() {
	return this.each(lower);
}
function selection_append(name) {
	var create = typeof name === "function" ? name : creator(name);
	return this.select(function() {
		return this.appendChild(create.apply(this, arguments));
	});
}
function constantNull() {
	return null;
}
function selection_insert(name, before) {
	var create = typeof name === "function" ? name : creator(name), select = before == null ? constantNull : typeof before === "function" ? before : selector(before);
	return this.select(function() {
		return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
	});
}
function remove() {
	var parent = this.parentNode;
	if (parent) parent.removeChild(this);
}
function selection_remove() {
	return this.each(remove);
}
function selection_cloneShallow() {
	var clone = this.cloneNode(false), parent = this.parentNode;
	return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function selection_cloneDeep() {
	var clone = this.cloneNode(true), parent = this.parentNode;
	return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function selection_clone(deep) {
	return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
}
function selection_datum(value) {
	return arguments.length ? this.property("__data__", value) : this.node().__data__;
}
function contextListener(listener) {
	return function(event) {
		listener.call(this, event, this.__data__);
	};
}
function parseTypenames(typenames) {
	return typenames.trim().split(/^|\s+/).map(function(t) {
		var name = "", i = t.indexOf(".");
		if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
		return {
			type: t,
			name
		};
	});
}
function onRemove(typename) {
	return function() {
		var on = this.__on;
		if (!on) return;
		for (var j = 0, i = -1, m = on.length, o; j < m; ++j) if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) this.removeEventListener(o.type, o.listener, o.options);
		else on[++i] = o;
		if (++i) on.length = i;
		else delete this.__on;
	};
}
function onAdd(typename, value, options) {
	return function() {
		var on = this.__on, o, listener = contextListener(value);
		if (on) {
			for (var j = 0, m = on.length; j < m; ++j) if ((o = on[j]).type === typename.type && o.name === typename.name) {
				this.removeEventListener(o.type, o.listener, o.options);
				this.addEventListener(o.type, o.listener = listener, o.options = options);
				o.value = value;
				return;
			}
		}
		this.addEventListener(typename.type, listener, options);
		o = {
			type: typename.type,
			name: typename.name,
			value,
			listener,
			options
		};
		if (!on) this.__on = [o];
		else on.push(o);
	};
}
function selection_on(typename, value, options) {
	var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;
	if (arguments.length < 2) {
		var on = this.node().__on;
		if (on) {
			for (var j = 0, m = on.length, o; j < m; ++j) for (i = 0, o = on[j]; i < n; ++i) if ((t = typenames[i]).type === o.type && t.name === o.name) return o.value;
		}
		return;
	}
	on = value ? onAdd : onRemove;
	for (i = 0; i < n; ++i) this.each(on(typenames[i], value, options));
	return this;
}
function dispatchEvent(node, type, params) {
	var window = defaultView(node), event = window.CustomEvent;
	if (typeof event === "function") event = new event(type, params);
	else {
		event = window.document.createEvent("Event");
		if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
		else event.initEvent(type, false, false);
	}
	node.dispatchEvent(event);
}
function dispatchConstant(type, params) {
	return function() {
		return dispatchEvent(this, type, params);
	};
}
function dispatchFunction(type, params) {
	return function() {
		return dispatchEvent(this, type, params.apply(this, arguments));
	};
}
function selection_dispatch(type, params) {
	return this.each((typeof params === "function" ? dispatchFunction : dispatchConstant)(type, params));
}
function* selection_iterator() {
	for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) if (node = group[i]) yield node;
}
var root = [null];
function Selection$1(groups, parents) {
	this._groups = groups;
	this._parents = parents;
}
function selection() {
	return new Selection$1([[document.documentElement]], root);
}
function selection_selection() {
	return this;
}
Selection$1.prototype = selection.prototype = {
	constructor: Selection$1,
	select: selection_select,
	selectAll: selection_selectAll,
	selectChild: selection_selectChild,
	selectChildren: selection_selectChildren,
	filter: selection_filter,
	data: selection_data,
	enter: selection_enter,
	exit: selection_exit,
	join: selection_join,
	merge: selection_merge,
	selection: selection_selection,
	order: selection_order,
	sort: selection_sort,
	call: selection_call,
	nodes: selection_nodes,
	node: selection_node,
	size: selection_size,
	empty: selection_empty,
	each: selection_each,
	attr: selection_attr,
	style: selection_style,
	property: selection_property,
	classed: selection_classed,
	text: selection_text,
	html: selection_html,
	raise: selection_raise,
	lower: selection_lower,
	append: selection_append,
	insert: selection_insert,
	remove: selection_remove,
	clone: selection_clone,
	datum: selection_datum,
	on: selection_on,
	dispatch: selection_dispatch,
	[Symbol.iterator]: selection_iterator
};
function select(selector) {
	return typeof selector === "string" ? new Selection$1([[document.querySelector(selector)]], [document.documentElement]) : new Selection$1([[selector]], root);
}
var nextId = 0;
function local() {
	return new Local();
}
function Local() {
	this._ = "@" + (++nextId).toString(36);
}
Local.prototype = local.prototype = {
	constructor: Local,
	get: function(node) {
		var id = this._;
		while (!(id in node)) if (!(node = node.parentNode)) return;
		return node[id];
	},
	set: function(node, value) {
		return node[this._] = value;
	},
	remove: function(node) {
		return this._ in node && delete node[this._];
	},
	toString: function() {
		return this._;
	}
};
function sourceEvent(event) {
	let sourceEvent;
	while (sourceEvent = event.sourceEvent) event = sourceEvent;
	return event;
}
function pointer(event, node) {
	event = sourceEvent(event);
	if (node === void 0) node = event.currentTarget;
	if (node) {
		var svg = node.ownerSVGElement || node;
		if (svg.createSVGPoint) {
			var point = svg.createSVGPoint();
			point.x = event.clientX, point.y = event.clientY;
			point = point.matrixTransform(node.getScreenCTM().inverse());
			return [point.x, point.y];
		}
		if (node.getBoundingClientRect) {
			var rect = node.getBoundingClientRect();
			return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
		}
	}
	return [event.pageX, event.pageY];
}
// node_modules/d3-drag/dist/d3-drag.mjs
var nonpassive = { passive: false };
var nonpassivecapture = {
	capture: true,
	passive: false
};
function nopropagation$1(event) {
	event.stopImmediatePropagation();
}
function noevent$1(event) {
	event.preventDefault();
	event.stopImmediatePropagation();
}
function nodrag(view) {
	var root = view.document.documentElement, selection = select(view).on("dragstart.drag", noevent$1, nonpassivecapture);
	if ("onselectstart" in root) selection.on("selectstart.drag", noevent$1, nonpassivecapture);
	else {
		root.__noselect = root.style.MozUserSelect;
		root.style.MozUserSelect = "none";
	}
}
function yesdrag(view, noclick) {
	var root = view.document.documentElement, selection = select(view).on("dragstart.drag", null);
	if (noclick) {
		selection.on("click.drag", noevent$1, nonpassivecapture);
		setTimeout(function() {
			selection.on("click.drag", null);
		}, 0);
	}
	if ("onselectstart" in root) selection.on("selectstart.drag", null);
	else {
		root.style.MozUserSelect = root.__noselect;
		delete root.__noselect;
	}
}
var constant$2 = (x) => () => x;
function DragEvent(type, { sourceEvent, subject, target, identifier, active, x, y, dx, dy, dispatch }) {
	Object.defineProperties(this, {
		type: {
			value: type,
			enumerable: true,
			configurable: true
		},
		sourceEvent: {
			value: sourceEvent,
			enumerable: true,
			configurable: true
		},
		subject: {
			value: subject,
			enumerable: true,
			configurable: true
		},
		target: {
			value: target,
			enumerable: true,
			configurable: true
		},
		identifier: {
			value: identifier,
			enumerable: true,
			configurable: true
		},
		active: {
			value: active,
			enumerable: true,
			configurable: true
		},
		x: {
			value: x,
			enumerable: true,
			configurable: true
		},
		y: {
			value: y,
			enumerable: true,
			configurable: true
		},
		dx: {
			value: dx,
			enumerable: true,
			configurable: true
		},
		dy: {
			value: dy,
			enumerable: true,
			configurable: true
		},
		_: { value: dispatch }
	});
}
DragEvent.prototype.on = function() {
	var value = this._.on.apply(this._, arguments);
	return value === this._ ? this : value;
};
function defaultFilter$1(event) {
	return !event.ctrlKey && !event.button;
}
function defaultContainer() {
	return this.parentNode;
}
function defaultSubject(event, d) {
	return d == null ? {
		x: event.x,
		y: event.y
	} : d;
}
function defaultTouchable$1() {
	return navigator.maxTouchPoints || "ontouchstart" in this;
}
function drag() {
	var filter = defaultFilter$1, container = defaultContainer, subject = defaultSubject, touchable = defaultTouchable$1, gestures = {}, listeners = dispatch("start", "drag", "end"), active = 0, mousedownx, mousedowny, mousemoving, touchending, clickDistance2 = 0;
	function drag(selection) {
		selection.on("mousedown.drag", mousedowned).filter(touchable).on("touchstart.drag", touchstarted).on("touchmove.drag", touchmoved, nonpassive).on("touchend.drag touchcancel.drag", touchended).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
	}
	function mousedowned(event, d) {
		if (touchending || !filter.call(this, event, d)) return;
		var gesture = beforestart(this, container.call(this, event, d), event, d, "mouse");
		if (!gesture) return;
		select(event.view).on("mousemove.drag", mousemoved, nonpassivecapture).on("mouseup.drag", mouseupped, nonpassivecapture);
		nodrag(event.view);
		nopropagation$1(event);
		mousemoving = false;
		mousedownx = event.clientX;
		mousedowny = event.clientY;
		gesture("start", event);
	}
	function mousemoved(event) {
		noevent$1(event);
		if (!mousemoving) {
			var dx = event.clientX - mousedownx, dy = event.clientY - mousedowny;
			mousemoving = dx * dx + dy * dy > clickDistance2;
		}
		gestures.mouse("drag", event);
	}
	function mouseupped(event) {
		select(event.view).on("mousemove.drag mouseup.drag", null);
		yesdrag(event.view, mousemoving);
		noevent$1(event);
		gestures.mouse("end", event);
	}
	function touchstarted(event, d) {
		if (!filter.call(this, event, d)) return;
		var touches = event.changedTouches, c = container.call(this, event, d), n = touches.length, i = 0, gesture;
		for (; i < n; ++i) if (gesture = beforestart(this, c, event, d, touches[i].identifier, touches[i])) {
			nopropagation$1(event);
			gesture("start", event, touches[i]);
		}
	}
	function touchmoved(event) {
		var touches = event.changedTouches, n = touches.length, i = 0, gesture;
		for (; i < n; ++i) if (gesture = gestures[touches[i].identifier]) {
			noevent$1(event);
			gesture("drag", event, touches[i]);
		}
	}
	function touchended(event) {
		var touches = event.changedTouches, n = touches.length, i, gesture;
		if (touchending) clearTimeout(touchending);
		touchending = setTimeout(function() {
			touchending = null;
		}, 500);
		for (i = 0; i < n; ++i) if (gesture = gestures[touches[i].identifier]) {
			nopropagation$1(event);
			gesture("end", event, touches[i]);
		}
	}
	function beforestart(that, container, event, d, identifier, touch) {
		var dispatch = listeners.copy(), p = pointer(touch || event, container), dx, dy, s;
		if ((s = subject.call(that, new DragEvent("beforestart", {
			sourceEvent: event,
			target: drag,
			identifier,
			active,
			x: p[0],
			y: p[1],
			dx: 0,
			dy: 0,
			dispatch
		}), d)) == null) return;
		dx = s.x - p[0] || 0;
		dy = s.y - p[1] || 0;
		return function gesture(type, event, touch) {
			var p0 = p, n;
			switch (type) {
				case "start":
					gestures[identifier] = gesture, n = active++;
					break;
				case "end": delete gestures[identifier], --active;
				case "drag": p = pointer(touch || event, container), n = active;
			}
			dispatch.call(type, that, new DragEvent(type, {
				sourceEvent: event,
				subject: s,
				target: drag,
				identifier,
				active: n,
				x: p[0] + dx,
				y: p[1] + dy,
				dx: p[0] - p0[0],
				dy: p[1] - p0[1],
				dispatch
			}), d);
		};
	}
	drag.filter = function(_) {
		return arguments.length ? (filter = typeof _ === "function" ? _ : constant$2(!!_), drag) : filter;
	};
	drag.container = function(_) {
		return arguments.length ? (container = typeof _ === "function" ? _ : constant$2(_), drag) : container;
	};
	drag.subject = function(_) {
		return arguments.length ? (subject = typeof _ === "function" ? _ : constant$2(_), drag) : subject;
	};
	drag.touchable = function(_) {
		return arguments.length ? (touchable = typeof _ === "function" ? _ : constant$2(!!_), drag) : touchable;
	};
	drag.on = function() {
		var value = listeners.on.apply(listeners, arguments);
		return value === listeners ? drag : value;
	};
	drag.clickDistance = function(_) {
		return arguments.length ? (clickDistance2 = (_ = +_) * _, drag) : Math.sqrt(clickDistance2);
	};
	return drag;
}
// node_modules/d3-color/dist/d3-color.mjs
function define$1(constructor, factory, prototype) {
	constructor.prototype = factory.prototype = prototype;
	prototype.constructor = constructor;
}
function extend(parent, definition) {
	var prototype = Object.create(parent.prototype);
	for (var key in definition) prototype[key] = definition[key];
	return prototype;
}
function Color() {}
var darker = .7;
var brighter = 1 / darker;
var reI = "\\s*([+-]?\\d+)\\s*";
var reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*";
var reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*";
var reHex = /^#([0-9a-f]{3,8})$/;
var reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`);
var reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`);
var reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`);
var reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`);
var reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`);
var reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);
var named = {
	aliceblue: 15792383,
	antiquewhite: 16444375,
	aqua: 65535,
	aquamarine: 8388564,
	azure: 15794175,
	beige: 16119260,
	bisque: 16770244,
	black: 0,
	blanchedalmond: 16772045,
	blue: 255,
	blueviolet: 9055202,
	brown: 10824234,
	burlywood: 14596231,
	cadetblue: 6266528,
	chartreuse: 8388352,
	chocolate: 13789470,
	coral: 16744272,
	cornflowerblue: 6591981,
	cornsilk: 16775388,
	crimson: 14423100,
	cyan: 65535,
	darkblue: 139,
	darkcyan: 35723,
	darkgoldenrod: 12092939,
	darkgray: 11119017,
	darkgreen: 25600,
	darkgrey: 11119017,
	darkkhaki: 12433259,
	darkmagenta: 9109643,
	darkolivegreen: 5597999,
	darkorange: 16747520,
	darkorchid: 10040012,
	darkred: 9109504,
	darksalmon: 15308410,
	darkseagreen: 9419919,
	darkslateblue: 4734347,
	darkslategray: 3100495,
	darkslategrey: 3100495,
	darkturquoise: 52945,
	darkviolet: 9699539,
	deeppink: 16716947,
	deepskyblue: 49151,
	dimgray: 6908265,
	dimgrey: 6908265,
	dodgerblue: 2003199,
	firebrick: 11674146,
	floralwhite: 16775920,
	forestgreen: 2263842,
	fuchsia: 16711935,
	gainsboro: 14474460,
	ghostwhite: 16316671,
	gold: 16766720,
	goldenrod: 14329120,
	gray: 8421504,
	green: 32768,
	greenyellow: 11403055,
	grey: 8421504,
	honeydew: 15794160,
	hotpink: 16738740,
	indianred: 13458524,
	indigo: 4915330,
	ivory: 16777200,
	khaki: 15787660,
	lavender: 15132410,
	lavenderblush: 16773365,
	lawngreen: 8190976,
	lemonchiffon: 16775885,
	lightblue: 11393254,
	lightcoral: 15761536,
	lightcyan: 14745599,
	lightgoldenrodyellow: 16448210,
	lightgray: 13882323,
	lightgreen: 9498256,
	lightgrey: 13882323,
	lightpink: 16758465,
	lightsalmon: 16752762,
	lightseagreen: 2142890,
	lightskyblue: 8900346,
	lightslategray: 7833753,
	lightslategrey: 7833753,
	lightsteelblue: 11584734,
	lightyellow: 16777184,
	lime: 65280,
	limegreen: 3329330,
	linen: 16445670,
	magenta: 16711935,
	maroon: 8388608,
	mediumaquamarine: 6737322,
	mediumblue: 205,
	mediumorchid: 12211667,
	mediumpurple: 9662683,
	mediumseagreen: 3978097,
	mediumslateblue: 8087790,
	mediumspringgreen: 64154,
	mediumturquoise: 4772300,
	mediumvioletred: 13047173,
	midnightblue: 1644912,
	mintcream: 16121850,
	mistyrose: 16770273,
	moccasin: 16770229,
	navajowhite: 16768685,
	navy: 128,
	oldlace: 16643558,
	olive: 8421376,
	olivedrab: 7048739,
	orange: 16753920,
	orangered: 16729344,
	orchid: 14315734,
	palegoldenrod: 15657130,
	palegreen: 10025880,
	paleturquoise: 11529966,
	palevioletred: 14381203,
	papayawhip: 16773077,
	peachpuff: 16767673,
	peru: 13468991,
	pink: 16761035,
	plum: 14524637,
	powderblue: 11591910,
	purple: 8388736,
	rebeccapurple: 6697881,
	red: 16711680,
	rosybrown: 12357519,
	royalblue: 4286945,
	saddlebrown: 9127187,
	salmon: 16416882,
	sandybrown: 16032864,
	seagreen: 3050327,
	seashell: 16774638,
	sienna: 10506797,
	silver: 12632256,
	skyblue: 8900331,
	slateblue: 6970061,
	slategray: 7372944,
	slategrey: 7372944,
	snow: 16775930,
	springgreen: 65407,
	steelblue: 4620980,
	tan: 13808780,
	teal: 32896,
	thistle: 14204888,
	tomato: 16737095,
	turquoise: 4251856,
	violet: 15631086,
	wheat: 16113331,
	white: 16777215,
	whitesmoke: 16119285,
	yellow: 16776960,
	yellowgreen: 10145074
};
define$1(Color, color, {
	copy(channels) {
		return Object.assign(new this.constructor(), this, channels);
	},
	displayable() {
		return this.rgb().displayable();
	},
	hex: color_formatHex,
	formatHex: color_formatHex,
	formatHex8: color_formatHex8,
	formatHsl: color_formatHsl,
	formatRgb: color_formatRgb,
	toString: color_formatRgb
});
function color_formatHex() {
	return this.rgb().formatHex();
}
function color_formatHex8() {
	return this.rgb().formatHex8();
}
function color_formatHsl() {
	return hslConvert(this).formatHsl();
}
function color_formatRgb() {
	return this.rgb().formatRgb();
}
function color(format) {
	var m, l;
	format = (format + "").trim().toLowerCase();
	return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) : l === 3 ? new Rgb(m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, (m & 15) << 4 | m & 15, 1) : l === 8 ? rgba(m >> 24 & 255, m >> 16 & 255, m >> 8 & 255, (m & 255) / 255) : l === 4 ? rgba(m >> 12 & 15 | m >> 8 & 240, m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, ((m & 15) << 4 | m & 15) / 255) : null) : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) : named.hasOwnProperty(format) ? rgbn(named[format]) : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
}
function rgbn(n) {
	return new Rgb(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
}
function rgba(r, g, b, a) {
	if (a <= 0) r = g = b = NaN;
	return new Rgb(r, g, b, a);
}
function rgbConvert(o) {
	if (!(o instanceof Color)) o = color(o);
	if (!o) return new Rgb();
	o = o.rgb();
	return new Rgb(o.r, o.g, o.b, o.opacity);
}
function rgb$1(r, g, b, opacity) {
	return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}
function Rgb(r, g, b, opacity) {
	this.r = +r;
	this.g = +g;
	this.b = +b;
	this.opacity = +opacity;
}
define$1(Rgb, rgb$1, extend(Color, {
	brighter(k) {
		k = k == null ? brighter : Math.pow(brighter, k);
		return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
	},
	darker(k) {
		k = k == null ? darker : Math.pow(darker, k);
		return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
	},
	rgb() {
		return this;
	},
	clamp() {
		return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
	},
	displayable() {
		return -.5 <= this.r && this.r < 255.5 && -.5 <= this.g && this.g < 255.5 && -.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
	},
	hex: rgb_formatHex,
	formatHex: rgb_formatHex,
	formatHex8: rgb_formatHex8,
	formatRgb: rgb_formatRgb,
	toString: rgb_formatRgb
}));
function rgb_formatHex() {
	return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
}
function rgb_formatHex8() {
	return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function rgb_formatRgb() {
	const a = clampa(this.opacity);
	return `${a === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a === 1 ? ")" : `, ${a})`}`;
}
function clampa(opacity) {
	return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
}
function clampi(value) {
	return Math.max(0, Math.min(255, Math.round(value) || 0));
}
function hex(value) {
	value = clampi(value);
	return (value < 16 ? "0" : "") + value.toString(16);
}
function hsla(h, s, l, a) {
	if (a <= 0) h = s = l = NaN;
	else if (l <= 0 || l >= 1) h = s = NaN;
	else if (s <= 0) h = NaN;
	return new Hsl(h, s, l, a);
}
function hslConvert(o) {
	if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
	if (!(o instanceof Color)) o = color(o);
	if (!o) return new Hsl();
	if (o instanceof Hsl) return o;
	o = o.rgb();
	var r = o.r / 255, g = o.g / 255, b = o.b / 255, min = Math.min(r, g, b), max = Math.max(r, g, b), h = NaN, s = max - min, l = (max + min) / 2;
	if (s) {
		if (r === max) h = (g - b) / s + (g < b) * 6;
		else if (g === max) h = (b - r) / s + 2;
		else h = (r - g) / s + 4;
		s /= l < .5 ? max + min : 2 - max - min;
		h *= 60;
	} else s = l > 0 && l < 1 ? 0 : h;
	return new Hsl(h, s, l, o.opacity);
}
function hsl$1(h, s, l, opacity) {
	return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}
function Hsl(h, s, l, opacity) {
	this.h = +h;
	this.s = +s;
	this.l = +l;
	this.opacity = +opacity;
}
define$1(Hsl, hsl$1, extend(Color, {
	brighter(k) {
		k = k == null ? brighter : Math.pow(brighter, k);
		return new Hsl(this.h, this.s, this.l * k, this.opacity);
	},
	darker(k) {
		k = k == null ? darker : Math.pow(darker, k);
		return new Hsl(this.h, this.s, this.l * k, this.opacity);
	},
	rgb() {
		var h = this.h % 360 + (this.h < 0) * 360, s = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < .5 ? l : 1 - l) * s, m1 = 2 * l - m2;
		return new Rgb(hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2), hsl2rgb(h, m1, m2), hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
	},
	clamp() {
		return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
	},
	displayable() {
		return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
	},
	formatHsl() {
		const a = clampa(this.opacity);
		return `${a === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a === 1 ? ")" : `, ${a})`}`;
	}
}));
function clamph(value) {
	value = (value || 0) % 360;
	return value < 0 ? value + 360 : value;
}
function clampt(value) {
	return Math.max(0, Math.min(1, value || 0));
}
function hsl2rgb(h, m1, m2) {
	return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}
var radians = Math.PI / 180;
var degrees$1 = 180 / Math.PI;
var K = 18;
var Xn = .96422;
var Yn = 1;
var Zn = .82521;
var t0 = 4 / 29;
var t1 = 6 / 29;
var t2 = 3 * t1 * t1;
var t3 = t1 * t1 * t1;
function labConvert(o) {
	if (o instanceof Lab) return new Lab(o.l, o.a, o.b, o.opacity);
	if (o instanceof Hcl) return hcl2lab(o);
	if (!(o instanceof Rgb)) o = rgbConvert(o);
	var r = rgb2lrgb(o.r), g = rgb2lrgb(o.g), b = rgb2lrgb(o.b), y = xyz2lab((.2225045 * r + .7168786 * g + .0606169 * b) / Yn), x, z;
	if (r === g && g === b) x = z = y;
	else {
		x = xyz2lab((.4360747 * r + .3850649 * g + .1430804 * b) / Xn);
		z = xyz2lab((.0139322 * r + .0971045 * g + .7141733 * b) / Zn);
	}
	return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);
}
function lab(l, a, b, opacity) {
	return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity == null ? 1 : opacity);
}
function Lab(l, a, b, opacity) {
	this.l = +l;
	this.a = +a;
	this.b = +b;
	this.opacity = +opacity;
}
define$1(Lab, lab, extend(Color, {
	brighter(k) {
		return new Lab(this.l + K * (k == null ? 1 : k), this.a, this.b, this.opacity);
	},
	darker(k) {
		return new Lab(this.l - K * (k == null ? 1 : k), this.a, this.b, this.opacity);
	},
	rgb() {
		var y = (this.l + 16) / 116, x = isNaN(this.a) ? y : y + this.a / 500, z = isNaN(this.b) ? y : y - this.b / 200;
		x = Xn * lab2xyz(x);
		y = Yn * lab2xyz(y);
		z = Zn * lab2xyz(z);
		return new Rgb(lrgb2rgb(3.1338561 * x - 1.6168667 * y - .4906146 * z), lrgb2rgb(-.9787684 * x + 1.9161415 * y + .033454 * z), lrgb2rgb(.0719453 * x - .2289914 * y + 1.4052427 * z), this.opacity);
	}
}));
function xyz2lab(t) {
	return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
}
function lab2xyz(t) {
	return t > t1 ? t * t * t : t2 * (t - t0);
}
function lrgb2rgb(x) {
	return 255 * (x <= .0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - .055);
}
function rgb2lrgb(x) {
	return (x /= 255) <= .04045 ? x / 12.92 : Math.pow((x + .055) / 1.055, 2.4);
}
function hclConvert(o) {
	if (o instanceof Hcl) return new Hcl(o.h, o.c, o.l, o.opacity);
	if (!(o instanceof Lab)) o = labConvert(o);
	if (o.a === 0 && o.b === 0) return new Hcl(NaN, 0 < o.l && o.l < 100 ? 0 : NaN, o.l, o.opacity);
	var h = Math.atan2(o.b, o.a) * degrees$1;
	return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
}
function hcl$1(h, c, l, opacity) {
	return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
}
function Hcl(h, c, l, opacity) {
	this.h = +h;
	this.c = +c;
	this.l = +l;
	this.opacity = +opacity;
}
function hcl2lab(o) {
	if (isNaN(o.h)) return new Lab(o.l, 0, 0, o.opacity);
	var h = o.h * radians;
	return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
}
define$1(Hcl, hcl$1, extend(Color, {
	brighter(k) {
		return new Hcl(this.h, this.c, this.l + K * (k == null ? 1 : k), this.opacity);
	},
	darker(k) {
		return new Hcl(this.h, this.c, this.l - K * (k == null ? 1 : k), this.opacity);
	},
	rgb() {
		return hcl2lab(this).rgb();
	}
}));
var A = -.14861;
var B = 1.78277;
var C = -.29227;
var D = -.90649;
var E = 1.97294;
var ED = E * D;
var EB = E * B;
var BC_DA = B * C - D * A;
function cubehelixConvert(o) {
	if (o instanceof Cubehelix) return new Cubehelix(o.h, o.s, o.l, o.opacity);
	if (!(o instanceof Rgb)) o = rgbConvert(o);
	var r = o.r / 255, g = o.g / 255, b = o.b / 255, l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB), bl = b - l, k = (E * (g - l) - C * bl) / D, s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)), h = s ? Math.atan2(k, bl) * degrees$1 - 120 : NaN;
	return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
}
function cubehelix$1(h, s, l, opacity) {
	return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity == null ? 1 : opacity);
}
function Cubehelix(h, s, l, opacity) {
	this.h = +h;
	this.s = +s;
	this.l = +l;
	this.opacity = +opacity;
}
define$1(Cubehelix, cubehelix$1, extend(Color, {
	brighter(k) {
		k = k == null ? brighter : Math.pow(brighter, k);
		return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
	},
	darker(k) {
		k = k == null ? darker : Math.pow(darker, k);
		return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
	},
	rgb() {
		var h = isNaN(this.h) ? 0 : (this.h + 120) * radians, l = +this.l, a = isNaN(this.s) ? 0 : this.s * l * (1 - l), cosh = Math.cos(h), sinh = Math.sin(h);
		return new Rgb(255 * (l + a * (A * cosh + B * sinh)), 255 * (l + a * (C * cosh + D * sinh)), 255 * (l + a * (E * cosh)), this.opacity);
	}
}));
var constant$1 = (x) => () => x;
function linear(a, d) {
	return function(t) {
		return a + t * d;
	};
}
function exponential(a, b, y) {
	return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
		return Math.pow(a + t * b, y);
	};
}
function hue$1(a, b) {
	var d = b - a;
	return d ? linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : constant$1(isNaN(a) ? b : a);
}
function gamma(y) {
	return (y = +y) === 1 ? nogamma : function(a, b) {
		return b - a ? exponential(a, b, y) : constant$1(isNaN(a) ? b : a);
	};
}
function nogamma(a, b) {
	var d = b - a;
	return d ? linear(a, d) : constant$1(isNaN(a) ? b : a);
}
var rgb = (function rgbGamma(y) {
	var color = gamma(y);
	function rgb(start, end) {
		var r = color((start = rgb$1(start)).r, (end = rgb$1(end)).r), g = color(start.g, end.g), b = color(start.b, end.b), opacity = nogamma(start.opacity, end.opacity);
		return function(t) {
			start.r = r(t);
			start.g = g(t);
			start.b = b(t);
			start.opacity = opacity(t);
			return start + "";
		};
	}
	rgb.gamma = rgbGamma;
	return rgb;
})(1);
function numberArray(a, b) {
	if (!b) b = [];
	var n = a ? Math.min(b.length, a.length) : 0, c = b.slice(), i;
	return function(t) {
		for (i = 0; i < n; ++i) c[i] = a[i] * (1 - t) + b[i] * t;
		return c;
	};
}
function isNumberArray(x) {
	return ArrayBuffer.isView(x) && !(x instanceof DataView);
}
function genericArray(a, b) {
	var nb = b ? b.length : 0, na = a ? Math.min(nb, a.length) : 0, x = new Array(na), c = new Array(nb), i = 0;
	for (; i < na; ++i) x[i] = value(a[i], b[i]);
	for (; i < nb; ++i) c[i] = b[i];
	return function(t) {
		for (i = 0; i < na; ++i) c[i] = x[i](t);
		return c;
	};
}
function date(a, b) {
	var d = /* @__PURE__ */ new Date();
	return a = +a, b = +b, function(t) {
		return d.setTime(a * (1 - t) + b * t), d;
	};
}
function number(a, b) {
	return a = +a, b = +b, function(t) {
		return a * (1 - t) + b * t;
	};
}
function object(a, b) {
	var i = {}, c = {}, k;
	if (a === null || typeof a !== "object") a = {};
	if (b === null || typeof b !== "object") b = {};
	for (k in b) if (k in a) i[k] = value(a[k], b[k]);
	else c[k] = b[k];
	return function(t) {
		for (k in i) c[k] = i[k](t);
		return c;
	};
}
var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
var reB = new RegExp(reA.source, "g");
function zero(b) {
	return function() {
		return b;
	};
}
function one(b) {
	return function(t) {
		return b(t) + "";
	};
}
function string(a, b) {
	var bi = reA.lastIndex = reB.lastIndex = 0, am, bm, bs, i = -1, s = [], q = [];
	a = a + "", b = b + "";
	while ((am = reA.exec(a)) && (bm = reB.exec(b))) {
		if ((bs = bm.index) > bi) {
			bs = b.slice(bi, bs);
			if (s[i]) s[i] += bs;
			else s[++i] = bs;
		}
		if ((am = am[0]) === (bm = bm[0])) {
			if (s[i]) s[i] += bm;
			else s[++i] = bm;
		} else {
			s[++i] = null;
			q.push({
				i,
				x: number(am, bm)
			});
		}
		bi = reB.lastIndex;
	}
	if (bi < b.length) {
		bs = b.slice(bi);
		if (s[i]) s[i] += bs;
		else s[++i] = bs;
	}
	return s.length < 2 ? q[0] ? one(q[0].x) : zero(b) : (b = q.length, function(t) {
		for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
		return s.join("");
	});
}
function value(a, b) {
	var t = typeof b, c;
	return b == null || t === "boolean" ? constant$1(b) : (t === "number" ? number : t === "string" ? (c = color(b)) ? (b = c, rgb) : string : b instanceof color ? rgb : b instanceof Date ? date : isNumberArray(b) ? numberArray : Array.isArray(b) ? genericArray : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object : number)(a, b);
}
var degrees = 180 / Math.PI;
var identity$3 = {
	translateX: 0,
	translateY: 0,
	rotate: 0,
	skewX: 0,
	scaleX: 1,
	scaleY: 1
};
function decompose(a, b, c, d, e, f) {
	var scaleX, scaleY, skewX;
	if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
	if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
	if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
	if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
	return {
		translateX: e,
		translateY: f,
		rotate: Math.atan2(b, a) * degrees,
		skewX: Math.atan(skewX) * degrees,
		scaleX,
		scaleY
	};
}
var svgNode;
function parseCss(value) {
	const m = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
	return m.isIdentity ? identity$3 : decompose(m.a, m.b, m.c, m.d, m.e, m.f);
}
function parseSvg(value) {
	if (value == null) return identity$3;
	if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
	svgNode.setAttribute("transform", value);
	if (!(value = svgNode.transform.baseVal.consolidate())) return identity$3;
	value = value.matrix;
	return decompose(value.a, value.b, value.c, value.d, value.e, value.f);
}
function interpolateTransform(parse, pxComma, pxParen, degParen) {
	function pop(s) {
		return s.length ? s.pop() + " " : "";
	}
	function translate(xa, ya, xb, yb, s, q) {
		if (xa !== xb || ya !== yb) {
			var i = s.push("translate(", null, pxComma, null, pxParen);
			q.push({
				i: i - 4,
				x: number(xa, xb)
			}, {
				i: i - 2,
				x: number(ya, yb)
			});
		} else if (xb || yb) s.push("translate(" + xb + pxComma + yb + pxParen);
	}
	function rotate(a, b, s, q) {
		if (a !== b) {
			if (a - b > 180) b += 360;
			else if (b - a > 180) a += 360;
			q.push({
				i: s.push(pop(s) + "rotate(", null, degParen) - 2,
				x: number(a, b)
			});
		} else if (b) s.push(pop(s) + "rotate(" + b + degParen);
	}
	function skewX(a, b, s, q) {
		if (a !== b) q.push({
			i: s.push(pop(s) + "skewX(", null, degParen) - 2,
			x: number(a, b)
		});
		else if (b) s.push(pop(s) + "skewX(" + b + degParen);
	}
	function scale(xa, ya, xb, yb, s, q) {
		if (xa !== xb || ya !== yb) {
			var i = s.push(pop(s) + "scale(", null, ",", null, ")");
			q.push({
				i: i - 4,
				x: number(xa, xb)
			}, {
				i: i - 2,
				x: number(ya, yb)
			});
		} else if (xb !== 1 || yb !== 1) s.push(pop(s) + "scale(" + xb + "," + yb + ")");
	}
	return function(a, b) {
		var s = [], q = [];
		a = parse(a), b = parse(b);
		translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
		rotate(a.rotate, b.rotate, s, q);
		skewX(a.skewX, b.skewX, s, q);
		scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
		a = b = null;
		return function(t) {
			var i = -1, n = q.length, o;
			while (++i < n) s[(o = q[i]).i] = o.x(t);
			return s.join("");
		};
	};
}
var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");
var epsilon2 = 1e-12;
function cosh(x) {
	return ((x = Math.exp(x)) + 1 / x) / 2;
}
function sinh(x) {
	return ((x = Math.exp(x)) - 1 / x) / 2;
}
function tanh(x) {
	return ((x = Math.exp(2 * x)) - 1) / (x + 1);
}
var zoom$1 = (function zoomRho(rho, rho2, rho4) {
	function zoom(p0, p1) {
		var ux0 = p0[0], uy0 = p0[1], w0 = p0[2], ux1 = p1[0], uy1 = p1[1], w1 = p1[2], dx = ux1 - ux0, dy = uy1 - uy0, d2 = dx * dx + dy * dy, i, S;
		if (d2 < epsilon2) {
			S = Math.log(w1 / w0) / rho;
			i = function(t) {
				return [
					ux0 + t * dx,
					uy0 + t * dy,
					w0 * Math.exp(rho * t * S)
				];
			};
		} else {
			var d1 = Math.sqrt(d2), b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1), b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1), r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0);
			S = (Math.log(Math.sqrt(b1 * b1 + 1) - b1) - r0) / rho;
			i = function(t) {
				var s = t * S, coshr0 = cosh(r0), u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
				return [
					ux0 + u * dx,
					uy0 + u * dy,
					w0 * coshr0 / cosh(rho * s + r0)
				];
			};
		}
		i.duration = Math.abs(S) * 1e3 * rho / Math.SQRT2;
		return i;
	}
	zoom.rho = function(_) {
		var _1 = Math.max(.001, +_), _2 = _1 * _1;
		return zoomRho(_1, _2, _2 * _2);
	};
	return zoom;
})(Math.SQRT2, 2, 4);
function cubehelix(hue) {
	return (function cubehelixGamma(y) {
		y = +y;
		function cubehelix(start, end) {
			var h = hue((start = cubehelix$1(start)).h, (end = cubehelix$1(end)).h), s = nogamma(start.s, end.s), l = nogamma(start.l, end.l), opacity = nogamma(start.opacity, end.opacity);
			return function(t) {
				start.h = h(t);
				start.s = s(t);
				start.l = l(Math.pow(t, y));
				start.opacity = opacity(t);
				return start + "";
			};
		}
		cubehelix.gamma = cubehelixGamma;
		return cubehelix;
	})(1);
}
cubehelix(hue$1);
cubehelix(nogamma);
// node_modules/d3-timer/dist/d3-timer.mjs
var frame = 0;
var timeout$1 = 0;
var interval$1 = 0;
var pokeDelay = 1e3;
var taskHead;
var taskTail;
var clockLast = 0;
var clockNow = 0;
var clockSkew = 0;
var clock = typeof performance === "object" && performance.now ? performance : Date;
var setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) {
	setTimeout(f, 17);
};
function now() {
	return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}
function clearNow() {
	clockNow = 0;
}
function Timer() {
	this._call = this._time = this._next = null;
}
Timer.prototype = timer.prototype = {
	constructor: Timer,
	restart: function(callback, delay, time) {
		if (typeof callback !== "function") throw new TypeError("callback is not a function");
		time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
		if (!this._next && taskTail !== this) {
			if (taskTail) taskTail._next = this;
			else taskHead = this;
			taskTail = this;
		}
		this._call = callback;
		this._time = time;
		sleep();
	},
	stop: function() {
		if (this._call) {
			this._call = null;
			this._time = Infinity;
			sleep();
		}
	}
};
function timer(callback, delay, time) {
	var t = new Timer();
	t.restart(callback, delay, time);
	return t;
}
function timerFlush() {
	now();
	++frame;
	var t = taskHead, e;
	while (t) {
		if ((e = clockNow - t._time) >= 0) t._call.call(void 0, e);
		t = t._next;
	}
	--frame;
}
function wake() {
	clockNow = (clockLast = clock.now()) + clockSkew;
	frame = timeout$1 = 0;
	try {
		timerFlush();
	} finally {
		frame = 0;
		nap();
		clockNow = 0;
	}
}
function poke() {
	var now = clock.now(), delay = now - clockLast;
	if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
}
function nap() {
	var t0, t1 = taskHead, t2, time = Infinity;
	while (t1) if (t1._call) {
		if (time > t1._time) time = t1._time;
		t0 = t1, t1 = t1._next;
	} else {
		t2 = t1._next, t1._next = null;
		t1 = t0 ? t0._next = t2 : taskHead = t2;
	}
	taskTail = t0;
	sleep(time);
}
function sleep(time) {
	if (frame) return;
	if (timeout$1) timeout$1 = clearTimeout(timeout$1);
	if (time - clockNow > 24) {
		if (time < Infinity) timeout$1 = setTimeout(wake, Math.ceil(time - clock.now() - clockSkew) + 1);
		if (interval$1) interval$1 = clearInterval(interval$1);
	} else {
		if (!interval$1) clockLast = clock.now(), interval$1 = setInterval(poke, pokeDelay);
		frame = 1, setFrame(wake);
	}
}
function timeout(callback, delay, time) {
	var t = new Timer();
	delay = delay == null ? 0 : +delay;
	t.restart((elapsed) => {
		t.stop();
		callback(elapsed + delay);
	}, delay, time);
	return t;
}
// node_modules/d3-ease/dist/d3-ease.mjs
function cubicInOut(t) {
	return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var exponent = 3;
(function custom(e) {
	e = +e;
	function polyIn(t) {
		return Math.pow(t, e);
	}
	polyIn.exponent = custom;
	return polyIn;
})(exponent);
(function custom(e) {
	e = +e;
	function polyOut(t) {
		return 1 - Math.pow(1 - t, e);
	}
	polyOut.exponent = custom;
	return polyOut;
})(exponent);
(function custom(e) {
	e = +e;
	function polyInOut(t) {
		return ((t *= 2) <= 1 ? Math.pow(t, e) : 2 - Math.pow(2 - t, e)) / 2;
	}
	polyInOut.exponent = custom;
	return polyInOut;
})(exponent);
function tpmt(x) {
	return (Math.pow(2, -10 * x) - .0009765625) * 1.0009775171065494;
}
var b1 = 4 / 11;
1 / b1 / b1;
var overshoot = 1.70158;
(function custom(s) {
	s = +s;
	function backIn(t) {
		return (t = +t) * t * (s * (t - 1) + t);
	}
	backIn.overshoot = custom;
	return backIn;
})(overshoot);
(function custom(s) {
	s = +s;
	function backOut(t) {
		return --t * t * ((t + 1) * s + t) + 1;
	}
	backOut.overshoot = custom;
	return backOut;
})(overshoot);
(function custom(s) {
	s = +s;
	function backInOut(t) {
		return ((t *= 2) < 1 ? t * t * ((s + 1) * t - s) : (t -= 2) * t * ((s + 1) * t + s) + 2) / 2;
	}
	backInOut.overshoot = custom;
	return backInOut;
})(overshoot);
var tau = 2 * Math.PI;
var amplitude = 1;
var period = .3;
(function custom(a, p) {
	var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);
	function elasticIn(t) {
		return a * tpmt(- --t) * Math.sin((s - t) / p);
	}
	elasticIn.amplitude = function(a) {
		return custom(a, p * tau);
	};
	elasticIn.period = function(p) {
		return custom(a, p);
	};
	return elasticIn;
})(amplitude, period);
(function custom(a, p) {
	var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);
	function elasticOut(t) {
		return 1 - a * tpmt(t = +t) * Math.sin((t + s) / p);
	}
	elasticOut.amplitude = function(a) {
		return custom(a, p * tau);
	};
	elasticOut.period = function(p) {
		return custom(a, p);
	};
	return elasticOut;
})(amplitude, period);
(function custom(a, p) {
	var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);
	function elasticInOut(t) {
		return ((t = t * 2 - 1) < 0 ? a * tpmt(-t) * Math.sin((s - t) / p) : 2 - a * tpmt(t) * Math.sin((s + t) / p)) / 2;
	}
	elasticInOut.amplitude = function(a) {
		return custom(a, p * tau);
	};
	elasticInOut.period = function(p) {
		return custom(a, p);
	};
	return elasticInOut;
})(amplitude, period);
// node_modules/d3-transition/dist/d3-transition.mjs
var emptyOn = dispatch("start", "end", "cancel", "interrupt");
var emptyTween = [];
var CREATED = 0;
var SCHEDULED = 1;
var STARTING = 2;
var STARTED = 3;
var RUNNING = 4;
var ENDING = 5;
var ENDED = 6;
function schedule(node, name, id, index, group, timing) {
	var schedules = node.__transition;
	if (!schedules) node.__transition = {};
	else if (id in schedules) return;
	create$1(node, id, {
		name,
		index,
		group,
		on: emptyOn,
		tween: emptyTween,
		time: timing.time,
		delay: timing.delay,
		duration: timing.duration,
		ease: timing.ease,
		timer: null,
		state: CREATED
	});
}
function init(node, id) {
	var schedule = get(node, id);
	if (schedule.state > CREATED) throw new Error("too late; already scheduled");
	return schedule;
}
function set(node, id) {
	var schedule = get(node, id);
	if (schedule.state > STARTED) throw new Error("too late; already running");
	return schedule;
}
function get(node, id) {
	var schedule = node.__transition;
	if (!schedule || !(schedule = schedule[id])) throw new Error("transition not found");
	return schedule;
}
function create$1(node, id, self) {
	var schedules = node.__transition, tween;
	schedules[id] = self;
	self.timer = timer(schedule, 0, self.time);
	function schedule(elapsed) {
		self.state = SCHEDULED;
		self.timer.restart(start, self.delay, self.time);
		if (self.delay <= elapsed) start(elapsed - self.delay);
	}
	function start(elapsed) {
		var i, j, n, o;
		if (self.state !== SCHEDULED) return stop();
		for (i in schedules) {
			o = schedules[i];
			if (o.name !== self.name) continue;
			if (o.state === STARTED) return timeout(start);
			if (o.state === RUNNING) {
				o.state = ENDED;
				o.timer.stop();
				o.on.call("interrupt", node, node.__data__, o.index, o.group);
				delete schedules[i];
			} else if (+i < id) {
				o.state = ENDED;
				o.timer.stop();
				o.on.call("cancel", node, node.__data__, o.index, o.group);
				delete schedules[i];
			}
		}
		timeout(function() {
			if (self.state === STARTED) {
				self.state = RUNNING;
				self.timer.restart(tick, self.delay, self.time);
				tick(elapsed);
			}
		});
		self.state = STARTING;
		self.on.call("start", node, node.__data__, self.index, self.group);
		if (self.state !== STARTING) return;
		self.state = STARTED;
		tween = new Array(n = self.tween.length);
		for (i = 0, j = -1; i < n; ++i) if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) tween[++j] = o;
		tween.length = j + 1;
	}
	function tick(elapsed) {
		var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1), i = -1, n = tween.length;
		while (++i < n) tween[i].call(node, t);
		if (self.state === ENDING) {
			self.on.call("end", node, node.__data__, self.index, self.group);
			stop();
		}
	}
	function stop() {
		self.state = ENDED;
		self.timer.stop();
		delete schedules[id];
		for (var i in schedules) return;
		delete node.__transition;
	}
}
function interrupt(node, name) {
	var schedules = node.__transition, schedule, active, empty = true, i;
	if (!schedules) return;
	name = name == null ? null : name + "";
	for (i in schedules) {
		if ((schedule = schedules[i]).name !== name) {
			empty = false;
			continue;
		}
		active = schedule.state > STARTING && schedule.state < ENDING;
		schedule.state = ENDED;
		schedule.timer.stop();
		schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
		delete schedules[i];
	}
	if (empty) delete node.__transition;
}
function selection_interrupt(name) {
	return this.each(function() {
		interrupt(this, name);
	});
}
function tweenRemove(id, name) {
	var tween0, tween1;
	return function() {
		var schedule = set(this, id), tween = schedule.tween;
		if (tween !== tween0) {
			tween1 = tween0 = tween;
			for (var i = 0, n = tween1.length; i < n; ++i) if (tween1[i].name === name) {
				tween1 = tween1.slice();
				tween1.splice(i, 1);
				break;
			}
		}
		schedule.tween = tween1;
	};
}
function tweenFunction(id, name, value) {
	var tween0, tween1;
	if (typeof value !== "function") throw new Error();
	return function() {
		var schedule = set(this, id), tween = schedule.tween;
		if (tween !== tween0) {
			tween1 = (tween0 = tween).slice();
			for (var t = {
				name,
				value
			}, i = 0, n = tween1.length; i < n; ++i) if (tween1[i].name === name) {
				tween1[i] = t;
				break;
			}
			if (i === n) tween1.push(t);
		}
		schedule.tween = tween1;
	};
}
function transition_tween(name, value) {
	var id = this._id;
	name += "";
	if (arguments.length < 2) {
		var tween = get(this.node(), id).tween;
		for (var i = 0, n = tween.length, t; i < n; ++i) if ((t = tween[i]).name === name) return t.value;
		return null;
	}
	return this.each((value == null ? tweenRemove : tweenFunction)(id, name, value));
}
function tweenValue(transition, name, value) {
	var id = transition._id;
	transition.each(function() {
		var schedule = set(this, id);
		(schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
	});
	return function(node) {
		return get(node, id).value[name];
	};
}
function interpolate(a, b) {
	var c;
	return (typeof b === "number" ? number : b instanceof color ? rgb : (c = color(b)) ? (b = c, rgb) : string)(a, b);
}
function attrRemove(name) {
	return function() {
		this.removeAttribute(name);
	};
}
function attrRemoveNS(fullname) {
	return function() {
		this.removeAttributeNS(fullname.space, fullname.local);
	};
}
function attrConstant(name, interpolate, value1) {
	var string00, string1 = value1 + "", interpolate0;
	return function() {
		var string0 = this.getAttribute(name);
		return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
	};
}
function attrConstantNS(fullname, interpolate, value1) {
	var string00, string1 = value1 + "", interpolate0;
	return function() {
		var string0 = this.getAttributeNS(fullname.space, fullname.local);
		return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
	};
}
function attrFunction(name, interpolate, value) {
	var string00, string10, interpolate0;
	return function() {
		var string0, value1 = value(this), string1;
		if (value1 == null) return void this.removeAttribute(name);
		string0 = this.getAttribute(name);
		string1 = value1 + "";
		return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
	};
}
function attrFunctionNS(fullname, interpolate, value) {
	var string00, string10, interpolate0;
	return function() {
		var string0, value1 = value(this), string1;
		if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
		string0 = this.getAttributeNS(fullname.space, fullname.local);
		string1 = value1 + "";
		return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
	};
}
function transition_attr(name, value) {
	var fullname = namespace(name), i = fullname === "transform" ? interpolateTransformSvg : interpolate;
	return this.attrTween(name, typeof value === "function" ? (fullname.local ? attrFunctionNS : attrFunction)(fullname, i, tweenValue(this, "attr." + name, value)) : value == null ? (fullname.local ? attrRemoveNS : attrRemove)(fullname) : (fullname.local ? attrConstantNS : attrConstant)(fullname, i, value));
}
function attrInterpolate(name, i) {
	return function(t) {
		this.setAttribute(name, i.call(this, t));
	};
}
function attrInterpolateNS(fullname, i) {
	return function(t) {
		this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
	};
}
function attrTweenNS(fullname, value) {
	var t0, i0;
	function tween() {
		var i = value.apply(this, arguments);
		if (i !== i0) t0 = (i0 = i) && attrInterpolateNS(fullname, i);
		return t0;
	}
	tween._value = value;
	return tween;
}
function attrTween(name, value) {
	var t0, i0;
	function tween() {
		var i = value.apply(this, arguments);
		if (i !== i0) t0 = (i0 = i) && attrInterpolate(name, i);
		return t0;
	}
	tween._value = value;
	return tween;
}
function transition_attrTween(name, value) {
	var key = "attr." + name;
	if (arguments.length < 2) return (key = this.tween(key)) && key._value;
	if (value == null) return this.tween(key, null);
	if (typeof value !== "function") throw new Error();
	var fullname = namespace(name);
	return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
}
function delayFunction(id, value) {
	return function() {
		init(this, id).delay = +value.apply(this, arguments);
	};
}
function delayConstant(id, value) {
	return value = +value, function() {
		init(this, id).delay = value;
	};
}
function transition_delay(value) {
	var id = this._id;
	return arguments.length ? this.each((typeof value === "function" ? delayFunction : delayConstant)(id, value)) : get(this.node(), id).delay;
}
function durationFunction(id, value) {
	return function() {
		set(this, id).duration = +value.apply(this, arguments);
	};
}
function durationConstant(id, value) {
	return value = +value, function() {
		set(this, id).duration = value;
	};
}
function transition_duration(value) {
	var id = this._id;
	return arguments.length ? this.each((typeof value === "function" ? durationFunction : durationConstant)(id, value)) : get(this.node(), id).duration;
}
function easeConstant(id, value) {
	if (typeof value !== "function") throw new Error();
	return function() {
		set(this, id).ease = value;
	};
}
function transition_ease(value) {
	var id = this._id;
	return arguments.length ? this.each(easeConstant(id, value)) : get(this.node(), id).ease;
}
function easeVarying(id, value) {
	return function() {
		var v = value.apply(this, arguments);
		if (typeof v !== "function") throw new Error();
		set(this, id).ease = v;
	};
}
function transition_easeVarying(value) {
	if (typeof value !== "function") throw new Error();
	return this.each(easeVarying(this._id, value));
}
function transition_filter(match) {
	if (typeof match !== "function") match = matcher(match);
	for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) if ((node = group[i]) && match.call(node, node.__data__, i, group)) subgroup.push(node);
	return new Transition(subgroups, this._parents, this._name, this._id);
}
function transition_merge(transition) {
	if (transition._id !== this._id) throw new Error();
	for (var groups0 = this._groups, groups1 = transition._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) if (node = group0[i] || group1[i]) merge[i] = node;
	for (; j < m0; ++j) merges[j] = groups0[j];
	return new Transition(merges, this._parents, this._name, this._id);
}
function start(name) {
	return (name + "").trim().split(/^|\s+/).every(function(t) {
		var i = t.indexOf(".");
		if (i >= 0) t = t.slice(0, i);
		return !t || t === "start";
	});
}
function onFunction(id, name, listener) {
	var on0, on1, sit = start(name) ? init : set;
	return function() {
		var schedule = sit(this, id), on = schedule.on;
		if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);
		schedule.on = on1;
	};
}
function transition_on(name, listener) {
	var id = this._id;
	return arguments.length < 2 ? get(this.node(), id).on.on(name) : this.each(onFunction(id, name, listener));
}
function removeFunction(id) {
	return function() {
		var parent = this.parentNode;
		for (var i in this.__transition) if (+i !== id) return;
		if (parent) parent.removeChild(this);
	};
}
function transition_remove() {
	return this.on("end.remove", removeFunction(this._id));
}
function transition_select(select) {
	var name = this._name, id = this._id;
	if (typeof select !== "function") select = selector(select);
	for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
		if ("__data__" in node) subnode.__data__ = node.__data__;
		subgroup[i] = subnode;
		schedule(subgroup[i], name, id, i, subgroup, get(node, id));
	}
	return new Transition(subgroups, this._parents, name, id);
}
function transition_selectAll(select) {
	var name = this._name, id = this._id;
	if (typeof select !== "function") select = selectorAll(select);
	for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) if (node = group[i]) {
		for (var children = select.call(node, node.__data__, i, group), child, inherit = get(node, id), k = 0, l = children.length; k < l; ++k) if (child = children[k]) schedule(child, name, id, k, children, inherit);
		subgroups.push(children);
		parents.push(node);
	}
	return new Transition(subgroups, parents, name, id);
}
var Selection = selection.prototype.constructor;
function transition_selection() {
	return new Selection(this._groups, this._parents);
}
function styleNull(name, interpolate) {
	var string00, string10, interpolate0;
	return function() {
		var string0 = styleValue(this, name), string1 = (this.style.removeProperty(name), styleValue(this, name));
		return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : interpolate0 = interpolate(string00 = string0, string10 = string1);
	};
}
function styleRemove(name) {
	return function() {
		this.style.removeProperty(name);
	};
}
function styleConstant(name, interpolate, value1) {
	var string00, string1 = value1 + "", interpolate0;
	return function() {
		var string0 = styleValue(this, name);
		return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
	};
}
function styleFunction(name, interpolate, value) {
	var string00, string10, interpolate0;
	return function() {
		var string0 = styleValue(this, name), value1 = value(this), string1 = value1 + "";
		if (value1 == null) string1 = value1 = (this.style.removeProperty(name), styleValue(this, name));
		return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
	};
}
function styleMaybeRemove(id, name) {
	var on0, on1, listener0, key = "style." + name, event = "end." + key, remove;
	return function() {
		var schedule = set(this, id), on = schedule.on, listener = schedule.value[key] == null ? remove || (remove = styleRemove(name)) : void 0;
		if (on !== on0 || listener0 !== listener) (on1 = (on0 = on).copy()).on(event, listener0 = listener);
		schedule.on = on1;
	};
}
function transition_style(name, value, priority) {
	var i = (name += "") === "transform" ? interpolateTransformCss : interpolate;
	return value == null ? this.styleTween(name, styleNull(name, i)).on("end.style." + name, styleRemove(name)) : typeof value === "function" ? this.styleTween(name, styleFunction(name, i, tweenValue(this, "style." + name, value))).each(styleMaybeRemove(this._id, name)) : this.styleTween(name, styleConstant(name, i, value), priority).on("end.style." + name, null);
}
function styleInterpolate(name, i, priority) {
	return function(t) {
		this.style.setProperty(name, i.call(this, t), priority);
	};
}
function styleTween(name, value, priority) {
	var t, i0;
	function tween() {
		var i = value.apply(this, arguments);
		if (i !== i0) t = (i0 = i) && styleInterpolate(name, i, priority);
		return t;
	}
	tween._value = value;
	return tween;
}
function transition_styleTween(name, value, priority) {
	var key = "style." + (name += "");
	if (arguments.length < 2) return (key = this.tween(key)) && key._value;
	if (value == null) return this.tween(key, null);
	if (typeof value !== "function") throw new Error();
	return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
}
function textConstant(value) {
	return function() {
		this.textContent = value;
	};
}
function textFunction(value) {
	return function() {
		var value1 = value(this);
		this.textContent = value1 == null ? "" : value1;
	};
}
function transition_text(value) {
	return this.tween("text", typeof value === "function" ? textFunction(tweenValue(this, "text", value)) : textConstant(value == null ? "" : value + ""));
}
function textInterpolate(i) {
	return function(t) {
		this.textContent = i.call(this, t);
	};
}
function textTween(value) {
	var t0, i0;
	function tween() {
		var i = value.apply(this, arguments);
		if (i !== i0) t0 = (i0 = i) && textInterpolate(i);
		return t0;
	}
	tween._value = value;
	return tween;
}
function transition_textTween(value) {
	var key = "text";
	if (arguments.length < 1) return (key = this.tween(key)) && key._value;
	if (value == null) return this.tween(key, null);
	if (typeof value !== "function") throw new Error();
	return this.tween(key, textTween(value));
}
function transition_transition() {
	var name = this._name, id0 = this._id, id1 = newId();
	for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) if (node = group[i]) {
		var inherit = get(node, id0);
		schedule(node, name, id1, i, group, {
			time: inherit.time + inherit.delay + inherit.duration,
			delay: 0,
			duration: inherit.duration,
			ease: inherit.ease
		});
	}
	return new Transition(groups, this._parents, name, id1);
}
function transition_end() {
	var on0, on1, that = this, id = that._id, size = that.size();
	return new Promise(function(resolve, reject) {
		var cancel = { value: reject }, end = { value: function() {
			if (--size === 0) resolve();
		} };
		that.each(function() {
			var schedule = set(this, id), on = schedule.on;
			if (on !== on0) {
				on1 = (on0 = on).copy();
				on1._.cancel.push(cancel);
				on1._.interrupt.push(cancel);
				on1._.end.push(end);
			}
			schedule.on = on1;
		});
		if (size === 0) resolve();
	});
}
var id = 0;
function Transition(groups, parents, name, id) {
	this._groups = groups;
	this._parents = parents;
	this._name = name;
	this._id = id;
}
function transition(name) {
	return selection().transition(name);
}
function newId() {
	return ++id;
}
var selection_prototype = selection.prototype;
Transition.prototype = transition.prototype = {
	constructor: Transition,
	select: transition_select,
	selectAll: transition_selectAll,
	selectChild: selection_prototype.selectChild,
	selectChildren: selection_prototype.selectChildren,
	filter: transition_filter,
	merge: transition_merge,
	selection: transition_selection,
	transition: transition_transition,
	call: selection_prototype.call,
	nodes: selection_prototype.nodes,
	node: selection_prototype.node,
	size: selection_prototype.size,
	empty: selection_prototype.empty,
	each: selection_prototype.each,
	on: transition_on,
	attr: transition_attr,
	attrTween: transition_attrTween,
	style: transition_style,
	styleTween: transition_styleTween,
	text: transition_text,
	textTween: transition_textTween,
	remove: transition_remove,
	tween: transition_tween,
	delay: transition_delay,
	duration: transition_duration,
	ease: transition_ease,
	easeVarying: transition_easeVarying,
	end: transition_end,
	[Symbol.iterator]: selection_prototype[Symbol.iterator]
};
var defaultTiming = {
	time: null,
	delay: 0,
	duration: 250,
	ease: cubicInOut
};
function inherit(node, id) {
	var timing;
	while (!(timing = node.__transition) || !(timing = timing[id])) if (!(node = node.parentNode)) throw new Error(`transition ${id} not found`);
	return timing;
}
function selection_transition(name) {
	var id, timing;
	if (name instanceof Transition) id = name._id, name = name._name;
	else id = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
	for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) if (node = group[i]) schedule(node, name, id, i, group, timing || inherit(node, id));
	return new Transition(groups, this._parents, name, id);
}
selection.prototype.interrupt = selection_interrupt;
selection.prototype.transition = selection_transition;
// node_modules/d3-zoom/dist/d3-zoom.mjs
var constant = (x) => () => x;
function ZoomEvent(type, { sourceEvent, target, transform, dispatch }) {
	Object.defineProperties(this, {
		type: {
			value: type,
			enumerable: true,
			configurable: true
		},
		sourceEvent: {
			value: sourceEvent,
			enumerable: true,
			configurable: true
		},
		target: {
			value: target,
			enumerable: true,
			configurable: true
		},
		transform: {
			value: transform,
			enumerable: true,
			configurable: true
		},
		_: { value: dispatch }
	});
}
function Transform(k, x, y) {
	this.k = k;
	this.x = x;
	this.y = y;
}
Transform.prototype = {
	constructor: Transform,
	scale: function(k) {
		return k === 1 ? this : new Transform(this.k * k, this.x, this.y);
	},
	translate: function(x, y) {
		return x === 0 & y === 0 ? this : new Transform(this.k, this.x + this.k * x, this.y + this.k * y);
	},
	apply: function(point) {
		return [point[0] * this.k + this.x, point[1] * this.k + this.y];
	},
	applyX: function(x) {
		return x * this.k + this.x;
	},
	applyY: function(y) {
		return y * this.k + this.y;
	},
	invert: function(location) {
		return [(location[0] - this.x) / this.k, (location[1] - this.y) / this.k];
	},
	invertX: function(x) {
		return (x - this.x) / this.k;
	},
	invertY: function(y) {
		return (y - this.y) / this.k;
	},
	rescaleX: function(x) {
		return x.copy().domain(x.range().map(this.invertX, this).map(x.invert, x));
	},
	rescaleY: function(y) {
		return y.copy().domain(y.range().map(this.invertY, this).map(y.invert, y));
	},
	toString: function() {
		return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
	}
};
var identity$2 = new Transform(1, 0, 0);
transform.prototype = Transform.prototype;
function transform(node) {
	while (!node.__zoom) if (!(node = node.parentNode)) return identity$2;
	return node.__zoom;
}
function nopropagation(event) {
	event.stopImmediatePropagation();
}
function noevent(event) {
	event.preventDefault();
	event.stopImmediatePropagation();
}
function defaultFilter(event) {
	return (!event.ctrlKey || event.type === "wheel") && !event.button;
}
function defaultExtent() {
	var e = this;
	if (e instanceof SVGElement) {
		e = e.ownerSVGElement || e;
		if (e.hasAttribute("viewBox")) {
			e = e.viewBox.baseVal;
			return [[e.x, e.y], [e.x + e.width, e.y + e.height]];
		}
		return [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]];
	}
	return [[0, 0], [e.clientWidth, e.clientHeight]];
}
function defaultTransform() {
	return this.__zoom || identity$2;
}
function defaultWheelDelta(event) {
	return -event.deltaY * (event.deltaMode === 1 ? .05 : event.deltaMode ? 1 : .002) * (event.ctrlKey ? 10 : 1);
}
function defaultTouchable() {
	return navigator.maxTouchPoints || "ontouchstart" in this;
}
function defaultConstrain(transform, extent, translateExtent) {
	var dx0 = transform.invertX(extent[0][0]) - translateExtent[0][0], dx1 = transform.invertX(extent[1][0]) - translateExtent[1][0], dy0 = transform.invertY(extent[0][1]) - translateExtent[0][1], dy1 = transform.invertY(extent[1][1]) - translateExtent[1][1];
	return transform.translate(dx1 > dx0 ? (dx0 + dx1) / 2 : Math.min(0, dx0) || Math.max(0, dx1), dy1 > dy0 ? (dy0 + dy1) / 2 : Math.min(0, dy0) || Math.max(0, dy1));
}
function zoom() {
	var filter = defaultFilter, extent = defaultExtent, constrain = defaultConstrain, wheelDelta = defaultWheelDelta, touchable = defaultTouchable, scaleExtent = [0, Infinity], translateExtent = [[-Infinity, -Infinity], [Infinity, Infinity]], duration = 250, interpolate = zoom$1, listeners = dispatch("start", "zoom", "end"), touchstarting, touchfirst, touchending, touchDelay = 500, wheelDelay = 150, clickDistance2 = 0, tapDistance = 10;
	function zoom(selection) {
		selection.property("__zoom", defaultTransform).on("wheel.zoom", wheeled, { passive: false }).on("mousedown.zoom", mousedowned).on("dblclick.zoom", dblclicked).filter(touchable).on("touchstart.zoom", touchstarted).on("touchmove.zoom", touchmoved).on("touchend.zoom touchcancel.zoom", touchended).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
	}
	zoom.transform = function(collection, transform, point, event) {
		var selection = collection.selection ? collection.selection() : collection;
		selection.property("__zoom", defaultTransform);
		if (collection !== selection) schedule(collection, transform, point, event);
		else selection.interrupt().each(function() {
			gesture(this, arguments).event(event).start().zoom(null, typeof transform === "function" ? transform.apply(this, arguments) : transform).end();
		});
	};
	zoom.scaleBy = function(selection, k, p, event) {
		zoom.scaleTo(selection, function() {
			return this.__zoom.k * (typeof k === "function" ? k.apply(this, arguments) : k);
		}, p, event);
	};
	zoom.scaleTo = function(selection, k, p, event) {
		zoom.transform(selection, function() {
			var e = extent.apply(this, arguments), t0 = this.__zoom, p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p, p1 = t0.invert(p0), k1 = typeof k === "function" ? k.apply(this, arguments) : k;
			return constrain(translate(scale(t0, k1), p0, p1), e, translateExtent);
		}, p, event);
	};
	zoom.translateBy = function(selection, x, y, event) {
		zoom.transform(selection, function() {
			return constrain(this.__zoom.translate(typeof x === "function" ? x.apply(this, arguments) : x, typeof y === "function" ? y.apply(this, arguments) : y), extent.apply(this, arguments), translateExtent);
		}, null, event);
	};
	zoom.translateTo = function(selection, x, y, p, event) {
		zoom.transform(selection, function() {
			var e = extent.apply(this, arguments), t = this.__zoom, p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p;
			return constrain(identity$2.translate(p0[0], p0[1]).scale(t.k).translate(typeof x === "function" ? -x.apply(this, arguments) : -x, typeof y === "function" ? -y.apply(this, arguments) : -y), e, translateExtent);
		}, p, event);
	};
	function scale(transform, k) {
		k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], k));
		return k === transform.k ? transform : new Transform(k, transform.x, transform.y);
	}
	function translate(transform, p0, p1) {
		var x = p0[0] - p1[0] * transform.k, y = p0[1] - p1[1] * transform.k;
		return x === transform.x && y === transform.y ? transform : new Transform(transform.k, x, y);
	}
	function centroid(extent) {
		return [(+extent[0][0] + +extent[1][0]) / 2, (+extent[0][1] + +extent[1][1]) / 2];
	}
	function schedule(transition, transform, point, event) {
		transition.on("start.zoom", function() {
			gesture(this, arguments).event(event).start();
		}).on("interrupt.zoom end.zoom", function() {
			gesture(this, arguments).event(event).end();
		}).tween("zoom", function() {
			var that = this, args = arguments, g = gesture(that, args).event(event), e = extent.apply(that, args), p = point == null ? centroid(e) : typeof point === "function" ? point.apply(that, args) : point, w = Math.max(e[1][0] - e[0][0], e[1][1] - e[0][1]), a = that.__zoom, b = typeof transform === "function" ? transform.apply(that, args) : transform, i = interpolate(a.invert(p).concat(w / a.k), b.invert(p).concat(w / b.k));
			return function(t) {
				if (t === 1) t = b;
				else {
					var l = i(t), k = w / l[2];
					t = new Transform(k, p[0] - l[0] * k, p[1] - l[1] * k);
				}
				g.zoom(null, t);
			};
		});
	}
	function gesture(that, args, clean) {
		return !clean && that.__zooming || new Gesture(that, args);
	}
	function Gesture(that, args) {
		this.that = that;
		this.args = args;
		this.active = 0;
		this.sourceEvent = null;
		this.extent = extent.apply(that, args);
		this.taps = 0;
	}
	Gesture.prototype = {
		event: function(event) {
			if (event) this.sourceEvent = event;
			return this;
		},
		start: function() {
			if (++this.active === 1) {
				this.that.__zooming = this;
				this.emit("start");
			}
			return this;
		},
		zoom: function(key, transform) {
			if (this.mouse && key !== "mouse") this.mouse[1] = transform.invert(this.mouse[0]);
			if (this.touch0 && key !== "touch") this.touch0[1] = transform.invert(this.touch0[0]);
			if (this.touch1 && key !== "touch") this.touch1[1] = transform.invert(this.touch1[0]);
			this.that.__zoom = transform;
			this.emit("zoom");
			return this;
		},
		end: function() {
			if (--this.active === 0) {
				delete this.that.__zooming;
				this.emit("end");
			}
			return this;
		},
		emit: function(type) {
			var d = select(this.that).datum();
			listeners.call(type, this.that, new ZoomEvent(type, {
				sourceEvent: this.sourceEvent,
				target: zoom,
				transform: this.that.__zoom,
				dispatch: listeners
			}), d);
		}
	};
	function wheeled(event, ...args) {
		if (!filter.apply(this, arguments)) return;
		var g = gesture(this, args).event(event), t = this.__zoom, k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], t.k * Math.pow(2, wheelDelta.apply(this, arguments)))), p = pointer(event);
		if (g.wheel) {
			if (g.mouse[0][0] !== p[0] || g.mouse[0][1] !== p[1]) g.mouse[1] = t.invert(g.mouse[0] = p);
			clearTimeout(g.wheel);
		} else if (t.k === k) return;
		else {
			g.mouse = [p, t.invert(p)];
			interrupt(this);
			g.start();
		}
		noevent(event);
		g.wheel = setTimeout(wheelidled, wheelDelay);
		g.zoom("mouse", constrain(translate(scale(t, k), g.mouse[0], g.mouse[1]), g.extent, translateExtent));
		function wheelidled() {
			g.wheel = null;
			g.end();
		}
	}
	function mousedowned(event, ...args) {
		if (touchending || !filter.apply(this, arguments)) return;
		var currentTarget = event.currentTarget, g = gesture(this, args, true).event(event), v = select(event.view).on("mousemove.zoom", mousemoved, true).on("mouseup.zoom", mouseupped, true), p = pointer(event, currentTarget), x0 = event.clientX, y0 = event.clientY;
		nodrag(event.view);
		nopropagation(event);
		g.mouse = [p, this.__zoom.invert(p)];
		interrupt(this);
		g.start();
		function mousemoved(event) {
			noevent(event);
			if (!g.moved) {
				var dx = event.clientX - x0, dy = event.clientY - y0;
				g.moved = dx * dx + dy * dy > clickDistance2;
			}
			g.event(event).zoom("mouse", constrain(translate(g.that.__zoom, g.mouse[0] = pointer(event, currentTarget), g.mouse[1]), g.extent, translateExtent));
		}
		function mouseupped(event) {
			v.on("mousemove.zoom mouseup.zoom", null);
			yesdrag(event.view, g.moved);
			noevent(event);
			g.event(event).end();
		}
	}
	function dblclicked(event, ...args) {
		if (!filter.apply(this, arguments)) return;
		var t0 = this.__zoom, p0 = pointer(event.changedTouches ? event.changedTouches[0] : event, this), p1 = t0.invert(p0), k1 = t0.k * (event.shiftKey ? .5 : 2), t1 = constrain(translate(scale(t0, k1), p0, p1), extent.apply(this, args), translateExtent);
		noevent(event);
		if (duration > 0) select(this).transition().duration(duration).call(schedule, t1, p0, event);
		else select(this).call(zoom.transform, t1, p0, event);
	}
	function touchstarted(event, ...args) {
		if (!filter.apply(this, arguments)) return;
		var touches = event.touches, n = touches.length, g = gesture(this, args, event.changedTouches.length === n).event(event), started, i, t, p;
		nopropagation(event);
		for (i = 0; i < n; ++i) {
			t = touches[i], p = pointer(t, this);
			p = [
				p,
				this.__zoom.invert(p),
				t.identifier
			];
			if (!g.touch0) g.touch0 = p, started = true, g.taps = 1 + !!touchstarting;
			else if (!g.touch1 && g.touch0[2] !== p[2]) g.touch1 = p, g.taps = 0;
		}
		if (touchstarting) touchstarting = clearTimeout(touchstarting);
		if (started) {
			if (g.taps < 2) touchfirst = p[0], touchstarting = setTimeout(function() {
				touchstarting = null;
			}, touchDelay);
			interrupt(this);
			g.start();
		}
	}
	function touchmoved(event, ...args) {
		if (!this.__zooming) return;
		var g = gesture(this, args).event(event), touches = event.changedTouches, n = touches.length, i, t, p, l;
		noevent(event);
		for (i = 0; i < n; ++i) {
			t = touches[i], p = pointer(t, this);
			if (g.touch0 && g.touch0[2] === t.identifier) g.touch0[0] = p;
			else if (g.touch1 && g.touch1[2] === t.identifier) g.touch1[0] = p;
		}
		t = g.that.__zoom;
		if (g.touch1) {
			var p0 = g.touch0[0], l0 = g.touch0[1], p1 = g.touch1[0], l1 = g.touch1[1], dp = (dp = p1[0] - p0[0]) * dp + (dp = p1[1] - p0[1]) * dp, dl = (dl = l1[0] - l0[0]) * dl + (dl = l1[1] - l0[1]) * dl;
			t = scale(t, Math.sqrt(dp / dl));
			p = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];
			l = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2];
		} else if (g.touch0) p = g.touch0[0], l = g.touch0[1];
		else return;
		g.zoom("touch", constrain(translate(t, p, l), g.extent, translateExtent));
	}
	function touchended(event, ...args) {
		if (!this.__zooming) return;
		var g = gesture(this, args).event(event), touches = event.changedTouches, n = touches.length, i, t;
		nopropagation(event);
		if (touchending) clearTimeout(touchending);
		touchending = setTimeout(function() {
			touchending = null;
		}, touchDelay);
		for (i = 0; i < n; ++i) {
			t = touches[i];
			if (g.touch0 && g.touch0[2] === t.identifier) delete g.touch0;
			else if (g.touch1 && g.touch1[2] === t.identifier) delete g.touch1;
		}
		if (g.touch1 && !g.touch0) g.touch0 = g.touch1, delete g.touch1;
		if (g.touch0) g.touch0[1] = this.__zoom.invert(g.touch0[0]);
		else {
			g.end();
			if (g.taps === 2) {
				t = pointer(t, this);
				if (Math.hypot(touchfirst[0] - t[0], touchfirst[1] - t[1]) < tapDistance) {
					var p = select(this).on("dblclick.zoom");
					if (p) p.apply(this, arguments);
				}
			}
		}
	}
	zoom.wheelDelta = function(_) {
		return arguments.length ? (wheelDelta = typeof _ === "function" ? _ : constant(+_), zoom) : wheelDelta;
	};
	zoom.filter = function(_) {
		return arguments.length ? (filter = typeof _ === "function" ? _ : constant(!!_), zoom) : filter;
	};
	zoom.touchable = function(_) {
		return arguments.length ? (touchable = typeof _ === "function" ? _ : constant(!!_), zoom) : touchable;
	};
	zoom.extent = function(_) {
		return arguments.length ? (extent = typeof _ === "function" ? _ : constant([[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]]), zoom) : extent;
	};
	zoom.scaleExtent = function(_) {
		return arguments.length ? (scaleExtent[0] = +_[0], scaleExtent[1] = +_[1], zoom) : [scaleExtent[0], scaleExtent[1]];
	};
	zoom.translateExtent = function(_) {
		return arguments.length ? (translateExtent[0][0] = +_[0][0], translateExtent[1][0] = +_[1][0], translateExtent[0][1] = +_[0][1], translateExtent[1][1] = +_[1][1], zoom) : [[translateExtent[0][0], translateExtent[0][1]], [translateExtent[1][0], translateExtent[1][1]]];
	};
	zoom.constrain = function(_) {
		return arguments.length ? (constrain = _, zoom) : constrain;
	};
	zoom.duration = function(_) {
		return arguments.length ? (duration = +_, zoom) : duration;
	};
	zoom.interpolate = function(_) {
		return arguments.length ? (interpolate = _, zoom) : interpolate;
	};
	zoom.on = function() {
		var value = listeners.on.apply(listeners, arguments);
		return value === listeners ? zoom : value;
	};
	zoom.clickDistance = function(_) {
		return arguments.length ? (clickDistance2 = (_ = +_) * _, zoom) : Math.sqrt(clickDistance2);
	};
	zoom.tapDistance = function(_) {
		return arguments.length ? (tapDistance = +_, zoom) : tapDistance;
	};
	return zoom;
}
// node_modules/@xyflow/system/dist/esm/index.js
var errorMessages = {
	error001: (lib = "react") => `Seems like you have not used ${lib === "svelte" ? "SvelteFlowProvider" : "ReactFlowProvider"} as an ancestor. Help: https://${lib}flow.dev/error#001`,
	error002: () => "It looks like you've created a new nodeTypes or edgeTypes object. If this wasn't on purpose please define the nodeTypes/edgeTypes outside of the component or memoize them.",
	error003: (nodeType) => `Node type "${nodeType}" not found. Using fallback type "default".`,
	error004: () => "The parent container needs a width and a height to render the graph.",
	error005: () => "Only child nodes can use a parent extent.",
	error006: () => "Can't create edge. An edge needs a source and a target.",
	error007: (id) => `The old edge with id=${id} does not exist.`,
	error009: (type) => `Marker type "${type}" doesn't exist.`,
	error008: (handleType, { id, sourceHandle, targetHandle }) => `Couldn't create edge for ${handleType} handle id: "${handleType === "source" ? sourceHandle : targetHandle}", edge id: ${id}.`,
	error010: () => "Handle: No node id found. Make sure to only use a Handle inside a custom Node.",
	error011: (edgeType) => `Edge type "${edgeType}" not found. Using fallback type "default".`,
	error012: (id) => `Node with id "${id}" does not exist, it may have been removed. This can happen when a node is deleted before the "onNodeClick" handler is called.`,
	error013: (lib = "react") => `It seems that you haven't loaded the styles. Please import '@xyflow/${lib}/dist/style.css' or base.css to make sure everything is working properly.`,
	error014: () => "useNodeConnections: No node ID found. Call useNodeConnections inside a custom Node or provide a node ID.",
	error015: () => "It seems that you are trying to drag a node that is not initialized. Please use onNodesChange as explained in the docs.",
	error016: (id) => `Edge with id "${id}" does not exist, it may have been removed. This can happen when an edge is deleted before the "onEdgeClick" handler is called.`
};
var infiniteExtent = [[Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY], [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]];
var elementSelectionKeys = [
	"Enter",
	" ",
	"Escape"
];
var defaultAriaLabelConfig = {
	"node.a11yDescription.default": "Press enter or space to select a node. Press delete to remove it and escape to cancel.",
	"node.a11yDescription.keyboardDisabled": "Press enter or space to select a node. You can then use the arrow keys to move the node around. Press delete to remove it and escape to cancel.",
	"node.a11yDescription.ariaLiveMessage": ({ direction, x, y }) => `Moved selected node ${direction}. New position, x: ${x}, y: ${y}`,
	"edge.a11yDescription.default": "Press enter or space to select an edge. You can then press delete to remove it or escape to cancel.",
	"controls.ariaLabel": "Control Panel",
	"controls.zoomIn.ariaLabel": "Zoom In",
	"controls.zoomOut.ariaLabel": "Zoom Out",
	"controls.fitView.ariaLabel": "Fit View",
	"controls.interactive.ariaLabel": "Toggle Interactivity",
	"minimap.ariaLabel": "Mini Map",
	"handle.ariaLabel": "Handle"
};
/**
* The `ConnectionMode` is used to set the mode of connection between nodes.
* The `Strict` mode is the default one and only allows source to target edges.
* `Loose` mode allows source to source and target to target edges as well.
*
* @public
*/
var ConnectionMode;
(function(ConnectionMode) {
	ConnectionMode["Strict"] = "strict";
	ConnectionMode["Loose"] = "loose";
})(ConnectionMode || (ConnectionMode = {}));
/**
* This enum is used to set the different modes of panning the viewport when the
* user scrolls. The `Free` mode allows the user to pan in any direction by scrolling
* with a device like a trackpad. The `Vertical` and `Horizontal` modes restrict
* scroll panning to only the vertical or horizontal axis, respectively.
*
* @public
*/
var PanOnScrollMode;
(function(PanOnScrollMode) {
	PanOnScrollMode["Free"] = "free";
	PanOnScrollMode["Vertical"] = "vertical";
	PanOnScrollMode["Horizontal"] = "horizontal";
})(PanOnScrollMode || (PanOnScrollMode = {}));
var SelectionMode;
(function(SelectionMode) {
	SelectionMode["Partial"] = "partial";
	SelectionMode["Full"] = "full";
})(SelectionMode || (SelectionMode = {}));
var initialConnection = {
	inProgress: false,
	isValid: null,
	from: null,
	fromHandle: null,
	fromPosition: null,
	fromNode: null,
	to: null,
	toHandle: null,
	toPosition: null,
	toNode: null,
	pointer: null
};
/**
* If you set the `connectionLineType` prop on your [`<ReactFlow />`](/api-reference/react-flow#connection-connectionLineType)
*component, it will dictate the style of connection line rendered when creating
*new edges.
*
* @public
*
* @remarks If you choose to render a custom connection line component, this value will be
*passed to your component as part of its [`ConnectionLineComponentProps`](/api-reference/types/connection-line-component-props).
*/
var ConnectionLineType;
(function(ConnectionLineType) {
	ConnectionLineType["Bezier"] = "default";
	ConnectionLineType["Straight"] = "straight";
	ConnectionLineType["Step"] = "step";
	ConnectionLineType["SmoothStep"] = "smoothstep";
	ConnectionLineType["SimpleBezier"] = "simplebezier";
})(ConnectionLineType || (ConnectionLineType = {}));
/**
* Edges may optionally have a marker on either end. The MarkerType type enumerates
* the options available to you when configuring a given marker.
*
* @public
*/
var MarkerType;
(function(MarkerType) {
	MarkerType["Arrow"] = "arrow";
	MarkerType["ArrowClosed"] = "arrowclosed";
})(MarkerType || (MarkerType = {}));
/**
* While [`PanelPosition`](/api-reference/types/panel-position) can be used to place a
* component in the corners of a container, the `Position` enum is less precise and used
* primarily in relation to edges and handles.
*
* @public
*/
var Position;
(function(Position) {
	Position["Left"] = "left";
	Position["Top"] = "top";
	Position["Right"] = "right";
	Position["Bottom"] = "bottom";
})(Position || (Position = {}));
var oppositePosition = {
	[Position.Left]: Position.Right,
	[Position.Right]: Position.Left,
	[Position.Top]: Position.Bottom,
	[Position.Bottom]: Position.Top
};
/**
* Test whether an object is usable as an Edge
* @public
* @remarks In TypeScript this is a type guard that will narrow the type of whatever you pass in to Edge if it returns true
* @param element - The element to test
* @returns A boolean indicating whether the element is an Edge
*/
var isEdgeBase = (element) => !!element && typeof element === "object" && "id" in element && "source" in element && "target" in element;
/**
* Test whether an object is usable as a Node
* @public
* @remarks In TypeScript this is a type guard that will narrow the type of whatever you pass in to Node if it returns true
* @param element - The element to test
* @returns A boolean indicating whether the element is an Node
*/
var isNodeBase = (element) => !!element && typeof element === "object" && "id" in element && "position" in element && !("source" in element) && !("target" in element);
var isInternalNodeBase = (element) => !!element && typeof element === "object" && "id" in element && "internals" in element && !("source" in element) && !("target" in element);
var getNodePositionWithOrigin = (node, nodeOrigin = [0, 0]) => {
	const { width, height } = getNodeDimensions(node);
	const origin = node.origin ?? nodeOrigin;
	const offsetX = width * origin[0];
	const offsetY = height * origin[1];
	return {
		x: node.position.x - offsetX,
		y: node.position.y - offsetY
	};
};
/**
* Returns the bounding box that contains all the given nodes in an array. This can
* be useful when combined with [`getViewportForBounds`](/api-reference/utils/get-viewport-for-bounds)
* to calculate the correct transform to fit the given nodes in a viewport.
* @public
* @remarks Useful when combined with {@link getViewportForBounds} to calculate the correct transform to fit the given nodes in a viewport.
* @param nodes - Nodes to calculate the bounds for.
* @returns Bounding box enclosing all nodes.
*
* @remarks This function was previously called `getRectOfNodes`
*
* @example
* ```js
*import { getNodesBounds } from '@xyflow/react';
*
*const nodes = [
*  {
*    id: 'a',
*    position: { x: 0, y: 0 },
*    data: { label: 'a' },
*    width: 50,
*    height: 25,
*  },
*  {
*    id: 'b',
*    position: { x: 100, y: 100 },
*    data: { label: 'b' },
*    width: 50,
*    height: 25,
*  },
*];
*
*const bounds = getNodesBounds(nodes);
*```
*/
var getNodesBounds = (nodes, params = { nodeOrigin: [0, 0] }) => {
	if (process.env.NODE_ENV === "development" && !params.nodeLookup) console.warn("Please use `getNodesBounds` from `useReactFlow`/`useSvelteFlow` hook to ensure correct values for sub flows. If not possible, you have to provide a nodeLookup to support sub flows.");
	if (nodes.length === 0) return {
		x: 0,
		y: 0,
		width: 0,
		height: 0
	};
	let hasNode = false;
	const box = nodes.reduce((currBox, nodeOrId) => {
		const isId = typeof nodeOrId === "string";
		let currentNode = !params.nodeLookup && !isId ? nodeOrId : void 0;
		if (params.nodeLookup) currentNode = isId ? params.nodeLookup.get(nodeOrId) : !isInternalNodeBase(nodeOrId) ? params.nodeLookup.get(nodeOrId.id) : nodeOrId;
		if (!currentNode) return currBox;
		hasNode = true;
		return getBoundsOfBoxes(currBox, nodeToBox(currentNode, params.nodeOrigin));
	}, {
		x: Infinity,
		y: Infinity,
		x2: -Infinity,
		y2: -Infinity
	});
	return hasNode ? boxToRect(box) : {
		x: 0,
		y: 0,
		width: 0,
		height: 0
	};
};
/**
* Determines a bounding box that contains all given nodes in an array
* @internal
*/
var getInternalNodesBounds = (nodeLookup, params = {}) => {
	let box = {
		x: Infinity,
		y: Infinity,
		x2: -Infinity,
		y2: -Infinity
	};
	let hasVisibleNodes = false;
	nodeLookup.forEach((node) => {
		if (params.filter === void 0 || params.filter(node)) {
			box = getBoundsOfBoxes(box, nodeToBox(node));
			hasVisibleNodes = true;
		}
	});
	return hasVisibleNodes ? boxToRect(box) : {
		x: 0,
		y: 0,
		width: 0,
		height: 0
	};
};
var getNodesInside = (nodes, rect, [tx, ty, tScale] = [
	0,
	0,
	1
], partially = false, excludeNonSelectableNodes = false) => {
	const paneX = (rect.x - tx) / tScale;
	const paneY = (rect.y - ty) / tScale;
	const paneWidth = rect.width / tScale;
	const paneHeight = rect.height / tScale;
	const visibleNodes = [];
	for (const node of nodes.values()) {
		const { measured, selectable = true, hidden = false } = node;
		if (excludeNonSelectableNodes && !selectable || hidden) continue;
		const width = measured.width ?? node.width ?? node.initialWidth ?? 0;
		const height = measured.height ?? node.height ?? node.initialHeight ?? 0;
		const { x, y } = node.internals.positionAbsolute;
		const overlappingArea = getRectsOverlappingArea(paneX, paneY, paneWidth, paneHeight, x, y, width, height);
		const area = width * height;
		const partiallyVisible = partially && overlappingArea > 0;
		if (!node.internals.handleBounds || partiallyVisible || overlappingArea >= area || node.dragging) visibleNodes.push(node);
	}
	return visibleNodes;
};
/**
* This utility filters an array of edges, keeping only those where either the source or target
* node is present in the given array of nodes.
* @public
* @param nodes - Nodes you want to get the connected edges for.
* @param edges - All edges.
* @returns Array of edges that connect any of the given nodes with each other.
*
* @example
* ```js
*import { getConnectedEdges } from '@xyflow/react';
*
*const nodes = [
*  { id: 'a', position: { x: 0, y: 0 } },
*  { id: 'b', position: { x: 100, y: 0 } },
*];
*
*const edges = [
*  { id: 'a->c', source: 'a', target: 'c' },
*  { id: 'c->d', source: 'c', target: 'd' },
*];
*
*const connectedEdges = getConnectedEdges(nodes, edges);
* // => [{ id: 'a->c', source: 'a', target: 'c' }]
*```
*/
var getConnectedEdges = (nodes, edges) => {
	const nodeIds = /* @__PURE__ */ new Set();
	nodes.forEach((node) => {
		nodeIds.add(node.id);
	});
	return edges.filter((edge) => nodeIds.has(edge.source) || nodeIds.has(edge.target));
};
function getFitViewNodes(nodeLookup, options) {
	const fitViewNodes = /* @__PURE__ */ new Map();
	const optionNodeIds = options?.nodes ? new Set(options.nodes.map((node) => node.id)) : null;
	nodeLookup.forEach((n) => {
		let isVisible;
		if (options?.includeHiddenNodes) {
			const { width, height } = getNodeDimensions(n);
			isVisible = width > 0 && height > 0;
		} else isVisible = Boolean(n.measured.width && n.measured.height && !n.hidden);
		if (isVisible && (!optionNodeIds || optionNodeIds.has(n.id))) fitViewNodes.set(n.id, n);
	});
	return fitViewNodes;
}
async function fitViewport({ nodes, width, height, panZoom, minZoom, maxZoom }, options) {
	if (nodes.size === 0) return true;
	const viewport = getViewportForBounds(getInternalNodesBounds(getFitViewNodes(nodes, options)), width, height, options?.minZoom ?? minZoom, options?.maxZoom ?? maxZoom, options?.padding ?? .1);
	await panZoom.setViewport(viewport, {
		duration: options?.duration,
		ease: options?.ease,
		interpolate: options?.interpolate
	});
	return true;
}
/**
* This function calculates the next position of a node, taking into account the node's extent, parent node, and origin.
*
* @internal
* @returns position, positionAbsolute
*/
function calculateNodePosition({ nodeId, nextPosition, nodeLookup, nodeOrigin = [0, 0], nodeExtent, onError }) {
	const node = nodeLookup.get(nodeId);
	const parentNode = node.parentId ? nodeLookup.get(node.parentId) : void 0;
	const { x: parentX, y: parentY } = parentNode ? parentNode.internals.positionAbsolute : {
		x: 0,
		y: 0
	};
	const origin = node.origin ?? nodeOrigin;
	let extent = node.extent || nodeExtent;
	if (node.extent === "parent" && !node.expandParent) {
		if (!parentNode) onError?.("005", errorMessages["error005"]());
		else {
			const { width: parentWidth, height: parentHeight } = getNodeDimensions(parentNode);
			if (parentWidth && parentHeight) extent = [[parentX, parentY], [parentX + parentWidth, parentY + parentHeight]];
		}
	} else if (parentNode && isCoordinateExtent(node.extent)) extent = [[node.extent[0][0] + parentX, node.extent[0][1] + parentY], [node.extent[1][0] + parentX, node.extent[1][1] + parentY]];
	const positionAbsolute = isCoordinateExtent(extent) ? clampPosition(nextPosition, extent, node.measured) : nextPosition;
	if (node.measured.width === void 0 || node.measured.height === void 0) onError?.("015", errorMessages["error015"]());
	return {
		position: {
			x: positionAbsolute.x - parentX + (node.measured.width ?? 0) * origin[0],
			y: positionAbsolute.y - parentY + (node.measured.height ?? 0) * origin[1]
		},
		positionAbsolute
	};
}
/**
* Pass in nodes & edges to delete, get arrays of nodes and edges that actually can be deleted
* @internal
* @param param.nodesToRemove - The nodes to remove
* @param param.edgesToRemove - The edges to remove
* @param param.nodes - All nodes
* @param param.edges - All edges
* @param param.onBeforeDelete - Callback to check which nodes and edges can be deleted
* @returns nodes: nodes that can be deleted, edges: edges that can be deleted
*/
async function getElementsToRemove({ nodesToRemove = [], edgesToRemove = [], nodes, edges, onBeforeDelete }) {
	const nodeIds = new Set(nodesToRemove.map((node) => node.id));
	const matchingNodes = [];
	for (const node of nodes) {
		if (node.deletable === false) continue;
		const isIncluded = nodeIds.has(node.id);
		const parentHit = !isIncluded && node.parentId && matchingNodes.find((n) => n.id === node.parentId);
		if (isIncluded || parentHit) matchingNodes.push(node);
	}
	const edgeIds = new Set(edgesToRemove.map((edge) => edge.id));
	const deletableEdges = edges.filter((edge) => edge.deletable !== false);
	const matchingEdges = getConnectedEdges(matchingNodes, deletableEdges);
	for (const edge of deletableEdges) if (edgeIds.has(edge.id) && !matchingEdges.find((e) => e.id === edge.id)) matchingEdges.push(edge);
	if (!onBeforeDelete) return {
		edges: matchingEdges,
		nodes: matchingNodes
	};
	const onBeforeDeleteResult = await onBeforeDelete({
		nodes: matchingNodes,
		edges: matchingEdges
	});
	if (typeof onBeforeDeleteResult === "boolean") return onBeforeDeleteResult ? {
		edges: matchingEdges,
		nodes: matchingNodes
	} : {
		edges: [],
		nodes: []
	};
	return onBeforeDeleteResult;
}
var clamp = (val, min = 0, max = 1) => Math.min(Math.max(val, min), max);
var clampPosition = (position = {
	x: 0,
	y: 0
}, extent, dimensions) => ({
	x: clamp(position.x, extent[0][0], extent[1][0] - (dimensions?.width ?? 0)),
	y: clamp(position.y, extent[0][1], extent[1][1] - (dimensions?.height ?? 0))
});
function clampPositionToParent(childPosition, childDimensions, parent) {
	const { width: parentWidth, height: parentHeight } = getNodeDimensions(parent);
	const { x: parentX, y: parentY } = parent.internals.positionAbsolute;
	return clampPosition(childPosition, [[parentX, parentY], [parentX + parentWidth, parentY + parentHeight]], childDimensions);
}
/**
* Calculates the velocity of panning when the mouse is close to the edge of the canvas
* @internal
* @param value - One dimensional poition of the mouse (x or y)
* @param min - Minimal position on canvas before panning starts
* @param max - Maximal position on canvas before panning starts
* @returns - A number between 0 and 1 that represents the velocity of panning
*/
var calcAutoPanVelocity = (value, min, max) => {
	if (value < min) return clamp(Math.abs(value - min), 1, min) / min;
	else if (value > max) return -clamp(Math.abs(value - max), 1, min) / min;
	return 0;
};
var calcAutoPan = (pos, bounds, speed = 15, distance = 40) => {
	return [calcAutoPanVelocity(pos.x, distance, bounds.width - distance) * speed, calcAutoPanVelocity(pos.y, distance, bounds.height - distance) * speed];
};
var getBoundsOfBoxes = (box1, box2) => ({
	x: Math.min(box1.x, box2.x),
	y: Math.min(box1.y, box2.y),
	x2: Math.max(box1.x2, box2.x2),
	y2: Math.max(box1.y2, box2.y2)
});
var rectToBox = ({ x, y, width, height }) => ({
	x,
	y,
	x2: x + width,
	y2: y + height
});
var boxToRect = ({ x, y, x2, y2 }) => ({
	x,
	y,
	width: x2 - x,
	height: y2 - y
});
var nodeToRect = (node, nodeOrigin = [0, 0]) => {
	const { x, y } = isInternalNodeBase(node) ? node.internals.positionAbsolute : getNodePositionWithOrigin(node, nodeOrigin);
	return {
		x,
		y,
		width: node.measured?.width ?? node.width ?? node.initialWidth ?? 0,
		height: node.measured?.height ?? node.height ?? node.initialHeight ?? 0
	};
};
var nodeToBox = (node, nodeOrigin = [0, 0]) => {
	const { x, y } = isInternalNodeBase(node) ? node.internals.positionAbsolute : getNodePositionWithOrigin(node, nodeOrigin);
	return {
		x,
		y,
		x2: x + (node.measured?.width ?? node.width ?? node.initialWidth ?? 0),
		y2: y + (node.measured?.height ?? node.height ?? node.initialHeight ?? 0)
	};
};
var getBoundsOfRects = (rect1, rect2) => boxToRect(getBoundsOfBoxes(rectToBox(rect1), rectToBox(rect2)));
var getRectsOverlappingArea = (aX, aY, aWidth, aHeight, bX, bY, bWidth, bHeight) => {
	const xOverlap = Math.max(0, Math.min(aX + aWidth, bX + bWidth) - Math.max(aX, bX));
	const yOverlap = Math.max(0, Math.min(aY + aHeight, bY + bHeight) - Math.max(aY, bY));
	return Math.ceil(xOverlap * yOverlap);
};
var getOverlappingArea = (rectA, rectB) => getRectsOverlappingArea(rectA.x, rectA.y, rectA.width, rectA.height, rectB.x, rectB.y, rectB.width, rectB.height);
var isRectObject = (obj) => isNumeric(obj.width) && isNumeric(obj.height) && isNumeric(obj.x) && isNumeric(obj.y);
var isNumeric = (n) => !isNaN(n) && isFinite(n);
var createDevWarn = (lib, helpUrl) => (id, message) => {
	if (process.env.NODE_ENV === "development") console.warn(`[${lib}]: ${message} Help: ${helpUrl}error#${id}`);
};
var snapPosition = (position, snapGrid = [1, 1]) => {
	return {
		x: snapGrid[0] * Math.round(position.x / snapGrid[0]),
		y: snapGrid[1] * Math.round(position.y / snapGrid[1])
	};
};
var pointToRendererPoint = ({ x, y }, [tx, ty, tScale], snapToGrid = false, snapGrid = [1, 1]) => {
	const position = {
		x: (x - tx) / tScale,
		y: (y - ty) / tScale
	};
	return snapToGrid ? snapPosition(position, snapGrid) : position;
};
var rendererPointToPoint = ({ x, y }, [tx, ty, tScale]) => {
	return {
		x: x * tScale + tx,
		y: y * tScale + ty
	};
};
/**
* Parses a single padding value to a number
* @internal
* @param padding - Padding to parse
* @param viewport - Width or height of the viewport
* @returns The padding in pixels
*/
function parsePadding(padding, viewport) {
	if (typeof padding === "number") return Math.floor((viewport - viewport / (1 + padding)) * .5);
	if (typeof padding === "string" && padding.endsWith("px")) {
		const paddingValue = parseFloat(padding);
		if (!Number.isNaN(paddingValue)) return Math.floor(paddingValue);
	}
	if (typeof padding === "string" && padding.endsWith("%")) {
		const paddingValue = parseFloat(padding);
		if (!Number.isNaN(paddingValue)) return Math.floor(viewport * paddingValue * .01);
	}
	console.error(`The padding value "${padding}" is invalid. Please provide a number or a string with a valid unit (px or %).`);
	return 0;
}
/**
* Parses the paddings to an object with top, right, bottom, left, x and y paddings
* @internal
* @param padding - Padding to parse
* @param width - Width of the viewport
* @param height - Height of the viewport
* @returns An object with the paddings in pixels
*/
function parsePaddings(padding, width, height) {
	if (typeof padding === "string" || typeof padding === "number") {
		const paddingY = parsePadding(padding, height);
		const paddingX = parsePadding(padding, width);
		return {
			top: paddingY,
			right: paddingX,
			bottom: paddingY,
			left: paddingX,
			x: paddingX * 2,
			y: paddingY * 2
		};
	}
	if (typeof padding === "object") {
		const top = parsePadding(padding.top ?? padding.y ?? 0, height);
		const bottom = parsePadding(padding.bottom ?? padding.y ?? 0, height);
		const left = parsePadding(padding.left ?? padding.x ?? 0, width);
		const right = parsePadding(padding.right ?? padding.x ?? 0, width);
		return {
			top,
			right,
			bottom,
			left,
			x: left + right,
			y: top + bottom
		};
	}
	return {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		x: 0,
		y: 0
	};
}
/**
* Calculates the resulting paddings if the new viewport is applied
* @internal
* @param bounds - Bounds to fit inside viewport
* @param x - X position of the viewport
* @param y - Y position of the viewport
* @param zoom - Zoom level of the viewport
* @param width - Width of the viewport
* @param height - Height of the viewport
* @returns An object with the minimum padding required to fit the bounds inside the viewport
*/
function calculateAppliedPaddings(bounds, x, y, zoom, width, height) {
	const { x: left, y: top } = rendererPointToPoint(bounds, [
		x,
		y,
		zoom
	]);
	const { x: boundRight, y: boundBottom } = rendererPointToPoint({
		x: bounds.x + bounds.width,
		y: bounds.y + bounds.height
	}, [
		x,
		y,
		zoom
	]);
	const right = width - boundRight;
	const bottom = height - boundBottom;
	return {
		left: Math.floor(left),
		top: Math.floor(top),
		right: Math.floor(right),
		bottom: Math.floor(bottom)
	};
}
/**
* Returns a viewport that encloses the given bounds with padding.
* @public
* @remarks You can determine bounds of nodes with {@link getNodesBounds} and {@link getBoundsOfRects}
* @param bounds - Bounds to fit inside viewport.
* @param width - Width of the viewport.
* @param height  - Height of the viewport.
* @param minZoom - Minimum zoom level of the resulting viewport.
* @param maxZoom - Maximum zoom level of the resulting viewport.
* @param padding - Padding around the bounds.
* @returns A transformed {@link Viewport} that encloses the given bounds which you can pass to e.g. {@link setViewport}.
* @example
* const { x, y, zoom } = getViewportForBounds(
* { x: 0, y: 0, width: 100, height: 100},
* 1200, 800, 0.5, 2);
*/
var getViewportForBounds = (bounds, width, height, minZoom, maxZoom, padding) => {
	const p = parsePaddings(padding, width, height);
	const xZoom = (width - p.x) / bounds.width;
	const yZoom = (height - p.y) / bounds.height;
	const clampedZoom = clamp(Math.min(xZoom, yZoom), minZoom, maxZoom);
	const boundsCenterX = bounds.x + bounds.width / 2;
	const boundsCenterY = bounds.y + bounds.height / 2;
	const x = width / 2 - boundsCenterX * clampedZoom;
	const y = height / 2 - boundsCenterY * clampedZoom;
	const newPadding = calculateAppliedPaddings(bounds, x, y, clampedZoom, width, height);
	const offset = {
		left: Math.min(newPadding.left - p.left, 0),
		top: Math.min(newPadding.top - p.top, 0),
		right: Math.min(newPadding.right - p.right, 0),
		bottom: Math.min(newPadding.bottom - p.bottom, 0)
	};
	return {
		x: x - offset.left + offset.right,
		y: y - offset.top + offset.bottom,
		zoom: clampedZoom
	};
};
var isMacOs = () => typeof navigator !== "undefined" && navigator?.userAgent?.indexOf("Mac") >= 0;
function isCoordinateExtent(extent) {
	return extent !== void 0 && extent !== null && extent !== "parent";
}
function getNodeDimensions(node) {
	return {
		width: node.measured?.width ?? node.width ?? node.initialWidth ?? 0,
		height: node.measured?.height ?? node.height ?? node.initialHeight ?? 0
	};
}
function nodeHasDimensions(node) {
	return (node.measured?.width ?? node.width ?? node.initialWidth) !== void 0 && (node.measured?.height ?? node.height ?? node.initialHeight) !== void 0;
}
/**
* Convert child position to absolute position
*
* @internal
* @param position
* @param parentId
* @param nodeLookup
* @param nodeOrigin
* @returns an internal node with an absolute position
*/
function evaluateAbsolutePosition(position, dimensions = {
	width: 0,
	height: 0
}, parentId, nodeLookup, nodeOrigin) {
	const positionAbsolute = { ...position };
	const parent = nodeLookup.get(parentId);
	if (parent) {
		const origin = parent.origin || nodeOrigin;
		positionAbsolute.x += parent.internals.positionAbsolute.x - (dimensions.width ?? 0) * origin[0];
		positionAbsolute.y += parent.internals.positionAbsolute.y - (dimensions.height ?? 0) * origin[1];
	}
	return positionAbsolute;
}
function areSetsEqual(a, b) {
	if (a.size !== b.size) return false;
	for (const item of a) if (!b.has(item)) return false;
	return true;
}
/**
* Polyfill for Promise.withResolvers until we can use it in all browsers
* @internal
*/
function withResolvers() {
	let resolve;
	let reject;
	return {
		promise: new Promise((res, rej) => {
			resolve = res;
			reject = rej;
		}),
		resolve,
		reject
	};
}
function mergeAriaLabelConfig(partial) {
	return {
		...defaultAriaLabelConfig,
		...partial || {}
	};
}
function isAttributionVisible(library) {
	if (typeof document === "undefined") return true;
	const pane = document.querySelector(`.${library}-flow__pane`);
	if (!pane || !pane.isConnected) return true;
	const paneStyle = getComputedStyle(pane);
	if (paneStyle.display === "none") return true;
	if (paneStyle.visibility === "hidden" || paneStyle.visibility === "collapse") return true;
	if (paneStyle.opacity === "0") return true;
	if (paneStyle.width === "0" && paneStyle.height === "0") return true;
	const paneRect = pane.getBoundingClientRect();
	if (paneRect.width === 0 && paneRect.height === 0) return true;
	const attr = document.querySelector(`.${library}-flow__attribution`);
	if (!attr || !attr.isConnected) return false;
	const style = getComputedStyle(attr);
	if (style.display === "none") return false;
	if (style.visibility === "hidden" || style.visibility === "collapse") return false;
	if (style.opacity === "0") return false;
	const rect = attr.getBoundingClientRect();
	if (rect.width === 0 && rect.height === 0) return false;
	return true;
}
var warningDisplayed = false;
function handleAttributionWarning(library) {
	if (warningDisplayed || process.env.NODE_ENV !== "development") return;
	warningDisplayed = true;
	const framework = `${library.charAt(0).toUpperCase() + library.slice(1)} Flow`;
	setTimeout(() => {
		if (!isAttributionVisible(library)) console.warn(`${framework}: It seems like you are hiding the attribution. Please only do this when you are subscribed to ${framework} Pro: https://${library}flow.dev/remove-attr\n%cYou can ignore this warning if you are subscribed.`, "font-style: italic;");
	}, 1e3);
}
function getConnectionStatus(isValid) {
	return isValid === null ? null : isValid ? "valid" : "invalid";
}
function getPointerPosition(event, { snapGrid = [0, 0], snapToGrid = false, transform, containerBounds }) {
	const { x, y } = getEventPosition(event);
	const pointerPos = pointToRendererPoint({
		x: x - (containerBounds?.left ?? 0),
		y: y - (containerBounds?.top ?? 0)
	}, transform);
	const { x: xSnapped, y: ySnapped } = snapToGrid ? snapPosition(pointerPos, snapGrid) : pointerPos;
	return {
		xSnapped,
		ySnapped,
		...pointerPos
	};
}
var getDimensions = (node) => ({
	width: node.offsetWidth,
	height: node.offsetHeight
});
var getHostForElement = (element) => element?.getRootNode?.() || window?.document;
var inputTags = [
	"INPUT",
	"SELECT",
	"TEXTAREA"
];
function isInputDOMNode(event) {
	const target = event.composedPath?.()?.[0] || event.target;
	if (target?.nodeType !== 1) return false;
	return inputTags.includes(target.nodeName) || target.hasAttribute("contenteditable") || !!target.closest(".nokey");
}
var isMouseEvent = (event) => "clientX" in event;
var getEventPosition = (event, bounds) => {
	const isMouse = isMouseEvent(event);
	const evtX = isMouse ? event.clientX : event.touches?.[0].clientX;
	const evtY = isMouse ? event.clientY : event.touches?.[0].clientY;
	return {
		x: evtX - (bounds?.left ?? 0),
		y: evtY - (bounds?.top ?? 0)
	};
};
var getHandleBounds = (type, nodeElement, nodeBounds, zoom, nodeId) => {
	const handles = nodeElement.querySelectorAll(`.${type}`);
	if (!handles || !handles.length) return null;
	return Array.from(handles).map((handle) => {
		const handleBounds = handle.getBoundingClientRect();
		return {
			id: handle.getAttribute("data-handleid"),
			type,
			nodeId,
			position: handle.getAttribute("data-handlepos"),
			x: (handleBounds.left - nodeBounds.left) / zoom,
			y: (handleBounds.top - nodeBounds.top) / zoom,
			...getDimensions(handle)
		};
	});
};
function getBezierEdgeCenter({ sourceX, sourceY, targetX, targetY, sourceControlX, sourceControlY, targetControlX, targetControlY }) {
	const centerX = sourceX * .125 + sourceControlX * .375 + targetControlX * .375 + targetX * .125;
	const centerY = sourceY * .125 + sourceControlY * .375 + targetControlY * .375 + targetY * .125;
	return [
		centerX,
		centerY,
		Math.abs(centerX - sourceX),
		Math.abs(centerY - sourceY)
	];
}
function calculateControlOffset(distance, curvature) {
	if (distance >= 0) return .5 * distance;
	return curvature * 25 * Math.sqrt(-distance);
}
function getControlWithCurvature({ pos, x1, y1, x2, y2, c }) {
	switch (pos) {
		case Position.Left: return [x1 - calculateControlOffset(x1 - x2, c), y1];
		case Position.Right: return [x1 + calculateControlOffset(x2 - x1, c), y1];
		case Position.Top: return [x1, y1 - calculateControlOffset(y1 - y2, c)];
		case Position.Bottom: return [x1, y1 + calculateControlOffset(y2 - y1, c)];
	}
}
/**
* The `getBezierPath` util returns everything you need to render a bezier edge
*between two nodes.
* @public
* @returns A path string you can use in an SVG, the `labelX` and `labelY` position (center of path)
* and `offsetX`, `offsetY` between source handle and label.
* - `path`: the path to use in an SVG `<path>` element.
* - `labelX`: the `x` position you can use to render a label for this edge.
* - `labelY`: the `y` position you can use to render a label for this edge.
* - `offsetX`: the absolute difference between the source `x` position and the `x` position of the
* middle of this path.
* - `offsetY`: the absolute difference between the source `y` position and the `y` position of the
* middle of this path.
* @example
* ```js
*  const source = { x: 0, y: 20 };
*  const target = { x: 150, y: 100 };
*
*  const [path, labelX, labelY, offsetX, offsetY] = getBezierPath({
*    sourceX: source.x,
*    sourceY: source.y,
*    sourcePosition: Position.Right,
*    targetX: target.x,
*    targetY: target.y,
*    targetPosition: Position.Left,
*});
*```
*
* @remarks This function returns a tuple (aka a fixed-size array) to make it easier to
*work with multiple edge paths at once.
*/
function getBezierPath({ sourceX, sourceY, sourcePosition = Position.Bottom, targetX, targetY, targetPosition = Position.Top, curvature = .25 }) {
	const [sourceControlX, sourceControlY] = getControlWithCurvature({
		pos: sourcePosition,
		x1: sourceX,
		y1: sourceY,
		x2: targetX,
		y2: targetY,
		c: curvature
	});
	const [targetControlX, targetControlY] = getControlWithCurvature({
		pos: targetPosition,
		x1: targetX,
		y1: targetY,
		x2: sourceX,
		y2: sourceY,
		c: curvature
	});
	const [labelX, labelY, offsetX, offsetY] = getBezierEdgeCenter({
		sourceX,
		sourceY,
		targetX,
		targetY,
		sourceControlX,
		sourceControlY,
		targetControlX,
		targetControlY
	});
	return [
		`M${sourceX},${sourceY} C${sourceControlX},${sourceControlY} ${targetControlX},${targetControlY} ${targetX},${targetY}`,
		labelX,
		labelY,
		offsetX,
		offsetY
	];
}
function getEdgeCenter({ sourceX, sourceY, targetX, targetY }) {
	const xOffset = Math.abs(targetX - sourceX) / 2;
	const centerX = targetX < sourceX ? targetX + xOffset : targetX - xOffset;
	const yOffset = Math.abs(targetY - sourceY) / 2;
	return [
		centerX,
		targetY < sourceY ? targetY + yOffset : targetY - yOffset,
		xOffset,
		yOffset
	];
}
/**
* Returns the z-index for an edge based on the node it connects and whether it is selected.
* By default, edges are rendered below nodes. This behaviour is different for edges that are
* connected to nodes with a parent, as they are rendered above the parent node.
*/
function getElevatedEdgeZIndex({ sourceNode, targetNode, selected = false, zIndex = 0, elevateOnSelect = false, zIndexMode = "basic" }) {
	if (zIndexMode === "manual") return zIndex;
	return (elevateOnSelect && selected ? zIndex + 1e3 : zIndex) + Math.max(sourceNode.parentId || elevateOnSelect && sourceNode.selected ? sourceNode.internals.z : 0, targetNode.parentId || elevateOnSelect && targetNode.selected ? targetNode.internals.z : 0);
}
function isEdgeVisible({ sourceNode, targetNode, width, height, transform }) {
	const edgeBox = getBoundsOfBoxes(nodeToBox(sourceNode), nodeToBox(targetNode));
	if (edgeBox.x === edgeBox.x2) edgeBox.x2 += 1;
	if (edgeBox.y === edgeBox.y2) edgeBox.y2 += 1;
	return getOverlappingArea({
		x: -transform[0] / transform[2],
		y: -transform[1] / transform[2],
		width: width / transform[2],
		height: height / transform[2]
	}, boxToRect(edgeBox)) > 0;
}
/**
* The default edge ID generator function. Generates an ID based on the source, target, and handles.
* @public
* @param params - The connection or edge to generate an ID for.
* @returns The generated edge ID.
*/
var getEdgeId = ({ source, sourceHandle, target, targetHandle }) => `xy-edge__${source}${sourceHandle || ""}-${target}${targetHandle || ""}`;
var connectionExists = (edge, edges) => {
	return edges.some((el) => el.source === edge.source && el.target === edge.target && (el.sourceHandle === edge.sourceHandle || !el.sourceHandle && !edge.sourceHandle) && (el.targetHandle === edge.targetHandle || !el.targetHandle && !edge.targetHandle));
};
/**
* This util is a convenience function to add a new Edge to an array of edges. It also performs some validation to make sure you don't add an invalid edge or duplicate an existing one.
* @public
* @param edgeParams - Either an `Edge` or a `Connection` you want to add.
* @param edges - The array of all current edges.
* @param options - Optional configuration object.
* @returns A new array of edges with the new edge added.
*
* @remarks If an edge with the same `target` and `source` already exists (and the same
*`targetHandle` and `sourceHandle` if those are set), then this util won't add
*a new edge even if the `id` property is different.
*
*/
var addEdge$1 = (edgeParams, edges, options = {}) => {
	if (!edgeParams.source || !edgeParams.target) {
		options.onError?.("006", errorMessages["error006"]());
		return edges;
	}
	const edgeIdGenerator = options.getEdgeId || getEdgeId;
	let edge;
	if (isEdgeBase(edgeParams)) edge = { ...edgeParams };
	else edge = {
		...edgeParams,
		id: edgeIdGenerator(edgeParams)
	};
	if (connectionExists(edge, edges)) return edges;
	if (edge.sourceHandle === null) delete edge.sourceHandle;
	if (edge.targetHandle === null) delete edge.targetHandle;
	return edges.concat(edge);
};
/**
* Calculates the straight line path between two points.
* @public
* @returns A path string you can use in an SVG, the `labelX` and `labelY` position (center of path)
* and `offsetX`, `offsetY` between source handle and label.
*
* - `path`: the path to use in an SVG `<path>` element.
* - `labelX`: the `x` position you can use to render a label for this edge.
* - `labelY`: the `y` position you can use to render a label for this edge.
* - `offsetX`: the absolute difference between the source `x` position and the `x` position of the
* middle of this path.
* - `offsetY`: the absolute difference between the source `y` position and the `y` position of the
* middle of this path.
* @example
* ```js
*  const source = { x: 0, y: 20 };
*  const target = { x: 150, y: 100 };
*
*  const [path, labelX, labelY, offsetX, offsetY] = getStraightPath({
*    sourceX: source.x,
*    sourceY: source.y,
*    sourcePosition: Position.Right,
*    targetX: target.x,
*    targetY: target.y,
*    targetPosition: Position.Left,
*  });
* ```
* @remarks This function returns a tuple (aka a fixed-size array) to make it easier to work with multiple edge paths at once.
*/
function getStraightPath({ sourceX, sourceY, targetX, targetY }) {
	const [labelX, labelY, offsetX, offsetY] = getEdgeCenter({
		sourceX,
		sourceY,
		targetX,
		targetY
	});
	return [
		`M ${sourceX},${sourceY}L ${targetX},${targetY}`,
		labelX,
		labelY,
		offsetX,
		offsetY
	];
}
var handleDirections = {
	[Position.Left]: {
		x: -1,
		y: 0
	},
	[Position.Right]: {
		x: 1,
		y: 0
	},
	[Position.Top]: {
		x: 0,
		y: -1
	},
	[Position.Bottom]: {
		x: 0,
		y: 1
	}
};
var getDirection = ({ source, sourcePosition = Position.Bottom, target }) => {
	if (sourcePosition === Position.Left || sourcePosition === Position.Right) return source.x < target.x ? {
		x: 1,
		y: 0
	} : {
		x: -1,
		y: 0
	};
	return source.y < target.y ? {
		x: 0,
		y: 1
	} : {
		x: 0,
		y: -1
	};
};
var distance = (a, b) => Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
var isBetween = (a, b, c) => a.x === b.x && b.x === c.x && (b.y - a.y) * (c.y - b.y) >= 0 || a.y === b.y && b.y === c.y && (b.x - a.x) * (c.x - b.x) >= 0;
function getPoints({ source, sourcePosition = Position.Bottom, target, targetPosition = Position.Top, center, offset, stepPosition }) {
	const sourceDir = handleDirections[sourcePosition];
	const targetDir = handleDirections[targetPosition];
	const sourceGapped = {
		x: source.x + sourceDir.x * offset,
		y: source.y + sourceDir.y * offset
	};
	const targetGapped = {
		x: target.x + targetDir.x * offset,
		y: target.y + targetDir.y * offset
	};
	const dir = getDirection({
		source: sourceGapped,
		sourcePosition,
		target: targetGapped
	});
	const dirAccessor = dir.x !== 0 ? "x" : "y";
	const currDir = dir[dirAccessor];
	let points = [];
	let centerX, centerY;
	const sourceGapOffset = {
		x: 0,
		y: 0
	};
	const targetGapOffset = {
		x: 0,
		y: 0
	};
	const [, , defaultOffsetX, defaultOffsetY] = getEdgeCenter({
		sourceX: source.x,
		sourceY: source.y,
		targetX: target.x,
		targetY: target.y
	});
	if (sourceDir[dirAccessor] * targetDir[dirAccessor] === -1) {
		if (dirAccessor === "x") {
			centerX = center.x ?? sourceGapped.x + (targetGapped.x - sourceGapped.x) * stepPosition;
			centerY = center.y ?? (sourceGapped.y + targetGapped.y) / 2;
		} else {
			centerX = center.x ?? (sourceGapped.x + targetGapped.x) / 2;
			centerY = center.y ?? sourceGapped.y + (targetGapped.y - sourceGapped.y) * stepPosition;
		}
		const verticalSplit = [{
			x: centerX,
			y: sourceGapped.y
		}, {
			x: centerX,
			y: targetGapped.y
		}];
		const horizontalSplit = [{
			x: sourceGapped.x,
			y: centerY
		}, {
			x: targetGapped.x,
			y: centerY
		}];
		if (sourceDir[dirAccessor] === currDir) points = dirAccessor === "x" ? verticalSplit : horizontalSplit;
		else points = dirAccessor === "x" ? horizontalSplit : verticalSplit;
	} else {
		const sourceTarget = [{
			x: sourceGapped.x,
			y: targetGapped.y
		}];
		const targetSource = [{
			x: targetGapped.x,
			y: sourceGapped.y
		}];
		if (dirAccessor === "x") points = sourceDir.x === currDir ? targetSource : sourceTarget;
		else points = sourceDir.y === currDir ? sourceTarget : targetSource;
		if (sourcePosition === targetPosition) {
			const diff = Math.abs(source[dirAccessor] - target[dirAccessor]);
			if (diff <= offset) {
				const gapOffset = Math.min(offset - 1, offset - diff);
				if (sourceDir[dirAccessor] === currDir) sourceGapOffset[dirAccessor] = (sourceGapped[dirAccessor] > source[dirAccessor] ? -1 : 1) * gapOffset;
				else targetGapOffset[dirAccessor] = (targetGapped[dirAccessor] > target[dirAccessor] ? -1 : 1) * gapOffset;
			}
		}
		if (sourcePosition !== targetPosition) {
			const dirAccessorOpposite = dirAccessor === "x" ? "y" : "x";
			const isSameDir = sourceDir[dirAccessor] === targetDir[dirAccessorOpposite];
			const sourceGtTargetOppo = sourceGapped[dirAccessorOpposite] > targetGapped[dirAccessorOpposite];
			const sourceLtTargetOppo = sourceGapped[dirAccessorOpposite] < targetGapped[dirAccessorOpposite];
			if (sourceDir[dirAccessor] === 1 && (!isSameDir && sourceGtTargetOppo || isSameDir && sourceLtTargetOppo) || sourceDir[dirAccessor] !== 1 && (!isSameDir && sourceLtTargetOppo || isSameDir && sourceGtTargetOppo)) points = dirAccessor === "x" ? sourceTarget : targetSource;
		}
		const sourceGapPoint = {
			x: sourceGapped.x + sourceGapOffset.x,
			y: sourceGapped.y + sourceGapOffset.y
		};
		const targetGapPoint = {
			x: targetGapped.x + targetGapOffset.x,
			y: targetGapped.y + targetGapOffset.y
		};
		if (Math.max(Math.abs(sourceGapPoint.x - points[0].x), Math.abs(targetGapPoint.x - points[0].x)) >= Math.max(Math.abs(sourceGapPoint.y - points[0].y), Math.abs(targetGapPoint.y - points[0].y))) {
			centerX = (sourceGapPoint.x + targetGapPoint.x) / 2;
			centerY = points[0].y;
		} else {
			centerX = points[0].x;
			centerY = (sourceGapPoint.y + targetGapPoint.y) / 2;
		}
	}
	const gappedSource = {
		x: sourceGapped.x + sourceGapOffset.x,
		y: sourceGapped.y + sourceGapOffset.y
	};
	const gappedTarget = {
		x: targetGapped.x + targetGapOffset.x,
		y: targetGapped.y + targetGapOffset.y
	};
	const pathPoints = [];
	for (const point of [
		source,
		gappedSource,
		...points,
		gappedTarget,
		target
	]) {
		const [a, b] = pathPoints.slice(-2);
		if (b && isBetween(a, b, point)) pathPoints.pop();
		pathPoints.push(point);
	}
	return [
		pathPoints,
		centerX,
		centerY,
		defaultOffsetX,
		defaultOffsetY
	];
}
function getBend(a, b, c, size) {
	const bendSize = Math.min(distance(a, b) / 2, distance(b, c) / 2, size);
	const { x, y } = b;
	if (a.x === x && x === c.x || a.y === y && y === c.y) return `L${x} ${y}`;
	if (a.y === y) {
		const xDir = a.x < c.x ? -1 : 1;
		const yDir = a.y < c.y ? 1 : -1;
		return `L ${x + bendSize * xDir},${y}Q ${x},${y} ${x},${y + bendSize * yDir}`;
	}
	const xDir = a.x < c.x ? 1 : -1;
	return `L ${x},${y + bendSize * (a.y < c.y ? -1 : 1)}Q ${x},${y} ${x + bendSize * xDir},${y}`;
}
/**
* The `getSmoothStepPath` util returns everything you need to render a stepped path
* between two nodes. The `borderRadius` property can be used to choose how rounded
* the corners of those steps are.
* @public
* @returns A path string you can use in an SVG, the `labelX` and `labelY` position (center of path)
* and `offsetX`, `offsetY` between source handle and label.
*
* - `path`: the path to use in an SVG `<path>` element.
* - `labelX`: the `x` position you can use to render a label for this edge.
* - `labelY`: the `y` position you can use to render a label for this edge.
* - `offsetX`: the absolute difference between the source `x` position and the `x` position of the
* middle of this path.
* - `offsetY`: the absolute difference between the source `y` position and the `y` position of the
* middle of this path.
* @example
* ```js
*  const source = { x: 0, y: 20 };
*  const target = { x: 150, y: 100 };
*
*  const [path, labelX, labelY, offsetX, offsetY] = getSmoothStepPath({
*    sourceX: source.x,
*    sourceY: source.y,
*    sourcePosition: Position.Right,
*    targetX: target.x,
*    targetY: target.y,
*    targetPosition: Position.Left,
*  });
* ```
* @remarks This function returns a tuple (aka a fixed-size array) to make it easier to work with multiple edge paths at once.
*/
function getSmoothStepPath({ sourceX, sourceY, sourcePosition = Position.Bottom, targetX, targetY, targetPosition = Position.Top, borderRadius = 5, centerX, centerY, offset = 20, stepPosition = .5 }) {
	const [points, labelX, labelY, offsetX, offsetY] = getPoints({
		source: {
			x: sourceX,
			y: sourceY
		},
		sourcePosition,
		target: {
			x: targetX,
			y: targetY
		},
		targetPosition,
		center: {
			x: centerX,
			y: centerY
		},
		offset,
		stepPosition
	});
	let path = `M${points[0].x} ${points[0].y}`;
	for (let i = 1; i < points.length - 1; i++) path += getBend(points[i - 1], points[i], points[i + 1], borderRadius);
	path += `L${points[points.length - 1].x} ${points[points.length - 1].y}`;
	return [
		path,
		labelX,
		labelY,
		offsetX,
		offsetY
	];
}
function isNodeInitialized(node) {
	return node && !!(node.internals.handleBounds || node.handles?.length) && !!(node.measured.width || node.width || node.initialWidth);
}
function getEdgePosition(params) {
	const { sourceNode, targetNode } = params;
	if (!isNodeInitialized(sourceNode) || !isNodeInitialized(targetNode)) return null;
	const sourceHandleBounds = sourceNode.internals.handleBounds || toHandleBounds(sourceNode.handles);
	const targetHandleBounds = targetNode.internals.handleBounds || toHandleBounds(targetNode.handles);
	const sourceHandle = getHandle$1(sourceHandleBounds?.source ?? [], params.sourceHandle);
	const targetHandle = getHandle$1(params.connectionMode === ConnectionMode.Strict ? targetHandleBounds?.target ?? [] : (targetHandleBounds?.target ?? []).concat(targetHandleBounds?.source ?? []), params.targetHandle);
	if (!sourceHandle || !targetHandle) {
		params.onError?.("008", errorMessages["error008"](!sourceHandle ? "source" : "target", {
			id: params.id,
			sourceHandle: params.sourceHandle,
			targetHandle: params.targetHandle
		}));
		return null;
	}
	const sourcePosition = sourceHandle?.position || Position.Bottom;
	const targetPosition = targetHandle?.position || Position.Top;
	const source = getHandlePosition(sourceNode, sourceHandle, sourcePosition);
	const target = getHandlePosition(targetNode, targetHandle, targetPosition);
	return {
		sourceX: source.x,
		sourceY: source.y,
		targetX: target.x,
		targetY: target.y,
		sourcePosition,
		targetPosition
	};
}
function toHandleBounds(handles) {
	if (!handles) return null;
	const source = [];
	const target = [];
	for (const handle of handles) {
		handle.width = handle.width ?? 1;
		handle.height = handle.height ?? 1;
		if (handle.type === "source") source.push(handle);
		else if (handle.type === "target") target.push(handle);
	}
	return {
		source,
		target
	};
}
function getHandlePosition(node, handle, fallbackPosition = Position.Left, center = false) {
	const x = (handle?.x ?? 0) + node.internals.positionAbsolute.x;
	const y = (handle?.y ?? 0) + node.internals.positionAbsolute.y;
	const { width, height } = handle ?? getNodeDimensions(node);
	if (center) return {
		x: x + width / 2,
		y: y + height / 2
	};
	switch (handle?.position ?? fallbackPosition) {
		case Position.Top: return {
			x: x + width / 2,
			y
		};
		case Position.Right: return {
			x: x + width,
			y: y + height / 2
		};
		case Position.Bottom: return {
			x: x + width / 2,
			y: y + height
		};
		case Position.Left: return {
			x,
			y: y + height / 2
		};
	}
}
function getHandle$1(bounds, handleId) {
	if (!bounds) return null;
	return (!handleId ? bounds[0] : bounds.find((d) => d.id === handleId)) || null;
}
function getMarkerId(marker, id) {
	if (!marker) return "";
	if (typeof marker === "string") return marker;
	return `${id ? `${id}__` : ""}${Object.keys(marker).sort().map((key) => `${key}=${marker[key]}`).join("&")}`;
}
function createMarkerIds(edges, { id, defaultColor, defaultMarkerStart, defaultMarkerEnd }) {
	const ids = /* @__PURE__ */ new Set();
	return edges.reduce((markers, edge) => {
		[edge.markerStart || defaultMarkerStart, edge.markerEnd || defaultMarkerEnd].forEach((marker) => {
			if (marker && typeof marker === "object") {
				const markerId = getMarkerId(marker, id);
				if (!ids.has(markerId)) {
					markers.push({
						id: markerId,
						color: marker.color || defaultColor,
						...marker
					});
					ids.add(markerId);
				}
			}
		});
		return markers;
	}, []).sort((a, b) => a.id.localeCompare(b.id));
}
var SELECTED_NODE_Z = 1e3;
var ROOT_PARENT_Z_INCREMENT = 10;
var defaultOptions = {
	nodeOrigin: [0, 0],
	nodeExtent: infiniteExtent,
	elevateNodesOnSelect: true,
	zIndexMode: "basic",
	defaults: {}
};
var adoptUserNodesDefaultOptions = {
	...defaultOptions,
	checkEquality: true
};
function mergeObjects(base, incoming) {
	const result = { ...base };
	for (const key in incoming) if (incoming[key] !== void 0) result[key] = incoming[key];
	return result;
}
function updateAbsolutePositions(nodeLookup, parentLookup, options) {
	const _options = mergeObjects(defaultOptions, options);
	for (const node of nodeLookup.values()) if (node.parentId) updateChildNode(node, nodeLookup, parentLookup, _options);
	else {
		const clampedPosition = clampPosition(getNodePositionWithOrigin(node, _options.nodeOrigin), isCoordinateExtent(node.extent) ? node.extent : _options.nodeExtent, getNodeDimensions(node));
		node.internals.positionAbsolute = clampedPosition;
	}
}
function parseHandles(userNode, internalNode) {
	if (!userNode.handles) return !userNode.measured ? void 0 : internalNode?.internals.handleBounds;
	const source = [];
	const target = [];
	for (const handle of userNode.handles) {
		const handleBounds = {
			id: handle.id,
			width: handle.width ?? 1,
			height: handle.height ?? 1,
			nodeId: userNode.id,
			x: handle.x,
			y: handle.y,
			position: handle.position,
			type: handle.type
		};
		if (handle.type === "source") source.push(handleBounds);
		else if (handle.type === "target") target.push(handleBounds);
	}
	return {
		source,
		target
	};
}
function isManualZIndexMode(zIndexMode) {
	return zIndexMode === "manual";
}
function adoptUserNodes(nodes, nodeLookup, parentLookup, options = {}) {
	const _options = mergeObjects(adoptUserNodesDefaultOptions, options);
	const rootParentIndex = { i: 0 };
	const tmpLookup = new Map(nodeLookup);
	const selectedNodeZ = _options?.elevateNodesOnSelect && !isManualZIndexMode(_options.zIndexMode) ? SELECTED_NODE_Z : 0;
	let nodesInitialized = nodes.length > 0;
	let hasSelectedNodes = false;
	nodeLookup.clear();
	parentLookup.clear();
	for (const userNode of nodes) {
		let internalNode = tmpLookup.get(userNode.id);
		if (_options.checkEquality && userNode === internalNode?.internals.userNode) nodeLookup.set(userNode.id, internalNode);
		else {
			const clampedPosition = clampPosition(getNodePositionWithOrigin(userNode, _options.nodeOrigin), isCoordinateExtent(userNode.extent) ? userNode.extent : _options.nodeExtent, getNodeDimensions(userNode));
			internalNode = {
				..._options.defaults,
				...userNode,
				measured: {
					width: userNode.measured?.width,
					height: userNode.measured?.height
				},
				internals: {
					positionAbsolute: clampedPosition,
					handleBounds: parseHandles(userNode, internalNode),
					z: calculateZ(userNode, selectedNodeZ, _options.zIndexMode),
					userNode
				}
			};
			nodeLookup.set(userNode.id, internalNode);
		}
		if ((internalNode.measured === void 0 || internalNode.measured.width === void 0 || internalNode.measured.height === void 0) && !internalNode.hidden) nodesInitialized = false;
		if (userNode.parentId) updateChildNode(internalNode, nodeLookup, parentLookup, options, rootParentIndex);
		hasSelectedNodes ||= userNode.selected ?? false;
	}
	return {
		nodesInitialized,
		hasSelectedNodes
	};
}
function updateParentLookup(node, parentLookup) {
	if (!node.parentId) return;
	const childNodes = parentLookup.get(node.parentId);
	if (childNodes) childNodes.set(node.id, node);
	else parentLookup.set(node.parentId, /* @__PURE__ */ new Map([[node.id, node]]));
}
/**
* Updates positionAbsolute and zIndex of a child node and the parentLookup.
*/
function updateChildNode(node, nodeLookup, parentLookup, options, rootParentIndex) {
	const { elevateNodesOnSelect, nodeOrigin, nodeExtent, zIndexMode } = mergeObjects(defaultOptions, options);
	const parentId = node.parentId;
	const parentNode = nodeLookup.get(parentId);
	if (!parentNode) {
		console.warn(`Parent node ${parentId} not found. Please make sure that parent nodes are in front of their child nodes in the nodes array.`);
		return;
	}
	updateParentLookup(node, parentLookup);
	if (rootParentIndex && !parentNode.parentId && parentNode.internals.rootParentIndex === void 0 && zIndexMode === "auto") {
		parentNode.internals.rootParentIndex = ++rootParentIndex.i;
		parentNode.internals.z = parentNode.internals.z + rootParentIndex.i * ROOT_PARENT_Z_INCREMENT;
	}
	if (rootParentIndex && parentNode.internals.rootParentIndex !== void 0) rootParentIndex.i = parentNode.internals.rootParentIndex;
	const { x, y, z } = calculateChildXYZ(node, parentNode, nodeOrigin, nodeExtent, elevateNodesOnSelect && !isManualZIndexMode(zIndexMode) ? SELECTED_NODE_Z : 0, zIndexMode);
	const { positionAbsolute } = node.internals;
	const positionChanged = x !== positionAbsolute.x || y !== positionAbsolute.y;
	if (positionChanged || z !== node.internals.z) nodeLookup.set(node.id, {
		...node,
		internals: {
			...node.internals,
			positionAbsolute: positionChanged ? {
				x,
				y
			} : positionAbsolute,
			z
		}
	});
}
function calculateZ(node, selectedNodeZ, zIndexMode) {
	const zIndex = isNumeric(node.zIndex) ? node.zIndex : 0;
	if (isManualZIndexMode(zIndexMode)) return zIndex;
	return zIndex + (node.selected ? selectedNodeZ : 0);
}
function calculateChildXYZ(childNode, parentNode, nodeOrigin, nodeExtent, selectedNodeZ, zIndexMode) {
	const { x: parentX, y: parentY } = parentNode.internals.positionAbsolute;
	const childDimensions = getNodeDimensions(childNode);
	const positionWithOrigin = getNodePositionWithOrigin(childNode, nodeOrigin);
	const clampedPosition = isCoordinateExtent(childNode.extent) ? clampPosition(positionWithOrigin, childNode.extent, childDimensions) : positionWithOrigin;
	let absolutePosition = clampPosition({
		x: parentX + clampedPosition.x,
		y: parentY + clampedPosition.y
	}, nodeExtent, childDimensions);
	if (childNode.extent === "parent") absolutePosition = clampPositionToParent(absolutePosition, childDimensions, parentNode);
	const childZ = calculateZ(childNode, selectedNodeZ, zIndexMode);
	const parentZ = parentNode.internals.z ?? 0;
	return {
		x: absolutePosition.x,
		y: absolutePosition.y,
		z: parentZ >= childZ ? parentZ + 1 : childZ
	};
}
function handleExpandParent(children, nodeLookup, parentLookup, nodeOrigin = [0, 0]) {
	const changes = [];
	const parentExpansions = /* @__PURE__ */ new Map();
	for (const child of children) {
		const parent = nodeLookup.get(child.parentId);
		if (!parent) continue;
		const expandedRect = getBoundsOfRects(parentExpansions.get(child.parentId)?.expandedRect ?? nodeToRect(parent), child.rect);
		parentExpansions.set(child.parentId, {
			expandedRect,
			parent
		});
	}
	if (parentExpansions.size > 0) parentExpansions.forEach(({ expandedRect, parent }, parentId) => {
		const positionAbsolute = parent.internals.positionAbsolute;
		const dimensions = getNodeDimensions(parent);
		const origin = parent.origin ?? nodeOrigin;
		const xChange = expandedRect.x < positionAbsolute.x ? Math.round(Math.abs(positionAbsolute.x - expandedRect.x)) : 0;
		const yChange = expandedRect.y < positionAbsolute.y ? Math.round(Math.abs(positionAbsolute.y - expandedRect.y)) : 0;
		const newWidth = Math.max(dimensions.width, Math.round(expandedRect.width));
		const newHeight = Math.max(dimensions.height, Math.round(expandedRect.height));
		const widthChange = (newWidth - dimensions.width) * origin[0];
		const heightChange = (newHeight - dimensions.height) * origin[1];
		if (xChange > 0 || yChange > 0 || widthChange || heightChange) {
			changes.push({
				id: parentId,
				type: "position",
				position: {
					x: parent.position.x - xChange + widthChange,
					y: parent.position.y - yChange + heightChange
				}
			});
			parentLookup.get(parentId)?.forEach((childNode) => {
				if (!children.some((child) => child.id === childNode.id)) changes.push({
					id: childNode.id,
					type: "position",
					position: {
						x: childNode.position.x + xChange,
						y: childNode.position.y + yChange
					}
				});
			});
		}
		if (dimensions.width < expandedRect.width || dimensions.height < expandedRect.height || xChange || yChange) changes.push({
			id: parentId,
			type: "dimensions",
			setAttributes: true,
			dimensions: {
				width: newWidth + (xChange ? origin[0] * xChange - widthChange : 0),
				height: newHeight + (yChange ? origin[1] * yChange - heightChange : 0)
			}
		});
	});
	return changes;
}
function updateNodeInternals(updates, nodeLookup, parentLookup, domNode, nodeOrigin, nodeExtent, zIndexMode) {
	const viewportNode = domNode?.querySelector(".xyflow__viewport");
	let updatedInternals = false;
	if (!viewportNode) return {
		changes: [],
		updatedInternals
	};
	const changes = [];
	const style = window.getComputedStyle(viewportNode);
	const { m22: zoom } = new window.DOMMatrixReadOnly(style.transform);
	const parentExpandChildren = [];
	for (const update of updates.values()) {
		const node = nodeLookup.get(update.id);
		if (!node) continue;
		if (node.hidden) {
			nodeLookup.set(node.id, {
				...node,
				internals: {
					...node.internals,
					handleBounds: void 0
				}
			});
			updatedInternals = true;
			continue;
		}
		const dimensions = getDimensions(update.nodeElement);
		const dimensionChanged = node.measured.width !== dimensions.width || node.measured.height !== dimensions.height;
		if (!!(dimensions.width && dimensions.height && (dimensionChanged || !node.internals.handleBounds || update.force))) {
			const nodeBounds = update.nodeElement.getBoundingClientRect();
			const extent = isCoordinateExtent(node.extent) ? node.extent : nodeExtent;
			let { positionAbsolute } = node.internals;
			if (node.parentId && node.extent === "parent") {
				const parentNode = nodeLookup.get(node.parentId);
				if (parentNode) positionAbsolute = clampPositionToParent(positionAbsolute, dimensions, parentNode);
			} else if (extent) positionAbsolute = clampPosition(positionAbsolute, extent, dimensions);
			const newNode = {
				...node,
				measured: dimensions,
				internals: {
					...node.internals,
					positionAbsolute,
					handleBounds: {
						source: getHandleBounds("source", update.nodeElement, nodeBounds, zoom, node.id),
						target: getHandleBounds("target", update.nodeElement, nodeBounds, zoom, node.id)
					}
				}
			};
			nodeLookup.set(node.id, newNode);
			if (node.parentId) updateChildNode(newNode, nodeLookup, parentLookup, {
				nodeOrigin,
				zIndexMode
			});
			updatedInternals = true;
			if (dimensionChanged) {
				changes.push({
					id: node.id,
					type: "dimensions",
					dimensions
				});
				if (node.expandParent && node.parentId) parentExpandChildren.push({
					id: node.id,
					parentId: node.parentId,
					rect: nodeToRect(newNode, nodeOrigin)
				});
			}
		}
	}
	if (parentExpandChildren.length > 0) {
		const parentExpandChanges = handleExpandParent(parentExpandChildren, nodeLookup, parentLookup, nodeOrigin);
		changes.push(...parentExpandChanges);
	}
	return {
		changes,
		updatedInternals
	};
}
async function panBy({ delta, panZoom, transform, translateExtent, width, height }) {
	if (!panZoom || !delta.x && !delta.y) return false;
	const nextViewport = await panZoom.setViewportConstrained({
		x: transform[0] + delta.x,
		y: transform[1] + delta.y,
		zoom: transform[2]
	}, [[0, 0], [width, height]], translateExtent);
	return !!nextViewport && (nextViewport.x !== transform[0] || nextViewport.y !== transform[1] || nextViewport.k !== transform[2]);
}
/**
* this function adds the connection to the connectionLookup
* at the following keys: nodeId-type-handleId, nodeId-type and nodeId
* @param type type of the connection
* @param connection connection that should be added to the lookup
* @param connectionKey at which key the connection should be added
* @param connectionLookup reference to the connection lookup
* @param nodeId nodeId of the connection
* @param handleId handleId of the connection
*/
function addConnectionToLookup(type, connection, connectionKey, connectionLookup, nodeId, handleId) {
	let key = nodeId;
	const nodeMap = connectionLookup.get(key) || /* @__PURE__ */ new Map();
	connectionLookup.set(key, nodeMap.set(connectionKey, connection));
	key = `${nodeId}-${type}`;
	const typeMap = connectionLookup.get(key) || /* @__PURE__ */ new Map();
	connectionLookup.set(key, typeMap.set(connectionKey, connection));
	if (handleId) {
		key = `${nodeId}-${type}-${handleId}`;
		const handleMap = connectionLookup.get(key) || /* @__PURE__ */ new Map();
		connectionLookup.set(key, handleMap.set(connectionKey, connection));
	}
}
function updateConnectionLookup(connectionLookup, edgeLookup, edges) {
	connectionLookup.clear();
	edgeLookup.clear();
	for (const edge of edges) {
		const { source: sourceNode, target: targetNode, sourceHandle = null, targetHandle = null } = edge;
		const connection = {
			edgeId: edge.id,
			source: sourceNode,
			target: targetNode,
			sourceHandle,
			targetHandle
		};
		const sourceKey = `${sourceNode}-${sourceHandle}--${targetNode}-${targetHandle}`;
		addConnectionToLookup("source", connection, `${targetNode}-${targetHandle}--${sourceNode}-${sourceHandle}`, connectionLookup, sourceNode, sourceHandle);
		addConnectionToLookup("target", connection, sourceKey, connectionLookup, targetNode, targetHandle);
		edgeLookup.set(edge.id, edge);
	}
}
function isParentSelected(node, nodeLookup) {
	if (!node.parentId) return false;
	const parentNode = nodeLookup.get(node.parentId);
	if (!parentNode) return false;
	if (parentNode.selected) return true;
	return isParentSelected(parentNode, nodeLookup);
}
function hasSelector(target, selector, domNode) {
	let current = target;
	do {
		if (current?.matches?.(selector)) return true;
		if (current === domNode) return false;
		current = current?.parentElement;
	} while (current);
	return false;
}
function getDragItems(nodeLookup, nodesDraggable, mousePos, nodeId, onlyDragNode) {
	const dragItems = /* @__PURE__ */ new Map();
	for (const [id, node] of nodeLookup) if ((onlyDragNode ? node.id === nodeId : node.selected || node.id === nodeId) && (onlyDragNode || !node.parentId || !isParentSelected(node, nodeLookup)) && (node.draggable || nodesDraggable && typeof node.draggable === "undefined")) {
		const internalNode = nodeLookup.get(id);
		if (internalNode) dragItems.set(id, {
			id,
			position: internalNode.position || {
				x: 0,
				y: 0
			},
			distance: {
				x: mousePos.x - internalNode.internals.positionAbsolute.x,
				y: mousePos.y - internalNode.internals.positionAbsolute.y
			},
			extent: internalNode.extent,
			parentId: internalNode.parentId,
			origin: internalNode.origin,
			expandParent: internalNode.expandParent,
			internals: { positionAbsolute: internalNode.internals.positionAbsolute || {
				x: 0,
				y: 0
			} },
			measured: {
				width: internalNode.measured.width ?? 0,
				height: internalNode.measured.height ?? 0
			}
		});
	}
	return dragItems;
}
function getEventHandlerParams({ nodeId, dragItems, nodeLookup, dragging = true }) {
	const nodesFromDragItems = [];
	for (const [id, dragItem] of dragItems) {
		const node = nodeLookup.get(id)?.internals.userNode;
		if (node) nodesFromDragItems.push({
			...node,
			position: dragItem.position,
			dragging
		});
	}
	if (!nodeId) return [nodesFromDragItems[0], nodesFromDragItems];
	const node = nodeLookup.get(nodeId)?.internals.userNode;
	return [!node ? nodesFromDragItems[0] : {
		...node,
		position: dragItems.get(nodeId)?.position || node.position,
		dragging
	}, nodesFromDragItems];
}
/**
* If a selection is being dragged we want to apply the same snap offset to all nodes in the selection.
* This function calculates the snap offset based on the first node in the selection.
*/
function calculateSnapOffset({ dragItems, snapGrid, x, y }) {
	const refDragItem = dragItems.values().next().value;
	if (!refDragItem) return null;
	const refPos = {
		x: x - refDragItem.distance.x,
		y: y - refDragItem.distance.y
	};
	const refPosSnapped = snapPosition(refPos, snapGrid);
	return {
		x: refPosSnapped.x - refPos.x,
		y: refPosSnapped.y - refPos.y
	};
}
function XYDrag({ onNodeMouseDown, getStoreItems, onDragStart, onDrag, onDragStop }) {
	let lastPos = {
		x: null,
		y: null
	};
	let autoPanId = 0;
	let dragItems = /* @__PURE__ */ new Map();
	let autoPanStarted = false;
	let mousePosition = {
		x: 0,
		y: 0
	};
	let containerBounds = null;
	let dragStarted = false;
	let d3Selection = null;
	let abortDrag = false;
	let nodePositionsChanged = false;
	let dragEvent = null;
	function update({ noDragClassName, handleSelector, domNode, isSelectable, nodeId, nodeClickDistance = 0 }) {
		d3Selection = select(domNode);
		function updateNodes({ x, y }) {
			const { nodeLookup, nodeExtent, snapGrid, snapToGrid, nodeOrigin, onNodeDrag, onSelectionDrag, onError, updateNodePositions } = getStoreItems();
			lastPos = {
				x,
				y
			};
			let hasChange = false;
			const isMultiDrag = dragItems.size > 1;
			const nodesBox = isMultiDrag && nodeExtent ? rectToBox(getInternalNodesBounds(dragItems)) : null;
			const multiDragSnapOffset = isMultiDrag && snapToGrid ? calculateSnapOffset({
				dragItems,
				snapGrid,
				x,
				y
			}) : null;
			for (const [id, dragItem] of dragItems) {
				if (!nodeLookup.has(id)) continue;
				let nextPosition = {
					x: x - dragItem.distance.x,
					y: y - dragItem.distance.y
				};
				if (snapToGrid) nextPosition = multiDragSnapOffset ? {
					x: Math.round(nextPosition.x + multiDragSnapOffset.x),
					y: Math.round(nextPosition.y + multiDragSnapOffset.y)
				} : snapPosition(nextPosition, snapGrid);
				let adjustedNodeExtent = null;
				if (isMultiDrag && nodeExtent && !dragItem.extent && nodesBox) {
					const { positionAbsolute } = dragItem.internals;
					const x1 = positionAbsolute.x - nodesBox.x + nodeExtent[0][0];
					const x2 = positionAbsolute.x + dragItem.measured.width - nodesBox.x2 + nodeExtent[1][0];
					const y1 = positionAbsolute.y - nodesBox.y + nodeExtent[0][1];
					const y2 = positionAbsolute.y + dragItem.measured.height - nodesBox.y2 + nodeExtent[1][1];
					adjustedNodeExtent = [[x1, y1], [x2, y2]];
				}
				const { position, positionAbsolute } = calculateNodePosition({
					nodeId: id,
					nextPosition,
					nodeLookup,
					nodeExtent: adjustedNodeExtent ? adjustedNodeExtent : nodeExtent,
					nodeOrigin,
					onError
				});
				hasChange = hasChange || dragItem.position.x !== position.x || dragItem.position.y !== position.y;
				dragItem.position = position;
				dragItem.internals.positionAbsolute = positionAbsolute;
			}
			nodePositionsChanged = nodePositionsChanged || hasChange;
			if (!hasChange) return;
			updateNodePositions(dragItems, true);
			if (dragEvent && (onDrag || onNodeDrag || !nodeId && onSelectionDrag)) {
				const [currentNode, currentNodes] = getEventHandlerParams({
					nodeId,
					dragItems,
					nodeLookup
				});
				onDrag?.(dragEvent, dragItems, currentNode, currentNodes);
				onNodeDrag?.(dragEvent, currentNode, currentNodes);
				if (!nodeId) onSelectionDrag?.(dragEvent, currentNodes);
			}
		}
		async function autoPan() {
			if (!containerBounds) return;
			const { transform, panBy, autoPanSpeed, autoPanOnNodeDrag } = getStoreItems();
			if (!autoPanOnNodeDrag) {
				autoPanStarted = false;
				cancelAnimationFrame(autoPanId);
				return;
			}
			const [xMovement, yMovement] = calcAutoPan(mousePosition, containerBounds, autoPanSpeed);
			if (xMovement !== 0 || yMovement !== 0) {
				lastPos.x = (lastPos.x ?? 0) - xMovement / transform[2];
				lastPos.y = (lastPos.y ?? 0) - yMovement / transform[2];
				if (await panBy({
					x: xMovement,
					y: yMovement
				})) updateNodes(lastPos);
			}
			autoPanId = requestAnimationFrame(autoPan);
		}
		function startDrag(event) {
			const { nodeLookup, multiSelectionActive, nodesDraggable, transform, snapGrid, snapToGrid, selectNodesOnDrag, onNodeDragStart, onSelectionDragStart, unselectNodesAndEdges } = getStoreItems();
			dragStarted = true;
			const isUnselectedNodeDrag = !!nodeId && !multiSelectionActive && !nodeLookup.get(nodeId)?.selected;
			if ((!selectNodesOnDrag || !isSelectable) && !multiSelectionActive && nodeId) {
				if (!nodeLookup.get(nodeId)?.selected) unselectNodesAndEdges();
			}
			if (isSelectable && selectNodesOnDrag && nodeId) onNodeMouseDown?.(nodeId);
			const pointerPos = getPointerPosition(event.sourceEvent, {
				transform,
				snapGrid,
				snapToGrid,
				containerBounds
			});
			lastPos = pointerPos;
			dragItems = getDragItems(nodeLookup, nodesDraggable, pointerPos, nodeId, isUnselectedNodeDrag);
			if (dragItems.size > 0 && (onDragStart || onNodeDragStart || !nodeId && onSelectionDragStart)) {
				const [currentNode, currentNodes] = getEventHandlerParams({
					nodeId,
					dragItems,
					nodeLookup
				});
				onDragStart?.(event.sourceEvent, dragItems, currentNode, currentNodes);
				onNodeDragStart?.(event.sourceEvent, currentNode, currentNodes);
				if (!nodeId) onSelectionDragStart?.(event.sourceEvent, currentNodes);
			}
		}
		const d3DragInstance = drag().clickDistance(nodeClickDistance).on("start", (event) => {
			const { domNode, nodeDragThreshold, transform, snapGrid, snapToGrid } = getStoreItems();
			containerBounds = domNode?.getBoundingClientRect() || null;
			abortDrag = false;
			nodePositionsChanged = false;
			dragEvent = event.sourceEvent;
			if (nodeDragThreshold === 0) startDrag(event);
			lastPos = getPointerPosition(event.sourceEvent, {
				transform,
				snapGrid,
				snapToGrid,
				containerBounds
			});
			mousePosition = getEventPosition(event.sourceEvent, containerBounds);
		}).on("drag", (event) => {
			const { autoPanOnNodeDrag, transform, snapGrid, snapToGrid, nodeDragThreshold, nodeLookup } = getStoreItems();
			const pointerPos = getPointerPosition(event.sourceEvent, {
				transform,
				snapGrid,
				snapToGrid,
				containerBounds
			});
			dragEvent = event.sourceEvent;
			if (event.sourceEvent.type === "touchmove" && event.sourceEvent.touches.length > 1 || nodeId && !nodeLookup.has(nodeId)) abortDrag = true;
			if (abortDrag) return;
			if (!autoPanStarted && autoPanOnNodeDrag && dragStarted) {
				autoPanStarted = true;
				autoPan();
			}
			if (!dragStarted) {
				const currentMousePosition = getEventPosition(event.sourceEvent, containerBounds);
				const x = currentMousePosition.x - mousePosition.x;
				const y = currentMousePosition.y - mousePosition.y;
				if (Math.sqrt(x * x + y * y) > nodeDragThreshold) startDrag(event);
			}
			if ((lastPos.x !== pointerPos.xSnapped || lastPos.y !== pointerPos.ySnapped) && dragItems && dragStarted) {
				mousePosition = getEventPosition(event.sourceEvent, containerBounds);
				updateNodes(pointerPos);
			}
		}).on("end", (event) => {
			if (!dragStarted || abortDrag) {
				if (abortDrag && dragItems.size > 0) getStoreItems().updateNodePositions(dragItems, false);
				return;
			}
			autoPanStarted = false;
			dragStarted = false;
			cancelAnimationFrame(autoPanId);
			if (dragItems.size > 0) {
				const { nodeLookup, updateNodePositions, onNodeDragStop, onSelectionDragStop } = getStoreItems();
				if (nodePositionsChanged) {
					updateNodePositions(dragItems, false);
					nodePositionsChanged = false;
				}
				if (onDragStop || onNodeDragStop || !nodeId && onSelectionDragStop) {
					const [currentNode, currentNodes] = getEventHandlerParams({
						nodeId,
						dragItems,
						nodeLookup,
						dragging: false
					});
					onDragStop?.(event.sourceEvent, dragItems, currentNode, currentNodes);
					onNodeDragStop?.(event.sourceEvent, currentNode, currentNodes);
					if (!nodeId) onSelectionDragStop?.(event.sourceEvent, currentNodes);
				}
			}
		}).filter((event) => {
			const target = event.target;
			return !event.button && (!noDragClassName || !hasSelector(target, `.${noDragClassName}`, domNode)) && (!handleSelector || hasSelector(target, handleSelector, domNode));
		});
		d3Selection.call(d3DragInstance);
	}
	function destroy() {
		d3Selection?.on(".drag", null);
	}
	return {
		update,
		destroy
	};
}
function getNodesWithinDistance(position, nodeLookup, distance) {
	const nodes = [];
	const rect = {
		x: position.x - distance,
		y: position.y - distance,
		width: distance * 2,
		height: distance * 2
	};
	for (const node of nodeLookup.values()) if (getOverlappingArea(rect, nodeToRect(node)) > 0) nodes.push(node);
	return nodes;
}
var ADDITIONAL_DISTANCE = 250;
function getClosestHandle(position, connectionRadius, nodeLookup, fromHandle) {
	let closestHandles = [];
	let minDistance = Infinity;
	const closeNodes = getNodesWithinDistance(position, nodeLookup, connectionRadius + ADDITIONAL_DISTANCE);
	for (const node of closeNodes) {
		const allHandles = [...node.internals.handleBounds?.source ?? [], ...node.internals.handleBounds?.target ?? []];
		for (const handle of allHandles) {
			if (fromHandle.nodeId === handle.nodeId && fromHandle.type === handle.type && fromHandle.id === handle.id) continue;
			const { x, y } = getHandlePosition(node, handle, handle.position, true);
			const distance = Math.sqrt(Math.pow(x - position.x, 2) + Math.pow(y - position.y, 2));
			if (distance > connectionRadius) continue;
			if (distance < minDistance) {
				closestHandles = [{
					...handle,
					x,
					y
				}];
				minDistance = distance;
			} else if (distance === minDistance) closestHandles.push({
				...handle,
				x,
				y
			});
		}
	}
	if (!closestHandles.length) return null;
	if (closestHandles.length > 1) {
		const oppositeHandleType = fromHandle.type === "source" ? "target" : "source";
		return closestHandles.find((handle) => handle.type === oppositeHandleType) ?? closestHandles[0];
	}
	return closestHandles[0];
}
function getHandle(nodeId, handleType, handleId, nodeLookup, connectionMode, withAbsolutePosition = false) {
	const node = nodeLookup.get(nodeId);
	if (!node) return null;
	const handles = connectionMode === "strict" ? node.internals.handleBounds?.[handleType] : [...node.internals.handleBounds?.source ?? [], ...node.internals.handleBounds?.target ?? []];
	const handle = (handleId ? handles?.find((h) => h.id === handleId) : handles?.[0]) ?? null;
	return handle && withAbsolutePosition ? {
		...handle,
		...getHandlePosition(node, handle, handle.position, true)
	} : handle;
}
function getHandleType(edgeUpdaterType, handleDomNode) {
	if (edgeUpdaterType) return edgeUpdaterType;
	else if (handleDomNode?.classList.contains("target")) return "target";
	else if (handleDomNode?.classList.contains("source")) return "source";
	return null;
}
function isConnectionValid(isInsideConnectionRadius, isHandleValid) {
	let isValid = null;
	if (isHandleValid) isValid = true;
	else if (isInsideConnectionRadius && !isHandleValid) isValid = false;
	return isValid;
}
var alwaysValid = () => true;
function onPointerDown(event, { connectionMode, connectionRadius, handleId, nodeId, edgeUpdaterType, isTarget, domNode, nodeLookup, lib, autoPanOnConnect, flowId, panBy, cancelConnection, onConnectStart, onConnect, onConnectEnd, isValidConnection = alwaysValid, onReconnectEnd, updateConnection, getTransform, getFromHandle, autoPanSpeed, dragThreshold = 1, handleDomNode }) {
	const doc = getHostForElement(event.target);
	let autoPanId = 0;
	let closestHandle;
	const { x, y } = getEventPosition(event);
	const handleType = getHandleType(edgeUpdaterType, handleDomNode);
	const containerBounds = domNode?.getBoundingClientRect();
	let connectionStarted = false;
	if (!containerBounds || !handleType) return;
	const fromHandleInternal = getHandle(nodeId, handleType, handleId, nodeLookup, connectionMode);
	if (!fromHandleInternal) return;
	let position = getEventPosition(event, containerBounds);
	let autoPanStarted = false;
	let connection = null;
	let isValid = false;
	let resultHandleDomNode = null;
	function autoPan() {
		if (!autoPanOnConnect || !containerBounds) return;
		const [x, y] = calcAutoPan(position, containerBounds, autoPanSpeed);
		panBy({
			x,
			y
		});
		autoPanId = requestAnimationFrame(autoPan);
	}
	const fromHandle = {
		...fromHandleInternal,
		nodeId,
		type: handleType,
		position: fromHandleInternal.position
	};
	const fromInternalNode = nodeLookup.get(nodeId);
	let previousConnection = {
		inProgress: true,
		isValid: null,
		from: getHandlePosition(fromInternalNode, fromHandle, Position.Left, true),
		fromHandle,
		fromPosition: fromHandle.position,
		fromNode: fromInternalNode,
		to: position,
		toHandle: null,
		toPosition: oppositePosition[fromHandle.position],
		toNode: null,
		pointer: position
	};
	function startConnection() {
		connectionStarted = true;
		updateConnection(previousConnection);
		onConnectStart?.(event, {
			nodeId,
			handleId,
			handleType
		});
	}
	if (dragThreshold === 0) startConnection();
	function onPointerMove(event) {
		if (!connectionStarted) {
			const { x: evtX, y: evtY } = getEventPosition(event);
			const dx = evtX - x;
			const dy = evtY - y;
			if (!(dx * dx + dy * dy > dragThreshold * dragThreshold)) return;
			startConnection();
		}
		if (!getFromHandle() || !fromHandle) {
			onPointerUp(event);
			return;
		}
		const transform = getTransform();
		position = getEventPosition(event, containerBounds);
		closestHandle = getClosestHandle(pointToRendererPoint(position, transform, false, [1, 1]), connectionRadius, nodeLookup, fromHandle);
		if (!autoPanStarted) {
			autoPan();
			autoPanStarted = true;
		}
		const result = isValidHandle(event, {
			handle: closestHandle,
			connectionMode,
			fromNodeId: nodeId,
			fromHandleId: handleId,
			fromType: isTarget ? "target" : "source",
			isValidConnection,
			doc,
			lib,
			flowId,
			nodeLookup
		});
		resultHandleDomNode = result.handleDomNode;
		connection = result.connection;
		isValid = isConnectionValid(!!closestHandle, result.isValid);
		const fromInternalNode = nodeLookup.get(nodeId);
		const from = fromInternalNode ? getHandlePosition(fromInternalNode, fromHandle, Position.Left, true) : previousConnection.from;
		const newConnection = {
			...previousConnection,
			from,
			isValid,
			to: result.toHandle && isValid ? rendererPointToPoint({
				x: result.toHandle.x,
				y: result.toHandle.y
			}, transform) : position,
			toHandle: result.toHandle,
			toPosition: isValid && result.toHandle ? result.toHandle.position : oppositePosition[fromHandle.position],
			toNode: result.toHandle ? nodeLookup.get(result.toHandle.nodeId) : null,
			pointer: position
		};
		updateConnection(newConnection);
		previousConnection = newConnection;
	}
	function onPointerUp(event) {
		if ("touches" in event && event.touches.length > 0) return;
		if (connectionStarted) {
			if ((closestHandle || resultHandleDomNode) && connection && isValid) onConnect?.(connection);
			const { inProgress, ...connectionState } = previousConnection;
			const finalConnectionState = {
				...connectionState,
				toPosition: previousConnection.toHandle ? previousConnection.toPosition : null
			};
			onConnectEnd?.(event, finalConnectionState);
			if (edgeUpdaterType) onReconnectEnd?.(event, finalConnectionState);
		}
		cancelConnection();
		cancelAnimationFrame(autoPanId);
		autoPanStarted = false;
		isValid = false;
		connection = null;
		resultHandleDomNode = null;
		doc.removeEventListener("mousemove", onPointerMove);
		doc.removeEventListener("mouseup", onPointerUp);
		doc.removeEventListener("touchmove", onPointerMove);
		doc.removeEventListener("touchend", onPointerUp);
	}
	doc.addEventListener("mousemove", onPointerMove);
	doc.addEventListener("mouseup", onPointerUp);
	doc.addEventListener("touchmove", onPointerMove);
	doc.addEventListener("touchend", onPointerUp);
}
function isValidHandle(event, { handle, connectionMode, fromNodeId, fromHandleId, fromType, doc, lib, flowId, isValidConnection = alwaysValid, nodeLookup }) {
	const isTarget = fromType === "target";
	const handleDomNode = handle ? doc.querySelector(`.${lib}-flow__handle[data-id="${flowId}-${handle?.nodeId}-${handle?.id}-${handle?.type}"]`) : null;
	const { x, y } = getEventPosition(event);
	const handleBelow = doc.elementFromPoint(x, y);
	const handleToCheck = handleBelow?.classList.contains(`${lib}-flow__handle`) ? handleBelow : handleDomNode;
	const result = {
		handleDomNode: handleToCheck,
		isValid: false,
		connection: null,
		toHandle: null
	};
	if (handleToCheck) {
		const handleType = getHandleType(void 0, handleToCheck);
		const handleNodeId = handleToCheck.getAttribute("data-nodeid");
		const handleId = handleToCheck.getAttribute("data-handleid");
		const connectable = handleToCheck.classList.contains("connectable");
		const connectableEnd = handleToCheck.classList.contains("connectableend");
		if (!handleNodeId || !handleType) return result;
		const connection = {
			source: isTarget ? handleNodeId : fromNodeId,
			sourceHandle: isTarget ? handleId : fromHandleId,
			target: isTarget ? fromNodeId : handleNodeId,
			targetHandle: isTarget ? fromHandleId : handleId
		};
		result.connection = connection;
		result.isValid = connectable && connectableEnd && (connectionMode === ConnectionMode.Strict ? isTarget && handleType === "source" || !isTarget && handleType === "target" : handleNodeId !== fromNodeId || handleId !== fromHandleId) && isValidConnection(connection);
		result.toHandle = getHandle(handleNodeId, handleType, handleId, nodeLookup, connectionMode, true);
	}
	return result;
}
var XYHandle = {
	onPointerDown,
	isValid: isValidHandle
};
function XYMinimap({ domNode, panZoom, getTransform, getViewScale }) {
	const selection = select(domNode);
	function update({ translateExtent, width, height, zoomStep = 1, pannable = true, zoomable = true, inversePan = false }) {
		const zoomHandler = (event) => {
			if (event.sourceEvent.type !== "wheel" || !panZoom) return;
			const transform = getTransform();
			const factor = event.sourceEvent.ctrlKey && isMacOs() ? 10 : 1;
			const pinchDelta = -event.sourceEvent.deltaY * (event.sourceEvent.deltaMode === 1 ? .05 : event.sourceEvent.deltaMode ? 1 : .002) * zoomStep;
			const nextZoom = transform[2] * Math.pow(2, pinchDelta * factor);
			panZoom.scaleTo(nextZoom);
		};
		let panStart = [0, 0];
		const panStartHandler = (event) => {
			if (event.sourceEvent.type === "mousedown" || event.sourceEvent.type === "touchstart") panStart = [event.sourceEvent.clientX ?? event.sourceEvent.touches[0].clientX, event.sourceEvent.clientY ?? event.sourceEvent.touches[0].clientY];
		};
		const panHandler = (event) => {
			const transform = getTransform();
			if (event.sourceEvent.type !== "mousemove" && event.sourceEvent.type !== "touchmove" || !panZoom) return;
			const panCurrent = [event.sourceEvent.clientX ?? event.sourceEvent.touches[0].clientX, event.sourceEvent.clientY ?? event.sourceEvent.touches[0].clientY];
			const panDelta = [panCurrent[0] - panStart[0], panCurrent[1] - panStart[1]];
			panStart = panCurrent;
			const moveScale = getViewScale() * Math.max(transform[2], Math.log(transform[2])) * (inversePan ? -1 : 1);
			const position = {
				x: transform[0] - panDelta[0] * moveScale,
				y: transform[1] - panDelta[1] * moveScale
			};
			const extent = [[0, 0], [width, height]];
			panZoom.setViewportConstrained({
				x: position.x,
				y: position.y,
				zoom: transform[2]
			}, extent, translateExtent);
		};
		const zoomAndPanHandler = zoom().on("start", panStartHandler).on("zoom", pannable ? panHandler : null).on("zoom.wheel", zoomable ? zoomHandler : null);
		selection.call(zoomAndPanHandler, {});
	}
	function destroy() {
		selection.on("zoom", null);
	}
	return {
		update,
		destroy,
		pointer
	};
}
var transformToViewport = (transform) => ({
	x: transform.x,
	y: transform.y,
	zoom: transform.k
});
var viewportToTransform = ({ x, y, zoom }) => identity$2.translate(x, y).scale(zoom);
var isWrappedWithClass = (event, className) => event.target.closest(`.${className}`);
var isRightClickPan = (panOnDrag, usedButton) => usedButton === 2 && Array.isArray(panOnDrag) && panOnDrag.includes(2);
var defaultEase = (t) => ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
var getD3Transition = (selection, duration = 0, ease = defaultEase, onEnd = () => {}) => {
	const hasDuration = typeof duration === "number" && duration > 0;
	if (!hasDuration) onEnd();
	return hasDuration ? selection.transition().duration(duration).ease(ease).on("end", onEnd) : selection;
};
var wheelDelta = (event) => {
	const factor = event.ctrlKey && isMacOs() ? 10 : 1;
	return -event.deltaY * (event.deltaMode === 1 ? .05 : event.deltaMode ? 1 : .002) * factor;
};
function createPanOnScrollHandler({ zoomPanValues, noWheelClassName, d3Selection, d3Zoom, panOnScrollMode, panOnScrollSpeed, zoomOnPinch, onPanZoomStart, onPanZoom, onPanZoomEnd }) {
	return (event) => {
		if (isWrappedWithClass(event, noWheelClassName)) {
			if (event.ctrlKey) event.preventDefault();
			return false;
		}
		event.preventDefault();
		event.stopImmediatePropagation();
		const currentZoom = d3Selection.property("__zoom").k || 1;
		if (event.ctrlKey && zoomOnPinch) {
			const point = pointer(event);
			const pinchDelta = wheelDelta(event);
			const zoom = currentZoom * Math.pow(2, pinchDelta);
			d3Zoom.scaleTo(d3Selection, zoom, point, event);
			return;
		}
		const deltaNormalize = event.deltaMode === 1 ? 20 : 1;
		let deltaX = panOnScrollMode === PanOnScrollMode.Vertical ? 0 : event.deltaX * deltaNormalize;
		let deltaY = panOnScrollMode === PanOnScrollMode.Horizontal ? 0 : event.deltaY * deltaNormalize;
		if (!isMacOs() && event.shiftKey && panOnScrollMode !== PanOnScrollMode.Vertical) {
			deltaX = event.deltaY * deltaNormalize;
			deltaY = 0;
		}
		d3Zoom.translateBy(d3Selection, -(deltaX / currentZoom) * panOnScrollSpeed, -(deltaY / currentZoom) * panOnScrollSpeed, { internal: true });
		const nextViewport = transformToViewport(d3Selection.property("__zoom"));
		clearTimeout(zoomPanValues.panScrollTimeout);
		if (!zoomPanValues.isPanScrolling) {
			zoomPanValues.isPanScrolling = true;
			onPanZoomStart?.(event, nextViewport);
		} else onPanZoom?.(event, nextViewport);
		zoomPanValues.panScrollTimeout = setTimeout(() => {
			onPanZoomEnd?.(event, nextViewport);
			zoomPanValues.isPanScrolling = false;
		}, 150);
	};
}
function createZoomOnScrollHandler({ noWheelClassName, preventScrolling, d3ZoomHandler }) {
	return function(event, d) {
		const isWheel = event.type === "wheel";
		const preventZoom = !preventScrolling && isWheel && !event.ctrlKey;
		const hasNoWheelClass = isWrappedWithClass(event, noWheelClassName);
		if (event.ctrlKey && isWheel && hasNoWheelClass) event.preventDefault();
		if (preventZoom || hasNoWheelClass) return null;
		event.preventDefault();
		d3ZoomHandler.call(this, event, d);
	};
}
function createPanZoomStartHandler({ zoomPanValues, onDraggingChange, onPanZoomStart }) {
	return (event) => {
		if (event.sourceEvent?.internal) return;
		const viewport = transformToViewport(event.transform);
		zoomPanValues.mouseButton = event.sourceEvent?.button || 0;
		zoomPanValues.isZoomingOrPanning = true;
		zoomPanValues.prevViewport = viewport;
		if (event.sourceEvent?.type === "mousedown") onDraggingChange(true);
		if (onPanZoomStart) onPanZoomStart?.(event.sourceEvent, viewport);
	};
}
function createPanZoomHandler({ zoomPanValues, panOnDrag, onPaneContextMenu, onTransformChange, onPanZoom }) {
	return (event) => {
		zoomPanValues.usedRightMouseButton = !!(onPaneContextMenu && isRightClickPan(panOnDrag, zoomPanValues.mouseButton ?? 0));
		if (!event.sourceEvent?.sync) onTransformChange([
			event.transform.x,
			event.transform.y,
			event.transform.k
		]);
		if (onPanZoom && !event.sourceEvent?.internal) onPanZoom?.(event.sourceEvent, transformToViewport(event.transform));
	};
}
function createPanZoomEndHandler({ zoomPanValues, panOnDrag, panOnScroll, onDraggingChange, onPanZoomEnd, onPaneContextMenu }) {
	return (event) => {
		if (event.sourceEvent?.internal) return;
		zoomPanValues.isZoomingOrPanning = false;
		if (onPaneContextMenu && isRightClickPan(panOnDrag, zoomPanValues.mouseButton ?? 0) && !zoomPanValues.usedRightMouseButton && event.sourceEvent) onPaneContextMenu(event.sourceEvent);
		zoomPanValues.usedRightMouseButton = false;
		onDraggingChange(false);
		if (onPanZoomEnd) {
			const viewport = transformToViewport(event.transform);
			zoomPanValues.prevViewport = viewport;
			clearTimeout(zoomPanValues.timerId);
			zoomPanValues.timerId = setTimeout(() => {
				onPanZoomEnd?.(event.sourceEvent, viewport);
			}, panOnScroll ? 150 : 0);
		}
	};
}
function createFilter({ panActivationKeyPressed, zoomActivationKeyPressed, zoomOnScroll, zoomOnPinch, panOnDrag, panOnScroll, zoomOnDoubleClick, userSelectionActive, noWheelClassName, noPanClassName, lib, connectionInProgress }) {
	return (event) => {
		const zoomScroll = zoomActivationKeyPressed || zoomOnScroll;
		const pinchZoom = zoomOnPinch && event.ctrlKey;
		const isWheelEvent = event.type === "wheel";
		if (event.button === 1 && event.type === "mousedown" && (isWrappedWithClass(event, `${lib}-flow__node`) || isWrappedWithClass(event, `${lib}-flow__edge`) || isWrappedWithClass(event, `${lib}-flow__selection`) || isWrappedWithClass(event, `${lib}-flow__nodesselection`))) return true;
		if (!panOnDrag && !zoomScroll && !panOnScroll && !zoomOnDoubleClick && !zoomOnPinch) return false;
		if (userSelectionActive) return false;
		if (connectionInProgress && !isWheelEvent) return false;
		if (isWrappedWithClass(event, noWheelClassName) && isWheelEvent) return false;
		if (isWrappedWithClass(event, noPanClassName) && (!isWheelEvent || panOnScroll && isWheelEvent && !zoomActivationKeyPressed)) return false;
		if (!zoomOnPinch && event.ctrlKey && isWheelEvent) return false;
		if (!zoomOnPinch && event.type === "touchstart" && event.touches?.length > 1) {
			event.preventDefault();
			return false;
		}
		if (!zoomScroll && !panOnScroll && !pinchZoom && isWheelEvent) return false;
		if (!panOnDrag && (event.type === "mousedown" || event.type === "touchstart")) return false;
		if (Array.isArray(panOnDrag) && !panOnDrag.includes(event.button) && event.type === "mousedown") return false;
		const buttonAllowed = Array.isArray(panOnDrag) && panOnDrag.includes(event.button) || !event.button || event.button <= 1;
		return (!event.ctrlKey || isWheelEvent || panActivationKeyPressed) && buttonAllowed;
	};
}
function XYPanZoom({ domNode, minZoom, maxZoom, translateExtent, viewport, onPanZoom, onPanZoomStart, onPanZoomEnd, onDraggingChange }) {
	const zoomPanValues = {
		isZoomingOrPanning: false,
		usedRightMouseButton: false,
		prevViewport: {},
		mouseButton: 0,
		timerId: void 0,
		panScrollTimeout: void 0,
		isPanScrolling: false
	};
	const bbox = domNode.getBoundingClientRect();
	let cachedExtent = [[0, 0], [bbox.width, bbox.height]];
	const extentResizeObserver = typeof ResizeObserver !== "undefined" ? new ResizeObserver((entries) => {
		const entry = entries[0];
		if (entry?.contentRect) cachedExtent = [[0, 0], [entry.contentRect.width, entry.contentRect.height]];
	}) : null;
	extentResizeObserver?.observe(domNode);
	const d3ZoomInstance = zoom().extent(() => cachedExtent).scaleExtent([minZoom, maxZoom]).translateExtent(translateExtent);
	const d3Selection = select(domNode).call(d3ZoomInstance);
	setViewportConstrained({
		x: viewport.x,
		y: viewport.y,
		zoom: clamp(viewport.zoom, minZoom, maxZoom)
	}, [[0, 0], [bbox.width, bbox.height]], translateExtent);
	const d3ZoomHandler = d3Selection.on("wheel.zoom");
	const d3DblClickZoomHandler = d3Selection.on("dblclick.zoom");
	d3ZoomInstance.wheelDelta(wheelDelta);
	async function setTransform(transform, options) {
		if (d3Selection) return new Promise((resolve) => {
			d3ZoomInstance?.interpolate(options?.interpolate === "linear" ? value : zoom$1).transform(getD3Transition(d3Selection, options?.duration, options?.ease, () => resolve(true)), transform);
		});
		return false;
	}
	function update({ noWheelClassName, noPanClassName, onPaneContextMenu, userSelectionActive, panOnScroll, panOnDrag, panOnScrollMode, panOnScrollSpeed, preventScrolling, zoomOnPinch, zoomOnScroll, zoomOnDoubleClick, panActivationKeyPressed = false, zoomActivationKeyPressed, lib, onTransformChange, connectionInProgress, paneClickDistance, selectionOnDrag }) {
		if (userSelectionActive && !zoomPanValues.isZoomingOrPanning) d3ZoomInstance.on("zoom", null);
		const isPanOnScroll = panOnScroll && !zoomActivationKeyPressed && !userSelectionActive;
		d3ZoomInstance.clickDistance(selectionOnDrag ? Infinity : !isNumeric(paneClickDistance) || paneClickDistance < 0 ? 0 : paneClickDistance);
		const wheelHandler = isPanOnScroll ? createPanOnScrollHandler({
			zoomPanValues,
			noWheelClassName,
			d3Selection,
			d3Zoom: d3ZoomInstance,
			panOnScrollMode,
			panOnScrollSpeed,
			zoomOnPinch,
			onPanZoomStart,
			onPanZoom,
			onPanZoomEnd
		}) : createZoomOnScrollHandler({
			noWheelClassName,
			preventScrolling,
			d3ZoomHandler
		});
		d3Selection.on("wheel.zoom", wheelHandler, { passive: false });
		const startHandler = createPanZoomStartHandler({
			zoomPanValues,
			onDraggingChange,
			onPanZoomStart
		});
		d3ZoomInstance.on("start", startHandler);
		const panZoomHandler = createPanZoomHandler({
			zoomPanValues,
			panOnDrag,
			onPaneContextMenu: !!onPaneContextMenu,
			onPanZoom,
			onTransformChange
		});
		d3ZoomInstance.on("zoom", panZoomHandler);
		const panZoomEndHandler = createPanZoomEndHandler({
			zoomPanValues,
			panOnDrag,
			panOnScroll,
			onPaneContextMenu,
			onPanZoomEnd,
			onDraggingChange
		});
		d3ZoomInstance.on("end", panZoomEndHandler);
		const filter = createFilter({
			panActivationKeyPressed,
			zoomActivationKeyPressed,
			panOnDrag,
			zoomOnScroll,
			panOnScroll,
			zoomOnDoubleClick,
			zoomOnPinch,
			userSelectionActive,
			noPanClassName,
			noWheelClassName,
			lib,
			connectionInProgress
		});
		d3ZoomInstance.filter(filter);
		if (zoomOnDoubleClick) d3Selection.on("dblclick.zoom", d3DblClickZoomHandler);
		else d3Selection.on("dblclick.zoom", null);
	}
	function destroy() {
		d3ZoomInstance.on("zoom", null);
		extentResizeObserver?.disconnect();
	}
	async function setViewportConstrained(viewport, extent, translateExtent) {
		const nextTransform = viewportToTransform(viewport);
		const contrainedTransform = d3ZoomInstance?.constrain()(nextTransform, extent, translateExtent);
		if (contrainedTransform) await setTransform(contrainedTransform);
		return contrainedTransform;
	}
	async function setViewport(viewport, options) {
		const nextTransform = viewportToTransform(viewport);
		await setTransform(nextTransform, options);
		return nextTransform;
	}
	function syncViewport(viewport) {
		if (d3Selection) {
			const nextTransform = viewportToTransform(viewport);
			const currentTransform = d3Selection.property("__zoom");
			if (currentTransform.k !== viewport.zoom || currentTransform.x !== viewport.x || currentTransform.y !== viewport.y) d3ZoomInstance?.transform(d3Selection, nextTransform, null, { sync: true });
		}
	}
	function getViewport() {
		const transform$1 = d3Selection ? transform(d3Selection.node()) : {
			x: 0,
			y: 0,
			k: 1
		};
		return {
			x: transform$1.x,
			y: transform$1.y,
			zoom: transform$1.k
		};
	}
	async function scaleTo(zoom, options) {
		if (d3Selection) return new Promise((resolve) => {
			d3ZoomInstance?.interpolate(options?.interpolate === "linear" ? value : zoom$1).scaleTo(getD3Transition(d3Selection, options?.duration, options?.ease, () => resolve(true)), zoom);
		});
		return false;
	}
	async function scaleBy(factor, options) {
		if (d3Selection) return new Promise((resolve) => {
			d3ZoomInstance?.interpolate(options?.interpolate === "linear" ? value : zoom$1).scaleBy(getD3Transition(d3Selection, options?.duration, options?.ease, () => resolve(true)), factor);
		});
		return false;
	}
	function setScaleExtent(scaleExtent) {
		d3ZoomInstance?.scaleExtent(scaleExtent);
	}
	function setTranslateExtent(translateExtent) {
		d3ZoomInstance?.translateExtent(translateExtent);
	}
	function setClickDistance(distance) {
		const validDistance = !isNumeric(distance) || distance < 0 ? 0 : distance;
		d3ZoomInstance?.clickDistance(validDistance);
	}
	return {
		update,
		destroy,
		setViewport,
		setViewportConstrained,
		getViewport,
		scaleTo,
		scaleBy,
		setScaleExtent,
		setTranslateExtent,
		syncViewport,
		setClickDistance
	};
}
/**
* Used to determine the variant of the resize control
*
* @public
*/
var ResizeControlVariant;
(function(ResizeControlVariant) {
	ResizeControlVariant["Line"] = "line";
	ResizeControlVariant["Handle"] = "handle";
})(ResizeControlVariant || (ResizeControlVariant = {}));
/**
* Get all connecting edges for a given set of nodes
* @param width - new width of the node
* @param prevWidth - previous width of the node
* @param height - new height of the node
* @param prevHeight - previous height of the node
* @param affectsX - whether to invert the resize direction for the x axis
* @param affectsY - whether to invert the resize direction for the y axis
* @returns array of two numbers representing the direction of the resize for each axis, 0 = no change, 1 = increase, -1 = decrease
*/
function getResizeDirection({ width, prevWidth, height, prevHeight, affectsX, affectsY }) {
	const deltaWidth = width - prevWidth;
	const deltaHeight = height - prevHeight;
	const direction = [deltaWidth > 0 ? 1 : deltaWidth < 0 ? -1 : 0, deltaHeight > 0 ? 1 : deltaHeight < 0 ? -1 : 0];
	if (deltaWidth && affectsX) direction[0] = direction[0] * -1;
	if (deltaHeight && affectsY) direction[1] = direction[1] * -1;
	return direction;
}
/**
* Parses the control position that is being dragged to dimensions that are being resized
* @param controlPosition - position of the control that is being dragged
* @returns isHorizontal, isVertical, affectsX, affectsY,
*/
function getControlDirection(controlPosition) {
	return {
		isHorizontal: controlPosition.includes("right") || controlPosition.includes("left"),
		isVertical: controlPosition.includes("bottom") || controlPosition.includes("top"),
		affectsX: controlPosition.includes("left"),
		affectsY: controlPosition.includes("top")
	};
}
function getLowerExtentClamp(lowerExtent, lowerBound) {
	return Math.max(0, lowerBound - lowerExtent);
}
function getUpperExtentClamp(upperExtent, upperBound) {
	return Math.max(0, upperExtent - upperBound);
}
function getSizeClamp(size, minSize, maxSize) {
	return Math.max(0, minSize - size, size - maxSize);
}
function xor(a, b) {
	return a ? !b : b;
}
/**
* Calculates new width & height and x & y of node after resize based on pointer position
* @description - Buckle up, this is a chunky one... If you want to determine the new dimensions of a node after a resize,
* you have to account for all possible restrictions: min/max width/height of the node, the maximum extent the node is allowed
* to move in (in this case: resize into) determined by the parent node, the minimal extent determined by child nodes
* with expandParent or extent: 'parent' set and oh yeah, these things also have to work with keepAspectRatio!
* The way this is done is by determining how much each of these restricting actually restricts the resize and then applying the
* strongest restriction. Because the resize affects x, y and width, height and width, height of a opposing side with keepAspectRatio,
* the resize amount is always kept in distX & distY amount (the distance in mouse movement)
* Instead of clamping each value, we first calculate the biggest 'clamp' (for the lack of a better name) and then apply it to all values.
* To complicate things nodeOrigin has to be taken into account as well. This is done by offsetting the nodes as if their origin is [0, 0],
* then calculating the restrictions as usual
* @param startValues - starting values of resize
* @param controlDirection - dimensions affected by the resize
* @param pointerPosition - the current pointer position corrected for snapping
* @param boundaries - minimum and maximum dimensions of the node
* @param keepAspectRatio - prevent changes of asprect ratio
* @returns x, y, width and height of the node after resize
*/
function getDimensionsAfterResize(startValues, controlDirection, pointerPosition, boundaries, keepAspectRatio, nodeOrigin, extent, childExtent) {
	let { affectsX, affectsY } = controlDirection;
	const { isHorizontal, isVertical } = controlDirection;
	const isDiagonal = isHorizontal && isVertical;
	const { xSnapped, ySnapped } = pointerPosition;
	const { minWidth, maxWidth, minHeight, maxHeight } = boundaries;
	const { x: startX, y: startY, width: startWidth, height: startHeight, aspectRatio } = startValues;
	let distX = Math.floor(isHorizontal ? xSnapped - startValues.pointerX : 0);
	let distY = Math.floor(isVertical ? ySnapped - startValues.pointerY : 0);
	const newWidth = startWidth + (affectsX ? -distX : distX);
	const newHeight = startHeight + (affectsY ? -distY : distY);
	const originOffsetX = -nodeOrigin[0] * startWidth;
	const originOffsetY = -nodeOrigin[1] * startHeight;
	let clampX = getSizeClamp(newWidth, minWidth, maxWidth);
	let clampY = getSizeClamp(newHeight, minHeight, maxHeight);
	if (extent) {
		let xExtentClamp = 0;
		let yExtentClamp = 0;
		if (affectsX && distX < 0) xExtentClamp = getLowerExtentClamp(startX + distX + originOffsetX, extent[0][0]);
		else if (!affectsX && distX > 0) xExtentClamp = getUpperExtentClamp(startX + newWidth + originOffsetX, extent[1][0]);
		if (affectsY && distY < 0) yExtentClamp = getLowerExtentClamp(startY + distY + originOffsetY, extent[0][1]);
		else if (!affectsY && distY > 0) yExtentClamp = getUpperExtentClamp(startY + newHeight + originOffsetY, extent[1][1]);
		clampX = Math.max(clampX, xExtentClamp);
		clampY = Math.max(clampY, yExtentClamp);
	}
	if (childExtent) {
		let xExtentClamp = 0;
		let yExtentClamp = 0;
		if (affectsX && distX > 0) xExtentClamp = getUpperExtentClamp(startX + distX, childExtent[0][0]);
		else if (!affectsX && distX < 0) xExtentClamp = getLowerExtentClamp(startX + newWidth, childExtent[1][0]);
		if (affectsY && distY > 0) yExtentClamp = getUpperExtentClamp(startY + distY, childExtent[0][1]);
		else if (!affectsY && distY < 0) yExtentClamp = getLowerExtentClamp(startY + newHeight, childExtent[1][1]);
		clampX = Math.max(clampX, xExtentClamp);
		clampY = Math.max(clampY, yExtentClamp);
	}
	if (keepAspectRatio) {
		if (isHorizontal) {
			const aspectHeightClamp = getSizeClamp(newWidth / aspectRatio, minHeight, maxHeight) * aspectRatio;
			clampX = Math.max(clampX, aspectHeightClamp);
			if (extent) {
				let aspectExtentClamp = 0;
				if (!affectsX && !affectsY || affectsX && !affectsY && isDiagonal) aspectExtentClamp = getUpperExtentClamp(startY + originOffsetY + newWidth / aspectRatio, extent[1][1]) * aspectRatio;
				else aspectExtentClamp = getLowerExtentClamp(startY + originOffsetY + (affectsX ? distX : -distX) / aspectRatio, extent[0][1]) * aspectRatio;
				clampX = Math.max(clampX, aspectExtentClamp);
			}
			if (childExtent) {
				let aspectExtentClamp = 0;
				if (!affectsX && !affectsY || affectsX && !affectsY && isDiagonal) aspectExtentClamp = getLowerExtentClamp(startY + newWidth / aspectRatio, childExtent[1][1]) * aspectRatio;
				else aspectExtentClamp = getUpperExtentClamp(startY + (affectsX ? distX : -distX) / aspectRatio, childExtent[0][1]) * aspectRatio;
				clampX = Math.max(clampX, aspectExtentClamp);
			}
		}
		if (isVertical) {
			const aspectWidthClamp = getSizeClamp(newHeight * aspectRatio, minWidth, maxWidth) / aspectRatio;
			clampY = Math.max(clampY, aspectWidthClamp);
			if (extent) {
				let aspectExtentClamp = 0;
				if (!affectsX && !affectsY || affectsY && !affectsX && isDiagonal) aspectExtentClamp = getUpperExtentClamp(startX + newHeight * aspectRatio + originOffsetX, extent[1][0]) / aspectRatio;
				else aspectExtentClamp = getLowerExtentClamp(startX + (affectsY ? distY : -distY) * aspectRatio + originOffsetX, extent[0][0]) / aspectRatio;
				clampY = Math.max(clampY, aspectExtentClamp);
			}
			if (childExtent) {
				let aspectExtentClamp = 0;
				if (!affectsX && !affectsY || affectsY && !affectsX && isDiagonal) aspectExtentClamp = getLowerExtentClamp(startX + newHeight * aspectRatio, childExtent[1][0]) / aspectRatio;
				else aspectExtentClamp = getUpperExtentClamp(startX + (affectsY ? distY : -distY) * aspectRatio, childExtent[0][0]) / aspectRatio;
				clampY = Math.max(clampY, aspectExtentClamp);
			}
		}
	}
	distY = distY + (distY < 0 ? clampY : -clampY);
	distX = distX + (distX < 0 ? clampX : -clampX);
	if (keepAspectRatio) {
		if (isDiagonal) {
			if (newWidth > newHeight * aspectRatio) distY = (xor(affectsX, affectsY) ? -distX : distX) / aspectRatio;
			else distX = (xor(affectsX, affectsY) ? -distY : distY) * aspectRatio;
		} else if (isHorizontal) {
			distY = distX / aspectRatio;
			affectsY = affectsX;
		} else {
			distX = distY * aspectRatio;
			affectsX = affectsY;
		}
	}
	const x = affectsX ? startX + distX : startX;
	const y = affectsY ? startY + distY : startY;
	return {
		width: startWidth + (affectsX ? -distX : distX),
		height: startHeight + (affectsY ? -distY : distY),
		x: nodeOrigin[0] * distX * (!affectsX ? 1 : -1) + x,
		y: nodeOrigin[1] * distY * (!affectsY ? 1 : -1) + y
	};
}
var initPrevValues$1 = {
	width: 0,
	height: 0,
	x: 0,
	y: 0
};
var initStartValues = {
	...initPrevValues$1,
	pointerX: 0,
	pointerY: 0,
	aspectRatio: 1
};
function nodeToChildExtent(child, parent, nodeOrigin) {
	const x = parent.position.x + child.position.x;
	const y = parent.position.y + child.position.y;
	const width = child.measured.width ?? 0;
	const height = child.measured.height ?? 0;
	const originOffsetX = nodeOrigin[0] * width;
	const originOffsetY = nodeOrigin[1] * height;
	return [[x - originOffsetX, y - originOffsetY], [x + width - originOffsetX, y + height - originOffsetY]];
}
function XYResizer({ domNode, nodeId, getStoreItems, onChange, onEnd }) {
	const selection = select(domNode);
	let params = {
		controlDirection: getControlDirection("bottom-right"),
		boundaries: {
			minWidth: 0,
			minHeight: 0,
			maxWidth: Number.MAX_VALUE,
			maxHeight: Number.MAX_VALUE
		},
		resizeDirection: void 0,
		keepAspectRatio: false
	};
	function update({ controlPosition, boundaries, keepAspectRatio, resizeDirection, onResizeStart, onResize, onResizeEnd, shouldResize }) {
		let prevValues = { ...initPrevValues$1 };
		let startValues = { ...initStartValues };
		params = {
			boundaries,
			resizeDirection,
			keepAspectRatio,
			controlDirection: getControlDirection(controlPosition)
		};
		let node = void 0;
		let containerBounds = null;
		let childNodes = [];
		let parentNode = void 0;
		let nodeExtent = void 0;
		let childExtent = void 0;
		const dragHandler = drag().on("start", (event) => {
			const { nodeLookup, transform, snapGrid, snapToGrid, nodeOrigin, paneDomNode } = getStoreItems();
			node = nodeLookup.get(nodeId);
			if (!node) return;
			containerBounds = paneDomNode?.getBoundingClientRect() ?? null;
			const { xSnapped, ySnapped } = getPointerPosition(event.sourceEvent, {
				transform,
				snapGrid,
				snapToGrid,
				containerBounds
			});
			prevValues = {
				width: node.measured.width ?? 0,
				height: node.measured.height ?? 0,
				x: node.position.x ?? 0,
				y: node.position.y ?? 0
			};
			startValues = {
				...prevValues,
				pointerX: xSnapped,
				pointerY: ySnapped,
				aspectRatio: prevValues.width / prevValues.height
			};
			parentNode = void 0;
			nodeExtent = isCoordinateExtent(node.extent) ? node.extent : void 0;
			if (node.parentId && (node.extent === "parent" || node.expandParent)) parentNode = nodeLookup.get(node.parentId);
			if (parentNode && node.extent === "parent") nodeExtent = [[0, 0], [parentNode.measured.width, parentNode.measured.height]];
			childNodes = [];
			childExtent = void 0;
			for (const [childId, child] of nodeLookup) if (child.parentId === nodeId) {
				childNodes.push({
					id: childId,
					position: { ...child.position },
					extent: child.extent
				});
				if (child.extent === "parent" || child.expandParent) {
					const extent = nodeToChildExtent(child, node, child.origin ?? nodeOrigin);
					if (childExtent) childExtent = [[Math.min(extent[0][0], childExtent[0][0]), Math.min(extent[0][1], childExtent[0][1])], [Math.max(extent[1][0], childExtent[1][0]), Math.max(extent[1][1], childExtent[1][1])]];
					else childExtent = extent;
				}
			}
			onResizeStart?.(event, { ...prevValues });
		}).on("drag", (event) => {
			const { transform, snapGrid, snapToGrid, nodeOrigin: storeNodeOrigin } = getStoreItems();
			const pointerPosition = getPointerPosition(event.sourceEvent, {
				transform,
				snapGrid,
				snapToGrid,
				containerBounds
			});
			const childChanges = [];
			if (!node) return;
			const { x: prevX, y: prevY, width: prevWidth, height: prevHeight } = prevValues;
			const change = {};
			const nodeOrigin = node.origin ?? storeNodeOrigin;
			const { width, height, x, y } = getDimensionsAfterResize(startValues, params.controlDirection, pointerPosition, params.boundaries, params.keepAspectRatio, nodeOrigin, nodeExtent, childExtent);
			const isWidthChange = width !== prevWidth;
			const isHeightChange = height !== prevHeight;
			const isXPosChange = x !== prevX && isWidthChange;
			const isYPosChange = y !== prevY && isHeightChange;
			if (!isXPosChange && !isYPosChange && !isWidthChange && !isHeightChange) return;
			const lastValid = {
				prevValues: { ...prevValues },
				startX: startValues.x,
				startY: startValues.y,
				childNodes: childNodes.map((child) => ({
					...child,
					position: { ...child.position }
				}))
			};
			if (isXPosChange || isYPosChange || nodeOrigin[0] === 1 || nodeOrigin[1] === 1) {
				change.x = isXPosChange ? x : prevValues.x;
				change.y = isYPosChange ? y : prevValues.y;
				prevValues.x = change.x;
				prevValues.y = change.y;
				if (childNodes.length > 0) {
					const xChange = x - prevX;
					const yChange = y - prevY;
					for (const childNode of childNodes) {
						childNode.position = {
							x: childNode.position.x - xChange + nodeOrigin[0] * (width - prevWidth),
							y: childNode.position.y - yChange + nodeOrigin[1] * (height - prevHeight)
						};
						childChanges.push(childNode);
					}
				}
			}
			if (isWidthChange || isHeightChange) {
				change.width = isWidthChange && (!params.resizeDirection || params.resizeDirection === "horizontal") ? width : prevValues.width;
				change.height = isHeightChange && (!params.resizeDirection || params.resizeDirection === "vertical") ? height : prevValues.height;
				prevValues.width = change.width;
				prevValues.height = change.height;
			}
			if (parentNode && node.expandParent) {
				const xLimit = nodeOrigin[0] * (change.width ?? 0);
				if (change.x && change.x < xLimit) {
					prevValues.x = xLimit;
					startValues.x = startValues.x - (change.x - xLimit);
				}
				const yLimit = nodeOrigin[1] * (change.height ?? 0);
				if (change.y && change.y < yLimit) {
					prevValues.y = yLimit;
					startValues.y = startValues.y - (change.y - yLimit);
				}
			}
			const direction = getResizeDirection({
				width: prevValues.width,
				prevWidth,
				height: prevValues.height,
				prevHeight,
				affectsX: params.controlDirection.affectsX,
				affectsY: params.controlDirection.affectsY
			});
			const nextValues = {
				...prevValues,
				direction
			};
			if (shouldResize?.(event, nextValues) === false) {
				prevValues = lastValid.prevValues;
				startValues.x = lastValid.startX;
				startValues.y = lastValid.startY;
				childNodes.forEach((child, i) => {
					child.position = lastValid.childNodes[i].position;
				});
				return;
			}
			onResize?.(event, nextValues);
			onChange(change, childChanges);
		}).on("end", (event) => {
			onResizeEnd?.(event, { ...prevValues });
			onEnd?.({ ...prevValues });
		});
		selection.call(dragHandler);
	}
	function destroy() {
		selection.on(".drag", null);
	}
	return {
		update,
		destroy
	};
}
// node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.production.js
/**
* @license React
* use-sync-external-store-shim.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_use_sync_external_store_shim_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var React = __require("react");
	function is(x, y) {
		return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
	}
	var objectIs = "function" === typeof Object.is ? Object.is : is;
	var useState = React.useState;
	var useEffect = React.useEffect;
	var useLayoutEffect = React.useLayoutEffect;
	var useDebugValue = React.useDebugValue;
	function useSyncExternalStore$2(subscribe, getSnapshot) {
		var value = getSnapshot(), _useState = useState({ inst: {
			value,
			getSnapshot
		} }), inst = _useState[0].inst, forceUpdate = _useState[1];
		useLayoutEffect(function() {
			inst.value = value;
			inst.getSnapshot = getSnapshot;
			checkIfSnapshotChanged(inst) && forceUpdate({ inst });
		}, [
			subscribe,
			value,
			getSnapshot
		]);
		useEffect(function() {
			checkIfSnapshotChanged(inst) && forceUpdate({ inst });
			return subscribe(function() {
				checkIfSnapshotChanged(inst) && forceUpdate({ inst });
			});
		}, [subscribe]);
		useDebugValue(value);
		return value;
	}
	function checkIfSnapshotChanged(inst) {
		var latestGetSnapshot = inst.getSnapshot;
		inst = inst.value;
		try {
			var nextValue = latestGetSnapshot();
			return !objectIs(inst, nextValue);
		} catch (error) {
			return !0;
		}
	}
	function useSyncExternalStore$1(subscribe, getSnapshot) {
		return getSnapshot();
	}
	var shim = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? useSyncExternalStore$1 : useSyncExternalStore$2;
	exports.useSyncExternalStore = void 0 !== React.useSyncExternalStore ? React.useSyncExternalStore : shim;
}));
// node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js
/**
* @license React
* use-sync-external-store-shim.development.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_use_sync_external_store_shim_development = /* @__PURE__ */ __commonJSMin(((exports) => {
	"production" !== process.env.NODE_ENV && (function() {
		function is(x, y) {
			return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
		}
		function useSyncExternalStore$2(subscribe, getSnapshot) {
			didWarnOld18Alpha || void 0 === React.startTransition || (didWarnOld18Alpha = !0, console.error("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."));
			var value = getSnapshot();
			if (!didWarnUncachedGetSnapshot) {
				var cachedValue = getSnapshot();
				objectIs(value, cachedValue) || (console.error("The result of getSnapshot should be cached to avoid an infinite loop"), didWarnUncachedGetSnapshot = !0);
			}
			cachedValue = useState({ inst: {
				value,
				getSnapshot
			} });
			var inst = cachedValue[0].inst, forceUpdate = cachedValue[1];
			useLayoutEffect(function() {
				inst.value = value;
				inst.getSnapshot = getSnapshot;
				checkIfSnapshotChanged(inst) && forceUpdate({ inst });
			}, [
				subscribe,
				value,
				getSnapshot
			]);
			useEffect(function() {
				checkIfSnapshotChanged(inst) && forceUpdate({ inst });
				return subscribe(function() {
					checkIfSnapshotChanged(inst) && forceUpdate({ inst });
				});
			}, [subscribe]);
			useDebugValue(value);
			return value;
		}
		function checkIfSnapshotChanged(inst) {
			var latestGetSnapshot = inst.getSnapshot;
			inst = inst.value;
			try {
				var nextValue = latestGetSnapshot();
				return !objectIs(inst, nextValue);
			} catch (error) {
				return !0;
			}
		}
		function useSyncExternalStore$1(subscribe, getSnapshot) {
			return getSnapshot();
		}
		"undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
		var React = __require("react"), objectIs = "function" === typeof Object.is ? Object.is : is, useState = React.useState, useEffect = React.useEffect, useLayoutEffect = React.useLayoutEffect, useDebugValue = React.useDebugValue, didWarnOld18Alpha = !1, didWarnUncachedGetSnapshot = !1, shim = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? useSyncExternalStore$1 : useSyncExternalStore$2;
		exports.useSyncExternalStore = void 0 !== React.useSyncExternalStore ? React.useSyncExternalStore : shim;
		"undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
	})();
}));
// node_modules/use-sync-external-store/shim/index.js
var require_shim = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	if (process.env.NODE_ENV === "production") module.exports = require_use_sync_external_store_shim_production();
	else module.exports = require_use_sync_external_store_shim_development();
}));
// node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.production.js
/**
* @license React
* use-sync-external-store-shim/with-selector.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_with_selector_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var React = __require("react");
	var shim = require_shim();
	function is(x, y) {
		return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
	}
	var objectIs = "function" === typeof Object.is ? Object.is : is;
	var useSyncExternalStore = shim.useSyncExternalStore;
	var useRef = React.useRef;
	var useEffect = React.useEffect;
	var useMemo = React.useMemo;
	var useDebugValue = React.useDebugValue;
	exports.useSyncExternalStoreWithSelector = function(subscribe, getSnapshot, getServerSnapshot, selector, isEqual) {
		var instRef = useRef(null);
		if (null === instRef.current) {
			var inst = {
				hasValue: !1,
				value: null
			};
			instRef.current = inst;
		} else inst = instRef.current;
		instRef = useMemo(function() {
			function memoizedSelector(nextSnapshot) {
				if (!hasMemo) {
					hasMemo = !0;
					memoizedSnapshot = nextSnapshot;
					nextSnapshot = selector(nextSnapshot);
					if (void 0 !== isEqual && inst.hasValue) {
						var currentSelection = inst.value;
						if (isEqual(currentSelection, nextSnapshot)) return memoizedSelection = currentSelection;
					}
					return memoizedSelection = nextSnapshot;
				}
				currentSelection = memoizedSelection;
				if (objectIs(memoizedSnapshot, nextSnapshot)) return currentSelection;
				var nextSelection = selector(nextSnapshot);
				if (void 0 !== isEqual && isEqual(currentSelection, nextSelection)) return memoizedSnapshot = nextSnapshot, currentSelection;
				memoizedSnapshot = nextSnapshot;
				return memoizedSelection = nextSelection;
			}
			var hasMemo = !1, memoizedSnapshot, memoizedSelection, maybeGetServerSnapshot = void 0 === getServerSnapshot ? null : getServerSnapshot;
			return [function() {
				return memoizedSelector(getSnapshot());
			}, null === maybeGetServerSnapshot ? void 0 : function() {
				return memoizedSelector(maybeGetServerSnapshot());
			}];
		}, [
			getSnapshot,
			getServerSnapshot,
			selector,
			isEqual
		]);
		var value = useSyncExternalStore(subscribe, instRef[0], instRef[1]);
		useEffect(function() {
			inst.hasValue = !0;
			inst.value = value;
		}, [value]);
		useDebugValue(value);
		return value;
	};
}));
// node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js
/**
* @license React
* use-sync-external-store-shim/with-selector.development.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_with_selector_development = /* @__PURE__ */ __commonJSMin(((exports) => {
	"production" !== process.env.NODE_ENV && (function() {
		function is(x, y) {
			return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
		}
		"undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
		var React = __require("react"), shim = require_shim(), objectIs = "function" === typeof Object.is ? Object.is : is, useSyncExternalStore = shim.useSyncExternalStore, useRef = React.useRef, useEffect = React.useEffect, useMemo = React.useMemo, useDebugValue = React.useDebugValue;
		exports.useSyncExternalStoreWithSelector = function(subscribe, getSnapshot, getServerSnapshot, selector, isEqual) {
			var instRef = useRef(null);
			if (null === instRef.current) {
				var inst = {
					hasValue: !1,
					value: null
				};
				instRef.current = inst;
			} else inst = instRef.current;
			instRef = useMemo(function() {
				function memoizedSelector(nextSnapshot) {
					if (!hasMemo) {
						hasMemo = !0;
						memoizedSnapshot = nextSnapshot;
						nextSnapshot = selector(nextSnapshot);
						if (void 0 !== isEqual && inst.hasValue) {
							var currentSelection = inst.value;
							if (isEqual(currentSelection, nextSnapshot)) return memoizedSelection = currentSelection;
						}
						return memoizedSelection = nextSnapshot;
					}
					currentSelection = memoizedSelection;
					if (objectIs(memoizedSnapshot, nextSnapshot)) return currentSelection;
					var nextSelection = selector(nextSnapshot);
					if (void 0 !== isEqual && isEqual(currentSelection, nextSelection)) return memoizedSnapshot = nextSnapshot, currentSelection;
					memoizedSnapshot = nextSnapshot;
					return memoizedSelection = nextSelection;
				}
				var hasMemo = !1, memoizedSnapshot, memoizedSelection, maybeGetServerSnapshot = void 0 === getServerSnapshot ? null : getServerSnapshot;
				return [function() {
					return memoizedSelector(getSnapshot());
				}, null === maybeGetServerSnapshot ? void 0 : function() {
					return memoizedSelector(maybeGetServerSnapshot());
				}];
			}, [
				getSnapshot,
				getServerSnapshot,
				selector,
				isEqual
			]);
			var value = useSyncExternalStore(subscribe, instRef[0], instRef[1]);
			useEffect(function() {
				inst.hasValue = !0;
				inst.value = value;
			}, [value]);
			useDebugValue(value);
			return value;
		};
		"undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
	})();
}));
// node_modules/@xyflow/react/node_modules/zustand/esm/vanilla.mjs
var import_with_selector = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
	if (process.env.NODE_ENV === "production") module.exports = require_with_selector_production();
	else module.exports = require_with_selector_development();
})))(), 1);
var createStoreImpl$1 = (createState) => {
	let state;
	const listeners = /* @__PURE__ */ new Set();
	const setState = (partial, replace) => {
		const nextState = typeof partial === "function" ? partial(state) : partial;
		if (!Object.is(nextState, state)) {
			const previousState = state;
			state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
			listeners.forEach((listener) => listener(state, previousState));
		}
	};
	const getState = () => state;
	const getInitialState = () => initialState;
	const subscribe = (listener) => {
		listeners.add(listener);
		return () => listeners.delete(listener);
	};
	const destroy = () => {
		listeners.clear();
	};
	const api = {
		setState,
		getState,
		getInitialState,
		subscribe,
		destroy
	};
	const initialState = state = createState(setState, getState, api);
	return api;
};
var createStore$2 = (createState) => createState ? createStoreImpl$1(createState) : createStoreImpl$1;
// node_modules/@xyflow/react/node_modules/zustand/esm/traditional.mjs
var { useDebugValue } = ReactExports;
var { useSyncExternalStoreWithSelector } = import_with_selector.default;
var identity$1 = (arg) => arg;
function useStoreWithEqualityFn(api, selector = identity$1, equalityFn) {
	const slice = useSyncExternalStoreWithSelector(api.subscribe, api.getState, api.getServerState || api.getInitialState, selector, equalityFn);
	useDebugValue(slice);
	return slice;
}
var createWithEqualityFnImpl = (createState, defaultEqualityFn) => {
	const api = createStore$2(createState);
	const useBoundStoreWithEqualityFn = (selector, equalityFn = defaultEqualityFn) => useStoreWithEqualityFn(api, selector, equalityFn);
	Object.assign(useBoundStoreWithEqualityFn, api);
	return useBoundStoreWithEqualityFn;
};
var createWithEqualityFn = (createState, defaultEqualityFn) => createState ? createWithEqualityFnImpl(createState, defaultEqualityFn) : createWithEqualityFnImpl;
// node_modules/@xyflow/react/node_modules/zustand/esm/shallow.mjs
function shallow$1(objA, objB) {
	if (Object.is(objA, objB)) return true;
	if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) return false;
	if (objA instanceof Map && objB instanceof Map) {
		if (objA.size !== objB.size) return false;
		for (const [key, value] of objA) if (!Object.is(value, objB.get(key))) return false;
		return true;
	}
	if (objA instanceof Set && objB instanceof Set) {
		if (objA.size !== objB.size) return false;
		for (const value of objA) if (!objB.has(value)) return false;
		return true;
	}
	const keysA = Object.keys(objA);
	if (keysA.length !== Object.keys(objB).length) return false;
	for (const keyA of keysA) if (!Object.prototype.hasOwnProperty.call(objB, keyA) || !Object.is(objA[keyA], objB[keyA])) return false;
	return true;
}
// node_modules/@xyflow/react/dist/esm/index.js
var StoreContext = createContext(null);
var Provider$1 = StoreContext.Provider;
var zustandErrorMessage = errorMessages["error001"]("react");
/**
* This hook can be used to subscribe to internal state changes of the React Flow
* component. The `useStore` hook is re-exported from the [Zustand](https://github.com/pmndrs/zustand)
* state management library, so you should check out their docs for more details.
*
* @public
* @param selector - A selector function that returns a slice of the flow's internal state.
* Extracting or transforming just the state you need is a good practice to avoid unnecessary
* re-renders.
* @param equalityFn - A function to compare the previous and next value. This is incredibly useful
* for preventing unnecessary re-renders. Good sensible defaults are using `Object.is` or importing
* `zustand/shallow`, but you can be as granular as you like.
* @returns The selected state slice.
*
* @example
* ```ts
* const nodes = useStore((state) => state.nodes);
* ```
*
* @remarks This hook should only be used if there is no other way to access the internal
* state. For many of the common use cases, there are dedicated hooks available
* such as {@link useReactFlow}, {@link useViewport}, etc.
*/
function useStore$2(selector, equalityFn) {
	const store = useContext(StoreContext);
	if (store === null) throw new Error(zustandErrorMessage);
	return useStoreWithEqualityFn(store, selector, equalityFn);
}
/**
* In some cases, you might need to access the store directly. This hook returns the store object which can be used on demand to access the state or dispatch actions.
*
* @returns The store object.
* @example
* ```ts
* const store = useStoreApi();
* ```
*
* @remarks This hook should only be used if there is no other way to access the internal
* state. For many of the common use cases, there are dedicated hooks available
* such as {@link useReactFlow}, {@link useViewport}, etc.
*/
function useStoreApi() {
	const store = useContext(StoreContext);
	if (store === null) throw new Error(zustandErrorMessage);
	return useMemo(() => ({
		getState: store.getState,
		setState: store.setState,
		subscribe: store.subscribe
	}), [store]);
}
var style = { display: "none" };
var ariaLiveStyle = {
	position: "absolute",
	width: 1,
	height: 1,
	margin: -1,
	border: 0,
	padding: 0,
	overflow: "hidden",
	clip: "rect(0px, 0px, 0px, 0px)",
	clipPath: "inset(100%)"
};
var ARIA_NODE_DESC_KEY = "react-flow__node-desc";
var ARIA_EDGE_DESC_KEY = "react-flow__edge-desc";
var ARIA_LIVE_MESSAGE = "react-flow__aria-live";
var ariaLiveSelector = (s) => s.ariaLiveMessage;
var ariaLabelConfigSelector = (s) => s.ariaLabelConfig;
function AriaLiveMessage({ rfId }) {
	const ariaLiveMessage = useStore$2(ariaLiveSelector);
	return jsx("div", {
		id: `${ARIA_LIVE_MESSAGE}-${rfId}`,
		"aria-live": "assertive",
		"aria-atomic": "true",
		style: ariaLiveStyle,
		children: ariaLiveMessage
	});
}
function A11yDescriptions({ rfId, disableKeyboardA11y }) {
	const ariaLabelConfig = useStore$2(ariaLabelConfigSelector);
	return jsxs(Fragment$1, { children: [
		jsx("div", {
			id: `${ARIA_NODE_DESC_KEY}-${rfId}`,
			style,
			children: disableKeyboardA11y ? ariaLabelConfig["node.a11yDescription.default"] : ariaLabelConfig["node.a11yDescription.keyboardDisabled"]
		}),
		jsx("div", {
			id: `${ARIA_EDGE_DESC_KEY}-${rfId}`,
			style,
			children: ariaLabelConfig["edge.a11yDescription.default"]
		}),
		!disableKeyboardA11y && jsx(AriaLiveMessage, { rfId })
	] });
}
/**
* The `<Panel />` component helps you position content above the viewport.
* It is used internally by the [`<MiniMap />`](/api-reference/components/minimap)
* and [`<Controls />`](/api-reference/components/controls) components.
*
* @public
*
* @example
* ```jsx
*import { ReactFlow, Background, Panel } from '@xyflow/react';
*
*export default function Flow() {
*  return (
*    <ReactFlow nodes={[]} fitView>
*      <Panel position="top-left">top-left</Panel>
*      <Panel position="top-center">top-center</Panel>
*      <Panel position="top-right">top-right</Panel>
*      <Panel position="bottom-left">bottom-left</Panel>
*      <Panel position="bottom-center">bottom-center</Panel>
*      <Panel position="bottom-right">bottom-right</Panel>
*    </ReactFlow>
*  );
*}
*```
*/
var Panel = forwardRef(({ position = "top-left", children, className, style, ...rest }, ref) => {
	const positionClasses = `${position}`.split("-");
	return jsx("div", {
		className: cc([
			"react-flow__panel",
			className,
			...positionClasses
		]),
		style,
		ref,
		...rest,
		children
	});
});
Panel.displayName = "Panel";
var link = `https://reactflow.dev${process.env.NODE_ENV === "production" ? "?utm_source=attribution" : "/attribution"}`;
/**
* React Flow is independent and entirely funded by its users.
* If you hide the attribution, please support our work by subscribing to React Flow Pro: https://reactflow.dev/remove-attribution
*/
function Attribution({ proOptions, position = "bottom-right" }) {
	useEffect(() => {
		if (process.env.NODE_ENV !== "development") return;
		handleAttributionWarning("react");
	}, []);
	if (proOptions?.hideAttribution) return null;
	return jsx(Panel, {
		position,
		className: "react-flow__attribution",
		"data-message": `Please only hide this attribution when you are subscribed to React Flow Pro: ${link}`,
		children: jsx("a", {
			href: link,
			target: "_blank",
			rel: "noopener noreferrer",
			"aria-label": "React Flow attribution",
			children: "React Flow"
		})
	});
}
var selector$l = (s) => {
	const selectedNodes = [];
	const selectedEdges = [];
	for (const [, node] of s.nodeLookup) if (node.selected) selectedNodes.push(node.internals.userNode);
	for (const [, edge] of s.edgeLookup) if (edge.selected) selectedEdges.push(edge);
	return {
		selectedNodes,
		selectedEdges
	};
};
var selectId = (obj) => obj.id;
function areEqual$1(a, b) {
	return shallow$1(a.selectedNodes.map(selectId), b.selectedNodes.map(selectId)) && shallow$1(a.selectedEdges.map(selectId), b.selectedEdges.map(selectId));
}
function SelectionListenerInner({ onSelectionChange }) {
	const store = useStoreApi();
	const { selectedNodes, selectedEdges } = useStore$2(selector$l, areEqual$1);
	useEffect(() => {
		const params = {
			nodes: selectedNodes,
			edges: selectedEdges
		};
		onSelectionChange?.(params);
		store.getState().onSelectionChangeHandlers.forEach((fn) => fn(params));
	}, [
		selectedNodes,
		selectedEdges,
		onSelectionChange
	]);
	return null;
}
var changeSelector = (s) => !!s.onSelectionChangeHandlers;
function SelectionListener({ onSelectionChange }) {
	const storeHasSelectionChangeHandlers = useStore$2(changeSelector);
	if (onSelectionChange || storeHasSelectionChangeHandlers) return jsx(SelectionListenerInner, { onSelectionChange });
	return null;
}
var defaultNodeOrigin = [0, 0];
var defaultViewport = {
	x: 0,
	y: 0,
	zoom: 1
};
var fieldsToTrack = [...[
	"nodes",
	"edges",
	"defaultNodes",
	"defaultEdges",
	"onConnect",
	"onConnectStart",
	"onConnectEnd",
	"onClickConnectStart",
	"onClickConnectEnd",
	"nodesDraggable",
	"autoPanOnNodeFocus",
	"nodesConnectable",
	"nodesFocusable",
	"edgesFocusable",
	"edgesReconnectable",
	"elevateNodesOnSelect",
	"elevateEdgesOnSelect",
	"minZoom",
	"maxZoom",
	"nodeExtent",
	"onNodesChange",
	"onEdgesChange",
	"elementsSelectable",
	"connectionMode",
	"snapGrid",
	"snapToGrid",
	"translateExtent",
	"connectOnClick",
	"defaultEdgeOptions",
	"fitView",
	"fitViewOptions",
	"onNodesDelete",
	"onEdgesDelete",
	"onDelete",
	"onNodeDrag",
	"onNodeDragStart",
	"onNodeDragStop",
	"onSelectionDrag",
	"onSelectionDragStart",
	"onSelectionDragStop",
	"onMoveStart",
	"onMove",
	"onMoveEnd",
	"noPanClassName",
	"nodeOrigin",
	"autoPanOnConnect",
	"autoPanOnNodeDrag",
	"onError",
	"connectionRadius",
	"isValidConnection",
	"selectNodesOnDrag",
	"nodeDragThreshold",
	"connectionDragThreshold",
	"onBeforeDelete",
	"debug",
	"autoPanSpeed",
	"ariaLabelConfig",
	"zIndexMode"
], "rfId"];
var selector$k = (s) => ({
	setNodes: s.setNodes,
	setEdges: s.setEdges,
	setMinZoom: s.setMinZoom,
	setMaxZoom: s.setMaxZoom,
	setTranslateExtent: s.setTranslateExtent,
	setNodeExtent: s.setNodeExtent,
	reset: s.reset,
	setDefaultNodesAndEdges: s.setDefaultNodesAndEdges
});
var initPrevValues = {
	translateExtent: infiniteExtent,
	nodeOrigin: defaultNodeOrigin,
	minZoom: .5,
	maxZoom: 2,
	elementsSelectable: true,
	noPanClassName: "nopan",
	rfId: "1"
};
function StoreUpdater(props) {
	const { setNodes, setEdges, setMinZoom, setMaxZoom, setTranslateExtent, setNodeExtent, reset, setDefaultNodesAndEdges } = useStore$2(selector$k, shallow$1);
	const store = useStoreApi();
	useEffect(() => {
		setDefaultNodesAndEdges(props.defaultNodes, props.defaultEdges);
		return () => {
			previousFields.current = initPrevValues;
			reset();
		};
	}, []);
	const previousFields = useRef(initPrevValues);
	useEffect(() => {
		for (const fieldName of fieldsToTrack) {
			const fieldValue = props[fieldName];
			if (fieldValue === previousFields.current[fieldName]) continue;
			if (typeof props[fieldName] === "undefined") continue;
			if (fieldName === "nodes") setNodes(fieldValue);
			else if (fieldName === "edges") setEdges(fieldValue);
			else if (fieldName === "minZoom") setMinZoom(fieldValue);
			else if (fieldName === "maxZoom") setMaxZoom(fieldValue);
			else if (fieldName === "translateExtent") setTranslateExtent(fieldValue);
			else if (fieldName === "nodeExtent") setNodeExtent(fieldValue);
			else if (fieldName === "ariaLabelConfig") store.setState({ ariaLabelConfig: mergeAriaLabelConfig(fieldValue) });
			else if (fieldName === "fitView") store.setState({ fitViewQueued: fieldValue });
			else if (fieldName === "fitViewOptions") store.setState({ fitViewOptions: fieldValue });
			else store.setState({ [fieldName]: fieldValue });
		}
		previousFields.current = props;
	}, fieldsToTrack.map((fieldName) => props[fieldName]));
	return null;
}
function getMediaQuery() {
	if (typeof window === "undefined" || !window.matchMedia) return null;
	return window.matchMedia("(prefers-color-scheme: dark)");
}
/**
* Hook for receiving the current color mode class 'dark' or 'light'.
*
* @internal
* @param colorMode - The color mode to use ('dark', 'light' or 'system')
*/
function useColorModeClass(colorMode) {
	const [colorModeClass, setColorModeClass] = useState(colorMode === "system" ? null : colorMode);
	useEffect(() => {
		if (colorMode !== "system") {
			setColorModeClass(colorMode);
			return;
		}
		const mediaQuery = getMediaQuery();
		const updateColorModeClass = () => setColorModeClass(mediaQuery?.matches ? "dark" : "light");
		updateColorModeClass();
		mediaQuery?.addEventListener("change", updateColorModeClass);
		return () => {
			mediaQuery?.removeEventListener("change", updateColorModeClass);
		};
	}, [colorMode]);
	return colorModeClass !== null ? colorModeClass : getMediaQuery()?.matches ? "dark" : "light";
}
var defaultDoc = typeof document !== "undefined" ? document : null;
/**
* This hook lets you listen for specific key codes and tells you whether they are
* currently pressed or not.
*
* @public
* @param options - Options
*
* @example
* ```tsx
*import { useKeyPress } from '@xyflow/react';
*
*export default function () {
*  const spacePressed = useKeyPress('Space');
*  const cmdAndSPressed = useKeyPress(['Meta+s', 'Strg+s']);
*
*  return (
*    <div>
*     {spacePressed && <p>Space pressed!</p>}
*     {cmdAndSPressed && <p>Cmd + S pressed!</p>}
*    </div>
*  );
*}
*```
*/
function useKeyPress(keyCode = null, options = {
	target: defaultDoc,
	actInsideInputWithModifier: true
}) {
	const [keyPressed, setKeyPressed] = useState(false);
	const modifierPressed = useRef(false);
	const pressedKeys = useRef(/* @__PURE__ */ new Set([]));
	const [keyCodes, keysToWatch] = useMemo(() => {
		if (keyCode !== null) {
			const keys = (Array.isArray(keyCode) ? keyCode : [keyCode]).filter((kc) => typeof kc === "string").map((kc) => kc.replace(/\+/g, "\n").replace("\n\n", "\n+").split("\n"));
			return [keys, keys.reduce((res, item) => res.concat(...item), [])];
		}
		return [[], []];
	}, [keyCode]);
	useEffect(() => {
		const target = options?.target ?? defaultDoc;
		const actInsideInputWithModifier = options?.actInsideInputWithModifier ?? true;
		if (keyCode !== null) {
			const downHandler = (event) => {
				modifierPressed.current = event.ctrlKey || event.metaKey || event.shiftKey || event.altKey;
				if ((!modifierPressed.current || modifierPressed.current && !actInsideInputWithModifier) && isInputDOMNode(event)) return false;
				const keyOrCode = useKeyOrCode(event.code, keysToWatch);
				pressedKeys.current.add(event[keyOrCode]);
				if (isMatchingKey(keyCodes, pressedKeys.current, false)) {
					const target = event.composedPath?.()?.[0] || event.target;
					const isInteractiveElement = target?.nodeName === "BUTTON" || target?.nodeName === "A";
					if (options.preventDefault !== false && (modifierPressed.current || !isInteractiveElement)) event.preventDefault();
					setKeyPressed(true);
				}
			};
			const upHandler = (event) => {
				const keyOrCode = useKeyOrCode(event.code, keysToWatch);
				if (isMatchingKey(keyCodes, pressedKeys.current, true)) {
					setKeyPressed(false);
					pressedKeys.current.clear();
				} else pressedKeys.current.delete(event[keyOrCode]);
				if (event.key === "Meta") pressedKeys.current.clear();
				modifierPressed.current = false;
			};
			const resetHandler = () => {
				pressedKeys.current.clear();
				setKeyPressed(false);
			};
			target?.addEventListener("keydown", downHandler);
			target?.addEventListener("keyup", upHandler);
			window.addEventListener("blur", resetHandler);
			window.addEventListener("contextmenu", resetHandler);
			return () => {
				target?.removeEventListener("keydown", downHandler);
				target?.removeEventListener("keyup", upHandler);
				window.removeEventListener("blur", resetHandler);
				window.removeEventListener("contextmenu", resetHandler);
			};
		}
	}, [keyCode, setKeyPressed]);
	return keyPressed;
}
function isMatchingKey(keyCodes, pressedKeys, isUp) {
	return keyCodes.filter((keys) => isUp || keys.length === pressedKeys.size).some((keys) => keys.every((k) => pressedKeys.has(k)));
}
function useKeyOrCode(eventCode, keysToWatch) {
	return keysToWatch.includes(eventCode) ? "code" : "key";
}
/**
* Hook for getting viewport helper functions.
*
* @internal
* @returns viewport helper functions
*/
var useViewportHelper = () => {
	const store = useStoreApi();
	return useMemo(() => {
		return {
			zoomIn: async (options) => {
				const { panZoom } = store.getState();
				return panZoom ? panZoom.scaleBy(1.2, options) : false;
			},
			zoomOut: async (options) => {
				const { panZoom } = store.getState();
				return panZoom ? panZoom.scaleBy(1 / 1.2, options) : false;
			},
			zoomTo: async (zoomLevel, options) => {
				const { panZoom } = store.getState();
				return panZoom ? panZoom.scaleTo(zoomLevel, options) : false;
			},
			getZoom: () => store.getState().transform[2],
			setViewport: async (viewport, options) => {
				const { transform: [tX, tY, tZoom], panZoom } = store.getState();
				if (!panZoom) return false;
				await panZoom.setViewport({
					x: viewport.x ?? tX,
					y: viewport.y ?? tY,
					zoom: viewport.zoom ?? tZoom
				}, options);
				return true;
			},
			getViewport: () => {
				const [x, y, zoom] = store.getState().transform;
				return {
					x,
					y,
					zoom
				};
			},
			setCenter: async (x, y, options) => {
				return store.getState().setCenter(x, y, options);
			},
			fitBounds: async (bounds, options) => {
				const { width, height, minZoom, maxZoom, panZoom } = store.getState();
				const viewport = getViewportForBounds(bounds, width, height, minZoom, maxZoom, options?.padding ?? .1);
				if (!panZoom) return false;
				await panZoom.setViewport(viewport, {
					duration: options?.duration,
					ease: options?.ease,
					interpolate: options?.interpolate
				});
				return true;
			},
			screenToFlowPosition: (clientPosition, options = {}) => {
				const { transform, snapGrid, snapToGrid, domNode } = store.getState();
				if (!domNode) return clientPosition;
				const { x: domX, y: domY } = domNode.getBoundingClientRect();
				const correctedPosition = {
					x: clientPosition.x - domX,
					y: clientPosition.y - domY
				};
				const _snapGrid = options.snapGrid ?? snapGrid;
				return pointToRendererPoint(correctedPosition, transform, options.snapToGrid ?? snapToGrid, _snapGrid);
			},
			flowToScreenPosition: (flowPosition) => {
				const { transform, domNode } = store.getState();
				if (!domNode) return flowPosition;
				const { x: domX, y: domY } = domNode.getBoundingClientRect();
				const rendererPosition = rendererPointToPoint(flowPosition, transform);
				return {
					x: rendererPosition.x + domX,
					y: rendererPosition.y + domY
				};
			}
		};
	}, []);
};
function applyChanges(changes, elements) {
	const updatedElements = [];
	const changesMap = /* @__PURE__ */ new Map();
	const addItemChanges = [];
	for (const change of changes) if (change.type === "add") {
		addItemChanges.push(change);
		continue;
	} else if (change.type === "remove" || change.type === "replace") changesMap.set(change.id, [change]);
	else {
		const elementChanges = changesMap.get(change.id);
		if (elementChanges) elementChanges.push(change);
		else changesMap.set(change.id, [change]);
	}
	for (const element of elements) {
		const changes = changesMap.get(element.id);
		if (!changes) {
			updatedElements.push(element);
			continue;
		}
		if (changes[0].type === "remove") continue;
		if (changes[0].type === "replace") {
			updatedElements.push({ ...changes[0].item });
			continue;
		}
		/**
		* For other types of changes, we want to start with a shallow copy of the
		* object so React knows this element has changed. Sequential changes will
		* each _mutate_ this object, so there's only ever one copy.
		*/
		const updatedElement = { ...element };
		for (const change of changes) applyChange(change, updatedElement);
		updatedElements.push(updatedElement);
	}
	if (addItemChanges.length) addItemChanges.forEach((change) => {
		if (change.index !== void 0) updatedElements.splice(change.index, 0, { ...change.item });
		else updatedElements.push({ ...change.item });
	});
	return updatedElements;
}
function applyChange(change, element) {
	switch (change.type) {
		case "select":
			element.selected = change.selected;
			break;
		case "position":
			if (typeof change.position !== "undefined") element.position = change.position;
			if (typeof change.dragging !== "undefined") element.dragging = change.dragging;
			break;
		case "dimensions":
			if (typeof change.dimensions !== "undefined") {
				element.measured = { ...change.dimensions };
				if (change.setAttributes) {
					if (change.setAttributes === true || change.setAttributes === "width") element.width = change.dimensions.width;
					if (change.setAttributes === true || change.setAttributes === "height") element.height = change.dimensions.height;
				}
			}
			if (typeof change.resizing === "boolean") element.resizing = change.resizing;
	}
}
/**
* Drop in function that applies node changes to an array of nodes.
* @public
* @param changes - Array of changes to apply.
* @param nodes - Array of nodes to apply the changes to.
* @returns Array of updated nodes.
* @example
*```tsx
*import { useState, useCallback } from 'react';
*import { ReactFlow, applyNodeChanges, type Node, type Edge, type OnNodesChange } from '@xyflow/react';
*
*export default function Flow() {
*  const [nodes, setNodes] = useState<Node[]>([]);
*  const [edges, setEdges] = useState<Edge[]>([]);
*  const onNodesChange: OnNodesChange = useCallback(
*    (changes) => {
*      setNodes((oldNodes) => applyNodeChanges(changes, oldNodes));
*    },
*    [setNodes],
*  );
*
*  return (
*    <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} />
*  );
*}
*```
* @remarks Various events on the <ReactFlow /> component can produce an {@link NodeChange}
* that describes how to update the edges of your flow in some way.
* If you don't need any custom behaviour, this util can be used to take an array
* of these changes and apply them to your edges.
*/
function applyNodeChanges(changes, nodes) {
	return applyChanges(changes, nodes);
}
/**
* Drop in function that applies edge changes to an array of edges.
* @public
* @param changes - Array of changes to apply.
* @param edges - Array of edge to apply the changes to.
* @returns Array of updated edges.
* @example
* ```tsx
*import { useState, useCallback } from 'react';
*import { ReactFlow, applyEdgeChanges } from '@xyflow/react';
*
*export default function Flow() {
*  const [nodes, setNodes] = useState([]);
*  const [edges, setEdges] = useState([]);
*  const onEdgesChange = useCallback(
*    (changes) => {
*      setEdges((oldEdges) => applyEdgeChanges(changes, oldEdges));
*    },
*    [setEdges],
*  );
*
*  return (
*    <ReactFlow nodes={nodes} edges={edges} onEdgesChange={onEdgesChange} />
*  );
*}
*```
* @remarks Various events on the <ReactFlow /> component can produce an {@link EdgeChange}
* that describes how to update the edges of your flow in some way.
* If you don't need any custom behaviour, this util can be used to take an array
* of these changes and apply them to your edges.
*/
function applyEdgeChanges(changes, edges) {
	return applyChanges(changes, edges);
}
function createSelectionChange(id, selected) {
	return {
		id,
		type: "select",
		selected
	};
}
function getSelectionChanges(items, selectedIds = /* @__PURE__ */ new Set()) {
	const changes = [];
	for (const [id, item] of items) {
		const willBeSelected = selectedIds.has(id);
		if (!(item.selected === void 0 && !willBeSelected) && item.selected !== willBeSelected) changes.push(createSelectionChange(item.id, willBeSelected));
	}
	return changes;
}
function getElementsDiffChanges({ items = [], lookup }) {
	const changes = [];
	const itemsLookup = new Map(items.map((item) => [item.id, item]));
	for (const [index, item] of items.entries()) {
		const lookupItem = lookup.get(item.id);
		const storeItem = lookupItem?.internals?.userNode ?? lookupItem;
		if (storeItem !== void 0 && storeItem !== item) changes.push({
			id: item.id,
			item,
			type: "replace"
		});
		if (storeItem === void 0) changes.push({
			item,
			type: "add",
			index
		});
	}
	for (const [id] of lookup) if (itemsLookup.get(id) === void 0) changes.push({
		id,
		type: "remove"
	});
	return changes;
}
function elementToRemoveChange(item) {
	return {
		id: item.id,
		type: "remove"
	};
}
var defaultOnError = createDevWarn("React Flow", "https://reactflow.dev/");
function addEdge(edgeParams, edges, options = {}) {
	return addEdge$1(edgeParams, edges, {
		...options,
		onError: options.onError ?? defaultOnError
	});
}
/**
* Test whether an object is usable as an [`Node`](/api-reference/types/node).
* In TypeScript this is a type guard that will narrow the type of whatever you pass in to
* [`Node`](/api-reference/types/node) if it returns `true`.
*
* @public
* @remarks In TypeScript this is a type guard that will narrow the type of whatever you pass in to Node if it returns true
* @param element - The element to test.
* @returns Tests whether the provided value can be used as a `Node`. If you're using TypeScript,
* this function acts as a type guard and will narrow the type of the value to `Node` if it returns
* `true`.
*
* @example
* ```js
*import { isNode } from '@xyflow/react';
*
*if (isNode(node)) {
* // ...
*}
*```
*/
var isNode = (element) => isNodeBase(element);
/**
* Test whether an object is usable as an [`Edge`](/api-reference/types/edge).
* In TypeScript this is a type guard that will narrow the type of whatever you pass in to
* [`Edge`](/api-reference/types/edge) if it returns `true`.
*
* @public
* @remarks In TypeScript this is a type guard that will narrow the type of whatever you pass in to Edge if it returns true
* @param element - The element to test
* @returns Tests whether the provided value can be used as an `Edge`. If you're using TypeScript,
* this function acts as a type guard and will narrow the type of the value to `Edge` if it returns
* `true`.
*
* @example
* ```js
*import { isEdge } from '@xyflow/react';
*
*if (isEdge(edge)) {
* // ...
*}
*```
*/
var isEdge = (element) => isEdgeBase(element);
function fixedForwardRef(render) {
	return forwardRef(render);
}
var useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
/**
* This hook returns a queue that can be used to batch updates.
*
* @param runQueue - a function that gets called when the queue is flushed
* @internal
*
* @returns a Queue object
*/
function useQueue(runQueue) {
	const [serial, setSerial] = useState(BigInt(0));
	const [queue] = useState(() => createQueue(() => setSerial((n) => n + BigInt(1))));
	useIsomorphicLayoutEffect(() => {
		const queueItems = queue.get();
		if (queueItems.length) {
			runQueue(queueItems);
			queue.reset();
		}
	}, [serial]);
	return queue;
}
function createQueue(cb) {
	let queue = [];
	return {
		get: () => queue,
		reset: () => {
			queue = [];
		},
		push: (item) => {
			queue.push(item);
			cb();
		}
	};
}
var BatchContext = createContext(null);
/**
* This is a context provider that holds and processes the node and edge update queues
* that are needed to handle setNodes, addNodes, setEdges and addEdges.
*
* @internal
*/
function BatchProvider({ children }) {
	const store = useStoreApi();
	const nodeQueue = useQueue(useCallback((queueItems) => {
		const { nodes = [], setNodes, hasDefaultNodes, onNodesChange, nodeLookup, fitViewQueued, onNodesChangeMiddlewareMap } = store.getState();
		let next = nodes;
		for (const payload of queueItems) next = typeof payload === "function" ? payload(next) : payload;
		let changes = getElementsDiffChanges({
			items: next,
			lookup: nodeLookup
		});
		for (const middleware of onNodesChangeMiddlewareMap.values()) changes = middleware(changes);
		if (hasDefaultNodes) setNodes(next);
		if (changes.length > 0) onNodesChange?.(changes);
		else if (fitViewQueued) window.requestAnimationFrame(() => {
			const { fitViewQueued, nodes, setNodes } = store.getState();
			if (fitViewQueued) setNodes(nodes);
		});
	}, []));
	const edgeQueue = useQueue(useCallback((queueItems) => {
		const { edges = [], setEdges, hasDefaultEdges, onEdgesChange, edgeLookup } = store.getState();
		let next = edges;
		for (const payload of queueItems) next = typeof payload === "function" ? payload(next) : payload;
		if (hasDefaultEdges) setEdges(next);
		else if (onEdgesChange) onEdgesChange(getElementsDiffChanges({
			items: next,
			lookup: edgeLookup
		}));
	}, []));
	const value = useMemo(() => ({
		nodeQueue,
		edgeQueue
	}), []);
	return jsx(BatchContext.Provider, {
		value,
		children
	});
}
function useBatchContext() {
	const batchContext = useContext(BatchContext);
	if (!batchContext) throw new Error("useBatchContext must be used within a BatchProvider");
	return batchContext;
}
var selector$j = (s) => !!s.panZoom;
/**
* This hook returns a ReactFlowInstance that can be used to update nodes and edges, manipulate the viewport, or query the current state of the flow.
*
* @public
* @example
* ```jsx
*import { useCallback, useState } from 'react';
*import { useReactFlow } from '@xyflow/react';
*
*export function NodeCounter() {
*  const reactFlow = useReactFlow();
*  const [count, setCount] = useState(0);
*  const countNodes = useCallback(() => {
*    setCount(reactFlow.getNodes().length);
*    // you need to pass it as a dependency if you are using it with useEffect or useCallback
*    // because at the first render, it's not initialized yet and some functions might not work.
*  }, [reactFlow]);
*
*  return (
*    <div>
*      <button onClick={countNodes}>Update count</button>
*      <p>There are {count} nodes in the flow.</p>
*    </div>
*  );
*}
*```
*/
function useReactFlow() {
	const viewportHelper = useViewportHelper();
	const store = useStoreApi();
	const batchContext = useBatchContext();
	const viewportInitialized = useStore$2(selector$j);
	const generalHelper = useMemo(() => {
		const getInternalNode = (id) => store.getState().nodeLookup.get(id);
		const setNodes = (payload) => {
			batchContext.nodeQueue.push(payload);
		};
		const setEdges = (payload) => {
			batchContext.edgeQueue.push(payload);
		};
		const getNodeRect = (node) => {
			const { nodeLookup, nodeOrigin } = store.getState();
			const nodeToUse = isNode(node) ? node : nodeLookup.get(node.id);
			const position = nodeToUse.parentId ? evaluateAbsolutePosition(nodeToUse.position, nodeToUse.measured, nodeToUse.parentId, nodeLookup, nodeOrigin) : nodeToUse.position;
			return nodeToRect({
				...nodeToUse,
				position,
				width: nodeToUse.measured?.width ?? nodeToUse.width,
				height: nodeToUse.measured?.height ?? nodeToUse.height
			}, nodeToUse.parentId ? void 0 : nodeOrigin);
		};
		const updateNode = (id, nodeUpdate, options = { replace: false }) => {
			setNodes((prevNodes) => prevNodes.map((node) => {
				if (node.id === id) {
					const nextNode = typeof nodeUpdate === "function" ? nodeUpdate(node) : nodeUpdate;
					return options.replace && isNode(nextNode) ? nextNode : {
						...node,
						...nextNode
					};
				}
				return node;
			}));
		};
		const updateEdge = (id, edgeUpdate, options = { replace: false }) => {
			setEdges((prevEdges) => prevEdges.map((edge) => {
				if (edge.id === id) {
					const nextEdge = typeof edgeUpdate === "function" ? edgeUpdate(edge) : edgeUpdate;
					return options.replace && isEdge(nextEdge) ? nextEdge : {
						...edge,
						...nextEdge
					};
				}
				return edge;
			}));
		};
		return {
			getNodes: () => store.getState().nodes.map((n) => ({ ...n })),
			getNode: (id) => getInternalNode(id)?.internals.userNode,
			getInternalNode,
			getEdges: () => {
				const { edges = [] } = store.getState();
				return edges.map((e) => ({ ...e }));
			},
			getEdge: (id) => store.getState().edgeLookup.get(id),
			setNodes,
			setEdges,
			addNodes: (payload) => {
				const newNodes = Array.isArray(payload) ? payload : [payload];
				batchContext.nodeQueue.push((nodes) => [...nodes, ...newNodes]);
			},
			addEdges: (payload) => {
				const newEdges = Array.isArray(payload) ? payload : [payload];
				batchContext.edgeQueue.push((edges) => [...edges, ...newEdges]);
			},
			toObject: () => {
				const { nodes = [], edges = [], transform } = store.getState();
				const [x, y, zoom] = transform;
				return {
					nodes: nodes.map((n) => ({ ...n })),
					edges: edges.map((e) => ({ ...e })),
					viewport: {
						x,
						y,
						zoom
					}
				};
			},
			deleteElements: async ({ nodes: nodesToRemove = [], edges: edgesToRemove = [] }) => {
				const { nodes, edges, onNodesDelete, onEdgesDelete, triggerNodeChanges, triggerEdgeChanges, onDelete, onBeforeDelete } = store.getState();
				const { nodes: matchingNodes, edges: matchingEdges } = await getElementsToRemove({
					nodesToRemove,
					edgesToRemove,
					nodes,
					edges,
					onBeforeDelete
				});
				const hasMatchingEdges = matchingEdges.length > 0;
				const hasMatchingNodes = matchingNodes.length > 0;
				if (hasMatchingEdges) {
					const edgeChanges = matchingEdges.map(elementToRemoveChange);
					onEdgesDelete?.(matchingEdges);
					triggerEdgeChanges(edgeChanges);
				}
				if (hasMatchingNodes) {
					const nodeChanges = matchingNodes.map(elementToRemoveChange);
					onNodesDelete?.(matchingNodes);
					triggerNodeChanges(nodeChanges);
				}
				if (hasMatchingNodes || hasMatchingEdges) onDelete?.({
					nodes: matchingNodes,
					edges: matchingEdges
				});
				return {
					deletedNodes: matchingNodes,
					deletedEdges: matchingEdges
				};
			},
			/**
			* Partial is defined as "the 2 nodes/areas are intersecting partially".
			* If a is contained in b or b is contained in a, they are both
			* considered fully intersecting.
			*/
			getIntersectingNodes: (nodeOrRect, partially = true, nodes) => {
				const isRect = isRectObject(nodeOrRect);
				const nodeRect = isRect ? nodeOrRect : getNodeRect(nodeOrRect);
				const hasNodesOption = nodes !== void 0;
				if (!nodeRect) return [];
				const { nodeOrigin } = store.getState();
				return (nodes || store.getState().nodes).filter((n) => {
					const internalNode = store.getState().nodeLookup.get(n.id);
					if (internalNode && !isRect && (n.id === nodeOrRect.id || !internalNode.internals.positionAbsolute)) return false;
					const currNodeRect = nodeToRect(hasNodesOption ? n : internalNode, nodeOrigin);
					const overlappingArea = getOverlappingArea(currNodeRect, nodeRect);
					return partially && overlappingArea > 0 || overlappingArea >= currNodeRect.width * currNodeRect.height || overlappingArea >= nodeRect.width * nodeRect.height;
				});
			},
			isNodeIntersecting: (nodeOrRect, area, partially = true) => {
				const nodeRect = isRectObject(nodeOrRect) ? nodeOrRect : getNodeRect(nodeOrRect);
				if (!nodeRect) return false;
				const overlappingArea = getOverlappingArea(nodeRect, area);
				return partially && overlappingArea > 0 || overlappingArea >= area.width * area.height || overlappingArea >= nodeRect.width * nodeRect.height;
			},
			updateNode,
			updateNodeData: (id, dataUpdate, options = { replace: false }) => {
				updateNode(id, (node) => {
					const nextData = typeof dataUpdate === "function" ? dataUpdate(node) : dataUpdate;
					return options.replace ? {
						...node,
						data: nextData
					} : {
						...node,
						data: {
							...node.data,
							...nextData
						}
					};
				}, options);
			},
			updateEdge,
			updateEdgeData: (id, dataUpdate, options = { replace: false }) => {
				updateEdge(id, (edge) => {
					const nextData = typeof dataUpdate === "function" ? dataUpdate(edge) : dataUpdate;
					return options.replace ? {
						...edge,
						data: nextData
					} : {
						...edge,
						data: {
							...edge.data,
							...nextData
						}
					};
				}, options);
			},
			getNodesBounds: (nodes) => {
				const { nodeLookup, nodeOrigin } = store.getState();
				return getNodesBounds(nodes, {
					nodeLookup,
					nodeOrigin
				});
			},
			getHandleConnections: ({ type, id, nodeId }) => Array.from(store.getState().connectionLookup.get(`${nodeId}-${type}${id ? `-${id}` : ""}`)?.values() ?? []),
			getNodeConnections: ({ type, handleId, nodeId }) => Array.from(store.getState().connectionLookup.get(`${nodeId}${type ? handleId ? `-${type}-${handleId}` : `-${type}` : ""}`)?.values() ?? []),
			fitView: async (options) => {
				const fitViewResolver = store.getState().fitViewResolver ?? withResolvers();
				store.setState({
					fitViewQueued: true,
					fitViewOptions: options,
					fitViewResolver
				});
				batchContext.nodeQueue.push((nodes) => [...nodes]);
				return fitViewResolver.promise;
			}
		};
	}, []);
	return useMemo(() => {
		return {
			...generalHelper,
			...viewportHelper,
			viewportInitialized
		};
	}, [viewportInitialized]);
}
var selected = (item) => item.selected;
var win$1 = typeof window !== "undefined" ? window : void 0;
/**
* Hook for handling global key events.
*
* @internal
*/
function useGlobalKeyHandler({ deleteKeyCode, multiSelectionKeyCode }) {
	const store = useStoreApi();
	const { deleteElements } = useReactFlow();
	const deleteKeyPressed = useKeyPress(deleteKeyCode, { actInsideInputWithModifier: false });
	const multiSelectionKeyPressed = useKeyPress(multiSelectionKeyCode, { target: win$1 });
	useEffect(() => {
		if (deleteKeyPressed) {
			const { edges, nodes } = store.getState();
			deleteElements({
				nodes: nodes.filter(selected),
				edges: edges.filter(selected)
			});
			store.setState({ nodesSelectionActive: false });
		}
	}, [deleteKeyPressed]);
	useEffect(() => {
		store.setState({ multiSelectionActive: multiSelectionKeyPressed });
	}, [multiSelectionKeyPressed]);
}
/**
* Hook for handling resize events.
*
* @internal
*/
function useResizeHandler(domNode) {
	const store = useStoreApi();
	useEffect(() => {
		const updateDimensions = () => {
			if (!domNode.current || !(domNode.current.checkVisibility?.() ?? true)) return false;
			const size = getDimensions(domNode.current);
			if (size.height === 0 || size.width === 0) store.getState().onError?.("004", errorMessages["error004"]());
			store.setState({
				width: size.width || 500,
				height: size.height || 500
			});
		};
		if (domNode.current) {
			updateDimensions();
			window.addEventListener("resize", updateDimensions);
			const resizeObserver = new ResizeObserver(() => updateDimensions());
			resizeObserver.observe(domNode.current);
			return () => {
				window.removeEventListener("resize", updateDimensions);
				resizeObserver.disconnect();
			};
		}
	}, []);
}
var containerStyle = {
	position: "absolute",
	width: "100%",
	height: "100%",
	top: 0,
	left: 0
};
var selector$i = (s) => ({
	userSelectionActive: s.userSelectionActive,
	lib: s.lib,
	connectionInProgress: s.connection.inProgress
});
function ZoomPane({ onPaneContextMenu, zoomOnScroll = true, zoomOnPinch = true, panOnScroll = false, panActivationKeyPressed, panOnScrollSpeed = .5, panOnScrollMode = PanOnScrollMode.Free, zoomOnDoubleClick = true, panOnDrag = true, defaultViewport, translateExtent, minZoom, maxZoom, zoomActivationKeyCode, preventScrolling = true, children, noWheelClassName, noPanClassName, onViewportChange, isControlledViewport, paneClickDistance, selectionOnDrag }) {
	const store = useStoreApi();
	const zoomPane = useRef(null);
	const { userSelectionActive, lib, connectionInProgress } = useStore$2(selector$i, shallow$1);
	const zoomActivationKeyPressed = useKeyPress(zoomActivationKeyCode);
	const panZoom = useRef();
	useResizeHandler(zoomPane);
	const onTransformChange = useCallback((transform) => {
		onViewportChange?.({
			x: transform[0],
			y: transform[1],
			zoom: transform[2]
		});
		if (!isControlledViewport) store.setState({ transform });
	}, [onViewportChange, isControlledViewport]);
	useEffect(() => {
		if (zoomPane.current) {
			panZoom.current = XYPanZoom({
				domNode: zoomPane.current,
				minZoom,
				maxZoom,
				translateExtent,
				viewport: defaultViewport,
				onDraggingChange: (paneDragging) => store.setState((prevState) => prevState.paneDragging === paneDragging ? prevState : { paneDragging }),
				onPanZoomStart: (event, vp) => {
					const { onViewportChangeStart, onMoveStart } = store.getState();
					onMoveStart?.(event, vp);
					onViewportChangeStart?.(vp);
				},
				onPanZoom: (event, vp) => {
					const { onViewportChange, onMove } = store.getState();
					onMove?.(event, vp);
					onViewportChange?.(vp);
				},
				onPanZoomEnd: (event, vp) => {
					const { onViewportChangeEnd, onMoveEnd } = store.getState();
					onMoveEnd?.(event, vp);
					onViewportChangeEnd?.(vp);
				}
			});
			const { x, y, zoom } = panZoom.current.getViewport();
			store.setState({
				panZoom: panZoom.current,
				transform: [
					x,
					y,
					zoom
				],
				domNode: zoomPane.current.closest(".react-flow")
			});
			return () => {
				panZoom.current?.destroy();
			};
		}
	}, []);
	useEffect(() => {
		panZoom.current?.update({
			onPaneContextMenu,
			zoomOnScroll,
			zoomOnPinch,
			panOnScroll,
			panActivationKeyPressed,
			panOnScrollSpeed,
			panOnScrollMode,
			zoomOnDoubleClick,
			panOnDrag,
			zoomActivationKeyPressed,
			preventScrolling,
			noPanClassName,
			userSelectionActive,
			noWheelClassName,
			lib,
			onTransformChange,
			connectionInProgress,
			selectionOnDrag,
			paneClickDistance
		});
	}, [
		onPaneContextMenu,
		zoomOnScroll,
		zoomOnPinch,
		panOnScroll,
		panActivationKeyPressed,
		panOnScrollSpeed,
		panOnScrollMode,
		zoomOnDoubleClick,
		panOnDrag,
		zoomActivationKeyPressed,
		preventScrolling,
		noPanClassName,
		userSelectionActive,
		noWheelClassName,
		lib,
		onTransformChange,
		connectionInProgress,
		selectionOnDrag,
		paneClickDistance
	]);
	return jsx("div", {
		className: "react-flow__renderer",
		ref: zoomPane,
		style: containerStyle,
		children
	});
}
var selector$h = (s) => ({
	userSelectionActive: s.userSelectionActive,
	userSelectionRect: s.userSelectionRect
});
function UserSelection() {
	const { userSelectionActive, userSelectionRect } = useStore$2(selector$h, shallow$1);
	if (!(userSelectionActive && userSelectionRect)) return null;
	return jsx("div", {
		className: "react-flow__selection react-flow__container",
		style: {
			width: userSelectionRect.width,
			height: userSelectionRect.height,
			transform: `translate(${userSelectionRect.x}px, ${userSelectionRect.y}px)`
		}
	});
}
var wrapHandler = (handler, containerRef) => {
	return (event) => {
		if (event.target !== containerRef.current) return;
		handler?.(event);
	};
};
var selector$g = (s) => ({
	userSelectionActive: s.userSelectionActive,
	elementsSelectable: s.elementsSelectable,
	dragging: s.paneDragging,
	panBy: s.panBy,
	autoPanSpeed: s.autoPanSpeed
});
function Pane({ isSelecting, selectionKeyPressed, selectionMode = SelectionMode.Full, panOnDrag, autoPanOnSelection, paneClickDistance, selectionOnDrag, onSelectionStart, onSelectionEnd, onPaneClick, onPaneContextMenu, onPaneScroll, onPaneMouseEnter, onPaneMouseMove, onPaneMouseLeave, children }) {
	const autoPanId = useRef(0);
	const store = useStoreApi();
	const { userSelectionActive, elementsSelectable, dragging, panBy, autoPanSpeed } = useStore$2(selector$g, shallow$1);
	const isSelectionEnabled = elementsSelectable && (isSelecting || userSelectionActive);
	const container = useRef(null);
	const containerBounds = useRef();
	const selectedNodeIds = useRef(/* @__PURE__ */ new Set());
	const selectedEdgeIds = useRef(/* @__PURE__ */ new Set());
	const connectionEndedOnPane = useRef(false);
	const selectionInProgress = useRef(false);
	const position = useRef({
		x: 0,
		y: 0
	});
	const autoPanStarted = useRef(false);
	const onClick = (event) => {
		if (selectionInProgress.current || connectionEndedOnPane.current || store.getState().connection.inProgress) {
			selectionInProgress.current = false;
			connectionEndedOnPane.current = false;
			return;
		}
		const { connectionClickStartHandle, connection, onClickConnectEnd, resetSelectedElements } = store.getState();
		if (connectionClickStartHandle) {
			const connectionClone = structuredClone(connection);
			delete connectionClone.inProgress;
			connectionClone.toPosition = connectionClone.toHandle ? connectionClone.toHandle.position : null;
			onClickConnectEnd?.(event.nativeEvent, connectionClone);
			store.setState({ connectionClickStartHandle: null });
		}
		onPaneClick?.(event);
		resetSelectedElements();
		store.setState({ nodesSelectionActive: false });
	};
	const onContextMenu = (event) => {
		if (Array.isArray(panOnDrag) && panOnDrag?.includes(2)) {
			event.preventDefault();
			return;
		}
		onPaneContextMenu?.(event);
	};
	const onWheel = onPaneScroll ? (event) => onPaneScroll(event) : void 0;
	const onClickCapture = (event) => {
		if (selectionInProgress.current) {
			event.stopPropagation();
			selectionInProgress.current = false;
		}
	};
	const onPointerDownCapture = (event) => {
		if (event.pointerType === "touch" && panOnDrag !== false && !selectionKeyPressed) return;
		const { domNode, transform } = store.getState();
		containerBounds.current = domNode?.getBoundingClientRect();
		if (!containerBounds.current) return;
		const eventTargetIsContainer = event.target === container.current;
		if (!eventTargetIsContainer && !!event.target.closest(".nokey") || !isSelecting || !(selectionOnDrag && eventTargetIsContainer || selectionKeyPressed) || event.button !== 0 || !event.isPrimary) return;
		event.target?.setPointerCapture?.(event.pointerId);
		selectionInProgress.current = false;
		const { x, y } = getEventPosition(event.nativeEvent, containerBounds.current);
		const userSelectionStartPosition = pointToRendererPoint({
			x,
			y
		}, transform);
		store.setState({ userSelectionRect: {
			width: 0,
			height: 0,
			startX: userSelectionStartPosition.x,
			startY: userSelectionStartPosition.y,
			x,
			y
		} });
		if (!eventTargetIsContainer) {
			event.stopPropagation();
			event.preventDefault();
		}
	};
	function commitUserSelectionRect(mouseX, mouseY) {
		const { userSelectionRect } = store.getState();
		if (!userSelectionRect) return;
		const { transform, nodeLookup, edgeLookup, connectionLookup, triggerNodeChanges, triggerEdgeChanges, defaultEdgeOptions } = store.getState();
		const userStartPosition = {
			x: userSelectionRect.startX,
			y: userSelectionRect.startY
		};
		const { x: screenStartX, y: screenStartY } = rendererPointToPoint(userStartPosition, transform);
		const nextUserSelectRect = {
			startX: userStartPosition.x,
			startY: userStartPosition.y,
			x: mouseX < screenStartX ? mouseX : screenStartX,
			y: mouseY < screenStartY ? mouseY : screenStartY,
			width: Math.abs(mouseX - screenStartX),
			height: Math.abs(mouseY - screenStartY)
		};
		const prevSelectedNodeIds = selectedNodeIds.current;
		const prevSelectedEdgeIds = selectedEdgeIds.current;
		selectedNodeIds.current = new Set(getNodesInside(nodeLookup, nextUserSelectRect, transform, selectionMode === SelectionMode.Partial, true).map((node) => node.id));
		selectedEdgeIds.current = /* @__PURE__ */ new Set();
		const edgesSelectable = defaultEdgeOptions?.selectable ?? true;
		for (const nodeId of selectedNodeIds.current) {
			const connections = connectionLookup.get(nodeId);
			if (!connections) continue;
			for (const { edgeId } of connections.values()) {
				const edge = edgeLookup.get(edgeId);
				if (edge && (edge.selectable ?? edgesSelectable)) selectedEdgeIds.current.add(edgeId);
			}
		}
		if (!areSetsEqual(prevSelectedNodeIds, selectedNodeIds.current)) triggerNodeChanges(getSelectionChanges(nodeLookup, selectedNodeIds.current));
		if (!areSetsEqual(prevSelectedEdgeIds, selectedEdgeIds.current)) triggerEdgeChanges(getSelectionChanges(edgeLookup, selectedEdgeIds.current));
		store.setState({
			userSelectionRect: nextUserSelectRect,
			userSelectionActive: true,
			nodesSelectionActive: false
		});
	}
	function autoPan() {
		if (!autoPanOnSelection || !containerBounds.current) return;
		const [x, y] = calcAutoPan(position.current, containerBounds.current, autoPanSpeed);
		panBy({
			x,
			y
		}).then((panned) => {
			if (!selectionInProgress.current || !panned) {
				autoPanId.current = requestAnimationFrame(autoPan);
				return;
			}
			const { x: mx, y: my } = position.current;
			commitUserSelectionRect(mx, my);
			autoPanId.current = requestAnimationFrame(autoPan);
		});
	}
	const cleanupAutoPan = () => {
		cancelAnimationFrame(autoPanId.current);
		autoPanId.current = 0;
		autoPanStarted.current = false;
	};
	useEffect(() => {
		return () => cleanupAutoPan();
	}, []);
	const onPointerMove = (event) => {
		const { userSelectionRect, transform, resetSelectedElements } = store.getState();
		if (!containerBounds.current || !userSelectionRect) return;
		const { x: mouseX, y: mouseY } = getEventPosition(event.nativeEvent, containerBounds.current);
		position.current = {
			x: mouseX,
			y: mouseY
		};
		const screenStart = rendererPointToPoint({
			x: userSelectionRect.startX,
			y: userSelectionRect.startY
		}, transform);
		if (!selectionInProgress.current) {
			const requiredDistance = selectionKeyPressed ? 0 : paneClickDistance;
			if (Math.hypot(mouseX - screenStart.x, mouseY - screenStart.y) <= requiredDistance) return;
			resetSelectedElements();
			onSelectionStart?.(event);
		}
		selectionInProgress.current = true;
		if (!autoPanStarted.current) {
			autoPan();
			autoPanStarted.current = true;
		}
		commitUserSelectionRect(mouseX, mouseY);
	};
	const onPointerUp = (event) => {
		if (!isSelectionEnabled) {
			if (event.target === container.current && store.getState().connection.inProgress) connectionEndedOnPane.current = true;
			return;
		}
		if (event.button !== 0) return;
		event.target?.releasePointerCapture?.(event.pointerId);
		if (!userSelectionActive && event.target === container.current && store.getState().userSelectionRect) onClick?.(event);
		store.setState({
			userSelectionActive: false,
			userSelectionRect: null
		});
		if (selectionInProgress.current) {
			onSelectionEnd?.(event);
			store.setState({ nodesSelectionActive: selectedNodeIds.current.size > 0 });
		}
		cleanupAutoPan();
	};
	const onPointerCancel = (event) => {
		event.target?.releasePointerCapture?.(event.pointerId);
		cleanupAutoPan();
	};
	const draggable = panOnDrag === true || Array.isArray(panOnDrag) && panOnDrag.includes(0);
	return jsxs("div", {
		className: cc(["react-flow__pane", {
			draggable,
			dragging,
			selection: isSelecting
		}]),
		onClick: isSelectionEnabled ? void 0 : wrapHandler(onClick, container),
		onContextMenu: wrapHandler(onContextMenu, container),
		onWheel: wrapHandler(onWheel, container),
		onPointerEnter: isSelectionEnabled ? void 0 : onPaneMouseEnter,
		onPointerMove: isSelectionEnabled ? onPointerMove : onPaneMouseMove,
		onPointerUp,
		onPointerCancel: isSelectionEnabled ? onPointerCancel : void 0,
		onPointerDownCapture: isSelectionEnabled ? onPointerDownCapture : void 0,
		onClickCapture: isSelectionEnabled ? onClickCapture : void 0,
		onPointerLeave: onPaneMouseLeave,
		ref: container,
		style: containerStyle,
		children: [children, jsx(UserSelection, {})]
	});
}
function handleNodeClick({ id, store, unselect = false, nodeRef }) {
	const { addSelectedNodes, unselectNodesAndEdges, multiSelectionActive, nodeLookup, onError } = store.getState();
	const node = nodeLookup.get(id);
	if (!node) {
		onError?.("012", errorMessages["error012"](id));
		return;
	}
	store.setState({ nodesSelectionActive: false });
	if (!node.selected) addSelectedNodes([id]);
	else if (unselect || node.selected && multiSelectionActive) {
		unselectNodesAndEdges({
			nodes: [node],
			edges: []
		});
		requestAnimationFrame(() => nodeRef?.current?.blur());
	}
}
/**
* Hook for calling XYDrag helper from @xyflow/system.
*
* @internal
*/
function useDrag({ nodeRef, disabled = false, noDragClassName, handleSelector, nodeId, isSelectable, nodeClickDistance }) {
	const store = useStoreApi();
	const [dragging, setDragging] = useState(false);
	const xyDrag = useRef();
	useEffect(() => {
		if (disabled) return;
		xyDrag.current = XYDrag({
			getStoreItems: () => store.getState(),
			onNodeMouseDown: (id) => {
				handleNodeClick({
					id,
					store,
					nodeRef
				});
			},
			onDragStart: () => {
				setDragging(true);
			},
			onDragStop: () => {
				setDragging(false);
			}
		});
		return () => {
			xyDrag.current?.destroy();
			xyDrag.current = void 0;
		};
	}, [
		disabled,
		store,
		nodeRef
	]);
	useEffect(() => {
		if (disabled || !nodeRef.current || !xyDrag.current) return;
		xyDrag.current.update({
			noDragClassName,
			handleSelector,
			domNode: nodeRef.current,
			isSelectable,
			nodeId,
			nodeClickDistance
		});
	}, [
		noDragClassName,
		handleSelector,
		disabled,
		isSelectable,
		nodeRef,
		nodeId,
		nodeClickDistance
	]);
	return dragging;
}
var selectedAndDraggable = (nodesDraggable) => (n) => n.selected && (n.draggable || nodesDraggable && typeof n.draggable === "undefined");
/**
* Hook for updating node positions by passing a direction and factor
*
* @internal
* @returns function for updating node positions
*/
function useMoveSelectedNodes() {
	const store = useStoreApi();
	return useCallback((params) => {
		const { nodeExtent, snapToGrid, snapGrid, nodesDraggable, onError, updateNodePositions, nodeLookup, nodeOrigin } = store.getState();
		const nodeUpdates = /* @__PURE__ */ new Map();
		const isSelected = selectedAndDraggable(nodesDraggable);
		const xVelo = snapToGrid ? snapGrid[0] : 5;
		const yVelo = snapToGrid ? snapGrid[1] : 5;
		const xDiff = params.direction.x * xVelo * params.factor;
		const yDiff = params.direction.y * yVelo * params.factor;
		for (const [, node] of nodeLookup) {
			if (!isSelected(node)) continue;
			let nextPosition = {
				x: node.internals.positionAbsolute.x + xDiff,
				y: node.internals.positionAbsolute.y + yDiff
			};
			if (snapToGrid) nextPosition = snapPosition(nextPosition, snapGrid);
			const { position, positionAbsolute } = calculateNodePosition({
				nodeId: node.id,
				nextPosition,
				nodeLookup,
				nodeExtent,
				nodeOrigin,
				onError
			});
			node.position = position;
			node.internals.positionAbsolute = positionAbsolute;
			nodeUpdates.set(node.id, node);
		}
		updateNodePositions(nodeUpdates);
	}, []);
}
var NodeIdContext = createContext(null);
var Provider = NodeIdContext.Provider;
NodeIdContext.Consumer;
/**
* You can use this hook to get the id of the node it is used inside. It is useful
* if you need the node's id deeper in the render tree but don't want to manually
* drill down the id as a prop.
*
* @public
* @returns The id for a node in the flow.
*
* @example
*```jsx
*import { useNodeId } from '@xyflow/react';
*
*export default function CustomNode() {
*  return (
*    <div>
*      <span>This node has an id of </span>
*      <NodeIdDisplay />
*    </div>
*  );
*}
*
*function NodeIdDisplay() {
*  const nodeId = useNodeId();
*
*  return <span>{nodeId}</span>;
*}
*```
*/
var useNodeId = () => {
	return useContext(NodeIdContext);
};
var selector$f = (s) => ({
	connectOnClick: s.connectOnClick,
	noPanClassName: s.noPanClassName,
	rfId: s.rfId
});
var HandleConfigContext = createContext(null);
function HandleConfigProvider({ children }) {
	const config = useStore$2(selector$f, shallow$1);
	return jsx(HandleConfigContext.Provider, {
		value: config,
		children
	});
}
function useHandleConfig() {
	const config = useContext(HandleConfigContext);
	if (!config) throw new Error("useHandleConfig must be used within a HandleConfigProvider");
	return config;
}
var idleConnectingState = {
	connectingFrom: false,
	connectingTo: false,
	clickConnecting: false,
	isPossibleEndHandle: true,
	connectionInProcess: false,
	clickConnectionInProcess: false,
	valid: false
};
var connectingSelector = (nodeId, handleId, type) => (state) => {
	const { connectionClickStartHandle: clickHandle, connectionMode, connection } = state;
	const { fromHandle, toHandle, isValid } = connection;
	if (!fromHandle && !clickHandle) return idleConnectingState;
	const connectingTo = toHandle?.nodeId === nodeId && toHandle?.id === handleId && toHandle?.type === type;
	return {
		connectingFrom: fromHandle?.nodeId === nodeId && fromHandle?.id === handleId && fromHandle?.type === type,
		connectingTo,
		clickConnecting: clickHandle?.nodeId === nodeId && clickHandle?.id === handleId && clickHandle?.type === type,
		isPossibleEndHandle: connectionMode === ConnectionMode.Strict ? fromHandle?.type !== type : nodeId !== fromHandle?.nodeId || handleId !== fromHandle?.id,
		connectionInProcess: !!fromHandle,
		clickConnectionInProcess: !!clickHandle,
		valid: connectingTo && isValid
	};
};
function HandleComponent({ type = "source", position = Position.Top, isValidConnection, isConnectable = true, isConnectableStart = true, isConnectableEnd = true, id, onConnect, children, className, onMouseDown, onTouchStart, ...rest }, ref) {
	const handleId = id || null;
	const isTarget = type === "target";
	const store = useStoreApi();
	const nodeId = useNodeId();
	const { connectOnClick, noPanClassName, rfId } = useHandleConfig();
	const { connectingFrom, connectingTo, clickConnecting, isPossibleEndHandle, connectionInProcess, clickConnectionInProcess, valid } = useStore$2(connectingSelector(nodeId, handleId, type), shallow$1);
	if (!nodeId) store.getState().onError?.("010", errorMessages["error010"]());
	const onConnectExtended = (params) => {
		const { defaultEdgeOptions, onConnect: onConnectAction, hasDefaultEdges } = store.getState();
		const edgeParams = {
			...defaultEdgeOptions,
			...params
		};
		if (hasDefaultEdges) {
			const { edges, setEdges, onError } = store.getState();
			setEdges(addEdge(edgeParams, edges, { onError }));
		}
		onConnectAction?.(edgeParams);
		onConnect?.(edgeParams);
	};
	const onPointerDown = (event) => {
		if (!nodeId) return;
		const isMouseTriggered = isMouseEvent(event.nativeEvent);
		if (isConnectableStart && (isMouseTriggered && event.button === 0 || !isMouseTriggered)) {
			const currentStore = store.getState();
			XYHandle.onPointerDown(event.nativeEvent, {
				handleDomNode: event.currentTarget,
				autoPanOnConnect: currentStore.autoPanOnConnect,
				connectionMode: currentStore.connectionMode,
				connectionRadius: currentStore.connectionRadius,
				domNode: currentStore.domNode,
				nodeLookup: currentStore.nodeLookup,
				lib: currentStore.lib,
				isTarget,
				handleId,
				nodeId,
				flowId: currentStore.rfId,
				panBy: currentStore.panBy,
				cancelConnection: currentStore.cancelConnection,
				onConnectStart: currentStore.onConnectStart,
				onConnectEnd: (...args) => store.getState().onConnectEnd?.(...args),
				updateConnection: currentStore.updateConnection,
				onConnect: onConnectExtended,
				isValidConnection: isValidConnection || ((...args) => store.getState().isValidConnection?.(...args) ?? true),
				getTransform: () => store.getState().transform,
				getFromHandle: () => store.getState().connection.fromHandle,
				autoPanSpeed: currentStore.autoPanSpeed,
				dragThreshold: currentStore.connectionDragThreshold
			});
		}
		if (isMouseTriggered) onMouseDown?.(event);
		else onTouchStart?.(event);
	};
	const onClick = (event) => {
		const { onClickConnectStart, onClickConnectEnd, connectionClickStartHandle, connectionMode, isValidConnection: isValidConnectionStore, lib, rfId: flowId, nodeLookup, connection: connectionState } = store.getState();
		if (!nodeId || !connectionClickStartHandle && !isConnectableStart) return;
		if (!connectionClickStartHandle) {
			onClickConnectStart?.(event.nativeEvent, {
				nodeId,
				handleId,
				handleType: type
			});
			store.setState({ connectionClickStartHandle: {
				nodeId,
				type,
				id: handleId
			} });
			return;
		}
		const doc = getHostForElement(event.target);
		const isValidConnectionHandler = isValidConnection || isValidConnectionStore;
		const { connection, isValid } = XYHandle.isValid(event.nativeEvent, {
			handle: {
				nodeId,
				id: handleId,
				type
			},
			connectionMode,
			fromNodeId: connectionClickStartHandle.nodeId,
			fromHandleId: connectionClickStartHandle.id || null,
			fromType: connectionClickStartHandle.type,
			isValidConnection: isValidConnectionHandler,
			flowId,
			doc,
			lib,
			nodeLookup
		});
		if (isValid && connection) onConnectExtended(connection);
		const connectionClone = structuredClone(connectionState);
		delete connectionClone.inProgress;
		connectionClone.toPosition = connectionClone.toHandle ? connectionClone.toHandle.position : null;
		onClickConnectEnd?.(event, connectionClone);
		store.setState({ connectionClickStartHandle: null });
	};
	return jsx("div", {
		"data-handleid": handleId,
		"data-nodeid": nodeId,
		"data-handlepos": position,
		"data-id": `${rfId}-${nodeId}-${handleId}-${type}`,
		className: cc([
			"react-flow__handle",
			`react-flow__handle-${position}`,
			"nodrag",
			noPanClassName,
			className,
			{
				source: !isTarget,
				target: isTarget,
				connectable: isConnectable,
				connectablestart: isConnectableStart,
				connectableend: isConnectableEnd,
				clickconnecting: clickConnecting,
				connectingfrom: connectingFrom,
				connectingto: connectingTo,
				valid,
				connectionindicator: isConnectable && (!connectionInProcess || isPossibleEndHandle) && (connectionInProcess || clickConnectionInProcess ? isConnectableEnd : isConnectableStart)
			}
		]),
		onMouseDown: onPointerDown,
		onTouchStart: onPointerDown,
		onClick: connectOnClick ? onClick : void 0,
		ref,
		...rest,
		children
	});
}
/**
* The `<Handle />` component is used in your [custom nodes](/learn/customization/custom-nodes)
* to define connection points.
*
*@public
*
*@example
*
*```jsx
*import { Handle, Position } from '@xyflow/react';
*
*export function CustomNode({ data }) {
*  return (
*    <>
*      <div style={{ padding: '10px 20px' }}>
*        {data.label}
*      </div>
*
*      <Handle type="target" position={Position.Left} />
*      <Handle type="source" position={Position.Right} />
*    </>
*  );
*};
*```
*/
var Handle = memo(fixedForwardRef(HandleComponent));
function InputNode({ data, isConnectable, sourcePosition = Position.Bottom }) {
	return jsxs(Fragment$1, { children: [data?.label, jsx(Handle, {
		type: "source",
		position: sourcePosition,
		isConnectable
	})] });
}
function DefaultNode({ data, isConnectable, targetPosition = Position.Top, sourcePosition = Position.Bottom }) {
	return jsxs(Fragment$1, { children: [
		jsx(Handle, {
			type: "target",
			position: targetPosition,
			isConnectable
		}),
		data?.label,
		jsx(Handle, {
			type: "source",
			position: sourcePosition,
			isConnectable
		})
	] });
}
function GroupNode() {
	return null;
}
function OutputNode({ data, isConnectable, targetPosition = Position.Top }) {
	return jsxs(Fragment$1, { children: [jsx(Handle, {
		type: "target",
		position: targetPosition,
		isConnectable
	}), data?.label] });
}
var arrowKeyDiffs = {
	ArrowUp: {
		x: 0,
		y: -1
	},
	ArrowDown: {
		x: 0,
		y: 1
	},
	ArrowLeft: {
		x: -1,
		y: 0
	},
	ArrowRight: {
		x: 1,
		y: 0
	}
};
var builtinNodeTypes = {
	input: InputNode,
	default: DefaultNode,
	output: OutputNode,
	group: GroupNode
};
function getNodeInlineStyleDimensions(node) {
	if (node.internals.handleBounds === void 0) return {
		width: node.width ?? node.initialWidth ?? node.style?.width,
		height: node.height ?? node.initialHeight ?? node.style?.height
	};
	return {
		width: node.width ?? node.style?.width,
		height: node.height ?? node.style?.height
	};
}
var selector$e = (s) => {
	const { width, height, x, y } = getInternalNodesBounds(s.nodeLookup, { filter: (node) => !!node.selected });
	return {
		width: isNumeric(width) ? width : null,
		height: isNumeric(height) ? height : null,
		userSelectionActive: s.userSelectionActive,
		transformString: `translate(${s.transform[0]}px,${s.transform[1]}px) scale(${s.transform[2]}) translate(${x}px,${y}px)`
	};
};
function NodesSelection({ onSelectionContextMenu, noPanClassName, disableKeyboardA11y }) {
	const store = useStoreApi();
	const { width, height, transformString, userSelectionActive } = useStore$2(selector$e, shallow$1);
	const moveSelectedNodes = useMoveSelectedNodes();
	const nodeRef = useRef(null);
	useEffect(() => {
		if (!disableKeyboardA11y) nodeRef.current?.focus({ preventScroll: true });
	}, [disableKeyboardA11y]);
	const shouldRender = !userSelectionActive && width !== null && height !== null;
	useDrag({
		nodeRef,
		disabled: !shouldRender
	});
	if (!shouldRender) return null;
	const onContextMenu = onSelectionContextMenu ? (event) => {
		onSelectionContextMenu(event, store.getState().nodes.filter((n) => n.selected));
	} : void 0;
	const onKeyDown = (event) => {
		if (Object.prototype.hasOwnProperty.call(arrowKeyDiffs, event.key)) {
			event.preventDefault();
			moveSelectedNodes({
				direction: arrowKeyDiffs[event.key],
				factor: event.shiftKey ? 4 : 1
			});
		}
	};
	return jsx("div", {
		className: cc([
			"react-flow__nodesselection",
			"react-flow__container",
			noPanClassName
		]),
		style: { transform: transformString },
		children: jsx("div", {
			ref: nodeRef,
			className: "react-flow__nodesselection-rect",
			onContextMenu,
			tabIndex: disableKeyboardA11y ? void 0 : -1,
			onKeyDown: disableKeyboardA11y ? void 0 : onKeyDown,
			style: {
				width,
				height
			}
		})
	});
}
var win = typeof window !== "undefined" ? window : void 0;
var selector$d = (s) => {
	return {
		nodesSelectionActive: s.nodesSelectionActive,
		userSelectionActive: s.userSelectionActive
	};
};
function FlowRendererComponent({ children, onPaneClick, onPaneMouseEnter, onPaneMouseMove, onPaneMouseLeave, onPaneContextMenu, onPaneScroll, paneClickDistance, deleteKeyCode, selectionKeyCode, selectionOnDrag, selectionMode, onSelectionStart, onSelectionEnd, multiSelectionKeyCode, panActivationKeyCode, zoomActivationKeyCode, elementsSelectable, zoomOnScroll, zoomOnPinch, panOnScroll: _panOnScroll, panOnScrollSpeed, panOnScrollMode, zoomOnDoubleClick, panOnDrag: _panOnDrag, autoPanOnSelection, defaultViewport, translateExtent, minZoom, maxZoom, preventScrolling, onSelectionContextMenu, noWheelClassName, noPanClassName, disableKeyboardA11y, onViewportChange, isControlledViewport }) {
	const { nodesSelectionActive, userSelectionActive } = useStore$2(selector$d, shallow$1);
	const selectionKeyPressed = useKeyPress(selectionKeyCode, { target: win });
	const panActivationKeyPressed = useKeyPress(panActivationKeyCode, { target: win });
	const panOnDrag = panActivationKeyPressed || _panOnDrag;
	const panOnScroll = panActivationKeyPressed || _panOnScroll;
	const _selectionOnDrag = selectionOnDrag && panOnDrag !== true;
	const isSelecting = selectionKeyPressed || userSelectionActive || _selectionOnDrag;
	useGlobalKeyHandler({
		deleteKeyCode,
		multiSelectionKeyCode
	});
	return jsx(ZoomPane, {
		onPaneContextMenu,
		elementsSelectable,
		zoomOnScroll,
		zoomOnPinch,
		panOnScroll,
		panActivationKeyPressed,
		panOnScrollSpeed,
		panOnScrollMode,
		zoomOnDoubleClick,
		panOnDrag: !selectionKeyPressed && panOnDrag,
		defaultViewport,
		translateExtent,
		minZoom,
		maxZoom,
		zoomActivationKeyCode,
		preventScrolling,
		noWheelClassName,
		noPanClassName,
		onViewportChange,
		isControlledViewport,
		paneClickDistance,
		selectionOnDrag: _selectionOnDrag,
		children: jsxs(Pane, {
			onSelectionStart,
			onSelectionEnd,
			onPaneClick,
			onPaneMouseEnter,
			onPaneMouseMove,
			onPaneMouseLeave,
			onPaneContextMenu,
			onPaneScroll,
			panOnDrag,
			autoPanOnSelection,
			isSelecting: !!isSelecting,
			selectionMode,
			selectionKeyPressed,
			paneClickDistance,
			selectionOnDrag: _selectionOnDrag,
			children: [children, nodesSelectionActive && jsx(NodesSelection, {
				onSelectionContextMenu,
				noPanClassName,
				disableKeyboardA11y
			})]
		})
	});
}
FlowRendererComponent.displayName = "FlowRenderer";
var FlowRenderer = memo(FlowRendererComponent);
var selector$c = (onlyRenderVisible) => (s) => {
	return onlyRenderVisible ? getNodesInside(s.nodeLookup, {
		x: 0,
		y: 0,
		width: s.width,
		height: s.height
	}, s.transform, true).map((node) => node.id) : Array.from(s.nodeLookup.keys());
};
/**
* Hook for getting the visible node ids from the store.
*
* @internal
* @param onlyRenderVisible
* @returns array with visible node ids
*/
function useVisibleNodeIds(onlyRenderVisible) {
	return useStore$2(useCallback(selector$c(onlyRenderVisible), [onlyRenderVisible]), shallow$1);
}
var selector$b = (s) => s.updateNodeInternals;
function useResizeObserver() {
	const updateNodeInternals = useStore$2(selector$b);
	const [resizeObserver] = useState(() => {
		if (typeof ResizeObserver === "undefined") return null;
		return new ResizeObserver((entries) => {
			const updates = /* @__PURE__ */ new Map();
			entries.forEach((entry) => {
				const id = entry.target.getAttribute("data-id");
				updates.set(id, {
					id,
					nodeElement: entry.target,
					force: true
				});
			});
			updateNodeInternals(updates);
		});
	});
	useEffect(() => {
		return () => {
			resizeObserver?.disconnect();
		};
	}, [resizeObserver]);
	return resizeObserver;
}
/**
* Hook to handle the resize observation + internal updates for the passed node.
*
* @internal
* @returns nodeRef - reference to the node element
*/
function useNodeObserver({ node, nodeType, hasDimensions, resizeObserver }) {
	const store = useStoreApi();
	const nodeRef = useRef(null);
	const observedNode = useRef(null);
	const prevSourcePosition = useRef(node.sourcePosition);
	const prevTargetPosition = useRef(node.targetPosition);
	const prevType = useRef(nodeType);
	const isInitialized = hasDimensions && !!node.internals.handleBounds;
	useEffect(() => {
		if (nodeRef.current && !node.hidden && (!isInitialized || observedNode.current !== nodeRef.current)) {
			if (observedNode.current) resizeObserver?.unobserve(observedNode.current);
			resizeObserver?.observe(nodeRef.current);
			observedNode.current = nodeRef.current;
		}
	}, [isInitialized, node.hidden]);
	useEffect(() => {
		return () => {
			if (observedNode.current) {
				resizeObserver?.unobserve(observedNode.current);
				observedNode.current = null;
			}
		};
	}, []);
	useEffect(() => {
		if (nodeRef.current) {
			const typeChanged = prevType.current !== nodeType;
			const sourcePosChanged = prevSourcePosition.current !== node.sourcePosition;
			const targetPosChanged = prevTargetPosition.current !== node.targetPosition;
			if (typeChanged || sourcePosChanged || targetPosChanged) {
				prevType.current = nodeType;
				prevSourcePosition.current = node.sourcePosition;
				prevTargetPosition.current = node.targetPosition;
				store.getState().updateNodeInternals(/* @__PURE__ */ new Map([[node.id, {
					id: node.id,
					nodeElement: nodeRef.current,
					force: true
				}]]));
			}
		}
	}, [
		node.id,
		nodeType,
		node.sourcePosition,
		node.targetPosition
	]);
	return nodeRef;
}
function NodeWrapper({ id, onClick, onMouseEnter, onMouseMove, onMouseLeave, onContextMenu, onDoubleClick, nodesDraggable, elementsSelectable, nodesConnectable, nodesFocusable, resizeObserver, noDragClassName, noPanClassName, disableKeyboardA11y, rfId, nodeTypes, nodeClickDistance, onError }) {
	const { node, internals, isParent } = useStore$2((s) => {
		const node = s.nodeLookup.get(id);
		const isParent = s.parentLookup.has(id);
		return {
			node,
			internals: node.internals,
			isParent
		};
	}, shallow$1);
	let nodeType = node.type || "default";
	let NodeComponent = nodeTypes?.[nodeType] || builtinNodeTypes[nodeType];
	if (NodeComponent === void 0) {
		onError?.("003", errorMessages["error003"](nodeType));
		nodeType = "default";
		NodeComponent = nodeTypes?.["default"] || builtinNodeTypes.default;
	}
	const isDraggable = !!(node.draggable || nodesDraggable && typeof node.draggable === "undefined");
	const isSelectable = !!(node.selectable || elementsSelectable && typeof node.selectable === "undefined");
	const isConnectable = !!(node.connectable || nodesConnectable && typeof node.connectable === "undefined");
	const isFocusable = !!(node.focusable || nodesFocusable && typeof node.focusable === "undefined");
	const store = useStoreApi();
	const hasDimensions = nodeHasDimensions(node);
	const nodeRef = useNodeObserver({
		node,
		nodeType,
		hasDimensions,
		resizeObserver
	});
	const dragging = useDrag({
		nodeRef,
		disabled: node.hidden || !isDraggable,
		noDragClassName,
		handleSelector: node.dragHandle,
		nodeId: id,
		isSelectable,
		nodeClickDistance
	});
	const moveSelectedNodes = useMoveSelectedNodes();
	if (node.hidden) return null;
	const nodeDimensions = getNodeDimensions(node);
	const inlineDimensions = getNodeInlineStyleDimensions(node);
	const hasPointerEvents = isSelectable || isDraggable || onClick || onMouseEnter || onMouseMove || onMouseLeave;
	const onMouseEnterHandler = onMouseEnter ? (event) => onMouseEnter(event, { ...internals.userNode }) : void 0;
	const onMouseMoveHandler = onMouseMove ? (event) => onMouseMove(event, { ...internals.userNode }) : void 0;
	const onMouseLeaveHandler = onMouseLeave ? (event) => onMouseLeave(event, { ...internals.userNode }) : void 0;
	const onContextMenuHandler = onContextMenu ? (event) => onContextMenu(event, { ...internals.userNode }) : void 0;
	const onDoubleClickHandler = onDoubleClick ? (event) => onDoubleClick(event, { ...internals.userNode }) : void 0;
	const onSelectNodeHandler = (event) => {
		const { selectNodesOnDrag, nodeDragThreshold } = store.getState();
		if (isSelectable && (!selectNodesOnDrag || !isDraggable || nodeDragThreshold > 0)) handleNodeClick({
			id,
			store,
			nodeRef
		});
		if (onClick) onClick(event, { ...internals.userNode });
	};
	const onKeyDown = (event) => {
		if (isInputDOMNode(event.nativeEvent) || disableKeyboardA11y) return;
		if (elementSelectionKeys.includes(event.key) && isSelectable) {
			const unselect = event.key === "Escape";
			handleNodeClick({
				id,
				store,
				unselect,
				nodeRef
			});
		} else if (isDraggable && node.selected && Object.prototype.hasOwnProperty.call(arrowKeyDiffs, event.key)) {
			event.preventDefault();
			const { ariaLabelConfig } = store.getState();
			store.setState({ ariaLiveMessage: ariaLabelConfig["node.a11yDescription.ariaLiveMessage"]({
				direction: event.key.replace("Arrow", "").toLowerCase(),
				x: ~~internals.positionAbsolute.x,
				y: ~~internals.positionAbsolute.y
			}) });
			moveSelectedNodes({
				direction: arrowKeyDiffs[event.key],
				factor: event.shiftKey ? 4 : 1
			});
		}
	};
	const onFocus = () => {
		if (disableKeyboardA11y || !nodeRef.current?.matches(":focus-visible")) return;
		const { transform, width, height, autoPanOnNodeFocus, setCenter } = store.getState();
		if (!autoPanOnNodeFocus) return;
		if (!(getNodesInside(/* @__PURE__ */ new Map([[id, node]]), {
			x: 0,
			y: 0,
			width,
			height
		}, transform, true).length > 0)) setCenter(node.position.x + nodeDimensions.width / 2, node.position.y + nodeDimensions.height / 2, { zoom: transform[2] });
	};
	return jsx("div", {
		className: cc([
			"react-flow__node",
			`react-flow__node-${nodeType}`,
			{ [noPanClassName]: isDraggable },
			node.className,
			{
				selected: node.selected,
				selectable: isSelectable,
				parent: isParent,
				draggable: isDraggable,
				dragging
			}
		]),
		ref: nodeRef,
		style: {
			zIndex: internals.z,
			transform: `translate(${internals.positionAbsolute.x}px,${internals.positionAbsolute.y}px)`,
			pointerEvents: hasPointerEvents ? "all" : "none",
			visibility: hasDimensions ? "visible" : "hidden",
			...node.style,
			...inlineDimensions
		},
		"data-id": id,
		"data-testid": `rf__node-${id}`,
		onMouseEnter: onMouseEnterHandler,
		onMouseMove: onMouseMoveHandler,
		onMouseLeave: onMouseLeaveHandler,
		onContextMenu: onContextMenuHandler,
		onClick: onSelectNodeHandler,
		onDoubleClick: onDoubleClickHandler,
		onKeyDown: isFocusable ? onKeyDown : void 0,
		tabIndex: isFocusable ? 0 : void 0,
		onFocus: isFocusable ? onFocus : void 0,
		role: node.ariaRole ?? (isFocusable ? "group" : void 0),
		"aria-roledescription": "node",
		"aria-describedby": disableKeyboardA11y ? void 0 : `${ARIA_NODE_DESC_KEY}-${rfId}`,
		"aria-label": node.ariaLabel,
		...node.domAttributes,
		children: jsx(Provider, {
			value: id,
			children: jsx(NodeComponent, {
				id,
				data: node.data,
				type: nodeType,
				positionAbsoluteX: internals.positionAbsolute.x,
				positionAbsoluteY: internals.positionAbsolute.y,
				selected: node.selected ?? false,
				selectable: isSelectable,
				draggable: isDraggable,
				deletable: node.deletable ?? true,
				isConnectable,
				sourcePosition: node.sourcePosition,
				targetPosition: node.targetPosition,
				dragging,
				dragHandle: node.dragHandle,
				zIndex: internals.z,
				parentId: node.parentId,
				...nodeDimensions
			})
		})
	});
}
var NodeWrapper$1 = memo(NodeWrapper);
var selector$a = (s) => ({
	nodesConnectable: s.nodesConnectable,
	nodesFocusable: s.nodesFocusable,
	elementsSelectable: s.elementsSelectable,
	onError: s.onError
});
function NodeRendererComponent(props) {
	const { nodesConnectable, nodesFocusable, elementsSelectable, onError } = useStore$2(selector$a, shallow$1);
	const nodeIds = useVisibleNodeIds(props.onlyRenderVisibleElements);
	const resizeObserver = useResizeObserver();
	return jsx("div", {
		className: "react-flow__nodes",
		style: containerStyle,
		children: nodeIds.map((nodeId) => {
			return jsx(NodeWrapper$1, {
				id: nodeId,
				nodeTypes: props.nodeTypes,
				nodeExtent: props.nodeExtent,
				onClick: props.onNodeClick,
				onMouseEnter: props.onNodeMouseEnter,
				onMouseMove: props.onNodeMouseMove,
				onMouseLeave: props.onNodeMouseLeave,
				onContextMenu: props.onNodeContextMenu,
				onDoubleClick: props.onNodeDoubleClick,
				noDragClassName: props.noDragClassName,
				noPanClassName: props.noPanClassName,
				rfId: props.rfId,
				disableKeyboardA11y: props.disableKeyboardA11y,
				resizeObserver,
				nodesDraggable: props.nodesDraggable ?? true,
				nodesConnectable,
				nodesFocusable,
				elementsSelectable,
				nodeClickDistance: props.nodeClickDistance,
				onError
			}, nodeId);
		})
	});
}
NodeRendererComponent.displayName = "NodeRenderer";
var NodeRenderer = memo(NodeRendererComponent);
/**
* Hook for getting the visible edge ids from the store.
*
* @internal
* @param onlyRenderVisible
* @returns array with visible edge ids
*/
function useVisibleEdgeIds(onlyRenderVisible) {
	return useStore$2(useCallback((s) => {
		if (!onlyRenderVisible) return s.edges.map((edge) => edge.id);
		const visibleEdgeIds = [];
		if (s.width && s.height) for (const edge of s.edges) {
			const sourceNode = s.nodeLookup.get(edge.source);
			const targetNode = s.nodeLookup.get(edge.target);
			if (sourceNode && targetNode && isEdgeVisible({
				sourceNode,
				targetNode,
				width: s.width,
				height: s.height,
				transform: s.transform
			})) visibleEdgeIds.push(edge.id);
		}
		return visibleEdgeIds;
	}, [onlyRenderVisible]), shallow$1);
}
var ArrowSymbol = ({ color = "none", strokeWidth = 1 }) => {
	const style = {
		strokeWidth,
		...color && { stroke: color }
	};
	return jsx("polyline", {
		className: "arrow",
		style,
		strokeLinecap: "round",
		fill: "none",
		strokeLinejoin: "round",
		points: "-5,-4 0,0 -5,4"
	});
};
var ArrowClosedSymbol = ({ color = "none", strokeWidth = 1 }) => {
	const style = {
		strokeWidth,
		...color && {
			stroke: color,
			fill: color
		}
	};
	return jsx("polyline", {
		className: "arrowclosed",
		style,
		strokeLinecap: "round",
		strokeLinejoin: "round",
		points: "-5,-4 0,0 -5,4 -5,-4"
	});
};
var MarkerSymbols = {
	[MarkerType.Arrow]: ArrowSymbol,
	[MarkerType.ArrowClosed]: ArrowClosedSymbol
};
function useMarkerSymbol(type) {
	const store = useStoreApi();
	return useMemo(() => {
		if (!Object.prototype.hasOwnProperty.call(MarkerSymbols, type)) {
			store.getState().onError?.("009", errorMessages["error009"](type));
			return null;
		}
		return MarkerSymbols[type];
	}, [type]);
}
var Marker = ({ id, type, color, width = 12.5, height = 12.5, markerUnits = "strokeWidth", strokeWidth, orient = "auto-start-reverse" }) => {
	const Symbol = useMarkerSymbol(type);
	if (!Symbol) return null;
	return jsx("marker", {
		className: "react-flow__arrowhead",
		id,
		markerWidth: `${width}`,
		markerHeight: `${height}`,
		viewBox: "-10 -10 20 20",
		markerUnits,
		orient,
		refX: "0",
		refY: "0",
		children: jsx(Symbol, {
			color,
			strokeWidth
		})
	});
};
var MarkerDefinitions = ({ defaultColor, rfId }) => {
	const edges = useStore$2((s) => s.edges);
	const defaultEdgeOptions = useStore$2((s) => s.defaultEdgeOptions);
	const markers = useMemo(() => {
		return createMarkerIds(edges, {
			id: rfId,
			defaultColor,
			defaultMarkerStart: defaultEdgeOptions?.markerStart,
			defaultMarkerEnd: defaultEdgeOptions?.markerEnd
		});
	}, [
		edges,
		defaultEdgeOptions,
		rfId,
		defaultColor
	]);
	if (!markers.length) return null;
	return jsx("svg", {
		className: "react-flow__marker",
		"aria-hidden": "true",
		children: jsx("defs", { children: markers.map((marker) => jsx(Marker, {
			id: marker.id,
			type: marker.type,
			color: marker.color,
			width: marker.width,
			height: marker.height,
			markerUnits: marker.markerUnits,
			strokeWidth: marker.strokeWidth,
			orient: marker.orient
		}, marker.id)) })
	});
};
MarkerDefinitions.displayName = "MarkerDefinitions";
var MarkerDefinitions$1 = memo(MarkerDefinitions);
function EdgeTextComponent({ x, y, label, labelStyle, labelShowBg = true, labelBgStyle, labelBgPadding = [2, 4], labelBgBorderRadius = 2, children, className, ...rest }) {
	const [edgeTextBbox, setEdgeTextBbox] = useState({
		x: 1,
		y: 0,
		width: 0,
		height: 0
	});
	const edgeTextClasses = cc(["react-flow__edge-textwrapper", className]);
	const edgeTextRef = useRef(null);
	useEffect(() => {
		if (edgeTextRef.current) {
			const textBbox = edgeTextRef.current.getBBox();
			setEdgeTextBbox({
				x: textBbox.x,
				y: textBbox.y,
				width: textBbox.width,
				height: textBbox.height
			});
		}
	}, [label]);
	if (!label) return null;
	return jsxs("g", {
		transform: `translate(${x - edgeTextBbox.width / 2} ${y - edgeTextBbox.height / 2})`,
		className: edgeTextClasses,
		visibility: edgeTextBbox.width ? "visible" : "hidden",
		...rest,
		children: [
			labelShowBg && jsx("rect", {
				width: edgeTextBbox.width + 2 * labelBgPadding[0],
				x: -labelBgPadding[0],
				y: -labelBgPadding[1],
				height: edgeTextBbox.height + 2 * labelBgPadding[1],
				className: "react-flow__edge-textbg",
				style: labelBgStyle,
				rx: labelBgBorderRadius,
				ry: labelBgBorderRadius
			}),
			jsx("text", {
				className: "react-flow__edge-text",
				y: edgeTextBbox.height / 2,
				dy: "0.3em",
				ref: edgeTextRef,
				style: labelStyle,
				children: label
			}),
			children
		]
	});
}
EdgeTextComponent.displayName = "EdgeText";
/**
* You can use the `<EdgeText />` component as a helper component to display text
* within your custom edges.
*
* @public
*
* @example
* ```jsx
* import { EdgeText } from '@xyflow/react';
*
* export function CustomEdgeLabel({ label }) {
*   return (
*     <EdgeText
*       x={100}
*       y={100}
*       label={label}
*       labelStyle={{ fill: 'white' }}
*       labelShowBg
*       labelBgStyle={{ fill: 'red' }}
*       labelBgPadding={[2, 4]}
*       labelBgBorderRadius={2}
*     />
*   );
* }
*```
*/
var EdgeText = memo(EdgeTextComponent);
/**
* The `<BaseEdge />` component gets used internally for all the edges. It can be
* used inside a custom edge and handles the invisible helper edge and the edge label
* for you.
*
* @public
* @example
* ```jsx
*import { BaseEdge } from '@xyflow/react';
*
*export function CustomEdge({ sourceX, sourceY, targetX, targetY, ...props }) {
*  const [edgePath] = getStraightPath({
*    sourceX,
*    sourceY,
*    targetX,
*    targetY,
*  });
*
*  return <BaseEdge path={edgePath} {...props} />;
*}
*```
*
* @remarks If you want to use an edge marker with the [`<BaseEdge />`](/api-reference/components/base-edge) component,
* you can pass the `markerStart` or `markerEnd` props passed to your custom edge
* through to the [`<BaseEdge />`](/api-reference/components/base-edge) component.
* You can see all the props passed to a custom edge by looking at the [`EdgeProps`](/api-reference/types/edge-props) type.
*/
function BaseEdge({ path, labelX, labelY, label, labelStyle, labelShowBg, labelBgStyle, labelBgPadding, labelBgBorderRadius, interactionWidth = 20, ...props }) {
	return jsxs(Fragment$1, { children: [
		jsx("path", {
			...props,
			d: path,
			fill: "none",
			className: cc(["react-flow__edge-path", props.className])
		}),
		interactionWidth ? jsx("path", {
			d: path,
			fill: "none",
			strokeOpacity: 0,
			strokeWidth: interactionWidth,
			className: "react-flow__edge-interaction"
		}) : null,
		label && isNumeric(labelX) && isNumeric(labelY) ? jsx(EdgeText, {
			x: labelX,
			y: labelY,
			label,
			labelStyle,
			labelShowBg,
			labelBgStyle,
			labelBgPadding,
			labelBgBorderRadius
		}) : null
	] });
}
function getControl({ pos, x1, y1, x2, y2 }) {
	if (pos === Position.Left || pos === Position.Right) return [.5 * (x1 + x2), y1];
	return [x1, .5 * (y1 + y2)];
}
/**
* The `getSimpleBezierPath` util returns everything you need to render a simple
* bezier edge between two nodes.
* @public
* @returns
* - `path`: the path to use in an SVG `<path>` element.
* - `labelX`: the `x` position you can use to render a label for this edge.
* - `labelY`: the `y` position you can use to render a label for this edge.
* - `offsetX`: the absolute difference between the source `x` position and the `x` position of the
* middle of this path.
* - `offsetY`: the absolute difference between the source `y` position and the `y` position of the
* middle of this path.
*/
function getSimpleBezierPath({ sourceX, sourceY, sourcePosition = Position.Bottom, targetX, targetY, targetPosition = Position.Top }) {
	const [sourceControlX, sourceControlY] = getControl({
		pos: sourcePosition,
		x1: sourceX,
		y1: sourceY,
		x2: targetX,
		y2: targetY
	});
	const [targetControlX, targetControlY] = getControl({
		pos: targetPosition,
		x1: targetX,
		y1: targetY,
		x2: sourceX,
		y2: sourceY
	});
	const [labelX, labelY, offsetX, offsetY] = getBezierEdgeCenter({
		sourceX,
		sourceY,
		targetX,
		targetY,
		sourceControlX,
		sourceControlY,
		targetControlX,
		targetControlY
	});
	return [
		`M${sourceX},${sourceY} C${sourceControlX},${sourceControlY} ${targetControlX},${targetControlY} ${targetX},${targetY}`,
		labelX,
		labelY,
		offsetX,
		offsetY
	];
}
function createSimpleBezierEdge(params) {
	return memo(({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, label, labelStyle, labelShowBg, labelBgStyle, labelBgPadding, labelBgBorderRadius, style, markerEnd, markerStart, interactionWidth }) => {
		const [path, labelX, labelY] = getSimpleBezierPath({
			sourceX,
			sourceY,
			sourcePosition,
			targetX,
			targetY,
			targetPosition
		});
		const _id = params.isInternal ? void 0 : id;
		return jsx(BaseEdge, {
			id: _id,
			path,
			labelX,
			labelY,
			label,
			labelStyle,
			labelShowBg,
			labelBgStyle,
			labelBgPadding,
			labelBgBorderRadius,
			style,
			markerEnd,
			markerStart,
			interactionWidth
		});
	});
}
var SimpleBezierEdge = createSimpleBezierEdge({ isInternal: false });
var SimpleBezierEdgeInternal = createSimpleBezierEdge({ isInternal: true });
SimpleBezierEdge.displayName = "SimpleBezierEdge";
SimpleBezierEdgeInternal.displayName = "SimpleBezierEdgeInternal";
function createSmoothStepEdge(params) {
	return memo(({ id, sourceX, sourceY, targetX, targetY, label, labelStyle, labelShowBg, labelBgStyle, labelBgPadding, labelBgBorderRadius, style, sourcePosition = Position.Bottom, targetPosition = Position.Top, markerEnd, markerStart, pathOptions, interactionWidth }) => {
		const [path, labelX, labelY] = getSmoothStepPath({
			sourceX,
			sourceY,
			sourcePosition,
			targetX,
			targetY,
			targetPosition,
			borderRadius: pathOptions?.borderRadius,
			offset: pathOptions?.offset,
			stepPosition: pathOptions?.stepPosition
		});
		const _id = params.isInternal ? void 0 : id;
		return jsx(BaseEdge, {
			id: _id,
			path,
			labelX,
			labelY,
			label,
			labelStyle,
			labelShowBg,
			labelBgStyle,
			labelBgPadding,
			labelBgBorderRadius,
			style,
			markerEnd,
			markerStart,
			interactionWidth
		});
	});
}
/**
* Component that can be used inside a custom edge to render a smooth step edge.
*
* @public
* @example
*
* ```tsx
* import { SmoothStepEdge } from '@xyflow/react';
*
* function CustomEdge({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition }) {
*   return (
*     <SmoothStepEdge
*       sourceX={sourceX}
*       sourceY={sourceY}
*       targetX={targetX}
*       targetY={targetY}
*       sourcePosition={sourcePosition}
*       targetPosition={targetPosition}
*     />
*   );
* }
* ```
*/
var SmoothStepEdge = createSmoothStepEdge({ isInternal: false });
/**
* @internal
*/
var SmoothStepEdgeInternal = createSmoothStepEdge({ isInternal: true });
SmoothStepEdge.displayName = "SmoothStepEdge";
SmoothStepEdgeInternal.displayName = "SmoothStepEdgeInternal";
function createStepEdge(params) {
	return memo(({ id, ...props }) => {
		const _id = params.isInternal ? void 0 : id;
		return jsx(SmoothStepEdge, {
			...props,
			id: _id,
			pathOptions: useMemo(() => ({
				borderRadius: 0,
				offset: props.pathOptions?.offset
			}), [props.pathOptions?.offset])
		});
	});
}
/**
* Component that can be used inside a custom edge to render a step edge.
*
* @public
* @example
*
* ```tsx
* import { StepEdge } from '@xyflow/react';
*
* function CustomEdge({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition }) {
*   return (
*     <StepEdge
*       sourceX={sourceX}
*       sourceY={sourceY}
*       targetX={targetX}
*       targetY={targetY}
*       sourcePosition={sourcePosition}
*       targetPosition={targetPosition}
*     />
*   );
* }
* ```
*/
var StepEdge = createStepEdge({ isInternal: false });
/**
* @internal
*/
var StepEdgeInternal = createStepEdge({ isInternal: true });
StepEdge.displayName = "StepEdge";
StepEdgeInternal.displayName = "StepEdgeInternal";
function createStraightEdge(params) {
	return memo(({ id, sourceX, sourceY, targetX, targetY, label, labelStyle, labelShowBg, labelBgStyle, labelBgPadding, labelBgBorderRadius, style, markerEnd, markerStart, interactionWidth }) => {
		const [path, labelX, labelY] = getStraightPath({
			sourceX,
			sourceY,
			targetX,
			targetY
		});
		const _id = params.isInternal ? void 0 : id;
		return jsx(BaseEdge, {
			id: _id,
			path,
			labelX,
			labelY,
			label,
			labelStyle,
			labelShowBg,
			labelBgStyle,
			labelBgPadding,
			labelBgBorderRadius,
			style,
			markerEnd,
			markerStart,
			interactionWidth
		});
	});
}
/**
* Component that can be used inside a custom edge to render a straight line.
*
* @public
* @example
*
* ```tsx
* import { StraightEdge } from '@xyflow/react';
*
* function CustomEdge({ sourceX, sourceY, targetX, targetY }) {
*   return (
*     <StraightEdge
*       sourceX={sourceX}
*       sourceY={sourceY}
*       targetX={targetX}
*       targetY={targetY}
*     />
*   );
* }
* ```
*/
var StraightEdge = createStraightEdge({ isInternal: false });
/**
* @internal
*/
var StraightEdgeInternal = createStraightEdge({ isInternal: true });
StraightEdge.displayName = "StraightEdge";
StraightEdgeInternal.displayName = "StraightEdgeInternal";
function createBezierEdge(params) {
	return memo(({ id, sourceX, sourceY, targetX, targetY, sourcePosition = Position.Bottom, targetPosition = Position.Top, label, labelStyle, labelShowBg, labelBgStyle, labelBgPadding, labelBgBorderRadius, style, markerEnd, markerStart, pathOptions, interactionWidth }) => {
		const [path, labelX, labelY] = getBezierPath({
			sourceX,
			sourceY,
			sourcePosition,
			targetX,
			targetY,
			targetPosition,
			curvature: pathOptions?.curvature
		});
		const _id = params.isInternal ? void 0 : id;
		return jsx(BaseEdge, {
			id: _id,
			path,
			labelX,
			labelY,
			label,
			labelStyle,
			labelShowBg,
			labelBgStyle,
			labelBgPadding,
			labelBgBorderRadius,
			style,
			markerEnd,
			markerStart,
			interactionWidth
		});
	});
}
/**
* Component that can be used inside a custom edge to render a bezier curve.
*
* @public
* @example
*
* ```tsx
* import { BezierEdge } from '@xyflow/react';
*
* function CustomEdge({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition }) {
*   return (
*     <BezierEdge
*       sourceX={sourceX}
*       sourceY={sourceY}
*       targetX={targetX}
*       targetY={targetY}
*       sourcePosition={sourcePosition}
*       targetPosition={targetPosition}
*     />
*   );
* }
* ```
*/
var BezierEdge = createBezierEdge({ isInternal: false });
/**
* @internal
*/
var BezierEdgeInternal = createBezierEdge({ isInternal: true });
BezierEdge.displayName = "BezierEdge";
BezierEdgeInternal.displayName = "BezierEdgeInternal";
var builtinEdgeTypes = {
	default: BezierEdgeInternal,
	straight: StraightEdgeInternal,
	step: StepEdgeInternal,
	smoothstep: SmoothStepEdgeInternal,
	simplebezier: SimpleBezierEdgeInternal
};
var nullPosition = {
	sourceX: null,
	sourceY: null,
	targetX: null,
	targetY: null,
	sourcePosition: null,
	targetPosition: null,
	zIndex: void 0
};
var shiftX = (x, shift, position) => {
	if (position === Position.Left) return x - shift;
	if (position === Position.Right) return x + shift;
	return x;
};
var shiftY = (y, shift, position) => {
	if (position === Position.Top) return y - shift;
	if (position === Position.Bottom) return y + shift;
	return y;
};
var EdgeUpdaterClassName = "react-flow__edgeupdater";
/**
* @internal
*/
function EdgeAnchor({ position, centerX, centerY, radius = 10, onMouseDown, onMouseEnter, onMouseOut, type }) {
	return jsx("circle", {
		onMouseDown,
		onMouseEnter,
		onMouseOut,
		className: cc([EdgeUpdaterClassName, `${EdgeUpdaterClassName}-${type}`]),
		cx: shiftX(centerX, radius, position),
		cy: shiftY(centerY, radius, position),
		r: radius,
		stroke: "transparent",
		fill: "transparent"
	});
}
function EdgeUpdateAnchors({ isReconnectable, reconnectRadius, edge, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, onReconnect, onReconnectStart, onReconnectEnd, setReconnecting, setUpdateHover }) {
	const store = useStoreApi();
	const handleEdgeUpdater = (event, oppositeHandle) => {
		if (event.button !== 0) return;
		const { autoPanOnConnect, domNode, connectionMode, connectionRadius, lib, onConnectStart, cancelConnection, nodeLookup, rfId: flowId, panBy, updateConnection } = store.getState();
		const isTarget = oppositeHandle.type === "target";
		const _onReconnectEnd = (evt, connectionState) => {
			setReconnecting(false);
			onReconnectEnd?.(evt, edge, oppositeHandle.type, connectionState);
		};
		const onConnectEdge = (connection) => onReconnect?.(edge, connection);
		const _onConnectStart = (_event, params) => {
			setReconnecting(true);
			onReconnectStart?.(event, edge, oppositeHandle.type);
			onConnectStart?.(_event, params);
		};
		XYHandle.onPointerDown(event.nativeEvent, {
			autoPanOnConnect,
			connectionMode,
			connectionRadius,
			domNode,
			handleId: oppositeHandle.id,
			nodeId: oppositeHandle.nodeId,
			nodeLookup,
			isTarget,
			edgeUpdaterType: oppositeHandle.type,
			lib,
			flowId,
			cancelConnection,
			panBy,
			isValidConnection: (...args) => store.getState().isValidConnection?.(...args) ?? true,
			onConnect: onConnectEdge,
			onConnectStart: _onConnectStart,
			onConnectEnd: (...args) => store.getState().onConnectEnd?.(...args),
			onReconnectEnd: _onReconnectEnd,
			updateConnection,
			getTransform: () => store.getState().transform,
			getFromHandle: () => store.getState().connection.fromHandle,
			dragThreshold: store.getState().connectionDragThreshold,
			handleDomNode: event.currentTarget
		});
	};
	const onReconnectSourceMouseDown = (event) => handleEdgeUpdater(event, {
		nodeId: edge.target,
		id: edge.targetHandle ?? null,
		type: "target"
	});
	const onReconnectTargetMouseDown = (event) => handleEdgeUpdater(event, {
		nodeId: edge.source,
		id: edge.sourceHandle ?? null,
		type: "source"
	});
	const onReconnectMouseEnter = () => setUpdateHover(true);
	const onReconnectMouseOut = () => setUpdateHover(false);
	return jsxs(Fragment$1, { children: [(isReconnectable === true || isReconnectable === "source") && jsx(EdgeAnchor, {
		position: sourcePosition,
		centerX: sourceX,
		centerY: sourceY,
		radius: reconnectRadius,
		onMouseDown: onReconnectSourceMouseDown,
		onMouseEnter: onReconnectMouseEnter,
		onMouseOut: onReconnectMouseOut,
		type: "source"
	}), (isReconnectable === true || isReconnectable === "target") && jsx(EdgeAnchor, {
		position: targetPosition,
		centerX: targetX,
		centerY: targetY,
		radius: reconnectRadius,
		onMouseDown: onReconnectTargetMouseDown,
		onMouseEnter: onReconnectMouseEnter,
		onMouseOut: onReconnectMouseOut,
		type: "target"
	})] });
}
function EdgeWrapper({ id, edgesFocusable, edgesReconnectable, elementsSelectable, onClick, onDoubleClick, onContextMenu, onMouseEnter, onMouseMove, onMouseLeave, reconnectRadius, onReconnect, onReconnectStart, onReconnectEnd, rfId, edgeTypes, noPanClassName, onError, disableKeyboardA11y }) {
	let edge = useStore$2((s) => s.edgeLookup.get(id));
	const defaultEdgeOptions = useStore$2((s) => s.defaultEdgeOptions);
	edge = defaultEdgeOptions ? {
		...defaultEdgeOptions,
		...edge
	} : edge;
	let edgeType = edge.type || "default";
	let EdgeComponent = edgeTypes?.[edgeType] || builtinEdgeTypes[edgeType];
	if (EdgeComponent === void 0) {
		onError?.("011", errorMessages["error011"](edgeType));
		edgeType = "default";
		EdgeComponent = edgeTypes?.["default"] || builtinEdgeTypes.default;
	}
	const isFocusable = !!(edge.focusable || edgesFocusable && typeof edge.focusable === "undefined");
	const isReconnectable = typeof onReconnect !== "undefined" && (edge.reconnectable || edgesReconnectable && typeof edge.reconnectable === "undefined");
	const isSelectable = !!(edge.selectable || elementsSelectable && typeof edge.selectable === "undefined");
	const edgeRef = useRef(null);
	const [updateHover, setUpdateHover] = useState(false);
	const [reconnecting, setReconnecting] = useState(false);
	const store = useStoreApi();
	const { zIndex = edge.zIndex, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition } = useStore$2(useCallback((store) => {
		const sourceNode = store.nodeLookup.get(edge.source);
		const targetNode = store.nodeLookup.get(edge.target);
		if (!sourceNode || !targetNode) return nullPosition;
		const edgePosition = getEdgePosition({
			id,
			sourceNode,
			targetNode,
			sourceHandle: edge.sourceHandle || null,
			targetHandle: edge.targetHandle || null,
			connectionMode: store.connectionMode,
			onError
		});
		const zIndex = getElevatedEdgeZIndex({
			selected: edge.selected,
			zIndex: edge.zIndex,
			sourceNode,
			targetNode,
			elevateOnSelect: store.elevateEdgesOnSelect,
			zIndexMode: store.zIndexMode
		});
		return {
			...edgePosition || nullPosition,
			zIndex
		};
	}, [
		edge.source,
		edge.target,
		edge.sourceHandle,
		edge.targetHandle,
		edge.selected,
		edge.zIndex,
		onError
	]), shallow$1);
	const markerStartUrl = useMemo(() => edge.markerStart ? `url('#${getMarkerId(edge.markerStart, rfId)}')` : void 0, [edge.markerStart, rfId]);
	const markerEndUrl = useMemo(() => edge.markerEnd ? `url('#${getMarkerId(edge.markerEnd, rfId)}')` : void 0, [edge.markerEnd, rfId]);
	if (edge.hidden || sourceX === null || sourceY === null || targetX === null || targetY === null) return null;
	const onEdgeClick = (event) => {
		const { addSelectedEdges, unselectNodesAndEdges, multiSelectionActive } = store.getState();
		if (isSelectable) {
			store.setState({ nodesSelectionActive: false });
			if (edge.selected && multiSelectionActive) {
				unselectNodesAndEdges({
					nodes: [],
					edges: [edge]
				});
				edgeRef.current?.blur();
			} else addSelectedEdges([id]);
		}
		if (onClick) onClick(event, edge);
	};
	const onEdgeDoubleClick = onDoubleClick ? (event) => {
		onDoubleClick(event, { ...edge });
	} : void 0;
	const onEdgeContextMenu = onContextMenu ? (event) => {
		onContextMenu(event, { ...edge });
	} : void 0;
	const onEdgeMouseEnter = onMouseEnter ? (event) => {
		onMouseEnter(event, { ...edge });
	} : void 0;
	const onEdgeMouseMove = onMouseMove ? (event) => {
		onMouseMove(event, { ...edge });
	} : void 0;
	const onEdgeMouseLeave = onMouseLeave ? (event) => {
		onMouseLeave(event, { ...edge });
	} : void 0;
	const onKeyDown = (event) => {
		if (!disableKeyboardA11y && elementSelectionKeys.includes(event.key) && isSelectable) {
			const { unselectNodesAndEdges, addSelectedEdges } = store.getState();
			if (event.key === "Escape") {
				edgeRef.current?.blur();
				unselectNodesAndEdges({ edges: [edge] });
			} else addSelectedEdges([id]);
		}
	};
	return jsx("svg", {
		style: { zIndex },
		children: jsxs("g", {
			className: cc([
				"react-flow__edge",
				`react-flow__edge-${edgeType}`,
				edge.className,
				noPanClassName,
				{
					selected: edge.selected,
					animated: edge.animated,
					inactive: !isSelectable && !onClick,
					updating: updateHover,
					selectable: isSelectable
				}
			]),
			onClick: onEdgeClick,
			onDoubleClick: onEdgeDoubleClick,
			onContextMenu: onEdgeContextMenu,
			onMouseEnter: onEdgeMouseEnter,
			onMouseMove: onEdgeMouseMove,
			onMouseLeave: onEdgeMouseLeave,
			onKeyDown: isFocusable ? onKeyDown : void 0,
			tabIndex: isFocusable ? 0 : void 0,
			role: edge.ariaRole ?? (isFocusable ? "group" : "img"),
			"aria-roledescription": "edge",
			"data-id": id,
			"data-testid": `rf__edge-${id}`,
			"aria-label": edge.ariaLabel === null ? void 0 : edge.ariaLabel || `Edge from ${edge.source} to ${edge.target}`,
			"aria-describedby": isFocusable ? `${ARIA_EDGE_DESC_KEY}-${rfId}` : void 0,
			ref: edgeRef,
			...edge.domAttributes,
			children: [!reconnecting && jsx(EdgeComponent, {
				id,
				source: edge.source,
				target: edge.target,
				type: edge.type,
				selected: edge.selected,
				animated: edge.animated,
				selectable: isSelectable,
				deletable: edge.deletable ?? true,
				label: edge.label,
				labelStyle: edge.labelStyle,
				labelShowBg: edge.labelShowBg,
				labelBgStyle: edge.labelBgStyle,
				labelBgPadding: edge.labelBgPadding,
				labelBgBorderRadius: edge.labelBgBorderRadius,
				sourceX,
				sourceY,
				targetX,
				targetY,
				sourcePosition,
				targetPosition,
				data: edge.data,
				style: edge.style,
				sourceHandleId: edge.sourceHandle,
				targetHandleId: edge.targetHandle,
				markerStart: markerStartUrl,
				markerEnd: markerEndUrl,
				pathOptions: "pathOptions" in edge ? edge.pathOptions : void 0,
				interactionWidth: edge.interactionWidth
			}), isReconnectable && jsx(EdgeUpdateAnchors, {
				edge,
				isReconnectable,
				reconnectRadius,
				onReconnect,
				onReconnectStart,
				onReconnectEnd,
				sourceX,
				sourceY,
				targetX,
				targetY,
				sourcePosition,
				targetPosition,
				setUpdateHover,
				setReconnecting
			})]
		})
	});
}
var EdgeWrapper$1 = memo(EdgeWrapper);
var selector$9 = (s) => ({
	edgesFocusable: s.edgesFocusable,
	edgesReconnectable: s.edgesReconnectable,
	elementsSelectable: s.elementsSelectable,
	connectionMode: s.connectionMode,
	onError: s.onError
});
function EdgeRendererComponent({ defaultMarkerColor, onlyRenderVisibleElements, rfId, edgeTypes, noPanClassName, onReconnect, onEdgeContextMenu, onEdgeMouseEnter, onEdgeMouseMove, onEdgeMouseLeave, onEdgeClick, reconnectRadius, onEdgeDoubleClick, onReconnectStart, onReconnectEnd, disableKeyboardA11y }) {
	const { edgesFocusable, edgesReconnectable, elementsSelectable, onError } = useStore$2(selector$9, shallow$1);
	const edgeIds = useVisibleEdgeIds(onlyRenderVisibleElements);
	return jsxs("div", {
		className: "react-flow__edges",
		children: [jsx(MarkerDefinitions$1, {
			defaultColor: defaultMarkerColor,
			rfId
		}), edgeIds.map((id) => {
			return jsx(EdgeWrapper$1, {
				id,
				edgesFocusable,
				edgesReconnectable,
				elementsSelectable,
				noPanClassName,
				onReconnect,
				onContextMenu: onEdgeContextMenu,
				onMouseEnter: onEdgeMouseEnter,
				onMouseMove: onEdgeMouseMove,
				onMouseLeave: onEdgeMouseLeave,
				onClick: onEdgeClick,
				reconnectRadius,
				onDoubleClick: onEdgeDoubleClick,
				onReconnectStart,
				onReconnectEnd,
				rfId,
				onError,
				edgeTypes,
				disableKeyboardA11y
			}, id);
		})]
	});
}
EdgeRendererComponent.displayName = "EdgeRenderer";
var EdgeRenderer = memo(EdgeRendererComponent);
var toTransformString = (transform) => `translate(${transform[0]}px,${transform[1]}px) scale(${transform[2]})`;
function Viewport({ children }) {
	const store = useStoreApi();
	const viewportRef = useRef(null);
	const [initialTransform] = useState(() => store.getState().transform);
	useIsomorphicLayoutEffect(() => {
		let prevTransform = null;
		const applyTransform = () => {
			const transform = store.getState().transform;
			if (prevTransform && transform[0] === prevTransform[0] && transform[1] === prevTransform[1] && transform[2] === prevTransform[2]) return;
			prevTransform = transform;
			if (viewportRef.current) viewportRef.current.style.transform = toTransformString(transform);
		};
		applyTransform();
		return store.subscribe(applyTransform);
	}, [store]);
	return jsx("div", {
		ref: viewportRef,
		className: "react-flow__viewport xyflow__viewport react-flow__container",
		style: { transform: toTransformString(initialTransform) },
		children
	});
}
/**
* Hook for calling onInit handler.
*
* @internal
*/
function useOnInitHandler(onInit) {
	const rfInstance = useReactFlow();
	const isInitialized = useRef(false);
	useEffect(() => {
		if (!isInitialized.current && rfInstance.viewportInitialized && onInit) {
			setTimeout(() => onInit(rfInstance), 1);
			isInitialized.current = true;
		}
	}, [onInit, rfInstance.viewportInitialized]);
}
var selector$8 = (state) => state.panZoom?.syncViewport;
/**
* Hook for syncing the viewport with the panzoom instance.
*
* @internal
* @param viewport
*/
function useViewportSync(viewport) {
	const syncViewport = useStore$2(selector$8);
	const store = useStoreApi();
	useEffect(() => {
		if (viewport) {
			syncViewport?.(viewport);
			store.setState({ transform: [
				viewport.x,
				viewport.y,
				viewport.zoom
			] });
		}
	}, [viewport, syncViewport]);
	return null;
}
function storeSelector$1(s) {
	return s.connection.inProgress ? {
		...s.connection,
		to: pointToRendererPoint(s.connection.to, s.transform)
	} : { ...s.connection };
}
function getSelector(connectionSelector) {
	if (connectionSelector) {
		const combinedSelector = (s) => {
			return connectionSelector(storeSelector$1(s));
		};
		return combinedSelector;
	}
	return storeSelector$1;
}
/**
* The `useConnection` hook returns the current connection when there is an active
* connection interaction. If no connection interaction is active, it returns null
* for every property. A typical use case for this hook is to colorize handles
* based on a certain condition (e.g. if the connection is valid or not).
*
* @public
* @param connectionSelector - An optional selector function used to extract a slice of the
* `ConnectionState` data. Using a selector can prevent component re-renders where data you don't
* otherwise care about might change. If a selector is not provided, the entire `ConnectionState`
* object is returned unchanged.
* @example
*
* ```tsx
*import { useConnection } from '@xyflow/react';
*
*function App() {
*  const connection = useConnection();
*
*  return (
*    <div> {connection ? `Someone is trying to make a connection from ${connection.fromNode} to this one.` : 'There are currently no incoming connections!'}
*
*   </div>
*   );
* }
* ```
*
* @returns ConnectionState
*/
function useConnection(connectionSelector) {
	return useStore$2(getSelector(connectionSelector), shallow$1);
}
var selector$7 = (s) => ({
	nodesConnectable: s.nodesConnectable,
	isValid: s.connection.isValid,
	inProgress: s.connection.inProgress,
	width: s.width,
	height: s.height
});
function ConnectionLineWrapper({ containerStyle, style, type, component }) {
	const { nodesConnectable, width, height, isValid, inProgress } = useStore$2(selector$7, shallow$1);
	if (!!!(width && nodesConnectable && inProgress)) return null;
	return jsx("svg", {
		style: containerStyle,
		width,
		height,
		className: "react-flow__connectionline react-flow__container",
		children: jsx("g", {
			className: cc(["react-flow__connection", getConnectionStatus(isValid)]),
			children: jsx(ConnectionLine, {
				style,
				type,
				CustomComponent: component,
				isValid
			})
		})
	});
}
var ConnectionLine = ({ style, type = ConnectionLineType.Bezier, CustomComponent, isValid }) => {
	const { inProgress, from, fromNode, fromHandle, fromPosition, to, toNode, toHandle, toPosition, pointer } = useConnection();
	if (!inProgress) return;
	if (CustomComponent) return jsx(CustomComponent, {
		connectionLineType: type,
		connectionLineStyle: style,
		fromNode,
		fromHandle,
		fromX: from.x,
		fromY: from.y,
		toX: to.x,
		toY: to.y,
		fromPosition,
		toPosition,
		connectionStatus: getConnectionStatus(isValid),
		toNode,
		toHandle,
		pointer
	});
	let path = "";
	const pathParams = {
		sourceX: from.x,
		sourceY: from.y,
		sourcePosition: fromPosition,
		targetX: to.x,
		targetY: to.y,
		targetPosition: toPosition
	};
	switch (type) {
		case ConnectionLineType.Bezier:
			[path] = getBezierPath(pathParams);
			break;
		case ConnectionLineType.SimpleBezier:
			[path] = getSimpleBezierPath(pathParams);
			break;
		case ConnectionLineType.Step:
			[path] = getSmoothStepPath({
				...pathParams,
				borderRadius: 0
			});
			break;
		case ConnectionLineType.SmoothStep:
			[path] = getSmoothStepPath(pathParams);
			break;
		default: [path] = getStraightPath(pathParams);
	}
	return jsx("path", {
		d: path,
		fill: "none",
		className: "react-flow__connection-path",
		style
	});
};
ConnectionLine.displayName = "ConnectionLine";
var emptyTypes = {};
function useNodeOrEdgeTypesWarning(nodeOrEdgeTypes = emptyTypes) {
	const typesRef = useRef(nodeOrEdgeTypes);
	const store = useStoreApi();
	useEffect(() => {
		if (process.env.NODE_ENV === "development") {
			const usedKeys = /* @__PURE__ */ new Set([...Object.keys(typesRef.current), ...Object.keys(nodeOrEdgeTypes)]);
			for (const key of usedKeys) if (typesRef.current[key] !== nodeOrEdgeTypes[key]) {
				store.getState().onError?.("002", errorMessages["error002"]());
				break;
			}
			typesRef.current = nodeOrEdgeTypes;
		}
	}, [nodeOrEdgeTypes]);
}
function useStylesLoadedWarning() {
	const store = useStoreApi();
	const checked = useRef(false);
	useEffect(() => {
		if (process.env.NODE_ENV === "development") {
			if (!checked.current) {
				const pane = document.querySelector(".react-flow__pane");
				if (pane && !(window.getComputedStyle(pane).zIndex === "1")) store.getState().onError?.("013", errorMessages["error013"]("react"));
				checked.current = true;
			}
		}
	}, []);
}
function GraphViewComponent({ nodeTypes, edgeTypes, onInit, onNodeClick, onEdgeClick, onNodeDoubleClick, onEdgeDoubleClick, onNodeMouseEnter, onNodeMouseMove, onNodeMouseLeave, onNodeContextMenu, onSelectionContextMenu, onSelectionStart, onSelectionEnd, connectionLineType, connectionLineStyle, connectionLineComponent, connectionLineContainerStyle, selectionKeyCode, selectionOnDrag, selectionMode, multiSelectionKeyCode, panActivationKeyCode, zoomActivationKeyCode, deleteKeyCode, onlyRenderVisibleElements, elementsSelectable, defaultViewport, translateExtent, minZoom, maxZoom, preventScrolling, defaultMarkerColor, zoomOnScroll, zoomOnPinch, panOnScroll, panOnScrollSpeed, panOnScrollMode, zoomOnDoubleClick, panOnDrag, autoPanOnSelection, onPaneClick, onPaneMouseEnter, onPaneMouseMove, onPaneMouseLeave, onPaneScroll, onPaneContextMenu, paneClickDistance, nodeClickDistance, onEdgeContextMenu, onEdgeMouseEnter, onEdgeMouseMove, onEdgeMouseLeave, reconnectRadius, onReconnect, onReconnectStart, onReconnectEnd, noDragClassName, noWheelClassName, noPanClassName, disableKeyboardA11y, nodeExtent, rfId, viewport, onViewportChange, nodesDraggable }) {
	useNodeOrEdgeTypesWarning(nodeTypes);
	useNodeOrEdgeTypesWarning(edgeTypes);
	useStylesLoadedWarning();
	useOnInitHandler(onInit);
	useViewportSync(viewport);
	return jsx(FlowRenderer, {
		onPaneClick,
		onPaneMouseEnter,
		onPaneMouseMove,
		onPaneMouseLeave,
		onPaneContextMenu,
		onPaneScroll,
		paneClickDistance,
		deleteKeyCode,
		selectionKeyCode,
		selectionOnDrag,
		selectionMode,
		onSelectionStart,
		onSelectionEnd,
		multiSelectionKeyCode,
		panActivationKeyCode,
		zoomActivationKeyCode,
		elementsSelectable,
		zoomOnScroll,
		zoomOnPinch,
		zoomOnDoubleClick,
		panOnScroll,
		panOnScrollSpeed,
		panOnScrollMode,
		panOnDrag,
		autoPanOnSelection,
		defaultViewport,
		translateExtent,
		minZoom,
		maxZoom,
		onSelectionContextMenu,
		preventScrolling,
		noDragClassName,
		noWheelClassName,
		noPanClassName,
		disableKeyboardA11y,
		onViewportChange,
		isControlledViewport: !!viewport,
		children: jsxs(Viewport, { children: [
			jsx(EdgeRenderer, {
				edgeTypes,
				onEdgeClick,
				onEdgeDoubleClick,
				onReconnect,
				onReconnectStart,
				onReconnectEnd,
				onlyRenderVisibleElements,
				onEdgeContextMenu,
				onEdgeMouseEnter,
				onEdgeMouseMove,
				onEdgeMouseLeave,
				reconnectRadius,
				defaultMarkerColor,
				noPanClassName,
				disableKeyboardA11y,
				rfId
			}),
			jsx(ConnectionLineWrapper, {
				style: connectionLineStyle,
				type: connectionLineType,
				component: connectionLineComponent,
				containerStyle: connectionLineContainerStyle
			}),
			jsx("div", { className: "react-flow__edgelabel-renderer" }),
			jsx(NodeRenderer, {
				nodeTypes,
				onNodeClick,
				onNodeDoubleClick,
				onNodeMouseEnter,
				onNodeMouseMove,
				onNodeMouseLeave,
				onNodeContextMenu,
				nodeClickDistance,
				onlyRenderVisibleElements,
				noPanClassName,
				noDragClassName,
				disableKeyboardA11y,
				nodeExtent,
				rfId,
				nodesDraggable
			}),
			jsx("div", { className: "react-flow__viewport-portal" })
		] })
	});
}
GraphViewComponent.displayName = "GraphView";
var GraphView = memo(GraphViewComponent);
var devWarn = createDevWarn("React Flow", "https://reactflow.dev/");
var getInitialState = ({ nodes, edges, defaultNodes, defaultEdges, width, height, fitView, fitViewOptions, minZoom = .5, maxZoom = 2, nodeOrigin, nodeExtent, zIndexMode = "basic" } = {}) => {
	const nodeLookup = /* @__PURE__ */ new Map();
	const parentLookup = /* @__PURE__ */ new Map();
	const connectionLookup = /* @__PURE__ */ new Map();
	const edgeLookup = /* @__PURE__ */ new Map();
	const storeEdges = defaultEdges ?? edges ?? [];
	const storeNodes = defaultNodes ?? nodes ?? [];
	const storeNodeOrigin = nodeOrigin ?? [0, 0];
	const storeNodeExtent = nodeExtent ?? infiniteExtent;
	updateConnectionLookup(connectionLookup, edgeLookup, storeEdges);
	const { nodesInitialized } = adoptUserNodes(storeNodes, nodeLookup, parentLookup, {
		nodeOrigin: storeNodeOrigin,
		nodeExtent: storeNodeExtent,
		zIndexMode
	});
	let transform = [
		0,
		0,
		1
	];
	if (fitView && width && height) {
		const { x, y, zoom } = getViewportForBounds(getInternalNodesBounds(nodeLookup, { filter: (node) => !!((node.width || node.initialWidth) && (node.height || node.initialHeight)) }), width, height, minZoom, maxZoom, fitViewOptions?.padding ?? .1);
		transform = [
			x,
			y,
			zoom
		];
	}
	return {
		rfId: "1",
		width: width ?? 0,
		height: height ?? 0,
		transform,
		nodes: storeNodes,
		nodesInitialized,
		nodeLookup,
		parentLookup,
		edges: storeEdges,
		edgeLookup,
		connectionLookup,
		onNodesChange: null,
		onEdgesChange: null,
		hasDefaultNodes: defaultNodes !== void 0,
		hasDefaultEdges: defaultEdges !== void 0,
		panZoom: null,
		minZoom,
		maxZoom,
		translateExtent: infiniteExtent,
		nodeExtent: storeNodeExtent,
		nodesSelectionActive: false,
		userSelectionActive: false,
		userSelectionRect: null,
		connectionMode: ConnectionMode.Strict,
		domNode: null,
		paneDragging: false,
		noPanClassName: "nopan",
		nodeOrigin: storeNodeOrigin,
		nodeDragThreshold: 1,
		connectionDragThreshold: 1,
		snapGrid: [15, 15],
		snapToGrid: false,
		nodesDraggable: true,
		nodesConnectable: true,
		nodesFocusable: true,
		edgesFocusable: true,
		edgesReconnectable: true,
		elementsSelectable: true,
		elevateNodesOnSelect: true,
		elevateEdgesOnSelect: true,
		selectNodesOnDrag: true,
		multiSelectionActive: false,
		fitViewQueued: fitView ?? false,
		fitViewOptions,
		fitViewResolver: null,
		connection: { ...initialConnection },
		connectionClickStartHandle: null,
		connectOnClick: true,
		ariaLiveMessage: "",
		autoPanOnConnect: true,
		autoPanOnNodeDrag: true,
		autoPanOnNodeFocus: true,
		autoPanSpeed: 15,
		connectionRadius: 20,
		onError: devWarn,
		isValidConnection: void 0,
		onSelectionChangeHandlers: [],
		lib: "react",
		debug: false,
		ariaLabelConfig: defaultAriaLabelConfig,
		zIndexMode,
		defaultEdgeOptions: void 0,
		onNodesChangeMiddlewareMap: /* @__PURE__ */ new Map(),
		onEdgesChangeMiddlewareMap: /* @__PURE__ */ new Map(),
		onNodesDelete: void 0,
		onEdgesDelete: void 0,
		onDelete: void 0,
		onBeforeDelete: void 0,
		onViewportChangeStart: void 0,
		onViewportChange: void 0,
		onViewportChangeEnd: void 0,
		onNodeDragStart: void 0,
		onNodeDrag: void 0,
		onNodeDragStop: void 0,
		onSelectionDragStart: void 0,
		onSelectionDrag: void 0,
		onSelectionDragStop: void 0,
		onMoveStart: void 0,
		onMove: void 0,
		onMoveEnd: void 0,
		onConnect: void 0,
		onConnectStart: void 0,
		onConnectEnd: void 0,
		onClickConnectStart: void 0,
		onClickConnectEnd: void 0
	};
};
var createStore$1 = ({ nodes, edges, defaultNodes, defaultEdges, width, height, fitView, fitViewOptions, minZoom, maxZoom, nodeOrigin, nodeExtent, zIndexMode }) => createWithEqualityFn((set, get) => {
	async function resolveFitView() {
		const { nodeLookup, panZoom, fitViewOptions, fitViewResolver, width, height, minZoom, maxZoom } = get();
		if (!panZoom) return;
		await fitViewport({
			nodes: nodeLookup,
			width,
			height,
			panZoom,
			minZoom,
			maxZoom
		}, fitViewOptions);
		fitViewResolver?.resolve(true);
		/**
		* wait for the fitViewport to resolve before deleting the resolver,
		* we want to reuse the old resolver if the user calls fitView again in the mean time
		*/
		set({ fitViewResolver: null });
	}
	return {
		...getInitialState({
			nodes,
			edges,
			width,
			height,
			fitView,
			fitViewOptions,
			minZoom,
			maxZoom,
			nodeOrigin,
			nodeExtent,
			defaultNodes,
			defaultEdges,
			zIndexMode
		}),
		setNodes: (nodes) => {
			const { nodeLookup, parentLookup, nodeOrigin, nodeExtent, elevateNodesOnSelect, fitViewQueued, zIndexMode, nodesSelectionActive } = get();
			const { nodesInitialized, hasSelectedNodes } = adoptUserNodes(nodes, nodeLookup, parentLookup, {
				nodeOrigin,
				nodeExtent,
				elevateNodesOnSelect,
				checkEquality: true,
				zIndexMode
			});
			const nextNodesSelectionActive = nodesSelectionActive && hasSelectedNodes;
			if (fitViewQueued && nodesInitialized) {
				resolveFitView();
				set({
					nodes,
					nodesInitialized,
					fitViewQueued: false,
					fitViewOptions: void 0,
					nodesSelectionActive: nextNodesSelectionActive
				});
			} else set({
				nodes,
				nodesInitialized,
				nodesSelectionActive: nextNodesSelectionActive
			});
		},
		setEdges: (edges) => {
			const { connectionLookup, edgeLookup } = get();
			updateConnectionLookup(connectionLookup, edgeLookup, edges);
			set({ edges });
		},
		setDefaultNodesAndEdges: (nodes, edges) => {
			if (nodes) {
				const { setNodes } = get();
				setNodes(nodes);
				set({ hasDefaultNodes: true });
			}
			if (edges) {
				const { setEdges } = get();
				setEdges(edges);
				set({ hasDefaultEdges: true });
			}
		},
		updateNodeInternals: (updates) => {
			const { triggerNodeChanges, nodeLookup, parentLookup, domNode, nodeOrigin, nodeExtent, debug, fitViewQueued, zIndexMode } = get();
			const { changes, updatedInternals } = updateNodeInternals(updates, nodeLookup, parentLookup, domNode, nodeOrigin, nodeExtent, zIndexMode);
			if (!updatedInternals) return;
			updateAbsolutePositions(nodeLookup, parentLookup, {
				nodeOrigin,
				nodeExtent,
				zIndexMode
			});
			if (fitViewQueued) {
				resolveFitView();
				set({
					fitViewQueued: false,
					fitViewOptions: void 0
				});
			} else set({});
			if (changes?.length > 0) {
				if (debug) console.log("React Flow: trigger node changes", changes);
				triggerNodeChanges?.(changes);
			}
		},
		updateNodePositions: (nodeDragItems, dragging = false) => {
			const parentExpandChildren = [];
			let changes = [];
			const { nodeLookup, triggerNodeChanges, connection, updateConnection, onNodesChangeMiddlewareMap } = get();
			for (const [id, dragItem] of nodeDragItems) {
				const node = nodeLookup.get(id);
				const expandParent = !!(node?.expandParent && node?.parentId && dragItem?.position);
				const change = {
					id,
					type: "position",
					position: expandParent ? {
						x: Math.max(0, dragItem.position.x),
						y: Math.max(0, dragItem.position.y)
					} : dragItem.position,
					dragging
				};
				if (node && connection.inProgress && connection.fromNode.id === node.id) {
					const updatedFrom = getHandlePosition(node, connection.fromHandle, Position.Left, true);
					updateConnection({
						...connection,
						from: updatedFrom
					});
				}
				if (expandParent && node.parentId) parentExpandChildren.push({
					id,
					parentId: node.parentId,
					rect: {
						...dragItem.internals.positionAbsolute,
						width: dragItem.measured.width ?? 0,
						height: dragItem.measured.height ?? 0
					}
				});
				changes.push(change);
			}
			if (parentExpandChildren.length > 0) {
				const { parentLookup, nodeOrigin } = get();
				const parentExpandChanges = handleExpandParent(parentExpandChildren, nodeLookup, parentLookup, nodeOrigin);
				changes.push(...parentExpandChanges);
			}
			for (const middleware of onNodesChangeMiddlewareMap.values()) changes = middleware(changes);
			triggerNodeChanges(changes);
		},
		triggerNodeChanges: (changes) => {
			const { onNodesChange, setNodes, nodes, hasDefaultNodes, debug } = get();
			if (changes?.length) {
				if (hasDefaultNodes) setNodes(applyNodeChanges(changes, nodes));
				if (debug) console.log("React Flow: trigger node changes", changes);
				onNodesChange?.(changes);
			}
		},
		triggerEdgeChanges: (changes) => {
			const { onEdgesChange, setEdges, edges, hasDefaultEdges, debug } = get();
			if (changes?.length) {
				if (hasDefaultEdges) setEdges(applyEdgeChanges(changes, edges));
				if (debug) console.log("React Flow: trigger edge changes", changes);
				onEdgesChange?.(changes);
			}
		},
		addSelectedNodes: (selectedNodeIds) => {
			const { multiSelectionActive, edgeLookup, nodeLookup, triggerNodeChanges, triggerEdgeChanges } = get();
			if (multiSelectionActive) {
				triggerNodeChanges(selectedNodeIds.map((nodeId) => createSelectionChange(nodeId, true)));
				return;
			}
			triggerNodeChanges(getSelectionChanges(nodeLookup, /* @__PURE__ */ new Set([...selectedNodeIds])));
			triggerEdgeChanges(getSelectionChanges(edgeLookup));
		},
		addSelectedEdges: (selectedEdgeIds) => {
			const { multiSelectionActive, edgeLookup, nodeLookup, triggerNodeChanges, triggerEdgeChanges } = get();
			if (multiSelectionActive) {
				triggerEdgeChanges(selectedEdgeIds.map((edgeId) => createSelectionChange(edgeId, true)));
				return;
			}
			triggerEdgeChanges(getSelectionChanges(edgeLookup, /* @__PURE__ */ new Set([...selectedEdgeIds])));
			triggerNodeChanges(getSelectionChanges(nodeLookup, /* @__PURE__ */ new Set()));
		},
		unselectNodesAndEdges: ({ nodes, edges } = {}) => {
			const { edges: storeEdges, nodes: storeNodes, nodeLookup, triggerNodeChanges, triggerEdgeChanges } = get();
			const nodesToUnselect = nodes ? nodes : storeNodes;
			const edgesToUnselect = edges ? edges : storeEdges;
			const nodeChanges = [];
			for (const node of nodesToUnselect) {
				if (!node.selected) continue;
				nodeChanges.push(createSelectionChange(node.id, false));
			}
			const edgeChanges = [];
			for (const edge of edgesToUnselect) {
				if (!edge.selected) continue;
				edgeChanges.push(createSelectionChange(edge.id, false));
			}
			triggerNodeChanges(nodeChanges);
			triggerEdgeChanges(edgeChanges);
		},
		setMinZoom: (minZoom) => {
			const { panZoom, maxZoom } = get();
			panZoom?.setScaleExtent([minZoom, maxZoom]);
			set({ minZoom });
		},
		setMaxZoom: (maxZoom) => {
			const { panZoom, minZoom } = get();
			panZoom?.setScaleExtent([minZoom, maxZoom]);
			set({ maxZoom });
		},
		setTranslateExtent: (translateExtent) => {
			get().panZoom?.setTranslateExtent(translateExtent);
			set({ translateExtent });
		},
		resetSelectedElements: () => {
			const { edges, nodes, triggerNodeChanges, triggerEdgeChanges, elementsSelectable } = get();
			if (!elementsSelectable) return;
			const nodeChanges = nodes.reduce((res, node) => node.selected ? [...res, createSelectionChange(node.id, false)] : res, []);
			const edgeChanges = edges.reduce((res, edge) => edge.selected ? [...res, createSelectionChange(edge.id, false)] : res, []);
			triggerNodeChanges(nodeChanges);
			triggerEdgeChanges(edgeChanges);
		},
		setNodeExtent: (nextNodeExtent) => {
			const { nodes, nodeLookup, parentLookup, nodeOrigin, elevateNodesOnSelect, nodeExtent, zIndexMode } = get();
			if (nextNodeExtent[0][0] === nodeExtent[0][0] && nextNodeExtent[0][1] === nodeExtent[0][1] && nextNodeExtent[1][0] === nodeExtent[1][0] && nextNodeExtent[1][1] === nodeExtent[1][1]) return;
			adoptUserNodes(nodes, nodeLookup, parentLookup, {
				nodeOrigin,
				nodeExtent: nextNodeExtent,
				elevateNodesOnSelect,
				checkEquality: false,
				zIndexMode
			});
			set({ nodeExtent: nextNodeExtent });
		},
		panBy: (delta) => {
			const { transform, width, height, panZoom, translateExtent } = get();
			return panBy({
				delta,
				panZoom,
				transform,
				translateExtent,
				width,
				height
			});
		},
		setCenter: async (x, y, options) => {
			const { width, height, maxZoom, panZoom } = get();
			if (!panZoom) return false;
			const nextZoom = typeof options?.zoom !== "undefined" ? options.zoom : maxZoom;
			await panZoom.setViewport({
				x: width / 2 - x * nextZoom,
				y: height / 2 - y * nextZoom,
				zoom: nextZoom
			}, {
				duration: options?.duration,
				ease: options?.ease,
				interpolate: options?.interpolate
			});
			return true;
		},
		cancelConnection: () => {
			set({ connection: { ...initialConnection } });
		},
		updateConnection: (connection) => {
			set({ connection });
		},
		reset: () => set({ ...getInitialState() })
	};
}, Object.is);
/**
* The `<ReactFlowProvider />` component is a [context provider](https://react.dev/learn/passing-data-deeply-with-context#)
* that makes it possible to access a flow's internal state outside of the
* [`<ReactFlow />`](/api-reference/react-flow) component. Many of the hooks we
* provide rely on this component to work.
* @public
*
* @example
* ```tsx
*import { ReactFlow, ReactFlowProvider, useNodes } from '@xyflow/react'
*
*export default function Flow() {
*  return (
*    <ReactFlowProvider>
*      <ReactFlow nodes={...} edges={...} />
*      <Sidebar />
*    </ReactFlowProvider>
*  );
*}
*
*function Sidebar() {
*  // This hook will only work if the component it's used in is a child of a
*  // <ReactFlowProvider />.
*  const nodes = useNodes()
*
*  return <aside>do something with nodes</aside>;
*}
*```
*
* @remarks If you're using a router and want your flow's state to persist across routes,
* it's vital that you place the `<ReactFlowProvider />` component _outside_ of
* your router. If you have multiple flows on the same page you will need to use a separate
* `<ReactFlowProvider />` for each flow.
*/
function ReactFlowProvider({ initialNodes: nodes, initialEdges: edges, defaultNodes, defaultEdges, initialWidth: width, initialHeight: height, initialMinZoom: minZoom, initialMaxZoom: maxZoom, initialFitViewOptions: fitViewOptions, fitView, nodeOrigin, nodeExtent, zIndexMode, children }) {
	const [store] = useState(() => createStore$1({
		nodes,
		edges,
		defaultNodes,
		defaultEdges,
		width,
		height,
		fitView,
		minZoom,
		maxZoom,
		fitViewOptions,
		nodeOrigin,
		nodeExtent,
		zIndexMode
	}));
	return jsx(Provider$1, {
		value: store,
		children: jsx(BatchProvider, { children: jsx(HandleConfigProvider, { children }) })
	});
}
function Wrapper({ children, nodes, edges, defaultNodes, defaultEdges, width, height, fitView, fitViewOptions, minZoom, maxZoom, nodeOrigin, nodeExtent, zIndexMode }) {
	if (useContext(StoreContext)) return jsx(Fragment$1, { children });
	return jsx(ReactFlowProvider, {
		initialNodes: nodes,
		initialEdges: edges,
		defaultNodes,
		defaultEdges,
		initialWidth: width,
		initialHeight: height,
		fitView,
		initialFitViewOptions: fitViewOptions,
		initialMinZoom: minZoom,
		initialMaxZoom: maxZoom,
		nodeOrigin,
		nodeExtent,
		zIndexMode,
		children
	});
}
var wrapperStyle = {
	width: "100%",
	height: "100%",
	overflow: "hidden",
	position: "relative",
	zIndex: 0
};
function ReactFlow({ nodes, edges, defaultNodes, defaultEdges, className, nodeTypes, edgeTypes, onNodeClick, onEdgeClick, onInit, onMove, onMoveStart, onMoveEnd, onConnect, onConnectStart, onConnectEnd, onClickConnectStart, onClickConnectEnd, onNodeMouseEnter, onNodeMouseMove, onNodeMouseLeave, onNodeContextMenu, onNodeDoubleClick, onNodeDragStart, onNodeDrag, onNodeDragStop, onNodesDelete, onEdgesDelete, onDelete, onSelectionChange, onSelectionDragStart, onSelectionDrag, onSelectionDragStop, onSelectionContextMenu, onSelectionStart, onSelectionEnd, onBeforeDelete, connectionMode, connectionLineType = ConnectionLineType.Bezier, connectionLineStyle, connectionLineComponent, connectionLineContainerStyle, deleteKeyCode = "Backspace", selectionKeyCode = "Shift", selectionOnDrag = false, selectionMode = SelectionMode.Full, panActivationKeyCode = "Space", multiSelectionKeyCode = isMacOs() ? "Meta" : "Control", zoomActivationKeyCode = isMacOs() ? "Meta" : "Control", snapToGrid, snapGrid, onlyRenderVisibleElements = false, selectNodesOnDrag, nodesDraggable, autoPanOnNodeFocus, nodesConnectable, nodesFocusable, nodeOrigin = defaultNodeOrigin, edgesFocusable, edgesReconnectable, elementsSelectable = true, defaultViewport: defaultViewport$1 = defaultViewport, minZoom = .5, maxZoom = 2, translateExtent = infiniteExtent, preventScrolling = true, nodeExtent, defaultMarkerColor = "#b1b1b7", zoomOnScroll = true, zoomOnPinch = true, panOnScroll = false, panOnScrollSpeed = .5, panOnScrollMode = PanOnScrollMode.Free, zoomOnDoubleClick = true, panOnDrag = true, onPaneClick, onPaneMouseEnter, onPaneMouseMove, onPaneMouseLeave, onPaneScroll, onPaneContextMenu, paneClickDistance = 1, nodeClickDistance = 0, children, onReconnect, onReconnectStart, onReconnectEnd, onEdgeContextMenu, onEdgeDoubleClick, onEdgeMouseEnter, onEdgeMouseMove, onEdgeMouseLeave, reconnectRadius = 10, onNodesChange, onEdgesChange, noDragClassName = "nodrag", noWheelClassName = "nowheel", noPanClassName = "nopan", fitView, fitViewOptions, connectOnClick, attributionPosition, proOptions, defaultEdgeOptions, elevateNodesOnSelect = true, elevateEdgesOnSelect = false, disableKeyboardA11y = false, autoPanOnConnect, autoPanOnNodeDrag, autoPanOnSelection = true, autoPanSpeed, connectionRadius, isValidConnection, onError, style, id, nodeDragThreshold, connectionDragThreshold, viewport, onViewportChange, width, height, colorMode = "light", debug, onScroll, ariaLabelConfig, zIndexMode = "basic", ...rest }, ref) {
	const rfId = id || "1";
	const colorModeClassName = useColorModeClass(colorMode);
	const wrapperOnScroll = useCallback((e) => {
		e.currentTarget.scrollTo({
			top: 0,
			left: 0,
			behavior: "instant"
		});
		onScroll?.(e);
	}, [onScroll]);
	return jsx("div", {
		"data-testid": "rf__wrapper",
		...rest,
		onScroll: wrapperOnScroll,
		style: {
			...style,
			...wrapperStyle
		},
		ref,
		className: cc([
			"react-flow",
			className,
			colorModeClassName
		]),
		id,
		role: "application",
		children: jsxs(Wrapper, {
			nodes,
			edges,
			width,
			height,
			fitView,
			fitViewOptions,
			minZoom,
			maxZoom,
			nodeOrigin,
			nodeExtent,
			zIndexMode,
			children: [
				jsx(StoreUpdater, {
					nodes,
					edges,
					defaultNodes,
					defaultEdges,
					onConnect,
					onConnectStart,
					onConnectEnd,
					onClickConnectStart,
					onClickConnectEnd,
					nodesDraggable,
					autoPanOnNodeFocus,
					nodesConnectable,
					nodesFocusable,
					edgesFocusable,
					edgesReconnectable,
					elementsSelectable,
					elevateNodesOnSelect,
					elevateEdgesOnSelect,
					minZoom,
					maxZoom,
					nodeExtent,
					onNodesChange,
					onEdgesChange,
					snapToGrid,
					snapGrid,
					connectionMode,
					translateExtent,
					connectOnClick,
					defaultEdgeOptions,
					fitView,
					fitViewOptions,
					onNodesDelete,
					onEdgesDelete,
					onDelete,
					onNodeDragStart,
					onNodeDrag,
					onNodeDragStop,
					onSelectionDrag,
					onSelectionDragStart,
					onSelectionDragStop,
					onMove,
					onMoveStart,
					onMoveEnd,
					noPanClassName,
					nodeOrigin,
					rfId,
					autoPanOnConnect,
					autoPanOnNodeDrag,
					autoPanSpeed,
					onError,
					connectionRadius,
					isValidConnection,
					selectNodesOnDrag,
					nodeDragThreshold,
					connectionDragThreshold,
					onBeforeDelete,
					debug,
					ariaLabelConfig,
					zIndexMode
				}),
				jsx(GraphView, {
					onInit,
					onNodeClick,
					onEdgeClick,
					onNodeMouseEnter,
					onNodeMouseMove,
					onNodeMouseLeave,
					onNodeContextMenu,
					onNodeDoubleClick,
					nodeTypes,
					edgeTypes,
					connectionLineType,
					connectionLineStyle,
					connectionLineComponent,
					connectionLineContainerStyle,
					selectionKeyCode,
					selectionOnDrag,
					selectionMode,
					deleteKeyCode,
					multiSelectionKeyCode,
					panActivationKeyCode,
					zoomActivationKeyCode,
					onlyRenderVisibleElements,
					defaultViewport: defaultViewport$1,
					translateExtent,
					minZoom,
					maxZoom,
					preventScrolling,
					zoomOnScroll,
					zoomOnPinch,
					zoomOnDoubleClick,
					panOnScroll,
					panOnScrollSpeed,
					panOnScrollMode,
					panOnDrag,
					autoPanOnSelection,
					onPaneClick,
					onPaneMouseEnter,
					onPaneMouseMove,
					onPaneMouseLeave,
					onPaneScroll,
					onPaneContextMenu,
					paneClickDistance,
					nodeClickDistance,
					onSelectionContextMenu,
					onSelectionStart,
					onSelectionEnd,
					onReconnect,
					onReconnectStart,
					onReconnectEnd,
					onEdgeContextMenu,
					onEdgeDoubleClick,
					onEdgeMouseEnter,
					onEdgeMouseMove,
					onEdgeMouseLeave,
					reconnectRadius,
					defaultMarkerColor,
					noDragClassName,
					noWheelClassName,
					noPanClassName,
					rfId,
					disableKeyboardA11y,
					nodeExtent,
					viewport,
					onViewportChange,
					nodesDraggable
				}),
				jsx(SelectionListener, { onSelectionChange }),
				children,
				jsx(Attribution, {
					proOptions,
					position: attributionPosition
				}),
				jsx(A11yDescriptions, {
					rfId,
					disableKeyboardA11y
				})
			]
		})
	});
}
/**
* The `<ReactFlow />` component is the heart of your React Flow application.
* It renders your nodes and edges and handles user interaction
*
* @public
*
* @example
* ```tsx
*import { ReactFlow } from '@xyflow/react'
*
*export default function Flow() {
*  return (<ReactFlow
*    nodes={...}
*    edges={...}
*    onNodesChange={...}
*    ...
*  />);
*}
*```
*/
var index = fixedForwardRef(ReactFlow);
var viewportSelector = (state) => ({
	x: state.transform[0],
	y: state.transform[1],
	zoom: state.transform[2]
});
/**
* The `useViewport` hook is a convenient way to read the current state of the
* {@link Viewport} in a component. Components that use this hook
* will re-render **whenever the viewport changes**.
*
* @public
* @returns The current viewport.
*
* @example
*
*```jsx
*import { useViewport } from '@xyflow/react';
*
*export default function ViewportDisplay() {
*  const { x, y, zoom } = useViewport();
*
*  return (
*    <div>
*      <p>
*        The viewport is currently at ({x}, {y}) and zoomed to {zoom}.
*      </p>
*    </div>
*  );
*}
*```
*
* @remarks This hook can only be used in a component that is a child of a
*{@link ReactFlowProvider} or a {@link ReactFlow} component.
*/
function useViewport() {
	return useStore$2(viewportSelector, shallow$1);
}
errorMessages["error014"]();
/**
* This hook returns the internal representation of a specific node.
* Components that use this hook will re-render **whenever the node changes**,
* including when a node is selected or moved.
*
* @public
* @param id - The ID of a node you want to observe.
* @returns The `InternalNode` object for the node with the given ID.
*
* @example
* ```tsx
*import { useInternalNode } from '@xyflow/react';
*
*export default function () {
*  const internalNode = useInternalNode('node-1');
*  const absolutePosition = internalNode.internals.positionAbsolute;
*
*  return (
*    <div>
*      The absolute position of the node is at:
*      <p>x: {absolutePosition.x}</p>
*      <p>y: {absolutePosition.y}</p>
*    </div>
*  );
*}
*```
*/
function useInternalNode(id) {
	return useStore$2(useCallback((s) => s.nodeLookup.get(id), [id]), shallow$1);
}
function LinePattern({ dimensions, lineWidth, variant, className }) {
	return jsx("path", {
		strokeWidth: lineWidth,
		d: `M${dimensions[0] / 2} 0 V${dimensions[1]} M0 ${dimensions[1] / 2} H${dimensions[0]}`,
		className: cc([
			"react-flow__background-pattern",
			variant,
			className
		])
	});
}
function DotPattern({ radius, className }) {
	return jsx("circle", {
		cx: radius,
		cy: radius,
		r: radius,
		className: cc([
			"react-flow__background-pattern",
			"dots",
			className
		])
	});
}
/**
* The three variants are exported as an enum for convenience. You can either import
* the enum and use it like `BackgroundVariant.Lines` or you can use the raw string
* value directly.
* @public
*/
var BackgroundVariant;
(function(BackgroundVariant) {
	BackgroundVariant["Lines"] = "lines";
	BackgroundVariant["Dots"] = "dots";
	BackgroundVariant["Cross"] = "cross";
})(BackgroundVariant || (BackgroundVariant = {}));
var defaultSize = {
	[BackgroundVariant.Dots]: 1,
	[BackgroundVariant.Lines]: 1,
	[BackgroundVariant.Cross]: 6
};
var selector$3 = (s) => ({
	transform: s.transform,
	patternId: `pattern-${s.rfId}`
});
function BackgroundComponent({ id, variant = BackgroundVariant.Dots, gap = 20, size, lineWidth = 1, offset = 0, color, bgColor, style, className, patternClassName }) {
	const ref = useRef(null);
	const { transform, patternId } = useStore$2(selector$3, shallow$1);
	const patternSize = size || defaultSize[variant];
	const isDots = variant === BackgroundVariant.Dots;
	const isCross = variant === BackgroundVariant.Cross;
	const gapXY = Array.isArray(gap) ? gap : [gap, gap];
	const scaledGap = [gapXY[0] * transform[2] || 1, gapXY[1] * transform[2] || 1];
	const scaledSize = patternSize * transform[2];
	const offsetXY = Array.isArray(offset) ? offset : [offset, offset];
	const patternDimensions = isCross ? [scaledSize, scaledSize] : scaledGap;
	const scaledOffset = [offsetXY[0] * transform[2] + patternDimensions[0] / 2, offsetXY[1] * transform[2] + patternDimensions[1] / 2];
	const _patternId = `${patternId}${id ? id : ""}`;
	return jsxs("svg", {
		className: cc(["react-flow__background", className]),
		style: {
			...style,
			...containerStyle,
			"--xy-background-color-props": bgColor,
			"--xy-background-pattern-color-props": color
		},
		ref,
		"data-testid": "rf__background",
		children: [jsx("pattern", {
			id: _patternId,
			x: transform[0] % scaledGap[0],
			y: transform[1] % scaledGap[1],
			width: scaledGap[0],
			height: scaledGap[1],
			patternUnits: "userSpaceOnUse",
			patternTransform: `translate(-${scaledOffset[0]},-${scaledOffset[1]})`,
			children: isDots ? jsx(DotPattern, {
				radius: scaledSize / 2,
				className: patternClassName
			}) : jsx(LinePattern, {
				dimensions: patternDimensions,
				lineWidth,
				variant,
				className: patternClassName
			})
		}), jsx("rect", {
			x: "0",
			y: "0",
			width: "100%",
			height: "100%",
			fill: `url(#${_patternId})`
		})]
	});
}
BackgroundComponent.displayName = "Background";
/**
* The `<Background />` component makes it convenient to render different types of backgrounds common in node-based UIs. It comes with three variants: lines, dots and cross.
*
* @example
*
* A simple example of how to use the Background component.
*
* ```tsx
* import { useState } from 'react';
* import { ReactFlow, Background, BackgroundVariant } from '@xyflow/react';
*
* export default function Flow() {
*   return (
*     <ReactFlow defaultNodes={[...]} defaultEdges={[...]}>
*       <Background color="#ccc" variant={BackgroundVariant.Dots} />
*     </ReactFlow>
*   );
* }
* ```
*
* @example
*
* In this example you can see how to combine multiple backgrounds
*
* ```tsx
* import { ReactFlow, Background, BackgroundVariant } from '@xyflow/react';
* import '@xyflow/react/dist/style.css';
*
* export default function Flow() {
*   return (
*     <ReactFlow defaultNodes={[...]} defaultEdges={[...]}>
*       <Background
*         id="1"
*         gap={10}
*         color="#f1f1f1"
*         variant={BackgroundVariant.Lines}
*       />
*       <Background
*         id="2"
*         gap={100}
*         color="#ccc"
*         variant={BackgroundVariant.Lines}
*       />
*     </ReactFlow>
*   );
* }
* ```
*
* @remarks
*
* When combining multiple <Background /> components it’s important to give each of them a unique id prop!
*
*/
var Background = memo(BackgroundComponent);
function PlusIcon() {
	return jsx("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 32 32",
		children: jsx("path", { d: "M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z" })
	});
}
function MinusIcon() {
	return jsx("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 32 5",
		children: jsx("path", { d: "M0 0h32v4.2H0z" })
	});
}
function FitViewIcon() {
	return jsx("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 32 30",
		children: jsx("path", { d: "M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z" })
	});
}
function LockIcon() {
	return jsx("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 25 32",
		children: jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z" })
	});
}
function UnlockIcon() {
	return jsx("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 25 32",
		children: jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z" })
	});
}
/**
* You can add buttons to the control panel by using the `<ControlButton />` component
* and pass it as a child to the [`<Controls />`](/api-reference/components/controls) component.
*
* @public
* @example
*```jsx
*import { MagicWand } from '@radix-ui/react-icons'
*import { ReactFlow, Controls, ControlButton } from '@xyflow/react'
*
*export default function Flow() {
*  return (
*    <ReactFlow nodes={[...]} edges={[...]}>
*      <Controls>
*        <ControlButton onClick={() => alert('Something magical just happened. ✨')}>
*          <MagicWand />
*        </ControlButton>
*      </Controls>
*    </ReactFlow>
*  )
*}
*```
*/
function ControlButton({ children, className, ...rest }) {
	return jsx("button", {
		type: "button",
		className: cc(["react-flow__controls-button", className]),
		...rest,
		children
	});
}
var selector$2 = (s) => ({
	isInteractive: s.nodesDraggable || s.nodesConnectable || s.elementsSelectable,
	minZoomReached: s.transform[2] <= s.minZoom,
	maxZoomReached: s.transform[2] >= s.maxZoom,
	ariaLabelConfig: s.ariaLabelConfig
});
function ControlsComponent({ style, showZoom = true, showFitView = true, showInteractive = true, fitViewOptions, onZoomIn, onZoomOut, onFitView, onInteractiveChange, className, children, position = "bottom-left", orientation = "vertical", "aria-label": ariaLabel }) {
	const store = useStoreApi();
	const { isInteractive, minZoomReached, maxZoomReached, ariaLabelConfig } = useStore$2(selector$2, shallow$1);
	const { zoomIn, zoomOut, fitView } = useReactFlow();
	const onZoomInHandler = () => {
		zoomIn();
		onZoomIn?.();
	};
	const onZoomOutHandler = () => {
		zoomOut();
		onZoomOut?.();
	};
	const onFitViewHandler = () => {
		fitView(fitViewOptions);
		onFitView?.();
	};
	const onToggleInteractivity = () => {
		store.setState({
			nodesDraggable: !isInteractive,
			nodesConnectable: !isInteractive,
			elementsSelectable: !isInteractive
		});
		onInteractiveChange?.(!isInteractive);
	};
	return jsxs(Panel, {
		className: cc([
			"react-flow__controls",
			orientation === "horizontal" ? "horizontal" : "vertical",
			className
		]),
		position,
		style,
		"data-testid": "rf__controls",
		"aria-label": ariaLabel ?? ariaLabelConfig["controls.ariaLabel"],
		children: [
			showZoom && jsxs(Fragment$1, { children: [jsx(ControlButton, {
				onClick: onZoomInHandler,
				className: "react-flow__controls-zoomin",
				title: ariaLabelConfig["controls.zoomIn.ariaLabel"],
				"aria-label": ariaLabelConfig["controls.zoomIn.ariaLabel"],
				disabled: maxZoomReached,
				children: jsx(PlusIcon, {})
			}), jsx(ControlButton, {
				onClick: onZoomOutHandler,
				className: "react-flow__controls-zoomout",
				title: ariaLabelConfig["controls.zoomOut.ariaLabel"],
				"aria-label": ariaLabelConfig["controls.zoomOut.ariaLabel"],
				disabled: minZoomReached,
				children: jsx(MinusIcon, {})
			})] }),
			showFitView && jsx(ControlButton, {
				className: "react-flow__controls-fitview",
				onClick: onFitViewHandler,
				title: ariaLabelConfig["controls.fitView.ariaLabel"],
				"aria-label": ariaLabelConfig["controls.fitView.ariaLabel"],
				children: jsx(FitViewIcon, {})
			}),
			showInteractive && jsx(ControlButton, {
				className: "react-flow__controls-interactive",
				onClick: onToggleInteractivity,
				title: ariaLabelConfig["controls.interactive.ariaLabel"],
				"aria-label": ariaLabelConfig["controls.interactive.ariaLabel"],
				children: isInteractive ? jsx(UnlockIcon, {}) : jsx(LockIcon, {})
			}),
			children
		]
	});
}
ControlsComponent.displayName = "Controls";
/**
* The `<Controls />` component renders a small panel that contains convenient
* buttons to zoom in, zoom out, fit the view, and lock the viewport.
*
* @public
* @example
*```tsx
*import { ReactFlow, Controls } from '@xyflow/react'
*
*export default function Flow() {
*  return (
*    <ReactFlow nodes={[...]} edges={[...]}>
*      <Controls />
*    </ReactFlow>
*  )
*}
*```
*
* @remarks To extend or customise the controls, you can use the [`<ControlButton />`](/api-reference/components/control-button) component
*
*/
var Controls = memo(ControlsComponent);
function MiniMapNodeComponent({ id, x, y, width, height, style, color, strokeColor, strokeWidth, className, borderRadius, shapeRendering, selected, onClick }) {
	const { background, backgroundColor } = style || {};
	const fill = color || background || backgroundColor;
	return jsx("rect", {
		className: cc([
			"react-flow__minimap-node",
			{ selected },
			className
		]),
		x,
		y,
		rx: borderRadius,
		ry: borderRadius,
		width,
		height,
		style: {
			fill,
			stroke: strokeColor,
			strokeWidth
		},
		shapeRendering,
		onClick: onClick ? (event) => onClick(event, id) : void 0
	});
}
var MiniMapNode = memo(MiniMapNodeComponent);
var selectorNodeIds = (s) => s.nodes.map((node) => node.id);
var getAttrFunction = (func) => func instanceof Function ? func : () => func;
function MiniMapNodes({ nodeStrokeColor, nodeColor, nodeClassName = "", nodeBorderRadius = 5, nodeStrokeWidth, nodeComponent: NodeComponent = MiniMapNode, onClick }) {
	const nodeIds = useStore$2(selectorNodeIds, shallow$1);
	const nodeColorFunc = getAttrFunction(nodeColor);
	const nodeStrokeColorFunc = getAttrFunction(nodeStrokeColor);
	const nodeClassNameFunc = getAttrFunction(nodeClassName);
	const shapeRendering = typeof window === "undefined" || !!window.chrome ? "crispEdges" : "geometricPrecision";
	return jsx(Fragment$1, { children: nodeIds.map((nodeId) => jsx(NodeComponentWrapper, {
		id: nodeId,
		nodeColorFunc,
		nodeStrokeColorFunc,
		nodeClassNameFunc,
		nodeBorderRadius,
		nodeStrokeWidth,
		NodeComponent,
		onClick,
		shapeRendering
	}, nodeId)) });
}
function NodeComponentWrapperInner({ id, nodeColorFunc, nodeStrokeColorFunc, nodeClassNameFunc, nodeBorderRadius, nodeStrokeWidth, shapeRendering, NodeComponent, onClick }) {
	const { node, x, y, width, height } = useStore$2((s) => {
		const node = s.nodeLookup.get(id);
		if (!node) return {
			node: void 0,
			x: 0,
			y: 0,
			width: 0,
			height: 0
		};
		const userNode = node.internals.userNode;
		const { x, y } = node.internals.positionAbsolute;
		const { width, height } = getNodeDimensions(userNode);
		return {
			node: userNode,
			x,
			y,
			width,
			height
		};
	}, shallow$1);
	if (!node || node.hidden || !nodeHasDimensions(node)) return null;
	return jsx(NodeComponent, {
		x,
		y,
		width,
		height,
		style: node.style,
		selected: !!node.selected,
		className: nodeClassNameFunc(node),
		color: nodeColorFunc(node),
		borderRadius: nodeBorderRadius,
		strokeColor: nodeStrokeColorFunc(node),
		strokeWidth: nodeStrokeWidth,
		shapeRendering,
		onClick,
		id: node.id
	});
}
var NodeComponentWrapper = memo(NodeComponentWrapperInner);
var MiniMapNodes$1 = memo(MiniMapNodes);
var defaultWidth = 200;
var defaultHeight = 150;
var filterHidden = (node) => !node.hidden;
var selector$1 = (s) => {
	const viewBB = {
		x: -s.transform[0] / s.transform[2],
		y: -s.transform[1] / s.transform[2],
		width: s.width / s.transform[2],
		height: s.height / s.transform[2]
	};
	let hasVisibleNode = false;
	for (const node of s.nodeLookup.values()) if (!node.hidden) {
		hasVisibleNode = true;
		break;
	}
	return {
		viewBB,
		boundingRect: hasVisibleNode ? getBoundsOfRects(getInternalNodesBounds(s.nodeLookup, { filter: filterHidden }), viewBB) : viewBB,
		rfId: s.rfId,
		panZoom: s.panZoom,
		translateExtent: s.translateExtent,
		flowWidth: s.width,
		flowHeight: s.height,
		ariaLabelConfig: s.ariaLabelConfig
	};
};
var rectEqual = (a, b) => a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
var areEqual = (a, b) => rectEqual(a.viewBB, b.viewBB) && rectEqual(a.boundingRect, b.boundingRect) && a.rfId === b.rfId && a.panZoom === b.panZoom && a.translateExtent === b.translateExtent && a.flowWidth === b.flowWidth && a.flowHeight === b.flowHeight && a.ariaLabelConfig === b.ariaLabelConfig;
var ARIA_LABEL_KEY = "react-flow__minimap-desc";
function MiniMapComponent({ style, className, nodeStrokeColor, nodeColor, nodeClassName = "", nodeBorderRadius = 5, nodeStrokeWidth, nodeComponent, bgColor, maskColor, maskStrokeColor, maskStrokeWidth, position = "bottom-right", onClick, onNodeClick, pannable = false, zoomable = false, ariaLabel, inversePan, zoomStep = 1, offsetScale = 5 }) {
	const store = useStoreApi();
	const svg = useRef(null);
	const { boundingRect, panZoom, viewBB, rfId, translateExtent, flowWidth, flowHeight, ariaLabelConfig } = useStore$2(selector$1, areEqual);
	const elementWidth = style?.width ?? defaultWidth;
	const elementHeight = style?.height ?? defaultHeight;
	const scaledWidth = boundingRect.width / elementWidth;
	const scaledHeight = boundingRect.height / elementHeight;
	const viewScale = Math.max(scaledWidth, scaledHeight);
	const viewWidth = viewScale * elementWidth;
	const viewHeight = viewScale * elementHeight;
	const offset = offsetScale * viewScale;
	const x = boundingRect.x - (viewWidth - boundingRect.width) / 2 - offset;
	const y = boundingRect.y - (viewHeight - boundingRect.height) / 2 - offset;
	const width = viewWidth + offset * 2;
	const height = viewHeight + offset * 2;
	const labelledBy = `${ARIA_LABEL_KEY}-${rfId}`;
	const viewScaleRef = useRef(0);
	const minimapInstance = useRef();
	viewScaleRef.current = viewScale;
	useEffect(() => {
		const currentPanZoom = store.getState().panZoom;
		if (svg.current && currentPanZoom) {
			minimapInstance.current = XYMinimap({
				domNode: svg.current,
				panZoom: currentPanZoom,
				getTransform: () => store.getState().transform,
				getViewScale: () => viewScaleRef.current
			});
			return () => {
				minimapInstance.current?.destroy();
			};
		}
	}, [panZoom]);
	useEffect(() => {
		minimapInstance.current?.update({
			translateExtent,
			width: flowWidth,
			height: flowHeight,
			inversePan,
			pannable,
			zoomStep,
			zoomable
		});
	}, [
		pannable,
		zoomable,
		inversePan,
		zoomStep,
		translateExtent,
		flowWidth,
		flowHeight
	]);
	const onSvgClick = onClick ? (event) => {
		const [x, y] = minimapInstance.current?.pointer(event) || [0, 0];
		onClick(event, {
			x,
			y
		});
	} : void 0;
	const nodeClickHandler = useCallback((event, nodeId) => {
		const node = store.getState().nodeLookup.get(nodeId).internals.userNode;
		onNodeClick?.(event, node);
	}, [onNodeClick]);
	const onSvgNodeClick = onNodeClick ? nodeClickHandler : void 0;
	const _ariaLabel = ariaLabel ?? ariaLabelConfig["minimap.ariaLabel"];
	return jsx(Panel, {
		position,
		style: {
			...style,
			"--xy-minimap-background-color-props": typeof bgColor === "string" ? bgColor : void 0,
			"--xy-minimap-mask-background-color-props": typeof maskColor === "string" ? maskColor : void 0,
			"--xy-minimap-mask-stroke-color-props": typeof maskStrokeColor === "string" ? maskStrokeColor : void 0,
			"--xy-minimap-mask-stroke-width-props": typeof maskStrokeWidth === "number" ? maskStrokeWidth * viewScale : void 0,
			"--xy-minimap-node-background-color-props": typeof nodeColor === "string" ? nodeColor : void 0,
			"--xy-minimap-node-stroke-color-props": typeof nodeStrokeColor === "string" ? nodeStrokeColor : void 0,
			"--xy-minimap-node-stroke-width-props": typeof nodeStrokeWidth === "number" ? nodeStrokeWidth : void 0
		},
		className: cc(["react-flow__minimap", className]),
		"data-testid": "rf__minimap",
		children: jsxs("svg", {
			width: elementWidth,
			height: elementHeight,
			viewBox: `${x} ${y} ${width} ${height}`,
			className: "react-flow__minimap-svg",
			role: "img",
			"aria-labelledby": labelledBy,
			ref: svg,
			onClick: onSvgClick,
			children: [
				_ariaLabel && jsx("title", {
					id: labelledBy,
					children: _ariaLabel
				}),
				jsx(MiniMapNodes$1, {
					onClick: onSvgNodeClick,
					nodeColor,
					nodeStrokeColor,
					nodeBorderRadius,
					nodeClassName,
					nodeStrokeWidth,
					nodeComponent
				}),
				jsx("path", {
					className: "react-flow__minimap-mask",
					d: `M${x - offset},${y - offset}h${width + offset * 2}v${height + offset * 2}h${-width - offset * 2}z
        M${viewBB.x},${viewBB.y}h${viewBB.width}v${viewBB.height}h${-viewBB.width}z`,
					fillRule: "evenodd",
					pointerEvents: "none"
				})
			]
		})
	});
}
MiniMapComponent.displayName = "MiniMap";
/**
* The `<MiniMap />` component can be used to render an overview of your flow. It
* renders each node as an SVG element and visualizes where the current viewport is
* in relation to the rest of the flow.
*
* @public
* @example
*
* ```jsx
*import { ReactFlow, MiniMap } from '@xyflow/react';
*
*export default function Flow() {
*  return (
*    <ReactFlow nodes={[...]} edges={[...]}>
*      <MiniMap nodeStrokeWidth={3} />
*    </ReactFlow>
*  );
*}
*```
*/
var MiniMap = memo(MiniMapComponent);
var scaleSelector = (calculateScale) => (store) => calculateScale ? `${Math.max(1 / store.transform[2], 1)}` : void 0;
var defaultPositions = {
	[ResizeControlVariant.Line]: "right",
	[ResizeControlVariant.Handle]: "bottom-right"
};
function ResizeControl({ nodeId, position, variant = ResizeControlVariant.Handle, className, style = void 0, children, color, minWidth = 10, minHeight = 10, maxWidth = Number.MAX_VALUE, maxHeight = Number.MAX_VALUE, keepAspectRatio = false, resizeDirection, autoScale = true, shouldResize, onResizeStart, onResize, onResizeEnd }) {
	const contextNodeId = useNodeId();
	const id = typeof nodeId === "string" ? nodeId : contextNodeId;
	const store = useStoreApi();
	const resizeControlRef = useRef(null);
	const isHandleControl = variant === ResizeControlVariant.Handle;
	const scale = useStore$2(useCallback(scaleSelector(isHandleControl && autoScale), [isHandleControl, autoScale]), shallow$1);
	const resizer = useRef(null);
	const controlPosition = position ?? defaultPositions[variant];
	useEffect(() => {
		if (!resizeControlRef.current || !id) return;
		if (!resizer.current) resizer.current = XYResizer({
			domNode: resizeControlRef.current,
			nodeId: id,
			getStoreItems: () => {
				const { nodeLookup, transform, snapGrid, snapToGrid, nodeOrigin, domNode } = store.getState();
				return {
					nodeLookup,
					transform,
					snapGrid,
					snapToGrid,
					nodeOrigin,
					paneDomNode: domNode
				};
			},
			onChange: (change, childChanges) => {
				const { triggerNodeChanges, nodeLookup, parentLookup, nodeOrigin } = store.getState();
				const changes = [];
				const nextPosition = {
					x: change.x,
					y: change.y
				};
				const node = nodeLookup.get(id);
				if (node && node.expandParent && node.parentId) {
					const origin = node.origin ?? nodeOrigin;
					const width = change.width ?? node.measured.width ?? 0;
					const height = change.height ?? node.measured.height ?? 0;
					const parentExpandChanges = handleExpandParent([{
						id: node.id,
						parentId: node.parentId,
						rect: {
							width,
							height,
							...evaluateAbsolutePosition({
								x: change.x ?? node.position.x,
								y: change.y ?? node.position.y
							}, {
								width,
								height
							}, node.parentId, nodeLookup, origin)
						}
					}], nodeLookup, parentLookup, nodeOrigin);
					changes.push(...parentExpandChanges);
					nextPosition.x = change.x ? Math.max(origin[0] * width, change.x) : void 0;
					nextPosition.y = change.y ? Math.max(origin[1] * height, change.y) : void 0;
				}
				if (nextPosition.x !== void 0 && nextPosition.y !== void 0) {
					const positionChange = {
						id,
						type: "position",
						position: { ...nextPosition }
					};
					changes.push(positionChange);
				}
				if (change.width !== void 0 && change.height !== void 0) {
					const dimensionChange = {
						id,
						type: "dimensions",
						resizing: true,
						setAttributes: !resizeDirection ? true : resizeDirection === "horizontal" ? "width" : "height",
						dimensions: {
							width: change.width,
							height: change.height
						}
					};
					changes.push(dimensionChange);
				}
				for (const childChange of childChanges) {
					const positionChange = {
						...childChange,
						type: "position"
					};
					changes.push(positionChange);
				}
				triggerNodeChanges(changes);
			},
			onEnd: ({ width, height }) => {
				const dimensionChange = {
					id,
					type: "dimensions",
					resizing: false,
					dimensions: {
						width,
						height
					}
				};
				store.getState().triggerNodeChanges([dimensionChange]);
			}
		});
		resizer.current.update({
			controlPosition,
			boundaries: {
				minWidth,
				minHeight,
				maxWidth,
				maxHeight
			},
			keepAspectRatio,
			resizeDirection,
			onResizeStart,
			onResize,
			onResizeEnd,
			shouldResize
		});
		return () => {
			resizer.current?.destroy();
		};
	}, [
		controlPosition,
		minWidth,
		minHeight,
		maxWidth,
		maxHeight,
		keepAspectRatio,
		onResizeStart,
		onResize,
		onResizeEnd,
		shouldResize
	]);
	const positionClassNames = controlPosition.split("-");
	return jsx("div", {
		className: cc([
			"react-flow__resize-control",
			"nodrag",
			...positionClassNames,
			variant,
			className
		]),
		ref: resizeControlRef,
		style: {
			...style,
			scale,
			...color && { [isHandleControl ? "backgroundColor" : "borderColor"]: color }
		},
		children
	});
}
memo(ResizeControl);
// node_modules/zustand/esm/vanilla.mjs
var createStoreImpl = (createState) => {
	let state;
	const listeners = /* @__PURE__ */ new Set();
	const setState = (partial, replace) => {
		const nextState = typeof partial === "function" ? partial(state) : partial;
		if (!Object.is(nextState, state)) {
			const previousState = state;
			state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
			listeners.forEach((listener) => listener(state, previousState));
		}
	};
	const getState = () => state;
	const getInitialState = () => initialState;
	const subscribe = (listener) => {
		listeners.add(listener);
		return () => listeners.delete(listener);
	};
	const api = {
		setState,
		getState,
		getInitialState,
		subscribe
	};
	const initialState = state = createState(setState, getState, api);
	return api;
};
var createStore = ((createState) => createState ? createStoreImpl(createState) : createStoreImpl);
// node_modules/zustand/esm/react.mjs
var identity = (arg) => arg;
function useStore$1(api, selector = identity) {
	const slice = ReactExports.useSyncExternalStore(api.subscribe, ReactExports.useCallback(() => selector(api.getState()), [api, selector]), () => selector(api.getInitialState()));
	ReactExports.useDebugValue(slice);
	return slice;
}
var createImpl = (createState) => {
	const api = createStore(createState);
	const useBoundStore = (selector) => useStore$1(api, selector);
	Object.assign(useBoundStore, api);
	return useBoundStore;
};
var create = ((createState) => createState ? createImpl(createState) : createImpl);
// node_modules/lz-string/libs/lz-string.js
var require_lz_string = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var LZString = (function() {
		var f = String.fromCharCode;
		var keyStrBase64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		var keyStrUriSafe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$";
		var baseReverseDic = {};
		function getBaseValue(alphabet, character) {
			if (!baseReverseDic[alphabet]) {
				baseReverseDic[alphabet] = {};
				for (var i = 0; i < alphabet.length; i++) baseReverseDic[alphabet][alphabet.charAt(i)] = i;
			}
			return baseReverseDic[alphabet][character];
		}
		var LZString = {
			compressToBase64: function(input) {
				if (input == null) return "";
				var res = LZString._compress(input, 6, function(a) {
					return keyStrBase64.charAt(a);
				});
				switch (res.length % 4) {
					default:
					case 0: return res;
					case 1: return res + "===";
					case 2: return res + "==";
					case 3: return res + "=";
				}
			},
			decompressFromBase64: function(input) {
				if (input == null) return "";
				if (input == "") return null;
				return LZString._decompress(input.length, 32, function(index) {
					return getBaseValue(keyStrBase64, input.charAt(index));
				});
			},
			compressToUTF16: function(input) {
				if (input == null) return "";
				return LZString._compress(input, 15, function(a) {
					return f(a + 32);
				}) + " ";
			},
			decompressFromUTF16: function(compressed) {
				if (compressed == null) return "";
				if (compressed == "") return null;
				return LZString._decompress(compressed.length, 16384, function(index) {
					return compressed.charCodeAt(index) - 32;
				});
			},
			compressToUint8Array: function(uncompressed) {
				var compressed = LZString.compress(uncompressed);
				var buf = new Uint8Array(compressed.length * 2);
				for (var i = 0, TotalLen = compressed.length; i < TotalLen; i++) {
					var current_value = compressed.charCodeAt(i);
					buf[i * 2] = current_value >>> 8;
					buf[i * 2 + 1] = current_value % 256;
				}
				return buf;
			},
			decompressFromUint8Array: function(compressed) {
				if (compressed === null || compressed === void 0) return LZString.decompress(compressed);
				else {
					var buf = new Array(compressed.length / 2);
					for (var i = 0, TotalLen = buf.length; i < TotalLen; i++) buf[i] = compressed[i * 2] * 256 + compressed[i * 2 + 1];
					var result = [];
					buf.forEach(function(c) {
						result.push(f(c));
					});
					return LZString.decompress(result.join(""));
				}
			},
			compressToEncodedURIComponent: function(input) {
				if (input == null) return "";
				return LZString._compress(input, 6, function(a) {
					return keyStrUriSafe.charAt(a);
				});
			},
			decompressFromEncodedURIComponent: function(input) {
				if (input == null) return "";
				if (input == "") return null;
				input = input.replace(/ /g, "+");
				return LZString._decompress(input.length, 32, function(index) {
					return getBaseValue(keyStrUriSafe, input.charAt(index));
				});
			},
			compress: function(uncompressed) {
				return LZString._compress(uncompressed, 16, function(a) {
					return f(a);
				});
			},
			_compress: function(uncompressed, bitsPerChar, getCharFromInt) {
				if (uncompressed == null) return "";
				var i, value, context_dictionary = {}, context_dictionaryToCreate = {}, context_c = "", context_wc = "", context_w = "", context_enlargeIn = 2, context_dictSize = 3, context_numBits = 2, context_data = [], context_data_val = 0, context_data_position = 0, ii = 0;
				for (; ii < uncompressed.length; ii += 1) {
					context_c = uncompressed.charAt(ii);
					if (!Object.prototype.hasOwnProperty.call(context_dictionary, context_c)) {
						context_dictionary[context_c] = context_dictSize++;
						context_dictionaryToCreate[context_c] = true;
					}
					context_wc = context_w + context_c;
					if (Object.prototype.hasOwnProperty.call(context_dictionary, context_wc)) context_w = context_wc;
					else {
						if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
							if (context_w.charCodeAt(0) < 256) {
								for (i = 0; i < context_numBits; i++) {
									context_data_val = context_data_val << 1;
									if (context_data_position == bitsPerChar - 1) {
										context_data_position = 0;
										context_data.push(getCharFromInt(context_data_val));
										context_data_val = 0;
									} else context_data_position++;
								}
								value = context_w.charCodeAt(0);
								for (i = 0; i < 8; i++) {
									context_data_val = context_data_val << 1 | value & 1;
									if (context_data_position == bitsPerChar - 1) {
										context_data_position = 0;
										context_data.push(getCharFromInt(context_data_val));
										context_data_val = 0;
									} else context_data_position++;
									value = value >> 1;
								}
							} else {
								value = 1;
								for (i = 0; i < context_numBits; i++) {
									context_data_val = context_data_val << 1 | value;
									if (context_data_position == bitsPerChar - 1) {
										context_data_position = 0;
										context_data.push(getCharFromInt(context_data_val));
										context_data_val = 0;
									} else context_data_position++;
									value = 0;
								}
								value = context_w.charCodeAt(0);
								for (i = 0; i < 16; i++) {
									context_data_val = context_data_val << 1 | value & 1;
									if (context_data_position == bitsPerChar - 1) {
										context_data_position = 0;
										context_data.push(getCharFromInt(context_data_val));
										context_data_val = 0;
									} else context_data_position++;
									value = value >> 1;
								}
							}
							context_enlargeIn--;
							if (context_enlargeIn == 0) {
								context_enlargeIn = Math.pow(2, context_numBits);
								context_numBits++;
							}
							delete context_dictionaryToCreate[context_w];
						} else {
							value = context_dictionary[context_w];
							for (i = 0; i < context_numBits; i++) {
								context_data_val = context_data_val << 1 | value & 1;
								if (context_data_position == bitsPerChar - 1) {
									context_data_position = 0;
									context_data.push(getCharFromInt(context_data_val));
									context_data_val = 0;
								} else context_data_position++;
								value = value >> 1;
							}
						}
						context_enlargeIn--;
						if (context_enlargeIn == 0) {
							context_enlargeIn = Math.pow(2, context_numBits);
							context_numBits++;
						}
						context_dictionary[context_wc] = context_dictSize++;
						context_w = String(context_c);
					}
				}
				if (context_w !== "") {
					if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
						if (context_w.charCodeAt(0) < 256) {
							for (i = 0; i < context_numBits; i++) {
								context_data_val = context_data_val << 1;
								if (context_data_position == bitsPerChar - 1) {
									context_data_position = 0;
									context_data.push(getCharFromInt(context_data_val));
									context_data_val = 0;
								} else context_data_position++;
							}
							value = context_w.charCodeAt(0);
							for (i = 0; i < 8; i++) {
								context_data_val = context_data_val << 1 | value & 1;
								if (context_data_position == bitsPerChar - 1) {
									context_data_position = 0;
									context_data.push(getCharFromInt(context_data_val));
									context_data_val = 0;
								} else context_data_position++;
								value = value >> 1;
							}
						} else {
							value = 1;
							for (i = 0; i < context_numBits; i++) {
								context_data_val = context_data_val << 1 | value;
								if (context_data_position == bitsPerChar - 1) {
									context_data_position = 0;
									context_data.push(getCharFromInt(context_data_val));
									context_data_val = 0;
								} else context_data_position++;
								value = 0;
							}
							value = context_w.charCodeAt(0);
							for (i = 0; i < 16; i++) {
								context_data_val = context_data_val << 1 | value & 1;
								if (context_data_position == bitsPerChar - 1) {
									context_data_position = 0;
									context_data.push(getCharFromInt(context_data_val));
									context_data_val = 0;
								} else context_data_position++;
								value = value >> 1;
							}
						}
						context_enlargeIn--;
						if (context_enlargeIn == 0) {
							context_enlargeIn = Math.pow(2, context_numBits);
							context_numBits++;
						}
						delete context_dictionaryToCreate[context_w];
					} else {
						value = context_dictionary[context_w];
						for (i = 0; i < context_numBits; i++) {
							context_data_val = context_data_val << 1 | value & 1;
							if (context_data_position == bitsPerChar - 1) {
								context_data_position = 0;
								context_data.push(getCharFromInt(context_data_val));
								context_data_val = 0;
							} else context_data_position++;
							value = value >> 1;
						}
					}
					context_enlargeIn--;
					if (context_enlargeIn == 0) {
						context_enlargeIn = Math.pow(2, context_numBits);
						context_numBits++;
					}
				}
				value = 2;
				for (i = 0; i < context_numBits; i++) {
					context_data_val = context_data_val << 1 | value & 1;
					if (context_data_position == bitsPerChar - 1) {
						context_data_position = 0;
						context_data.push(getCharFromInt(context_data_val));
						context_data_val = 0;
					} else context_data_position++;
					value = value >> 1;
				}
				while (true) {
					context_data_val = context_data_val << 1;
					if (context_data_position == bitsPerChar - 1) {
						context_data.push(getCharFromInt(context_data_val));
						break;
					} else context_data_position++;
				}
				return context_data.join("");
			},
			decompress: function(compressed) {
				if (compressed == null) return "";
				if (compressed == "") return null;
				return LZString._decompress(compressed.length, 32768, function(index) {
					return compressed.charCodeAt(index);
				});
			},
			_decompress: function(length, resetValue, getNextValue) {
				var dictionary = [], enlargeIn = 4, dictSize = 4, numBits = 3, entry = "", result = [], i, w, bits, resb, maxpower, power, c, data = {
					val: getNextValue(0),
					position: resetValue,
					index: 1
				};
				for (i = 0; i < 3; i += 1) dictionary[i] = i;
				bits = 0;
				maxpower = Math.pow(2, 2);
				power = 1;
				while (power != maxpower) {
					resb = data.val & data.position;
					data.position >>= 1;
					if (data.position == 0) {
						data.position = resetValue;
						data.val = getNextValue(data.index++);
					}
					bits |= (resb > 0 ? 1 : 0) * power;
					power <<= 1;
				}
				switch (bits) {
					case 0:
						bits = 0;
						maxpower = Math.pow(2, 8);
						power = 1;
						while (power != maxpower) {
							resb = data.val & data.position;
							data.position >>= 1;
							if (data.position == 0) {
								data.position = resetValue;
								data.val = getNextValue(data.index++);
							}
							bits |= (resb > 0 ? 1 : 0) * power;
							power <<= 1;
						}
						c = f(bits);
						break;
					case 1:
						bits = 0;
						maxpower = Math.pow(2, 16);
						power = 1;
						while (power != maxpower) {
							resb = data.val & data.position;
							data.position >>= 1;
							if (data.position == 0) {
								data.position = resetValue;
								data.val = getNextValue(data.index++);
							}
							bits |= (resb > 0 ? 1 : 0) * power;
							power <<= 1;
						}
						c = f(bits);
						break;
					case 2: return "";
				}
				dictionary[3] = c;
				w = c;
				result.push(c);
				while (true) {
					if (data.index > length) return "";
					bits = 0;
					maxpower = Math.pow(2, numBits);
					power = 1;
					while (power != maxpower) {
						resb = data.val & data.position;
						data.position >>= 1;
						if (data.position == 0) {
							data.position = resetValue;
							data.val = getNextValue(data.index++);
						}
						bits |= (resb > 0 ? 1 : 0) * power;
						power <<= 1;
					}
					switch (c = bits) {
						case 0:
							bits = 0;
							maxpower = Math.pow(2, 8);
							power = 1;
							while (power != maxpower) {
								resb = data.val & data.position;
								data.position >>= 1;
								if (data.position == 0) {
									data.position = resetValue;
									data.val = getNextValue(data.index++);
								}
								bits |= (resb > 0 ? 1 : 0) * power;
								power <<= 1;
							}
							dictionary[dictSize++] = f(bits);
							c = dictSize - 1;
							enlargeIn--;
							break;
						case 1:
							bits = 0;
							maxpower = Math.pow(2, 16);
							power = 1;
							while (power != maxpower) {
								resb = data.val & data.position;
								data.position >>= 1;
								if (data.position == 0) {
									data.position = resetValue;
									data.val = getNextValue(data.index++);
								}
								bits |= (resb > 0 ? 1 : 0) * power;
								power <<= 1;
							}
							dictionary[dictSize++] = f(bits);
							c = dictSize - 1;
							enlargeIn--;
							break;
						case 2: return result.join("");
					}
					if (enlargeIn == 0) {
						enlargeIn = Math.pow(2, numBits);
						numBits++;
					}
					if (dictionary[c]) entry = dictionary[c];
					else if (c === dictSize) entry = w + w.charAt(0);
					else return null;
					result.push(entry);
					dictionary[dictSize++] = w + entry.charAt(0);
					enlargeIn--;
					w = entry;
					if (enlargeIn == 0) {
						enlargeIn = Math.pow(2, numBits);
						numBits++;
					}
				}
			}
		};
		return LZString;
	})();
	if (typeof define === "function" && define.amd) define(function() {
		return LZString;
	});
	else if (typeof module !== "undefined" && module != null) module.exports = LZString;
	else if (typeof angular !== "undefined" && angular != null) angular.module("LZString", []).factory("LZString", function() {
		return LZString;
	});
}));
// node_modules/@xterm/xterm/lib/xterm.js
var require_xterm = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(e, t) {
		if ("object" == typeof exports && "object" == typeof module) module.exports = t();
		else if ("function" == typeof define && define.amd) define([], t);
		else {
			var i = t();
			for (var s in i) ("object" == typeof exports ? exports : e)[s] = i[s];
		}
	})(globalThis, (() => (() => {
		"use strict";
		var e = {
			4567: function(e, t, i) {
				var s = this && this.__decorate || function(e, t, i, s) {
					var r, n = arguments.length, o = n < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
					if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, i, s);
					else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (o = (n < 3 ? r(o) : n > 3 ? r(t, i, o) : r(t, i)) || o);
					return n > 3 && o && Object.defineProperty(t, i, o), o;
				}, r = this && this.__param || function(e, t) {
					return function(i, s) {
						t(i, s, e);
					};
				};
				Object.defineProperty(t, "__esModule", { value: !0 }), t.AccessibilityManager = void 0;
				const n = i(9042), o = i(9924), a = i(844), h = i(4725), c = i(2585), l = i(3656);
				let d = t.AccessibilityManager = class extends a.Disposable {
					constructor(e, t, i, s) {
						super(), this._terminal = e, this._coreBrowserService = i, this._renderService = s, this._rowColumns = /* @__PURE__ */ new WeakMap(), this._liveRegionLineCount = 0, this._charsToConsume = [], this._charsToAnnounce = "", this._accessibilityContainer = this._coreBrowserService.mainDocument.createElement("div"), this._accessibilityContainer.classList.add("xterm-accessibility"), this._rowContainer = this._coreBrowserService.mainDocument.createElement("div"), this._rowContainer.setAttribute("role", "list"), this._rowContainer.classList.add("xterm-accessibility-tree"), this._rowElements = [];
						for (let e = 0; e < this._terminal.rows; e++) this._rowElements[e] = this._createAccessibilityTreeNode(), this._rowContainer.appendChild(this._rowElements[e]);
						if (this._topBoundaryFocusListener = (e) => this._handleBoundaryFocus(e, 0), this._bottomBoundaryFocusListener = (e) => this._handleBoundaryFocus(e, 1), this._rowElements[0].addEventListener("focus", this._topBoundaryFocusListener), this._rowElements[this._rowElements.length - 1].addEventListener("focus", this._bottomBoundaryFocusListener), this._refreshRowsDimensions(), this._accessibilityContainer.appendChild(this._rowContainer), this._liveRegion = this._coreBrowserService.mainDocument.createElement("div"), this._liveRegion.classList.add("live-region"), this._liveRegion.setAttribute("aria-live", "assertive"), this._accessibilityContainer.appendChild(this._liveRegion), this._liveRegionDebouncer = this.register(new o.TimeBasedDebouncer(this._renderRows.bind(this))), !this._terminal.element) throw new Error("Cannot enable accessibility before Terminal.open");
						this._terminal.element.insertAdjacentElement("afterbegin", this._accessibilityContainer), this.register(this._terminal.onResize(((e) => this._handleResize(e.rows)))), this.register(this._terminal.onRender(((e) => this._refreshRows(e.start, e.end)))), this.register(this._terminal.onScroll((() => this._refreshRows()))), this.register(this._terminal.onA11yChar(((e) => this._handleChar(e)))), this.register(this._terminal.onLineFeed((() => this._handleChar("\n")))), this.register(this._terminal.onA11yTab(((e) => this._handleTab(e)))), this.register(this._terminal.onKey(((e) => this._handleKey(e.key)))), this.register(this._terminal.onBlur((() => this._clearLiveRegion()))), this.register(this._renderService.onDimensionsChange((() => this._refreshRowsDimensions()))), this.register((0, l.addDisposableDomListener)(document, "selectionchange", (() => this._handleSelectionChange()))), this.register(this._coreBrowserService.onDprChange((() => this._refreshRowsDimensions()))), this._refreshRows(), this.register((0, a.toDisposable)((() => {
							this._accessibilityContainer.remove(), this._rowElements.length = 0;
						})));
					}
					_handleTab(e) {
						for (let t = 0; t < e; t++) this._handleChar(" ");
					}
					_handleChar(e) {
						this._liveRegionLineCount < 21 && (this._charsToConsume.length > 0 ? this._charsToConsume.shift() !== e && (this._charsToAnnounce += e) : this._charsToAnnounce += e, "\n" === e && (this._liveRegionLineCount++, 21 === this._liveRegionLineCount && (this._liveRegion.textContent += n.tooMuchOutput)));
					}
					_clearLiveRegion() {
						this._liveRegion.textContent = "", this._liveRegionLineCount = 0;
					}
					_handleKey(e) {
						this._clearLiveRegion(), /\p{Control}/u.test(e) || this._charsToConsume.push(e);
					}
					_refreshRows(e, t) {
						this._liveRegionDebouncer.refresh(e, t, this._terminal.rows);
					}
					_renderRows(e, t) {
						const i = this._terminal.buffer, s = i.lines.length.toString();
						for (let r = e; r <= t; r++) {
							const e = i.lines.get(i.ydisp + r), t = [], n = e?.translateToString(!0, void 0, void 0, t) || "", o = (i.ydisp + r + 1).toString(), a = this._rowElements[r];
							a && (0 === n.length ? (a.innerText = "\xA0", this._rowColumns.set(a, [0, 1])) : (a.textContent = n, this._rowColumns.set(a, t)), a.setAttribute("aria-posinset", o), a.setAttribute("aria-setsize", s));
						}
						this._announceCharacters();
					}
					_announceCharacters() {
						0 !== this._charsToAnnounce.length && (this._liveRegion.textContent += this._charsToAnnounce, this._charsToAnnounce = "");
					}
					_handleBoundaryFocus(e, t) {
						const i = e.target, s = this._rowElements[0 === t ? 1 : this._rowElements.length - 2];
						if (i.getAttribute("aria-posinset") === (0 === t ? "1" : `${this._terminal.buffer.lines.length}`)) return;
						if (e.relatedTarget !== s) return;
						let r, n;
						if (0 === t ? (r = i, n = this._rowElements.pop(), this._rowContainer.removeChild(n)) : (r = this._rowElements.shift(), n = i, this._rowContainer.removeChild(r)), r.removeEventListener("focus", this._topBoundaryFocusListener), n.removeEventListener("focus", this._bottomBoundaryFocusListener), 0 === t) {
							const e = this._createAccessibilityTreeNode();
							this._rowElements.unshift(e), this._rowContainer.insertAdjacentElement("afterbegin", e);
						} else {
							const e = this._createAccessibilityTreeNode();
							this._rowElements.push(e), this._rowContainer.appendChild(e);
						}
						this._rowElements[0].addEventListener("focus", this._topBoundaryFocusListener), this._rowElements[this._rowElements.length - 1].addEventListener("focus", this._bottomBoundaryFocusListener), this._terminal.scrollLines(0 === t ? -1 : 1), this._rowElements[0 === t ? 1 : this._rowElements.length - 2].focus(), e.preventDefault(), e.stopImmediatePropagation();
					}
					_handleSelectionChange() {
						if (0 === this._rowElements.length) return;
						const e = document.getSelection();
						if (!e) return;
						if (e.isCollapsed) return void (this._rowContainer.contains(e.anchorNode) && this._terminal.clearSelection());
						if (!e.anchorNode || !e.focusNode) return void console.error("anchorNode and/or focusNode are null");
						let t = {
							node: e.anchorNode,
							offset: e.anchorOffset
						}, i = {
							node: e.focusNode,
							offset: e.focusOffset
						};
						if ((t.node.compareDocumentPosition(i.node) & Node.DOCUMENT_POSITION_PRECEDING || t.node === i.node && t.offset > i.offset) && ([t, i] = [i, t]), t.node.compareDocumentPosition(this._rowElements[0]) & (Node.DOCUMENT_POSITION_CONTAINED_BY | Node.DOCUMENT_POSITION_FOLLOWING) && (t = {
							node: this._rowElements[0].childNodes[0],
							offset: 0
						}), !this._rowContainer.contains(t.node)) return;
						const s = this._rowElements.slice(-1)[0];
						if (i.node.compareDocumentPosition(s) & (Node.DOCUMENT_POSITION_CONTAINED_BY | Node.DOCUMENT_POSITION_PRECEDING) && (i = {
							node: s,
							offset: s.textContent?.length ?? 0
						}), !this._rowContainer.contains(i.node)) return;
						const r = ({ node: e, offset: t }) => {
							const i = e instanceof Text ? e.parentNode : e;
							let s = parseInt(i?.getAttribute("aria-posinset"), 10) - 1;
							if (isNaN(s)) return console.warn("row is invalid. Race condition?"), null;
							const r = this._rowColumns.get(i);
							if (!r) return console.warn("columns is null. Race condition?"), null;
							let n = t < r.length ? r[t] : r.slice(-1)[0] + 1;
							return n >= this._terminal.cols && (++s, n = 0), {
								row: s,
								column: n
							};
						}, n = r(t), o = r(i);
						if (n && o) {
							if (n.row > o.row || n.row === o.row && n.column >= o.column) throw new Error("invalid range");
							this._terminal.select(n.column, n.row, (o.row - n.row) * this._terminal.cols - n.column + o.column);
						}
					}
					_handleResize(e) {
						this._rowElements[this._rowElements.length - 1].removeEventListener("focus", this._bottomBoundaryFocusListener);
						for (let e = this._rowContainer.children.length; e < this._terminal.rows; e++) this._rowElements[e] = this._createAccessibilityTreeNode(), this._rowContainer.appendChild(this._rowElements[e]);
						for (; this._rowElements.length > e;) this._rowContainer.removeChild(this._rowElements.pop());
						this._rowElements[this._rowElements.length - 1].addEventListener("focus", this._bottomBoundaryFocusListener), this._refreshRowsDimensions();
					}
					_createAccessibilityTreeNode() {
						const e = this._coreBrowserService.mainDocument.createElement("div");
						return e.setAttribute("role", "listitem"), e.tabIndex = -1, this._refreshRowDimensions(e), e;
					}
					_refreshRowsDimensions() {
						if (this._renderService.dimensions.css.cell.height) {
							this._accessibilityContainer.style.width = `${this._renderService.dimensions.css.canvas.width}px`, this._rowElements.length !== this._terminal.rows && this._handleResize(this._terminal.rows);
							for (let e = 0; e < this._terminal.rows; e++) this._refreshRowDimensions(this._rowElements[e]);
						}
					}
					_refreshRowDimensions(e) {
						e.style.height = `${this._renderService.dimensions.css.cell.height}px`;
					}
				};
				t.AccessibilityManager = d = s([
					r(1, c.IInstantiationService),
					r(2, h.ICoreBrowserService),
					r(3, h.IRenderService)
				], d);
			},
			3614: (e, t) => {
				function i(e) {
					return e.replace(/\r?\n/g, "\r");
				}
				function s(e, t) {
					return t ? "\x1B[200~" + e + "\x1B[201~" : e;
				}
				function r(e, t, r, n) {
					e = s(e = i(e), r.decPrivateModes.bracketedPasteMode && !0 !== n.rawOptions.ignoreBracketedPasteMode), r.triggerDataEvent(e, !0), t.value = "";
				}
				function n(e, t, i) {
					const s = i.getBoundingClientRect(), r = e.clientX - s.left - 10, n = e.clientY - s.top - 10;
					t.style.width = "20px", t.style.height = "20px", t.style.left = `${r}px`, t.style.top = `${n}px`, t.style.zIndex = "1000", t.focus();
				}
				Object.defineProperty(t, "__esModule", { value: !0 }), t.rightClickHandler = t.moveTextAreaUnderMouseCursor = t.paste = t.handlePasteEvent = t.copyHandler = t.bracketTextForPaste = t.prepareTextForTerminal = void 0, t.prepareTextForTerminal = i, t.bracketTextForPaste = s, t.copyHandler = function(e, t) {
					e.clipboardData && e.clipboardData.setData("text/plain", t.selectionText), e.preventDefault();
				}, t.handlePasteEvent = function(e, t, i, s) {
					e.stopPropagation(), e.clipboardData && r(e.clipboardData.getData("text/plain"), t, i, s);
				}, t.paste = r, t.moveTextAreaUnderMouseCursor = n, t.rightClickHandler = function(e, t, i, s, r) {
					n(e, t, i), r && s.rightClickSelect(e), t.value = s.selectionText, t.select();
				};
			},
			7239: (e, t, i) => {
				Object.defineProperty(t, "__esModule", { value: !0 }), t.ColorContrastCache = void 0;
				const s = i(1505);
				t.ColorContrastCache = class {
					constructor() {
						this._color = new s.TwoKeyMap(), this._css = new s.TwoKeyMap();
					}
					setCss(e, t, i) {
						this._css.set(e, t, i);
					}
					getCss(e, t) {
						return this._css.get(e, t);
					}
					setColor(e, t, i) {
						this._color.set(e, t, i);
					}
					getColor(e, t) {
						return this._color.get(e, t);
					}
					clear() {
						this._color.clear(), this._css.clear();
					}
				};
			},
			3656: (e, t) => {
				Object.defineProperty(t, "__esModule", { value: !0 }), t.addDisposableDomListener = void 0, t.addDisposableDomListener = function(e, t, i, s) {
					e.addEventListener(t, i, s);
					let r = !1;
					return { dispose: () => {
						r || (r = !0, e.removeEventListener(t, i, s));
					} };
				};
			},
			3551: function(e, t, i) {
				var s = this && this.__decorate || function(e, t, i, s) {
					var r, n = arguments.length, o = n < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
					if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, i, s);
					else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (o = (n < 3 ? r(o) : n > 3 ? r(t, i, o) : r(t, i)) || o);
					return n > 3 && o && Object.defineProperty(t, i, o), o;
				}, r = this && this.__param || function(e, t) {
					return function(i, s) {
						t(i, s, e);
					};
				};
				Object.defineProperty(t, "__esModule", { value: !0 }), t.Linkifier = void 0;
				const n = i(3656), o = i(8460), a = i(844), h = i(2585), c = i(4725);
				let l = t.Linkifier = class extends a.Disposable {
					get currentLink() {
						return this._currentLink;
					}
					constructor(e, t, i, s, r) {
						super(), this._element = e, this._mouseService = t, this._renderService = i, this._bufferService = s, this._linkProviderService = r, this._linkCacheDisposables = [], this._isMouseOut = !0, this._wasResized = !1, this._activeLine = -1, this._onShowLinkUnderline = this.register(new o.EventEmitter()), this.onShowLinkUnderline = this._onShowLinkUnderline.event, this._onHideLinkUnderline = this.register(new o.EventEmitter()), this.onHideLinkUnderline = this._onHideLinkUnderline.event, this.register((0, a.getDisposeArrayDisposable)(this._linkCacheDisposables)), this.register((0, a.toDisposable)((() => {
							this._lastMouseEvent = void 0, this._activeProviderReplies?.clear();
						}))), this.register(this._bufferService.onResize((() => {
							this._clearCurrentLink(), this._wasResized = !0;
						}))), this.register((0, n.addDisposableDomListener)(this._element, "mouseleave", (() => {
							this._isMouseOut = !0, this._clearCurrentLink();
						}))), this.register((0, n.addDisposableDomListener)(this._element, "mousemove", this._handleMouseMove.bind(this))), this.register((0, n.addDisposableDomListener)(this._element, "mousedown", this._handleMouseDown.bind(this))), this.register((0, n.addDisposableDomListener)(this._element, "mouseup", this._handleMouseUp.bind(this)));
					}
					_handleMouseMove(e) {
						this._lastMouseEvent = e;
						const t = this._positionFromMouseEvent(e, this._element, this._mouseService);
						if (!t) return;
						this._isMouseOut = !1;
						const i = e.composedPath();
						for (let e = 0; e < i.length; e++) {
							const t = i[e];
							if (t.classList.contains("xterm")) break;
							if (t.classList.contains("xterm-hover")) return;
						}
						this._lastBufferCell && t.x === this._lastBufferCell.x && t.y === this._lastBufferCell.y || (this._handleHover(t), this._lastBufferCell = t);
					}
					_handleHover(e) {
						if (this._activeLine !== e.y || this._wasResized) return this._clearCurrentLink(), this._askForLink(e, !1), void (this._wasResized = !1);
						this._currentLink && this._linkAtPosition(this._currentLink.link, e) || (this._clearCurrentLink(), this._askForLink(e, !0));
					}
					_askForLink(e, t) {
						this._activeProviderReplies && t || (this._activeProviderReplies?.forEach(((e) => {
							e?.forEach(((e) => {
								e.link.dispose && e.link.dispose();
							}));
						})), this._activeProviderReplies = /* @__PURE__ */ new Map(), this._activeLine = e.y);
						let i = !1;
						for (const [s, r] of this._linkProviderService.linkProviders.entries()) if (t) this._activeProviderReplies?.get(s) && (i = this._checkLinkProviderResult(s, e, i));
						else r.provideLinks(e.y, ((t) => {
							if (this._isMouseOut) return;
							const r = t?.map(((e) => ({ link: e })));
							this._activeProviderReplies?.set(s, r), i = this._checkLinkProviderResult(s, e, i), this._activeProviderReplies?.size === this._linkProviderService.linkProviders.length && this._removeIntersectingLinks(e.y, this._activeProviderReplies);
						}));
					}
					_removeIntersectingLinks(e, t) {
						const i = /* @__PURE__ */ new Set();
						for (let s = 0; s < t.size; s++) {
							const r = t.get(s);
							if (r) for (let t = 0; t < r.length; t++) {
								const s = r[t], n = s.link.range.start.y < e ? 0 : s.link.range.start.x, o = s.link.range.end.y > e ? this._bufferService.cols : s.link.range.end.x;
								for (let e = n; e <= o; e++) {
									if (i.has(e)) {
										r.splice(t--, 1);
										break;
									}
									i.add(e);
								}
							}
						}
					}
					_checkLinkProviderResult(e, t, i) {
						if (!this._activeProviderReplies) return i;
						const s = this._activeProviderReplies.get(e);
						let r = !1;
						for (let t = 0; t < e; t++) this._activeProviderReplies.has(t) && !this._activeProviderReplies.get(t) || (r = !0);
						if (!r && s) {
							const e = s.find(((e) => this._linkAtPosition(e.link, t)));
							e && (i = !0, this._handleNewLink(e));
						}
						if (this._activeProviderReplies.size === this._linkProviderService.linkProviders.length && !i) for (let e = 0; e < this._activeProviderReplies.size; e++) {
							const s = this._activeProviderReplies.get(e)?.find(((e) => this._linkAtPosition(e.link, t)));
							if (s) {
								i = !0, this._handleNewLink(s);
								break;
							}
						}
						return i;
					}
					_handleMouseDown() {
						this._mouseDownLink = this._currentLink;
					}
					_handleMouseUp(e) {
						if (!this._currentLink) return;
						const t = this._positionFromMouseEvent(e, this._element, this._mouseService);
						t && this._mouseDownLink === this._currentLink && this._linkAtPosition(this._currentLink.link, t) && this._currentLink.link.activate(e, this._currentLink.link.text);
					}
					_clearCurrentLink(e, t) {
						this._currentLink && this._lastMouseEvent && (!e || !t || this._currentLink.link.range.start.y >= e && this._currentLink.link.range.end.y <= t) && (this._linkLeave(this._element, this._currentLink.link, this._lastMouseEvent), this._currentLink = void 0, (0, a.disposeArray)(this._linkCacheDisposables));
					}
					_handleNewLink(e) {
						if (!this._lastMouseEvent) return;
						const t = this._positionFromMouseEvent(this._lastMouseEvent, this._element, this._mouseService);
						t && this._linkAtPosition(e.link, t) && (this._currentLink = e, this._currentLink.state = {
							decorations: {
								underline: void 0 === e.link.decorations || e.link.decorations.underline,
								pointerCursor: void 0 === e.link.decorations || e.link.decorations.pointerCursor
							},
							isHovered: !0
						}, this._linkHover(this._element, e.link, this._lastMouseEvent), e.link.decorations = {}, Object.defineProperties(e.link.decorations, {
							pointerCursor: {
								get: () => this._currentLink?.state?.decorations.pointerCursor,
								set: (e) => {
									this._currentLink?.state && this._currentLink.state.decorations.pointerCursor !== e && (this._currentLink.state.decorations.pointerCursor = e, this._currentLink.state.isHovered && this._element.classList.toggle("xterm-cursor-pointer", e));
								}
							},
							underline: {
								get: () => this._currentLink?.state?.decorations.underline,
								set: (t) => {
									this._currentLink?.state && this._currentLink?.state?.decorations.underline !== t && (this._currentLink.state.decorations.underline = t, this._currentLink.state.isHovered && this._fireUnderlineEvent(e.link, t));
								}
							}
						}), this._linkCacheDisposables.push(this._renderService.onRenderedViewportChange(((e) => {
							if (!this._currentLink) return;
							const t = 0 === e.start ? 0 : e.start + 1 + this._bufferService.buffer.ydisp, i = this._bufferService.buffer.ydisp + 1 + e.end;
							if (this._currentLink.link.range.start.y >= t && this._currentLink.link.range.end.y <= i && (this._clearCurrentLink(t, i), this._lastMouseEvent)) {
								const e = this._positionFromMouseEvent(this._lastMouseEvent, this._element, this._mouseService);
								e && this._askForLink(e, !1);
							}
						}))));
					}
					_linkHover(e, t, i) {
						this._currentLink?.state && (this._currentLink.state.isHovered = !0, this._currentLink.state.decorations.underline && this._fireUnderlineEvent(t, !0), this._currentLink.state.decorations.pointerCursor && e.classList.add("xterm-cursor-pointer")), t.hover && t.hover(i, t.text);
					}
					_fireUnderlineEvent(e, t) {
						const i = e.range, s = this._bufferService.buffer.ydisp, r = this._createLinkUnderlineEvent(i.start.x - 1, i.start.y - s - 1, i.end.x, i.end.y - s - 1, void 0);
						(t ? this._onShowLinkUnderline : this._onHideLinkUnderline).fire(r);
					}
					_linkLeave(e, t, i) {
						this._currentLink?.state && (this._currentLink.state.isHovered = !1, this._currentLink.state.decorations.underline && this._fireUnderlineEvent(t, !1), this._currentLink.state.decorations.pointerCursor && e.classList.remove("xterm-cursor-pointer")), t.leave && t.leave(i, t.text);
					}
					_linkAtPosition(e, t) {
						const i = e.range.start.y * this._bufferService.cols + e.range.start.x, s = e.range.end.y * this._bufferService.cols + e.range.end.x, r = t.y * this._bufferService.cols + t.x;
						return i <= r && r <= s;
					}
					_positionFromMouseEvent(e, t, i) {
						const s = i.getCoords(e, t, this._bufferService.cols, this._bufferService.rows);
						if (s) return {
							x: s[0],
							y: s[1] + this._bufferService.buffer.ydisp
						};
					}
					_createLinkUnderlineEvent(e, t, i, s, r) {
						return {
							x1: e,
							y1: t,
							x2: i,
							y2: s,
							cols: this._bufferService.cols,
							fg: r
						};
					}
				};
				t.Linkifier = l = s([
					r(1, c.IMouseService),
					r(2, c.IRenderService),
					r(3, h.IBufferService),
					r(4, c.ILinkProviderService)
				], l);
			},
			9042: (e, t) => {
				Object.defineProperty(t, "__esModule", { value: !0 }), t.tooMuchOutput = t.promptLabel = void 0, t.promptLabel = "Terminal input", t.tooMuchOutput = "Too much output to announce, navigate to rows manually to read";
			},
			3730: function(e, t, i) {
				var s = this && this.__decorate || function(e, t, i, s) {
					var r, n = arguments.length, o = n < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
					if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, i, s);
					else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (o = (n < 3 ? r(o) : n > 3 ? r(t, i, o) : r(t, i)) || o);
					return n > 3 && o && Object.defineProperty(t, i, o), o;
				}, r = this && this.__param || function(e, t) {
					return function(i, s) {
						t(i, s, e);
					};
				};
				Object.defineProperty(t, "__esModule", { value: !0 }), t.OscLinkProvider = void 0;
				const n = i(511), o = i(2585);
				let a = t.OscLinkProvider = class {
					constructor(e, t, i) {
						this._bufferService = e, this._optionsService = t, this._oscLinkService = i;
					}
					provideLinks(e, t) {
						const i = this._bufferService.buffer.lines.get(e - 1);
						if (!i) return void t(void 0);
						const s = [], r = this._optionsService.rawOptions.linkHandler, o = new n.CellData(), a = i.getTrimmedLength();
						let c = -1, l = -1, d = !1;
						for (let t = 0; t < a; t++) if (-1 !== l || i.hasContent(t)) {
							if (i.loadCell(t, o), o.hasExtendedAttrs() && o.extended.urlId) {
								if (-1 === l) {
									l = t, c = o.extended.urlId;
									continue;
								}
								d = o.extended.urlId !== c;
							} else -1 !== l && (d = !0);
							if (d || -1 !== l && t === a - 1) {
								const i = this._oscLinkService.getLinkData(c)?.uri;
								if (i) {
									const n = {
										start: {
											x: l + 1,
											y: e
										},
										end: {
											x: t + (d || t !== a - 1 ? 0 : 1),
											y: e
										}
									};
									let o = !1;
									if (!r?.allowNonHttpProtocols) try {
										const e = new URL(i);
										["http:", "https:"].includes(e.protocol) || (o = !0);
									} catch (e) {
										o = !0;
									}
									o || s.push({
										text: i,
										range: n,
										activate: (e, t) => r ? r.activate(e, t, n) : h(0, t),
										hover: (e, t) => r?.hover?.(e, t, n),
										leave: (e, t) => r?.leave?.(e, t, n)
									});
								}
								d = !1, o.hasExtendedAttrs() && o.extended.urlId ? (l = t, c = o.extended.urlId) : (l = -1, c = -1);
							}
						}
						t(s);
					}
				};
				function h(e, t) {
					if (confirm(`Do you want to navigate to ${t}?\n\nWARNING: This link could potentially be dangerous`)) {
						const e = window.open();
						if (e) {
							try {
								e.opener = null;
							} catch {}
							e.location.href = t;
						} else console.warn("Opening link blocked as opener could not be cleared");
					}
				}
				t.OscLinkProvider = a = s([
					r(0, o.IBufferService),
					r(1, o.IOptionsService),
					r(2, o.IOscLinkService)
				], a);
			},
			6193: (e, t) => {
				Object.defineProperty(t, "__esModule", { value: !0 }), t.RenderDebouncer = void 0, t.RenderDebouncer = class {
					constructor(e, t) {
						this._renderCallback = e, this._coreBrowserService = t, this._refreshCallbacks = [];
					}
					dispose() {
						this._animationFrame && (this._coreBrowserService.window.cancelAnimationFrame(this._animationFrame), this._animationFrame = void 0);
					}
					addRefreshCallback(e) {
						return this._refreshCallbacks.push(e), this._animationFrame || (this._animationFrame = this._coreBrowserService.window.requestAnimationFrame((() => this._innerRefresh()))), this._animationFrame;
					}
					refresh(e, t, i) {
						this._rowCount = i, e = void 0 !== e ? e : 0, t = void 0 !== t ? t : this._rowCount - 1, this._rowStart = void 0 !== this._rowStart ? Math.min(this._rowStart, e) : e, this._rowEnd = void 0 !== this._rowEnd ? Math.max(this._rowEnd, t) : t, this._animationFrame || (this._animationFrame = this._coreBrowserService.window.requestAnimationFrame((() => this._innerRefresh())));
					}
					_innerRefresh() {
						if (this._animationFrame = void 0, void 0 === this._rowStart || void 0 === this._rowEnd || void 0 === this._rowCount) return void this._runRefreshCallbacks();
						const e = Math.max(this._rowStart, 0), t = Math.min(this._rowEnd, this._rowCount - 1);
						this._rowStart = void 0, this._rowEnd = void 0, this._renderCallback(e, t), this._runRefreshCallbacks();
					}
					_runRefreshCallbacks() {
						for (const e of this._refreshCallbacks) e(0);
						this._refreshCallbacks = [];
					}
				};
			},
			3236: (e, t, i) => {
				Object.defineProperty(t, "__esModule", { value: !0 }), t.Terminal = void 0;
				const s = i(3614), r = i(3656), n = i(3551), o = i(9042), a = i(3730), h = i(1680), c = i(3107), l = i(5744), d = i(2950), _ = i(1296), u = i(428), f = i(4269), v = i(5114), p = i(8934), g = i(3230), m = i(9312), S = i(4725), C = i(6731), b = i(8055), w = i(8969), y = i(8460), E = i(844), k = i(6114), L = i(8437), D = i(2584), R = i(7399), x = i(5941), A = i(9074), B = i(2585), T = i(5435), M = i(4567), O = i(779);
				class P extends w.CoreTerminal {
					get onFocus() {
						return this._onFocus.event;
					}
					get onBlur() {
						return this._onBlur.event;
					}
					get onA11yChar() {
						return this._onA11yCharEmitter.event;
					}
					get onA11yTab() {
						return this._onA11yTabEmitter.event;
					}
					get onWillOpen() {
						return this._onWillOpen.event;
					}
					constructor(e = {}) {
						super(e), this.browser = k, this._keyDownHandled = !1, this._keyDownSeen = !1, this._keyPressHandled = !1, this._unprocessedDeadKey = !1, this._accessibilityManager = this.register(new E.MutableDisposable()), this._onCursorMove = this.register(new y.EventEmitter()), this.onCursorMove = this._onCursorMove.event, this._onKey = this.register(new y.EventEmitter()), this.onKey = this._onKey.event, this._onRender = this.register(new y.EventEmitter()), this.onRender = this._onRender.event, this._onSelectionChange = this.register(new y.EventEmitter()), this.onSelectionChange = this._onSelectionChange.event, this._onTitleChange = this.register(new y.EventEmitter()), this.onTitleChange = this._onTitleChange.event, this._onBell = this.register(new y.EventEmitter()), this.onBell = this._onBell.event, this._onFocus = this.register(new y.EventEmitter()), this._onBlur = this.register(new y.EventEmitter()), this._onA11yCharEmitter = this.register(new y.EventEmitter()), this._onA11yTabEmitter = this.register(new y.EventEmitter()), this._onWillOpen = this.register(new y.EventEmitter()), this._setup(), this._decorationService = this._instantiationService.createInstance(A.DecorationService), this._instantiationService.setService(B.IDecorationService, this._decorationService), this._linkProviderService = this._instantiationService.createInstance(O.LinkProviderService), this._instantiationService.setService(S.ILinkProviderService, this._linkProviderService), this._linkProviderService.registerLinkProvider(this._instantiationService.createInstance(a.OscLinkProvider)), this.register(this._inputHandler.onRequestBell((() => this._onBell.fire()))), this.register(this._inputHandler.onRequestRefreshRows(((e, t) => this.refresh(e, t)))), this.register(this._inputHandler.onRequestSendFocus((() => this._reportFocus()))), this.register(this._inputHandler.onRequestReset((() => this.reset()))), this.register(this._inputHandler.onRequestWindowsOptionsReport(((e) => this._reportWindowsOptions(e)))), this.register(this._inputHandler.onColor(((e) => this._handleColorEvent(e)))), this.register((0, y.forwardEvent)(this._inputHandler.onCursorMove, this._onCursorMove)), this.register((0, y.forwardEvent)(this._inputHandler.onTitleChange, this._onTitleChange)), this.register((0, y.forwardEvent)(this._inputHandler.onA11yChar, this._onA11yCharEmitter)), this.register((0, y.forwardEvent)(this._inputHandler.onA11yTab, this._onA11yTabEmitter)), this.register(this._bufferService.onResize(((e) => this._afterResize(e.cols, e.rows)))), this.register((0, E.toDisposable)((() => {
							this._customKeyEventHandler = void 0, this.element?.parentNode?.removeChild(this.element);
						})));
					}
					_handleColorEvent(e) {
						if (this._themeService) for (const t of e) {
							let e, i = "";
							switch (t.index) {
								case 256:
									e = "foreground", i = "10";
									break;
								case 257:
									e = "background", i = "11";
									break;
								case 258:
									e = "cursor", i = "12";
									break;
								default: e = "ansi", i = "4;" + t.index;
							}
							switch (t.type) {
								case 0:
									const s = b.color.toColorRGB("ansi" === e ? this._themeService.colors.ansi[t.index] : this._themeService.colors[e]);
									this.coreService.triggerDataEvent(`${D.C0.ESC}]${i};${(0, x.toRgbString)(s)}${D.C1_ESCAPED.ST}`);
									break;
								case 1:
									if ("ansi" === e) this._themeService.modifyColors(((e) => e.ansi[t.index] = b.channels.toColor(...t.color)));
									else {
										const i = e;
										this._themeService.modifyColors(((e) => e[i] = b.channels.toColor(...t.color)));
									}
									break;
								case 2: this._themeService.restoreColor(t.index);
							}
						}
					}
					_setup() {
						super._setup(), this._customKeyEventHandler = void 0;
					}
					get buffer() {
						return this.buffers.active;
					}
					focus() {
						this.textarea && this.textarea.focus({ preventScroll: !0 });
					}
					_handleScreenReaderModeOptionChange(e) {
						e ? !this._accessibilityManager.value && this._renderService && (this._accessibilityManager.value = this._instantiationService.createInstance(M.AccessibilityManager, this)) : this._accessibilityManager.clear();
					}
					_handleTextAreaFocus(e) {
						this.coreService.decPrivateModes.sendFocus && this.coreService.triggerDataEvent(D.C0.ESC + "[I"), this.element.classList.add("focus"), this._showCursor(), this._onFocus.fire();
					}
					blur() {
						return this.textarea?.blur();
					}
					_handleTextAreaBlur() {
						this.textarea.value = "", this.refresh(this.buffer.y, this.buffer.y), this.coreService.decPrivateModes.sendFocus && this.coreService.triggerDataEvent(D.C0.ESC + "[O"), this.element.classList.remove("focus"), this._onBlur.fire();
					}
					_syncTextArea() {
						if (!this.textarea || !this.buffer.isCursorInViewport || this._compositionHelper.isComposing || !this._renderService) return;
						const e = this.buffer.ybase + this.buffer.y, t = this.buffer.lines.get(e);
						if (!t) return;
						const i = Math.min(this.buffer.x, this.cols - 1), s = this._renderService.dimensions.css.cell.height, r = t.getWidth(i), n = this._renderService.dimensions.css.cell.width * r, o = this.buffer.y * this._renderService.dimensions.css.cell.height, a = i * this._renderService.dimensions.css.cell.width;
						this.textarea.style.left = a + "px", this.textarea.style.top = o + "px", this.textarea.style.width = n + "px", this.textarea.style.height = s + "px", this.textarea.style.lineHeight = s + "px", this.textarea.style.zIndex = "-5";
					}
					_initGlobal() {
						this._bindKeys(), this.register((0, r.addDisposableDomListener)(this.element, "copy", ((e) => {
							this.hasSelection() && (0, s.copyHandler)(e, this._selectionService);
						})));
						const e = (e) => (0, s.handlePasteEvent)(e, this.textarea, this.coreService, this.optionsService);
						this.register((0, r.addDisposableDomListener)(this.textarea, "paste", e)), this.register((0, r.addDisposableDomListener)(this.element, "paste", e)), k.isFirefox ? this.register((0, r.addDisposableDomListener)(this.element, "mousedown", ((e) => {
							2 === e.button && (0, s.rightClickHandler)(e, this.textarea, this.screenElement, this._selectionService, this.options.rightClickSelectsWord);
						}))) : this.register((0, r.addDisposableDomListener)(this.element, "contextmenu", ((e) => {
							(0, s.rightClickHandler)(e, this.textarea, this.screenElement, this._selectionService, this.options.rightClickSelectsWord);
						}))), k.isLinux && this.register((0, r.addDisposableDomListener)(this.element, "auxclick", ((e) => {
							1 === e.button && (0, s.moveTextAreaUnderMouseCursor)(e, this.textarea, this.screenElement);
						})));
					}
					_bindKeys() {
						this.register((0, r.addDisposableDomListener)(this.textarea, "keyup", ((e) => this._keyUp(e)), !0)), this.register((0, r.addDisposableDomListener)(this.textarea, "keydown", ((e) => this._keyDown(e)), !0)), this.register((0, r.addDisposableDomListener)(this.textarea, "keypress", ((e) => this._keyPress(e)), !0)), this.register((0, r.addDisposableDomListener)(this.textarea, "compositionstart", (() => this._compositionHelper.compositionstart()))), this.register((0, r.addDisposableDomListener)(this.textarea, "compositionupdate", ((e) => this._compositionHelper.compositionupdate(e)))), this.register((0, r.addDisposableDomListener)(this.textarea, "compositionend", (() => this._compositionHelper.compositionend()))), this.register((0, r.addDisposableDomListener)(this.textarea, "input", ((e) => this._inputEvent(e)), !0)), this.register(this.onRender((() => this._compositionHelper.updateCompositionElements())));
					}
					open(e) {
						if (!e) throw new Error("Terminal requires a parent element.");
						if (e.isConnected || this._logService.debug("Terminal.open was called on an element that was not attached to the DOM"), this.element?.ownerDocument.defaultView && this._coreBrowserService) return void (this.element.ownerDocument.defaultView !== this._coreBrowserService.window && (this._coreBrowserService.window = this.element.ownerDocument.defaultView));
						this._document = e.ownerDocument, this.options.documentOverride && this.options.documentOverride instanceof Document && (this._document = this.optionsService.rawOptions.documentOverride), this.element = this._document.createElement("div"), this.element.dir = "ltr", this.element.classList.add("terminal"), this.element.classList.add("xterm"), e.appendChild(this.element);
						const t = this._document.createDocumentFragment();
						this._viewportElement = this._document.createElement("div"), this._viewportElement.classList.add("xterm-viewport"), t.appendChild(this._viewportElement), this._viewportScrollArea = this._document.createElement("div"), this._viewportScrollArea.classList.add("xterm-scroll-area"), this._viewportElement.appendChild(this._viewportScrollArea), this.screenElement = this._document.createElement("div"), this.screenElement.classList.add("xterm-screen"), this.register((0, r.addDisposableDomListener)(this.screenElement, "mousemove", ((e) => this.updateCursorStyle(e)))), this._helperContainer = this._document.createElement("div"), this._helperContainer.classList.add("xterm-helpers"), this.screenElement.appendChild(this._helperContainer), t.appendChild(this.screenElement), this.textarea = this._document.createElement("textarea"), this.textarea.classList.add("xterm-helper-textarea"), this.textarea.setAttribute("aria-label", o.promptLabel), k.isChromeOS || this.textarea.setAttribute("aria-multiline", "false"), this.textarea.setAttribute("autocorrect", "off"), this.textarea.setAttribute("autocapitalize", "off"), this.textarea.setAttribute("spellcheck", "false"), this.textarea.tabIndex = 0, this._coreBrowserService = this.register(this._instantiationService.createInstance(v.CoreBrowserService, this.textarea, e.ownerDocument.defaultView ?? window, this._document ?? "undefined" != typeof window ? window.document : null)), this._instantiationService.setService(S.ICoreBrowserService, this._coreBrowserService), this.register((0, r.addDisposableDomListener)(this.textarea, "focus", ((e) => this._handleTextAreaFocus(e)))), this.register((0, r.addDisposableDomListener)(this.textarea, "blur", (() => this._handleTextAreaBlur()))), this._helperContainer.appendChild(this.textarea), this._charSizeService = this._instantiationService.createInstance(u.CharSizeService, this._document, this._helperContainer), this._instantiationService.setService(S.ICharSizeService, this._charSizeService), this._themeService = this._instantiationService.createInstance(C.ThemeService), this._instantiationService.setService(S.IThemeService, this._themeService), this._characterJoinerService = this._instantiationService.createInstance(f.CharacterJoinerService), this._instantiationService.setService(S.ICharacterJoinerService, this._characterJoinerService), this._renderService = this.register(this._instantiationService.createInstance(g.RenderService, this.rows, this.screenElement)), this._instantiationService.setService(S.IRenderService, this._renderService), this.register(this._renderService.onRenderedViewportChange(((e) => this._onRender.fire(e)))), this.onResize(((e) => this._renderService.resize(e.cols, e.rows))), this._compositionView = this._document.createElement("div"), this._compositionView.classList.add("composition-view"), this._compositionHelper = this._instantiationService.createInstance(d.CompositionHelper, this.textarea, this._compositionView), this._helperContainer.appendChild(this._compositionView), this._mouseService = this._instantiationService.createInstance(p.MouseService), this._instantiationService.setService(S.IMouseService, this._mouseService), this.linkifier = this.register(this._instantiationService.createInstance(n.Linkifier, this.screenElement)), this.element.appendChild(t);
						try {
							this._onWillOpen.fire(this.element);
						} catch {}
						this._renderService.hasRenderer() || this._renderService.setRenderer(this._createRenderer()), this.viewport = this._instantiationService.createInstance(h.Viewport, this._viewportElement, this._viewportScrollArea), this.viewport.onRequestScrollLines(((e) => this.scrollLines(e.amount, e.suppressScrollEvent, 1))), this.register(this._inputHandler.onRequestSyncScrollBar((() => this.viewport.syncScrollArea()))), this.register(this.viewport), this.register(this.onCursorMove((() => {
							this._renderService.handleCursorMove(), this._syncTextArea();
						}))), this.register(this.onResize((() => this._renderService.handleResize(this.cols, this.rows)))), this.register(this.onBlur((() => this._renderService.handleBlur()))), this.register(this.onFocus((() => this._renderService.handleFocus()))), this.register(this._renderService.onDimensionsChange((() => this.viewport.syncScrollArea()))), this._selectionService = this.register(this._instantiationService.createInstance(m.SelectionService, this.element, this.screenElement, this.linkifier)), this._instantiationService.setService(S.ISelectionService, this._selectionService), this.register(this._selectionService.onRequestScrollLines(((e) => this.scrollLines(e.amount, e.suppressScrollEvent)))), this.register(this._selectionService.onSelectionChange((() => this._onSelectionChange.fire()))), this.register(this._selectionService.onRequestRedraw(((e) => this._renderService.handleSelectionChanged(e.start, e.end, e.columnSelectMode)))), this.register(this._selectionService.onLinuxMouseSelection(((e) => {
							this.textarea.value = e, this.textarea.focus(), this.textarea.select();
						}))), this.register(this._onScroll.event(((e) => {
							this.viewport.syncScrollArea(), this._selectionService.refresh();
						}))), this.register((0, r.addDisposableDomListener)(this._viewportElement, "scroll", (() => this._selectionService.refresh()))), this.register(this._instantiationService.createInstance(c.BufferDecorationRenderer, this.screenElement)), this.register((0, r.addDisposableDomListener)(this.element, "mousedown", ((e) => this._selectionService.handleMouseDown(e)))), this.coreMouseService.areMouseEventsActive ? (this._selectionService.disable(), this.element.classList.add("enable-mouse-events")) : this._selectionService.enable(), this.options.screenReaderMode && (this._accessibilityManager.value = this._instantiationService.createInstance(M.AccessibilityManager, this)), this.register(this.optionsService.onSpecificOptionChange("screenReaderMode", ((e) => this._handleScreenReaderModeOptionChange(e)))), this.options.overviewRulerWidth && (this._overviewRulerRenderer = this.register(this._instantiationService.createInstance(l.OverviewRulerRenderer, this._viewportElement, this.screenElement))), this.optionsService.onSpecificOptionChange("overviewRulerWidth", ((e) => {
							!this._overviewRulerRenderer && e && this._viewportElement && this.screenElement && (this._overviewRulerRenderer = this.register(this._instantiationService.createInstance(l.OverviewRulerRenderer, this._viewportElement, this.screenElement)));
						})), this._charSizeService.measure(), this.refresh(0, this.rows - 1), this._initGlobal(), this.bindMouse();
					}
					_createRenderer() {
						return this._instantiationService.createInstance(_.DomRenderer, this, this._document, this.element, this.screenElement, this._viewportElement, this._helperContainer, this.linkifier);
					}
					bindMouse() {
						const e = this, t = this.element;
						function i(t) {
							const i = e._mouseService.getMouseReportCoords(t, e.screenElement);
							if (!i) return !1;
							let s, r;
							switch (t.overrideType || t.type) {
								case "mousemove":
									r = 32, void 0 === t.buttons ? (s = 3, void 0 !== t.button && (s = t.button < 3 ? t.button : 3)) : s = 1 & t.buttons ? 0 : 4 & t.buttons ? 1 : 2 & t.buttons ? 2 : 3;
									break;
								case "mouseup":
									r = 0, s = t.button < 3 ? t.button : 3;
									break;
								case "mousedown":
									r = 1, s = t.button < 3 ? t.button : 3;
									break;
								case "wheel":
									if (e._customWheelEventHandler && !1 === e._customWheelEventHandler(t)) return !1;
									if (0 === e.viewport.getLinesScrolled(t)) return !1;
									r = t.deltaY < 0 ? 0 : 1, s = 4;
									break;
								default: return !1;
							}
							return !(void 0 === r || void 0 === s || s > 4) && e.coreMouseService.triggerMouseEvent({
								col: i.col,
								row: i.row,
								x: i.x,
								y: i.y,
								button: s,
								action: r,
								ctrl: t.ctrlKey,
								alt: t.altKey,
								shift: t.shiftKey
							});
						}
						const s = {
							mouseup: null,
							wheel: null,
							mousedrag: null,
							mousemove: null
						}, n = {
							mouseup: (e) => (i(e), e.buttons || (this._document.removeEventListener("mouseup", s.mouseup), s.mousedrag && this._document.removeEventListener("mousemove", s.mousedrag)), this.cancel(e)),
							wheel: (e) => (i(e), this.cancel(e, !0)),
							mousedrag: (e) => {
								e.buttons && i(e);
							},
							mousemove: (e) => {
								e.buttons || i(e);
							}
						};
						this.register(this.coreMouseService.onProtocolChange(((e) => {
							e ? ("debug" === this.optionsService.rawOptions.logLevel && this._logService.debug("Binding to mouse events:", this.coreMouseService.explainEvents(e)), this.element.classList.add("enable-mouse-events"), this._selectionService.disable()) : (this._logService.debug("Unbinding from mouse events."), this.element.classList.remove("enable-mouse-events"), this._selectionService.enable()), 8 & e ? s.mousemove || (t.addEventListener("mousemove", n.mousemove), s.mousemove = n.mousemove) : (t.removeEventListener("mousemove", s.mousemove), s.mousemove = null), 16 & e ? s.wheel || (t.addEventListener("wheel", n.wheel, { passive: !1 }), s.wheel = n.wheel) : (t.removeEventListener("wheel", s.wheel), s.wheel = null), 2 & e ? s.mouseup || (s.mouseup = n.mouseup) : (this._document.removeEventListener("mouseup", s.mouseup), s.mouseup = null), 4 & e ? s.mousedrag || (s.mousedrag = n.mousedrag) : (this._document.removeEventListener("mousemove", s.mousedrag), s.mousedrag = null);
						}))), this.coreMouseService.activeProtocol = this.coreMouseService.activeProtocol, this.register((0, r.addDisposableDomListener)(t, "mousedown", ((e) => {
							if (e.preventDefault(), this.focus(), this.coreMouseService.areMouseEventsActive && !this._selectionService.shouldForceSelection(e)) return i(e), s.mouseup && this._document.addEventListener("mouseup", s.mouseup), s.mousedrag && this._document.addEventListener("mousemove", s.mousedrag), this.cancel(e);
						}))), this.register((0, r.addDisposableDomListener)(t, "wheel", ((e) => {
							if (!s.wheel) {
								if (this._customWheelEventHandler && !1 === this._customWheelEventHandler(e)) return !1;
								if (!this.buffer.hasScrollback) {
									const t = this.viewport.getLinesScrolled(e);
									if (0 === t) return;
									const i = D.C0.ESC + (this.coreService.decPrivateModes.applicationCursorKeys ? "O" : "[") + (e.deltaY < 0 ? "A" : "B");
									let s = "";
									for (let e = 0; e < Math.abs(t); e++) s += i;
									return this.coreService.triggerDataEvent(s, !0), this.cancel(e, !0);
								}
								return this.viewport.handleWheel(e) ? this.cancel(e) : void 0;
							}
						}), { passive: !1 })), this.register((0, r.addDisposableDomListener)(t, "touchstart", ((e) => {
							if (!this.coreMouseService.areMouseEventsActive) return this.viewport.handleTouchStart(e), this.cancel(e);
						}), { passive: !0 })), this.register((0, r.addDisposableDomListener)(t, "touchmove", ((e) => {
							if (!this.coreMouseService.areMouseEventsActive) return this.viewport.handleTouchMove(e) ? void 0 : this.cancel(e);
						}), { passive: !1 }));
					}
					refresh(e, t) {
						this._renderService?.refreshRows(e, t);
					}
					updateCursorStyle(e) {
						this._selectionService?.shouldColumnSelect(e) ? this.element.classList.add("column-select") : this.element.classList.remove("column-select");
					}
					_showCursor() {
						this.coreService.isCursorInitialized || (this.coreService.isCursorInitialized = !0, this.refresh(this.buffer.y, this.buffer.y));
					}
					scrollLines(e, t, i = 0) {
						1 === i ? (super.scrollLines(e, t, i), this.refresh(0, this.rows - 1)) : this.viewport?.scrollLines(e);
					}
					paste(e) {
						(0, s.paste)(e, this.textarea, this.coreService, this.optionsService);
					}
					attachCustomKeyEventHandler(e) {
						this._customKeyEventHandler = e;
					}
					attachCustomWheelEventHandler(e) {
						this._customWheelEventHandler = e;
					}
					registerLinkProvider(e) {
						return this._linkProviderService.registerLinkProvider(e);
					}
					registerCharacterJoiner(e) {
						if (!this._characterJoinerService) throw new Error("Terminal must be opened first");
						const t = this._characterJoinerService.register(e);
						return this.refresh(0, this.rows - 1), t;
					}
					deregisterCharacterJoiner(e) {
						if (!this._characterJoinerService) throw new Error("Terminal must be opened first");
						this._characterJoinerService.deregister(e) && this.refresh(0, this.rows - 1);
					}
					get markers() {
						return this.buffer.markers;
					}
					registerMarker(e) {
						return this.buffer.addMarker(this.buffer.ybase + this.buffer.y + e);
					}
					registerDecoration(e) {
						return this._decorationService.registerDecoration(e);
					}
					hasSelection() {
						return !!this._selectionService && this._selectionService.hasSelection;
					}
					select(e, t, i) {
						this._selectionService.setSelection(e, t, i);
					}
					getSelection() {
						return this._selectionService ? this._selectionService.selectionText : "";
					}
					getSelectionPosition() {
						if (this._selectionService && this._selectionService.hasSelection) return {
							start: {
								x: this._selectionService.selectionStart[0],
								y: this._selectionService.selectionStart[1]
							},
							end: {
								x: this._selectionService.selectionEnd[0],
								y: this._selectionService.selectionEnd[1]
							}
						};
					}
					clearSelection() {
						this._selectionService?.clearSelection();
					}
					selectAll() {
						this._selectionService?.selectAll();
					}
					selectLines(e, t) {
						this._selectionService?.selectLines(e, t);
					}
					_keyDown(e) {
						if (this._keyDownHandled = !1, this._keyDownSeen = !0, this._customKeyEventHandler && !1 === this._customKeyEventHandler(e)) return !1;
						const t = this.browser.isMac && this.options.macOptionIsMeta && e.altKey;
						if (!t && !this._compositionHelper.keydown(e)) return this.options.scrollOnUserInput && this.buffer.ybase !== this.buffer.ydisp && this.scrollToBottom(), !1;
						t || "Dead" !== e.key && "AltGraph" !== e.key || (this._unprocessedDeadKey = !0);
						const i = (0, R.evaluateKeyboardEvent)(e, this.coreService.decPrivateModes.applicationCursorKeys, this.browser.isMac, this.options.macOptionIsMeta);
						if (this.updateCursorStyle(e), 3 === i.type || 2 === i.type) {
							const t = this.rows - 1;
							return this.scrollLines(2 === i.type ? -t : t), this.cancel(e, !0);
						}
						return 1 === i.type && this.selectAll(), !!this._isThirdLevelShift(this.browser, e) || (i.cancel && this.cancel(e, !0), !i.key || !!(e.key && !e.ctrlKey && !e.altKey && !e.metaKey && 1 === e.key.length && e.key.charCodeAt(0) >= 65 && e.key.charCodeAt(0) <= 90) || (this._unprocessedDeadKey ? (this._unprocessedDeadKey = !1, !0) : (i.key !== D.C0.ETX && i.key !== D.C0.CR || (this.textarea.value = ""), this._onKey.fire({
							key: i.key,
							domEvent: e
						}), this._showCursor(), this.coreService.triggerDataEvent(i.key, !0), !this.optionsService.rawOptions.screenReaderMode || e.altKey || e.ctrlKey ? this.cancel(e, !0) : void (this._keyDownHandled = !0))));
					}
					_isThirdLevelShift(e, t) {
						const i = e.isMac && !this.options.macOptionIsMeta && t.altKey && !t.ctrlKey && !t.metaKey || e.isWindows && t.altKey && t.ctrlKey && !t.metaKey || e.isWindows && t.getModifierState("AltGraph");
						return "keypress" === t.type ? i : i && (!t.keyCode || t.keyCode > 47);
					}
					_keyUp(e) {
						this._keyDownSeen = !1, this._customKeyEventHandler && !1 === this._customKeyEventHandler(e) || (function(e) {
							return 16 === e.keyCode || 17 === e.keyCode || 18 === e.keyCode;
						}(e) || this.focus(), this.updateCursorStyle(e), this._keyPressHandled = !1);
					}
					_keyPress(e) {
						let t;
						if (this._keyPressHandled = !1, this._keyDownHandled) return !1;
						if (this._customKeyEventHandler && !1 === this._customKeyEventHandler(e)) return !1;
						if (this.cancel(e), e.charCode) t = e.charCode;
						else if (null === e.which || void 0 === e.which) t = e.keyCode;
						else {
							if (0 === e.which || 0 === e.charCode) return !1;
							t = e.which;
						}
						return !(!t || (e.altKey || e.ctrlKey || e.metaKey) && !this._isThirdLevelShift(this.browser, e) || (t = String.fromCharCode(t), this._onKey.fire({
							key: t,
							domEvent: e
						}), this._showCursor(), this.coreService.triggerDataEvent(t, !0), this._keyPressHandled = !0, this._unprocessedDeadKey = !1, 0));
					}
					_inputEvent(e) {
						if (e.data && "insertText" === e.inputType && (!e.composed || !this._keyDownSeen) && !this.optionsService.rawOptions.screenReaderMode) {
							if (this._keyPressHandled) return !1;
							this._unprocessedDeadKey = !1;
							const t = e.data;
							return this.coreService.triggerDataEvent(t, !0), this.cancel(e), !0;
						}
						return !1;
					}
					resize(e, t) {
						e !== this.cols || t !== this.rows ? super.resize(e, t) : this._charSizeService && !this._charSizeService.hasValidSize && this._charSizeService.measure();
					}
					_afterResize(e, t) {
						this._charSizeService?.measure(), this.viewport?.syncScrollArea(!0);
					}
					clear() {
						if (0 !== this.buffer.ybase || 0 !== this.buffer.y) {
							this.buffer.clearAllMarkers(), this.buffer.lines.set(0, this.buffer.lines.get(this.buffer.ybase + this.buffer.y)), this.buffer.lines.length = 1, this.buffer.ydisp = 0, this.buffer.ybase = 0, this.buffer.y = 0;
							for (let e = 1; e < this.rows; e++) this.buffer.lines.push(this.buffer.getBlankLine(L.DEFAULT_ATTR_DATA));
							this._onScroll.fire({
								position: this.buffer.ydisp,
								source: 0
							}), this.viewport?.reset(), this.refresh(0, this.rows - 1);
						}
					}
					reset() {
						this.options.rows = this.rows, this.options.cols = this.cols;
						const e = this._customKeyEventHandler;
						this._setup(), super.reset(), this._selectionService?.reset(), this._decorationService.reset(), this.viewport?.reset(), this._customKeyEventHandler = e, this.refresh(0, this.rows - 1);
					}
					clearTextureAtlas() {
						this._renderService?.clearTextureAtlas();
					}
					_reportFocus() {
						this.element?.classList.contains("focus") ? this.coreService.triggerDataEvent(D.C0.ESC + "[I") : this.coreService.triggerDataEvent(D.C0.ESC + "[O");
					}
					_reportWindowsOptions(e) {
						if (this._renderService) switch (e) {
							case T.WindowsOptionsReportType.GET_WIN_SIZE_PIXELS:
								const e = this._renderService.dimensions.css.canvas.width.toFixed(0), t = this._renderService.dimensions.css.canvas.height.toFixed(0);
								this.coreService.triggerDataEvent(`${D.C0.ESC}[4;${t};${e}t`);
								break;
							case T.WindowsOptionsReportType.GET_CELL_SIZE_PIXELS:
								const i = this._renderService.dimensions.css.cell.width.toFixed(0), s = this._renderService.dimensions.css.cell.height.toFixed(0);
								this.coreService.triggerDataEvent(`${D.C0.ESC}[6;${s};${i}t`);
						}
					}
					cancel(e, t) {
						if (this.options.cancelEvents || t) return e.preventDefault(), e.stopPropagation(), !1;
					}
				}
				t.Terminal = P;
			},
			9924: (e, t) => {
				Object.defineProperty(t, "__esModule", { value: !0 }), t.TimeBasedDebouncer = void 0, t.TimeBasedDebouncer = class {
					constructor(e, t = 1e3) {
						this._renderCallback = e, this._debounceThresholdMS = t, this._lastRefreshMs = 0, this._additionalRefreshRequested = !1;
					}
					dispose() {
						this._refreshTimeoutID && clearTimeout(this._refreshTimeoutID);
					}
					refresh(e, t, i) {
						this._rowCount = i, e = void 0 !== e ? e : 0, t = void 0 !== t ? t : this._rowCount - 1, this._rowStart = void 0 !== this._rowStart ? Math.min(this._rowStart, e) : e, this._rowEnd = void 0 !== this._rowEnd ? Math.max(this._rowEnd, t) : t;
						const s = Date.now();
						if (s - this._lastRefreshMs >= this._debounceThresholdMS) this._lastRefreshMs = s, this._innerRefresh();
						else if (!this._additionalRefreshRequested) {
							const e = s - this._lastRefreshMs, t = this._debounceThresholdMS - e;
							this._additionalRefreshRequested = !0, this._refreshTimeoutID = window.setTimeout((() => {
								this._lastRefreshMs = Date.now(), this._innerRefresh(), this._additionalRefreshRequested = !1, this._refreshTimeoutID = void 0;
							}), t);
						}
					}
					_innerRefresh() {
						if (void 0 === this._rowStart || void 0 === this._rowEnd || void 0 === this._rowCount) return;
						const e = Math.max(this._rowStart, 0), t = Math.min(this._rowEnd, this._rowCount - 1);
						this._rowStart = void 0, this._rowEnd = void 0, this._renderCallback(e, t);
					}
				};
			},
			1680: function(e, t, i) {
				var s = this && this.__decorate || function(e, t, i, s) {
					var r, n = arguments.length, o = n < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
					if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, i, s);
					else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (o = (n < 3 ? r(o) : n > 3 ? r(t, i, o) : r(t, i)) || o);
					return n > 3 && o && Object.defineProperty(t, i, o), o;
				}, r = this && this.__param || function(e, t) {
					return function(i, s) {
						t(i, s, e);
					};
				};
				Object.defineProperty(t, "__esModule", { value: !0 }), t.Viewport = void 0;
				const n = i(3656), o = i(4725), a = i(8460), h = i(844), c = i(2585);
				let l = t.Viewport = class extends h.Disposable {
					constructor(e, t, i, s, r, o, h, c) {
						super(), this._viewportElement = e, this._scrollArea = t, this._bufferService = i, this._optionsService = s, this._charSizeService = r, this._renderService = o, this._coreBrowserService = h, this.scrollBarWidth = 0, this._currentRowHeight = 0, this._currentDeviceCellHeight = 0, this._lastRecordedBufferLength = 0, this._lastRecordedViewportHeight = 0, this._lastRecordedBufferHeight = 0, this._lastTouchY = 0, this._lastScrollTop = 0, this._wheelPartialScroll = 0, this._refreshAnimationFrame = null, this._ignoreNextScrollEvent = !1, this._smoothScrollState = {
							startTime: 0,
							origin: -1,
							target: -1
						}, this._onRequestScrollLines = this.register(new a.EventEmitter()), this.onRequestScrollLines = this._onRequestScrollLines.event, this.scrollBarWidth = this._viewportElement.offsetWidth - this._scrollArea.offsetWidth || 15, this.register((0, n.addDisposableDomListener)(this._viewportElement, "scroll", this._handleScroll.bind(this))), this._activeBuffer = this._bufferService.buffer, this.register(this._bufferService.buffers.onBufferActivate(((e) => this._activeBuffer = e.activeBuffer))), this._renderDimensions = this._renderService.dimensions, this.register(this._renderService.onDimensionsChange(((e) => this._renderDimensions = e))), this._handleThemeChange(c.colors), this.register(c.onChangeColors(((e) => this._handleThemeChange(e)))), this.register(this._optionsService.onSpecificOptionChange("scrollback", (() => this.syncScrollArea()))), setTimeout((() => this.syncScrollArea()));
					}
					_handleThemeChange(e) {
						this._viewportElement.style.backgroundColor = e.background.css;
					}
					reset() {
						this._currentRowHeight = 0, this._currentDeviceCellHeight = 0, this._lastRecordedBufferLength = 0, this._lastRecordedViewportHeight = 0, this._lastRecordedBufferHeight = 0, this._lastTouchY = 0, this._lastScrollTop = 0, this._coreBrowserService.window.requestAnimationFrame((() => this.syncScrollArea()));
					}
					_refresh(e) {
						if (e) return this._innerRefresh(), void (null !== this._refreshAnimationFrame && this._coreBrowserService.window.cancelAnimationFrame(this._refreshAnimationFrame));
						null === this._refreshAnimationFrame && (this._refreshAnimationFrame = this._coreBrowserService.window.requestAnimationFrame((() => this._innerRefresh())));
					}
					_innerRefresh() {
						if (this._charSizeService.height > 0) {
							this._currentRowHeight = this._renderDimensions.device.cell.height / this._coreBrowserService.dpr, this._currentDeviceCellHeight = this._renderDimensions.device.cell.height, this._lastRecordedViewportHeight = this._viewportElement.offsetHeight;
							const e = Math.round(this._currentRowHeight * this._lastRecordedBufferLength) + (this._lastRecordedViewportHeight - this._renderDimensions.css.canvas.height);
							this._lastRecordedBufferHeight !== e && (this._lastRecordedBufferHeight = e, this._scrollArea.style.height = this._lastRecordedBufferHeight + "px");
						}
						const e = this._bufferService.buffer.ydisp * this._currentRowHeight;
						this._viewportElement.scrollTop !== e && (this._ignoreNextScrollEvent = !0, this._viewportElement.scrollTop = e), this._refreshAnimationFrame = null;
					}
					syncScrollArea(e = !1) {
						if (this._lastRecordedBufferLength !== this._bufferService.buffer.lines.length) return this._lastRecordedBufferLength = this._bufferService.buffer.lines.length, void this._refresh(e);
						this._lastRecordedViewportHeight === this._renderService.dimensions.css.canvas.height && this._lastScrollTop === this._activeBuffer.ydisp * this._currentRowHeight && this._renderDimensions.device.cell.height === this._currentDeviceCellHeight || this._refresh(e);
					}
					_handleScroll(e) {
						if (this._lastScrollTop = this._viewportElement.scrollTop, !this._viewportElement.offsetParent) return;
						if (this._ignoreNextScrollEvent) return this._ignoreNextScrollEvent = !1, void this._onRequestScrollLines.fire({
							amount: 0,
							suppressScrollEvent: !0
						});
						const t = Math.round(this._lastScrollTop / this._currentRowHeight) - this._bufferService.buffer.ydisp;
						this._onRequestScrollLines.fire({
							amount: t,
							suppressScrollEvent: !0
						});
					}
					_smoothScroll() {
						if (this._isDisposed || -1 === this._smoothScrollState.origin || -1 === this._smoothScrollState.target) return;
						const e = this._smoothScrollPercent();
						this._viewportElement.scrollTop = this._smoothScrollState.origin + Math.round(e * (this._smoothScrollState.target - this._smoothScrollState.origin)), e < 1 ? this._coreBrowserService.window.requestAnimationFrame((() => this._smoothScroll())) : this._clearSmoothScrollState();
					}
					_smoothScrollPercent() {
						return this._optionsService.rawOptions.smoothScrollDuration && this._smoothScrollState.startTime ? Math.max(Math.min((Date.now() - this._smoothScrollState.startTime) / this._optionsService.rawOptions.smoothScrollDuration, 1), 0) : 1;
					}
					_clearSmoothScrollState() {
						this._smoothScrollState.startTime = 0, this._smoothScrollState.origin = -1, this._smoothScrollState.target = -1;
					}
					_bubbleScroll(e, t) {
						const i = this._viewportElement.scrollTop + this._lastRecordedViewportHeight;
						return !(t < 0 && 0 !== this._viewportElement.scrollTop || t > 0 && i < this._lastRecordedBufferHeight) || (e.cancelable && e.preventDefault(), !1);
					}
					handleWheel(e) {
						const t = this._getPixelsScrolled(e);
						return 0 !== t && (this._optionsService.rawOptions.smoothScrollDuration ? (this._smoothScrollState.startTime = Date.now(), this._smoothScrollPercent() < 1 ? (this._smoothScrollState.origin = this._viewportElement.scrollTop, -1 === this._smoothScrollState.target ? this._smoothScrollState.target = this._viewportElement.scrollTop + t : this._smoothScrollState.target += t, this._smoothScrollState.target = Math.max(Math.min(this._smoothScrollState.target, this._viewportElement.scrollHeight), 0), this._smoothScroll()) : this._clearSmoothScrollState()) : this._viewportElement.scrollTop += t, this._bubbleScroll(e, t));
					}
					scrollLines(e) {
						if (0 !== e) if (this._optionsService.rawOptions.smoothScrollDuration) {
							const t = e * this._currentRowHeight;
							this._smoothScrollState.startTime = Date.now(), this._smoothScrollPercent() < 1 ? (this._smoothScrollState.origin = this._viewportElement.scrollTop, this._smoothScrollState.target = this._smoothScrollState.origin + t, this._smoothScrollState.target = Math.max(Math.min(this._smoothScrollState.target, this._viewportElement.scrollHeight), 0), this._smoothScroll()) : this._clearSmoothScrollState();
						} else this._onRequestScrollLines.fire({
							amount: e,
							suppressScrollEvent: !1
						});
					}
					_getPixelsScrolled(e) {
						if (0 === e.deltaY || e.shiftKey) return 0;
						let t = this._applyScrollModifier(e.deltaY, e);
						return e.deltaMode === WheelEvent.DOM_DELTA_LINE ? t *= this._currentRowHeight : e.deltaMode === WheelEvent.DOM_DELTA_PAGE && (t *= this._currentRowHeight * this._bufferService.rows), t;
					}
					getBufferElements(e, t) {
						let i, s = "";
						const r = [], n = t ?? this._bufferService.buffer.lines.length, o = this._bufferService.buffer.lines;
						for (let t = e; t < n; t++) {
							const e = o.get(t);
							if (!e) continue;
							const n = o.get(t + 1)?.isWrapped;
							if (s += e.translateToString(!n), !n || t === o.length - 1) {
								const e = document.createElement("div");
								e.textContent = s, r.push(e), s.length > 0 && (i = e), s = "";
							}
						}
						return {
							bufferElements: r,
							cursorElement: i
						};
					}
					getLinesScrolled(e) {
						if (0 === e.deltaY || e.shiftKey) return 0;
						let t = this._applyScrollModifier(e.deltaY, e);
						return e.deltaMode === WheelEvent.DOM_DELTA_PIXEL ? (t /= this._currentRowHeight + 0, this._wheelPartialScroll += t, t = Math.floor(Math.abs(this._wheelPartialScroll)) * (this._wheelPartialScroll > 0 ? 1 : -1), this._wheelPartialScroll %= 1) : e.deltaMode === WheelEvent.DOM_DELTA_PAGE && (t *= this._bufferService.rows), t;
					}
					_applyScrollModifier(e, t) {
						const i = this._optionsService.rawOptions.fastScrollModifier;
						return "alt" === i && t.altKey || "ctrl" === i && t.ctrlKey || "shift" === i && t.shiftKey ? e * this._optionsService.rawOptions.fastScrollSensitivity * this._optionsService.rawOptions.scrollSensitivity : e * this._optionsService.rawOptions.scrollSensitivity;
					}
					handleTouchStart(e) {
						this._lastTouchY = e.touches[0].pageY;
					}
					handleTouchMove(e) {
						const t = this._lastTouchY - e.touches[0].pageY;
						return this._lastTouchY = e.touches[0].pageY, 0 !== t && (this._viewportElement.scrollTop += t, this._bubbleScroll(e, t));
					}
				};
				t.Viewport = l = s([
					r(2, c.IBufferService),
					r(3, c.IOptionsService),
					r(4, o.ICharSizeService),
					r(5, o.IRenderService),
					r(6, o.ICoreBrowserService),
					r(7, o.IThemeService)
				], l);
			},
			3107: function(e, t, i) {
				var s = this && this.__decorate || function(e, t, i, s) {
					var r, n = arguments.length, o = n < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
					if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, i, s);
					else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (o = (n < 3 ? r(o) : n > 3 ? r(t, i, o) : r(t, i)) || o);
					return n > 3 && o && Object.defineProperty(t, i, o), o;
				}, r = this && this.__param || function(e, t) {
					return function(i, s) {
						t(i, s, e);
					};
				};
				Object.defineProperty(t, "__esModule", { value: !0 }), t.BufferDecorationRenderer = void 0;
				const n = i(4725), o = i(844), a = i(2585);
				let h = t.BufferDecorationRenderer = class extends o.Disposable {
					constructor(e, t, i, s, r) {
						super(), this._screenElement = e, this._bufferService = t, this._coreBrowserService = i, this._decorationService = s, this._renderService = r, this._decorationElements = /* @__PURE__ */ new Map(), this._altBufferIsActive = !1, this._dimensionsChanged = !1, this._container = document.createElement("div"), this._container.classList.add("xterm-decoration-container"), this._screenElement.appendChild(this._container), this.register(this._renderService.onRenderedViewportChange((() => this._doRefreshDecorations()))), this.register(this._renderService.onDimensionsChange((() => {
							this._dimensionsChanged = !0, this._queueRefresh();
						}))), this.register(this._coreBrowserService.onDprChange((() => this._queueRefresh()))), this.register(this._bufferService.buffers.onBufferActivate((() => {
							this._altBufferIsActive = this._bufferService.buffer === this._bufferService.buffers.alt;
						}))), this.register(this._decorationService.onDecorationRegistered((() => this._queueRefresh()))), this.register(this._decorationService.onDecorationRemoved(((e) => this._removeDecoration(e)))), this.register((0, o.toDisposable)((() => {
							this._container.remove(), this._decorationElements.clear();
						})));
					}
					_queueRefresh() {
						void 0 === this._animationFrame && (this._animationFrame = this._renderService.addRefreshCallback((() => {
							this._doRefreshDecorations(), this._animationFrame = void 0;
						})));
					}
					_doRefreshDecorations() {
						for (const e of this._decorationService.decorations) this._renderDecoration(e);
						this._dimensionsChanged = !1;
					}
					_renderDecoration(e) {
						this._refreshStyle(e), this._dimensionsChanged && this._refreshXPosition(e);
					}
					_createElement(e) {
						const t = this._coreBrowserService.mainDocument.createElement("div");
						t.classList.add("xterm-decoration"), t.classList.toggle("xterm-decoration-top-layer", "top" === e?.options?.layer), t.style.width = `${Math.round((e.options.width || 1) * this._renderService.dimensions.css.cell.width)}px`, t.style.height = (e.options.height || 1) * this._renderService.dimensions.css.cell.height + "px", t.style.top = (e.marker.line - this._bufferService.buffers.active.ydisp) * this._renderService.dimensions.css.cell.height + "px", t.style.lineHeight = `${this._renderService.dimensions.css.cell.height}px`;
						const i = e.options.x ?? 0;
						return i && i > this._bufferService.cols && (t.style.display = "none"), this._refreshXPosition(e, t), t;
					}
					_refreshStyle(e) {
						const t = e.marker.line - this._bufferService.buffers.active.ydisp;
						if (t < 0 || t >= this._bufferService.rows) e.element && (e.element.style.display = "none", e.onRenderEmitter.fire(e.element));
						else {
							let i = this._decorationElements.get(e);
							i || (i = this._createElement(e), e.element = i, this._decorationElements.set(e, i), this._container.appendChild(i), e.onDispose((() => {
								this._decorationElements.delete(e), i.remove();
							}))), i.style.top = t * this._renderService.dimensions.css.cell.height + "px", i.style.display = this._altBufferIsActive ? "none" : "block", e.onRenderEmitter.fire(i);
						}
					}
					_refreshXPosition(e, t = e.element) {
						if (!t) return;
						const i = e.options.x ?? 0;
						"right" === (e.options.anchor || "left") ? t.style.right = i ? i * this._renderService.dimensions.css.cell.width + "px" : "" : t.style.left = i ? i * this._renderService.dimensions.css.cell.width + "px" : "";
					}
					_removeDecoration(e) {
						this._decorationElements.get(e)?.remove(), this._decorationElements.delete(e), e.dispose();
					}
				};
				t.BufferDecorationRenderer = h = s([
					r(1, a.IBufferService),
					r(2, n.ICoreBrowserService),
					r(3, a.IDecorationService),
					r(4, n.IRenderService)
				], h);
			},
			5871: (e, t) => {
				Object.defineProperty(t, "__esModule", { value: !0 }), t.ColorZoneStore = void 0, t.ColorZoneStore = class {
					constructor() {
						this._zones = [], this._zonePool = [], this._zonePoolIndex = 0, this._linePadding = {
							full: 0,
							left: 0,
							center: 0,
							right: 0
						};
					}
					get zones() {
						return this._zonePool.length = Math.min(this._zonePool.length, this._zones.length), this._zones;
					}
					clear() {
						this._zones.length = 0, this._zonePoolIndex = 0;
					}
					addDecoration(e) {
						if (e.options.overviewRulerOptions) {
							for (const t of this._zones) if (t.color === e.options.overviewRulerOptions.color && t.position === e.options.overviewRulerOptions.position) {
								if (this._lineIntersectsZone(t, e.marker.line)) return;
								if (this._lineAdjacentToZone(t, e.marker.line, e.options.overviewRulerOptions.position)) return void this._addLineToZone(t, e.marker.line);
							}
							if (this._zonePoolIndex < this._zonePool.length) return this._zonePool[this._zonePoolIndex].color = e.options.overviewRulerOptions.color, this._zonePool[this._zonePoolIndex].position = e.options.overviewRulerOptions.position, this._zonePool[this._zonePoolIndex].startBufferLine = e.marker.line, this._zonePool[this._zonePoolIndex].endBufferLine = e.marker.line, void this._zones.push(this._zonePool[this._zonePoolIndex++]);
							this._zones.push({
								color: e.options.overviewRulerOptions.color,
								position: e.options.overviewRulerOptions.position,
								startBufferLine: e.marker.line,
								endBufferLine: e.marker.line
							}), this._zonePool.push(this._zones[this._zones.length - 1]), this._zonePoolIndex++;
						}
					}
					setPadding(e) {
						this._linePadding = e;
					}
					_lineIntersectsZone(e, t) {
						return t >= e.startBufferLine && t <= e.endBufferLine;
					}
					_lineAdjacentToZone(e, t, i) {
						return t >= e.startBufferLine - this._linePadding[i || "full"] && t <= e.endBufferLine + this._linePadding[i || "full"];
					}
					_addLineToZone(e, t) {
						e.startBufferLine = Math.min(e.startBufferLine, t), e.endBufferLine = Math.max(e.endBufferLine, t);
					}
				};
			},
			5744: function(e, t, i) {
				var s = this && this.__decorate || function(e, t, i, s) {
					var r, n = arguments.length, o = n < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
					if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, i, s);
					else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (o = (n < 3 ? r(o) : n > 3 ? r(t, i, o) : r(t, i)) || o);
					return n > 3 && o && Object.defineProperty(t, i, o), o;
				}, r = this && this.__param || function(e, t) {
					return function(i, s) {
						t(i, s, e);
					};
				};
				Object.defineProperty(t, "__esModule", { value: !0 }), t.OverviewRulerRenderer = void 0;
				const n = i(5871), o = i(4725), a = i(844), h = i(2585), c = {
					full: 0,
					left: 0,
					center: 0,
					right: 0
				}, l = {
					full: 0,
					left: 0,
					center: 0,
					right: 0
				}, d = {
					full: 0,
					left: 0,
					center: 0,
					right: 0
				};
				let _ = t.OverviewRulerRenderer = class extends a.Disposable {
					get _width() {
						return this._optionsService.options.overviewRulerWidth || 0;
					}
					constructor(e, t, i, s, r, o, h) {
						super(), this._viewportElement = e, this._screenElement = t, this._bufferService = i, this._decorationService = s, this._renderService = r, this._optionsService = o, this._coreBrowserService = h, this._colorZoneStore = new n.ColorZoneStore(), this._shouldUpdateDimensions = !0, this._shouldUpdateAnchor = !0, this._lastKnownBufferLength = 0, this._canvas = this._coreBrowserService.mainDocument.createElement("canvas"), this._canvas.classList.add("xterm-decoration-overview-ruler"), this._refreshCanvasDimensions(), this._viewportElement.parentElement?.insertBefore(this._canvas, this._viewportElement);
						const c = this._canvas.getContext("2d");
						if (!c) throw new Error("Ctx cannot be null");
						this._ctx = c, this._registerDecorationListeners(), this._registerBufferChangeListeners(), this._registerDimensionChangeListeners(), this.register((0, a.toDisposable)((() => {
							this._canvas?.remove();
						})));
					}
					_registerDecorationListeners() {
						this.register(this._decorationService.onDecorationRegistered((() => this._queueRefresh(void 0, !0)))), this.register(this._decorationService.onDecorationRemoved((() => this._queueRefresh(void 0, !0))));
					}
					_registerBufferChangeListeners() {
						this.register(this._renderService.onRenderedViewportChange((() => this._queueRefresh()))), this.register(this._bufferService.buffers.onBufferActivate((() => {
							this._canvas.style.display = this._bufferService.buffer === this._bufferService.buffers.alt ? "none" : "block";
						}))), this.register(this._bufferService.onScroll((() => {
							this._lastKnownBufferLength !== this._bufferService.buffers.normal.lines.length && (this._refreshDrawHeightConstants(), this._refreshColorZonePadding());
						})));
					}
					_registerDimensionChangeListeners() {
						this.register(this._renderService.onRender((() => {
							this._containerHeight && this._containerHeight === this._screenElement.clientHeight || (this._queueRefresh(!0), this._containerHeight = this._screenElement.clientHeight);
						}))), this.register(this._optionsService.onSpecificOptionChange("overviewRulerWidth", (() => this._queueRefresh(!0)))), this.register(this._coreBrowserService.onDprChange((() => this._queueRefresh(!0)))), this._queueRefresh(!0);
					}
					_refreshDrawConstants() {
						const e = Math.floor(this._canvas.width / 3), t = Math.ceil(this._canvas.width / 3);
						l.full = this._canvas.width, l.left = e, l.center = t, l.right = e, this._refreshDrawHeightConstants(), d.full = 0, d.left = 0, d.center = l.left, d.right = l.left + l.center;
					}
					_refreshDrawHeightConstants() {
						c.full = Math.round(2 * this._coreBrowserService.dpr);
						const e = this._canvas.height / this._bufferService.buffer.lines.length, t = Math.round(Math.max(Math.min(e, 12), 6) * this._coreBrowserService.dpr);
						c.left = t, c.center = t, c.right = t;
					}
					_refreshColorZonePadding() {
						this._colorZoneStore.setPadding({
							full: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * c.full),
							left: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * c.left),
							center: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * c.center),
							right: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * c.right)
						}), this._lastKnownBufferLength = this._bufferService.buffers.normal.lines.length;
					}
					_refreshCanvasDimensions() {
						this._canvas.style.width = `${this._width}px`, this._canvas.width = Math.round(this._width * this._coreBrowserService.dpr), this._canvas.style.height = `${this._screenElement.clientHeight}px`, this._canvas.height = Math.round(this._screenElement.clientHeight * this._coreBrowserService.dpr), this._refreshDrawConstants(), this._refreshColorZonePadding();
					}
					_refreshDecorations() {
						this._shouldUpdateDimensions && this._refreshCanvasDimensions(), this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height), this._colorZoneStore.clear();
						for (const e of this._decorationService.decorations) this._colorZoneStore.addDecoration(e);
						this._ctx.lineWidth = 1;
						const e = this._colorZoneStore.zones;
						for (const t of e) "full" !== t.position && this._renderColorZone(t);
						for (const t of e) "full" === t.position && this._renderColorZone(t);
						this._shouldUpdateDimensions = !1, this._shouldUpdateAnchor = !1;
					}
					_renderColorZone(e) {
						this._ctx.fillStyle = e.color, this._ctx.fillRect(d[e.position || "full"], Math.round((this._canvas.height - 1) * (e.startBufferLine / this._bufferService.buffers.active.lines.length) - c[e.position || "full"] / 2), l[e.position || "full"], Math.round((this._canvas.height - 1) * ((e.endBufferLine - e.startBufferLine) / this._bufferService.buffers.active.lines.length) + c[e.position || "full"]));
					}
					_queueRefresh(e, t) {
						this._shouldUpdateDimensions = e || this._shouldUpdateDimensions, this._shouldUpdateAnchor = t || this._shouldUpdateAnchor, void 0 === this._animationFrame && (this._animationFrame = this._coreBrowserService.window.requestAnimationFrame((() => {
							this._refreshDecorations(), this._animationFrame = void 0;
						})));
					}
				};
				t.OverviewRulerRenderer = _ = s([
					r(2, h.IBufferService),
					r(3, h.IDecorationService),
					r(4, o.IRenderService),
					r(5, h.IOptionsService),
					r(6, o.ICoreBrowserService)
				], _);
			},
			2950: function(e, t, i) {
				var s = this && this.__decorate || function(e, t, i, s) {
					var r, n = arguments.length, o = n < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
					if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, i, s);
					else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (o = (n < 3 ? r(o) : n > 3 ? r(t, i, o) : r(t, i)) || o);
					return n > 3 && o && Object.defineProperty(t, i, o), o;
				}, r = this && this.__param || function(e, t) {
					return function(i, s) {
						t(i, s, e);
					};
				};
				Object.defineProperty(t, "__esModule", { value: !0 }), t.CompositionHelper = void 0;
				const n = i(4725), o = i(2585), a = i(2584);
				let h = t.CompositionHelper = class {
					get isComposing() {
						return this._isComposing;
					}
					constructor(e, t, i, s, r, n) {
						this._textarea = e, this._compositionView = t, this._bufferService = i, this._optionsService = s, this._coreService = r, this._renderService = n, this._isComposing = !1, this._isSendingComposition = !1, this._compositionPosition = {
							start: 0,
							end: 0
						}, this._dataAlreadySent = "";
					}
					compositionstart() {
						this._isComposing = !0, this._compositionPosition.start = this._textarea.value.length, this._compositionView.textContent = "", this._dataAlreadySent = "", this._compositionView.classList.add("active");
					}
					compositionupdate(e) {
						this._compositionView.textContent = e.data, this.updateCompositionElements(), setTimeout((() => {
							this._compositionPosition.end = this._textarea.value.length;
						}), 0);
					}
					compositionend() {
						this._finalizeComposition(!0);
					}
					keydown(e) {
						if (this._isComposing || this._isSendingComposition) {
							if (229 === e.keyCode) return !1;
							if (16 === e.keyCode || 17 === e.keyCode || 18 === e.keyCode) return !1;
							this._finalizeComposition(!1);
						}
						return 229 !== e.keyCode || (this._handleAnyTextareaChanges(), !1);
					}
					_finalizeComposition(e) {
						if (this._compositionView.classList.remove("active"), this._isComposing = !1, e) {
							const e = {
								start: this._compositionPosition.start,
								end: this._compositionPosition.end
							};
							this._isSendingComposition = !0, setTimeout((() => {
								if (this._isSendingComposition) {
									let t;
									this._isSendingComposition = !1, e.start += this._dataAlreadySent.length, t = this._isComposing ? this._textarea.value.substring(e.start, e.end) : this._textarea.value.substring(e.start), t.length > 0 && this._coreService.triggerDataEvent(t, !0);
								}
							}), 0);
						} else {
							this._isSendingComposition = !1;
							const e = this._textarea.value.substring(this._compositionPosition.start, this._compositionPosition.end);
							this._coreService.triggerDataEvent(e, !0);
						}
					}
					_handleAnyTextareaChanges() {
						const e = this._textarea.value;
						setTimeout((() => {
							if (!this._isComposing) {
								const t = this._textarea.value, i = t.replace(e, "");
								this._dataAlreadySent = i, t.length > e.length ? this._coreService.triggerDataEvent(i, !0) : t.length < e.length ? this._coreService.triggerDataEvent(`${a.C0.DEL}`, !0) : t.length === e.length && t !== e && this._coreService.triggerDataEvent(t, !0);
							}
						}), 0);
					}
					updateCompositionElements(e) {
						if (this._isComposing) {
							if (this._bufferService.buffer.isCursorInViewport) {
								const e = Math.min(this._bufferService.buffer.x, this._bufferService.cols - 1), t = this._renderService.dimensions.css.cell.height, i = this._bufferService.buffer.y * this._renderService.dimensions.css.cell.height, s = e * this._renderService.dimensions.css.cell.width;
								this._compositionView.style.left = s + "px", this._compositionView.style.top = i + "px", this._compositionView.style.height = t + "px", this._compositionView.style.lineHeight = t + "px", this._compositionView.style.fontFamily = this._optionsService.rawOptions.fontFamily, this._compositionView.style.fontSize = this._optionsService.rawOptions.fontSize + "px";
								const r = this._compositionView.getBoundingClientRect();
								this._textarea.style.left = s + "px", this._textarea.style.top = i + "px", this._textarea.style.width = Math.max(r.width, 1) + "px", this._textarea.style.height = Math.max(r.height, 1) + "px", this._textarea.style.lineHeight = r.height + "px";
							}
							e || setTimeout((() => this.updateCompositionElements(!0)), 0);
						}
					}
				};
				t.CompositionHelper = h = s([
					r(2, o.IBufferService),
					r(3, o.IOptionsService),
					r(4, o.ICoreService),
					r(5, n.IRenderService)
				], h);
			},
			9806: (e, t) => {
				function i(e, t, i) {
					const s = i.getBoundingClientRect(), r = e.getComputedStyle(i), n = parseInt(r.getPropertyValue("padding-left")), o = parseInt(r.getPropertyValue("padding-top"));
					return [t.clientX - s.left - n, t.clientY - s.top - o];
				}
				Object.defineProperty(t, "__esModule", { value: !0 }), t.getCoords = t.getCoordsRelativeToElement = void 0, t.getCoordsRelativeToElement = i, t.getCoords = function(e, t, s, r, n, o, a, h, c) {
					if (!o) return;
					const l = i(e, t, s);
					return l ? (l[0] = Math.ceil((l[0] + (c ? a / 2 : 0)) / a), l[1] = Math.ceil(l[1] / h), l[0] = Math.min(Math.max(l[0], 1), r + (c ? 1 : 0)), l[1] = Math.min(Math.max(l[1], 1), n), l) : void 0;
				};
			},
			9504: (e, t, i) => {
				Object.defineProperty(t, "__esModule", { value: !0 }), t.moveToCellSequence = void 0;
				const s = i(2584);
				function r(e, t, i, s) {
					const r = e - n(e, i), a = t - n(t, i);
					return c(Math.abs(r - a) - function(e, t, i) {
						let s = 0;
						const r = e - n(e, i), a = t - n(t, i);
						for (let n = 0; n < Math.abs(r - a); n++) {
							const a = "A" === o(e, t) ? -1 : 1;
							i.buffer.lines.get(r + a * n)?.isWrapped && s++;
						}
						return s;
					}(e, t, i), h(o(e, t), s));
				}
				function n(e, t) {
					let i = 0, s = t.buffer.lines.get(e), r = s?.isWrapped;
					for (; r && e >= 0 && e < t.rows;) i++, s = t.buffer.lines.get(--e), r = s?.isWrapped;
					return i;
				}
				function o(e, t) {
					return e > t ? "A" : "B";
				}
				function a(e, t, i, s, r, n) {
					let o = e, a = t, h = "";
					for (; o !== i || a !== s;) o += r ? 1 : -1, r && o > n.cols - 1 ? (h += n.buffer.translateBufferLineToString(a, !1, e, o), o = 0, e = 0, a++) : !r && o < 0 && (h += n.buffer.translateBufferLineToString(a, !1, 0, e + 1), o = n.cols - 1, e = o, a--);
					return h + n.buffer.translateBufferLineToString(a, !1, e, o);
				}
				function h(e, t) {
					const i = t ? "O" : "[";
					return s.C0.ESC + i + e;
				}
				function c(e, t) {
					e = Math.floor(e);
					let i = "";
					for (let s = 0; s < e; s++) i += t;
					return i;
				}
				t.moveToCellSequence = function(e, t, i, s) {
					const o = i.buffer.x, l = i.buffer.y;
					if (!i.buffer.hasScrollback) return function(e, t, i, s, o, l) {
						return 0 === r(t, s, o, l).length ? "" : c(a(e, t, e, t - n(t, o), !1, o).length, h("D", l));
					}(o, l, 0, t, i, s) + r(l, t, i, s) + function(e, t, i, s, o, l) {
						let d;
						d = r(t, s, o, l).length > 0 ? s - n(s, o) : t;
						const _ = s, u = function(e, t, i, s, o, a) {
							let h;
							return h = r(i, s, o, a).length > 0 ? s - n(s, o) : t, e < i && h <= s || e >= i && h < s ? "C" : "D";
						}(e, t, i, s, o, l);
						return c(a(e, d, i, _, "C" === u, o).length, h(u, l));
					}(o, l, e, t, i, s);
					let d;
					if (l === t) return d = o > e ? "D" : "C", c(Math.abs(o - e), h(d, s));
					d = l > t ? "D" : "C";
					const _ = Math.abs(l - t);
					return c(function(e, t) {
						return t.cols - e;
					}(l > t ? e : o, i) + (_ - 1) * i.cols + 1 + ((l > t ? o : e) - 1), h(d, s));
				};
			},
			1296: function(e, t, i) {
				var s = this && this.__decorate || function(e, t, i, s) {
					var r, n = arguments.length, o = n < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
					if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, i, s);
					else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (o = (n < 3 ? r(o) : n > 3 ? r(t, i, o) : r(t, i)) || o);
					return n > 3 && o && Object.defineProperty(t, i, o), o;
				}, r = this && this.__param || function(e, t) {
					return function(i, s) {
						t(i, s, e);
					};
				};
				Object.defineProperty(t, "__esModule", { value: !0 }), t.DomRenderer = void 0;
				const n = i(3787), o = i(2550), a = i(2223), h = i(6171), c = i(6052), l = i(4725), d = i(8055), _ = i(8460), u = i(844), f = i(2585), v = "xterm-dom-renderer-owner-", p = "xterm-rows", g = "xterm-fg-", m = "xterm-bg-", S = "xterm-focus", C = "xterm-selection";
				let b = 1, w = t.DomRenderer = class extends u.Disposable {
					constructor(e, t, i, s, r, a, l, d, f, g, m, S, w) {
						super(), this._terminal = e, this._document = t, this._element = i, this._screenElement = s, this._viewportElement = r, this._helperContainer = a, this._linkifier2 = l, this._charSizeService = f, this._optionsService = g, this._bufferService = m, this._coreBrowserService = S, this._themeService = w, this._terminalClass = b++, this._rowElements = [], this._selectionRenderModel = (0, c.createSelectionRenderModel)(), this.onRequestRedraw = this.register(new _.EventEmitter()).event, this._rowContainer = this._document.createElement("div"), this._rowContainer.classList.add(p), this._rowContainer.style.lineHeight = "normal", this._rowContainer.setAttribute("aria-hidden", "true"), this._refreshRowElements(this._bufferService.cols, this._bufferService.rows), this._selectionContainer = this._document.createElement("div"), this._selectionContainer.classList.add(C), this._selectionContainer.setAttribute("aria-hidden", "true"), this.dimensions = (0, h.createRenderDimensions)(), this._updateDimensions(), this.register(this._optionsService.onOptionChange((() => this._handleOptionsChanged()))), this.register(this._themeService.onChangeColors(((e) => this._injectCss(e)))), this._injectCss(this._themeService.colors), this._rowFactory = d.createInstance(n.DomRendererRowFactory, document), this._element.classList.add(v + this._terminalClass), this._screenElement.appendChild(this._rowContainer), this._screenElement.appendChild(this._selectionContainer), this.register(this._linkifier2.onShowLinkUnderline(((e) => this._handleLinkHover(e)))), this.register(this._linkifier2.onHideLinkUnderline(((e) => this._handleLinkLeave(e)))), this.register((0, u.toDisposable)((() => {
							this._element.classList.remove(v + this._terminalClass), this._rowContainer.remove(), this._selectionContainer.remove(), this._widthCache.dispose(), this._themeStyleElement.remove(), this._dimensionsStyleElement.remove();
						}))), this._widthCache = new o.WidthCache(this._document, this._helperContainer), this._widthCache.setFont(this._optionsService.rawOptions.fontFamily, this._optionsService.rawOptions.fontSize, this._optionsService.rawOptions.fontWeight, this._optionsService.rawOptions.fontWeightBold), this._setDefaultSpacing();
					}
					_updateDimensions() {
						const e = this._coreBrowserService.dpr;
						this.dimensions.device.char.width = this._charSizeService.width * e, this.dimensions.device.char.height = Math.ceil(this._charSizeService.height * e), this.dimensions.device.cell.width = this.dimensions.device.char.width + Math.round(this._optionsService.rawOptions.letterSpacing), this.dimensions.device.cell.height = Math.floor(this.dimensions.device.char.height * this._optionsService.rawOptions.lineHeight), this.dimensions.device.char.left = 0, this.dimensions.device.char.top = 0, this.dimensions.device.canvas.width = this.dimensions.device.cell.width * this._bufferService.cols, this.dimensions.device.canvas.height = this.dimensions.device.cell.height * this._bufferService.rows, this.dimensions.css.canvas.width = Math.round(this.dimensions.device.canvas.width / e), this.dimensions.css.canvas.height = Math.round(this.dimensions.device.canvas.height / e), this.dimensions.css.cell.width = this.dimensions.css.canvas.width / this._bufferService.cols, this.dimensions.css.cell.height = this.dimensions.css.canvas.height / this._bufferService.rows;
						for (const e of this._rowElements) e.style.width = `${this.dimensions.css.canvas.width}px`, e.style.height = `${this.dimensions.css.cell.height}px`, e.style.lineHeight = `${this.dimensions.css.cell.height}px`, e.style.overflow = "hidden";
						this._dimensionsStyleElement || (this._dimensionsStyleElement = this._document.createElement("style"), this._screenElement.appendChild(this._dimensionsStyleElement));
						const t = `${this._terminalSelector} .${p} span { display: inline-block; height: 100%; vertical-align: top;}`;
						this._dimensionsStyleElement.textContent = t, this._selectionContainer.style.height = this._viewportElement.style.height, this._screenElement.style.width = `${this.dimensions.css.canvas.width}px`, this._screenElement.style.height = `${this.dimensions.css.canvas.height}px`;
					}
					_injectCss(e) {
						this._themeStyleElement || (this._themeStyleElement = this._document.createElement("style"), this._screenElement.appendChild(this._themeStyleElement));
						let t = `${this._terminalSelector} .${p} { color: ${e.foreground.css}; font-family: ${this._optionsService.rawOptions.fontFamily}; font-size: ${this._optionsService.rawOptions.fontSize}px; font-kerning: none; white-space: pre}`;
						t += `${this._terminalSelector} .${p} .xterm-dim { color: ${d.color.multiplyOpacity(e.foreground, .5).css};}`, t += `${this._terminalSelector} span:not(.xterm-bold) { font-weight: ${this._optionsService.rawOptions.fontWeight};}${this._terminalSelector} span.xterm-bold { font-weight: ${this._optionsService.rawOptions.fontWeightBold};}${this._terminalSelector} span.xterm-italic { font-style: italic;}`;
						const i = `blink_underline_${this._terminalClass}`, s = `blink_bar_${this._terminalClass}`, r = `blink_block_${this._terminalClass}`;
						t += `@keyframes ${i} { 50% {  border-bottom-style: hidden; }}`, t += `@keyframes ${s} { 50% {  box-shadow: none; }}`, t += `@keyframes ${r} { 0% {  background-color: ${e.cursor.css};  color: ${e.cursorAccent.css}; } 50% {  background-color: inherit;  color: ${e.cursor.css}; }}`, t += `${this._terminalSelector} .${p}.${S} .xterm-cursor.xterm-cursor-blink.xterm-cursor-underline { animation: ${i} 1s step-end infinite;}${this._terminalSelector} .${p}.${S} .xterm-cursor.xterm-cursor-blink.xterm-cursor-bar { animation: ${s} 1s step-end infinite;}${this._terminalSelector} .${p}.${S} .xterm-cursor.xterm-cursor-blink.xterm-cursor-block { animation: ${r} 1s step-end infinite;}${this._terminalSelector} .${p} .xterm-cursor.xterm-cursor-block { background-color: ${e.cursor.css}; color: ${e.cursorAccent.css};}${this._terminalSelector} .${p} .xterm-cursor.xterm-cursor-block:not(.xterm-cursor-blink) { background-color: ${e.cursor.css} !important; color: ${e.cursorAccent.css} !important;}${this._terminalSelector} .${p} .xterm-cursor.xterm-cursor-outline { outline: 1px solid ${e.cursor.css}; outline-offset: -1px;}${this._terminalSelector} .${p} .xterm-cursor.xterm-cursor-bar { box-shadow: ${this._optionsService.rawOptions.cursorWidth}px 0 0 ${e.cursor.css} inset;}${this._terminalSelector} .${p} .xterm-cursor.xterm-cursor-underline { border-bottom: 1px ${e.cursor.css}; border-bottom-style: solid; height: calc(100% - 1px);}`, t += `${this._terminalSelector} .${C} { position: absolute; top: 0; left: 0; z-index: 1; pointer-events: none;}${this._terminalSelector}.focus .${C} div { position: absolute; background-color: ${e.selectionBackgroundOpaque.css};}${this._terminalSelector} .${C} div { position: absolute; background-color: ${e.selectionInactiveBackgroundOpaque.css};}`;
						for (const [i, s] of e.ansi.entries()) t += `${this._terminalSelector} .${g}${i} { color: ${s.css}; }${this._terminalSelector} .${g}${i}.xterm-dim { color: ${d.color.multiplyOpacity(s, .5).css}; }${this._terminalSelector} .${m}${i} { background-color: ${s.css}; }`;
						t += `${this._terminalSelector} .${g}${a.INVERTED_DEFAULT_COLOR} { color: ${d.color.opaque(e.background).css}; }${this._terminalSelector} .${g}${a.INVERTED_DEFAULT_COLOR}.xterm-dim { color: ${d.color.multiplyOpacity(d.color.opaque(e.background), .5).css}; }${this._terminalSelector} .${m}${a.INVERTED_DEFAULT_COLOR} { background-color: ${e.foreground.css}; }`, this._themeStyleElement.textContent = t;
					}
					_setDefaultSpacing() {
						const e = this.dimensions.css.cell.width - this._widthCache.get("W", !1, !1);
						this._rowContainer.style.letterSpacing = `${e}px`, this._rowFactory.defaultSpacing = e;
					}
					handleDevicePixelRatioChange() {
						this._updateDimensions(), this._widthCache.clear(), this._setDefaultSpacing();
					}
					_refreshRowElements(e, t) {
						for (let e = this._rowElements.length; e <= t; e++) {
							const e = this._document.createElement("div");
							this._rowContainer.appendChild(e), this._rowElements.push(e);
						}
						for (; this._rowElements.length > t;) this._rowContainer.removeChild(this._rowElements.pop());
					}
					handleResize(e, t) {
						this._refreshRowElements(e, t), this._updateDimensions(), this.handleSelectionChanged(this._selectionRenderModel.selectionStart, this._selectionRenderModel.selectionEnd, this._selectionRenderModel.columnSelectMode);
					}
					handleCharSizeChanged() {
						this._updateDimensions(), this._widthCache.clear(), this._setDefaultSpacing();
					}
					handleBlur() {
						this._rowContainer.classList.remove(S), this.renderRows(0, this._bufferService.rows - 1);
					}
					handleFocus() {
						this._rowContainer.classList.add(S), this.renderRows(this._bufferService.buffer.y, this._bufferService.buffer.y);
					}
					handleSelectionChanged(e, t, i) {
						if (this._selectionContainer.replaceChildren(), this._rowFactory.handleSelectionChanged(e, t, i), this.renderRows(0, this._bufferService.rows - 1), !e || !t) return;
						this._selectionRenderModel.update(this._terminal, e, t, i);
						const s = this._selectionRenderModel.viewportStartRow, r = this._selectionRenderModel.viewportEndRow, n = this._selectionRenderModel.viewportCappedStartRow, o = this._selectionRenderModel.viewportCappedEndRow;
						if (n >= this._bufferService.rows || o < 0) return;
						const a = this._document.createDocumentFragment();
						if (i) {
							const i = e[0] > t[0];
							a.appendChild(this._createSelectionElement(n, i ? t[0] : e[0], i ? e[0] : t[0], o - n + 1));
						} else {
							const i = s === n ? e[0] : 0, h = n === r ? t[0] : this._bufferService.cols;
							a.appendChild(this._createSelectionElement(n, i, h));
							const c = o - n - 1;
							if (a.appendChild(this._createSelectionElement(n + 1, 0, this._bufferService.cols, c)), n !== o) {
								const e = r === o ? t[0] : this._bufferService.cols;
								a.appendChild(this._createSelectionElement(o, 0, e));
							}
						}
						this._selectionContainer.appendChild(a);
					}
					_createSelectionElement(e, t, i, s = 1) {
						const r = this._document.createElement("div"), n = t * this.dimensions.css.cell.width;
						let o = this.dimensions.css.cell.width * (i - t);
						return n + o > this.dimensions.css.canvas.width && (o = this.dimensions.css.canvas.width - n), r.style.height = s * this.dimensions.css.cell.height + "px", r.style.top = e * this.dimensions.css.cell.height + "px", r.style.left = `${n}px`, r.style.width = `${o}px`, r;
					}
					handleCursorMove() {}
					_handleOptionsChanged() {
						this._updateDimensions(), this._injectCss(this._themeService.colors), this._widthCache.setFont(this._optionsService.rawOptions.fontFamily, this._optionsService.rawOptions.fontSize, this._optionsService.rawOptions.fontWeight, this._optionsService.rawOptions.fontWeightBold), this._setDefaultSpacing();
					}
					clear() {
						for (const e of this._rowElements) e.replaceChildren();
					}
					renderRows(e, t) {
						const i = this._bufferService.buffer, s = i.ybase + i.y, r = Math.min(i.x, this._bufferService.cols - 1), n = this._optionsService.rawOptions.cursorBlink, o = this._optionsService.rawOptions.cursorStyle, a = this._optionsService.rawOptions.cursorInactiveStyle;
						for (let h = e; h <= t; h++) {
							const e = h + i.ydisp, t = this._rowElements[h], c = i.lines.get(e);
							if (!t || !c) break;
							t.replaceChildren(...this._rowFactory.createRow(c, e, e === s, o, a, r, n, this.dimensions.css.cell.width, this._widthCache, -1, -1));
						}
					}
					get _terminalSelector() {
						return `.${v}${this._terminalClass}`;
					}
					_handleLinkHover(e) {
						this._setCellUnderline(e.x1, e.x2, e.y1, e.y2, e.cols, !0);
					}
					_handleLinkLeave(e) {
						this._setCellUnderline(e.x1, e.x2, e.y1, e.y2, e.cols, !1);
					}
					_setCellUnderline(e, t, i, s, r, n) {
						i < 0 && (e = 0), s < 0 && (t = 0);
						const o = this._bufferService.rows - 1;
						i = Math.max(Math.min(i, o), 0), s = Math.max(Math.min(s, o), 0), r = Math.min(r, this._bufferService.cols);
						const a = this._bufferService.buffer, h = a.ybase + a.y, c = Math.min(a.x, r - 1), l = this._optionsService.rawOptions.cursorBlink, d = this._optionsService.rawOptions.cursorStyle, _ = this._optionsService.rawOptions.cursorInactiveStyle;
						for (let o = i; o <= s; ++o) {
							const u = o + a.ydisp, f = this._rowElements[o], v = a.lines.get(u);
							if (!f || !v) break;
							f.replaceChildren(...this._rowFactory.createRow(v, u, u === h, d, _, c, l, this.dimensions.css.cell.width, this._widthCache, n ? o === i ? e : 0 : -1, n ? (o === s ? t : r) - 1 : -1));
						}
					}
				};
				t.DomRenderer = w = s([
					r(7, f.IInstantiationService),
					r(8, l.ICharSizeService),
					r(9, f.IOptionsService),
					r(10, f.IBufferService),
					r(11, l.ICoreBrowserService),
					r(12, l.IThemeService)
				], w);
			},
			3787: function(e, t, i) {
				var s = this && this.__decorate || function(e, t, i, s) {
					var r, n = arguments.length, o = n < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
					if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, i, s);
					else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (o = (n < 3 ? r(o) : n > 3 ? r(t, i, o) : r(t, i)) || o);
					return n > 3 && o && Object.defineProperty(t, i, o), o;
				}, r = this && this.__param || function(e, t) {
					return function(i, s) {
						t(i, s, e);
					};
				};
				Object.defineProperty(t, "__esModule", { value: !0 }), t.DomRendererRowFactory = void 0;
				const n = i(2223), o = i(643), a = i(511), h = i(2585), c = i(8055), l = i(4725), d = i(4269), _ = i(6171), u = i(3734);
				let f = t.DomRendererRowFactory = class {
					constructor(e, t, i, s, r, n, o) {
						this._document = e, this._characterJoinerService = t, this._optionsService = i, this._coreBrowserService = s, this._coreService = r, this._decorationService = n, this._themeService = o, this._workCell = new a.CellData(), this._columnSelectMode = !1, this.defaultSpacing = 0;
					}
					handleSelectionChanged(e, t, i) {
						this._selectionStart = e, this._selectionEnd = t, this._columnSelectMode = i;
					}
					createRow(e, t, i, s, r, a, h, l, _, f, p) {
						const g = [], m = this._characterJoinerService.getJoinedCharacters(t), S = this._themeService.colors;
						let C, b = e.getNoBgTrimmedLength();
						i && b < a + 1 && (b = a + 1);
						let w = 0, y = "", E = 0, k = 0, L = 0, D = !1, R = 0, x = !1, A = 0;
						const B = [], T = -1 !== f && -1 !== p;
						for (let M = 0; M < b; M++) {
							e.loadCell(M, this._workCell);
							let b = this._workCell.getWidth();
							if (0 === b) continue;
							let O = !1, P = M, I = this._workCell;
							if (m.length > 0 && M === m[0][0]) {
								O = !0;
								const t = m.shift();
								I = new d.JoinedCellData(this._workCell, e.translateToString(!0, t[0], t[1]), t[1] - t[0]), P = t[1] - 1, b = I.getWidth();
							}
							const H = this._isCellInSelection(M, t), F = i && M === a, W = T && M >= f && M <= p;
							let U = !1;
							this._decorationService.forEachDecorationAtCell(M, t, void 0, ((e) => {
								U = !0;
							}));
							let N = I.getChars() || o.WHITESPACE_CELL_CHAR;
							if (" " === N && (I.isUnderline() || I.isOverline()) && (N = "\xA0"), A = b * l - _.get(N, I.isBold(), I.isItalic()), C) {
								if (w && (H && x || !H && !x && I.bg === E) && (H && x && S.selectionForeground || I.fg === k) && I.extended.ext === L && W === D && A === R && !F && !O && !U) {
									I.isInvisible() ? y += o.WHITESPACE_CELL_CHAR : y += N, w++;
									continue;
								}
								w && (C.textContent = y), C = this._document.createElement("span"), w = 0, y = "";
							} else C = this._document.createElement("span");
							if (E = I.bg, k = I.fg, L = I.extended.ext, D = W, R = A, x = H, O && a >= M && a <= P && (a = M), !this._coreService.isCursorHidden && F && this._coreService.isCursorInitialized) {
								if (B.push("xterm-cursor"), this._coreBrowserService.isFocused) h && B.push("xterm-cursor-blink"), B.push("bar" === s ? "xterm-cursor-bar" : "underline" === s ? "xterm-cursor-underline" : "xterm-cursor-block");
								else if (r) switch (r) {
									case "outline":
										B.push("xterm-cursor-outline");
										break;
									case "block":
										B.push("xterm-cursor-block");
										break;
									case "bar":
										B.push("xterm-cursor-bar");
										break;
									case "underline": B.push("xterm-cursor-underline");
								}
							}
							if (I.isBold() && B.push("xterm-bold"), I.isItalic() && B.push("xterm-italic"), I.isDim() && B.push("xterm-dim"), y = I.isInvisible() ? o.WHITESPACE_CELL_CHAR : I.getChars() || o.WHITESPACE_CELL_CHAR, I.isUnderline() && (B.push(`xterm-underline-${I.extended.underlineStyle}`), " " === y && (y = "\xA0"), !I.isUnderlineColorDefault())) if (I.isUnderlineColorRGB()) C.style.textDecorationColor = `rgb(${u.AttributeData.toColorRGB(I.getUnderlineColor()).join(",")})`;
							else {
								let e = I.getUnderlineColor();
								this._optionsService.rawOptions.drawBoldTextInBrightColors && I.isBold() && e < 8 && (e += 8), C.style.textDecorationColor = S.ansi[e].css;
							}
							I.isOverline() && (B.push("xterm-overline"), " " === y && (y = "\xA0")), I.isStrikethrough() && B.push("xterm-strikethrough"), W && (C.style.textDecoration = "underline");
							let $ = I.getFgColor(), j = I.getFgColorMode(), z = I.getBgColor(), K = I.getBgColorMode();
							const q = !!I.isInverse();
							if (q) {
								const e = $;
								$ = z, z = e;
								const t = j;
								j = K, K = t;
							}
							let V, G, X, J = !1;
							switch (this._decorationService.forEachDecorationAtCell(M, t, void 0, ((e) => {
								"top" !== e.options.layer && J || (e.backgroundColorRGB && (K = 50331648, z = e.backgroundColorRGB.rgba >> 8 & 16777215, V = e.backgroundColorRGB), e.foregroundColorRGB && (j = 50331648, $ = e.foregroundColorRGB.rgba >> 8 & 16777215, G = e.foregroundColorRGB), J = "top" === e.options.layer);
							})), !J && H && (V = this._coreBrowserService.isFocused ? S.selectionBackgroundOpaque : S.selectionInactiveBackgroundOpaque, z = V.rgba >> 8 & 16777215, K = 50331648, J = !0, S.selectionForeground && (j = 50331648, $ = S.selectionForeground.rgba >> 8 & 16777215, G = S.selectionForeground)), J && B.push("xterm-decoration-top"), K) {
								case 16777216:
								case 33554432:
									X = S.ansi[z], B.push(`xterm-bg-${z}`);
									break;
								case 50331648:
									X = c.channels.toColor(z >> 16, z >> 8 & 255, 255 & z), this._addStyle(C, `background-color:#${v((z >>> 0).toString(16), "0", 6)}`);
									break;
								default: q ? (X = S.foreground, B.push(`xterm-bg-${n.INVERTED_DEFAULT_COLOR}`)) : X = S.background;
							}
							switch (V || I.isDim() && (V = c.color.multiplyOpacity(X, .5)), j) {
								case 16777216:
								case 33554432:
									I.isBold() && $ < 8 && this._optionsService.rawOptions.drawBoldTextInBrightColors && ($ += 8), this._applyMinimumContrast(C, X, S.ansi[$], I, V, void 0) || B.push(`xterm-fg-${$}`);
									break;
								case 50331648:
									const e = c.channels.toColor($ >> 16 & 255, $ >> 8 & 255, 255 & $);
									this._applyMinimumContrast(C, X, e, I, V, G) || this._addStyle(C, `color:#${v($.toString(16), "0", 6)}`);
									break;
								default: this._applyMinimumContrast(C, X, S.foreground, I, V, G) || q && B.push(`xterm-fg-${n.INVERTED_DEFAULT_COLOR}`);
							}
							B.length && (C.className = B.join(" "), B.length = 0), F || O || U ? C.textContent = y : w++, A !== this.defaultSpacing && (C.style.letterSpacing = `${A}px`), g.push(C), M = P;
						}
						return C && w && (C.textContent = y), g;
					}
					_applyMinimumContrast(e, t, i, s, r, n) {
						if (1 === this._optionsService.rawOptions.minimumContrastRatio || (0, _.treatGlyphAsBackgroundColor)(s.getCode())) return !1;
						const o = this._getContrastCache(s);
						let a;
						if (r || n || (a = o.getColor(t.rgba, i.rgba)), void 0 === a) {
							const e = this._optionsService.rawOptions.minimumContrastRatio / (s.isDim() ? 2 : 1);
							a = c.color.ensureContrastRatio(r || t, n || i, e), o.setColor((r || t).rgba, (n || i).rgba, a ?? null);
						}
						return !!a && (this._addStyle(e, `color:${a.css}`), !0);
					}
					_getContrastCache(e) {
						return e.isDim() ? this._themeService.colors.halfContrastCache : this._themeService.colors.contrastCache;
					}
					_addStyle(e, t) {
						e.setAttribute("style", `${e.getAttribute("style") || ""}${t};`);
					}
					_isCellInSelection(e, t) {
						const i = this._selectionStart, s = this._selectionEnd;
						return !(!i || !s) && (this._columnSelectMode ? i[0] <= s[0] ? e >= i[0] && t >= i[1] && e < s[0] && t <= s[1] : e < i[0] && t >= i[1] && e >= s[0] && t <= s[1] : t > i[1] && t < s[1] || i[1] === s[1] && t === i[1] && e >= i[0] && e < s[0] || i[1] < s[1] && t === s[1] && e < s[0] || i[1] < s[1] && t === i[1] && e >= i[0]);
					}
				};
				function v(e, t, i) {
					for (; e.length < i;) e = t + e;
					return e;
				}
				t.DomRendererRowFactory = f = s([
					r(1, l.ICharacterJoinerService),
					r(2, h.IOptionsService),
					r(3, l.ICoreBrowserService),
					r(4, h.ICoreService),
					r(5, h.IDecorationService),
					r(6, l.IThemeService)
				], f);
			},
			2550: (e, t) => {
				Object.defineProperty(t, "__esModule", { value: !0 }), t.WidthCache = void 0, t.WidthCache = class {
					constructor(e, t) {
						this._flat = /* @__PURE__ */ new Float32Array(256), this._font = "", this._fontSize = 0, this._weight = "normal", this._weightBold = "bold", this._measureElements = [], this._container = e.createElement("div"), this._container.classList.add("xterm-width-cache-measure-container"), this._container.setAttribute("aria-hidden", "true"), this._container.style.whiteSpace = "pre", this._container.style.fontKerning = "none";
						const i = e.createElement("span");
						i.classList.add("xterm-char-measure-element");
						const s = e.createElement("span");
						s.classList.add("xterm-char-measure-element"), s.style.fontWeight = "bold";
						const r = e.createElement("span");
						r.classList.add("xterm-char-measure-element"), r.style.fontStyle = "italic";
						const n = e.createElement("span");
						n.classList.add("xterm-char-measure-element"), n.style.fontWeight = "bold", n.style.fontStyle = "italic", this._measureElements = [
							i,
							s,
							r,
							n
						], this._container.appendChild(i), this._container.appendChild(s), this._container.appendChild(r), this._container.appendChild(n), t.appendChild(this._container), this.clear();
					}
					dispose() {
						this._container.remove(), this._measureElements.length = 0, this._holey = void 0;
					}
					clear() {
						this._flat.fill(-9999), this._holey = /* @__PURE__ */ new Map();
					}
					setFont(e, t, i, s) {
						e === this._font && t === this._fontSize && i === this._weight && s === this._weightBold || (this._font = e, this._fontSize = t, this._weight = i, this._weightBold = s, this._container.style.fontFamily = this._font, this._container.style.fontSize = `${this._fontSize}px`, this._measureElements[0].style.fontWeight = `${i}`, this._measureElements[1].style.fontWeight = `${s}`, this._measureElements[2].style.fontWeight = `${i}`, this._measureElements[3].style.fontWeight = `${s}`, this.clear());
					}
					get(e, t, i) {
						let s = 0;
						if (!t && !i && 1 === e.length && (s = e.charCodeAt(0)) < 256) {
							if (-9999 !== this._flat[s]) return this._flat[s];
							const t = this._measure(e, 0);
							return t > 0 && (this._flat[s] = t), t;
						}
						let r = e;
						t && (r += "B"), i && (r += "I");
						let n = this._holey.get(r);
						if (void 0 === n) {
							let s = 0;
							t && (s |= 1), i && (s |= 2), n = this._measure(e, s), n > 0 && this._holey.set(r, n);
						}
						return n;
					}
					_measure(e, t) {
						const i = this._measureElements[t];
						return i.textContent = e.repeat(32), i.offsetWidth / 32;
					}
				};
			},
			2223: (e, t, i) => {
				Object.defineProperty(t, "__esModule", { value: !0 }), t.TEXT_BASELINE = t.DIM_OPACITY = t.INVERTED_DEFAULT_COLOR = void 0;
				const s = i(6114);
				t.INVERTED_DEFAULT_COLOR = 257, t.DIM_OPACITY = .5, t.TEXT_BASELINE = s.isFirefox || s.isLegacyEdge ? "bottom" : "ideographic";
			},
			6171: (e, t) => {
				function i(e) {
					return 57508 <= e && e <= 57558;
				}
				function s(e) {
					return e >= 128512 && e <= 128591 || e >= 127744 && e <= 128511 || e >= 128640 && e <= 128767 || e >= 9728 && e <= 9983 || e >= 9984 && e <= 10175 || e >= 65024 && e <= 65039 || e >= 129280 && e <= 129535 || e >= 127462 && e <= 127487;
				}
				Object.defineProperty(t, "__esModule", { value: !0 }), t.computeNextVariantOffset = t.createRenderDimensions = t.treatGlyphAsBackgroundColor = t.allowRescaling = t.isEmoji = t.isRestrictedPowerlineGlyph = t.isPowerlineGlyph = t.throwIfFalsy = void 0, t.throwIfFalsy = function(e) {
					if (!e) throw new Error("value must not be falsy");
					return e;
				}, t.isPowerlineGlyph = i, t.isRestrictedPowerlineGlyph = function(e) {
					return 57520 <= e && e <= 57527;
				}, t.isEmoji = s, t.allowRescaling = function(e, t, r, n) {
					return 1 === t && r > Math.ceil(1.5 * n) && void 0 !== e && e > 255 && !s(e) && !i(e) && !function(e) {
						return 57344 <= e && e <= 63743;
					}(e);
				}, t.treatGlyphAsBackgroundColor = function(e) {
					return i(e) || function(e) {
						return 9472 <= e && e <= 9631;
					}(e);
				}, t.createRenderDimensions = function() {
					return {
						css: {
							canvas: {
								width: 0,
								height: 0
							},
							cell: {
								width: 0,
								height: 0
							}
						},
						device: {
							canvas: {
								width: 0,
								height: 0
							},
							cell: {
								width: 0,
								height: 0
							},
							char: {
								width: 0,
								height: 0,
								left: 0,
								top: 0
							}
						}
					};
				}, t.computeNextVariantOffset = function(e, t, i = 0) {
					return (e - (2 * Math.round(t) - i)) % (2 * Math.round(t));
				};
			},
			6052: (e, t) => {
				Object.defineProperty(t, "__esModule", { value: !0 }), t.createSelectionRenderModel = void 0;
				class i {
					constructor() {
						this.clear();
					}
					clear() {
						this.hasSelection = !1, this.columnSelectMode = !1, this.viewportStartRow = 0, this.viewportEndRow = 0, this.viewportCappedStartRow = 0, this.viewportCappedEndRow = 0, this.startCol = 0, this.endCol = 0, this.selectionStart = void 0, this.selectionEnd = void 0;
					}
					update(e, t, i, s = !1) {
						if (this.selectionStart = t, this.selectionEnd = i, !t || !i || t[0] === i[0] && t[1] === i[1]) return void this.clear();
						const r = e.buffers.active.ydisp, n = t[1] - r, o = i[1] - r, a = Math.max(n, 0), h = Math.min(o, e.rows - 1);
						a >= e.rows || h < 0 ? this.clear() : (this.hasSelection = !0, this.columnSelectMode = s, this.viewportStartRow = n, this.viewportEndRow = o, this.viewportCappedStartRow = a, this.viewportCappedEndRow = h, this.startCol = t[0], this.endCol = i[0]);
					}
					isCellSelected(e, t, i) {
						return !!this.hasSelection && (i -= e.buffer.active.viewportY, this.columnSelectMode ? this.startCol <= this.endCol ? t >= this.startCol && i >= this.viewportCappedStartRow && t < this.endCol && i <= this.viewportCappedEndRow : t < this.startCol && i >= this.viewportCappedStartRow && t >= this.endCol && i <= this.viewportCappedEndRow : i > this.viewportStartRow && i < this.viewportEndRow || this.viewportStartRow === this.viewportEndRow && i === this.viewportStartRow && t >= this.startCol && t < this.endCol || this.viewportStartRow < this.viewportEndRow && i === this.viewportEndRow && t < this.endCol || this.viewportStartRow < this.viewportEndRow && i === this.viewportStartRow && t >= this.startCol);
					}
				}
				t.createSelectionRenderModel = function() {
					return new i();
				};
			},
			456: (e, t) => {
				Object.defineProperty(t, "__esModule", { value: !0 }), t.SelectionModel = void 0, t.SelectionModel = class {
					constructor(e) {
						this._bufferService = e, this.isSelectAllActive = !1, this.selectionStartLength = 0;
					}
					clearSelection() {
						this.selectionStart = void 0, this.selectionEnd = void 0, this.isSelectAllActive = !1, this.selectionStartLength = 0;
					}
					get finalSelectionStart() {
						return this.isSelectAllActive ? [0, 0] : this.selectionEnd && this.selectionStart && this.areSelectionValuesReversed() ? this.selectionEnd : this.selectionStart;
					}
					get finalSelectionEnd() {
						if (this.isSelectAllActive) return [this._bufferService.cols, this._bufferService.buffer.ybase + this._bufferService.rows - 1];
						if (this.selectionStart) {
							if (!this.selectionEnd || this.areSelectionValuesReversed()) {
								const e = this.selectionStart[0] + this.selectionStartLength;
								return e > this._bufferService.cols ? e % this._bufferService.cols == 0 ? [this._bufferService.cols, this.selectionStart[1] + Math.floor(e / this._bufferService.cols) - 1] : [e % this._bufferService.cols, this.selectionStart[1] + Math.floor(e / this._bufferService.cols)] : [e, this.selectionStart[1]];
							}
							if (this.selectionStartLength && this.selectionEnd[1] === this.selectionStart[1]) {
								const e = this.selectionStart[0] + this.selectionStartLength;
								return e > this._bufferService.cols ? [e % this._bufferService.cols, this.selectionStart[1] + Math.floor(e / this._bufferService.cols)] : [Math.max(e, this.selectionEnd[0]), this.selectionEnd[1]];
							}
							return this.selectionEnd;
						}
					}
					areSelectionValuesReversed() {
						const e = this.selectionStart, t = this.selectionEnd;
						return !(!e || !t) && (e[1] > t[1] || e[1] === t[1] && e[0] > t[0]);
					}
					handleTrim(e) {
						return this.selectionStart && (this.selectionStart[1] -= e), this.selectionEnd && (this.selectionEnd[1] -= e), this.selectionEnd && this.selectionEnd[1] < 0 ? (this.clearSelection(), !0) : (this.selectionStart && this.selectionStart[1] < 0 && (this.selectionStart[1] = 0), !1);
					}
				};
			},
			428: function(e, t, i) {
				var s = this && this.__decorate || function(e, t, i, s) {
					var r, n = arguments.length, o = n < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
					if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, i, s);
					else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (o = (n < 3 ? r(o) : n > 3 ? r(t, i, o) : r(t, i)) || o);
					return n > 3 && o && Object.defineProperty(t, i, o), o;
				}, r = this && this.__param || function(e, t) {
					return function(i, s) {
						t(i, s, e);
					};
				};
				Object.defineProperty(t, "__esModule", { value: !0 }), t.CharSizeService = void 0;
				const n = i(2585), o = i(8460), a = i(844);
				let h = t.CharSizeService = class extends a.Disposable {
					get hasValidSize() {
						return this.width > 0 && this.height > 0;
					}
					constructor(e, t, i) {
						super(), this._optionsService = i, this.width = 0, this.height = 0, this._onCharSizeChange = this.register(new o.EventEmitter()), this.onCharSizeChange = this._onCharSizeChange.event;
						try {
							this._measureStrategy = this.register(new d(this._optionsService));
						} catch {
							this._measureStrategy = this.register(new l(e, t, this._optionsService));
						}
						this.register(this._optionsService.onMultipleOptionChange(["fontFamily", "fontSize"], (() => this.measure())));
					}
					measure() {
						const e = this._measureStrategy.measure();
						e.width === this.width && e.height === this.height || (this.width = e.width, this.height = e.height, this._onCharSizeChange.fire());
					}
				};
				t.CharSizeService = h = s([r(2, n.IOptionsService)], h);
				class c extends a.Disposable {
					constructor() {
						super(...arguments), this._result = {
							width: 0,
							height: 0
						};
					}
					_validateAndSet(e, t) {
						void 0 !== e && e > 0 && void 0 !== t && t > 0 && (this._result.width = e, this._result.height = t);
					}
				}
				class l extends c {
					constructor(e, t, i) {
						super(), this._document = e, this._parentElement = t, this._optionsService = i, this._measureElement = this._document.createElement("span"), this._measureElement.classList.add("xterm-char-measure-element"), this._measureElement.textContent = "W".repeat(32), this._measureElement.setAttribute("aria-hidden", "true"), this._measureElement.style.whiteSpace = "pre", this._measureElement.style.fontKerning = "none", this._parentElement.appendChild(this._measureElement);
					}
					measure() {
						return this._measureElement.style.fontFamily = this._optionsService.rawOptions.fontFamily, this._measureElement.style.fontSize = `${this._optionsService.rawOptions.fontSize}px`, this._validateAndSet(Number(this._measureElement.offsetWidth) / 32, Number(this._measureElement.offsetHeight)), this._result;
					}
				}
				class d extends c {
					constructor(e) {
						super(), this._optionsService = e, this._canvas = new OffscreenCanvas(100, 100), this._ctx = this._canvas.getContext("2d");
						const t = this._ctx.measureText("W");
						if (!("width" in t && "fontBoundingBoxAscent" in t && "fontBoundingBoxDescent" in t)) throw new Error("Required font metrics not supported");
					}
					measure() {
						this._ctx.font = `${this._optionsService.rawOptions.fontSize}px ${this._optionsService.rawOptions.fontFamily}`;
						const e = this._ctx.measureText("W");
						return this._validateAndSet(e.width, e.fontBoundingBoxAscent + e.fontBoundingBoxDescent), this._result;
					}
				}
			},
			4269: function(e, t, i) {
				var s = this && this.__decorate || function(e, t, i, s) {
					var r, n = arguments.length, o = n < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
					if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, i, s);
					else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (o = (n < 3 ? r(o) : n > 3 ? r(t, i, o) : r(t, i)) || o);
					return n > 3 && o && Object.defineProperty(t, i, o), o;
				}, r = this && this.__param || function(e, t) {
					return function(i, s) {
						t(i, s, e);
					};
				};
				Object.defineProperty(t, "__esModule", { value: !0 }), t.CharacterJoinerService = t.JoinedCellData = void 0;
				const n = i(3734), o = i(643), a = i(511), h = i(2585);
				class c extends n.AttributeData {
					constructor(e, t, i) {
						super(), this.content = 0, this.combinedData = "", this.fg = e.fg, this.bg = e.bg, this.combinedData = t, this._width = i;
					}
					isCombined() {
						return 2097152;
					}
					getWidth() {
						return this._width;
					}
					getChars() {
						return this.combinedData;
					}
					getCode() {
						return 2097151;
					}
					setFromCharData(e) {
						throw new Error("not implemented");
					}
					getAsCharData() {
						return [
							this.fg,
							this.getChars(),
							this.getWidth(),
							this.getCode()
						];
					}
				}
				t.JoinedCellData = c;
				let l = t.CharacterJoinerService = class e {
					constructor(e) {
						this._bufferService = e, this._characterJoiners = [], this._nextCharacterJoinerId = 0, this._workCell = new a.CellData();
					}
					register(e) {
						const t = {
							id: this._nextCharacterJoinerId++,
							handler: e
						};
						return this._characterJoiners.push(t), t.id;
					}
					deregister(e) {
						for (let t = 0; t < this._characterJoiners.length; t++) if (this._characterJoiners[t].id === e) return this._characterJoiners.splice(t, 1), !0;
						return !1;
					}
					getJoinedCharacters(e) {
						if (0 === this._characterJoiners.length) return [];
						const t = this._bufferService.buffer.lines.get(e);
						if (!t || 0 === t.length) return [];
						const i = [], s = t.translateToString(!0);
						let r = 0, n = 0, a = 0, h = t.getFg(0), c = t.getBg(0);
						for (let e = 0; e < t.getTrimmedLength(); e++) if (t.loadCell(e, this._workCell), 0 !== this._workCell.getWidth()) {
							if (this._workCell.fg !== h || this._workCell.bg !== c) {
								if (e - r > 1) {
									const e = this._getJoinedRanges(s, a, n, t, r);
									for (let t = 0; t < e.length; t++) i.push(e[t]);
								}
								r = e, a = n, h = this._workCell.fg, c = this._workCell.bg;
							}
							n += this._workCell.getChars().length || o.WHITESPACE_CELL_CHAR.length;
						}
						if (this._bufferService.cols - r > 1) {
							const e = this._getJoinedRanges(s, a, n, t, r);
							for (let t = 0; t < e.length; t++) i.push(e[t]);
						}
						return i;
					}
					_getJoinedRanges(t, i, s, r, n) {
						const o = t.substring(i, s);
						let a = [];
						try {
							a = this._characterJoiners[0].handler(o);
						} catch (e) {
							console.error(e);
						}
						for (let t = 1; t < this._characterJoiners.length; t++) try {
							const i = this._characterJoiners[t].handler(o);
							for (let t = 0; t < i.length; t++) e._mergeRanges(a, i[t]);
						} catch (e) {
							console.error(e);
						}
						return this._stringRangesToCellRanges(a, r, n), a;
					}
					_stringRangesToCellRanges(e, t, i) {
						let s = 0, r = !1, n = 0, a = e[s];
						if (a) {
							for (let h = i; h < this._bufferService.cols; h++) {
								const i = t.getWidth(h), c = t.getString(h).length || o.WHITESPACE_CELL_CHAR.length;
								if (0 !== i) {
									if (!r && a[0] <= n && (a[0] = h, r = !0), a[1] <= n) {
										if (a[1] = h, a = e[++s], !a) break;
										a[0] <= n ? (a[0] = h, r = !0) : r = !1;
									}
									n += c;
								}
							}
							a && (a[1] = this._bufferService.cols);
						}
					}
					static _mergeRanges(e, t) {
						let i = !1;
						for (let s = 0; s < e.length; s++) {
							const r = e[s];
							if (i) {
								if (t[1] <= r[0]) return e[s - 1][1] = t[1], e;
								if (t[1] <= r[1]) return e[s - 1][1] = Math.max(t[1], r[1]), e.splice(s, 1), e;
								e.splice(s, 1), s--;
							} else {
								if (t[1] <= r[0]) return e.splice(s, 0, t), e;
								if (t[1] <= r[1]) return r[0] = Math.min(t[0], r[0]), e;
								t[0] < r[1] && (r[0] = Math.min(t[0], r[0]), i = !0);
							}
						}
						return i ? e[e.length - 1][1] = t[1] : e.push(t), e;
					}
				};
				t.CharacterJoinerService = l = s([r(0, h.IBufferService)], l);
			},
			5114: (e, t, i) => {
				Object.defineProperty(t, "__esModule", { value: !0 }), t.CoreBrowserService = void 0;
				const s = i(844), r = i(8460), n = i(3656);
				class o extends s.Disposable {
					constructor(e, t, i) {
						super(), this._textarea = e, this._window = t, this.mainDocument = i, this._isFocused = !1, this._cachedIsFocused = void 0, this._screenDprMonitor = new a(this._window), this._onDprChange = this.register(new r.EventEmitter()), this.onDprChange = this._onDprChange.event, this._onWindowChange = this.register(new r.EventEmitter()), this.onWindowChange = this._onWindowChange.event, this.register(this.onWindowChange(((e) => this._screenDprMonitor.setWindow(e)))), this.register((0, r.forwardEvent)(this._screenDprMonitor.onDprChange, this._onDprChange)), this._textarea.addEventListener("focus", (() => this._isFocused = !0)), this._textarea.addEventListener("blur", (() => this._isFocused = !1));
					}
					get window() {
						return this._window;
					}
					set window(e) {
						this._window !== e && (this._window = e, this._onWindowChange.fire(this._window));
					}
					get dpr() {
						return this.window.devicePixelRatio;
					}
					get isFocused() {
						return void 0 === this._cachedIsFocused && (this._cachedIsFocused = this._isFocused && this._textarea.ownerDocument.hasFocus(), queueMicrotask((() => this._cachedIsFocused = void 0))), this._cachedIsFocused;
					}
				}
				t.CoreBrowserService = o;
				class a extends s.Disposable {
					constructor(e) {
						super(), this._parentWindow = e, this._windowResizeListener = this.register(new s.MutableDisposable()), this._onDprChange = this.register(new r.EventEmitter()), this.onDprChange = this._onDprChange.event, this._outerListener = () => this._setDprAndFireIfDiffers(), this._currentDevicePixelRatio = this._parentWindow.devicePixelRatio, this._updateDpr(), this._setWindowResizeListener(), this.register((0, s.toDisposable)((() => this.clearListener())));
					}
					setWindow(e) {
						this._parentWindow = e, this._setWindowResizeListener(), this._setDprAndFireIfDiffers();
					}
					_setWindowResizeListener() {
						this._windowResizeListener.value = (0, n.addDisposableDomListener)(this._parentWindow, "resize", (() => this._setDprAndFireIfDiffers()));
					}
					_setDprAndFireIfDiffers() {
						this._parentWindow.devicePixelRatio !== this._currentDevicePixelRatio && this._onDprChange.fire(this._parentWindow.devicePixelRatio), this._updateDpr();
					}
					_updateDpr() {
						this._outerListener && (this._resolutionMediaMatchList?.removeListener(this._outerListener), this._currentDevicePixelRatio = this._parentWindow.devicePixelRatio, this._resolutionMediaMatchList = this._parentWindow.matchMedia(`screen and (resolution: ${this._parentWindow.devicePixelRatio}dppx)`), this._resolutionMediaMatchList.addListener(this._outerListener));
					}
					clearListener() {
						this._resolutionMediaMatchList && this._outerListener && (this._resolutionMediaMatchList.removeListener(this._outerListener), this._resolutionMediaMatchList = void 0, this._outerListener = void 0);
					}
				}
			},
			779: (e, t, i) => {
				Object.defineProperty(t, "__esModule", { value: !0 }), t.LinkProviderService = void 0;
				const s = i(844);
				class r extends s.Disposable {
					constructor() {
						super(), this.linkProviders = [], this.register((0, s.toDisposable)((() => this.linkProviders.length = 0)));
					}
					registerLinkProvider(e) {
						return this.linkProviders.push(e), { dispose: () => {
							const t = this.linkProviders.indexOf(e);
							-1 !== t && this.linkProviders.splice(t, 1);
						} };
					}
				}
				t.LinkProviderService = r;
			},
			8934: function(e, t, i) {
				var s = this && this.__decorate || function(e, t, i, s) {
					var r, n = arguments.length, o = n < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
					if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, i, s);
					else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (o = (n < 3 ? r(o) : n > 3 ? r(t, i, o) : r(t, i)) || o);
					return n > 3 && o && Object.defineProperty(t, i, o), o;
				}, r = this && this.__param || function(e, t) {
					return function(i, s) {
						t(i, s, e);
					};
				};
				Object.defineProperty(t, "__esModule", { value: !0 }), t.MouseService = void 0;
				const n = i(4725), o = i(9806);
				let a = t.MouseService = class {
					constructor(e, t) {
						this._renderService = e, this._charSizeService = t;
					}
					getCoords(e, t, i, s, r) {
						return (0, o.getCoords)(window, e, t, i, s, this._charSizeService.hasValidSize, this._renderService.dimensions.css.cell.width, this._renderService.dimensions.css.cell.height, r);
					}
					getMouseReportCoords(e, t) {
						const i = (0, o.getCoordsRelativeToElement)(window, e, t);
						if (this._charSizeService.hasValidSize) return i[0] = Math.min(Math.max(i[0], 0), this._renderService.dimensions.css.canvas.width - 1), i[1] = Math.min(Math.max(i[1], 0), this._renderService.dimensions.css.canvas.height - 1), {
							col: Math.floor(i[0] / this._renderService.dimensions.css.cell.width),
							row: Math.floor(i[1] / this._renderService.dimensions.css.cell.height),
							x: Math.floor(i[0]),
							y: Math.floor(i[1])
						};
					}
				};
				t.MouseService = a = s([r(0, n.IRenderService), r(1, n.ICharSizeService)], a);
			},
			3230: function(e, t, i) {
				var s = this && this.__decorate || function(e, t, i, s) {
					var r, n = arguments.length, o = n < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
					if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, i, s);
					else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (o = (n < 3 ? r(o) : n > 3 ? r(t, i, o) : r(t, i)) || o);
					return n > 3 && o && Object.defineProperty(t, i, o), o;
				}, r = this && this.__param || function(e, t) {
					return function(i, s) {
						t(i, s, e);
					};
				};
				Object.defineProperty(t, "__esModule", { value: !0 }), t.RenderService = void 0;
				const n = i(6193), o = i(4725), a = i(8460), h = i(844), c = i(7226), l = i(2585);
				let d = t.RenderService = class extends h.Disposable {
					get dimensions() {
						return this._renderer.value.dimensions;
					}
					constructor(e, t, i, s, r, o, l, d) {
						super(), this._rowCount = e, this._charSizeService = s, this._renderer = this.register(new h.MutableDisposable()), this._pausedResizeTask = new c.DebouncedIdleTask(), this._observerDisposable = this.register(new h.MutableDisposable()), this._isPaused = !1, this._needsFullRefresh = !1, this._isNextRenderRedrawOnly = !0, this._needsSelectionRefresh = !1, this._canvasWidth = 0, this._canvasHeight = 0, this._selectionState = {
							start: void 0,
							end: void 0,
							columnSelectMode: !1
						}, this._onDimensionsChange = this.register(new a.EventEmitter()), this.onDimensionsChange = this._onDimensionsChange.event, this._onRenderedViewportChange = this.register(new a.EventEmitter()), this.onRenderedViewportChange = this._onRenderedViewportChange.event, this._onRender = this.register(new a.EventEmitter()), this.onRender = this._onRender.event, this._onRefreshRequest = this.register(new a.EventEmitter()), this.onRefreshRequest = this._onRefreshRequest.event, this._renderDebouncer = new n.RenderDebouncer(((e, t) => this._renderRows(e, t)), l), this.register(this._renderDebouncer), this.register(l.onDprChange((() => this.handleDevicePixelRatioChange()))), this.register(o.onResize((() => this._fullRefresh()))), this.register(o.buffers.onBufferActivate((() => this._renderer.value?.clear()))), this.register(i.onOptionChange((() => this._handleOptionsChanged()))), this.register(this._charSizeService.onCharSizeChange((() => this.handleCharSizeChanged()))), this.register(r.onDecorationRegistered((() => this._fullRefresh()))), this.register(r.onDecorationRemoved((() => this._fullRefresh()))), this.register(i.onMultipleOptionChange([
							"customGlyphs",
							"drawBoldTextInBrightColors",
							"letterSpacing",
							"lineHeight",
							"fontFamily",
							"fontSize",
							"fontWeight",
							"fontWeightBold",
							"minimumContrastRatio",
							"rescaleOverlappingGlyphs"
						], (() => {
							this.clear(), this.handleResize(o.cols, o.rows), this._fullRefresh();
						}))), this.register(i.onMultipleOptionChange(["cursorBlink", "cursorStyle"], (() => this.refreshRows(o.buffer.y, o.buffer.y, !0)))), this.register(d.onChangeColors((() => this._fullRefresh()))), this._registerIntersectionObserver(l.window, t), this.register(l.onWindowChange(((e) => this._registerIntersectionObserver(e, t))));
					}
					_registerIntersectionObserver(e, t) {
						if ("IntersectionObserver" in e) {
							const i = new e.IntersectionObserver(((e) => this._handleIntersectionChange(e[e.length - 1])), { threshold: 0 });
							i.observe(t), this._observerDisposable.value = (0, h.toDisposable)((() => i.disconnect()));
						}
					}
					_handleIntersectionChange(e) {
						this._isPaused = void 0 === e.isIntersecting ? 0 === e.intersectionRatio : !e.isIntersecting, this._isPaused || this._charSizeService.hasValidSize || this._charSizeService.measure(), !this._isPaused && this._needsFullRefresh && (this._pausedResizeTask.flush(), this.refreshRows(0, this._rowCount - 1), this._needsFullRefresh = !1);
					}
					refreshRows(e, t, i = !1) {
						this._isPaused ? this._needsFullRefresh = !0 : (i || (this._isNextRenderRedrawOnly = !1), this._renderDebouncer.refresh(e, t, this._rowCount));
					}
					_renderRows(e, t) {
						this._renderer.value && (e = Math.min(e, this._rowCount - 1), t = Math.min(t, this._rowCount - 1), this._renderer.value.renderRows(e, t), this._needsSelectionRefresh && (this._renderer.value.handleSelectionChanged(this._selectionState.start, this._selectionState.end, this._selectionState.columnSelectMode), this._needsSelectionRefresh = !1), this._isNextRenderRedrawOnly || this._onRenderedViewportChange.fire({
							start: e,
							end: t
						}), this._onRender.fire({
							start: e,
							end: t
						}), this._isNextRenderRedrawOnly = !0);
					}
					resize(e, t) {
						this._rowCount = t, this._fireOnCanvasResize();
					}
					_handleOptionsChanged() {
						this._renderer.value && (this.refreshRows(0, this._rowCount - 1), this._fireOnCanvasResize());
					}
					_fireOnCanvasResize() {
						this._renderer.value && (this._renderer.value.dimensions.css.canvas.width === this._canvasWidth && this._renderer.value.dimensions.css.canvas.height === this._canvasHeight || this._onDimensionsChange.fire(this._renderer.value.dimensions));
					}
					hasRenderer() {
						return !!this._renderer.value;
					}
					setRenderer(e) {
						this._renderer.value = e, this._renderer.value && (this._renderer.value.onRequestRedraw(((e) => this.refreshRows(e.start, e.end, !0))), this._needsSelectionRefresh = !0, this._fullRefresh());
					}
					addRefreshCallback(e) {
						return this._renderDebouncer.addRefreshCallback(e);
					}
					_fullRefresh() {
						this._isPaused ? this._needsFullRefresh = !0 : this.refreshRows(0, this._rowCount - 1);
					}
					clearTextureAtlas() {
						this._renderer.value && (this._renderer.value.clearTextureAtlas?.(), this._fullRefresh());
					}
					handleDevicePixelRatioChange() {
						this._charSizeService.measure(), this._renderer.value && (this._renderer.value.handleDevicePixelRatioChange(), this.refreshRows(0, this._rowCount - 1));
					}
					handleResize(e, t) {
						this._renderer.value && (this._isPaused ? this._pausedResizeTask.set((() => this._renderer.value?.handleResize(e, t))) : this._renderer.value.handleResize(e, t), this._fullRefresh());
					}
					handleCharSizeChanged() {
						this._renderer.value?.handleCharSizeChanged();
					}
					handleBlur() {
						this._renderer.value?.handleBlur();
					}
					handleFocus() {
						this._renderer.value?.handleFocus();
					}
					handleSelectionChanged(e, t, i) {
						this._selectionState.start = e, this._selectionState.end = t, this._selectionState.columnSelectMode = i, this._renderer.value?.handleSelectionChanged(e, t, i);
					}
					handleCursorMove() {
						this._renderer.value?.handleCursorMove();
					}
					clear() {
						this._renderer.value?.clear();
					}
				};
				t.RenderService = d = s([
					r(2, l.IOptionsService),
					r(3, o.ICharSizeService),
					r(4, l.IDecorationService),
					r(5, l.IBufferService),
					r(6, o.ICoreBrowserService),
					r(7, o.IThemeService)
				], d);
			},
			9312: function(e, t, i) {
				var s = this && this.__decorate || function(e, t, i, s) {
					var r, n = arguments.length, o = n < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
					if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, i, s);
					else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (o = (n < 3 ? r(o) : n > 3 ? r(t, i, o) : r(t, i)) || o);
					return n > 3 && o && Object.defineProperty(t, i, o), o;
				}, r = this && this.__param || function(e, t) {
					return function(i, s) {
						t(i, s, e);
					};
				};
				Object.defineProperty(t, "__esModule", { value: !0 }), t.SelectionService = void 0;
				const n = i(9806), o = i(9504), a = i(456), h = i(4725), c = i(8460), l = i(844), d = i(6114), _ = i(4841), u = i(511), f = i(2585), p = new RegExp(String.fromCharCode(160), "g");
				let g = t.SelectionService = class extends l.Disposable {
					constructor(e, t, i, s, r, n, o, h, d) {
						super(), this._element = e, this._screenElement = t, this._linkifier = i, this._bufferService = s, this._coreService = r, this._mouseService = n, this._optionsService = o, this._renderService = h, this._coreBrowserService = d, this._dragScrollAmount = 0, this._enabled = !0, this._workCell = new u.CellData(), this._mouseDownTimeStamp = 0, this._oldHasSelection = !1, this._oldSelectionStart = void 0, this._oldSelectionEnd = void 0, this._onLinuxMouseSelection = this.register(new c.EventEmitter()), this.onLinuxMouseSelection = this._onLinuxMouseSelection.event, this._onRedrawRequest = this.register(new c.EventEmitter()), this.onRequestRedraw = this._onRedrawRequest.event, this._onSelectionChange = this.register(new c.EventEmitter()), this.onSelectionChange = this._onSelectionChange.event, this._onRequestScrollLines = this.register(new c.EventEmitter()), this.onRequestScrollLines = this._onRequestScrollLines.event, this._mouseMoveListener = (e) => this._handleMouseMove(e), this._mouseUpListener = (e) => this._handleMouseUp(e), this._coreService.onUserInput((() => {
							this.hasSelection && this.clearSelection();
						})), this._trimListener = this._bufferService.buffer.lines.onTrim(((e) => this._handleTrim(e))), this.register(this._bufferService.buffers.onBufferActivate(((e) => this._handleBufferActivate(e)))), this.enable(), this._model = new a.SelectionModel(this._bufferService), this._activeSelectionMode = 0, this.register((0, l.toDisposable)((() => {
							this._removeMouseDownListeners();
						})));
					}
					reset() {
						this.clearSelection();
					}
					disable() {
						this.clearSelection(), this._enabled = !1;
					}
					enable() {
						this._enabled = !0;
					}
					get selectionStart() {
						return this._model.finalSelectionStart;
					}
					get selectionEnd() {
						return this._model.finalSelectionEnd;
					}
					get hasSelection() {
						const e = this._model.finalSelectionStart, t = this._model.finalSelectionEnd;
						return !(!e || !t || e[0] === t[0] && e[1] === t[1]);
					}
					get selectionText() {
						const e = this._model.finalSelectionStart, t = this._model.finalSelectionEnd;
						if (!e || !t) return "";
						const i = this._bufferService.buffer, s = [];
						if (3 === this._activeSelectionMode) {
							if (e[0] === t[0]) return "";
							const r = e[0] < t[0] ? e[0] : t[0], n = e[0] < t[0] ? t[0] : e[0];
							for (let o = e[1]; o <= t[1]; o++) {
								const e = i.translateBufferLineToString(o, !0, r, n);
								s.push(e);
							}
						} else {
							const r = e[1] === t[1] ? t[0] : void 0;
							s.push(i.translateBufferLineToString(e[1], !0, e[0], r));
							for (let r = e[1] + 1; r <= t[1] - 1; r++) {
								const e = i.lines.get(r), t = i.translateBufferLineToString(r, !0);
								e?.isWrapped ? s[s.length - 1] += t : s.push(t);
							}
							if (e[1] !== t[1]) {
								const e = i.lines.get(t[1]), r = i.translateBufferLineToString(t[1], !0, 0, t[0]);
								e && e.isWrapped ? s[s.length - 1] += r : s.push(r);
							}
						}
						return s.map(((e) => e.replace(p, " "))).join(d.isWindows ? "\r\n" : "\n");
					}
					clearSelection() {
						this._model.clearSelection(), this._removeMouseDownListeners(), this.refresh(), this._onSelectionChange.fire();
					}
					refresh(e) {
						this._refreshAnimationFrame || (this._refreshAnimationFrame = this._coreBrowserService.window.requestAnimationFrame((() => this._refresh()))), d.isLinux && e && this.selectionText.length && this._onLinuxMouseSelection.fire(this.selectionText);
					}
					_refresh() {
						this._refreshAnimationFrame = void 0, this._onRedrawRequest.fire({
							start: this._model.finalSelectionStart,
							end: this._model.finalSelectionEnd,
							columnSelectMode: 3 === this._activeSelectionMode
						});
					}
					_isClickInSelection(e) {
						const t = this._getMouseBufferCoords(e), i = this._model.finalSelectionStart, s = this._model.finalSelectionEnd;
						return !!(i && s && t) && this._areCoordsInSelection(t, i, s);
					}
					isCellInSelection(e, t) {
						const i = this._model.finalSelectionStart, s = this._model.finalSelectionEnd;
						return !(!i || !s) && this._areCoordsInSelection([e, t], i, s);
					}
					_areCoordsInSelection(e, t, i) {
						return e[1] > t[1] && e[1] < i[1] || t[1] === i[1] && e[1] === t[1] && e[0] >= t[0] && e[0] < i[0] || t[1] < i[1] && e[1] === i[1] && e[0] < i[0] || t[1] < i[1] && e[1] === t[1] && e[0] >= t[0];
					}
					_selectWordAtCursor(e, t) {
						const i = this._linkifier.currentLink?.link?.range;
						if (i) return this._model.selectionStart = [i.start.x - 1, i.start.y - 1], this._model.selectionStartLength = (0, _.getRangeLength)(i, this._bufferService.cols), this._model.selectionEnd = void 0, !0;
						const s = this._getMouseBufferCoords(e);
						return !!s && (this._selectWordAt(s, t), this._model.selectionEnd = void 0, !0);
					}
					selectAll() {
						this._model.isSelectAllActive = !0, this.refresh(), this._onSelectionChange.fire();
					}
					selectLines(e, t) {
						this._model.clearSelection(), e = Math.max(e, 0), t = Math.min(t, this._bufferService.buffer.lines.length - 1), this._model.selectionStart = [0, e], this._model.selectionEnd = [this._bufferService.cols, t], this.refresh(), this._onSelectionChange.fire();
					}
					_handleTrim(e) {
						this._model.handleTrim(e) && this.refresh();
					}
					_getMouseBufferCoords(e) {
						const t = this._mouseService.getCoords(e, this._screenElement, this._bufferService.cols, this._bufferService.rows, !0);
						if (t) return t[0]--, t[1]--, t[1] += this._bufferService.buffer.ydisp, t;
					}
					_getMouseEventScrollAmount(e) {
						let t = (0, n.getCoordsRelativeToElement)(this._coreBrowserService.window, e, this._screenElement)[1];
						const i = this._renderService.dimensions.css.canvas.height;
						return t >= 0 && t <= i ? 0 : (t > i && (t -= i), t = Math.min(Math.max(t, -50), 50), t /= 50, t / Math.abs(t) + Math.round(14 * t));
					}
					shouldForceSelection(e) {
						return d.isMac ? e.altKey && this._optionsService.rawOptions.macOptionClickForcesSelection : e.shiftKey;
					}
					handleMouseDown(e) {
						if (this._mouseDownTimeStamp = e.timeStamp, (2 !== e.button || !this.hasSelection) && 0 === e.button) {
							if (!this._enabled) {
								if (!this.shouldForceSelection(e)) return;
								e.stopPropagation();
							}
							e.preventDefault(), this._dragScrollAmount = 0, this._enabled && e.shiftKey ? this._handleIncrementalClick(e) : 1 === e.detail ? this._handleSingleClick(e) : 2 === e.detail ? this._handleDoubleClick(e) : 3 === e.detail && this._handleTripleClick(e), this._addMouseDownListeners(), this.refresh(!0);
						}
					}
					_addMouseDownListeners() {
						this._screenElement.ownerDocument && (this._screenElement.ownerDocument.addEventListener("mousemove", this._mouseMoveListener), this._screenElement.ownerDocument.addEventListener("mouseup", this._mouseUpListener)), this._dragScrollIntervalTimer = this._coreBrowserService.window.setInterval((() => this._dragScroll()), 50);
					}
					_removeMouseDownListeners() {
						this._screenElement.ownerDocument && (this._screenElement.ownerDocument.removeEventListener("mousemove", this._mouseMoveListener), this._screenElement.ownerDocument.removeEventListener("mouseup", this._mouseUpListener)), this._coreBrowserService.window.clearInterval(this._dragScrollIntervalTimer), this._dragScrollIntervalTimer = void 0;
					}
					_handleIncrementalClick(e) {
						this._model.selectionStart && (this._model.selectionEnd = this._getMouseBufferCoords(e));
					}
					_handleSingleClick(e) {
						if (this._model.selectionStartLength = 0, this._model.isSelectAllActive = !1, this._activeSelectionMode = this.shouldColumnSelect(e) ? 3 : 0, this._model.selectionStart = this._getMouseBufferCoords(e), !this._model.selectionStart) return;
						this._model.selectionEnd = void 0;
						const t = this._bufferService.buffer.lines.get(this._model.selectionStart[1]);
						t && t.length !== this._model.selectionStart[0] && 0 === t.hasWidth(this._model.selectionStart[0]) && this._model.selectionStart[0]++;
					}
					_handleDoubleClick(e) {
						this._selectWordAtCursor(e, !0) && (this._activeSelectionMode = 1);
					}
					_handleTripleClick(e) {
						const t = this._getMouseBufferCoords(e);
						t && (this._activeSelectionMode = 2, this._selectLineAt(t[1]));
					}
					shouldColumnSelect(e) {
						return e.altKey && !(d.isMac && this._optionsService.rawOptions.macOptionClickForcesSelection);
					}
					_handleMouseMove(e) {
						if (e.stopImmediatePropagation(), !this._model.selectionStart) return;
						const t = this._model.selectionEnd ? [this._model.selectionEnd[0], this._model.selectionEnd[1]] : null;
						if (this._model.selectionEnd = this._getMouseBufferCoords(e), !this._model.selectionEnd) return void this.refresh(!0);
						2 === this._activeSelectionMode ? this._model.selectionEnd[1] < this._model.selectionStart[1] ? this._model.selectionEnd[0] = 0 : this._model.selectionEnd[0] = this._bufferService.cols : 1 === this._activeSelectionMode && this._selectToWordAt(this._model.selectionEnd), this._dragScrollAmount = this._getMouseEventScrollAmount(e), 3 !== this._activeSelectionMode && (this._dragScrollAmount > 0 ? this._model.selectionEnd[0] = this._bufferService.cols : this._dragScrollAmount < 0 && (this._model.selectionEnd[0] = 0));
						const i = this._bufferService.buffer;
						if (this._model.selectionEnd[1] < i.lines.length) {
							const e = i.lines.get(this._model.selectionEnd[1]);
							e && 0 === e.hasWidth(this._model.selectionEnd[0]) && this._model.selectionEnd[0] < this._bufferService.cols && this._model.selectionEnd[0]++;
						}
						t && t[0] === this._model.selectionEnd[0] && t[1] === this._model.selectionEnd[1] || this.refresh(!0);
					}
					_dragScroll() {
						if (this._model.selectionEnd && this._model.selectionStart && this._dragScrollAmount) {
							this._onRequestScrollLines.fire({
								amount: this._dragScrollAmount,
								suppressScrollEvent: !1
							});
							const e = this._bufferService.buffer;
							this._dragScrollAmount > 0 ? (3 !== this._activeSelectionMode && (this._model.selectionEnd[0] = this._bufferService.cols), this._model.selectionEnd[1] = Math.min(e.ydisp + this._bufferService.rows, e.lines.length - 1)) : (3 !== this._activeSelectionMode && (this._model.selectionEnd[0] = 0), this._model.selectionEnd[1] = e.ydisp), this.refresh();
						}
					}
					_handleMouseUp(e) {
						const t = e.timeStamp - this._mouseDownTimeStamp;
						if (this._removeMouseDownListeners(), this.selectionText.length <= 1 && t < 500 && e.altKey && this._optionsService.rawOptions.altClickMovesCursor) {
							if (this._bufferService.buffer.ybase === this._bufferService.buffer.ydisp) {
								const t = this._mouseService.getCoords(e, this._element, this._bufferService.cols, this._bufferService.rows, !1);
								if (t && void 0 !== t[0] && void 0 !== t[1]) {
									const e = (0, o.moveToCellSequence)(t[0] - 1, t[1] - 1, this._bufferService, this._coreService.decPrivateModes.applicationCursorKeys);
									this._coreService.triggerDataEvent(e, !0);
								}
							}
						} else this._fireEventIfSelectionChanged();
					}
					_fireEventIfSelectionChanged() {
						const e = this._model.finalSelectionStart, t = this._model.finalSelectionEnd, i = !(!e || !t || e[0] === t[0] && e[1] === t[1]);
						i ? e && t && (this._oldSelectionStart && this._oldSelectionEnd && e[0] === this._oldSelectionStart[0] && e[1] === this._oldSelectionStart[1] && t[0] === this._oldSelectionEnd[0] && t[1] === this._oldSelectionEnd[1] || this._fireOnSelectionChange(e, t, i)) : this._oldHasSelection && this._fireOnSelectionChange(e, t, i);
					}
					_fireOnSelectionChange(e, t, i) {
						this._oldSelectionStart = e, this._oldSelectionEnd = t, this._oldHasSelection = i, this._onSelectionChange.fire();
					}
					_handleBufferActivate(e) {
						this.clearSelection(), this._trimListener.dispose(), this._trimListener = e.activeBuffer.lines.onTrim(((e) => this._handleTrim(e)));
					}
					_convertViewportColToCharacterIndex(e, t) {
						let i = t;
						for (let s = 0; t >= s; s++) {
							const r = e.loadCell(s, this._workCell).getChars().length;
							0 === this._workCell.getWidth() ? i-- : r > 1 && t !== s && (i += r - 1);
						}
						return i;
					}
					setSelection(e, t, i) {
						this._model.clearSelection(), this._removeMouseDownListeners(), this._model.selectionStart = [e, t], this._model.selectionStartLength = i, this.refresh(), this._fireEventIfSelectionChanged();
					}
					rightClickSelect(e) {
						this._isClickInSelection(e) || (this._selectWordAtCursor(e, !1) && this.refresh(!0), this._fireEventIfSelectionChanged());
					}
					_getWordAt(e, t, i = !0, s = !0) {
						if (e[0] >= this._bufferService.cols) return;
						const r = this._bufferService.buffer, n = r.lines.get(e[1]);
						if (!n) return;
						const o = r.translateBufferLineToString(e[1], !1);
						let a = this._convertViewportColToCharacterIndex(n, e[0]), h = a;
						const c = e[0] - a;
						let l = 0, d = 0, _ = 0, u = 0;
						if (" " === o.charAt(a)) {
							for (; a > 0 && " " === o.charAt(a - 1);) a--;
							for (; h < o.length && " " === o.charAt(h + 1);) h++;
						} else {
							let t = e[0], i = e[0];
							0 === n.getWidth(t) && (l++, t--), 2 === n.getWidth(i) && (d++, i++);
							const s = n.getString(i).length;
							for (s > 1 && (u += s - 1, h += s - 1); t > 0 && a > 0 && !this._isCharWordSeparator(n.loadCell(t - 1, this._workCell));) {
								n.loadCell(t - 1, this._workCell);
								const e = this._workCell.getChars().length;
								0 === this._workCell.getWidth() ? (l++, t--) : e > 1 && (_ += e - 1, a -= e - 1), a--, t--;
							}
							for (; i < n.length && h + 1 < o.length && !this._isCharWordSeparator(n.loadCell(i + 1, this._workCell));) {
								n.loadCell(i + 1, this._workCell);
								const e = this._workCell.getChars().length;
								2 === this._workCell.getWidth() ? (d++, i++) : e > 1 && (u += e - 1, h += e - 1), h++, i++;
							}
						}
						h++;
						let f = a + c - l + _, v = Math.min(this._bufferService.cols, h - a + l + d - _ - u);
						if (t || "" !== o.slice(a, h).trim()) {
							if (i && 0 === f && 32 !== n.getCodePoint(0)) {
								const t = r.lines.get(e[1] - 1);
								if (t && n.isWrapped && 32 !== t.getCodePoint(this._bufferService.cols - 1)) {
									const t = this._getWordAt([this._bufferService.cols - 1, e[1] - 1], !1, !0, !1);
									if (t) {
										const e = this._bufferService.cols - t.start;
										f -= e, v += e;
									}
								}
							}
							if (s && f + v === this._bufferService.cols && 32 !== n.getCodePoint(this._bufferService.cols - 1)) {
								const t = r.lines.get(e[1] + 1);
								if (t?.isWrapped && 32 !== t.getCodePoint(0)) {
									const t = this._getWordAt([0, e[1] + 1], !1, !1, !0);
									t && (v += t.length);
								}
							}
							return {
								start: f,
								length: v
							};
						}
					}
					_selectWordAt(e, t) {
						const i = this._getWordAt(e, t);
						if (i) {
							for (; i.start < 0;) i.start += this._bufferService.cols, e[1]--;
							this._model.selectionStart = [i.start, e[1]], this._model.selectionStartLength = i.length;
						}
					}
					_selectToWordAt(e) {
						const t = this._getWordAt(e, !0);
						if (t) {
							let i = e[1];
							for (; t.start < 0;) t.start += this._bufferService.cols, i--;
							if (!this._model.areSelectionValuesReversed()) for (; t.start + t.length > this._bufferService.cols;) t.length -= this._bufferService.cols, i++;
							this._model.selectionEnd = [this._model.areSelectionValuesReversed() ? t.start : t.start + t.length, i];
						}
					}
					_isCharWordSeparator(e) {
						return 0 !== e.getWidth() && this._optionsService.rawOptions.wordSeparator.indexOf(e.getChars()) >= 0;
					}
					_selectLineAt(e) {
						const t = this._bufferService.buffer.getWrappedRangeForLine(e), i = {
							start: {
								x: 0,
								y: t.first
							},
							end: {
								x: this._bufferService.cols - 1,
								y: t.last
							}
						};
						this._model.selectionStart = [0, t.first], this._model.selectionEnd = void 0, this._model.selectionStartLength = (0, _.getRangeLength)(i, this._bufferService.cols);
					}
				};
				t.SelectionService = g = s([
					r(3, f.IBufferService),
					r(4, f.ICoreService),
					r(5, h.IMouseService),
					r(6, f.IOptionsService),
					r(7, h.IRenderService),
					r(8, h.ICoreBrowserService)
				], g);
			},
			4725: (e, t, i) => {
				Object.defineProperty(t, "__esModule", { value: !0 }), t.ILinkProviderService = t.IThemeService = t.ICharacterJoinerService = t.ISelectionService = t.IRenderService = t.IMouseService = t.ICoreBrowserService = t.ICharSizeService = void 0;
				const s = i(8343);
				t.ICharSizeService = (0, s.createDecorator)("CharSizeService"), t.ICoreBrowserService = (0, s.createDecorator)("CoreBrowserService"), t.IMouseService = (0, s.createDecorator)("MouseService"), t.IRenderService = (0, s.createDecorator)("RenderService"), t.ISelectionService = (0, s.createDecorator)("SelectionService"), t.ICharacterJoinerService = (0, s.createDecorator)("CharacterJoinerService"), t.IThemeService = (0, s.createDecorator)("ThemeService"), t.ILinkProviderService = (0, s.createDecorator)("LinkProviderService");
			},
			6731: function(e, t, i) {
				var s = this && this.__decorate || function(e, t, i, s) {
					var r, n = arguments.length, o = n < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
					if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, i, s);
					else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (o = (n < 3 ? r(o) : n > 3 ? r(t, i, o) : r(t, i)) || o);
					return n > 3 && o && Object.defineProperty(t, i, o), o;
				}, r = this && this.__param || function(e, t) {
					return function(i, s) {
						t(i, s, e);
					};
				};
				Object.defineProperty(t, "__esModule", { value: !0 }), t.ThemeService = t.DEFAULT_ANSI_COLORS = void 0;
				const n = i(7239), o = i(8055), a = i(8460), h = i(844), c = i(2585), l = o.css.toColor("#ffffff"), d = o.css.toColor("#000000"), _ = o.css.toColor("#ffffff"), u = o.css.toColor("#000000"), f = {
					css: "rgba(255, 255, 255, 0.3)",
					rgba: 4294967117
				};
				t.DEFAULT_ANSI_COLORS = Object.freeze((() => {
					const e = [
						o.css.toColor("#2e3436"),
						o.css.toColor("#cc0000"),
						o.css.toColor("#4e9a06"),
						o.css.toColor("#c4a000"),
						o.css.toColor("#3465a4"),
						o.css.toColor("#75507b"),
						o.css.toColor("#06989a"),
						o.css.toColor("#d3d7cf"),
						o.css.toColor("#555753"),
						o.css.toColor("#ef2929"),
						o.css.toColor("#8ae234"),
						o.css.toColor("#fce94f"),
						o.css.toColor("#729fcf"),
						o.css.toColor("#ad7fa8"),
						o.css.toColor("#34e2e2"),
						o.css.toColor("#eeeeec")
					], t = [
						0,
						95,
						135,
						175,
						215,
						255
					];
					for (let i = 0; i < 216; i++) {
						const s = t[i / 36 % 6 | 0], r = t[i / 6 % 6 | 0], n = t[i % 6];
						e.push({
							css: o.channels.toCss(s, r, n),
							rgba: o.channels.toRgba(s, r, n)
						});
					}
					for (let t = 0; t < 24; t++) {
						const i = 8 + 10 * t;
						e.push({
							css: o.channels.toCss(i, i, i),
							rgba: o.channels.toRgba(i, i, i)
						});
					}
					return e;
				})());
				let v = t.ThemeService = class extends h.Disposable {
					get colors() {
						return this._colors;
					}
					constructor(e) {
						super(), this._optionsService = e, this._contrastCache = new n.ColorContrastCache(), this._halfContrastCache = new n.ColorContrastCache(), this._onChangeColors = this.register(new a.EventEmitter()), this.onChangeColors = this._onChangeColors.event, this._colors = {
							foreground: l,
							background: d,
							cursor: _,
							cursorAccent: u,
							selectionForeground: void 0,
							selectionBackgroundTransparent: f,
							selectionBackgroundOpaque: o.color.blend(d, f),
							selectionInactiveBackgroundTransparent: f,
							selectionInactiveBackgroundOpaque: o.color.blend(d, f),
							ansi: t.DEFAULT_ANSI_COLORS.slice(),
							contrastCache: this._contrastCache,
							halfContrastCache: this._halfContrastCache
						}, this._updateRestoreColors(), this._setTheme(this._optionsService.rawOptions.theme), this.register(this._optionsService.onSpecificOptionChange("minimumContrastRatio", (() => this._contrastCache.clear()))), this.register(this._optionsService.onSpecificOptionChange("theme", (() => this._setTheme(this._optionsService.rawOptions.theme))));
					}
					_setTheme(e = {}) {
						const i = this._colors;
						if (i.foreground = p(e.foreground, l), i.background = p(e.background, d), i.cursor = p(e.cursor, _), i.cursorAccent = p(e.cursorAccent, u), i.selectionBackgroundTransparent = p(e.selectionBackground, f), i.selectionBackgroundOpaque = o.color.blend(i.background, i.selectionBackgroundTransparent), i.selectionInactiveBackgroundTransparent = p(e.selectionInactiveBackground, i.selectionBackgroundTransparent), i.selectionInactiveBackgroundOpaque = o.color.blend(i.background, i.selectionInactiveBackgroundTransparent), i.selectionForeground = e.selectionForeground ? p(e.selectionForeground, o.NULL_COLOR) : void 0, i.selectionForeground === o.NULL_COLOR && (i.selectionForeground = void 0), o.color.isOpaque(i.selectionBackgroundTransparent)) i.selectionBackgroundTransparent = o.color.opacity(i.selectionBackgroundTransparent, .3);
						if (o.color.isOpaque(i.selectionInactiveBackgroundTransparent)) i.selectionInactiveBackgroundTransparent = o.color.opacity(i.selectionInactiveBackgroundTransparent, .3);
						if (i.ansi = t.DEFAULT_ANSI_COLORS.slice(), i.ansi[0] = p(e.black, t.DEFAULT_ANSI_COLORS[0]), i.ansi[1] = p(e.red, t.DEFAULT_ANSI_COLORS[1]), i.ansi[2] = p(e.green, t.DEFAULT_ANSI_COLORS[2]), i.ansi[3] = p(e.yellow, t.DEFAULT_ANSI_COLORS[3]), i.ansi[4] = p(e.blue, t.DEFAULT_ANSI_COLORS[4]), i.ansi[5] = p(e.magenta, t.DEFAULT_ANSI_COLORS[5]), i.ansi[6] = p(e.cyan, t.DEFAULT_ANSI_COLORS[6]), i.ansi[7] = p(e.white, t.DEFAULT_ANSI_COLORS[7]), i.ansi[8] = p(e.brightBlack, t.DEFAULT_ANSI_COLORS[8]), i.ansi[9] = p(e.brightRed, t.DEFAULT_ANSI_COLORS[9]), i.ansi[10] = p(e.brightGreen, t.DEFAULT_ANSI_COLORS[10]), i.ansi[11] = p(e.brightYellow, t.DEFAULT_ANSI_COLORS[11]), i.ansi[12] = p(e.brightBlue, t.DEFAULT_ANSI_COLORS[12]), i.ansi[13] = p(e.brightMagenta, t.DEFAULT_ANSI_COLORS[13]), i.ansi[14] = p(e.brightCyan, t.DEFAULT_ANSI_COLORS[14]), i.ansi[15] = p(e.brightWhite, t.DEFAULT_ANSI_COLORS[15]), e.extendedAnsi) {
							const s = Math.min(i.ansi.length - 16, e.extendedAnsi.length);
							for (let r = 0; r < s; r++) i.ansi[r + 16] = p(e.extendedAnsi[r], t.DEFAULT_ANSI_COLORS[r + 16]);
						}
						this._contrastCache.clear(), this._halfContrastCache.clear(), this._updateRestoreColors(), this._onChangeColors.fire(this.colors);
					}
					restoreColor(e) {
						this._restoreColor(e), this._onChangeColors.fire(this.colors);
					}
					_restoreColor(e) {
						if (void 0 !== e) switch (e) {
							case 256:
								this._colors.foreground = this._restoreColors.foreground;
								break;
							case 257:
								this._colors.background = this._restoreColors.background;
								break;
							case 258:
								this._colors.cursor = this._restoreColors.cursor;
								break;
							default: this._colors.ansi[e] = this._restoreColors.ansi[e];
						}
						else for (let e = 0; e < this._restoreColors.ansi.length; ++e) this._colors.ansi[e] = this._restoreColors.ansi[e];
					}
					modifyColors(e) {
						e(this._colors), this._onChangeColors.fire(this.colors);
					}
					_updateRestoreColors() {
						this._restoreColors = {
							foreground: this._colors.foreground,
							background: this._colors.background,
							cursor: this._colors.cursor,
							ansi: this._colors.ansi.slice()
						};
					}
				};
				function p(e, t) {
					if (void 0 !== e) try {
						return o.css.toColor(e);
					} catch {}
					return t;
				}
				t.ThemeService = v = s([r(0, c.IOptionsService)], v);
			},
			6349: (e, t, i) => {
				Object.defineProperty(t, "__esModule", { value: !0 }), t.CircularList = void 0;
				const s = i(8460), r = i(844);
				class n extends r.Disposable {
					constructor(e) {
						super(), this._maxLength = e, this.onDeleteEmitter = this.register(new s.EventEmitter()), this.onDelete = this.onDeleteEmitter.event, this.onInsertEmitter = this.register(new s.EventEmitter()), this.onInsert = this.onInsertEmitter.event, this.onTrimEmitter = this.register(new s.EventEmitter()), this.onTrim = this.onTrimEmitter.event, this._array = new Array(this._maxLength), this._startIndex = 0, this._length = 0;
					}
					get maxLength() {
						return this._maxLength;
					}
					set maxLength(e) {
						if (this._maxLength === e) return;
						const t = new Array(e);
						for (let i = 0; i < Math.min(e, this.length); i++) t[i] = this._array[this._getCyclicIndex(i)];
						this._array = t, this._maxLength = e, this._startIndex = 0;
					}
					get length() {
						return this._length;
					}
					set length(e) {
						if (e > this._length) for (let t = this._length; t < e; t++) this._array[t] = void 0;
						this._length = e;
					}
					get(e) {
						return this._array[this._getCyclicIndex(e)];
					}
					set(e, t) {
						this._array[this._getCyclicIndex(e)] = t;
					}
					push(e) {
						this._array[this._getCyclicIndex(this._length)] = e, this._length === this._maxLength ? (this._startIndex = ++this._startIndex % this._maxLength, this.onTrimEmitter.fire(1)) : this._length++;
					}
					recycle() {
						if (this._length !== this._maxLength) throw new Error("Can only recycle when the buffer is full");
						return this._startIndex = ++this._startIndex % this._maxLength, this.onTrimEmitter.fire(1), this._array[this._getCyclicIndex(this._length - 1)];
					}
					get isFull() {
						return this._length === this._maxLength;
					}
					pop() {
						return this._array[this._getCyclicIndex(this._length-- - 1)];
					}
					splice(e, t, ...i) {
						if (t) {
							for (let i = e; i < this._length - t; i++) this._array[this._getCyclicIndex(i)] = this._array[this._getCyclicIndex(i + t)];
							this._length -= t, this.onDeleteEmitter.fire({
								index: e,
								amount: t
							});
						}
						for (let t = this._length - 1; t >= e; t--) this._array[this._getCyclicIndex(t + i.length)] = this._array[this._getCyclicIndex(t)];
						for (let t = 0; t < i.length; t++) this._array[this._getCyclicIndex(e + t)] = i[t];
						if (i.length && this.onInsertEmitter.fire({
							index: e,
							amount: i.length
						}), this._length + i.length > this._maxLength) {
							const e = this._length + i.length - this._maxLength;
							this._startIndex += e, this._length = this._maxLength, this.onTrimEmitter.fire(e);
						} else this._length += i.length;
					}
					trimStart(e) {
						e > this._length && (e = this._length), this._startIndex += e, this._length -= e, this.onTrimEmitter.fire(e);
					}
					shiftElements(e, t, i) {
						if (!(t <= 0)) {
							if (e < 0 || e >= this._length) throw new Error("start argument out of range");
							if (e + i < 0) throw new Error("Cannot shift elements in list beyond index 0");
							if (i > 0) {
								for (let s = t - 1; s >= 0; s--) this.set(e + s + i, this.get(e + s));
								const s = e + t + i - this._length;
								if (s > 0) for (this._length += s; this._length > this._maxLength;) this._length--, this._startIndex++, this.onTrimEmitter.fire(1);
							} else for (let s = 0; s < t; s++) this.set(e + s + i, this.get(e + s));
						}
					}
					_getCyclicIndex(e) {
						return (this._startIndex + e) % this._maxLength;
					}
				}
				t.CircularList = n;
			},
			1439: (e, t) => {
				Object.defineProperty(t, "__esModule", { value: !0 }), t.clone = void 0, t.clone = function e(t, i = 5) {
					if ("object" != typeof t) return t;
					const s = Array.isArray(t) ? [] : {};
					for (const r in t) s[r] = i <= 1 ? t[r] : t[r] && e(t[r], i - 1);
					return s;
				};
			},
			8055: (e, t) => {
				Object.defineProperty(t, "__esModule", { value: !0 }), t.contrastRatio = t.toPaddedHex = t.rgba = t.rgb = t.css = t.color = t.channels = t.NULL_COLOR = void 0;
				let i = 0, s = 0, r = 0, n = 0;
				var o, a, h, c, l;
				function d(e) {
					const t = e.toString(16);
					return t.length < 2 ? "0" + t : t;
				}
				function _(e, t) {
					return e < t ? (t + .05) / (e + .05) : (e + .05) / (t + .05);
				}
				t.NULL_COLOR = {
					css: "#00000000",
					rgba: 0
				}, function(e) {
					e.toCss = function(e, t, i, s) {
						return void 0 !== s ? `#${d(e)}${d(t)}${d(i)}${d(s)}` : `#${d(e)}${d(t)}${d(i)}`;
					}, e.toRgba = function(e, t, i, s = 255) {
						return (e << 24 | t << 16 | i << 8 | s) >>> 0;
					}, e.toColor = function(t, i, s, r) {
						return {
							css: e.toCss(t, i, s, r),
							rgba: e.toRgba(t, i, s, r)
						};
					};
				}(o || (t.channels = o = {})), function(e) {
					function t(e, t) {
						return n = Math.round(255 * t), [i, s, r] = l.toChannels(e.rgba), {
							css: o.toCss(i, s, r, n),
							rgba: o.toRgba(i, s, r, n)
						};
					}
					e.blend = function(e, t) {
						if (n = (255 & t.rgba) / 255, 1 === n) return {
							css: t.css,
							rgba: t.rgba
						};
						const a = t.rgba >> 24 & 255, h = t.rgba >> 16 & 255, c = t.rgba >> 8 & 255, l = e.rgba >> 24 & 255, d = e.rgba >> 16 & 255, _ = e.rgba >> 8 & 255;
						return i = l + Math.round((a - l) * n), s = d + Math.round((h - d) * n), r = _ + Math.round((c - _) * n), {
							css: o.toCss(i, s, r),
							rgba: o.toRgba(i, s, r)
						};
					}, e.isOpaque = function(e) {
						return 255 == (255 & e.rgba);
					}, e.ensureContrastRatio = function(e, t, i) {
						const s = l.ensureContrastRatio(e.rgba, t.rgba, i);
						if (s) return o.toColor(s >> 24 & 255, s >> 16 & 255, s >> 8 & 255);
					}, e.opaque = function(e) {
						const t = (255 | e.rgba) >>> 0;
						return [i, s, r] = l.toChannels(t), {
							css: o.toCss(i, s, r),
							rgba: t
						};
					}, e.opacity = t, e.multiplyOpacity = function(e, i) {
						return n = 255 & e.rgba, t(e, n * i / 255);
					}, e.toColorRGB = function(e) {
						return [
							e.rgba >> 24 & 255,
							e.rgba >> 16 & 255,
							e.rgba >> 8 & 255
						];
					};
				}(a || (t.color = a = {})), function(e) {
					let t, a;
					try {
						const e = document.createElement("canvas");
						e.width = 1, e.height = 1;
						const i = e.getContext("2d", { willReadFrequently: !0 });
						i && (t = i, t.globalCompositeOperation = "copy", a = t.createLinearGradient(0, 0, 1, 1));
					} catch {}
					e.toColor = function(e) {
						if (e.match(/#[\da-f]{3,8}/i)) switch (e.length) {
							case 4: return i = parseInt(e.slice(1, 2).repeat(2), 16), s = parseInt(e.slice(2, 3).repeat(2), 16), r = parseInt(e.slice(3, 4).repeat(2), 16), o.toColor(i, s, r);
							case 5: return i = parseInt(e.slice(1, 2).repeat(2), 16), s = parseInt(e.slice(2, 3).repeat(2), 16), r = parseInt(e.slice(3, 4).repeat(2), 16), n = parseInt(e.slice(4, 5).repeat(2), 16), o.toColor(i, s, r, n);
							case 7: return {
								css: e,
								rgba: (parseInt(e.slice(1), 16) << 8 | 255) >>> 0
							};
							case 9: return {
								css: e,
								rgba: parseInt(e.slice(1), 16) >>> 0
							};
						}
						const h = e.match(/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(,\s*(0|1|\d?\.(\d+))\s*)?\)/);
						if (h) return i = parseInt(h[1]), s = parseInt(h[2]), r = parseInt(h[3]), n = Math.round(255 * (void 0 === h[5] ? 1 : parseFloat(h[5]))), o.toColor(i, s, r, n);
						if (!t || !a) throw new Error("css.toColor: Unsupported css format");
						if (t.fillStyle = a, t.fillStyle = e, "string" != typeof t.fillStyle) throw new Error("css.toColor: Unsupported css format");
						if (t.fillRect(0, 0, 1, 1), [i, s, r, n] = t.getImageData(0, 0, 1, 1).data, 255 !== n) throw new Error("css.toColor: Unsupported css format");
						return {
							rgba: o.toRgba(i, s, r, n),
							css: e
						};
					};
				}(h || (t.css = h = {})), function(e) {
					function t(e, t, i) {
						const s = e / 255, r = t / 255, n = i / 255;
						return .2126 * (s <= .03928 ? s / 12.92 : Math.pow((s + .055) / 1.055, 2.4)) + .7152 * (r <= .03928 ? r / 12.92 : Math.pow((r + .055) / 1.055, 2.4)) + .0722 * (n <= .03928 ? n / 12.92 : Math.pow((n + .055) / 1.055, 2.4));
					}
					e.relativeLuminance = function(e) {
						return t(e >> 16 & 255, e >> 8 & 255, 255 & e);
					}, e.relativeLuminance2 = t;
				}(c || (t.rgb = c = {})), function(e) {
					function t(e, t, i) {
						const s = e >> 24 & 255, r = e >> 16 & 255, n = e >> 8 & 255;
						let o = t >> 24 & 255, a = t >> 16 & 255, h = t >> 8 & 255, l = _(c.relativeLuminance2(o, a, h), c.relativeLuminance2(s, r, n));
						for (; l < i && (o > 0 || a > 0 || h > 0);) o -= Math.max(0, Math.ceil(.1 * o)), a -= Math.max(0, Math.ceil(.1 * a)), h -= Math.max(0, Math.ceil(.1 * h)), l = _(c.relativeLuminance2(o, a, h), c.relativeLuminance2(s, r, n));
						return (o << 24 | a << 16 | h << 8 | 255) >>> 0;
					}
					function a(e, t, i) {
						const s = e >> 24 & 255, r = e >> 16 & 255, n = e >> 8 & 255;
						let o = t >> 24 & 255, a = t >> 16 & 255, h = t >> 8 & 255, l = _(c.relativeLuminance2(o, a, h), c.relativeLuminance2(s, r, n));
						for (; l < i && (o < 255 || a < 255 || h < 255);) o = Math.min(255, o + Math.ceil(.1 * (255 - o))), a = Math.min(255, a + Math.ceil(.1 * (255 - a))), h = Math.min(255, h + Math.ceil(.1 * (255 - h))), l = _(c.relativeLuminance2(o, a, h), c.relativeLuminance2(s, r, n));
						return (o << 24 | a << 16 | h << 8 | 255) >>> 0;
					}
					e.blend = function(e, t) {
						if (n = (255 & t) / 255, 1 === n) return t;
						const a = t >> 24 & 255, h = t >> 16 & 255, c = t >> 8 & 255, l = e >> 24 & 255, d = e >> 16 & 255, _ = e >> 8 & 255;
						return i = l + Math.round((a - l) * n), s = d + Math.round((h - d) * n), r = _ + Math.round((c - _) * n), o.toRgba(i, s, r);
					}, e.ensureContrastRatio = function(e, i, s) {
						const r = c.relativeLuminance(e >> 8), n = c.relativeLuminance(i >> 8);
						if (_(r, n) < s) {
							if (n < r) {
								const n = t(e, i, s), o = _(r, c.relativeLuminance(n >> 8));
								if (o < s) {
									const t = a(e, i, s);
									return o > _(r, c.relativeLuminance(t >> 8)) ? n : t;
								}
								return n;
							}
							const o = a(e, i, s), h = _(r, c.relativeLuminance(o >> 8));
							if (h < s) {
								const n = t(e, i, s);
								return h > _(r, c.relativeLuminance(n >> 8)) ? o : n;
							}
							return o;
						}
					}, e.reduceLuminance = t, e.increaseLuminance = a, e.toChannels = function(e) {
						return [
							e >> 24 & 255,
							e >> 16 & 255,
							e >> 8 & 255,
							255 & e
						];
					};
				}(l || (t.rgba = l = {})), t.toPaddedHex = d, t.contrastRatio = _;
			},
			8969: (e, t, i) => {
				Object.defineProperty(t, "__esModule", { value: !0 }), t.CoreTerminal = void 0;
				const s = i(844), r = i(2585), n = i(4348), o = i(7866), a = i(744), h = i(7302), c = i(6975), l = i(8460), d = i(1753), _ = i(1480), u = i(7994), f = i(9282), v = i(5435), p = i(5981), g = i(2660);
				let m = !1;
				class S extends s.Disposable {
					get onScroll() {
						return this._onScrollApi || (this._onScrollApi = this.register(new l.EventEmitter()), this._onScroll.event(((e) => {
							this._onScrollApi?.fire(e.position);
						}))), this._onScrollApi.event;
					}
					get cols() {
						return this._bufferService.cols;
					}
					get rows() {
						return this._bufferService.rows;
					}
					get buffers() {
						return this._bufferService.buffers;
					}
					get options() {
						return this.optionsService.options;
					}
					set options(e) {
						for (const t in e) this.optionsService.options[t] = e[t];
					}
					constructor(e) {
						super(), this._windowsWrappingHeuristics = this.register(new s.MutableDisposable()), this._onBinary = this.register(new l.EventEmitter()), this.onBinary = this._onBinary.event, this._onData = this.register(new l.EventEmitter()), this.onData = this._onData.event, this._onLineFeed = this.register(new l.EventEmitter()), this.onLineFeed = this._onLineFeed.event, this._onResize = this.register(new l.EventEmitter()), this.onResize = this._onResize.event, this._onWriteParsed = this.register(new l.EventEmitter()), this.onWriteParsed = this._onWriteParsed.event, this._onScroll = this.register(new l.EventEmitter()), this._instantiationService = new n.InstantiationService(), this.optionsService = this.register(new h.OptionsService(e)), this._instantiationService.setService(r.IOptionsService, this.optionsService), this._bufferService = this.register(this._instantiationService.createInstance(a.BufferService)), this._instantiationService.setService(r.IBufferService, this._bufferService), this._logService = this.register(this._instantiationService.createInstance(o.LogService)), this._instantiationService.setService(r.ILogService, this._logService), this.coreService = this.register(this._instantiationService.createInstance(c.CoreService)), this._instantiationService.setService(r.ICoreService, this.coreService), this.coreMouseService = this.register(this._instantiationService.createInstance(d.CoreMouseService)), this._instantiationService.setService(r.ICoreMouseService, this.coreMouseService), this.unicodeService = this.register(this._instantiationService.createInstance(_.UnicodeService)), this._instantiationService.setService(r.IUnicodeService, this.unicodeService), this._charsetService = this._instantiationService.createInstance(u.CharsetService), this._instantiationService.setService(r.ICharsetService, this._charsetService), this._oscLinkService = this._instantiationService.createInstance(g.OscLinkService), this._instantiationService.setService(r.IOscLinkService, this._oscLinkService), this._inputHandler = this.register(new v.InputHandler(this._bufferService, this._charsetService, this.coreService, this._logService, this.optionsService, this._oscLinkService, this.coreMouseService, this.unicodeService)), this.register((0, l.forwardEvent)(this._inputHandler.onLineFeed, this._onLineFeed)), this.register(this._inputHandler), this.register((0, l.forwardEvent)(this._bufferService.onResize, this._onResize)), this.register((0, l.forwardEvent)(this.coreService.onData, this._onData)), this.register((0, l.forwardEvent)(this.coreService.onBinary, this._onBinary)), this.register(this.coreService.onRequestScrollToBottom((() => this.scrollToBottom()))), this.register(this.coreService.onUserInput((() => this._writeBuffer.handleUserInput()))), this.register(this.optionsService.onMultipleOptionChange(["windowsMode", "windowsPty"], (() => this._handleWindowsPtyOptionChange()))), this.register(this._bufferService.onScroll(((e) => {
							this._onScroll.fire({
								position: this._bufferService.buffer.ydisp,
								source: 0
							}), this._inputHandler.markRangeDirty(this._bufferService.buffer.scrollTop, this._bufferService.buffer.scrollBottom);
						}))), this.register(this._inputHandler.onScroll(((e) => {
							this._onScroll.fire({
								position: this._bufferService.buffer.ydisp,
								source: 0
							}), this._inputHandler.markRangeDirty(this._bufferService.buffer.scrollTop, this._bufferService.buffer.scrollBottom);
						}))), this._writeBuffer = this.register(new p.WriteBuffer(((e, t) => this._inputHandler.parse(e, t)))), this.register((0, l.forwardEvent)(this._writeBuffer.onWriteParsed, this._onWriteParsed));
					}
					write(e, t) {
						this._writeBuffer.write(e, t);
					}
					writeSync(e, t) {
						this._logService.logLevel <= r.LogLevelEnum.WARN && !m && (this._logService.warn("writeSync is unreliable and will be removed soon."), m = !0), this._writeBuffer.writeSync(e, t);
					}
					input(e, t = !0) {
						this.coreService.triggerDataEvent(e, t);
					}
					resize(e, t) {
						isNaN(e) || isNaN(t) || (e = Math.max(e, a.MINIMUM_COLS), t = Math.max(t, a.MINIMUM_ROWS), this._bufferService.resize(e, t));
					}
					scroll(e, t = !1) {
						this._bufferService.scroll(e, t);
					}
					scrollLines(e, t, i) {
						this._bufferService.scrollLines(e, t, i);
					}
					scrollPages(e) {
						this.scrollLines(e * (this.rows - 1));
					}
					scrollToTop() {
						this.scrollLines(-this._bufferService.buffer.ydisp);
					}
					scrollToBottom() {
						this.scrollLines(this._bufferService.buffer.ybase - this._bufferService.buffer.ydisp);
					}
					scrollToLine(e) {
						const t = e - this._bufferService.buffer.ydisp;
						0 !== t && this.scrollLines(t);
					}
					registerEscHandler(e, t) {
						return this._inputHandler.registerEscHandler(e, t);
					}
					registerDcsHandler(e, t) {
						return this._inputHandler.registerDcsHandler(e, t);
					}
					registerCsiHandler(e, t) {
						return this._inputHandler.registerCsiHandler(e, t);
					}
					registerOscHandler(e, t) {
						return this._inputHandler.registerOscHandler(e, t);
					}
					_setup() {
						this._handleWindowsPtyOptionChange();
					}
					reset() {
						this._inputHandler.reset(), this._bufferService.reset(), this._charsetService.reset(), this.coreService.reset(), this.coreMouseService.reset();
					}
					_handleWindowsPtyOptionChange() {
						let e = !1;
						const t = this.optionsService.rawOptions.windowsPty;
						t && void 0 !== t.buildNumber && void 0 !== t.buildNumber ? e = !!("conpty" === t.backend && t.buildNumber < 21376) : this.optionsService.rawOptions.windowsMode && (e = !0), e ? this._enableWindowsWrappingHeuristics() : this._windowsWrappingHeuristics.clear();
					}
					_enableWindowsWrappingHeuristics() {
						if (!this._windowsWrappingHeuristics.value) {
							const e = [];
							e.push(this.onLineFeed(f.updateWindowsModeWrappedState.bind(null, this._bufferService))), e.push(this.registerCsiHandler({ final: "H" }, (() => ((0, f.updateWindowsModeWrappedState)(this._bufferService), !1)))), this._windowsWrappingHeuristics.value = (0, s.toDisposable)((() => {
								for (const t of e) t.dispose();
							}));
						}
					}
				}
				t.CoreTerminal = S;
			},
			8460: (e, t) => {
				Object.defineProperty(t, "__esModule", { value: !0 }), t.runAndSubscribe = t.forwardEvent = t.EventEmitter = void 0, t.EventEmitter = class {
					constructor() {
						this._listeners = [], this._disposed = !1;
					}
					get event() {
						return this._event || (this._event = (e) => (this._listeners.push(e), { dispose: () => {
							if (!this._disposed) {
								for (let t = 0; t < this._listeners.length; t++) if (this._listeners[t] === e) return void this._listeners.splice(t, 1);
							}
						} })), this._event;
					}
					fire(e, t) {
						const i = [];
						for (let e = 0; e < this._listeners.length; e++) i.push(this._listeners[e]);
						for (let s = 0; s < i.length; s++) i[s].call(void 0, e, t);
					}
					dispose() {
						this.clearListeners(), this._disposed = !0;
					}
					clearListeners() {
						this._listeners && (this._listeners.length = 0);
					}
				}, t.forwardEvent = function(e, t) {
					return e(((e) => t.fire(e)));
				}, t.runAndSubscribe = function(e, t) {
					return t(void 0), e(((e) => t(e)));
				};
			},
			5435: function(e, t, i) {
				var s = this && this.__decorate || function(e, t, i, s) {
					var r, n = arguments.length, o = n < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
					if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, i, s);
					else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (o = (n < 3 ? r(o) : n > 3 ? r(t, i, o) : r(t, i)) || o);
					return n > 3 && o && Object.defineProperty(t, i, o), o;
				}, r = this && this.__param || function(e, t) {
					return function(i, s) {
						t(i, s, e);
					};
				};
				Object.defineProperty(t, "__esModule", { value: !0 }), t.InputHandler = t.WindowsOptionsReportType = void 0;
				const n = i(2584), o = i(7116), a = i(2015), h = i(844), c = i(482), l = i(8437), d = i(8460), _ = i(643), u = i(511), f = i(3734), v = i(2585), p = i(1480), g = i(6242), m = i(6351), S = i(5941), C = {
					"(": 0,
					")": 1,
					"*": 2,
					"+": 3,
					"-": 1,
					".": 2
				}, b = 131072;
				function w(e, t) {
					if (e > 24) return t.setWinLines || !1;
					switch (e) {
						case 1: return !!t.restoreWin;
						case 2: return !!t.minimizeWin;
						case 3: return !!t.setWinPosition;
						case 4: return !!t.setWinSizePixels;
						case 5: return !!t.raiseWin;
						case 6: return !!t.lowerWin;
						case 7: return !!t.refreshWin;
						case 8: return !!t.setWinSizeChars;
						case 9: return !!t.maximizeWin;
						case 10: return !!t.fullscreenWin;
						case 11: return !!t.getWinState;
						case 13: return !!t.getWinPosition;
						case 14: return !!t.getWinSizePixels;
						case 15: return !!t.getScreenSizePixels;
						case 16: return !!t.getCellSizePixels;
						case 18: return !!t.getWinSizeChars;
						case 19: return !!t.getScreenSizeChars;
						case 20: return !!t.getIconTitle;
						case 21: return !!t.getWinTitle;
						case 22: return !!t.pushTitle;
						case 23: return !!t.popTitle;
						case 24: return !!t.setWinLines;
					}
					return !1;
				}
				var y;
				(function(e) {
					e[e.GET_WIN_SIZE_PIXELS = 0] = "GET_WIN_SIZE_PIXELS", e[e.GET_CELL_SIZE_PIXELS = 1] = "GET_CELL_SIZE_PIXELS";
				})(y || (t.WindowsOptionsReportType = y = {}));
				let E = 0;
				class k extends h.Disposable {
					getAttrData() {
						return this._curAttrData;
					}
					constructor(e, t, i, s, r, h, _, f, v = new a.EscapeSequenceParser()) {
						super(), this._bufferService = e, this._charsetService = t, this._coreService = i, this._logService = s, this._optionsService = r, this._oscLinkService = h, this._coreMouseService = _, this._unicodeService = f, this._parser = v, this._parseBuffer = /* @__PURE__ */ new Uint32Array(4096), this._stringDecoder = new c.StringToUtf32(), this._utf8Decoder = new c.Utf8ToUtf32(), this._workCell = new u.CellData(), this._windowTitle = "", this._iconName = "", this._windowTitleStack = [], this._iconNameStack = [], this._curAttrData = l.DEFAULT_ATTR_DATA.clone(), this._eraseAttrDataInternal = l.DEFAULT_ATTR_DATA.clone(), this._onRequestBell = this.register(new d.EventEmitter()), this.onRequestBell = this._onRequestBell.event, this._onRequestRefreshRows = this.register(new d.EventEmitter()), this.onRequestRefreshRows = this._onRequestRefreshRows.event, this._onRequestReset = this.register(new d.EventEmitter()), this.onRequestReset = this._onRequestReset.event, this._onRequestSendFocus = this.register(new d.EventEmitter()), this.onRequestSendFocus = this._onRequestSendFocus.event, this._onRequestSyncScrollBar = this.register(new d.EventEmitter()), this.onRequestSyncScrollBar = this._onRequestSyncScrollBar.event, this._onRequestWindowsOptionsReport = this.register(new d.EventEmitter()), this.onRequestWindowsOptionsReport = this._onRequestWindowsOptionsReport.event, this._onA11yChar = this.register(new d.EventEmitter()), this.onA11yChar = this._onA11yChar.event, this._onA11yTab = this.register(new d.EventEmitter()), this.onA11yTab = this._onA11yTab.event, this._onCursorMove = this.register(new d.EventEmitter()), this.onCursorMove = this._onCursorMove.event, this._onLineFeed = this.register(new d.EventEmitter()), this.onLineFeed = this._onLineFeed.event, this._onScroll = this.register(new d.EventEmitter()), this.onScroll = this._onScroll.event, this._onTitleChange = this.register(new d.EventEmitter()), this.onTitleChange = this._onTitleChange.event, this._onColor = this.register(new d.EventEmitter()), this.onColor = this._onColor.event, this._parseStack = {
							paused: !1,
							cursorStartX: 0,
							cursorStartY: 0,
							decodedLength: 0,
							position: 0
						}, this._specialColors = [
							256,
							257,
							258
						], this.register(this._parser), this._dirtyRowTracker = new L(this._bufferService), this._activeBuffer = this._bufferService.buffer, this.register(this._bufferService.buffers.onBufferActivate(((e) => this._activeBuffer = e.activeBuffer))), this._parser.setCsiHandlerFallback(((e, t) => {
							this._logService.debug("Unknown CSI code: ", {
								identifier: this._parser.identToString(e),
								params: t.toArray()
							});
						})), this._parser.setEscHandlerFallback(((e) => {
							this._logService.debug("Unknown ESC code: ", { identifier: this._parser.identToString(e) });
						})), this._parser.setExecuteHandlerFallback(((e) => {
							this._logService.debug("Unknown EXECUTE code: ", { code: e });
						})), this._parser.setOscHandlerFallback(((e, t, i) => {
							this._logService.debug("Unknown OSC code: ", {
								identifier: e,
								action: t,
								data: i
							});
						})), this._parser.setDcsHandlerFallback(((e, t, i) => {
							"HOOK" === t && (i = i.toArray()), this._logService.debug("Unknown DCS code: ", {
								identifier: this._parser.identToString(e),
								action: t,
								payload: i
							});
						})), this._parser.setPrintHandler(((e, t, i) => this.print(e, t, i))), this._parser.registerCsiHandler({ final: "@" }, ((e) => this.insertChars(e))), this._parser.registerCsiHandler({
							intermediates: " ",
							final: "@"
						}, ((e) => this.scrollLeft(e))), this._parser.registerCsiHandler({ final: "A" }, ((e) => this.cursorUp(e))), this._parser.registerCsiHandler({
							intermediates: " ",
							final: "A"
						}, ((e) => this.scrollRight(e))), this._parser.registerCsiHandler({ final: "B" }, ((e) => this.cursorDown(e))), this._parser.registerCsiHandler({ final: "C" }, ((e) => this.cursorForward(e))), this._parser.registerCsiHandler({ final: "D" }, ((e) => this.cursorBackward(e))), this._parser.registerCsiHandler({ final: "E" }, ((e) => this.cursorNextLine(e))), this._parser.registerCsiHandler({ final: "F" }, ((e) => this.cursorPrecedingLine(e))), this._parser.registerCsiHandler({ final: "G" }, ((e) => this.cursorCharAbsolute(e))), this._parser.registerCsiHandler({ final: "H" }, ((e) => this.cursorPosition(e))), this._parser.registerCsiHandler({ final: "I" }, ((e) => this.cursorForwardTab(e))), this._parser.registerCsiHandler({ final: "J" }, ((e) => this.eraseInDisplay(e, !1))), this._parser.registerCsiHandler({
							prefix: "?",
							final: "J"
						}, ((e) => this.eraseInDisplay(e, !0))), this._parser.registerCsiHandler({ final: "K" }, ((e) => this.eraseInLine(e, !1))), this._parser.registerCsiHandler({
							prefix: "?",
							final: "K"
						}, ((e) => this.eraseInLine(e, !0))), this._parser.registerCsiHandler({ final: "L" }, ((e) => this.insertLines(e))), this._parser.registerCsiHandler({ final: "M" }, ((e) => this.deleteLines(e))), this._parser.registerCsiHandler({ final: "P" }, ((e) => this.deleteChars(e))), this._parser.registerCsiHandler({ final: "S" }, ((e) => this.scrollUp(e))), this._parser.registerCsiHandler({ final: "T" }, ((e) => this.scrollDown(e))), this._parser.registerCsiHandler({ final: "X" }, ((e) => this.eraseChars(e))), this._parser.registerCsiHandler({ final: "Z" }, ((e) => this.cursorBackwardTab(e))), this._parser.registerCsiHandler({ final: "`" }, ((e) => this.charPosAbsolute(e))), this._parser.registerCsiHandler({ final: "a" }, ((e) => this.hPositionRelative(e))), this._parser.registerCsiHandler({ final: "b" }, ((e) => this.repeatPrecedingCharacter(e))), this._parser.registerCsiHandler({ final: "c" }, ((e) => this.sendDeviceAttributesPrimary(e))), this._parser.registerCsiHandler({
							prefix: ">",
							final: "c"
						}, ((e) => this.sendDeviceAttributesSecondary(e))), this._parser.registerCsiHandler({ final: "d" }, ((e) => this.linePosAbsolute(e))), this._parser.registerCsiHandler({ final: "e" }, ((e) => this.vPositionRelative(e))), this._parser.registerCsiHandler({ final: "f" }, ((e) => this.hVPosition(e))), this._parser.registerCsiHandler({ final: "g" }, ((e) => this.tabClear(e))), this._parser.registerCsiHandler({ final: "h" }, ((e) => this.setMode(e))), this._parser.registerCsiHandler({
							prefix: "?",
							final: "h"
						}, ((e) => this.setModePrivate(e))), this._parser.registerCsiHandler({ final: "l" }, ((e) => this.resetMode(e))), this._parser.registerCsiHandler({
							prefix: "?",
							final: "l"
						}, ((e) => this.resetModePrivate(e))), this._parser.registerCsiHandler({ final: "m" }, ((e) => this.charAttributes(e))), this._parser.registerCsiHandler({ final: "n" }, ((e) => this.deviceStatus(e))), this._parser.registerCsiHandler({
							prefix: "?",
							final: "n"
						}, ((e) => this.deviceStatusPrivate(e))), this._parser.registerCsiHandler({
							intermediates: "!",
							final: "p"
						}, ((e) => this.softReset(e))), this._parser.registerCsiHandler({
							intermediates: " ",
							final: "q"
						}, ((e) => this.setCursorStyle(e))), this._parser.registerCsiHandler({ final: "r" }, ((e) => this.setScrollRegion(e))), this._parser.registerCsiHandler({ final: "s" }, ((e) => this.saveCursor(e))), this._parser.registerCsiHandler({ final: "t" }, ((e) => this.windowOptions(e))), this._parser.registerCsiHandler({ final: "u" }, ((e) => this.restoreCursor(e))), this._parser.registerCsiHandler({
							intermediates: "'",
							final: "}"
						}, ((e) => this.insertColumns(e))), this._parser.registerCsiHandler({
							intermediates: "'",
							final: "~"
						}, ((e) => this.deleteColumns(e))), this._parser.registerCsiHandler({
							intermediates: "\"",
							final: "q"
						}, ((e) => this.selectProtected(e))), this._parser.registerCsiHandler({
							intermediates: "$",
							final: "p"
						}, ((e) => this.requestMode(e, !0))), this._parser.registerCsiHandler({
							prefix: "?",
							intermediates: "$",
							final: "p"
						}, ((e) => this.requestMode(e, !1))), this._parser.setExecuteHandler(n.C0.BEL, (() => this.bell())), this._parser.setExecuteHandler(n.C0.LF, (() => this.lineFeed())), this._parser.setExecuteHandler(n.C0.VT, (() => this.lineFeed())), this._parser.setExecuteHandler(n.C0.FF, (() => this.lineFeed())), this._parser.setExecuteHandler(n.C0.CR, (() => this.carriageReturn())), this._parser.setExecuteHandler(n.C0.BS, (() => this.backspace())), this._parser.setExecuteHandler(n.C0.HT, (() => this.tab())), this._parser.setExecuteHandler(n.C0.SO, (() => this.shiftOut())), this._parser.setExecuteHandler(n.C0.SI, (() => this.shiftIn())), this._parser.setExecuteHandler(n.C1.IND, (() => this.index())), this._parser.setExecuteHandler(n.C1.NEL, (() => this.nextLine())), this._parser.setExecuteHandler(n.C1.HTS, (() => this.tabSet())), this._parser.registerOscHandler(0, new g.OscHandler(((e) => (this.setTitle(e), this.setIconName(e), !0)))), this._parser.registerOscHandler(1, new g.OscHandler(((e) => this.setIconName(e)))), this._parser.registerOscHandler(2, new g.OscHandler(((e) => this.setTitle(e)))), this._parser.registerOscHandler(4, new g.OscHandler(((e) => this.setOrReportIndexedColor(e)))), this._parser.registerOscHandler(8, new g.OscHandler(((e) => this.setHyperlink(e)))), this._parser.registerOscHandler(10, new g.OscHandler(((e) => this.setOrReportFgColor(e)))), this._parser.registerOscHandler(11, new g.OscHandler(((e) => this.setOrReportBgColor(e)))), this._parser.registerOscHandler(12, new g.OscHandler(((e) => this.setOrReportCursorColor(e)))), this._parser.registerOscHandler(104, new g.OscHandler(((e) => this.restoreIndexedColor(e)))), this._parser.registerOscHandler(110, new g.OscHandler(((e) => this.restoreFgColor(e)))), this._parser.registerOscHandler(111, new g.OscHandler(((e) => this.restoreBgColor(e)))), this._parser.registerOscHandler(112, new g.OscHandler(((e) => this.restoreCursorColor(e)))), this._parser.registerEscHandler({ final: "7" }, (() => this.saveCursor())), this._parser.registerEscHandler({ final: "8" }, (() => this.restoreCursor())), this._parser.registerEscHandler({ final: "D" }, (() => this.index())), this._parser.registerEscHandler({ final: "E" }, (() => this.nextLine())), this._parser.registerEscHandler({ final: "H" }, (() => this.tabSet())), this._parser.registerEscHandler({ final: "M" }, (() => this.reverseIndex())), this._parser.registerEscHandler({ final: "=" }, (() => this.keypadApplicationMode())), this._parser.registerEscHandler({ final: ">" }, (() => this.keypadNumericMode())), this._parser.registerEscHandler({ final: "c" }, (() => this.fullReset())), this._parser.registerEscHandler({ final: "n" }, (() => this.setgLevel(2))), this._parser.registerEscHandler({ final: "o" }, (() => this.setgLevel(3))), this._parser.registerEscHandler({ final: "|" }, (() => this.setgLevel(3))), this._parser.registerEscHandler({ final: "}" }, (() => this.setgLevel(2))), this._parser.registerEscHandler({ final: "~" }, (() => this.setgLevel(1))), this._parser.registerEscHandler({
							intermediates: "%",
							final: "@"
						}, (() => this.selectDefaultCharset())), this._parser.registerEscHandler({
							intermediates: "%",
							final: "G"
						}, (() => this.selectDefaultCharset()));
						for (const e in o.CHARSETS) this._parser.registerEscHandler({
							intermediates: "(",
							final: e
						}, (() => this.selectCharset("(" + e))), this._parser.registerEscHandler({
							intermediates: ")",
							final: e
						}, (() => this.selectCharset(")" + e))), this._parser.registerEscHandler({
							intermediates: "*",
							final: e
						}, (() => this.selectCharset("*" + e))), this._parser.registerEscHandler({
							intermediates: "+",
							final: e
						}, (() => this.selectCharset("+" + e))), this._parser.registerEscHandler({
							intermediates: "-",
							final: e
						}, (() => this.selectCharset("-" + e))), this._parser.registerEscHandler({
							intermediates: ".",
							final: e
						}, (() => this.selectCharset("." + e))), this._parser.registerEscHandler({
							intermediates: "/",
							final: e
						}, (() => this.selectCharset("/" + e)));
						this._parser.registerEscHandler({
							intermediates: "#",
							final: "8"
						}, (() => this.screenAlignmentPattern())), this._parser.setErrorHandler(((e) => (this._logService.error("Parsing error: ", e), e))), this._parser.registerDcsHandler({
							intermediates: "$",
							final: "q"
						}, new m.DcsHandler(((e, t) => this.requestStatusString(e, t))));
					}
					_preserveStack(e, t, i, s) {
						this._parseStack.paused = !0, this._parseStack.cursorStartX = e, this._parseStack.cursorStartY = t, this._parseStack.decodedLength = i, this._parseStack.position = s;
					}
					_logSlowResolvingAsync(e) {
						this._logService.logLevel <= v.LogLevelEnum.WARN && Promise.race([e, new Promise(((e, t) => setTimeout((() => t("#SLOW_TIMEOUT")), 5e3)))]).catch(((e) => {
							if ("#SLOW_TIMEOUT" !== e) throw e;
							console.warn("async parser handler taking longer than 5000 ms");
						}));
					}
					_getCurrentLinkId() {
						return this._curAttrData.extended.urlId;
					}
					parse(e, t) {
						let i, s = this._activeBuffer.x, r = this._activeBuffer.y, n = 0;
						const o = this._parseStack.paused;
						if (o) {
							if (i = this._parser.parse(this._parseBuffer, this._parseStack.decodedLength, t)) return this._logSlowResolvingAsync(i), i;
							s = this._parseStack.cursorStartX, r = this._parseStack.cursorStartY, this._parseStack.paused = !1, e.length > b && (n = this._parseStack.position + b);
						}
						if (this._logService.logLevel <= v.LogLevelEnum.DEBUG && this._logService.debug("parsing data" + ("string" == typeof e ? ` "${e}"` : ` "${Array.prototype.map.call(e, ((e) => String.fromCharCode(e))).join("")}"`), "string" == typeof e ? e.split("").map(((e) => e.charCodeAt(0))) : e), this._parseBuffer.length < e.length && this._parseBuffer.length < b && (this._parseBuffer = new Uint32Array(Math.min(e.length, b))), o || this._dirtyRowTracker.clearRange(), e.length > b) for (let t = n; t < e.length; t += b) {
							const n = t + b < e.length ? t + b : e.length, o = "string" == typeof e ? this._stringDecoder.decode(e.substring(t, n), this._parseBuffer) : this._utf8Decoder.decode(e.subarray(t, n), this._parseBuffer);
							if (i = this._parser.parse(this._parseBuffer, o)) return this._preserveStack(s, r, o, t), this._logSlowResolvingAsync(i), i;
						}
						else if (!o) {
							const t = "string" == typeof e ? this._stringDecoder.decode(e, this._parseBuffer) : this._utf8Decoder.decode(e, this._parseBuffer);
							if (i = this._parser.parse(this._parseBuffer, t)) return this._preserveStack(s, r, t, 0), this._logSlowResolvingAsync(i), i;
						}
						this._activeBuffer.x === s && this._activeBuffer.y === r || this._onCursorMove.fire();
						const a = this._dirtyRowTracker.end + (this._bufferService.buffer.ybase - this._bufferService.buffer.ydisp), h = this._dirtyRowTracker.start + (this._bufferService.buffer.ybase - this._bufferService.buffer.ydisp);
						h < this._bufferService.rows && this._onRequestRefreshRows.fire(Math.min(h, this._bufferService.rows - 1), Math.min(a, this._bufferService.rows - 1));
					}
					print(e, t, i) {
						let s, r;
						const n = this._charsetService.charset, o = this._optionsService.rawOptions.screenReaderMode, a = this._bufferService.cols, h = this._coreService.decPrivateModes.wraparound, d = this._coreService.modes.insertMode, u = this._curAttrData;
						let f = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
						this._dirtyRowTracker.markDirty(this._activeBuffer.y), this._activeBuffer.x && i - t > 0 && 2 === f.getWidth(this._activeBuffer.x - 1) && f.setCellFromCodepoint(this._activeBuffer.x - 1, 0, 1, u);
						let v = this._parser.precedingJoinState;
						for (let g = t; g < i; ++g) {
							if (s = e[g], s < 127 && n) {
								const e = n[String.fromCharCode(s)];
								e && (s = e.charCodeAt(0));
							}
							const t = this._unicodeService.charProperties(s, v);
							r = p.UnicodeService.extractWidth(t);
							const i = p.UnicodeService.extractShouldJoin(t), m = i ? p.UnicodeService.extractWidth(v) : 0;
							if (v = t, o && this._onA11yChar.fire((0, c.stringFromCodePoint)(s)), this._getCurrentLinkId() && this._oscLinkService.addLineToLink(this._getCurrentLinkId(), this._activeBuffer.ybase + this._activeBuffer.y), this._activeBuffer.x + r - m > a) {
								if (h) {
									const e = f;
									let t = this._activeBuffer.x - m;
									for (this._activeBuffer.x = m, this._activeBuffer.y++, this._activeBuffer.y === this._activeBuffer.scrollBottom + 1 ? (this._activeBuffer.y--, this._bufferService.scroll(this._eraseAttrData(), !0)) : (this._activeBuffer.y >= this._bufferService.rows && (this._activeBuffer.y = this._bufferService.rows - 1), this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y).isWrapped = !0), f = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y), m > 0 && f instanceof l.BufferLine && f.copyCellsFrom(e, t, 0, m, !1); t < a;) e.setCellFromCodepoint(t++, 0, 1, u);
								} else if (this._activeBuffer.x = a - 1, 2 === r) continue;
							}
							if (i && this._activeBuffer.x) {
								const e = f.getWidth(this._activeBuffer.x - 1) ? 1 : 2;
								f.addCodepointToCell(this._activeBuffer.x - e, s, r);
								for (let e = r - m; --e >= 0;) f.setCellFromCodepoint(this._activeBuffer.x++, 0, 0, u);
							} else if (d && (f.insertCells(this._activeBuffer.x, r - m, this._activeBuffer.getNullCell(u)), 2 === f.getWidth(a - 1) && f.setCellFromCodepoint(a - 1, _.NULL_CELL_CODE, _.NULL_CELL_WIDTH, u)), f.setCellFromCodepoint(this._activeBuffer.x++, s, r, u), r > 0) for (; --r;) f.setCellFromCodepoint(this._activeBuffer.x++, 0, 0, u);
						}
						this._parser.precedingJoinState = v, this._activeBuffer.x < a && i - t > 0 && 0 === f.getWidth(this._activeBuffer.x) && !f.hasContent(this._activeBuffer.x) && f.setCellFromCodepoint(this._activeBuffer.x, 0, 1, u), this._dirtyRowTracker.markDirty(this._activeBuffer.y);
					}
					registerCsiHandler(e, t) {
						return "t" !== e.final || e.prefix || e.intermediates ? this._parser.registerCsiHandler(e, t) : this._parser.registerCsiHandler(e, ((e) => !w(e.params[0], this._optionsService.rawOptions.windowOptions) || t(e)));
					}
					registerDcsHandler(e, t) {
						return this._parser.registerDcsHandler(e, new m.DcsHandler(t));
					}
					registerEscHandler(e, t) {
						return this._parser.registerEscHandler(e, t);
					}
					registerOscHandler(e, t) {
						return this._parser.registerOscHandler(e, new g.OscHandler(t));
					}
					bell() {
						return this._onRequestBell.fire(), !0;
					}
					lineFeed() {
						return this._dirtyRowTracker.markDirty(this._activeBuffer.y), this._optionsService.rawOptions.convertEol && (this._activeBuffer.x = 0), this._activeBuffer.y++, this._activeBuffer.y === this._activeBuffer.scrollBottom + 1 ? (this._activeBuffer.y--, this._bufferService.scroll(this._eraseAttrData())) : this._activeBuffer.y >= this._bufferService.rows ? this._activeBuffer.y = this._bufferService.rows - 1 : this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y).isWrapped = !1, this._activeBuffer.x >= this._bufferService.cols && this._activeBuffer.x--, this._dirtyRowTracker.markDirty(this._activeBuffer.y), this._onLineFeed.fire(), !0;
					}
					carriageReturn() {
						return this._activeBuffer.x = 0, !0;
					}
					backspace() {
						if (!this._coreService.decPrivateModes.reverseWraparound) return this._restrictCursor(), this._activeBuffer.x > 0 && this._activeBuffer.x--, !0;
						if (this._restrictCursor(this._bufferService.cols), this._activeBuffer.x > 0) this._activeBuffer.x--;
						else if (0 === this._activeBuffer.x && this._activeBuffer.y > this._activeBuffer.scrollTop && this._activeBuffer.y <= this._activeBuffer.scrollBottom && this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y)?.isWrapped) {
							this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y).isWrapped = !1, this._activeBuffer.y--, this._activeBuffer.x = this._bufferService.cols - 1;
							const e = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
							e.hasWidth(this._activeBuffer.x) && !e.hasContent(this._activeBuffer.x) && this._activeBuffer.x--;
						}
						return this._restrictCursor(), !0;
					}
					tab() {
						if (this._activeBuffer.x >= this._bufferService.cols) return !0;
						const e = this._activeBuffer.x;
						return this._activeBuffer.x = this._activeBuffer.nextStop(), this._optionsService.rawOptions.screenReaderMode && this._onA11yTab.fire(this._activeBuffer.x - e), !0;
					}
					shiftOut() {
						return this._charsetService.setgLevel(1), !0;
					}
					shiftIn() {
						return this._charsetService.setgLevel(0), !0;
					}
					_restrictCursor(e = this._bufferService.cols - 1) {
						this._activeBuffer.x = Math.min(e, Math.max(0, this._activeBuffer.x)), this._activeBuffer.y = this._coreService.decPrivateModes.origin ? Math.min(this._activeBuffer.scrollBottom, Math.max(this._activeBuffer.scrollTop, this._activeBuffer.y)) : Math.min(this._bufferService.rows - 1, Math.max(0, this._activeBuffer.y)), this._dirtyRowTracker.markDirty(this._activeBuffer.y);
					}
					_setCursor(e, t) {
						this._dirtyRowTracker.markDirty(this._activeBuffer.y), this._coreService.decPrivateModes.origin ? (this._activeBuffer.x = e, this._activeBuffer.y = this._activeBuffer.scrollTop + t) : (this._activeBuffer.x = e, this._activeBuffer.y = t), this._restrictCursor(), this._dirtyRowTracker.markDirty(this._activeBuffer.y);
					}
					_moveCursor(e, t) {
						this._restrictCursor(), this._setCursor(this._activeBuffer.x + e, this._activeBuffer.y + t);
					}
					cursorUp(e) {
						const t = this._activeBuffer.y - this._activeBuffer.scrollTop;
						return t >= 0 ? this._moveCursor(0, -Math.min(t, e.params[0] || 1)) : this._moveCursor(0, -(e.params[0] || 1)), !0;
					}
					cursorDown(e) {
						const t = this._activeBuffer.scrollBottom - this._activeBuffer.y;
						return t >= 0 ? this._moveCursor(0, Math.min(t, e.params[0] || 1)) : this._moveCursor(0, e.params[0] || 1), !0;
					}
					cursorForward(e) {
						return this._moveCursor(e.params[0] || 1, 0), !0;
					}
					cursorBackward(e) {
						return this._moveCursor(-(e.params[0] || 1), 0), !0;
					}
					cursorNextLine(e) {
						return this.cursorDown(e), this._activeBuffer.x = 0, !0;
					}
					cursorPrecedingLine(e) {
						return this.cursorUp(e), this._activeBuffer.x = 0, !0;
					}
					cursorCharAbsolute(e) {
						return this._setCursor((e.params[0] || 1) - 1, this._activeBuffer.y), !0;
					}
					cursorPosition(e) {
						return this._setCursor(e.length >= 2 ? (e.params[1] || 1) - 1 : 0, (e.params[0] || 1) - 1), !0;
					}
					charPosAbsolute(e) {
						return this._setCursor((e.params[0] || 1) - 1, this._activeBuffer.y), !0;
					}
					hPositionRelative(e) {
						return this._moveCursor(e.params[0] || 1, 0), !0;
					}
					linePosAbsolute(e) {
						return this._setCursor(this._activeBuffer.x, (e.params[0] || 1) - 1), !0;
					}
					vPositionRelative(e) {
						return this._moveCursor(0, e.params[0] || 1), !0;
					}
					hVPosition(e) {
						return this.cursorPosition(e), !0;
					}
					tabClear(e) {
						const t = e.params[0];
						return 0 === t ? delete this._activeBuffer.tabs[this._activeBuffer.x] : 3 === t && (this._activeBuffer.tabs = {}), !0;
					}
					cursorForwardTab(e) {
						if (this._activeBuffer.x >= this._bufferService.cols) return !0;
						let t = e.params[0] || 1;
						for (; t--;) this._activeBuffer.x = this._activeBuffer.nextStop();
						return !0;
					}
					cursorBackwardTab(e) {
						if (this._activeBuffer.x >= this._bufferService.cols) return !0;
						let t = e.params[0] || 1;
						for (; t--;) this._activeBuffer.x = this._activeBuffer.prevStop();
						return !0;
					}
					selectProtected(e) {
						const t = e.params[0];
						return 1 === t && (this._curAttrData.bg |= 536870912), 2 !== t && 0 !== t || (this._curAttrData.bg &= -536870913), !0;
					}
					_eraseInBufferLine(e, t, i, s = !1, r = !1) {
						const n = this._activeBuffer.lines.get(this._activeBuffer.ybase + e);
						n.replaceCells(t, i, this._activeBuffer.getNullCell(this._eraseAttrData()), r), s && (n.isWrapped = !1);
					}
					_resetBufferLine(e, t = !1) {
						const i = this._activeBuffer.lines.get(this._activeBuffer.ybase + e);
						i && (i.fill(this._activeBuffer.getNullCell(this._eraseAttrData()), t), this._bufferService.buffer.clearMarkers(this._activeBuffer.ybase + e), i.isWrapped = !1);
					}
					eraseInDisplay(e, t = !1) {
						let i;
						switch (this._restrictCursor(this._bufferService.cols), e.params[0]) {
							case 0:
								for (i = this._activeBuffer.y, this._dirtyRowTracker.markDirty(i), this._eraseInBufferLine(i++, this._activeBuffer.x, this._bufferService.cols, 0 === this._activeBuffer.x, t); i < this._bufferService.rows; i++) this._resetBufferLine(i, t);
								this._dirtyRowTracker.markDirty(i);
								break;
							case 1:
								for (i = this._activeBuffer.y, this._dirtyRowTracker.markDirty(i), this._eraseInBufferLine(i, 0, this._activeBuffer.x + 1, !0, t), this._activeBuffer.x + 1 >= this._bufferService.cols && (this._activeBuffer.lines.get(i + 1).isWrapped = !1); i--;) this._resetBufferLine(i, t);
								this._dirtyRowTracker.markDirty(0);
								break;
							case 2:
								for (i = this._bufferService.rows, this._dirtyRowTracker.markDirty(i - 1); i--;) this._resetBufferLine(i, t);
								this._dirtyRowTracker.markDirty(0);
								break;
							case 3:
								const e = this._activeBuffer.lines.length - this._bufferService.rows;
								e > 0 && (this._activeBuffer.lines.trimStart(e), this._activeBuffer.ybase = Math.max(this._activeBuffer.ybase - e, 0), this._activeBuffer.ydisp = Math.max(this._activeBuffer.ydisp - e, 0), this._onScroll.fire(0));
						}
						return !0;
					}
					eraseInLine(e, t = !1) {
						switch (this._restrictCursor(this._bufferService.cols), e.params[0]) {
							case 0:
								this._eraseInBufferLine(this._activeBuffer.y, this._activeBuffer.x, this._bufferService.cols, 0 === this._activeBuffer.x, t);
								break;
							case 1:
								this._eraseInBufferLine(this._activeBuffer.y, 0, this._activeBuffer.x + 1, !1, t);
								break;
							case 2: this._eraseInBufferLine(this._activeBuffer.y, 0, this._bufferService.cols, !0, t);
						}
						return this._dirtyRowTracker.markDirty(this._activeBuffer.y), !0;
					}
					insertLines(e) {
						this._restrictCursor();
						let t = e.params[0] || 1;
						if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return !0;
						const i = this._activeBuffer.ybase + this._activeBuffer.y, s = this._bufferService.rows - 1 - this._activeBuffer.scrollBottom, r = this._bufferService.rows - 1 + this._activeBuffer.ybase - s + 1;
						for (; t--;) this._activeBuffer.lines.splice(r - 1, 1), this._activeBuffer.lines.splice(i, 0, this._activeBuffer.getBlankLine(this._eraseAttrData()));
						return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.y, this._activeBuffer.scrollBottom), this._activeBuffer.x = 0, !0;
					}
					deleteLines(e) {
						this._restrictCursor();
						let t = e.params[0] || 1;
						if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return !0;
						const i = this._activeBuffer.ybase + this._activeBuffer.y;
						let s;
						for (s = this._bufferService.rows - 1 - this._activeBuffer.scrollBottom, s = this._bufferService.rows - 1 + this._activeBuffer.ybase - s; t--;) this._activeBuffer.lines.splice(i, 1), this._activeBuffer.lines.splice(s, 0, this._activeBuffer.getBlankLine(this._eraseAttrData()));
						return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.y, this._activeBuffer.scrollBottom), this._activeBuffer.x = 0, !0;
					}
					insertChars(e) {
						this._restrictCursor();
						const t = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
						return t && (t.insertCells(this._activeBuffer.x, e.params[0] || 1, this._activeBuffer.getNullCell(this._eraseAttrData())), this._dirtyRowTracker.markDirty(this._activeBuffer.y)), !0;
					}
					deleteChars(e) {
						this._restrictCursor();
						const t = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
						return t && (t.deleteCells(this._activeBuffer.x, e.params[0] || 1, this._activeBuffer.getNullCell(this._eraseAttrData())), this._dirtyRowTracker.markDirty(this._activeBuffer.y)), !0;
					}
					scrollUp(e) {
						let t = e.params[0] || 1;
						for (; t--;) this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollTop, 1), this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollBottom, 0, this._activeBuffer.getBlankLine(this._eraseAttrData()));
						return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), !0;
					}
					scrollDown(e) {
						let t = e.params[0] || 1;
						for (; t--;) this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollBottom, 1), this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollTop, 0, this._activeBuffer.getBlankLine(l.DEFAULT_ATTR_DATA));
						return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), !0;
					}
					scrollLeft(e) {
						if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return !0;
						const t = e.params[0] || 1;
						for (let e = this._activeBuffer.scrollTop; e <= this._activeBuffer.scrollBottom; ++e) {
							const i = this._activeBuffer.lines.get(this._activeBuffer.ybase + e);
							i.deleteCells(0, t, this._activeBuffer.getNullCell(this._eraseAttrData())), i.isWrapped = !1;
						}
						return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), !0;
					}
					scrollRight(e) {
						if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return !0;
						const t = e.params[0] || 1;
						for (let e = this._activeBuffer.scrollTop; e <= this._activeBuffer.scrollBottom; ++e) {
							const i = this._activeBuffer.lines.get(this._activeBuffer.ybase + e);
							i.insertCells(0, t, this._activeBuffer.getNullCell(this._eraseAttrData())), i.isWrapped = !1;
						}
						return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), !0;
					}
					insertColumns(e) {
						if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return !0;
						const t = e.params[0] || 1;
						for (let e = this._activeBuffer.scrollTop; e <= this._activeBuffer.scrollBottom; ++e) {
							const i = this._activeBuffer.lines.get(this._activeBuffer.ybase + e);
							i.insertCells(this._activeBuffer.x, t, this._activeBuffer.getNullCell(this._eraseAttrData())), i.isWrapped = !1;
						}
						return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), !0;
					}
					deleteColumns(e) {
						if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return !0;
						const t = e.params[0] || 1;
						for (let e = this._activeBuffer.scrollTop; e <= this._activeBuffer.scrollBottom; ++e) {
							const i = this._activeBuffer.lines.get(this._activeBuffer.ybase + e);
							i.deleteCells(this._activeBuffer.x, t, this._activeBuffer.getNullCell(this._eraseAttrData())), i.isWrapped = !1;
						}
						return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), !0;
					}
					eraseChars(e) {
						this._restrictCursor();
						const t = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
						return t && (t.replaceCells(this._activeBuffer.x, this._activeBuffer.x + (e.params[0] || 1), this._activeBuffer.getNullCell(this._eraseAttrData())), this._dirtyRowTracker.markDirty(this._activeBuffer.y)), !0;
					}
					repeatPrecedingCharacter(e) {
						const t = this._parser.precedingJoinState;
						if (!t) return !0;
						const i = e.params[0] || 1, s = p.UnicodeService.extractWidth(t), r = this._activeBuffer.x - s, n = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y).getString(r), o = new Uint32Array(n.length * i);
						let a = 0;
						for (let e = 0; e < n.length;) {
							const t = n.codePointAt(e) || 0;
							o[a++] = t, e += t > 65535 ? 2 : 1;
						}
						let h = a;
						for (let e = 1; e < i; ++e) o.copyWithin(h, 0, a), h += a;
						return this.print(o, 0, h), !0;
					}
					sendDeviceAttributesPrimary(e) {
						return e.params[0] > 0 || (this._is("xterm") || this._is("rxvt-unicode") || this._is("screen") ? this._coreService.triggerDataEvent(n.C0.ESC + "[?1;2c") : this._is("linux") && this._coreService.triggerDataEvent(n.C0.ESC + "[?6c")), !0;
					}
					sendDeviceAttributesSecondary(e) {
						return e.params[0] > 0 || (this._is("xterm") ? this._coreService.triggerDataEvent(n.C0.ESC + "[>0;276;0c") : this._is("rxvt-unicode") ? this._coreService.triggerDataEvent(n.C0.ESC + "[>85;95;0c") : this._is("linux") ? this._coreService.triggerDataEvent(e.params[0] + "c") : this._is("screen") && this._coreService.triggerDataEvent(n.C0.ESC + "[>83;40003;0c")), !0;
					}
					_is(e) {
						return 0 === (this._optionsService.rawOptions.termName + "").indexOf(e);
					}
					setMode(e) {
						for (let t = 0; t < e.length; t++) switch (e.params[t]) {
							case 4:
								this._coreService.modes.insertMode = !0;
								break;
							case 20: this._optionsService.options.convertEol = !0;
						}
						return !0;
					}
					setModePrivate(e) {
						for (let t = 0; t < e.length; t++) switch (e.params[t]) {
							case 1:
								this._coreService.decPrivateModes.applicationCursorKeys = !0;
								break;
							case 2:
								this._charsetService.setgCharset(0, o.DEFAULT_CHARSET), this._charsetService.setgCharset(1, o.DEFAULT_CHARSET), this._charsetService.setgCharset(2, o.DEFAULT_CHARSET), this._charsetService.setgCharset(3, o.DEFAULT_CHARSET);
								break;
							case 3:
								this._optionsService.rawOptions.windowOptions.setWinLines && (this._bufferService.resize(132, this._bufferService.rows), this._onRequestReset.fire());
								break;
							case 6:
								this._coreService.decPrivateModes.origin = !0, this._setCursor(0, 0);
								break;
							case 7:
								this._coreService.decPrivateModes.wraparound = !0;
								break;
							case 12:
								this._optionsService.options.cursorBlink = !0;
								break;
							case 45:
								this._coreService.decPrivateModes.reverseWraparound = !0;
								break;
							case 66:
								this._logService.debug("Serial port requested application keypad."), this._coreService.decPrivateModes.applicationKeypad = !0, this._onRequestSyncScrollBar.fire();
								break;
							case 9:
								this._coreMouseService.activeProtocol = "X10";
								break;
							case 1e3:
								this._coreMouseService.activeProtocol = "VT200";
								break;
							case 1002:
								this._coreMouseService.activeProtocol = "DRAG";
								break;
							case 1003:
								this._coreMouseService.activeProtocol = "ANY";
								break;
							case 1004:
								this._coreService.decPrivateModes.sendFocus = !0, this._onRequestSendFocus.fire();
								break;
							case 1005:
								this._logService.debug("DECSET 1005 not supported (see #2507)");
								break;
							case 1006:
								this._coreMouseService.activeEncoding = "SGR";
								break;
							case 1015:
								this._logService.debug("DECSET 1015 not supported (see #2507)");
								break;
							case 1016:
								this._coreMouseService.activeEncoding = "SGR_PIXELS";
								break;
							case 25:
								this._coreService.isCursorHidden = !1;
								break;
							case 1048:
								this.saveCursor();
								break;
							case 1049: this.saveCursor();
							case 47:
							case 1047:
								this._bufferService.buffers.activateAltBuffer(this._eraseAttrData()), this._coreService.isCursorInitialized = !0, this._onRequestRefreshRows.fire(0, this._bufferService.rows - 1), this._onRequestSyncScrollBar.fire();
								break;
							case 2004: this._coreService.decPrivateModes.bracketedPasteMode = !0;
						}
						return !0;
					}
					resetMode(e) {
						for (let t = 0; t < e.length; t++) switch (e.params[t]) {
							case 4:
								this._coreService.modes.insertMode = !1;
								break;
							case 20: this._optionsService.options.convertEol = !1;
						}
						return !0;
					}
					resetModePrivate(e) {
						for (let t = 0; t < e.length; t++) switch (e.params[t]) {
							case 1:
								this._coreService.decPrivateModes.applicationCursorKeys = !1;
								break;
							case 3:
								this._optionsService.rawOptions.windowOptions.setWinLines && (this._bufferService.resize(80, this._bufferService.rows), this._onRequestReset.fire());
								break;
							case 6:
								this._coreService.decPrivateModes.origin = !1, this._setCursor(0, 0);
								break;
							case 7:
								this._coreService.decPrivateModes.wraparound = !1;
								break;
							case 12:
								this._optionsService.options.cursorBlink = !1;
								break;
							case 45:
								this._coreService.decPrivateModes.reverseWraparound = !1;
								break;
							case 66:
								this._logService.debug("Switching back to normal keypad."), this._coreService.decPrivateModes.applicationKeypad = !1, this._onRequestSyncScrollBar.fire();
								break;
							case 9:
							case 1e3:
							case 1002:
							case 1003:
								this._coreMouseService.activeProtocol = "NONE";
								break;
							case 1004:
								this._coreService.decPrivateModes.sendFocus = !1;
								break;
							case 1005:
								this._logService.debug("DECRST 1005 not supported (see #2507)");
								break;
							case 1006:
							case 1016:
								this._coreMouseService.activeEncoding = "DEFAULT";
								break;
							case 1015:
								this._logService.debug("DECRST 1015 not supported (see #2507)");
								break;
							case 25:
								this._coreService.isCursorHidden = !0;
								break;
							case 1048:
								this.restoreCursor();
								break;
							case 1049:
							case 47:
							case 1047:
								this._bufferService.buffers.activateNormalBuffer(), 1049 === e.params[t] && this.restoreCursor(), this._coreService.isCursorInitialized = !0, this._onRequestRefreshRows.fire(0, this._bufferService.rows - 1), this._onRequestSyncScrollBar.fire();
								break;
							case 2004: this._coreService.decPrivateModes.bracketedPasteMode = !1;
						}
						return !0;
					}
					requestMode(e, t) {
						const i = this._coreService.decPrivateModes, { activeProtocol: s, activeEncoding: r } = this._coreMouseService, o = this._coreService, { buffers: a, cols: h } = this._bufferService, { active: c, alt: l } = a, d = this._optionsService.rawOptions, _ = (e) => e ? 1 : 2, u = e.params[0];
						return f = u, v = t ? 2 === u ? 4 : 4 === u ? _(o.modes.insertMode) : 12 === u ? 3 : 20 === u ? _(d.convertEol) : 0 : 1 === u ? _(i.applicationCursorKeys) : 3 === u ? d.windowOptions.setWinLines ? 80 === h ? 2 : 132 === h ? 1 : 0 : 0 : 6 === u ? _(i.origin) : 7 === u ? _(i.wraparound) : 8 === u ? 3 : 9 === u ? _("X10" === s) : 12 === u ? _(d.cursorBlink) : 25 === u ? _(!o.isCursorHidden) : 45 === u ? _(i.reverseWraparound) : 66 === u ? _(i.applicationKeypad) : 67 === u ? 4 : 1e3 === u ? _("VT200" === s) : 1002 === u ? _("DRAG" === s) : 1003 === u ? _("ANY" === s) : 1004 === u ? _(i.sendFocus) : 1005 === u ? 4 : 1006 === u ? _("SGR" === r) : 1015 === u ? 4 : 1016 === u ? _("SGR_PIXELS" === r) : 1048 === u ? 1 : 47 === u || 1047 === u || 1049 === u ? _(c === l) : 2004 === u ? _(i.bracketedPasteMode) : 0, o.triggerDataEvent(`${n.C0.ESC}[${t ? "" : "?"}${f};${v}$y`), !0;
						var f, v;
					}
					_updateAttrColor(e, t, i, s, r) {
						return 2 === t ? (e |= 50331648, e &= -16777216, e |= f.AttributeData.fromColorRGB([
							i,
							s,
							r
						])) : 5 === t && (e &= -50331904, e |= 33554432 | 255 & i), e;
					}
					_extractColor(e, t, i) {
						const s = [
							0,
							0,
							-1,
							0,
							0,
							0
						];
						let r = 0, n = 0;
						do {
							if (s[n + r] = e.params[t + n], e.hasSubParams(t + n)) {
								const i = e.getSubParams(t + n);
								let o = 0;
								do
									5 === s[1] && (r = 1), s[n + o + 1 + r] = i[o];
								while (++o < i.length && o + n + 1 + r < s.length);
								break;
							}
							if (5 === s[1] && n + r >= 2 || 2 === s[1] && n + r >= 5) break;
							s[1] && (r = 1);
						} while (++n + t < e.length && n + r < s.length);
						for (let e = 2; e < s.length; ++e) -1 === s[e] && (s[e] = 0);
						switch (s[0]) {
							case 38:
								i.fg = this._updateAttrColor(i.fg, s[1], s[3], s[4], s[5]);
								break;
							case 48:
								i.bg = this._updateAttrColor(i.bg, s[1], s[3], s[4], s[5]);
								break;
							case 58: i.extended = i.extended.clone(), i.extended.underlineColor = this._updateAttrColor(i.extended.underlineColor, s[1], s[3], s[4], s[5]);
						}
						return n;
					}
					_processUnderline(e, t) {
						t.extended = t.extended.clone(), (!~e || e > 5) && (e = 1), t.extended.underlineStyle = e, t.fg |= 268435456, 0 === e && (t.fg &= -268435457), t.updateExtended();
					}
					_processSGR0(e) {
						e.fg = l.DEFAULT_ATTR_DATA.fg, e.bg = l.DEFAULT_ATTR_DATA.bg, e.extended = e.extended.clone(), e.extended.underlineStyle = 0, e.extended.underlineColor &= -67108864, e.updateExtended();
					}
					charAttributes(e) {
						if (1 === e.length && 0 === e.params[0]) return this._processSGR0(this._curAttrData), !0;
						const t = e.length;
						let i;
						const s = this._curAttrData;
						for (let r = 0; r < t; r++) i = e.params[r], i >= 30 && i <= 37 ? (s.fg &= -50331904, s.fg |= 16777216 | i - 30) : i >= 40 && i <= 47 ? (s.bg &= -50331904, s.bg |= 16777216 | i - 40) : i >= 90 && i <= 97 ? (s.fg &= -50331904, s.fg |= 16777224 | i - 90) : i >= 100 && i <= 107 ? (s.bg &= -50331904, s.bg |= 16777224 | i - 100) : 0 === i ? this._processSGR0(s) : 1 === i ? s.fg |= 134217728 : 3 === i ? s.bg |= 67108864 : 4 === i ? (s.fg |= 268435456, this._processUnderline(e.hasSubParams(r) ? e.getSubParams(r)[0] : 1, s)) : 5 === i ? s.fg |= 536870912 : 7 === i ? s.fg |= 67108864 : 8 === i ? s.fg |= 1073741824 : 9 === i ? s.fg |= 2147483648 : 2 === i ? s.bg |= 134217728 : 21 === i ? this._processUnderline(2, s) : 22 === i ? (s.fg &= -134217729, s.bg &= -134217729) : 23 === i ? s.bg &= -67108865 : 24 === i ? (s.fg &= -268435457, this._processUnderline(0, s)) : 25 === i ? s.fg &= -536870913 : 27 === i ? s.fg &= -67108865 : 28 === i ? s.fg &= -1073741825 : 29 === i ? s.fg &= 2147483647 : 39 === i ? (s.fg &= -67108864, s.fg |= 16777215 & l.DEFAULT_ATTR_DATA.fg) : 49 === i ? (s.bg &= -67108864, s.bg |= 16777215 & l.DEFAULT_ATTR_DATA.bg) : 38 === i || 48 === i || 58 === i ? r += this._extractColor(e, r, s) : 53 === i ? s.bg |= 1073741824 : 55 === i ? s.bg &= -1073741825 : 59 === i ? (s.extended = s.extended.clone(), s.extended.underlineColor = -1, s.updateExtended()) : 100 === i ? (s.fg &= -67108864, s.fg |= 16777215 & l.DEFAULT_ATTR_DATA.fg, s.bg &= -67108864, s.bg |= 16777215 & l.DEFAULT_ATTR_DATA.bg) : this._logService.debug("Unknown SGR attribute: %d.", i);
						return !0;
					}
					deviceStatus(e) {
						switch (e.params[0]) {
							case 5:
								this._coreService.triggerDataEvent(`${n.C0.ESC}[0n`);
								break;
							case 6:
								const e = this._activeBuffer.y + 1, t = this._activeBuffer.x + 1;
								this._coreService.triggerDataEvent(`${n.C0.ESC}[${e};${t}R`);
						}
						return !0;
					}
					deviceStatusPrivate(e) {
						if (6 === e.params[0]) {
							const e = this._activeBuffer.y + 1, t = this._activeBuffer.x + 1;
							this._coreService.triggerDataEvent(`${n.C0.ESC}[?${e};${t}R`);
						}
						return !0;
					}
					softReset(e) {
						return this._coreService.isCursorHidden = !1, this._onRequestSyncScrollBar.fire(), this._activeBuffer.scrollTop = 0, this._activeBuffer.scrollBottom = this._bufferService.rows - 1, this._curAttrData = l.DEFAULT_ATTR_DATA.clone(), this._coreService.reset(), this._charsetService.reset(), this._activeBuffer.savedX = 0, this._activeBuffer.savedY = this._activeBuffer.ybase, this._activeBuffer.savedCurAttrData.fg = this._curAttrData.fg, this._activeBuffer.savedCurAttrData.bg = this._curAttrData.bg, this._activeBuffer.savedCharset = this._charsetService.charset, this._coreService.decPrivateModes.origin = !1, !0;
					}
					setCursorStyle(e) {
						const t = e.params[0] || 1;
						switch (t) {
							case 1:
							case 2:
								this._optionsService.options.cursorStyle = "block";
								break;
							case 3:
							case 4:
								this._optionsService.options.cursorStyle = "underline";
								break;
							case 5:
							case 6: this._optionsService.options.cursorStyle = "bar";
						}
						const i = t % 2 == 1;
						return this._optionsService.options.cursorBlink = i, !0;
					}
					setScrollRegion(e) {
						const t = e.params[0] || 1;
						let i;
						return (e.length < 2 || (i = e.params[1]) > this._bufferService.rows || 0 === i) && (i = this._bufferService.rows), i > t && (this._activeBuffer.scrollTop = t - 1, this._activeBuffer.scrollBottom = i - 1, this._setCursor(0, 0)), !0;
					}
					windowOptions(e) {
						if (!w(e.params[0], this._optionsService.rawOptions.windowOptions)) return !0;
						const t = e.length > 1 ? e.params[1] : 0;
						switch (e.params[0]) {
							case 14:
								2 !== t && this._onRequestWindowsOptionsReport.fire(y.GET_WIN_SIZE_PIXELS);
								break;
							case 16:
								this._onRequestWindowsOptionsReport.fire(y.GET_CELL_SIZE_PIXELS);
								break;
							case 18:
								this._bufferService && this._coreService.triggerDataEvent(`${n.C0.ESC}[8;${this._bufferService.rows};${this._bufferService.cols}t`);
								break;
							case 22:
								0 !== t && 2 !== t || (this._windowTitleStack.push(this._windowTitle), this._windowTitleStack.length > 10 && this._windowTitleStack.shift()), 0 !== t && 1 !== t || (this._iconNameStack.push(this._iconName), this._iconNameStack.length > 10 && this._iconNameStack.shift());
								break;
							case 23: 0 !== t && 2 !== t || this._windowTitleStack.length && this.setTitle(this._windowTitleStack.pop()), 0 !== t && 1 !== t || this._iconNameStack.length && this.setIconName(this._iconNameStack.pop());
						}
						return !0;
					}
					saveCursor(e) {
						return this._activeBuffer.savedX = this._activeBuffer.x, this._activeBuffer.savedY = this._activeBuffer.ybase + this._activeBuffer.y, this._activeBuffer.savedCurAttrData.fg = this._curAttrData.fg, this._activeBuffer.savedCurAttrData.bg = this._curAttrData.bg, this._activeBuffer.savedCharset = this._charsetService.charset, !0;
					}
					restoreCursor(e) {
						return this._activeBuffer.x = this._activeBuffer.savedX || 0, this._activeBuffer.y = Math.max(this._activeBuffer.savedY - this._activeBuffer.ybase, 0), this._curAttrData.fg = this._activeBuffer.savedCurAttrData.fg, this._curAttrData.bg = this._activeBuffer.savedCurAttrData.bg, this._charsetService.charset = this._savedCharset, this._activeBuffer.savedCharset && (this._charsetService.charset = this._activeBuffer.savedCharset), this._restrictCursor(), !0;
					}
					setTitle(e) {
						return this._windowTitle = e, this._onTitleChange.fire(e), !0;
					}
					setIconName(e) {
						return this._iconName = e, !0;
					}
					setOrReportIndexedColor(e) {
						const t = [], i = e.split(";");
						for (; i.length > 1;) {
							const e = i.shift(), s = i.shift();
							if (/^\d+$/.exec(e)) {
								const i = parseInt(e);
								if (D(i)) if ("?" === s) t.push({
									type: 0,
									index: i
								});
								else {
									const e = (0, S.parseColor)(s);
									e && t.push({
										type: 1,
										index: i,
										color: e
									});
								}
							}
						}
						return t.length && this._onColor.fire(t), !0;
					}
					setHyperlink(e) {
						const t = e.split(";");
						return !(t.length < 2) && (t[1] ? this._createHyperlink(t[0], t[1]) : !t[0] && this._finishHyperlink());
					}
					_createHyperlink(e, t) {
						this._getCurrentLinkId() && this._finishHyperlink();
						const i = e.split(":");
						let s;
						const r = i.findIndex(((e) => e.startsWith("id=")));
						return -1 !== r && (s = i[r].slice(3) || void 0), this._curAttrData.extended = this._curAttrData.extended.clone(), this._curAttrData.extended.urlId = this._oscLinkService.registerLink({
							id: s,
							uri: t
						}), this._curAttrData.updateExtended(), !0;
					}
					_finishHyperlink() {
						return this._curAttrData.extended = this._curAttrData.extended.clone(), this._curAttrData.extended.urlId = 0, this._curAttrData.updateExtended(), !0;
					}
					_setOrReportSpecialColor(e, t) {
						const i = e.split(";");
						for (let e = 0; e < i.length && !(t >= this._specialColors.length); ++e, ++t) if ("?" === i[e]) this._onColor.fire([{
							type: 0,
							index: this._specialColors[t]
						}]);
						else {
							const s = (0, S.parseColor)(i[e]);
							s && this._onColor.fire([{
								type: 1,
								index: this._specialColors[t],
								color: s
							}]);
						}
						return !0;
					}
					setOrReportFgColor(e) {
						return this._setOrReportSpecialColor(e, 0);
					}
					setOrReportBgColor(e) {
						return this._setOrReportSpecialColor(e, 1);
					}
					setOrReportCursorColor(e) {
						return this._setOrReportSpecialColor(e, 2);
					}
					restoreIndexedColor(e) {
						if (!e) return this._onColor.fire([{ type: 2 }]), !0;
						const t = [], i = e.split(";");
						for (let e = 0; e < i.length; ++e) if (/^\d+$/.exec(i[e])) {
							const s = parseInt(i[e]);
							D(s) && t.push({
								type: 2,
								index: s
							});
						}
						return t.length && this._onColor.fire(t), !0;
					}
					restoreFgColor(e) {
						return this._onColor.fire([{
							type: 2,
							index: 256
						}]), !0;
					}
					restoreBgColor(e) {
						return this._onColor.fire([{
							type: 2,
							index: 257
						}]), !0;
					}
					restoreCursorColor(e) {
						return this._onColor.fire([{
							type: 2,
							index: 258
						}]), !0;
					}
					nextLine() {
						return this._activeBuffer.x = 0, this.index(), !0;
					}
					keypadApplicationMode() {
						return this._logService.debug("Serial port requested application keypad."), this._coreService.decPrivateModes.applicationKeypad = !0, this._onRequestSyncScrollBar.fire(), !0;
					}
					keypadNumericMode() {
						return this._logService.debug("Switching back to normal keypad."), this._coreService.decPrivateModes.applicationKeypad = !1, this._onRequestSyncScrollBar.fire(), !0;
					}
					selectDefaultCharset() {
						return this._charsetService.setgLevel(0), this._charsetService.setgCharset(0, o.DEFAULT_CHARSET), !0;
					}
					selectCharset(e) {
						return 2 !== e.length ? (this.selectDefaultCharset(), !0) : ("/" === e[0] || this._charsetService.setgCharset(C[e[0]], o.CHARSETS[e[1]] || o.DEFAULT_CHARSET), !0);
					}
					index() {
						return this._restrictCursor(), this._activeBuffer.y++, this._activeBuffer.y === this._activeBuffer.scrollBottom + 1 ? (this._activeBuffer.y--, this._bufferService.scroll(this._eraseAttrData())) : this._activeBuffer.y >= this._bufferService.rows && (this._activeBuffer.y = this._bufferService.rows - 1), this._restrictCursor(), !0;
					}
					tabSet() {
						return this._activeBuffer.tabs[this._activeBuffer.x] = !0, !0;
					}
					reverseIndex() {
						if (this._restrictCursor(), this._activeBuffer.y === this._activeBuffer.scrollTop) {
							const e = this._activeBuffer.scrollBottom - this._activeBuffer.scrollTop;
							this._activeBuffer.lines.shiftElements(this._activeBuffer.ybase + this._activeBuffer.y, e, 1), this._activeBuffer.lines.set(this._activeBuffer.ybase + this._activeBuffer.y, this._activeBuffer.getBlankLine(this._eraseAttrData())), this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom);
						} else this._activeBuffer.y--, this._restrictCursor();
						return !0;
					}
					fullReset() {
						return this._parser.reset(), this._onRequestReset.fire(), !0;
					}
					reset() {
						this._curAttrData = l.DEFAULT_ATTR_DATA.clone(), this._eraseAttrDataInternal = l.DEFAULT_ATTR_DATA.clone();
					}
					_eraseAttrData() {
						return this._eraseAttrDataInternal.bg &= -67108864, this._eraseAttrDataInternal.bg |= 67108863 & this._curAttrData.bg, this._eraseAttrDataInternal;
					}
					setgLevel(e) {
						return this._charsetService.setgLevel(e), !0;
					}
					screenAlignmentPattern() {
						const e = new u.CellData();
						e.content = 1 << 22 | "E".charCodeAt(0), e.fg = this._curAttrData.fg, e.bg = this._curAttrData.bg, this._setCursor(0, 0);
						for (let t = 0; t < this._bufferService.rows; ++t) {
							const i = this._activeBuffer.ybase + this._activeBuffer.y + t, s = this._activeBuffer.lines.get(i);
							s && (s.fill(e), s.isWrapped = !1);
						}
						return this._dirtyRowTracker.markAllDirty(), this._setCursor(0, 0), !0;
					}
					requestStatusString(e, t) {
						const i = this._bufferService.buffer, s = this._optionsService.rawOptions;
						return ((e) => (this._coreService.triggerDataEvent(`${n.C0.ESC}${e}${n.C0.ESC}\\`), !0))("\"q" === e ? `P1$r${this._curAttrData.isProtected() ? 1 : 0}"q` : "\"p" === e ? "P1$r61;1\"p" : "r" === e ? `P1$r${i.scrollTop + 1};${i.scrollBottom + 1}r` : "m" === e ? "P1$r0m" : " q" === e ? `P1$r${{
							block: 2,
							underline: 4,
							bar: 6
						}[s.cursorStyle] - (s.cursorBlink ? 1 : 0)} q` : "P0$r");
					}
					markRangeDirty(e, t) {
						this._dirtyRowTracker.markRangeDirty(e, t);
					}
				}
				t.InputHandler = k;
				let L = class {
					constructor(e) {
						this._bufferService = e, this.clearRange();
					}
					clearRange() {
						this.start = this._bufferService.buffer.y, this.end = this._bufferService.buffer.y;
					}
					markDirty(e) {
						e < this.start ? this.start = e : e > this.end && (this.end = e);
					}
					markRangeDirty(e, t) {
						e > t && (E = e, e = t, t = E), e < this.start && (this.start = e), t > this.end && (this.end = t);
					}
					markAllDirty() {
						this.markRangeDirty(0, this._bufferService.rows - 1);
					}
				};
				function D(e) {
					return 0 <= e && e < 256;
				}
				L = s([r(0, v.IBufferService)], L);
			},
			844: (e, t) => {
				function i(e) {
					for (const t of e) t.dispose();
					e.length = 0;
				}
				Object.defineProperty(t, "__esModule", { value: !0 }), t.getDisposeArrayDisposable = t.disposeArray = t.toDisposable = t.MutableDisposable = t.Disposable = void 0, t.Disposable = class {
					constructor() {
						this._disposables = [], this._isDisposed = !1;
					}
					dispose() {
						this._isDisposed = !0;
						for (const e of this._disposables) e.dispose();
						this._disposables.length = 0;
					}
					register(e) {
						return this._disposables.push(e), e;
					}
					unregister(e) {
						const t = this._disposables.indexOf(e);
						-1 !== t && this._disposables.splice(t, 1);
					}
				}, t.MutableDisposable = class {
					constructor() {
						this._isDisposed = !1;
					}
					get value() {
						return this._isDisposed ? void 0 : this._value;
					}
					set value(e) {
						this._isDisposed || e === this._value || (this._value?.dispose(), this._value = e);
					}
					clear() {
						this.value = void 0;
					}
					dispose() {
						this._isDisposed = !0, this._value?.dispose(), this._value = void 0;
					}
				}, t.toDisposable = function(e) {
					return { dispose: e };
				}, t.disposeArray = i, t.getDisposeArrayDisposable = function(e) {
					return { dispose: () => i(e) };
				};
			},
			1505: (e, t) => {
				Object.defineProperty(t, "__esModule", { value: !0 }), t.FourKeyMap = t.TwoKeyMap = void 0;
				class i {
					constructor() {
						this._data = {};
					}
					set(e, t, i) {
						this._data[e] || (this._data[e] = {}), this._data[e][t] = i;
					}
					get(e, t) {
						return this._data[e] ? this._data[e][t] : void 0;
					}
					clear() {
						this._data = {};
					}
				}
				t.TwoKeyMap = i, t.FourKeyMap = class {
					constructor() {
						this._data = new i();
					}
					set(e, t, s, r, n) {
						this._data.get(e, t) || this._data.set(e, t, new i()), this._data.get(e, t).set(s, r, n);
					}
					get(e, t, i, s) {
						return this._data.get(e, t)?.get(i, s);
					}
					clear() {
						this._data.clear();
					}
				};
			},
			6114: (e, t) => {
				Object.defineProperty(t, "__esModule", { value: !0 }), t.isChromeOS = t.isLinux = t.isWindows = t.isIphone = t.isIpad = t.isMac = t.getSafariVersion = t.isSafari = t.isLegacyEdge = t.isFirefox = t.isNode = void 0, t.isNode = "undefined" != typeof process && "title" in process;
				const i = t.isNode ? "node" : navigator.userAgent, s = t.isNode ? "node" : navigator.platform;
				t.isFirefox = i.includes("Firefox"), t.isLegacyEdge = i.includes("Edge"), t.isSafari = /^((?!chrome|android).)*safari/i.test(i), t.getSafariVersion = function() {
					if (!t.isSafari) return 0;
					const e = i.match(/Version\/(\d+)/);
					return null === e || e.length < 2 ? 0 : parseInt(e[1]);
				}, t.isMac = [
					"Macintosh",
					"MacIntel",
					"MacPPC",
					"Mac68K"
				].includes(s), t.isIpad = "iPad" === s, t.isIphone = "iPhone" === s, t.isWindows = [
					"Windows",
					"Win16",
					"Win32",
					"WinCE"
				].includes(s), t.isLinux = s.indexOf("Linux") >= 0, t.isChromeOS = /\bCrOS\b/.test(i);
			},
			6106: (e, t) => {
				Object.defineProperty(t, "__esModule", { value: !0 }), t.SortedList = void 0;
				let i = 0;
				t.SortedList = class {
					constructor(e) {
						this._getKey = e, this._array = [];
					}
					clear() {
						this._array.length = 0;
					}
					insert(e) {
						0 !== this._array.length ? (i = this._search(this._getKey(e)), this._array.splice(i, 0, e)) : this._array.push(e);
					}
					delete(e) {
						if (0 === this._array.length) return !1;
						const t = this._getKey(e);
						if (void 0 === t) return !1;
						if (i = this._search(t), -1 === i) return !1;
						if (this._getKey(this._array[i]) !== t) return !1;
						do
							if (this._array[i] === e) return this._array.splice(i, 1), !0;
						while (++i < this._array.length && this._getKey(this._array[i]) === t);
						return !1;
					}
					*getKeyIterator(e) {
						if (0 !== this._array.length && (i = this._search(e), !(i < 0 || i >= this._array.length) && this._getKey(this._array[i]) === e)) do
							yield this._array[i];
						while (++i < this._array.length && this._getKey(this._array[i]) === e);
					}
					forEachByKey(e, t) {
						if (0 !== this._array.length && (i = this._search(e), !(i < 0 || i >= this._array.length) && this._getKey(this._array[i]) === e)) do
							t(this._array[i]);
						while (++i < this._array.length && this._getKey(this._array[i]) === e);
					}
					values() {
						return [...this._array].values();
					}
					_search(e) {
						let t = 0, i = this._array.length - 1;
						for (; i >= t;) {
							let s = t + i >> 1;
							const r = this._getKey(this._array[s]);
							if (r > e) i = s - 1;
							else {
								if (!(r < e)) {
									for (; s > 0 && this._getKey(this._array[s - 1]) === e;) s--;
									return s;
								}
								t = s + 1;
							}
						}
						return t;
					}
				};
			},
			7226: (e, t, i) => {
				Object.defineProperty(t, "__esModule", { value: !0 }), t.DebouncedIdleTask = t.IdleTaskQueue = t.PriorityTaskQueue = void 0;
				const s = i(6114);
				class r {
					constructor() {
						this._tasks = [], this._i = 0;
					}
					enqueue(e) {
						this._tasks.push(e), this._start();
					}
					flush() {
						for (; this._i < this._tasks.length;) this._tasks[this._i]() || this._i++;
						this.clear();
					}
					clear() {
						this._idleCallback && (this._cancelCallback(this._idleCallback), this._idleCallback = void 0), this._i = 0, this._tasks.length = 0;
					}
					_start() {
						this._idleCallback || (this._idleCallback = this._requestCallback(this._process.bind(this)));
					}
					_process(e) {
						this._idleCallback = void 0;
						let t = 0, i = 0, s = e.timeRemaining(), r = 0;
						for (; this._i < this._tasks.length;) {
							if (t = Date.now(), this._tasks[this._i]() || this._i++, t = Math.max(1, Date.now() - t), i = Math.max(t, i), r = e.timeRemaining(), 1.5 * i > r) return s - t < -20 && console.warn(`task queue exceeded allotted deadline by ${Math.abs(Math.round(s - t))}ms`), void this._start();
							s = r;
						}
						this.clear();
					}
				}
				class n extends r {
					_requestCallback(e) {
						return setTimeout((() => e(this._createDeadline(16))));
					}
					_cancelCallback(e) {
						clearTimeout(e);
					}
					_createDeadline(e) {
						const t = Date.now() + e;
						return { timeRemaining: () => Math.max(0, t - Date.now()) };
					}
				}
				t.PriorityTaskQueue = n, t.IdleTaskQueue = !s.isNode && "requestIdleCallback" in window ? class extends r {
					_requestCallback(e) {
						return requestIdleCallback(e);
					}
					_cancelCallback(e) {
						cancelIdleCallback(e);
					}
				} : n, t.DebouncedIdleTask = class {
					constructor() {
						this._queue = new t.IdleTaskQueue();
					}
					set(e) {
						this._queue.clear(), this._queue.enqueue(e);
					}
					flush() {
						this._queue.flush();
					}
				};
			},
			9282: (e, t, i) => {
				Object.defineProperty(t, "__esModule", { value: !0 }), t.updateWindowsModeWrappedState = void 0;
				const s = i(643);
				t.updateWindowsModeWrappedState = function(e) {
					const i = e.buffer.lines.get(e.buffer.ybase + e.buffer.y - 1)?.get(e.cols - 1), r = e.buffer.lines.get(e.buffer.ybase + e.buffer.y);
					r && i && (r.isWrapped = i[s.CHAR_DATA_CODE_INDEX] !== s.NULL_CELL_CODE && i[s.CHAR_DATA_CODE_INDEX] !== s.WHITESPACE_CELL_CODE);
				};
			},
			3734: (e, t) => {
				Object.defineProperty(t, "__esModule", { value: !0 }), t.ExtendedAttrs = t.AttributeData = void 0;
				class i {
					constructor() {
						this.fg = 0, this.bg = 0, this.extended = new s();
					}
					static toColorRGB(e) {
						return [
							e >>> 16 & 255,
							e >>> 8 & 255,
							255 & e
						];
					}
					static fromColorRGB(e) {
						return (255 & e[0]) << 16 | (255 & e[1]) << 8 | 255 & e[2];
					}
					clone() {
						const e = new i();
						return e.fg = this.fg, e.bg = this.bg, e.extended = this.extended.clone(), e;
					}
					isInverse() {
						return 67108864 & this.fg;
					}
					isBold() {
						return 134217728 & this.fg;
					}
					isUnderline() {
						return this.hasExtendedAttrs() && 0 !== this.extended.underlineStyle ? 1 : 268435456 & this.fg;
					}
					isBlink() {
						return 536870912 & this.fg;
					}
					isInvisible() {
						return 1073741824 & this.fg;
					}
					isItalic() {
						return 67108864 & this.bg;
					}
					isDim() {
						return 134217728 & this.bg;
					}
					isStrikethrough() {
						return 2147483648 & this.fg;
					}
					isProtected() {
						return 536870912 & this.bg;
					}
					isOverline() {
						return 1073741824 & this.bg;
					}
					getFgColorMode() {
						return 50331648 & this.fg;
					}
					getBgColorMode() {
						return 50331648 & this.bg;
					}
					isFgRGB() {
						return 50331648 == (50331648 & this.fg);
					}
					isBgRGB() {
						return 50331648 == (50331648 & this.bg);
					}
					isFgPalette() {
						return 16777216 == (50331648 & this.fg) || 33554432 == (50331648 & this.fg);
					}
					isBgPalette() {
						return 16777216 == (50331648 & this.bg) || 33554432 == (50331648 & this.bg);
					}
					isFgDefault() {
						return 0 == (50331648 & this.fg);
					}
					isBgDefault() {
						return 0 == (50331648 & this.bg);
					}
					isAttributeDefault() {
						return 0 === this.fg && 0 === this.bg;
					}
					getFgColor() {
						switch (50331648 & this.fg) {
							case 16777216:
							case 33554432: return 255 & this.fg;
							case 50331648: return 16777215 & this.fg;
							default: return -1;
						}
					}
					getBgColor() {
						switch (50331648 & this.bg) {
							case 16777216:
							case 33554432: return 255 & this.bg;
							case 50331648: return 16777215 & this.bg;
							default: return -1;
						}
					}
					hasExtendedAttrs() {
						return 268435456 & this.bg;
					}
					updateExtended() {
						this.extended.isEmpty() ? this.bg &= -268435457 : this.bg |= 268435456;
					}
					getUnderlineColor() {
						if (268435456 & this.bg && ~this.extended.underlineColor) switch (50331648 & this.extended.underlineColor) {
							case 16777216:
							case 33554432: return 255 & this.extended.underlineColor;
							case 50331648: return 16777215 & this.extended.underlineColor;
							default: return this.getFgColor();
						}
						return this.getFgColor();
					}
					getUnderlineColorMode() {
						return 268435456 & this.bg && ~this.extended.underlineColor ? 50331648 & this.extended.underlineColor : this.getFgColorMode();
					}
					isUnderlineColorRGB() {
						return 268435456 & this.bg && ~this.extended.underlineColor ? 50331648 == (50331648 & this.extended.underlineColor) : this.isFgRGB();
					}
					isUnderlineColorPalette() {
						return 268435456 & this.bg && ~this.extended.underlineColor ? 16777216 == (50331648 & this.extended.underlineColor) || 33554432 == (50331648 & this.extended.underlineColor) : this.isFgPalette();
					}
					isUnderlineColorDefault() {
						return 268435456 & this.bg && ~this.extended.underlineColor ? 0 == (50331648 & this.extended.underlineColor) : this.isFgDefault();
					}
					getUnderlineStyle() {
						return 268435456 & this.fg ? 268435456 & this.bg ? this.extended.underlineStyle : 1 : 0;
					}
					getUnderlineVariantOffset() {
						return this.extended.underlineVariantOffset;
					}
				}
				t.AttributeData = i;
				class s {
					get ext() {
						return this._urlId ? -469762049 & this._ext | this.underlineStyle << 26 : this._ext;
					}
					set ext(e) {
						this._ext = e;
					}
					get underlineStyle() {
						return this._urlId ? 5 : (469762048 & this._ext) >> 26;
					}
					set underlineStyle(e) {
						this._ext &= -469762049, this._ext |= e << 26 & 469762048;
					}
					get underlineColor() {
						return 67108863 & this._ext;
					}
					set underlineColor(e) {
						this._ext &= -67108864, this._ext |= 67108863 & e;
					}
					get urlId() {
						return this._urlId;
					}
					set urlId(e) {
						this._urlId = e;
					}
					get underlineVariantOffset() {
						const e = (3758096384 & this._ext) >> 29;
						return e < 0 ? 4294967288 ^ e : e;
					}
					set underlineVariantOffset(e) {
						this._ext &= 536870911, this._ext |= e << 29 & 3758096384;
					}
					constructor(e = 0, t = 0) {
						this._ext = 0, this._urlId = 0, this._ext = e, this._urlId = t;
					}
					clone() {
						return new s(this._ext, this._urlId);
					}
					isEmpty() {
						return 0 === this.underlineStyle && 0 === this._urlId;
					}
				}
				t.ExtendedAttrs = s;
			},
			9092: (e, t, i) => {
				Object.defineProperty(t, "__esModule", { value: !0 }), t.Buffer = t.MAX_BUFFER_SIZE = void 0;
				const s = i(6349), r = i(7226), n = i(3734), o = i(8437), a = i(4634), h = i(511), c = i(643), l = i(4863), d = i(7116);
				t.MAX_BUFFER_SIZE = 4294967295, t.Buffer = class {
					constructor(e, t, i) {
						this._hasScrollback = e, this._optionsService = t, this._bufferService = i, this.ydisp = 0, this.ybase = 0, this.y = 0, this.x = 0, this.tabs = {}, this.savedY = 0, this.savedX = 0, this.savedCurAttrData = o.DEFAULT_ATTR_DATA.clone(), this.savedCharset = d.DEFAULT_CHARSET, this.markers = [], this._nullCell = h.CellData.fromCharData([
							0,
							c.NULL_CELL_CHAR,
							c.NULL_CELL_WIDTH,
							c.NULL_CELL_CODE
						]), this._whitespaceCell = h.CellData.fromCharData([
							0,
							c.WHITESPACE_CELL_CHAR,
							c.WHITESPACE_CELL_WIDTH,
							c.WHITESPACE_CELL_CODE
						]), this._isClearing = !1, this._memoryCleanupQueue = new r.IdleTaskQueue(), this._memoryCleanupPosition = 0, this._cols = this._bufferService.cols, this._rows = this._bufferService.rows, this.lines = new s.CircularList(this._getCorrectBufferLength(this._rows)), this.scrollTop = 0, this.scrollBottom = this._rows - 1, this.setupTabStops();
					}
					getNullCell(e) {
						return e ? (this._nullCell.fg = e.fg, this._nullCell.bg = e.bg, this._nullCell.extended = e.extended) : (this._nullCell.fg = 0, this._nullCell.bg = 0, this._nullCell.extended = new n.ExtendedAttrs()), this._nullCell;
					}
					getWhitespaceCell(e) {
						return e ? (this._whitespaceCell.fg = e.fg, this._whitespaceCell.bg = e.bg, this._whitespaceCell.extended = e.extended) : (this._whitespaceCell.fg = 0, this._whitespaceCell.bg = 0, this._whitespaceCell.extended = new n.ExtendedAttrs()), this._whitespaceCell;
					}
					getBlankLine(e, t) {
						return new o.BufferLine(this._bufferService.cols, this.getNullCell(e), t);
					}
					get hasScrollback() {
						return this._hasScrollback && this.lines.maxLength > this._rows;
					}
					get isCursorInViewport() {
						const e = this.ybase + this.y - this.ydisp;
						return e >= 0 && e < this._rows;
					}
					_getCorrectBufferLength(e) {
						if (!this._hasScrollback) return e;
						const i = e + this._optionsService.rawOptions.scrollback;
						return i > t.MAX_BUFFER_SIZE ? t.MAX_BUFFER_SIZE : i;
					}
					fillViewportRows(e) {
						if (0 === this.lines.length) {
							void 0 === e && (e = o.DEFAULT_ATTR_DATA);
							let t = this._rows;
							for (; t--;) this.lines.push(this.getBlankLine(e));
						}
					}
					clear() {
						this.ydisp = 0, this.ybase = 0, this.y = 0, this.x = 0, this.lines = new s.CircularList(this._getCorrectBufferLength(this._rows)), this.scrollTop = 0, this.scrollBottom = this._rows - 1, this.setupTabStops();
					}
					resize(e, t) {
						const i = this.getNullCell(o.DEFAULT_ATTR_DATA);
						let s = 0;
						const r = this._getCorrectBufferLength(t);
						if (r > this.lines.maxLength && (this.lines.maxLength = r), this.lines.length > 0) {
							if (this._cols < e) for (let t = 0; t < this.lines.length; t++) s += +this.lines.get(t).resize(e, i);
							let n = 0;
							if (this._rows < t) for (let s = this._rows; s < t; s++) this.lines.length < t + this.ybase && (this._optionsService.rawOptions.windowsMode || void 0 !== this._optionsService.rawOptions.windowsPty.backend || void 0 !== this._optionsService.rawOptions.windowsPty.buildNumber ? this.lines.push(new o.BufferLine(e, i)) : this.ybase > 0 && this.lines.length <= this.ybase + this.y + n + 1 ? (this.ybase--, n++, this.ydisp > 0 && this.ydisp--) : this.lines.push(new o.BufferLine(e, i)));
							else for (let e = this._rows; e > t; e--) this.lines.length > t + this.ybase && (this.lines.length > this.ybase + this.y + 1 ? this.lines.pop() : (this.ybase++, this.ydisp++));
							if (r < this.lines.maxLength) {
								const e = this.lines.length - r;
								e > 0 && (this.lines.trimStart(e), this.ybase = Math.max(this.ybase - e, 0), this.ydisp = Math.max(this.ydisp - e, 0), this.savedY = Math.max(this.savedY - e, 0)), this.lines.maxLength = r;
							}
							this.x = Math.min(this.x, e - 1), this.y = Math.min(this.y, t - 1), n && (this.y += n), this.savedX = Math.min(this.savedX, e - 1), this.scrollTop = 0;
						}
						if (this.scrollBottom = t - 1, this._isReflowEnabled && (this._reflow(e, t), this._cols > e)) for (let t = 0; t < this.lines.length; t++) s += +this.lines.get(t).resize(e, i);
						this._cols = e, this._rows = t, this._memoryCleanupQueue.clear(), s > .1 * this.lines.length && (this._memoryCleanupPosition = 0, this._memoryCleanupQueue.enqueue((() => this._batchedMemoryCleanup())));
					}
					_batchedMemoryCleanup() {
						let e = !0;
						this._memoryCleanupPosition >= this.lines.length && (this._memoryCleanupPosition = 0, e = !1);
						let t = 0;
						for (; this._memoryCleanupPosition < this.lines.length;) if (t += this.lines.get(this._memoryCleanupPosition++).cleanupMemory(), t > 100) return !0;
						return e;
					}
					get _isReflowEnabled() {
						const e = this._optionsService.rawOptions.windowsPty;
						return e && e.buildNumber ? this._hasScrollback && "conpty" === e.backend && e.buildNumber >= 21376 : this._hasScrollback && !this._optionsService.rawOptions.windowsMode;
					}
					_reflow(e, t) {
						this._cols !== e && (e > this._cols ? this._reflowLarger(e, t) : this._reflowSmaller(e, t));
					}
					_reflowLarger(e, t) {
						const i = (0, a.reflowLargerGetLinesToRemove)(this.lines, this._cols, e, this.ybase + this.y, this.getNullCell(o.DEFAULT_ATTR_DATA));
						if (i.length > 0) {
							const s = (0, a.reflowLargerCreateNewLayout)(this.lines, i);
							(0, a.reflowLargerApplyNewLayout)(this.lines, s.layout), this._reflowLargerAdjustViewport(e, t, s.countRemoved);
						}
					}
					_reflowLargerAdjustViewport(e, t, i) {
						const s = this.getNullCell(o.DEFAULT_ATTR_DATA);
						let r = i;
						for (; r-- > 0;) 0 === this.ybase ? (this.y > 0 && this.y--, this.lines.length < t && this.lines.push(new o.BufferLine(e, s))) : (this.ydisp === this.ybase && this.ydisp--, this.ybase--);
						this.savedY = Math.max(this.savedY - i, 0);
					}
					_reflowSmaller(e, t) {
						const i = this.getNullCell(o.DEFAULT_ATTR_DATA), s = [];
						let r = 0;
						for (let n = this.lines.length - 1; n >= 0; n--) {
							let h = this.lines.get(n);
							if (!h || !h.isWrapped && h.getTrimmedLength() <= e) continue;
							const c = [h];
							for (; h.isWrapped && n > 0;) h = this.lines.get(--n), c.unshift(h);
							const l = this.ybase + this.y;
							if (l >= n && l < n + c.length) continue;
							const d = c[c.length - 1].getTrimmedLength(), _ = (0, a.reflowSmallerGetNewLineLengths)(c, this._cols, e), u = _.length - c.length;
							let f;
							f = 0 === this.ybase && this.y !== this.lines.length - 1 ? Math.max(0, this.y - this.lines.maxLength + u) : Math.max(0, this.lines.length - this.lines.maxLength + u);
							const v = [];
							for (let e = 0; e < u; e++) {
								const e = this.getBlankLine(o.DEFAULT_ATTR_DATA, !0);
								v.push(e);
							}
							v.length > 0 && (s.push({
								start: n + c.length + r,
								newLines: v
							}), r += v.length), c.push(...v);
							let p = _.length - 1, g = _[p];
							0 === g && (p--, g = _[p]);
							let m = c.length - u - 1, S = d;
							for (; m >= 0;) {
								const e = Math.min(S, g);
								if (void 0 === c[p]) break;
								if (c[p].copyCellsFrom(c[m], S - e, g - e, e, !0), g -= e, 0 === g && (p--, g = _[p]), S -= e, 0 === S) {
									m--;
									const e = Math.max(m, 0);
									S = (0, a.getWrappedLineTrimmedLength)(c, e, this._cols);
								}
							}
							for (let t = 0; t < c.length; t++) _[t] < e && c[t].setCell(_[t], i);
							let C = u - f;
							for (; C-- > 0;) 0 === this.ybase ? this.y < t - 1 ? (this.y++, this.lines.pop()) : (this.ybase++, this.ydisp++) : this.ybase < Math.min(this.lines.maxLength, this.lines.length + r) - t && (this.ybase === this.ydisp && this.ydisp++, this.ybase++);
							this.savedY = Math.min(this.savedY + u, this.ybase + t - 1);
						}
						if (s.length > 0) {
							const e = [], t = [];
							for (let e = 0; e < this.lines.length; e++) t.push(this.lines.get(e));
							const i = this.lines.length;
							let n = i - 1, o = 0, a = s[o];
							this.lines.length = Math.min(this.lines.maxLength, this.lines.length + r);
							let h = 0;
							for (let c = Math.min(this.lines.maxLength - 1, i + r - 1); c >= 0; c--) if (a && a.start > n + h) {
								for (let e = a.newLines.length - 1; e >= 0; e--) this.lines.set(c--, a.newLines[e]);
								c++, e.push({
									index: n + 1,
									amount: a.newLines.length
								}), h += a.newLines.length, a = s[++o];
							} else this.lines.set(c, t[n--]);
							let c = 0;
							for (let t = e.length - 1; t >= 0; t--) e[t].index += c, this.lines.onInsertEmitter.fire(e[t]), c += e[t].amount;
							const l = Math.max(0, i + r - this.lines.maxLength);
							l > 0 && this.lines.onTrimEmitter.fire(l);
						}
					}
					translateBufferLineToString(e, t, i = 0, s) {
						const r = this.lines.get(e);
						return r ? r.translateToString(t, i, s) : "";
					}
					getWrappedRangeForLine(e) {
						let t = e, i = e;
						for (; t > 0 && this.lines.get(t).isWrapped;) t--;
						for (; i + 1 < this.lines.length && this.lines.get(i + 1).isWrapped;) i++;
						return {
							first: t,
							last: i
						};
					}
					setupTabStops(e) {
						for (null != e ? this.tabs[e] || (e = this.prevStop(e)) : (this.tabs = {}, e = 0); e < this._cols; e += this._optionsService.rawOptions.tabStopWidth) this.tabs[e] = !0;
					}
					prevStop(e) {
						for (e ??= this.x; !this.tabs[--e] && e > 0;);
						return e >= this._cols ? this._cols - 1 : e < 0 ? 0 : e;
					}
					nextStop(e) {
						for (e ??= this.x; !this.tabs[++e] && e < this._cols;);
						return e >= this._cols ? this._cols - 1 : e < 0 ? 0 : e;
					}
					clearMarkers(e) {
						this._isClearing = !0;
						for (let t = 0; t < this.markers.length; t++) this.markers[t].line === e && (this.markers[t].dispose(), this.markers.splice(t--, 1));
						this._isClearing = !1;
					}
					clearAllMarkers() {
						this._isClearing = !0;
						for (let e = 0; e < this.markers.length; e++) this.markers[e].dispose(), this.markers.splice(e--, 1);
						this._isClearing = !1;
					}
					addMarker(e) {
						const t = new l.Marker(e);
						return this.markers.push(t), t.register(this.lines.onTrim(((e) => {
							t.line -= e, t.line < 0 && t.dispose();
						}))), t.register(this.lines.onInsert(((e) => {
							t.line >= e.index && (t.line += e.amount);
						}))), t.register(this.lines.onDelete(((e) => {
							t.line >= e.index && t.line < e.index + e.amount && t.dispose(), t.line > e.index && (t.line -= e.amount);
						}))), t.register(t.onDispose((() => this._removeMarker(t)))), t;
					}
					_removeMarker(e) {
						this._isClearing || this.markers.splice(this.markers.indexOf(e), 1);
					}
				};
			},
			8437: (e, t, i) => {
				Object.defineProperty(t, "__esModule", { value: !0 }), t.BufferLine = t.DEFAULT_ATTR_DATA = void 0;
				const s = i(3734), r = i(511), n = i(643), o = i(482);
				t.DEFAULT_ATTR_DATA = Object.freeze(new s.AttributeData());
				let a = 0;
				class h {
					constructor(e, t, i = !1) {
						this.isWrapped = i, this._combined = {}, this._extendedAttrs = {}, this._data = new Uint32Array(3 * e);
						const s = t || r.CellData.fromCharData([
							0,
							n.NULL_CELL_CHAR,
							n.NULL_CELL_WIDTH,
							n.NULL_CELL_CODE
						]);
						for (let t = 0; t < e; ++t) this.setCell(t, s);
						this.length = e;
					}
					get(e) {
						const t = this._data[3 * e + 0], i = 2097151 & t;
						return [
							this._data[3 * e + 1],
							2097152 & t ? this._combined[e] : i ? (0, o.stringFromCodePoint)(i) : "",
							t >> 22,
							2097152 & t ? this._combined[e].charCodeAt(this._combined[e].length - 1) : i
						];
					}
					set(e, t) {
						this._data[3 * e + 1] = t[n.CHAR_DATA_ATTR_INDEX], t[n.CHAR_DATA_CHAR_INDEX].length > 1 ? (this._combined[e] = t[1], this._data[3 * e + 0] = 2097152 | e | t[n.CHAR_DATA_WIDTH_INDEX] << 22) : this._data[3 * e + 0] = t[n.CHAR_DATA_CHAR_INDEX].charCodeAt(0) | t[n.CHAR_DATA_WIDTH_INDEX] << 22;
					}
					getWidth(e) {
						return this._data[3 * e + 0] >> 22;
					}
					hasWidth(e) {
						return 12582912 & this._data[3 * e + 0];
					}
					getFg(e) {
						return this._data[3 * e + 1];
					}
					getBg(e) {
						return this._data[3 * e + 2];
					}
					hasContent(e) {
						return 4194303 & this._data[3 * e + 0];
					}
					getCodePoint(e) {
						const t = this._data[3 * e + 0];
						return 2097152 & t ? this._combined[e].charCodeAt(this._combined[e].length - 1) : 2097151 & t;
					}
					isCombined(e) {
						return 2097152 & this._data[3 * e + 0];
					}
					getString(e) {
						const t = this._data[3 * e + 0];
						return 2097152 & t ? this._combined[e] : 2097151 & t ? (0, o.stringFromCodePoint)(2097151 & t) : "";
					}
					isProtected(e) {
						return 536870912 & this._data[3 * e + 2];
					}
					loadCell(e, t) {
						return a = 3 * e, t.content = this._data[a + 0], t.fg = this._data[a + 1], t.bg = this._data[a + 2], 2097152 & t.content && (t.combinedData = this._combined[e]), 268435456 & t.bg && (t.extended = this._extendedAttrs[e]), t;
					}
					setCell(e, t) {
						2097152 & t.content && (this._combined[e] = t.combinedData), 268435456 & t.bg && (this._extendedAttrs[e] = t.extended), this._data[3 * e + 0] = t.content, this._data[3 * e + 1] = t.fg, this._data[3 * e + 2] = t.bg;
					}
					setCellFromCodepoint(e, t, i, s) {
						268435456 & s.bg && (this._extendedAttrs[e] = s.extended), this._data[3 * e + 0] = t | i << 22, this._data[3 * e + 1] = s.fg, this._data[3 * e + 2] = s.bg;
					}
					addCodepointToCell(e, t, i) {
						let s = this._data[3 * e + 0];
						2097152 & s ? this._combined[e] += (0, o.stringFromCodePoint)(t) : 2097151 & s ? (this._combined[e] = (0, o.stringFromCodePoint)(2097151 & s) + (0, o.stringFromCodePoint)(t), s &= -2097152, s |= 2097152) : s = t | 1 << 22, i && (s &= -12582913, s |= i << 22), this._data[3 * e + 0] = s;
					}
					insertCells(e, t, i) {
						if ((e %= this.length) && 2 === this.getWidth(e - 1) && this.setCellFromCodepoint(e - 1, 0, 1, i), t < this.length - e) {
							const s = new r.CellData();
							for (let i = this.length - e - t - 1; i >= 0; --i) this.setCell(e + t + i, this.loadCell(e + i, s));
							for (let s = 0; s < t; ++s) this.setCell(e + s, i);
						} else for (let t = e; t < this.length; ++t) this.setCell(t, i);
						2 === this.getWidth(this.length - 1) && this.setCellFromCodepoint(this.length - 1, 0, 1, i);
					}
					deleteCells(e, t, i) {
						if (e %= this.length, t < this.length - e) {
							const s = new r.CellData();
							for (let i = 0; i < this.length - e - t; ++i) this.setCell(e + i, this.loadCell(e + t + i, s));
							for (let e = this.length - t; e < this.length; ++e) this.setCell(e, i);
						} else for (let t = e; t < this.length; ++t) this.setCell(t, i);
						e && 2 === this.getWidth(e - 1) && this.setCellFromCodepoint(e - 1, 0, 1, i), 0 !== this.getWidth(e) || this.hasContent(e) || this.setCellFromCodepoint(e, 0, 1, i);
					}
					replaceCells(e, t, i, s = !1) {
						if (s) for (e && 2 === this.getWidth(e - 1) && !this.isProtected(e - 1) && this.setCellFromCodepoint(e - 1, 0, 1, i), t < this.length && 2 === this.getWidth(t - 1) && !this.isProtected(t) && this.setCellFromCodepoint(t, 0, 1, i); e < t && e < this.length;) this.isProtected(e) || this.setCell(e, i), e++;
						else for (e && 2 === this.getWidth(e - 1) && this.setCellFromCodepoint(e - 1, 0, 1, i), t < this.length && 2 === this.getWidth(t - 1) && this.setCellFromCodepoint(t, 0, 1, i); e < t && e < this.length;) this.setCell(e++, i);
					}
					resize(e, t) {
						if (e === this.length) return 4 * this._data.length * 2 < this._data.buffer.byteLength;
						const i = 3 * e;
						if (e > this.length) {
							if (this._data.buffer.byteLength >= 4 * i) this._data = new Uint32Array(this._data.buffer, 0, i);
							else {
								const e = new Uint32Array(i);
								e.set(this._data), this._data = e;
							}
							for (let i = this.length; i < e; ++i) this.setCell(i, t);
						} else {
							this._data = this._data.subarray(0, i);
							const t = Object.keys(this._combined);
							for (let i = 0; i < t.length; i++) {
								const s = parseInt(t[i], 10);
								s >= e && delete this._combined[s];
							}
							const s = Object.keys(this._extendedAttrs);
							for (let t = 0; t < s.length; t++) {
								const i = parseInt(s[t], 10);
								i >= e && delete this._extendedAttrs[i];
							}
						}
						return this.length = e, 4 * i * 2 < this._data.buffer.byteLength;
					}
					cleanupMemory() {
						if (4 * this._data.length * 2 < this._data.buffer.byteLength) {
							const e = new Uint32Array(this._data.length);
							return e.set(this._data), this._data = e, 1;
						}
						return 0;
					}
					fill(e, t = !1) {
						if (t) for (let t = 0; t < this.length; ++t) this.isProtected(t) || this.setCell(t, e);
						else {
							this._combined = {}, this._extendedAttrs = {};
							for (let t = 0; t < this.length; ++t) this.setCell(t, e);
						}
					}
					copyFrom(e) {
						this.length !== e.length ? this._data = new Uint32Array(e._data) : this._data.set(e._data), this.length = e.length, this._combined = {};
						for (const t in e._combined) this._combined[t] = e._combined[t];
						this._extendedAttrs = {};
						for (const t in e._extendedAttrs) this._extendedAttrs[t] = e._extendedAttrs[t];
						this.isWrapped = e.isWrapped;
					}
					clone() {
						const e = new h(0);
						e._data = new Uint32Array(this._data), e.length = this.length;
						for (const t in this._combined) e._combined[t] = this._combined[t];
						for (const t in this._extendedAttrs) e._extendedAttrs[t] = this._extendedAttrs[t];
						return e.isWrapped = this.isWrapped, e;
					}
					getTrimmedLength() {
						for (let e = this.length - 1; e >= 0; --e) if (4194303 & this._data[3 * e + 0]) return e + (this._data[3 * e + 0] >> 22);
						return 0;
					}
					getNoBgTrimmedLength() {
						for (let e = this.length - 1; e >= 0; --e) if (4194303 & this._data[3 * e + 0] || 50331648 & this._data[3 * e + 2]) return e + (this._data[3 * e + 0] >> 22);
						return 0;
					}
					copyCellsFrom(e, t, i, s, r) {
						const n = e._data;
						if (r) for (let r = s - 1; r >= 0; r--) {
							for (let e = 0; e < 3; e++) this._data[3 * (i + r) + e] = n[3 * (t + r) + e];
							268435456 & n[3 * (t + r) + 2] && (this._extendedAttrs[i + r] = e._extendedAttrs[t + r]);
						}
						else for (let r = 0; r < s; r++) {
							for (let e = 0; e < 3; e++) this._data[3 * (i + r) + e] = n[3 * (t + r) + e];
							268435456 & n[3 * (t + r) + 2] && (this._extendedAttrs[i + r] = e._extendedAttrs[t + r]);
						}
						const o = Object.keys(e._combined);
						for (let s = 0; s < o.length; s++) {
							const r = parseInt(o[s], 10);
							r >= t && (this._combined[r - t + i] = e._combined[r]);
						}
					}
					translateToString(e, t, i, s) {
						t = t ?? 0, i = i ?? this.length, e && (i = Math.min(i, this.getTrimmedLength())), s && (s.length = 0);
						let r = "";
						for (; t < i;) {
							const e = this._data[3 * t + 0], i = 2097151 & e, a = 2097152 & e ? this._combined[t] : i ? (0, o.stringFromCodePoint)(i) : n.WHITESPACE_CELL_CHAR;
							if (r += a, s) for (let e = 0; e < a.length; ++e) s.push(t);
							t += e >> 22 || 1;
						}
						return s && s.push(t), r;
					}
				}
				t.BufferLine = h;
			},
			4841: (e, t) => {
				Object.defineProperty(t, "__esModule", { value: !0 }), t.getRangeLength = void 0, t.getRangeLength = function(e, t) {
					if (e.start.y > e.end.y) throw new Error(`Buffer range end (${e.end.x}, ${e.end.y}) cannot be before start (${e.start.x}, ${e.start.y})`);
					return t * (e.end.y - e.start.y) + (e.end.x - e.start.x + 1);
				};
			},
			4634: (e, t) => {
				function i(e, t, i) {
					if (t === e.length - 1) return e[t].getTrimmedLength();
					const s = !e[t].hasContent(i - 1) && 1 === e[t].getWidth(i - 1), r = 2 === e[t + 1].getWidth(0);
					return s && r ? i - 1 : i;
				}
				Object.defineProperty(t, "__esModule", { value: !0 }), t.getWrappedLineTrimmedLength = t.reflowSmallerGetNewLineLengths = t.reflowLargerApplyNewLayout = t.reflowLargerCreateNewLayout = t.reflowLargerGetLinesToRemove = void 0, t.reflowLargerGetLinesToRemove = function(e, t, s, r, n) {
					const o = [];
					for (let a = 0; a < e.length - 1; a++) {
						let h = a, c = e.get(++h);
						if (!c.isWrapped) continue;
						const l = [e.get(a)];
						for (; h < e.length && c.isWrapped;) l.push(c), c = e.get(++h);
						if (r >= a && r < h) {
							a += l.length - 1;
							continue;
						}
						let d = 0, _ = i(l, d, t), u = 1, f = 0;
						for (; u < l.length;) {
							const e = i(l, u, t), r = e - f, o = s - _, a = Math.min(r, o);
							l[d].copyCellsFrom(l[u], f, _, a, !1), _ += a, _ === s && (d++, _ = 0), f += a, f === e && (u++, f = 0), 0 === _ && 0 !== d && 2 === l[d - 1].getWidth(s - 1) && (l[d].copyCellsFrom(l[d - 1], s - 1, _++, 1, !1), l[d - 1].setCell(s - 1, n));
						}
						l[d].replaceCells(_, s, n);
						let v = 0;
						for (let e = l.length - 1; e > 0 && (e > d || 0 === l[e].getTrimmedLength()); e--) v++;
						v > 0 && (o.push(a + l.length - v), o.push(v)), a += l.length - 1;
					}
					return o;
				}, t.reflowLargerCreateNewLayout = function(e, t) {
					const i = [];
					let s = 0, r = t[s], n = 0;
					for (let o = 0; o < e.length; o++) if (r === o) {
						const i = t[++s];
						e.onDeleteEmitter.fire({
							index: o - n,
							amount: i
						}), o += i - 1, n += i, r = t[++s];
					} else i.push(o);
					return {
						layout: i,
						countRemoved: n
					};
				}, t.reflowLargerApplyNewLayout = function(e, t) {
					const i = [];
					for (let s = 0; s < t.length; s++) i.push(e.get(t[s]));
					for (let t = 0; t < i.length; t++) e.set(t, i[t]);
					e.length = t.length;
				}, t.reflowSmallerGetNewLineLengths = function(e, t, s) {
					const r = [], n = e.map(((s, r) => i(e, r, t))).reduce(((e, t) => e + t));
					let o = 0, a = 0, h = 0;
					for (; h < n;) {
						if (n - h < s) {
							r.push(n - h);
							break;
						}
						o += s;
						const c = i(e, a, t);
						o > c && (o -= c, a++);
						const l = 2 === e[a].getWidth(o - 1);
						l && o--;
						const d = l ? s - 1 : s;
						r.push(d), h += d;
					}
					return r;
				}, t.getWrappedLineTrimmedLength = i;
			},
			5295: (e, t, i) => {
				Object.defineProperty(t, "__esModule", { value: !0 }), t.BufferSet = void 0;
				const s = i(8460), r = i(844), n = i(9092);
				class o extends r.Disposable {
					constructor(e, t) {
						super(), this._optionsService = e, this._bufferService = t, this._onBufferActivate = this.register(new s.EventEmitter()), this.onBufferActivate = this._onBufferActivate.event, this.reset(), this.register(this._optionsService.onSpecificOptionChange("scrollback", (() => this.resize(this._bufferService.cols, this._bufferService.rows)))), this.register(this._optionsService.onSpecificOptionChange("tabStopWidth", (() => this.setupTabStops())));
					}
					reset() {
						this._normal = new n.Buffer(!0, this._optionsService, this._bufferService), this._normal.fillViewportRows(), this._alt = new n.Buffer(!1, this._optionsService, this._bufferService), this._activeBuffer = this._normal, this._onBufferActivate.fire({
							activeBuffer: this._normal,
							inactiveBuffer: this._alt
						}), this.setupTabStops();
					}
					get alt() {
						return this._alt;
					}
					get active() {
						return this._activeBuffer;
					}
					get normal() {
						return this._normal;
					}
					activateNormalBuffer() {
						this._activeBuffer !== this._normal && (this._normal.x = this._alt.x, this._normal.y = this._alt.y, this._alt.clearAllMarkers(), this._alt.clear(), this._activeBuffer = this._normal, this._onBufferActivate.fire({
							activeBuffer: this._normal,
							inactiveBuffer: this._alt
						}));
					}
					activateAltBuffer(e) {
						this._activeBuffer !== this._alt && (this._alt.fillViewportRows(e), this._alt.x = this._normal.x, this._alt.y = this._normal.y, this._activeBuffer = this._alt, this._onBufferActivate.fire({
							activeBuffer: this._alt,
							inactiveBuffer: this._normal
						}));
					}
					resize(e, t) {
						this._normal.resize(e, t), this._alt.resize(e, t), this.setupTabStops(e);
					}
					setupTabStops(e) {
						this._normal.setupTabStops(e), this._alt.setupTabStops(e);
					}
				}
				t.BufferSet = o;
			},
			511: (e, t, i) => {
				Object.defineProperty(t, "__esModule", { value: !0 }), t.CellData = void 0;
				const s = i(482), r = i(643), n = i(3734);
				class o extends n.AttributeData {
					constructor() {
						super(...arguments), this.content = 0, this.fg = 0, this.bg = 0, this.extended = new n.ExtendedAttrs(), this.combinedData = "";
					}
					static fromCharData(e) {
						const t = new o();
						return t.setFromCharData(e), t;
					}
					isCombined() {
						return 2097152 & this.content;
					}
					getWidth() {
						return this.content >> 22;
					}
					getChars() {
						return 2097152 & this.content ? this.combinedData : 2097151 & this.content ? (0, s.stringFromCodePoint)(2097151 & this.content) : "";
					}
					getCode() {
						return this.isCombined() ? this.combinedData.charCodeAt(this.combinedData.length - 1) : 2097151 & this.content;
					}
					setFromCharData(e) {
						this.fg = e[r.CHAR_DATA_ATTR_INDEX], this.bg = 0;
						let t = !1;
						if (e[r.CHAR_DATA_CHAR_INDEX].length > 2) t = !0;
						else if (2 === e[r.CHAR_DATA_CHAR_INDEX].length) {
							const i = e[r.CHAR_DATA_CHAR_INDEX].charCodeAt(0);
							if (55296 <= i && i <= 56319) {
								const s = e[r.CHAR_DATA_CHAR_INDEX].charCodeAt(1);
								56320 <= s && s <= 57343 ? this.content = 1024 * (i - 55296) + s - 56320 + 65536 | e[r.CHAR_DATA_WIDTH_INDEX] << 22 : t = !0;
							} else t = !0;
						} else this.content = e[r.CHAR_DATA_CHAR_INDEX].charCodeAt(0) | e[r.CHAR_DATA_WIDTH_INDEX] << 22;
						t && (this.combinedData = e[r.CHAR_DATA_CHAR_INDEX], this.content = 2097152 | e[r.CHAR_DATA_WIDTH_INDEX] << 22);
					}
					getAsCharData() {
						return [
							this.fg,
							this.getChars(),
							this.getWidth(),
							this.getCode()
						];
					}
				}
				t.CellData = o;
			},
			643: (e, t) => {
				Object.defineProperty(t, "__esModule", { value: !0 }), t.WHITESPACE_CELL_CODE = t.WHITESPACE_CELL_WIDTH = t.WHITESPACE_CELL_CHAR = t.NULL_CELL_CODE = t.NULL_CELL_WIDTH = t.NULL_CELL_CHAR = t.CHAR_DATA_CODE_INDEX = t.CHAR_DATA_WIDTH_INDEX = t.CHAR_DATA_CHAR_INDEX = t.CHAR_DATA_ATTR_INDEX = t.DEFAULT_EXT = t.DEFAULT_ATTR = t.DEFAULT_COLOR = void 0, t.DEFAULT_COLOR = 0, t.DEFAULT_ATTR = 256 | t.DEFAULT_COLOR << 9, t.DEFAULT_EXT = 0, t.CHAR_DATA_ATTR_INDEX = 0, t.CHAR_DATA_CHAR_INDEX = 1, t.CHAR_DATA_WIDTH_INDEX = 2, t.CHAR_DATA_CODE_INDEX = 3, t.NULL_CELL_CHAR = "", t.NULL_CELL_WIDTH = 1, t.NULL_CELL_CODE = 0, t.WHITESPACE_CELL_CHAR = " ", t.WHITESPACE_CELL_WIDTH = 1, t.WHITESPACE_CELL_CODE = 32;
			},
			4863: (e, t, i) => {
				Object.defineProperty(t, "__esModule", { value: !0 }), t.Marker = void 0;
				const s = i(8460), r = i(844);
				class n {
					get id() {
						return this._id;
					}
					constructor(e) {
						this.line = e, this.isDisposed = !1, this._disposables = [], this._id = n._nextId++, this._onDispose = this.register(new s.EventEmitter()), this.onDispose = this._onDispose.event;
					}
					dispose() {
						this.isDisposed || (this.isDisposed = !0, this.line = -1, this._onDispose.fire(), (0, r.disposeArray)(this._disposables), this._disposables.length = 0);
					}
					register(e) {
						return this._disposables.push(e), e;
					}
				}
				t.Marker = n, n._nextId = 1;
			},
			7116: (e, t) => {
				Object.defineProperty(t, "__esModule", { value: !0 }), t.DEFAULT_CHARSET = t.CHARSETS = void 0, t.CHARSETS = {}, t.DEFAULT_CHARSET = t.CHARSETS.B, t.CHARSETS[0] = {
					"`": "◆",
					a: "▒",
					b: "␉",
					c: "␌",
					d: "␍",
					e: "␊",
					f: "°",
					g: "±",
					h: "␤",
					i: "␋",
					j: "┘",
					k: "┐",
					l: "┌",
					m: "└",
					n: "┼",
					o: "⎺",
					p: "⎻",
					q: "─",
					r: "⎼",
					s: "⎽",
					t: "├",
					u: "┤",
					v: "┴",
					w: "┬",
					x: "│",
					y: "≤",
					z: "≥",
					"{": "π",
					"|": "≠",
					"}": "£",
					"~": "·"
				}, t.CHARSETS.A = { "#": "£" }, t.CHARSETS.B = void 0, t.CHARSETS[4] = {
					"#": "£",
					"@": "¾",
					"[": "ij",
					"\\": "½",
					"]": "|",
					"{": "¨",
					"|": "f",
					"}": "¼",
					"~": "´"
				}, t.CHARSETS.C = t.CHARSETS[5] = {
					"[": "Ä",
					"\\": "Ö",
					"]": "Å",
					"^": "Ü",
					"`": "é",
					"{": "ä",
					"|": "ö",
					"}": "å",
					"~": "ü"
				}, t.CHARSETS.R = {
					"#": "£",
					"@": "à",
					"[": "°",
					"\\": "ç",
					"]": "§",
					"{": "é",
					"|": "ù",
					"}": "è",
					"~": "¨"
				}, t.CHARSETS.Q = {
					"@": "à",
					"[": "â",
					"\\": "ç",
					"]": "ê",
					"^": "î",
					"`": "ô",
					"{": "é",
					"|": "ù",
					"}": "è",
					"~": "û"
				}, t.CHARSETS.K = {
					"@": "§",
					"[": "Ä",
					"\\": "Ö",
					"]": "Ü",
					"{": "ä",
					"|": "ö",
					"}": "ü",
					"~": "ß"
				}, t.CHARSETS.Y = {
					"#": "£",
					"@": "§",
					"[": "°",
					"\\": "ç",
					"]": "é",
					"`": "ù",
					"{": "à",
					"|": "ò",
					"}": "è",
					"~": "ì"
				}, t.CHARSETS.E = t.CHARSETS[6] = {
					"@": "Ä",
					"[": "Æ",
					"\\": "Ø",
					"]": "Å",
					"^": "Ü",
					"`": "ä",
					"{": "æ",
					"|": "ø",
					"}": "å",
					"~": "ü"
				}, t.CHARSETS.Z = {
					"#": "£",
					"@": "§",
					"[": "¡",
					"\\": "Ñ",
					"]": "¿",
					"{": "°",
					"|": "ñ",
					"}": "ç"
				}, t.CHARSETS.H = t.CHARSETS[7] = {
					"@": "É",
					"[": "Ä",
					"\\": "Ö",
					"]": "Å",
					"^": "Ü",
					"`": "é",
					"{": "ä",
					"|": "ö",
					"}": "å",
					"~": "ü"
				}, t.CHARSETS["="] = {
					"#": "ù",
					"@": "à",
					"[": "é",
					"\\": "ç",
					"]": "ê",
					"^": "î",
					_: "è",
					"`": "ô",
					"{": "ä",
					"|": "ö",
					"}": "ü",
					"~": "û"
				};
			},
			2584: (e, t) => {
				var i, s, r;
				Object.defineProperty(t, "__esModule", { value: !0 }), t.C1_ESCAPED = t.C1 = t.C0 = void 0, function(e) {
					e.NUL = "\0", e.SOH = "", e.STX = "", e.ETX = "", e.EOT = "", e.ENQ = "", e.ACK = "", e.BEL = "\x07", e.BS = "\b", e.HT = "	", e.LF = "\n", e.VT = "\v", e.FF = "\f", e.CR = "\r", e.SO = "", e.SI = "", e.DLE = "", e.DC1 = "", e.DC2 = "", e.DC3 = "", e.DC4 = "", e.NAK = "", e.SYN = "", e.ETB = "", e.CAN = "", e.EM = "", e.SUB = "", e.ESC = "\x1B", e.FS = "", e.GS = "", e.RS = "", e.US = "", e.SP = " ", e.DEL = "";
				}(i || (t.C0 = i = {})), function(e) {
					e.PAD = "", e.HOP = "", e.BPH = "", e.NBH = "", e.IND = "", e.NEL = "", e.SSA = "", e.ESA = "", e.HTS = "", e.HTJ = "", e.VTS = "", e.PLD = "", e.PLU = "", e.RI = "", e.SS2 = "", e.SS3 = "", e.DCS = "", e.PU1 = "", e.PU2 = "", e.STS = "", e.CCH = "", e.MW = "", e.SPA = "", e.EPA = "", e.SOS = "", e.SGCI = "", e.SCI = "", e.CSI = "", e.ST = "", e.OSC = "", e.PM = "", e.APC = "";
				}(s || (t.C1 = s = {})), function(e) {
					e.ST = `${i.ESC}\\`;
				}(r || (t.C1_ESCAPED = r = {}));
			},
			7399: (e, t, i) => {
				Object.defineProperty(t, "__esModule", { value: !0 }), t.evaluateKeyboardEvent = void 0;
				const s = i(2584), r = {
					48: ["0", ")"],
					49: ["1", "!"],
					50: ["2", "@"],
					51: ["3", "#"],
					52: ["4", "$"],
					53: ["5", "%"],
					54: ["6", "^"],
					55: ["7", "&"],
					56: ["8", "*"],
					57: ["9", "("],
					186: [";", ":"],
					187: ["=", "+"],
					188: [",", "<"],
					189: ["-", "_"],
					190: [".", ">"],
					191: ["/", "?"],
					192: ["`", "~"],
					219: ["[", "{"],
					220: ["\\", "|"],
					221: ["]", "}"],
					222: ["'", "\""]
				};
				t.evaluateKeyboardEvent = function(e, t, i, n) {
					const o = {
						type: 0,
						cancel: !1,
						key: void 0
					}, a = (e.shiftKey ? 1 : 0) | (e.altKey ? 2 : 0) | (e.ctrlKey ? 4 : 0) | (e.metaKey ? 8 : 0);
					switch (e.keyCode) {
						case 0:
							"UIKeyInputUpArrow" === e.key ? o.key = t ? s.C0.ESC + "OA" : s.C0.ESC + "[A" : "UIKeyInputLeftArrow" === e.key ? o.key = t ? s.C0.ESC + "OD" : s.C0.ESC + "[D" : "UIKeyInputRightArrow" === e.key ? o.key = t ? s.C0.ESC + "OC" : s.C0.ESC + "[C" : "UIKeyInputDownArrow" === e.key && (o.key = t ? s.C0.ESC + "OB" : s.C0.ESC + "[B");
							break;
						case 8:
							o.key = e.ctrlKey ? "\b" : s.C0.DEL, e.altKey && (o.key = s.C0.ESC + o.key);
							break;
						case 9:
							if (e.shiftKey) {
								o.key = s.C0.ESC + "[Z";
								break;
							}
							o.key = s.C0.HT, o.cancel = !0;
							break;
						case 13:
							o.key = e.altKey ? s.C0.ESC + s.C0.CR : s.C0.CR, o.cancel = !0;
							break;
						case 27:
							o.key = s.C0.ESC, e.altKey && (o.key = s.C0.ESC + s.C0.ESC), o.cancel = !0;
							break;
						case 37:
							if (e.metaKey) break;
							a ? (o.key = s.C0.ESC + "[1;" + (a + 1) + "D", o.key === s.C0.ESC + "[1;3D" && (o.key = s.C0.ESC + (i ? "b" : "[1;5D"))) : o.key = t ? s.C0.ESC + "OD" : s.C0.ESC + "[D";
							break;
						case 39:
							if (e.metaKey) break;
							a ? (o.key = s.C0.ESC + "[1;" + (a + 1) + "C", o.key === s.C0.ESC + "[1;3C" && (o.key = s.C0.ESC + (i ? "f" : "[1;5C"))) : o.key = t ? s.C0.ESC + "OC" : s.C0.ESC + "[C";
							break;
						case 38:
							if (e.metaKey) break;
							a ? (o.key = s.C0.ESC + "[1;" + (a + 1) + "A", i || o.key !== s.C0.ESC + "[1;3A" || (o.key = s.C0.ESC + "[1;5A")) : o.key = t ? s.C0.ESC + "OA" : s.C0.ESC + "[A";
							break;
						case 40:
							if (e.metaKey) break;
							a ? (o.key = s.C0.ESC + "[1;" + (a + 1) + "B", i || o.key !== s.C0.ESC + "[1;3B" || (o.key = s.C0.ESC + "[1;5B")) : o.key = t ? s.C0.ESC + "OB" : s.C0.ESC + "[B";
							break;
						case 45:
							e.shiftKey || e.ctrlKey || (o.key = s.C0.ESC + "[2~");
							break;
						case 46:
							o.key = a ? s.C0.ESC + "[3;" + (a + 1) + "~" : s.C0.ESC + "[3~";
							break;
						case 36:
							o.key = a ? s.C0.ESC + "[1;" + (a + 1) + "H" : t ? s.C0.ESC + "OH" : s.C0.ESC + "[H";
							break;
						case 35:
							o.key = a ? s.C0.ESC + "[1;" + (a + 1) + "F" : t ? s.C0.ESC + "OF" : s.C0.ESC + "[F";
							break;
						case 33:
							e.shiftKey ? o.type = 2 : e.ctrlKey ? o.key = s.C0.ESC + "[5;" + (a + 1) + "~" : o.key = s.C0.ESC + "[5~";
							break;
						case 34:
							e.shiftKey ? o.type = 3 : e.ctrlKey ? o.key = s.C0.ESC + "[6;" + (a + 1) + "~" : o.key = s.C0.ESC + "[6~";
							break;
						case 112:
							o.key = a ? s.C0.ESC + "[1;" + (a + 1) + "P" : s.C0.ESC + "OP";
							break;
						case 113:
							o.key = a ? s.C0.ESC + "[1;" + (a + 1) + "Q" : s.C0.ESC + "OQ";
							break;
						case 114:
							o.key = a ? s.C0.ESC + "[1;" + (a + 1) + "R" : s.C0.ESC + "OR";
							break;
						case 115:
							o.key = a ? s.C0.ESC + "[1;" + (a + 1) + "S" : s.C0.ESC + "OS";
							break;
						case 116:
							o.key = a ? s.C0.ESC + "[15;" + (a + 1) + "~" : s.C0.ESC + "[15~";
							break;
						case 117:
							o.key = a ? s.C0.ESC + "[17;" + (a + 1) + "~" : s.C0.ESC + "[17~";
							break;
						case 118:
							o.key = a ? s.C0.ESC + "[18;" + (a + 1) + "~" : s.C0.ESC + "[18~";
							break;
						case 119:
							o.key = a ? s.C0.ESC + "[19;" + (a + 1) + "~" : s.C0.ESC + "[19~";
							break;
						case 120:
							o.key = a ? s.C0.ESC + "[20;" + (a + 1) + "~" : s.C0.ESC + "[20~";
							break;
						case 121:
							o.key = a ? s.C0.ESC + "[21;" + (a + 1) + "~" : s.C0.ESC + "[21~";
							break;
						case 122:
							o.key = a ? s.C0.ESC + "[23;" + (a + 1) + "~" : s.C0.ESC + "[23~";
							break;
						case 123:
							o.key = a ? s.C0.ESC + "[24;" + (a + 1) + "~" : s.C0.ESC + "[24~";
							break;
						default: if (!e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) if (i && !n || !e.altKey || e.metaKey) !i || e.altKey || e.ctrlKey || e.shiftKey || !e.metaKey ? e.key && !e.ctrlKey && !e.altKey && !e.metaKey && e.keyCode >= 48 && 1 === e.key.length ? o.key = e.key : e.key && e.ctrlKey && ("_" === e.key && (o.key = s.C0.US), "@" === e.key && (o.key = s.C0.NUL)) : 65 === e.keyCode && (o.type = 1);
						else {
							const i = r[e.keyCode]?.[e.shiftKey ? 1 : 0];
							if (i) o.key = s.C0.ESC + i;
							else if (e.keyCode >= 65 && e.keyCode <= 90) {
								const t = e.ctrlKey ? e.keyCode - 64 : e.keyCode + 32;
								let i = String.fromCharCode(t);
								e.shiftKey && (i = i.toUpperCase()), o.key = s.C0.ESC + i;
							} else if (32 === e.keyCode) o.key = s.C0.ESC + (e.ctrlKey ? s.C0.NUL : " ");
							else if ("Dead" === e.key && e.code.startsWith("Key")) {
								let t = e.code.slice(3, 4);
								e.shiftKey || (t = t.toLowerCase()), o.key = s.C0.ESC + t, o.cancel = !0;
							}
						}
						else e.keyCode >= 65 && e.keyCode <= 90 ? o.key = String.fromCharCode(e.keyCode - 64) : 32 === e.keyCode ? o.key = s.C0.NUL : e.keyCode >= 51 && e.keyCode <= 55 ? o.key = String.fromCharCode(e.keyCode - 51 + 27) : 56 === e.keyCode ? o.key = s.C0.DEL : 219 === e.keyCode ? o.key = s.C0.ESC : 220 === e.keyCode ? o.key = s.C0.FS : 221 === e.keyCode && (o.key = s.C0.GS);
					}
					return o;
				};
			},
			482: (e, t) => {
				Object.defineProperty(t, "__esModule", { value: !0 }), t.Utf8ToUtf32 = t.StringToUtf32 = t.utf32ToString = t.stringFromCodePoint = void 0, t.stringFromCodePoint = function(e) {
					return e > 65535 ? (e -= 65536, String.fromCharCode(55296 + (e >> 10)) + String.fromCharCode(e % 1024 + 56320)) : String.fromCharCode(e);
				}, t.utf32ToString = function(e, t = 0, i = e.length) {
					let s = "";
					for (let r = t; r < i; ++r) {
						let t = e[r];
						t > 65535 ? (t -= 65536, s += String.fromCharCode(55296 + (t >> 10)) + String.fromCharCode(t % 1024 + 56320)) : s += String.fromCharCode(t);
					}
					return s;
				}, t.StringToUtf32 = class {
					constructor() {
						this._interim = 0;
					}
					clear() {
						this._interim = 0;
					}
					decode(e, t) {
						const i = e.length;
						if (!i) return 0;
						let s = 0, r = 0;
						if (this._interim) {
							const i = e.charCodeAt(r++);
							56320 <= i && i <= 57343 ? t[s++] = 1024 * (this._interim - 55296) + i - 56320 + 65536 : (t[s++] = this._interim, t[s++] = i), this._interim = 0;
						}
						for (let n = r; n < i; ++n) {
							const r = e.charCodeAt(n);
							if (55296 <= r && r <= 56319) {
								if (++n >= i) return this._interim = r, s;
								const o = e.charCodeAt(n);
								56320 <= o && o <= 57343 ? t[s++] = 1024 * (r - 55296) + o - 56320 + 65536 : (t[s++] = r, t[s++] = o);
							} else 65279 !== r && (t[s++] = r);
						}
						return s;
					}
				}, t.Utf8ToUtf32 = class {
					constructor() {
						this.interim = /* @__PURE__ */ new Uint8Array(3);
					}
					clear() {
						this.interim.fill(0);
					}
					decode(e, t) {
						const i = e.length;
						if (!i) return 0;
						let s, r, n, o, a = 0, h = 0, c = 0;
						if (this.interim[0]) {
							let s = !1, r = this.interim[0];
							r &= 192 == (224 & r) ? 31 : 224 == (240 & r) ? 15 : 7;
							let n, o = 0;
							for (; (n = 63 & this.interim[++o]) && o < 4;) r <<= 6, r |= n;
							const h = 192 == (224 & this.interim[0]) ? 2 : 224 == (240 & this.interim[0]) ? 3 : 4, l = h - o;
							for (; c < l;) {
								if (c >= i) return 0;
								if (n = e[c++], 128 != (192 & n)) {
									c--, s = !0;
									break;
								}
								this.interim[o++] = n, r <<= 6, r |= 63 & n;
							}
							s || (2 === h ? r < 128 ? c-- : t[a++] = r : 3 === h ? r < 2048 || r >= 55296 && r <= 57343 || 65279 === r || (t[a++] = r) : r < 65536 || r > 1114111 || (t[a++] = r)), this.interim.fill(0);
						}
						const l = i - 4;
						let d = c;
						for (; d < i;) {
							for (; !(!(d < l) || 128 & (s = e[d]) || 128 & (r = e[d + 1]) || 128 & (n = e[d + 2]) || 128 & (o = e[d + 3]));) t[a++] = s, t[a++] = r, t[a++] = n, t[a++] = o, d += 4;
							if (s = e[d++], s < 128) t[a++] = s;
							else if (192 == (224 & s)) {
								if (d >= i) return this.interim[0] = s, a;
								if (r = e[d++], 128 != (192 & r)) {
									d--;
									continue;
								}
								if (h = (31 & s) << 6 | 63 & r, h < 128) {
									d--;
									continue;
								}
								t[a++] = h;
							} else if (224 == (240 & s)) {
								if (d >= i) return this.interim[0] = s, a;
								if (r = e[d++], 128 != (192 & r)) {
									d--;
									continue;
								}
								if (d >= i) return this.interim[0] = s, this.interim[1] = r, a;
								if (n = e[d++], 128 != (192 & n)) {
									d--;
									continue;
								}
								if (h = (15 & s) << 12 | (63 & r) << 6 | 63 & n, h < 2048 || h >= 55296 && h <= 57343 || 65279 === h) continue;
								t[a++] = h;
							} else if (240 == (248 & s)) {
								if (d >= i) return this.interim[0] = s, a;
								if (r = e[d++], 128 != (192 & r)) {
									d--;
									continue;
								}
								if (d >= i) return this.interim[0] = s, this.interim[1] = r, a;
								if (n = e[d++], 128 != (192 & n)) {
									d--;
									continue;
								}
								if (d >= i) return this.interim[0] = s, this.interim[1] = r, this.interim[2] = n, a;
								if (o = e[d++], 128 != (192 & o)) {
									d--;
									continue;
								}
								if (h = (7 & s) << 18 | (63 & r) << 12 | (63 & n) << 6 | 63 & o, h < 65536 || h > 1114111) continue;
								t[a++] = h;
							}
						}
						return a;
					}
				};
			},
			225: (e, t, i) => {
				Object.defineProperty(t, "__esModule", { value: !0 }), t.UnicodeV6 = void 0;
				const s = i(1480), r = [
					[768, 879],
					[1155, 1158],
					[1160, 1161],
					[1425, 1469],
					[1471, 1471],
					[1473, 1474],
					[1476, 1477],
					[1479, 1479],
					[1536, 1539],
					[1552, 1557],
					[1611, 1630],
					[1648, 1648],
					[1750, 1764],
					[1767, 1768],
					[1770, 1773],
					[1807, 1807],
					[1809, 1809],
					[1840, 1866],
					[1958, 1968],
					[2027, 2035],
					[2305, 2306],
					[2364, 2364],
					[2369, 2376],
					[2381, 2381],
					[2385, 2388],
					[2402, 2403],
					[2433, 2433],
					[2492, 2492],
					[2497, 2500],
					[2509, 2509],
					[2530, 2531],
					[2561, 2562],
					[2620, 2620],
					[2625, 2626],
					[2631, 2632],
					[2635, 2637],
					[2672, 2673],
					[2689, 2690],
					[2748, 2748],
					[2753, 2757],
					[2759, 2760],
					[2765, 2765],
					[2786, 2787],
					[2817, 2817],
					[2876, 2876],
					[2879, 2879],
					[2881, 2883],
					[2893, 2893],
					[2902, 2902],
					[2946, 2946],
					[3008, 3008],
					[3021, 3021],
					[3134, 3136],
					[3142, 3144],
					[3146, 3149],
					[3157, 3158],
					[3260, 3260],
					[3263, 3263],
					[3270, 3270],
					[3276, 3277],
					[3298, 3299],
					[3393, 3395],
					[3405, 3405],
					[3530, 3530],
					[3538, 3540],
					[3542, 3542],
					[3633, 3633],
					[3636, 3642],
					[3655, 3662],
					[3761, 3761],
					[3764, 3769],
					[3771, 3772],
					[3784, 3789],
					[3864, 3865],
					[3893, 3893],
					[3895, 3895],
					[3897, 3897],
					[3953, 3966],
					[3968, 3972],
					[3974, 3975],
					[3984, 3991],
					[3993, 4028],
					[4038, 4038],
					[4141, 4144],
					[4146, 4146],
					[4150, 4151],
					[4153, 4153],
					[4184, 4185],
					[4448, 4607],
					[4959, 4959],
					[5906, 5908],
					[5938, 5940],
					[5970, 5971],
					[6002, 6003],
					[6068, 6069],
					[6071, 6077],
					[6086, 6086],
					[6089, 6099],
					[6109, 6109],
					[6155, 6157],
					[6313, 6313],
					[6432, 6434],
					[6439, 6440],
					[6450, 6450],
					[6457, 6459],
					[6679, 6680],
					[6912, 6915],
					[6964, 6964],
					[6966, 6970],
					[6972, 6972],
					[6978, 6978],
					[7019, 7027],
					[7616, 7626],
					[7678, 7679],
					[8203, 8207],
					[8234, 8238],
					[8288, 8291],
					[8298, 8303],
					[8400, 8431],
					[12330, 12335],
					[12441, 12442],
					[43014, 43014],
					[43019, 43019],
					[43045, 43046],
					[64286, 64286],
					[65024, 65039],
					[65056, 65059],
					[65279, 65279],
					[65529, 65531]
				], n = [
					[68097, 68099],
					[68101, 68102],
					[68108, 68111],
					[68152, 68154],
					[68159, 68159],
					[119143, 119145],
					[119155, 119170],
					[119173, 119179],
					[119210, 119213],
					[119362, 119364],
					[917505, 917505],
					[917536, 917631],
					[917760, 917999]
				];
				let o;
				t.UnicodeV6 = class {
					constructor() {
						if (this.version = "6", !o) {
							o = /* @__PURE__ */ new Uint8Array(65536), o.fill(1), o[0] = 0, o.fill(0, 1, 32), o.fill(0, 127, 160), o.fill(2, 4352, 4448), o[9001] = 2, o[9002] = 2, o.fill(2, 11904, 42192), o[12351] = 1, o.fill(2, 44032, 55204), o.fill(2, 63744, 64256), o.fill(2, 65040, 65050), o.fill(2, 65072, 65136), o.fill(2, 65280, 65377), o.fill(2, 65504, 65511);
							for (let e = 0; e < r.length; ++e) o.fill(0, r[e][0], r[e][1] + 1);
						}
					}
					wcwidth(e) {
						return e < 32 ? 0 : e < 127 ? 1 : e < 65536 ? o[e] : function(e, t) {
							let i, s = 0, r = t.length - 1;
							if (e < t[0][0] || e > t[r][1]) return !1;
							for (; r >= s;) if (i = s + r >> 1, e > t[i][1]) s = i + 1;
							else {
								if (!(e < t[i][0])) return !0;
								r = i - 1;
							}
							return !1;
						}(e, n) ? 0 : e >= 131072 && e <= 196605 || e >= 196608 && e <= 262141 ? 2 : 1;
					}
					charProperties(e, t) {
						let i = this.wcwidth(e), r = 0 === i && 0 !== t;
						if (r) {
							const e = s.UnicodeService.extractWidth(t);
							0 === e ? r = !1 : e > i && (i = e);
						}
						return s.UnicodeService.createPropertyValue(0, i, r);
					}
				};
			},
			5981: (e, t, i) => {
				Object.defineProperty(t, "__esModule", { value: !0 }), t.WriteBuffer = void 0;
				const s = i(8460), r = i(844);
				class n extends r.Disposable {
					constructor(e) {
						super(), this._action = e, this._writeBuffer = [], this._callbacks = [], this._pendingData = 0, this._bufferOffset = 0, this._isSyncWriting = !1, this._syncCalls = 0, this._didUserInput = !1, this._onWriteParsed = this.register(new s.EventEmitter()), this.onWriteParsed = this._onWriteParsed.event;
					}
					handleUserInput() {
						this._didUserInput = !0;
					}
					writeSync(e, t) {
						if (void 0 !== t && this._syncCalls > t) return void (this._syncCalls = 0);
						if (this._pendingData += e.length, this._writeBuffer.push(e), this._callbacks.push(void 0), this._syncCalls++, this._isSyncWriting) return;
						let i;
						for (this._isSyncWriting = !0; i = this._writeBuffer.shift();) {
							this._action(i);
							const e = this._callbacks.shift();
							e && e();
						}
						this._pendingData = 0, this._bufferOffset = 2147483647, this._isSyncWriting = !1, this._syncCalls = 0;
					}
					write(e, t) {
						if (this._pendingData > 5e7) throw new Error("write data discarded, use flow control to avoid losing data");
						if (!this._writeBuffer.length) {
							if (this._bufferOffset = 0, this._didUserInput) return this._didUserInput = !1, this._pendingData += e.length, this._writeBuffer.push(e), this._callbacks.push(t), void this._innerWrite();
							setTimeout((() => this._innerWrite()));
						}
						this._pendingData += e.length, this._writeBuffer.push(e), this._callbacks.push(t);
					}
					_innerWrite(e = 0, t = !0) {
						const i = e || Date.now();
						for (; this._writeBuffer.length > this._bufferOffset;) {
							const e = this._writeBuffer[this._bufferOffset], s = this._action(e, t);
							if (s) {
								const e = (e) => Date.now() - i >= 12 ? setTimeout((() => this._innerWrite(0, e))) : this._innerWrite(i, e);
								s.catch(((e) => (queueMicrotask((() => {
									throw e;
								})), Promise.resolve(!1)))).then(e);
								return;
							}
							const r = this._callbacks[this._bufferOffset];
							if (r && r(), this._bufferOffset++, this._pendingData -= e.length, Date.now() - i >= 12) break;
						}
						this._writeBuffer.length > this._bufferOffset ? (this._bufferOffset > 50 && (this._writeBuffer = this._writeBuffer.slice(this._bufferOffset), this._callbacks = this._callbacks.slice(this._bufferOffset), this._bufferOffset = 0), setTimeout((() => this._innerWrite()))) : (this._writeBuffer.length = 0, this._callbacks.length = 0, this._pendingData = 0, this._bufferOffset = 0), this._onWriteParsed.fire();
					}
				}
				t.WriteBuffer = n;
			},
			5941: (e, t) => {
				Object.defineProperty(t, "__esModule", { value: !0 }), t.toRgbString = t.parseColor = void 0;
				const i = /^([\da-f])\/([\da-f])\/([\da-f])$|^([\da-f]{2})\/([\da-f]{2})\/([\da-f]{2})$|^([\da-f]{3})\/([\da-f]{3})\/([\da-f]{3})$|^([\da-f]{4})\/([\da-f]{4})\/([\da-f]{4})$/, s = /^[\da-f]+$/;
				function r(e, t) {
					const i = e.toString(16), s = i.length < 2 ? "0" + i : i;
					switch (t) {
						case 4: return i[0];
						case 8: return s;
						case 12: return (s + s).slice(0, 3);
						default: return s + s;
					}
				}
				t.parseColor = function(e) {
					if (!e) return;
					let t = e.toLowerCase();
					if (0 === t.indexOf("rgb:")) {
						t = t.slice(4);
						const e = i.exec(t);
						if (e) {
							const t = e[1] ? 15 : e[4] ? 255 : e[7] ? 4095 : 65535;
							return [
								Math.round(parseInt(e[1] || e[4] || e[7] || e[10], 16) / t * 255),
								Math.round(parseInt(e[2] || e[5] || e[8] || e[11], 16) / t * 255),
								Math.round(parseInt(e[3] || e[6] || e[9] || e[12], 16) / t * 255)
							];
						}
					} else if (0 === t.indexOf("#") && (t = t.slice(1), s.exec(t) && [
						3,
						6,
						9,
						12
					].includes(t.length))) {
						const e = t.length / 3, i = [
							0,
							0,
							0
						];
						for (let s = 0; s < 3; ++s) {
							const r = parseInt(t.slice(e * s, e * s + e), 16);
							i[s] = 1 === e ? r << 4 : 2 === e ? r : 3 === e ? r >> 4 : r >> 8;
						}
						return i;
					}
				}, t.toRgbString = function(e, t = 16) {
					const [i, s, n] = e;
					return `rgb:${r(i, t)}/${r(s, t)}/${r(n, t)}`;
				};
			},
			5770: (e, t) => {
				Object.defineProperty(t, "__esModule", { value: !0 }), t.PAYLOAD_LIMIT = void 0, t.PAYLOAD_LIMIT = 1e7;
			},
			6351: (e, t, i) => {
				Object.defineProperty(t, "__esModule", { value: !0 }), t.DcsHandler = t.DcsParser = void 0;
				const s = i(482), r = i(8742), n = i(5770), o = [];
				t.DcsParser = class {
					constructor() {
						this._handlers = Object.create(null), this._active = o, this._ident = 0, this._handlerFb = () => {}, this._stack = {
							paused: !1,
							loopPosition: 0,
							fallThrough: !1
						};
					}
					dispose() {
						this._handlers = Object.create(null), this._handlerFb = () => {}, this._active = o;
					}
					registerHandler(e, t) {
						void 0 === this._handlers[e] && (this._handlers[e] = []);
						const i = this._handlers[e];
						return i.push(t), { dispose: () => {
							const e = i.indexOf(t);
							-1 !== e && i.splice(e, 1);
						} };
					}
					clearHandler(e) {
						this._handlers[e] && delete this._handlers[e];
					}
					setHandlerFallback(e) {
						this._handlerFb = e;
					}
					reset() {
						if (this._active.length) for (let e = this._stack.paused ? this._stack.loopPosition - 1 : this._active.length - 1; e >= 0; --e) this._active[e].unhook(!1);
						this._stack.paused = !1, this._active = o, this._ident = 0;
					}
					hook(e, t) {
						if (this.reset(), this._ident = e, this._active = this._handlers[e] || o, this._active.length) for (let e = this._active.length - 1; e >= 0; e--) this._active[e].hook(t);
						else this._handlerFb(this._ident, "HOOK", t);
					}
					put(e, t, i) {
						if (this._active.length) for (let s = this._active.length - 1; s >= 0; s--) this._active[s].put(e, t, i);
						else this._handlerFb(this._ident, "PUT", (0, s.utf32ToString)(e, t, i));
					}
					unhook(e, t = !0) {
						if (this._active.length) {
							let i = !1, s = this._active.length - 1, r = !1;
							if (this._stack.paused && (s = this._stack.loopPosition - 1, i = t, r = this._stack.fallThrough, this._stack.paused = !1), !r && !1 === i) {
								for (; s >= 0 && (i = this._active[s].unhook(e), !0 !== i); s--) if (i instanceof Promise) return this._stack.paused = !0, this._stack.loopPosition = s, this._stack.fallThrough = !1, i;
								s--;
							}
							for (; s >= 0; s--) if (i = this._active[s].unhook(!1), i instanceof Promise) return this._stack.paused = !0, this._stack.loopPosition = s, this._stack.fallThrough = !0, i;
						} else this._handlerFb(this._ident, "UNHOOK", e);
						this._active = o, this._ident = 0;
					}
				};
				const a = new r.Params();
				a.addParam(0), t.DcsHandler = class {
					constructor(e) {
						this._handler = e, this._data = "", this._params = a, this._hitLimit = !1;
					}
					hook(e) {
						this._params = e.length > 1 || e.params[0] ? e.clone() : a, this._data = "", this._hitLimit = !1;
					}
					put(e, t, i) {
						this._hitLimit || (this._data += (0, s.utf32ToString)(e, t, i), this._data.length > n.PAYLOAD_LIMIT && (this._data = "", this._hitLimit = !0));
					}
					unhook(e) {
						let t = !1;
						if (this._hitLimit) t = !1;
						else if (e && (t = this._handler(this._data, this._params), t instanceof Promise)) return t.then(((e) => (this._params = a, this._data = "", this._hitLimit = !1, e)));
						return this._params = a, this._data = "", this._hitLimit = !1, t;
					}
				};
			},
			2015: (e, t, i) => {
				Object.defineProperty(t, "__esModule", { value: !0 }), t.EscapeSequenceParser = t.VT500_TRANSITION_TABLE = t.TransitionTable = void 0;
				const s = i(844), r = i(8742), n = i(6242), o = i(6351);
				class a {
					constructor(e) {
						this.table = new Uint8Array(e);
					}
					setDefault(e, t) {
						this.table.fill(e << 4 | t);
					}
					add(e, t, i, s) {
						this.table[t << 8 | e] = i << 4 | s;
					}
					addMany(e, t, i, s) {
						for (let r = 0; r < e.length; r++) this.table[t << 8 | e[r]] = i << 4 | s;
					}
				}
				t.TransitionTable = a;
				const h = 160;
				t.VT500_TRANSITION_TABLE = function() {
					const e = new a(4095), t = Array.apply(null, Array(256)).map(((e, t) => t)), i = (e, i) => t.slice(e, i), s = i(32, 127), r = i(0, 24);
					r.push(25), r.push.apply(r, i(28, 32));
					const n = i(0, 14);
					let o;
					for (o in e.setDefault(1, 0), e.addMany(s, 0, 2, 0), n) e.addMany([
						24,
						26,
						153,
						154
					], o, 3, 0), e.addMany(i(128, 144), o, 3, 0), e.addMany(i(144, 152), o, 3, 0), e.add(156, o, 0, 0), e.add(27, o, 11, 1), e.add(157, o, 4, 8), e.addMany([
						152,
						158,
						159
					], o, 0, 7), e.add(155, o, 11, 3), e.add(144, o, 11, 9);
					return e.addMany(r, 0, 3, 0), e.addMany(r, 1, 3, 1), e.add(127, 1, 0, 1), e.addMany(r, 8, 0, 8), e.addMany(r, 3, 3, 3), e.add(127, 3, 0, 3), e.addMany(r, 4, 3, 4), e.add(127, 4, 0, 4), e.addMany(r, 6, 3, 6), e.addMany(r, 5, 3, 5), e.add(127, 5, 0, 5), e.addMany(r, 2, 3, 2), e.add(127, 2, 0, 2), e.add(93, 1, 4, 8), e.addMany(s, 8, 5, 8), e.add(127, 8, 5, 8), e.addMany([
						156,
						27,
						24,
						26,
						7
					], 8, 6, 0), e.addMany(i(28, 32), 8, 0, 8), e.addMany([
						88,
						94,
						95
					], 1, 0, 7), e.addMany(s, 7, 0, 7), e.addMany(r, 7, 0, 7), e.add(156, 7, 0, 0), e.add(127, 7, 0, 7), e.add(91, 1, 11, 3), e.addMany(i(64, 127), 3, 7, 0), e.addMany(i(48, 60), 3, 8, 4), e.addMany([
						60,
						61,
						62,
						63
					], 3, 9, 4), e.addMany(i(48, 60), 4, 8, 4), e.addMany(i(64, 127), 4, 7, 0), e.addMany([
						60,
						61,
						62,
						63
					], 4, 0, 6), e.addMany(i(32, 64), 6, 0, 6), e.add(127, 6, 0, 6), e.addMany(i(64, 127), 6, 0, 0), e.addMany(i(32, 48), 3, 9, 5), e.addMany(i(32, 48), 5, 9, 5), e.addMany(i(48, 64), 5, 0, 6), e.addMany(i(64, 127), 5, 7, 0), e.addMany(i(32, 48), 4, 9, 5), e.addMany(i(32, 48), 1, 9, 2), e.addMany(i(32, 48), 2, 9, 2), e.addMany(i(48, 127), 2, 10, 0), e.addMany(i(48, 80), 1, 10, 0), e.addMany(i(81, 88), 1, 10, 0), e.addMany([
						89,
						90,
						92
					], 1, 10, 0), e.addMany(i(96, 127), 1, 10, 0), e.add(80, 1, 11, 9), e.addMany(r, 9, 0, 9), e.add(127, 9, 0, 9), e.addMany(i(28, 32), 9, 0, 9), e.addMany(i(32, 48), 9, 9, 12), e.addMany(i(48, 60), 9, 8, 10), e.addMany([
						60,
						61,
						62,
						63
					], 9, 9, 10), e.addMany(r, 11, 0, 11), e.addMany(i(32, 128), 11, 0, 11), e.addMany(i(28, 32), 11, 0, 11), e.addMany(r, 10, 0, 10), e.add(127, 10, 0, 10), e.addMany(i(28, 32), 10, 0, 10), e.addMany(i(48, 60), 10, 8, 10), e.addMany([
						60,
						61,
						62,
						63
					], 10, 0, 11), e.addMany(i(32, 48), 10, 9, 12), e.addMany(r, 12, 0, 12), e.add(127, 12, 0, 12), e.addMany(i(28, 32), 12, 0, 12), e.addMany(i(32, 48), 12, 9, 12), e.addMany(i(48, 64), 12, 0, 11), e.addMany(i(64, 127), 12, 12, 13), e.addMany(i(64, 127), 10, 12, 13), e.addMany(i(64, 127), 9, 12, 13), e.addMany(r, 13, 13, 13), e.addMany(s, 13, 13, 13), e.add(127, 13, 0, 13), e.addMany([
						27,
						156,
						24,
						26
					], 13, 14, 0), e.add(h, 0, 2, 0), e.add(h, 8, 5, 8), e.add(h, 6, 0, 6), e.add(h, 11, 0, 11), e.add(h, 13, 13, 13), e;
				}();
				class c extends s.Disposable {
					constructor(e = t.VT500_TRANSITION_TABLE) {
						super(), this._transitions = e, this._parseStack = {
							state: 0,
							handlers: [],
							handlerPos: 0,
							transition: 0,
							chunkPos: 0
						}, this.initialState = 0, this.currentState = this.initialState, this._params = new r.Params(), this._params.addParam(0), this._collect = 0, this.precedingJoinState = 0, this._printHandlerFb = (e, t, i) => {}, this._executeHandlerFb = (e) => {}, this._csiHandlerFb = (e, t) => {}, this._escHandlerFb = (e) => {}, this._errorHandlerFb = (e) => e, this._printHandler = this._printHandlerFb, this._executeHandlers = Object.create(null), this._csiHandlers = Object.create(null), this._escHandlers = Object.create(null), this.register((0, s.toDisposable)((() => {
							this._csiHandlers = Object.create(null), this._executeHandlers = Object.create(null), this._escHandlers = Object.create(null);
						}))), this._oscParser = this.register(new n.OscParser()), this._dcsParser = this.register(new o.DcsParser()), this._errorHandler = this._errorHandlerFb, this.registerEscHandler({ final: "\\" }, (() => !0));
					}
					_identifier(e, t = [64, 126]) {
						let i = 0;
						if (e.prefix) {
							if (e.prefix.length > 1) throw new Error("only one byte as prefix supported");
							if (i = e.prefix.charCodeAt(0), i && 60 > i || i > 63) throw new Error("prefix must be in range 0x3c .. 0x3f");
						}
						if (e.intermediates) {
							if (e.intermediates.length > 2) throw new Error("only two bytes as intermediates are supported");
							for (let t = 0; t < e.intermediates.length; ++t) {
								const s = e.intermediates.charCodeAt(t);
								if (32 > s || s > 47) throw new Error("intermediate must be in range 0x20 .. 0x2f");
								i <<= 8, i |= s;
							}
						}
						if (1 !== e.final.length) throw new Error("final must be a single byte");
						const s = e.final.charCodeAt(0);
						if (t[0] > s || s > t[1]) throw new Error(`final must be in range ${t[0]} .. ${t[1]}`);
						return i <<= 8, i |= s, i;
					}
					identToString(e) {
						const t = [];
						for (; e;) t.push(String.fromCharCode(255 & e)), e >>= 8;
						return t.reverse().join("");
					}
					setPrintHandler(e) {
						this._printHandler = e;
					}
					clearPrintHandler() {
						this._printHandler = this._printHandlerFb;
					}
					registerEscHandler(e, t) {
						const i = this._identifier(e, [48, 126]);
						void 0 === this._escHandlers[i] && (this._escHandlers[i] = []);
						const s = this._escHandlers[i];
						return s.push(t), { dispose: () => {
							const e = s.indexOf(t);
							-1 !== e && s.splice(e, 1);
						} };
					}
					clearEscHandler(e) {
						this._escHandlers[this._identifier(e, [48, 126])] && delete this._escHandlers[this._identifier(e, [48, 126])];
					}
					setEscHandlerFallback(e) {
						this._escHandlerFb = e;
					}
					setExecuteHandler(e, t) {
						this._executeHandlers[e.charCodeAt(0)] = t;
					}
					clearExecuteHandler(e) {
						this._executeHandlers[e.charCodeAt(0)] && delete this._executeHandlers[e.charCodeAt(0)];
					}
					setExecuteHandlerFallback(e) {
						this._executeHandlerFb = e;
					}
					registerCsiHandler(e, t) {
						const i = this._identifier(e);
						void 0 === this._csiHandlers[i] && (this._csiHandlers[i] = []);
						const s = this._csiHandlers[i];
						return s.push(t), { dispose: () => {
							const e = s.indexOf(t);
							-1 !== e && s.splice(e, 1);
						} };
					}
					clearCsiHandler(e) {
						this._csiHandlers[this._identifier(e)] && delete this._csiHandlers[this._identifier(e)];
					}
					setCsiHandlerFallback(e) {
						this._csiHandlerFb = e;
					}
					registerDcsHandler(e, t) {
						return this._dcsParser.registerHandler(this._identifier(e), t);
					}
					clearDcsHandler(e) {
						this._dcsParser.clearHandler(this._identifier(e));
					}
					setDcsHandlerFallback(e) {
						this._dcsParser.setHandlerFallback(e);
					}
					registerOscHandler(e, t) {
						return this._oscParser.registerHandler(e, t);
					}
					clearOscHandler(e) {
						this._oscParser.clearHandler(e);
					}
					setOscHandlerFallback(e) {
						this._oscParser.setHandlerFallback(e);
					}
					setErrorHandler(e) {
						this._errorHandler = e;
					}
					clearErrorHandler() {
						this._errorHandler = this._errorHandlerFb;
					}
					reset() {
						this.currentState = this.initialState, this._oscParser.reset(), this._dcsParser.reset(), this._params.reset(), this._params.addParam(0), this._collect = 0, this.precedingJoinState = 0, 0 !== this._parseStack.state && (this._parseStack.state = 2, this._parseStack.handlers = []);
					}
					_preserveStack(e, t, i, s, r) {
						this._parseStack.state = e, this._parseStack.handlers = t, this._parseStack.handlerPos = i, this._parseStack.transition = s, this._parseStack.chunkPos = r;
					}
					parse(e, t, i) {
						let s, r = 0, n = 0, o = 0;
						if (this._parseStack.state) if (2 === this._parseStack.state) this._parseStack.state = 0, o = this._parseStack.chunkPos + 1;
						else {
							if (void 0 === i || 1 === this._parseStack.state) throw this._parseStack.state = 1, /* @__PURE__ */ new Error("improper continuation due to previous async handler, giving up parsing");
							const t = this._parseStack.handlers;
							let n = this._parseStack.handlerPos - 1;
							switch (this._parseStack.state) {
								case 3:
									if (!1 === i && n > -1) {
										for (; n >= 0 && (s = t[n](this._params), !0 !== s); n--) if (s instanceof Promise) return this._parseStack.handlerPos = n, s;
									}
									this._parseStack.handlers = [];
									break;
								case 4:
									if (!1 === i && n > -1) {
										for (; n >= 0 && (s = t[n](), !0 !== s); n--) if (s instanceof Promise) return this._parseStack.handlerPos = n, s;
									}
									this._parseStack.handlers = [];
									break;
								case 6:
									if (r = e[this._parseStack.chunkPos], s = this._dcsParser.unhook(24 !== r && 26 !== r, i), s) return s;
									27 === r && (this._parseStack.transition |= 1), this._params.reset(), this._params.addParam(0), this._collect = 0;
									break;
								case 5:
									if (r = e[this._parseStack.chunkPos], s = this._oscParser.end(24 !== r && 26 !== r, i), s) return s;
									27 === r && (this._parseStack.transition |= 1), this._params.reset(), this._params.addParam(0), this._collect = 0;
							}
							this._parseStack.state = 0, o = this._parseStack.chunkPos + 1, this.precedingJoinState = 0, this.currentState = 15 & this._parseStack.transition;
						}
						for (let i = o; i < t; ++i) {
							switch (r = e[i], n = this._transitions.table[this.currentState << 8 | (r < 160 ? r : h)], n >> 4) {
								case 2:
									for (let s = i + 1;; ++s) {
										if (s >= t || (r = e[s]) < 32 || r > 126 && r < h) {
											this._printHandler(e, i, s), i = s - 1;
											break;
										}
										if (++s >= t || (r = e[s]) < 32 || r > 126 && r < h) {
											this._printHandler(e, i, s), i = s - 1;
											break;
										}
										if (++s >= t || (r = e[s]) < 32 || r > 126 && r < h) {
											this._printHandler(e, i, s), i = s - 1;
											break;
										}
										if (++s >= t || (r = e[s]) < 32 || r > 126 && r < h) {
											this._printHandler(e, i, s), i = s - 1;
											break;
										}
									}
									break;
								case 3:
									this._executeHandlers[r] ? this._executeHandlers[r]() : this._executeHandlerFb(r), this.precedingJoinState = 0;
									break;
								case 0: break;
								case 1:
									if (this._errorHandler({
										position: i,
										code: r,
										currentState: this.currentState,
										collect: this._collect,
										params: this._params,
										abort: !1
									}).abort) return;
									break;
								case 7:
									const o = this._csiHandlers[this._collect << 8 | r];
									let a = o ? o.length - 1 : -1;
									for (; a >= 0 && (s = o[a](this._params), !0 !== s); a--) if (s instanceof Promise) return this._preserveStack(3, o, a, n, i), s;
									a < 0 && this._csiHandlerFb(this._collect << 8 | r, this._params), this.precedingJoinState = 0;
									break;
								case 8:
									do
										switch (r) {
											case 59:
												this._params.addParam(0);
												break;
											case 58:
												this._params.addSubParam(-1);
												break;
											default: this._params.addDigit(r - 48);
										}
									while (++i < t && (r = e[i]) > 47 && r < 60);
									i--;
									break;
								case 9:
									this._collect <<= 8, this._collect |= r;
									break;
								case 10:
									const c = this._escHandlers[this._collect << 8 | r];
									let l = c ? c.length - 1 : -1;
									for (; l >= 0 && (s = c[l](), !0 !== s); l--) if (s instanceof Promise) return this._preserveStack(4, c, l, n, i), s;
									l < 0 && this._escHandlerFb(this._collect << 8 | r), this.precedingJoinState = 0;
									break;
								case 11:
									this._params.reset(), this._params.addParam(0), this._collect = 0;
									break;
								case 12:
									this._dcsParser.hook(this._collect << 8 | r, this._params);
									break;
								case 13:
									for (let s = i + 1;; ++s) if (s >= t || 24 === (r = e[s]) || 26 === r || 27 === r || r > 127 && r < h) {
										this._dcsParser.put(e, i, s), i = s - 1;
										break;
									}
									break;
								case 14:
									if (s = this._dcsParser.unhook(24 !== r && 26 !== r), s) return this._preserveStack(6, [], 0, n, i), s;
									27 === r && (n |= 1), this._params.reset(), this._params.addParam(0), this._collect = 0, this.precedingJoinState = 0;
									break;
								case 4:
									this._oscParser.start();
									break;
								case 5:
									for (let s = i + 1;; s++) if (s >= t || (r = e[s]) < 32 || r > 127 && r < h) {
										this._oscParser.put(e, i, s), i = s - 1;
										break;
									}
									break;
								case 6:
									if (s = this._oscParser.end(24 !== r && 26 !== r), s) return this._preserveStack(5, [], 0, n, i), s;
									27 === r && (n |= 1), this._params.reset(), this._params.addParam(0), this._collect = 0, this.precedingJoinState = 0;
							}
							this.currentState = 15 & n;
						}
					}
				}
				t.EscapeSequenceParser = c;
			},
			6242: (e, t, i) => {
				Object.defineProperty(t, "__esModule", { value: !0 }), t.OscHandler = t.OscParser = void 0;
				const s = i(5770), r = i(482), n = [];
				t.OscParser = class {
					constructor() {
						this._state = 0, this._active = n, this._id = -1, this._handlers = Object.create(null), this._handlerFb = () => {}, this._stack = {
							paused: !1,
							loopPosition: 0,
							fallThrough: !1
						};
					}
					registerHandler(e, t) {
						void 0 === this._handlers[e] && (this._handlers[e] = []);
						const i = this._handlers[e];
						return i.push(t), { dispose: () => {
							const e = i.indexOf(t);
							-1 !== e && i.splice(e, 1);
						} };
					}
					clearHandler(e) {
						this._handlers[e] && delete this._handlers[e];
					}
					setHandlerFallback(e) {
						this._handlerFb = e;
					}
					dispose() {
						this._handlers = Object.create(null), this._handlerFb = () => {}, this._active = n;
					}
					reset() {
						if (2 === this._state) for (let e = this._stack.paused ? this._stack.loopPosition - 1 : this._active.length - 1; e >= 0; --e) this._active[e].end(!1);
						this._stack.paused = !1, this._active = n, this._id = -1, this._state = 0;
					}
					_start() {
						if (this._active = this._handlers[this._id] || n, this._active.length) for (let e = this._active.length - 1; e >= 0; e--) this._active[e].start();
						else this._handlerFb(this._id, "START");
					}
					_put(e, t, i) {
						if (this._active.length) for (let s = this._active.length - 1; s >= 0; s--) this._active[s].put(e, t, i);
						else this._handlerFb(this._id, "PUT", (0, r.utf32ToString)(e, t, i));
					}
					start() {
						this.reset(), this._state = 1;
					}
					put(e, t, i) {
						if (3 !== this._state) {
							if (1 === this._state) for (; t < i;) {
								const i = e[t++];
								if (59 === i) {
									this._state = 2, this._start();
									break;
								}
								if (i < 48 || 57 < i) return void (this._state = 3);
								-1 === this._id && (this._id = 0), this._id = 10 * this._id + i - 48;
							}
							2 === this._state && i - t > 0 && this._put(e, t, i);
						}
					}
					end(e, t = !0) {
						if (0 !== this._state) {
							if (3 !== this._state) if (1 === this._state && this._start(), this._active.length) {
								let i = !1, s = this._active.length - 1, r = !1;
								if (this._stack.paused && (s = this._stack.loopPosition - 1, i = t, r = this._stack.fallThrough, this._stack.paused = !1), !r && !1 === i) {
									for (; s >= 0 && (i = this._active[s].end(e), !0 !== i); s--) if (i instanceof Promise) return this._stack.paused = !0, this._stack.loopPosition = s, this._stack.fallThrough = !1, i;
									s--;
								}
								for (; s >= 0; s--) if (i = this._active[s].end(!1), i instanceof Promise) return this._stack.paused = !0, this._stack.loopPosition = s, this._stack.fallThrough = !0, i;
							} else this._handlerFb(this._id, "END", e);
							this._active = n, this._id = -1, this._state = 0;
						}
					}
				}, t.OscHandler = class {
					constructor(e) {
						this._handler = e, this._data = "", this._hitLimit = !1;
					}
					start() {
						this._data = "", this._hitLimit = !1;
					}
					put(e, t, i) {
						this._hitLimit || (this._data += (0, r.utf32ToString)(e, t, i), this._data.length > s.PAYLOAD_LIMIT && (this._data = "", this._hitLimit = !0));
					}
					end(e) {
						let t = !1;
						if (this._hitLimit) t = !1;
						else if (e && (t = this._handler(this._data), t instanceof Promise)) return t.then(((e) => (this._data = "", this._hitLimit = !1, e)));
						return this._data = "", this._hitLimit = !1, t;
					}
				};
			},
			8742: (e, t) => {
				Object.defineProperty(t, "__esModule", { value: !0 }), t.Params = void 0;
				const i = 2147483647;
				class s {
					static fromArray(e) {
						const t = new s();
						if (!e.length) return t;
						for (let i = Array.isArray(e[0]) ? 1 : 0; i < e.length; ++i) {
							const s = e[i];
							if (Array.isArray(s)) for (let e = 0; e < s.length; ++e) t.addSubParam(s[e]);
							else t.addParam(s);
						}
						return t;
					}
					constructor(e = 32, t = 32) {
						if (this.maxLength = e, this.maxSubParamsLength = t, t > 256) throw new Error("maxSubParamsLength must not be greater than 256");
						this.params = new Int32Array(e), this.length = 0, this._subParams = new Int32Array(t), this._subParamsLength = 0, this._subParamsIdx = new Uint16Array(e), this._rejectDigits = !1, this._rejectSubDigits = !1, this._digitIsSub = !1;
					}
					clone() {
						const e = new s(this.maxLength, this.maxSubParamsLength);
						return e.params.set(this.params), e.length = this.length, e._subParams.set(this._subParams), e._subParamsLength = this._subParamsLength, e._subParamsIdx.set(this._subParamsIdx), e._rejectDigits = this._rejectDigits, e._rejectSubDigits = this._rejectSubDigits, e._digitIsSub = this._digitIsSub, e;
					}
					toArray() {
						const e = [];
						for (let t = 0; t < this.length; ++t) {
							e.push(this.params[t]);
							const i = this._subParamsIdx[t] >> 8, s = 255 & this._subParamsIdx[t];
							s - i > 0 && e.push(Array.prototype.slice.call(this._subParams, i, s));
						}
						return e;
					}
					reset() {
						this.length = 0, this._subParamsLength = 0, this._rejectDigits = !1, this._rejectSubDigits = !1, this._digitIsSub = !1;
					}
					addParam(e) {
						if (this._digitIsSub = !1, this.length >= this.maxLength) this._rejectDigits = !0;
						else {
							if (e < -1) throw new Error("values lesser than -1 are not allowed");
							this._subParamsIdx[this.length] = this._subParamsLength << 8 | this._subParamsLength, this.params[this.length++] = e > i ? i : e;
						}
					}
					addSubParam(e) {
						if (this._digitIsSub = !0, this.length) if (this._rejectDigits || this._subParamsLength >= this.maxSubParamsLength) this._rejectSubDigits = !0;
						else {
							if (e < -1) throw new Error("values lesser than -1 are not allowed");
							this._subParams[this._subParamsLength++] = e > i ? i : e, this._subParamsIdx[this.length - 1]++;
						}
					}
					hasSubParams(e) {
						return (255 & this._subParamsIdx[e]) - (this._subParamsIdx[e] >> 8) > 0;
					}
					getSubParams(e) {
						const t = this._subParamsIdx[e] >> 8, i = 255 & this._subParamsIdx[e];
						return i - t > 0 ? this._subParams.subarray(t, i) : null;
					}
					getSubParamsAll() {
						const e = {};
						for (let t = 0; t < this.length; ++t) {
							const i = this._subParamsIdx[t] >> 8, s = 255 & this._subParamsIdx[t];
							s - i > 0 && (e[t] = this._subParams.slice(i, s));
						}
						return e;
					}
					addDigit(e) {
						let t;
						if (this._rejectDigits || !(t = this._digitIsSub ? this._subParamsLength : this.length) || this._digitIsSub && this._rejectSubDigits) return;
						const s = this._digitIsSub ? this._subParams : this.params, r = s[t - 1];
						s[t - 1] = ~r ? Math.min(10 * r + e, i) : e;
					}
				}
				t.Params = s;
			},
			5741: (e, t) => {
				Object.defineProperty(t, "__esModule", { value: !0 }), t.AddonManager = void 0, t.AddonManager = class {
					constructor() {
						this._addons = [];
					}
					dispose() {
						for (let e = this._addons.length - 1; e >= 0; e--) this._addons[e].instance.dispose();
					}
					loadAddon(e, t) {
						const i = {
							instance: t,
							dispose: t.dispose,
							isDisposed: !1
						};
						this._addons.push(i), t.dispose = () => this._wrappedAddonDispose(i), t.activate(e);
					}
					_wrappedAddonDispose(e) {
						if (e.isDisposed) return;
						let t = -1;
						for (let i = 0; i < this._addons.length; i++) if (this._addons[i] === e) {
							t = i;
							break;
						}
						if (-1 === t) throw new Error("Could not dispose an addon that has not been loaded");
						e.isDisposed = !0, e.dispose.apply(e.instance), this._addons.splice(t, 1);
					}
				};
			},
			8771: (e, t, i) => {
				Object.defineProperty(t, "__esModule", { value: !0 }), t.BufferApiView = void 0;
				const s = i(3785), r = i(511);
				t.BufferApiView = class {
					constructor(e, t) {
						this._buffer = e, this.type = t;
					}
					init(e) {
						return this._buffer = e, this;
					}
					get cursorY() {
						return this._buffer.y;
					}
					get cursorX() {
						return this._buffer.x;
					}
					get viewportY() {
						return this._buffer.ydisp;
					}
					get baseY() {
						return this._buffer.ybase;
					}
					get length() {
						return this._buffer.lines.length;
					}
					getLine(e) {
						const t = this._buffer.lines.get(e);
						if (t) return new s.BufferLineApiView(t);
					}
					getNullCell() {
						return new r.CellData();
					}
				};
			},
			3785: (e, t, i) => {
				Object.defineProperty(t, "__esModule", { value: !0 }), t.BufferLineApiView = void 0;
				const s = i(511);
				t.BufferLineApiView = class {
					constructor(e) {
						this._line = e;
					}
					get isWrapped() {
						return this._line.isWrapped;
					}
					get length() {
						return this._line.length;
					}
					getCell(e, t) {
						if (!(e < 0 || e >= this._line.length)) return t ? (this._line.loadCell(e, t), t) : this._line.loadCell(e, new s.CellData());
					}
					translateToString(e, t, i) {
						return this._line.translateToString(e, t, i);
					}
				};
			},
			8285: (e, t, i) => {
				Object.defineProperty(t, "__esModule", { value: !0 }), t.BufferNamespaceApi = void 0;
				const s = i(8771), r = i(8460), n = i(844);
				class o extends n.Disposable {
					constructor(e) {
						super(), this._core = e, this._onBufferChange = this.register(new r.EventEmitter()), this.onBufferChange = this._onBufferChange.event, this._normal = new s.BufferApiView(this._core.buffers.normal, "normal"), this._alternate = new s.BufferApiView(this._core.buffers.alt, "alternate"), this._core.buffers.onBufferActivate((() => this._onBufferChange.fire(this.active)));
					}
					get active() {
						if (this._core.buffers.active === this._core.buffers.normal) return this.normal;
						if (this._core.buffers.active === this._core.buffers.alt) return this.alternate;
						throw new Error("Active buffer is neither normal nor alternate");
					}
					get normal() {
						return this._normal.init(this._core.buffers.normal);
					}
					get alternate() {
						return this._alternate.init(this._core.buffers.alt);
					}
				}
				t.BufferNamespaceApi = o;
			},
			7975: (e, t) => {
				Object.defineProperty(t, "__esModule", { value: !0 }), t.ParserApi = void 0, t.ParserApi = class {
					constructor(e) {
						this._core = e;
					}
					registerCsiHandler(e, t) {
						return this._core.registerCsiHandler(e, ((e) => t(e.toArray())));
					}
					addCsiHandler(e, t) {
						return this.registerCsiHandler(e, t);
					}
					registerDcsHandler(e, t) {
						return this._core.registerDcsHandler(e, ((e, i) => t(e, i.toArray())));
					}
					addDcsHandler(e, t) {
						return this.registerDcsHandler(e, t);
					}
					registerEscHandler(e, t) {
						return this._core.registerEscHandler(e, t);
					}
					addEscHandler(e, t) {
						return this.registerEscHandler(e, t);
					}
					registerOscHandler(e, t) {
						return this._core.registerOscHandler(e, t);
					}
					addOscHandler(e, t) {
						return this.registerOscHandler(e, t);
					}
				};
			},
			7090: (e, t) => {
				Object.defineProperty(t, "__esModule", { value: !0 }), t.UnicodeApi = void 0, t.UnicodeApi = class {
					constructor(e) {
						this._core = e;
					}
					register(e) {
						this._core.unicodeService.register(e);
					}
					get versions() {
						return this._core.unicodeService.versions;
					}
					get activeVersion() {
						return this._core.unicodeService.activeVersion;
					}
					set activeVersion(e) {
						this._core.unicodeService.activeVersion = e;
					}
				};
			},
			744: function(e, t, i) {
				var s = this && this.__decorate || function(e, t, i, s) {
					var r, n = arguments.length, o = n < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
					if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, i, s);
					else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (o = (n < 3 ? r(o) : n > 3 ? r(t, i, o) : r(t, i)) || o);
					return n > 3 && o && Object.defineProperty(t, i, o), o;
				}, r = this && this.__param || function(e, t) {
					return function(i, s) {
						t(i, s, e);
					};
				};
				Object.defineProperty(t, "__esModule", { value: !0 }), t.BufferService = t.MINIMUM_ROWS = t.MINIMUM_COLS = void 0;
				const n = i(8460), o = i(844), a = i(5295), h = i(2585);
				t.MINIMUM_COLS = 2, t.MINIMUM_ROWS = 1;
				let c = t.BufferService = class extends o.Disposable {
					get buffer() {
						return this.buffers.active;
					}
					constructor(e) {
						super(), this.isUserScrolling = !1, this._onResize = this.register(new n.EventEmitter()), this.onResize = this._onResize.event, this._onScroll = this.register(new n.EventEmitter()), this.onScroll = this._onScroll.event, this.cols = Math.max(e.rawOptions.cols || 0, t.MINIMUM_COLS), this.rows = Math.max(e.rawOptions.rows || 0, t.MINIMUM_ROWS), this.buffers = this.register(new a.BufferSet(e, this));
					}
					resize(e, t) {
						this.cols = e, this.rows = t, this.buffers.resize(e, t), this._onResize.fire({
							cols: e,
							rows: t
						});
					}
					reset() {
						this.buffers.reset(), this.isUserScrolling = !1;
					}
					scroll(e, t = !1) {
						const i = this.buffer;
						let s;
						s = this._cachedBlankLine, s && s.length === this.cols && s.getFg(0) === e.fg && s.getBg(0) === e.bg || (s = i.getBlankLine(e, t), this._cachedBlankLine = s), s.isWrapped = t;
						const r = i.ybase + i.scrollTop, n = i.ybase + i.scrollBottom;
						if (0 === i.scrollTop) {
							const e = i.lines.isFull;
							n === i.lines.length - 1 ? e ? i.lines.recycle().copyFrom(s) : i.lines.push(s.clone()) : i.lines.splice(n + 1, 0, s.clone()), e ? this.isUserScrolling && (i.ydisp = Math.max(i.ydisp - 1, 0)) : (i.ybase++, this.isUserScrolling || i.ydisp++);
						} else {
							const e = n - r + 1;
							i.lines.shiftElements(r + 1, e - 1, -1), i.lines.set(n, s.clone());
						}
						this.isUserScrolling || (i.ydisp = i.ybase), this._onScroll.fire(i.ydisp);
					}
					scrollLines(e, t, i) {
						const s = this.buffer;
						if (e < 0) {
							if (0 === s.ydisp) return;
							this.isUserScrolling = !0;
						} else e + s.ydisp >= s.ybase && (this.isUserScrolling = !1);
						const r = s.ydisp;
						s.ydisp = Math.max(Math.min(s.ydisp + e, s.ybase), 0), r !== s.ydisp && (t || this._onScroll.fire(s.ydisp));
					}
				};
				t.BufferService = c = s([r(0, h.IOptionsService)], c);
			},
			7994: (e, t) => {
				Object.defineProperty(t, "__esModule", { value: !0 }), t.CharsetService = void 0, t.CharsetService = class {
					constructor() {
						this.glevel = 0, this._charsets = [];
					}
					reset() {
						this.charset = void 0, this._charsets = [], this.glevel = 0;
					}
					setgLevel(e) {
						this.glevel = e, this.charset = this._charsets[e];
					}
					setgCharset(e, t) {
						this._charsets[e] = t, this.glevel === e && (this.charset = t);
					}
				};
			},
			1753: function(e, t, i) {
				var s = this && this.__decorate || function(e, t, i, s) {
					var r, n = arguments.length, o = n < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
					if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, i, s);
					else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (o = (n < 3 ? r(o) : n > 3 ? r(t, i, o) : r(t, i)) || o);
					return n > 3 && o && Object.defineProperty(t, i, o), o;
				}, r = this && this.__param || function(e, t) {
					return function(i, s) {
						t(i, s, e);
					};
				};
				Object.defineProperty(t, "__esModule", { value: !0 }), t.CoreMouseService = void 0;
				const n = i(2585), o = i(8460), a = i(844), h = {
					NONE: {
						events: 0,
						restrict: () => !1
					},
					X10: {
						events: 1,
						restrict: (e) => 4 !== e.button && 1 === e.action && (e.ctrl = !1, e.alt = !1, e.shift = !1, !0)
					},
					VT200: {
						events: 19,
						restrict: (e) => 32 !== e.action
					},
					DRAG: {
						events: 23,
						restrict: (e) => 32 !== e.action || 3 !== e.button
					},
					ANY: {
						events: 31,
						restrict: (e) => !0
					}
				};
				function c(e, t) {
					let i = (e.ctrl ? 16 : 0) | (e.shift ? 4 : 0) | (e.alt ? 8 : 0);
					return 4 === e.button ? (i |= 64, i |= e.action) : (i |= 3 & e.button, 4 & e.button && (i |= 64), 8 & e.button && (i |= 128), 32 === e.action ? i |= 32 : 0 !== e.action || t || (i |= 3)), i;
				}
				const l = String.fromCharCode, d = {
					DEFAULT: (e) => {
						const t = [
							c(e, !1) + 32,
							e.col + 32,
							e.row + 32
						];
						return t[0] > 255 || t[1] > 255 || t[2] > 255 ? "" : `[M${l(t[0])}${l(t[1])}${l(t[2])}`;
					},
					SGR: (e) => {
						const t = 0 === e.action && 4 !== e.button ? "m" : "M";
						return `[<${c(e, !0)};${e.col};${e.row}${t}`;
					},
					SGR_PIXELS: (e) => {
						const t = 0 === e.action && 4 !== e.button ? "m" : "M";
						return `[<${c(e, !0)};${e.x};${e.y}${t}`;
					}
				};
				let _ = t.CoreMouseService = class extends a.Disposable {
					constructor(e, t) {
						super(), this._bufferService = e, this._coreService = t, this._protocols = {}, this._encodings = {}, this._activeProtocol = "", this._activeEncoding = "", this._lastEvent = null, this._onProtocolChange = this.register(new o.EventEmitter()), this.onProtocolChange = this._onProtocolChange.event;
						for (const e of Object.keys(h)) this.addProtocol(e, h[e]);
						for (const e of Object.keys(d)) this.addEncoding(e, d[e]);
						this.reset();
					}
					addProtocol(e, t) {
						this._protocols[e] = t;
					}
					addEncoding(e, t) {
						this._encodings[e] = t;
					}
					get activeProtocol() {
						return this._activeProtocol;
					}
					get areMouseEventsActive() {
						return 0 !== this._protocols[this._activeProtocol].events;
					}
					set activeProtocol(e) {
						if (!this._protocols[e]) throw new Error(`unknown protocol "${e}"`);
						this._activeProtocol = e, this._onProtocolChange.fire(this._protocols[e].events);
					}
					get activeEncoding() {
						return this._activeEncoding;
					}
					set activeEncoding(e) {
						if (!this._encodings[e]) throw new Error(`unknown encoding "${e}"`);
						this._activeEncoding = e;
					}
					reset() {
						this.activeProtocol = "NONE", this.activeEncoding = "DEFAULT", this._lastEvent = null;
					}
					triggerMouseEvent(e) {
						if (e.col < 0 || e.col >= this._bufferService.cols || e.row < 0 || e.row >= this._bufferService.rows) return !1;
						if (4 === e.button && 32 === e.action) return !1;
						if (3 === e.button && 32 !== e.action) return !1;
						if (4 !== e.button && (2 === e.action || 3 === e.action)) return !1;
						if (e.col++, e.row++, 32 === e.action && this._lastEvent && this._equalEvents(this._lastEvent, e, "SGR_PIXELS" === this._activeEncoding)) return !1;
						if (!this._protocols[this._activeProtocol].restrict(e)) return !1;
						const t = this._encodings[this._activeEncoding](e);
						return t && ("DEFAULT" === this._activeEncoding ? this._coreService.triggerBinaryEvent(t) : this._coreService.triggerDataEvent(t, !0)), this._lastEvent = e, !0;
					}
					explainEvents(e) {
						return {
							down: !!(1 & e),
							up: !!(2 & e),
							drag: !!(4 & e),
							move: !!(8 & e),
							wheel: !!(16 & e)
						};
					}
					_equalEvents(e, t, i) {
						if (i) {
							if (e.x !== t.x) return !1;
							if (e.y !== t.y) return !1;
						} else {
							if (e.col !== t.col) return !1;
							if (e.row !== t.row) return !1;
						}
						return e.button === t.button && e.action === t.action && e.ctrl === t.ctrl && e.alt === t.alt && e.shift === t.shift;
					}
				};
				t.CoreMouseService = _ = s([r(0, n.IBufferService), r(1, n.ICoreService)], _);
			},
			6975: function(e, t, i) {
				var s = this && this.__decorate || function(e, t, i, s) {
					var r, n = arguments.length, o = n < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
					if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, i, s);
					else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (o = (n < 3 ? r(o) : n > 3 ? r(t, i, o) : r(t, i)) || o);
					return n > 3 && o && Object.defineProperty(t, i, o), o;
				}, r = this && this.__param || function(e, t) {
					return function(i, s) {
						t(i, s, e);
					};
				};
				Object.defineProperty(t, "__esModule", { value: !0 }), t.CoreService = void 0;
				const n = i(1439), o = i(8460), a = i(844), h = i(2585), c = Object.freeze({ insertMode: !1 }), l = Object.freeze({
					applicationCursorKeys: !1,
					applicationKeypad: !1,
					bracketedPasteMode: !1,
					origin: !1,
					reverseWraparound: !1,
					sendFocus: !1,
					wraparound: !0
				});
				let d = t.CoreService = class extends a.Disposable {
					constructor(e, t, i) {
						super(), this._bufferService = e, this._logService = t, this._optionsService = i, this.isCursorInitialized = !1, this.isCursorHidden = !1, this._onData = this.register(new o.EventEmitter()), this.onData = this._onData.event, this._onUserInput = this.register(new o.EventEmitter()), this.onUserInput = this._onUserInput.event, this._onBinary = this.register(new o.EventEmitter()), this.onBinary = this._onBinary.event, this._onRequestScrollToBottom = this.register(new o.EventEmitter()), this.onRequestScrollToBottom = this._onRequestScrollToBottom.event, this.modes = (0, n.clone)(c), this.decPrivateModes = (0, n.clone)(l);
					}
					reset() {
						this.modes = (0, n.clone)(c), this.decPrivateModes = (0, n.clone)(l);
					}
					triggerDataEvent(e, t = !1) {
						if (this._optionsService.rawOptions.disableStdin) return;
						const i = this._bufferService.buffer;
						t && this._optionsService.rawOptions.scrollOnUserInput && i.ybase !== i.ydisp && this._onRequestScrollToBottom.fire(), t && this._onUserInput.fire(), this._logService.debug(`sending data "${e}"`, (() => e.split("").map(((e) => e.charCodeAt(0))))), this._onData.fire(e);
					}
					triggerBinaryEvent(e) {
						this._optionsService.rawOptions.disableStdin || (this._logService.debug(`sending binary "${e}"`, (() => e.split("").map(((e) => e.charCodeAt(0))))), this._onBinary.fire(e));
					}
				};
				t.CoreService = d = s([
					r(0, h.IBufferService),
					r(1, h.ILogService),
					r(2, h.IOptionsService)
				], d);
			},
			9074: (e, t, i) => {
				Object.defineProperty(t, "__esModule", { value: !0 }), t.DecorationService = void 0;
				const s = i(8055), r = i(8460), n = i(844), o = i(6106);
				let a = 0, h = 0;
				class c extends n.Disposable {
					get decorations() {
						return this._decorations.values();
					}
					constructor() {
						super(), this._decorations = new o.SortedList(((e) => e?.marker.line)), this._onDecorationRegistered = this.register(new r.EventEmitter()), this.onDecorationRegistered = this._onDecorationRegistered.event, this._onDecorationRemoved = this.register(new r.EventEmitter()), this.onDecorationRemoved = this._onDecorationRemoved.event, this.register((0, n.toDisposable)((() => this.reset())));
					}
					registerDecoration(e) {
						if (e.marker.isDisposed) return;
						const t = new l(e);
						if (t) {
							const e = t.marker.onDispose((() => t.dispose()));
							t.onDispose((() => {
								t && (this._decorations.delete(t) && this._onDecorationRemoved.fire(t), e.dispose());
							})), this._decorations.insert(t), this._onDecorationRegistered.fire(t);
						}
						return t;
					}
					reset() {
						for (const e of this._decorations.values()) e.dispose();
						this._decorations.clear();
					}
					*getDecorationsAtCell(e, t, i) {
						let s = 0, r = 0;
						for (const n of this._decorations.getKeyIterator(t)) s = n.options.x ?? 0, r = s + (n.options.width ?? 1), e >= s && e < r && (!i || (n.options.layer ?? "bottom") === i) && (yield n);
					}
					forEachDecorationAtCell(e, t, i, s) {
						this._decorations.forEachByKey(t, ((t) => {
							a = t.options.x ?? 0, h = a + (t.options.width ?? 1), e >= a && e < h && (!i || (t.options.layer ?? "bottom") === i) && s(t);
						}));
					}
				}
				t.DecorationService = c;
				class l extends n.Disposable {
					get isDisposed() {
						return this._isDisposed;
					}
					get backgroundColorRGB() {
						return null === this._cachedBg && (this.options.backgroundColor ? this._cachedBg = s.css.toColor(this.options.backgroundColor) : this._cachedBg = void 0), this._cachedBg;
					}
					get foregroundColorRGB() {
						return null === this._cachedFg && (this.options.foregroundColor ? this._cachedFg = s.css.toColor(this.options.foregroundColor) : this._cachedFg = void 0), this._cachedFg;
					}
					constructor(e) {
						super(), this.options = e, this.onRenderEmitter = this.register(new r.EventEmitter()), this.onRender = this.onRenderEmitter.event, this._onDispose = this.register(new r.EventEmitter()), this.onDispose = this._onDispose.event, this._cachedBg = null, this._cachedFg = null, this.marker = e.marker, this.options.overviewRulerOptions && !this.options.overviewRulerOptions.position && (this.options.overviewRulerOptions.position = "full");
					}
					dispose() {
						this._onDispose.fire(), super.dispose();
					}
				}
			},
			4348: (e, t, i) => {
				Object.defineProperty(t, "__esModule", { value: !0 }), t.InstantiationService = t.ServiceCollection = void 0;
				const s = i(2585), r = i(8343);
				class n {
					constructor(...e) {
						this._entries = /* @__PURE__ */ new Map();
						for (const [t, i] of e) this.set(t, i);
					}
					set(e, t) {
						const i = this._entries.get(e);
						return this._entries.set(e, t), i;
					}
					forEach(e) {
						for (const [t, i] of this._entries.entries()) e(t, i);
					}
					has(e) {
						return this._entries.has(e);
					}
					get(e) {
						return this._entries.get(e);
					}
				}
				t.ServiceCollection = n, t.InstantiationService = class {
					constructor() {
						this._services = new n(), this._services.set(s.IInstantiationService, this);
					}
					setService(e, t) {
						this._services.set(e, t);
					}
					getService(e) {
						return this._services.get(e);
					}
					createInstance(e, ...t) {
						const i = (0, r.getServiceDependencies)(e).sort(((e, t) => e.index - t.index)), s = [];
						for (const t of i) {
							const i = this._services.get(t.id);
							if (!i) throw new Error(`[createInstance] ${e.name} depends on UNKNOWN service ${t.id}.`);
							s.push(i);
						}
						const n = i.length > 0 ? i[0].index : t.length;
						if (t.length !== n) throw new Error(`[createInstance] First service dependency of ${e.name} at position ${n + 1} conflicts with ${t.length} static arguments`);
						return new e(...[...t, ...s]);
					}
				};
			},
			7866: function(e, t, i) {
				var s = this && this.__decorate || function(e, t, i, s) {
					var r, n = arguments.length, o = n < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
					if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, i, s);
					else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (o = (n < 3 ? r(o) : n > 3 ? r(t, i, o) : r(t, i)) || o);
					return n > 3 && o && Object.defineProperty(t, i, o), o;
				}, r = this && this.__param || function(e, t) {
					return function(i, s) {
						t(i, s, e);
					};
				};
				Object.defineProperty(t, "__esModule", { value: !0 }), t.traceCall = t.setTraceLogger = t.LogService = void 0;
				const n = i(844), o = i(2585), a = {
					trace: o.LogLevelEnum.TRACE,
					debug: o.LogLevelEnum.DEBUG,
					info: o.LogLevelEnum.INFO,
					warn: o.LogLevelEnum.WARN,
					error: o.LogLevelEnum.ERROR,
					off: o.LogLevelEnum.OFF
				};
				let h, c = t.LogService = class extends n.Disposable {
					get logLevel() {
						return this._logLevel;
					}
					constructor(e) {
						super(), this._optionsService = e, this._logLevel = o.LogLevelEnum.OFF, this._updateLogLevel(), this.register(this._optionsService.onSpecificOptionChange("logLevel", (() => this._updateLogLevel()))), h = this;
					}
					_updateLogLevel() {
						this._logLevel = a[this._optionsService.rawOptions.logLevel];
					}
					_evalLazyOptionalParams(e) {
						for (let t = 0; t < e.length; t++) "function" == typeof e[t] && (e[t] = e[t]());
					}
					_log(e, t, i) {
						this._evalLazyOptionalParams(i), e.call(console, (this._optionsService.options.logger ? "" : "xterm.js: ") + t, ...i);
					}
					trace(e, ...t) {
						this._logLevel <= o.LogLevelEnum.TRACE && this._log(this._optionsService.options.logger?.trace.bind(this._optionsService.options.logger) ?? console.log, e, t);
					}
					debug(e, ...t) {
						this._logLevel <= o.LogLevelEnum.DEBUG && this._log(this._optionsService.options.logger?.debug.bind(this._optionsService.options.logger) ?? console.log, e, t);
					}
					info(e, ...t) {
						this._logLevel <= o.LogLevelEnum.INFO && this._log(this._optionsService.options.logger?.info.bind(this._optionsService.options.logger) ?? console.info, e, t);
					}
					warn(e, ...t) {
						this._logLevel <= o.LogLevelEnum.WARN && this._log(this._optionsService.options.logger?.warn.bind(this._optionsService.options.logger) ?? console.warn, e, t);
					}
					error(e, ...t) {
						this._logLevel <= o.LogLevelEnum.ERROR && this._log(this._optionsService.options.logger?.error.bind(this._optionsService.options.logger) ?? console.error, e, t);
					}
				};
				t.LogService = c = s([r(0, o.IOptionsService)], c), t.setTraceLogger = function(e) {
					h = e;
				}, t.traceCall = function(e, t, i) {
					if ("function" != typeof i.value) throw new Error("not supported");
					const s = i.value;
					i.value = function(...e) {
						if (h.logLevel !== o.LogLevelEnum.TRACE) return s.apply(this, e);
						h.trace(`GlyphRenderer#${s.name}(${e.map(((e) => JSON.stringify(e))).join(", ")})`);
						const t = s.apply(this, e);
						return h.trace(`GlyphRenderer#${s.name} return`, t), t;
					};
				};
			},
			7302: (e, t, i) => {
				Object.defineProperty(t, "__esModule", { value: !0 }), t.OptionsService = t.DEFAULT_OPTIONS = void 0;
				const s = i(8460), r = i(844);
				t.DEFAULT_OPTIONS = {
					cols: 80,
					rows: 24,
					cursorBlink: !1,
					cursorStyle: "block",
					cursorWidth: 1,
					cursorInactiveStyle: "outline",
					customGlyphs: !0,
					drawBoldTextInBrightColors: !0,
					documentOverride: null,
					fastScrollModifier: "alt",
					fastScrollSensitivity: 5,
					fontFamily: "courier-new, courier, monospace",
					fontSize: 15,
					fontWeight: "normal",
					fontWeightBold: "bold",
					ignoreBracketedPasteMode: !1,
					lineHeight: 1,
					letterSpacing: 0,
					linkHandler: null,
					logLevel: "info",
					logger: null,
					scrollback: 1e3,
					scrollOnUserInput: !0,
					scrollSensitivity: 1,
					screenReaderMode: !1,
					smoothScrollDuration: 0,
					macOptionIsMeta: !1,
					macOptionClickForcesSelection: !1,
					minimumContrastRatio: 1,
					disableStdin: !1,
					allowProposedApi: !1,
					allowTransparency: !1,
					tabStopWidth: 8,
					theme: {},
					rescaleOverlappingGlyphs: !1,
					rightClickSelectsWord: i(6114).isMac,
					windowOptions: {},
					windowsMode: !1,
					windowsPty: {},
					wordSeparator: " ()[]{}',\"`",
					altClickMovesCursor: !0,
					convertEol: !1,
					termName: "xterm",
					cancelEvents: !1,
					overviewRulerWidth: 0
				};
				const o = [
					"normal",
					"bold",
					"100",
					"200",
					"300",
					"400",
					"500",
					"600",
					"700",
					"800",
					"900"
				];
				class a extends r.Disposable {
					constructor(e) {
						super(), this._onOptionChange = this.register(new s.EventEmitter()), this.onOptionChange = this._onOptionChange.event;
						const i = { ...t.DEFAULT_OPTIONS };
						for (const t in e) if (t in i) try {
							const s = e[t];
							i[t] = this._sanitizeAndValidateOption(t, s);
						} catch (e) {
							console.error(e);
						}
						this.rawOptions = i, this.options = { ...i }, this._setupOptions(), this.register((0, r.toDisposable)((() => {
							this.rawOptions.linkHandler = null, this.rawOptions.documentOverride = null;
						})));
					}
					onSpecificOptionChange(e, t) {
						return this.onOptionChange(((i) => {
							i === e && t(this.rawOptions[e]);
						}));
					}
					onMultipleOptionChange(e, t) {
						return this.onOptionChange(((i) => {
							-1 !== e.indexOf(i) && t();
						}));
					}
					_setupOptions() {
						const e = (e) => {
							if (!(e in t.DEFAULT_OPTIONS)) throw new Error(`No option with key "${e}"`);
							return this.rawOptions[e];
						}, i = (e, i) => {
							if (!(e in t.DEFAULT_OPTIONS)) throw new Error(`No option with key "${e}"`);
							i = this._sanitizeAndValidateOption(e, i), this.rawOptions[e] !== i && (this.rawOptions[e] = i, this._onOptionChange.fire(e));
						};
						for (const t in this.rawOptions) {
							const s = {
								get: e.bind(this, t),
								set: i.bind(this, t)
							};
							Object.defineProperty(this.options, t, s);
						}
					}
					_sanitizeAndValidateOption(e, i) {
						switch (e) {
							case "cursorStyle":
								if (i || (i = t.DEFAULT_OPTIONS[e]), !function(e) {
									return "block" === e || "underline" === e || "bar" === e;
								}(i)) throw new Error(`"${i}" is not a valid value for ${e}`);
								break;
							case "wordSeparator":
								i || (i = t.DEFAULT_OPTIONS[e]);
								break;
							case "fontWeight":
							case "fontWeightBold":
								if ("number" == typeof i && 1 <= i && i <= 1e3) break;
								i = o.includes(i) ? i : t.DEFAULT_OPTIONS[e];
								break;
							case "cursorWidth": i = Math.floor(i);
							case "lineHeight":
							case "tabStopWidth":
								if (i < 1) throw new Error(`${e} cannot be less than 1, value: ${i}`);
								break;
							case "minimumContrastRatio":
								i = Math.max(1, Math.min(21, Math.round(10 * i) / 10));
								break;
							case "scrollback":
								if ((i = Math.min(i, 4294967295)) < 0) throw new Error(`${e} cannot be less than 0, value: ${i}`);
								break;
							case "fastScrollSensitivity":
							case "scrollSensitivity":
								if (i <= 0) throw new Error(`${e} cannot be less than or equal to 0, value: ${i}`);
								break;
							case "rows":
							case "cols":
								if (!i && 0 !== i) throw new Error(`${e} must be numeric, value: ${i}`);
								break;
							case "windowsPty": i = i ?? {};
						}
						return i;
					}
				}
				t.OptionsService = a;
			},
			2660: function(e, t, i) {
				var s = this && this.__decorate || function(e, t, i, s) {
					var r, n = arguments.length, o = n < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
					if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, i, s);
					else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (o = (n < 3 ? r(o) : n > 3 ? r(t, i, o) : r(t, i)) || o);
					return n > 3 && o && Object.defineProperty(t, i, o), o;
				}, r = this && this.__param || function(e, t) {
					return function(i, s) {
						t(i, s, e);
					};
				};
				Object.defineProperty(t, "__esModule", { value: !0 }), t.OscLinkService = void 0;
				const n = i(2585);
				let o = t.OscLinkService = class {
					constructor(e) {
						this._bufferService = e, this._nextId = 1, this._entriesWithId = /* @__PURE__ */ new Map(), this._dataByLinkId = /* @__PURE__ */ new Map();
					}
					registerLink(e) {
						const t = this._bufferService.buffer;
						if (void 0 === e.id) {
							const i = t.addMarker(t.ybase + t.y), s = {
								data: e,
								id: this._nextId++,
								lines: [i]
							};
							return i.onDispose((() => this._removeMarkerFromLink(s, i))), this._dataByLinkId.set(s.id, s), s.id;
						}
						const i = e, s = this._getEntryIdKey(i), r = this._entriesWithId.get(s);
						if (r) return this.addLineToLink(r.id, t.ybase + t.y), r.id;
						const n = t.addMarker(t.ybase + t.y), o = {
							id: this._nextId++,
							key: this._getEntryIdKey(i),
							data: i,
							lines: [n]
						};
						return n.onDispose((() => this._removeMarkerFromLink(o, n))), this._entriesWithId.set(o.key, o), this._dataByLinkId.set(o.id, o), o.id;
					}
					addLineToLink(e, t) {
						const i = this._dataByLinkId.get(e);
						if (i && i.lines.every(((e) => e.line !== t))) {
							const e = this._bufferService.buffer.addMarker(t);
							i.lines.push(e), e.onDispose((() => this._removeMarkerFromLink(i, e)));
						}
					}
					getLinkData(e) {
						return this._dataByLinkId.get(e)?.data;
					}
					_getEntryIdKey(e) {
						return `${e.id};;${e.uri}`;
					}
					_removeMarkerFromLink(e, t) {
						const i = e.lines.indexOf(t);
						-1 !== i && (e.lines.splice(i, 1), 0 === e.lines.length && (void 0 !== e.data.id && this._entriesWithId.delete(e.key), this._dataByLinkId.delete(e.id)));
					}
				};
				t.OscLinkService = o = s([r(0, n.IBufferService)], o);
			},
			8343: (e, t) => {
				Object.defineProperty(t, "__esModule", { value: !0 }), t.createDecorator = t.getServiceDependencies = t.serviceRegistry = void 0;
				const i = "di$target", s = "di$dependencies";
				t.serviceRegistry = /* @__PURE__ */ new Map(), t.getServiceDependencies = function(e) {
					return e[s] || [];
				}, t.createDecorator = function(e) {
					if (t.serviceRegistry.has(e)) return t.serviceRegistry.get(e);
					const r = function(e, t, n) {
						if (3 !== arguments.length) throw new Error("@IServiceName-decorator can only be used to decorate a parameter");
						(function(e, t, r) {
							t[i] === t ? t[s].push({
								id: e,
								index: r
							}) : (t[s] = [{
								id: e,
								index: r
							}], t[i] = t);
						})(r, e, n);
					};
					return r.toString = () => e, t.serviceRegistry.set(e, r), r;
				};
			},
			2585: (e, t, i) => {
				Object.defineProperty(t, "__esModule", { value: !0 }), t.IDecorationService = t.IUnicodeService = t.IOscLinkService = t.IOptionsService = t.ILogService = t.LogLevelEnum = t.IInstantiationService = t.ICharsetService = t.ICoreService = t.ICoreMouseService = t.IBufferService = void 0;
				const s = i(8343);
				var r;
				t.IBufferService = (0, s.createDecorator)("BufferService"), t.ICoreMouseService = (0, s.createDecorator)("CoreMouseService"), t.ICoreService = (0, s.createDecorator)("CoreService"), t.ICharsetService = (0, s.createDecorator)("CharsetService"), t.IInstantiationService = (0, s.createDecorator)("InstantiationService"), function(e) {
					e[e.TRACE = 0] = "TRACE", e[e.DEBUG = 1] = "DEBUG", e[e.INFO = 2] = "INFO", e[e.WARN = 3] = "WARN", e[e.ERROR = 4] = "ERROR", e[e.OFF = 5] = "OFF";
				}(r || (t.LogLevelEnum = r = {})), t.ILogService = (0, s.createDecorator)("LogService"), t.IOptionsService = (0, s.createDecorator)("OptionsService"), t.IOscLinkService = (0, s.createDecorator)("OscLinkService"), t.IUnicodeService = (0, s.createDecorator)("UnicodeService"), t.IDecorationService = (0, s.createDecorator)("DecorationService");
			},
			1480: (e, t, i) => {
				Object.defineProperty(t, "__esModule", { value: !0 }), t.UnicodeService = void 0;
				const s = i(8460), r = i(225);
				class n {
					static extractShouldJoin(e) {
						return 0 != (1 & e);
					}
					static extractWidth(e) {
						return e >> 1 & 3;
					}
					static extractCharKind(e) {
						return e >> 3;
					}
					static createPropertyValue(e, t, i = !1) {
						return (16777215 & e) << 3 | (3 & t) << 1 | (i ? 1 : 0);
					}
					constructor() {
						this._providers = Object.create(null), this._active = "", this._onChange = new s.EventEmitter(), this.onChange = this._onChange.event;
						const e = new r.UnicodeV6();
						this.register(e), this._active = e.version, this._activeProvider = e;
					}
					dispose() {
						this._onChange.dispose();
					}
					get versions() {
						return Object.keys(this._providers);
					}
					get activeVersion() {
						return this._active;
					}
					set activeVersion(e) {
						if (!this._providers[e]) throw new Error(`unknown Unicode version "${e}"`);
						this._active = e, this._activeProvider = this._providers[e], this._onChange.fire(e);
					}
					register(e) {
						this._providers[e.version] = e;
					}
					wcwidth(e) {
						return this._activeProvider.wcwidth(e);
					}
					getStringCellWidth(e) {
						let t = 0, i = 0;
						const s = e.length;
						for (let r = 0; r < s; ++r) {
							let o = e.charCodeAt(r);
							if (55296 <= o && o <= 56319) {
								if (++r >= s) return t + this.wcwidth(o);
								const i = e.charCodeAt(r);
								56320 <= i && i <= 57343 ? o = 1024 * (o - 55296) + i - 56320 + 65536 : t += this.wcwidth(i);
							}
							const a = this.charProperties(o, i);
							let h = n.extractWidth(a);
							n.extractShouldJoin(a) && (h -= n.extractWidth(i)), t += h, i = a;
						}
						return t;
					}
					charProperties(e, t) {
						return this._activeProvider.charProperties(e, t);
					}
				}
				t.UnicodeService = n;
			}
		}, t = {};
		function i(s) {
			var r = t[s];
			if (void 0 !== r) return r.exports;
			var n = t[s] = { exports: {} };
			return e[s].call(n.exports, n, n.exports, i), n.exports;
		}
		var s = {};
		return (() => {
			var e = s;
			Object.defineProperty(e, "__esModule", { value: !0 }), e.Terminal = void 0;
			const t = i(9042), r = i(3236), n = i(844), o = i(5741), a = i(8285), h = i(7975), c = i(7090), l = ["cols", "rows"];
			class d extends n.Disposable {
				constructor(e) {
					super(), this._core = this.register(new r.Terminal(e)), this._addonManager = this.register(new o.AddonManager()), this._publicOptions = { ...this._core.options };
					const t = (e) => this._core.options[e], i = (e, t) => {
						this._checkReadonlyOptions(e), this._core.options[e] = t;
					};
					for (const e in this._core.options) {
						const s = {
							get: t.bind(this, e),
							set: i.bind(this, e)
						};
						Object.defineProperty(this._publicOptions, e, s);
					}
				}
				_checkReadonlyOptions(e) {
					if (l.includes(e)) throw new Error(`Option "${e}" can only be set in the constructor`);
				}
				_checkProposedApi() {
					if (!this._core.optionsService.rawOptions.allowProposedApi) throw new Error("You must set the allowProposedApi option to true to use proposed API");
				}
				get onBell() {
					return this._core.onBell;
				}
				get onBinary() {
					return this._core.onBinary;
				}
				get onCursorMove() {
					return this._core.onCursorMove;
				}
				get onData() {
					return this._core.onData;
				}
				get onKey() {
					return this._core.onKey;
				}
				get onLineFeed() {
					return this._core.onLineFeed;
				}
				get onRender() {
					return this._core.onRender;
				}
				get onResize() {
					return this._core.onResize;
				}
				get onScroll() {
					return this._core.onScroll;
				}
				get onSelectionChange() {
					return this._core.onSelectionChange;
				}
				get onTitleChange() {
					return this._core.onTitleChange;
				}
				get onWriteParsed() {
					return this._core.onWriteParsed;
				}
				get element() {
					return this._core.element;
				}
				get parser() {
					return this._parser || (this._parser = new h.ParserApi(this._core)), this._parser;
				}
				get unicode() {
					return this._checkProposedApi(), new c.UnicodeApi(this._core);
				}
				get textarea() {
					return this._core.textarea;
				}
				get rows() {
					return this._core.rows;
				}
				get cols() {
					return this._core.cols;
				}
				get buffer() {
					return this._buffer || (this._buffer = this.register(new a.BufferNamespaceApi(this._core))), this._buffer;
				}
				get markers() {
					return this._checkProposedApi(), this._core.markers;
				}
				get modes() {
					const e = this._core.coreService.decPrivateModes;
					let t = "none";
					switch (this._core.coreMouseService.activeProtocol) {
						case "X10":
							t = "x10";
							break;
						case "VT200":
							t = "vt200";
							break;
						case "DRAG":
							t = "drag";
							break;
						case "ANY": t = "any";
					}
					return {
						applicationCursorKeysMode: e.applicationCursorKeys,
						applicationKeypadMode: e.applicationKeypad,
						bracketedPasteMode: e.bracketedPasteMode,
						insertMode: this._core.coreService.modes.insertMode,
						mouseTrackingMode: t,
						originMode: e.origin,
						reverseWraparoundMode: e.reverseWraparound,
						sendFocusMode: e.sendFocus,
						wraparoundMode: e.wraparound
					};
				}
				get options() {
					return this._publicOptions;
				}
				set options(e) {
					for (const t in e) this._publicOptions[t] = e[t];
				}
				blur() {
					this._core.blur();
				}
				focus() {
					this._core.focus();
				}
				input(e, t = !0) {
					this._core.input(e, t);
				}
				resize(e, t) {
					this._verifyIntegers(e, t), this._core.resize(e, t);
				}
				open(e) {
					this._core.open(e);
				}
				attachCustomKeyEventHandler(e) {
					this._core.attachCustomKeyEventHandler(e);
				}
				attachCustomWheelEventHandler(e) {
					this._core.attachCustomWheelEventHandler(e);
				}
				registerLinkProvider(e) {
					return this._core.registerLinkProvider(e);
				}
				registerCharacterJoiner(e) {
					return this._checkProposedApi(), this._core.registerCharacterJoiner(e);
				}
				deregisterCharacterJoiner(e) {
					this._checkProposedApi(), this._core.deregisterCharacterJoiner(e);
				}
				registerMarker(e = 0) {
					return this._verifyIntegers(e), this._core.registerMarker(e);
				}
				registerDecoration(e) {
					return this._checkProposedApi(), this._verifyPositiveIntegers(e.x ?? 0, e.width ?? 0, e.height ?? 0), this._core.registerDecoration(e);
				}
				hasSelection() {
					return this._core.hasSelection();
				}
				select(e, t, i) {
					this._verifyIntegers(e, t, i), this._core.select(e, t, i);
				}
				getSelection() {
					return this._core.getSelection();
				}
				getSelectionPosition() {
					return this._core.getSelectionPosition();
				}
				clearSelection() {
					this._core.clearSelection();
				}
				selectAll() {
					this._core.selectAll();
				}
				selectLines(e, t) {
					this._verifyIntegers(e, t), this._core.selectLines(e, t);
				}
				dispose() {
					super.dispose();
				}
				scrollLines(e) {
					this._verifyIntegers(e), this._core.scrollLines(e);
				}
				scrollPages(e) {
					this._verifyIntegers(e), this._core.scrollPages(e);
				}
				scrollToTop() {
					this._core.scrollToTop();
				}
				scrollToBottom() {
					this._core.scrollToBottom();
				}
				scrollToLine(e) {
					this._verifyIntegers(e), this._core.scrollToLine(e);
				}
				clear() {
					this._core.clear();
				}
				write(e, t) {
					this._core.write(e, t);
				}
				writeln(e, t) {
					this._core.write(e), this._core.write("\r\n", t);
				}
				paste(e) {
					this._core.paste(e);
				}
				refresh(e, t) {
					this._verifyIntegers(e, t), this._core.refresh(e, t);
				}
				reset() {
					this._core.reset();
				}
				clearTextureAtlas() {
					this._core.clearTextureAtlas();
				}
				loadAddon(e) {
					this._addonManager.loadAddon(this, e);
				}
				static get strings() {
					return t;
				}
				_verifyIntegers(...e) {
					for (const t of e) if (t === 1 / 0 || isNaN(t) || t % 1 != 0) throw new Error("This API only accepts integers");
				}
				_verifyPositiveIntegers(...e) {
					for (const t of e) if (t && (t === 1 / 0 || isNaN(t) || t % 1 != 0 || t < 0)) throw new Error("This API only accepts positive integers");
				}
			}
			e.Terminal = d;
		})(), s;
	})()));
}));
// node_modules/@xterm/addon-fit/lib/addon-fit.js
var require_addon_fit = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(e, t) {
		"object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.FitAddon = t() : e.FitAddon = t();
	})(self, (() => (() => {
		"use strict";
		var e = {};
		return (() => {
			var t = e;
			Object.defineProperty(t, "__esModule", { value: !0 }), t.FitAddon = void 0, t.FitAddon = class {
				activate(e) {
					this._terminal = e;
				}
				dispose() {}
				fit() {
					const e = this.proposeDimensions();
					if (!e || !this._terminal || isNaN(e.cols) || isNaN(e.rows)) return;
					const t = this._terminal._core;
					this._terminal.rows === e.rows && this._terminal.cols === e.cols || (t._renderService.clear(), this._terminal.resize(e.cols, e.rows));
				}
				proposeDimensions() {
					if (!this._terminal) return;
					if (!this._terminal.element || !this._terminal.element.parentElement) return;
					const e = this._terminal._core, t = e._renderService.dimensions;
					if (0 === t.css.cell.width || 0 === t.css.cell.height) return;
					const r = 0 === this._terminal.options.scrollback ? 0 : e.viewport.scrollBarWidth, i = window.getComputedStyle(this._terminal.element.parentElement), o = parseInt(i.getPropertyValue("height")), s = Math.max(0, parseInt(i.getPropertyValue("width"))), n = window.getComputedStyle(this._terminal.element), l = o - (parseInt(n.getPropertyValue("padding-top")) + parseInt(n.getPropertyValue("padding-bottom"))), a = s - (parseInt(n.getPropertyValue("padding-right")) + parseInt(n.getPropertyValue("padding-left"))) - r;
					return {
						cols: Math.max(2, Math.floor(a / t.css.cell.width)),
						rows: Math.max(1, Math.floor(l / t.css.cell.height))
					};
				}
			};
		})(), e;
	})()));
}));
// src/commands/ip-cmd.ts
var import_lz_string = /* @__PURE__ */ __toESM(require_lz_string(), 1);
var import_xterm = require_xterm();
var import_addon_fit = require_addon_fit();
var UNSUPPORTED_HINT = "Supported (phase 1): ip address [add|del], ip link [set], ip route [add|del], ip neigh\nNetSim never fakes syntax it does not implement.\n";
function expandObject(word) {
	for (const o of [
		"address",
		"link",
		"route",
		"neighbour"
	]) if (o.startsWith(word) && word.length > 0) return o;
	return null;
}
function runIp(device, args, out) {
	switch (expandObject(args[0] ?? "")) {
		case "address":
			ipAddress(device, args.slice(1), out);
			return;
		case "link":
			ipLink(device, args.slice(1), out);
			return;
		case "route":
			ipRoute(device, args.slice(1), out);
			return;
		case "neighbour":
			out(formatNeigh(device));
			return;
		default: out(`netsim: "ip ${args.join(" ")}" is not supported.\n${UNSUPPORTED_HINT}`);
	}
}
function ipAddress(device, a, out) {
	const sub = a[0] ?? "show";
	if (sub === "show" || sub === "s") {
		out(formatAddresses(device));
		return;
	}
	if (sub === "add" || sub === "del" || sub === "delete") {
		const cidr = parseCidr(a[1] ?? "");
		if (!cidr) {
			out(`Error: inet prefix is expected rather than "${a[1] ?? ""}".\n`);
			return;
		}
		if (a[2] !== "dev" || !a[3]) {
			out("Error: Not enough information: \"dev\" argument is required.\n");
			return;
		}
		const err = sub === "add" ? device.addIp(a[3], cidr.addr, cidr.prefix) : device.delIp(a[3], cidr.addr, cidr.prefix);
		if (err) out(err + "\n");
		return;
	}
	out(`netsim: "ip address ${a.join(" ")}" is not supported.\n${UNSUPPORTED_HINT}`);
}
function ipLink(device, a, out) {
	const sub = a[0] ?? "show";
	if (sub === "show" || sub === "s") {
		out(formatAddresses(device, { linkOnly: true }));
		return;
	}
	if (sub === "set") {
		let rest = a.slice(1);
		if (rest[0] === "dev") rest = rest.slice(1);
		const iface = device.getInterface(rest[0] ?? "");
		if (!iface) {
			out(`Cannot find device "${rest[0] ?? ""}"\n`);
			return;
		}
		if (rest[1] === "up") iface.up = true;
		else if (rest[1] === "down") iface.up = false;
		else out(`netsim: "ip link set ${a.slice(1).join(" ")}" is not supported (use up|down).\n`);
		return;
	}
	out(`netsim: "ip link ${a.join(" ")}" is not supported.\n${UNSUPPORTED_HINT}`);
}
function parseRouteTarget(word) {
	if (word === "default") return {
		addr: 0,
		prefix: 0
	};
	const cidr = parseCidr(word);
	if (cidr) return cidr;
	const ip = parseIp(word);
	if (ip !== null) return {
		addr: ip,
		prefix: 32
	};
	return null;
}
function ipRoute(device, a, out) {
	const sub = a[0] ?? "show";
	if (sub === "show" || sub === "s") {
		out(formatRoutes(device));
		return;
	}
	if (sub === "add" || sub === "del" || sub === "delete") {
		const target = parseRouteTarget(a[1] ?? "");
		if (!target) {
			out(`Error: inet prefix is expected rather than "${a[1] ?? ""}".\n`);
			return;
		}
		if (sub !== "add") {
			const err = device.delRoute(target.addr, target.prefix);
			if (err) out(err + "\n");
			return;
		}
		let via = null;
		let dev;
		for (let i = 2; i < a.length; i += 2) if (a[i] === "via") {
			via = parseIp(a[i + 1] ?? "");
			if (via === null) {
				out(`Error: inet address is expected rather than "${a[i + 1] ?? ""}".\n`);
				return;
			}
		} else if (a[i] === "dev") dev = a[i + 1];
		else {
			out(`Error: either "to" is duplicate, or "${a[i]}" is a garbage.\n`);
			return;
		}
		const err = device.addRoute(target.addr, target.prefix, via, dev);
		if (err) out(err + "\n");
		return;
	}
	out(`netsim: "ip route ${a.join(" ")}" is not supported.\n${UNSUPPORTED_HINT}`);
}
function formatAddresses(device, opts = {}) {
	let s = "";
	device.interfaces.forEach((i, idx) => {
		const flags = i.up ? "BROADCAST,MULTICAST,UP,LOWER_UP" : "BROADCAST,MULTICAST";
		const state = !i.up ? "DOWN" : i.link ? "UP" : "DOWN";
		s += `${idx + 1}: ${i.name}: <${flags}> mtu 1500 state ${state}\n`;
		s += `    link/ether ${i.mac} brd ff:ff:ff:ff:ff:ff\n`;
		if (!opts.linkOnly && i.ip) s += `    inet ${cidrToString(i.ip.addr, i.ip.prefix)} scope global ${i.name}\n`;
	});
	return s;
}
function formatRoutes(device) {
	const rs = device.routes();
	const defaults = rs.filter((r) => r.prefix === 0);
	const rest = rs.filter((r) => r.prefix !== 0);
	let s = "";
	for (const r of [...defaults, ...rest]) {
		const dest = r.prefix === 0 ? "default" : cidrToString(r.dest, r.prefix);
		if (r.kind === "connected") {
			const iface = device.getInterface(r.ifaceName);
			const src = iface?.ip ? ` src ${ipToString(iface.ip.addr)}` : "";
			s += `${dest} dev ${r.ifaceName} proto kernel scope link${src}\n`;
		} else if (r.kind === "rip" && r.via !== null) s += `${dest} via ${ipToString(r.via)} dev ${r.ifaceName} proto rip metric ${r.metric ?? 1}\n`;
		else if (r.via !== null) s += `${dest} via ${ipToString(r.via)} dev ${r.ifaceName}\n`;
		else s += `${dest} dev ${r.ifaceName} scope link\n`;
	}
	return s;
}
function formatNeigh(device) {
	let s = "";
	for (const [ip, e] of device.arpTable) s += `${ipToString(ip)} dev ${e.ifaceName} lladdr ${e.mac} REACHABLE\n`;
	return s;
}
function formatArpClassic(device) {
	let s = "Address                  HWtype  HWaddress           Flags Mask            Iface\n";
	for (const [ip, e] of device.arpTable) s += `${ipToString(ip).padEnd(25)}ether   ${e.mac.padEnd(20)}C                     ${e.ifaceName}\n`;
	return s;
}
// src/commands/resolve.ts
function resolveHost(device, target, cb) {
	const literal = parseIp(target);
	if (literal !== null) {
		cb({ ip: literal });
		return { cancel: () => {} };
	}
	if (device.nameserver === null) {
		cb({ error: `${target}: Temporary failure in name resolution` });
		return { cancel: () => {} };
	}
	let cancelled = false;
	device.resolveDns(target, device.nameserver, (r) => {
		if (cancelled) return;
		if (typeof r === "number") cb({ ip: r });
		else if (r === null) cb({ error: `${target}: Name or service not known` });
		else cb({ error: `${target}: Temporary failure in name resolution` });
	});
	return { cancel: () => {
		cancelled = true;
	} };
}
// src/commands/ping.ts
var INTERVAL_MS = 1e3;
var TIMEOUT_MS$1 = 2e3;
function runPing(device, args, write, done) {
	let count = null;
	let target = null;
	for (let i = 0; i < args.length; i++) {
		const a = args[i];
		if (a === "-c") {
			count = Number(args[++i]);
			if (!Number.isInteger(count) || count <= 0) {
				write("ping: invalid count\n");
				done();
				return null;
			}
		} else if (a.startsWith("-")) {
			write(`ping: netsim supports only: ping [-c count] <host>  (got "${a}")\n`);
			done();
			return null;
		} else target = a;
	}
	if (!target) {
		write("usage: ping [-c count] <destination>\n");
		done();
		return null;
	}
	let cancelFn;
	const resolver = resolveHost(device, target, (res) => {
		if ("error" in res) {
			write(`ping: ${res.error}\n`);
			done();
			return;
		}
		cancelFn = start(res.ip);
	});
	if (!cancelFn) cancelFn = () => {
		resolver.cancel();
		done();
	};
	return { cancel: () => cancelFn() };
	function start(ip) {
		const sched = device.network.scheduler;
		const id = device.allocIcmpId();
		const startedAt = sched.now;
		const sendTimes = /* @__PURE__ */ new Map();
		const answered = /* @__PURE__ */ new Set();
		const rtts = [];
		let sent = 0;
		let received = 0;
		let finished = false;
		write(`PING ${target} (${ipToString(ip)}) 56(84) bytes of data.\n`);
		const finish = () => {
			if (finished) return;
			finished = true;
			device.offIcmp(id);
			const loss = sent ? Math.round((sent - received) / sent * 100) : 0;
			write(`\n--- ${target} ping statistics ---\n`);
			write(`${sent} packets transmitted, ${received} received, ${loss}% packet loss, time ${Math.round(sched.now - startedAt)}ms\n`);
			if (rtts.length) {
				const min = Math.min(...rtts);
				const max = Math.max(...rtts);
				const avg = rtts.reduce((a, b) => a + b, 0) / rtts.length;
				write(`rtt min/avg/max = ${min.toFixed(1)}/${avg.toFixed(1)}/${max.toFixed(1)} ms\n`);
			}
			done();
		};
		const maybeFinish = (seq) => {
			if (count !== null && seq >= count) finish();
		};
		device.onIcmp(id, (ev) => {
			if (finished) return;
			switch (ev.type) {
				case "reply": {
					if (answered.has(ev.seq)) break;
					answered.add(ev.seq);
					received++;
					const rtt = sched.now - (sendTimes.get(ev.seq) ?? sched.now);
					rtts.push(rtt);
					write(`64 bytes from ${ipToString(ev.from)}: icmp_seq=${ev.seq} ttl=${ev.ttl} time=${rtt.toFixed(1)} ms\n`);
					maybeFinish(ev.seq);
					break;
				}
				case "time-exceeded": {
					const seq = ev.seq ?? 0;
					answered.add(seq);
					write(`From ${ipToString(ev.from)} icmp_seq=${seq} Time to live exceeded\n`);
					maybeFinish(seq);
					break;
				}
				case "unreachable": {
					const seq = ev.seq ?? 0;
					answered.add(seq);
					const what = ev.code === "net" ? "Net" : ev.code === "host" ? "Host" : "Port";
					write(`From ${ipToString(ev.from)} icmp_seq=${seq} Destination ${what} Unreachable\n`);
					maybeFinish(seq);
					break;
				}
				case "send-error": {
					const seq = ev.seq ?? 0;
					answered.add(seq);
					write(`From ${device.name} icmp_seq=${seq} ${ev.message}\n`);
					maybeFinish(seq);
					break;
				}
			}
		});
		const sendOne = () => {
			if (finished) return;
			const seq = ++sent;
			sendTimes.set(seq, sched.now);
			const err = device.sendEcho(ip, id, seq);
			if (err) {
				sent--;
				if (err === "Operation not permitted") write(`ping: sendmsg: ${err}\n`);
				else write(`ping: connect: ${err}\n`);
				finish();
				return;
			}
			sched.schedule(TIMEOUT_MS$1, () => {
				if (finished || answered.has(seq)) return;
				answered.add(seq);
				write(`no answer yet for icmp_seq=${seq}\n`);
				maybeFinish(seq);
			});
			if (count === null || sent < count) sched.schedule(INTERVAL_MS, sendOne);
		};
		sendOne();
		return finish;
	}
}
// src/commands/traceroute.ts
var PROBES_PER_HOP = 3;
var PROBE_TIMEOUT_MS = 1500;
function runTraceroute(device, args, write, done) {
	let maxHops = 30;
	let target = null;
	for (let i = 0; i < args.length; i++) {
		const a = args[i];
		if (a === "-m") {
			maxHops = Number(args[++i]);
			if (!Number.isInteger(maxHops) || maxHops <= 0) {
				write("traceroute: invalid max hops\n");
				done();
				return null;
			}
		} else if (a.startsWith("-")) {
			write(`traceroute: netsim supports only: traceroute [-m max_hops] <host>  (got "${a}")\n`);
			done();
			return null;
		} else target = a;
	}
	if (!target) {
		write("usage: traceroute [-m max_hops] <destination>\n");
		done();
		return null;
	}
	let cancelFn;
	const resolver = resolveHost(device, target, (res) => {
		if ("error" in res) {
			write(`traceroute: ${res.error}\n`);
			done();
			return;
		}
		cancelFn = start(res.ip);
	});
	if (!cancelFn) cancelFn = () => {
		resolver.cancel();
		done();
	};
	return { cancel: () => cancelFn() };
	function start(ip) {
		const sched = device.network.scheduler;
		const id = device.allocIcmpId();
		let finished = false;
		let ttl = 1;
		let probe = 0;
		let seqCounter = 0;
		let pendingSeq = null;
		let pendingTimer = null;
		let hopFrom = null;
		let hopRtts = [];
		let hopReached = false;
		let sendTime = 0;
		write(`traceroute to ${target} (${ipToString(ip)}), ${maxHops} hops max, 60 byte packets\n`);
		const cleanup = () => {
			if (finished) return;
			finished = true;
			if (pendingTimer) sched.cancel(pendingTimer);
			device.offIcmp(id);
			done();
		};
		const flushHopLine = () => {
			const fromStr = hopFrom !== null ? ipToString(hopFrom) : "*";
			const rttStr = hopRtts.map((r) => r === null ? "*" : `${r.toFixed(1)} ms`).join("  ");
			write(`${String(ttl).padStart(2)}  ${fromStr}  ${rttStr}\n`);
		};
		const nextStep = () => {
			if (finished) return;
			if (probe < PROBES_PER_HOP) {
				sendProbe();
				return;
			}
			flushHopLine();
			if (hopReached || ttl >= maxHops) {
				cleanup();
				return;
			}
			ttl++;
			probe = 0;
			hopFrom = null;
			hopRtts = [];
			sendProbe();
		};
		const onProbeResult = (from, rtt, reached) => {
			if (pendingTimer) sched.cancel(pendingTimer);
			pendingTimer = null;
			pendingSeq = null;
			if (from !== null) hopFrom = from;
			hopRtts.push(rtt);
			if (reached) hopReached = true;
			probe++;
			nextStep();
		};
		device.onIcmp(id, (ev) => {
			if (finished) return;
			const seq = ev.type === "reply" || ev.type === "time-exceeded" || ev.type === "unreachable" || ev.type === "send-error" ? ev.seq : null;
			if (seq === null || seq !== pendingSeq) return;
			const rtt = sched.now - sendTime;
			switch (ev.type) {
				case "reply":
					onProbeResult(ev.from, rtt, true);
					break;
				case "time-exceeded":
					onProbeResult(ev.from, rtt, false);
					break;
				case "unreachable":
					onProbeResult(ev.from, rtt, true);
					break;
				case "send-error": onProbeResult(null, null, false);
			}
		});
		const sendProbe = () => {
			if (finished) return;
			const seq = ++seqCounter;
			pendingSeq = seq;
			sendTime = sched.now;
			const err = device.sendEcho(ip, id, seq, ttl);
			if (err) {
				write(`connect: ${err}\n`);
				cleanup();
				return;
			}
			pendingTimer = sched.schedule(PROBE_TIMEOUT_MS, () => {
				pendingTimer = null;
				pendingSeq = null;
				hopRtts.push(null);
				probe++;
				nextStep();
			});
		};
		sendProbe();
		return cleanup;
	}
}
// src/commands/nft.ts
var SUBSET_HINT$1 = "Supported nft subset: list ruleset [-a] · flush ruleset · add table ip filter|nat ·\nadd chain ip <table> <name> { type filter|nat hook <hook> priority <n> ; [policy accept|drop ;] } ·\nadd|insert rule ip <table> <chain> [matches] accept|drop|reject|masquerade|snat to <ip>|dnat to <ip>[:port] ·\ndelete rule ip <table> <chain> handle <n>\nMatches: ip saddr/daddr <cidr>, tcp|udp sport/dport <port|a-b>, icmp type <echo-request|echo-reply>,\nct state <list>, iifname/oifname \"<if>\"\n";
var CT_STATES = [
	"new",
	"established",
	"related",
	"invalid"
];
var FILTER_HOOKS = [
	"input",
	"forward",
	"output"
];
var NAT_HOOKS = ["prerouting", "postrouting"];
function lex(raw) {
	return raw.replace(/['"]/g, "").replace(/([{};,])/g, " $1 ").trim().split(/\s+/).filter(Boolean);
}
function parsePort(tok) {
	const range = tok.match(/^(\d+)-(\d+)$/);
	if (range) {
		const from = Number(range[1]);
		const to = Number(range[2]);
		if (from >= 1 && to <= 65535 && from <= to) return {
			from,
			to
		};
		return null;
	}
	const p = Number(tok);
	if (Number.isInteger(p) && p >= 1 && p <= 65535) return {
		from: p,
		to: p
	};
	return null;
}
function parseNetToken(tok) {
	const cidr = parseCidr(tok);
	if (cidr) return cidr;
	const ip = parseIp(tok);
	if (ip !== null) return {
		addr: ip,
		prefix: 32
	};
	return null;
}
var Parser = class {
	t;
	i = 0;
	constructor(t) {
		this.t = t;
	}
	peek() {
		return this.t[this.i];
	}
	next() {
		return this.t[this.i++];
	}
	expect(tok) {
		if (this.peek() === tok) {
			this.i++;
			return true;
		}
		return false;
	}
};
function parseExpressions(p) {
	const match = {};
	let verdict;
	let nat;
	while (p.peek() !== void 0) {
		const tok = p.next();
		if (tok === "ip") {
			const what = p.next();
			if (what === "saddr" || what === "daddr") {
				const net = parseNetToken(p.next() ?? "");
				if (!net) return {
					match,
					error: `Error: syntax error, invalid address after "ip ${what}"`
				};
				if (what === "saddr") match.srcNet = net;
				else match.dstNet = net;
			} else if (what === "protocol") {
				const proto = p.next();
				if (proto !== "tcp" && proto !== "udp" && proto !== "icmp") return {
					match,
					error: `Error: syntax error, unexpected protocol "${proto ?? ""}"`
				};
				match.proto = proto;
			} else return {
				match,
				error: `Error: syntax error, unexpected "ip ${what ?? ""}"`
			};
		} else if (tok === "tcp" || tok === "udp") {
			if (match.proto && match.proto !== tok) return {
				match,
				error: "Error: conflicting protocols specified"
			};
			match.proto = tok;
			const what = p.next();
			if (what !== "sport" && what !== "dport") return {
				match,
				error: `Error: syntax error, unexpected "${tok} ${what ?? ""}"`
			};
			const port = parsePort(p.next() ?? "");
			if (!port) return {
				match,
				error: `Error: syntax error, invalid port after "${tok} ${what}"`
			};
			if (what === "sport") match.sport = port;
			else match.dport = port;
		} else if (tok === "icmp") {
			if (match.proto && match.proto !== "icmp") return {
				match,
				error: "Error: conflicting protocols specified"
			};
			match.proto = "icmp";
			if (p.next() !== "type") return {
				match,
				error: "Error: syntax error after \"icmp\""
			};
			const t = p.next();
			if (t !== "echo-request" && t !== "echo-reply") return {
				match,
				error: `netsim: icmp type "${t ?? ""}" not in phase-2 subset (echo-request, echo-reply)`
			};
			match.icmpType = t;
		} else if (tok === "ct") {
			if (p.next() !== "state") return {
				match,
				error: "Error: syntax error after \"ct\""
			};
			const states = [];
			const braced = p.expect("{");
			for (;;) {
				const s = p.peek();
				if (s === void 0) break;
				if (s === ",") {
					p.next();
					continue;
				}
				if (s === "}") {
					p.next();
					break;
				}
				if (CT_STATES.includes(s)) {
					states.push(s);
					p.next();
					if (!braced && p.peek() !== ",") break;
					continue;
				}
				break;
			}
			if (!states.length) return {
				match,
				error: "Error: syntax error, expected ct states"
			};
			match.ctStates = states;
		} else if (tok === "iifname" || tok === "oifname") {
			const name = p.next();
			if (!name) return {
				match,
				error: `Error: syntax error, expected interface after "${tok}"`
			};
			if (tok === "iifname") match.iif = name;
			else match.oif = name;
		} else if (tok === "counter") {} else if (tok === "accept" || tok === "drop" || tok === "reject") {
			verdict = tok;
			break;
		} else if (tok === "masquerade") {
			nat = { type: "masquerade" };
			break;
		} else if (tok === "snat" || tok === "dnat") {
			if (p.next() !== "to") return {
				match,
				error: `Error: syntax error, expected "to" after "${tok}"`
			};
			const target = p.next() ?? "";
			if (tok === "snat") {
				const addr = parseIp(target);
				if (addr === null) return {
					match,
					error: "Error: syntax error, invalid snat address"
				};
				nat = {
					type: "snat",
					addr
				};
			} else {
				const [ipPart, portPart] = target.split(":");
				const addr = parseIp(ipPart);
				if (addr === null) return {
					match,
					error: "Error: syntax error, invalid dnat address"
				};
				const port = portPart !== void 0 ? Number(portPart) : void 0;
				if (port !== void 0 && (!Number.isInteger(port) || port < 1 || port > 65535)) return {
					match,
					error: "Error: syntax error, invalid dnat port"
				};
				nat = {
					type: "dnat",
					addr,
					port
				};
			}
			break;
		} else return {
			match,
			error: `Error: syntax error, unexpected "${tok}"`
		};
	}
	if (p.peek() !== void 0) return {
		match,
		error: `Error: trailing tokens after verdict: "${p.peek()}"`
	};
	return {
		match,
		verdict,
		nat
	};
}
function runNft(device, raw, out) {
	const fw = device.fw;
	const t = lex(raw);
	let handles = false;
	while (t[0] === "-a" || t[0] === "--handle") {
		handles = true;
		t.shift();
	}
	const cmd = t[0];
	if (cmd === "list") {
		if (t[1] === "ruleset") {
			out(listRuleset(fw, { handles }));
			return;
		}
		out(`netsim: "nft ${raw.trim()}" is not supported — use "nft list ruleset".\n`);
		return;
	}
	if (cmd === "flush" && t[1] === "ruleset") {
		fw.flush();
		return;
	}
	if (cmd === "delete" && t[1] === "rule") {
		const handle = Number(t[t.length - 1]);
		if (t[t.length - 2] !== "handle" || !Number.isInteger(handle)) {
			out("Error: syntax error — delete rule ip <table> <chain> handle <n>\n");
			return;
		}
		if (!fw.deleteHandle(handle)) out("Error: Could not process rule: No such file or directory\n");
		return;
	}
	if (cmd === "add" || cmd === "insert" || cmd === "create") {
		const obj = t[1];
		if (obj === "table") {
			if (t[2] !== "ip" || t[3] !== "filter" && t[3] !== "nat") {
				out(`netsim: only "ip filter" and "ip nat" tables are in the phase-2 subset.\n`);
				return;
			}
			fw.tables[t[3]] = true;
			return;
		}
		if (obj === "chain") {
			addChain(device, t.slice(2), out);
			return;
		}
		if (obj === "rule") {
			addRule(device, t.slice(2), cmd === "insert", out);
			return;
		}
	}
	out(`netsim: "nft ${raw.trim()}" is not supported.\n${SUBSET_HINT$1}`);
}
function addChain(device, t, out) {
	const fw = device.fw;
	if (t[0] !== "ip") {
		out("netsim: only the \"ip\" family is in the phase-2 subset.\n");
		return;
	}
	const table = t[1];
	const name = t[2];
	if (table !== "filter" && table !== "nat" || !name) {
		out("Error: syntax error — add chain ip <filter|nat> <name> { ... }\n");
		return;
	}
	if (!fw.tables[table]) {
		out("Error: Could not process rule: No such file or directory\n");
		return;
	}
	const p = new Parser(t.slice(3));
	if (!p.expect("{")) {
		out("netsim: regular (non-base) chains are not in the phase-2 subset — declare a hook block: { type ... hook ... priority 0 ; }\n");
		return;
	}
	let hook;
	let policy;
	let chainType;
	for (;;) {
		const tok = p.next();
		if (tok === void 0 || tok === "}") break;
		if (tok === ";") continue;
		if (tok === "type") chainType = p.next();
		else if (tok === "hook") hook = p.next();
		else if (tok === "priority") p.next();
		else if (tok === "policy") {
			const pol = p.next();
			if (pol === "accept" || pol === "drop") policy = pol;
			else {
				out(`Error: syntax error, unexpected policy "${pol ?? ""}"\n`);
				return;
			}
		} else {
			out(`Error: syntax error, unexpected "${tok}"\n`);
			return;
		}
	}
	if (table === "filter") {
		if (chainType !== "filter" || !FILTER_HOOKS.includes(hook)) {
			out("Error: syntax error — filter chains need: type filter hook input|forward|output priority 0 ;\n");
			return;
		}
		fw.declareFilter(hook, name, policy);
	} else {
		if (chainType !== "nat" || !NAT_HOOKS.includes(hook)) {
			out("Error: syntax error — nat chains need: type nat hook prerouting|postrouting priority <n> ;\n");
			return;
		}
		if (policy === "drop") {
			out("netsim: drop policies on nat chains are not in the phase-2 subset.\n");
			return;
		}
		fw.declareNat(hook, name);
	}
}
function addRule(device, t, atHead, out) {
	const fw = device.fw;
	if (t[0] !== "ip") {
		out("netsim: only the \"ip\" family is in the phase-2 subset.\n");
		return;
	}
	const table = t[1];
	const chainName = t[2];
	if (table !== "filter" && table !== "nat" || !chainName) {
		out("Error: syntax error — add rule ip <table> <chain> <expressions> <verdict>\n");
		return;
	}
	const slot = fw.tables[table] ? fw.chainByName(table, chainName) : null;
	if (!slot) {
		out("Error: Could not process rule: No such file or directory\n");
		return;
	}
	const parsed = parseExpressions(new Parser(t.slice(3)));
	if (parsed.error) {
		out(parsed.error + "\nSupported nft subset: list ruleset [-a] · flush ruleset · add table ip filter|nat ·\nadd chain ip <table> <name> { type filter|nat hook <hook> priority <n> ; [policy accept|drop ;] } ·\nadd|insert rule ip <table> <chain> [matches] accept|drop|reject|masquerade|snat to <ip>|dnat to <ip>[:port] ·\ndelete rule ip <table> <chain> handle <n>\nMatches: ip saddr/daddr <cidr>, tcp|udp sport/dport <port|a-b>, icmp type <echo-request|echo-reply>,\nct state <list>, iifname/oifname \"<if>\"\n");
		return;
	}
	if (slot.kind === "filter") {
		if (!parsed.verdict) {
			out(parsed.nat ? "Error: nat actions (masquerade/snat/dnat) belong in nat chains, not filter chains.\n" : "Error: rule needs a verdict: accept, drop or reject\n");
			return;
		}
		fw.addFilterRule(slot.hook, parsed.match, parsed.verdict, atHead);
		return;
	}
	if (!parsed.nat) {
		out("Error: nat chain rules need masquerade, snat to <ip>, or dnat to <ip>[:port]\n");
		return;
	}
	if (parsed.nat.type === "dnat" && slot.hook !== "prerouting") {
		out("Error: dnat is only valid in the prerouting hook\n");
		return;
	}
	if ((parsed.nat.type === "masquerade" || parsed.nat.type === "snat") && slot.hook !== "postrouting") {
		out(`Error: ${parsed.nat.type} is only valid in the postrouting hook\n`);
		return;
	}
	fw.addNatRule(slot.hook, parsed.match, parsed.nat, atHead);
}
// src/commands/iptables-util.ts
function matchesRuleEquality(a, b) {
	const norm = (m) => JSON.stringify({
		s: m.srcNet ?? null,
		d: m.dstNet ?? null,
		p: m.proto ?? null,
		sp: m.sport ?? null,
		dp: m.dport ?? null,
		it: m.icmpType ?? null,
		ct: m.ctStates ? [...m.ctStates].sort() : null,
		i: m.iif ?? null,
		o: m.oif ?? null
	});
	return norm(a) === norm(b);
}
// src/commands/iptables.ts
var SUBSET_HINT = "Supported iptables subset: -t filter|nat, -A/-I/-D <chain>, -F [chain], -P <chain> ACCEPT|DROP,\n-L [--line-numbers], -S, matches: -s/-d <cidr>, -i/-o <if>, -p tcp|udp|icmp, --sport/--dport <p[:p]>,\n--icmp-type <type>, -m conntrack --ctstate <LIST> (also -m state --state),\ntargets: ACCEPT DROP REJECT MASQUERADE SNAT --to-source <ip>, DNAT --to-destination <ip>[:port]\n";
var FILTER_CHAINS = {
	INPUT: "input",
	FORWARD: "forward",
	OUTPUT: "output"
};
var NAT_CHAINS = {
	PREROUTING: "prerouting",
	POSTROUTING: "postrouting"
};
function parseIptPort(tok) {
	const range = tok.match(/^(\d+):(\d+)$/);
	if (range) {
		const from = Number(range[1]);
		const to = Number(range[2]);
		if (from >= 1 && to <= 65535 && from <= to) return {
			from,
			to
		};
		return null;
	}
	const p = Number(tok);
	if (Number.isInteger(p) && p >= 1 && p <= 65535) return {
		from: p,
		to: p
	};
	return null;
}
function parseNet(tok) {
	const cidr = parseCidr(tok);
	if (cidr) return cidr;
	const ip = parseIp(tok);
	if (ip !== null) return {
		addr: ip,
		prefix: 32
	};
	return null;
}
var ICMP_TYPES = {
	"echo-request": "echo-request",
	"8": "echo-request",
	"echo-reply": "echo-reply",
	"0": "echo-reply"
};
function runIptables(device, args, out) {
	const fw = device.fw;
	let table = "filter";
	let op = null;
	let deleteNum = null;
	let flushChain;
	let policyOp = null;
	let list = false;
	let save = false;
	let lineNumbers = false;
	const match = {};
	let target = null;
	let natTo = null;
	for (let i = 0; i < args.length; i++) {
		const a = args[i];
		const next = () => args[++i];
		switch (a) {
			case "-t": {
				const tname = next();
				if (tname !== "filter" && tname !== "nat") {
					out(`iptables: table "${tname ?? ""}" is not in the phase-2 subset (filter, nat).\n`);
					return;
				}
				table = tname;
				break;
			}
			case "-A":
				op = {
					type: "append",
					chain: next() ?? ""
				};
				break;
			case "-I":
				op = {
					type: "insert",
					chain: next() ?? ""
				};
				if (/^\d+$/.test(args[i + 1] ?? "")) {
					if (args[++i] !== "1") {
						out("netsim: -I with a rule number other than 1 is not in the phase-2 subset.\n");
						return;
					}
				}
				break;
			case "-D":
				op = {
					type: "delete",
					chain: next() ?? ""
				};
				if (/^\d+$/.test(args[i + 1] ?? "")) deleteNum = Number(args[++i]);
				break;
			case "-F":
				flushChain = /^[A-Z]+$/.test(args[i + 1] ?? "") ? args[++i] : null;
				break;
			case "-P":
				policyOp = {
					chain: next() ?? "",
					target: next() ?? ""
				};
				break;
			case "-L":
				list = true;
				break;
			case "-S":
				save = true;
				break;
			case "--line-numbers":
				lineNumbers = true;
				break;
			case "-n":
			case "-v": break;
			case "-s": {
				const net = parseNet(next() ?? "");
				if (!net) {
					out("iptables: bad source address\n");
					return;
				}
				match.srcNet = net;
				break;
			}
			case "-d": {
				const net = parseNet(next() ?? "");
				if (!net) {
					out("iptables: bad destination address\n");
					return;
				}
				match.dstNet = net;
				break;
			}
			case "-i":
				match.iif = next();
				break;
			case "-o":
				match.oif = next();
				break;
			case "-p": {
				const proto = next();
				if (proto !== "tcp" && proto !== "udp" && proto !== "icmp") {
					out(`iptables: protocol "${proto ?? ""}" is not in the phase-2 subset (tcp, udp, icmp).\n`);
					return;
				}
				match.proto = proto;
				break;
			}
			case "--dport":
			case "--sport": {
				if (match.proto !== "tcp" && match.proto !== "udp") {
					out(`iptables: unknown option "${a}" — specify -p tcp or -p udp first, like real iptables.\n`);
					return;
				}
				const port = parseIptPort(next() ?? "");
				if (!port) {
					out("iptables: invalid port/service\n");
					return;
				}
				if (a === "--dport") match.dport = port;
				else match.sport = port;
				break;
			}
			case "--icmp-type": {
				if (match.proto !== "icmp") {
					out("iptables: unknown option \"--icmp-type\" — specify -p icmp first.\n");
					return;
				}
				const t = ICMP_TYPES[next() ?? ""];
				if (!t) {
					out("netsim: only echo-request (8) and echo-reply (0) icmp types are in the phase-2 subset.\n");
					return;
				}
				match.icmpType = t;
				break;
			}
			case "-m": {
				const mod = next();
				if (mod !== "conntrack" && mod !== "state") {
					out(`netsim: match extension "-m ${mod ?? ""}" is not in the phase-2 subset (conntrack, state).\n`);
					return;
				}
				break;
			}
			case "--ctstate":
			case "--state": {
				const states = [];
				for (const s of (next() ?? "").split(",")) {
					const lower = s.toLowerCase();
					if (![
						"new",
						"established",
						"related",
						"invalid"
					].includes(lower)) {
						out(`iptables: unknown state "${s}"\n`);
						return;
					}
					states.push(lower);
				}
				if (!states.length) {
					out("iptables: --ctstate needs at least one state\n");
					return;
				}
				match.ctStates = states;
				break;
			}
			case "-j":
				target = next() ?? null;
				break;
			case "--to-destination":
			case "--to-source":
				natTo = next() ?? null;
				break;
			case "--reject-with":
				next();
				break;
			default:
				out(`netsim: iptables option "${a}" is not supported.\n${SUBSET_HINT}`);
				return;
		}
	}
	fw.ensureIptablesTable(table);
	if (save) {
		out(iptablesSave(fw, table));
		return;
	}
	if (list) {
		out(iptablesListing(fw, table, { lineNumbers }));
		return;
	}
	if (policyOp) {
		const hook = FILTER_CHAINS[policyOp.chain];
		if (table !== "filter" || !hook) {
			out("iptables: policies are supported on filter INPUT/FORWARD/OUTPUT only.\n");
			return;
		}
		const pol = policyOp.target.toLowerCase();
		if (pol !== "accept" && pol !== "drop") {
			out("iptables: Bad policy name. Run `iptables -h' or iptables-restore -h' for more information.\n");
			return;
		}
		fw.filter[hook].policy = pol;
		return;
	}
	if (flushChain !== void 0) {
		if (table === "filter") {
			const hooks = flushChain ? [FILTER_CHAINS[flushChain]] : Object.values(FILTER_CHAINS);
			if (hooks.some((h) => !h)) {
				out("iptables: No chain/target/match by that name.\n");
				return;
			}
			for (const h of hooks) fw.filter[h].rules = [];
		} else {
			const hooks = flushChain ? [NAT_CHAINS[flushChain]] : Object.values(NAT_CHAINS);
			if (hooks.some((h) => !h)) {
				out("iptables: No chain/target/match by that name.\n");
				return;
			}
			for (const h of hooks) fw.nat[h].rules = [];
		}
		return;
	}
	if (!op) {
		out(`netsim: nothing to do — give one of -A/-I/-D/-F/-P/-L/-S.\n${SUBSET_HINT}`);
		return;
	}
	if (table === "filter") {
		const hook = FILTER_CHAINS[op.chain];
		if (!hook) {
			out("iptables: No chain/target/match by that name.\n");
			return;
		}
		if (op.type === "delete") {
			const rules = fw.filter[hook].rules;
			if (deleteNum !== null) {
				if (deleteNum < 1 || deleteNum > rules.length) {
					out("iptables: Index of deletion too big.\n");
					return;
				}
				rules.splice(deleteNum - 1, 1);
				return;
			}
			const verdict = (target ?? "").toLowerCase();
			const idx = rules.findIndex((r) => r.verdict === verdict && matchesRuleEquality(r.match, match));
			if (idx < 0) {
				out("iptables: Bad rule (does a matching rule exist in that chain?).\n");
				return;
			}
			rules.splice(idx, 1);
			return;
		}
		const verdict = (target ?? "").toLowerCase();
		if (verdict !== "accept" && verdict !== "drop" && verdict !== "reject") {
			out(`iptables: filter target must be ACCEPT, DROP or REJECT (got "${target ?? ""}").\n`);
			return;
		}
		fw.addFilterRule(hook, match, verdict, op.type === "insert");
		return;
	}
	const hook = NAT_CHAINS[op.chain];
	if (!hook) {
		out("iptables: No chain/target/match by that name.\n");
		return;
	}
	if (op.type === "delete") {
		const rules = fw.nat[hook].rules;
		if (deleteNum === null || deleteNum < 1 || deleteNum > rules.length) {
			out("netsim: delete nat rules by number: iptables -t nat -D <chain> <num>\n");
			return;
		}
		rules.splice(deleteNum - 1, 1);
		return;
	}
	let action;
	if (target === "MASQUERADE") {
		if (hook !== "postrouting") {
			out("iptables: MASQUERADE is only valid in POSTROUTING.\n");
			return;
		}
		action = { type: "masquerade" };
	} else if (target === "SNAT") {
		const addr = parseIp(natTo ?? "");
		if (hook !== "postrouting" || addr === null) {
			out("iptables: SNAT needs POSTROUTING and --to-source <ip>.\n");
			return;
		}
		action = {
			type: "snat",
			addr
		};
	} else if (target === "DNAT") {
		const [ipPart, portPart] = (natTo ?? "").split(":");
		const addr = parseIp(ipPart ?? "");
		const port = portPart !== void 0 ? Number(portPart) : void 0;
		if (hook !== "prerouting" || addr === null || port !== void 0 && !Number.isInteger(port)) {
			out("iptables: DNAT needs PREROUTING and --to-destination <ip>[:port].\n");
			return;
		}
		action = {
			type: "dnat",
			addr,
			port
		};
	} else {
		out(`iptables: nat target must be MASQUERADE, SNAT or DNAT (got "${target ?? ""}").\n`);
		return;
	}
	fw.addNatRule(hook, match, action, op.type === "insert");
}
// src/commands/nc.ts
var DEFAULT_TIMEOUT_S = 3;
function runNc(device, args, write, done) {
	let listen = false;
	let udp = false;
	let timeoutS = DEFAULT_TIMEOUT_S;
	const positional = [];
	for (let i = 0; i < args.length; i++) {
		const a = args[i];
		if (a === "-l") listen = true;
		else if (a === "-u") udp = true;
		else if (a === "-z" || a === "-v" || a === "-k") {} else if (a === "-w") {
			timeoutS = Number(args[++i]);
			if (!Number.isFinite(timeoutS) || timeoutS <= 0) {
				write("nc: invalid timeout\n");
				done();
				return null;
			}
		} else if (a === "-p") positional.push(args[++i] ?? "");
		else if (a.startsWith("-")) {
			write(`nc: netsim supports only: nc [-u] [-z] [-w secs] <ip> <port>  |  nc -l [-u] <port>  (got "${a}")\n`);
			done();
			return null;
		} else positional.push(a);
	}
	const proto = udp ? "udp" : "tcp";
	if (listen) {
		const port = Number(positional[0]);
		if (!Number.isInteger(port) || port < 1 || port > 65535) {
			write("usage: nc -l [-u] <port>\n");
			done();
			return null;
		}
		const registry = udp ? device.ncUdp : device.ncTcp;
		if (registry.has(port) || (udp ? device.services.udp : device.services.tcp).has(port)) {
			write(`nc: Address already in use\n`);
			done();
			return null;
		}
		registry.set(port, (msg) => write(msg + "\n"));
		write(`Listening on 0.0.0.0 ${port} (${proto})\n`);
		return { cancel: () => {
			registry.delete(port);
			done();
		} };
	}
	const host = positional[0];
	const port = Number(positional[1]);
	if (!host || !Number.isInteger(port) || port < 1 || port > 65535) {
		write("usage: nc [-u] [-z] [-w secs] <host> <port>\n");
		done();
		return null;
	}
	let cancelled = false;
	const report = (r) => {
		if (cancelled) return;
		switch (r) {
			case "open":
				write(`Connection to ${host} ${port} port [${proto}/*] succeeded!\n`);
				break;
			case "refused":
				write(`nc: connect to ${host} port ${port} (${proto}) failed: Connection refused\n`);
				break;
			case "timeout":
				write(`nc: connect to ${host} port ${port} (${proto}) failed: Operation timed out\n`);
				break;
			case "unreachable": write(`nc: connect to ${host} port ${port} (${proto}) failed: No route to host\n`);
		}
		done();
	};
	const resolver = resolveHost(device, host, (res) => {
		if (cancelled) return;
		if ("error" in res) {
			write(`nc: getaddrinfo for host "${host}" port ${port}: Name or service not known\n`);
			done();
			return;
		}
		const err = udp ? device.probeUdp(res.ip, port, timeoutS * 1e3, report) : device.connectTcp(res.ip, port, timeoutS * 1e3, report);
		if (err) {
			write(`nc: connect to ${host} port ${port} (${proto}) failed: ${err}\n`);
			done();
		}
	});
	return { cancel: () => {
		cancelled = true;
		resolver.cancel();
		done();
	} };
}
// src/commands/dig.ts
function runDig(device, args, write, done) {
	let server = null;
	let short = false;
	let name = null;
	for (const a of args) if (a.startsWith("@")) {
		server = parseIp(a.slice(1));
		if (server === null) {
			write(`dig: couldn't get address for '${a.slice(1)}': not found\n`);
			done();
			return null;
		}
	} else if (a === "+short") short = true;
	else if (a.startsWith("+") || a.startsWith("-")) {
		write(`dig: netsim supports only: dig [@server] <name> [+short]  (got "${a}")\n`);
		done();
		return null;
	} else name = a;
	if (!name) {
		write("usage: dig [@server] <name> [+short]\n");
		done();
		return null;
	}
	const ns = server ?? device.nameserver;
	if (ns === null) {
		write(";; error: no nameserver configured — use dig @<server> <name> or set DNS in the inspector\n");
		done();
		return null;
	}
	const sched = device.network.scheduler;
	const started = sched.now;
	let cancelled = false;
	device.resolveDns(name, ns, (r) => {
		if (cancelled) return;
		const elapsed = Math.round(sched.now - started);
		if (typeof r === "number") {
			if (short) write(ipToString(r) + "\n");
			else {
				write(`; <<>> NetSim dig <<>> ${name}\n`);
				write(`;; ->>HEADER<<- opcode: QUERY, status: NOERROR\n\n`);
				write(`;; QUESTION SECTION:\n;${name}.\t\t\tIN\tA\n\n`);
				write(`;; ANSWER SECTION:\n${name}.\t\t0\tIN\tA\t${ipToString(r)}\n\n`);
				write(`;; Query time: ${elapsed} msec\n;; SERVER: ${ipToString(ns)}#53\n`);
			}
		} else if (r === null) {
			if (short) {} else {
				write(`; <<>> NetSim dig <<>> ${name}\n`);
				write(`;; ->>HEADER<<- opcode: QUERY, status: NXDOMAIN\n\n`);
				write(`;; QUESTION SECTION:\n;${name}.\t\t\tIN\tA\n\n`);
				write(`;; Query time: ${elapsed} msec\n;; SERVER: ${ipToString(ns)}#53\n`);
			}
		} else if (r === "refused") write(`;; communications error to ${ipToString(ns)}#53: connection refused\n`);
		else write(";; connection timed out; no servers could be reached\n");
		done();
	});
	return { cancel: () => {
		cancelled = true;
		done();
	} };
}
// src/commands/curl.ts
var TIMEOUT_MS = 4e3;
function parseUrl(raw) {
	let rest = raw;
	if (rest.startsWith("https://")) return { error: "netsim: https is not simulated — use http://" };
	if (rest.startsWith("http://")) rest = rest.slice(7);
	if (!rest) return { error: "curl: no URL specified!" };
	const slash = rest.indexOf("/");
	const hostPort = slash < 0 ? rest : rest.slice(0, slash);
	const path = slash < 0 ? "/" : rest.slice(slash);
	const colon = hostPort.indexOf(":");
	const host = colon < 0 ? hostPort : hostPort.slice(0, colon);
	const port = colon < 0 ? 80 : Number(hostPort.slice(colon + 1));
	if (!host || !Number.isInteger(port) || port < 1 || port > 65535) return { error: `curl: (3) URL rejected: ${raw}` };
	return {
		host,
		port,
		path
	};
}
function runCurl(device, args, write, done) {
	let verbose = false;
	let url = null;
	for (const a of args) if (a === "-v" || a === "--verbose") verbose = true;
	else if (a.startsWith("-")) {
		write(`curl: netsim supports only: curl [-v] <url>  (got "${a}")\n`);
		done();
		return null;
	} else url = a;
	if (!url) {
		write("curl: no URL specified!\n");
		done();
		return null;
	}
	const parsed = parseUrl(url);
	if ("error" in parsed) {
		write(parsed.error + "\n");
		done();
		return null;
	}
	const { host, port, path } = parsed;
	let finished = false;
	const finish = () => {
		if (finished) return;
		finished = true;
		done();
	};
	const resolver = resolveHost(device, host, (res) => {
		if (finished) return;
		if ("error" in res) {
			write(`curl: (6) Could not resolve host: ${host}\n`);
			finish();
			return;
		}
		const ip = res.ip;
		if (verbose) write(`*   Trying ${ipToString(ip)}:${port}...\n`);
		const err = device.httpGet(ip, port, path, host, TIMEOUT_MS, (r) => {
			if (finished) return;
			if (r.ok) {
				if (verbose) {
					write(`> GET ${path} HTTP/1.1\n> Host: ${host}\n>\n`);
					write(`< HTTP/1.1 ${r.status} ${r.reason}\n< Content-Length: ${r.body.length}\n<\n`);
				}
				write(r.body.endsWith("\n") ? r.body : r.body + "\n");
			} else if (r.error === "refused") write(`curl: (7) Failed to connect to ${host} port ${port}: Connection refused\n`);
			else if (r.error === "timeout") write(`curl: (28) Failed to connect to ${host} port ${port}: Timeout was reached\n`);
			else if (r.error === "unreachable") write(`curl: (7) Failed to connect to ${host} port ${port}: No route to host\n`);
			else if (r.error === "empty") write("curl: (52) Empty reply from server\n");
			else write(`curl: (7) Failed to connect to ${host} port ${port}: ${r.error}\n`);
			finish();
		}, verbose ? () => write(`* Connected to ${host} (${ipToString(ip)}) port ${port}\n`) : void 0);
		if (err) {
			write(`curl: (7) Failed to connect to ${host} port ${port}: ${err}\n`);
			finish();
		}
	});
	return { cancel: () => {
		resolver.cancel();
		finish();
	} };
}
// src/commands/dhclient.ts
var DISCOVER_TRIES = 3;
var STEP_TIMEOUT_MS = 2e3;
function runDhclient(device, args, write, done) {
	const ifname = args.find((a) => !a.startsWith("-")) ?? "eth0";
	const iface = device.getInterface(ifname);
	if (!iface) {
		write(`Cannot find device "${ifname}"\n`);
		done();
		return null;
	}
	const sched = device.network.scheduler;
	const xid = device.nextDhcpXid();
	let state = "discover";
	let tries = 0;
	let timer = null;
	const cleanup = () => {
		device.dhcpListeners.delete(onDhcp);
		if (timer) sched.cancel(timer);
		timer = null;
	};
	const fail = (msg) => {
		if (state === "done") return;
		state = "done";
		cleanup();
		write(msg);
		done();
	};
	const sendDiscover = () => {
		if (state !== "discover") return;
		if (tries >= DISCOVER_TRIES) {
			fail("No DHCPOFFERS received.\nNo working leases in persistent database - sleeping.\n");
			return;
		}
		tries++;
		write(`DHCPDISCOVER on ${ifname} to 255.255.255.255 port 67 interval ${STEP_TIMEOUT_MS / 1e3}\n`);
		device.sendDhcpClient(iface, {
			kind: "dhcp",
			op: "discover",
			xid,
			clientMac: iface.mac
		});
		timer = sched.schedule(STEP_TIMEOUT_MS, sendDiscover);
	};
	const onDhcp = (app) => {
		if (state === "done" || app.clientMac !== iface.mac || app.xid !== xid) return;
		if (state === "discover" && app.op === "offer" && app.yourIp !== void 0) {
			state = "request";
			if (timer) sched.cancel(timer);
			write(`DHCPOFFER of ${ipToString(app.yourIp)} from ${ipToString(app.serverIp ?? 0)}\n`);
			write(`DHCPREQUEST for ${ipToString(app.yourIp)} on ${ifname} to 255.255.255.255 port 67\n`);
			device.sendDhcpClient(iface, {
				kind: "dhcp",
				op: "request",
				xid,
				clientMac: iface.mac,
				yourIp: app.yourIp
			});
			timer = sched.schedule(STEP_TIMEOUT_MS, () => fail("No DHCPACK received - giving up.\n"));
			return;
		}
		if (state === "request" && app.op === "ack" && app.yourIp !== void 0) {
			state = "done";
			cleanup();
			write(`DHCPACK of ${ipToString(app.yourIp)} from ${ipToString(app.serverIp ?? 0)}\n`);
			iface.ip = {
				addr: app.yourIp,
				prefix: app.prefix ?? 24
			};
			if (app.router !== null && app.router !== void 0) {
				device.staticRoutes = device.staticRoutes.filter((r) => !(r.dest === 0 && r.prefix === 0));
				device.addRoute(0, 0, app.router);
			}
			if (app.dns !== null && app.dns !== void 0) device.nameserver = app.dns;
			write(`bound to ${ipToString(app.yourIp)} -- renewal in 43200 seconds.\n`);
			done();
		}
	};
	device.dhcpListeners.add(onDhcp);
	sendDiscover();
	return { cancel: () => {
		if (state === "done") return;
		state = "done";
		cleanup();
		done();
	} };
}
// src/commands/shell.ts
var HELP = `NetSim commands (real Linux syntax, curated subset):
  ip address [show | add <cidr> dev <if> | del <cidr> dev <if>]
  ip link    [show | set <if> up|down]
  ip route   [show | add <cidr>|default via <gw> [dev <if>] | del <cidr>|default]
  ip neigh / arp           neighbour (ARP) cache
  ping [-c N] <host>       ICMP echo (Ctrl-C to stop)
  traceroute [-m max] <host>  trace the route packets take
  dhclient [<if>]          acquire an address over DHCP
  dig [@server] <name> [+short]   DNS lookup
  curl [-v] http://<host>[:port][/path]   fetch a web page
  nft <...>                nftables firewall (try: nft list ruleset)
  iptables <...>           iptables front-end onto the same ruleset
  nc [-u] [-z] [-w s] <host> <port> test a port; nc -l [-u] <port> to listen
  conntrack -L             connection tracking table
  ss -tlnu                 listening sockets
  sysctl [-w] net.ipv4.ip_forward[=0|1]
  hostname | help | clear
Anything else errors loudly — NetSim never fakes syntax it doesn't implement.
`;
function runSysctl(device, args, write) {
	const KEY = "net.ipv4.ip_forward";
	let rest = args;
	let writeMode = false;
	if (rest[0] === "-w") {
		writeMode = true;
		rest = rest.slice(1);
	}
	const arg = rest[0] ?? "";
	if (writeMode || arg.includes("=")) {
		const [key, value] = arg.split("=");
		if (key !== KEY || value !== "0" && value !== "1") {
			write(`sysctl: netsim supports only: sysctl -w ${KEY}=0|1\n`);
			return;
		}
		device.forwarding = value === "1";
		write(`${KEY} = ${value}\n`);
		return;
	}
	if (arg === KEY || arg === "") {
		write(`${KEY} = ${device.forwarding ? 1 : 0}\n`);
		return;
	}
	write(`sysctl: cannot stat /proc/sys/${arg.replace(/\./g, "/")}: No such file or directory\n`);
}
function formatConntrack(device) {
	const entries = device.ct.list(device.network.now);
	let s = "";
	for (const e of entries) {
		const o = e.orig;
		const state = e.state === "established" ? "ESTABLISHED" : "NEW";
		const natNote = e.trans.srcIp !== o.srcIp || e.trans.dstIp !== o.dstIp || e.trans.srcPort !== o.srcPort || e.trans.dstPort !== o.dstPort ? ` [nat: ${ipToString(e.trans.srcIp)}:${e.trans.srcPort} > ${ipToString(e.trans.dstIp)}:${e.trans.dstPort}]` : "";
		s += `${o.proto.padEnd(8)}src=${ipToString(o.srcIp)} dst=${ipToString(o.dstIp)} sport=${o.srcPort} dport=${o.dstPort} state=${state}${natNote}\n`;
	}
	s += `conntrack: ${entries.length} flow entries have been shown.\n`;
	return s;
}
function formatSockets(device) {
	const s = "Netid  State   Local Address:Port   Process\n";
	const tcp = /* @__PURE__ */ new Map();
	const udp = /* @__PURE__ */ new Map();
	for (const p of device.services.tcp) tcp.set(p, "");
	for (const p of device.ncTcp.keys()) tcp.set(p, "nc");
	if (device.httpServer?.enabled) tcp.set(device.httpServer.port, "httpd");
	for (const p of device.services.udp) udp.set(p, "");
	for (const p of device.ncUdp.keys()) udp.set(p, "nc");
	if (device.dnsServer?.enabled) udp.set(53, "dnsmasq");
	if (device.dhcpServer?.enabled) udp.set(67, "dnsmasq");
	const rows = [];
	for (const [p, proc] of [...tcp.entries()].sort((a, b) => a[0] - b[0])) rows.push(`tcp    LISTEN  0.0.0.0:${String(p).padEnd(14)}${proc}\n`);
	for (const [p, proc] of [...udp.entries()].sort((a, b) => a[0] - b[0])) rows.push(`udp    UNCONN  0.0.0.0:${String(p).padEnd(14)}${proc}\n`);
	return s + rows.join("");
}
var Shell = class {
	device;
	constructor(device) {
		this.device = device;
	}
	exec(line, io, done) {
		const trimmed = line.trim();
		const argv = trimmed.split(/\s+/).filter(Boolean);
		if (argv.length === 0) {
			done();
			return null;
		}
		const [cmd, ...args] = argv;
		const rawRest = trimmed.slice(cmd.length).trim();
		switch (cmd) {
			case "help":
				io.write(HELP);
				break;
			case "hostname":
				io.write(this.device.name + "\n");
				break;
			case "ip":
				runIp(this.device, args, io.write.bind(io));
				break;
			case "arp":
				io.write(formatArpClassic(this.device));
				break;
			case "sysctl":
				runSysctl(this.device, args, io.write.bind(io));
				break;
			case "nft":
				runNft(this.device, rawRest, io.write.bind(io));
				break;
			case "iptables":
				runIptables(this.device, args, io.write.bind(io));
				break;
			case "conntrack":
				if (args[0] === "-L" || args.length === 0) io.write(formatConntrack(this.device));
				else io.write("conntrack: netsim supports only: conntrack -L\n");
				break;
			case "ss":
				io.write(formatSockets(this.device));
				break;
			case "ping": return runPing(this.device, args, io.write.bind(io), done);
			case "traceroute": return runTraceroute(this.device, args, io.write.bind(io), done);
			case "nc": return runNc(this.device, args, io.write.bind(io), done);
			case "dig": return runDig(this.device, args, io.write.bind(io), done);
			case "curl": return runCurl(this.device, args, io.write.bind(io), done);
			case "dhclient": return runDhclient(this.device, args, io.write.bind(io), done);
			default: io.write(`${cmd}: command not found (try 'help')\n`);
		}
		done();
		return null;
	}
};
// src/terminals.ts
var sessions = /* @__PURE__ */ new Map();
function getSession(device, opts = {}) {
	const existing = sessions.get(device.id);
	if (existing) return existing;
	const term = new import_xterm.Terminal({
		cursorBlink: true,
		fontSize: 13,
		fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
		scrollback: 2e3,
		theme: {
			background: "#0b1220",
			foreground: "#d6e2f0",
			cursor: "#7dd3fc",
			selectionBackground: "#274867"
		}
	});
	const fit = new import_addon_fit.FitAddon();
	term.loadAddon(fit);
	const shell = new Shell(device);
	const promptStr = () => `\x1b[1;32m${device.name}\x1b[0m:\x1b[1;34m~\x1b[0m$ `;
	const writeOut = (s) => term.write(s.replace(/\n/g, "\r\n"));
	let buf = "";
	let running = null;
	const history = [];
	let hIdx = 0;
	const redrawLine = (next) => {
		term.write(`\x1b[2K\r${promptStr()}${next}`);
		buf = next;
	};
	const submit = () => {
		const line = buf;
		buf = "";
		term.write("\r\n");
		const trimmed = line.trim();
		if (!trimmed) {
			term.write(promptStr());
			return;
		}
		history.push(line);
		hIdx = history.length;
		if (trimmed === "clear") {
			term.write("\x1B[2J\x1B[H");
			term.write(promptStr());
			return;
		}
		running = shell.exec(line, { write: writeOut }, () => {
			running = null;
			opts.onAfterCommand?.();
			term.write(promptStr());
		});
	};
	term.onData((data) => {
		if (running) {
			if (data === "") {
				term.write("^C\r\n");
				running.cancel();
			}
			return;
		}
		if (data === "\x1B[A") {
			if (history.length && hIdx > 0) redrawLine(history[--hIdx]);
			return;
		}
		if (data === "\x1B[B") {
			if (hIdx < history.length - 1) redrawLine(history[++hIdx]);
			else {
				hIdx = history.length;
				redrawLine("");
			}
			return;
		}
		for (const ch of data) if (ch === "\r") submit();
		else if (ch === "") {
			if (buf.length) {
				buf = buf.slice(0, -1);
				term.write("\b \b");
			}
		} else if (ch === "") {
			term.write("^C\r\n");
			buf = "";
			term.write(promptStr());
		} else if (ch >= " " && ch <= "~") {
			buf += ch;
			term.write(ch);
		}
	});
	term.writeln(`\x1b[90mNetSim — ${device.name} (${device.kind}). Type 'help' for commands.\x1b[0m`);
	term.write(promptStr());
	const session = {
		term,
		fit,
		opened: false
	};
	sessions.set(device.id, session);
	return session;
}
function disposeSession(deviceId) {
	const s = sessions.get(deviceId);
	if (!s) return;
	s.term.dispose();
	sessions.delete(deviceId);
}
function disposeAllSessions() {
	for (const id of [...sessions.keys()]) disposeSession(id);
}
// src/sim.ts
var sim = { net: new Network() };
// node_modules/fflate/esm/browser.js
var u8 = Uint8Array;
var u16 = Uint16Array;
var i32 = Int32Array;
var fleb = new u8([
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	1,
	1,
	1,
	1,
	2,
	2,
	2,
	2,
	3,
	3,
	3,
	3,
	4,
	4,
	4,
	4,
	5,
	5,
	5,
	5,
	0,
	0,
	0,
	0
]);
var fdeb = new u8([
	0,
	0,
	0,
	0,
	1,
	1,
	2,
	2,
	3,
	3,
	4,
	4,
	5,
	5,
	6,
	6,
	7,
	7,
	8,
	8,
	9,
	9,
	10,
	10,
	11,
	11,
	12,
	12,
	13,
	13,
	0,
	0
]);
var clim = new u8([
	16,
	17,
	18,
	0,
	8,
	7,
	9,
	6,
	10,
	5,
	11,
	4,
	12,
	3,
	13,
	2,
	14,
	1,
	15
]);
var freb = function(eb, start) {
	var b = new u16(31);
	for (var i = 0; i < 31; ++i) b[i] = start += 1 << eb[i - 1];
	var r = new i32(b[30]);
	for (var i = 1; i < 30; ++i) for (var j = b[i]; j < b[i + 1]; ++j) r[j] = j - b[i] << 5 | i;
	return {
		b,
		r
	};
};
var _a = freb(fleb, 2);
var fl = _a.b;
var revfl = _a.r;
fl[28] = 258, revfl[258] = 28;
var _b = freb(fdeb, 0);
_b.b;
var revfd = _b.r;
var rev = new u16(32768);
for (var i = 0; i < 32768; ++i) {
	var x = (i & 43690) >> 1 | (i & 21845) << 1;
	x = (x & 52428) >> 2 | (x & 13107) << 2;
	x = (x & 61680) >> 4 | (x & 3855) << 4;
	rev[i] = ((x & 65280) >> 8 | (x & 255) << 8) >> 1;
}
var hMap = (function(cd, mb, r) {
	var s = cd.length;
	var i = 0;
	var l = new u16(mb);
	for (; i < s; ++i) if (cd[i]) ++l[cd[i] - 1];
	var le = new u16(mb);
	for (i = 1; i < mb; ++i) le[i] = le[i - 1] + l[i - 1] << 1;
	var co;
	if (r) {
		co = new u16(1 << mb);
		var rvb = 15 - mb;
		for (i = 0; i < s; ++i) if (cd[i]) {
			var sv = i << 4 | cd[i];
			var r_1 = mb - cd[i];
			var v = le[cd[i] - 1]++ << r_1;
			for (var m = v | (1 << r_1) - 1; v <= m; ++v) co[rev[v] >> rvb] = sv;
		}
	} else {
		co = new u16(s);
		for (i = 0; i < s; ++i) if (cd[i]) co[i] = rev[le[cd[i] - 1]++] >> 15 - cd[i];
	}
	return co;
});
var flt = new u8(288);
for (var i = 0; i < 144; ++i) flt[i] = 8;
for (var i = 144; i < 256; ++i) flt[i] = 9;
for (var i = 256; i < 280; ++i) flt[i] = 7;
for (var i = 280; i < 288; ++i) flt[i] = 8;
var fdt = new u8(32);
for (var i = 0; i < 32; ++i) fdt[i] = 5;
var flm = /*#__PURE__*/ hMap(flt, 9, 0);
var fdm = /*#__PURE__*/ hMap(fdt, 5, 0);
var shft = function(p) {
	return (p + 7) / 8 | 0;
};
var slc = function(v, s, e) {
	if (s == null || s < 0) s = 0;
	if (e == null || e > v.length) e = v.length;
	return new u8(v.subarray(s, e));
};
var ec = [
	"unexpected EOF",
	"invalid block type",
	"invalid length/literal",
	"invalid distance",
	"stream finished",
	"no stream handler",
	,
	"no callback",
	"invalid UTF-8 data",
	"extra field too long",
	"date not in range 1980-2099",
	"filename too long",
	"stream finishing",
	"invalid zip data"
];
var err = function(ind, msg, nt) {
	var e = new Error(msg || ec[ind]);
	e.code = ind;
	if (Error.captureStackTrace) Error.captureStackTrace(e, err);
	if (!nt) throw e;
	return e;
};
var wbits = function(d, p, v) {
	v <<= p & 7;
	var o = p / 8 | 0;
	d[o] |= v;
	d[o + 1] |= v >> 8;
};
var wbits16 = function(d, p, v) {
	v <<= p & 7;
	var o = p / 8 | 0;
	d[o] |= v;
	d[o + 1] |= v >> 8;
	d[o + 2] |= v >> 16;
};
var hTree = function(d, mb) {
	var t = [];
	for (var i = 0; i < d.length; ++i) if (d[i]) t.push({
		s: i,
		f: d[i]
	});
	var s = t.length;
	var t2 = t.slice();
	if (!s) return {
		t: et,
		l: 0
	};
	if (s == 1) {
		var v = new u8(t[0].s + 1);
		v[t[0].s] = 1;
		return {
			t: v,
			l: 1
		};
	}
	t.sort(function(a, b) {
		return a.f - b.f;
	});
	t.push({
		s: -1,
		f: 25001
	});
	var l = t[0], r = t[1], i0 = 0, i1 = 1, i2 = 2;
	t[0] = {
		s: -1,
		f: l.f + r.f,
		l,
		r
	};
	while (i1 != s - 1) {
		l = t[t[i0].f < t[i2].f ? i0++ : i2++];
		r = t[i0 != i1 && t[i0].f < t[i2].f ? i0++ : i2++];
		t[i1++] = {
			s: -1,
			f: l.f + r.f,
			l,
			r
		};
	}
	var maxSym = t2[0].s;
	for (var i = 1; i < s; ++i) if (t2[i].s > maxSym) maxSym = t2[i].s;
	var tr = new u16(maxSym + 1);
	var mbt = ln(t[i1 - 1], tr, 0);
	if (mbt > mb) {
		var i = 0, dt = 0;
		var lft = mbt - mb, cst = 1 << lft;
		t2.sort(function(a, b) {
			return tr[b.s] - tr[a.s] || a.f - b.f;
		});
		for (; i < s; ++i) {
			var i2_1 = t2[i].s;
			if (tr[i2_1] > mb) {
				dt += cst - (1 << mbt - tr[i2_1]);
				tr[i2_1] = mb;
			} else break;
		}
		dt >>= lft;
		while (dt > 0) {
			var i2_2 = t2[i].s;
			if (tr[i2_2] < mb) dt -= 1 << mb - tr[i2_2]++ - 1;
			else ++i;
		}
		for (; i >= 0 && dt; --i) {
			var i2_3 = t2[i].s;
			if (tr[i2_3] == mb) {
				--tr[i2_3];
				++dt;
			}
		}
		mbt = mb;
	}
	return {
		t: new u8(tr),
		l: mbt
	};
};
var ln = function(n, l, d) {
	return n.s == -1 ? Math.max(ln(n.l, l, d + 1), ln(n.r, l, d + 1)) : l[n.s] = d;
};
var lc = function(c) {
	var s = c.length;
	while (s && !c[--s]);
	var cl = new u16(++s);
	var cli = 0, cln = c[0], cls = 1;
	var w = function(v) {
		cl[cli++] = v;
	};
	for (var i = 1; i <= s; ++i) if (c[i] == cln && i != s) ++cls;
	else {
		if (!cln && cls > 2) {
			for (; cls > 138; cls -= 138) w(32754);
			if (cls > 2) {
				w(cls > 10 ? cls - 11 << 5 | 28690 : cls - 3 << 5 | 12305);
				cls = 0;
			}
		} else if (cls > 3) {
			w(cln), --cls;
			for (; cls > 6; cls -= 6) w(8304);
			if (cls > 2) w(cls - 3 << 5 | 8208), cls = 0;
		}
		while (cls--) w(cln);
		cls = 1;
		cln = c[i];
	}
	return {
		c: cl.subarray(0, cli),
		n: s
	};
};
var clen = function(cf, cl) {
	var l = 0;
	for (var i = 0; i < cl.length; ++i) l += cf[i] * cl[i];
	return l;
};
var wfblk = function(out, pos, dat) {
	var s = dat.length;
	var o = shft(pos + 2);
	out[o] = s & 255;
	out[o + 1] = s >> 8;
	out[o + 2] = out[o] ^ 255;
	out[o + 3] = out[o + 1] ^ 255;
	for (var i = 0; i < s; ++i) out[o + i + 4] = dat[i];
	return (o + 4 + s) * 8;
};
var wblk = function(dat, out, final, syms, lf, df, eb, li, bs, bl, p) {
	wbits(out, p++, final);
	++lf[256];
	var _a = hTree(lf, 15), dlt = _a.t, mlb = _a.l;
	var _b = hTree(df, 15), ddt = _b.t, mdb = _b.l;
	var _c = lc(dlt), lclt = _c.c, nlc = _c.n;
	var _d = lc(ddt), lcdt = _d.c, ndc = _d.n;
	var lcfreq = new u16(19);
	for (var i = 0; i < lclt.length; ++i) ++lcfreq[lclt[i] & 31];
	for (var i = 0; i < lcdt.length; ++i) ++lcfreq[lcdt[i] & 31];
	var _e = hTree(lcfreq, 7), lct = _e.t, mlcb = _e.l;
	var nlcc = 19;
	for (; nlcc > 4 && !lct[clim[nlcc - 1]]; --nlcc);
	var flen = bl + 5 << 3;
	var ftlen = clen(lf, flt) + clen(df, fdt) + eb;
	var dtlen = clen(lf, dlt) + clen(df, ddt) + eb + 14 + 3 * nlcc + clen(lcfreq, lct) + 2 * lcfreq[16] + 3 * lcfreq[17] + 7 * lcfreq[18];
	if (bs >= 0 && flen <= ftlen && flen <= dtlen) return wfblk(out, p, dat.subarray(bs, bs + bl));
	var lm, ll, dm, dl;
	wbits(out, p, 1 + (dtlen < ftlen)), p += 2;
	if (dtlen < ftlen) {
		lm = hMap(dlt, mlb, 0), ll = dlt, dm = hMap(ddt, mdb, 0), dl = ddt;
		var llm = hMap(lct, mlcb, 0);
		wbits(out, p, nlc - 257);
		wbits(out, p + 5, ndc - 1);
		wbits(out, p + 10, nlcc - 4);
		p += 14;
		for (var i = 0; i < nlcc; ++i) wbits(out, p + 3 * i, lct[clim[i]]);
		p += 3 * nlcc;
		var lcts = [lclt, lcdt];
		for (var it = 0; it < 2; ++it) {
			var clct = lcts[it];
			for (var i = 0; i < clct.length; ++i) {
				var len = clct[i] & 31;
				wbits(out, p, llm[len]), p += lct[len];
				if (len > 15) wbits(out, p, clct[i] >> 5 & 127), p += clct[i] >> 12;
			}
		}
	} else lm = flm, ll = flt, dm = fdm, dl = fdt;
	for (var i = 0; i < li; ++i) {
		var sym = syms[i];
		if (sym > 255) {
			var len = sym >> 18 & 31;
			wbits16(out, p, lm[len + 257]), p += ll[len + 257];
			if (len > 7) wbits(out, p, sym >> 23 & 31), p += fleb[len];
			var dst = sym & 31;
			wbits16(out, p, dm[dst]), p += dl[dst];
			if (dst > 3) wbits16(out, p, sym >> 5 & 8191), p += fdeb[dst];
		} else wbits16(out, p, lm[sym]), p += ll[sym];
	}
	wbits16(out, p, lm[256]);
	return p + ll[256];
};
var deo = /*#__PURE__*/ new i32([
	65540,
	131080,
	131088,
	131104,
	262176,
	1048704,
	1048832,
	2114560,
	2117632
]);
var et = /*#__PURE__*/ new u8(0);
var dflt = function(dat, lvl, plvl, pre, post, st) {
	var s = st.z || dat.length;
	var o = new u8(pre + s + 5 * (1 + Math.ceil(s / 7e3)) + post);
	var w = o.subarray(pre, o.length - post);
	var lst = st.l;
	var pos = (st.r || 0) & 7;
	if (lvl) {
		if (pos) w[0] = st.r >> 3;
		var opt = deo[lvl - 1];
		var n = opt >> 13, c = opt & 8191;
		var msk_1 = (1 << plvl) - 1;
		var prev = st.p || new u16(32768), head = st.h || new u16(msk_1 + 1);
		var bs1_1 = Math.ceil(plvl / 3), bs2_1 = 2 * bs1_1;
		var hsh = function(i) {
			return (dat[i] ^ dat[i + 1] << bs1_1 ^ dat[i + 2] << bs2_1) & msk_1;
		};
		var syms = new i32(25e3);
		var lf = new u16(288), df = new u16(32);
		var lc_1 = 0, eb = 0, i = st.i || 0, li = 0, wi = st.w || 0, bs = 0;
		for (; i + 2 < s; ++i) {
			var hv = hsh(i);
			var imod = i & 32767, pimod = head[hv];
			prev[imod] = pimod;
			head[hv] = imod;
			if (wi <= i) {
				var rem = s - i;
				if ((lc_1 > 7e3 || li > 24576) && (rem > 423 || !lst)) {
					pos = wblk(dat, w, 0, syms, lf, df, eb, li, bs, i - bs, pos);
					li = lc_1 = eb = 0, bs = i;
					for (var j = 0; j < 286; ++j) lf[j] = 0;
					for (var j = 0; j < 30; ++j) df[j] = 0;
				}
				var l = 2, d = 0, ch_1 = c, dif = imod - pimod & 32767;
				if (rem > 2 && hv == hsh(i - dif)) {
					var maxn = Math.min(n, rem) - 1;
					var maxd = Math.min(32767, i);
					var ml = Math.min(258, rem);
					while (dif <= maxd && --ch_1 && imod != pimod) {
						if (dat[i + l] == dat[i + l - dif]) {
							var nl = 0;
							for (; nl < ml && dat[i + nl] == dat[i + nl - dif]; ++nl);
							if (nl > l) {
								l = nl, d = dif;
								if (nl > maxn) break;
								var mmd = Math.min(dif, nl - 2);
								var md = 0;
								for (var j = 0; j < mmd; ++j) {
									var ti = i - dif + j & 32767;
									var cd = ti - prev[ti] & 32767;
									if (cd > md) md = cd, pimod = ti;
								}
							}
						}
						imod = pimod, pimod = prev[imod];
						dif += imod - pimod & 32767;
					}
				}
				if (d) {
					syms[li++] = 268435456 | revfl[l] << 18 | revfd[d];
					var lin = revfl[l] & 31, din = revfd[d] & 31;
					eb += fleb[lin] + fdeb[din];
					++lf[257 + lin];
					++df[din];
					wi = i + l;
					++lc_1;
				} else {
					syms[li++] = dat[i];
					++lf[dat[i]];
				}
			}
		}
		for (i = Math.max(i, wi); i < s; ++i) {
			syms[li++] = dat[i];
			++lf[dat[i]];
		}
		pos = wblk(dat, w, lst, syms, lf, df, eb, li, bs, i - bs, pos);
		if (!lst) {
			st.r = pos & 7 | w[pos / 8 | 0] << 3;
			pos -= 7;
			st.h = head, st.p = prev, st.i = i, st.w = wi;
		}
	} else {
		for (var i = st.w || 0; i < s + lst; i += 65535) {
			var e = i + 65535;
			if (e >= s) {
				w[pos / 8 | 0] = lst;
				e = s;
			}
			pos = wfblk(w, pos + 1, dat.subarray(i, e));
		}
		st.i = s;
	}
	return slc(o, 0, pre + shft(pos) + post);
};
var crct = /*#__PURE__*/ (function() {
	var t = /* @__PURE__ */ new Int32Array(256);
	for (var i = 0; i < 256; ++i) {
		var c = i, k = 9;
		while (--k) c = (c & 1 && -306674912) ^ c >>> 1;
		t[i] = c;
	}
	return t;
})();
var crc = function() {
	var c = -1;
	return {
		p: function(d) {
			var cr = c;
			for (var i = 0; i < d.length; ++i) cr = crct[cr & 255 ^ d[i]] ^ cr >>> 8;
			c = cr;
		},
		d: function() {
			return ~c;
		}
	};
};
var dopt = function(dat, opt, pre, post, st) {
	if (!st) {
		st = { l: 1 };
		if (opt.dictionary) {
			var dict = opt.dictionary.subarray(-32768);
			var newDat = new u8(dict.length + dat.length);
			newDat.set(dict);
			newDat.set(dat, dict.length);
			dat = newDat;
			st.w = dict.length;
		}
	}
	return dflt(dat, opt.level == null ? 6 : opt.level, opt.mem == null ? st.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(dat.length))) * 1.5) : 20 : 12 + opt.mem, pre, post, st);
};
var mrg = function(a, b) {
	var o = {};
	for (var k in a) o[k] = a[k];
	for (var k in b) o[k] = b[k];
	return o;
};
var wbytes = function(d, b, v) {
	for (; v; ++b) d[b] = v, v >>>= 8;
};
/**
* Compresses data with DEFLATE without any wrapper
* @param data The data to compress
* @param opts The compression options
* @returns The deflated version of the data
*/
function deflateSync(data, opts) {
	return dopt(data, opts || {}, 0, 0);
}
var fltn = function(d, p, t, o) {
	for (var k in d) {
		var val = d[k], n = p + k, op = o;
		if (Array.isArray(val)) op = mrg(o, val[1]), val = val[0];
		if (ArrayBuffer.isView(val)) t[n] = [val, op];
		else {
			t[n += "/"] = [new u8(0), op];
			fltn(val, n, t, o);
		}
	}
};
var te = typeof TextEncoder != "undefined" && /*#__PURE__*/ new TextEncoder();
var td = typeof TextDecoder != "undefined" && /*#__PURE__*/ new TextDecoder();
try {
	td.decode(et, { stream: true });
} catch (e) {}
/**
* Converts a string into a Uint8Array for use with compression/decompression methods
* @param str The string to encode
* @param latin1 Whether or not to interpret the data as Latin-1. This should
*               not need to be true unless decoding a binary string.
* @returns The string encoded in UTF-8/Latin-1 binary
*/
function strToU8(str, latin1) {
	if (latin1) {
		var ar_1 = new u8(str.length);
		for (var i = 0; i < str.length; ++i) ar_1[i] = str.charCodeAt(i);
		return ar_1;
	}
	if (te) return te.encode(str);
	var l = str.length;
	var ar = new u8(str.length + (str.length >> 1));
	var ai = 0;
	var w = function(v) {
		ar[ai++] = v;
	};
	for (var i = 0; i < l; ++i) {
		if (ai + 5 > ar.length) {
			var n = new u8(ai + 8 + (l - i << 1));
			n.set(ar);
			ar = n;
		}
		var c = str.charCodeAt(i);
		if (c < 128 || latin1) w(c);
		else if (c < 2048) w(192 | c >> 6), w(128 | c & 63);
		else if (c > 55295 && c < 57344) c = 65536 + (c & 1047552) | str.charCodeAt(++i) & 1023, w(240 | c >> 18), w(128 | c >> 12 & 63), w(128 | c >> 6 & 63), w(128 | c & 63);
		else w(224 | c >> 12), w(128 | c >> 6 & 63), w(128 | c & 63);
	}
	return slc(ar, 0, ai);
}
var exfl = function(ex) {
	var le = 0;
	if (ex) for (var k in ex) {
		var l = ex[k].length;
		if (l > 65535) err(9);
		le += l + 4;
	}
	return le;
};
var wzh = function(d, b, f, fn, u, c, ce, co) {
	var fl = fn.length, ex = f.extra, col = co && co.length;
	var exl = exfl(ex);
	wbytes(d, b, ce != null ? 33639248 : 67324752), b += 4;
	if (ce != null) d[b++] = 20, d[b++] = f.os;
	d[b] = 20, b += 2;
	d[b++] = f.flag << 1 | (c < 0 && 8), d[b++] = u && 8;
	d[b++] = f.compression & 255, d[b++] = f.compression >> 8;
	var dt = new Date(f.mtime == null ? Date.now() : f.mtime), y = dt.getFullYear() - 1980;
	if (y < 0 || y > 119) err(10);
	wbytes(d, b, y << 25 | dt.getMonth() + 1 << 21 | dt.getDate() << 16 | dt.getHours() << 11 | dt.getMinutes() << 5 | dt.getSeconds() >> 1), b += 4;
	if (c != -1) {
		wbytes(d, b, f.crc);
		wbytes(d, b + 4, c < 0 ? -c - 2 : c);
		wbytes(d, b + 8, f.size);
	}
	wbytes(d, b + 12, fl);
	wbytes(d, b + 14, exl), b += 16;
	if (ce != null) {
		wbytes(d, b, col);
		wbytes(d, b + 6, f.attrs);
		wbytes(d, b + 10, ce), b += 14;
	}
	d.set(fn, b);
	b += fl;
	if (exl) for (var k in ex) {
		var exf = ex[k], l = exf.length;
		wbytes(d, b, +k);
		wbytes(d, b + 2, l);
		d.set(exf, b + 4), b += 4 + l;
	}
	if (col) d.set(co, b), b += col;
	return b;
};
var wzf = function(o, b, c, d, e) {
	wbytes(o, b, 101010256);
	wbytes(o, b + 8, c);
	wbytes(o, b + 10, c);
	wbytes(o, b + 12, d);
	wbytes(o, b + 16, e);
};
/**
* Synchronously creates a ZIP file. Prefer using `zip` for better performance
* with more than one file.
* @param data The directory structure for the ZIP archive
* @param opts The main options, merged with per-file options
* @returns The generated ZIP archive
*/
function zipSync(data, opts) {
	if (!opts) opts = {};
	var r = {};
	var files = [];
	fltn(data, "", r, opts);
	var o = 0;
	var tot = 0;
	for (var fn in r) {
		var _a = r[fn], file = _a[0], p = _a[1];
		var compression = p.level == 0 ? 0 : 8;
		var f = strToU8(fn), s = f.length;
		var com = p.comment, m = com && strToU8(com), ms = m && m.length;
		var exl = exfl(p.extra);
		if (s > 65535) err(11);
		var d = compression ? deflateSync(file, p) : file, l = d.length;
		var c = crc();
		c.p(file);
		files.push(mrg(p, {
			size: file.length,
			crc: c.d(),
			c: d,
			f,
			m,
			u: s != fn.length || m && com.length != ms,
			o,
			compression
		}));
		o += 30 + s + exl + l;
		tot += 76 + 2 * (s + exl) + (ms || 0) + l;
	}
	var out = new u8(tot + 22), oe = o, cdl = tot - o;
	for (var i = 0; i < files.length; ++i) {
		var f = files[i];
		wzh(out, f.o, f, f.f, f.u, f.c.length);
		var badd = 30 + f.f.length + exfl(f.extra);
		out.set(f.c, f.o + badd);
		wzh(out, o, f, f.f, f.u, f.c.length, f.o, f.m), o += 16 + badd + (f.m ? f.m.length : 0);
	}
	wzf(out, o, files.length, cdl, oe);
	return out;
}
// src/export/configs.ts
function setupScript(d) {
	const lines = [
		"#!/bin/sh",
		`# NetSim generated configuration for ${d.name} (${d.kind})`,
		"# Apply on a Linux machine with iproute2, as root. Interface names on",
		"# real hardware will differ — adjust eth0/eth1/... accordingly.",
		""
	];
	for (const i of d.interfaces) {
		if (i.ip) lines.push(`ip addr add ${cidrToString(i.ip.addr, i.ip.prefix)} dev ${i.name}`);
		if (i.ip || i.link) lines.push(`ip link set ${i.name} ${i.up ? "up" : "down"}`);
	}
	for (const r of d.staticRoutes) {
		const dest = r.prefix === 0 ? "default" : cidrToString(r.dest, r.prefix);
		const via = r.via !== null ? ` via ${ipToString(r.via)}` : "";
		lines.push(`ip route add ${dest}${via} dev ${r.ifaceName}`);
	}
	if (d.nameserver !== null) lines.push(`printf 'nameserver ${ipToString(d.nameserver)}\\n' > /etc/resolv.conf`);
	if (d.forwarding) lines.push("sysctl -w net.ipv4.ip_forward=1");
	if (d.fw.active()) lines.push("nft -f ./nftables.conf");
	if (d.dhcpServer?.enabled || d.dnsServer?.enabled) lines.push("# start DHCP/DNS: dnsmasq --conf-file=./dnsmasq.conf --no-daemon");
	if (d.httpServer?.enabled) lines.push(`# serve the web page: busybox httpd -f -p ${d.httpServer.port} -h . (index.html exported alongside)`);
	lines.push("");
	return lines.join("\n");
}
function nftablesConf(d) {
	if (!d.fw.active()) return null;
	return `#!/usr/sbin/nft -f\n# NetSim generated ruleset for ${d.name}\nflush ruleset\n\n${listRuleset(d.fw)}`;
}
function dnsmasqConf(d) {
	const dhcp = d.dhcpServer?.enabled ? d.dhcpServer : null;
	const dns = d.dnsServer?.enabled ? d.dnsServer : null;
	if (!dhcp && !dns) return null;
	const lines = [`# NetSim generated dnsmasq.conf for ${d.name}`];
	for (const i of d.interfaces) if (i.ip) lines.push(`interface=${i.name}`);
	if (!dns) lines.push("port=0  # DHCP only, no DNS");
	else {
		lines.push("no-resolv");
		for (const [name, addr] of dns.records) lines.push(`host-record=${name},${ipToString(addr)}`);
	}
	if (dhcp) {
		lines.push(`dhcp-range=${ipToString(dhcp.rangeStart)},${ipToString(dhcp.rangeEnd)},12h`);
		if (dhcp.router !== null) lines.push(`dhcp-option=option:router,${ipToString(dhcp.router)}`);
		if (dhcp.dns !== null) lines.push(`dhcp-option=option:dns-server,${ipToString(dhcp.dns)}`);
	}
	lines.push("");
	return lines.join("\n");
}
function sanitizeName(name) {
	return name.replace(/[^\w.-]/g, "_");
}
function configBundle(net) {
	const files = [];
	const devices = [...net.devices.values()].filter((d) => d instanceof IpDevice);
	const readme = [
		"# NetSim configuration bundle",
		"",
		"One directory per device, containing genuine Linux configuration derived",
		"from the simulated design. Interface names map 1:1 to the simulation;",
		"real hardware will differ.",
		"",
		"| Device | Kind | Files |",
		"|---|---|---|"
	];
	for (const d of devices) {
		const dir = sanitizeName(d.name);
		const names = ["setup.sh"];
		files.push({
			path: `${dir}/setup.sh`,
			content: setupScript(d)
		});
		const nft = nftablesConf(d);
		if (nft) {
			files.push({
				path: `${dir}/nftables.conf`,
				content: nft
			});
			names.push("nftables.conf");
		}
		const dnsmasq = dnsmasqConf(d);
		if (dnsmasq) {
			files.push({
				path: `${dir}/dnsmasq.conf`,
				content: dnsmasq
			});
			names.push("dnsmasq.conf");
		}
		if (d.httpServer?.enabled) {
			files.push({
				path: `${dir}/index.html`,
				content: d.httpServer.body + "\n"
			});
			names.push("index.html");
		}
		readme.push(`| ${d.name} | ${d.kind} | ${names.join(", ")} |`);
	}
	readme.push("");
	files.unshift({
		path: "README.md",
		content: readme.join("\n")
	});
	return files;
}
// src/export/containerlab.ts
var IMAGE$1 = "ghcr.io/hellt/network-multitool";
function clabIface(simName) {
	const n = Number(simName.replace(/^eth/, ""));
	return `eth${Number.isInteger(n) ? n + 1 : simName}`;
}
var FILTER_PRIO = {
	input: "0",
	forward: "0",
	output: "0"
};
var NAT_PRIO = {
	prerouting: "-100",
	postrouting: "100"
};
function nftExecCommands(d) {
	const fw = d.fw;
	const cmds = [];
	if (fw.tables.filter) {
		cmds.push("nft add table ip filter");
		for (const hook of [
			"input",
			"forward",
			"output"
		]) {
			const c = fw.filter[hook];
			if (!c.declared) continue;
			cmds.push(`nft 'add chain ip filter ${c.name} { type filter hook ${hook} priority ${FILTER_PRIO[hook]} ; policy ${c.policy} ; }'`);
			for (const r of c.rules) cmds.push(`nft 'add rule ip filter ${c.name} ${filterRuleText(r)}'`);
		}
	}
	if (fw.tables.nat) {
		cmds.push("nft add table ip nat");
		for (const hook of ["prerouting", "postrouting"]) {
			const c = fw.nat[hook];
			if (!c.declared) continue;
			cmds.push(`nft 'add chain ip nat ${c.name} { type nat hook ${hook} priority ${NAT_PRIO[hook]} ; }'`);
			for (const r of c.rules) cmds.push(`nft 'add rule ip nat ${c.name} ${natRuleText(r)}'`);
		}
	}
	return cmds.map((c) => c.replace(/(iifname|oifname) "eth(\d+)"/g, (_m, kw, n) => `${kw} "eth${Number(n) + 1}"`));
}
function containerlabYaml(net, labName = "netsim") {
	const lines = [
		"# Generated by NetSim — deploy with: containerlab deploy -t <this file>",
		"# NOTE: containerlab reserves eth0 for management; simulated ethN is eth(N+1) here.",
		"# DHCP/DNS/web services are exported separately in the configs bundle (dnsmasq.conf etc).",
		`name: ${sanitizeName(labName)}`,
		"topology:",
		"  nodes:"
	];
	for (const d of net.devices.values()) {
		const name = sanitizeName(d.name);
		lines.push(`    ${name}:`);
		lines.push("      kind: linux");
		lines.push(`      image: ${IMAGE$1}`);
		const exec = [];
		if (d instanceof SwitchDevice) {
			exec.push("ip link add br0 type bridge", "ip link set br0 up");
			for (const i of d.interfaces) if (i.link) exec.push(`ip link set ${clabIface(i.name)} master br0`);
		} else if (d instanceof IpDevice) {
			for (const i of d.interfaces) if (i.ip) exec.push(`ip addr add ${cidrToString(i.ip.addr, i.ip.prefix)} dev ${clabIface(i.name)}`);
			for (const r of d.staticRoutes) {
				const dest = r.prefix === 0 ? "default" : cidrToString(r.dest, r.prefix);
				const via = r.via !== null ? ` via ${ipToString(r.via)}` : "";
				exec.push(`ip route replace ${dest}${via} dev ${clabIface(r.ifaceName)}`);
			}
			if (d.forwarding) exec.push("sysctl -w net.ipv4.ip_forward=1");
			exec.push(...nftExecCommands(d));
		}
		if (exec.length) {
			lines.push("      exec:");
			for (const c of exec) lines.push(`        - "${c.replace(/"/g, "\\\"")}"`);
		}
	}
	lines.push("  links:");
	for (const l of net.links.values()) lines.push(`    - endpoints: ["${sanitizeName(l.a.device.name)}:${clabIface(l.a.name)}", "${sanitizeName(l.b.device.name)}:${clabIface(l.b.name)}"]`);
	lines.push("");
	return lines.join("\n");
}
// src/export/compose.ts
var IMAGE = "nicolaka/netshoot";
function computeSegments(net) {
	const segments = [];
	const seenSwitches = /* @__PURE__ */ new Set();
	const attachmentsOf = (switches) => {
		const out = [];
		for (const sw of switches) for (const port of sw.interfaces) {
			if (!port.link) continue;
			const other = port.link.other(port);
			if (other.device instanceof IpDevice) out.push({
				device: other.device,
				iface: other
			});
		}
		return out;
	};
	for (const d of net.devices.values()) {
		if (!(d instanceof SwitchDevice) || seenSwitches.has(d.id)) continue;
		const group = /* @__PURE__ */ new Set();
		const queue = [d];
		while (queue.length) {
			const sw = queue.pop();
			if (group.has(sw)) continue;
			group.add(sw);
			seenSwitches.add(sw.id);
			for (const port of sw.interfaces) {
				if (!port.link) continue;
				const other = port.link.other(port).device;
				if (other instanceof SwitchDevice && !group.has(other)) queue.push(other);
			}
		}
		segments.push({
			name: sanitizeName(d.name),
			attachments: attachmentsOf(group),
			subnet: null
		});
	}
	for (const l of net.links.values()) if (l.a.device instanceof IpDevice && l.b.device instanceof IpDevice) segments.push({
		name: `p2p_${sanitizeName(l.a.device.name)}_${sanitizeName(l.b.device.name)}`,
		attachments: [{
			device: l.a.device,
			iface: l.a
		}, {
			device: l.b.device,
			iface: l.b
		}],
		subnet: null
	});
	for (const seg of segments) {
		const withIp = seg.attachments.find((a) => a.iface.ip);
		if (withIp?.iface.ip) {
			const { addr, prefix } = withIp.iface.ip;
			seg.subnet = cidrToString(networkOf(addr, prefix), prefix);
		}
	}
	return segments;
}
function composeYaml(net) {
	const segments = computeSegments(net);
	const lines = [
		"# Generated by NetSim.",
		"# NOTE: compose bridges add a host gateway + NAT, so this is an approximation",
		"# of the simulated L2 topology — use the containerlab export for fidelity.",
		"services:"
	];
	const devices = [...net.devices.values()].filter((d) => d instanceof IpDevice);
	for (const d of devices) {
		const name = sanitizeName(d.name);
		lines.push(`  ${name}:`);
		lines.push(`    image: ${IMAGE}`);
		lines.push(`    container_name: ${name}`);
		lines.push("    cap_add: [NET_ADMIN]");
		const cmds = [];
		for (const r of d.staticRoutes) {
			const dest = r.prefix === 0 ? "default" : cidrToString(r.dest, r.prefix);
			const via = r.via !== null ? ` via ${ipToString(r.via)}` : "";
			cmds.push(`ip route replace ${dest}${via}`);
		}
		if (d.forwarding) cmds.push("sysctl -w net.ipv4.ip_forward=1");
		cmds.push(...nftExecCommands(d).map((c) => c.replace(/eth(\d+)/g, (_m, n) => `eth${Number(n) - 1}`)));
		cmds.push("sleep infinity");
		lines.push(`    command: sh -c "${cmds.join(" && ").replace(/"/g, "\\\"")}"`);
		const segs = segments.filter((s) => s.attachments.some((a) => a.device === d));
		if (segs.length) {
			lines.push("    networks:");
			for (const s of segs) {
				const att = s.attachments.find((a) => a.device === d);
				if (att.iface.ip) {
					lines.push(`      ${s.name}:`);
					lines.push(`        ipv4_address: ${ipToString(att.iface.ip.addr)}`);
				} else lines.push(`      ${s.name}: {}`);
			}
		}
	}
	lines.push("networks:");
	for (const s of segments) {
		lines.push(`  ${s.name}:`);
		lines.push("    driver: bridge");
		if (s.subnet) {
			lines.push("    ipam:");
			lines.push("      config:");
			lines.push(`        - subnet: ${s.subnet}`);
		}
	}
	lines.push("");
	return lines.join("\n");
}
// src/export/diagram.ts
var W = 150;
var BASE_H = 58;
var LINE_H = 15;
var KIND_COLOR = {
	host: "#0284c7",
	server: "#0d9488",
	switch: "#7c3aed",
	router: "#059669",
	firewall: "#ea580c"
};
function esc$1(s) {
	return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function topologySvg(net, positions, title = "NetSim topology") {
	const pos = new Map(positions.map((p) => [p.id, p]));
	const boxes = /* @__PURE__ */ new Map();
	for (const d of net.devices.values()) {
		const p = pos.get(d.id);
		if (!p) continue;
		const ips = d instanceof IpDevice ? d.interfaces.filter((i) => i.ip).map((i) => `${i.name} ${cidrToString(i.ip.addr, i.ip.prefix)}`) : [];
		boxes.set(d.id, {
			x: p.x,
			y: p.y,
			h: BASE_H + ips.length * LINE_H,
			name: d.name,
			kind: d.kind,
			ips
		});
	}
	if (boxes.size === 0) return `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="80"><text x="12" y="40">empty topology</text></svg>`;
	const minX = Math.min(...[...boxes.values()].map((b) => b.x)) - 40;
	const minY = Math.min(...[...boxes.values()].map((b) => b.y)) - 60;
	const maxX = Math.max(...[...boxes.values()].map((b) => b.x + W)) + 40;
	const maxY = Math.max(...[...boxes.values()].map((b) => b.y + b.h)) + 40;
	const width = maxX - minX;
	const height = maxY - minY;
	const parts = [];
	parts.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="${minX} ${minY} ${width} ${height}" font-family="Helvetica, Arial, sans-serif">`);
	parts.push(`<rect x="${minX}" y="${minY}" width="${width}" height="${height}" fill="#ffffff"/>`);
	parts.push(`<text x="${minX + 20}" y="${minY + 32}" font-size="16" font-weight="bold" fill="#0f172a">${esc$1(title)}</text>`);
	for (const l of net.links.values()) {
		const a = boxes.get(l.a.device.id);
		const b = boxes.get(l.b.device.id);
		if (!a || !b) continue;
		const ax = a.x + W / 2;
		const ay = a.y + a.h / 2;
		const bx = b.x + W / 2;
		const by = b.y + b.h / 2;
		parts.push(`<line x1="${ax}" y1="${ay}" x2="${bx}" y2="${by}" stroke="#94a3b8" stroke-width="2"/>`);
		const lx = (x1, y1, x2, y2, t) => [x1 + (x2 - x1) * t, y1 + (y2 - y1) * t];
		const [alx, aly] = lx(ax, ay, bx, by, .22);
		const [blx, bly] = lx(ax, ay, bx, by, .78);
		parts.push(`<text x="${alx}" y="${aly - 4}" font-size="9" fill="#64748b" text-anchor="middle">${esc$1(l.a.name)}</text>`);
		parts.push(`<text x="${blx}" y="${bly - 4}" font-size="9" fill="#64748b" text-anchor="middle">${esc$1(l.b.name)}</text>`);
	}
	for (const b of boxes.values()) {
		const color = KIND_COLOR[b.kind] ?? "#334155";
		parts.push(`<rect x="${b.x}" y="${b.y}" width="${W}" height="${b.h}" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>`);
		parts.push(`<rect x="${b.x}" y="${b.y}" width="5" height="${b.h}" rx="2.5" fill="${color}"/>`);
		parts.push(`<text x="${b.x + 16}" y="${b.y + 22}" font-size="13" font-weight="bold" fill="#0f172a">${esc$1(b.name)}</text>`);
		parts.push(`<text x="${b.x + 16}" y="${b.y + 38}" font-size="10" fill="${color}" style="text-transform:uppercase">${esc$1(b.kind)}</text>`);
		b.ips.forEach((ip, i) => {
			parts.push(`<text x="${b.x + 16}" y="${b.y + 54 + i * LINE_H}" font-size="10" fill="#334155" font-family="monospace">${esc$1(ip)}</text>`);
		});
	}
	parts.push("</svg>");
	return parts.join("\n");
}
function svgToPngBlob(svg, scale = 2) {
	return new Promise((resolve, reject) => {
		const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
		const img = new Image();
		img.onload = () => {
			const canvas = document.createElement("canvas");
			canvas.width = img.width * scale;
			canvas.height = img.height * scale;
			const ctx = canvas.getContext("2d");
			ctx.scale(scale, scale);
			ctx.drawImage(img, 0, 0);
			URL.revokeObjectURL(url);
			canvas.toBlob((blob) => blob ? resolve(blob) : reject(/* @__PURE__ */ new Error("PNG export failed")), "image/png");
		};
		img.onerror = () => {
			URL.revokeObjectURL(url);
			reject(/* @__PURE__ */ new Error("SVG rendering failed"));
		};
		img.src = url;
	});
}
// src/export/report.ts
function esc(s) {
	return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function networkReport(net, positions, generatedAt) {
	const devices = [...net.devices.values()];
	const parts = [];
	parts.push(`<!doctype html>
<html lang="en"><head><meta charset="utf-8"/>
<title>NetSim network report</title>
<style>
  body { font-family: Helvetica, Arial, sans-serif; color: #0f172a; max-width: 900px; margin: 32px auto; padding: 0 20px; }
  h1 { font-size: 24px; } h2 { font-size: 18px; margin-top: 32px; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px; }
  h3 { font-size: 15px; margin-bottom: 6px; }
  .meta { color: #64748b; font-size: 12px; }
  table { border-collapse: collapse; width: 100%; font-size: 13px; margin: 8px 0 16px; }
  th, td { border: 1px solid #e2e8f0; padding: 6px 10px; text-align: left; vertical-align: top; }
  th { background: #f8fafc; }
  pre { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 10px 12px; font-size: 12px; overflow-x: auto; }
  .kind { text-transform: uppercase; font-size: 11px; color: #64748b; letter-spacing: 1px; }
  .diagram { margin: 16px 0; border: 1px solid #e2e8f0; border-radius: 8px; overflow: auto; }
  @media print { .diagram { border: none; } }
</style></head><body>`);
	parts.push("<h1>Network design report</h1>");
	parts.push(`<p class="meta">Generated by NetSim on ${esc(generatedAt)} · ${devices.length} devices · ${net.links.size} links</p>`);
	parts.push("<h2>Topology</h2>");
	parts.push(`<div class="diagram">${topologySvg(net, positions, "")}</div>`);
	parts.push("<h2>Device inventory</h2>");
	parts.push("<table><tr><th>Device</th><th>Kind</th><th>Addresses</th><th>Services</th></tr>");
	for (const d of devices) {
		const ips = d instanceof IpDevice ? d.interfaces.filter((i) => i.ip).map((i) => `${i.name}: ${cidrToString(i.ip.addr, i.ip.prefix)}`).join("<br/>") : "—";
		const services = [];
		if (d instanceof IpDevice) {
			if (d.forwarding) services.push("IP forwarding");
			if (d.fw.active()) services.push("firewall");
			if (d.dhcpServer?.enabled) services.push("DHCP server");
			if (d.dnsServer?.enabled) services.push("DNS server");
			if (d.httpServer?.enabled) services.push(`web (:${d.httpServer.port})`);
			if (d.services.tcp.size) services.push(`tcp ports ${[...d.services.tcp].join(",")}`);
			if (d.services.udp.size) services.push(`udp ports ${[...d.services.udp].join(",")}`);
			if (d.nameserver !== null) services.push(`resolver → ${ipToString(d.nameserver)}`);
		}
		parts.push(`<tr><td><strong>${esc(d.name)}</strong></td><td class="kind">${d.kind}</td><td><code>${ips || "—"}</code></td><td>${services.map(esc).join("; ") || "—"}</td></tr>`);
	}
	parts.push("</table>");
	parts.push("<h2>Cabling</h2>");
	parts.push("<table><tr><th>From</th><th>Interface</th><th>To</th><th>Interface</th></tr>");
	for (const l of net.links.values()) parts.push(`<tr><td>${esc(l.a.device.name)}</td><td><code>${esc(l.a.name)}</code></td><td>${esc(l.b.device.name)}</td><td><code>${esc(l.b.name)}</code></td></tr>`);
	parts.push("</table>");
	for (const d of devices) {
		if (!(d instanceof IpDevice)) continue;
		const hasRoutes = d.routes().length > 0;
		const hasFw = d.fw.active();
		const dnsRecords = d.dnsServer?.enabled ? [...d.dnsServer.records.entries()] : [];
		if (!hasRoutes && !hasFw && !dnsRecords.length && !d.dhcpServer?.enabled) continue;
		parts.push(`<h2>${esc(d.name)} <span class="kind">${d.kind}</span></h2>`);
		if (hasRoutes) {
			parts.push("<h3>Routing table</h3>");
			parts.push(`<pre>${esc(formatRoutes(d))}</pre>`);
		}
		if (d.dhcpServer?.enabled) {
			const c = d.dhcpServer;
			parts.push("<h3>DHCP server</h3>");
			parts.push(`<pre>range ${ipToString(c.rangeStart)} – ${ipToString(c.rangeEnd)}\nrouter ${c.router !== null ? ipToString(c.router) : "—"}\ndns    ${c.dns !== null ? ipToString(c.dns) : "—"}</pre>`);
		}
		if (dnsRecords.length) {
			parts.push("<h3>DNS records</h3>");
			parts.push(`<pre>${esc(dnsRecords.map(([n, a]) => `${ipToString(a)}  ${n}`).join("\n"))}</pre>`);
		}
		if (hasFw) {
			parts.push("<h3>Firewall ruleset (nftables)</h3>");
			parts.push(`<pre>${esc(listRuleset(d.fw))}</pre>`);
		}
	}
	for (const d of devices) if (d instanceof SwitchDevice && d.macTable.size) {
		parts.push(`<h2>${esc(d.name)} <span class="kind">switch</span></h2>`);
		parts.push("<h3>MAC address table (live)</h3>");
		parts.push(`<pre>${esc([...d.macTable.entries()].map(([mac, p]) => `${mac}  ${p.name}`).join("\n"))}</pre>`);
	}
	parts.push("</body></html>");
	return parts.join("\n");
}
// src/store.ts
var AUTOSAVE_KEY = "netsim:autosave:v1";
function deviceNode(id, kind, label, x, y) {
	return {
		id,
		type: "device",
		position: {
			x,
			y
		},
		data: {
			kind,
			label,
			ips: []
		}
	};
}
function edgesFromEngine() {
	return [...sim.net.links.values()].map((l) => {
		const kinds = [l.a.device.kind, l.b.device.kind];
		const wireless = kinds.includes("ap") && kinds.some((k) => k === "host" || k === "server");
		return {
			id: l.id,
			source: l.a.device.id,
			target: l.b.device.id,
			type: "floating",
			...wireless ? { style: { strokeDasharray: "7 5" } } : {}
		};
	});
}
function deviceIps(id) {
	const d = sim.net.devices.get(id);
	if (!d) return [];
	return d.interfaces.filter((i) => i.ip).map((i) => cidrToString(i.ip.addr, i.ip.prefix));
}
var saveTimer = null;
var noticeTimer = null;
var lastPulse = 0;
var useStore = create()((set, get) => {
	let flashSeq = 0;
	const wireNet = (net) => {
		net.onWireTransfer = (t) => {
			const packets = get().packets;
			set({ packets: [...packets.slice(-149), t] });
		};
		net.onFwDrop = (deviceId) => {
			const now = net.scheduler.now;
			set({ dropFlashes: [...get().dropFlashes.slice(-19), {
				id: ++flashSeq,
				deviceId,
				start: now,
				until: now + 700
			}] });
		};
	};
	wireNet(sim.net);
	const currentSave = () => {
		const positions = {};
		for (const n of get().nodes) positions[n.id] = {
			x: n.position.x,
			y: n.position.y
		};
		const save = serializeNetwork(sim.net, positions);
		const lab = get().lab;
		if (lab) {
			save.lab = lab;
			save.labProgress = {
				step: get().labStep,
				results: get().labResults,
				quiz: get().quizAnswers
			};
		}
		return save;
	};
	const download = (filename, blob) => {
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = filename;
		a.click();
		URL.revokeObjectURL(url);
	};
	const currentSvg = () => topologySvg(sim.net, get().nodes.map((n) => ({
		id: n.id,
		x: n.position.x,
		y: n.position.y
	})));
	const saveSoon = () => {
		if (saveTimer) clearTimeout(saveTimer);
		saveTimer = setTimeout(() => {
			try {
				localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(currentSave()));
			} catch {}
		}, 500);
	};
	const adoptSave = (data) => {
		disposeAllSessions();
		sim.net = restoreNetwork(data);
		wireNet(sim.net);
		set({
			nodes: data.devices.map((d) => deviceNode(d.id, d.kind, d.name, d.x, d.y)),
			edges: edgesFromEngine(),
			packets: [],
			dropFlashes: [],
			selected: null,
			terminals: [],
			activeTerminal: null,
			lab: data.lab ?? null,
			labStep: data.labProgress?.step ?? 0,
			labResults: data.labProgress?.results ?? {},
			labChecking: false,
			quizAnswers: data.labProgress?.quiz ?? {}
		});
		get().refresh();
	};
	return {
		nodes: [],
		edges: [],
		packets: [],
		dropFlashes: [],
		clock: 0,
		uiPulse: 0,
		selected: null,
		terminals: [],
		activeTerminal: null,
		paused: false,
		speed: 1,
		notice: null,
		lab: null,
		labStep: 0,
		labResults: {},
		labChecking: false,
		quizAnswers: {},
		addDeviceAt(kind, pos) {
			const d = createDevice(sim.net, kind);
			set({ nodes: [...get().nodes, deviceNode(d.id, kind, d.name, pos.x, pos.y)] });
			saveSoon();
		},
		onNodesChange(changes) {
			for (const ch of changes) if (ch.type === "remove") {
				disposeSession(ch.id);
				sim.net.removeDevice(ch.id);
			}
			const removed = changes.some((c) => c.type === "remove");
			set({
				nodes: applyNodeChanges(changes, get().nodes),
				...removed ? {
					edges: edgesFromEngine(),
					terminals: get().terminals.filter((t) => sim.net.devices.has(t)),
					activeTerminal: get().activeTerminal && sim.net.devices.has(get().activeTerminal) ? get().activeTerminal : null,
					selected: get().selected && sim.net.devices.has(get().selected) ? get().selected : null
				} : {}
			});
			if (removed || changes.some((c) => c.type === "position" && !c.dragging)) saveSoon();
		},
		onEdgesChange(changes) {
			for (const ch of changes) if (ch.type === "remove") sim.net.disconnect(ch.id);
			set({ edges: applyEdgeChanges(changes, get().edges) });
			if (changes.some((c) => c.type === "remove")) saveSoon();
		},
		onConnect(c) {
			if (!c.source || !c.target) return;
			try {
				sim.net.connect(c.source, c.target);
				set({ edges: edgesFromEngine() });
				saveSoon();
			} catch (e) {
				get().setNotice(e instanceof Error ? e.message : String(e));
			}
		},
		select(id) {
			set({ selected: id });
		},
		deleteDevice(id) {
			disposeSession(id);
			sim.net.removeDevice(id);
			set({
				nodes: get().nodes.filter((n) => n.id !== id),
				edges: edgesFromEngine(),
				terminals: get().terminals.filter((t) => t !== id),
				activeTerminal: get().activeTerminal === id ? null : get().activeTerminal,
				selected: get().selected === id ? null : get().selected
			});
			saveSoon();
		},
		renameDevice(id, name) {
			const d = sim.net.devices.get(id);
			if (!d || !name.trim()) return;
			d.name = name.trim();
			get().refresh();
			saveSoon();
		},
		setIfaceIp(deviceId, ifaceName, value) {
			const d = sim.net.devices.get(deviceId);
			if (!(d instanceof IpDevice)) return "not an IP device";
			const iface = d.getInterface(ifaceName);
			if (!iface) return "no such interface";
			const trimmed = value.trim();
			if (trimmed === "") iface.ip = null;
			else {
				const cidr = parseCidr(trimmed);
				if (!cidr) return "use CIDR form, e.g. 192.168.1.10/24";
				iface.ip = cidr;
			}
			get().refresh();
			saveSoon();
			return null;
		},
		toggleIface(deviceId, ifaceName) {
			const iface = sim.net.devices.get(deviceId)?.getInterface(ifaceName);
			if (!iface) return;
			iface.up = !iface.up;
			get().refresh();
			saveSoon();
		},
		setServices(deviceId, proto, text) {
			const d = sim.net.devices.get(deviceId);
			if (!(d instanceof IpDevice)) return "not an IP device";
			const ports = /* @__PURE__ */ new Set();
			for (const part of text.split(",").map((p) => p.trim()).filter(Boolean)) {
				const n = Number(part);
				if (!Number.isInteger(n) || n < 1 || n > 65535) return `invalid port "${part}"`;
				ports.add(n);
			}
			d.services[proto] = ports;
			get().refresh();
			saveSoon();
			return null;
		},
		copyDeviceConfig(deviceId) {
			const d = sim.net.devices.get(deviceId);
			if (!(d instanceof IpDevice)) return;
			const text = listRuleset(d.fw);
			navigator.clipboard.writeText(text).then(() => get().setNotice(`${d.name} nftables config copied — paste into /etc/nftables.conf`)).catch(() => get().setNotice("Could not access clipboard"));
		},
		setNameserver(deviceId, text) {
			const d = sim.net.devices.get(deviceId);
			if (!(d instanceof IpDevice)) return "not an IP device";
			const trimmed = text.trim();
			if (trimmed === "") d.nameserver = null;
			else {
				const ip = parseIp(trimmed);
				if (ip === null) return "invalid nameserver address";
				d.nameserver = ip;
			}
			get().refresh();
			saveSoon();
			return null;
		},
		toggleDhcpServer(deviceId) {
			const d = sim.net.devices.get(deviceId);
			if (!(d instanceof IpDevice)) return;
			if (!d.dhcpServer) {
				const iface = d.interfaces.find((i) => i.ip);
				const base = iface?.ip ? (iface.ip.addr & 4294967040) >>> 0 : parseIp("192.168.0.0");
				d.dhcpServer = {
					enabled: true,
					rangeStart: (base | 100) >>> 0,
					rangeEnd: (base | 150) >>> 0,
					router: iface?.ip?.addr ?? null,
					dns: d.nameserver,
					leases: /* @__PURE__ */ new Map()
				};
			} else d.dhcpServer.enabled = !d.dhcpServer.enabled;
			get().refresh();
			saveSoon();
		},
		setDhcpField(deviceId, field, text) {
			const d = sim.net.devices.get(deviceId);
			if (!(d instanceof IpDevice) || !d.dhcpServer) return "DHCP server not enabled";
			const trimmed = text.trim();
			if (field === "router" || field === "dns") {
				if (trimmed === "") d.dhcpServer[field] = null;
				else {
					const ip = parseIp(trimmed);
					if (ip === null) return "invalid address";
					d.dhcpServer[field] = ip;
				}
			} else {
				const ip = parseIp(trimmed);
				if (ip === null) return "invalid address";
				d.dhcpServer[field] = ip;
			}
			get().refresh();
			saveSoon();
			return null;
		},
		toggleDnsServer(deviceId) {
			const d = sim.net.devices.get(deviceId);
			if (!(d instanceof IpDevice)) return;
			if (!d.dnsServer) d.dnsServer = {
				enabled: true,
				records: /* @__PURE__ */ new Map()
			};
			else d.dnsServer.enabled = !d.dnsServer.enabled;
			get().refresh();
			saveSoon();
		},
		setDnsRecords(deviceId, text) {
			const d = sim.net.devices.get(deviceId);
			if (!(d instanceof IpDevice) || !d.dnsServer) return "DNS server not enabled";
			const records = /* @__PURE__ */ new Map();
			for (const line of text.split("\n")) {
				const trimmed = line.trim();
				if (!trimmed || trimmed.startsWith("#")) continue;
				const [addr, name] = trimmed.split(/\s+/);
				const ip = parseIp(addr ?? "");
				if (ip === null || !name) return `invalid hosts line: "${trimmed}" (use: <ip> <name>)`;
				records.set(name.toLowerCase(), ip);
			}
			d.dnsServer.records = records;
			get().refresh();
			saveSoon();
			return null;
		},
		toggleHttpServer(deviceId) {
			const d = sim.net.devices.get(deviceId);
			if (!(d instanceof IpDevice)) return;
			if (!d.httpServer) d.httpServer = {
				enabled: true,
				port: 80,
				body: `<html><body><h1>Hello from ${d.name}</h1></body></html>`
			};
			else d.httpServer.enabled = !d.httpServer.enabled;
			get().refresh();
			saveSoon();
		},
		setHttpPort(deviceId, text) {
			const d = sim.net.devices.get(deviceId);
			if (!(d instanceof IpDevice) || !d.httpServer) return "web server not enabled";
			const port = Number(text.trim());
			if (!Number.isInteger(port) || port < 1 || port > 65535) return "invalid port";
			d.httpServer.port = port;
			get().refresh();
			saveSoon();
			return null;
		},
		setHttpBody(deviceId, text) {
			const d = sim.net.devices.get(deviceId);
			if (!(d instanceof IpDevice) || !d.httpServer) return;
			d.httpServer.body = text;
			saveSoon();
		},
		toggleRip(deviceId) {
			const d = sim.net.devices.get(deviceId);
			if (!(d instanceof IpDevice)) return;
			d.enableRip(!d.ripEnabled);
			get().refresh();
			saveSoon();
		},
		setPortVlan(deviceId, port, text) {
			const d = sim.net.devices.get(deviceId);
			if (!(d instanceof SwitchDevice)) return "not a switch";
			const vlan = Number(text.trim());
			if (!Number.isInteger(vlan) || vlan < 1 || vlan > 4094) return "VLAN must be 1–4094";
			if (vlan === 1) d.vlans.delete(port);
			else d.vlans.set(port, vlan);
			get().refresh();
			saveSoon();
			return null;
		},
		setSsid(deviceId, text) {
			const d = sim.net.devices.get(deviceId);
			if (!(d instanceof ApDevice)) return "not an access point";
			if (!text.trim()) return "SSID cannot be empty";
			d.ssid = text.trim();
			get().refresh();
			saveSoon();
			return null;
		},
		openTerminal(id) {
			const d = sim.net.devices.get(id);
			if (!d || !(d instanceof IpDevice)) return;
			set({
				terminals: get().terminals.includes(id) ? get().terminals : [...get().terminals, id],
				activeTerminal: id
			});
		},
		closeTerminal(id) {
			disposeSession(id);
			const terminals = get().terminals.filter((t) => t !== id);
			set({
				terminals,
				activeTerminal: get().activeTerminal === id ? terminals.length ? terminals[terminals.length - 1] : null : get().activeTerminal
			});
		},
		setActiveTerminal(id) {
			set({ activeTerminal: id });
		},
		refresh() {
			set({ nodes: get().nodes.map((n) => {
				const d = sim.net.devices.get(n.id);
				if (!d) return n;
				const fw = d instanceof IpDevice ? d.fw.active() : false;
				return {
					...n,
					data: {
						...n.data,
						label: d.name,
						ips: deviceIps(n.id),
						fw
					}
				};
			}) });
		},
		tick(dtMs) {
			if (get().paused) return;
			const dt = Math.min(dtMs, 100) * get().speed;
			sim.net.scheduler.advanceTo(sim.net.scheduler.now + dt);
			const now = sim.net.scheduler.now;
			const packets = get().packets;
			const alive = packets.filter((p) => p.end > now - 120);
			const flashes = get().dropFlashes;
			const aliveFlashes = flashes.filter((f) => f.until > now);
			const pulse = Math.floor(now / 400);
			set({
				clock: now,
				...alive.length !== packets.length ? { packets: alive } : {},
				...aliveFlashes.length !== flashes.length ? { dropFlashes: aliveFlashes } : {},
				...pulse !== lastPulse ? { uiPulse: pulse } : {}
			});
			lastPulse = pulse;
		},
		setPaused(p) {
			set({ paused: p });
		},
		setSpeed(s) {
			set({ speed: s });
		},
		setNotice(msg) {
			if (noticeTimer) clearTimeout(noticeTimer);
			set({ notice: msg });
			if (msg) noticeTimer = setTimeout(() => set({ notice: null }), 4e3);
		},
		newTopology() {
			disposeAllSessions();
			sim.net = new Network();
			wireNet(sim.net);
			set({
				nodes: [],
				edges: [],
				packets: [],
				dropFlashes: [],
				selected: null,
				terminals: [],
				activeTerminal: null,
				lab: null,
				labStep: 0,
				labResults: {},
				labChecking: false,
				quizAnswers: {}
			});
			saveSoon();
		},
		loadDemo() {
			get().newTopology();
			const net = sim.net;
			const pc1 = createDevice(net, "host");
			const pc2 = createDevice(net, "host");
			const sw1 = createDevice(net, "switch");
			const r1 = createDevice(net, "router");
			const srv1 = createDevice(net, "server");
			net.connect(pc1.id, sw1.id);
			net.connect(pc2.id, sw1.id);
			net.connect(sw1.id, r1.id);
			net.connect(r1.id, srv1.id);
			pc1.getInterface("eth0").ip = parseCidr("192.168.1.10/24");
			r1.getInterface("eth0").ip = parseCidr("192.168.1.1/24");
			r1.getInterface("eth1").ip = parseCidr("10.0.0.1/24");
			srv1.getInterface("eth0").ip = parseCidr("10.0.0.20/24");
			pc1.addRoute(0, 0, parseIp("192.168.1.1"));
			srv1.addRoute(0, 0, parseIp("10.0.0.1"));
			pc1.nameserver = parseIp("10.0.0.20");
			r1.dhcpServer = {
				enabled: true,
				rangeStart: parseIp("192.168.1.100"),
				rangeEnd: parseIp("192.168.1.150"),
				router: parseIp("192.168.1.1"),
				dns: parseIp("10.0.0.20"),
				leases: /* @__PURE__ */ new Map()
			};
			srv1.dnsServer = {
				enabled: true,
				records: /* @__PURE__ */ new Map([["web.lan", parseIp("10.0.0.20")], ["pc1.lan", parseIp("192.168.1.10")]])
			};
			srv1.httpServer = {
				enabled: true,
				port: 80,
				body: "<html><body><h1>It works!</h1><p>Served by srv1 over simulated TCP.</p></body></html>"
			};
			set({
				nodes: [
					deviceNode(pc1.id, "host", pc1.name, 60, 120),
					deviceNode(pc2.id, "host", pc2.name, 60, 320),
					deviceNode(sw1.id, "switch", sw1.name, 290, 220),
					deviceNode(r1.id, "router", r1.name, 510, 220),
					deviceNode(srv1.id, "server", srv1.name, 730, 220)
				],
				edges: edgesFromEngine()
			});
			get().refresh();
			saveSoon();
		},
		exportJson() {
			download("netsim-topology.json", new Blob([JSON.stringify(currentSave(), null, 2)], { type: "application/json" }));
		},
		exportConfigs() {
			const files = configBundle(sim.net);
			const entries = {};
			for (const f of files) entries[`netsim-configs/${f.path}`] = strToU8(f.content);
			const zipped = zipSync(entries);
			download("netsim-configs.zip", new Blob([zipped.slice().buffer], { type: "application/zip" }));
			get().setNotice("Config bundle exported — real iproute2/nftables/dnsmasq files");
		},
		exportContainerlab() {
			download("netsim.clab.yml", new Blob([containerlabYaml(sim.net)], { type: "text/yaml" }));
			get().setNotice("containerlab topology exported — deploy with: containerlab deploy -t netsim.clab.yml");
		},
		exportCompose() {
			download("docker-compose.yml", new Blob([composeYaml(sim.net)], { type: "text/yaml" }));
			get().setNotice("docker-compose exported (approximate L2 — see header note)");
		},
		exportSvg() {
			download("netsim-topology.svg", new Blob([currentSvg()], { type: "image/svg+xml" }));
		},
		exportPng() {
			svgToPngBlob(currentSvg()).then((blob) => download("netsim-topology.png", blob)).catch(() => get().setNotice("PNG export failed in this browser — try the SVG export"));
		},
		exportReport() {
			const positions = get().nodes.map((n) => ({
				id: n.id,
				x: n.position.x,
				y: n.position.y
			}));
			const html = networkReport(sim.net, positions, (/* @__PURE__ */ new Date()).toLocaleString());
			download("netsim-report.html", new Blob([html], { type: "text/html" }));
		},
		importJson(text) {
			try {
				const data = JSON.parse(text);
				adoptSave(data);
				saveSoon();
				return null;
			} catch (e) {
				return e instanceof Error ? e.message : "invalid file";
			}
		},
		shareUrl() {
			const compressed = import_lz_string.default.compressToEncodedURIComponent(JSON.stringify(currentSave()));
			const url = `${location.origin}${location.pathname}#t=${compressed}`;
			navigator.clipboard.writeText(url).then(() => get().setNotice("Share link copied to clipboard")).catch(() => get().setNotice("Could not access clipboard — check the address bar instead"));
			history.replaceState(null, "", `#t=${compressed}`);
		},
		boot() {
			if (location.hash.startsWith("#t=")) {
				const json = import_lz_string.default.decompressFromEncodedURIComponent(location.hash.slice(3));
				if (json) try {
					adoptSave(JSON.parse(json));
					history.replaceState(null, "", location.pathname);
					return;
				} catch {
					get().setNotice("Could not load the shared topology from the URL");
				}
			}
			const saved = localStorage.getItem(AUTOSAVE_KEY);
			if (saved) try {
				adoptSave(JSON.parse(saved));
				return;
			} catch {}
			get().loadDemo();
		},
		loadBundledLab(index) {
			const lab = LABS[index];
			if (!lab) return;
			adoptSave(JSON.parse(JSON.stringify(lab)));
			saveSoon();
		},
		loadExample(index) {
			const ex = EXAMPLES[index];
			if (!ex) return;
			adoptSave(JSON.parse(JSON.stringify(ex.file)));
			saveSoon();
		},
		setLabStep(step) {
			const lab = get().lab;
			if (!lab) return;
			set({ labStep: Math.max(0, Math.min(lab.steps.length - 1, step)) });
			saveSoon();
		},
		answerQuiz(qid, choice) {
			set({ quizAnswers: {
				...get().quizAnswers,
				[qid]: choice
			} });
			saveSoon();
		},
		checkStep() {
			const lab = get().lab;
			if (!lab || get().labChecking) return;
			const step = lab.steps[get().labStep];
			if (!step || step.objectives.length === 0) return;
			set({
				labChecking: true,
				paused: false
			});
			runChecks(sim.net, step.objectives, (r) => {
				set({ labResults: {
					...get().labResults,
					[r.id]: {
						pass: r.pass,
						detail: r.detail
					}
				} });
			}, () => {
				set({ labChecking: false });
				get().refresh();
				saveSoon();
			});
		},
		exportAttempt() {
			const lab = get().lab;
			if (!lab) return;
			const blob = new Blob([JSON.stringify(currentSave(), null, 2)], { type: "application/json" });
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = `netsim-attempt-${lab.id}.json`;
			a.click();
			URL.revokeObjectURL(url);
			get().setNotice("Attempt exported — submit the JSON file");
		},
		closeLab() {
			set({
				lab: null,
				labStep: 0,
				labResults: {},
				quizAnswers: {},
				labChecking: false
			});
			saveSoon();
		}
	};
});
// src/components/DeviceNode.tsx
function DeviceIcon({ kind, size = 30 }) {
	if (kind === "host") return /* @__PURE__ */ jsxs("svg", {
		viewBox: "0 0 32 32",
		width: size,
		height: size,
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ jsx("rect", {
				x: "4",
				y: "6",
				width: "24",
				height: "15",
				rx: "2",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ jsx("rect", {
				x: "7",
				y: "9",
				width: "18",
				height: "9",
				fill: "currentColor",
				opacity: "0.35"
			}),
			/* @__PURE__ */ jsx("rect", {
				x: "12",
				y: "23",
				width: "8",
				height: "2",
				fill: "currentColor"
			}),
			/* @__PURE__ */ jsx("rect", {
				x: "9",
				y: "26",
				width: "14",
				height: "2",
				rx: "1",
				fill: "currentColor"
			})
		]
	});
	if (kind === "switch") return /* @__PURE__ */ jsxs("svg", {
		viewBox: "0 0 32 32",
		width: size,
		height: size,
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ jsx("rect", {
				x: "3",
				y: "10",
				width: "26",
				height: "12",
				rx: "2",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M8 14h8m0 0-2.5-2.5M16 14l-2.5 2.5",
				stroke: "currentColor",
				strokeWidth: "1.6",
				fill: "none"
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M24 18h-8m0 0 2.5-2.5M16 18l2.5 2.5",
				stroke: "currentColor",
				strokeWidth: "1.6",
				fill: "none"
			})
		]
	});
	if (kind === "server") return /* @__PURE__ */ jsxs("svg", {
		viewBox: "0 0 32 32",
		width: size,
		height: size,
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ jsx("rect", {
				x: "6",
				y: "4",
				width: "20",
				height: "8",
				rx: "1.5",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ jsx("rect", {
				x: "6",
				y: "14",
				width: "20",
				height: "8",
				rx: "1.5",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ jsx("circle", {
				cx: "10",
				cy: "8",
				r: "1.3",
				fill: "currentColor"
			}),
			/* @__PURE__ */ jsx("circle", {
				cx: "10",
				cy: "18",
				r: "1.3",
				fill: "currentColor"
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M14 8h8M14 18h8",
				stroke: "currentColor",
				strokeWidth: "1.4"
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M12 25h8M16 22v3",
				stroke: "currentColor",
				strokeWidth: "1.6",
				fill: "none"
			})
		]
	});
	if (kind === "ap") return /* @__PURE__ */ jsxs("svg", {
		viewBox: "0 0 32 32",
		width: size,
		height: size,
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ jsx("path", {
				d: "M6 14a14 14 0 0 1 20 0",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M10 18a8.5 8.5 0 0 1 12 0",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ jsx("circle", {
				cx: "16",
				cy: "23",
				r: "2.4",
				fill: "currentColor"
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M16 25v3",
				stroke: "currentColor",
				strokeWidth: "2"
			})
		]
	});
	if (kind === "firewall") return /* @__PURE__ */ jsxs("svg", {
		viewBox: "0 0 32 32",
		width: size,
		height: size,
		"aria-hidden": true,
		children: [/* @__PURE__ */ jsx("path", {
			d: "M16 3l10 4v8c0 7-4.5 11.5-10 14C10.5 26.5 6 22 6 15V7l10-4z",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2"
		}), /* @__PURE__ */ jsx("path", {
			d: "M9 12h14M9 17h14M13 12v5M19 12v5",
			stroke: "currentColor",
			strokeWidth: "1.4",
			fill: "none"
		})]
	});
	return /* @__PURE__ */ jsxs("svg", {
		viewBox: "0 0 32 32",
		width: size,
		height: size,
		"aria-hidden": true,
		children: [/* @__PURE__ */ jsx("circle", {
			cx: "16",
			cy: "16",
			r: "12",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2"
		}), /* @__PURE__ */ jsx("path", {
			d: "M16 8v6m0 0-2.5-2M16 14l2.5-2M16 24v-6m0 0-2.5 2m2.5-2 2.5 2M8 16h6m10 0h-6",
			stroke: "currentColor",
			strokeWidth: "1.6",
			fill: "none"
		})]
	});
}
function DeviceNodeInner({ data, selected }) {
	return /* @__PURE__ */ jsxs("div", {
		className: `device-node kind-${data.kind}${selected ? " selected" : ""}`,
		children: [
			/* @__PURE__ */ jsx(Handle, {
				type: "source",
				position: Position.Top,
				id: "t"
			}),
			/* @__PURE__ */ jsx(Handle, {
				type: "source",
				position: Position.Right,
				id: "r"
			}),
			/* @__PURE__ */ jsx(Handle, {
				type: "source",
				position: Position.Bottom,
				id: "b"
			}),
			/* @__PURE__ */ jsx(Handle, {
				type: "source",
				position: Position.Left,
				id: "l"
			}),
			/* @__PURE__ */ jsx("div", {
				className: "dev-icon",
				children: /* @__PURE__ */ jsx(DeviceIcon, { kind: data.kind })
			}),
			data.fw === true && /* @__PURE__ */ jsx("span", {
				className: "dev-fw-badge",
				title: "firewall rules active",
				children: "⛨"
			}),
			/* @__PURE__ */ jsx("div", {
				className: "dev-label",
				children: data.label
			}),
			/* @__PURE__ */ jsx("div", {
				className: "dev-ip",
				children: data.ips.length ? data.ips[0] + (data.ips.length > 1 ? " +" : "") : "\xA0"
			})
		]
	});
}
var DeviceNode = memo(DeviceNodeInner);
// src/components/FloatingEdge.tsx
function clipToRect(cx, cy, tx, ty, w, h) {
	const dx = tx - cx;
	const dy = ty - cy;
	if (dx === 0 && dy === 0) return {
		x: cx,
		y: cy
	};
	const sx = w / 2 / Math.abs(dx || 1e-9);
	const sy = h / 2 / Math.abs(dy || 1e-9);
	const s = Math.min(sx, sy);
	return {
		x: cx + dx * s,
		y: cy + dy * s
	};
}
function FloatingEdge({ id, source, target, style }) {
	const sourceNode = useInternalNode(source);
	const targetNode = useInternalNode(target);
	if (!sourceNode || !targetNode) return null;
	const sw = sourceNode.measured.width ?? 96;
	const sh = sourceNode.measured.height ?? 78;
	const tw = targetNode.measured.width ?? 96;
	const th = targetNode.measured.height ?? 78;
	const scx = sourceNode.internals.positionAbsolute.x + sw / 2;
	const scy = sourceNode.internals.positionAbsolute.y + sh / 2;
	const tcx = targetNode.internals.positionAbsolute.x + tw / 2;
	const tcy = targetNode.internals.positionAbsolute.y + th / 2;
	const p1 = clipToRect(scx, scy, tcx, tcy, sw, sh);
	const p2 = clipToRect(tcx, tcy, scx, scy, tw, th);
	const [path] = getStraightPath({
		sourceX: p1.x,
		sourceY: p1.y,
		targetX: p2.x,
		targetY: p2.y
	});
	return /* @__PURE__ */ jsx(BaseEdge, {
		id,
		path,
		style
	});
}
// src/components/PacketLayer.tsx
var COLORS = {
	arp: "#f59e0b",
	icmp: "#38bdf8",
	tcp: "#34d399",
	udp: "#c084fc"
};
function PacketLayer() {
	const { x, y, zoom } = useViewport();
	const packets = useStore((s) => s.packets);
	const dropFlashes = useStore((s) => s.dropFlashes);
	const clock = useStore((s) => s.clock);
	const nodes = useStore((s) => s.nodes);
	if (!packets.length && !dropFlashes.length) return null;
	const centers = /* @__PURE__ */ new Map();
	for (const n of nodes) centers.set(n.id, {
		x: n.position.x + (n.measured?.width ?? 96) / 2,
		y: n.position.y + (n.measured?.height ?? 78) / 2
	});
	const dots = packets.filter((p) => clock >= p.start && clock <= p.end).map((p) => {
		const a = centers.get(p.fromDeviceId);
		const b = centers.get(p.toDeviceId);
		if (!a || !b) return null;
		const t = (clock - p.start) / (p.end - p.start || 1);
		const px = a.x + (b.x - a.x) * t;
		const py = a.y + (b.y - a.y) * t;
		return /* @__PURE__ */ jsx("circle", {
			cx: px,
			cy: py,
			r: 5,
			fill: COLORS[p.kind] ?? "#fff",
			className: "packet-dot"
		}, p.id);
	});
	const rings = dropFlashes.filter((f) => clock >= f.start && clock <= f.until).map((f) => {
		const c = centers.get(f.deviceId);
		if (!c) return null;
		const t = (clock - f.start) / (f.until - f.start || 1);
		return /* @__PURE__ */ jsx("circle", {
			cx: c.x,
			cy: c.y,
			r: 10 + t * 26,
			fill: "none",
			stroke: "#f87171",
			strokeWidth: 2.5,
			opacity: 1 - t
		}, `flash-${f.id}`);
	});
	return /* @__PURE__ */ jsx("svg", {
		className: "packet-layer",
		children: /* @__PURE__ */ jsxs("g", {
			transform: `translate(${x} ${y}) scale(${zoom})`,
			children: [dots, rings]
		})
	});
}
// src/components/Flow.tsx
var nodeTypes = { device: DeviceNode };
var edgeTypes = { floating: FloatingEdge };
var MINIMAP_COLORS = {
	host: "#38bdf8",
	switch: "#a78bfa",
	router: "#34d399",
	firewall: "#fb923c",
	server: "#2dd4bf",
	ap: "#f472b6"
};
var DROPPABLE_KINDS = /* @__PURE__ */ new Set([
	"host",
	"switch",
	"router",
	"firewall",
	"server",
	"ap"
]);
function Flow() {
	const nodes = useStore((s) => s.nodes);
	const edges = useStore((s) => s.edges);
	const onNodesChange = useStore((s) => s.onNodesChange);
	const onEdgesChange = useStore((s) => s.onEdgesChange);
	const onConnect = useStore((s) => s.onConnect);
	const select = useStore((s) => s.select);
	const openTerminal = useStore((s) => s.openTerminal);
	const tick = useStore((s) => s.tick);
	const addDeviceAt = useStore((s) => s.addDeviceAt);
	const { screenToFlowPosition } = useReactFlow();
	useEffect(() => {
		let last = performance.now();
		let raf = 0;
		const step = () => {
			const t = performance.now();
			tick(t - last);
			last = t;
		};
		const loop = () => {
			step();
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		const interval = window.setInterval(() => {
			if (performance.now() - last > 200) step();
		}, 250);
		return () => {
			cancelAnimationFrame(raf);
			window.clearInterval(interval);
		};
	}, [tick]);
	const onDrop = useCallback((e) => {
		e.preventDefault();
		const kind = e.dataTransfer.getData("application/netsim");
		if (kind === "" || !DROPPABLE_KINDS.has(kind)) return;
		const pos = screenToFlowPosition({
			x: e.clientX,
			y: e.clientY
		});
		addDeviceAt(kind, {
			x: pos.x - 48,
			y: pos.y - 39
		});
	}, [screenToFlowPosition, addDeviceAt]);
	return /* @__PURE__ */ jsxs(index, {
		nodes,
		edges,
		nodeTypes,
		edgeTypes,
		onNodesChange,
		onEdgesChange,
		onConnect,
		onNodeClick: (_, n) => select(n.id),
		onPaneClick: () => select(null),
		onNodeDoubleClick: (_, n) => {
			if (n.data.kind !== "switch") openTerminal(n.id);
		},
		onDrop,
		onDragOver: (e) => {
			e.preventDefault();
			e.dataTransfer.dropEffect = "move";
		},
		connectionMode: ConnectionMode.Loose,
		connectionRadius: 45,
		deleteKeyCode: ["Backspace", "Delete"],
		defaultEdgeOptions: { type: "floating" },
		minZoom: .25,
		maxZoom: 2.5,
		fitView: true,
		fitViewOptions: {
			padding: .25,
			maxZoom: 1.25
		},
		children: [
			/* @__PURE__ */ jsx(Background, {
				gap: 26,
				size: 1.6
			}),
			/* @__PURE__ */ jsx(Controls, { showInteractive: false }),
			/* @__PURE__ */ jsx(MiniMap, {
				pannable: true,
				zoomable: true,
				nodeColor: (n) => MINIMAP_COLORS[n.data.kind] ?? "#888",
				maskColor: "rgba(10, 15, 28, 0.72)",
				bgColor: "#0d1526"
			}),
			/* @__PURE__ */ jsx(PacketLayer, {})
		]
	});
}
// src/components/Palette.tsx
var ITEMS = [
	{
		kind: "host",
		label: "Host",
		blurb: "Linux workstation"
	},
	{
		kind: "server",
		label: "Server",
		blurb: "DHCP / DNS / web services"
	},
	{
		kind: "switch",
		label: "Switch",
		blurb: "L2 learning switch"
	},
	{
		kind: "router",
		label: "Router",
		blurb: "IP forwarding on"
	},
	{
		kind: "firewall",
		label: "Firewall",
		blurb: "router + nftables ready"
	},
	{
		kind: "ap",
		label: "Wi-Fi AP",
		blurb: "wireless bridge (SSID)"
	}
];
function Palette() {
	const addDeviceAt = useStore((s) => s.addDeviceAt);
	const nodeCount = useStore((s) => s.nodes.length);
	const onDragStart = (e, kind) => {
		e.dataTransfer.setData("application/netsim", kind);
		e.dataTransfer.effectAllowed = "move";
	};
	return /* @__PURE__ */ jsxs("aside", {
		className: "palette",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "palette-title",
				children: "Devices"
			}),
			ITEMS.map((it) => /* @__PURE__ */ jsxs("button", {
				className: `palette-item kind-${it.kind}`,
				draggable: true,
				onDragStart: (e) => onDragStart(e, it.kind),
				onClick: () => addDeviceAt(it.kind, {
					x: 140 + nodeCount % 5 * 60,
					y: 120 + nodeCount % 7 * 50
				}),
				title: "Drag onto the canvas, or click to add",
				children: [/* @__PURE__ */ jsx("span", {
					className: "palette-item-icon",
					children: /* @__PURE__ */ jsx(DeviceIcon, {
						kind: it.kind,
						size: 22
					})
				}), /* @__PURE__ */ jsxs("span", {
					className: "palette-item-text",
					children: [/* @__PURE__ */ jsx("span", {
						className: "palette-item-label",
						children: it.label
					}), /* @__PURE__ */ jsx("span", {
						className: "palette-item-blurb",
						children: it.blurb
					})]
				})]
			}, it.kind)),
			/* @__PURE__ */ jsx("div", {
				className: "palette-hint",
				children: "Drag between the dots on two devices to cable them. Double-click a host or router for its terminal."
			})
		]
	});
}
// src/components/Inspector.tsx
function CommitInput({ value, placeholder, onCommit, mono = true, width }) {
	const setNotice = useStore((s) => s.setNotice);
	const [text, setText] = useState(value);
	const commit = () => {
		if (text.trim() === value) return;
		const err = onCommit(text) ?? null;
		if (err) {
			setNotice(err);
			setText(value);
		}
	};
	return /* @__PURE__ */ jsx("input", {
		className: "iface-ip",
		style: {
			fontFamily: mono ? void 0 : "inherit",
			width
		},
		placeholder,
		value: text,
		onChange: (e) => setText(e.target.value),
		onBlur: commit,
		onKeyDown: (e) => {
			if (e.key === "Enter") e.target.blur();
		}
	});
}
function DhcpPanel({ device }) {
	const toggle = useStore((s) => s.toggleDhcpServer);
	const setField = useStore((s) => s.setDhcpField);
	const cfg = device.dhcpServer;
	return /* @__PURE__ */ jsxs("details", {
		className: "svc",
		open: cfg?.enabled,
		children: [
			/* @__PURE__ */ jsxs("summary", { children: ["DHCP server ", /* @__PURE__ */ jsx("span", {
				className: `svc-state ${cfg?.enabled ? "on" : ""}`,
				children: cfg?.enabled ? "on" : "off"
			})] }),
			/* @__PURE__ */ jsxs("label", {
				className: "svc-toggle",
				children: [/* @__PURE__ */ jsx("input", {
					type: "checkbox",
					checked: cfg?.enabled ?? false,
					onChange: () => toggle(device.id)
				}), "serve leases on this device"]
			}),
			cfg && /* @__PURE__ */ jsxs(Fragment$1, { children: [
				/* @__PURE__ */ jsxs("div", {
					className: "svc-grid",
					children: [
						/* @__PURE__ */ jsx("span", { children: "range" }),
						/* @__PURE__ */ jsx(CommitInput, {
							value: ipToString(cfg.rangeStart),
							onCommit: (t) => setField(device.id, "rangeStart", t)
						}, device.id + ipToString(cfg.rangeStart)),
						/* @__PURE__ */ jsx("span", { children: "to" }),
						/* @__PURE__ */ jsx(CommitInput, {
							value: ipToString(cfg.rangeEnd),
							onCommit: (t) => setField(device.id, "rangeEnd", t)
						}, device.id + ipToString(cfg.rangeEnd)),
						/* @__PURE__ */ jsx("span", { children: "router" }),
						/* @__PURE__ */ jsx(CommitInput, {
							value: cfg.router !== null ? ipToString(cfg.router) : "",
							placeholder: "none advertised",
							onCommit: (t) => setField(device.id, "router", t)
						}, device.id + (cfg.router ?? "r")),
						/* @__PURE__ */ jsx("span", { children: "dns" }),
						/* @__PURE__ */ jsx(CommitInput, {
							value: cfg.dns !== null ? ipToString(cfg.dns) : "",
							placeholder: "none advertised",
							onCommit: (t) => setField(device.id, "dns", t)
						}, device.id + (cfg.dns ?? "d"))
					]
				}),
				cfg.leases.size > 0 && /* @__PURE__ */ jsx("pre", {
					className: "table-pre",
					children: [...cfg.leases.entries()].map(([mac, ip]) => `${ipToString(ip)}  ${mac}\n`).join("")
				}),
				/* @__PURE__ */ jsx("span", {
					className: "hint",
					children: "Clients run `dhclient` to get a lease."
				})
			] })
		]
	});
}
function DnsPanel({ device }) {
	const toggle = useStore((s) => s.toggleDnsServer);
	const setRecords = useStore((s) => s.setDnsRecords);
	const setNotice = useStore((s) => s.setNotice);
	const cfg = device.dnsServer;
	const current = cfg ? [...cfg.records.entries()].map(([n, a]) => `${ipToString(a)} ${n}`).join("\n") : "";
	const [text, setText] = useState(current);
	return /* @__PURE__ */ jsxs("details", {
		className: "svc",
		open: cfg?.enabled,
		children: [
			/* @__PURE__ */ jsxs("summary", { children: ["DNS server ", /* @__PURE__ */ jsx("span", {
				className: `svc-state ${cfg?.enabled ? "on" : ""}`,
				children: cfg?.enabled ? "on" : "off"
			})] }),
			/* @__PURE__ */ jsxs("label", {
				className: "svc-toggle",
				children: [/* @__PURE__ */ jsx("input", {
					type: "checkbox",
					checked: cfg?.enabled ?? false,
					onChange: () => toggle(device.id)
				}), "answer A-record queries on udp/53"]
			}),
			cfg && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("textarea", {
				className: "svc-textarea",
				placeholder: "records, /etc/hosts style:\n10.0.0.20 web.lan",
				value: text,
				onChange: (e) => setText(e.target.value),
				onBlur: () => {
					if (text === current) return;
					const err = setRecords(device.id, text);
					if (err) {
						setNotice(err);
						setText(current);
					}
				}
			}), /* @__PURE__ */ jsx("span", {
				className: "hint",
				children: "One record per line: <ip> <name> — query with `dig`."
			})] })
		]
	});
}
function HttpPanel({ device }) {
	const toggle = useStore((s) => s.toggleHttpServer);
	const setPort = useStore((s) => s.setHttpPort);
	const setBody = useStore((s) => s.setHttpBody);
	const cfg = device.httpServer;
	const [body, setBodyText] = useState(cfg?.body ?? "");
	return /* @__PURE__ */ jsxs("details", {
		className: "svc",
		open: cfg?.enabled,
		children: [
			/* @__PURE__ */ jsxs("summary", { children: ["Web server ", /* @__PURE__ */ jsx("span", {
				className: `svc-state ${cfg?.enabled ? "on" : ""}`,
				children: cfg?.enabled ? "on" : "off"
			})] }),
			/* @__PURE__ */ jsxs("label", {
				className: "svc-toggle",
				children: [/* @__PURE__ */ jsx("input", {
					type: "checkbox",
					checked: cfg?.enabled ?? false,
					onChange: () => toggle(device.id)
				}), "serve HTTP"]
			}),
			cfg && /* @__PURE__ */ jsxs(Fragment$1, { children: [
				/* @__PURE__ */ jsxs("div", {
					className: "svc-grid",
					children: [/* @__PURE__ */ jsx("span", { children: "port" }), /* @__PURE__ */ jsx(CommitInput, {
						value: String(cfg.port),
						onCommit: (t) => setPort(device.id, t),
						width: 70
					}, device.id + cfg.port)]
				}),
				/* @__PURE__ */ jsx("textarea", {
					className: "svc-textarea",
					value: body,
					onChange: (e) => setBodyText(e.target.value),
					onBlur: () => setBody(device.id, body)
				}),
				/* @__PURE__ */ jsx("span", {
					className: "hint",
					children: "Fetch it with `curl http://<address>/`."
				})
			] })
		]
	});
}
function ServicesRow({ deviceId, proto }) {
	const setServices = useStore((s) => s.setServices);
	const setNotice = useStore((s) => s.setNotice);
	const device = sim.net.devices.get(deviceId);
	const current = device instanceof IpDevice ? [...device.services[proto]].sort((a, b) => a - b).join(", ") : "";
	const [value, setValue] = useState(current);
	const commit = () => {
		if (value.trim() === current) return;
		const err = setServices(deviceId, proto, value);
		if (err) {
			setNotice(err);
			setValue(current);
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "service-row",
		children: [/* @__PURE__ */ jsx("span", {
			className: "service-proto",
			children: proto
		}), /* @__PURE__ */ jsx("input", {
			className: "iface-ip",
			placeholder: "open ports, e.g. 22, 80",
			value,
			onChange: (e) => setValue(e.target.value),
			onBlur: commit,
			onKeyDown: (e) => {
				if (e.key === "Enter") e.target.blur();
			}
		})]
	});
}
function IfaceRow({ deviceId, ifaceName }) {
	const setIfaceIp = useStore((s) => s.setIfaceIp);
	const toggleIface = useStore((s) => s.toggleIface);
	const setNotice = useStore((s) => s.setNotice);
	const iface = sim.net.devices.get(deviceId)?.getInterface(ifaceName);
	const current = iface?.ip ? cidrToString(iface.ip.addr, iface.ip.prefix) : "";
	const [value, setValue] = useState(current);
	if (!iface) return null;
	const commit = () => {
		if (value.trim() === current) return;
		const err = setIfaceIp(deviceId, ifaceName, value);
		if (err) {
			setNotice(err);
			setValue(current);
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "iface-row",
		children: [
			/* @__PURE__ */ jsx("button", {
				className: `iface-state ${iface.up ? "up" : "down"}`,
				onClick: () => toggleIface(deviceId, ifaceName),
				title: `ip link set ${ifaceName} ${iface.up ? "down" : "up"}`,
				children: iface.up ? "UP" : "DOWN"
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "iface-name",
				children: [
					ifaceName,
					/* @__PURE__ */ jsx("span", {
						className: "iface-mac",
						children: iface.mac
					}),
					iface.link ? null : /* @__PURE__ */ jsx("span", {
						className: "iface-unplugged",
						children: "unplugged"
					})
				]
			}),
			/* @__PURE__ */ jsx("input", {
				className: "iface-ip",
				placeholder: "no address (CIDR)",
				value,
				onChange: (e) => setValue(e.target.value),
				onBlur: commit,
				onKeyDown: (e) => {
					if (e.key === "Enter") e.target.blur();
				}
			})
		]
	});
}
function Inspector() {
	const selected = useStore((s) => s.selected);
	const renameDevice = useStore((s) => s.renameDevice);
	const deleteDevice = useStore((s) => s.deleteDevice);
	const openTerminal = useStore((s) => s.openTerminal);
	useStore((s) => s.uiPulse);
	useStore((s) => s.nodes);
	if (!selected) return null;
	const device = sim.net.devices.get(selected);
	if (!device) return null;
	const ipd = device instanceof IpDevice ? device : null;
	const swd = device instanceof SwitchDevice ? device : null;
	return /* @__PURE__ */ jsxs("aside", {
		className: "inspector",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "inspector-head",
				children: [/* @__PURE__ */ jsx("input", {
					className: "inspector-name",
					defaultValue: device.name,
					onBlur: (e) => renameDevice(device.id, e.target.value),
					onKeyDown: (e) => {
						if (e.key === "Enter") e.target.blur();
					}
				}, device.id + device.name), /* @__PURE__ */ jsx("span", {
					className: `inspector-kind kind-${device.kind}`,
					children: device.kind
				})]
			}),
			ipd && /* @__PURE__ */ jsxs("div", {
				className: "inspector-forwarding",
				children: [
					"IP forwarding: ",
					/* @__PURE__ */ jsx("strong", { children: ipd.forwarding ? "on" : "off" }),
					/* @__PURE__ */ jsx("span", {
						className: "hint",
						children: " (sysctl net.ipv4.ip_forward)"
					})
				]
			}),
			ipd && (device.kind === "router" || device.kind === "firewall") && /* @__PURE__ */ jsxs("label", {
				className: "svc-toggle",
				style: { margin: 0 },
				children: [/* @__PURE__ */ jsx("input", {
					type: "checkbox",
					checked: ipd.ripEnabled,
					onChange: () => useStore.getState().toggleRip(device.id)
				}), "RIP routing — advertise & learn routes (udp/520 broadcasts)"]
			}),
			swd instanceof ApDevice && /* @__PURE__ */ jsxs("div", {
				className: "svc-grid",
				children: [/* @__PURE__ */ jsx("span", { children: "SSID" }), /* @__PURE__ */ jsx(CommitInput, {
					value: swd.ssid,
					onCommit: (t) => useStore.getState().setSsid(device.id, t),
					mono: false
				}, device.id + swd.ssid)]
			}),
			/* @__PURE__ */ jsxs("section", { children: [/* @__PURE__ */ jsx("h3", { children: "Interfaces" }), device.interfaces.map((i) => /* @__PURE__ */ jsx(IfaceRow, {
				deviceId: device.id,
				ifaceName: i.name
			}, device.id + i.name + (i.ip ? cidrToString(i.ip.addr, i.ip.prefix) : "-")))] }),
			ipd && /* @__PURE__ */ jsxs("section", { children: [
				/* @__PURE__ */ jsx("h3", { children: "Routing table" }),
				/* @__PURE__ */ jsx("pre", {
					className: "table-pre",
					children: formatRoutes(ipd) || "(empty)\n"
				}),
				/* @__PURE__ */ jsx("h3", { children: "Neighbours (ARP)" }),
				/* @__PURE__ */ jsx("pre", {
					className: "table-pre",
					children: formatNeigh(ipd) || "(empty)\n"
				})
			] }),
			ipd && /* @__PURE__ */ jsxs("section", { children: [/* @__PURE__ */ jsx("h3", { children: "DNS client" }), /* @__PURE__ */ jsxs("div", {
				className: "svc-grid",
				children: [/* @__PURE__ */ jsx("span", { children: "nameserver" }), /* @__PURE__ */ jsx(CommitInput, {
					value: ipd.nameserver !== null ? ipToString(ipd.nameserver) : "",
					placeholder: "none (set by dhclient)",
					onCommit: (t) => useStore.getState().setNameserver(ipd.id, t)
				}, ipd.id + (ipd.nameserver ?? "ns"))]
			})] }),
			ipd && /* @__PURE__ */ jsxs("section", { children: [
				/* @__PURE__ */ jsx("h3", { children: "Services" }),
				/* @__PURE__ */ jsx(DhcpPanel, { device: ipd }, ipd.id + "dhcp"),
				/* @__PURE__ */ jsx(DnsPanel, { device: ipd }, ipd.id + "dns"),
				/* @__PURE__ */ jsx(HttpPanel, { device: ipd }, ipd.id + "http"),
				/* @__PURE__ */ jsx("h3", {
					style: { marginTop: 10 },
					children: "Extra open ports"
				}),
				/* @__PURE__ */ jsx(ServicesRow, {
					deviceId: ipd.id,
					proto: "tcp"
				}, ipd.id + "tcp"),
				/* @__PURE__ */ jsx(ServicesRow, {
					deviceId: ipd.id,
					proto: "udp"
				}, ipd.id + "udp"),
				/* @__PURE__ */ jsx("span", {
					className: "hint",
					children: "Open ports answer TCP connects / accept UDP; test them with nc."
				})
			] }),
			ipd && /* @__PURE__ */ jsxs("section", { children: [
				/* @__PURE__ */ jsxs("h3", { children: ["Firewall (nftables)", /* @__PURE__ */ jsx("button", {
					className: "mini-btn",
					onClick: () => useStore.getState().copyDeviceConfig(ipd.id),
					children: "copy config"
				})] }),
				/* @__PURE__ */ jsx("pre", {
					className: "table-pre",
					children: listRuleset(ipd.fw)
				}),
				ipd.fw.active() && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("h3", { children: "Conntrack" }), /* @__PURE__ */ jsx("pre", {
					className: "table-pre",
					children: formatConntrack(ipd)
				})] }),
				ipd.fwLog.length > 0 && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("h3", { children: "Firewall log (latest first)" }), /* @__PURE__ */ jsx("pre", {
					className: "table-pre fw-log",
					children: ipd.fwLog.slice(0, 12).map((e) => `${(e.t / 1e3).toFixed(1)}s ${e.hook.toUpperCase()} ${e.verdict.toUpperCase()} ${e.pkt}\n    ← ${e.rule}\n`).join("")
				})] })
			] }),
			swd && /* @__PURE__ */ jsxs("section", { children: [
				/* @__PURE__ */ jsx("h3", { children: "Port VLANs (access)" }),
				swd.interfaces.filter((i) => i.link).map((i) => /* @__PURE__ */ jsxs("div", {
					className: "service-row",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "service-proto",
							children: i.name
						}),
						/* @__PURE__ */ jsxs("span", {
							className: "hint",
							style: { width: 90 },
							children: ["→ ", sim.net.links.get(i.link.id) ? i.link.other(i).device.name : "?"]
						}),
						/* @__PURE__ */ jsx(CommitInput, {
							value: String(swd.vlanOf(i.name)),
							onCommit: (t) => useStore.getState().setPortVlan(device.id, i.name, t),
							width: 64
						})
					]
				}, device.id + i.name + swd.vlanOf(i.name))),
				swd.interfaces.every((i) => !i.link) && /* @__PURE__ */ jsx("span", {
					className: "hint",
					children: "no connected ports"
				}),
				/* @__PURE__ */ jsx("h3", {
					style: { marginTop: 10 },
					children: "MAC address table"
				}),
				/* @__PURE__ */ jsx("pre", {
					className: "table-pre",
					children: swd.macTable.size ? [...swd.macTable.entries()].map(([key, port]) => {
						const [vlan, mac] = key.split("|");
						return `vlan ${vlan.padEnd(5)}${mac}  ${port.name}\n`;
					}).join("") : "(empty — forward a frame to teach me)\n"
				})
			] }),
			ipd && /* @__PURE__ */ jsx("section", {
				className: "inspector-arp-note",
				children: /* @__PURE__ */ jsxs("span", {
					className: "hint",
					children: [
						"Addresses set here run the same code as ",
						/* @__PURE__ */ jsx("code", { children: "ip address add" }),
						" in the terminal."
					]
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "inspector-actions",
				children: [ipd && /* @__PURE__ */ jsx("button", {
					className: "btn",
					onClick: () => openTerminal(device.id),
					children: "Open terminal"
				}), /* @__PURE__ */ jsx("button", {
					className: "btn danger",
					onClick: () => deleteDevice(device.id),
					children: "Delete device"
				})]
			})
		]
	});
}
// src/components/TerminalDock.tsx
function TerminalPane({ deviceId, active }) {
	const ref = useRef(null);
	useEffect(() => {
		const device = sim.net.devices.get(deviceId);
		if (!(device instanceof IpDevice) || !ref.current) return;
		const session = getSession(device, { onAfterCommand: () => useStore.getState().refresh() });
		if (!session.opened) {
			session.term.open(ref.current);
			session.opened = true;
		} else if (session.term.element && session.term.element.parentElement !== ref.current) ref.current.appendChild(session.term.element);
		session.fit.fit();
	}, [deviceId]);
	useEffect(() => {
		if (!active) return;
		const device = sim.net.devices.get(deviceId);
		if (!(device instanceof IpDevice)) return;
		const session = getSession(device);
		session.fit.fit();
		session.term.focus();
	}, [active, deviceId]);
	return /* @__PURE__ */ jsx("div", {
		ref,
		className: "term-host",
		style: { display: active ? "block" : "none" }
	});
}
function TerminalDock() {
	const terminals = useStore((s) => s.terminals);
	const activeTerminal = useStore((s) => s.activeTerminal);
	const setActiveTerminal = useStore((s) => s.setActiveTerminal);
	const closeTerminal = useStore((s) => s.closeTerminal);
	useStore((s) => s.uiPulse);
	if (!terminals.length) return null;
	return /* @__PURE__ */ jsxs("div", {
		className: "terminal-dock",
		children: [/* @__PURE__ */ jsx("div", {
			className: "terminal-tabs",
			children: terminals.map((id) => {
				const name = sim.net.devices.get(id)?.name ?? id;
				return /* @__PURE__ */ jsxs("div", {
					className: `terminal-tab${id === activeTerminal ? " active" : ""}`,
					onClick: () => setActiveTerminal(id),
					children: [/* @__PURE__ */ jsx("span", { children: name }), /* @__PURE__ */ jsx("button", {
						className: "tab-close",
						onClick: (e) => {
							e.stopPropagation();
							closeTerminal(id);
						},
						title: "Close terminal",
						children: "×"
					})]
				}, id);
			})
		}), /* @__PURE__ */ jsx("div", {
			className: "terminal-body",
			children: terminals.map((id) => /* @__PURE__ */ jsx(TerminalPane, {
				deviceId: id,
				active: id === activeTerminal
			}, id))
		})]
	});
}
// src/components/Toolbar.tsx
var USER_GUIDE_URL = "https://github.com/michael-borck/netsim/blob/main/docs/USER_GUIDE.md";
function ExportItem({ label, hint, action, close }) {
	const fn = useStore((s) => s[action]);
	return /* @__PURE__ */ jsxs("button", {
		className: "labs-menu-item",
		onClick: () => {
			fn();
			close(false);
		},
		children: [/* @__PURE__ */ jsx("span", {
			className: "labs-menu-title",
			children: label
		}), /* @__PURE__ */ jsx("span", {
			className: "labs-menu-blurb",
			children: hint
		})]
	});
}
function Toolbar() {
	const [labsOpen, setLabsOpen] = useState(false);
	const [exportOpen, setExportOpen] = useState(false);
	const loadBundledLab = useStore((s) => s.loadBundledLab);
	const loadExample = useStore((s) => s.loadExample);
	const clock = useStore((s) => s.clock);
	const paused = useStore((s) => s.paused);
	const speed = useStore((s) => s.speed);
	const notice = useStore((s) => s.notice);
	const setPaused = useStore((s) => s.setPaused);
	const setSpeed = useStore((s) => s.setSpeed);
	const newTopology = useStore((s) => s.newTopology);
	const loadDemo = useStore((s) => s.loadDemo);
	const importJson = useStore((s) => s.importJson);
	const shareUrl = useStore((s) => s.shareUrl);
	const setNotice = useStore((s) => s.setNotice);
	const fileRef = useRef(null);
	const onFile = async (f) => {
		if (!f) return;
		const err = importJson(await f.text());
		if (err) setNotice(`Import failed: ${err}`);
		if (fileRef.current) fileRef.current.value = "";
	};
	return /* @__PURE__ */ jsxs("header", {
		className: "toolbar",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "brand",
				children: [/* @__PURE__ */ jsx("span", {
					className: "brand-name",
					children: "NetSim"
				}), /* @__PURE__ */ jsx("span", {
					className: "brand-sub",
					children: "real Linux syntax · in your browser"
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "toolbar-group",
				children: [
					/* @__PURE__ */ jsx("button", {
						className: "btn",
						onClick: () => newTopology(),
						children: "New"
					}),
					/* @__PURE__ */ jsx("button", {
						className: "btn",
						onClick: () => loadDemo(),
						children: "Demo"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "labs-menu-wrap",
						children: [/* @__PURE__ */ jsx("button", {
							className: "btn",
							onClick: () => setLabsOpen((v) => !v),
							children: "Labs ▾"
						}), labsOpen && /* @__PURE__ */ jsxs("div", {
							className: "labs-menu",
							onMouseLeave: () => setLabsOpen(false),
							children: [
								LABS.map((l, i) => /* @__PURE__ */ jsxs("button", {
									className: "labs-menu-item",
									onClick: () => {
										loadBundledLab(i);
										setLabsOpen(false);
									},
									children: [/* @__PURE__ */ jsx("span", {
										className: "labs-menu-title",
										children: l.lab.title
									}), /* @__PURE__ */ jsx("span", {
										className: "labs-menu-blurb",
										children: l.lab.blurb
									})]
								}, l.lab.id)),
								/* @__PURE__ */ jsx("div", {
									className: "labs-menu-section",
									children: "Example networks"
								}),
								EXAMPLES.map((ex, i) => /* @__PURE__ */ jsxs("button", {
									className: "labs-menu-item",
									onClick: () => {
										loadExample(i);
										setLabsOpen(false);
									},
									children: [/* @__PURE__ */ jsx("span", {
										className: "labs-menu-title",
										children: ex.title
									}), /* @__PURE__ */ jsx("span", {
										className: "labs-menu-blurb",
										children: ex.blurb
									})]
								}, ex.title)),
								/* @__PURE__ */ jsx("div", {
									className: "labs-menu-note",
									children: "Loading a lab or example replaces the current canvas."
								})
							]
						})]
					}),
					/* @__PURE__ */ jsx("button", {
						className: "btn",
						onClick: () => fileRef.current?.click(),
						children: "Import"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "labs-menu-wrap",
						children: [/* @__PURE__ */ jsx("button", {
							className: "btn",
							onClick: () => setExportOpen((v) => !v),
							children: "Export ▾"
						}), exportOpen && /* @__PURE__ */ jsxs("div", {
							className: "labs-menu export-menu",
							onMouseLeave: () => setExportOpen(false),
							children: [
								/* @__PURE__ */ jsx(ExportItem, {
									label: "Topology (.json)",
									hint: "save/share/import in NetSim",
									action: "exportJson",
									close: setExportOpen
								}),
								/* @__PURE__ */ jsx(ExportItem, {
									label: "Device configs (.zip)",
									hint: "real setup.sh, nftables.conf, dnsmasq.conf per device",
									action: "exportConfigs",
									close: setExportOpen
								}),
								/* @__PURE__ */ jsx(ExportItem, {
									label: "containerlab (.clab.yml)",
									hint: "deploy the design with real containers",
									action: "exportContainerlab",
									close: setExportOpen
								}),
								/* @__PURE__ */ jsx(ExportItem, {
									label: "docker-compose (.yml)",
									hint: "approximate L2 — see file header",
									action: "exportCompose",
									close: setExportOpen
								}),
								/* @__PURE__ */ jsx(ExportItem, {
									label: "Diagram (.svg)",
									hint: "documentation-grade topology drawing",
									action: "exportSvg",
									close: setExportOpen
								}),
								/* @__PURE__ */ jsx(ExportItem, {
									label: "Diagram (.png)",
									hint: "same drawing, rasterised 2×",
									action: "exportPng",
									close: setExportOpen
								}),
								/* @__PURE__ */ jsx(ExportItem, {
									label: "Network report (.html)",
									hint: "printable design document with tables + diagram",
									action: "exportReport",
									close: setExportOpen
								})
							]
						})]
					}),
					/* @__PURE__ */ jsx("button", {
						className: "btn",
						onClick: () => shareUrl(),
						children: "Share link"
					}),
					/* @__PURE__ */ jsx("a", {
						className: "btn",
						href: USER_GUIDE_URL,
						target: "_blank",
						rel: "noopener noreferrer",
						children: "Help"
					}),
					/* @__PURE__ */ jsx("input", {
						ref: fileRef,
						type: "file",
						accept: "application/json",
						style: { display: "none" },
						onChange: (e) => onFile(e.target.files?.[0])
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "toolbar-group sim-controls",
				children: [
					/* @__PURE__ */ jsx("button", {
						className: "btn",
						onClick: () => setPaused(!paused),
						title: paused ? "Resume" : "Pause",
						children: paused ? "▶ Run" : "⏸ Pause"
					}),
					/* @__PURE__ */ jsxs("select", {
						className: "speed",
						value: speed,
						onChange: (e) => setSpeed(Number(e.target.value)),
						children: [
							/* @__PURE__ */ jsx("option", {
								value: .25,
								children: "0.25×"
							}),
							/* @__PURE__ */ jsx("option", {
								value: .5,
								children: "0.5×"
							}),
							/* @__PURE__ */ jsx("option", {
								value: 1,
								children: "1×"
							}),
							/* @__PURE__ */ jsx("option", {
								value: 2,
								children: "2×"
							}),
							/* @__PURE__ */ jsx("option", {
								value: 4,
								children: "4×"
							})
						]
					}),
					/* @__PURE__ */ jsxs("span", {
						className: "clock",
						children: [
							"t = ",
							(clock / 1e3).toFixed(1),
							"s"
						]
					})
				]
			}),
			notice && /* @__PURE__ */ jsx("div", {
				className: "notice",
				children: notice
			})
		]
	});
}
// src/components/LabPanel.tsx
function Rich({ text }) {
	return /* @__PURE__ */ jsx(Fragment$1, { children: text.split("\n").map((line, li) => /* @__PURE__ */ jsx("p", {
		className: "lab-line",
		children: line.split("`").map((part, i) => i % 2 ? /* @__PURE__ */ jsx("code", { children: part }, i) : /* @__PURE__ */ jsx(Fragment, { children: part }, i))
	}, li)) });
}
function LabPanel() {
	const lab = useStore((s) => s.lab);
	const stepIdx = useStore((s) => s.labStep);
	const results = useStore((s) => s.labResults);
	const checking = useStore((s) => s.labChecking);
	const quizAnswers = useStore((s) => s.quizAnswers);
	const setLabStep = useStore((s) => s.setLabStep);
	const answerQuiz = useStore((s) => s.answerQuiz);
	const checkStep = useStore((s) => s.checkStep);
	const exportAttempt = useStore((s) => s.exportAttempt);
	const closeLab = useStore((s) => s.closeLab);
	const [collapsed, setCollapsed] = useState(false);
	if (!lab) return null;
	const step = lab.steps[stepIdx];
	const allObjectives = lab.steps.flatMap((s) => s.objectives);
	const passed = allObjectives.filter((o) => results[o.id]?.pass).length;
	if (collapsed) return /* @__PURE__ */ jsxs("button", {
		className: "lab-pill",
		onClick: () => setCollapsed(false),
		children: [
			lab.title,
			" · ",
			passed,
			"/",
			allObjectives.length,
			" ▸"
		]
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "lab-panel",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "lab-head",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "lab-title",
						children: lab.title
					}),
					/* @__PURE__ */ jsx("button", {
						className: "tab-close",
						title: "Collapse",
						onClick: () => setCollapsed(true),
						children: "–"
					}),
					/* @__PURE__ */ jsx("button", {
						className: "tab-close",
						title: "Close lab (keeps the topology)",
						onClick: () => closeLab(),
						children: "×"
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "lab-progress",
				children: [/* @__PURE__ */ jsx("div", {
					className: "lab-progress-bar",
					children: /* @__PURE__ */ jsx("div", {
						className: "lab-progress-fill",
						style: { width: `${allObjectives.length ? passed / allObjectives.length * 100 : 0}%` }
					})
				}), /* @__PURE__ */ jsxs("span", { children: [
					passed,
					"/",
					allObjectives.length,
					" objectives"
				] })]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "lab-stepnav",
				children: [
					/* @__PURE__ */ jsx("button", {
						className: "btn",
						disabled: stepIdx === 0,
						onClick: () => setLabStep(stepIdx - 1),
						children: "‹"
					}),
					/* @__PURE__ */ jsxs("span", { children: [
						"Step ",
						stepIdx + 1,
						" of ",
						lab.steps.length,
						": ",
						/* @__PURE__ */ jsx("strong", { children: step.title })
					] }),
					/* @__PURE__ */ jsx("button", {
						className: "btn",
						disabled: stepIdx >= lab.steps.length - 1,
						onClick: () => setLabStep(stepIdx + 1),
						children: "›"
					})
				]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "lab-body",
				children: /* @__PURE__ */ jsx(Rich, { text: step.body })
			}),
			step.objectives.length > 0 && /* @__PURE__ */ jsxs("div", {
				className: "lab-objectives",
				children: [step.objectives.map((o) => {
					const r = results[o.id];
					const state = r === void 0 ? "todo" : r.pass ? "pass" : "fail";
					return /* @__PURE__ */ jsxs("div", {
						className: `lab-objective ${state}`,
						children: [/* @__PURE__ */ jsx("span", {
							className: "lab-obj-mark",
							children: state === "pass" ? "✓" : state === "fail" ? "✗" : "○"
						}), /* @__PURE__ */ jsxs("span", { children: [o.label, r && !r.pass && /* @__PURE__ */ jsxs("span", {
							className: "lab-obj-detail",
							children: [" — ", r.detail]
						})] })]
					}, o.id);
				}), /* @__PURE__ */ jsx("button", {
					className: "btn lab-check",
					disabled: checking,
					onClick: () => checkStep(),
					children: checking ? "Checking (watch the packets)…" : "Check objectives"
				})]
			}),
			step.quiz?.map((q, qi) => {
				const qid = `${lab.id}-${stepIdx}-${qi}`;
				const chosen = quizAnswers[qid];
				return /* @__PURE__ */ jsxs("div", {
					className: "lab-quiz",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "lab-quiz-q",
							children: q.q
						}),
						q.options.map((opt, oi) => {
							const isChosen = chosen === oi;
							const cls = isChosen ? oi === q.answer ? "correct" : "wrong" : "";
							return /* @__PURE__ */ jsxs("label", {
								className: `lab-quiz-opt ${cls}`,
								children: [/* @__PURE__ */ jsx("input", {
									type: "radio",
									name: qid,
									checked: isChosen,
									onChange: () => answerQuiz(qid, oi)
								}), opt]
							}, oi);
						}),
						chosen !== void 0 && /* @__PURE__ */ jsx("div", {
							className: `lab-quiz-verdict ${chosen === q.answer ? "correct" : "wrong"}`,
							children: chosen === q.answer ? "Correct." : "Not quite — try again."
						})
					]
				}, qid);
			}),
			/* @__PURE__ */ jsx("div", {
				className: "lab-footer",
				children: /* @__PURE__ */ jsx("button", {
					className: "btn",
					onClick: () => exportAttempt(),
					children: "Export attempt for submission"
				})
			})
		]
	});
}
// src/App.tsx
function App() {
	const selected = useStore((s) => s.selected);
	const hasTerminals = useStore((s) => s.terminals.length > 0);
	return /* @__PURE__ */ jsx(ReactFlowProvider, { children: /* @__PURE__ */ jsxs("div", {
		className: `app${hasTerminals ? " with-dock" : ""}`,
		children: [
			/* @__PURE__ */ jsx(Toolbar, {}),
			/* @__PURE__ */ jsxs("div", {
				className: "main",
				children: [
					/* @__PURE__ */ jsx(Palette, {}),
					/* @__PURE__ */ jsxs("div", {
						className: "canvas",
						children: [/* @__PURE__ */ jsx(Flow, {}), /* @__PURE__ */ jsx(LabPanel, {})]
					}),
					selected && /* @__PURE__ */ jsx(Inspector, {})
				]
			}),
			/* @__PURE__ */ jsx(TerminalDock, {})
		]
	}) });
}
// src/ui/EduNetwork.tsx
var booted = false;
/** The whole network lab: canvas, palette, inspector, terminals and the lab panel. Fills its parent. */
function EduNetwork() {
	useEffect(() => {
		if (booted) return;
		booted = true;
		useStore.getState().boot();
	}, []);
	return /* @__PURE__ */ jsx(App, {});
}
export { EduNetwork };
