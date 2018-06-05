export default function (Obj) {
  function isset(plugins, plugin) {
    return plugins.indexOf(plugin) > -1;
  }

  function execute(context, plugin, args) {
    // additional parameters
    args.unshift(context);
    if (typeof plugin.install === 'function') {
      plugin.install(...args);
    } else if (typeof plugin === 'function') {
      plugin(...args);
    }
    return this;
  }

  Obj.use = function use(plugin, ...args) {
    const plugins = this.plugins || (this.plugins = []);
    if (isset(plugins, plugin)) {
      return this;
    }
    execute(this, plugin, args);
    plugins.push(plugin);
    return this;
  };
}
