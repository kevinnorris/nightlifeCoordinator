/**
 *
 * @param {String} field  Name of the field
 * @param {String} name   Name to use for the field in error messages
 * @param {Array} validations Array of functions, must return null or an error message builder function
 *    -Uses rest parameters syntax to group all remaining arguments into an Array
 */
export const ruleRunner = (field, name, ...validations) => (
  (state) => {
    // Goes through each validation rule and return the first error message that applies
    // as an object with property field and value the error message
    for (let v of validations) {
      const errorMessageFunc = v(state[field], state);
      if (errorMessageFunc) {
        return {[field]: errorMessageFunc(name)};
      }
    }
    return null;
  }
);

/**
 * Aggregates the results of all the ruleRunner's into one object
 * @param {Object} state    The validation state
 * @param {Array} runners   Array of ruleRunner's
 */
export const run = (state, runners) => (
  runners.reduce((memo, runner) => (
    Object.assign(memo, runner(state))
  ), {})
);

/*
  Error messages
  ----------------
*/

const requiredErr = fieldName => `${fieldName} is required`;

const mustMatchErr = otherFieldName => (
  fieldName => `${fieldName} must match ${otherFieldName}`
);

const minLengthErr = length => (
  fieldName => `${fieldName} must be at least ${length} characters`
);

const cantContainErr = restricted => (
  fieldName => `${fieldName} must not contain ${restricted}, case insensitive`
);

const mustContainErr = require => (
  fieldName => `${fieldName} must contain ${require}`
);

/*
  Rules
  ----------------
*/
export const required = (text) => {
  if (text) {
    return null;
  }
  return requiredErr;
};

export const mustMatch = (field, fieldName) => (
  (text, state) => (
    state[field] === text ? null : mustMatchErr(fieldName)
  )
);

export const minLength = length => (
  text => (
    text.length >= length ? null : minLengthErr(length)
  )
);

/**
 * Returns function that takes text
 *  If fieldNames are supplied checks if text contains state[fieldname] values
 *  If contains none, Checks if text contains strings from restricted array
 *
 * Returns error for first match it encounters, is case insensitive
 *
 * @param {Array} restricted Array of restricted password strings
 * @param {Array} fieldNames Array of prop names in state object
 */
export const cantContain = (restricted, fieldNames = null) => (
  (text, state) => {
    let i = 0;
    if (fieldNames) {
      // return error if text contains contents of one of the passed fieldNames
      for (i = 0; i < fieldNames.length; i += 1) {
        const fieldVal = state[fieldNames[i]].toLowerCase();
        if (text.toLowerCase().includes(fieldVal)) {
          return cantContainErr(fieldVal);
        }
      }
    }
    // returns error with first restricted string found, or null if none found in text
    for (i = 0; i < restricted.length; i += 1) {
      const restrictedPas = restricted[i].toLowerCase();
      if (text.toLowerCase().includes(restrictedPas)) {
        return cantContainErr(restrictedPas);
      }
    }
    return null;
  }
);

export const mustContain = require => (
  text => (
    text.includes(require) ? null : mustContainErr(require)
  )
);

