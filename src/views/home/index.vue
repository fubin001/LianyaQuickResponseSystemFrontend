<template>
  <div class="errPage-container">
    <!-- <el-button icon="el-icon-arrow-left" class="pan-back-btn" @click="back">
        返回
      </el-button> -->
    <el-row>
      <el-col :span="12">
        <FeedbackOrderWeek></FeedbackOrderWeek>
      </el-col>
      <el-col :span="12">
         <FeedbackOrder></FeedbackOrder>
      </el-col>
      <el-col :span="12">
         <SaleOrder></SaleOrder>
      </el-col>
      <el-col :span="12">
         <BuyOrder></BuyOrder>
      </el-col>
    </el-row>
  </div>
</template>
<style scoped></style>

<script>
import axios from 'axios'
import Temperature from './temperature.vue';
import FeedbackOrder from './feedbackOrder.vue';
import FeedbackOrderWeek from './feedbackOrderWeek.vue';
import SaleOrder from './saleOrder.vue';
import BuyOrder from './buyOrder.vue';

export default {
  name: 'home',
  components: {
    Temperature,
    FeedbackOrder,
    FeedbackOrderWeek,
    SaleOrder,
    BuyOrder,
  },
  data() {
    return {
      newTime: '',
      openweathermap: {
        weather: [
          { description: '....', }
        ],
        main: {
          temp: 0,
        },
      },
      weatherico: 0,
    }
  },

  async created() {
    await axios('https://api.openweathermap.org/data/2.5/weather?q=hefei&appid=29ce1c9da84c9e2bade5556ff6e63acb&lang=zh_cn').then((res) => {
      console.log(1);
      this.openweathermap = res.data
      console.log(res.data);
    }).finally(() => {
      this.onweatherico()
    })
  },
  mounted() {
    this.getNowTime();//进入页面调用该方法获取当前时间
    clearInterval(myTimeDisplay);//销毁之前定时器
    var myTimeDisplay = setInterval(() => {
      this.getNowTime(); //每秒更新一次时间
    }, 1000);
  },

  methods: {
    getNowTime() {
      var date = new Date();
      var time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
      this.newTime = time;
    },
    //根据自己的需求，看要不要在时间不大于10的时候在前面补0，如果需要直接this.addZero(date.getMinutes()),其它与之相同，如果不需要删掉addZero（）方法即可。
    //小于10的拼接上0字符串
    addZero(s) {
      return s < 10 ? ('0' + s) : s;
    },
    //判断展示天气类型
    onweatherico() {
      console.log(this.openweathermap.weather[0].description);
      if (this.openweathermap.weather[0].description.indexOf("晴") != -1) {
        this.weatherico = 1
      } else if (this.openweathermap.weather[0].description.indexOf("云") != -1) {
        this.weatherico = 2
      } else if (this.openweathermap.weather[0].description.indexOf("阴") != -1) {
        this.weatherico = 3
      } else if (this.openweathermap.weather[0].description.indexOf("雷") != -1) {
        this.weatherico = 5
      } else if (this.openweathermap.weather[0].description.indexOf("雨") != -1) {
        this.weatherico = 6
      } else {
        this.weatherico = 0
      }

    },
  }
}
</script>

<style lang="scss" scoped></style>