export const getLocalData = (key, type = 'json') => {
  if (!key) {
    throw new Error('inp key');
  }
  const data = localStorage.getItem(key);
  if (!data) return null;
  if (type === 'json') {
    return JSON.parse(data);
  }
  return data;
}

export const setLocalData = (key, value) => {
  if (!key || !value) throw new Error('inp key & value');
  localStorage.setItem(key, JSON.stringify(value));
}

export const addLocalArrItem = (key, value) => {
  if (!key || !value) throw new Error('inp key & value');
  let arr = getLocalData(key);
  if (!arr) arr = [];
  arr.push(value);
  setLocalData(key, arr);
}

export const removeLocalArrItem = (key, value) => {
  if (!key || !value) throw new Error('inp key & value');
  let arr = getLocalData(key);
  if (!arr) throw new Error('data[%] is none', key);
  const index = arr.findIndex(v => v === value);
  if (index === -1) throw new Error('% is not in data[%]', value, key);
  arr.splice(index, 1);
  setLocalData(key, arr);
}

export const addLocalObjItem = (name, key, value) => {
  if (!name || !key || !value) throw new Error('inp name & key & value');
  let data = getLocalData(name);
  if (!data) data = {};
  data[key] = value;
  setLocalData(name, data);
}

export const removeLocalObjItem = (name, key) => {
  if (!name || !key) throw new Error('inp name & key');
  let data = getLocalData(name);
  if (!data) throw new Error('data[%] is none', name);
  data = getLocalData(name);
  if (!data[key])  throw new Error('data[%][%] is none', name, key);
  delete data[key];
  setLocalData(name, data);
}

const local = {
  getLocalData,
  setLocalData,
  addLocalArrItem,
  removeLocalArrItem,
  addLocalObjItem,
  removeLocalObjItem
};

export default local;