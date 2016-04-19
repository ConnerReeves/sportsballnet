import emailValidator from 'email-validator';
import { VALIDATION } from './Constants';

export const TEAM_SIZE_MIN = 1;
export const TEAM_SIZE_MAX = 4;

const validateLength = (value, length = 1) => {
  return value.trim().length >= length;
};

const validateRange = (value, min, max) => {
  value = +value;
  return value >= min && value <= max;
};

const rules = {
  name: {
    fn: validateLength
  },
  teamSize: {
    fn: validateRange,
    args: [
      TEAM_SIZE_MIN,
      TEAM_SIZE_MAX
    ]
  },
  email: {
    fn: emailValidator.validate
  }
};

export const validate = (ruleName, value) => {
  const rule = rules[ruleName];
  const args = [value].concat(rule.args || []);
  return rule.fn.apply(null, args);
}
