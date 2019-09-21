// components/playlist/playlist.js
/*
   数据监听器:当前这个数据发生变化的时候,其实我是能够监听到这个数字变化的
* observers属性,属性是一个对象
* 监听到这个对象,但是需要监听的并不是整个对象的变化,需要监听的是这个对象下属性的值
* 如何写取到对象下面的某个属性呢
加一个中括号
   用['playlist.playCount'](val)
对象外面要加上一个引号
```
['playlist.playCount'](val){
    console.log(val);
}
```
格式化数字的方法应该定义在methods里面,当前格式化数字的方法相当于是只在当前组件进行使用,在js当中是没有私有方法这个概念的
对于这种私有的方法,习惯用下划线_tranNumber
```
// num接收的数字,point保留数字的第几位
 _tranNumber(num, point){
      // 将数字转换为字符串,然后通过split方法用.分隔,取到第0个
      let numStr = num.toString().split('.')[0]
      if(numStr.length<6) { // 判断数字有多长,如果小于6,,表示10万以内的数字
        return numStr;
      }else if(numStr.length>=6 && numStr.length<=8){
        let decimal = numStr.substring(numStr.length-4, numStr.length-4+point)
        // 由千位,百位组成的一个数字
        return parseFloat(parseInt(num / 10000)+'.'+decimal)+'万'
      }else if(numStr.length >8){
        let decimal = numStr.substring(numStr.length-8, numStr.length-8+point);
        return parseFloat(parseInt(num/100000000)+'.'+decimal)+'亿'
      }
    }
```
如何把处理完之后的数字去显示到我们对应的页面上呢

* 设置本身字段的时候,你不能直接的去监听对象下面的属性,这样会造成程序的死循环
* 可以引入第二个值：
* data里面的是当前组件页面要显示的数据

对于当前播放的数量进行一个数据监听,对数据进行一个格式化

什么时候进行格式化?

组件中最重要的一个功能,数据监听器

我们可以监听组件当中任何一个属性的变化

如果监听的是一个对象下面的属性的话,需要写成中括号,里面是对象.属性的形式,去监听对象下面的某个属性的变化

当这个属性一变化时,就会自动的触发这个方法

当我们进行一些初始化赋值的时候

一定不能给监听数据的本身进行赋值

因为它一旦变化的化,又触发它的变化

会导致一个死循环

解决的办法是:引入一个新的变量用于保存当前组件的数据

当给格式化完成之后的数据赋值给一个新的值

并且把这个新的值写到页面上,完成了对应的一个效果处理

如何在小程序中进行数据的监听,以及如何监听一个对象下面的某个属性

在数据监听中需要注意的一个问题

当我去监听某一个值的时候,不能当前在监听的值进行赋值,这样容易造成一个死循环

而相对应的解决方案是,在data里面去定义一个新的属性,通过这个新的data的属性值去给他赋值,就能够实现我们想要的功能
 */

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    playlist: {
      type: Object
    }
  },

  // 数据的监听器
  observers: {
    ['playlist.playCount'](count){
      console.log(count);
      console.log(this._tranNumber(count, 2));
      this.setData({
        _count: this._tranNumber(count, 2)
      })
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    _count: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _tranNumber(num, point){
      // 将数字转换为字符串,然后通过split方法用.分隔,取到第0个
      let numStr = num.toString().split('.')[0]
      if(numStr.length<6) { // 判断数字有多长,如果小于6,,表示10万以内的数字
        return numStr;
      }else if(numStr.length>=6 && numStr.length<=8){
        let decimal = numStr.substring(numStr.length-4, numStr.length-4+point)
        // 由千位,百位组成的一个数字
        return parseFloat(parseInt(num / 10000)+'.'+decimal)+'万'
      }else if(numStr.length >8){
        let decimal = numStr.substring(numStr.length-8, numStr.length-8+point);
        return parseFloat(parseInt(num/100000000)+'.'+decimal)+'亿'
      }
    }
  }
})
