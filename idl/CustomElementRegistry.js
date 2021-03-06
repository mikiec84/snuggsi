"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");

const convertElementDefinitionOptions = require("./ElementDefinitionOptions.js").convert;
const impl = utils.implSymbol;

function CustomElementRegistry() {
  throw new TypeError("Illegal constructor");
}

Object.defineProperty(CustomElementRegistry, "prototype", {
  value: CustomElementRegistry.prototype,
  writable: false,
  enumerable: false,
  configurable: false
});

CustomElementRegistry.prototype.define = function define(name, constructor) {
  if (!this || !module.exports.is(this)) {
    throw new TypeError("Illegal invocation");
  }

  if (arguments.length < 2) {
    throw new TypeError(
      "Failed to execute 'define' on 'CustomElementRegistry': " +
        "2 arguments required, but only " +
        arguments.length +
        " present."
    );
  }

  const args = [];
  for (let i = 0; i < arguments.length && i < 3; ++i) {
    args[i] = arguments[i];
  }

  args[0] = conversions["DOMString"](args[0], {
    context: "Failed to execute 'define' on 'CustomElementRegistry': parameter 1"
  });

  args[1] = conversions["Function"](args[1], {
    context: "Failed to execute 'define' on 'CustomElementRegistry': parameter 2"
  });

  args[2] = convertElementDefinitionOptions(args[2], {
    context: "Failed to execute 'define' on 'CustomElementRegistry': parameter 3"
  });

  return this[impl].define(...args);
};

CustomElementRegistry.prototype.get = function get(name) {
  if (!this || !module.exports.is(this)) {
    throw new TypeError("Illegal invocation");
  }

  if (arguments.length < 1) {
    throw new TypeError(
      "Failed to execute 'get' on 'CustomElementRegistry': " +
        "1 argument required, but only " +
        arguments.length +
        " present."
    );
  }

  const args = [];
  for (let i = 0; i < arguments.length && i < 1; ++i) {
    args[i] = arguments[i];
  }

  args[0] = conversions["DOMString"](args[0], {
    context: "Failed to execute 'get' on 'CustomElementRegistry': parameter 1"
  });

  return this[impl].get(...args);
};

CustomElementRegistry.prototype.whenDefined = function whenDefined(name) {
  if (!this || !module.exports.is(this)) {
    throw new TypeError("Illegal invocation");
  }

  if (arguments.length < 1) {
    throw new TypeError(
      "Failed to execute 'whenDefined' on 'CustomElementRegistry': " +
        "1 argument required, but only " +
        arguments.length +
        " present."
    );
  }

  const args = [];
  for (let i = 0; i < arguments.length && i < 1; ++i) {
    args[i] = arguments[i];
  }

  args[0] = conversions["DOMString"](args[0], {
    context: "Failed to execute 'whenDefined' on 'CustomElementRegistry': parameter 1"
  });

  return utils.tryWrapperForImpl(this[impl].whenDefined(...args));
};

Object.defineProperty(CustomElementRegistry.prototype, Symbol.toStringTag, {
  value: "CustomElementRegistry",
  writable: false,
  enumerable: false,
  configurable: true
});

const iface = {
  // When an interface-module that implements this interface as a mixin is loaded, it will append its own `.is()`
  // method into this array. It allows objects that directly implements *those* interfaces to be recognized as
  // implementing this mixin interface.
  _mixedIntoPredicates: [],
  is(obj) {
    if (obj) {
      if (utils.hasOwn(obj, impl) && obj[impl] instanceof Impl.implementation) {
        return true;
      }
      for (const isMixedInto of module.exports._mixedIntoPredicates) {
        if (isMixedInto(obj)) {
          return true;
        }
      }
    }
    return false;
  },
  isImpl(obj) {
    if (obj) {
      if (obj instanceof Impl.implementation) {
        return true;
      }

      const wrapper = utils.wrapperForImpl(obj);
      for (const isMixedInto of module.exports._mixedIntoPredicates) {
        if (isMixedInto(wrapper)) {
          return true;
        }
      }
    }
    return false;
  },
  convert(obj, { context = "The provided value" } = {}) {
    if (module.exports.is(obj)) {
      return utils.implForWrapper(obj);
    }
    throw new TypeError(`${context} is not of type 'CustomElementRegistry'.`);
  },

  create(constructorArgs, privateData) {
    let obj = Object.create(CustomElementRegistry.prototype);
    obj = this.setup(obj, constructorArgs, privateData);
    return obj;
  },
  createImpl(constructorArgs, privateData) {
    let obj = Object.create(CustomElementRegistry.prototype);
    obj = this.setup(obj, constructorArgs, privateData);
    return utils.implForWrapper(obj);
  },
  _internalSetup(obj) {},
  setup(obj, constructorArgs, privateData) {
    if (!privateData) privateData = {};

    privateData.wrapper = obj;

    this._internalSetup(obj);
    Object.defineProperty(obj, impl, {
      value: new Impl.implementation(constructorArgs, privateData),
      writable: false,
      enumerable: false,
      configurable: true
    });

    obj[impl][utils.wrapperSymbol] = obj;
    if (Impl.init) {
      Impl.init(obj[impl], privateData);
    }
    return obj;
  },
  interface: CustomElementRegistry,
  expose: {
    Window: { CustomElementRegistry }
  }
}; // iface
module.exports = iface;

const Impl = require("../custom-element-registry/CustomElementRegistry-impl.js");
