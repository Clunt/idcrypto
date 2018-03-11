# idcrypto
根据ID(int)生成6位不重复的无序字符串，并可根据字符解析出原ID；用于用户邀请码生成、URL内ID隐藏等场景

## Usage
```js
const idcrypto = require('idcrypto');

// 默认序列
idcrypto.encrypt(1); // B9AAAB
idcrypto.encrypt(123456); // 38n9gp
idcrypto.encrypt(1234567890); // w6W6CC

idcrypto.decrypt('B9AAAB'); // 1
idcrypto.decrypt('38n9gp'); // 123456
idcrypto.decrypt('w6W6CC'); // 1234567890


// 自定序列
idcryptox = idcrypto.x('SRwdQyz12EefgFGabJKL3DuvxHXcAYZn9qrstChijkmMWB45NOPTUV678', 'p');
idcryptox.encrypt(1); // RpSSSR
idcryptox.encrypt(123456); // T8Cpnh
idcryptox.encrypt(1234567890); // B6D6ww

idcrypto.decrypt('RpSSSR'); // 1
idcrypto.decrypt('T8Cpnh'); // 123456
idcrypto.decrypt('B6D6ww'); // 1234567890
```