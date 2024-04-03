从5 升级到 6.1.11后 加载方式有所区别

6.1.11多了很多view视图的选择


这段代码也很关键
用了高级的视图 那么就需要把数据放置在  resouces下
  this.$refs.calendar.getApi()('resetOptions', { resources })
  没有用高级的视图 直接用  
  this.$refs.calendar.getApi()('resetOptions',resources)

import FullCalendar from '@fullcalendar/vue'
import list from '@fullcalendar/list'
import resource from '@fullcalendar/resource' // 通过在package.json 单独添加 @fullcalendar/resource 重点是这个一定要这种方式
import resourceTimeGrid from '@fullcalendar/resource-timegrid' //非商业应用可以使用
import cnLocale from '@fullcalendar/core/locales/zh-cn'
import timeGrid from '@fullcalendar/timegrid'
import bootstrap5 from '@fullcalendar/bootstrap5'
import multiMonth from '@fullcalendar/multimonth'
import dayGrid from '@fullcalendar/daygrid'
import interaction from '@fullcalendar/interaction'


   "@fullcalendar/bootstrap5": "6.1.11",
    "@fullcalendar/core": "6.1.11",
    "@fullcalendar/moment": "^6.1.11",
    "@fullcalendar/resource-timegrid": "6.1.11",
    "@fullcalendar/timegrid": "6.1.11",
    "@fullcalendar/vue": "6.1.11",
    "@fullcalendar/daygrid": "6.1.11",
    "@fullcalendar/interaction": "6.1.11",
    "@fullcalendar/resource": "6.1.11",
    "@fullcalendar/list": "6.1.11",
    "@fullcalendar/multimonth": "6.1.11",
