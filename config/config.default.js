module.exports = {
  // environment
  YLC_NODE_ENV: process.env.YLC_NODE_ENV || 'development',
  YLC_PORT: process.env.YLC_PORT || '3005',
  YLC_DB_URL: process.env.YLC_DB_URL || 'mongodb://localhost/yarn_length_calculate',
  YLC_ADMIN_USER: process.env.YLC_ADMIN_USER || 'admin',
  YLC_ADMIN_PWD: process.env.YLC_ADMIN_PWD || 'esquel888',
  YLC_REDIS_URL: process.env.YLC_REDIS_URL || 'redis://:Car666pool@127.0.0.1:6379/0',

  // static
  needleQtyList: [
    1032,
    1056,
    1200,
    1296,
    1320,
    1416,
    1500,
    1596,
    1656,
    1692,
    1740,
    1800,
    1860,
    1872,
    1920,
    1980,
    2064,
    2088,
    2232,
    2268,
    2460,
    2520,
    2592,
    2628,
    2640,
    3000,
  ],
  gearList: [
    { name: '26-67', ratio: 0.388059701492537 },
    { name: '37-56', ratio: 0.660714285714286 },
    { name: '43-50', ratio: 0.86 },
    { name: '50-43', ratio: 1.16279069767442 },
    { name: '56-37', ratio: 1.51351351351351 },
    { name: '67-26', ratio: 2.57692307692308 }
  ],
  

}