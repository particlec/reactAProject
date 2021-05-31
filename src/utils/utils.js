
export const isStringValid = (rule, value = '', callback) => {
    if (value === '') {
        callback();
    } else {
        let newValue = value;
        if (rule.allowChinese !== false) {
            // const chineseReg = /[^\x00-\xff]/g;
            const chineseReg = /[\u4e00-\u9fff]/g;
            newValue = value.replace(
                chineseReg,
                rule.replaceChinese ? rule.replaceChinese : 'aa',
            );
        }
        const min = rule.min;
        const max = rule.max;
        const len = newValue.length;

        const reg = new RegExp(`[A-Za-z0-9${rule.allowedChars}]`, 'g');
        const replacedValue = newValue.replace(reg, '');
        if (replacedValue.length > 0) {
            callback(rule.charMsg);
        } else if (len < min || len > max) {
            callback(rule.lenMsg);
        } else {
            callback();
        }
    }
};

// 中文名校验规则
export const getChNameRules = isRequired => {
    return [
        { required: isRequired, message: '请输入内容' },
        {
            max: 30,
            message: '最大长度为30',
        },
        {
            validator: isStringValid,
            allowedChars: '_',
            allowChinese: true,
            charMsg: '仅支持中文、大小写字母、数字和下划线',
        },
        {
            validator: (rule, value, callback) => {
                if (value && !isNaN(Number(value))) {
                    callback('不能全为数字');
                }
                callback();
            },
        },
        {
            validator: (rule, value, callback) => {
                let _value = value.replace(/_/g, '');
                if (_value.length === 0) {
                    callback('不能全为下划线');
                }
                callback();
            },
        },
    ];
};
