
/**
 * Module dependencies.
 */

import _ from 'lodash';

/**
 * Export `maskJson` function.
 */

export default function maskJson(collection, options) {
  options = _.assign({
    replacement: '--REDACTED--'
  }, options);

  return function(values) {
    return _.cloneDeep(values, (value, key) => {
      // Allow cloneDeep to recurse into nested objects.
      if (_.isObject(value)) {
        return;
      }

      // Strip matching keys.
      if (_.contains(collection, key)) {
        return options.replacement;
      }

      // Otherwise, return the value.
      return value;
    });
  };
}
