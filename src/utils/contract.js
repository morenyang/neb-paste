/**
 * Created by morenyang on 2018/6/7.
 */
"use strict";

var Item = function (text) {
  if (text) {
    var obj = JSON.parse(text);
    this.key = obj.key;
    this.value = obj.value;
    this.author = obj.author;
  } else {
    this.key = "";
    this.author = "";
    this.value = "";
  }
};

Item.prototype = {
  toString: function () {
    return JSON.stringify(this);
  }
};

var Clipboard = function () {
  LocalContractStorage.defineMapProperty(this, "repo", {
    parse: function (text) {
      return new Item(text);
    },
    stringify: function (o) {
      return o.toString();
    }
  });
};

Clipboard.prototype = {
  init: function () {
    // todo
  },

  save: function (key, value) {

    key = key.trim();
    value = value.trim();
    if (key === "" || value === "") {
      throw new Error("empty key / value");
    }

    var from = Blockchain.transaction.from;
    var item = this.repo.get(key);
    if (item) {
      throw new Error("value has been occupied");
    }

    item = new Item();
    item.author = from;
    item.key = key;
    item.value = value;

    this.repo.put(key, item);
  },

  get: function (key) {
    key = key.trim();
    if (key === "") {
      throw new Error("empty key")
    }
    return this.repo.get(key);
  }
};
module.exports = Clipboard;
