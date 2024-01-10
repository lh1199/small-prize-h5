<template>
    <div class="container">
      <div class="img1">
        <img src="@/img/add_address/1.jpg" alt="">
      </div>
      <div class="content">
        <img src="@/img/add_address/1.jpg" alt="" class="img1" style="opacity: 0; width: 100%; height: auto; position: relative">
        <div class="content_img">
          <img src="@/img/add_address/2.jpg" alt="">
          <van-form @submit="onSubmit" class="form">
              <van-field
                  v-model="name"
                  name="姓名"
                  label="姓名"
                  placeholder="姓名"
                  :rules="[{ required: true, message: '请填写姓名' }]"
                  class="field"
              />
              <van-field
                  v-model="phone"
                  type="number"
                  name="联系方式"
                  label="联系方式"
                  placeholder="联系方式"
                  :rules="[{ required: true, validator: validatorPhone, message: '请填写联系方式' }]"
                  class="field"
              />
              <div v-if="name && phone">
                <van-field
                  v-model="idCard"
                  type="number"
                  name="身份号码"
                  label="身份号码"
                  placeholder="身份号码"
                  :rules="[{ required: true, validator: validatorIdCard, message: '请填写身份号码' }]"
                  class="field"
                />
                <van-field
                    v-model="diqu"
                    name="地区"
                    label="地区"
                    placeholder="地区"
                    :rules="[{ required: true, message: '请填写地区' }]"
                    class="field_area"
                    right-icon="arrow"
                    @focus="show_area"
                />
                <van-field
                    v-model="address"
                    type="text"
                    name="详细地址"
                    label="详细地址"
                    placeholder="详细地址"
                    :rules="[{ required: true, message: '请填写详细地址' }]"
                    class="field_detail"
                />
              </div>
              <div style="margin-top: 34px;" @click="alert_dialog">
                <van-button round block type="info" native-type="submit" class="button"></van-button>
              </div>
          </van-form>
          <img src="@/img/add_address/3.jpg" alt="">
          <img src="@/img/add_address/4.jpg" alt="">
          <img src="@/img/add_address/arrow.png" alt="">
        </div>
      </div>
      <van-popup v-model:show="areaShow" position="bottom">
        <van-area @confirm="confirm" @cancel="cancel" :area-list="areaList" />
      </van-popup>
    </div>
</template>
<script>
import { showToast, showDialog } from 'vant'
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
import { areaList } from "@vant/area-data";
export default {
  data() {
    return {
        areaShow: false, //控制地区选择组件显隐
        areaList: areaList, //地区数据
        name: '',
        phone: '',
        identify: 'eyJ1c2VySWQiOjE0OTk5ODIxLCJmcm9tIjoxfQ==',
        idCard: '',
        diqu: '',
        address: '',
        province: '',
        city: '',
        district: ''
    };
  },
  created(options) {
    this.identify = this.$route.query.identify
  },
  methods: {
    validatorPhone(val) {
      return new Promise((resolve) => {
        let allow = false
        allow = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(val)
        if (!allow) {
          showToast('请填写正确的号码')
          this.phone = ''
        }
          resolve(allow);
      });
    },
    validatorIdCard(val) {
      return new Promise((resolve) => {
        let allow = false
        allow = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(val)
        if (!allow) {
          showToast('请填写正确的身份证号')
          this.idCard = ''
        }
          resolve(allow);
      });
    },
    alert_dialog() {
    },
    onSubmit(values) {
      let that = this
      axios({
        url: 'https://tp2.shouzhuanpai.com/card-order/submit',
        method: 'post',
        data: {
          identify: that.identify,
          name: that.name,
          phone: that.phone,
          idCard: that.idCard,
          province: that.province,
          city: that.city,
          district: that.district,
          address: that.address
        },
      }).then(res => {
        if (res.data.code == 200) {
          showDialog({
              title: '提交成功',
              message: '请等待卡片邮寄，收到卡片后请及时激活使用哦！',
              theme: 'round-button',
              confirmButtonText: '我知道了'
            }).then(() => {
              // on close
            });
        } else {
          showToast({
            message: res.data.msg,
            className: 'toast'
          })
        }
        // showToast(res.data.msg)
      }).catch(res => {
        showToast({
          message: res.data.msg,
          className: 'toast'
        })
      })
    },
    show_area() {
      this.areaShow = true
    },
    cancel() {
      this.areaShow = false
    },
    confirm(val) {
      let selectedOptions = val.selectedOptions
      this.diqu = selectedOptions[0].text + '-' + selectedOptions[1].text + '-' + selectedOptions[2].text
      this.province = selectedOptions[0].text
      this.city = selectedOptions[1].text
      this.district = selectedOptions[2].text
      this.areaShow = false
    }
  },
};
</script>
<style>
.toast {
  font-size: 20px !important;
}
</style>
<style lang="scss" scoped>
.container {
    width: 100%;
    min-height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items: center;
    .img1 {
      position: fixed;
      top: 0;
      width: 100%;
      height: auto;
      img {
        width: inherit;
      }
    }
    .content {
      position: relative;
      // background: rgb(23, 18, 14);
      overflow: hidden;
      // margin-bottom: 788px;
      img {
        width: 100%;
        height: auto;
      }
      .content_img {
        background: rgb(23, 18, 14);
        .form {
            width: 90%;
            margin: 0 auto;
            margin-bottom: 40px;
            .field {
                border-radius: 50px;
                margin-top: 40px;
            }
            .field_area {
              border-radius: 30px 30px 0 0;
              margin-top: 40px;
            }
            .field_detail {
              border-radius: 0 0 30px 30px;
            }
            .button {
              background: url('../img/add_address/button.png') no-repeat center;
              background-size: 100% 80px;
              border: none;
              height: 80px;
              padding: none !important;
            }
        }
      }
    }
}
</style>