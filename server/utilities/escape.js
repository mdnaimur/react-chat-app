/*
 * Title:
 * Description:
 * Author: Md Naimur Rahman
 * Date: 11/09/2026
 */

export const escape = function (str) {
  return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};
