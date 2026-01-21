// test.js - 小程序功能测试脚本
// 此文件用于验证小程序的基本功能

const testResults = {
  passed: 0,
  failed: 0,
  tests: []
};

function test(name, condition, message = '') {
  if (condition) {
    testResults.passed++;
    testResults.tests.push(`✅ ${name}`);
    console.log(`✅ ${name}`);
  } else {
    testResults.failed++;
    testResults.tests.push(`❌ ${name}: ${message}`);
    console.log(`❌ ${name}: ${message}`);
  }
}

// 测试数据导入
try {
  const { categories, products, mockUser, eventsData } = require('./data/mockData');
  test('数据文件导入', true);
  test('分类数据存在', categories && categories.length > 0);
  test('产品数据存在', products && products.length > 0);
  test('用户数据存在', mockUser && mockUser.id);
  test('活动数据存在', eventsData && eventsData.length > 0);
} catch (error) {
  test('数据文件导入', false, error.message);
}

// 测试全局状态管理
try {
  const app = require('./app.js');
  test('App.js导入', true);
  test('全局数据初始化', app.globalData && typeof app.globalData === 'object');
} catch (error) {
  test('App.js导入', false, error.message);
}

// 输出测试结果
console.log('\n=== 测试结果 ===');
console.log(`通过: ${testResults.passed}`);
console.log(`失败: ${testResults.failed}`);
console.log(`总计: ${testResults.passed + testResults.failed}`);

if (testResults.failed === 0) {
  console.log('🎉 所有测试通过！小程序可以正常运行。');
} else {
  console.log('⚠️  有测试失败，请检查相关文件。');
  console.log('\n失败的测试:');
  testResults.tests.filter(test => test.startsWith('❌')).forEach(test => {
    console.log(test);
  });
}

module.exports = testResults;