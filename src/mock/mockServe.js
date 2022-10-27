import Mock from "mockjs";
import datas from './datas.json'
Mock.mock('http://127.0.0.1:8888/api/private/v1/users','get',datas)
