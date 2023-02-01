/**
 * validate
 */

const validate = {
  /**
   * 手机号
   * @param {} v
   */
  mobile: function(v) {
    if (!v) {
      return "请输入手机号码。";
    }
    if (!/^1\d{10}$/.test(v)) {
      return "请输入正确的手机号码。";
    }
    return true;
  },

  // pwd
  pwd: function(v) {
    return /^(?=.*?[a-zA-Z])(?=.*?[0-9])[a-zA-Z0-9]{8,15}$/.test(v);
  },

  /**
   * 验证中文姓名
   * 字符类型：中文、半角大小写字母、特殊符号“•”；
   * 字符长度：4-20位字符（1个汉字=2个字符）；
   * @param {*} v
   */
  name: function(v, type = "增员姓名") {
    if (!v) {
      return `请输入${type}。`;
    }

    // 判断输入是否符合
    if (!/^[\u4e00-\u9fa5a-zA-Z•]+$/.test(v)) {
      return `请输入正确的${type}。`;
    }
    // 判断长度
    let length = 0;
    //获取中文长度
    const cn = v.match(/([\u4e00-\u9fa5]+)/g);
    if (cn) {
      length = cn.reduce((i, item) => i + item.length, 0) * 2;
    }
    // 获取英文长度
    const en = v.match(/([a-zA-Z]+)/g);
    if (en) {
      length += en.reduce((i, item) => i + item.length, 0);
    }
    // 获取特殊字符长度
    const special = v.match(/([•]+)/g);
    if (special) {
      length += special.reduce((i, item) => i + item.length, 0);
    }
    if (length < 4) {
      return `请输入正确的${type}。`;
    }
    if (length > 20) {
      return `请输入正确的${type}。`;
    }
    return true;
  },

  /**
   * 身份证验证
   * @param {*} v
   */
  IDCard: function(v) {
    // 判断输入是否符合
    ///^\d{17}[\da-zA-Z]{1}$/
    // const idNoReg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    if (!/^\d{17}[\dXx]{1}$/.test(v)) {
      return "请输入正确的身份证号码";
    }
    return true;
  },

  /**
   * 原职业
   * @param {*} v
   */
  oldJob: function(v) {
    if (!/^[\u4e00-\u9fa5、]{0,10}$/.test(v)) {
      return "请输入正确的原职业。";
    }

    return true;
  },

  /**
   * 标签
   */
  tags: function(v) {
    if (
      // eslint-disable-next-line no-useless-escape
      !/^(([\u4e00-\u9fa5]\、{0,1}[\u4e00-\u9fa5])|([\u4e00-\u9fa5])){1,10}$/gi.test(
        v
      )
    ) {
      return "请输入正确的标签。";
    }

    return true;
  }
};

export default validate;
