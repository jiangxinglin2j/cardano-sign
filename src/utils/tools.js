export const subStrFn = (str, preLen, sufLen) => {
  if (
    typeof str !== 'string' ||
    typeof preLen !== 'number' ||
    typeof sufLen !== 'number' ||
    preLen < 1 ||
    sufLen < 1
  )
    return str;
  if (str.length <= preLen + sufLen) return str;
  let text = '';
  text = str.substr(0, preLen) + '...' + str.substr(-sufLen);
  return text;
}

export const formatStrFn = (num) => {
  return num;
}

const tools = {
  subStrFn,
  formatStrFn
}

export default tools;