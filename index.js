function x(source, shim) {
  const BASEI_SOURCE = source.split('');
  const BASEI_SOURCE_LENGTH = BASEI_SOURCE.length;
  const BASEI_SOURCE_MAP = {};
  BASEI_SOURCE.forEach((str, i) => BASEI_SOURCE_MAP[str] = i);
  const basei = {
    encrypt: (num) => {
      num = Math.max(Number(num) || 0, 0);
      let code = '';
      while (num > 0) {
        const mod = num % BASEI_SOURCE_LENGTH;
        code += BASEI_SOURCE[mod];
        num = (num - mod) / BASEI_SOURCE_LENGTH;
      }
      return code;
    },
    decrypt: (code) => {
      if (typeof code !== 'string') return 0;
      let num = 0;
      for (let i = 0; i < code.length; i++) {
        if (typeof BASEI_SOURCE_MAP[code.charAt(i)] !== 'number') return 0;
        num += BASEI_SOURCE_MAP[code.charAt(i)] * Math.pow(BASEI_SOURCE_LENGTH, i);
      }
      return num;
    },
  };

  const ID_CODE_LENGTH = 6;
  const ID_SHIM = shim; // 补全分割符
  const ID_RANGE = '-'.repeat(ID_CODE_LENGTH + 1).split('').map((s, i) => Math.pow(BASEI_SOURCE_LENGTH, i) - 1);
  const ID_PAD = (id, code) => {
    let code_pad = '';
    const code_length = code.length;
    if (code_length > 0 && code_length < ID_CODE_LENGTH) {
      code_pad += ID_SHIM;
      if (code_length < ID_CODE_LENGTH) {
        const fill_length = ID_CODE_LENGTH - code_length - 1;
        const fill_min = ID_RANGE[fill_length - 1] + 1;
        const fill_range = ID_RANGE[fill_length] - fill_min;
        const curr_min = ID_RANGE[code_length - 1] + 1;
        const curr_range = ID_RANGE[code_length] - curr_min;
        if (curr_range > fill_range) {
          code_pad += basei.encrypt(fill_min + (id - curr_min) % fill_range)
        } else {
          code_pad += basei.encrypt(fill_min + id - curr_min)
        }
      }
    }
    return code_pad;
  };

  return {
    encrypt: function(id) {
      id = Math.max(Number(id) || 0, 0);
      let code = basei.encrypt(id);
      return code + ID_PAD(id, code);
    },
    decrypt: function(code) {
      code = String(code || '');
      if (code.length !== ID_CODE_LENGTH) return 0;
      const codes = code.split(ID_SHIM);
      const id = basei.decrypt(codes[0]);
      return ID_PAD(id, codes[0]).substr(1) === (codes[1] || '') ? id : 0;
    }
  }
}

const DEFAULT_SOURCE = 'ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz12345678';
const DEFAULT_SHIM = '9';

exports = module.exports = x(DEFAULT_SOURCE, DEFAULT_SHIM);

exports.x = x;